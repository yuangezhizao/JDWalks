var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), e = new getApp();

Page({
    data: {
        goodsid: "",
        showpopup: !1,
        showinventorypopup: !1,
        stock: "",
        selectinventory: "",
        detail: {
            sellingpoints: 0,
            valuedpoint: 0
        },
        amount: 1,
        stepper: {
            stepper: 1,
            min: 1,
            max: 1
        },
        coinname: e.globalData.sysinfo.coinname,
        inviteopen: !1,
        bannerList: []
    },
    onLoad: function(e) {
        if (t.checklogin()) {
            var i = this;
            this.setData({
                goodsid: e.goodsid
            }), i.getGoodsDetail(), i.getBannerList();
        }
    },
    getBannerList: function() {
        var e = this;
        t.getBannerList({
            position: 3,
            categoryid: this.data.goodsid
        }).then(function(t) {
            200 == t.status && t.data && e.setData({
                bannerList: t.data
            });
        });
    },
    toggleinvite: function() {
        this.setData({
            inviteopen: !this.data.inviteopen
        });
    },
    previewimage: function() {
        wx.previewImage({
            urls: this.data.detail.imgurl
        });
    },
    handleInventory: function(t) {
        var e = t.currentTarget.dataset, i = this.data.stepper;
        1 * e.limit < 1 * e.stock ? i.max = e.limit : i.max = e.stock, this.setData({
            selectinventory: e.id,
            stock: e.stock,
            stepper: i,
            limit: e.limit
        });
    },
    getGoodsDetail: function() {
        var e = this, i = this;
        wx.showLoading({
            title: "加载中"
        }), t.getGoodsDetail({
            gid: i.data.goodsid
        }).then(function(s) {
            if (200 == s.status) {
                var a = s.data;
                a.stock = -1, a.disabled = !0, a.imgurl = JSON.parse(a.imgurl), a.intro = a.intro.replace(/\<img/gi, '<img  style="display:block;max-width:100%;height:auto;" ');
                var n = "";
                switch (a.gidhelps || (a.gidhelps = []), 1 * a.state) {
                  case 0:
                    n = "兑换开始时间:" + a.inventory[0].starttime;
                    break;

                  case 1:
                    var o = 0;
                    if (a.inventory.length && a.inventory.forEach(function(t, e) {
                        o += 1 * t.stock;
                    }), a.stock = o, o > 0) if (1 * a.myorders >= a.inventory[0].limit) a.disabled = !1, 
                    n = "已达到购买上限"; else if (1 * a.invitednumber != 0 && 1 * a.gidhelps.length < 1 * a.invitednumber) n = "还差" + (1 * a.invitednumber - 1 * a.gidhelps.length) + "人,立即邀请", 
                    a.disabled = !1, a.needinvite = !0; else switch (1 * a.level) {
                      case 1:
                        1 * a.dpoint > 0 ? (a.disabled = !1, 1 * a.userrole.role == 1 ? (n = 1 * a.sellingpoints - 1 * a.dpoint + "币 立即兑换", 
                        a.usestuprice = !0) : (n = 1 * a.sellingpoints + "CB兑换", a.showjdauth = !0)) : (a.disabled = !1, 
                        n = "立即兑换");
                        break;

                      case 2:
                        1 * a.userrole.role == 1 ? (n = "立即兑换", 1 * a.dpoint > 0 ? a.usestuprice = !0 : a.usestuprice = !1, 
                        a.disabled = !1) : (n = "认证学生享学生价", a.justshowjdauth = !0, a.disabled = !1);
                        break;

                      case 3:
                        1 * a.userrole.isnew == 1 ? 1 * a.dpoint > 0 ? (a.disabled = !1, 1 * a.userrole.role == 1 ? (n = 1 * a.sellingpoints - 1 * a.dpoint + "币 立即兑换", 
                        a.usestuprice = !0) : (n = 1 * a.sellingpoints + "CB兑换", a.showjdauth = !0)) : (a.disabled = !1, 
                        n = "立即兑换") : (a.disabled = !0, n = "限7天内新用户兑换");
                        break;

                      case 4:
                        1 * a.userrole.isnew == 1 ? 1 * a.userrole.role == 1 ? (n = "立即兑换", 1 * a.dpoint > 0 ? a.usestuprice = !0 : a.usestuprice = !1) : (n = "认证学生享学生价", 
                        a.justshowjdauth = !0) : (a.disabled = !0, n = "限7天内新用户兑换");
                    } else n = "兑换结束";
                    break;

                  case 2:
                    n = "兑换结束";
                    break;

                  case 3:
                  case 4:
                    n = "兑换结束";
                }
                var d = 0;
                a.inventory.length > 0 && (d = a.inventory[0].stock), i.setData({
                    stock: d,
                    detail: a,
                    type: a.type,
                    tips: n,
                    mypoints: a.valuedpoint
                }), 1 == s.data.type && setInterval(function() {
                    var s = i.data.detail, a = s.chatime--;
                    s.end_time_desc = t.timeStamp(a), e.setData({
                        detail: s
                    });
                }, 1e3);
            } else wx.showModal({
                showCancel: !1,
                title: "提示",
                content: s.message,
                success: function(t) {
                    t.confirm ? (wx.navigateBack(), console.log("用户点击确定")) : t.cancel && console.log("用户点击取消");
                }
            });
            setTimeout(function() {
                wx.hideLoading();
            }, 300);
        });
    },
    onReady: function() {
        var e = this;
        t.getSystem({
            key: "goodsexchange"
        }).then(function(t) {
            e.setData({
                ruleImg: t.data.value
            });
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.stopPullDownRefresh(), t.getGoodsDetail();
    },
    onReachBottom: function() {},
    like: function() {
        var e = this;
        wx.showLoading({
            title: "处理中"
        });
        var i = this.data.detail;
        i.islike = 1 == i.islike ? 2 : 1, t.likeGoods({
            gid: this.data.goodsid,
            state: i.islike
        }).then(function(t) {
            200 == t.status && e.setData({
                detail: i
            }), setTimeout(function() {
                wx.hideLoading();
            }.bind(e), 500);
        });
    },
    togglepopup: function() {
        this.setData({
            showpopup: !this.data.showpopup
        });
    },
    gojdauth: function() {
        t.jdAuth(this);
    },
    buy: function() {
        if (this.data.selectinventory) {
            var t = this.data.detail, e = this.data.mypoints, i = this;
            if (t.usestuprice) s = (1 * t.sellingpoints - 1 * t.dpoint) * this.data.stepper.stepper > e; else var s = t.sellingpoints * this.data.stepper.stepper > e;
            if (s) return this.setData({
                showinventorypopup: !1
            }), void setTimeout(function() {
                i.setData({
                    showpopup: !0
                });
            }, 500);
            if (this.data.detail.usestuprice) a = 1; else var a = 0;
            wx.navigateTo({
                url: "../orderconfirm/index?gid=" + this.data.detail.id + "&gpid=" + this.data.selectinventory + "&amount=" + this.data.stepper.stepper + "&type=" + a
            });
        } else wx.showToast({
            title: "请选择规格",
            icon: "none"
        });
    },
    handleZanStepperChange: function(t) {
        var e = t.detail;
        this.setData({
            "stepper.stepper": e
        });
    },
    handleInventoryPopup: function() {
        this.setData({
            selectinventory: this.data.detail.inventory[0].id
        }), 1 != this.data.detail.inventory.length || 1 != this.data.detail.inventory[0].limit ? this.setData({
            showinventorypopup: !this.data.showinventorypopup
        }) : this.buy();
    },
    onShareAppMessage: function(i) {
        var s = "商品不花钱，步数免费换！还等什么，一起运动吧！";
        if ("button" === i.from) {
            var a = "/pages/index/index?fromuserid=" + e.globalData.userInfo.urid + "&gid=" + this.data.goodsid;
            return "invite" == i.target.dataset.type && (s = "兄dei，帮我点一下！这里有免费兑换，我只告诉你！快来~"), 
            {
                title: s,
                imageUrl: this.data.detail.imgurl[0],
                path: a,
                success: function(t) {
                    console.log(t);
                }
            };
        }
        return {
            title: s,
            path: a = t.getCurrentPageUrlWithArgs() + "&fromuserid=" + e.globalData.userInfo.urid + "&gid=" + this.data.goodsid,
            imageUrl: this.data.detail.imgurl[0]
        };
    }
});