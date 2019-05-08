var t, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Component({
    properties: {
        imgSrc: {
            type: String
        },
        height: {
            type: Number,
            value: 200
        },
        width: {
            type: Number,
            value: 200
        },
        quality: {
            type: Number,
            value: 1
        },
        cut_top: {
            type: Number,
            value: null
        },
        cut_left: {
            type: Number,
            value: null
        },
        canvas_top: {
            type: Number,
            value: null
        },
        canvas_left: {
            type: Number,
            value: null
        },
        imgWidth: {
            type: null,
            value: null
        },
        imgHeight: {
            type: null,
            value: null
        },
        scale: {
            type: Number,
            value: 1
        },
        rotate: {
            type: Number,
            value: 0
        },
        min_scale: {
            type: Number,
            value: .5
        },
        max_scale: {
            type: Number,
            value: 2
        },
        disable_rotate: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        el: "image-cropper",
        info: wx.getSystemInfoSync(),
        init_imgWidth: 0,
        init_imgHeight: 0,
        origin_x: .5,
        origin_y: .5,
        imgTop: wx.getSystemInfoSync().windowHeight / 2,
        imgLeft: wx.getSystemInfoSync().windowWidth / 2,
        touch_img_relative: [ {
            x: 0,
            y: 0
        } ],
        first_Hypotenuse: 0,
        flag: !1,
        flag_bright: !0,
        canvas_overflow: !0,
        watch: {
            width: function(t, a) {
                a._changeWindowSize();
            },
            height: function(t, a) {
                a._changeWindowSize();
            },
            canvas_top: function(t, a) {
                a.data.canvas_top < -a.data.height || a.data.canvas_top > a.data.info.windowHeight ? a.data.canvas_overflow = !0 : a.data.canvas_overflow = !1;
            },
            canvas_left: function(t, a) {
                a.data.canvas_left < -a.data.width || a.data.canvas_left > a.data.info.windowWidth ? a.data.canvas_overflow = !0 : a.data.canvas_overflow = !1;
            },
            imgSrc: function(t, a) {
                a._changeWindowSize(!0);
            },
            cut_top: function(t, a) {
                a.data.cut_top < 0 && a.setData({
                    cut_top: 0
                }), a.data.cut_top > a.data.info.windowHeight - a.data.height && a.setData({
                    cut_top: a.data.info.windowHeight - a.data.height
                }), a._changeWindowSize();
            },
            cut_left: function(t, a) {
                a.data.cut_left < 0 && a.setData({
                    cut_left: 0
                }), a.data.cut_left > a.data.info.windowWidth - a.data.width && a.setData({
                    cut_left: a.data.info.windowWidth - a.data.width
                }), a._changeWindowSize();
            }
        }
    },
    attached: function() {
        this._watcher(), this._changeWindowSize(!0), this.data.init_imgWidth = this.data.imgWidth, 
        this.data.init_imgHeight = this.data.imgHeight;
        var t = this;
        if (t.data.imgWidth && (console.log(t.data.imgWidth), console.log(a(t.data.imgWidth)), 
        "string" == typeof t.data.imgWith && -1 != t.data.imgWidth.indexOf("%"))) {
            var i = t.data.imgWidth.replace("%", "");
            t.setData({
                imgWidth: t.data.info.windowWidth / 100 * i,
                init_imgWidth: t.data.info.windowWidth / 100 * i
            });
        }
        if (t.data.imgHeight && "string" == typeof t.data.imgHeight && -1 != t.data.imgHeight.indexOf("%")) {
            var e = t.data.imgHeight.replace("%", "");
            t.setData({
                imgHeight: t.data.info.windowHeight / 100 * e,
                init_imgHeight: t.data.info.windowHeight / 100 * e
            });
        }
        null == this.data.cut_top && null == this.data.cut_left ? this.cutCenter() : null != this.data.cut_top && null == this.data.cut_left ? this.setData({
            cut_left: 0
        }) : null == this.data.cut_top && null != this.data.cut_left && this.setData({
            cut_top: 0
        }), null != this.data.canvas_top && null == this.data.canvas_left ? this.setData({
            canvas_left: 0
        }) : null == this.data.canvas_top && null != this.data.canvas_left ? this.setData({
            canvas_top: 0
        }) : null == this.data.canvas_top && null == this.data.canvas_left && this.setData({
            canvas_top: -3e3
        }), this.data.watch.canvas_top(null, this), this.data.watch.canvas_left(null, this), 
        this.data.watch.cut_top(null, this), this.data.watch.cut_left(null, this);
    },
    methods: {
        getImg: function(t) {
            this._draw(), wx.canvasToTempFilePath({
                width: this.data.width,
                height: this.data.height,
                destWidth: 3 * this.data.width,
                destHeight: 3 * this.data.height,
                fileType: "png",
                quality: this.data.quality,
                canvasId: this.data.el,
                success: function(a) {
                    t(a.tempFilePath);
                }
            }, this);
        },
        clickCallback: function(t) {
            this._clickCallback = t;
        },
        setTransform: function(t) {
            if (t) {
                var a = this.data.scale;
                t.scale && (a = (a = (a = this.data.scale + t.scale) <= this.data.min_scale ? this.data.min_scale : a) >= this.data.max_scale ? this.data.max_scale : a);
                var i = this.data.cut_left, e = this.data.cut_top;
                t.cutX && (this.setData({
                    cut_left: i + t.cutX
                }), this.data.watch.cut_left(null, this)), t.cutY && (this.setData({
                    cut_top: e + t.cutY
                }), this.data.watch.cut_top(null, this)), this.setData({
                    imgTop: t.y ? this.data.imgTop + t.y : this.data.imgTop,
                    imgLeft: t.x ? this.data.imgLeft + t.x : this.data.imgLeft,
                    rotate: t.rotate ? this.data.rotate + t.rotate : this.data.rotate,
                    scale: a
                }), this.data.canvas_overflow || this._draw();
            }
        },
        upload: function() {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(a) {
                    var i = a.tempFilePaths[0];
                    t.pushImg(i);
                }
            });
        },
        cutCenter: function() {
            this.setData({
                cut_top: .5 * (this.data.info.windowHeight - this.data.height),
                cut_left: .5 * (this.data.info.windowWidth - this.data.width)
            });
        },
        setWidth: function(t) {
            this.setData({
                width: t
            }), this._changeWindowSize();
        },
        setHeight: function(t) {
            this.setData({
                height: t
            }), this._changeWindowSize();
        },
        setDisableRotate: function(t) {
            this.data.disable_rotate = t;
        },
        pushImg: function(t) {
            var a = this;
            t && this.setData({
                imgSrc: t
            }), wx.getImageInfo({
                src: this.data.imgSrc,
                success: function(t) {
                    var i = a.data.imgWidth, e = a.data.imgHeight;
                    a.data.init_imgWidth && a.data.init_imgHeight || (a.data.init_imgHeight || a.data.init_imgWidth ? a.data.init_imgHeight ? i = t.width / t.height * a.data.init_imgHeight : a.data.init_imgWidth && (e = t.height / t.width * a.data.init_imgWidth) : (i = t.width, 
                    e = t.height)), -1 == a.data.imgSrc.search(/tmp/) ? a.setData({
                        imgSrc: t.path,
                        imgWidth: i,
                        imgHeight: e
                    }) : a.setData({
                        imgWidth: i,
                        imgHeight: e
                    }), a._draw();
                },
                fail: function(t) {
                    a.setData({
                        imgSrc: ""
                    });
                }
            });
        },
        setScale: function(t) {
            t && (this.setData({
                scale: t.toFixed(3)
            }), this.data.canvas_overflow || this._draw());
        },
        setRotate: function(t) {
            t && (this.setData({
                rotate: t.toFixed(2)
            }), this.data.canvas_overflow || this._draw());
        },
        _init: function(t) {
            this.data.ctx || (this.data.ctx = wx.createCanvasContext(this.data.el, this)), this.data.ctx.width = this.data.width, 
            this.data.ctx.height = this.data.height, this.data.imgSrc && (t ? this.pushImg() : this._draw());
        },
        _changeWindowSize: function(t) {
            this.data.width > this.data.info.windowWidth && this.setData({
                width: this.data.info.windowWidth
            }), this.data.height > this.data.info.windowHeight && this.setData({
                height: this.data.info.windowHeight
            }), this._init(t);
        },
        _start: function(t) {
            if (this.data.flag = !1, 1 == t.touches.length) this.setData({
                "touch_img_relative[0]": {
                    x: t.touches[0].clientX - this.data.imgLeft,
                    y: t.touches[0].clientY - this.data.imgTop
                }
            }); else {
                var a = Math.abs(t.touches[0].clientX - t.touches[1].clientX), i = Math.abs(t.touches[0].clientY - t.touches[1].clientY), e = [ {
                    x: this.data.imgWidth - (this.data.imgLeft + this.data.imgWidth - t.touches[0].clientX),
                    y: this.data.imgHeight - (this.data.imgTop + this.data.imgHeight - t.touches[0].clientY)
                }, {
                    x: this.data.imgWidth - (this.data.imgLeft + this.data.imgWidth - t.touches[1].clientX),
                    y: this.data.imgHeight - (this.data.imgTop + this.data.imgHeight - t.touches[1].clientY)
                } ];
                this.setData({
                    first_Hypotenuse: Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2)),
                    touch_img_relative: e
                });
            }
            this.data.canvas_overflow || this._draw();
        },
        _move: function(a) {
            if (!this.data.flag) {
                if (this.data.flag_bright || (clearTimeout(t), this.setData({
                    flag_bright: !0
                })), 1 == a.touches.length) {
                    var i = a.touches[0].clientX - this.data.touch_img_relative[0].x, e = a.touches[0].clientY - this.data.touch_img_relative[0].y;
                    this.setData({
                        imgLeft: i,
                        imgTop: e
                    });
                } else {
                    var h = Math.abs(a.touches[0].clientX - a.touches[1].clientX), s = Math.abs(a.touches[0].clientY - a.touches[1].clientY), d = Math.sqrt(Math.pow(h, 2) + Math.pow(s, 2)), n = this.data.scale * (d / this.data.first_Hypotenuse), c = 0;
                    n = (n = n <= this.data.min_scale ? this.data.min_scale : n) >= this.data.max_scale ? this.data.max_scale : n;
                    var o = [ {
                        x: this.data.imgWidth - (this.data.imgLeft + this.data.imgWidth - a.touches[0].clientX),
                        y: this.data.imgHeight - (this.data.imgTop + this.data.imgHeight - a.touches[0].clientY)
                    }, {
                        x: this.data.imgWidth - (this.data.imgLeft + this.data.imgWidth - a.touches[1].clientX),
                        y: this.data.imgHeight - (this.data.imgTop + this.data.imgHeight - a.touches[1].clientY)
                    } ];
                    if (!this.data.disable_rotate) {
                        var l = 180 / Math.PI * Math.atan2(o[0].y, o[0].x) - 180 / Math.PI * Math.atan2(this.data.touch_img_relative[0].y, this.data.touch_img_relative[0].x), g = 180 / Math.PI * Math.atan2(o[1].y, o[1].x) - 180 / Math.PI * Math.atan2(this.data.touch_img_relative[1].y, this.data.touch_img_relative[1].x);
                        0 != l ? c = l : 0 != g && (c = g);
                    }
                    this.setData({
                        rotate: this.data.rotate + c,
                        scale: n,
                        first_Hypotenuse: Math.sqrt(Math.pow(h, 2) + Math.pow(s, 2)),
                        touch_img_relative: o
                    });
                }
                this.data.canvas_overflow || this._draw();
            }
        },
        _end: function(a) {
            var i = this;
            this.data.flag = !0, clearTimeout(t), t = setTimeout(function() {
                i.setData({
                    flag_bright: !1
                });
            }, 1e3);
        },
        _click: function(t) {
            var a = this;
            if (this.data.imgSrc) {
                this._draw();
                var i = t.detail.x, e = t.detail.y;
                i >= this.data.cut_left && i <= this.data.cut_left + this.data.width && e >= this.data.cut_top && e <= this.data.cut_top + this.data.height && wx.canvasToTempFilePath({
                    width: this.data.width,
                    height: this.data.height,
                    destWidth: 3 * this.data.width,
                    destHeight: 3 * this.data.height,
                    fileType: "png",
                    quality: this.data.quality,
                    canvasId: this.data.el,
                    success: function(t) {
                        a._clickCallback && a._clickCallback(t.tempFilePath);
                    }
                }, this);
            } else this.upload();
        },
        _draw: function() {
            if (this.data.imgSrc) {
                var t = this.data.imgWidth * this.data.scale, a = this.data.imgHeight * this.data.scale, i = this.data.imgLeft - this.data.cut_left, e = this.data.imgTop - this.data.cut_top;
                this.data.ctx.translate(i, e), this.data.ctx.rotate(this.data.rotate * Math.PI / 180), 
                this.data.ctx.drawImage(this.data.imgSrc, -t / 2, -a / 2, t, a), this.data.ctx.draw();
            }
        },
        _watcher: function() {
            var t = this;
            Object.keys(this.data.watch).forEach(function(a) {
                t._observe(t.data, a, t.data.watch[a]);
            });
        },
        _observe: function(t, a, i) {
            var e = this, h = t[a];
            Object.defineProperty(t, a, {
                configurable: !0,
                enumerable: !0,
                set: function(t) {
                    i(h = t, e);
                },
                get: function() {
                    return h;
                }
            });
        }
    },
    _preventTouchMove: function() {},
    ready: function(t) {}
});