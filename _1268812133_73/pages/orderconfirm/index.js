var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        addressid: "",
        orderinfo: {},
        addressinfo: {
            name: ""
        },
        orderno: "",
        property: "0",
        disabled: !1
    },
    handleData: function(t) {
        if (200 == t.status) {
            this.setData({
                orderinfo: t.data.orderdetail,
                orderno: t.data.orderno,
                property: 1 * t.data.property
            });
            o = "";
            if (this.options.addressid) o = this.options.addressid; else if (t.data.uaid) var o = t.data.uaid;
            o && (this.setData({
                addressid: o
            }), this.getAddressInfo());
        } else wx.showModal({
            title: "提示",
            showCancel: !1,
            content: t.message,
            success: function(t) {
                t.confirm && wx.navigateBack();
            }
        });
    },
    getOrderInfo: function() {
        var o = this;
        if (this.options.orderno && wx.getStorageSync("orderinfo" + this.options.orderno)) {
            var e = wx.getStorageSync("orderinfo" + this.options.orderno);
            this.handleData(e);
        } else t.prePayorder(this.options).then(function(t) {
            o.handleData(t), wx.setStorageSync("orderinfo" + t.data.orderno, t);
        });
    },
    getAddressInfo: function() {
        var o = this;
        t.getAddress({
            uaid: this.data.addressid
        }).then(function(t) {
            200 == t.status ? o.setData({
                addressinfo: t.data
            }) : wx.showToast({
                title: t.message,
                icon: "none"
            });
        });
    },
    editaddress: function(t) {
        if (t.currentTarget.dataset.addressid) o = t.currentTarget.dataset.addressid; else var o = "";
        var e = "../address/index?orderno=" + this.data.orderno + "&gid=" + this.options.gid + "&amount=" + this.options.amount + "&gpid=" + this.options.gpid + "&addressid=" + o;
        wx.navigateTo({
            url: e
        });
    },
    submit: function() {
        var o = this;
        this.setData({
            disabled: !0
        });
        if (wx.showLoading({
            title: "数据处理中"
        }), 1 == this.data.property) var e = {
            orderno: this.data.orderno
        }, n = "../mycard/index", s = t.payCodeOrder(e); else var e = {
            orderno: this.data.orderno,
            uaid: this.data.addressid
        }, n = "../exchange/index", s = t.payOrder(e);
        s.then(function(t) {
            setTimeout(function() {
                o.setData({
                    disabled: !1
                }), 200 == t.status ? (wx.removeStorageSync("orderinfo" + o.options.orderno), wx.showModal({
                    title: "提示",
                    content: "兑换成功",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.reLaunch({
                            url: n
                        });
                    }
                })) : wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                    }
                });
            }, 300), setTimeout(function() {
                wx.hideLoading();
            }, 200);
        });
    },
    onLoad: function(t) {
        this.options = t, this.getOrderInfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});