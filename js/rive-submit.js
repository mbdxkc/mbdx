(() => {
  const canvas = document.getElementById("submit_button");
  const btn = document.getElementById("rive-submit");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!canvas || !btn || !form) return;

  let hoverTrigger, unhoverTrigger, clickTrigger;

  const r = new rive.Rive({
    src: "./media/submit_button.riv",
    canvas,
    autoplay: true,
    stateMachines: "State Machine 1",

    layout: new rive.Layout({
      fit: rive.Fit.Contain,
      alignment: rive.Alignment.Center,
    }),

    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();

      const inputs = r.stateMachineInputs("State Machine 1");

      hoverTrigger   = inputs.find(i => i.name === "hover");
      unhoverTrigger = inputs.find(i => i.name === "unhover");
      clickTrigger   = inputs.find(i => i.name === "click");
    },
  });

  /* hover interactions */
  btn.addEventListener("pointerenter", () => {
    hoverTrigger?.fire();
  });

  btn.addEventListener("pointerleave", () => {
    unhoverTrigger?.fire();
  });

  /* click animation (visual only — submit still native) */
  btn.addEventListener("pointerdown", () => {
    clickTrigger?.fire();
  });

  /* optional: disable visual spam while sending */
  const observer = new MutationObserver(() => {
    if (!status) return;
    const t = (status.textContent || "").toLowerCase();
    btn.disabled = t.includes("sending");
  });

  observer.observe(status, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})();
