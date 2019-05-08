var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        pointslist: null,
        userInfo: null,
        page: 1,
        havenext: !0,
        monthtips: []
    },
    onLoad: function(t) {},
    onReady: function() {
        var a = this;
        a.getPointsList(), t.getUserInfo().then(function(t) {
            200 == t.status && a.setData({
                userInfo: t.data
            });
        });
    },
    lower: function(t) {
        this.getPointsList();
    },
    getPointsList: function() {
        var a = this;
        a.data.havenext && (wx.showNavigationBarLoading(), wx.showLoading({
            title: "加载中"
        }), t.sendList({
            limit: 20,
            page: a.data.page
        }).then(function(t) {
            if (200 == t.status) {
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                });
                var n = t.data.list, n = a.formatlist(n);
                a.data.pointslist ? a.setData({
                    pointslist: a.data.pointslist.concat(n)
                }) : a.setData({
                    pointslist: n
                });
            }
            setTimeout(function() {
                wx.hideLoading({
                    title: "加载中"
                }), wx.hideNavigationBarLoading();
            }, 800);
        }));
    },
    formatlist: function(t) {
        this.data.monthtips;
        return t.forEach(function(t, a) {
            var n = new Date(1e3 * t.create_time), e = n.getFullYear() + "年", i = n.getMonth() + 1 + "月", o = n.getDate() + "日", s = n.getHours(), u = n.getMinutes();
            s < 10 && (s = "0" + s), u < 10 && (u = "0" + u), t.recorddate = i + o + " " + s + ":" + u, 
            t.curMounth = e + i, t.month = i;
        }), t;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            havenext: !0,
            pointslist: null
        }), wx.stopPullDownRefresh(), t.getPointsList();
    },
    onReachBottom: function() {
        this.getPointsList();
    }
});