var e = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {},
    onLoad: function(t) {
        if ("realname" == t.type) if ("success" == t.result) n = e.fetchUserRealNameVerify({
            state: 1,
            idtoken: t.token
        }); else n = e.fetchUserRealNameVerify({
            state: 2,
            idtoken: t.token
        }); else if (1 == t.result) n = e.fetchUserVerify({
            state: 1,
            jdid: t.token
        }); else var n = e.fetchUserVerify({
            state: 0,
            jdid: t.token
        });
        n.then(function(t) {
            if (200 == t.status) n = "认证成功"; else var n = t.message;
            wx.showModal({
                title: "提示",
                content: n,
                showCancel: !1,
                success: function(t) {
                    if (t.confirm) {
                        var n = wx.getStorageSync("authlastpath");
                        n && 200 == t.status || (n = "/pages/user/index"), e.istabbar(n) ? wx.switchTab({
                            url: n,
                            success: function() {
                                wx.removeStorageSync("authlastpath");
                            }
                        }) : wx.redirectTo({
                            url: n,
                            success: function() {
                                wx.removeStorageSync("authlastpath");
                            }
                        });
                    }
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});