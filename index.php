<?php
// Load content from JSON data files
$data_dir = __DIR__ . '/data/';
function load(string $file, string $dir): array {
    $path = $dir . $file . '.json';
    if (!file_exists($path)) return [];
    return json_decode(file_get_contents($path), true) ?? [];
}
$links    = load('links',    $data_dir)['buttons']  ?? [];
$texts    = load('texts',    $data_dir);
$projects = load('projects', $data_dir)['projects'] ?? [];
$hero     = $texts['hero']  ?? [];
$about    = $texts['about'] ?? [];
$collab   = $texts['collab'] ?? [];

// Gradient classes for project cards
$grads = ['p-grad-1','p-grad-2','p-grad-3','p-grad-4','p-grad-5','p-grad-6'];
$gi = 0;

function e(string $s): string { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?= e($hero['name'] ?? 'Inidė Jasnauskaitė') ?> — Fashion, Beauty &amp; Travel Content Creator. Available for brand collaborations.">
  <title><?= e($hero['name'] ?? 'Inidė Jasnauskaitė') ?> — Content Creator</title>

  <!-- Open Graph -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://jasnauskaite.lt/">
  <meta property="og:title"       content="<?= e($hero['name'] ?? 'INIDĖ JASNAUSKAITĖ') ?> — Fashion · Beauty · Travel">
  <meta property="og:description" content="Content creator with <?= e($hero['followers'] ?? '354K+') ?> Instagram followers. <?= e($hero['niche'] ?? 'Fashion, Beauty & Travel') ?>. Available for brand collaborations.">
  <meta property="og:image"       content="https://jasnauskaite.lt/images/og-image.jpg">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale"      content="lt_LT">
  <meta property="og:site_name"   content="<?= e($hero['name'] ?? 'Inidė Jasnauskaitė') ?>">
  <!-- Twitter / X Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:site"        content="<?= e($hero['handle'] ?? '@jasnauskaite') ?>">
  <meta name="twitter:title"       content="<?= e($hero['name'] ?? 'INIDĖ JASNAUSKAITĖ') ?> — Fashion · Beauty · Travel">
  <meta name="twitter:description" content="Content creator with <?= e($hero['followers'] ?? '354K+') ?> Instagram followers. Available for brand collaborations.">
  <meta name="twitter:image"       content="https://jasnauskaite.lt/images/og-image.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://jasnauskaite.lt/">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- NAV -->
  <nav class="nav" id="nav">
    <div class="nav__container">
      <a href="#hero" class="nav__logo"><?= e(explode(' ', $hero['name'] ?? 'INIDĖ')[0]) ?></a>
      <ul class="nav__links" id="navLinks">
        <li><a href="#about"      class="nav__link">About</a></li>
        <li><a href="#portfolio"  class="nav__link">Portfolio</a></li>
        <li><a href="#feed"       class="nav__link">Feed</a></li>
        <li><a href="#collaborate" class="nav__link">Collaborate</a></li>
        <li><a href="media-kit/index.php"  class="nav__link nav__link--kit"><i class="fas fa-lock"></i> Media Kit</a></li>
      </ul>
      <button class="nav__burger" id="navBurger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero__bg-orb hero__bg-orb--1"></div>
    <div class="hero__bg-orb hero__bg-orb--2"></div>
    <div class="hero__container">

      <div class="hero__profile animate">
        <div class="hero__avatar-ring">
          <div class="hero__avatar">
            <?php if (file_exists(__DIR__ . '/images/profile.jpg')): ?>
              <img src="images/profile.jpg" alt="<?= e($hero['name'] ?? '') ?>">
            <?php else: ?>
              <div class="hero__avatar-initials">IJ</div>
            <?php endif; ?>
          </div>
        </div>
        <h1 class="hero__name"><?= e($hero['name'] ?? 'Inidė Jasnauskaitė') ?></h1>
        <div class="hero__verified"><i class="fas fa-circle-check"></i><span>Verified Creator</span></div>
        <p class="hero__handle"><?= e($hero['handle'] ?? '@jasnauskaite') ?></p>
        <p class="hero__niche"><?= e($hero['niche'] ?? 'Fashion · Beauty · Travel') ?></p>
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-num"><?= e($hero['followers'] ?? '354K') ?></span>
            <span class="hero__stat-label">Followers</span>
          </div>
          <div class="hero__stat-div"></div>
          <div class="hero__stat">
            <span class="hero__stat-num"><?= e($hero['posts'] ?? '2.5K') ?></span>
            <span class="hero__stat-label">Posts</span>
          </div>
          <div class="hero__stat-div"></div>
          <div class="hero__stat">
            <span class="hero__stat-num"><?= e($hero['er'] ?? '5%+') ?></span>
            <span class="hero__stat-label">Avg. ER</span>
          </div>
        </div>
      </div>

      <!-- Dynamic link buttons -->
      <div class="links animate animate-delay-1">
        <?php foreach ($links as $btn): if (!($btn['active'] ?? true)) continue; ?>
          <?php
            $isInternal = str_starts_with($btn['url'] ?? '', '#');
            $isMail     = str_starts_with($btn['url'] ?? '', 'mailto:');
            $target     = ($isInternal || $isMail) ? '' : ' target="_blank" rel="noopener"';
            $style      = e($btn['style'] ?? 'collab');
          ?>
          <a href="<?= e($btn['url'] ?? '#') ?>"<?= $target ?> class="link-btn link-btn--<?= $style ?>">
            <i class="<?= e($btn['icon'] ?? 'fas fa-link') ?>"></i>
            <span><?= e($btn['label'] ?? '') ?></span>
            <i class="fas fa-arrow-right link-btn__arr"></i>
          </a>
        <?php endforeach; ?>
      </div>

      <a href="#about" class="hero__scroll animate animate-delay-2">
        <i class="fas fa-chevron-down"></i>
      </a>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about section" id="about">
    <div class="container">
      <div class="about__grid">
        <div class="about__img animate">
          <div class="about__img-frame">
            <?php if (file_exists(__DIR__ . '/images/about.jpg')): ?>
              <img src="images/about.jpg" alt="<?= e($hero['name'] ?? '') ?>">
            <?php else: ?>
              <div class="about__img-placeholder"></div>
            <?php endif; ?>
          </div>
          <div class="about__img-tag"><i class="fas fa-camera"></i> Content Creator</div>
        </div>
        <div class="about__content animate animate-delay-1">
          <span class="badge">About Me</span>
          <h2 class="section-title"><?= nl2br(e($about['title'] ?? 'Fashion lover,\nstoryteller & dreamer')) ?></h2>
          <p class="about__text"><?= e($about['text1'] ?? '') ?></p>
          <p class="about__text"><?= e($about['text2'] ?? '') ?></p>
          <div class="tags">
            <?php foreach (($about['tags'] ?? []) as $tag): ?>
              <span class="tag"><?= e($tag) ?></span>
            <?php endforeach; ?>
          </div>
          <a href="#collaborate" class="btn btn--grad">Work With Me</a>
        </div>
      </div>
    </div>
  </section>

  <!-- PORTFOLIO -->
  <section class="portfolio section" id="portfolio">
    <div class="container">
      <div class="section-header animate">
        <span class="badge">Portfolio</span>
        <h2 class="section-title">Featured Collaborations</h2>
        <p class="section-sub">A selection of my favourite brand partnerships and campaigns</p>
      </div>
      <div class="portfolio__filters animate">
        <button class="filter active" data-filter="all">All</button>
        <button class="filter" data-filter="fashion">Fashion</button>
        <button class="filter" data-filter="beauty">Beauty</button>
        <button class="filter" data-filter="travel">Travel</button>
        <button class="filter" data-filter="lifestyle">Lifestyle</button>
      </div>
      <div class="portfolio__grid" id="portfolioGrid">
        <?php foreach ($projects as $p): if (!($p['active'] ?? true)) continue;
          $grad = $grads[$gi % count($grads)]; $gi++;
          $hasImg = !empty($p['image']) && file_exists(__DIR__ . '/images/projects/' . $p['image']);
          $hasBrandImg = !empty($p['brand_logo']) && file_exists(__DIR__ . '/images/brands/' . $p['brand_logo']);
        ?>
        <article class="project-card animate" data-cat="<?= e($p['category'] ?? 'lifestyle') ?>">
          <div class="project-card__img <?= $hasImg ? '' : $grad ?>">
            <?php if ($hasImg): ?>
              <img src="images/projects/<?= e($p['image']) ?>" alt="<?= e($p['title']) ?>">
            <?php endif; ?>
            <span class="project-card__cat"><?= e(ucfirst($p['category'] ?? '')) ?></span>
          </div>
          <div class="project-card__body">
            <div class="project-card__brand">
              <?php if ($hasBrandImg): ?>
                <img src="images/brands/<?= e($p['brand_logo']) ?>" alt="<?= e($p['brand']) ?>">
              <?php else: ?>
                <?= e($p['brand'] ?? 'BRAND') ?>
              <?php endif; ?>
            </div>
            <h3 class="project-card__title"><?= e($p['title'] ?? '') ?></h3>
            <p class="project-card__desc"><?= e($p['description'] ?? '') ?></p>
            <div class="project-card__metrics">
              <span><i class="<?= e($p['metric1_icon'] ?? 'fas fa-eye') ?>"></i> <?= e($p['metric1_value'] ?? '') ?></span>
              <span><i class="<?= e($p['metric2_icon'] ?? 'fas fa-heart') ?>"></i> <?= e($p['metric2_value'] ?? '') ?></span>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- BRANDS -->
  <section class="brands section" id="brands">
    <div class="container">
      <div class="section-header animate">
        <span class="badge">Trusted By</span>
        <h2 class="section-title">Brands I've Worked With</h2>
      </div>
      <div class="brands__grid animate">
        <!-- Add brand logos in admin panel or edit data/brands.json -->
        <div class="brand-logo">BRAND 1</div>
        <div class="brand-logo">BRAND 2</div>
        <div class="brand-logo">BRAND 3</div>
        <div class="brand-logo">BRAND 4</div>
        <div class="brand-logo">BRAND 5</div>
        <div class="brand-logo">BRAND 6</div>
        <div class="brand-logo">BRAND 7</div>
        <div class="brand-logo">BRAND 8</div>
      </div>
    </div>
  </section>

  <!-- FEED -->
  <section class="feed section" id="feed">
    <div class="container">
      <div class="section-header animate">
        <span class="badge">Latest Content</span>
        <h2 class="section-title">Instagram Feed</h2>
        <p class="section-sub">Follow along for daily fashion, beauty and travel inspiration</p>
      </div>
      <div class="feed__placeholder animate">
        <i class="fab fa-instagram feed__icon"></i>
        <p>Instagram feed will appear here</p>
        <p class="feed__note">Sign up at <strong>behold.so</strong> → connect IG → paste widget code here</p>
      </div>
      <div class="feed__cta animate">
        <a href="https://www.instagram.com/<?= e(ltrim($hero['handle'] ?? '@jasnauskaite', '@')) ?>/" target="_blank" rel="noopener" class="btn btn--outline">
          <i class="fab fa-instagram"></i> Follow <?= e($hero['handle'] ?? '@jasnauskaite') ?>
        </a>
      </div>
    </div>
  </section>

  <!-- PRICING ESTIMATOR -->
  <section class="estimator section" id="estimator">
    <div class="container">
      <div class="estimator__head animate">
        <span class="badge">Pricing Guide</span>
        <h2 class="section-title">Build Your Package</h2>
        <p class="section-sub">Select content formats and campaign duration — see your estimated budget update instantly.</p>
      </div>
      <div class="estimator__card animate animate-delay-1">
        <div class="estimator__group">
          <label class="estimator__label">Content Type</label>
          <div class="checks">
            <label class="check"><input type="checkbox" name="project_type[]" value="Stories"><span><i class="fas fa-circle-dot"></i> Stories</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Simple Post"><span><i class="fas fa-image"></i> Simple Post</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Complex Post"><span><i class="fas fa-images"></i> Complex Post</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Simple Reel"><span><i class="fas fa-film"></i> Simple Reel</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Complex Reel"><span><i class="fas fa-clapperboard"></i> Complex Reel</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Pro Production"><span><i class="fas fa-video"></i> Pro Production</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="TikTok"><span><i class="fab fa-tiktok"></i> TikTok</span></label>
            <label class="check"><input type="checkbox" name="project_type[]" value="Event"><span><i class="fas fa-calendar-star"></i> Event</span></label>
          </div>
        </div>
        <div class="estimator__group">
          <label class="estimator__label">Campaign Duration</label>
          <div class="checks">
            <label class="check"><input type="radio" name="period" value="one-time" checked><span>One-time</span></label>
            <label class="check"><input type="radio" name="period" value="3months"><span>3 months</span></label>
            <label class="check"><input type="radio" name="period" value="6months"><span>6 months</span></label>
            <label class="check"><input type="radio" name="period" value="ambassador"><span><i class="fas fa-star"></i> Ambassador</span></label>
          </div>
        </div>
        <div class="estimator__budget">
          <div class="budget-wrap">
            <div class="budget-header">
              <span class="budget-amount" id="budgetDisplay">€1,500</span>
              <span class="budget-tag" id="budgetHint">select content type above</span>
            </div>
            <input type="range" id="budgetSlider" class="budget-slider" min="1500" max="30000" step="500" value="1500">
            <div class="budget-labels">
              <span id="budgetLabelMin">€1,500</span>
              <span id="budgetLabelMax">€30,000+</span>
            </div>
          </div>
        </div>
        <a href="#collaborate" class="btn btn--grad btn--full" id="estimatorCta">
          <i class="fas fa-paper-plane"></i> Sounds good? Let's talk →
        </a>
      </div>
    </div>
  </section>

  <!-- COLLABORATE -->
  <section class="collab section" id="collaborate">
    <div class="container">
      <div class="collab__grid">
        <div class="collab__info animate">
          <span class="badge">Let's Work Together</span>
          <h2 class="section-title"><?= e($collab['title'] ?? 'Start a Collaboration') ?></h2>
          <p class="collab__text"><?= e($collab['text'] ?? '') ?></p>
          <div class="collab__formats">
            <div class="collab__format"><div class="collab__format-icon"><i class="fas fa-film"></i></div><div><strong>Reels & Video</strong><p>Engaging short-form content</p></div></div>
            <div class="collab__format"><div class="collab__format-icon"><i class="fas fa-image"></i></div><div><strong>Feed Posts</strong><p>Curated photo & carousel posts</p></div></div>
            <div class="collab__format"><div class="collab__format-icon"><i class="fas fa-circle-dot"></i></div><div><strong>Stories</strong><p>Authentic 24h story series</p></div></div>
            <div class="collab__format"><div class="collab__format-icon"><i class="fas fa-star"></i></div><div><strong>Ambassador</strong><p>Long-term brand partnerships</p></div></div>
          </div>
          <a href="mailto:team@reelize.lt" class="collab__email"><i class="fas fa-envelope"></i> team@reelize.lt</a>
        </div>
        <div class="collab__form-wrap animate animate-delay-1">
          <form class="collab__form" id="collabForm" action="contact.php" method="POST">
            <input type="hidden" name="form_type" value="collaboration">
            <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
            <input type="hidden" name="budget_estimate" id="formBudgetNote" value="">
            <div class="form-row">
              <div class="form-group"><label for="brand_name">Brand / Company *</label><input type="text" id="brand_name" name="brand_name" required placeholder="e.g. Zara, L'Oréal…"></div>
              <div class="form-group"><label for="contact_person">Contact Person *</label><input type="text" id="contact_person" name="contact_person" required placeholder="Your full name"></div>
            </div>
            <div class="form-group"><label for="email">Business Email *</label><input type="email" id="email" name="email" required placeholder="marketing@brand.com"></div>
            <div class="form-group"><label for="message">Tell Me About Your Campaign *</label><textarea id="message" name="message" required rows="5" placeholder="Describe your brand, goals, preferred content formats and approximate budget…"></textarea></div>
            <button type="submit" class="btn btn--grad btn--full" id="collabSubmit"><i class="fas fa-paper-plane"></i> Send Enquiry</button>
            <p class="form-note">I respond within 48 hours on business days.</p>
          </form>
          <div class="form-success" id="collabSuccess"><i class="fas fa-circle-check"></i><h3>Thank you!</h3><p>Your enquiry has been received. I'll be in touch within 48 hours.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- MEDIA KIT TEASER -->
  <section class="mediakit section" id="media-kit">
    <div class="container">
      <div class="mediakit__wrap animate">
        <div class="mediakit__lock-icon"><i class="fas fa-lock"></i></div>
        <span class="badge badge--light">Exclusive Access</span>
        <h2 class="section-title section-title--light">Media Kit & Rate Card</h2>
        <p class="mediakit__text">Get access to my full media kit including detailed audience demographics, engagement analytics, content performance data and collaboration packages.</p>
        <div class="mediakit__pills">
          <span><i class="fas fa-users"></i> Audience Demographics</span>
          <span><i class="fas fa-chart-line"></i> Engagement Analytics</span>
          <span><i class="fas fa-tags"></i> Collaboration Packages</span>
          <span><i class="fas fa-file-invoice"></i> Rate Card</span>
        </div>
        <div class="mediakit__btns">
          <a href="media-kit/index.php" class="btn btn--grad"><i class="fas fa-key"></i> Access Media Kit</a>
          <button class="btn btn--outline-light" id="requestBtn"><i class="fas fa-envelope"></i> Request Access</button>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL -->
  <div class="modal" id="modal">
    <div class="modal__bg" id="modalBg"></div>
    <div class="modal__box">
      <button class="modal__close" id="modalClose"><i class="fas fa-times"></i></button>
      <h3 class="modal__title">Request Media Kit Access</h3>
      <p class="modal__sub">Submit your details and I'll review your request within 24 hours.</p>
      <form class="modal__form" id="accessForm" action="contact.php" method="POST">
        <input type="hidden" name="form_type" value="media_kit_request">
        <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
        <div class="form-group"><label for="req_name">Your Name *</label><input type="text" id="req_name" name="req_name" required placeholder="Full name"></div>
        <div class="form-group"><label for="req_company">Company / Brand *</label><input type="text" id="req_company" name="req_company" required placeholder="Company name"></div>
        <div class="form-group"><label for="req_email">Business Email *</label><input type="email" id="req_email" name="req_email" required placeholder="you@company.com"></div>
        <div class="form-group"><label for="req_msg">Brief Introduction</label><textarea id="req_msg" name="req_msg" rows="3" placeholder="Tell me briefly about your brand…"></textarea></div>
        <button type="submit" class="btn btn--grad btn--full" id="accessSubmit">Submit Request</button>
      </form>
      <div class="modal-success" id="modalSuccess"><i class="fas fa-circle-check"></i><p>Request sent! I'll review and get back to you within 24 hours.</p></div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <p class="footer__name"><?= e(strtoupper($hero['name'] ?? 'INIDĖ JASNAUSKAITĖ')) ?></p>
          <p class="footer__tagline"><?= e($hero['niche'] ?? 'Fashion · Beauty · Travel Creator') ?></p>
          <div class="footer__socials">
            <a href="https://www.instagram.com/jasnauskaite/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@jasnauskaite" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
            <a href="https://www.youtube.com/@jasnauskaite" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://www.threads.net/@jasnauskaite" target="_blank" rel="noopener" aria-label="Threads"><i class="fa-brands fa-threads"></i></a>
          </div>
        </div>
        <div class="footer__nav">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#feed">Instagram Feed</a></li>
            <li><a href="#collaborate">Collaborate</a></li>
            <li><a href="media-kit/index.php">Media Kit</a></li>
          </ul>
        </div>
        <div class="footer__contact">
          <h4>Contact</h4>
          <p><i class="fas fa-envelope"></i> <a href="mailto:team@reelize.lt">team@reelize.lt</a></p>
          <p class="footer__status"><span class="status-dot"></span> Available for collaborations</p>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; <?= date('Y') ?> <?= e($hero['name'] ?? 'Inidė Jasnauskaitė') ?>. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="js/script.js"></script>

  <!-- GDPR Cookie Consent Banner -->
  <div id="cookieBanner" style="display:none;position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0a0a0a;border-top:1px solid rgba(255,255,255,.1);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
    <p style="font-size:13px;color:rgba(255,255,255,.6);margin:0;flex:1;min-width:200px">
      🍪 This website uses cookies to ensure the best experience.
      <a href="/" style="color:#bc1888;text-decoration:underline">Learn more</a>
    </p>
    <div style="display:flex;gap:10px;flex-shrink:0">
      <button onclick="cookieConsent('decline')" style="padding:8px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.2);background:transparent;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">Decline</button>
      <button onclick="cookieConsent('accept')" style="padding:8px 18px;border-radius:99px;border:none;background:linear-gradient(45deg,#f09433,#bc1888);color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit">Accept</button>
    </div>
  </div>
  <script>
    (function() {
      var consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        var b = document.getElementById('cookieBanner');
        if (b) b.style.display = 'flex';
      }
    })();
    function cookieConsent(choice) {
      localStorage.setItem('cookie_consent', choice);
      var b = document.getElementById('cookieBanner');
      if (b) { b.style.transition = 'opacity .3s'; b.style.opacity = '0'; setTimeout(function(){ b.style.display = 'none'; }, 300); }
    }
  </script>
</body>
</html>
