var a = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), t = new getApp();

Page({
    data: {
        exchangeList: [],
        page: 1,
        havenext: !0,
        coinname: t.globalData.sysinfo.coinname,
        ready: !1
    },
    onLoad: function(a) {},
    onReady: function() {
        this.getexchangeList();
        var a = this;
        setTimeout(function() {
            a.setData({
                ready: !0
            });
        }, 1e3);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    Clipboard: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.item;
        wx.setClipboardData({
            data: e,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        wx.showToast({
                            icon: "none",
                            title: "已复制" + t + "到剪切板"
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        a.setData({
            page: 1,
            havenext: !0,
            ready: !1
        }), setTimeout(function() {
            a.setData({
                ready: !0
            });
        }, 3e3), wx.stopPullDownRefresh(), a.getexchangeList();
    },
    onReachBottom: function() {
        this.getexchangeList();
    },
    getexchangeList: function() {
        var t = this;
        t.data.havenext && (wx.showNavigationBarLoading(), wx.showLoading({
            title: "加载中"
        }), a.myCard({
            limit: 20,
            page: t.data.page
        }).then(function(a) {
            if (200 == a.status) {
                var e = a.data.list, n = new Date();
                a.data.list.forEach(function(a, t) {
                    1 * a.paytime.substring(0, 4) == n.getFullYear() && (a.paytime = a.paytime.substring(5)), 
                    a.orderDetail[0].exinfo = JSON.parse(a.orderDetail[0].exinfo);
                }), t.data.exchangeList.length > 0 && t.data.page > 1 ? t.setData({
                    exchangeList: t.data.exchangeList.concat(e)
                }) : t.setData({
                    exchangeList: e
                }), a.data.pages > t.data.page ? t.setData({
                    page: t.data.page + 1
                }) : t.setData({
                    havenext: !1
                });
            }
            setTimeout(function() {
                wx.hideLoading(), wx.hideNavigationBarLoading();
            }, 400);
        }));
    }
});