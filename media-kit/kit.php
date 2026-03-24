<?php
session_name('jk_mk_auth');
session_start();
require_once __DIR__ . '/config.php';

// Auth check
if (!isset($_SESSION['mk_ok']) || (time() - $_SESSION['mk_time']) >= MK_DURATION) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Load stats from JSON (admin-editable)
$statsFile = __DIR__ . '/../data/stats.json';
$stats    = file_exists($statsFile) ? (json_decode(file_get_contents($statsFile), true) ?? []) : [];
$packages = $stats['packages'] ?? [];
$ig       = $stats['instagram'] ?? [];
$tt       = $stats['tiktok']    ?? [];
$yt       = $stats['youtube']   ?? [];
$aud      = $stats['audience']  ?? [];
$ageRows  = $aud['age']       ?? [['label'=>'18–24','pct'=>35],['label'=>'25–34','pct'=>42],['label'=>'35–44','pct'=>16],['label'=>'45+','pct'=>7]];
$locRows  = $aud['locations'] ?? [['label'=>'Lithuania','pct'=>45],['label'=>'Latvia','pct'=>12],['label'=>'Estonia','pct'=>8],['label'=>'UK','pct'=>7],['label'=>'Other','pct'=>28]];
$genderF  = $aud['gender_female'] ?? 75;
$genderM  = $aud['gender_male']   ?? 25;
function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Kit — Inidė Jasnauskaitė</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ig: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
      --dark: #0a0a0a; --text: #262626; --text2: #737373;
      --bg: #FAFAFA; --white: #fff; --border: #DBDBDB;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    /* Top bar */
    .topbar {
      background: var(--dark); padding: 14px 40px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .topbar__logo { font-family: 'Playfair Display', serif; font-size: 18px; color: #fff; }
    .topbar__right { display: flex; align-items: center; gap: 16px; }
    .topbar__badge {
      padding: 4px 12px; border: 1px solid rgba(255,255,255,.2);
      border-radius: 999px; font-size: 12px; color: rgba(255,255,255,.6);
      display: flex; align-items: center; gap: 6px;
    }
    .topbar__badge span { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; flex-shrink: 0; }
    .logout {
      font-size: 12px; color: rgba(255,255,255,.45);
      display: flex; align-items: center; gap: 5px; transition: color .2s;
    }
    .logout:hover { color: #fff; }

    /* Hero */
    .hero {
      background: var(--dark); padding: 60px 40px 80px;
      text-align: center; position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: var(--ig); opacity: .07; pointer-events: none;
    }
    .hero__badge {
      display: inline-block; font-size: 11px; font-weight: 700;
      letter-spacing: 2px; text-transform: uppercase;
      background: var(--ig); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; background-clip: text;
      margin-bottom: 14px;
    }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: 36px; color: #fff; margin-bottom: 10px; }
    .hero p { font-size: 15px; color: rgba(255,255,255,.55); max-width: 480px; margin: 0 auto; }

    /* Container */
    .wrap { max-width: 1100px; margin: 0 auto; padding: 60px 40px; }
    .section { margin-bottom: 64px; }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 24px;
      padding-bottom: 12px; border-bottom: 2px solid var(--border);
      display: flex; align-items: center; gap: 12px;
    }
    .section-title i { background: var(--ig); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* Stats grid */
    .stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
    .stat-card {
      background: var(--white); border-radius: 16px;
      padding: 24px; border: 1px solid var(--border);
      text-align: center; transition: box-shadow .2s;
    }
    .stat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .stat-card__icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--ig); display: flex; align-items: center;
      justify-content: center; margin: 0 auto 14px; font-size: 18px; color: #fff;
    }
    .stat-card__num { font-size: 28px; font-weight: 700; color: var(--text); }
    .stat-card__label { font-size: 13px; color: var(--text2); margin-top: 4px; }
    .stat-card__sub { font-size: 12px; color: #bc1888; font-weight: 600; margin-top: 6px; }

    /* Platform row */
    .platforms { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
    .platform {
      background: var(--white); border-radius: 14px; padding: 20px;
      border: 1px solid var(--border); display: flex; align-items: center; gap: 16px;
    }
    .platform__icon { font-size: 28px; flex-shrink: 0; }
    .platform__icon.ig { background: var(--ig); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .platform__icon.tt { color: #000; }
    .platform__icon.yt { color: #FF0000; }
    .platform__name { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 1px; }
    .platform__val { font-size: 22px; font-weight: 700; color: var(--text); }
    .platform__er { font-size: 12px; color: var(--text2); margin-top: 2px; }

    /* Audience */
    .audience { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .aud-card { background: var(--white); border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
    .aud-card h4 { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 16px; }
    .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .bar-row__label { font-size: 13px; color: var(--text2); width: 80px; flex-shrink: 0; }
    .bar-row__bar { flex: 1; height: 7px; background: #f0f0f0; border-radius: 99px; overflow: hidden; }
    .bar-row__fill { height: 100%; border-radius: 99px; background: var(--ig); }
    .bar-row__pct { font-size: 12px; font-weight: 600; color: var(--text); width: 36px; text-align: right; flex-shrink: 0; }

    /* Pricing */
    .pricing { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
    .price-card {
      background: var(--white); border-radius: 16px;
      padding: 28px 22px; border: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 16px;
      transition: transform .2s, box-shadow .2s;
    }
    .price-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,.1); }
    .price-card--featured {
      background: var(--dark); border-color: transparent;
      box-shadow: 0 8px 32px rgba(0,0,0,.2);
    }
    .price-card__tag {
      font-size: 10px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: var(--text2);
    }
    .price-card--featured .price-card__tag { color: rgba(255,255,255,.5); }
    .price-card__name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); }
    .price-card--featured .price-card__name { color: #fff; }
    .price-card__price {
      font-size: 32px; font-weight: 700;
      background: var(--ig); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; background-clip: text;
    }
    .price-card__period { font-size: 13px; color: var(--text2); margin-top: -8px; }
    .price-card--featured .price-card__period { color: rgba(255,255,255,.5); }
    .price-card__items { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
    .price-card__items li { font-size: 13px; color: var(--text2); display: flex; align-items: center; gap: 8px; }
    .price-card--featured .price-card__items li { color: rgba(255,255,255,.6); }
    .price-card__items li i { color: #bc1888; font-size: 11px; }
    .price-card__note { font-size: 12px; color: var(--text2); font-style: italic; margin-top: 4px; }
    .price-card--featured .price-card__note { color: rgba(255,255,255,.4); }

    /* CTA */
    .cta {
      background: var(--dark); border-radius: 20px;
      padding: 48px; text-align: center;
      position: relative; overflow: hidden;
    }
    .cta::before {
      content: ''; position: absolute; inset: 0;
      background: var(--ig); opacity: .08; pointer-events: none;
    }
    .cta h3 { font-family: 'Playfair Display', serif; font-size: 28px; color: #fff; margin-bottom: 10px; position: relative; }
    .cta p { color: rgba(255,255,255,.55); margin-bottom: 24px; position: relative; }
    .btn-cta {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 13px 28px; background: var(--ig);
      color: #fff; border-radius: 999px; font-size: 15px; font-weight: 600;
      transition: opacity .2s, transform .2s;
      position: relative;
    }
    .btn-cta:hover { opacity: .9; transform: translateY(-2px); }

    /* Note */
    .confidential {
      text-align: center; font-size: 12px; color: #aaa;
      margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .stats, .platforms, .pricing { grid-template-columns: 1fr; }
      .audience { grid-template-columns: 1fr; }
      .wrap { padding: 40px 20px; }
      .topbar { padding: 12px 20px; }
    }

    /* Print button */
    .print-btn {
      display: flex; align-items: center; gap: 7px;
      padding: 7px 16px; background: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.2); border-radius: 999px;
      font-size: 12px; font-weight: 600; color: rgba(255,255,255,.8);
      cursor: pointer; transition: all .2s; font-family: 'Inter', sans-serif;
    }
    .print-btn:hover { background: rgba(255,255,255,.2); color: #fff; }

    /* Print / PDF styles */
    @media print {
      .no-print { display: none !important; }
      body { background: #fff; }
      .topbar { background: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .hero  { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-after: avoid; }
      .section { page-break-inside: avoid; }
      .price-card { page-break-inside: avoid; }
      .aud-card   { page-break-inside: avoid; }
      .cta { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; }
      .stat-card__icon { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .bar-row__fill   { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      a.btn-cta::after { content: " (" attr(href) ")"; font-size: 12px; }
      .price-card--featured { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

  <!-- Top bar -->
  <div class="topbar">
    <div class="topbar__logo">INIDĖ JASNAUSKAITĖ</div>
    <div class="topbar__right">
      <div class="topbar__badge"><span></span> Confidential</div>
      <button class="print-btn no-print" onclick="window.print()"><i class="fas fa-print"></i> Save as PDF</button>
      <a href="logout.php" class="logout no-print"><i class="fas fa-arrow-right-from-bracket"></i> Logout</a>
    </div>
  </div>

  <!-- Hero -->
  <div class="hero">
    <p class="hero__badge">Media Kit 2025</p>
    <h1>Inidė Jasnauskaitė</h1>
    <p>Fashion · Beauty · Travel Content Creator · @jasnauskaite</p>
  </div>

  <div class="wrap">

    <!-- ===== PLATFORM STATS ===== -->
    <div class="section">
      <h2 class="section-title"><i class="fas fa-chart-bar"></i> Platform Overview</h2>
      <div class="platforms">
        <div class="platform">
          <i class="fab fa-instagram platform__icon ig"></i>
          <div>
            <div class="platform__name">Instagram</div>
            <div class="platform__val"><?= e($ig['followers'] ?? '—') ?></div>
            <div class="platform__er">Avg. ER: <?= e($ig['er'] ?? '—') ?> &nbsp;|&nbsp; Avg. Reach: <?= e($ig['avg_reach'] ?? '—') ?></div>
          </div>
        </div>
        <div class="platform">
          <i class="fab fa-tiktok platform__icon tt"></i>
          <div>
            <div class="platform__name">TikTok</div>
            <div class="platform__val"><?= e($tt['followers'] ?? '—') ?></div>
            <div class="platform__er">Avg. Views: <?= e($tt['avg_views'] ?? '—') ?></div>
          </div>
        </div>
        <div class="platform">
          <i class="fab fa-youtube platform__icon yt"></i>
          <div>
            <div class="platform__name">YouTube</div>
            <div class="platform__val"><?= e($yt['subscribers'] ?? '—') ?></div>
            <div class="platform__er">Subscribers</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== KEY METRICS ===== -->
    <div class="section">
      <h2 class="section-title"><i class="fas fa-bolt"></i> Key Metrics (Instagram)</h2>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-users"></i></div>
          <div class="stat-card__num"><?= e($ig['followers'] ?? '—') ?></div>
          <div class="stat-card__label">Total Followers</div>
          <div class="stat-card__sub">↑ Growing monthly</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-heart"></i></div>
          <div class="stat-card__num"><?= e($ig['er'] ?? '—') ?></div>
          <div class="stat-card__label">Avg. Engagement Rate</div>
          <div class="stat-card__sub">Per post average</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-eye"></i></div>
          <div class="stat-card__num"><?= e($ig['avg_reach'] ?? '—') ?></div>
          <div class="stat-card__label">Avg. Post Reach</div>
          <div class="stat-card__sub">Last 30 days</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-play"></i></div>
          <div class="stat-card__num"><?= e($ig['avg_reel_views'] ?? '—') ?></div>
          <div class="stat-card__label">Avg. Reel Views</div>
          <div class="stat-card__sub">Per reel</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-circle-dot"></i></div>
          <div class="stat-card__num"><?= e($ig['story_view_rate'] ?? '—') ?></div>
          <div class="stat-card__label">Story View Rate</div>
          <div class="stat-card__sub">Avg. completion</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon"><i class="fas fa-share-nodes"></i></div>
          <div class="stat-card__num"><?= e($ig['avg_impressions'] ?? '—') ?></div>
          <div class="stat-card__label">Avg. Impressions</div>
          <div class="stat-card__sub">Per post</div>
        </div>
      </div>
    </div>

    <!-- ===== AUDIENCE ===== -->
    <div class="section">
      <h2 class="section-title"><i class="fas fa-users"></i> Audience Demographics</h2>
      <div class="audience">
        <div class="aud-card">
          <h4>Age Distribution</h4>
          <?php foreach ($ageRows as $r): ?>
          <div class="bar-row">
            <div class="bar-row__label"><?= e($r['label']) ?></div>
            <div class="bar-row__bar"><div class="bar-row__fill" style="width:<?= (int)($r['pct'] ?? 0) ?>%"></div></div>
            <div class="bar-row__pct"><?= (int)($r['pct'] ?? 0) ?>%</div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="aud-card">
          <h4>Top Locations</h4>
          <?php foreach ($locRows as $r): ?>
          <div class="bar-row">
            <div class="bar-row__label"><?= e($r['label']) ?></div>
            <div class="bar-row__bar"><div class="bar-row__fill" style="width:<?= (int)($r['pct'] ?? 0) ?>%"></div></div>
            <div class="bar-row__pct"><?= (int)($r['pct'] ?? 0) ?>%</div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="aud-card">
          <h4>Gender Split</h4>
          <div class="bar-row"><div class="bar-row__label">Female</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:<?= $genderF ?>%"></div></div><div class="bar-row__pct"><?= $genderF ?>%</div></div>
          <div class="bar-row"><div class="bar-row__label">Male</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:<?= $genderM ?>%"></div></div><div class="bar-row__pct"><?= $genderM ?>%</div></div>
        </div>
        <div class="aud-card">
          <h4>Primary Interests</h4>
          <div class="bar-row"><div class="bar-row__label">Fashion</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:80%"></div></div><div class="bar-row__pct">80%</div></div>
          <div class="bar-row"><div class="bar-row__label">Beauty</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:65%"></div></div><div class="bar-row__pct">65%</div></div>
          <div class="bar-row"><div class="bar-row__label">Travel</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:55%"></div></div><div class="bar-row__pct">55%</div></div>
          <div class="bar-row"><div class="bar-row__label">Lifestyle</div><div class="bar-row__bar"><div class="bar-row__fill" style="width:70%"></div></div><div class="bar-row__pct">70%</div></div>
        </div>
      </div>
    </div>

    <!-- ===== HOW WE WORK ===== -->
    <div class="section">
      <h2 class="section-title"><i class="fas fa-lightbulb"></i> How We Work</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
        <div style="background:#fff;border-radius:14px;padding:22px;border:1px solid #DBDBDB">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-palette" style="color:#fff;font-size:14px"></i></div>
            <strong style="font-size:14px">Creative Freedom</strong>
          </div>
          <p style="font-size:13px;color:#737373;line-height:1.65">We appreciate guidelines but suggest keeping them minimal — the best results come when we have creative freedom. We create ads that feel organic and engaging, not like TV commercials.</p>
        </div>
        <div style="background:#fff;border-radius:14px;padding:22px;border:1px solid #DBDBDB">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-euro-sign" style="color:#fff;font-size:14px"></i></div>
            <strong style="font-size:14px">Payment Terms</strong>
          </div>
          <p style="font-size:13px;color:#737373;line-height:1.65">For smaller projects: 100% upfront. For larger campaigns: 50% upfront, 50% after content is published.</p>
        </div>
        <div style="background:#fff;border-radius:14px;padding:22px;border:1px solid #DBDBDB">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-clock" style="color:#fff;font-size:14px"></i></div>
            <strong style="font-size:14px">Production Timeline</strong>
          </div>
          <p style="font-size:13px;color:#737373;line-height:1.65">Stories & feed posts: ~2 weeks. Reels: 1–2 months depending on required props and concept complexity.</p>
        </div>
        <div style="background:#fff;border-radius:14px;padding:22px;border:1px solid #DBDBDB">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(45deg,#f09433,#bc1888);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-calendar" style="color:#fff;font-size:14px"></i></div>
            <strong style="font-size:14px">Publication Flexibility</strong>
          </div>
          <p style="font-size:13px;color:#737373;line-height:1.65">In creative work, flexibility with dates ensures the best results. We strive to find optimal conditions, which may lead to slight schedule adjustments.</p>
        </div>
      </div>
    </div>

    <!-- ===== PRICING ===== -->
    <div class="section">
      <h2 class="section-title"><i class="fas fa-tags"></i> Rate Card</h2>
      <p style="font-size:14px;color:#737373;margin-bottom:24px;max-width:600px">We typically customise offers based on each campaign's specifics. Below are our standard packages — all prices are <strong>+ VAT</strong>. We highly recommend starting with a Story Package as they often drive the most direct sales.</p>
      <div class="pricing" style="grid-template-columns:repeat(4,1fr)">
        <?php foreach ($packages as $pk):
          $feat = !empty($pk['featured']);
        ?>
        <div class="price-card <?= $feat ? 'price-card--featured' : '' ?>">
          <div class="price-card__tag"><?= e($pk['tag'] ?? '') ?></div>
          <div class="price-card__name"><?= e($pk['name'] ?? '') ?></div>
          <div class="price-card__price"><?= e($pk['price'] ?? '') ?></div>
          <div class="price-card__period"><?= e(($pk['vat'] ?? '') . ' · ' . ($pk['period'] ?? '')) ?></div>
          <ul class="price-card__items">
            <?php foreach (($pk['items'] ?? []) as $item): ?>
              <li>
                <i class="fas <?= str_starts_with($item, 'Optional:') ? 'fa-plus' : 'fa-check' ?>"></i>
                <?= e($item) ?>
              </li>
            <?php endforeach; ?>
          </ul>
          <?php if (!empty($pk['note'])): ?>
            <p class="price-card__note"><?= e($pk['note']) ?></p>
          <?php endif; ?>
        </div>
        <?php endforeach; ?>
      </div>
      <p style="font-size:12px;color:#8E8E8E;margin-top:20px;text-align:center">
        All prices + VAT. Final pricing may vary based on campaign scope, exclusivity and timeline. Custom packages available on request.
      </p>
    </div>

    <!-- ===== CTA ===== -->
    <div class="cta">
      <h3>Ready to collaborate?</h3>
      <p>Let's create something meaningful together. Reach out and we'll find the perfect fit for your brand.</p>
      <a href="mailto:team@reelize.lt" class="btn-cta"><i class="fas fa-envelope"></i> team@reelize.lt</a>
    </div>

    <p class="confidential">
      <i class="fas fa-lock"></i>
      This media kit is confidential and intended solely for the recipient. Please do not share or distribute.
    </p>
  </div>

</body>
</html>
