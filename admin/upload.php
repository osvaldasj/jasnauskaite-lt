<?php
session_name('jk_admin_auth');
session_start();
require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

if (empty($_SESSION['admin_ok'])) {
    http_response_code(401); exit(json_encode(['ok'=>false,'msg'=>'Not authenticated']));
}

$type    = $_POST['type'] ?? 'projects'; // 'projects' or 'brands' or 'profile' or 'about'
$allowed = ['projects','brands','profile','about'];
if (!in_array($type, $allowed)) exit(json_encode(['ok'=>false,'msg'=>'Invalid type']));

if (empty($_FILES['file']['tmp_name'])) exit(json_encode(['ok'=>false,'msg'=>'No file received']));

$file  = $_FILES['file'];
$ext   = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$okExt = ['jpg','jpeg','png','gif','webp'];
if (!in_array($ext, $okExt)) exit(json_encode(['ok'=>false,'msg'=>'Invalid file type. Use JPG/PNG/WEBP']));
if ($file['size'] > 8 * 1024 * 1024) exit(json_encode(['ok'=>false,'msg'=>'File too large (max 8MB)']));

// Verify actual MIME type (extension alone can be spoofed)
$finfo   = new finfo(FILEINFO_MIME_TYPE);
$mime    = $finfo->file($file['tmp_name']);
$okMimes = ['image/jpeg','image/png','image/gif','image/webp'];
if (!in_array($mime, $okMimes)) exit(json_encode(['ok'=>false,'msg'=>'File content is not a valid image']));

$dir = IMAGES_DIR;
switch ($type) {
    case 'projects': $dir .= 'projects/'; break;
    case 'brands':   $dir .= 'brands/';   break;
    case 'profile':  // fall through
    case 'about':    break;
}

if (!is_dir($dir)) mkdir($dir, 0755, true);

if ($type === 'profile') {
    $name = 'profile.' . $ext;
} elseif ($type === 'about') {
    $name = 'about.' . $ext;
} else {
    $name = uniqid('img_', true) . '.' . $ext;
}

$dest = $dir . $name;
if (!move_uploaded_file($file['tmp_name'], $dest)) {
    exit(json_encode(['ok'=>false,'msg'=>'Upload failed. Check folder permissions (755).']));
}

exit(json_encode(['ok'=>true, 'filename'=>$name, 'msg'=>'Uploaded!']));
