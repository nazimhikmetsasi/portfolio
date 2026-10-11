document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Language toggle: English lives in the HTML, Turkish in data-tr attributes.
const translatable = [...document.querySelectorAll('[data-tr]')];
translatable.forEach(el => { el.dataset.en = el.innerHTML; });
const links = [...document.querySelectorAll('[data-tr-href]')];
links.forEach(a => { a.dataset.enHref = a.getAttribute('href'); });

function setLang(lang) {
  document.documentElement.lang = lang;
  translatable.forEach(el => { el.innerHTML = lang === 'tr' ? el.dataset.tr : el.dataset.en; });
  links.forEach(a => { a.href = lang === 'tr' ? a.dataset.trHref : a.dataset.enHref; });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  try { localStorage.setItem('lang', lang); } catch {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch {}
setLang(saved || (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en'));
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

// Project cards flip on click / Enter / Space; links inside cards keep working.
document.querySelectorAll('.project-card').forEach(card => {
  const flip = () => {
    const on = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(on));
  };
  card.addEventListener('click', e => { if (!e.target.closest('a')) flip(); });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });
});

// Mobile menu.
const menu = document.getElementById('menu');
const menuBtn = document.querySelector('.menu-btn');
const setMenu = open => { menu.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); };
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

// Scroll progress line.
const root = document.documentElement;
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    root.style.setProperty('--p', (scrollY / (root.scrollHeight - innerHeight || 1)).toFixed(4));
    ticking = false;
  });
}, { passive: true });

// Highlight the nav link of the section in view.
const navLinks = [...menu.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
}

// Reveal on scroll, plus count-up for plain-number stats.
const revealSel = '.section-head, .about-photo, .about > div, .project-card, .flip-hint, .others h3, .other-row, .exp-grid > *, .achievements p, .education, .skills-head > *, .skill-col, .contact h2, .contact-cards a, .now, .stat';
const items = [...document.querySelectorAll(revealSel)];
items.forEach(el => {
  el.classList.add('reveal');
  const i = [...el.parentElement.children].indexOf(el);
  el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
});

function countUp(el) {
  const end = Number(el.textContent);
  if (!Number.isInteger(end) || reduce) return;
  const t0 = performance.now();
  const tick = now => {
    const k = Math.min((now - t0) / 1100, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    const num = en.target.matches('.stat') && en.target.querySelector('strong');
    if (num) countUp(num);
    io.unobserve(en.target);
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
} else {
  items.forEach(el => el.classList.add('in'));
}
