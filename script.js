/* ════════════════════════════════════════
   HaveXa Labs — script.js
════════════════════════════════════════ */

/* ── Custom cursor (fine pointer / desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .sol-card, .coming-card, .insight-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(2.5)';
      if (ring) ring.style.opacity   = '0';
    });
    el.addEventListener('mouseleave', () => {
      if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(1)';
      if (ring) ring.style.opacity   = '1';
    });
  });
}

/* ── Sticky nav ── */
const navEl    = document.getElementById('nav');
const checkNav = () => navEl.classList.toggle('stuck', window.scrollY > 60);
window.addEventListener('scroll', checkNav, { passive: true });
checkNav();

/* ── Mobile hamburger menu ── */
const hamBtn   = document.getElementById('hamBtn');
const drawer   = document.getElementById('mobileDrawer');
const closeBtn = document.getElementById('drawerClose');

hamBtn.addEventListener('click', () => {
  drawer.classList.add('open');
  hamBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

function closeDrawer() {
  drawer.classList.remove('open');
  hamBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

/* ── Scroll-reveal (IntersectionObserver) ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

/* ── Smooth scroll with nav offset ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('nav').offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

/* ── Hero entrance animation ── */
const hc = document.querySelector('.hero-content');
if (hc) {
  hc.style.cssText = 'opacity:0;transform:translateY(26px);transition:opacity 1.2s cubic-bezier(0.16,1,0.3,1),transform 1.2s cubic-bezier(0.16,1,0.3,1)';
  setTimeout(() => { hc.style.opacity = '1'; hc.style.transform = 'translateY(0)'; }, 200);
}