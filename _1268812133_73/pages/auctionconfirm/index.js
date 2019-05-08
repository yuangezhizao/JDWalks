var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        addressid: "",
        detail: {},
        addressinfo: {
            name: ""
        },
        orderno: "",
        goodsid: "",
        disabled: !1
    },
    getGoodsDetail: function() {
        var s = this, o = this;
        wx.showLoading({
            title: "加载中"
        }), t.getGoodsDetail({
            gid: o.data.goodsid
        }).then(function(t) {
            if (200 == t.status) {
                var a = t.data;
                if (a.imgurl = JSON.parse(a.imgurl), o.setData({
                    detail: a
                }), s.options.addressid) i = s.options.addressid; else if (a.uaid) var i = t.data.uaid;
                i && (s.setData({
                    addressid: i
                }), s.getAddressInfo());
            } else wx.showModal({
                showCancel: !1,
                title: "提示",
                content: t.message,
                success: function(t) {
                    t.confirm ? (wx.navigateBack(), console.log("用户点击确定")) : t.cancel && console.log("用户点击取消");
                }
            });
            setTimeout(function() {
                wx.hideLoading();
            }, 300);
        });
    },
    getAddressInfo: function() {
        var s = this;
        t.getAddress({
            uaid: this.data.addressid
        }).then(function(t) {
            200 == t.status ? s.setData({
                addressinfo: t.data
            }) : wx.showToast({
                title: t.message,
                icon: "none"
            });
        });
    },
    editaddress: function(t) {
        if (t.currentTarget.dataset.addressid) s = t.currentTarget.dataset.addressid; else var s = "";
        var o = "../address/index?orderno=999&gid=" + this.data.goodsid + "&addressid=" + s + "&mypoint=" + this.data.mypoint + "&helpcount=" + this.data.helpcount;
        wx.redirectTo({
            url: o
        });
    },
    submit: function() {
        var s = this;
        this.setData({
            disabled: !0
        });
        var o = this;
        1 * this.data.detail.property != 0 || "" != this.data.addressid ? (wx.showLoading({
            title: "数据处理中"
        }), t.auctionPreorder({
            hvalue: this.data.helpcount,
            value: this.data.mypoint,
            uaid: this.data.addressid,
            auid: this.data.detail.auction.id
        }).then(function(t) {
            setTimeout(function() {
                s.setData({
                    disabled: !1
                }), 200 == t.status ? wx.showModal({
                    title: "提示",
                    content: "出价成功",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.reLaunch({
                            url: "../auction/index"
                        });
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm ? wx.navigateTo({
                            url: "../goods/index?goodsid=" + o.data.goodsid
                        }) : t.cancel && console.log("用户点击取消");
                    }
                });
            }, 300), setTimeout(function() {
                wx.hideLoading();
            }, 200);
        })) : wx.showModal({
            title: "提示",
            content: "请填写收货地址",
            showCancel: !1,
            success: function(t) {}
        });
    },
    onLoad: function(t) {
        this.setData({
            goodsid: t.goodsid,
            mypoint: t.mypoint,
            helpcount: t.helpcount
        }), this.options = t, this.getGoodsDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});