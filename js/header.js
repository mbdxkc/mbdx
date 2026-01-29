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
 * @usage      add <header id="site-header"></header> to html,
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
  const isServices = currentPath.includes("/pages/services.html");
  const isContact = currentPath.includes("/pages/contact.html");

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
  //    mobile: wordmark only (nav moves to footer)
  // -------------------------------------------------------------------------
  const headerHTML = `
    <div class="header-grid">
      <nav class="nav" aria-label="primary">
        <!-- left: pages (desktop only) -->
        <div class="pages desktop-only">
          <a href="/index.html"${homeAria}>
            <img src="${homeIcon}" alt="mediaBrilliance home icon" width="24" height="24" />
          </a>
          <a href="/pages/services.html"${servicesAria}>
            <img src="${servicesIcon}" alt="mediaBrilliance services icon" width="24" height="24" />
          </a>
          <a href="/pages/contact.html"${contactAria}>
            <img src="${contactIcon}" alt="mediaBrilliance contact icon" width="24" height="24" />
          </a>
        </div>

        <!-- center: wordmark (static svg fallback, replaced by rive when loaded) -->
        <div class="header-title">
          <canvas id="mb_wordmark" width="200" height="42" style="display:none;position:absolute;pointer-events:none;">mediaBrilliance</canvas>
          <a href="/index.html" aria-label="mediaBrilliance home">
            <img id="mb_wordmark_static" src="/images/mBwordmark.svg" alt="mediaBrilliance" width="200" height="42" />
            <span id="mb_wordmark_overlay" style="display:none;width:200px;height:42px;"></span>
          </a>
        </div>

        <!-- right: socials (desktop only) -->
        <div class="socials desktop-only">
          <a
            href="https://www.instagram.com/mediaBrilliance/"
            aria-label="mediaBrilliance on instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/instagram_dark.svg" alt="" aria-hidden="true" width="24" height="24" />
          </a>

          <a
            href="https://github.com/mbdxkc/"
            aria-label="mediaBrilliance on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/github_dark.svg" alt="" aria-hidden="true" width="24" height="24" />
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

      // add explicit click handler to wordmark link as failsafe
      // this ensures navigation works even if canvas/rive interferes
      const wordmarkLink = headerEl.querySelector(".header-title a");
      if (wordmarkLink) {
        const titleContainer = headerEl.querySelector(".header-title");
        if (titleContainer) {
          titleContainer.addEventListener("click", function(e) {
            // if click is anywhere in the title area, trigger the link
            if (!e.defaultPrevented && e.target !== wordmarkLink) {
              wordmarkLink.click();
            }
          }, true); // use capture phase to intercept before rive
        }
      }

      initWordmark();
    }
  }

  // -------------------------------------------------------------------------
  // 6. rive animation - initialize wordmark canvas animation
  //    uses state machine for interactive/animated wordmark
  //    falls back to static svg if rive not available
  // -------------------------------------------------------------------------
  function initWordmark() {
    if (typeof rive !== "undefined") {
      var canvas = document.getElementById("mb_wordmark");
      var staticImg = document.getElementById("mb_wordmark_static");
      var overlay = document.getElementById("mb_wordmark_overlay");
      if (canvas) {
        // prepare canvas - positioned absolutely behind link
        canvas.style.position = "absolute";
        canvas.style.opacity = "0";
        canvas.style.transition = "opacity 0.3s ease";
        canvas.style.pointerEvents = "none";
        canvas.style.left = "50%";
        canvas.style.top = "50%";
        canvas.style.transform = "translate(-50%, -50%)";
        canvas.style.zIndex = "0";

        var riveInstance = new rive.Rive({
          src: "/media/mb_wordmark.riv",
          canvas: canvas,
          autoplay: false,
          stateMachines: "State Machine 1",
          onLoad: function() {
            // wait for page transition to complete
            function showWhenReady() {
              if (!document.body.classList.contains("is-loading")) {
                if (staticImg) staticImg.style.display = "none";
                if (overlay) overlay.style.display = "block";
                canvas.style.display = "block";
                canvas.style.opacity = "1";
                riveInstance.play();
              } else {
                setTimeout(showWhenReady, 50);
              }
            }
            showWhenReady();
          }
        });
      }
    }
  }

  // expose initWordmark globally so lazy-loaded rive can call it
  window.initHeaderWordmark = initWordmark;

  // -------------------------------------------------------------------------
  // 7. initialization - run when dom is ready
  // -------------------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertHeader);
  } else {
    insertHeader();
  }
})();
