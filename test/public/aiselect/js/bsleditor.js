!(function(e) {
  var y, t;
  ((y || (y = {})).list = function() {
    var n = [];
    function i(e, t) {
      e || n.push(t);
    }
    function e(e, t) {
      try {
        i(e(), t);
      } catch (e) {
        i(!1, t);
      }
    }
    return (
      e(function() {
        var e = document.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"));
      }, "HTML5 Canvas"),
      e(function() {
        var e = document.createElement("div");
        return "draggable" in e || ("ondragstart" in e && "ondrop" in e);
      }, "HTML5 Drag-and-Drop"),
      i("undefined" != typeof URL, "window.URL Support"),
      i("undefined" != typeof XMLHttpRequest, "XML Http Requests"),
      e(function() {
        return (
          "undefined" != typeof Uint32Array &&
          "undefined" != typeof Uint8Array &&
          void 0 !== new Uint8Array(2).set
        );
      }, "Native Type Arrays"),
      e(function() {
        var e = document.createElement("canvas");
        (e.width = 1), (e.height = 1);
        var t = e.getContext("2d").getImageData(0, 0, 1, 1).data;
        return 0 < new Int32Array(t.buffer).length;
      }, "ImageData.data is not a Uint8ClampedArray"),
      i(!(!window.history || !window.history.pushState), "HTML5 History"),
      i("undefined" != typeof Worker, "Web Workers"),
      i(!!Date.now, "Date.now()"),
      e(function() {
        return !!new Blob();
      }, "Blob and/or Blob Constructor"),
      i(
        navigator.userAgent.indexOf("Trident/7.0;") < 0 &&
          navigator.userAgent.indexOf("rv:11.0") < 0,
        "IE 11 not supported due to browser bugs"
      ),
      n.sort(),
      n
    );
  }),
    (function(e) {
      var n = !1,
        i = !1,
        o = null,
        r = !0,
        a = null,
        d = null,
        l = null,
        u = null,
        c = "",
        t =
          0 <= navigator.userAgent.indexOf("Trident")
            ? "about:blank"
            : "data:,Loading...",
        s = null;
      function p() {
        d.contentWindow.location.replace(t);
      }
      function f() {
        d &&
          ((document.body.style.overflow = c),
          (a.style.display = "none"),
          p(),
          a.removeChild(d),
          (d = null));
      }
      function g(e) {
        try {
          s(e);
        } catch (e) {}
      }
      function m(e) {
        var t = e.originalEvent;
        if (d && t.source == d.contentWindow) {
          var n = typeof t.data == "string" ? JSON.parse(t.data) : t.data;
          if (n.error) f(), g({ event: "error", error: n.error });
          else
            switch (n.command) {
              case "SavedAndResultReady":
                n.success &&
                  (r && f(),
                  g({
                    event: "result-generated",
                    image: n.success.image,
                    msg: n.msg
                  }));
                break;
              case "Exit":
                f(), g({ event: "editor-exit" });
            }
        }
      }
      (e.initialize = function(e) {
        if ("undefined" == typeof $) throw "Must have loaded jQuery.js";
        if ("number" != typeof e.apiId) throw "Must include apiId in opts";
        if (void 0 !== e.apiKey)
          throw "Must NOT include apiKey in opts - it is private!";
        (o = $.extend(!0, {}, e)), n || $(window).on("message", m), (n = !0);
        var t = y.list();
        return (i = 0 == t.length), t;
      }),
        (e.edit = function(e, t) {
          if (!n) throw "Please call BslMatting.initialize() first";
          if (!i) throw "Sorry, can't run in this browser";
          if (d) throw "Sorry, can only have one editor open at a time";
          (r = !e.images),
            (s = t),
            (function(e) {
              var t;
              null == a &&
                (((a = document.createElement("div")).id =
                  "bsl-matting-container"),
                document.body.appendChild(a),
                ((t = a.style).position = "fixed"),
                (t.top = "0"),
                (t.left = "0"),
                (t.width = "100%"),
                (t.height = "100%"),
                (t.zIndex = "100"),
                (t.background = "rgba(0, 0, 0, 0.5)"),
                (t.boxSizing = "border-box")),
                null == d &&
                  (((d = document.createElement("iframe")).name =
                    "bsl-matting-iframe"),
                  (d.id = d.name),
                  (d.mime_id = window.mime_id),
                  a.appendChild(d),
                  ((t = d.style).background = "#FFFFFF"),
                  (t.width = "100%"),
                  (t.height = "100%"),
                  d.setAttribute("seamless", "seamless"),
                  d.setAttribute("frameborder", "0")),
                null == l &&
                  (((l = document.createElement("form")).id =
                    "bsl-matting-form"),
                  (l.style.display = "none"),
                  document.body.appendChild(l),
                  (l.method = "GET"),
                  (l.target = d.name)),
                null == u &&
                  ((u = document.createElement("input")).setAttribute(
                    "type",
                    "hidden"
                  ),
                  u.setAttribute("name", "json"),
                  l.appendChild(u)),
                p();
              var n = "https://dev-c.bslong.cn/images.html";
              (l.action = n),
                (e.apiId = o.apiId),
                u.setAttribute("value", JSON.stringify(e)),
                l.submit(),
                (a.style.display = "block"),
                (c = document.body.style.overflow),
                (document.body.style.overflow = "hidden");
            })(e);
        });
    })(t || (t = {})),
    (window.BslMatting = t);
  (function(f) {
    b = function(img, options) {
      var time = options.type;
      var pOutputType = !time ? "jpeg" : time;
      var value = options.quality;
      // 压缩图片质量 0.8
      var quality = !value ? 0.8 : value;
      var _w = options.width;
      let x = !_w ? 100 : _w;
      var _h = options.height;
      let y = !_h ? 0 : _h;
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      var mime = "image/" + (pOutputType === "png" ? "png" : "jpeg");

      if (!w || !h) {
        throw new Error("Image load error or is empty");
      }
      // 宽高比例计算
      y ? (x = Math.round((w * y) / h)) : (y = Math.round((h * x) / w));

      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.height = y;
      canvas.width = x;
      context.drawImage(img, 0, 0, x, y);
      var mime_id = canvas.toDataURL(mime, quality);
      // window.localStorage.setItem("imgBase64", window.mime_id);
      var byteString = atob(mime_id.split(",")[1]);
      var mimeString = mime_id
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var file = new Blob([ab], {
        type: mimeString
      });
      return file;
    };
    r = function(img,options) {
      var key = options.type;
      var msgType = !key ? "jpeg" : key;
      var remove = options.quality;
      var setOrRemove = !remove ? 0.95 : remove;
      let width = !options.maxWidth ? 100 : options.maxWidth;
      let height = !options.maxHeight ? 0 : options.maxHeight;
      height ? width || (width = height) : (height = width);
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      w / h >= 1
        ? ((w = Math.min(w, width)), (h = 0))
        : ((h = Math.min(h, height)), (w = 0));
      return b(img, {
        type: msgType,
        quality: setOrRemove,
        width: w,
        height: h
      });
    };

    f.compressImg = function(file, callBack) {
      var width = 2e3;
      var height = width;
      if (!file || !file.size) {
        throw new Error("文件错误，请检查");
        this.isUploading = false;
      }

      var d = file.name;
      var suffix = d.slice(d.lastIndexOf(".") + 1);
      var url = file.type || "image/" + suffix;

      if (!/^image\/(?:png|jpe?g)/i.test(url)) {
        throw new Error("仅支持 PNG 和 JPG 图片");
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        let img = new Image();
        img.src = this.result;
        img.onload = function() {
          if (file.size > 20971520) {
            throw new Error("图片尺寸过大，请上传小于20MB的图片");
          }
          var newfile = r(img,{
            type: url.indexOf("png") > -1 ? "png" : "jpeg",
            maxHeight: height,
            maxWidth: width
          });
          callBack(newfile);

          event.target.value = "";
        };
      };
      reader.readAsDataURL(file);
    };
  })(
    typeof window.BslMattingUtils === "object" || (window.BslMattingUtils = {})
  );
})(
  "undefined" == typeof BslMattingExport
    ? (BslMattingExport = {})
    : BslMattingExport
);
