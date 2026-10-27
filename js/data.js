/* ============================================
   网站数据文件 —— 修改作品信息只改这里
   分类顺序与作品顺序按素材文件夹编号与文件名备注排列
   ============================================ */

var SITE = {
  nameCn: "黄思贤",
  nameEn: "HUANG SIXIAN",
  title: "摄影 / 剪辑 / 短视频内容创作者",
  email: "1462868588@qq.com",
  phone: "18666341656",
  douyin: "无聊咸蛋黄",
  mediaBase: "assets/media/"
};

/* 视频作品分类（顺序 = 文件夹编号顺序） */
var VIDEO_CATS = [
  { id: "creative",   cn: "创意短片",   en: "CREATIVE FILM",  desc: "自拍自剪 · 影像叙事" },
  { id: "portrait",   cn: "人物摄影短片", en: "PORTRAIT FILM", desc: "人物拍摄 · 短片剪辑" },
  { id: "event",      cn: "活动混剪",   en: "EVENT EDIT",     desc: "活动纪实 · 节奏氛围" },
  { id: "interview",  cn: "人物访谈",   en: "INTERVIEW",      desc: "访谈剪辑 · 叙事提炼" },
  { id: "commercial", cn: "商业短视频", en: "COMMERCIAL",     desc: "品牌内容 · 商业剪辑" }
];

/* 视频作品列表（数组顺序 = 全部作品展示顺序）
   file   相对于 assets/media/ 的路径
   role   在该作品中的职责
   badge  卡片角标（短）
   stats  详情页数据（完整） */
