/* 作品详情页逻辑 */

(function () {
  var root = document.getElementById("detailRoot");
  if (!root) return;

  var id = "";
  try {
    var params = new URLSearchParams(location.search);
    id = params.get("id") || "";
  } catch (e) { id = ""; }

  var work = null;
  for (var i = 0; i < WORKS.length; i++) {
    if (WORKS[i].id === id) { work = WORKS[i]; break; }
  }

  if (!work) {
    root.innerHTML =
      '<p style="padding:80px 0;color:var(--text-3);">未找到该作品，<a href="works.html" style="text-decoration:underline;">返回作品集</a></p>';
    return;
  }

  var cat = null;
  for (var j = 0; j < VIDEO_CATS.length; j++) {
    if (VIDEO_CATS[j].id === work.cat) { cat = VIDEO_CATS[j]; break; }
  }

  var desc = cat ? cat.desc : "";
  if (work.badge) desc += " · " + work.badge;

  var html =
    '<div class="detail-video reveal visible">' +
      '<video controls playsinline preload="metadata"' +
      (work.cover ? ' poster="assets/posters/' + work.id + '.jpg"' : "") +
      ' src="' + SITE.mediaBase + work.file + '"></video>' +
    '</div>' +
    '<div class="detail-body">' +
      '<div class="reveal visible">' +
        '<h1 class="detail-title">' + work.title + '</h1>' +
        '<div class="detail-cat">' +
          '<span class="chip">' + (cat ? cat.cn : "") + '</span>' +
          (work.badge ? '<span class="chip grad-text">' + work.badge + '</span>' : "") +
        '</div>' +
        '<p class="detail-desc">' + desc + '</p>' +
        '<div class="detail-tags">' +
          '<span class="chip">' + work.role + '</span>' +
          '<span class="chip">视频作品</span>' +
        '</div>' +
      '</div>' +
      '<div class="detail-meta reveal visible">' +
        '<div class="row"><span class="k">类型</span><span class="v">' + (cat ? cat.cn : "") + '</span></div>' +
        '<div class="row"><span class="k">职责</span><span class="v">' + work.role + '</span></div>' +
        (work.stats ? '<div class="row"><span class="k">数据</span><span class="v">' + work.stats + '</span></div>' : "") +
        '<div class="row"><span class="k">编号</span><span class="v">' + work.id.toUpperCase() + '</span></div>' +
      '</div>' +
    '</div>';

  /* 上一条 / 下一条（按全部作品顺序） */
  var idx = WORKS.indexOf(work);
  var prev = idx > 0 ? WORKS[idx - 1] : WORKS[WORKS.length - 1];
  var next = idx < WORKS.length - 1 ? WORKS[idx + 1] : WORKS[0];

  html +=
    '<div class="detail-nav">' +
      '<a href="work-detail.html?id=' + prev.id + '">' +
        '<span class="k">‹ PREV</span><span class="t">' + prev.title + '</span>' +
      '</a>' +
      '<a class="next" href="work-detail.html?id=' + next.id + '">' +
        '<span class="k">NEXT ›</span><span class="t">' + next.title + '</span>' +
      '</a>' +
    '</div>';

  /* 相关作品 */
  var related = WORKS.filter(function (w) { return w.cat === work.cat && w.id !== work.id; });
  for (var r = 0; r < WORKS.length && related.length < 3; r++) {
    if (WORKS[r].id !== work.id && related.indexOf(WORKS[r]) === -1) related.push(WORKS[r]);
  }
  related = related.slice(0, 3);

  html += '<div class="related"><div class="section-head"><span class="label">MORE</span><h2 style="font-size:28px;">更多作品</h2></div><div class="work-grid">';
  related.forEach(function (w) {
    html += '<div data-slot="' + w.id + '"></div>';
  });
  html += '</div></div>';

  root.innerHTML = html;

  related.forEach(function (w) {
    var slot = root.querySelector('[data-slot="' + w.id + '"]');
    if (slot) {
      var card = window.buildWorkCard(w);
      card.classList.add("visible");
      slot.parentNode.replaceChild(card, slot);
    }
  });
  window.initReveal(root);

  /* 页面标题 */
  document.title = work.title + " · 黄思贤 HUANG SIXIAN";
})();
