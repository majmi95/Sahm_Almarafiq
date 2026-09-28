/* ===== Sahm Almarafiq — layout, language switch, request finder ===== */
(function () {
  var PHONE = '0544447611', EMAIL = 'info@sahmalmarafiq.com', MAP_URL = 'https://maps.app.goo.gl/ovJERWqB1YXPLHsR9';
  var WA_AR = 'مرحبًا،\nأرغب بالاستفسار عن خدمات سهم المرافق';
  var WA_EN = 'Hello,\nI would like to inquire about Sahm Almarafiq services';
  function wa(msg) { return 'https://wa.me/966510105266?text=' + encodeURIComponent(msg); }
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
  var QUOTE = onHome ? '#finder' : 'index.html#finder';
  var SVC = [['fm', 'facility-management.html', 'fm.t', 'إدارة المرافق'], ['om', 'operations.html', 'om.t', 'التشغيل والصيانة'], ['re', 'real-estate.html', 're.t', 'الخدمات العقارية']];
  var inSvc = SVC.some(function (s) { return s[0] === page; });
  function svcLinks() { return SVC.map(function (s) { return '<a href="' + s[1] + '"' + (s[0] === page ? ' class="active"' : '') + '><span class="dot ' + s[0] + '"></span><span data-i18n="' + s[2] + '">' + s[3] + '</span></a>'; }).join(''); }
  function a(href, key, ar, act) { return '<a href="' + href + '" data-i18n="' + key + '"' + (act ? ' class="active"' : '') + '>' + ar + '</a>'; }
  var CHEV = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
  var SECT = onHome ? '#sectors' : 'index.html#sectors';
  var desk = a('index.html', 'nav.home', 'الرئيسية', onHome) +
    '<div class="dd"><button class="dd-btn' + (inSvc ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false"><span data-i18n="nav.services">خدماتنا</span>' + CHEV + '</button><div class="dd-menu">' + svcLinks() + '</div></div>' +
    a(SECT, 'nav.sectors', 'القطاعات') + a('about.html', 'nav.about', 'من نحن', page === 'about') + a('contact.html', 'nav.contact', 'تواصل معنا', page === 'contact');
  var mob = a('index.html', 'nav.home', 'الرئيسية', onHome) +
    '<div class="m-group"><span class="m-label" data-i18n="nav.services">خدماتنا</span>' + svcLinks() + '</div>' +
    a(SECT, 'nav.sectors', 'القطاعات') + a('about.html', 'nav.about', 'من نحن', page === 'about') + a('contact.html', 'nav.contact', 'تواصل معنا', page === 'contact');
  var BRAND = '<a href="index.html" class="brand" aria-label="سهم المرافق — الرئيسية"><span class="logo" aria-hidden="true"></span></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = '<div class="wrap nav">' + BRAND + '<nav class="nav-links" aria-label="Main">' + desk + '</nav>' +
    '<div class="nav-actions"><a href="' + QUOTE + '" class="btn btn-primary btn-sm" data-i18n="cta.quote" data-quote>اطلب عرضًا</a><div class="lang-dd"><button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false" aria-controls="langMenu">EN</button><div class="lang-menu" id="langMenu" hidden><button type="button" data-lang="ar" lang="ar">العربية</button><button type="button" data-lang="en" lang="en">English</button><button type="button" data-lang="zh" lang="zh">中文</button></div></div>' +
    '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span></button></div></div>' +
    '<nav class="mobile-nav" aria-label="Mobile">' + mob + '</nav>';
  document.body.insertBefore(header, document.body.firstChild);
  var langMenu = document.getElementById('langMenu');
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
    '<div><h4 data-i18n="foot.reach">التواصل</h4><ul><li><a href="tel:' + PHONE + '" class="ltr">' + PHONE + '</a></li><li><a href="mailto:' + EMAIL + '" class="ltr">' + EMAIL + '</a></li><li><a href="' + MAP_URL + '" target="_blank" rel="noopener" data-i18n="ch.loc2">حي الشعلة، الدمام 34261</a></li><li><a href="#" data-wa data-i18n="ch.wa">واتساب</a></li></ul></div>' +
    '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' <span data-i18n="foot.rights">سهم المرافق. جميع الحقوق محفوظة.</span></span><a href="privacy.html" data-i18n="foot.privacy">سياسة الخصوصية</a></div></div>';
  document.body.appendChild(footer);

  /* ---------- Map (loads only when the visitor asks) ---------- */
  var mapBtn = document.querySelector('.map-load');
  if (mapBtn) mapBtn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://maps.google.com/maps?q=' + mapBtn.dataset.lat + ',' + mapBtn.dataset.lng + '&z=16&hl=' + ({ en: 'en', zh: 'zh-CN' }[document.documentElement.lang] || 'ar') + '&output=embed';
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
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = A11Y.dark ? '#0C1824' : '#FCFAF7';
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
    'nav.home':'Home','nav.services':'Our services','nav.sectors':'Sectors','nav.about':'About','nav.contact':'Contact',
    'cta.quote':'Request a quote','cta.explore':'Explore our services','cta.more':'Learn more',
    'h.t':'Integrated solutions for managing and operating facilities',
    'h.l':'Facility management, operations & maintenance, and real estate services for owners and organisations in the public and private sectors.',
    'fm.t':'Facility management','fm.d':'Integrated management of facilities and properties that raises the quality of facilities and services, controls costs, and makes the most of available investment opportunities.',
    'om.t':'Operations & maintenance','om.d':'Operations and maintenance work for facilities and properties, tailored to each site’s needs and the scope of work required.',
    're.t':'Real estate services','re.d':'Real estate services covering property management, marketing, leasing, sales and lease contracts.',
    'sec.t':'Sectors we serve','sec.1':'Residential','sec.2':'Commercial & administrative','sec.3':'Healthcare','sec.4':'Owners’ associations',
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
    'co.t':'Contact us','ch.wa':'WhatsApp','ch.wa2':'Message us directly','ch.ph':'Phone','ch.em':'Email','ch.ig':'Instagram','ch.loc':'Office location','ch.loc2':'Ash Shulah, Dammam 34261',
    'area.t':'Current service area','area.d':'Dammam, Khobar, Dhahran, Qatif, Saihat.',
    'map.show':'Show map','map.note':'The map loads from Google Maps','map.dir':'Directions',
    'foot.about':'Integrated solutions for managing and operating facilities.','foot.links':'Website','foot.reach':'Contact','foot.rights':'Sahm Almarafiq. All rights reserved.','foot.privacy':'Privacy Policy',
    'pv.e':'Privacy','pv.t':'Privacy Policy','pv.l2':'Your privacy matters to us. Here is how we look after your information.','pv.d':'Last updated: 28 September 2026',
    'a11y.skip':'Skip to content','a11y.t':'Accessibility','a11y.close':'Close','a11y.fs':'Text size','a11y.fsd':'Smaller text','a11y.fsu':'Larger text','a11y.dark':'Dark mode','a11y.contrast':'High contrast','a11y.motion':'Stop motion','a11y.links':'Highlight links','a11y.reset':'Reset'
  };

  /* ---------- Chinese (Simplified) copy ---------- */
  var ZH = {
    'brand.full':'Sahm Almarafiq 设施运营与维护',
    'nav.home':'首页','nav.services':'服务项目','nav.sectors':'服务领域','nav.about':'关于我们','nav.contact':'联系我们',
    'cta.quote':'获取报价','cta.explore':'了解我们的服务','cta.more':'了解更多',
    'h.t':'一体化设施管理与运营解决方案',
    'h.l':'为公共与私营领域的业主和机构提供设施管理、运营维护及房地产服务。',
    'fm.t':'设施管理','fm.d':'为各类设施与物业提供一体化管理，旨在提升设施与服务质量、控制成本，并充分把握现有的投资机会。',
    'om.t':'运营与维护','om.d':'根据每个场所的需求及所需的工作范围，执行设施与物业的运营和维护工作。',
    're.t':'房地产服务','re.d':'房地产服务涵盖物业管理、营销、租赁、销售及租赁合同签订。',
    'sec.t':'服务领域','sec.1':'住宅','sec.2':'商业与办公','sec.3':'医疗','sec.4':'业主协会',
    'how.t':'工作流程',
    'how.1t':'了解需求','how.1d':'明确设施或物业的需求及所需服务范围。',
    'how.2t':'现场勘察与评估','how.2d':'勘察现场，评估现状及实际需求。',
    'how.3t':'报价与工作计划','how.3d':'确定工作范围、费用及实施方式。',
    'how.4t':'实施与跟进','how.4d':'执行工作，并持续跟进绩效与服务质量。',
    'fn.t':'您需要什么服务？',
    'fm.1t':'运营管理','fm.2t':'合同及服务供应商管理','fm.3t':'预算与成本管理','fm.4t':'绩效与设施质量监控','fm.5t':'投资机会研究',
    'om.1t':'电气工程','om.2t':'管道工程','om.3t':'空调与制冷','om.4t':'清洁服务','om.5t':'翻新与装修',
    're.1t':'物业管理','re.1d':'一体化物业管理，从租户跟进与租金收取，到物业养护及品质与价值提升。',
    're.2t':'房地产营销、租赁与销售','re.2d':'推广房产及单元，并全程管理租赁与销售流程直至完成。',
    're.3t':'租赁合同签订','re.3d':'通过 Ejar 平台为出租人与承租人签订并备案租赁合同。',
    'fm.cta':'需要设施管理服务吗？','om.cta':'需要运营与维护服务吗？','re.cta':'需要房地产服务吗？',
    'ab.t':'关于我们','ab.p':'Sahm Almarafiq 为公共与私营领域的业主和机构，提供设施管理、运营维护及房地产服务的一体化解决方案。',
    'co.t':'联系我们','ch.wa':'WhatsApp','ch.wa2':'直接给我们发消息','ch.ph':'电话','ch.em':'电子邮件','ch.ig':'Instagram','ch.loc':'办公地址','ch.loc2':'达曼 Ash Shulah 区 34261',
    'area.t':'当前服务范围','area.d':'达曼、胡拜尔、宰赫兰、盖提夫、赛哈特。',
    'map.show':'显示地图','map.note':'地图由 Google Maps 提供','map.dir':'导航',
    'foot.about':'一体化设施管理与运营解决方案。','foot.links':'网站导航','foot.reach':'联系方式','foot.rights':'Sahm Almarafiq 版权所有。','foot.privacy':'隐私政策',
    'pv.e':'隐私','pv.t':'隐私政策','pv.l2':'我们重视您的隐私，以下说明我们如何保护您的信息。','pv.d':'最后更新：2026年9月28日',
    'a11y.skip':'跳至正文','a11y.t':'无障碍设置','a11y.close':'关闭','a11y.fs':'字体大小','a11y.fsd':'缩小字体','a11y.fsu':'放大字体','a11y.dark':'深色模式','a11y.contrast':'高对比度','a11y.motion':'停止动画','a11y.links':'突出显示链接','a11y.reset':'重置'
  };

  var HOOKS = [];
  var nodes = document.querySelectorAll('[data-i18n]'), T = document.title;
  nodes.forEach(function (e) { e.setAttribute('data-ar', e.innerHTML); });
  var DICT = { en: EN, zh: ZH };
  var TITLE_ZH = { home: 'Sahm Almarafiq | 设施管理、运营维护与房地产服务', fm: '设施管理 | Sahm Almarafiq', om: '运营与维护 | Sahm Almarafiq', re: '房地产服务 | Sahm Almarafiq', about: '关于我们 | Sahm Almarafiq', contact: '联系我们 | Sahm Almarafiq', privacy: '隐私政策 | Sahm Almarafiq' };
  /* current language: 'ar' | 'en' | 'zh' */
  function LG() { var l = document.documentElement.lang; return l === 'en' || l === 'zh' ? l : 'ar'; }
  function setLang(l) {
    if (l !== 'en' && l !== 'zh') l = 'ar';
    var H = document.documentElement, D = DICT[l];
    H.lang = l; H.dir = l === 'ar' ? 'rtl' : 'ltr';
    nodes.forEach(function (e) { var k = e.getAttribute('data-i18n'); e.innerHTML = D && D[k] ? D[k] : (l === 'zh' && EN[k]) || e.getAttribute('data-ar'); });
    document.title = l === 'en' ? (document.body.getAttribute('data-title-en') || T) : l === 'zh' ? (TITLE_ZH[page] || T) : T;
    var lb = document.getElementById('langBtn');
    lb.textContent = { ar: 'ع', en: 'EN', zh: '中文' }[l];
    lb.setAttribute('aria-label', { ar: 'اللغة', en: 'Language', zh: '语言' }[l]);
    langMenu.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-lang') === l ? 'true' : 'false'); });
    a11yBtn.setAttribute('aria-label', { ar: 'خيارات إمكانية الوصول', en: 'Accessibility options', zh: '无障碍设置' }[l]);
    var link = wa(l === 'ar' ? WA_AR : WA_EN);
    fab.href = link;
    document.querySelectorAll('[data-wa]').forEach(function (x) { x.href = link; x.target = '_blank'; x.rel = 'noopener'; });
    try { localStorage.setItem('sahm-lang', l); } catch (e) {}
    HOOKS.forEach(function (f) { f(l); });
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
    var done = function () { c.textContent = { ar: 'تم النسخ ✓', en: 'Copied ✓', zh: '已复制 ✓' }[LG()]; };
    if (navigator.clipboard) navigator.clipboard.writeText(c.getAttribute('data-copy')).then(done, function () {}); else done();
  });

  /* ---------- «ما الذي تحتاجه؟» finder ---------- */
  var app = document.getElementById('finderApp');
  if (app) {
    var MAIN = {
      fm: { ic: 'gear', t: ['إدارة المرافق', 'Facility management', '设施管理'], q: ['نوع المرفق', 'Facility type', '设施类型'],
        subs: [['res', 'سكني', 'Residential', '住宅'], ['com', 'تجاري', 'Commercial', '商业']] },
      om: { ic: 'bolt', t: ['التشغيل والصيانة', 'Operations & maintenance', '运营与维护'], q: ['الخدمة المطلوبة', 'Service needed', '所需服务'],
        subs: [['elec', 'كهرباء', 'Electrical', '电气'], ['plumb', 'سباكة', 'Plumbing', '管道'], ['ac', 'تكييف', 'Air conditioning', '空调'], ['clean', 'نظافة', 'Cleaning', '清洁'], ['reno', 'ترميم وتشطيبات', 'Renovation & finishing', '翻新与装修']] },
      re: { ic: 'home', t: ['الخدمات العقارية', 'Real estate services', '房地产服务'], q: ['الخدمة المطلوبة', 'Service needed', '所需服务'],
        subs: [['pm', 'إدارة أملاك', 'Property management', '物业管理'], ['mkt', 'تسويق وتأجير وبيع', 'Marketing, leasing & sales', '营销、租赁与销售'], ['ejar', 'إبرام عقد إيجار', 'Lease contract (Ejar)', '租赁合同签订（Ejar）']] }
    };
    var ORDER = ['fm', 'om', 're'];
    /* pre-select a main service: index.html?need=fm#finder (service pages), or in-page links with data-need */
    var need = new URLSearchParams(location.search).get('need');
    var F = { main: null, sub: null, sent: null, busy: false, err: '', bad: '', v: { city: '', district: '', name: '', phone: '' } };
    var box = document.getElementById('finderBox');
    var L = function (lg, ar, en, zh) { return lg === 'zh' ? zh : lg === 'en' ? en : ar; };
    var render = function (lg, focus) {
      var i = { ar: 0, en: 1, zh: 2 }[lg] || 0, h = '';
      box.classList.remove('fm', 'om', 're'); if (F.main) box.classList.add(F.main);
      if (F.sent) {
        h = '<div class="f-ok fx-in" tabindex="-1"><span class="ic">' + icon('check') + '</span><h3>' + L(lg, 'تم استلام طلبك، وسيتواصل معك فريق سهم المرافق.', 'Your request has been received, and the Sahm Almarafiq team will contact you.', '我们已收到您的请求，Sahm Almarafiq 团队将与您联系。') + '</h3>' +
          '<div class="ref"><span>' + L(lg, 'رقم الطلب', 'Reference', '请求编号') + '</span><b class="ltr">' + F.sent + '</b><button type="button" data-copy="' + F.sent + '">' + L(lg, 'نسخ', 'Copy', '复制') + '</button></div>' +
          '<p style="margin-top:14px"><button type="button" class="f-back" data-reset style="margin:0">' + L(lg, 'إرسال طلب آخر', 'Send another request', '提交新的请求') + '</button></p></div>';
        app.innerHTML = h; if (focus) app.querySelector('.f-ok').focus(); return;
      }
      h += '<div class="fstep"><div class="opts" role="group">' + ORDER.map(function (k) {
        var m = MAIN[k];
        return '<button type="button" class="opt ' + k + '" data-main="' + k + '" aria-pressed="' + (F.main === k) + '"><span class="ic">' + icon(m.ic) + '</span>' + m.t[i] + '</button>';
      }).join('') + '</div></div>';
      if (F.main) {
        var m = MAIN[F.main];
        h += '<div class="fstep fx-in"><div class="lbl"><span class="num">2</span>' + m.q[i] + '</div><div class="chips" role="group">' +
          m.subs.map(function (s) { return '<button type="button" class="chip" data-sub="' + s[0] + '" aria-pressed="' + (F.sub === s[0]) + '">' + s[i + 1] + '</button>'; }).join('') + '</div></div>';
      }
      if (F.main && F.sub) {
        var fld = function (id, lab, type, auto, ph) {
          return '<div class="field"><label for="ff-' + id + '">' + lab + '</label><input id="ff-' + id + '" name="' + id + '" type="' + type + '"' + (auto ? ' autocomplete="' + auto + '"' : '') + (type === 'tel' ? ' inputmode="tel" dir="ltr"' : '') + (ph ? ' placeholder="' + ph + '"' : '') + ' value="' + esc(F.v[id]) + '"' + (F.bad === id ? ' aria-invalid="true"' : '') + '></div>';
        };
        h += '<form class="fstep fx-in" novalidate><div class="lbl"><span class="num">3</span>' + L(lg, 'بيانات التواصل', 'Your details', '联系信息') + '</div><div class="fields">' +
          fld('city', L(lg, 'المدينة', 'City', '城市'), 'text', 'address-level2', L(lg, 'مثال: الدمام', 'e.g. Dammam', '例如：达曼')) +
          fld('district', L(lg, 'الحي', 'District', '街区'), 'text', 'address-level3', '') +
          fld('name', L(lg, 'الاسم', 'Name', '姓名'), 'text', 'name', '') +
          fld('phone', L(lg, 'رقم الجوال', 'Mobile number', '手机号码'), 'tel', 'tel', '05xxxxxxxx') +
          '</div><p class="f-err" role="alert">' + esc(F.err) + '</p><div class="f-submit"><button type="submit" class="btn btn-primary"' + (F.busy ? ' disabled' : '') + '>' + (F.busy ? L(lg, 'جارٍ الإرسال…', 'Sending…', '正在提交…') : L(lg, 'إرسال الطلب', 'Send request', '提交请求')) + '</button>' +
          '<p class="consent">' + L(lg, 'بإرسالك الطلب، توافق على <a href="privacy.html">سياسة الخصوصية</a>.', 'By sending your request you agree to our <a href="privacy.html">Privacy Policy</a>.', '提交即表示您同意我们的<a href="privacy.html">隐私政策</a>。') + '</p></div></form>';
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
      var lg = LG(), b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-main')) { var k = b.getAttribute('data-main'); if (F.main !== k) pick(k); render(lg, '[data-main="' + k + '"]'); nudge('.chips'); }
      else if (b.hasAttribute('data-sub')) { F.sub = b.getAttribute('data-sub'); F.err = ''; render(lg, '[data-sub="' + F.sub + '"]'); nudge('form'); }
      else if (b.hasAttribute('data-reset')) { F.sent = null; F.main = null; F.sub = null; render(lg, '[data-main]'); }
    });
    app.addEventListener('input', function (e) {
      if (e.target.name in F.v) F.v[e.target.name] = e.target.value;
      if (F.err) { F.err = ''; F.bad = ''; var er = app.querySelector('.f-err'); if (er) er.textContent = ''; e.target.removeAttribute('aria-invalid'); }
    });
    app.addEventListener('submit', function (e) {
      e.preventDefault(); if (F.busy) return;
      var lg = LG(), v = F.v;
      F.bad = !v.city.trim() ? 'city' : !v.name.trim() ? 'name' : !validPhone(v.phone) ? 'phone' : '';
      F.err = { city: L(lg, 'فضلًا اكتب المدينة.', 'Please enter your city.', '请输入城市。'), name: L(lg, 'فضلًا اكتب اسمك.', 'Please enter your name.', '请输入您的姓名。'), phone: L(lg, 'فضلًا أدخل رقم جوال صحيح.', 'Please enter a valid mobile number.', '请输入有效的手机号码。') }[F.bad] || '';
      if (F.bad) { render(lg, '#ff-' + F.bad); return; }
      var m = MAIN[F.main], s = m.subs.filter(function (x) { return x[0] === F.sub; })[0];
      var src = (need === F.main && { fm: 'صفحة إدارة المرافق', om: 'صفحة التشغيل والصيانة', re: 'صفحة الخدمات العقارية' }[need]) || 'الرئيسية';
      var ref = makeRef(); F.busy = true; render(lg);
      sendLead({ ref: ref, name: v.name.trim(), phone: v.phone.trim(), city: v.city.trim() + (v.district.trim() ? ' — ' + v.district.trim() : ''), type: m.t[0],
        service: (F.main === 'fm' ? 'مرفق ' : '') + s[1] + ' — ما الذي تحتاجه؟ (' + src + ')' })
        .then(function () { F.busy = false; F.sent = ref; render(lg, '.f-ok'); })
        .catch(function () { F.busy = false; F.err = L(lg, 'تعذّر الإرسال. حاول مرة أخرى أو تواصل معنا عبر واتساب.', 'Sending failed. Please try again or contact us on WhatsApp.', '提交失败，请重试或通过 WhatsApp 联系我们。'); render(lg); });
    });
    if (need) pick(need);
    document.addEventListener('click', function (e) { var l = e.target.closest && e.target.closest('a[data-need]'); if (l) { pick(l.getAttribute('data-need')); render(LG()); } });
    HOOKS.push(function (lg) { render(lg); });
  }

  var saved = 'ar'; try { saved = localStorage.getItem('sahm-lang') || 'ar'; } catch (e) {}
  setLang(saved);
  var langBtn = document.getElementById('langBtn');
  function openLang(open) { langMenu.hidden = !open; langBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  langBtn.addEventListener('click', function (e) { e.stopPropagation(); openLang(langMenu.hidden); });
  langMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    var b = e.target.closest('[data-lang]'); if (!b) return;
    setLang(b.getAttribute('data-lang')); openLang(false); header.classList.remove('menu-open'); langBtn.focus();
  });
  document.addEventListener('click', function () { if (!langMenu.hidden) openLang(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !langMenu.hidden) { openLang(false); langBtn.focus(); } });

  /* reveal on scroll */
  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !document.documentElement.classList.contains('a11y-nomotion')) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    rv.forEach(function (r) { io.observe(r); });
  } else rv.forEach(function (r) { r.classList.add('in'); });

  /* arriving at #finder from another page: land on the box once layout settles */
  if (location.hash === '#finder' && app) setTimeout(function () { document.getElementById('finder').scrollIntoView({ block: 'start' }); }, 60);
})();
