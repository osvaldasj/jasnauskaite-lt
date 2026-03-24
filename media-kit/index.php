<?php
session_name('jk_mk_auth');
session_start();
require_once __DIR__ . '/config.php';

// Already authenticated?
if (isset($_SESSION['mk_ok']) && (time() - $_SESSION['mk_time']) < MK_DURATION) {
    header('Location: kit.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pw = $_POST['password'] ?? '';
    if ($pw === MK_PASSWORD) {
        session_regenerate_id(true);          // Prevent session fixation
        $_SESSION['mk_ok']    = true;
        $_SESSION['mk_time']  = time();
        $_SESSION['mk_fails'] = 0;
        header('Location: kit.php');
        exit;
    } else {
        $_SESSION['mk_fails'] = ($_SESSION['mk_fails'] ?? 0) + 1;
        if ($_SESSION['mk_fails'] >= 5) sleep(3);  // Slow down brute force
        $error = 'Incorrect password. Please contact team@reelize.lt to request access.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Kit Access — Inidė Jasnauskaitė</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a0a;
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      position: relative; overflow: hidden;
    }
    body::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
      opacity: .06; pointer-events: none;
    }
    .box {
      background: #fff; border-radius: 24px;
      padding: 48px 40px; max-width: 420px; width: 100%;
      position: relative; z-index: 1;
      box-shadow: 0 20px 60px rgba(0,0,0,.35);
    }
    .lock {
      width: 70px; height: 70px; border-radius: 50%;
      background: linear-gradient(45deg,#f09433,#bc1888);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px; font-size: 26px; color: #fff;
      box-shadow: 0 8px 28px rgba(188,24,136,.35);
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px; text-align: center;
      color: #262626; margin-bottom: 8px;
    }
    p { font-size: 14px; color: #737373; text-align: center; margin-bottom: 28px; }
    label { font-size: 13px; font-weight: 600; color: #262626; display: block; margin-bottom: 6px; }
    input[type="password"] {
      width: 100%; padding: 12px 16px;
      border: 1.5px solid #DBDBDB; border-radius: 8px;
      font-size: 14px; outline: none; transition: border-color .2s;
      margin-bottom: 16px;
    }
    input[type="password"]:focus { border-color: #bc1888; box-shadow: 0 0 0 3px rgba(188,24,136,.1); }
    button {
      width: 100%; padding: 13px;
      background: linear-gradient(45deg,#f09433,#bc1888);
      color: #fff; border: none; border-radius: 9999px;
      font-size: 15px; font-weight: 600; cursor: pointer;
      transition: opacity .2s, transform .2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    button:hover { opacity: .9; transform: translateY(-1px); }
    .error {
      background: #fff0f0; border: 1px solid #f5c0c0;
      border-radius: 8px; padding: 11px 14px;
      font-size: 13px; color: #c62828; margin-bottom: 16px;
      display: flex; align-items: center; gap: 8px;
    }
    .back { display: block; text-align: center; margin-top: 20px; font-size: 13px; color: #8E8E8E; }
    .back a { color: #bc1888; font-weight: 500; }
  </style>
</head>
<body>
  <div class="box">
    <div class="lock"><i class="fas fa-lock"></i></div>
    <h1>Media Kit Access</h1>
    <p>Enter the password provided by Inidė to view the full media kit, analytics and rate card.</p>
    <?php if ($error): ?>
      <div class="error"><i class="fas fa-triangle-exclamation"></i> <?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
      <label for="pw">Password</label>
      <input type="password" id="pw" name="password" placeholder="Enter password…" required autofocus>
      <button type="submit"><i class="fas fa-unlock"></i> Access Media Kit</button>
    </form>
    <p class="back">Don't have a password? <a href="https://jasnauskaite.lt/#media-kit">Request access</a></p>
  </div>
</body>
</html>
