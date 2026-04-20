(function () {
  'use strict';

  // Full-screen mobile overlay
  var menuToggle = document.getElementById('menu-toggle');
  var mobileOverlay = document.getElementById('mobile-overlay');

  if (menuToggle && mobileOverlay) {
    var openMenu = function () {
      mobileOverlay.classList.add('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'false');
      menuToggle.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Menu sluiten');
      document.body.classList.add('menu-open');
    };

    var closeMenu = function () {
      mobileOverlay.classList.remove('is-open');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Menu openen');
      document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', function () {
      if (mobileOverlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when a nav link is clicked
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('is-open')) {
        closeMenu();
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
