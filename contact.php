<?php
/**
 * JASNAUSKAITE.LT — Contact Form Handler
 * Handles: collaboration enquiries + media kit access requests
 */

header('Content-Type: application/json; charset=utf-8');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Honeypot check (spam)
if (!empty($_POST['website'])) {
    exit(json_encode(['success' => true, 'message' => 'Sent'])); // silently ignore bots
}

$to   = 'team@reelize.lt';
$type = $_POST['form_type'] ?? '';

// ---- Helper ----
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}
function isEmail(string $e): bool {
    return (bool) filter_var($e, FILTER_VALIDATE_EMAIL);
}

// ============================================================
// COLLABORATION ENQUIRY
// ============================================================
if ($type === 'collaboration') {

    $brand   = clean($_POST['brand_name']    ?? '');
    $contact = clean($_POST['contact_person'] ?? '');
    $email   = clean($_POST['email']         ?? '');
    $budget  = clean($_POST['budget']        ?? '');
    $message = clean($_POST['message']       ?? '');
    $types   = array_map('clean', (array)($_POST['project_type'] ?? []));

    if (!$brand || !$contact || !$email || !$message) {
        exit(json_encode(['success' => false, 'message' => 'Please fill in all required fields.']));
    }
    if (!isEmail($email)) {
        exit(json_encode(['success' => false, 'message' => 'Please enter a valid email address.']));
    }

    $typeStr = $types ? implode(', ', $types) : 'Not specified';

    $subject = "🤝 New Collaboration Enquiry: {$brand}";
    $body  = "New collaboration enquiry received from jasnauskaite.lt\n";
    $body .= str_repeat('=', 50) . "\n\n";
    $body .= "Brand / Company  : {$brand}\n";
    $body .= "Contact Person   : {$contact}\n";
    $body .= "Business Email   : {$email}\n";
    $body .= "Project Type(s)  : {$typeStr}\n";
    $body .= "Budget           : {$budget}\n\n";
    $body .= "Campaign Details:\n{$message}\n\n";
    $body .= str_repeat('-', 50) . "\n";
    $body .= "Reply directly to: {$email}";

    $headers  = "From: no-reply@jasnauskaite.lt\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        exit(json_encode(['success' => true, 'message' => 'Enquiry sent!']));
    } else {
        exit(json_encode(['success' => false, 'message' => 'Failed to send. Please email team@reelize.lt directly.']));
    }
}

// ============================================================
// MEDIA KIT ACCESS REQUEST
// ============================================================
if ($type === 'media_kit_request') {

    $name    = clean($_POST['req_name']    ?? '');
    $company = clean($_POST['req_company'] ?? '');
    $email   = clean($_POST['req_email']   ?? '');
    $msg     = clean($_POST['req_msg']     ?? '');

    if (!$name || !$company || !$email) {
        exit(json_encode(['success' => false, 'message' => 'Please fill in all required fields.']));
    }
    if (!isEmail($email)) {
        exit(json_encode(['success' => false, 'message' => 'Please enter a valid email address.']));
    }

    $subject = "🔑 Media Kit Access Request: {$company}";
    $body  = "New Media Kit access request from jasnauskaite.lt\n";
    $body .= str_repeat('=', 50) . "\n\n";
    $body .= "Name     : {$name}\n";
    $body .= "Company  : {$company}\n";
    $body .= "Email    : {$email}\n\n";
    if ($msg) $body .= "Message:\n{$msg}\n\n";
    $body .= str_repeat('-', 50) . "\n";
    $body .= "To grant access, reply to {$email} with the password.\n";
    $body .= "Media Kit URL: https://jasnauskaite.lt/media-kit/";

    $headers  = "From: no-reply@jasnauskaite.lt\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        exit(json_encode(['success' => true, 'message' => 'Request sent!']));
    } else {
        exit(json_encode(['success' => false, 'message' => 'Failed to send. Please email team@reelize.lt directly.']));
    }
}

exit(json_encode(['success' => false, 'message' => 'Invalid request.']));
