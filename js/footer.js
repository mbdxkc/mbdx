/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Footer Component
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.2
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-24
 * @file       js/footer.js
 *
 * @desc       reusable footer component that injects site footer links
 *             into any element with id="site-footer". includes site
 *             navigation for mobile (primary nav in header hidden on mobile).
 *
 * @usage      add <footer id="site-footer"></footer> to your html,
 *             then include this script with defer attribute.
 *
 * @exports    none (iife - self-executing)
 * ============================================================================
 */

(function () {
  // -------------------------------------------------------------------------
  // 1. page detection - determine which page is currently active
  // -------------------------------------------------------------------------
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "index.html";

  const isHome = pageName === "index.html" || pageName === "";
  const isServices = currentPath.includes("/pages/services.html");
  const isContact = currentPath.includes("/pages/contact.html");

  // aria attributes for current page indication
  const homeAria = isHome ? ' aria-current="page" class="is-active"' : "";
  const servicesAria = isServices ? ' aria-current="page" class="is-active"' : "";
  const contactAria = isContact ? ' aria-current="page" class="is-active"' : "";

  // -------------------------------------------------------------------------
  // 2. footer html template - site nav + social links + legal/info links
  // -------------------------------------------------------------------------
  const footerHTML = `
    <!-- site navigation -->
    <nav class="footer-nav" aria-label="site navigation">
      <a href="/index.html"${homeAria}>home</a>
      <a href="/pages/services.html"${servicesAria}>services</a>
      <a href="/pages/contact.html"${contactAria}>contact</a>
    </nav>

    <!-- social links -->
    <div class="footer-social">
      <a href="https://www.instagram.com/mediaBrilliance/" aria-label="mediaBrilliance on Instagram" target="_blank" rel="noopener noreferrer">
        <img src="/images/instagram_dark.svg" alt="" aria-hidden="true" width="24" height="24" />
      </a>
      <a href="https://github.com/mbdxkc/" aria-label="mediaBrilliance on GitHub" target="_blank" rel="noopener noreferrer">
        <img src="/images/github_dark.svg" alt="" aria-hidden="true" width="24" height="24" />
      </a>
    </div>

    <!-- legal/info links -->
    <div class="footer-info">
      <a href="/index.html">&copy; 2026 mediaBrilliance</a>
      <a href="/pages/about.html">about</a>
      <a href="/pages/cc0.html">cc0</a>
      <a href="/pages/accessibility.html">accessibility</a>
      <a href="/pages/privacy.html">privacy</a>
    </div>
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
