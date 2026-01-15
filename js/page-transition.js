/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Page Transition Controller
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/page-transition.js
 *
 * @desc       handles smooth page transitions with overlay animation.
 *             - on page load: overlay slides away, content fades in
 *             - on navigation: content fades out, overlay slides in, then navigate
 *             - respects prefers-reduced-motion for accessibility
 *
 * @requires   - #page-transition element in html
 *             - css classes: .is-loading, .is-leaving, .exit
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
  const OVERLAY_MS = reduce ? 0 : 750;  // overlay slide duration
  const FADE_MS    = reduce ? 0 : 350;  // content fade duration

  // -------------------------------------------------------------------------
  // 2. initial page load - reveal content with transition
  // -------------------------------------------------------------------------
  document.body.classList.add("is-loading");
  requestAnimationFrame(() => {
    overlay.classList.add("exit");               // slide overlay off screen
    document.body.classList.remove("is-loading"); // fade content in
  });

  // -------------------------------------------------------------------------
  // 3. navigation handler - animate out before leaving page
  // -------------------------------------------------------------------------
  function leaveTo(url) {
    document.body.classList.add("is-leaving");   // fade content out
    overlay.classList.remove("exit");            // bring overlay back (translateX(0))

    // wait until overlay has covered the page, then navigate
    window.setTimeout(() => {
      window.location.href = url;
    }, Math.max(OVERLAY_MS, FADE_MS));
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
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
    document.body.classList.remove("is-loading");
  });
})();
