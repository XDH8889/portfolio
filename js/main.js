/* ============================================
   公共逻辑：导航 / 动效 / 卡片构建 / 复制提示
   ============================================ */

(function () {
  /* 导航滚动状态 */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 移动端菜单 */
  var burger = document.getElementById("navBurger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* 滚动渐入 */
  var io = null;
  window.initReveal = function (root) {
    root = root || document;
    if (!("IntersectionObserver" in window)) {
      root.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
    }
    root.querySelectorAll(".reveal:not(.visible)").forEach(function (el) { io.observe(el); });
  };
  window.initReveal();

  /* Toast 提示 */
  var toastEl = null;
  var toastTimer = null;
  window.showToast = function (msg) {
    if (!toastEl) toastEl = document.getElementById("toast");
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1800);
  };

  /* 复制到剪贴板（含 file:// 环境回退） */
  window.copyText = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { window.showToast("已复制 · " + text); },
        function () { fallbackCopy(text); }
      );
    } else {
      fallbackCopy(text);
    }
  };
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); window.showToast("已复制 · " + text); }
    catch (e) { window.showToast("复制失败，请手动复制"); }
    document.body.removeChild(ta);
  }

  /* 联系卡片点击复制 */
  document.querySelectorAll("[data-copy]").forEach(function (el) {
    el.addEventListener("click", function () {
      window.copyText(el.getAttribute("data-copy"));
    });
  });

  /* 作品卡片构建
     - 有封面：显示封面图，悬停播放视频预览
     - 无封面：直接显示视频本身（浏览器原生首帧，同电脑预览效果） */
  window.buildWorkCard = function (work) {
    var card = document.createElement("div");
    card.className = "work-card reveal";

    var thumbHtml;
    if (work.cover) {
      thumbHtml =
        '<div class="thumb">' +
          '<div class="poster">' +
            '<img class="cover" src="assets/posters/' + work.id + '.jpg" loading="lazy" alt="" onerror="this.style.display=\'none\'">' +
            '<span class="play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>' +
          '</div>' +
          '<video class="preview" muted loop playsinline preload="none"></video>' +
          (work.badge ? '<span class="badge">' + work.badge + '</span>' : "") +
        '</div>';
    } else {
      thumbHtml =
        '<div class="thumb">' +
          '<video class="still" muted loop playsinline preload="metadata" loading="lazy"' +
          ' src="' + SITE.mediaBase + work.file + '"></video>' +
          (work.badge ? '<span class="badge">' + work.badge + '</span>' : "") +
        '</div>';
    }

    card.innerHTML = thumbHtml +
      '<div class="info">' +
        '<span class="t">' + work.title + '</span>' +
        '<span class="r">' + work.role + '</span>' +
        '<span class="arrow">→</span>' +
      '</div>';

    /* 悬停播放 */
    var still = card.querySelector("video.still");
    if (still) {
      card.addEventListener("mouseenter", function () {
        var p = still.play();
        if (p && p.catch) p.catch(function () {});
      });
      card.addEventListener("mouseleave", function () {
        still.pause();
        still.currentTime = 0;
      });
    } else {
      var video = card.querySelector("video.preview");
      var loaded = false;
      card.addEventListener("mouseenter", function () {
        if (!loaded) {
          video.src = SITE.mediaBase + work.file;
          loaded = true;
        }
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      });
      card.addEventListener("mouseleave", function () { video.pause(); });
    }

    card.addEventListener("click", function () {
      location.href = "work-detail.html?id=" + encodeURIComponent(work.id);
    });
    return card;
  };
})();
