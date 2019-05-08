var t = require("../../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        categoryid: "",
        page: 1,
        havenext: !0,
        goodsList: [],
        bannerList: []
    },
    getBannerList: function() {
        var a = this;
        t.getBannerList({
            position: 4,
            categoryid: this.data.categoryid
        }).then(function(t) {
            200 == t.status && t.data && a.setData({
                bannerList: t.data
            });
        });
    },
    getCategoryGoodsList: function() {
        var a = this;
        a.data.havenext && (a.setData({
            loading: !0
        }), wx.showLoading({
            title: "加载中"
        }), wx.showNavigationBarLoading(), t.categoryList({
            page: this.data.page,
            categoryid: this.data.categoryid
        }).then(function(t) {
            if (200 == t.status) {
                e = t.data.list;
                if (a.data.goodsList && a.data.page > 1) var e = a.data.goodsList.concat(e);
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                }), a.setData({
                    loading: !1,
                    systime: t.sys_time,
                    goodsList: e
                });
            }
            setTimeout(function() {
                wx.hideLoading(), wx.hideNavigationBarLoading();
            }, 100);
        }));
    },
    onLoad: function(t) {
        this.setData({
            categoryid: t.categoryid
        }), this.getCategoryGoodsList(), this.getBannerList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            havenext: !0
        }), wx.stopPullDownRefresh(), t.getCategoryGoodsList();
    },
    onReachBottom: function() {
        this.getCategoryGoodsList();
    },
    onShareAppMessage: function() {}
});