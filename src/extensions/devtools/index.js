globalThis.chrome?.devtools.panels.create(
  "Cookies Handler",
  null,
  "panel.html",
  function (panel) {
    console.log("Panel created");
  }
);
