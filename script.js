/* ============================================================
   Payal Shinde — Portfolio behaviour
   Kept intentionally small: sticky header, accessible mobile
   navigation, reveal-on-scroll and the footer year.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    var header = document.getElementById('siteHeader');
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('primaryNav');
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- Footer year ---- */
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = year;
    });

    /* ---- Sticky header background ---- */
    if (header) {
      var updateHeader = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });
    }

    /* ---- Mobile navigation ---- */
    if (toggle && nav) {
      var setNavState = function (open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute(
          'aria-label',
          open ? 'Close navigation menu' : 'Open navigation menu'
        );
      };

      toggle.addEventListener('click', function () {
        setNavState(!nav.classList.contains('is-open'));
      });

      nav.addEventListener('click', function (event) {
        var link = event.target.closest ? event.target.closest('a') : null;
        if (link) setNavState(false);
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
          setNavState(false);
          toggle.focus();
        }
      });

      document.addEventListener('click', function (event) {
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(event.target) || toggle.contains(event.target)) return;
        setNavState(false);
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) setNavState(false);
      });
    }

    /* ---- Reveal on scroll ---- */
    var revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
