/* ============================================================
   JASNAUSKAITE.LT — JavaScript
   ============================================================ */

// --- Navigation ---
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

function updateActiveNav() {
  const pos = window.scrollY + 100;
  sections.forEach(sec => {
    if (sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
      const id = sec.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

// --- Scroll animations (IntersectionObserver) ---
const animEls = document.querySelectorAll('.animate');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
animEls.forEach(el => io.observe(el));

// --- Portfolio filter ---
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hide', !show);
    });
  });
});

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// --- AJAX form helper ---
async function submitForm(form, submitBtn, originalLabel, onSuccess) {
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
    const data = await res.json();
    if (data.success) {
      onSuccess();
    } else {
      alert(data.message || 'Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  } catch {
    alert('Network error. Please try again or email team@reelize.lt directly.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
  }
}

// --- Collaboration form ---
const collabForm = document.getElementById('collabForm');
const collabSuccess = document.getElementById('collabSuccess');
if (collabForm) {
  collabForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('collabSubmit');
    submitForm(collabForm, btn, '<i class="fas fa-paper-plane"></i> Send Enquiry', () => {
      collabForm.style.display = 'none';
      collabSuccess.style.display = 'flex';
    });
  });
}

// --- Budget calculator ---
const CONTENT_MINS = {
  'Stories': 1500, 'Simple Post': 1500, 'Complex Post': 3000,
  'Simple Reel': 4000, 'Complex Reel': 5000, 'Pro Production': 10000,
  'TikTok': 1200, 'Event': 2000,
};
const PERIOD_MONTHS = { 'one-time': 1, '3months': 3, '6months': 6, 'ambassador': 12 };
const BUDGET_BASE_MAX = 30000;

// Stories = recurring monthly cost throughout the campaign (× months)
// All other content types = one-time production cost (regardless of period length)
// TikTok = one-time additive cost, same as other packages

function updateBudget() {
  const slider = document.getElementById('budgetSlider');
  if (!slider) return;

  const checked = [...document.querySelectorAll('input[name="project_type[]"]:checked')]
    .map(el => el.value);
  const periodEl = document.querySelector('input[name="period"]:checked');
  const months = PERIOD_MONTHS[periodEl ? periodEl.value : 'one-time'] || 1;

  let minBudget = 0;

  if (checked.length === 0) {
    minBudget = 1500 * months; // baseline: at least one Stories package per month
  } else {
    checked.forEach(v => {
      if (v === 'Stories') {
        // Monthly recurring — scales with campaign duration
        minBudget += CONTENT_MINS['Stories'] * months;
      } else {
        // All other types: one-time production cost
        minBudget += CONTENT_MINS[v] || 1500;
      }
    });
  }

  const maxBudget = Math.max(BUDGET_BASE_MAX * months, minBudget + 5000);

  slider.min = minBudget;
  slider.max = maxBudget;
  slider.step = months > 1 ? 1000 : 500;
  slider.value = minBudget; // always reset to new min on selection change

  renderBudget();
}

function renderBudget() {
  const slider = document.getElementById('budgetSlider');
  if (!slider) return;

  const val = parseInt(slider.value);
  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const pct = Math.round(((val - min) / (max - min)) * 100);

  slider.style.background =
    `linear-gradient(to right, #f09433, #bc1888 ${pct}%, #DBDBDB ${pct}%)`;

  const fmt = n => '€' + n.toLocaleString('en');
  const atMax = val >= max;

  const display   = document.getElementById('budgetDisplay');
  const hidden    = document.getElementById('budgetHidden');
  const hint      = document.getElementById('budgetHint');
  const labelMin  = document.getElementById('budgetLabelMin');
  const labelMax  = document.getElementById('budgetLabelMax');

  if (display)  display.textContent  = fmt(val) + (atMax ? '+' : '');
  if (hidden)   hidden.value         = fmt(val) + (atMax ? '+' : '');
  if (labelMin) labelMin.textContent = fmt(min);
  if (labelMax) labelMax.textContent = fmt(max) + '+';

  if (hint) {
    const checked = [...document.querySelectorAll('input[name="project_type[]"]:checked')]
      .map(el => el.value);
    const periodEl = document.querySelector('input[name="period"]:checked');
    const months = PERIOD_MONTHS[periodEl ? periodEl.value : 'one-time'] || 1;

    const hasStories = checked.includes('Stories');
    const hasOther   = checked.some(v => v !== 'Stories');

    let hintText = '';
    if (checked.length === 0) {
      hintText = 'select content type above';
    } else if (hasStories && hasOther) {
      // Stories monthly + one-time packages
      hintText = months > 1
        ? `€1,500/mo × ${months} + one-time production`
        : 'stories + one-time production';
    } else if (hasStories) {
      // Stories only
      hintText = months > 1
        ? '€1,500 / month'
        : 'one-time stories package';
    } else {
      // Packages only, no Stories
      hintText = 'one-time production fee';
    }

    hint.textContent = hintText;
  }
}

const budgetSlider = document.getElementById('budgetSlider');
if (budgetSlider) {
  budgetSlider.addEventListener('input', renderBudget);
  document.querySelectorAll('input[name="project_type[]"]').forEach(el =>
    el.addEventListener('change', updateBudget)
  );
  document.querySelectorAll('input[name="period"]').forEach(el =>
    el.addEventListener('change', updateBudget)
  );
  updateBudget(); // initialise on load
}

// Pass estimated budget + selections into the form when using the estimator CTA
const estimatorCta = document.getElementById('estimatorCta');
if (estimatorCta) {
  estimatorCta.addEventListener('click', () => {
    const budgetVal  = document.getElementById('budgetDisplay')?.textContent;
    const formBudget = document.getElementById('formBudgetNote');
    if (budgetVal && formBudget) formBudget.value = budgetVal;
  });
}

// --- Modal ---
const modal = document.getElementById('modal');
const requestBtn = document.getElementById('requestBtn');
const modalBg = document.getElementById('modalBg');
const modalClose = document.getElementById('modalClose');
const accessForm = document.getElementById('accessForm');
const modalSuccess = document.getElementById('modalSuccess');

function openModal() { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }

if (requestBtn) requestBtn.addEventListener('click', openModal);
if (modalBg) modalBg.addEventListener('click', closeModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

if (accessForm) {
  accessForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('accessSubmit');
    submitForm(accessForm, btn, 'Submit Request', () => {
      accessForm.style.display = 'none';
      modalSuccess.style.display = 'flex';
    });
  });
}
