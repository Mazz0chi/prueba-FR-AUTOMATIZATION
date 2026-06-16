/* ── FR Automation SRL · script.js ── */

/* Nav scroll effect */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* Mobile menu toggle */
function toggleMenu() {
  var menu = document.getElementById('mobileMenu');
  var ham  = document.getElementById('ham');
  if (!menu || !ham) return;
  var open = menu.classList.toggle('open');
  ham.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  var menu = document.getElementById('mobileMenu');
  var ham  = document.getElementById('ham');
  if (!menu || !ham) return;
  menu.classList.remove('open');
  ham.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Close mobile menu when clicking outside */
document.addEventListener('click', function (e) {
  var menu = document.getElementById('mobileMenu');
  var ham  = document.getElementById('ham');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !ham.contains(e.target)) {
      closeMenu();
    }
  }
});

/* Close mobile menu on resize to desktop */
window.addEventListener('resize', function () {
  if (window.innerWidth > 768) closeMenu();
}, { passive: true });

/* Scroll reveal with staggered delay */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  /* Stagger siblings in the same grid/flex parent */
  items.forEach(function (el, i) {
    var siblings = el.parentElement
      ? el.parentElement.querySelectorAll('.reveal')
      : [];
    var idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0 && idx < 4) {
      el.style.transitionDelay = (idx * 90) + 'ms';
    }
    observer.observe(el);
  });
})();

/* Contact form */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('formBtn');
    if (!btn) return;

    btn.textContent = 'Consulta enviada ✓';
    btn.classList.add('sent');
    btn.disabled = true;

    setTimeout(function () {
      btn.textContent = 'Enviar consulta';
      btn.classList.remove('sent');
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
})();

/* Hero slideshow */
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hsd');
  if (!slides.length) return;

  var current = 0;
  var timer;

  function goTo(idx) {
    slides[current].classList.remove('hero-slide--active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('hero-slide--active');
    dots[current].classList.add('active');
  }

  function next() { goTo((current + 1) % slides.length); }

  function start() { timer = setInterval(next, 4000); }
  function stop()  { clearInterval(timer); }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stop(); goTo(i); start(); });
  });

  start();
})();
