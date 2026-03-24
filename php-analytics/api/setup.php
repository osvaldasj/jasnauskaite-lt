<?php
/**
 * One-time database setup script.
 * Creates SQLite database and tables.
 * Self-deletes after successful setup.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$dataDir = dirname(DB_PATH);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

try {
    $db = new SQLite3(DB_PATH);
    $db->enableExceptions(true);

    $db->exec('PRAGMA journal_mode=WAL');
    $db->exec('PRAGMA synchronous=NORMAL');

    $db->exec('
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visitor_id TEXT NOT NULL,
            event_type TEXT NOT NULL,
            page_url TEXT,
            referrer TEXT,
            user_agent TEXT,
            screen_width INTEGER,
            screen_height INTEGER,
            element_id TEXT,
            form_name TEXT,
            step_number INTEGER,
            scroll_depth INTEGER,
            extra_data TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_hash TEXT
        )
    ');

    $db->exec('CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type)');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at)');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor_id)');
    $db->exec('CREATE INDEX IF NOT EXISTS idx_events_page ON events(page_url)');

    $db->exec('
        CREATE TABLE IF NOT EXISTS rate_limits (
            visitor_id TEXT NOT NULL,
            window_start INTEGER NOT NULL,
            event_count INTEGER DEFAULT 1,
            PRIMARY KEY (visitor_id, window_start)
        )
    ');

    $db->close();

    // Self-delete for security
    unlink(__FILE__);

    echo json_encode([
        'success' => true,
        'message' => 'Database setup complete. This script has been deleted.'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Setup failed: ' . $e->getMessage()
    ]);
}
