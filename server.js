/* 零依赖本地预览服务器（支持视频拖动进度条所需的 Range 请求） */
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

var ROOT = __dirname;
var PORT = 8080;

var MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon"
};

http.createServer(function (req, res) {
  var pathname;
  try {
    pathname = decodeURIComponent(url.parse(req.url).pathname);
  } catch (e) {
    res.writeHead(400);
    return res.end("Bad Request");
  }
  if (pathname === "/") pathname = "/index.html";

  var file = path.normalize(path.join(ROOT, pathname));
  if (file.indexOf(ROOT) !== 0) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.stat(file, function (err, stat) {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 Not Found");
    }

    var ext = path.extname(file).toLowerCase();
    var type = MIME[ext] || "application/octet-stream";

    if (ext === ".mp4" || ext === ".webm" || ext === ".mov") {
      var range = req.headers.range;
      var size = stat.size;
      if (range) {
        var m = /bytes=(\d*)-(\d*)/.exec(range);
        var start = m && m[1] ? parseInt(m[1], 10) : 0;
        var end = m && m[2] ? parseInt(m[2], 10) : size - 1;
        if (isNaN(start) || start >= size) {
          res.writeHead(416, { "Content-Range": "bytes */" + size });
          return res.end();
        }
        if (isNaN(end) || end >= size) end = size - 1;
        res.writeHead(206, {
          "Content-Range": "bytes " + start + "-" + end + "/" + size,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Type": type
        });
        fs.createReadStream(file, { start: start, end: end }).pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Length": size,
          "Content-Type": type,
          "Accept-Ranges": "bytes"
        });
        fs.createReadStream(file).pipe(res);
      }
    } else {
      res.writeHead(200, { "Content-Type": type });
      fs.createReadStream(file).pipe(res);
    }
  });
}).listen(PORT, function () {
  console.log("========================================");
  console.log("  黄思贤作品集 · 本地预览已启动");
  console.log("  http://localhost:" + PORT);
  console.log("  按 Ctrl+C 停止服务器");
  console.log("========================================");
});
