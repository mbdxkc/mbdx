/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Page Transition Controller
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.2
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-29
 * @file       js/page-transition.js
 *
 * @desc       handles smooth page transitions with overlay animation.
 *             - on page load: overlay starts off-screen so content paints immediately (fast LCP)
 *             - on navigation: content fades out, overlay slides in, then navigate
 *             - respects prefers-reduced-motion for accessibility
 *
 * @requires   - #page-transition element in html
 *             - css classes: .is-leaving, .enter
 *             - css transitions defined in style.css
 *
 * @exports    none (iife - self-executing)
 * ============================================================================
 */

(() => {
  // -------------------------------------------------------------------------
  // 1. setup - get overlay element and check for reduced motion preference
  // -------------------------------------------------------------------------
  const overlay = document.getElementById("page-transition");
  if (!overlay) return;

  // respect user's motion preference for accessibility
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // read duration from css variable for consistency
  function getTransitionDuration() {
    if (reduce) return 0;
    const val = getComputedStyle(document.documentElement).getPropertyValue("--t-slide");
    return parseFloat(val) * 1000 || 600;
  }

  // -------------------------------------------------------------------------
  // 2. initial page load - overlay starts off-screen via CSS for instant LCP
  //    no is-loading class needed, content is visible immediately
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // 3. navigation handler - animate out before leaving page
  // -------------------------------------------------------------------------
  function leaveTo(url) {
    // skip animation if user prefers reduced motion
    if (reduce) {
      window.location.href = url;
      return;
    }

    document.body.classList.add("is-leaving");   // fade content out
    overlay.classList.add("enter");              // bring overlay back (translateX(0))

    // wait until overlay has covered the page, then navigate
    window.setTimeout(() => {
      window.location.href = url;
    }, getTransitionDuration());
  }

  // -------------------------------------------------------------------------
  // 4. click listener - intercept internal links for smooth transitions
  // -------------------------------------------------------------------------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    // skip if not a navigable link
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#")) return;       // skip anchors
    if (a.target && a.target !== "_self") return;    // skip external targets
    if (a.hasAttribute("download")) return;          // skip downloads
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // skip modified clicks

    // skip external links
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    // intercept and animate
    e.preventDefault();
    leaveTo(url.href);
  });

  // -------------------------------------------------------------------------
  // 5. bfcache handler - reset state when using back/forward navigation
  // -------------------------------------------------------------------------
  window.addEventListener("pageshow", (e) => {
    // if page was restored from bfcache, ensure overlay is off-screen
    if (e.persisted) {
      overlay.classList.remove("enter");
    }
    document.body.classList.remove("is-leaving");
  });
})();
