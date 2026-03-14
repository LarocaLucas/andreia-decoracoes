// ── Cursor ──────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 60);
});

// ── Navbar scroll ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile toggle ────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll reveal ────────────────────────────────────
const reveals = document.querySelectorAll(
  '#sobre .sobre-img-wrap, #sobre .sobre-content, ' +
  '.servico-card, .depoimento-card, ' +
  '.contato-info, .contato-form-wrap, ' +
  '.servicos-header, .galeria-header, .depoimentos-header, ' +
  '.sobre-stats'
);
reveals.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('reveal-delay-1');
  if (i % 3 === 2) el.classList.add('reveal-delay-2');
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Parallax foto sobre ──────────────────────────────
const sobreImg = document.querySelector('.sobre-img-parallax');
if (sobreImg) {
  window.addEventListener('scroll', () => {
    const wrap = sobreImg.closest('.sobre-img-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const progress = rect.top / window.innerHeight;
      sobreImg.style.transform = `translateY(${progress * 40}px)`;
    }
  }, { passive: true });
}

// ── Galeria — álbuns rotativos ───────────────────────
const ALBUMS = {
  casamento: [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85',
    'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=700&q=85',
    'https://images.unsplash.com/photo-1519741347686-c1e331c20a2d?w=700&q=85',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=85',
    'https://images.unsplash.com/photo-1583939411023-14783179e581?w=700&q=85',
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=700&q=85',
    'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=700&q=85',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=85',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=85',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=700&q=85',
    'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=700&q=85',
  ],
  infantil: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&q=85',
    'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=700&q=85',
    'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=700&q=85',
    'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=700&q=85',
    'https://images.unsplash.com/photo-1596278049790-31e4e0d93e1e?w=700&q=85',
    'https://images.unsplash.com/photo-1534110217538-4820e4e46e7f?w=700&q=85',
    'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=700&q=85',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=700&q=85',
  ],
  debutante: [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85',
    'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=700&q=85',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=85',
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=700&q=85',
    'https://images.unsplash.com/photo-1583939411023-14783179e581?w=700&q=85',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=85',
    'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=700&q=85',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=85',
  ],
  corporativo: [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=85',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&q=85',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&q=85',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=85',
  ],
};

const SLOTS = 8;
let currentAlbum = 'casamento';
let currentPage  = 0;
let autoplay;

function getPages(album) {
  const fotos = ALBUMS[album];
  const pages = [];
  for (let i = 0; i < fotos.length; i += SLOTS) {
    pages.push(fotos.slice(i, i + SLOTS));
  }
  return pages;
}

function renderAlbum(album, page, animate = true) {
  const pages = getPages(album);
  const fotos = pages[page] || pages[0];
  const slots = document.querySelectorAll('.gal-slot');

  slots.forEach((slot, i) => {
    const img = slot.querySelector('img');
    if (animate) {
      slot.style.opacity   = '0';
      slot.style.transform = 'scale(0.97)';
    }
    setTimeout(() => {
      if (fotos[i]) {
        img.src = fotos[i];
        slot.style.display = '';
      } else {
        slot.style.display = 'none';
      }
      if (animate) {
        slot.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        slot.style.opacity    = '1';
        slot.style.transform  = 'scale(1)';
      }
    }, animate ? i * 50 : 0);
  });

  // dots
  const dotsEl = document.getElementById('galDots');
  if (!dotsEl) return;
  dotsEl.innerHTML = '';
  pages.forEach((_, idx) => {
    const d = document.createElement('button');
    d.className = 'gal-dot' + (idx === page ? ' active' : '');
    d.addEventListener('click', () => {
      currentPage = idx;
      renderAlbum(currentAlbum, currentPage);
      resetAutoplay();
    });
    dotsEl.appendChild(d);
  });
}

function resetAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => {
    const pages = getPages(currentAlbum);
    currentPage = (currentPage + 1) % pages.length;
    renderAlbum(currentAlbum, currentPage);
  }, 5000);
}

// Botões de categoria
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentAlbum = btn.dataset.album;
    currentPage  = 0;
    renderAlbum(currentAlbum, currentPage);
    resetAutoplay();
  });
});

// Prev / Next
const galPrev = document.getElementById('galPrev');
const galNext = document.getElementById('galNext');
if (galPrev) galPrev.addEventListener('click', () => {
  const pages = getPages(currentAlbum);
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  renderAlbum(currentAlbum, currentPage);
  resetAutoplay();
});
if (galNext) galNext.addEventListener('click', () => {
  const pages = getPages(currentAlbum);
  currentPage = (currentPage + 1) % pages.length;
  renderAlbum(currentAlbum, currentPage);
  resetAutoplay();
});

// Inicializar + autoplay
renderAlbum(currentAlbum, currentPage, false);
resetAutoplay();

// ── Form → WhatsApp ──────────────────────────────────
const form = document.querySelector('.contato-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome  = form.querySelector('input[type="text"]').value;
    const tel   = form.querySelector('input[type="tel"]').value;
    const tipo  = form.querySelector('select').value;
    const data  = form.querySelector('input[type="date"]').value;
    const msg   = form.querySelector('textarea').value;
    const texto = `Olá Andreia! 😊%0A%0ANome: ${nome}%0ATelefone: ${tel}%0ATipo de evento: ${tipo}%0AData: ${data}%0A%0AMensagem: ${msg}`;
    window.open(`https://wa.me/5542999999999?text=${texto}`, '_blank');
  });
}
