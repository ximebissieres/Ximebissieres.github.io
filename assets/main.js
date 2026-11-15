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
    $('.menu-toggle-label', toggle).textContent = toggle.getAttribute(open ? 'data-label-close' : 'data-label-open');
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
    ['inicio', 'enfoque', 'proyectos', 'contacto'].forEach(function (id) {
      var el = document.getElementById(id); if (el) spy.observe(el);
    });
  }

  /* ---------- Revelado al hacer scroll (solo bloques principales) ---------- */
  var revealEls = $$('[data-reveal], .dots');
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
      a.innerHTML = '<span class="toc-n">' + String(i + 1).padStart(2, '0') + '</span><span class="toc-t">' + (ch.getAttribute('data-title') || '') + '</span>';
      li.appendChild(a);
      if (toc) toc.appendChild(li);
      return a;
    });
    // La sección activa se decide por scroll: la última cuyo inicio ya cruzó
    // el 35% de la ventana. Arriba del todo (portada) no hay ninguna activa,
    // así el trazo de «El desafío» también se pinta recién al hacer scroll.
    var tocActive = -2, tocTicking = false;
    var updateToc = function () {
      tocTicking = false;
      var line = window.innerHeight * 0.35, cur = -1;
      if (window.scrollY > 0) {
        chapters.forEach(function (c, i) { if (c.getBoundingClientRect().top <= line) cur = i; });
      }
      if (cur === tocActive) return;
      tocActive = cur;
      tocLinks.forEach(function (a, j) {
        a.classList.toggle('is-active', j === cur);
        if (j === cur) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
      });
    };
    var queueToc = function () { if (!tocTicking) { tocTicking = true; requestAnimationFrame(updateToc); } };
    window.addEventListener('scroll', queueToc, { passive: true });
    window.addEventListener('resize', queueToc);
    window.addEventListener('load', queueToc);
    updateToc();
  }

  /* ---------- Portada de caso: la captura se desliza dentro de la ventana ----------
     0 con la página arriba · 1 cuando la portada sale por arriba. Reversible.
     Las posiciones se miden al cargar o redimensionar, nunca en cada cuadro. */
  var shifts = $$('[data-scroll-shift]');
  if (shifts.length && !reduce) {
    var shiftItems = [], shiftTicking = false;
    var measureShift = function () {
      shiftItems = shifts.map(function (el) {
        var r = el.getBoundingClientRect();
        return { el: el, end: r.top + window.scrollY + r.height };
      });
    };
    var updateShift = function () {
      shiftTicking = false;
      shiftItems.forEach(function (it) {
        it.el.style.setProperty('--shift', Math.min(1, Math.max(0, window.scrollY / it.end)).toFixed(4));
      });
    };
    window.addEventListener('scroll', function () { if (!shiftTicking) { shiftTicking = true; requestAnimationFrame(updateShift); } }, { passive: true });
    var remeasureShift = function () { measureShift(); updateShift(); };
    window.addEventListener('resize', remeasureShift);
    window.addEventListener('load', remeasureShift);
    remeasureShift();
  }

  /* ---------- Líneas de tiempo que se dibujan con el scroll ([data-scroll-draw]) ----------
     --tl: 0 cuando el elemento asoma por abajo · 1 cuando llega a un 40 % del alto
     de la pantalla. Reversible. Sin JS o con movimiento reducido, CSS usa 1. */
  var draws = $$('[data-scroll-draw]');
  if (draws.length && !reduce) {
    var drawItems = [], drawTicking = false;
    var measureDraw = function () {
      drawItems = draws.map(function (el) { return { el: el, top: el.getBoundingClientRect().top + window.scrollY }; });
    };
    var updateDraw = function () {
      drawTicking = false;
      var vh = window.innerHeight;
      drawItems.forEach(function (it) {
        var t = (window.scrollY + vh * 0.92 - it.top) / (vh * 0.5);
        it.el.style.setProperty('--tl', Math.min(1, Math.max(0, t)).toFixed(4));
      });
    };
    window.addEventListener('scroll', function () { if (!drawTicking) { drawTicking = true; requestAnimationFrame(updateDraw); } }, { passive: true });
    var remeasureDraw = function () { measureDraw(); updateDraw(); };
    window.addEventListener('resize', remeasureDraw);
    window.addEventListener('load', remeasureDraw);
    remeasureDraw();
  }

  var header = $('.site-header');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      header.classList.toggle('scrolled', window.scrollY > 8);
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
      if (!text) { if (status) status.textContent = btn.getAttribute('data-msg-pending') || ''; return; }
      var done = function () { if (status) status.textContent = text; };
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

