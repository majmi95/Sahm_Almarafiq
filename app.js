/* ===== سهم المرافق — shared layout, bilingual switch, animations ===== */
(function () {
  var PHONE1 = '0510105266', PHONE2 = '0544447611', EMAIL = 'info@sahmalmarafiq.com';
  var WA_AR = 'مرحبًا،\nأرغب بالاستفسار عن خدمات سهم المرافق';
  var WA_EN = 'Hello,\nI would like to inquire about Sahm Almarafiq services';
  function waLink(msg) { return 'https://wa.me/966510105266?text=' + encodeURIComponent(msg); }

  var LOGO = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M6 41V24l8-6 8 6v17"/><path d="M20 41V13l10-7 10 7v28"/><path d="M3 41h42"/></svg>';
  var WA_ICON = '<svg viewBox="0 0 32 32"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.48.73 4.79 1.98 6.73L4 29l7.46-1.94a11.93 11.93 0 0 0 4.56.9c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.65 3 16.02 3zm7.03 17.15c-.3.83-1.72 1.58-2.37 1.68-.61.09-1.38.13-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.53-5.87-5.1-6.05-5.34-.18-.24-1.44-1.92-1.44-3.66s.91-2.6 1.24-2.95c.32-.35.7-.44.94-.44l.68.01c.22.01.51-.08.8.61.3.7 1.02 2.44 1.1 2.61.09.18.15.39.03.63-.12.24-.18.39-.35.6-.18.21-.37.47-.53.63-.18.18-.36.37-.16.72.21.35.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.87 1.78.35.18.56.15.77-.09.21-.24.88-1.03 1.12-1.38.24-.35.47-.29.79-.18.32.12 2.05.97 2.4 1.14.35.18.59.26.67.41.09.15.09.85-.21 1.68z"/></svg>';

  var page = document.body.getAttribute('data-page') || 'home';
  var NAV = [
    ['home', 'index.html', 'الرئيسية'],
    ['services', 'services.html', 'خدماتنا'],
    ['sectors', 'sectors.html', 'القطاعات'],
    ['about', 'about.html', 'من نحن'],
    ['contact', 'contact.html', 'تواصل معنا']
  ];
  function links(cls) {
    return NAV.map(function (n) {
      return '<a href="' + n[1] + '" data-i18n="nav.' + n[0] + '"' + (n[0] === page ? ' class="active"' : '') + '>' + n[2] + '</a>';
    }).join('');
  }

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<div class="wrap nav">' +
      '<a href="index.html" class="brand">' + LOGO + '<div><span data-i18n="brand">سهم المرافق</span><small>SAHM ALMARAFIQ</small></div></a>' +
      '<nav class="nav-links">' + links() + '</nav>' +
      '<div class="nav-actions">' +
        '<button class="lang-btn" id="langBtn" aria-label="Language">EN</button>' +
        '<a href="contact.html" class="btn btn-primary" data-i18n="cta.quote">اطلب عرض سعر</a>' +
        '<button class="burger" id="burger" aria-label="Menu"><span></span></button>' +
      '</div>' +
    '</div>' +
    '<nav class="mobile-nav">' + links() + '<a href="contact.html" class="btn btn-primary" data-i18n="cta.quote">اطلب عرض سعر</a></nav>';
  document.body.insertBefore(header, document.body.firstChild);

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<div class="wrap">' +
      '<div class="foot-grid">' +
        '<div><a href="index.html" class="brand">' + LOGO + '<div><span data-i18n="brand">سهم المرافق</span><small>SAHM ALMARAFIQ</small></div></a>' +
        '<p class="about" data-i18n="foot.about">شريك سعودي متخصص في التشغيل والصيانة وإدارة الأملاك والمرافق، بمعايير عالمية وخبرة محلية.</p></div>' +
        '<div><h4 data-i18n="foot.company">الشركة</h4><ul>' +
          '<li><a href="about.html" data-i18n="nav.about">من نحن</a></li>' +
          '<li><a href="sectors.html" data-i18n="nav.sectors">القطاعات</a></li>' +
          '<li><a href="contact.html" data-i18n="nav.contact">تواصل معنا</a></li></ul></div>' +
        '<div><h4 data-i18n="foot.services">الخدمات</h4><ul>' +
          '<li><a href="services.html#operations" data-i18n="svc.ops">التشغيل والصيانة</a></li>' +
          '<li><a href="services.html#property" data-i18n="svc.prop">إدارة الأملاك والمرافق</a></li>' +
          '<li><a href="services.html#soft" data-i18n="svc.soft">التنظيف والخدمات المساندة</a></li>' +
          '<li><a href="services.html#growth" data-i18n="svc.mkt">التسويق العقاري</a></li></ul></div>' +
        '<div><h4 data-i18n="foot.reach">تواصل</h4><ul>' +
          '<li><a class="ltr" href="tel:' + PHONE1 + '">' + PHONE1 + '</a></li>' +
          '<li><a class="ltr" href="tel:' + PHONE2 + '">' + PHONE2 + '</a></li>' +
          '<li><a class="ltr" href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
          '<li data-i18n="foot.cities">الرياض · الدمام · الخبر · الظهران</li></ul></div>' +
      '</div>' +
      '<div class="foot-bottom"><span>© <span id="yr"></span> <span data-i18n="foot.rights">سهم المرافق. جميع الحقوق محفوظة.</span></span>' +
      '<a href="https://www.instagram.com/sahmalmarafiq" target="_blank" rel="noopener">Instagram · @sahmalmarafiq</a></div>' +
    '</div>';
  document.body.appendChild(footer);
  document.getElementById('yr').textContent = new Date().getFullYear();

  var fab = document.createElement('a');
  fab.className = 'wa-fab'; fab.id = 'waFab'; fab.target = '_blank'; fab.rel = 'noopener';
  fab.innerHTML = WA_ICON + '<span data-i18n="wa.fab">تحدث معنا</span>';
  document.body.appendChild(fab);

  document.getElementById('burger').addEventListener('click', function () {
    header.classList.toggle('menu-open');
  });

  /* ---------- English dictionary (Arabic is read from the page itself) ---------- */
  var EN = {
    'brand': 'Sahm Almarafiq',
    'nav.home': 'Home', 'nav.services': 'Services', 'nav.sectors': 'Sectors', 'nav.about': 'About', 'nav.contact': 'Contact',
    'cta.quote': 'Request a quote', 'cta.explore': 'Explore services', 'cta.wa': 'Chat on WhatsApp', 'cta.talk': 'Talk to our team',
    'wa.fab': 'Chat with us',
    'foot.about': 'A Saudi partner specialised in operations & maintenance, property and facilities management — global standards, local expertise.',
    'foot.company': 'Company', 'foot.services': 'Services', 'foot.reach': 'Get in touch',
    'foot.cities': 'Riyadh · Dammam · Khobar · Dhahran', 'foot.rights': 'Sahm Almarafiq. All rights reserved.',
    'svc.ops': 'Operations & Maintenance', 'svc.prop': 'Property & Facilities Management', 'svc.soft': 'Cleaning & Soft Services', 'svc.mkt': 'Real Estate Marketing',

    /* home */
    'h.pill1': 'Integrated FM', 'h.pill2': 'Riyadh & Eastern Province',
    'h.title': 'We run your property to <span class="grad">global standards</span>, so your assets stay at their best.',
    'h.lead': 'Sahm Almarafiq is your partner for operations, maintenance, property and facilities management. Proactive care, operational discipline and full transparency — you focus on what matters, we handle the rest.',
    'h.c1': 'Scheduled preventive maintenance', 'h.c2': 'Fast response to every request', 'h.c3': 'Continuous follow-up',
    'h.float1': 'Field team ready', 'h.float2': 'Riyadh · Eastern Province',
    'cap.ops': 'Operations & maintenance', 'cap.clean': 'Professional cleaning', 'cap.sec': 'Security systems',
    'mq.1': 'Electrical maintenance', 'mq.2': 'HVAC systems', 'mq.3': 'Elevator maintenance', 'mq.4': 'Plumbing & leaks', 'mq.5': 'CCTV & alarm systems', 'mq.6': 'Professional cleaning', 'mq.7': 'Façade cleaning', 'mq.8': 'Property management', 'mq.9': 'Owners\u2019 association setup', 'mq.10': 'Real estate marketing',
    'p.k': 'Our approach', 'p.t': 'Three principles behind every building we run',
    'p.l': 'The same discipline world-class facility managers apply — delivered by a local team that knows your city.',
    'p1.t': 'Proactive', 'p1.d': 'We prevent failures before they happen through scheduled preventive maintenance and regular inspections.',
    'p2.t': 'Disciplined', 'p2.d': 'Unified operating standards and clear ownership for every task, from the first visit to sign-off.',
    'p3.t': 'Transparent', 'p3.d': 'Continuous communication and clear follow-up on every request until it is closed.',
    's.k': 'Services', 's.t': 'One partner for the full life-cycle of your property',
    's.l': 'From hard services to property management and marketing — integrated under one accountable team.',
    's.all': 'All services',
    's1.t': 'Integrated operations & maintenance', 's1.d': 'Electrical, HVAC, plumbing, fire & alarm systems and internal facilities — preventive and corrective, delivered by trained technicians.',
    's2.t': 'Elevator maintenance', 's2.d': 'Periodic inspection and fast response for safe, reliable vertical transport.',
    's3.t': 'Security & surveillance', 's3.d': 'Installation and maintenance of CCTV and alarm systems.',
    's4.t': 'Professional cleaning', 's4.d': 'Residential buildings, corporate premises and hospitals.',
    's5.t': 'Property management', 's5.d': 'Stable occupancy, tenant follow-up and asset care.',
    's6.t': 'Facilities & owners\u2019 associations', 's6.d': 'Activating owners\u2019 associations and running shared facilities end-to-end.',
    'more': 'Learn more',
    'sec.k': 'Sectors', 'sec.t': 'Tailored to the buildings we serve', 'sec.l': 'Every asset type has its own rhythm. Our service model adapts to yours.',
    'sec1.t': 'Residential', 'sec1.d': 'Buildings, compounds and residential towers.',
    'sec2.t': 'Corporate & commercial', 'sec2.d': 'Offices, showrooms and mixed-use assets.',
    'sec3.t': 'Healthcare', 'sec3.d': 'Hospitals and clinics with strict hygiene needs.',
    'sec4.t': 'Communities & associations', 'sec4.d': 'Shared facilities and owners\u2019 associations.',
    'pr.k': 'How we work', 'pr.t': 'From first call to steady operations',
    'st1.t': 'Consultation', 'st1.d': 'Tell us about your property and what you need.',
    'st2.t': 'Site survey', 'st2.d': 'Our team inspects systems and assesses real needs on site.',
    'st3.t': 'Tailored plan', 'st3.d': 'A maintenance and management plan fitted to your asset and budget.',
    'st4.t': 'Operate & follow up', 'st4.d': 'We deliver, monitor and keep you updated continuously.',
    'cv.k': 'Coverage', 'cv.t': 'On the ground where you need us',
    'cv.l': 'Field presence in the Central and Eastern regions means faster response and hands-on supervision.',
    'map.k': 'OUR FOOTPRINT', 'map.t': 'Two hubs, one operating standard',
    'pin.ruh': 'Riyadh', 'pin.dmm': 'Dammam · Khobar · Dhahran',
    'br1.tag': 'Central Region', 'br1.t': 'Riyadh', 'br1.d': 'Serving residential, commercial and institutional properties across the capital.',
    'br2.tag': 'Eastern Province', 'br2.t': 'Eastern Province', 'br2.d': 'Covering Dammam, Khobar and Dhahran with the same standards and response.',
    'ct.t': 'Ready to raise the standard of your property?', 'ct.d': 'Book a site survey and an initial consultation with our team.',

    /* services page */
    'sv.crumb': 'Services', 'sv.t': 'Integrated services, one accountable partner',
    'sv.l': 'Four service lines covering the full life-cycle of your property — each delivered with clear standards and continuous follow-up.',
    'sv.j1': 'Operations & maintenance', 'sv.j2': 'Property & facilities', 'sv.j3': 'Cleaning & soft services', 'sv.j4': 'Marketing',
    'o.k': '01 — Hard services', 'o.t': 'Operations & maintenance', 'o.d': 'Preventive and corrective maintenance that reduces breakdowns and extends the life of your building — with a field team ready to respond fast.',
    'o.1': 'Electrical networks', 'o.2': 'HVAC & air-conditioning', 'o.3': 'Plumbing & leak repair', 'o.4': 'Elevator maintenance', 'o.5': 'Fire alarm & safety systems', 'o.6': 'CCTV installation & maintenance', 'o.7': 'Internal facilities maintenance', 'o.8': 'Emergency call-outs',
    'm.k': '02 — Management', 'm.t': 'Property & facilities management', 'm.d': 'Complete management of your asset: stable occupancy, tenant relations, daily services and owners\u2019 associations — so you enjoy returns without the day-to-day.',
    'm.1': 'Property management', 'm.2': 'Tenant follow-up', 'm.3': 'Owners\u2019 association activation', 'm.4': 'Daily services management', 'm.5': 'Shared facilities operation', 'm.6': 'Raising operational quality',
    'c.k': '03 — Soft services', 'c.t': 'Cleaning & soft services', 'c.d': 'Professional cleaning by trained crews for residential buildings, corporate premises and hospitals.',
    'c.1': 'Residential buildings', 'c.2': 'Corporate premises', 'c.3': 'Hospitals & clinics', 'c.4': 'Façade cleaning & care',
    'g.k': '04 — Growth', 'g.t': 'Real estate marketing', 'g.d': 'Effective marketing that connects your property with the right tenant or buyer, faster.',
    'g.1': 'Marketing plans', 'g.2': 'Vacancy reduction', 'g.3': 'Unit presentation', 'g.4': 'Lead follow-up',

    /* sectors page */
    'se.crumb': 'Sectors', 'se.t': 'Built around the buildings we serve', 'se.l': 'Each sector has different priorities. We adapt our service model to match them.',
    'se1.d': 'Residential buildings, towers and compounds need reliable systems, clean shared spaces and residents who feel looked after.',
    'se1.1': 'Preventive maintenance', 'se1.2': 'Common-area cleaning', 'se1.3': 'Elevators & HVAC', 'se1.4': 'Tenant follow-up',
    'se2.d': 'Offices and commercial assets depend on uptime and first impressions. We keep them running and presentable.',
    'se2.1': 'Electrical & HVAC uptime', 'se2.2': 'Workplace cleaning', 'se2.3': 'Access & CCTV', 'se2.4': 'Façade care',
    'se3.d': 'Healthcare facilities require the highest hygiene standards and systems that never stop.',
    'se3.1': 'Specialised cleaning', 'se3.2': 'Critical systems maintenance', 'se3.3': 'Fast emergency response', 'se3.4': 'Continuous supervision',
    'se4.d': 'Communities and multi-owner buildings need clear governance and well-run shared facilities.',
    'se4.1': 'Owners\u2019 association setup', 'se4.2': 'Shared facilities management', 'se4.3': 'Integrated operations', 'se4.4': 'Service quality monitoring',

    /* about page */
    'ab.crumb': 'About', 'ab.t': 'Reliable service. Tangible quality.',
    'ab.l': 'Sahm Almarafiq is a Saudi company applying globally recognised facilities-management practice with deep local know-how.',
    'ab.s.k': 'Our story', 'ab.s.t': 'Peace of mind, delivered',
    'ab.s.p1': 'We were founded on a simple idea: property owners should not have to carry the burden of maintenance, cleaning and daily operations. We carry it for them.',
    'ab.s.p2': 'Today our field teams serve residential buildings, corporate premises and hospitals across Riyadh and the Eastern Province — with unified standards and continuous follow-up.',
    'vis.t': 'Vision', 'vis.d': 'To be the most trusted facilities-management partner for property owners in the Kingdom.',
    'mis.t': 'Mission', 'mis.d': 'To protect and elevate our clients\u2019 assets through proactive maintenance, disciplined operations and transparent service.',
    'val.k': 'Values', 'val.t': 'What we stand for',
    'v1.t': 'Reliability', 'v1.d': 'We do what we say, on time.',
    'v2.t': 'Quality', 'v2.d': 'Tangible results in every visit.',
    'v3.t': 'Transparency', 'v3.d': 'Clear communication, no surprises.',
    'v4.t': 'Safety', 'v4.d': 'Safe practices for people and property.',
    'v5.t': 'Responsiveness', 'v5.d': 'Fast action when it matters.',
    'v6.t': 'Partnership', 'v6.d': 'Long-term relationships built on trust.',

    /* contact page */
    'co.crumb': 'Contact', 'co.t': 'Let\u2019s talk about your property', 'co.l': 'Reach us on any channel below, or send your request and our team will get back to you shortly.',
    'ch.wa': 'WhatsApp', 'ch.wa2': 'Fastest way to reach us', 'ch.ph': 'Phone', 'ch.em': 'Email', 'ch.br': 'Coverage',
    'f.t': 'Request a quote', 'f.d': 'Fill in the details — the request opens directly in WhatsApp.',
    'f.name': 'Full name', 'f.phone': 'Mobile number', 'f.city': 'City', 'f.svc': 'Service needed', 'f.type': 'Property type', 'f.msg': 'Details',
    'f.send': 'Send via WhatsApp', 'f.note': 'Your details are sent only to our team via WhatsApp.',
    'f.ph.name': 'e.g. Mohammed Ahmed', 'f.ph.msg': 'Tell us briefly about your property and needs',
    'opt.ruh': 'Riyadh', 'opt.dmm': 'Dammam', 'opt.khb': 'Khobar', 'opt.dhr': 'Dhahran', 'opt.oth': 'Other',
    'opt.ops': 'Operations & maintenance', 'opt.prop': 'Property management', 'opt.fac': 'Facilities / owners\u2019 association', 'opt.clean': 'Cleaning', 'opt.sec': 'Security systems', 'opt.mkt': 'Real estate marketing',
    'opt.res': 'Residential', 'opt.corp': 'Corporate / commercial', 'opt.hosp': 'Healthcare', 'opt.comm': 'Community / compound',
    'faq.k': 'FAQ', 'faq.t': 'Frequently asked questions',
    'q1': 'What is facilities management?', 'a1': 'Operating and managing a building\u2019s systems and daily services — maintenance, cleaning and security — to raise operational quality and give owners and occupants peace of mind.',
    'q2': 'Which cities do you cover?', 'a2': 'We operate in Riyadh and the Eastern Province, including Dammam, Khobar and Dhahran.',
    'q3': 'Which property types do you serve?', 'a3': 'Residential buildings, corporate and commercial premises, hospitals, and multi-owner communities.',
    'q4': 'Do you help activate owners\u2019 associations?', 'a4': 'Yes — we activate owners\u2019 associations and run shared facilities end-to-end.',
    'q5': 'How do I get a quote?', 'a5': 'Send your request through the form or WhatsApp. We arrange a site survey, then share a plan tailored to your property.'
  };

  /* ---------- i18n engine ---------- */
  var nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(function (el) { el.setAttribute('data-ar', el.innerHTML); });
  var phNodes = document.querySelectorAll('[data-i18n-ph]');
  phNodes.forEach(function (el) { el.setAttribute('data-ar-ph', el.getAttribute('placeholder') || ''); });
  var ARTITLE = document.title;

  function setLang(lang) {
    var en = lang === 'en';
    document.documentElement.lang = en ? 'en' : 'ar';
    document.documentElement.dir = en ? 'ltr' : 'rtl';
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      el.innerHTML = en && EN[k] ? EN[k] : el.getAttribute('data-ar');
    });
    phNodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', en && EN[k] ? EN[k] : el.getAttribute('data-ar-ph'));
    });
    var t = document.body.getAttribute('data-title-en');
    document.title = en && t ? t : ARTITLE;
    document.getElementById('langBtn').textContent = en ? 'ع' : 'EN';
    document.getElementById('waFab').href = waLink(en ? WA_EN : WA_AR);
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waLink(en ? WA_EN : WA_AR); a.target = '_blank'; a.rel = 'noopener'; });
    try { localStorage.setItem('sahm-lang', lang); } catch (e) {}
  }
  var saved = 'ar';
  try { saved = localStorage.getItem('sahm-lang') || 'ar'; } catch (e) {}
  setLang(saved);
  document.getElementById('langBtn').addEventListener('click', function () {
    setLang(document.documentElement.lang === 'en' ? 'ar' : 'en');
  });

  /* ---------- Photo slots: load images/xxx.jpg if present ---------- */
  document.querySelectorAll('.media[data-img]').forEach(function (m) {
    var img = new Image();
    img.onload = function () { m.style.backgroundImage = 'url("' + m.getAttribute('data-img') + '")'; m.classList.add('has-img'); };
    img.src = m.getAttribute('data-img');
  });

  /* ---------- Scroll reveal ---------- */
  var rev = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rev.forEach(function (r) { io.observe(r); });
  } else { rev.forEach(function (r) { r.classList.add('in'); }); }

  /* ---------- Quote form → WhatsApp ---------- */
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var en = document.documentElement.lang === 'en';
      function v(id) { var el = document.getElementById(id); if (!el) return ''; if (el.tagName === 'SELECT') return el.options[el.selectedIndex].text; return el.value.trim(); }
      var lines = en ? [
        'Hello Sahm Almarafiq,', 'I would like to request a quote:', '',
        'Name: ' + v('fName'), 'Mobile: ' + v('fPhone'), 'City: ' + v('fCity'),
        'Service: ' + v('fSvc'), 'Property type: ' + v('fType'), v('fMsg') ? 'Details: ' + v('fMsg') : ''
      ] : [
        'مرحبًا سهم المرافق،', 'أرغب بطلب عرض سعر:', '',
        'الاسم: ' + v('fName'), 'الجوال: ' + v('fPhone'), 'المدينة: ' + v('fCity'),
        'الخدمة: ' + v('fSvc'), 'نوع العقار: ' + v('fType'), v('fMsg') ? 'التفاصيل: ' + v('fMsg') : ''
      ];
      window.open(waLink(lines.filter(function (l, i) { return l !== '' || i === 2; }).join('\n')), '_blank');
    });
  }
})();
