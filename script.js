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
