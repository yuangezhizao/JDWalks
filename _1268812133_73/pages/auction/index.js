var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = new getApp();

Page({
    data: {
        auctionList: [],
        type: 1,
        page: 1,
        havenext: !0,
        coinname: a.globalData.sysinfo.coinname
    },
    onLoad: function(t) {},
    onReady: function() {
        var t = this;
        this.getAuctionList(), setTimeout(function() {
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
        }), wx.stopPullDownRefresh(), t.getAuctionList(), setTimeout(function() {
            t.setData({
                ready: !0
            });
        }, 3e3);
    },
    onReachBottom: function() {
        this.getAuctionList();
    },
    getAuctionList: function() {
        var e = this;
        e.data.havenext && (wx.showNavigationBarLoading(), wx.showLoading({
            title: "加载中"
        }), t.myAuction({
            limit: 20,
            page: e.data.page
        }).then(function(t) {
            if (200 == t.status) {
                var i = a.globalData.userInfo.urid, n = t.data.list;
                t.data.list.forEach(function(t, a) {
                    var e = new Date();
                    switch (1 * t.auction_time.substring(0, 4) == e.getFullYear() && (t.auction_time = t.auction_time.substring(5)), 
                    t.url = "/pages/goods/index?goodsid=" + t.gid, 1 * t.state) {
                      case 0:
                      case 1:
                        t.statename = "竞拍中", t.pricetips = "当前出价", t.class = "";
                        break;

                      case 2:
                      case 3:
                        i == t.auction_urid ? (t.statename = "竞拍成功", t.pricetips = "中标价格", t.class = "", 
                        t.url = "/pages/order/index?orderid=" + t.id + "&type=1") : (t.statename = "竞拍失败", 
                        t.pricetips = "中标价格", t.class = "nactive");
                    }
                }), e.data.auctionList.length > 0 && e.data.page > 1 ? e.setData({
                    auctionList: e.data.auctionList.concat(n)
                }) : e.setData({
                    auctionList: n
                }), t.data.pages > e.data.page ? e.setData({
                    page: e.data.page + 1
                }) : e.setData({
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