/* ===== Sahm Almarafiq — layout, language switch, request finder ===== */
(function () {
  var PHONE = '0138181292', MOBILE = '0510105266', EMAIL = 'info@sahmalmarafiq.com', MAP_URL = 'https://maps.app.goo.gl/ovJERWqB1YXPLHsR9';
  var WA_AR = 'مرحبًا،\nأرغب بالاستفسار عن خدمات سهم المرافق';
  var WA_EN = 'Hello,\nI would like to inquire about Sahm Almarafiq services';
  function wa(msg) { return 'https://wa.me/966138181292?text=' + encodeURIComponent(msg); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Icons (24px line set) ---------- */
  var ICO = {
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6M9 9h2"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4"/>',
    chart: '<path d="M4 20h16"/><rect x="6" y="11" width="3" height="7" rx=".5"/><rect x="11" y="7" width="3" height="11" rx=".5"/><rect x="16" y="4" width="3" height="14" rx=".5"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    faucet: '<path d="M3 11h8a4 4 0 0 1 4 4v1h3v-1a7 7 0 0 0-7-7H3"/><path d="M7 8V5M5 5h4"/><path d="M16.5 19.5a1.5 1.5 0 0 1-3 0c0-1 1.5-2.5 1.5-2.5s1.5 1.5 1.5 2.5z"/>',
    ac: '<rect x="3" y="5" width="18" height="9" rx="2"/><path d="M7 11h10M8 17v2M12 17v3M16 17v2"/>',
    broom: '<path d="M14 3l-3 7"/><path d="M8 10h6l3 11H5z"/><path d="M9 21l1-5M13 21l-.5-5"/>',
    roller: '<rect x="4" y="3" width="14" height="6" rx="1.5"/><path d="M18 6h2v5h-8v3"/><rect x="10.5" y="14" width="3" height="7" rx="1"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    office: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>',
    health: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
    shop: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 0 1-5.3 1.9A3 3 0 0 1 12 14a3 3 0 0 1-2.7-1.1A3 3 0 0 1 4 11z"/><path d="M5 13v8h14v-8M10 21v-5h4v5"/>',
    mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    check: '<path d="M20 6L9 17l-5-5"/>'
  };
  var WAP = '<path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.48.73 4.79 1.98 6.73L4 29l7.46-1.94a11.93 11.93 0 0 0 4.56.9c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.65 3 16.02 3zm7.03 17.15c-.3.83-1.72 1.58-2.37 1.68-.61.09-1.38.13-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.53-5.87-5.1-6.05-5.34-.18-.24-1.44-1.92-1.44-3.66s.91-2.6 1.24-2.95c.32-.35.7-.44.94-.44l.68.01c.22.01.51-.08.8.61.3.7 1.02 2.44 1.1 2.61.09.18.15.39.03.63-.12.24-.18.39-.35.6-.18.21-.37.47-.53.63-.18.18-.36.37-.16.72.21.35.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.87 1.78.35.18.56.15.77-.09.21-.24.88-1.03 1.12-1.38.24-.35.47-.29.79-.18.32.12 2.05.97 2.4 1.14.35.18.59.26.67.41.09.15.09.85-.21 1.68z"/>';
  var WAI = '<svg width="28" height="28" viewBox="0 0 32 32">' + WAP + '</svg>';
  function icon(k) { return k === 'wa' ? '<svg viewBox="0 0 32 32">' + WAP + '</svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICO[k] || '') + '</svg>'; }
  document.querySelectorAll('[data-ic]').forEach(function (e) { e.innerHTML = icon(e.getAttribute('data-ic')); });
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Header ---------- */
  var page = document.body.getAttribute('data-page');
  var onHome = page === 'home';
  var onSvc = ['fm', 'om', 're'].indexOf(page) > -1;
  var QUOTE = onSvc ? '#finder' : 'quote.html';
  var SVC = [['fm', 'facility-management.html', 'fm.t', 'إدارة المرافق'], ['om', 'operations.html', 'om.t', 'التشغيل والصيانة'], ['re', 'real-estate.html', 're.t', 'الخدمات العقارية']];
  var inSvc = SVC.some(function (s) { return s[0] === page; });
  function svcLinks() { return SVC.map(function (s) { return '<a href="' + s[1] + '"' + (s[0] === page ? ' class="active"' : '') + '><span class="dot ' + s[0] + '"></span><span data-i18n="' + s[2] + '">' + s[3] + '</span></a>'; }).join(''); }
  function a(href, key, ar, act) { return '<a href="' + href + '" data-i18n="' + key + '"' + (act ? ' class="active"' : '') + '>' + ar + '</a>'; }
  var CHEV = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var SECT = 'sectors.html';
  var desk = a('index.html', 'nav.home', 'الرئيسية', onHome) +
    '<div class="dd"><button class="dd-btn' + (inSvc ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false"><span data-i18n="nav.services">خدماتنا</span>' + CHEV + '</button><div class="dd-menu">' + svcLinks() + '</div></div>' +
    a(SECT, 'nav.sectors', 'عملائنا', page === 'sectors') + a('about.html', 'nav.about', 'من نحن', page === 'about') + a('contact.html', 'nav.contact', 'تواصل معنا', page === 'contact');
  var mob = a('index.html', 'nav.home', 'الرئيسية', onHome) +
    '<div class="m-group"><span class="m-label" data-i18n="nav.services">خدماتنا</span>' + svcLinks() + '</div>' +
    a(SECT, 'nav.sectors', 'عملائنا', page === 'sectors') + a('about.html', 'nav.about', 'من نحن', page === 'about') + a('contact.html', 'nav.contact', 'تواصل معنا', page === 'contact');
  var BRAND = '<a href="index.html" class="brand" aria-label="سهم المرافق — الرئيسية"><span class="logo" aria-hidden="true"></span></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = '<div class="wrap nav">' + BRAND + '<nav class="nav-links" aria-label="Main">' + desk + '</nav>' +
    '<div class="nav-actions"><a href="' + QUOTE + '" class="btn btn-primary btn-sm" data-i18n="cta.quote" data-quote>اطلب عرضًا</a><button class="lang-btn" id="langBtn">EN</button>' +
    '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><svg class="i-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="i-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div></div>' +
    '<nav class="mobile-nav" aria-label="Mobile">' + mob + '</nav>';
  document.body.insertBefore(header, document.body.firstChild);
  var dd = header.querySelector('.dd'), ddBtn = header.querySelector('.dd-btn');
  ddBtn.addEventListener('click', function (e) { e.stopPropagation(); ddBtn.setAttribute('aria-expanded', dd.classList.toggle('open') ? 'true' : 'false'); });
  document.addEventListener('click', function () { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', 'false'); });
  var burger = document.getElementById('burger');
  burger.onclick = function () { burger.setAttribute('aria-expanded', header.classList.toggle('menu-open') ? 'true' : 'false'); };
  header.querySelectorAll('.mobile-nav a').forEach(function (l) { l.addEventListener('click', function () { header.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }); });
  window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  /* ---------- Footer ---------- */
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = '<div class="wrap"><div class="foot">' +
    '<div><a href="index.html" class="brand" aria-label="سهم المرافق"><span class="logo" aria-hidden="true"></span></a><p data-i18n="foot.about">حلول متكاملة لإدارة وتشغيل المرافق.</p></div>' +
    '<div><h4 data-i18n="foot.links">الموقع</h4><ul><li>' + a('index.html', 'nav.home', 'الرئيسية') + '</li><li>' + a('about.html', 'nav.about', 'من نحن') + '</li><li>' + a('contact.html', 'nav.contact', 'تواصل معنا') + '</li><li><a href="' + QUOTE + '" data-i18n="cta.quote" data-quote>اطلب عرضًا</a></li></ul></div>' +
    '<div><h4 data-i18n="nav.services">خدماتنا</h4><ul>' + SVC.map(function (s) { return '<li><a href="' + s[1] + '" data-i18n="' + s[2] + '">' + s[3] + '</a></li>'; }).join('') + '</ul></div>' +
    '<div class="foot-reach"><h4 data-i18n="foot.reach">التواصل</h4><ul><li><a href="tel:' + PHONE + '" class="ltr">' + PHONE + '</a></li><li><a href="tel:' + MOBILE + '" class="ltr">' + MOBILE + '</a></li><li><a href="mailto:' + EMAIL + '" class="ltr">' + EMAIL + '</a></li><li><a href="' + MAP_URL + '" target="_blank" rel="noopener" data-i18n="ch.loc2">حي الشعلة، الدمام 34261</a></li><li><a href="#" data-wa data-i18n="ch.wa">واتساب</a></li></ul><div class="foot-icons">' +
      '<a href="#" data-wa aria-label="WhatsApp"><svg viewBox="0 0 32 32">' + WAP + '</svg></a>' +
      '<a href="tel:' + PHONE + '" aria-label="' + PHONE + '">' + icon('phone') + '</a>' +
      '<a href="tel:' + MOBILE + '" aria-label="' + MOBILE + '">' + icon('mobile') + '</a>' +
      '<a href="mailto:' + EMAIL + '" aria-label="' + EMAIL + '">' + icon('mail') + '</a>' +
      '<a href="' + MAP_URL + '" target="_blank" rel="noopener" aria-label="Map">' + icon('pin') + '</a>' +
    '</div></div>' +
    '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' <span data-i18n="foot.rights">سهم المرافق. جميع الحقوق محفوظة.</span></span><a href="privacy.html" data-i18n="foot.privacy">سياسة الخصوصية</a></div></div>';
  document.body.appendChild(footer);

  /* ---------- Map (loads only when the visitor asks) ---------- */
  var mapBtn = document.querySelector('.map-load');
  if (mapBtn) mapBtn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://maps.google.com/maps?q=' + mapBtn.dataset.lat + ',' + mapBtn.dataset.lng + '&z=16&hl=' + (document.documentElement.lang || 'ar') + '&output=embed';
    f.title = 'Google Maps'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    mapBtn.replaceWith(f);
  });

  var fab = document.createElement('a');
  fab.className = 'wa-fab'; fab.target = '_blank'; fab.rel = 'noopener'; fab.setAttribute('aria-label', 'WhatsApp');
  fab.innerHTML = WAI;
  document.body.appendChild(fab);

  /* ---------- Accessibility: skip link + settings panel ---------- */
  var mainEl = document.querySelector('main');
  if (mainEl) { mainEl.id = mainEl.id || 'main'; mainEl.setAttribute('tabindex', '-1'); }
  var skip = document.createElement('a');
  skip.className = 'skip-link'; skip.href = '#main'; skip.setAttribute('data-i18n', 'a11y.skip'); skip.textContent = 'تخطَّ إلى المحتوى';
  document.body.insertBefore(skip, document.body.firstChild);
  var A11Y_KEY = 'sahm-a11y', A11Y = { fs: 0, dark: false, contrast: false, motion: false, links: false };
  try { var st = JSON.parse(localStorage.getItem(A11Y_KEY) || '{}'); for (var k in A11Y) if (k in st) A11Y[k] = st[k]; } catch (e) {}
  var FS = [-1, 0, 1, 2, 3], panel;
  function applyA11y() {
    var H = document.documentElement;
    H.classList.remove('a11y-fs--1', 'a11y-fs-1', 'a11y-fs-2', 'a11y-fs-3');
    if (A11Y.fs) H.classList.add('a11y-fs-' + A11Y.fs);
    H.classList.toggle('a11y-dark', !!A11Y.dark);
    H.classList.toggle('a11y-contrast', !!A11Y.contrast);
    H.classList.toggle('a11y-nomotion', !!A11Y.motion);
    H.classList.toggle('a11y-links', !!A11Y.links);
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = A11Y.dark ? '#0C1824' : '#FFFFFF';
    if (panel) {
      panel.querySelector('.a11y-fs-val').textContent = Math.round(100 + A11Y.fs * 12.5) + '%';
      panel.querySelector('[data-a11y="fs-down"]').disabled = A11Y.fs <= FS[0];
      panel.querySelector('[data-a11y="fs-up"]').disabled = A11Y.fs >= FS[FS.length - 1];
      panel.querySelectorAll('[data-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', A11Y[b.getAttribute('data-toggle')] ? 'true' : 'false'); });
    }
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(A11Y)); } catch (e) {}
  }
  var A11I = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="1.8" fill="currentColor" stroke="none"/><path d="M5 8.5l7 1.5 7-1.5M12 10v5M12 15l-3.5 6M12 15l3.5 6"/></svg>';
  var tgl = function (key, lbl, ic) { return '<button type="button" class="a11y-opt" data-toggle="' + key + '" aria-pressed="false"><span aria-hidden="true">' + ic + '</span><span data-i18n="a11y.' + key + '">' + lbl + '</span></button>'; };
  var a11yBtn = document.createElement('button');
  a11yBtn.type = 'button'; a11yBtn.className = 'a11y-btn'; a11yBtn.innerHTML = A11I;
  a11yBtn.setAttribute('aria-haspopup', 'dialog'); a11yBtn.setAttribute('aria-expanded', 'false'); a11yBtn.setAttribute('aria-controls', 'a11yPanel');
  panel = document.createElement('div');
  panel.className = 'a11y-panel'; panel.id = 'a11yPanel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'a11yTitle');
  panel.innerHTML = '<div class="a11y-head"><b id="a11yTitle" data-i18n="a11y.t">إمكانية الوصول</b><button type="button" class="a11y-x" data-a11y="close"><span aria-hidden="true">×</span><span class="sr-only" data-i18n="a11y.close">إغلاق</span></button></div>' +
    '<div class="a11y-fs"><span data-i18n="a11y.fs">حجم الخط</span><div class="a11y-fs-ctl"><button type="button" data-a11y="fs-down"><span aria-hidden="true">A−</span><span class="sr-only" data-i18n="a11y.fsd">تصغير الخط</span></button><output class="a11y-fs-val" aria-live="polite">100%</output><button type="button" data-a11y="fs-up"><span aria-hidden="true">A+</span><span class="sr-only" data-i18n="a11y.fsu">تكبير الخط</span></button></div></div>' +
    '<div class="a11y-grid">' +
      tgl('dark', 'الوضع الليلي', '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>') +
      tgl('contrast', 'تباين عالٍ', '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor"/></svg>') +
      tgl('motion', 'إيقاف الحركة', '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>') +
      tgl('links', 'تمييز الروابط', '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>') +
    '</div><button type="button" class="a11y-reset" data-a11y="reset" data-i18n="a11y.reset">إعادة الضبط</button>';
  document.body.appendChild(a11yBtn); document.body.appendChild(panel);
  function openA11y(open) { panel.hidden = !open; a11yBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); if (open) panel.querySelector('.a11y-x').focus(); }
  a11yBtn.addEventListener('click', function (e) { e.stopPropagation(); openA11y(panel.hidden); });
  panel.addEventListener('click', function (e) {
    e.stopPropagation();
    var b = e.target.closest('button'); if (!b) return;
    var act = b.getAttribute('data-a11y'), t = b.getAttribute('data-toggle');
    if (act === 'close') { openA11y(false); a11yBtn.focus(); return; }
    if (act === 'fs-up') A11Y.fs = Math.min(A11Y.fs + 1, FS[FS.length - 1]);
    if (act === 'fs-down') A11Y.fs = Math.max(A11Y.fs - 1, FS[0]);
    if (act === 'reset') A11Y = { fs: 0, dark: false, contrast: false, motion: false, links: false };
    if (t) A11Y[t] = !A11Y[t];
    applyA11y();
  });
  document.addEventListener('click', function () { if (!panel.hidden) openA11y(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { openA11y(false); a11yBtn.focus(); } });
  applyA11y();

  /* ---------- English copy ---------- */
  var EN = {
    'brand.full':'Sahm Almarafiq Operations & Maintenance',
    'nav.home':'Home','nav.services':'Our services','nav.sectors':'Our clients','nav.about':'About','nav.contact':'Contact',
    'cta.quote':'Request a quote','cta.explore':'Explore our services','cta.more':'Learn more',
    'h.t':'Integrated solutions for managing and operating facilities',
    'h.l':'Facility management, operations & maintenance, and real estate services for owners and organisations in the public and private sectors.',
    'fm.t':'Facility management','fm.d':'Integrated management of facilities and properties that raises the quality of facilities and services, controls costs, and makes the most of available investment opportunities.',
    'om.t':'Operations & maintenance','om.d':'Operations and maintenance work for facilities and properties, tailored to each site’s needs and the scope of work required.',
    're.t':'Real estate services','re.d':'Real estate services covering property management, marketing, leasing, sales and lease contracts.',
    'sec.t':'Our clients','sx.lbl':'Available services','sx.cta':'Do you need our services for your facility?','sx1.d':'Residential buildings, compounds and villas.','sx2.d':'Commercial buildings, offices and administrative headquarters.','sx3.d':'Hospitals, clinics and medical centres.','sx4.d':'Multi-owner buildings and compounds and their shared areas.','sec.1':'Residential','sec.2':'Commercial & administrative','sec.3':'Healthcare','sec.4':'Owners’ associations',
    'how.t':'How we work',
    'how.1t':'Understanding the need','how.1d':'We define the facility’s or property’s needs and the scope of service required.',
    'how.2t':'Inspection & assessment','how.2d':'We inspect the site and assess its condition and actual requirements.',
    'how.3t':'Proposal & work plan','how.3d':'We define the scope of work, the cost and the delivery approach.',
    'how.4t':'Delivery & follow-up','how.4d':'We carry out the work and monitor performance and service quality.',
    'fn.t':'What do you need?',
    'fm.1t':'Operations management','fm.2t':'Contracts & service providers management','fm.3t':'Budget & cost management','fm.4t':'Performance & facility quality monitoring','fm.5t':'Investment opportunity studies',
    'om.1t':'Electrical works','om.2t':'Plumbing works','om.3t':'Air conditioning & refrigeration','om.4t':'Cleaning works','om.5t':'Renovation & finishing',
    're.1t':'Property management','re.1d':'Integrated property management, from tenant follow-up and collections to maintaining the property and raising its quality and value.',
    're.2t':'Real estate marketing, leasing & sales','re.2d':'Marketing properties and units, and managing leasing and sales through to completion.',
    're.3t':'Lease contracts','re.3d':'Drafting and registering lease contracts between landlord and tenant through the Ejar platform.',
    'fm.cta':'Do you need facility management services?','om.cta':'Do you need operations & maintenance services?','re.cta':'Do you need real estate services?',
    'ab.t':'About us','ab.p':'Sahm Almarafiq provides integrated solutions in facility management, operations & maintenance, and real estate services for owners and organisations in the public and private sectors.',
    'co.t':'Contact us','ch.wa':'WhatsApp','ch.wa2':'Message us directly','ch.ph':'Phone','ch.mob':'Mobile','ch.em':'Email','ch.ig':'Instagram','ch.loc':'Office location','ch.loc2':'Ash Shulah, Dammam 34261',
    'area.t':'Current service area','area.d':'<span class="area-reg">Eastern Province</span><span class="area-cities"><span>Dammam</span><span>Khobar</span><span>Dhahran</span></span>',
    'map.show':'Show map','map.note':'The map loads from Google Maps','map.dir':'Directions',
    'foot.about':'Integrated solutions for managing and operating facilities.','foot.links':'Website','foot.reach':'Contact','foot.rights':'Sahm Almarafiq. All rights reserved.','foot.privacy':'Privacy Policy',
    'pv.e':'Privacy','pv.t':'Privacy Policy','pv.l2':'Your privacy matters to us. Here is how we look after your information.','pv.d':'Last updated: 28 September 2026',
    'a11y.skip':'Skip to content','a11y.t':'Accessibility','a11y.close':'Close','a11y.fs':'Text size','a11y.fsd':'Smaller text','a11y.fsu':'Larger text','a11y.dark':'Dark mode','a11y.contrast':'High contrast','a11y.motion':'Stop motion','a11y.links':'Highlight links','a11y.reset':'Reset'
  };

  var HOOKS = [];
  var nodes = document.querySelectorAll('[data-i18n]'), T = document.title;
  nodes.forEach(function (e) { e.setAttribute('data-ar', e.innerHTML); });
  function setLang(l) {
    var en = l === 'en', H = document.documentElement;
    H.lang = en ? 'en' : 'ar'; H.dir = en ? 'ltr' : 'rtl';
    nodes.forEach(function (e) { var k = e.getAttribute('data-i18n'); e.innerHTML = en && EN[k] ? EN[k] : e.getAttribute('data-ar'); });
    document.title = en ? (document.body.getAttribute('data-title-en') || T) : T;
    var lb = document.getElementById('langBtn');
    lb.textContent = en ? 'ع' : 'EN'; lb.setAttribute('aria-label', en ? 'التبديل إلى العربية' : 'Switch to English');
    a11yBtn.setAttribute('aria-label', en ? 'Accessibility options' : 'خيارات إمكانية الوصول');
    var link = wa(en ? WA_EN : WA_AR);
    fab.href = link;
    document.querySelectorAll('[data-wa]').forEach(function (x) { x.href = link; x.target = '_blank'; x.rel = 'noopener'; });
    try { localStorage.setItem('sahm-lang', l); } catch (e) {}
    HOOKS.forEach(function (f) { f(en); });
  }

  /* ---------- Google Forms connection ---------- */
  var GF = {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSelebci6NyLK1aqt2hoZHARp2XyeTo6Q-Y6yF1sjhHowdHgvw/formResponse',
    name: 'entry.2070584688', phone: 'entry.1332491611', city: 'entry.850383722', type: 'entry.1865738174', service: 'entry.1878773108'
  };
  function makeRef() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; }, r;
    try { r = crypto.getRandomValues(new Uint32Array(1))[0] % 9000 + 1000; } catch (e) { r = Math.floor(Math.random() * 9000) + 1000; }
    return 'SA-' + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + '-' + r;
  }
  /* the reference number is saved with the service so it shows in the sheet and in the Telegram alert */
  function sendLead(o) {
    var data = new URLSearchParams();
    data.append(GF.name, o.name); data.append(GF.phone, o.phone); data.append(GF.city, o.city); data.append(GF.type, o.type);
    data.append(GF.service, '[' + o.ref + '] ' + o.service);
    return fetch(GF.action, { method: 'POST', mode: 'no-cors', body: data });
  }
  function validPhone(s) { return s.replace(/[^0-9٠-٩]/g, '').length >= 9; }
  document.addEventListener('click', function (e) {
    var c = e.target.closest && e.target.closest('[data-copy]'); if (!c) return;
    var en = document.documentElement.lang === 'en', done = function () { c.textContent = en ? 'Copied ✓' : 'تم النسخ ✓'; };
    if (navigator.clipboard) navigator.clipboard.writeText(c.getAttribute('data-copy')).then(done, function () {}); else done();
  });

  /* ---------- «ما الذي تحتاجه؟» finder ---------- */
  var app = document.getElementById('finderApp');
  if (app) {
    var MAIN = {
      fm: { ic: 'gear', t: ['إدارة المرافق', 'Facility management'], q: ['نوع المرفق', 'Facility type'],
        subs: [['res', 'سكني', 'Residential', 'home'], ['com', 'تجاري', 'Commercial', 'office']] },
      om: { ic: 'bolt', t: ['التشغيل والصيانة', 'Operations & maintenance'], q: ['الخدمة المطلوبة', 'Service needed'],
        subs: [['elec', 'كهرباء', 'Electrical'], ['plumb', 'سباكة', 'Plumbing'], ['ac', 'تكييف', 'Air conditioning'], ['clean', 'نظافة', 'Cleaning'], ['reno', 'ترميم وتشطيبات', 'Renovation & finishing']] },
      re: { ic: 'home', t: ['الخدمات العقارية', 'Real estate services'], q: ['الخدمة المطلوبة', 'Service needed'],
        subs: [['pm', 'إدارة أملاك', 'Property management'], ['mkt', 'تسويق وتأجير وبيع', 'Marketing, leasing & sales'], ['ejar', 'إبرام عقد إيجار', 'Lease contract (Ejar)']] }
    };
    var ORDER = ['fm', 'om', 're'];
    /* pre-select a main service: quote.html?need=fm, or in-page links with data-need */
    var need = new URLSearchParams(location.search).get('need');
    var F = { main: null, sub: null, sent: null, busy: false, err: '', bad: '', v: { city: '', district: '', name: '', phone: '' } };
    var box = document.getElementById('finderBox');
    /* on a service page the form is fixed to that service: no step 1 */
    var LOCK = box.getAttribute('data-main');
    var L = function (en, ar, e) { return en ? e : ar; };
    var render = function (en, focus) {
      var i = en ? 1 : 0, h = '';
      box.classList.remove('fm', 'om', 're'); if (F.main) box.classList.add(F.main);
      if (F.sent) {
        h = '<div class="f-ok fx-in" tabindex="-1"><span class="ic">' + icon('check') + '</span><h3>' + L(en, 'تم استلام طلبك، وسيتواصل معك فريق سهم المرافق.', 'Your request has been received, and the Sahm Almarafiq team will contact you.') + '</h3>' +
          '<div class="ref"><span>' + L(en, 'رقم الطلب', 'Reference') + '</span><b class="ltr">' + F.sent + '</b><button type="button" data-copy="' + F.sent + '">' + L(en, 'نسخ', 'Copy') + '</button></div>' +
          '<p style="margin-top:14px"><button type="button" class="f-back" data-reset style="margin:0">' + L(en, 'إرسال طلب آخر', 'Send another request') + '</button></p></div>';
        app.innerHTML = h; if (focus) app.querySelector('.f-ok').focus(); return;
      }
      if (!LOCK) h += '<div class="fstep"><div class="opts" role="group">' + ORDER.map(function (k) {
        var m = MAIN[k];
        return '<button type="button" class="opt ' + k + '" data-main="' + k + '" aria-pressed="' + (F.main === k) + '"><span class="ic">' + icon(m.ic) + '</span>' + m.t[i] + '</button>';
      }).join('') + '</div></div>';
      if (F.main) {
        var m = MAIN[F.main];
        h += '<div class="fstep fx-in"><div class="lbl"><span class="num">' + (LOCK ? 1 : 2) + '</span>' + m.q[i] + '</div><div class="chips" role="group">' +
          m.subs.map(function (s) { return '<button type="button" class="chip" data-sub="' + s[0] + '" aria-pressed="' + (F.sub === s[0]) + '">' + s[i + 1] + '</button>'; }).join('') + '</div></div>';
      }
      if (F.main && F.sub) {
        var fld = function (id, lab, type, auto, ph) {
          return '<div class="field"><label for="ff-' + id + '">' + lab + '</label><input id="ff-' + id + '" name="' + id + '" type="' + type + '"' + (auto ? ' autocomplete="' + auto + '"' : '') + (type === 'tel' ? ' inputmode="tel" dir="ltr"' : '') + (ph ? ' placeholder="' + ph + '"' : '') + ' value="' + esc(F.v[id]) + '"' + (F.bad === id ? ' aria-invalid="true"' : '') + '></div>';
        };
        h += '<form class="fstep fx-in" novalidate><div class="lbl"><span class="num">' + (LOCK ? 2 : 3) + '</span>' + L(en, 'بيانات التواصل', 'Your details') + '</div><div class="fields">' +
          fld('city', L(en, 'المدينة', 'City'), 'text', 'address-level2', L(en, 'مثال: الدمام', 'e.g. Dammam')) +
          fld('district', L(en, 'الحي', 'District'), 'text', 'address-level3', '') +
          fld('name', L(en, 'الاسم', 'Name'), 'text', 'name', '') +
          fld('phone', L(en, 'رقم الجوال', 'Mobile number'), 'tel', 'tel', '05xxxxxxxx') +
          '</div><p class="f-err" role="alert">' + esc(F.err) + '</p><div class="f-submit"><button type="submit" class="btn btn-primary"' + (F.busy ? ' disabled' : '') + '>' + (F.busy ? L(en, 'جارٍ الإرسال…', 'Sending…') : L(en, 'إرسال الطلب', 'Send request')) + '</button>' +
          '<p class="consent">' + L(en, 'بإرسالك الطلب، توافق على <a href="privacy.html">سياسة الخصوصية</a>.', 'By sending your request you agree to our <a href="privacy.html">Privacy Policy</a>.') + '</p></div></form>';
      }
      app.innerHTML = h;
      if (focus) { var f = app.querySelector(focus); if (f) f.focus({ preventScroll: true }); }
    };
    var nudge = function (sel) {
      var el = app.querySelector(sel); if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 20) el.scrollIntoView({ behavior: document.documentElement.classList.contains('a11y-nomotion') ? 'auto' : 'smooth', block: 'center' });
    };
    var pick = function (k) { if (!MAIN[k]) return; F.main = k; F.sub = null; F.err = ''; F.bad = ''; };
    app.addEventListener('click', function (e) {
      var en = document.documentElement.lang === 'en', b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-main')) { var k = b.getAttribute('data-main'); if (F.main !== k) pick(k); render(en, '[data-main="' + k + '"]'); nudge('.chips'); }
      else if (b.hasAttribute('data-sub')) { F.sub = b.getAttribute('data-sub'); F.err = ''; render(en, '[data-sub="' + F.sub + '"]'); nudge('form'); }
      else if (b.hasAttribute('data-reset')) { F.sent = null; F.main = LOCK || null; F.sub = null; render(en, LOCK ? '[data-sub]' : '[data-main]'); }
    });
    app.addEventListener('input', function (e) {
      if (e.target.name in F.v) F.v[e.target.name] = e.target.value;
      if (F.err) { F.err = ''; F.bad = ''; var er = app.querySelector('.f-err'); if (er) er.textContent = ''; e.target.removeAttribute('aria-invalid'); }
    });
    app.addEventListener('submit', function (e) {
      e.preventDefault(); if (F.busy) return;
      var en = document.documentElement.lang === 'en', v = F.v;
      F.bad = !v.city.trim() ? 'city' : !v.name.trim() ? 'name' : !validPhone(v.phone) ? 'phone' : '';
      F.err = { city: L(en, 'فضلًا اكتب المدينة.', 'Please enter your city.'), name: L(en, 'فضلًا اكتب اسمك.', 'Please enter your name.'), phone: L(en, 'فضلًا أدخل رقم جوال صحيح.', 'Please enter a valid mobile number.') }[F.bad] || '';
      if (F.bad) { render(en, '#ff-' + F.bad); return; }
      var m = MAIN[F.main], s = m.subs.filter(function (x) { return x[0] === F.sub; })[0];
      var PG = { fm: 'صفحة إدارة المرافق', om: 'صفحة التشغيل والصيانة', re: 'صفحة الخدمات العقارية' };
      var src = (LOCK && PG[LOCK]) || (need === F.main && PG[need]) || 'صفحة اطلب عرضًا';
      var ref = makeRef(); F.busy = true; render(en);
      sendLead({ ref: ref, name: v.name.trim(), phone: v.phone.trim(), city: v.city.trim() + (v.district.trim() ? ' — ' + v.district.trim() : ''), type: m.t[0],
        service: (F.main === 'fm' ? 'مرفق ' : '') + s[1] + ' — ' + (LOCK ? 'طلب عرض' : 'ما الذي تحتاجه؟') + ' (' + src + ')' })
        .then(function () { F.busy = false; F.sent = ref; render(en, '.f-ok'); })
        .catch(function () { F.busy = false; F.err = L(en, 'تعذّر الإرسال. حاول مرة أخرى أو تواصل معنا عبر واتساب.', 'Sending failed. Please try again or contact us on WhatsApp.'); render(en); });
    });
    if (LOCK) pick(LOCK); else if (need) pick(need);
    document.addEventListener('click', function (e) { var l = e.target.closest && e.target.closest('a[data-need]'); if (l) { pick(l.getAttribute('data-need')); render(document.documentElement.lang === 'en'); } });
    HOOKS.push(function (en) { render(en); });
  }

  var saved = 'ar'; try { saved = localStorage.getItem('sahm-lang') || 'ar'; } catch (e) {}
  setLang(saved);
  document.getElementById('langBtn').onclick = function () { setLang(document.documentElement.lang === 'en' ? 'ar' : 'en'); header.classList.remove('menu-open'); };

  /* reveal on scroll */
  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !document.documentElement.classList.contains('a11y-nomotion')) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    rv.forEach(function (r) { io.observe(r); });
  } else rv.forEach(function (r) { r.classList.add('in'); });

  /* arriving at #finder from another page: land on the box once layout settles */
  if (location.hash === '#finder' && app) setTimeout(function () { document.getElementById('finder').scrollIntoView({ block: 'start' }); }, 60);
})();
