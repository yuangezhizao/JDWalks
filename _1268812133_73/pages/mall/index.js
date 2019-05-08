var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = new getApp();

Page({
    data: {
        type: 0,
        bannerList: [],
        goodsList: [],
        page: 1,
        havenext: !0,
        coinname: a.globalData.sysinfo.coinname
    },
    onLoad: function(t) {
        this.setData({
            type: t.type
        });
    },
    onReady: function() {
        1 == this.data.type ? wx.setNavigationBarTitle({
            title: "竞拍"
        }) : wx.setNavigationBarTitle({
            title: "兑换"
        });
        var t = this;
        t.getGoodsList(), t.getBannerList();
    },
    onShow: function() {},
    getGoodsList: function() {
        var a = this;
        a.data.havenext && (a.setData({
            loading: !0
        }), wx.showLoading({
            title: "加载中"
        }), wx.showNavigationBarLoading(), t.getGoodsList({
            limit: 20,
            page: a.data.page,
            type: a.data.type
        }).then(function(t) {
            if (200 == t.status) {
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                });
                var e = t.data.list;
                a.formatGoodsList(e), a.data.goodsList ? a.setData({
                    goodsList: a.data.goodsList.concat(e)
                }) : a.setData({
                    goodsList: e
                });
            }
            setTimeout(function() {
                wx.hideLoading(), wx.hideNavigationBarLoading();
            }, 100), a.setData({
                loading: !1
            });
        }));
    },
    formatGoodsList: function(t) {
        t.forEach(function(t, a) {
            t.imgurl = JSON.parse(t.imgurl);
        });
    },
    Handlelower: function(t) {
        this.getGoodsList();
    },
    HandleUpper: function() {
        console.log(22);
    },
    errImg: function(t) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            havenext: !0,
            goodsList: []
        }), wx.stopPullDownRefresh(), t.getGoodsList();
    },
    onReachBottom: function() {
        this.Handlelower();
    },
    getBannerList: function() {
        var a = this;
        if (1 == this.data.type) e = 2; else var e = 3;
        t.getBannerList({
            position: e
        }).then(function(t) {
            200 == t.status && t.data && a.setData({
                bannerList: t.data
            });
        });
    },
    godetail: function(t) {
        var a = t.currentTarget.dataset, e = a.id;
        switch (1 * a.type) {
          case 1:
            wx.navigateTo({
                url: "../goods/index?goodsid=" + e + "&type=" + this.data.type
            });
            break;

          case 2:
            wx.navigateTo({
                url: "../goods/exchange?goodsid=" + e
            });
            break;

          case 3:
            wx.navigateTo({
                url: "../goods/seckill?goodsid=" + e
            });
        }
    }
});