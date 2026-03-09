/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Portfolio Slider
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.2
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-03-08
 * @file       js/portfolio-slider.js
 *
 * @desc       horizontal scrolling portfolio slider for homepage.
 *             provides prev/next button navigation with smooth scrolling.
 *             arrows fade when at start/end of slider.
 *             cards are displayed in a horizontal track with overflow scroll.
 *
 * @requires   - .portfolio-track element (scrollable container)
 *             - .portfolio-prev button (previous navigation)
 *             - .portfolio-next button (next navigation)
 *             - .portfolio-card elements (scrollable items)
 *
 * @exports    none (iife - self-executing)
 * ============================================================================
 */

(function () {
  // -------------------------------------------------------------------------
  // 1. element references
  // -------------------------------------------------------------------------
  var track = document.querySelector('.portfolio-track');
  var prevBtn = document.querySelector('.portfolio-prev');
  var nextBtn = document.querySelector('.portfolio-next');

  // exit if required elements not found
  if (!track || !prevBtn || !nextBtn) return;

  // -------------------------------------------------------------------------
  // 2. calculate scroll distance
  //    uses card width + gap to scroll exactly one card at a time
  // -------------------------------------------------------------------------
  function getCardWidth() {
    var card = track.querySelector('.portfolio-card');
    if (!card) return 300; // fallback width

    // get gap from computed styles for accurate calculation
    var style = getComputedStyle(track);
    var gap = parseFloat(style.gap) || 20;

    return card.offsetWidth + gap;
  }

  // -------------------------------------------------------------------------
  // 3. update arrow visibility based on scroll position
  //    fades left arrow at start, right arrow at end
  // -------------------------------------------------------------------------
  function updateArrowVisibility() {
    var scrollLeft = track.scrollLeft;
    var maxScroll = track.scrollWidth - track.clientWidth;

    // threshold for "at boundary" (allow small margin for rounding)
    var threshold = 5;

    // fade left arrow when at start
    if (scrollLeft <= threshold) {
      prevBtn.style.opacity = '0.3';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }

    // fade right arrow when at end
    if (scrollLeft >= maxScroll - threshold) {
      nextBtn.style.opacity = '0.3';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }
  }

  // -------------------------------------------------------------------------
  // 4. navigation click handlers
  //    smooth scroll left/right by one card width
  // -------------------------------------------------------------------------
  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  // -------------------------------------------------------------------------
  // 5. listen for scroll events to update arrow visibility
  // -------------------------------------------------------------------------
  track.addEventListener('scroll', updateArrowVisibility);

  // initial check on load
  updateArrowVisibility();

  // re-check on window resize (scroll dimensions may change)
  window.addEventListener('resize', updateArrowVisibility);
})();
