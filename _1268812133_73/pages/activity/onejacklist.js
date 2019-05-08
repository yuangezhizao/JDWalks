var a = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        page: 1,
        havenext: !0,
        jackList: [],
        acid: ""
    },
    onLoad: function(a) {
        this.setData({
            acid: a.acid
        }), this.getjackList();
    },
    getjackList: function() {
        var t = this;
        t.data.havenext && (t.setData({
            loading: !0
        }), wx.showLoading({
            title: "加载中"
        }), wx.showNavigationBarLoading(), a.oneJacklist({
            page: this.data.page,
            acid: this.data.acid
        }).then(function(e) {
            if (200 == e.status) {
                if ((i = e.data.list).forEach(function(t, i) {
                    t = a.jackstateOpt(t, e.sys_time);
                }), t.data.jackList && t.data.page > 1) var i = t.data.jackList.concat(i);
                e.data.pages > t.data.page ? t.setData({
                    page: t.data.page + 1
                }) : t.setData({
                    havenext: !1
                }), t.setData({
                    loading: !1,
                    jackList: i
                });
            }
            setTimeout(function() {
                wx.hideLoading(), wx.hideNavigationBarLoading();
            }, 100);
        }));
    },
    gojackdetail: function(t) {
        var e = t.currentTarget.dataset.jack;
        e.jumpdisabled ? e.showtips && a.ALERT(e.showtips) : wx.navigateTo({
            url: "./onejackdetail?oneid=" + e.id
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(a);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        a.setData({
            page: 1,
            havenext: !0
        }), wx.stopPullDownRefresh(), a.getjackList();
    },
    onReachBottom: function() {
        this.getjackList();
    },
    onShareAppMessage: function() {
        return {
            title: "兄die！这里每天都在抽大奖，怎可错过！赶紧来瞧~"
        };
    }
});