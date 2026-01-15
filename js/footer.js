// Footer Component
// Injects the site footer into any element with id="site-footer"

(function () {
  const footerHTML = `
    <p><a href="/index.html">&copy; 2026 mediaBrilliance</a></p>
    <p><a href="/about.html">about</a></p>
    <p><a href="/cc0.html">cc0 notice</a></p>
    <p><a href="/accessibility.html">accessibility statement</a></p>
    <p><a href="/privacy.html">privacy policy</a></p>
  `;

  function insertFooter() {
    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.innerHTML = footerHTML;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertFooter);
  } else {
    insertFooter();
  }
})();
