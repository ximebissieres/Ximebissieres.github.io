/* Ximena Bissieres · Portafolio
   Navegación por #hash, transiciones entre vistas, revelado al hacer scroll
   y microinteracciones. Sin dependencias. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var CASES = ['monchis', 'latam', 'santa-isabel', 'paris'];
  var views = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var header = document.querySelector('.site-header');
  var progress = document.querySelector('.progress');
  var current = null;
  var pendingSource = null;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Covers: reutilizar el de la home en cada caso ---------- */
  $$('[data-cover-slot]').forEach(function (slot) {
    var src = $('.project[data-case="' + slot.getAttribute('data-cover-slot') + '"] .cover');
    if (src) {
      var clone = src.cloneNode(true);
      $$('a', clone).forEach(function (a) { a.remove(); });
      slot.appendChild(clone);
    }
  });

  /* ---------- Revelado al hacer scroll ---------- */
  var revealObserver = null;
  if ('IntersectionObserver' in window && !reduce) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('[data-reveal], .dots, .thread').forEach(function (el) { revealObserver.observe(el); });
  } else {
    $$('[data-reveal], .dots, .thread').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Router ---------- */
  function viewFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    return { id: id, view: CASES.indexOf(id) >= 0 ? id : 'home' };
  }

  function render() {
    var r = viewFromHash();
    var changed = r.view !== current;
    views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== r.view; });
    document.body.setAttribute('data-view', r.view === 'home' ? 'home' : 'case');
    current = r.view;
    if (r.view !== 'home') {
      if (changed) window.scrollTo({ top: 0, behavior: 'instant' });
      var h1 = $('[data-view="' + r.view + '"] .case-title');
      document.title = (h1 ? h1.getAttribute('data-short') + ' · ' : '') + 'Ximena Bissieres';
    } else {
      document.title = 'Ximena Bissieres · Product Designer';
      var target = r.id && document.getElementById(r.id);
      if (changed) {
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
    updateNav();
    onScroll();
  }

  function clearNames() {
    $$('.vt-named').forEach(function (el) { el.style.viewTransitionName = ''; el.classList.remove('vt-named'); });
  }
  function nameEl(el, name) { if (el) { el.style.viewTransitionName = name; el.classList.add('vt-named'); } }

  function navigate() {
    var next = viewFromHash().view;
    if (reduce || !document.startViewTransition || next === current) { render(); return; }
    var src = pendingSource; pendingSource = null;
    if (src && next !== 'home') {
      nameEl(src.title, 'case-title');
      nameEl(src.cover, 'case-cover');
    }
    var t = document.startViewTransition(function () {
      clearNames();
      render();
      if (src && next !== 'home') {
        var art = $('[data-view="' + next + '"]');
        nameEl($('.case-title', art), 'case-title');
        nameEl($('[data-cover-slot] .cover', art), 'case-cover');
      }
    });
    t.finished.then(clearNames, clearNames);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var project = a.closest('.project');
    pendingSource = project ? { title: $('.project-title', project), cover: $('.cover', project) } : null;
  });
  window.addEventListener('hashchange', navigate);

  /* ---------- Navegación: estado activo ---------- */
  var navLinks = $$('.nav a');
  var activeSection = '';
  function updateNav() {
    var key = current === 'home' ? activeSection : 'casos';
    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + key;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { activeSection = e.target.id; updateNav(); } });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'casos', 'sobre-mi', 'contacto'].forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Índice del caso y barra de progreso ---------- */
  $$('[data-view] .case-body').forEach(function (body) {
    var toc = $('.toc ol', body);
    var chapters = $$('.chapter', body);
    var buttons = chapters.map(function (ch, i) {
      var title = ch.getAttribute('data-title') || ('Sección ' + (i + 1));
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = title;
      b.addEventListener('click', function () {
        ch.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        var h = $('.chapter-title, h2', ch);
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      });
      li.appendChild(b);
      if (toc) toc.appendChild(li);
      return b;
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = chapters.indexOf(e.target);
            buttons.forEach(function (b, j) { b.classList.toggle('is-active', j === i); });
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      chapters.forEach(function (c) { io.observe(c); });
    }
  });

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      header.classList.toggle('scrolled', window.scrollY > 8);
      if (current && current !== 'home') {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Antes / Después ---------- */
  $$('.journey').forEach(function (j) {
    var seg = $('.seg', j);
    var thumb = $('.thumb', seg);
    var btns = $$('button', seg);
    function place(btn) {
      seg.style.setProperty('--tw', btn.offsetWidth + 'px');
      seg.style.setProperty('--tx', (btn.offsetLeft - 4) + 'px');
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        j.setAttribute('data-state', b.getAttribute('data-set'));
        btns.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        place(b);
      });
    });
    var on = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0];
    if (on && thumb) { requestAnimationFrame(function () { place(on); }); window.addEventListener('resize', function () { place($('button[aria-pressed="true"]', seg)); }); }
  });

  /* ---------- Copiar email ---------- */
  $$('[data-copy]').forEach(function (btn) {
    var status = document.getElementById(btn.getAttribute('aria-describedby'));
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) { if (status) status.textContent = 'Email pendiente de agregar.'; return; }
      var done = function () { if (status) status.textContent = 'Email copiado: ' + text; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { if (status) status.textContent = text; });
      } else if (status) { status.textContent = text; }
    });
  });

  /* ---------- Respuesta al cursor (solo desktop) ---------- */
  if (finePointer && !reduce) {
    // Covers con capas: se desplazan según la profundidad de cada capa.
    document.addEventListener('pointermove', function (e) {
      var cover = e.target.closest && e.target.closest('.cover');
      if (!cover) return;
      var r = cover.getBoundingClientRect();
      cover.classList.add('tracking');
      cover.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      cover.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      var cover = e.target.closest && e.target.closest('.cover');
      if (cover && !cover.contains(e.relatedTarget)) {
        cover.classList.remove('tracking');
        cover.style.setProperty('--mx', 0);
        cover.style.setProperty('--my', 0);
      }
    });

    // Halo del hero que sigue al cursor con suavidad.
    var hero = $('.hero');
    var orb = $('.hero-orb');
    var frame = $('.portrait-frame');
    if (hero && orb) {
      var tx = 0, ty = 0, x = 0, y = 0, raf = null, init = false;
      var loop = function () {
        x += (tx - x) * 0.08; y += (ty - y) * 0.08;
        orb.style.setProperty('--ox', x.toFixed(1) + 'px');
        orb.style.setProperty('--oy', y.toFixed(1) + 'px');
        raf = (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) ? requestAnimationFrame(loop) : null;
      };
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!init) { x = tx; y = ty; init = true; }
        if (frame) {
          frame.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
          frame.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
        }
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
    }
  }

  render();
})();
