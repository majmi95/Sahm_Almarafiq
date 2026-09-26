/* ===== Sahm Almarafiq — layout, language switch, motion ===== */
(function () {
  var P1 = '0510105266', P2 = '0544447611', EMAIL = 'info@sahmalmarafiq.com';
  var WA_AR = 'مرحبًا،\nأرغب بالاستفسار عن خدمات سهم المرافق';
  var WA_EN = 'Hello,\nI would like to inquire about Sahm Almarafiq services';
  function wa(msg) { return 'https://wa.me/966510105266?text=' + encodeURIComponent(msg); }

  var LOGO = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"><path d="M6 41V24l8-6 8 6v17"/><path d="M20 41V13l10-7 10 7v28"/><path d="M3 41h42"/></svg>';
  var WAI = '<svg viewBox="0 0 32 32"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.48.73 4.79 1.98 6.73L4 29l7.46-1.94a11.93 11.93 0 0 0 4.56.9c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.65 3 16.02 3zm7.03 17.15c-.3.83-1.72 1.58-2.37 1.68-.61.09-1.38.13-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.53-5.87-5.1-6.05-5.34-.18-.24-1.44-1.92-1.44-3.66s.91-2.6 1.24-2.95c.32-.35.7-.44.94-.44l.68.01c.22.01.51-.08.8.61.3.7 1.02 2.44 1.1 2.61.09.18.15.39.03.63-.12.24-.18.39-.35.6-.18.21-.37.47-.53.63-.18.18-.36.37-.16.72.21.35.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.87 1.78.35.18.56.15.77-.09.21-.24.88-1.03 1.12-1.38.24-.35.47-.29.79-.18.32.12 2.05.97 2.4 1.14.35.18.59.26.67.41.09.15.09.85-.21 1.68z"/></svg>';
  var page = document.body.getAttribute('data-page');
  var NAV = [['home','index.html','الرئيسية'],['services','services.html','خدماتنا'],['about','about.html','من نحن'],['contact','contact.html','تواصل معنا']];
  function links() { return NAV.map(function (n) { return '<a href="' + n[1] + '" data-i18n="nav.' + n[0] + '"' + (n[0] === page ? ' class="active"' : '') + '>' + n[2] + '</a>'; }).join(''); }
  var BRAND = '<a href="index.html" class="brand" aria-label="Sahm Almarafiq">' + LOGO + '<div><b data-i18n="brand">سهم المرافق</b><small>SAHM ALMARAFIQ</small></div></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = '<div class="wrap nav">' + BRAND + '<nav class="nav-links">' + links() + '</nav>' +
    '<div class="nav-actions"><button class="lang-btn" id="langBtn">EN</button>' +
    '<a href="contact.html" class="btn btn-primary" data-i18n="cta.quote">اطلب عرض سعر</a>' +
    '<button class="burger" id="burger" aria-label="Menu"><span></span></button></div></div>' +
    '<nav class="mobile-nav">' + links() + '<a href="contact.html" class="btn btn-primary" data-i18n="cta.quote">اطلب عرض سعر</a></nav>';
  document.body.insertBefore(header, document.body.firstChild);
  document.getElementById('burger').onclick = function () { header.classList.toggle('menu-open'); };
  window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = '<div class="wrap"><div class="foot"><div>' + BRAND +
    '<p data-i18n="foot.about">تشغيل وصيانة وإدارة أملاك ومرافق في الرياض والمنطقة الشرقية.</p></div>' +
    '<div class="foot-links">' +
      '<div><h4 data-i18n="foot.pages">الصفحات</h4><ul><li><a href="services.html" data-i18n="nav.services">خدماتنا</a></li><li><a href="about.html" data-i18n="nav.about">من نحن</a></li><li><a href="contact.html" data-i18n="nav.contact">تواصل معنا</a></li></ul></div>' +
      '<div><h4 data-i18n="foot.reach">تواصل</h4><ul><li><a class="ltr" href="tel:' + P1 + '">' + P1 + '</a></li><li><a class="ltr" href="tel:' + P2 + '">' + P2 + '</a></li><li><a class="ltr" href="mailto:' + EMAIL + '">' + EMAIL + '</a></li></ul></div>' +
    '</div></div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' <span data-i18n="foot.rights">سهم المرافق. جميع الحقوق محفوظة.</span></span>' +
    '<a href="https://www.instagram.com/sahmalmarafiq" target="_blank" rel="noopener">Instagram @sahmalmarafiq</a></div></div>';
  document.body.appendChild(footer);

  var fab = document.createElement('a');
  fab.className = 'wa-fab'; fab.id = 'waFab'; fab.target = '_blank'; fab.rel = 'noopener'; fab.setAttribute('aria-label', 'WhatsApp');
  fab.innerHTML = WAI;
  document.body.appendChild(fab);
  document.querySelectorAll('[data-wa-icon]').forEach(function (e) { e.innerHTML = WAI; });

  var EN = {
    'brand':'Sahm Almarafiq','nav.home':'Home','nav.services':'Services','nav.about':'About','nav.contact':'Contact',
    'cta.quote':'Request a quote','cta.wa':'WhatsApp us','cta.call':'Call us','cta.all':'All services',
    'foot.about':'Operations, maintenance, property and facilities management in Riyadh and the Eastern Province.',
    'foot.pages':'Pages','foot.reach':'Contact','foot.rights':'Sahm Almarafiq. All rights reserved.',
    /* home */
    'h.tag':'Integrated facilities management · Riyadh & Eastern Province',
    'h.t':'We run your property. <em>We protect its value.</em>',
    'h.l':'Operations and maintenance, cleaning, and property &amp; facilities management — one accountable team with fast response.',
    'h.p1':'Preventive maintenance','h.p2':'Fast response','h.p3':'Continuous follow-up',
    'h.b1':'Operations & maintenance','h.b2':'Riyadh · Eastern Province',
    's.e':'Our services','s.t':'Everything your property needs, under one team','s.l':'From technical maintenance to property management and marketing.',
    's1.t':'Operations & maintenance','s1.d':'Electrical, HVAC, plumbing and alarm systems — preventive and corrective.',
    's2.t':'Elevator maintenance','s2.d':'Periodic inspection and fast response for safe operation.',
    's3.t':'Security & CCTV','s3.d':'Installation and maintenance of cameras and alarm systems.',
    's4.t':'Professional cleaning','s4.d':'Residential buildings, corporate premises and hospitals.',
    's5.t':'Property & facilities','s5.d':'Stable occupancy, tenant follow-up and owners\u2019 associations.',
    's6.t':'Real estate marketing','s6.d':'Reaching the right tenant or buyer, faster.',
    'w.e':'Why Sahm Almarafiq','w.t':'A partner you can rely on',
    'w.l':'We take the day-to-day off your hands with clear standards, a trained team and continuous follow-up — so your property keeps its value.',
    'w.s':'We serve',
    'w1.t':'Proactive','w1.d':'Scheduled maintenance that prevents breakdowns.',
    'w2.t':'Fast response','w2.d':'A ready team for every request.',
    'w3.t':'Transparent','w3.d':'Clear follow-up until every request is closed.',
    'w4.t':'Local coverage','w4.d':'Riyadh, Dammam, Khobar and Dhahran.',
    'sec1':'Residential','sec2':'Corporate & commercial','sec3':'Healthcare','sec4':'Communities & owners\u2019 associations',
    'c.t':'Book a site survey for your property','c.d':'Tell us what you need and our team will get back to you quickly.',
    /* services */
    'sv.e':'Services','sv.t':'Integrated services, one accountable partner','sv.l':'Four service lines covering the full life-cycle of your property.',
    'o.t':'Operations & maintenance','o.d':'Preventive and corrective maintenance that reduces breakdowns and extends your building\u2019s life.',
    'o.1':'Electrical networks & HVAC','o.2':'Plumbing & leak repair','o.3':'Elevator maintenance','o.4':'Fire alarm, CCTV & security systems',
    'm.t':'Property & facilities management','m.d':'Full management of your asset so you enjoy returns without the day-to-day.',
    'm.1':'Property management & tenant follow-up','m.2':'Owners\u2019 association activation','m.3':'Shared facilities operation','m.4':'Daily services management',
    'cl.t':'Cleaning & soft services','cl.d':'Professional cleaning by trained crews.',
    'cl.1':'Residential buildings','cl.2':'Corporate premises','cl.3':'Hospitals & clinics','cl.4':'Façade cleaning',
    'g.t':'Real estate marketing','g.d':'Effective marketing that connects your property with the right people.',
    'g.1':'Marketing plans','g.2':'Reducing vacancy','g.3':'Professional unit presentation','g.4':'Lead follow-up',
    'se.e':'Sectors','se.t':'Who we serve',
    'se1.d':'Buildings, towers and compounds.','se2.d':'Offices and commercial assets.','se3.d':'Hospitals and clinics.','se4.d':'Shared facilities.',
    /* about */
    'ab.e':'About us','ab.t':'Reliable service. Tangible quality.',
    'ab.p1':'Sahm Almarafiq is a Saudi company specialised in operations, maintenance, property and facilities management.',
    'ab.p2':'We were built on a simple idea: property owners should not carry the burden of maintenance and daily operations — we carry it for them, with unified standards and continuous follow-up.',
    'vis.t':'Vision','vis.d':'To be the most trusted facilities-management partner for property owners in the Kingdom.',
    'mis.t':'Mission','mis.d':'To protect and elevate our clients\u2019 assets through proactive maintenance, disciplined operations and transparent service.',
    'hw.e':'How we work','hw.t':'Four simple steps',
    'st1.t':'Consultation','st1.d':'Tell us about your property.','st2.t':'Site survey','st2.d':'We inspect and assess on site.',
    'st3.t':'Tailored plan','st3.d':'A plan fitted to your asset and budget.','st4.t':'Operate & follow up','st4.d':'We deliver and keep you updated.',
    'rg.e':'Coverage','rg.t':'Where we operate',
    'rg1.t':'Riyadh','rg1.d':'Central Region — residential, commercial and institutional properties.',
    'rg2.t':'Eastern Province','rg2.d':'Dammam · Khobar · Dhahran.',
    /* contact */
    'co.e':'Contact','co.t':'Let\u2019s talk about your property','co.l':'Choose the channel that suits you, or send your request directly.',
    'ch.wa':'WhatsApp','ch.wa2':'The fastest way to reach us','ch.ph':'Phone','ch.em':'Email','ch.cv':'Coverage','ch.cv2':'Riyadh · Dammam · Khobar · Dhahran',
    'f.t':'Request a quote','f.d':'Your request opens in WhatsApp, ready to send.',
    'f.name':'Full name','f.phone':'Mobile','f.city':'City','f.svc':'Service','f.msg':'Details (optional)',
    'f.ph.name':'Your name','f.ph.msg':'Tell us briefly about your property',
    'f.send':'Send request','f.note':'We reply as soon as possible.',
    'o.ruh':'Riyadh','o.dmm':'Dammam','o.khb':'Khobar','o.dhr':'Dhahran','o.oth':'Other',
    'o.ops':'Operations & maintenance','o.prop':'Property / facilities management','o.cln':'Cleaning','o.sec':'Security systems','o.mkt':'Real estate marketing',
    'fq.e':'FAQ','fq.t':'Common questions',
    'q1':'Which cities do you cover?','a1':'Riyadh and the Eastern Province, including Dammam, Khobar and Dhahran.',
    'q2':'Which properties do you serve?','a2':'Residential buildings, corporate and commercial premises, hospitals and multi-owner communities.',
    'q3':'How do I get a quote?','a3':'Send your request via the form or WhatsApp. We arrange a site survey, then share a plan tailored to your property.'
  };

  var nodes = document.querySelectorAll('[data-i18n]'), ph = document.querySelectorAll('[data-i18n-ph]'), T = document.title;
  nodes.forEach(function (e) { e.setAttribute('data-ar', e.innerHTML); });
  ph.forEach(function (e) { e.setAttribute('data-ar-ph', e.getAttribute('placeholder') || ''); });
  function setLang(l) {
    var en = l === 'en', H = document.documentElement;
    H.lang = en ? 'en' : 'ar'; H.dir = en ? 'ltr' : 'rtl';
    nodes.forEach(function (e) { var k = e.getAttribute('data-i18n'); e.innerHTML = en && EN[k] ? EN[k] : e.getAttribute('data-ar'); });
    ph.forEach(function (e) { var k = e.getAttribute('data-i18n-ph'); e.setAttribute('placeholder', en && EN[k] ? EN[k] : e.getAttribute('data-ar-ph')); });
    document.title = en ? (document.body.getAttribute('data-title-en') || T) : T;
    document.getElementById('langBtn').textContent = en ? 'ع' : 'EN';
    var link = wa(en ? WA_EN : WA_AR);
    fab.href = link;
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = link; a.target = '_blank'; a.rel = 'noopener'; });
    try { localStorage.setItem('sahm-lang', l); } catch (e) {}
  }
  var saved = 'ar'; try { saved = localStorage.getItem('sahm-lang') || 'ar'; } catch (e) {}
  setLang(saved);
  document.getElementById('langBtn').onclick = function () { setLang(document.documentElement.lang === 'en' ? 'ar' : 'en'); header.classList.remove('menu-open'); };

  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (r) { io.observe(r); });
  } else rv.forEach(function (r) { r.classList.add('in'); });

  var form = document.getElementById('quoteForm');
  if (form) form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var en = document.documentElement.lang === 'en';
    function v(id) { var e = document.getElementById(id); return e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value.trim(); }
    var L = en
      ? ['Hello Sahm Almarafiq,', 'I would like a quote.', '', 'Name: ' + v('fName'), 'Mobile: ' + v('fPhone'), 'City: ' + v('fCity'), 'Service: ' + v('fSvc')]
      : ['مرحبًا سهم المرافق،', 'أرغب بطلب عرض سعر.', '', 'الاسم: ' + v('fName'), 'الجوال: ' + v('fPhone'), 'المدينة: ' + v('fCity'), 'الخدمة: ' + v('fSvc')];
    if (v('fMsg')) L.push((en ? 'Details: ' : 'التفاصيل: ') + v('fMsg'));
    window.open(wa(L.join('\n')), '_blank');
  });
})();
