var n = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), t = (require("../../9A15EBF331D3D4DFFC7383F498A3D3F6.js"), 
new getApp());

Page({
    data: {
        showbtnloading: !1,
        userInfo: {},
        issign: 0,
        continuity: 0,
        coinname: t.globalData.sysinfo.coinname,
        showqrcode: !1,
        qrcoderimg: ""
    },
    onLoad: function(o) {
        var e = this;
        if (n.checklogin()) {
            var a = "fromuserid=" + t.globalData.userInfo.urid;
            n.getMinicodeurl({
                scene: a,
                page: "pages/index/index"
            }).then(function(n) {
                200 == n.status && wx.downloadFile({
                    url: n.data.url,
                    fail: function(n) {
                        wx.showToast({
                            title: n.message,
                            icon: "none"
                        });
                    },
                    success: function(n) {
                        e.setData({
                            qrcoderimg: n.tempFilePath
                        });
                    }
                });
            }), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#F15B24"
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.getUserInfo(), n.getMyrecords({
            limit: 1
        }).then(function(n) {
            200 == n.status && t.setData({
                currentstep: n.data.list[0].steps
            });
        });
        var o = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(o);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var n = this;
        wx.stopPullDownRefresh(), n.getUserInfo();
    },
    sign: function() {
        var t = this;
        n.Sign().then(function(n) {
            200 == n.status ? (wx.showToast({
                icon: "none",
                title: "签到成功"
            }), t.setData({
                issign: 1
            })) : wx.showToast({
                icon: "none",
                title: n.message
            });
        });
    },
    clearcache: function() {
        wx.showModal({
            title: "提示",
            confirmText: "继续",
            content: "清除缓存后会重新登录,是否继续?",
            success: function(n) {
                n.confirm ? (wx.clearStorageSync(), wx.reLaunch({
                    url: "./userauth"
                })) : n.cancel && console.log("用户点击取消");
            }
        });
    },
    onReachBottom: function() {},
    gopoint: function() {
        wx.navigateTo({
            url: "../point/point"
        });
    },
    gofriends: function() {
        wx.navigateTo({
            url: "../friends/friends"
        });
    },
    goaddress: function() {
        wx.navigateTo({
            url: "../address/index"
        });
    },
    gomyexchange: function() {
        wx.navigateTo({
            url: "../exchange/index"
        });
    },
    gomyauction: function() {
        wx.navigateTo({
            url: "../auction/index"
        });
    },
    gomycollect: function() {
        wx.navigateTo({
            url: "../collect/index"
        });
    },
    gomysponsored: function() {
        wx.navigateTo({
            url: "../sponsorrecord/index"
        });
    },
    gorule: function() {
        wx.navigateTo({
            url: "../rule/index"
        });
    },
    gofaq: function() {
        wx.navigateTo({
            url: "../rule/index?rulename=faq"
        });
    },
    gomycard: function() {
        wx.navigateTo({
            url: "../mycard/index"
        });
    },
    contact: function() {
        wx.navigateTo({
            url: "../webview/index?jumpurl=https%3a%2f%2fmeite-m.jd.com%2fhindex.htm%3fentrance%3d20925%26source%3dh5%26companyId%3d1015508347135961"
        });
    },
    logout: function() {
        wx.clearStorage();
    },
    getUserInfo: function() {
        var t = this;
        n.getUserInfo().then(function(o) {
            200 == o.status && (o.data.allsteps = n.formatBignumber(o.data.allsteps), t.setData({
                userInfo: o.data,
                issign: o.data.issign,
                continuity: o.data.continuity
            }));
        });
    },
    showQrcode: function() {
        this.setData({
            showqrcode: !this.data.showqrcode
        });
    },
    saveQrcode: function() {
        var n = this;
        wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                wx.showLoading({
                    title: "保存中..."
                }), wx.saveImageToPhotosAlbum({
                    filePath: n.data.qrcoderimg,
                    success: function() {
                        wx.showToast({
                            title: "保存成功!"
                        });
                    },
                    complete: function() {
                        wx.hideLoading();
                    },
                    fail: function(n) {
                        console.log(n), wx.showToast({
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
    },
    authstudent: function() {
        n.jdAuth(this);
    },
    authrealname: function() {
        n.jdAuthRealName(this);
    },
    copyID: function() {
        var n = "昵称:" + this.data.userInfo.nickname + ",ID:" + this.data.userInfo.jdid;
        wx.setClipboardData({
            data: n,
            success: function(n) {}
        });
    }
});