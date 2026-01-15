// Header Component
// Injects the site header into any element with id="site-header"
// Automatically detects the current page and sets the active state

(function () {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop() || "index.html";

  // Determine which nav icon should be active
  const isHome = pageName === "index.html" || pageName === "";
  const isServices = pageName === "services.html";
  const isContact = pageName === "contact.html";

  const homeIcon = isHome ? "/images/home_active.svg" : "/images/home_light.svg";
  const servicesIcon = isServices ? "/images/services_active.svg" : "/images/services_light.svg";
  const contactIcon = isContact ? "/images/contact_active.svg" : "/images/contact_light.svg";

  const homeAria = isHome ? ' aria-current="page" class="is-active"' : "";
  const servicesAria = isServices ? ' aria-current="page" class="is-active"' : "";
  const contactAria = isContact ? ' aria-current="page" class="is-active"' : "";

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

  // Insert header when DOM is ready
  function insertHeader() {
    const headerEl = document.getElementById("site-header");
    if (headerEl) {
      headerEl.innerHTML = headerHTML;
      initWordmark();
    }
  }

  // Initialize the Rive wordmark animation
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertHeader);
  } else {
    insertHeader();
  }
})();