/* ---------- Caso: explorador de fricciones ([data-explorer]) ----------
   Pestañas accesibles (clic, tap, flechas, Inicio/Fin). Sin JS se ven todos
   los paneles uno debajo del otro. Sin autoplay. */
(function () {
  var ex = document.querySelector('[data-explorer]');
  if (!ex) return;
  var tabs = Array.prototype.slice.call(ex.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(ex.querySelectorAll('[role="tabpanel"]'));
  var hls = Array.prototype.slice.call(ex.querySelectorAll('.ex-hl'));
  var pins = Array.prototype.slice.call(ex.querySelectorAll('.ex-pin'));
  var count = ex.querySelector('.ex-count b');
  var nav = ex.querySelector('.ex-nav');
  var cur = 0;
  ex.classList.add('is-ready');
  if (nav) nav.removeAttribute('aria-hidden');
  ex.querySelectorAll('.ex-nav button').forEach(function (b) { b.removeAttribute('tabindex'); });
  function show(i, focus) {
    cur = (i + tabs.length) % tabs.length;
    var key = tabs[cur].getAttribute('data-go');
    tabs.forEach(function (t, j) {
      var on = j === cur;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    hls.forEach(function (h) { h.classList.toggle('is-on', h.getAttribute('data-for') === key); });
    pins.forEach(function (p) { var on = p.getAttribute('data-go') === key; p.classList.toggle('is-on', on); p.setAttribute('aria-pressed', String(on)); });
    ex.classList.toggle('is-absent', tabs[cur].classList.contains('is-absent'));
    if (count) count.textContent = String(cur + 1);
    var bar = tabs[cur].parentNode, t = tabs[cur];
    if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: t.offsetLeft - bar.offsetLeft - 8, behavior: 'smooth' });
    if (focus) tabs[cur].focus();
  }
  function idx(key) { for (var k = 0; k < tabs.length; k++) if (tabs[k].getAttribute('data-go') === key) return k; return 0; }
  tabs.forEach(function (t, j) {
    t.addEventListener('click', function () { show(j); });
    t.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); show(cur + 1, true); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); show(cur - 1, true); }
      else if (k === 'Home') { e.preventDefault(); show(0, true); }
      else if (k === 'End') { e.preventDefault(); show(tabs.length - 1, true); }
    });
  });
  pins.forEach(function (p) { p.addEventListener('click', function () { show(idx(p.getAttribute('data-go'))); }); });
  var prev = ex.querySelector('.ex-prev'), next = ex.querySelector('.ex-next');
  if (prev) prev.addEventListener('click', function () { show(cur - 1); });
  if (next) next.addEventListener('click', function () { show(cur + 1); });
  show(0);
})();

/* ---------- Caso: escenarios visuales con pestañas ([data-switch]) ---------- */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-switch]'), function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(box.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length) return;
    box.classList.add('is-ready');
    var cur = 0;
    function show(i, focus) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, j) { var on = j === cur; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[j].hidden = !on; });
      var k = tabs[cur].getAttribute('data-k');
      if (k) box.querySelectorAll('.cmp-pin').forEach(function (pn) { var on = pn.getAttribute('data-k') === k; pn.classList.toggle('is-on', on); pn.setAttribute('aria-pressed', String(on)); });
      if (focus) tabs[cur].focus();
    }
    tabs.forEach(function (t, j) {
      t.addEventListener('click', function () { show(j); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); show(cur + 1, true); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); show(cur - 1, true); }
        else if (e.key === 'Home') { e.preventDefault(); show(0, true); }
        else if (e.key === 'End') { e.preventDefault(); show(tabs.length - 1, true); }
      });
    });
    box.querySelectorAll('.cmp-pin').forEach(function (pn) {
      pn.addEventListener('click', function () { for (var j = 0; j < tabs.length; j++) if (tabs[j].getAttribute('data-k') === pn.getAttribute('data-k')) show(j); });
    });
    show(0);
  });
})();

/* ---------- Caso: video en modal ([data-video-open]) ----------
   Se abre solo al hacer clic, no se reproduce solo, se pausa al cerrar y
   devuelve el foco al botón. Escape cierra (comportamiento nativo de <dialog>). */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-video-open]'), function (btn) {
    var dlg = document.getElementById(btn.getAttribute('data-video-open'));
    if (!dlg || typeof dlg.showModal !== 'function') return;
    var video = dlg.querySelector('video');
    function close() { if (video) video.pause(); if (dlg.open) dlg.close(); }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      dlg.showModal();
      var c = dlg.querySelector('[data-video-close]'); if (c) c.focus();
    });
    dlg.addEventListener('close', function () { if (video) video.pause(); btn.focus({ preventScroll: true }); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    var x = dlg.querySelector('[data-video-close]'); if (x) x.addEventListener('click', close);
  });
})();

