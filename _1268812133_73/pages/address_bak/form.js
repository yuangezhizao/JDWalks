var t = require("../../04AE77A031D3D4DF62C81FA79EC3D3F6.js"), i = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        havetown: !1,
        townList: [],
        districid: "",
        townid: 0,
        townstr: "",
        citydata: [],
        districdata: [],
        isedit: !1,
        regionList: [],
        region: "",
        regionkey: [],
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
        ("number" != typeof t.detail.value[1] || isNaN(t.detail.value[1])) && (t.detail.value[1] = 0), 
        ("number" != typeof t.detail.value[2] || isNaN(t.detail.value[2])) && (t.detail.value[2] = 0), 
        this.setData({
            region: [ this.data.regionList[0][t.detail.value[0]].name, this.data.regionList[1][t.detail.value[1]].name, this.data.regionList[2][t.detail.value[2]].name ],
            regionkey: t.detail.value,
            districid: this.data.regionList[2][t.detail.value[2]].value
        }), this.bindRegionColumnChange({
            detail: {
                column: 0,
                value: 0
            }
        }), this.getAddress4(this.data.districid);
    },
    bindTownChange: function(t) {
        this.setData({
            town: t.detail.value,
            townid: this.data.townList[t.detail.value].id,
            townstr: this.data.townList[t.detail.value].name
        });
    },
    bindRegionColumnChange: function(t) {
        var i = t.detail.column, a = t.detail.value;
        switch (console.log(t), i) {
          case 0:
            var e = this.data.regioninit[i][a].value, s = [], n = [];
            this.citydata.forEach(function(t, i) {
                t.parent == e && s.push(t);
            }), this.districdata.forEach(function(t, i) {
                t.parent == s[0].value && n.push(t);
            }), this.setData({
                regionList: [ this.data.regioninit[0], s, n ]
            });
            break;

          case 1:
            var e = this.data.regionList[1][a].value, n = [];
            this.districdata.forEach(function(t, i) {
                t.parent == e && n.push(t);
            }), this.setData({
                regionList: [ this.data.regioninit[0], this.data.regionList[1], n ]
            });
        }
    },
    formSubmit: function(t) {
        var a = t.detail.value;
        for (var e in a) if ("isdefault" != e) {
            if ("" == a[e]) return this.setData({
                errortips: this.data.valuekey[e] + "不能为空",
                showTopTips: !0
            }), void setTimeout(function() {
                this.setData({
                    showTopTips: !1
                });
            }.bind(this), 1e3);
            if ("mobile" == e && !/^[1][1-9][0-9]{9}$/.test(a[e])) return this.setData({
                errortips: this.data.valuekey[e] + "格式有误",
                showTopTips: !0
            }), void setTimeout(function() {
                this.setData({
                    showTopTips: !1
                });
            }.bind(this), 1e3);
        }
        var s = this.data.region;
        a.province = s[0], a.city = s[1], a.district = s[2], a.town = this.data.townstr, 
        a.isdefault = a.isdefault ? 1 : 2, this.data.addressid && (a.uaid = this.data.addressid), 
        a.jdid = this.data.districid, a.jdid4 = this.data.townid, i.handleAddress(a).then(function(t) {
            200 == t.status ? wx.navigateBack() : wx.showToast({
                title: t.message,
                icon: "none"
            });
        });
    },
    checkdata: function(t) {
        var i = t.target.dataset.field, a = t.detail.value, e = this.data.warn;
        switch ("" == a ? (e || (e = {}), e[i] = !0) : (e || (e = {}), e[i] = !1), this.setData({
            warn: e
        }), i) {
          case "mobile":
            if (/^[1][1-9][0-9]{9}$/.test(a)) return !0;
            e[i] = !0, this.setData({
                warn: e
            });
        }
    },
    getAddress4: function(t, a) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), i.getaddress4({
            jdid: t
        }).then(function(i) {
            if (200 == i.status) {
                var s = [], n = 0, d = "", o = "";
                for (var r in i.data) s.push({
                    id: i.data[r],
                    name: r
                }), a && i.data[r] == a && (d = n, o = r), n++;
                e.setData({
                    townstr: o,
                    town: d,
                    havetown: !0,
                    townList: s,
                    districid: t
                }), a && e.setData({
                    townid: a
                });
            } else e.setData({
                havetown: !1,
                townstr: "",
                townid: 0
            });
            wx.hideLoading();
        });
    },
    getAddressInfo: function() {
        var t = this, a = this;
        i.getAddress({
            uaid: this.data.addressid
        }).then(function(i) {
            if (200 == i.status) {
                var e = i.data, s = {
                    name: e.name,
                    address: e.address,
                    mobile: e.mobile,
                    isdefault: e.isdefault
                };
                a.setData({
                    addressInfo: s,
                    districid: e.jdid,
                    townid: e.jdid4,
                    region: [ e.province, e.city, e.district ]
                }), 1 * i.data.jdid4 > 0 && t.getAddress4(i.data.jdid, i.data.jdid4);
            } else wx.showToast({
                title: i.message,
                icon: "none"
            });
        });
    },
    deleteaddress: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定删除",
            success: function(a) {
                a.confirm ? i.delAddress({
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
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    onLoad: function(i) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        });
        var e = [];
        t.regioninit().then(function(t) {
            e = t, a.provincedata = t;
        }).then(function() {
            t.citydata().then(function(t) {
                a.citydata = t;
            }).then(function() {
                t.districdata().then(function(t) {
                    a.districdata = t;
                }).then(function() {
                    var t = wx.getStorageSync("regionList");
                    if (!t) {
                        (t = [])[0] = e;
                        for (var s = [], n = 0; n < a.citydata.length && a.citydata[n].parent == e[0].value; n++) s.push(a.citydata[n]);
                        t[1] = s;
                        for (var d = [], n = 0; n < a.districdata.length; n++) a.districdata[n].parent == a.citydata[0].value && d.push(a.districdata[n]);
                        t[2] = d, wx.setStorageSync("regionList", t);
                    }
                    a.setData({
                        regioninit: t,
                        regionList: t
                    }), i.addressid && (a.setData({
                        addressid: i.addressid,
                        isedit: !0
                    }), a.getAddressInfo()), wx.hideLoading();
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