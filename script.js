(function () {
  'use strict';

  var menuButton = document.querySelector('.menu-toggle');
  var primaryNav = document.querySelector('.primary-nav');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('main section[id]');
  var backToTop = document.querySelector('.back-to-top');
  var year = document.getElementById('current-year');

  function closeMenu() {
    if (!menuButton || !primaryNav) return;

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'فتح القائمة');

    primaryNav.classList.remove('open');
  }

  if (menuButton) {
    menuButton.addEventListener('click', function () {
      var isOpen =
        menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      menuButton.setAttribute(
        'aria-label',
        isOpen ? 'فتح القائمة' : 'إغلاق القائمة'
      );

      primaryNav.classList.toggle('open', !isOpen);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (event) {
    if (!primaryNav || !menuButton) return;

    var clickedInsideMenu =
      primaryNav.contains(event.target);

    var clickedMenuButton =
      menuButton.contains(event.target);

    if (
      primaryNav.classList.contains('open') &&
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  });

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            var sectionName =
              link.getAttribute('data-section');

            link.classList.toggle(
              'active',
              sectionName === entry.target.id
            );
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -58% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  var revealElements =
    document.querySelectorAll('.reveal');

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      'visible',
      window.scrollY > 520
    );
  }

  window.addEventListener(
    'scroll',
    updateBackToTop,
    {
      passive: true
    }
  );

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