/* ---------- Caso: las pantallas del TO BE como portada del video ([data-poster-video]) ----------
   Al pulsar reproducir, la composición se reemplaza por el video en el mismo panel;
   al terminar, vuelve la portada.
   Nunca hay autoplay. Sin JS queda un enlace al video. */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-poster-video]'), function (box) {
    var btn = box.querySelector('[data-pv-play]'), player = box.querySelector('.pv-player');
    if (!btn || !player) return;
    var v = player.querySelector('video'), hideT;
    btn.addEventListener('click', function () {
      clearTimeout(hideT);
      player.hidden = false;
      void player.offsetWidth; // fuerza el estado inicial para que el fundido se vea
      box.classList.add('is-playing');
      btn.tabIndex = -1;
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      v.focus({ preventScroll: true });
    });
    // Al terminar, vuelve a la portada (mockup atenuado + botón) y rebobina.
    v.addEventListener('ended', function () {
      box.classList.remove('is-playing');
      btn.tabIndex = 0;
      btn.focus({ preventScroll: true });
      hideT = setTimeout(function () {
        player.hidden = true;
        try { v.currentTime = 0; } catch (e) {}
      }, 750);
    });
  });
})();

/* ---------- Caso: carrusel de criterios ([data-carousel]) ----------
   Selección manual (pestañas, flechas, teclado y deslizamiento táctil).
   Todas las diapositivas ocupan la misma celda: el alto es el de la más alta,
   así el carrusel no salta al cambiar. Sin JS se ven una debajo de la otra. */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('.cc-tabs [role="tab"]'));
    var slides = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    if (!tabs.length || slides.some(function (x) { return !x; })) return;
    box.classList.add('is-ready');
    var cur = 0, track = box.querySelector('.crits');
    var narrow = window.matchMedia('(max-width: 699px)');
    function fit() {
      track.style.height = slides[cur].offsetHeight + 'px';
    }
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    function show(i, focus) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, j) { var on = j === cur; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; slides[j].hidden = false; slides[j].inert = !on; slides[j].setAttribute('aria-hidden', String(!on)); slides[j].classList.toggle('is-current', on); });
      track.style.setProperty('--i', cur);
      fit();
      if (focus) tabs[cur].focus();
    }
    tabs.forEach(function (t, j) {
      t.addEventListener('click', function () { show(j); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, true); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, true); }
        else if (e.key === 'Home') { e.preventDefault(); show(0, true); }
        else if (e.key === 'End') { e.preventDefault(); show(tabs.length - 1, true); }
      });
    });
    var prev = box.querySelector('.cc-prev'), next = box.querySelector('.cc-next');
    if (prev) prev.addEventListener('click', function () { show(cur - 1); });
    if (next) next.addEventListener('click', function () { show(cur + 1); });
    var x0 = null, y0 = null;
    track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && !e.target.closest('.ex-tabs, .tip-cmp-tabs, .sol-tabs')) show(cur + (dx < 0 ? 1 : -1));
    });
    show(0);
  });
})();

/* ---------- Hero: capas que se mueven sutilmente con el cursor ([data-parallax]) ----------
   Solo con puntero fino y sin "reducir movimiento". El valor se suaviza con rAF. */
(function () {
  var box = document.querySelector('[data-parallax]');
  if (!box) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  function tick() {
    x += (tx - x) * 0.08; y += (ty - y) * 0.08;
    box.style.setProperty('--mx', x.toFixed(3)); box.style.setProperty('--my', y.toFixed(3));
    raf = (Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001) ? requestAnimationFrame(tick) : 0;
  }
  function go() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener('pointermove', function (e) {
    var r = box.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth / 2)));
    ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight / 2)));
    go();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', function () { tx = 0; ty = 0; go(); });
})();

/* ---------- Casos: el trazo de pincel de los destacados se pinta al entrar en pantalla ----------
   El <head> marca html.brush-js solo si hay IntersectionObserver y no se pidió reducir movimiento. */
(function () {
  if (!document.documentElement.classList.contains('brush-js')) return;
  var ems = Array.prototype.slice.call(document.querySelectorAll('.case :is(h1, h2, h3, h4) em'));
  if (!ems.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('b-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.6 });
  ems.forEach(function (em) { io.observe(em); });
})();
