(() => {
  const t = document.getElementById("page-transition");
  if (!t) return;

  const DURATION_MS = 450; // must match your CSS: transition 0.45s

  // on load: slide overlay away to the left
  requestAnimationFrame(() => {
    t.classList.add("exit");
  });

  function isInternalLink(a) {
    const href = a.getAttribute("href");
    if (!href) return false;

    if (href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    if (a.target === "_blank") return false;
    if (a.hasAttribute("download")) return false;

    try {
      const url = new URL(href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    // allow ctrl/cmd click, middle click, etc.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (!isInternalLink(a)) return;

    e.preventDefault();

    const href = a.getAttribute("href");

    // bring overlay in to cover page
    t.classList.remove("exit");
    t.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, DURATION_MS);
  });
})();
