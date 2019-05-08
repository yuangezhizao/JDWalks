var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = require("../../9A15EBF331D3D4DFFC7383F498A3D3F6.js"), e = new getApp();

Page({
    data: {
        page: 1,
        havenext: !0,
        activityList: []
    },
    onLoad: function(t) {
        this.getActivityList();
    },
    onReady: function() {},
    getActivityList: function() {
        var a = this;
        a.data.havenext && (a.setData({
            loading: !0
        }), wx.showLoading({
            title: "加载中"
        }), wx.showNavigationBarLoading(), t.activityList({
            page: this.data.page
        }).then(function(t) {
            if (200 == t.status) {
                e = t.data.list;
                if (a.data.activityList && a.data.page > 1) var e = a.data.activityList.concat(e);
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                }), a.setData({
                    loading: !1,
                    activityList: e
                });
            }
            setTimeout(function() {
                wx.hideLoading(), wx.hideNavigationBarLoading();
            }, 100);
        }));
    },
    godetail: function(t) {
        var i = t.currentTarget.dataset.item;
        switch (1 * i.type) {
          case 1:
            var n = a.viewhost + "luckdraw?acid=6&urid=" + e.globalData.userInfo.urid + "&token=" + e.globalData.userInfo.token;
            n = encodeURIComponent(n), wx.navigateTo({
                url: "../webview/index?jumpurl=" + n
            });
            break;

          case 2:
            wx.navigateTo({
                url: "./onejacklist?acid=" + i.id
            });
        }
    },
    onShow: function() {
        var t = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            havenext: !0
        }), wx.stopPullDownRefresh(), t.getActivityList();
    },
    onReachBottom: function() {
        this.getActivityList();
    },
    onShareAppMessage: function() {
        return {
            title: "商品不花钱，步数免费换！还等什么，一起运动吧！",
            path: "/pages/index/index?fromuserid=" + e.globalData.userInfo.urid,
            success: function(t) {
                console.log(t);
            }
        };
    }
});