/* ======================================================================
   GROKLET - behaviour
   Reads window.GROKLET_CONFIG (js/config.js) and window.GROKLET_ARTWORK
   (js/artwork-manifest.js). No libraries, no build step.
   ====================================================================== */
(function () {
  'use strict';

  var CFG = window.GROKLET_CONFIG || {};
  var ART = Array.isArray(window.GROKLET_ARTWORK) ? window.GROKLET_ARTWORK : [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var svgIcon = function (id) { return '<svg class="icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; };

  /* ---------------------------------------------------------------- 1. Config binding */
  function bindConfig() {
    $$('[data-bind="name"]').forEach(function (el) { el.textContent = CFG.name || 'Groklet'; });

    ['#tickerTag', '#footerTicker'].forEach(function (s) {
      var el = $(s); if (el && CFG.ticker) { el.textContent = CFG.ticker; el.hidden = false; }
    });

    // Any <a data-link="x"> gets its href from config; hidden when no URL exists.
    $$('[data-link]').forEach(function (a) {
      var l = CFG.links && CFG.links[a.getAttribute('data-link')];
      if (l && l.url) { a.href = l.url; a.hidden = false; if (a.target === '_blank') a.rel = 'noopener noreferrer'; }
    });
    $$('.nav__x, .menu__x').forEach(function (a) { if (a.href && a.getAttribute('href') !== '#community') { a.target = '_blank'; a.rel = 'noopener noreferrer'; } });

    // Sub-label under each community link (host + path, from the configured URL)
    $$('[data-link]').forEach(function (a) {
      var sub = $('[data-link-sub]', a), l = CFG.links && CFG.links[a.getAttribute('data-link')];
      if (!sub || !l || !l.url) return;
      try { var u = new URL(l.url); var path = u.hostname.indexOf('dexscreener') > -1 ? '' : u.pathname.replace(/\/$/, ''); sub.textContent = u.hostname.replace(/^www\./, '') + path; } catch (e) {}
    });

    // Featured post
    var fp = CFG.featuredPost || {};
    var img = $('#postImage');
    if (img) {
      if (fp.image) img.src = fp.image;
      img.alt = fp.alt || 'Screenshot of a post by Grok about Groklet.';
      if (fp.imageWidth) img.width = fp.imageWidth;
      if (fp.imageHeight) img.height = fp.imageHeight;
    }
    var pm = $('#postMeta'); if (pm) pm.textContent = 'Post by ' + (fp.handle || '@grok') + (fp.date ? ' · ' + fp.date : '');
    var pl = $('#postLink'); if (pl && fp.url) { pl.href = fp.url; pl.hidden = false; }
  }

  /* ---------------------------------------------------------------- 2. Navigation */
  function initNav() {
    var nav = $('#nav'), toggle = $('#navToggle'), menu = $('#menu');
    if (!nav) return;

    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    var open = false;
    function setMenu(state, returnFocus) {
      open = state;
      toggle.setAttribute('aria-expanded', String(state));
      toggle.querySelector('.nav__toggle-label').textContent = state ? 'Close' : 'Menu';
      menu.hidden = !state;
      nav.classList.toggle('is-open', state);
      document.body.classList.toggle('is-locked', state);
      if (state) { var first = $('a', menu); if (first) first.focus(); }
      else if (returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', function () { setMenu(!open); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { setMenu(false, true); return; }
      if (e.key === 'Tab') {           // keep focus inside header while the menu is open
        var f = $$('a, button', nav).filter(function (el) { return !el.hidden && el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (m) { if (m.matches && open) setMenu(false); });

    // Highlight the current section
    var links = $$('.nav__links a'), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { links.forEach(function (l) { l.classList.remove('is-active'); }); var l = map[en.target.id]; if (l) l.classList.add('is-active'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
      var home = document.getElementById('home');
      if (home) new IntersectionObserver(function (en) { if (en[0].isIntersecting) links.forEach(function (l) { l.classList.remove('is-active'); }); }, { rootMargin: '-45% 0px -50% 0px' }).observe(home);
    }
  }

  /* ---------------------------------------------------------------- 3. Contract address */
  function initContract() {
    var address = CFG.contract || '';
    $$('[data-ca]').forEach(function (box) {
      if (!address) return;                       // nothing to show -> stays hidden
      box.hidden = false;
      $('[data-ca-value]', box).textContent = address;
      var btn = $('[data-ca-copy]', box), txt = $('.ca__copy-text', box), status = $('.ca__status', box), timer;

      function done(ok) {
        clearTimeout(timer);
        box.classList.toggle('is-copied', ok); box.classList.toggle('is-failed', !ok);
        txt.textContent = ok ? 'Copied' : 'Copy';
        status.textContent = ok ? 'Contract address copied.' : 'Copy is blocked here. The address is selected: press Ctrl+C (or Cmd+C).';
        if (!ok) selectText($('[data-ca-value]', box));
        timer = setTimeout(function () { box.classList.remove('is-copied', 'is-failed'); txt.textContent = 'Copy'; status.textContent = ''; }, ok ? 2200 : 6000);
      }
      btn.addEventListener('click', function () {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(address).then(function () { done(true); }, function () { done(legacyCopy(address)); });
        } else done(legacyCopy(address));
      });
    });
  }
  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
      var ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
    } catch (e) { return false; }
  }
  function selectText(el) {
    try { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } catch (e) {}
  }

  /* ---------------------------------------------------------------- 4. Starfield */
  function initStars() {
    var c = $('#stars'); if (!c || !c.getContext) return;
    var ctx = c.getContext('2d'), stars = [], w = 0, h = 0, dpr = 1, raf = 0, last = 0, scrollY = 0;
    var tints = ['240,244,250', '240,244,250', '240,244,250', '120,230,245', '170,140,235'];

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(60, Math.min(190, Math.round(w * h / 9500)));
      stars = [];
      for (var i = 0; i < n; i++) {
        var depth = Math.random();
        stars.push({
          x: Math.random() * w, y: Math.random() * h * 1.25, d: depth,
          r: .35 + depth * 1.05, a: .25 + Math.random() * .55,
          p: Math.random() * 6.28, s: .25 + Math.random() * .6, t: tints[(Math.random() * tints.length) | 0]
        });
      }
      draw(performance.now());
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var animate = !reduceMotion.matches;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var tw = animate ? .72 + .28 * Math.sin(t * .001 * s.s + s.p) : 1;
        var y = (s.y - scrollY * (.015 + s.d * .05)) % (h * 1.25); if (y < 0) y += h * 1.25;
        ctx.fillStyle = 'rgba(' + s.t + ',' + (s.a * tw).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.2832); ctx.fill();
      }
    }
    function loop(t) {
      raf = requestAnimationFrame(loop);
      if (t - last < 42) return;                  // ~24fps is plenty for a slow twinkle
      last = t; draw(t);
    }
    function start() { if (!raf && !reduceMotion.matches && !document.hidden) raf = requestAnimationFrame(loop); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    size();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    window.addEventListener('scroll', function () { scrollY = window.scrollY; if (reduceMotion.matches && !raf) requestAnimationFrame(function () { draw(0); }); }, { passive: true });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    var onMotion = function () { stop(); draw(performance.now()); start(); };
    reduceMotion.addEventListener ? reduceMotion.addEventListener('change', onMotion) : reduceMotion.addListener(onMotion);
    start();
  }

  /* ---------------------------------------------------------------- 5. Scroll reveals */
  var revealIO = null;
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('is-in'); }); return; }
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
    items.forEach(function (el) { revealIO.observe(el); });
  }
  function observeReveal(el) { if (revealIO) revealIO.observe(el); else el.classList.add('is-in'); }

  /* ---------------------------------------------------------------- 6. Lightbox */
  var Lightbox = (function () {
    var box = $('#lightbox'), img = $('#lbImage'), title = $('#lbTitle'), meta = $('#lbMeta'), count = $('#lbCount');
    var prev = $('#lbPrev'), next = $('#lbNext'), items = [], idx = 0, opener = null, isOpen = false, touchX = null;

    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.classList.remove('is-error');
      img.src = it.src; img.alt = it.alt || '';
      title.textContent = it.title || ''; meta.textContent = it.meta || '';
      var multi = items.length > 1;
      prev.hidden = next.hidden = !multi;
      count.textContent = multi ? (idx + 1) + ' / ' + items.length : '';
      if (multi) { [idx + 1, idx - 1].forEach(function (n) { var p = items[(n + items.length) % items.length]; if (p) { var pre = new Image(); pre.src = p.src; } }); }
    }
    function open(list, i, from) {
      items = list; opener = from || document.activeElement; isOpen = true;
      box.hidden = false; document.body.classList.add('is-locked');
      show(i);
      requestAnimationFrame(function () { box.classList.add('is-open'); $('.lb-btn--close', box).focus(); });
    }
    function close() {
      if (!isOpen) return; isOpen = false;
      box.classList.remove('is-open');
      var done = function () { box.hidden = true; img.removeAttribute('src'); };
      reduceMotion.matches ? done() : setTimeout(done, 280);
      document.body.classList.remove('is-locked');
      if (opener && opener.focus) opener.focus();
    }
    box.addEventListener('click', function (e) { if (e.target.closest('[data-lb-close]')) close(); });
    prev.addEventListener('click', function () { show(idx - 1); });
    next.addEventListener('click', function () { show(idx + 1); });
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft' && items.length > 1) { show(idx - 1); }
      else if (e.key === 'ArrowRight' && items.length > 1) { show(idx + 1); }
      else if (e.key === 'Tab') {
        var f = $$('button', box).filter(function (b) { return !b.hidden; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
    });
    box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null || items.length < 2) return;
      var dx = e.changedTouches[0].clientX - touchX; touchX = null;
      if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1));
    });
    return { open: open };
  })();

  function initFeaturedPostViewer() {
    var btn = $('[data-open-post]'); if (!btn) return;
    btn.addEventListener('click', function () {
      var fp = CFG.featuredPost || {}, im = $('#postImage');
      Lightbox.open([{ src: im.currentSrc || im.src, alt: im.alt, title: 'Post by ' + (fp.handle || '@grok'), meta: fp.date || '' }], 0, btn);
    });
  }

  /* ---------------------------------------------------------------- 7. Artwork gallery */
  function initGallery() {
    var host = $('#gallery-grid'); if (!host) return;
    var filtersEl = $('#filters'), countEl = $('#archiveCount'), moreBtn = $('#galleryMore'), emptyEl = $('#galleryEmpty');

    var works = ART.filter(function (a) { return a && a.file; }).map(function (a, i) {
      return { n: i + 1, file: a.file, thumb: a.thumb || a.file, w: a.w || 0, h: a.h || 0,
               title: a.title || 'Untitled', alt: a.alt || ('Groklet artwork: ' + (a.title || 'untitled')), cat: a.category || '' };
    });
    var gt = $('#galleryTotal'); if (gt && works.length) gt.textContent = works.length + ' pieces of art';
    var active = 'All', shown = 0, cols = 0, colEls = [], colH = [], list = [];

    function colCount() { var w = window.innerWidth; return w >= 1024 ? 3 : w >= 600 ? 2 : 1; }
    function step() { return Math.max(colCount() * 4, 6); }

    function buildFilters() {
      var cats = [];
      works.forEach(function (w) { if (w.cat && cats.indexOf(w.cat) < 0) cats.push(w.cat); });
      filtersEl.innerHTML = '';
      if (cats.length < 2) { filtersEl.hidden = true; return; }
      ['All'].concat(cats).forEach(function (c) {
        var n = c === 'All' ? works.length : works.filter(function (w) { return w.cat === c; }).length;
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'filter'; b.setAttribute('aria-pressed', String(c === active));
        b.innerHTML = '<span></span><sup>' + n + '</sup>'; $('span', b).textContent = c;
        b.addEventListener('click', function () {
          active = c; shown = 0;
          $$('.filter', filtersEl).forEach(function (f) { f.setAttribute('aria-pressed', String(f === b)); });
          render(true);
        });
        filtersEl.appendChild(b);
      });
    }

    function current() { return works.filter(function (w) { return active === 'All' || w.cat === active; }); }

    function makeColumns() {
      host.innerHTML = ''; colEls = []; colH = [];
      host.style.setProperty('--cols', cols);
      for (var i = 0; i < cols; i++) { var c = document.createElement('div'); c.className = 'gallery__col'; host.appendChild(c); colEls.push(c); colH.push(i === 1 && cols === 3 ? .18 : 0); }
    }

    function makeTile(w, pos) {
      var fig = document.createElement('figure'); fig.className = 'piece reveal';
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'tile';
      btn.setAttribute('aria-label', 'Open ' + w.title + ' at full size');
      if (w.w && w.h) btn.style.setProperty('--ar', w.w + ' / ' + w.h);
      var im = new Image(); im.alt = w.alt; im.loading = 'lazy'; im.decoding = 'async';
      if (w.w && w.h) { im.width = w.w; im.height = w.h; }
      im.sizes = '(min-width:1024px) 33vw, (min-width:600px) 50vw, 100vw';
      im.addEventListener('error', function () {
        if (im.src.indexOf(w.thumb) !== -1 && w.thumb !== w.file) { im.src = w.file; return; }   // thumb missing -> try full image
        w.broken = true; fig.remove(); relayout();                                                   // never show a broken tile
      });
      im.addEventListener('load', function () {
        if (!(w.w && w.h) && im.naturalWidth) { btn.style.setProperty('--ar', im.naturalWidth + ' / ' + im.naturalHeight); }
      });
      im.src = w.thumb;
      btn.appendChild(im);
      var cap = document.createElement('figcaption');
      cap.innerHTML = '<span><span class="piece__no"></span><span class="piece__title"></span></span><span class="piece__cat"></span>';
      $('.piece__no', cap).textContent = String(w.n).padStart(2, '0');
      $('.piece__title', cap).textContent = w.title; $('.piece__cat', cap).textContent = w.cat;
      btn.addEventListener('click', function () {
        var vis = current().filter(function (x) { return !x.broken; });
        Lightbox.open(vis.map(function (x) { return { src: x.file, alt: x.alt, title: x.title, meta: x.cat }; }), Math.max(0, vis.indexOf(w)), btn);
      });
      fig.appendChild(btn); fig.appendChild(cap);
      return fig;
    }

    function place(items) {
      items.forEach(function (w) {
        var k = 0; for (var i = 1; i < colH.length; i++) if (colH[i] < colH[k]) k = i;
        var ratio = w.w && w.h ? w.h / w.w : 1.2;
        colH[k] += ratio + .14;
        var tile = makeTile(w); colEls[k].appendChild(tile); observeReveal(tile);
      });
    }

    function updateControls() {
      var total = current().length;
      countEl.textContent = total ? (Math.min(shown, total) + ' of ' + total + ' works') : '';
      moreBtn.hidden = shown >= total;
      emptyEl.hidden = works.length > 0;
      host.hidden = works.length === 0;
    }

    function render(reset) {
      var vis = current();
      if (reset) { cols = colCount(); makeColumns(); shown = Math.min(step(), vis.length); place(vis.slice(0, shown)); }
      updateControls();
    }
    function relayout() {         // keep current amount, rebuild columns (resize or after a removed tile)
      list = current().filter(function (w) { return !w.broken; });
      cols = colCount(); makeColumns();
      place(list.slice(0, shown)); updateControls();
    }

    moreBtn.addEventListener('click', function () {
      var vis = current().filter(function (w) { return !w.broken; });
      var from = shown, to = Math.min(shown + step(), vis.length);
      shown = to; place(vis.slice(from, to)); updateControls();
    });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (colCount() !== cols) relayout(); }, 180); });

    buildFilters(); render(true);
  }

  /* ---------------------------------------------------------------- 8. Hero wave (transparent video over the still) */
  // The still poster is always in the HTML (instant, works without JS, used for reduced motion).
  // The transparent WebM is added on top for browsers that can play WebM *with alpha*
  // (Chrome, Edge, Firefox, Android). Safari/iOS cannot, so they keep the still frame unless an
  // HEVC-with-alpha file is supplied in CFG.heroWave.mov.
  function initHeroWave() {
    var w = CFG.heroWave || {}, art = $('#heroArt'), still = $('.hero__still');
    if (!art || !still || reduceMotion.matches) return;
    var ua = navigator.userAgent, safari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua) || /iPad|iPhone|iPod/.test(ua);
    var probe = document.createElement('video');
    var src = '';
    if (safari) { if (w.mov && probe.canPlayType('video/mp4; codecs="hvc1"')) src = w.mov; }
    else if (w.webm && probe.canPlayType('video/webm; codecs="vp9"')) src = w.webm;
    if (!src) return;
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = 'auto';
    v.setAttribute('aria-hidden', 'true'); v.setAttribute('tabindex', '-1'); v.setAttribute('disablepictureinpicture', '');
    v.addEventListener('playing', function () { v.classList.add('is-playing'); setTimeout(function () { still.classList.add('is-hidden'); }, 550); });
    v.addEventListener('error', function () { v.remove(); still.classList.remove('is-hidden'); });
    v.src = src; art.appendChild(v);
    var p = v.play(); if (p && p.catch) p.catch(function () { v.remove(); });
    // pause when the hero is off-screen to save battery
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { en[0].isIntersecting ? v.play().catch(function () {}) : v.pause(); }).observe(art);
  }

  /* ---------------------------------------------------------------- init */
  function init() {
    bindConfig(); initNav(); initContract(); initStars(); initReveal();
    initFeaturedPostViewer(); initGallery(); initHeroWave();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
