var t = require("../../04AE77A031D3D4DF62C81FA79EC3D3F6.js"), a = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        regionDisabled: !1,
        citydata: [],
        districdata: [],
        regionList: [],
        regionkey: [ 0, 0, 0 ],
        town: 0,
        townList: [],
        errortips: "",
        showTopTips: !1,
        valuekey: {
            name: "收货人姓名",
            mobile: "手机号码",
            address: "详细地址",
            region: "所在地区",
            town: "乡镇"
        },
        addressid: "",
        addressInfo: {
            name: "",
            address: "",
            mobile: "",
            isdefault: ""
        }
    },
    bindRegionChange: function(t) {
        "number" != typeof t.detail.value[0] || isNaN(t.detail.value[0]) || "number" != typeof t.detail.value[1] || isNaN(t.detail.value[1]) || "number" != typeof t.detail.value[2] || isNaN(t.detail.value[2]) || (this.setData({
            regionkey: t.detail.value
        }), this.getAddress4(this.data.regionList[2][t.detail.value[2]].value));
    },
    bindTownChange: function(t) {
        this.setData({
            town: t.detail.value
        });
    },
    bindRegionColumnChange: function(t) {
        var a = t.detail.column, i = t.detail.value;
        switch (a) {
          case 0:
            var e = this.data.regionList[0][i].value, s = [], n = [];
            this.citydata.forEach(function(t, a) {
                t.parent == e && s.push(t);
            }), this.districdata.forEach(function(t, a) {
                t.parent == s[0].value && n.push(t);
            }), (d = this.data.regionList)[1] = s, d[2] = n, this.setData({
                regionList: d
            });
            break;

          case 1:
            var e = this.data.regionList[1][i].value, n = [];
            this.districdata.forEach(function(t, a) {
                t.parent == e && n.push(t);
            });
            var d = this.data.regionList;
            d[2] = n, this.setData({
                regionList: d
            });
        }
        var o = this.data.regionkey;
        o[a] = i, console.log(o), this.setData({
            regionkey: o
        }), wx.hideLoading();
    },
    formSubmit: function(t) {
        var i = t.detail.value;
        for (var e in i) if ("isdefault" != e) {
            if ("" === i[e]) return console.log(i[e]), this.setData({
                errortips: this.data.valuekey[e] + "不能为空",
                showTopTips: !0
            }), void setTimeout(function() {
                this.setData({
                    showTopTips: !1
                });
            }.bind(this), 1e3);
            if ("mobile" == e && !/^[1][1-9][0-9]{9}$/.test(i[e])) return this.setData({
                errortips: this.data.valuekey[e] + "格式有误",
                showTopTips: !0
            }), void setTimeout(function() {
                this.setData({
                    showTopTips: !1
                });
            }.bind(this), 1e3);
        }
        var s = this.data.regionkey, n = this.data.regionList;
        i.province = n[0][s[0]].name, i.city = n[1][s[1]].name, i.district = n[2][s[2]].name, 
        i.jdid = n[2][s[2]].value, this.data.townList.length && (i.town = this.data.townList[this.data.town].name, 
        i.jdid4 = this.data.townList[this.data.town].value), i.isdefault = i.isdefault ? 1 : 2, 
        this.data.addressid && (i.uaid = this.data.addressid), a.handleAddress(i).then(function(t) {
            200 == t.status ? wx.navigateBack() : wx.showToast({
                title: t.message,
                icon: "none"
            });
        });
    },
    checkdata: function(t) {
        var a = t.target.dataset.field, i = t.detail.value, e = this.data.warn;
        switch ("" == i ? (e || (e = {}), e[a] = !0) : (e || (e = {}), e[a] = !1), this.setData({
            warn: e
        }), a) {
          case "mobile":
            if (/^[1][1-9][0-9]{9}$/.test(i)) return !0;
            e[a] = !0, this.setData({
                warn: e
            });
        }
    },
    getAddress4: function(t, i) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), a.getaddress4({
            jdid: t
        }).then(function(t) {
            if (200 == t.status) {
                var a = [], s = 0, n = 0;
                for (var d in t.data) a.push({
                    value: t.data[d],
                    name: d
                }), i && 1 * t.data[d] == i && (s = n), n++;
                e.setData({
                    townList: a,
                    town: s
                });
            } else e.setData({
                townList: [],
                town: 0
            });
            wx.hideLoading();
        });
    },
    deleteaddress: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定删除",
            success: function(i) {
                i.confirm ? a.delAddress({
                    uaid: t.data.addressid
                }).then(function(t) {
                    200 == t.status ? (wx.showToast({
                        title: "删除成功",
                        icon: "none"
                    }), setTimeout(function() {
                        wx.navigateBack();
                    }, 300)) : wx.showToast({
                        title: t.message,
                        icon: "none"
                    });
                }) : i.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(i) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), this.setData({
            regionDisabled: !0
        });
        var s = [];
        t.regioninit().then(function(t) {
            s = t;
        }).then(function() {
            t.citydata().then(function(t) {
                e.citydata = t;
            }).then(function() {
                t.districdata().then(function(t) {
                    e.districdata = t;
                }).then(function() {
                    var t = [];
                    if (t[0] = s, i.addressid) a.getAddress({
                        uaid: i.addressid
                    }).then(function(a) {
                        if (200 == a.status) {
                            for (var n = a.data, d = {
                                name: n.name,
                                address: n.address,
                                mobile: n.mobile,
                                isdefault: n.isdefault
                            }, o = [ 0, 0, 0 ], r = 0; r < s.length; r++) 1 * s[r].value == n.jdid1 && (o[0] = r);
                            for (var u = [], r = 0; r < e.citydata.length; r++) e.citydata[r].parent == n.jdid1 && u.push(e.citydata[r]);
                            t[1] = u;
                            for (var h = [], r = 0; r < e.districdata.length; r++) e.districdata[r].parent == n.jdid2 && h.push(e.districdata[r]);
                            t[2] = h;
                            for (r = 0; r < u.length; r++) 1 * u[r].value == n.jdid2 && (o[1] = r);
                            for (r = 0; r < h.length; r++) 1 * h[r].value == n.jdid && (o[2] = r);
                            e.setData({
                                addressInfo: d,
                                regionList: t,
                                regionkey: o,
                                addressid: i.addressid
                            }), 1 * a.data.jdid4 > 0 && e.getAddress4(a.data.jdid, a.data.jdid4);
                        } else wx.showToast({
                            title: a.message,
                            icon: "none"
                        });
                    }); else {
                        for (var n = [], d = 0; d < e.citydata.length; d++) e.citydata[d].parent == s[0].value && n.push(e.citydata[d]);
                        t[1] = n;
                        for (var o = [], d = 0; d < e.districdata.length; d++) e.districdata[d].parent == e.citydata[0].value && o.push(e.districdata[d]);
                        t[2] = o;
                    }
                    e.setData({
                        regionList: t,
                        regionDisabled: !1
                    }), wx.hideLoading();
                });
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.hideLoading();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});