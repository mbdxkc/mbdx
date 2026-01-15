/**
 * ============================================================================
 * mBdx (mediaBrilliance digitalxtudio) - Header Component
 * ============================================================================
 * @project    mBdx - mediaBrilliance digitalxtudio website
 * @version    3.1
 * @author     valdez campos <dez@mediabrilliance.io>
 * @date       2026-01-15
 * @file       js/header.js
 *
 * @desc       reusable header component that injects the site navigation
 *             into any element with id="site-header". automatically detects
 *             the current page and highlights the active nav icon.
 *
 * @requires   - rive-app/canvas (for wordmark animation)
 *             - /media/mb_wordmark.riv (rive animation file)
 *             - /images/home_*.svg, services_*.svg, contact_*.svg (nav icons)
 *             - /images/instagram_dark.svg, github_dark.svg (social icons)
 *
 * @usage      add <header id="site-header"></header> to your html,
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

  // check if current page matches each nav item
  const isHome = pageName === "index.html" || pageName === "";
  const isServices = pageName === "services.html";
  const isContact = pageName === "contact.html";

  // -------------------------------------------------------------------------
  // 2. dynamic icon selection - active pages get highlighted icons
  // -------------------------------------------------------------------------
  const homeIcon = isHome ? "/images/home_active.svg" : "/images/home_light.svg";
  const servicesIcon = isServices ? "/images/services_active.svg" : "/images/services_light.svg";
  const contactIcon = isContact ? "/images/contact_active.svg" : "/images/contact_light.svg";

  // -------------------------------------------------------------------------
  // 3. aria attributes - accessibility for current page indication
  // -------------------------------------------------------------------------
  const homeAria = isHome ? ' aria-current="page" class="is-active"' : "";
  const servicesAria = isServices ? ' aria-current="page" class="is-active"' : "";
  const contactAria = isContact ? ' aria-current="page" class="is-active"' : "";

  // -------------------------------------------------------------------------
  // 4. header html template - three-column grid layout
  //    left: page navigation | center: wordmark | right: social links
  // -------------------------------------------------------------------------
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="primary">
        <!-- left: pages -->
        <div class="pages">
          <a href="/index.html"${homeAria}>
            <img src="${homeIcon}" alt="mediaBrilliance home icon" />
          </a>
          <a href="/services.html"${servicesAria}>
            <img src="${servicesIcon}" alt="mediaBrilliance services icon" />
          </a>
          <a href="/contact.html"${contactAria}>
            <img src="${contactIcon}" alt="mediaBrilliance contact icon" />
          </a>
        </div>

        <!-- center: wordmark -->
        <div class="header-title">
          <a href="/index.html" aria-label="mediaBrilliance home">
            <canvas id="mb_wordmark" width="200" height="42">mediaBrilliance</canvas>
          </a>
        </div>

        <!-- right: socials -->
        <div class="socials">
          <a
            href="https://www.instagram.com/mediaBrilliance/"
            aria-label="mediaBrilliance on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/instagram_dark.svg" alt="instagram icon" aria-hidden="true" />
          </a>

          <a
            href="https://github.com/mbdxkc/"
            aria-label="mediaBrilliance on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/github_dark.svg" alt="github icon" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </div>
  `;

  // -------------------------------------------------------------------------
  // 5. dom insertion - inject header html into placeholder element
  // -------------------------------------------------------------------------
  function insertHeader() {
    const headerEl = document.getElementById("site-header");
    if (headerEl) {
      headerEl.innerHTML = headerHTML;
      initWordmark();
    }
  }

  // -------------------------------------------------------------------------
  // 6. rive animation - initialize wordmark canvas animation
  //    uses state machine for interactive/animated wordmark
  // -------------------------------------------------------------------------
  function initWordmark() {
    if (typeof rive !== "undefined") {
      new rive.Rive({
        src: "/media/mb_wordmark.riv",
        canvas: document.getElementById("mb_wordmark"),
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => console.log("mb_wordmark rive loaded!")
      });
    }
  }

  // -------------------------------------------------------------------------
  // 7. initialization - run when dom is ready
  // -------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertHeader);
  } else {
    insertHeader();
  }
})();
