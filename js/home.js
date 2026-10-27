/* 首页逻辑：精选作品 + 视差 */

(function () {
  var row = document.getElementById("featuredRow");
  if (row) {
    FEATURED.forEach(function (id) {
      var work = null;
      for (var i = 0; i < WORKS.length; i++) {
        if (WORKS[i].id === id) { work = WORKS[i]; break; }
      }
      if (work) row.appendChild(window.buildWorkCard(work));
    });
    window.initReveal(row);
  }

  /* Hero 轻微视差 */
  var bg = document.getElementById("heroBg");
  if (bg) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          bg.style.transform = "translateY(" + y * 0.22 + "px)";
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();
