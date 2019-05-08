var o = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), n = new getApp();

Page({
    data: {
        fromuserinfo: {},
        sponsorpoint: 0,
        goodsid: "",
        goodsInfo: ""
    },
    getGoodsDetail: function() {
        var n = this;
        o.getGoodsDetail({
            gid: n.data.goodsid
        }).then(function(o) {
            if (200 == o.status) {
                var t = o.data;
                t.sponsor = 1, t.imgurl = JSON.parse(t.imgurl), n.setData({
                    goodsInfo: t
                });
            } else wx.showModal({
                showCancel: !1,
                title: "提示",
                content: o.message,
                success: function(o) {
                    o.confirm ? wx.navigateBack() : o.cancel && console.log("用户点击取消");
                }
            });
        });
    },
    onLoad: function(t) {
        if (o.checklogin()) {
            var i = this;
            n.globalData.userInfo.urid != t.fromuserid ? (this.setData({
                goodsid: t.gid
            }), this.getGoodsDetail(), o.getUserInfo({
                urid: t.fromuserid
            }).then(function(o) {
                200 == o.status ? (o.data.urid = t.fromuserid, i.setData({
                    fromuserinfo: o.data
                })) : wx.showToast({
                    icon: "none",
                    title: o.message
                });
            })) : wx.switchTab({
                url: "../index/index"
            });
        }
    },
    bindsponsor: function() {
        var n = this;
        wx.showLoading({
            title: "助力中"
        }), o.auctionHelp({
            tourid: n.data.fromuserinfo.urid,
            auid: this.data.goodsInfo.auction.id
        }).then(function(o) {
            200 == o.status ? setTimeout(function() {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: "助力成功",
                    success: function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }
                });
            }, 500) : setTimeout(function() {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: o.message,
                    success: function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }
                });
            }, 500), setTimeout(function() {
                wx.hideLoading();
            }, 200);
        });
    },
    onReady: function() {
        n.checkUserLogin();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});