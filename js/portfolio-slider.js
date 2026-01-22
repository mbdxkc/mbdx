/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Portfolio Slider
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/portfolio-slider.js
 *
 * @desc       horizontal scrolling portfolio slider for homepage.
 *             provides prev/next button navigation with smooth scrolling.
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
  // 3. navigation click handlers
  //    smooth scroll left/right by one card width
  // -------------------------------------------------------------------------
  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });
})();
