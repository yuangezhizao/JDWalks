var t = new getApp(), e = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = require("../../9A15EBF331D3D4DFFC7383F498A3D3F6.js"), n = wx.createCanvasContext("myCanvas");

Page({
    data: {
        loadingimg: a.loadingimg,
        shareImg: [],
        shareIndex: 0,
        showCtx: !1,
        sharetitle: "",
        imgw: "",
        imgh: ""
    },
    handleDraw: function(t, e) {
        var a = this, i = wx.getSystemInfoSync(), s = (i.pixelRatio, i.screenWidth / 750), o = 640 * s;
        n.setFontSize(10), n.setTextBaseline("top"), this.setData({
            imgw: o,
            imgh: 500 * s
        }), n.drawImage(t, 0, 0, o, 500 * s), n.draw(!0), n.setFillStyle("#FFFFFF"), n.setFontSize(70 * s), 
        n.fillText(a.todaysteps, 42 * s, 22 * s), n.draw(!0), n.setFontSize(22 * s), n.fillText("今日步数", 42 * s, 120 * s), 
        n.draw(!0), n.drawImage(a.avatar, 42 * s, 386 * s, 80 * s, 80 * s), n.setFontSize(36 * s), 
        n.fillText(a.nickname, 136 * s, 386 * s), n.setFontSize(20 * s), n.fillText("连续运动" + a.continuity + "天", 136 * s, 436 * s), 
        n.draw(!0), 0 == e && (n.setFillStyle("#FFFFFF"), n.fillRect(0, 500 * s, o, 120 * s), 
        n.draw(!0), n.drawImage(a.bg, 514 * s, 512 * s, 96 * s, 96 * s), n.setFillStyle("black"), 
        n.setFontSize(28 * s), n.fillText("奔跑吧少东家", 320 * s, 526 * s), n.setFontSize(20 * s), 
        n.setFillStyle("#999999"), n.fillText("长按识别小程序", 320 * s, 566 * s), n.draw(!0)), 
        wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            success: function(t) {
                a.imageUrl = t.tempFilePath;
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.hideLoading(), wx.hideNavigationBarLoading();
    },
    ctxdrawImage: function(t) {
        wx.showLoading({
            title: "加载中"
        }), wx.showNavigationBarLoading();
        var e = this.data.shareImg[this.data.shareIndex], a = this, n = wx.getStorageSync(e);
        n ? a.handleDraw(n, t) : wx.downloadFile({
            url: e,
            success: function(n) {
                a.handleDraw(n.tempFilePath, t);
                wx.setStorageSync(e, n.tempFilePath);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    changebg: function() {
        if (this.data.shareIndex < this.data.shareImg.length - 1) {
            var t = 1 * this.data.shareIndex + 1;
            this.setData({
                shareIndex: t
            });
        } else this.setData({
            shareIndex: 0
        });
        this.ctxdrawImage();
    },
    onLoad: function(a) {
        var n = this, i = this;
        e.getShareimage({
            type: 1
        }).then(function(t) {
            200 == t.status && (t.data.imgurl = JSON.parse(t.data.imgurl), n.setData({
                sharetitle: t.data.title,
                shareImg: t.data.imgurl
            }));
        }).then(e.getUserInfo().then(function(a) {
            if (200 == a.status) {
                i.setData({
                    userInfo: a.data,
                    continuity: a.data.continuity
                }), n.nickname = a.data.nickname, n.avatar = a.data.avatarurl, n.continuity = a.data.continuity, 
                n.todaysteps = a.data.todaysteps;
                var s = "fromuserid=" + t.globalData.userInfo.urid;
                e.getMinicodeurl({
                    scene: s,
                    page: "pages/index/index"
                }).then(function(t) {
                    200 == t.status ? wx.downloadFile({
                        url: t.data.url,
                        fail: function(t) {
                            wx.showToast({
                                title: t.message,
                                icon: "none"
                            }), this.bg = "";
                        },
                        success: function(t) {
                            if (t.tempFilePath) {
                                var e = t.tempFilePath.split(".");
                                "json" == e[e.length - 1] ? i.bg = "/images/qrcode.jpg" : i.bg = t.tempFilePath, 
                                wx.downloadFile({
                                    url: n.avatar,
                                    fail: function(t) {
                                        i.avatar = "/images/logo.png";
                                    },
                                    success: function(t) {
                                        i.avatar = t.tempFilePath;
                                    },
                                    complete: function() {
                                        i.setData({
                                            showCtx: !0
                                        }), i.ctxdrawImage(0);
                                    }
                                });
                            } else wx.showToast({
                                title: "二维码生成失败,请重试",
                                icon: "none"
                            });
                        }
                    }) : wx.showToast({
                        title: t.message,
                        icon: "none"
                    });
                });
            }
        }));
    },
    saveImage: function() {
        wx.canvasToTempFilePath({
            canvasId: "myCanvas",
            success: function(t) {
                wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        wx.showLoading({
                            title: "保存中..."
                        }), wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function() {
                                e.Sharediary(), wx.showToast({
                                    title: "保存成功!"
                                });
                            },
                            complete: function() {
                                wx.hideLoading();
                            },
                            fail: function() {
                                wx.showToast({
                                    icon: "none",
                                    title: "保存失败!"
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "无法保存到相册",
                            content: "请依次点击小程序 右上角 - 关于奔跑吧少东家 - 右上角 - 设置 打开保存到相册权限"
                        });
                    }
                });
            }
        });
    },
    chooseimage: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                console.log(a), wx.getImageInfo({
                    src: a[0],
                    success: function(e) {
                        e.width < 640 || e.height < 500 ? wx.showToast({
                            title: "图片太小,请上传640*500及以上的图片。",
                            icon: "none",
                            success: function() {}
                        }) : (t.setData({
                            showCtx: !1,
                            cropoersrc: a
                        }), t.cropper = t.selectComponent("#cropper"));
                    }
                });
            }
        });
    },
    pushImg: function() {
        var t = this, e = this;
        this.cropper.getImg(function(a) {
            var n = e.data.shareImg;
            n.push(a), e.setData({
                shareImg: n,
                shareIndex: n.length - 1,
                cropoersrc: !1,
                showCtx: !0
            }), wx.setStorageSync(a, a), t.ctxdrawImage(0);
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var n = "/pages/index/index?fromuserid=" + t.globalData.userInfo.urid;
        return e.Sharediary(), {
            title: this.data.sharetitle,
            imageUrl: this.imageUrl,
            path: n,
            success: function(t) {}
        };
    }
});