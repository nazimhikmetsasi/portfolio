const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Ticker: repeat the set to 4 copies before translations are collected, so clones switch language too.
document.querySelectorAll('.ticker-track').forEach(track => {
  const set = [...track.children];
  for (let n = 0; n < 3; n++) set.forEach(span => { const c = span.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });
});

// Language toggle: English lives in the HTML, Turkish in data-tr attributes.
const translatable = [...document.querySelectorAll('[data-tr]')];
translatable.forEach(el => { el.dataset.en = el.innerHTML; });
const links = [...document.querySelectorAll('[data-tr-href]')];
links.forEach(a => { a.dataset.enHref = a.getAttribute('href'); });

function setLang(lang) {
  root.lang = lang;
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

// Scroll progress line + HUD percentage.
const hudScroll = document.getElementById('hud-scroll');
let ticking = false;
function onScroll() {
  const p = scrollY / (root.scrollHeight - innerHeight || 1);
  root.style.setProperty('--p', p.toFixed(4));
  if (hudScroll) hudScroll.textContent = String(Math.round(p * 100)).padStart(3, '0');
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

// HUD clock (Istanbul time).
const clock = document.getElementById('hud-clock');
const tick = () => { if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Istanbul' }); };
tick(); setInterval(tick, 1000);

// Highlight the nav link of the section in view.
const navLinks = [...menu.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });
}

// Reveal on scroll, plus count-up for plain-number stats.
const revealSel = '.section-head, .about > div > *, .project-card, .flip-hint, .others h3, .other-row, .exp-grid > *, .achievements p, .education, .skills-head > *, .skill-col, .contact h2, .contact-cards a, .now, .stat';
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
  const step = now => {
    const k = Math.min((now - t0) / 1100, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  el.textContent = '0';
  requestAnimationFrame(step);
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

// Loader: counts to 100, then fades out. Shown once per session, only on the HIGH tier.
const loader = document.getElementById('loader');
if (loader && root.classList.contains('loading')) {
  const num = document.getElementById('loader-num'), pct = document.getElementById('loader-pct');
  const bar = document.getElementById('loader-bar'), go = document.getElementById('loader-go');
  const t0 = performance.now(), DUR = 1800;
  const step = now => {
    const k = Math.min((now - t0) / DUR, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const v = Math.round(e * 100);
    num.textContent = v; pct.textContent = v + '%'; bar.style.width = v + '%';
    if (k < 1) return requestAnimationFrame(step);
    go.textContent = 'ENTER';
    setTimeout(() => {
      loader.classList.add('leaving');
      setTimeout(() => { root.classList.remove('loading'); loader.classList.remove('leaving'); }, 600);
      try { sessionStorage.setItem('seen', '1'); } catch {}
    }, 350);
  };
  requestAnimationFrame(step);
}

// Pointer effects (HIGH tier): custom cursor.
const cursor = document.querySelector('.cursor');
const pointer = { x: -1e4, y: -1e4 };
if (matchMedia('(pointer: fine)').matches) {
  addEventListener('pointermove', e => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    if (root.dataset.tier !== 'high') return;
    pen.move(e.clientX, e.clientY);
    cursor.classList.add('on');
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.classList.toggle('big', !!e.target.closest('a, button, .project-card'));
  }, { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
}

// Pen trail (HIGH tier): a thin line follows the pointer and fades out, like drawing with a pencil.
const trail = document.getElementById('trail');
const pen = (() => {
  if (!trail || !matchMedia('(pointer: fine)').matches) return { move() {}, clear() {} };
  const tctx = trail.getContext('2d'), LIFE = 330;
  let pts = [], raf = 0, hx = 0, hy = 0, seeded = false, lastMove = 0;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    trail.width = Math.round(innerWidth * d); trail.height = Math.round(innerHeight * d);
    tctx.setTransform(d, 0, 0, d, 0, 0);
    tctx.lineCap = 'round'; tctx.lineJoin = 'round'; tctx.strokeStyle = '#fff';
  }
  size(); addEventListener('resize', size);
  function frame(now) {
    raf = 0;
    tctx.clearRect(0, 0, innerWidth, innerHeight);
    if (root.dataset.tier === 'high' && now - lastMove < LIFE) {
      hx += (pointer.x - hx) * .22; hy += (pointer.y - hy) * .22; // low-pass the head so the stroke stays silky
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(hx - last.x, hy - last.y) > .8) pts.push({ x: hx, y: hy, t: now });
    }
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], k = Math.max(0, 1 - (now - b.t) / LIFE);
      tctx.globalAlpha = Math.pow(k, .55) * .85; tctx.lineWidth = .4 + 2.6 * k;
      tctx.beginPath(); tctx.moveTo(a.x, a.y); tctx.lineTo(b.x, b.y); tctx.stroke();
    }
    if (pts.length > 1 || now - lastMove < LIFE) raf = requestAnimationFrame(frame);
  }
  return {
    move(x, y) {
      if (root.dataset.tier !== 'high') return;
      if (!seeded) { hx = x; hy = y; seeded = true; }
      lastMove = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    },
    clear() { pts = []; tctx.clearRect(0, 0, innerWidth, innerHeight); }
  };
})();

// Performance tier: HIGH = everything, MED = no noise / scan / cursor / particle motion, SAVER = no motion at all.
const tierBtns = [...document.querySelectorAll('button[data-tier]')];
function setTier(t) {
  root.dataset.tier = t;
  tierBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tier === t)));
  if (t !== 'high') { cursor.classList.remove('on'); pen.clear(); }
  const perf = document.getElementById('hs-perf'); if (perf) perf.textContent = t.toUpperCase();
  try { localStorage.setItem('tier', t); } catch {}
}
tierBtns.forEach(b => b.addEventListener('click', () => setTier(b.dataset.tier)));
setTier(root.dataset.tier || 'high');
