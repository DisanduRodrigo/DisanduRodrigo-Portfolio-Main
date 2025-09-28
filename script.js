// script.js - theme toggle with banner + mobile menu + smooth scroll + animations

// Constants
const THEME_KEY = 'preferred-theme';
const BANNER_KEY = 'theme-banner-dismissed';

// Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const header = document.querySelector('header');
const banner = document.getElementById('theme-banner');
const bannerEnable = document.getElementById('banner-enable');
const bannerDismiss = document.getElementById('banner-dismiss');

// --- THEME HANDLING -----------------------------------------------------
function applyTheme(theme) {
  if (!theme) return;
  document.documentElement.setAttribute('data-theme', theme);
  // update button state & icon
  if (themeToggleBtn) {
    const pressed = theme === 'dark';
    themeToggleBtn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    themeToggleBtn.innerHTML = pressed ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeToggleBtn.title = pressed ? 'Switch to light theme' : 'Switch to dark theme';
  }
  // animate banner (if visible)
  if (banner && !banner.hidden) {
    banner.style.opacity = '1';
    banner.style.transform = 'translateY(0)';
  }
}

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

(function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    const chosen = saved || getSystemTheme();
    applyTheme(chosen);
  } catch (e) {
    applyTheme(getSystemTheme());
  }
})();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  });
}

// respond to OS preference changes only if user didn't choose
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) {
    mq.addEventListener('change', (e) => {
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (!saved) applyTheme(e.matches ? 'dark' : 'light');
      } catch (err) {}
    });
  } else if (mq.addListener) {
    mq.addListener((e) => {
      try {
        const saved = localStorage.getItem(THEME_KEY);
        if (!saved) applyTheme(e.matches ? 'dark' : 'light');
      } catch (err) {}
    });
  }
}

// --- THEME BANNER (cookie-like) ----------------------------------------
function showBannerIfNeeded() {
  try {
    const dismissed = localStorage.getItem(BANNER_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);
    // show banner only if not dismissed and user hasn't explicitly chosen a theme
    if (!dismissed && !savedTheme && banner) {
      banner.hidden = false;
      // small entry animation
      setTimeout(() => {
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
      }, 60);
    }
  } catch (e) {}
}

if (bannerEnable) {
  bannerEnable.addEventListener('click', () => {
    applyTheme('dark');
    try { localStorage.setItem(THEME_KEY, 'dark'); localStorage.setItem(BANNER_KEY, '1'); } catch (e) {}
    if (banner) banner.hidden = true;
  });
}
if (bannerDismiss) {
  bannerDismiss.addEventListener('click', () => {
    try { localStorage.setItem(BANNER_KEY, '1'); } catch (e) {}
    if (banner) banner.hidden = true;
  });
}

// run banner logic after small delay so it doesn't pop immediately
window.addEventListener('load', () => {
  setTimeout(showBannerIfNeeded, 700);
});

// --- MOBILE MENU --------------------------------------------------------
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    navLinks.classList.toggle('active');
  });
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => { if (navLinks) { navLinks.classList.remove('active'); if (menuToggle) menuToggle.setAttribute('aria-expanded','false'); } });
});

// --- CONTACT FORM ------------------------------------------------------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

// --- SMOOTH SCROLL -----------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // offset for fixed header
      const offset = Math.max(70, document.querySelector('header').offsetHeight || 70);
      const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- HEADER SCROLL STYLING ---------------------------------------------
function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled');
}
window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('load', handleHeaderScroll);

// --- SIMPLE SCROLL ANIMATION -------------------------------------------
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
}
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.skill-level, .project-card, .timeline-content, [data-animate]');
  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('visible');
    }
  });
}
// prepare animated elements
document.querySelectorAll('.skill-level, .project-card, .timeline-content').forEach(el => {
  el.setAttribute('data-animate', '');
});
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
orEach(el => {
  el.setAttribute('data-animate', '');
});
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
orEach(el => {
  el.setAttribute('data-animate', '');
});
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
