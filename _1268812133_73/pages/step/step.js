var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        steplist: null,
        userInfo: null,
        stepheight: 0,
        page: 1,
        havenext: !0,
        sumsteps: ""
    },
    onLoad: function(t) {
        wx.getSystemInfoSync();
    },
    onReady: function() {
        var e = this;
        e.getStepList(), t.getUserInfo().then(function(t) {
            200 == t.status && e.setData({
                userInfo: t.data
            });
        });
    },
    lower: function(t) {},
    getStepList: function() {
        var e = this;
        e.data.havenext && t.getMyrecords({
            limit: 20,
            page: e.data.page
        }).then(function(t) {
            if (200 == t.status) {
                1 == e.data.page && e.setData({
                    sumsteps: t.data.sum
                }), t.data.pages > e.data.page ? e.setData({
                    page: e.data.page + 1
                }) : e.setData({
                    havenext: !1
                });
                var a = t.data.list;
                e.formatsteplist(a), e.data.steplist ? e.setData({
                    steplist: e.data.steplist.concat(a)
                }) : e.setData({
                    steplist: a
                });
            }
        });
    },
    formatsteplist: function(t) {
        return t.forEach(function(t, e) {
            var a = new Date(t.recorddate), n = a.getFullYear() + "年", s = a.getMonth() + 1 + "月", o = a.getDate() + "日", i = new Date();
            t.recorddate = s + o, a.getFullYear() == i.getFullYear() ? t.curMounth = s : t.curMounth = n + s, 
            t.month = s;
        }), t;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            steplist: null,
            page: 1,
            havenext: !0
        }), wx.stopPullDownRefresh(), this.getStepList();
    },
    onReachBottom: function() {
        wx.showNavigationBarLoading();
        var t = this;
        setTimeout(function() {
            wx.hideNavigationBarLoading(), t.getStepList();
        }, 1e3);
    }
});