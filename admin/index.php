<?php
session_name('jk_admin_auth');
session_start();
require_once __DIR__ . '/config.php';

// Logout
if (isset($_GET['logout'])) { session_destroy(); header('Location: index.php'); exit; }

// Login
$err = '';
if (!empty($_POST['password'])) {
    if ($_POST['password'] === ADMIN_PASSWORD) {
        session_regenerate_id(true);          // Prevent session fixation
        $_SESSION['admin_ok']     = true;
        $_SESSION['login_fails']  = 0;
        header('Location: index.php'); exit;
    } else {
        $_SESSION['login_fails'] = ($_SESSION['login_fails'] ?? 0) + 1;
        if ($_SESSION['login_fails'] >= 5) sleep(3);  // Slow down brute force
        $err = 'Incorrect password.';
    }
}

// Auth check
$authed = !empty($_SESSION['admin_ok']);

// Load data
function loadJSON(string $file): array {
    $path = DATA_DIR . $file . '.json';
    return file_exists($path) ? (json_decode(file_get_contents($path), true) ?? []) : [];
}
if ($authed) {
    $links    = loadJSON('links')['buttons']   ?? [];
    $texts    = loadJSON('texts');
    $projects = loadJSON('projects')['projects'] ?? [];
    $stats    = loadJSON('stats');
    $hero     = $texts['hero']   ?? [];
    $about    = $texts['about']  ?? [];
    $collab   = $texts['collab'] ?? [];
}

