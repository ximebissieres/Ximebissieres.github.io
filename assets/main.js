/* Ximena Bissieres · Portafolio
   Sitio multipágina (Jekyll / GitHub Pages). Este archivo solo agrega
   comportamiento: menú de proyectos, menú móvil, estado activo de la
   navegación, índice de etapas, progreso de lectura y microinteracciones.
   Todo el contenido funciona sin JavaScript. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isHome = document.body.classList.contains('is-home');
  var isProject = document.body.classList.contains('is-project');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Menú desplegable de proyectos (clic, teclado y táctil) ---------- */
  var trigger = $('.nav-trigger');
  var menu = $('#menu-proyectos');
  function setMenu(open, focusFirst) {
    if (!trigger || !menu) return;
    trigger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    if (open && focusFirst) { var first = $('.menu-item', menu); if (first) first.focus(); }
  }
  if (trigger && menu) {
    trigger.addEventListener('click', function () { setMenu(trigger.getAttribute('aria-expanded') !== 'true'); });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setMenu(true, true); }
    });
    menu.addEventListener('keydown', function (e) {
      var items = $$('a', menu);
      var i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.has-menu')) setMenu(false);
    });
    document.addEventListener('focusin', function (e) {
      if (!menu.hidden && !e.target.closest('.has-menu')) setMenu(false);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  /* ---------- Menú móvil ---------- */
  var toggle = $('.menu-toggle');
  var mobile = $('#mobile-menu');
  function setMobile(open) {
    if (!toggle || !mobile) return;
    toggle.setAttribute('aria-expanded', String(open));
    $('.menu-toggle-label', toggle).textContent = open ? 'Cerrar' : 'Menú';
    mobile.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  if (toggle && mobile) {
    toggle.addEventListener('click', function () { setMobile(toggle.getAttribute('aria-expanded') !== 'true'); });
    mobile.addEventListener('click', function (e) { if (e.target.closest('a')) setMobile(false); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (menu && !menu.hidden) { setMenu(false); trigger.focus(); }
    if (mobile && !mobile.hidden) { setMobile(false); toggle.focus(); }
  });

  /* ---------- Estado activo de la navegación en la home ---------- */
  if (isHome && 'IntersectionObserver' in window) {
    var links = $$('.nav [data-nav]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = e.target.id === 'inicio' ? 'inicio' : e.target.id;
        links.forEach(function (l) {
          var on = l.getAttribute('data-nav') === key;
          l.classList.toggle('is-active', on);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'proyectos', 'sobre-mi', 'contacto'].forEach(function (id) {
      var el = document.getElementById(id); if (el) spy.observe(el);
    });
  }

  /* ---------- Revelado al hacer scroll (solo bloques principales) ---------- */
  var revealEls = $$('[data-reveal], .dots, .thread');
  if ('IntersectionObserver' in window && !reduce) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Caso: índice de etapas y progreso de lectura ---------- */
  if (isProject) {
    var toc = $('.toc ol');
    var chapters = $$('.chapter[id]');
    var tocLinks = chapters.map(function (ch, i) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + ch.id;
      a.innerHTML = '<span class="toc-n">' + String(i + 1).padStart(2, '0') + '</span>' + (ch.getAttribute('data-title') || '');
      li.appendChild(a);
      if (toc) toc.appendChild(li);
      return a;
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = chapters.indexOf(e.target);
          tocLinks.forEach(function (a, j) {
            a.classList.toggle('is-active', j === i);
            if (j === i) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      chapters.forEach(function (c) { io.observe(c); });
    }
  }

  var header = $('.site-header');
  var progress = $('.progress');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      header.classList.toggle('scrolled', window.scrollY > 8);
      if (isProject && progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Antes / Después ---------- */
  $$('.journey').forEach(function (j) {
    var seg = $('.seg', j);
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
    var on = $('button[aria-pressed="true"]', seg);
    if (on) {
      requestAnimationFrame(function () { place(on); });
      window.addEventListener('resize', function () { place($('button[aria-pressed="true"]', seg)); });
    }
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

  /* ---------- Respuesta al cursor (solo desktop, sin movimiento reducido) ---------- */
  if (finePointer && !reduce) {
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
})();
