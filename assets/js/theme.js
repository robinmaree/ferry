(function () {
  'use strict';

  // Scroll-to-top button (#scrollUp)
  var scrollUp = document.getElementById('scrollUp');
  if (scrollUp) {
    function toggleScrollUp() {
      scrollUp.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
    scrollUp.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', toggleScrollUp, { passive: true });
    toggleScrollUp();
  }

  // Mobile menu toggle
  var menuToggle = document.getElementById('menu-toggle');
  var navWrapper = document.getElementById('main-nav-wrapper');
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener('click', function () {
      navWrapper.classList.toggle('mobile-open');
      navWrapper.style.display = navWrapper.classList.contains('mobile-open') ? 'block' : '';
      var icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navWrapper.classList.contains('mobile-open') ? 'fa fa-times' : 'fa fa-bars';
      }
    });
  }

  // Bestemming slideshow
  var slideshow = document.querySelector('.bestemming-slideshow');
  if (slideshow) {
    var slides = slideshow.querySelectorAll('[data-slide]');
    var dots = slideshow.querySelectorAll('.bestemming-slideshow__dot');
    var btnPrev = slideshow.querySelector('.bestemming-slideshow__btn--prev');
    var btnNext = slideshow.querySelector('.bestemming-slideshow__btn--next');
    var current = 0;
    var total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      slides.forEach(function (s, i) {
        s.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }

    if (total > 1) {
      if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); });
      if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); });
      dots.forEach(function (d, i) {
        d.addEventListener('click', function () { goTo(i); });
      });
    }
  }

})();
