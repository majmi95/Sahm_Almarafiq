document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (e) { io.observe(e); });
});

// Auto-rotating carousel (homepage gallery)
(function () {
  var carousel = document.getElementById('carousel');
  if (!carousel) return;
  var slides = carousel.querySelectorAll('.slide');
  var dots = carousel.querySelectorAll('.dot');
  var i = 0, timer;

  function show(n) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });
    slides[n].classList.add('active');
    dots[n].classList.add('active');
    i = n;
  }
  function next() { show((i + 1) % slides.length); }
  function start() { timer = setInterval(next, 4000); }
  function stop() { clearInterval(timer); }

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      stop();
      show(parseInt(d.dataset.index, 10));
      start();
    });
  });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  start();
})();
