/**
 * Scroll Reveal - Intersection Observer based reveal animations
 * mBdx v3.2 | mediaBrilliance digitalxtudio
 *
 * Automatically reveals elements with scroll-reveal classes when they
 * enter the viewport. Respects prefers-reduced-motion.
 */

(function() {
  'use strict';

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Configuration
  const config = {
    threshold: 0.15,      // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px'  // Trigger slightly before fully in view
  };

  // Selectors for elements to reveal
  const revealSelectors = [
    '.scroll-reveal',
    '.scroll-reveal-left',
    '.scroll-reveal-right',
    '.scroll-reveal-scale'
  ];

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed (one-time animation)
        observer.unobserve(entry.target);
      }
    });
  }, config);

  // Initialize when DOM is ready
  function init() {
    const elements = document.querySelectorAll(revealSelectors.join(', '));
    elements.forEach(el => observer.observe(el));
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run after page transitions complete (for mBdx page-transition.js)
  document.addEventListener('page-transition-complete', init);
})();