function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Inidė Jasnauskaitė</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ig: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
      --accent: #bc1888;
      --bg: #f4f5f7; --white: #fff; --dark: #0a0a0a;
      --text: #1a1a2e; --text2: #6b7280; --border: #e5e7eb;
      --success: #10b981; --danger: #ef4444;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    a { color: inherit; text-decoration: none; }

    /* ====== LOGIN ====== */
    .login-wrap {
      min-height: 100vh; display: flex; align-items: center;
      justify-content: center; padding: 24px;
      background: var(--dark); position: relative; overflow: hidden;
    }
    .login-wrap::before {
      content: ''; position: absolute; inset: 0;
      background: var(--ig); opacity: .07; pointer-events: none;
    }
    .login-box {
      background: var(--white); border-radius: 20px;
      padding: 44px 36px; max-width: 380px; width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,.3);
      position: relative; z-index: 1;
    }
    .login-icon {
      width: 64px; height: 64px; border-radius: 50%;
      background: var(--ig); display: flex; align-items: center;
      justify-content: center; margin: 0 auto 18px; font-size: 24px; color: #fff;
      box-shadow: 0 6px 24px rgba(188,24,136,.3);
    }
    .login-box h1 { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 6px; }
    .login-box p { font-size: 13px; color: var(--text2); text-align: center; margin-bottom: 24px; }
    .err { background: #fff0f0; border: 1px solid #fca5a5; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #b91c1c; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    label { font-size: 13px; font-weight: 600; display: block; margin-bottom: 5px; }
    input[type="password"], input[type="text"], input[type="url"], input[type="email"], textarea, select {
      width: 100%; padding: 10px 14px; border: 1.5px solid var(--border);
      border-radius: 8px; font-size: 14px; outline: none; font-family: inherit;
      transition: border-color .2s; background: var(--white); color: var(--text);
    }
    input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(188,24,136,.1); }
    textarea { resize: vertical; }
    .btn-primary {
      width: 100%; padding: 12px; background: var(--ig); color: #fff;
      border: none; border-radius: 99px; font-size: 15px; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: opacity .2s, transform .2s;
    }
    .btn-primary:hover { opacity: .9; transform: translateY(-1px); }

    /* ====== LAYOUT ====== */
    .layout { display: flex; min-height: 100vh; }

    /* Sidebar */
    .sidebar {
      width: 230px; background: var(--dark); flex-shrink: 0;
      display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto;
    }
    .sidebar__brand {
      padding: 24px 20px 20px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .sidebar__brand h1 {
      font-size: 15px; font-weight: 700; color: #fff; line-height: 1.3;
    }
    .sidebar__brand p { font-size: 11px; color: rgba(255,255,255,.4); margin-top: 3px; }
    .sidebar__nav { padding: 12px 10px; flex: 1; }
    .nav-item {
      display: flex; align-items: center; gap: 11px;
      padding: 10px 12px; border-radius: 10px;
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,.55);
      cursor: pointer; transition: all .2s; margin-bottom: 2px;
      border: none; background: none; width: 100%; text-align: left;
    }
    .nav-item i { width: 18px; text-align: center; font-size: 13px; }
    .nav-item:hover { background: rgba(255,255,255,.06); color: rgba(255,255,255,.85); }
    .nav-item.active { background: var(--ig); color: #fff; }
    .sidebar__footer {
      padding: 16px 10px;
      border-top: 1px solid rgba(255,255,255,.08);
    }
    .sidebar__footer a {
      display: flex; align-items: center; gap: 10px;
      font-size: 13px; color: rgba(255,255,255,.4);
      padding: 8px 12px; border-radius: 8px;
      transition: all .2s;
    }
    .sidebar__footer a:hover { color: rgba(255,255,255,.8); background: rgba(255,255,255,.05); }

    /* Main content */
    .main { flex: 1; overflow-y: auto; }
    .topbar {
      background: var(--white); border-bottom: 1px solid var(--border);
      padding: 0 32px; height: 60px;
      display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 100;
    }
    .topbar h2 { font-size: 17px; font-weight: 700; }
    .topbar__right { display: flex; align-items: center; gap: 12px; }
    #saveBtn {
      padding: 8px 20px; background: var(--ig); color: #fff;
      border: none; border-radius: 99px; font-size: 13px; font-weight: 600;
      cursor: pointer; display: flex; align-items: center; gap: 7px;
      transition: opacity .2s;
    }
    #saveBtn:hover { opacity: .9; }
    #saveBtn:disabled { opacity: .5; cursor: not-allowed; }
    .save-status { font-size: 13px; color: var(--success); display: flex; align-items: center; gap: 5px; opacity: 0; transition: opacity .3s; }
    .save-status.show { opacity: 1; }
    .save-status.err { color: var(--danger); }

    /* Panels */
    .content { padding: 28px 32px; }
    .panel { display: none; }
    .panel.active { display: block; }

    /* Cards */
    .card {
      background: var(--white); border-radius: 14px;
      border: 1px solid var(--border); padding: 24px; margin-bottom: 20px;
    }
    .card-title {
      font-size: 15px; font-weight: 700; margin-bottom: 16px;
      display: flex; align-items: center; gap: 8px;
      padding-bottom: 12px; border-bottom: 1px solid var(--border);
    }
    .card-title i { background: var(--ig); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* Grid */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
    .form-group label { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: .5px; }

    /* Link items */
    .link-list { display: flex; flex-direction: column; gap: 10px; }
    .link-item {
      background: var(--bg); border: 1.5px solid var(--border); border-radius: 10px;
      padding: 14px 16px; display: grid;
      grid-template-columns: 30px 1fr 1fr 120px 50px;
      gap: 10px; align-items: center;
    }
    .link-item__drag { color: #bbb; cursor: grab; text-align: center; }
    .link-item__toggle { display: flex; align-items: center; justify-content: flex-end; gap: 8px; font-size: 12px; color: var(--text2); }
    .toggle-switch { position: relative; width: 36px; height: 20px; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute; inset: 0; background: #d1d5db; border-radius: 20px; cursor: pointer; transition: .2s;
    }
    .toggle-slider::after { content: ''; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: .2s; }
    .toggle-switch input:checked + .toggle-slider { background: var(--success); }
    .toggle-switch input:checked + .toggle-slider::after { transform: translateX(16px); }

    /* Project items */
    .project-list { display: flex; flex-direction: column; gap: 12px; }
    .project-item {
      background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px;
      overflow: hidden;
    }
    .project-item__header {
      padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
      cursor: pointer; user-select: none;
    }
    .project-item__header:hover { background: #eff; }
    .project-item__title { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    .project-item__actions { display: flex; gap: 6px; }
    .project-item__body { padding: 0 16px; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; }
    .project-item__body.open { max-height: 800px; padding: 0 16px 16px; }
    .cat-badge {
      font-size: 10px; font-weight: 700; padding: 2px 8px;
      border-radius: 99px; text-transform: uppercase; letter-spacing: .5px;
    }
    .cat-fashion  { background: #fde8f5; color: #9c2070; }
    .cat-beauty   { background: #e8f0fe; color: #1a56db; }
    .cat-travel   { background: #d1fae5; color: #065f46; }
    .cat-lifestyle{ background: #fef3c7; color: #92400e; }

    /* Buttons */
    .btn-sm {
      padding: 7px 14px; border-radius: 99px; font-size: 12px; font-weight: 600;
      cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 5px; transition: all .2s;
    }
    .btn-success { background: var(--success); color: #fff; }
    .btn-success:hover { opacity: .85; }
    .btn-danger  { background: var(--danger); color: #fff; }
    .btn-danger:hover  { opacity: .85; }
    .btn-outline { background: var(--white); color: var(--text2); border: 1.5px solid var(--border); }
    .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

    /* Upload zone */
    .upload-zone {
      border: 2px dashed var(--border); border-radius: 10px; padding: 20px;
      text-align: center; cursor: pointer; transition: border-color .2s, background .2s;
      position: relative;
    }
    .upload-zone:hover { border-color: var(--accent); background: #fdf5fb; }
    .upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    .upload-zone__text { font-size: 13px; color: var(--text2); }
    .upload-zone__text strong { color: var(--accent); }
    .upload-preview { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; margin: 8px auto 0; display: block; }

    /* Stats table */
    .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
    .stat-input-card { background: var(--bg); border-radius: 10px; padding: 14px; border: 1px solid var(--border); }
    .stat-input-card label { font-size: 11px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: .5px; display: block; margin-bottom: 6px; }
    .stat-input-card input { font-size: 18px; font-weight: 700; border: none; background: transparent; outline: none; width: 100%; color: var(--text); }

    /* Package editor */
    .pkg-list { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
    .pkg-item { border: 1.5px solid var(--border); border-radius: 10px; padding: 16px; background: var(--bg); }
    .pkg-item.featured-pkg { border-color: var(--accent); background: #fdf5fb; }
    .pkg-item label { font-size: 11px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: .5px; display: block; margin-bottom: 4px; }
    .pkg-item input, .pkg-item textarea { margin-bottom: 10px; }
    .pkg-item textarea { min-height: 80px; font-size: 12px; }

    /* Toast */
    .toast {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      padding: 12px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
      display: flex; align-items: center; gap: 9px;
      transform: translateY(20px); opacity: 0;
      transition: all .3s; pointer-events: none; max-width: 340px;
    }
    .toast.show { transform: translateY(0); opacity: 1; }
    .toast.ok  { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
    .toast.err { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }

    /* Hamburger for mobile sidebar */
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .layout { flex-direction: column; }
      .content { padding: 20px 16px; }
      .grid-2, .grid-3, .stats-grid, .pkg-list { grid-template-columns: 1fr; }
      .link-item { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>

<?php if (!$authed): ?>
<!-- ====== LOGIN ====== -->
<div class="login-wrap">
  <div class="login-box">
    <div class="login-icon"><i class="fas fa-shield-halved"></i></div>
    <h1>Admin Panel</h1>
    <p>Inidė Jasnauskaitė · Website Manager</p>
    <?php if ($err): ?><div class="err"><i class="fas fa-triangle-exclamation"></i><?= e($err) ?></div><?php endif; ?>
    <form method="POST">
      <label for="pw">Password</label>
      <input type="password" id="pw" name="password" required autofocus placeholder="Enter admin password…" style="margin-bottom:16px">
      <button type="submit" class="btn-primary"><i class="fas fa-unlock"></i> Sign In</button>
    </form>
    <p style="text-align:center;font-size:12px;color:#aaa;margin-top:18px"><a href="../index.php" style="color:#bc1888">← Back to website</a></p>
  </div>
</div>

<?php else: ?>
<!-- ====== ADMIN PANEL ====== -->
<div class="layout">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar__brand">
      <h1>INIDĖ<br>JASNAUSKAITĖ</h1>
      <p>Website Admin</p>
    </div>
    <nav class="sidebar__nav">
      <button class="nav-item active" onclick="showPanel('links',this)">
        <i class="fas fa-link"></i> Link Buttons
      </button>
      <button class="nav-item" onclick="showPanel('portfolio',this)">
        <i class="fas fa-images"></i> Portfolio
      </button>
      <button class="nav-item" onclick="showPanel('texts',this)">
        <i class="fas fa-pen-to-square"></i> Texts & Bio
      </button>
      <button class="nav-item" onclick="showPanel('stats',this)">
        <i class="fas fa-chart-bar"></i> Media Kit Stats
      </button>
    </nav>
    <div class="sidebar__footer">
      <a href="../index.php" target="_blank"><i class="fas fa-globe"></i> View Website</a>
      <a href="?logout=1"><i class="fas fa-right-from-bracket"></i> Logout</a>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="main">
    <div class="topbar">
      <h2 id="panelTitle">🔗 Link Buttons</h2>
      <div class="topbar__right">
        <span class="save-status" id="saveStatus"><i class="fas fa-circle-check"></i> Saved!</span>
        <button id="saveBtn" onclick="saveCurrentPanel()"><i class="fas fa-floppy-disk"></i> Save Changes</button>
      </div>
    </div>

    <div class="content">

      <!-- ========== LINKS PANEL ========== -->
      <div class="panel active" id="panel-links">
        <div class="card">
          <div class="card-title"><i class="fas fa-link"></i> Hero Link Buttons</div>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px">These are the buttons visible on the main page. Toggle on/off without deleting.</p>
          <div class="link-list" id="linkList">
            <?php foreach ($links as $i => $btn): ?>
            <div class="link-item" data-id="<?= e((string)($btn['id'] ?? $i+1)) ?>">
              <div class="link-item__drag"><i class="fas fa-grip-vertical"></i></div>
              <div class="form-group" style="margin:0">
                <label>Button Label</label>
                <input type="text" class="lbl" value="<?= e($btn['label'] ?? '') ?>" placeholder="Button label">
              </div>
              <div class="form-group" style="margin:0">
                <label>URL / Link</label>
                <input type="text" class="url" value="<?= e($btn['url'] ?? '') ?>" placeholder="https:// or #section">
              </div>
              <div class="form-group" style="margin:0">
                <label>Style</label>
                <select class="style">
                  <?php foreach (['ig'=>'Instagram','tt'=>'TikTok','yt'=>'YouTube','mail'=>'Email','collab'=>'Dark','dark'=>'Black'] as $val=>$name): ?>
                    <option value="<?= $val ?>" <?= ($btn['style']??'') === $val ? 'selected' : '' ?>><?= $name ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="link-item__toggle">
                <label class="toggle-switch">
                  <input type="checkbox" class="active-toggle" <?= ($btn['active']??true) ? 'checked' : '' ?>>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
          <div style="margin-top:14px">
            <button class="btn-sm btn-outline" onclick="addLink()"><i class="fas fa-plus"></i> Add Button</button>
          </div>
        </div>
      </div>

      <!-- ========== PORTFOLIO PANEL ========== -->
      <div class="panel" id="panel-portfolio">
        <div class="card">
          <div class="card-title"><i class="fas fa-images"></i> Portfolio Projects</div>
          <p style="font-size:13px;color:#6b7280;margin-bottom:16px">Click a project to expand and edit. Toggle off to hide without deleting.</p>
          <div class="project-list" id="projectList">
            <?php foreach ($projects as $i => $p): ?>
            <div class="project-item" data-id="<?= e((string)($p['id'] ?? $i+1)) ?>">
              <div class="project-item__header" onclick="toggleProject(this)">
                <div class="project-item__title">
                  <i class="fas fa-chevron-right" style="font-size:11px;color:#aaa;transition:transform .2s"></i>
                  <span class="cat-badge cat-<?= e($p['category'] ?? 'lifestyle') ?>"><?= e(ucfirst($p['category'] ?? '')) ?></span>
                  <?= e($p['title'] ?? 'Project') ?>
                </div>
                <div class="project-item__actions">
                  <label class="toggle-switch" onclick="event.stopPropagation()">
                    <input type="checkbox" class="active-toggle" <?= ($p['active']??true) ? 'checked' : '' ?>>
                    <span class="toggle-slider"></span>
                  </label>
                  <button class="btn-sm btn-danger" onclick="event.stopPropagation(); deleteProject(this)" style="margin-left:6px"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="project-item__body">
                <div class="grid-2">
                  <div class="form-group"><label>Project Title</label><input type="text" class="p-title" value="<?= e($p['title'] ?? '') ?>"></div>
                  <div class="form-group"><label>Brand Name</label><input type="text" class="p-brand" value="<?= e($p['brand'] ?? '') ?>"></div>
                </div>
                <div class="grid-2">
                  <div class="form-group">
                    <label>Category</label>
                    <select class="p-cat">
                      <?php foreach (['fashion','beauty','travel','lifestyle'] as $c): ?>
                        <option value="<?= $c ?>" <?= ($p['category']??'') === $c ? 'selected' : '' ?>><?= ucfirst($c) ?></option>
                      <?php endforeach; ?>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Project Image</label>
                    <div class="upload-zone">
                      <input type="file" accept="image/*" onchange="uploadFile(this,'projects',function(fn){this.closest('.project-item').querySelector('.p-image').value=fn;updatePreview(this,fn);}.bind(this))">
                      <div class="upload-zone__text">📷 <strong>Click to upload</strong> image (JPG/PNG/WEBP, max 8MB)</div>
                      <?php if (!empty($p['image'])): ?><img src="../images/projects/<?= e($p['image']) ?>" class="upload-preview" onerror="this.style.display='none'"><?php endif; ?>
                    </div>
                    <input type="hidden" class="p-image" value="<?= e($p['image'] ?? '') ?>">
                  </div>
                </div>
                <div class="form-group"><label>Description</label><textarea class="p-desc" rows="3"><?= e($p['description'] ?? '') ?></textarea></div>
                <div class="grid-2">
                  <div class="form-group"><label>Metric 1 (e.g. 280K+ reach)</label><input type="text" class="p-m1v" value="<?= e($p['metric1_value'] ?? '') ?>" placeholder="280K+ reach"></div>
                  <div class="form-group"><label>Metric 2 (e.g. 12K+ engagements)</label><input type="text" class="p-m2v" value="<?= e($p['metric2_value'] ?? '') ?>" placeholder="12K+ engagements"></div>
                </div>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
          <div style="margin-top:16px">
            <button class="btn-sm btn-success" onclick="addProject()"><i class="fas fa-plus"></i> Add New Project</button>
          </div>
        </div>
      </div>

      <!-- ========== TEXTS PANEL ========== -->
      <div class="panel" id="panel-texts">
        <div class="card">
          <div class="card-title"><i class="fas fa-user"></i> Hero Section</div>
          <div class="grid-3">
            <div class="form-group"><label>Full Name</label><input type="text" id="t-name" value="<?= e($hero['name'] ?? '') ?>"></div>
            <div class="form-group"><label>Handle (with @)</label><input type="text" id="t-handle" value="<?= e($hero['handle'] ?? '') ?>"></div>
            <div class="form-group"><label>Niche Line</label><input type="text" id="t-niche" value="<?= e($hero['niche'] ?? '') ?>"></div>
            <div class="form-group"><label>Followers Count</label><input type="text" id="t-followers" value="<?= e($hero['followers'] ?? '') ?>" placeholder="354K"></div>
            <div class="form-group"><label>Posts Count</label><input type="text" id="t-posts" value="<?= e($hero['posts'] ?? '') ?>" placeholder="2.5K"></div>
            <div class="form-group"><label>Avg. Engagement Rate</label><input type="text" id="t-er" value="<?= e($hero['er'] ?? '') ?>" placeholder="5%+"></div>
          </div>
          <div class="form-group" style="margin-top:8px">
            <label>Profile Photo</label>
            <div class="upload-zone" style="max-width:280px">
              <input type="file" accept="image/*" onchange="uploadFile(this,'profile',function(){})">
              <div class="upload-zone__text">📷 <strong>Click to upload</strong> profile photo</div>
              <?php if (file_exists(__DIR__ . '/../images/profile.jpg')): ?><img src="../images/profile.jpg" class="upload-preview" style="border-radius:50%"><?php endif; ?>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title"><i class="fas fa-pen-nib"></i> About Section</div>
          <div class="form-group"><label>Section Title (use \n for line break)</label><input type="text" id="t-about-title" value="<?= e($about['title'] ?? '') ?>"></div>
          <div class="form-group"><label>Paragraph 1</label><textarea id="t-about-text1" rows="4"><?= e($about['text1'] ?? '') ?></textarea></div>
          <div class="form-group"><label>Paragraph 2</label><textarea id="t-about-text2" rows="4"><?= e($about['text2'] ?? '') ?></textarea></div>
          <div class="form-group"><label>Tags (separate with commas)</label><input type="text" id="t-about-tags" value="<?= e(implode(', ', $about['tags'] ?? [])) ?>" placeholder="Fashion, Beauty, Travel, Lifestyle"></div>
          <div class="form-group" style="margin-top:8px">
            <label>About Photo</label>
            <div class="upload-zone" style="max-width:280px">
              <input type="file" accept="image/*" onchange="uploadFile(this,'about',function(){})">
              <div class="upload-zone__text">📷 <strong>Click to upload</strong> about photo</div>
              <?php if (file_exists(__DIR__ . '/../images/about.jpg')): ?><img src="../images/about.jpg" class="upload-preview"><?php endif; ?>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title"><i class="fas fa-handshake"></i> Collaborate Section</div>
          <div class="form-group"><label>Section Title</label><input type="text" id="t-collab-title" value="<?= e($collab['title'] ?? '') ?>"></div>
          <div class="form-group"><label>Description Text</label><textarea id="t-collab-text" rows="4"><?= e($collab['text'] ?? '') ?></textarea></div>
        </div>
      </div>

      <!-- ========== STATS PANEL ========== -->
      <div class="panel" id="panel-stats">
        <div class="card">
          <div class="card-title"><i class="fas fa-chart-line"></i> Platform Numbers</div>
          <div class="stats-grid">
            <?php
            $igFields = [
              'followers'      => 'Instagram Followers',
              'posts'          => 'Posts Count',
              'er'             => 'Avg. Engagement Rate',
              'avg_reach'      => 'Avg. Post Reach',
              'avg_reel_views' => 'Avg. Reel Views',
              'story_view_rate'=> 'Story View Rate',
            ];
            foreach ($igFields as $key => $label):
            ?>
            <div class="stat-input-card">
              <label><?= e($label) ?></label>
              <input type="text" class="s-ig" data-key="<?= e($key) ?>" value="<?= e($stats['instagram'][$key] ?? '') ?>" placeholder="e.g. 354K">
            </div>
            <?php endforeach; ?>
            <div class="stat-input-card">
              <label>TikTok Followers</label>
              <input type="text" class="s-tt" data-key="followers" value="<?= e($stats['tiktok']['followers'] ?? '') ?>" placeholder="e.g. 50K">
            </div>
            <div class="stat-input-card">
              <label>TikTok Avg. Views</label>
              <input type="text" class="s-tt" data-key="avg_views" value="<?= e($stats['tiktok']['avg_views'] ?? '') ?>" placeholder="e.g. 30K">
            </div>
            <div class="stat-input-card">
              <label>YouTube Subscribers</label>
              <input type="text" class="s-yt" data-key="subscribers" value="<?= e($stats['youtube']['subscribers'] ?? '') ?>" placeholder="e.g. 10K">
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title"><i class="fas fa-tags"></i> Collaboration Packages</div>
          <div class="pkg-list">
            <?php foreach (($stats['packages'] ?? []) as $pk): ?>
            <div class="pkg-item <?= ($pk['featured']??false) ? 'featured-pkg' : '' ?>" data-id="<?= e((string)($pk['id'] ?? 0)) ?>">
              <label>Tag (e.g. "Most Popular")</label>
              <input type="text" class="pk-tag" value="<?= e($pk['tag'] ?? '') ?>">
              <label>Package Name</label>
              <input type="text" class="pk-name" value="<?= e($pk['name'] ?? '') ?>">
              <label>Price</label>
              <input type="text" class="pk-price" value="<?= e($pk['price'] ?? '') ?>" placeholder="From €XXX">
              <label>Period</label>
              <input type="text" class="pk-period" value="<?= e($pk['period'] ?? '') ?>" placeholder="per campaign">
              <label>Items (one per line)</label>
              <textarea class="pk-items" rows="4"><?= e(implode("\n", $pk['items'] ?? [])) ?></textarea>
              <label>Note</label>
              <input type="text" class="pk-note" value="<?= e($pk['note'] ?? '') ?>">
              <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
                <label class="toggle-switch">
                  <input type="checkbox" class="pk-featured" <?= ($pk['featured']??false) ? 'checked' : '' ?>>
                  <span class="toggle-slider"></span>
                </label>
                <span style="font-size:12px;color:#6b7280">Mark as Featured</span>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="card">
          <div class="card-title"><i class="fas fa-users"></i> Audience (% values)</div>
          <div class="grid-2">
            <div>
              <p style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Age Groups</p>
              <?php foreach (($stats['audience']['age'] ?? []) as $row): ?>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <span style="font-size:13px;width:50px"><?= e($row['label']) ?></span>
                <input type="number" min="0" max="100" class="age-pct" data-label="<?= e($row['label']) ?>" value="<?= (int)$row['pct'] ?>" style="width:70px">
                <span style="font-size:12px;color:#aaa">%</span>
              </div>
              <?php endforeach; ?>
            </div>
            <div>
              <p style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Top Locations</p>
              <?php foreach (($stats['audience']['locations'] ?? []) as $row): ?>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <span style="font-size:13px;width:80px"><?= e($row['label']) ?></span>
                <input type="number" min="0" max="100" class="loc-pct" data-label="<?= e($row['label']) ?>" value="<?= (int)$row['pct'] ?>" style="width:70px">
                <span style="font-size:12px;color:#aaa">%</span>
              </div>
              <?php endforeach; ?>
            </div>
          </div>
          <div style="margin-top:14px;display:flex;align-items:center;gap:12px">
            <span style="font-size:13px;font-weight:600">Female %:</span>
            <input type="number" min="0" max="100" id="gender-female" value="<?= (int)($stats['audience']['gender_female'] ?? 75) ?>" style="width:70px">
            <span style="font-size:12px;color:#aaa">Male = 100 minus Female</span>
          </div>
        </div>
      </div>

    </div><!-- /content -->
  </div><!-- /main -->
</div><!-- /layout -->

<div class="toast" id="toast"></div>

<script>
// ---- Panel navigation ----
function showPanel(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  btn.classList.add('active');
  const titles = { links: '🔗 Link Buttons', portfolio: '🎨 Portfolio', texts: '📝 Texts & Bio', stats: '📊 Media Kit Stats' };
  document.getElementById('panelTitle').textContent = titles[id] || id;
}

// ---- Toast ----
function toast(msg, ok = true) {
  const t = document.getElementById('toast');
  t.className = 'toast show ' + (ok ? 'ok' : 'err');
  t.innerHTML = (ok ? '<i class="fas fa-circle-check"></i>' : '<i class="fas fa-triangle-exclamation"></i>') + ' ' + msg;
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- Collect + Save ----
function saveCurrentPanel() {
  const panels = ['links','portfolio','texts','stats'];
  let active = panels.find(p => document.getElementById('panel-' + p).classList.contains('active'));
  if (!active) return;

  const btn = document.getElementById('saveBtn');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving…';

  let section, data;

  if (active === 'links') {
    section = 'links';
    data = collectLinks();
  } else if (active === 'portfolio') {
    section = 'projects';
    data = collectProjects();
  } else if (active === 'texts') {
    section = 'texts';
    data = collectTexts();
  } else if (active === 'stats') {
    section = 'stats';
    data = collectStats();
  }

  const fd = new FormData();
  fd.append('section', section);
  fd.append('data', JSON.stringify(data));

  fetch('save.php', { method: 'POST', body: fd })
    .then(r => r.json())
    .then(res => {
      if (res.ok) toast('Saved successfully!');
      else toast(res.msg || 'Error saving', false);
    })
    .catch(() => toast('Network error', false))
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-floppy-disk"></i> Save Changes';
    });
}

// ---- Collect links ----
function collectLinks() {
  const items = document.querySelectorAll('#linkList .link-item');
  return [...items].map((el, i) => ({
    id: i + 1,
    label:  el.querySelector('.lbl').value,
    url:    el.querySelector('.url').value,
    icon:   'fas fa-link', // kept simple
    style:  el.querySelector('.style').value,
    active: el.querySelector('.active-toggle').checked,
  }));
}

// ---- Collect projects ----
function collectProjects() {
  const items = document.querySelectorAll('#projectList .project-item');
  const iconMap = { 'fas fa-eye': 'fas fa-eye', 'fas fa-heart': 'fas fa-heart', 'fas fa-play': 'fas fa-play' };
  return [...items].map((el, i) => ({
    id:            i + 1,
    title:         el.querySelector('.p-title').value,
    category:      el.querySelector('.p-cat').value,
    brand:         el.querySelector('.p-brand').value,
    brand_logo:    '',
    image:         el.querySelector('.p-image').value,
    description:   el.querySelector('.p-desc').value,
    metric1_icon:  'fas fa-eye',
    metric1_value: el.querySelector('.p-m1v').value,
    metric2_icon:  'fas fa-heart',
    metric2_value: el.querySelector('.p-m2v').value,
    active:        el.querySelector('.active-toggle').checked,
  }));
}

// ---- Collect texts ----
function collectTexts() {
  return {
    hero: {
      name:      document.getElementById('t-name').value,
      handle:    document.getElementById('t-handle').value,
      niche:     document.getElementById('t-niche').value,
      followers: document.getElementById('t-followers').value,
      posts:     document.getElementById('t-posts').value,
      er:        document.getElementById('t-er').value,
    },
    about: {
      title: document.getElementById('t-about-title').value,
      text1: document.getElementById('t-about-text1').value,
      text2: document.getElementById('t-about-text2').value,
      tags:  document.getElementById('t-about-tags').value,
    },
    collab: {
      title: document.getElementById('t-collab-title').value,
      text:  document.getElementById('t-collab-text').value,
    },
  };
}

// ---- Collect stats ----
function collectStats() {
  const ig = {}, tt = {}, yt = {};
  document.querySelectorAll('.s-ig').forEach(el => ig[el.dataset.key] = el.value);
  document.querySelectorAll('.s-tt').forEach(el => tt[el.dataset.key] = el.value);
  document.querySelectorAll('.s-yt').forEach(el => yt[el.dataset.key] = el.value);

  const packages = [...document.querySelectorAll('.pkg-item')].map((el, i) => ({
    id:       i + 1,
    tag:      el.querySelector('.pk-tag').value,
    name:     el.querySelector('.pk-name').value,
    price:    el.querySelector('.pk-price').value,
    period:   el.querySelector('.pk-period').value,
    items:    el.querySelector('.pk-items').value.split('\n').filter(Boolean),
    note:     el.querySelector('.pk-note').value,
    featured: el.querySelector('.pk-featured').checked,
  }));

  const age = [...document.querySelectorAll('.age-pct')].map(el => ({
    label: el.dataset.label, pct: parseInt(el.value) || 0,
  }));
  const locations = [...document.querySelectorAll('.loc-pct')].map(el => ({
    label: el.dataset.label, pct: parseInt(el.value) || 0,
  }));

  return {
    instagram: ig,
    tiktok: tt,
    youtube: yt,
    packages,
    audience: {
      age, locations,
      gender_female: parseInt(document.getElementById('gender-female').value) || 75,
    },
  };
}

// ---- Add link ----
let linkCounter = <?= count($links) + 1 ?>;
function addLink() {
  const html = `<div class="link-item" data-id="${linkCounter++}">
    <div class="link-item__drag"><i class="fas fa-grip-vertical"></i></div>
    <div class="form-group" style="margin:0"><label>Button Label</label><input type="text" class="lbl" placeholder="New button"></div>
    <div class="form-group" style="margin:0"><label>URL</label><input type="text" class="url" placeholder="https://…"></div>
    <div class="form-group" style="margin:0"><label>Style</label>
      <select class="style">
        <option value="ig">Instagram</option><option value="tt">TikTok</option>
        <option value="yt">YouTube</option><option value="mail">Email</option>
        <option value="collab" selected>Dark</option>
      </select>
    </div>
    <div class="link-item__toggle">
      <label class="toggle-switch"><input type="checkbox" class="active-toggle" checked><span class="toggle-slider"></span></label>
    </div>
  </div>`;
  document.getElementById('linkList').insertAdjacentHTML('beforeend', html);
}

// ---- Add project ----
let projCounter = <?= count($projects) + 1 ?>;
function addProject() {
  const cats = ['fashion','beauty','travel','lifestyle'];
  const catsHtml = cats.map(c => `<option value="${c}">${c.charAt(0).toUpperCase()+c.slice(1)}</option>`).join('');
  const html = `<div class="project-item" data-id="${projCounter++}">
    <div class="project-item__header" onclick="toggleProject(this)">
      <div class="project-item__title">
        <i class="fas fa-chevron-right" style="font-size:11px;color:#aaa;transition:transform .2s"></i>
        <span class="cat-badge cat-fashion">Fashion</span>
        New Project
      </div>
      <div class="project-item__actions">
        <label class="toggle-switch" onclick="event.stopPropagation()">
          <input type="checkbox" class="active-toggle" checked><span class="toggle-slider"></span>
        </label>
        <button class="btn-sm btn-danger" onclick="event.stopPropagation();deleteProject(this)" style="margin-left:6px"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="project-item__body open">
      <div class="grid-2">
        <div class="form-group"><label>Project Title</label><input type="text" class="p-title" value="New Project"></div>
        <div class="form-group"><label>Brand Name</label><input type="text" class="p-brand" placeholder="Brand Name"></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label>Category</label><select class="p-cat">${catsHtml}</select></div>
        <div class="form-group">
          <label>Project Image</label>
          <div class="upload-zone">
            <input type="file" accept="image/*" onchange="uploadFile(this,'projects',function(fn){this.closest('.project-item').querySelector('.p-image').value=fn;}.bind(this))">
            <div class="upload-zone__text">📷 <strong>Click to upload</strong> image</div>
          </div>
          <input type="hidden" class="p-image" value="">
        </div>
      </div>
      <div class="form-group"><label>Description</label><textarea class="p-desc" rows="3"></textarea></div>
      <div class="grid-2">
        <div class="form-group"><label>Metric 1</label><input type="text" class="p-m1v" placeholder="280K+ reach"></div>
        <div class="form-group"><label>Metric 2</label><input type="text" class="p-m2v" placeholder="12K+ engagements"></div>
      </div>
    </div>
  </div>`;
  document.getElementById('projectList').insertAdjacentHTML('beforeend', html);
  const last = document.getElementById('projectList').lastElementChild;
  const body = last.querySelector('.project-item__body');
  body.classList.add('open');
}

function deleteProject(btn) {
  if (confirm('Delete this project?')) btn.closest('.project-item').remove();
}

// ---- Toggle project accordion ----
function toggleProject(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.fa-chevron-right');
  body.classList.toggle('open');
  if (body.classList.contains('open')) {
    icon.style.transform = 'rotate(90deg)';
  } else {
    icon.style.transform = 'rotate(0deg)';
  }
}

// ---- File upload ----
function uploadFile(input, type, callback) {
  const file = input.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('file', file);
  fd.append('type', type);
  toast('Uploading…');
  fetch('upload.php', { method: 'POST', body: fd })
    .then(r => r.json())
    .then(res => {
      if (res.ok) {
        toast('Image uploaded: ' + res.filename);
        // Show preview
        const zone = input.closest('.upload-zone');
        let prev = zone.nextElementSibling?.tagName === 'IMG' ? zone.nextElementSibling : null;
        if (!prev) {
          const img = document.createElement('img');
          img.className = 'upload-preview';
          zone.after(img);
          prev = img;
        }
        if (type === 'projects') prev.src = '../images/projects/' + res.filename;
        else if (type === 'brands') prev.src = '../images/brands/' + res.filename;
        else prev.src = '../images/' + res.filename;
        callback(res.filename);
      } else {
        toast(res.msg || 'Upload failed', false);
      }
    })
    .catch(() => toast('Upload failed', false));
}

// Keyboard shortcut: Ctrl+S / Cmd+S to save
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveCurrentPanel();
  }
});
</script>

<?php endif; ?>
</body>
</html>
