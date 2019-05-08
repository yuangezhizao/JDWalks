var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), e = new getApp();

Page({
    login: function() {
        var t = this;
        wx.login({
            success: function(e) {
                e.code && t.setData({
                    code: e.code
                });
            }
        });
    },
    data: {
        showbtnloading: !1,
        lowVersion: !1,
        disabledlogin: !1
    },
    onLoad: function(t) {
        this.login();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    handleLogin: function(t) {
        t.detail.formId && wx.setStorageSync("formId", t.detail.formId);
    },
    userInfo: function(n) {
        var o = this;
        if (void 0 != n.detail.rawData) {
            var i = this;
            this.setData({
                disabledlogin: !0,
                showbtnloading: !0
            });
            var a = this.data.code, d = n.detail.rawData, r = n.detail.signature, s = n.detail.iv, c = n.detail.encryptedData, l = wx.getStorageSync("fromuserid"), g = wx.getStorageSync("appurid"), u = wx.getStorageSync("extappid"), f = wx.getStorageSync("dist"), w = wx.getStorageSync("gid");
            console.log({
                appurid: g,
                fromurid: l,
                extappid: u,
                dist: f,
                fromgid: w,
                wxcode: a,
                userinfo: d,
                signature: r,
                iv: s,
                encryptedData: c
            }), t.userLogin({
                appurid: g,
                fromurid: l,
                extappid: u,
                dist: f,
                fromgid: w,
                wxcode: a,
                userinfo: d,
                signature: r,
                iv: s,
                encryptedData: c
            }).then(function(n) {
                if (200 == n.status) {
                    (d = JSON.parse(d)).urid = n.data.urid, d.token = n.data.token, d.openid = n.data.openid, 
                    d.logintime = new Date().getTime();
                    var a = wx.getStorageSync("loginpath");
                    a || (a = "../index/index");
                    var r = wx.getStorageSync("formId");
                    wx.clearStorageSync(), wx.setStorageSync("userInfo", d), e.globalData.userInfo = d, 
                    r && t.formSave({
                        formid: r
                    }), setTimeout(function() {
                        wx.reLaunch({
                            url: a,
                            fail: function() {
                                wx.switchTab({
                                    url: "../index/index"
                                });
                            }
                        }), i.setData({
                            showbtnloading: !1
                        });
                    }.bind(o), 500);
                } else o.login(), wx.showModal({
                    title: "提示",
                    content: n.message,
                    showCancel: !1,
                    confirmText: "确定"
                }), i.setData({
                    showbtnloading: !1,
                    disabledlogin: !1
                });
            });
        } else wx.showModal({
            title: "提示",
            content: "信息获取失败,请重试。",
            showCancel: !1,
            confirmText: "确定"
        });
    }
});