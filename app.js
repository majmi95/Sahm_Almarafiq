/* ===== Sahm Almarafiq — layout, language switch, motion ===== */
(function () {
  var PHONE = '0544447611', EMAIL = 'info@sahmalmarafiq.com';
  var WA_AR = 'مرحبًا،\nأرغب بالاستفسار عن خدمات سهم المرافق';
  var WA_EN = 'Hello,\nI would like to inquire about Sahm Almarafiq services';
  function wa(msg) { return 'https://wa.me/966510105266?text=' + encodeURIComponent(msg); }

  var LOGO = '<svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"><path d="M6 41V24l8-6 8 6v17"/><path d="M20 41V13l10-7 10 7v28"/><path d="M3 41h42"/></svg>';
  var WAI = '<svg width="28" height="28" viewBox="0 0 32 32"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.48.73 4.79 1.98 6.73L4 29l7.46-1.94a11.93 11.93 0 0 0 4.56.9c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.65 3 16.02 3zm7.03 17.15c-.3.83-1.72 1.58-2.37 1.68-.61.09-1.38.13-2.23-.14-.51-.16-1.17-.38-2.02-.75-3.55-1.53-5.87-5.1-6.05-5.34-.18-.24-1.44-1.92-1.44-3.66s.91-2.6 1.24-2.95c.32-.35.7-.44.94-.44l.68.01c.22.01.51-.08.8.61.3.7 1.02 2.44 1.1 2.61.09.18.15.39.03.63-.12.24-.18.39-.35.6-.18.21-.37.47-.53.63-.18.18-.36.37-.16.72.21.35.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.87 1.78.35.18.56.15.77-.09.21-.24.88-1.03 1.12-1.38.24-.35.47-.29.79-.18.32.12 2.05.97 2.4 1.14.35.18.59.26.67.41.09.15.09.85-.21 1.68z"/></svg>';
  var page = document.body.getAttribute('data-page');
  var NAV = [['home','index.html','الرئيسية'],['solutions','#','الحلول'],['services','services.html','خدماتنا'],['packages','packages.html','الباقات'],['about','about.html','من نحن'],['contact','contact.html','تواصل معنا']];
  var SOL = [['owners.html','sol.own','ملاك العمائر والمستثمرون'],['associations.html','sol.asc','جمعيات الملاك والمجمعات'],['business.html','sol.biz','الشركات والمنشآت'],['homes.html','sol.hom','الفلل والمنازل']];
  var here = location.pathname.split('/').pop() || 'index.html';
  function links(mobile) {
    return NAV.map(function (n) {
      var act = n[0] === page ? ' active' : '';
      if (n[0] === 'solutions') {
        var sub = SOL.map(function (s) { return '<a href="' + s[0] + '" data-i18n="' + s[1] + '"' + (s[0] === here ? ' class="active"' : '') + '>' + s[2] + '</a>'; }).join('');
        return mobile
          ? '<div class="m-group"><span class="m-label" data-i18n="nav.solutions">الحلول</span>' + sub + '</div>'
          : '<div class="dd' + act + '"><button class="dd-btn' + act + '" aria-haspopup="true"><span data-i18n="nav.solutions">الحلول</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button><div class="dd-menu">' + sub + '</div></div>';
      }
      return '<a href="' + n[1] + '" data-i18n="nav.' + n[0] + '"' + (act ? ' class="active"' : '') + '>' + n[2] + '</a>';
    }).join('');
  }
  var BRAND = '<a href="index.html" class="brand" aria-label="Sahm Almarafiq">' + LOGO + '<div><b data-i18n="brand">سهم المرافق</b><small>SAHM ALMARAFIQ</small></div></a>';

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = '<div class="wrap nav">' + BRAND + '<nav class="nav-links">' + links() + '</nav>' +
    '<div class="nav-actions"><button class="lang-btn" id="langBtn">EN</button>' +
        '<button class="burger" id="burger" aria-label="Menu"><span></span></button></div></div>' +
    '<nav class="mobile-nav">' + links(true) + '<div class="menu-foot"><a href="tel:' + PHONE + '" class="ltr">' + PHONE + '</a><a href="mailto:' + EMAIL + '" class="ltr">' + EMAIL + '</a></div></nav>';
  document.body.insertBefore(header, document.body.firstChild);
  header.querySelectorAll('.dd-btn').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); b.parentNode.classList.toggle('open'); }); });
  document.addEventListener('click', function () { header.querySelectorAll('.dd.open').forEach(function (d) { d.classList.remove('open'); }); });
  document.getElementById('burger').onclick = function () { header.classList.toggle('menu-open'); };
  window.addEventListener('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = '<div class="wrap"><div class="foot"><div>' + BRAND +
    '<p data-i18n="foot.about">حلول متكاملة للقطاع السكني والتجاري:<br>إدارة أملاك، تشغيل وصيانة، وخدمات عقارية.</p></div>' +
    '<div class="foot-links">' +
      '<div><h4 data-i18n="foot.pages">الصفحات</h4><ul><li><a href="services.html" data-i18n="nav.services">خدماتنا</a></li><li><a href="packages.html" data-i18n="nav.packages">الباقات</a></li><li><a href="owners-association.html" data-i18n="nav.guide">دليل اتحاد الملاك</a></li><li><a href="about.html" data-i18n="nav.about">من نحن</a></li><li><a href="contact.html" data-i18n="nav.contact">تواصل معنا</a></li></ul></div>' +
      '<div><h4 data-i18n="nav.solutions">الحلول</h4><ul>' + SOL.map(function (s) { return '<li><a href="' + s[0] + '" data-i18n="' + s[1] + '">' + s[2] + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4 data-i18n="foot.reach">تواصل</h4><ul><li><a class="ltr" href="tel:' + PHONE + '">' + PHONE + '</a></li><li><a class="ltr" href="mailto:' + EMAIL + '">' + EMAIL + '</a></li></ul></div>' +
    '</div></div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' <span data-i18n="foot.rights">سهم المرافق. جميع الحقوق محفوظة.</span></span>' +
    '<a href="https://www.instagram.com/sahmalmarafiq" target="_blank" rel="noopener">Instagram @sahmalmarafiq</a></div></div>';
  document.body.appendChild(footer);

  var fab = document.createElement('a');
  fab.className = 'wa-fab'; fab.id = 'waFab'; fab.target = '_blank'; fab.rel = 'noopener'; fab.setAttribute('aria-label', 'WhatsApp');
  fab.innerHTML = WAI;
  document.body.appendChild(fab);
  document.querySelectorAll('[data-wa-icon]').forEach(function (e) { e.innerHTML = WAI; });

  var EN = {
    'brand':'Sahm Almarafiq','cta.talk':'Talk to a specialist','nav.solutions':'Solutions',
    'sol.own':'Building owners & investors','sol.asc':'Owners\u2019 associations & compounds','sol.biz':'Companies & facilities','sol.hom':'Villas & homes',
    'ps.e':'Solutions built for you','ps.t':'Choose what fits your property','ps.t2':'Solutions by property type',
    'ps1.t':'Building owners & investors','ps1.d':'Stable operations and better returns for your investment property.',
    'ps2.t':'Owners\u2019 associations & compounds','ps2.d':'Shared facilities, professionally managed.',
    'ps3.t':'Companies & facilities','ps3.d':'Offices, commercial and healthcare facilities.',
    'ps4.t':'Villas & homes','ps4.d':'Reliable maintenance for your home all year round.',
    'pp.e':'Challenges','pp.t':'What our clients face','pc.e':'Solution','pc.t':'How we help','pr.l':'Suggested plan','po.e':'Other solutions',
    'pl.p1':'Essential plan','pl.p2':'Complete plan','pl.p3':'Tailored plan',
    'own.e':'Building owners & investors','own.t':'Your investment property, running efficiently with stable returns','own.l':'We operate and maintain the building and manage its units, so you get the best return without the day-to-day details.',
    'own.c1':'Recurring breakdowns that raise costs','own.c2':'Vacant units that reduce returns','own.c3':'Tenant follow-up and collections that drain your time',
    'own.s1.t':'Operations & maintenance','own.s1.d':'Preventive and corrective maintenance for every building system.','own.s2.t':'Property management','own.s2.d':'Tenant follow-up, contracts and collections.','own.s3.t':'Real estate marketing','own.s3.d':'Reducing vacancy and marketing units.','own.s4.t':'Clean common areas','own.s4.d':'Clean entrances and corridors that reflect your property\u2019s value.',
    'asc.e':'Owners\u2019 associations & compounds','asc.t':'Shared facilities, professionally managed — and owners at ease','asc.l':'We help owners\u2019 societies and residential compounds organise and operate their shared areas to clear standards.',
    'asc.c1':'No one responsible for shared areas','asc.c2':'Disputes over costs and decisions','asc.c3':'Declining condition of elevators, entrances and facilities',
    'asc.s1.t':'Activating the owners\u2019 society','asc.s1.d':'We help with activation and organisation.','asc.s2.t':'Shared facilities management','asc.s2.d':'Operating entrances, elevators, corridors and the roof.','asc.s3.t':'Regular maintenance','asc.s3.d':'Maintenance of elevators, systems and facilities.','asc.s4.t':'Subscription follow-up','asc.s4.d':'Clear organisation that reassures every owner.','asc.g':'Read the owners\u2019 association guide',
    'biz.e':'Companies & facilities','biz.t':'A workplace that never stops','biz.l':'For offices, commercial and healthcare facilities: integrated operations, maintenance and cleaning that keep your business running.',
    'biz.c1':'System downtime disrupts business','biz.c2':'Strict hygiene requirements, especially in healthcare','biz.c3':'Multiple suppliers make follow-up difficult',
    'biz.s1.t':'Systems maintenance','biz.s1.d':'Electrical, HVAC, alarm and safety systems.','biz.s2.t':'Professional cleaning','biz.s2.d':'For offices, hospitals and clinics.','biz.s3.t':'Security & CCTV','biz.s3.d':'Installation and maintenance of cameras and alarms.','biz.s4.t':'One accountable team','biz.s4.d':'Instead of multiple suppliers, one team for every service.',
    'hom.e':'Villas & homes','hom.t':'Your home in excellent shape all year round','hom.l':'Regular maintenance and fast repairs for your villa or home, by trained technicians and a reliable service.',
    'hom.c1':'AC breakdowns when you need it most','hom.c2':'Leaks that worsen if not treated early','hom.c3':'Finding a reliable technician is hard',
    'hom.s1.t':'AC & electrical maintenance','hom.s1.d':'Inspection and repair by trained technicians.','hom.s2.t':'Plumbing & leaks','hom.s2.d':'Fast treatment before the problem grows.','hom.s3.t':'Preventive maintenance','hom.s3.d':'Regular visits that protect your home from breakdowns.','hom.s4.t':'Security cameras','hom.s4.d':'Installation and maintenance for your home\u2019s safety.',
    'sv.t':'Integrated services by specialty','sv.l':'Five specialties covering the full life-cycle of your property, delivered by one accountable team.',
    'o.t':'Technical maintenance','o.d':'Preventive and corrective maintenance for electrical and mechanical systems that reduces breakdowns and extends your building\u2019s life.',
    'o.1':'Electrical & HVAC','o.2':'Plumbing & leak repair','o.3':'Elevator maintenance','o.4':'Alarm & safety systems',
    'cl.t':'Support services','cl.d':'Professional cleaning and security systems that keep your facility clean and safe.',
    'cl.1':'Residential buildings & offices cleaning','cl.2':'Hospitals & clinics cleaning','cl.3':'Façade cleaning','cl.4':'CCTV installation & maintenance',
    'm.t':'Property management','m.d':'Integrated management of your real estate asset for stable occupancy and steady returns.',
    'm.1':'Units & tenant management','m.2':'Contracts & collections','m.3':'Daily services management','m.4':'Raising operational quality',
    'fm.t':'Facilities & owners\u2019 associations','fm.d':'Organising and operating shared areas in multi-owner buildings and compounds.',
    'fm.1':'Help activating the owners\u2019 society','fm.2':'Shared facilities operation','fm.3':'Subscription follow-up','fm.4':'Elevator & entrance maintenance',
    'f.t':'Get started','f.d':'Leave your details and one of our specialists will contact you on WhatsApp.','f.note':'We reply as soon as possible during working hours.',
    'f.for':'Property type','f.svc':'Service needed','f.for2':'Site type','f.svc2':'Service or product',
    'o.own':'Building / investment property','o.asc':'Compound / owners\u2019 association','o.biz':'Company / facility','o.hom':'Villa / home',
    'o.tech':'Technical maintenance','o.sup':'Cleaning & security','o.fac':'Facilities / owners\u2019 association','o.unsure':'Not sure — I need advice',
    'q3':'How do I get started?','a3':'Talk to one of our specialists via the form or WhatsApp. We arrange a visit to your property, then share a plan tailored to it.',
    'h.t':'Integrated solutions <em>for the residential and commercial sectors</em>',
    'h.l':'Property management, operations & maintenance, and real estate services — with professionalism and precision in Riyadh and the Eastern Province.',
    'cta.quote':'Request a quote','cta.guide':'What does your facility need?',
    'fn.e':'Quick guide','fn.t':'What does your facility need?','fn.l':'Pick your site type and need, and we’ll show you what we can do.',
    'fn.s1':'Site type','fn.s2':'What do you need?','fn.hint':'Pick a site type and a need.',
    'fn.own':'Building / investment property','fn.asc':'Compound / owners’ association','fn.biz':'Company / facility','fn.hom':'Villa / home',
    'fn.prop':'Property management','fn.full':'Operations & maintenance','fn.periodic':'Periodic maintenance','fn.fix':'Fix a fault','fn.clean':'Cleaning',
    'c.t3':'We visit your site and give you a clear quote','c.d3':'Call us or send your request, and we’ll arrange the visit.',
    'pr.e':'How we work','pr.t':'From the first visit to a clear report',
    'pr1.t':'Site visit & needs','pr1.d':'We visit the site, listen to you, and define the real need and the condition of the systems.',
    'pr2.t':'Plan & scope of work','pr2.d':'We hand you a plan with the scope, priorities and timeline before we start.',
    'pr3.t':'Operation & execution','pr3.d':'Our team carries out the work and follows every request until it is closed.',
    'pr4.t':'Report & review','pr4.d':'We share what was done and the state of your site, then review and adjust the plan with you.',
    'o.full':'Operations & maintenance',
    'ab.st.e':'Who we serve','ab.st.t':'Types of sites we serve',
    'st.a':'Residential buildings','st.b':'Corporate & commercial premises','st.c':'Hospitals & clinics','st.d':'Multi-owner compounds & associations','st.e':'Villas & homes',
    
    'cr.t':'Three services, one standard',
    'cr1.tag':'For property owners','cr1.t':'Property management','cr1.d':'Hand us your property, and we manage it for you, end to end.','cr1.1':'Leasing units','cr1.2':'Contracts & collections','cr1.3':'Tenant follow-up','cr1.4':'Property & facilities maintenance','cr1.cta':'Property management details',
    'cr2.tag':'For buildings, companies & homes','cr2.t':'Operations & maintenance','cr2.d':'Operation and maintenance of every facility in the building, plus periodic home maintenance.','cr2.1':'Electrical, HVAC & plumbing','cr2.2':'Elevators','cr2.3':'Cleaning & security','cr2.4':'Periodic home maintenance','cr2.cta':'Operations & maintenance details',
    'cr3.tag':'For owners & owners’ associations','cr3.t':'Real estate services','cr3.d':'Marketing units, and owners’ association services.','cr3.1':'Marketing units for sale and rent','cr3.2':'Reducing vacancy','cr3.3':'Activating the owners’ association','cr3.cta':'Real estate services details',
    'wy.t':'Professionalism and precision in every detail','wy.l':'We treat your property as if it were ours: organised work, and follow-up until every request is done.',
    'wy1.t':'Professionalism','wy1.d':'A trained team and an organised way of working on every visit.','wy2.t':'Precision','wy2.d':'We follow every request until it is closed, and show you what was done.',
    'wy3.t':'One team','wy3.d':'Management, maintenance and follow-up with one accountable team.','wy4.t':'Local coverage','wy4.d':'Riyadh, Dammam, Khobar and Dhahran.',
    'sx.t':'Our services','sx.l':'Integrated solutions for the residential and commercial sectors: property management, operations & maintenance, and real estate services.',
    'gx.property.who':'For residential & commercial property owners','gx.property.t':'Property management','gx.property.d':'Hand us your property, and we manage it end to end: leasing, collections, maintenance and follow-up.',
    'gx.facilities.who':'For buildings, compounds & companies','gx.facilities.t':'Facilities maintenance','gx.facilities.d':'Maintenance and operation of every facility in the building, with one accountable team.',
    'gx.periodic.who':'For individuals & homes','gx.periodic.t':'Periodic maintenance','gx.periodic.d':'Open to any client: regular maintenance visits for your home, and repairs.',
    'sx.manage.t':'Managing your property for you','sx.manage.d':'Day-to-day management of your building, compound or commercial property on the owner’s behalf.','sx.manage.1':'Leasing units','sx.manage.2':'Contracts & collections','sx.manage.3':'Tenant follow-up','sx.manage.4':'Property & facilities maintenance',
    'sx.marketing.t':'Real estate marketing','sx.marketing.d':'We market vacant units to the right tenant or buyer.','sx.marketing.1':'Marketing units for sale and rent','sx.marketing.2':'Professional unit presentation','sx.marketing.3':'Reducing vacancy',
    'sx.associations.t':'Owners’ associations','sx.associations.d':'Organising and running shared areas in multi-owner buildings and compounds.','sx.associations.1':'Help activating the association','sx.associations.2':'Running shared facilities','sx.associations.3':'Subscription follow-up',
    'sx.tech.t':'Technical & elevator maintenance','sx.tech.d':'Preventive maintenance and repairs for building systems.','sx.tech.1':'Electrical','sx.tech.2':'HVAC','sx.tech.3':'Plumbing & leaks','sx.tech.4':'Elevators',
    'sx.elevators.t':'Elevator maintenance','sx.elevators.d':'Regular inspection and repairs for safe operation.','sx.elevators.1':'Regular inspection','sx.elevators.2':'Fault repairs','sx.elevators.3':'Operation follow-up',
    'sx.cleaning.t':'Cleaning','sx.cleaning.d':'Regular cleaning suited to your site.','sx.cleaning.1':'Residential buildings & offices','sx.cleaning.2':'Hospitals & clinics','sx.cleaning.3':'Shared areas','sx.cleaning.4':'Façades',
    'sx.security.t':'Security & CCTV','sx.security.d':'Surveillance systems that protect your site.','sx.security.1':'Camera installation','sx.security.2':'Camera maintenance','sx.security.3':'Alarm devices',
    'sx.home.t':'Regular maintenance for your home','sx.home.d':'Technicians visit your home on a fixed schedule and fix faults before they grow.','sx.home.1':'Scheduled maintenance visits','sx.home.2':'HVAC, electrical & plumbing checks','sx.home.3':'Repairs when needed','sx.home.4':'Plans that suit your home','sx.home.cta':'See the plans',
    'pk.e2':'Plans','pk.t2':'Choose the right plan for you','pk.l2':'A plan for every kind of client: your home, your building, or the building you want us to manage for you.',
    'pk.note2':'Every plan starts with a site visit; scope and price are then set clearly. You can add or remove any service.','pl.ask':'Request this plan',
    'p1.tag':'For individuals & homes','p1.t':'Home plan','p1.d':'Periodic maintenance for your home or villa, with regular visits.','p1.1':'Scheduled maintenance visits','p1.2':'HVAC, electrical & plumbing checks','p1.3':'Repairs when needed','p1.4':'Technical notes after every visit',
    'p2.tag':'For residential & commercial buildings','p2.t':'Building plan','p2.d':'Maintenance and operation of every facility in the building, with one team.','p2.1':'Preventive electrical, HVAC & plumbing maintenance','p2.2':'Elevator maintenance','p2.3':'Shared-area cleaning','p2.4':'CCTV & alarm maintenance','p2.5':'Every request followed until closed',
    'p3.tag':'For property owners','p3.t':'Building management plan','p3.d':'Hand us your building, and we manage it for you, end to end.','p3.1':'Everything in the Building plan','p3.2':'Leasing and marketing units','p3.3':'Contracts & collections','p3.4':'Tenant follow-up','p3.5':'Regular statement for the owner',
    'pa1b':'Price depends on the site type, size and needs; we give you a clear quote after the visit.',
    'pq3b':'What is the difference between the Building plan and the Building management plan?','pa3b':'The Building plan covers facility maintenance and operation. With Building management we take over the whole building: leasing, collections and tenant follow-up, plus maintenance.',
    'pq4':'Who is the Home plan for?','pa4':'Anyone with a home or villa who wants regular maintenance instead of waiting for faults.',
    'o.periodic':'Periodic home maintenance','o.fix':'Fix a fault',
    'cr.t2':'Our main services',
    'cr3.4':'Running shared facilities',
    'fn.re':'Real estate services',
    'gx.operations.who':'For the residential & commercial sectors',
    'gx.operations.t':'Operations & maintenance',
    'gx.operations.d':'Operation and maintenance of every facility in the building with one accountable team, plus periodic home maintenance.',
    'gx.realestate.who':'For owners & owners’ associations',
    'gx.realestate.t':'Real estate services',
    'gx.realestate.d':'Services that help you invest in your property and organise its management.',
    'sx.manage.5':'Regular statement for the owner',
    'sx.tech.5':'Alarm & safety systems',
    'sx.periodic.t':'Periodic home maintenance',
    'sx.periodic.d':'Open to any client: regular visits to your home, fixing faults before they grow.',
    'sx.periodic.1':'Scheduled maintenance visits',
    'sx.periodic.2':'HVAC, electrical & plumbing checks',
    'sx.periodic.3':'Repairs when needed',
    'sx.marketing.4':'Following up leads',
    'o.re':'Real estate services',
    'f.change':'Change',
    'nav.home':'Home','nav.services':'Services','nav.packages':'Plans','nav.guide':'Owners\u2019 association guide','nav.about':'About','nav.contact':'Contact',
    'cta.book':'Book a site visit','cta.book2':'Book a visit for your property','cta.browse':'Explore services','cta.wa':'WhatsApp us','cta.call':'Call us','cta.all':'All services',
    'foot.about':'Integrated solutions for the residential and commercial sectors:<br>property management, operations &amp; maintenance, and real estate services.',
    'foot.pages':'Pages','foot.reach':'Contact','foot.rights':'Sahm Almarafiq. All rights reserved.',
    /* home */
    'h.b1':'Operations & maintenance','h.b2':'Riyadh · Eastern Province',
    's.e':'Our services','s.t':'Everything your property needs, under one team','s.l':'From technical maintenance to property management and marketing.',
    's1.t':'Operations & maintenance','s1.d':'Electrical, HVAC, plumbing and alarm systems — preventive and corrective.',
    's2.t':'Elevator maintenance','s2.d':'Periodic inspection and fast response for safe operation.',
    's3.t':'Security & CCTV','s3.d':'Installation and maintenance of cameras and alarm systems.',
    's4.t':'Professional cleaning','s4.d':'Residential buildings, corporate premises and hospitals.',
    's5.t':'Property & facilities','s5.d':'Stable occupancy, tenant follow-up and owners\u2019 associations.',
    's6.t':'Real estate marketing','s6.d':'Reaching the right tenant or buyer, faster.',
    'w.pk':'Explore our maintenance plans','w.e':'Why Sahm Almarafiq','w.t':'A partner you can rely on',
    'w.l':'We take the burden of day-to-day operations off your hands — with clear standards, a trained team and continuous follow-up — so your property keeps its value.',
    'w.s':'We serve',
    'w1.t':'Proactive','w1.d':'Scheduled maintenance that prevents breakdowns.',
    'w2.t':'Fast response','w2.d':'A ready team for every request.',
    'w3.t':'Transparent','w3.d':'Clear follow-up until every request is closed.',
    'w4.t':'Local coverage','w4.d':'Riyadh, Dammam, Khobar and Dhahran.',
    'sec1':'Residential','sec2':'Corporate & commercial','sec3':'Healthcare','sec4':'Communities & owners\u2019 associations',
    'c.k':'Your first step','c.t':'Your property deserves better care','c.d':'Our team visits your property, assesses it, and gives you a clear plan tailored to it.',
    /* services */
    'sv.e':'Services',
    
    
    
    'g.t':'Real estate marketing','g.d':'Effective marketing that connects your property with the right people.',
    'g.1':'Marketing plans','g.2':'Reducing vacancy','g.3':'Professional unit presentation','g.4':'Lead follow-up',
    'se.e':'Sectors','se.t':'Who we serve',
    'se1.d':'Buildings, towers and compounds.','se2.d':'Offices and commercial assets.','se3.d':'Hospitals and clinics.','se4.d':'Shared facilities.',
    /* about */
    'ab.e':'About us','ab.t':'A trusted partner for managing your facilities and real estate assets',
    'ab.p1':'Sahm Almarafiq is a Saudi company specialised in operations, maintenance, property and facilities management, serving clients in Riyadh and the Eastern Province.',
    'ab.p2':'We believe property owners should focus on their investment, not its day-to-day details. That is why we take full responsibility for operating and maintaining the property — with unified standards, continuous follow-up and transparent communication at every stage.',
    'vis.t':'Vision','vis.d':'To be the leading and most trusted partner in facilities and real estate asset management in the Kingdom.',
    'mis.t':'Mission','mis.d':'To protect and grow our clients\u2019 assets through proactive maintenance, disciplined operations and service defined by transparency and commitment.',
    'hw.e':'Our process','hw.t':'A clear way of working',
    'st1.t':'Initial consultation','st1.d':'We get to know your property and its needs.','st2.t':'Site survey','st2.d':'Our team assesses the condition of systems and facilities on site.','st3.t':'Tailored operating plan','st3.d':'We prepare a plan suited to the property and its budget.','st4.t':'Delivery & follow-up','st4.d':'We carry out the work and keep you informed every step of the way.',
    'rg.e':'Coverage','rg.t':'Our service area',
    'rg1.t':'Riyadh','rg1.d':'Central Region — residential, commercial and institutional properties.',
    'rg2.t':'Eastern Province','rg2.d':'Dammam · Khobar · Dhahran.',
    /* contact */
    'co.e':'Contact','co.t':'Contact the Sahm Almarafiq team','co.l':'Choose the channel that suits you, or send your request directly.',
    'ch.wa':'WhatsApp','ch.wa2':'The fastest way to reach us','ch.ph':'Phone','ch.em':'Email','ch.cv':'Coverage','ch.cv2':'Riyadh · Dammam · Khobar · Dhahran',
    'f.name':'Full name','f.phone':'Mobile','f.city':'City','f.msg':'Details (optional)',
    'f.ph.name':'Your name','f.ph.msg':'Tell us briefly about your property',
    'f.send':'Send request',
    'o.ruh':'Riyadh','o.dmm':'Dammam','o.khb':'Khobar','o.dhr':'Dhahran','o.oth':'Other',
    'o.ops':'Operations & maintenance','o.prop':'Property / facilities management','o.cln':'Cleaning','o.sec':'Security systems','o.mkt':'Real estate marketing',
    'fq.e':'FAQ',
    'pk.e':'Maintenance plans','pk.t':'Choose the right plan for your property','pk.l':'Three clear plans that cover every property\u2019s needs — each one tailored after a site visit.',
    'pl.rec':'Recommended',
    
    
    
    'pk.note':'Every plan starts with a site visit; scope and pricing are then set out clearly.',
    'pk.fq':'Questions about plans',
    'pq1':'How much does a plan cost?','pa1':'Pricing depends on the property\u2019s type, size and needs. We share a clear proposal after the site visit.',
    'pq2':'Can I customise a plan?','pa2':'Yes — every plan is customisable; we add or remove services to fit your property.',
    'pq3':'What\u2019s the difference between Complete and Tailored?','pa3':'Complete suits standalone buildings; Tailored is designed for compounds and multi-owner buildings that need shared-facility management.',
    'f.plan':'Selected plan','ok.t':'Your request has been received','ok.d':'One of our specialists will contact you shortly.','ok.wa':'Need a faster reply? WhatsApp us',
    'gd.e':'Quick guide','gd.t':'Owners\u2019 associations: what you need to know','gd.l':'If you own an apartment or unit in a shared building, this guide explains how common areas are managed properly.',
    'gd.q1':'What is an owners\u2019 association?','gd.a1':'An owners\u2019 association — now called an <b>owners\u2019 society</b> — brings together the unit owners of a building to organise the management and maintenance of shared parts such as entrances, elevators, corridors and the roof, and to share their costs fairly.',
    'gd.q2':'Why does it matter?','gd.b1':'It protects every owner\u2019s rights and clarifies responsibilities.','gd.b2':'It ensures regular maintenance of elevators, entrances and shared facilities.','gd.b3':'It reduces disputes through clear, approved decisions.','gd.b4':'It preserves — and grows — the property\u2019s value.',
    'gd.c.t':'We activate and operate it for you','gd.c.d':'We help you activate the owners\u2019 society, then operate and maintain shared facilities and follow up on subscriptions — so every owner can relax.','gd.c.l':'View the Tailored plan',
    'v1.t':'Commitment','v1.d':'We deliver what we promise, on time.','v2.t':'Quality','v2.d':'Tangible results on every visit.','v3.t':'Transparency','v3.d':'Clear communication at every stage.','v4.t':'Responsiveness','v4.d':'Immediate action when it matters.','gd.s.e':'Steps','gd.s.t':'How is an association activated?',
    'g1.t':'Register on Mullak','g1.d':'Unit owners register on the electronic platform of the Real Estate General Authority.',
    'g2.t':'Create the society','g2.d':'The building\u2019s owners\u2019 society is created online.',
    'g3.t':'Choose the management','g3.d':'Owners nominate and vote for the society\u2019s chair and management.',
    'g4.t':'Approve subscriptions','g4.d':'Owners agree on subscriptions that cover operating and maintaining shared parts.',
    'gd.note':'This guide is for general awareness. For up-to-date regulatory requirements, refer to the Mullak platform of the Real Estate General Authority.','fq.t':'Common questions',
    'q1':'Which cities do you cover?','a1':'Riyadh and the Eastern Province, including Dammam, Khobar and Dhahran.',
    'q2':'Which properties do you serve?','a2':'Residential buildings, corporate and commercial premises, hospitals and multi-owner communities.',
    
  };

  var HOOKS = [];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
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
    HOOKS.forEach(function (f) { f(en); });
  }

  /* ---------- "What does your facility need?" finder ---------- */
  var finder = document.getElementById('finderOut');
  if (finder) {
    var TYPES = { own: ['عمارة / عقار استثماري', 'Building / investment property', 'owners.html'], asc: ['مجمع / جمعية ملاك', 'Compound / owners’ association', 'associations.html'], biz: ['شركة / منشأة', 'Company / facility', 'business.html'], hom: ['فيلا / منزل', 'Villa / home', 'homes.html'] };
    var NEEDS = {
      prop: ['إدارة أملاك', 'Property management', 'services.html#property', [['تأجير الوحدات', 'Leasing units'], ['العقود والتحصيل', 'Contracts & collections'], ['متابعة المستأجرين وصيانة العقار', 'Tenant follow-up and property maintenance']]],
      full: ['تشغيل وصيانة', 'Operations & maintenance', 'services.html#operations', [['صيانة الكهرباء والتكييف والسباكة والمصاعد', 'Electrical, HVAC, plumbing & elevator maintenance'], ['النظافة والأمن', 'Cleaning & security'], ['متابعة كل بلاغ حتى يُقفل', 'Every request followed until it is closed']]],
      periodic: ['صيانة دورية', 'Periodic maintenance', 'packages.html', [['زيارات صيانة مجدولة', 'Scheduled maintenance visits'], ['فحص التكييف والكهرباء والسباكة', 'HVAC, electrical & plumbing checks'], ['إصلاح الأعطال عند الحاجة', 'Repairs when needed']]],
      re: ['خدمات عقارية', 'Real estate services', 'services.html#realestate', [['تسويق الوحدات للبيع والإيجار', 'Marketing units for sale and rent'], ['تقليل فترات الشغور', 'Reducing vacancy']]],
      fix: ['إصلاح عطل', 'Fix a fault', 'services.html#tech', [['إصلاح أعطال الكهرباء والتكييف والسباكة', 'Electrical, HVAC & plumbing repairs'], ['صيانة المصاعد وأنظمة الإنذار', 'Elevator & alarm system maintenance']]]
    };
    var EXTRA = {
      asc: { full: ['صيانة المداخل والمصاعد والممرات', 'Entrances, elevators & corridors'], re: ['تفعيل جمعية الملاك وتشغيل المرافق المشتركة', 'Activating the owners’ association and running shared facilities'] },
      biz: { full: ['تركيب وصيانة كاميرات المراقبة', 'CCTV installation & maintenance'] },
      hom: { periodic: ['باقة المنزل تناسبك', 'The Home plan suits you'] }
    };
    var pick = { type: null, need: null };
    var chipsAll = document.querySelectorAll('.finder .chip');
    chipsAll.forEach(function (c) {
      c.setAttribute('aria-pressed', 'false');
      c.addEventListener('click', function () {
        var g = c.hasAttribute('data-type') ? 'type' : 'need';
        pick[g] = c.getAttribute('data-' + g);
        document.querySelectorAll('.finder .chip[data-' + g + ']').forEach(function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
        renderFinder(document.documentElement.lang === 'en', true);
      });
    });
    var renderFinder = function (en, scroll) {
      if (!pick.type || !pick.need) return;
      var i = en ? 1 : 0, t = TYPES[pick.type], n = NEEDS[pick.need];
      var list = n[3].slice(); var x = EXTRA[pick.type] && EXTRA[pick.type][pick.need]; if (x) list.push(x);
      var msg = en ? 'Hello,\nSite type: ' + t[1] + '\nNeed: ' + n[1] + '\nI would like a quote for my facility.' : 'مرحبًا،\nنوع الموقع: ' + t[0] + '\nالاحتياج: ' + n[0] + '\nأرغب بعرض لمرفقي.';
      finder.innerHTML = '<div class="finder-res"><h3>' + (en ? 'What we offer: ' : 'اللي نقدّمه لك: ') + esc(n[i]) + ' · ' + esc(t[i]) + '</h3>' +
        '<ul class="ticks">' + list.map(function (s) { return '<li>' + esc(s[i]) + '</li>'; }).join('') + '</ul>' +
        '<div class="cta-row"><a class="btn btn-primary" href="contact.html?for=' + pick.type + '&svc=' + pick.need + '#quoteForm">' + (en ? 'Send your request' : 'أرسل طلبك') + '</a>' +
        '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + wa(msg) + '">' + WAI + (en ? 'Send on WhatsApp' : 'أرسل عبر واتساب') + '</a>' +
        ('<a class="btn btn-line" href="' + n[2] + '">' + (en ? 'Details' : 'التفاصيل') + '</a>') + '</div></div>';
      if (scroll && finder.getBoundingClientRect().top > window.innerHeight - 120) finder.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    HOOKS.push(function (en) { renderFinder(en, false); });
  }


  var saved = 'ar'; try { saved = localStorage.getItem('sahm-lang') || 'ar'; } catch (e) {}
  setLang(saved);
  document.getElementById('langBtn').onclick = function () { setLang(document.documentElement.lang === 'en' ? 'ar' : 'en'); header.classList.remove('menu-open'); };

  var rv = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (r) { io.observe(r); });
  } else rv.forEach(function (r) { r.classList.add('in'); });

  var PLANS = { basic: ['باقة المنزل','Home plan'], complete: ['باقة المبنى','Building plan'], custom: ['باقة إدارة العمارة','Building management plan'] };
  var planKey = (new URLSearchParams(location.search).get('plan') || '').toLowerCase();
  var pickedPlan = PLANS[planKey] || null;
  var planBox = document.getElementById('planBox');
  if (planBox && pickedPlan) {
    planBox.hidden = false;
    var sync = function () { planBox.querySelector('b').textContent = pickedPlan[document.documentElement.lang === 'en' ? 1 : 0]; };
    sync(); document.getElementById('langBtn').addEventListener('click', sync);
  }
  var QS = new URLSearchParams(location.search);
  function preset(id, val) { var s = document.getElementById(id); if (!s || !val) return; for (var k = 0; k < s.options.length; k++) if (s.options[k].value === val) { s.selectedIndex = k; return; } }
  preset('fFor', QS.get('for'));
  preset('fSvc', { fix: 'tech' }[QS.get('svc')] || QS.get('svc'));
  var form = document.getElementById('quoteForm');
  /* ---------- Google Forms connection ---------- */
  var GF = {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSelebci6NyLK1aqt2hoZHARp2XyeTo6Q-Y6yF1sjhHowdHgvw/formResponse',
    name: 'entry.2070584688', phone: 'entry.1332491611', city: 'entry.850383722',
    type: 'entry.1865738174', service: 'entry.1878773108', details: ''   /* add the 6th entry id here if needed */
  };
  if (form) form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var en = document.documentElement.lang === 'en';
    function v(id) { var e = document.getElementById(id); return e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value.trim(); }
    var phone = v('fPhone').replace(/[^0-9٠-٩+]/g, '');
    if (phone.length < 9) { alert(en ? 'Please enter a valid mobile number.' : 'فضلًا أدخل رقم جوال صحيح.'); document.getElementById('fPhone').focus(); return; }
    var service = v('fSvc') + (pickedPlan ? ' — ' + pickedPlan[en ? 1 : 0] : '');
    var details = v('fMsg');
    var data = new URLSearchParams();
    data.append(GF.name, v('fName'));
    data.append(GF.phone, v('fPhone'));
    data.append(GF.city, v('fCity'));
    data.append(GF.type, v('fFor'));
    if (GF.details) { data.append(GF.service, service); if (details) data.append(GF.details, details); }
    else data.append(GF.service, details ? service + ' | ' + details : service);
    var btn = form.querySelector('button[type=submit]');
    var old = btn.innerHTML; btn.disabled = true;
    btn.textContent = en ? 'Sending…' : 'جارٍ الإرسال…';
    fetch(GF.action, { method: 'POST', mode: 'no-cors', body: data })
      .then(function () {
        form.classList.add('sent');
        var ok = document.getElementById('formOk');
        if (ok) { ok.hidden = false; ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      })
      .catch(function () {
        btn.disabled = false; btn.innerHTML = old;
        alert(en ? 'Sending failed. Please try again or contact us on WhatsApp.' : 'تعذّر الإرسال. حاول مرة أخرى أو تواصل معنا عبر واتساب.');
      });
  });
})();
