<?php
/**
 * Analytics Tracking Endpoint
 * Accepts POST with JSON body, stores events in SQLite.
 * Ad-blocker resistant: same-domain, first-party only.
 */

require_once __DIR__ . '/config.php';

// CORS headers
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: ' . SITE_URL);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Parse input
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Support batched events
$events = isset($data['events']) ? $data['events'] : [$data];

if (empty($events) || count($events) > 50) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid event count (1-50)']);
    exit;
}

// Visitor ID: from payload or generate
$visitorId = $data['visitor_id'] ?? null;
if (!$visitorId || strlen($visitorId) > 64) {
    $visitorId = bin2hex(random_bytes(16));
}

// Set visitor cookie (httponly, samesite)
if (!isset($_COOKIE['_vid'])) {
    setcookie('_vid', $visitorId, [
        'expires' => time() + 365 * 24 * 3600,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
} else {
    $visitorId = $_COOKIE['_vid'];
}

// Hash IP for rate limiting (no raw IP stored)
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0') . $visitorId);

// Open database
try {
    $db = new SQLite3(DB_PATH);
    $db->enableExceptions(true);
    $db->exec('PRAGMA journal_mode=WAL');
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database unavailable']);
    exit;
}

// Rate limiting
$windowStart = intdiv(time(), RATE_LIMIT_WINDOW) * RATE_LIMIT_WINDOW;
$stmt = $db->prepare('SELECT event_count FROM rate_limits WHERE visitor_id = :vid AND window_start = :ws');
$stmt->bindValue(':vid', $visitorId, SQLITE3_TEXT);
$stmt->bindValue(':ws', $windowStart, SQLITE3_INTEGER);
$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);

$currentCount = $result ? $result['event_count'] : 0;
if ($currentCount + count($events) > RATE_LIMIT_MAX) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded']);
    $db->close();
    exit;
}

// Update rate limit counter
$stmt = $db->prepare('INSERT INTO rate_limits (visitor_id, window_start, event_count)
    VALUES (:vid, :ws, :count)
    ON CONFLICT(visitor_id, window_start) DO UPDATE SET event_count = event_count + :count');
$stmt->bindValue(':vid', $visitorId, SQLITE3_TEXT);
$stmt->bindValue(':ws', $windowStart, SQLITE3_INTEGER);
$stmt->bindValue(':count', count($events), SQLITE3_INTEGER);
$stmt->execute();

// Clean old rate limit entries
$db->exec('DELETE FROM rate_limits WHERE window_start < ' . ($windowStart - RATE_LIMIT_WINDOW));

// Valid event types
$validTypes = ['pageview', 'form_start', 'form_step', 'form_complete', 'form_abandon', 'click', 'scroll_depth'];

// Insert events
$insertStmt = $db->prepare('INSERT INTO events
    (visitor_id, event_type, page_url, referrer, user_agent, screen_width, screen_height,
     element_id, form_name, step_number, scroll_depth, extra_data, ip_hash, created_at)
    VALUES (:vid, :type, :url, :ref, :ua, :sw, :sh, :eid, :fn, :sn, :sd, :extra, :iph, :ts)');

$inserted = 0;
$db->exec('BEGIN TRANSACTION');

foreach ($events as $event) {
    $type = $event['type'] ?? '';
    if (!in_array($type, $validTypes)) continue;

    $insertStmt->bindValue(':vid', $visitorId, SQLITE3_TEXT);
    $insertStmt->bindValue(':type', $type, SQLITE3_TEXT);
    $insertStmt->bindValue(':url', substr($event['page_url'] ?? '', 0, 2048), SQLITE3_TEXT);
    $insertStmt->bindValue(':ref', substr($event['referrer'] ?? '', 0, 2048), SQLITE3_TEXT);
    $insertStmt->bindValue(':ua', substr($event['user_agent'] ?? '', 0, 512), SQLITE3_TEXT);
    $insertStmt->bindValue(':sw', intval($event['screen_width'] ?? 0), SQLITE3_INTEGER);
    $insertStmt->bindValue(':sh', intval($event['screen_height'] ?? 0), SQLITE3_INTEGER);
    $insertStmt->bindValue(':eid', substr($event['element_id'] ?? '', 0, 255), SQLITE3_TEXT);
    $insertStmt->bindValue(':fn', substr($event['form_name'] ?? '', 0, 255), SQLITE3_TEXT);
    $insertStmt->bindValue(':sn', intval($event['step_number'] ?? 0), SQLITE3_INTEGER);
    $insertStmt->bindValue(':sd', intval($event['scroll_depth'] ?? 0), SQLITE3_INTEGER);
    $insertStmt->bindValue(':extra', substr($event['extra_data'] ?? '', 0, 1024), SQLITE3_TEXT);
    $insertStmt->bindValue(':iph', $ipHash, SQLITE3_TEXT);
    $insertStmt->bindValue(':ts', $event['timestamp'] ?? date('Y-m-d H:i:s'), SQLITE3_TEXT);

    $insertStmt->execute();
    $insertStmt->reset();
    $inserted++;
}

$db->exec('COMMIT');
$db->close();

echo json_encode(['success' => true, 'tracked' => $inserted, 'visitor_id' => $visitorId]);
