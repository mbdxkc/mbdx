(() => {
  const canvas = document.getElementById("submit_button");
  const btn = document.getElementById("rive-submit");
  const form = document.getElementById("contact-form");
  if (!canvas || !btn || !form) return;

  const r = new rive.Rive({
    src: "./media/submit_button.riv",
    canvas,
    autoplay: true,

    stateMachines: "State Machine 1",

    layout: new rive.Layout({
      fit: rive.Fit.Contain,
      alignment: rive.Alignment.Center,
    }),

    onLoad: () => r.resizeDrawingSurfaceToCanvas(),
  });
})();
