(function () {
  var KEY = "hl-theme";
  var root = document.documentElement;
  var saved = localStorage.getItem(KEY);
  if (saved) root.setAttribute("data-theme", saved);

  function mark() {
    var cur = root.getAttribute("data-theme");
    document.querySelectorAll(".dot").forEach(function (d) {
      d.setAttribute("aria-current", d.dataset.set === cur ? "true" : "false");
    });
  }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    localStorage.setItem(KEY, t);
    mark();
  }
  document.querySelectorAll(".dot").forEach(function (d) {
    d.addEventListener("click", function () { setTheme(d.dataset.set); });
  });
  mark();
  window.__setTheme = setTheme; // 便于 console 验证
})();