var WORKS = [
  /* —— 全部作品 第 1-6 位（按你的备注排序） —— */
  { id: "c01", cat: "creative", title: "鱼老弟",
    file: "1创意短片（自拍自剪）/鱼老弟（播放量175w+，点赞10w+ 放在创意短片第一个 ，全部作品第一个）.mp4",
    role: "拍摄 · 剪辑", badge: "175W+ 播放", stats: "播放 175W+ · 点赞 10W+", cover: true },

  { id: "c02", cat: "creative", title: "汕尾纪录片",
    file: "1创意短片（自拍自剪）/汕尾纪录片（播放量6W+，点赞1200+，放在创意短片第二个 ，全部作品第二个）.mp4",
    role: "拍摄 · 剪辑", badge: "6W+ 播放", stats: "播放 6W+ · 点赞 1200+", cover: true },

  { id: "p01", cat: "portrait", title: "游神",
    file: "2人物摄影短片/游神（播放量140W+，点赞2w＋，放在人物摄影短片第一个 ，全部作品第三个）.mp4",
    role: "拍摄 · 剪辑", badge: "140W+ 播放", stats: "播放 140W+ · 点赞 2W+", cover: true },

  { id: "e01", cat: "event", title: "2026 艺术团宣传片",
    file: "3活动混剪/2026艺术团宣传片（放在活动剪辑第一个，全部的第4个）.mp4",
    role: "剪辑", badge: "", stats: "" },

  { id: "p02", cat: "portrait", title: "视频卡点",
    file: "2人物摄影短片/视频卡点（播放量27w+，点赞4000+，放在人物摄影短片第三个 ，全部作品第5个.mp4",
    role: "拍摄 · 剪辑", badge: "27W+ 播放", stats: "播放 27W+ · 点赞 4000+", cover: true },

  { id: "p03", cat: "portrait", title: "变速氛围感",
    file: "2人物摄影短片/变速氛围感（播放量11w+，点赞2000+，放在人物摄影短片个 ，全部作品第6个）.mp4",
    role: "拍摄 · 剪辑", badge: "11W+ 播放", stats: "播放 11W+ · 点赞 2000+", cover: true },

  /* —— 创意短片（其余） —— */
  { id: "c03", cat: "creative", title: "北京短片", file: "1创意短片（自拍自剪）/1北京短片.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c04", cat: "creative", title: "香港 VIDEO", file: "1创意短片（自拍自剪）/2香港video.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c05", cat: "creative", title: "乌镇短片", file: "1创意短片（自拍自剪）/3乌镇短片.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c06", cat: "creative", title: "上海短片", file: "1创意短片（自拍自剪）/4上海短片.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c07", cat: "creative", title: "澳门短片", file: "1创意短片（自拍自剪）/5澳门短片.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c08", cat: "creative", title: "实景合成", file: "1创意短片（自拍自剪）/实景合成.mp4", role: "拍摄 · 剪辑 · 合成", badge: "", stats: "" },
  { id: "c09", cat: "creative", title: "川西短片", file: "1创意短片（自拍自剪）/川西短片1.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },
  { id: "c10", cat: "creative", title: "香港纪录片", file: "1创意短片（自拍自剪）/香港纪录片.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },

  /* —— 人物摄影短片（其余） —— */
  { id: "p04", cat: "portrait", title: "杭州", file: "2人物摄影短片/杭州4.mp4", role: "拍摄 · 剪辑", badge: "", stats: "", cover: true },

  /* —— 活动混剪（其余） —— */
  { id: "e02", cat: "event", title: "2026 迎新晚会预告片", file: "3活动混剪/2026迎新晚会预告片（放在活动混剪第二个.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e03", cat: "event", title: "2025 先锋", file: "3活动混剪/2025先锋.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e04", cat: "event", title: "一舞活动宣传片", file: "3活动混剪/一舞活动宣传片.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e05", cat: "event", title: "毕业晚会", file: "3活动混剪/毕业晚会.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e06", cat: "event", title: "玩乐花絮", file: "3活动混剪/玩乐花絮.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e07", cat: "event", title: "玩乐预告片", file: "3活动混剪/玩乐预告片.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "e08", cat: "event", title: "迎新晚会混剪", file: "3活动混剪/迎新晚会混剪.mp4", role: "剪辑", badge: "", stats: "" },

  /* —— 人物访谈 —— */
  { id: "i01", cat: "interview", title: "江文熙", file: "4人物访谈类/江文熙.mp4", role: "剪辑", badge: "", stats: "" },
  { id: "i02", cat: "interview", title: "肖雲兮", file: "4人物访谈类/肖雲兮.mp4", role: "剪辑", badge: "", stats: "" },

  /* —— 商业短视频 —— */
  { id: "m01", cat: "commercial", title: "0117-01", file: "5商业短视频/0117-01(1).mp4", role: "剪辑 · 后期", badge: "", stats: "" },
  { id: "m02", cat: "commercial", title: "1023-01", file: "5商业短视频/1023-01(2).mp4", role: "剪辑 · 后期", badge: "", stats: "" },
  { id: "m03", cat: "commercial", title: "1月12日", file: "5商业短视频/1月12日(1).mp4", role: "剪辑 · 后期", badge: "", stats: "" },
  { id: "m04", cat: "commercial", title: "1月9日", file: "5商业短视频/1月9日 (3).mp4", role: "剪辑 · 后期", badge: "", stats: "" },
  { id: "m05", cat: "commercial", title: "hohoo", file: "5商业短视频/hohoo12119.mp4", role: "剪辑 · 后期", badge: "", stats: "" },
  { id: "m06", cat: "commercial", title: "狄菲俪诗", file: "5商业短视频/狄菲俪诗.mp4", role: "剪辑 · 后期", badge: "", stats: "" }
];

/* 静态摄影作品（顺序 = 文件夹编号顺序：舞台 → 风景 → 人物）
   dir 为素材文件夹实际名称 */
var PHOTO_CATS = [
  {
    id: "stage", cn: "舞台摄影", en: "STAGE", dir: "1舞台摄影",
    files: [
      "DSC08073.JPG", "DSC08089.JPG", "DSC08116.JPG", "DSC08138.JPG", "DSC08149.JPG",
      "DSC08155.JPG", "DSC08162.JPG", "DSC08215.JPG", "DSC08223.JPG", "DSC08381.JPG",
      "DSC01845.JPG", "DSC01759.jpg",
      "晚会1.jpg", "晚会2.jpg", "晚会3.jpg", "晚会6.jpg", "晚会8.jpg",
      "微信图片_20251218201832_403_57.jpg",
      "微信图片_20251218201843_404_57.jpg",
      "微信图片_20251218201914_406_57.jpg"
    ]
  },
  {
    id: "landscape", cn: "风景摄影", en: "LANDSCAPE", dir: "2风景摄影",
    files: [
      "1.jpg", "11.jpg", "16.jpg",
      "DSC00002.jpg", "DSC00007.jpg", "DSC00011.jpg", "DSC00014.jpg", "DSC00020.jpg",
      "DSC00043.jpg", "DSC00047.jpg", "DSC00057.jpg", "DSC00063.jpg", "DSC00079.jpg", "DSC00093.jpg",
      "DSC08907-4.jpg", "DSC08909-2.jpg", "DSC09051-12.jpg", "DSC09076-14.jpg",
      "DSC09138-3.jpg", "DSC09146-4.jpg", "DSC09148-10.jpg", "DSC09156-6.jpg",
      "DSC09198-10.jpg", "DSC09231-13.jpg"
    ]
  },
  {
    id: "portrait", cn: "人物摄影", en: "PORTRAIT", dir: "3人物摄影",
    files: [
      "3.jpg", "13.jpg", "16.jpg", "19.jpg", "20.jpg", "28.jpg",
      "DSC09621.JPG", "DSC09631.JPG", "DSC09696.JPG"
    ]
  }
];

/* 首页精选作品（引用 WORKS 中的 id，即你的全部作品前 6 位） */
var FEATURED = ["c01", "c02", "p01", "e01", "p02", "p03"];
