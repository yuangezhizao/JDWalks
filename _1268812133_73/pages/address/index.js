var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        addressList: [],
        authaddress: !0,
        fromorder: !1,
        selectid: 0,
        orderno: "",
        ordertype: ""
    },
    onLoad: function(t) {
        this.options = t, t.orderno && (t.ordertype || (t.ordertype = 0), this.setData({
            fromorder: !0,
            orderno: t.orderno,
            ordertype: t.ordertype
        })), t.addressid && this.setData({
            selectid: t.addressid
        });
    },
    onReady: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                ready: !0
            });
        }, 1e3);
    },
    onShow: function() {
        this.getAddressList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            ready: !1
        }), wx.stopPullDownRefresh(), t.getAddressList(), setTimeout(function() {
            t.setData({
                ready: !0
            });
        }, 3e3);
    },
    onReachBottom: function() {},
    getAuthAddress: function() {
        var e = this;
        e.setData({
            authaddress: !0
        }), wx.chooseAddress({
            success: function(s) {
                var d = {
                    province: s.provinceName,
                    city: s.cityName,
                    district: s.countyName,
                    address: s.detailInfo,
                    name: s.userName,
                    mobile: s.telNumber,
                    isdefault: 2
                };
                t.handleAddress(d).then(function(t) {
                    e.getAddressList();
                });
            }
        });
    },
    getwechataddress: function() {
        var t = this;
        this.data.authaddress || wx.openSetting({
            success: function(e) {
                e.authSetting["scope.address"] && t.getAuthAddress();
            }
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.address"] ? t.getAuthAddress() : wx.authorize({
                    scope: "scope.address",
                    success: function() {
                        t.getAuthAddress();
                    },
                    fail: function(e) {
                        t.setData({
                            authaddress: !1
                        }), wx.showToast({
                            icon: "none",
                            title: "请授权您的通讯地址"
                        });
                    }
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    addaddress: function() {
        wx.navigateTo({
            url: "../address/form"
        });
    },
    editaddress: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../address/form?addressid=" + e
        });
    },
    getAddressList: function() {
        var e = this;
        t.getAddressList().then(function(t) {
            200 == t.status && (t.data && t.data.list.length ? e.setData({
                addressList: t.data.list
            }) : e.setData({
                addressList: []
            }));
        });
    },
    selectaddress: function(e) {
        var s = this, d = e.currentTarget.dataset;
        if (this.setData({
            selectid: d.id
        }), 999 == this.data.orderno) {
            o = "../auctionconfirm/index?addressid=" + d.id + "&goodsid=" + this.options.gid + "&mypoint=" + this.options.mypoint + "&helpcount=" + this.options.helpcount;
            wx.redirectTo({
                url: o
            });
        } else {
            if (998 == this.data.ordertype) return void t.addAddress({
                uaid: d.id,
                orderno: this.data.orderno
            }).then(function(e) {
                200 == e.status ? (o = "../myluckdraw/detail?orderno=" + s.data.orderno, wx.redirectTo({
                    url: o
                })) : t.ALERT(e.message);
            });
            if (999 == this.data.ordertype) return void t.addAddress({
                uaid: d.id,
                orderno: this.data.orderno
            }).then(function(t) {
                o = "../activity/onejackdetail?oneid=" + s.options.oneid, wx.showModal({
                    title: "提示",
                    content: t.message,
                    showCancel: !1,
                    success: function(t) {
                        wx.redirectTo({
                            url: o
                        });
                    }
                });
            });
            var o = "../orderconfirm/index?addressid=" + d.id + "&gid=" + this.options.gid + "&amount=" + this.options.amount + "&gpid=" + this.options.gpid + "&orderno=" + this.data.orderno;
            wx.redirectTo({
                url: o
            });
        }
    }
});