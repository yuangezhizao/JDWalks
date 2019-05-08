var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = new getApp();

Page({
    data: {
        collectList: [],
        page: 1,
        havenext: !0,
        coinname: a.globalData.sysinfo.coinname
    },
    onLoad: function(t) {},
    onReady: function() {
        var t = this;
        this.getcollectList(), setTimeout(function() {
            t.setData({
                ready: !0
            });
        }, 1e3);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            havenext: !0,
            ready: !1
        }), wx.stopPullDownRefresh(), t.getcollectList(), setTimeout(function() {
            t.setData({
                ready: !0
            });
        }, 3e3);
    },
    onReachBottom: function() {
        this.getcollectList();
    },
    godetail: function(t) {
        var a = t.currentTarget.dataset, e = a.goodsid;
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
    },
    getcollectList: function() {
        var a = this;
        a.data.havenext && (wx.showNavigationBarLoading(), wx.showLoading({
            title: "加载中"
        }), t.myLikeList({
            limit: 20,
            page: a.data.page
        }).then(function(t) {
            if (200 == t.status) {
                var e = t.data.list;
                t.data.list.forEach(function(t, a) {
                    t.imgurl = JSON.parse(t.imgurl);
                }), a.data.collectList && a.data.page > 1 ? a.setData({
                    collectList: a.data.collectList.concat(e)
                }) : a.setData({
                    collectList: e
                }), t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                });
            }
            setTimeout(function() {
                wx.hideLoading({
                    title: "加载中"
                }), wx.hideNavigationBarLoading();
            }, 800);
        }));
    }
});