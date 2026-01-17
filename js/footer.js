/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Footer Component
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/footer.js
 *
 * @desc       reusable footer component that injects site footer links
 *             into any element with id="site-footer".
 *
 * @usage      add <footer id="site-footer"></footer> to your html,
 *             then include this script with defer attribute.
 *
 * @exports    none (iife - self-executing)
 * ============================================================================
 */

(function () {
  // -------------------------------------------------------------------------
  // 1. footer html template - copyright and legal/info links
  // -------------------------------------------------------------------------
  const footerHTML = `
    <p><a href="/index.html">&copy; 2026 mediaBrilliance</a></p>
    <p><a href="/pages/about.html">about</a></p>
    <p><a href="/pages/cc0.html">cc0 notice</a></p>
    <p><a href="/pages/accessibility.html">accessibility statement</a></p>
    <p><a href="/pages/privacy.html">privacy policy</a></p>
  `;

  // -------------------------------------------------------------------------
  // 2. dom insertion - inject footer html into placeholder element
  // -------------------------------------------------------------------------
  function insertFooter() {
    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.innerHTML = footerHTML;
    }
  }

  // -------------------------------------------------------------------------
  // 3. initialization - run when dom is ready
  // -------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertFooter);
  } else {
    insertFooter();
  }
})();
