var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = (require("../../templates/wxParse/wxParse.js"), 
new getApp());

Page({
    data: {
        mypoints: 0,
        goodsid: "",
        type: "",
        showpopup: !1,
        showinventorypopup: !1,
        showstepper: !1,
        stock: "",
        selectinventory: "",
        detail: {
            bottomprice: 0,
            auction: {
                auction_price: 0,
                auction_uname: ""
            }
        },
        coinname: a.globalData.sysinfo.coinname,
        disabled: !0,
        resettime: [],
        tabs: [ "商品详情", "活动规则" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        helpcount: "",
        bannerList: []
    },
    previewimage: function() {
        wx.previewImage({
            urls: this.data.detail.imgurl
        });
    },
    onLoad: function(e) {
        if (t.checklogin() && null != a.globalData.userInfo) {
            var i = this;
            this.setData({
                goodsid: e.goodsid
            }), wx.getSystemInfo({
                success: function(t) {
                    i.setData({
                        sliderLeft: (t.windowWidth / i.data.tabs.length - 100) / 2,
                        sliderOffset: t.windowWidth / i.data.tabs.length * i.data.activeIndex
                    });
                }
            }), this.getBannerList();
        }
    },
    getBannerList: function() {
        var a = this;
        t.getBannerList({
            position: 3,
            categoryid: this.data.goodsid
        }).then(function(t) {
            200 == t.status && t.data && a.setData({
                bannerList: t.data
            });
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    clearInt: function() {
        this.flag && clearInterval(this.flag), this.auctioning && clearInterval(this.auctioning);
    },
    getGoodsDetail: function(e) {
        var i = this, o = this;
        1 != e && wx.showLoading({
            title: "加载中"
        }), this.clearInt(), t.getGoodsDetail({
            gid: o.data.goodsid
        }).then(function(e) {
            if (200 == e.status) {
                var n = e.data;
                n.disabled = !0, n.imgurl = JSON.parse(n.imgurl), n.intro = n.intro.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto" ');
                var s, d, l, c = "", u = t.transdate(e.data.systemtime), r = t.transdate(e.data.auction.starttime), h = t.transdate(e.data.auction.endtime), p = t.transdate(e.data.auction.endtime_init), g = 0, c = "", f = "";
                n.auction.helps.length > 0 && (g = 1 * n.auction.myhelpvalue, c = n.auction.myhelpnum + "名好友已助力" + g + "成长币"), 
                i.setData({
                    helptips: c,
                    helpcount: g,
                    mypoints: n.valuedpoint
                }), u < r ? (s = 0, c = "准备中", f = "准备中", d = "距离拍卖开始", l = r - u) : u >= r && u <= p ? (s = 1, 
                c = n.maxpoint ? "最高出价:" + n.maxpoint + "CB" : "出价中", f = "出价", d = "距离竞价开始", l = p - u, 
                i.setData({
                    disabled: !1
                }), e.data.auction.myorder.selfpoint ? n.mybuypoint = e.data.auction.myorder.selfpoint : n.mybuypoint = 1 * e.data.bottomprice) : u > p && u <= h ? (s = 2, 
                c = "竞价中", f = "竞价(剩余" + e.data.auction.bidnum + ")", d = "领先者:" + e.data.auction.auction_uname, 
                l = h - u, i.setData({
                    disabled: !1
                }), 0 == n.preorder && (i.setData({
                    disabled: !0
                }), f = "未出价,无竞价资格"), e.data.auction.auction_urid == a.globalData.userInfo ? n.mybuypoint = 1 * e.data.auction.myorder.selfpoint : n.mybuypoint = 1 * e.data.auction.auction_price - 1 * g + 1 * e.data.price_increase, 
                i.auctioning = setInterval(function() {
                    i.getGoodsDetail(1);
                }, 1e4)) : (s = 3, c = "拍卖结束", f = "拍卖结束", d = "中标者:" + e.data.auction.auction_uname, 
                o.setData({
                    showstepper: !1,
                    disabled: !0
                })), i.flag = setInterval(function() {
                    var a = o.data.detail.chatime--, e = t.timeStamp(a, 2);
                    i.setData({
                        resettime: e
                    }), a <= 0 && o.getGoodsDetail(1);
                }, 1e3), n.state = s, n.desctips = d, n.chatime = l, n.btntips = f, o.setData({
                    detail: n,
                    type: n.type,
                    tips: c
                });
            } else wx.showModal({
                showCancel: !1,
                title: "提示",
                content: e.message,
                success: function(t) {
                    t.confirm ? wx.navigateBack() : t.cancel && console.log("用户点击取消");
                }
            });
            setTimeout(function() {
                wx.hideLoading();
            }, 300);
        });
    },
    onReady: function() {
        var a = this;
        t.getSystem({
            key: "goods1"
        }).then(function(t) {
            a.setData({
                ruleImg: t.data.value
            });
        });
    },
    onShow: function() {
        t.checklogin() && this.getGoodsDetail();
    },
    onHide: function() {
        this.clearInt();
    },
    onUnload: function() {
        this.clearInt();
    },
    onPullDownRefresh: function() {
        var t = this;
        wx.stopPullDownRefresh(), t.getGoodsDetail();
    },
    onReachBottom: function() {},
    minus: function() {
        var t = this.data.detail, a = 1 * t.mybuypoint, e = 1 * t.price_increase;
        t.mybuypoint - e >= 1 * t.bottomprice && (t.mybuypoint = a - e, this.setData({
            detail: t
        }));
    },
    plus: function() {
        var t = 1 * this.data.detail.mybuypoint, a = 1 * this.data.detail.price_increase, e = this.data.detail;
        e.mybuypoint = t + a, this.setData({
            detail: e
        });
    },
    like: function() {
        var a = this;
        console.log("like"), wx.showLoading({
            title: "处理中"
        });
        var e = this.data.detail;
        e.islike = 1 == e.islike ? 2 : 1, t.likeGoods({
            gid: this.data.goodsid,
            state: e.islike
        }).then(function(t) {
            200 == t.status && a.setData({
                detail: e
            }), setTimeout(function() {
                wx.hideLoading();
            }.bind(a), 500);
        });
    },
    togglepopup: function() {
        this.setData({
            showpopup: !this.data.showpopup
        });
    },
    togglestepperpopup: function() {
        this.setData({
            showstepper: !this.data.showstepper
        });
    },
    prebuy: function() {
        this.setData({
            showstepper: !this.data.showstepper
        });
    },
    buy: function() {
        var a = this, e = this.data.detail, i = 1 * this.data.mypoints + 1 * this.data.helpcount;
        if (e.state >= 2 && 0 == e.preorder) wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "无竞价资格",
            success: function(t) {
                t.confirm || t.cancel && console.log("用户点击取消");
            }
        }); else {
            if (1 == e.state) {
                if (i < 1 * this.data.detail.bottomprice) return void this.setData({
                    showstepper: !1,
                    showpopup: !0
                });
            } else if (2 == e.state && i < 1 * this.data.detail.auction.auction_price) return void this.setData({
                showstepper: !1,
                showpopup: !0
            });
            if (0 == e.preorder) {
                return this.data.detail.uaid && this.data.detail.uaid, void wx.navigateTo({
                    url: "../auctionconfirm/index?goodsid=" + this.data.detail.id + "&mypoint=" + this.data.detail.mybuypoint + "&helpcount=" + this.data.helpcount
                });
            }
            wx.showModal({
                title: "提示",
                content: "是否继续?",
                success: function(i) {
                    i.confirm ? (a.setData({
                        showstepper: !1
                    }), t.payAuction({
                        auid: e.auction.id,
                        value: e.mybuypoint,
                        hvalue: a.data.helpcount
                    }).then(function(t) {
                        200 == t.status ? wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: "操作成功",
                            success: function(t) {
                                t.confirm ? a.getGoodsDetail() : t.cancel && console.log("用户点击取消");
                            }
                        }) : wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: t.message,
                            success: function(t) {
                                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                            }
                        });
                    })) : i.cancel && console.log("用户点击取消");
                }
            });
        }
    },
    nopreorder: function() {
        wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "须先出价一次才可以邀请好友助力哦!",
            success: function(t) {
                t.confirm || t.cancel && console.log("用户点击取消");
            }
        });
    },
    onShareAppMessage: function(e) {
        var i = a.globalData.userInfo, o = "步数当钱花，0元换好礼。快来免费拿";
        return "button" === e.from ? (o = "来不及解释了，我正在免费竞拍它，快来帮我助力！", {
            title: o,
            path: "/pages/sponsor/index?fromuserid=" + i.urid + "&gid=" + this.data.goodsid,
            imageUrl: this.data.detail.imgurl[0]
        }) : {
            path: t.getCurrentPageUrlWithArgs() + "&fromuserid=" + a.globalData.userInfo.urid,
            title: o,
            imageUrl: this.data.detail.imgurl[0]
        };
    }
});