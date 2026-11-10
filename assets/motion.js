/* Ximena Bissieres · Motion de la Home
   ------------------------------------------------------------------------
   Dos capas, sin dependencias:

   1. Entradas (una sola vez). IntersectionObserver marca [data-m] y
      [data-m-split] con .m-in cuando entran en pantalla. La animación vive en
      CSS (propiedad `translate` + opacity) y respeta el sentido del scroll:
      al bajar, los elementos suben; al subir, bajan.

   2. Movimiento ligado al scroll (reversible, ambos sentidos). Un único
      requestAnimationFrame lee scrollY y escribe variables CSS:
        --hp     progreso del hero (0 → 1) · foto, capa rosa y texto
        --tint   tono de fondo de las secciones al entrar
        --drift  desplazamiento suave de encabezados y capacidades
        --py     parallax de las imágenes de las tarjetas
      Las posiciones se miden solo al cargar o redimensionar (nunca en cada
      scroll) y los valores son deterministas: la misma posición de scroll
      produce el mismo estado, bajando o subiendo.

   Sin JavaScript o con "reducir movimiento" no se oculta nada.
   ------------------------------------------------------------------------ */
(function () {
  'use strict';
  if (!document.body.classList.contains('is-home')) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window) || !window.requestAnimationFrame) return;

  var root = document.documentElement;
  var desktop = window.matchMedia('(min-width: 1024px)');
  root.classList.add('motion');

  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* ---------- Títulos: palabras con máscara ---------- */
  $$('[data-m-split]').forEach(function (el) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'm-w';
            var i = document.createElement('span'); i.className = 'm-wi';
            i.style.setProperty('--w', n++);
            i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          ch.parentNode.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'MARK') {
          walk(ch);
        }
      });
    })(el);
  });

  /* ---------- Sentido del scroll ---------- */
  var lastY = window.scrollY, dir = 1;

  /* ---------- 1. Entradas ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      // Si el elemento entra por arriba (al subir), aparece desde arriba.
      var fromTop = e.boundingClientRect.top < window.innerHeight * 0.4 && dir < 0;
      el.style.setProperty('--dir', fromTop ? -1 : 1);
      el.classList.add('m-in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  $$('[data-m], [data-m-split]').forEach(function (el) { io.observe(el); });
  window.addEventListener('beforeprint', function () { $$('[data-m], [data-m-split]').forEach(function (el) { el.classList.add('m-in'); }); });

  /* ---------- 2. Movimiento ligado al scroll ---------- */
  var hero = document.querySelector('.hero');
  var tints = $$('[data-m-tint]');
  var drifts = $$('[data-m-drift]');
  var skills = $$('.skills-grid > .skill');
  var media = $$('.project-grid .pmedia-card');
  var vh = 0, heroH = 1, items = [];
  var last = new WeakMap();

  function absTop(el) { var t = 0; while (el) { t += el.offsetTop; el = el.offsetParent; } return t; }
  function set(el, prop, val) {
    var k = last.get(el) || {};
    if (k[prop] === val) return;
    k[prop] = val; last.set(el, k);
    el.style.setProperty(prop, val);
  }

  function measure() {
    vh = window.innerHeight;
    heroH = hero ? Math.max(1, hero.offsetHeight) : 1;
    items = [];
    tints.forEach(function (el) { items.push({ el: el, type: 'tint', top: absTop(el), h: el.offsetHeight, span: parseFloat(el.getAttribute('data-m-tint')) || 0.55 }); });
    drifts.forEach(function (el) { items.push({ el: el, type: 'drift', top: absTop(el), h: el.offsetHeight, k: parseFloat(el.getAttribute('data-m-drift')) || 0 }); });
    skills.forEach(function (el, i, all) { items.push({ el: el, type: 'drift', top: absTop(el), h: el.offsetHeight, k: ((all.length - 1) / 2 - i) * 5 }); });
    media.forEach(function (el) { items.push({ el: el, type: 'py', top: absTop(el), h: el.offsetHeight }); });
    root.classList.toggle('motion-scroll', desktop.matches);
  }

  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY;
    var wide = desktop.matches;

    if (hero) set(hero, '--hp', wide ? clamp(y / (heroH * 0.9), 0, 1).toFixed(4) : '0');

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.type === 'tint') {
        // 0 cuando la sección asoma por abajo · 1 tras recorrer `span` (fracción del viewport, 0.55 por defecto)
        set(it.el, '--tint', clamp((y + vh - it.top) / (vh * it.span), 0, 1).toFixed(3));
        continue;
      }
      if (!wide) continue;
      // -1 (sobre el centro) … 0 (centrado) … 1 (bajo el centro)
      var off = clamp((it.top + it.h / 2 - y - vh / 2) / vh, -1, 1);
      if (it.type === 'drift') set(it.el, '--drift', (off * it.k).toFixed(2) + 'px');
      else set(it.el, '--py', (off * -10).toFixed(2) + 'px');
    }
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y !== lastY) { dir = y > lastY ? 1 : -1; lastY = y; }
    schedule();
  }, { passive: true });

  var remeasure = function () { measure(); schedule(); };
  window.addEventListener('resize', remeasure);
  window.addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
  remeasure();

  reduce.addEventListener && reduce.addEventListener('change', function () { location.reload(); });
})();
