var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        pointslist: null,
        userInfo: null,
        stepheight: 0,
        page: 1,
        havenext: !0
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
    getPointsList: function() {
        var a = this;
        a.data.havenext && (wx.showNavigationBarLoading(), t.getMypoints({
            limit: 30,
            page: a.data.page
        }).then(function(t) {
            if (200 == t.status) {
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                });
                var n = t.data.userPoints;
                a.data.pointslist ? a.setData({
                    pointslist: a.data.pointslist.concat(n)
                }) : a.setData({
                    pointslist: n
                });
            }
            setTimeout(function() {
                wx.hideNavigationBarLoading();
            }, 1e3);
        }));
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getPointsList();
    }
});