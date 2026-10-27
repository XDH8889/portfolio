/* 作品页逻辑：筛选 / 视频网格 / 摄影画廊 / 灯箱 */

(function () {
  var filterRow = document.getElementById("filterRow");
  var videoGrid = document.getElementById("videoGrid");
  var photoArea = document.getElementById("photoArea");
  var photoGroups = document.getElementById("photoGroups");
  if (!filterRow || !videoGrid) return;

  var current = "all";
  var photosRendered = false;

  /* ---- 筛选按钮 ---- */
  function buildFilters() {
    filterRow.innerHTML = "";
    var defs = [{ id: "all", cn: "全部" }];
    VIDEO_CATS.forEach(function (c) { defs.push({ id: c.id, cn: c.cn }); });
    defs.push({ id: "photo", cn: "摄影作品" });

    defs.forEach(function (d) {
      var b = document.createElement("button");
      b.className = "filter-btn" + (d.id === current ? " active" : "");
      b.textContent = d.cn;
      b.addEventListener("click", function () { setFilter(d.id); });
      filterRow.appendChild(b);
    });
  }

  function setFilter(id) {
    current = id;
    filterRow.querySelectorAll(".filter-btn").forEach(function (b, i) {
      b.classList.toggle("active", b.textContent === labelOf(id));
    });

    var showPhotos = (id === "photo");
    videoGrid.style.display = showPhotos ? "none" : "";
    photoArea.style.display = showPhotos ? "" : "none";

    if (!showPhotos) {
      videoGrid.innerHTML = "";
      var list = WORKS.filter(function (w) { return id === "all" || w.cat === id; });
      list.forEach(function (w) { videoGrid.appendChild(window.buildWorkCard(w)); });
      window.initReveal(videoGrid);
    } else if (!photosRendered) {
      renderPhotos();
      photosRendered = true;
    }
  }

  function labelOf(id) {
    if (id === "all") return "全部";
    if (id === "photo") return "摄影作品";
    for (var i = 0; i < VIDEO_CATS.length; i++) {
      if (VIDEO_CATS[i].id === id) return VIDEO_CATS[i].cn;
    }
    return "";
  }

  /* ---- 摄影画廊 ---- */
  function renderPhotos() {
    photoGroups.innerHTML = "";
    PHOTO_CATS.forEach(function (cat) {
      var group = document.createElement("div");
      group.className = "photo-group";

      var head = document.createElement("div");
      head.className = "photo-group-head reveal";
      head.innerHTML =
        "<h3>" + cat.cn + "</h3><span class=\"en\">" + cat.en + "</span>";
      group.appendChild(head);

      var masonry = document.createElement("div");
      masonry.className = "masonry";

      cat.files.forEach(function (file, idx) {
        var item = document.createElement("div");
        item.className = "photo-item";
        var base = file.replace(/\.[^.]+$/, "");
        var thumb = "assets/thumbs/" + cat.cn + "/" + base + ".jpg";
        var full = SITE.mediaBase + "摄影作品/" + cat.dir + "/" + file;
        item.innerHTML = '<img src="' + thumb + '" alt="' + cat.cn + '" loading="lazy">';
        item.addEventListener("click", function () {
          openLightbox(cat, idx);
        });
        masonry.appendChild(item);
      });

      group.appendChild(masonry);
      photoGroups.appendChild(group);
    });
    window.initReveal(photoGroups);
  }

  /* ---- 灯箱 ---- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCount = document.getElementById("lbCount");
  var lbCat = null;
  var lbIdx = 0;

  function openLightbox(cat, idx) {
    lbCat = cat;
    lbIdx = idx;
    showLb();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function showLb() {
    var file = lbCat.files[lbIdx];
    var full = SITE.mediaBase + "摄影作品/" + lbCat.dir + "/" + file;
    lbImg.src = full;
    lbCount.textContent = (lbIdx + 1) + " / " + lbCat.files.length + " · " + lbCat.cn;
  }

  function closeLb() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  function lbStep(d) {
    lbIdx = (lbIdx + d + lbCat.files.length) % lbCat.files.length;
    showLb();
  }

  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { lbStep(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { lbStep(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") lbStep(-1);
    if (e.key === "ArrowRight") lbStep(1);
  });

  /* ---- 初始化 ---- */
  buildFilters();
  setFilter("all");
})();
