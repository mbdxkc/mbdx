(() => {
  const overlay = document.getElementById("page-transition");
  if (!overlay) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const OVERLAY_MS = reduce ? 0 : 750;
  const FADE_MS    = reduce ? 0 : 350;

  // start hidden, then reveal while overlay slides away
  document.body.classList.add("is-loading");
  requestAnimationFrame(() => {
    overlay.classList.add("exit");          // slide overlay off
    document.body.classList.remove("is-loading"); // fade content in
  });

  function leaveTo(url){
    document.body.classList.add("is-leaving"); // fade content out
    overlay.classList.remove("exit");          // bring overlay back to covering (translateX(0))

    // wait until overlay has covered the page, then navigate
    window.setTimeout(() => {
      window.location.href = url;
    }, Math.max(OVERLAY_MS, FADE_MS));
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    e.preventDefault();
    leaveTo(url.href);
  });

  // handle bfcache (back/forward)
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
    document.body.classList.remove("is-loading");
  });
})();
