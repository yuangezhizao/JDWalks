var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), e = new getApp();

Page({
    data: {
        goodsid: "",
        showpopup: !1,
        showinventorypopup: !1,
        stock: "",
        selectinventory: "",
        detail: {},
        amount: 1,
        stepper: {
            stepper: 1,
            min: 1,
            max: 1
        },
        coinname: e.globalData.sysinfo.coinname
    },
    onLoad: function(t) {
        if (null != e.globalData.userInfo) {
            var i = this;
            this.setData({
                goodsid: t.goodsid
            }), i.getGoodsDetail();
        }
    },
    previewimage: function() {
        wx.previewImage({
            urls: this.data.detail.imgurl
        });
    },
    handleInventory: function(t) {
        var e = t.currentTarget.dataset, i = this.data.stepper;
        i.max = e.stock, this.setData({
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
        }).then(function(a) {
            if (200 == a.status) {
                var o = a.data;
                o.disabled = !0, o.imgurl = JSON.parse(o.imgurl), o.intro = o.intro.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto" ');
                var s = "";
                switch (1 * o.state) {
                  case 0:
                    s = "未开始";
                    break;

                  case 1:
                    o.disabled = !1, s = "立即抢购";
                    break;

                  case 2:
                  case 3:
                    s = "抢购结束";
                    break;

                  case 4:
                    s = "未达标";
                }
                i.setData({
                    detail: o,
                    type: o.type,
                    tips: s,
                    mypoints: o.valuedpoint
                }), 1 == a.data.type && setInterval(function() {
                    var a = i.data.detail, o = a.chatime--;
                    a.end_time_desc = t.timeStamp(o), e.setData({
                        detail: a
                    });
                }, 1e3);
            } else wx.showModal({
                showCancel: !1,
                title: "提示",
                content: a.message,
                success: function(t) {
                    t.confirm ? (wx.navigateBack(), console.log("用户点击确定")) : t.cancel && console.log("用户点击取消");
                }
            });
            setTimeout(function() {
                wx.hideLoading();
            }, 300);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getGoodsDetail();
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
    buy: function() {
        if (this.data.selectinventory) {
            var t = this.data.detail, e = this.data.mypoints, i = this;
            if (t.sellingpoints * this.data.stepper.stepper > e) return this.setData({
                showinventorypopup: !1
            }), void setTimeout(function() {
                i.setData({
                    showpopup: !0
                });
            }, 500);
            wx.navigateTo({
                url: "../orderconfirm/index?gid=" + this.data.detail.id + "&gpid=" + this.data.selectinventory + "&amount=" + this.data.stepper.stepper
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
        if (1 == this.data.detail.inventory.length && 1 == this.data.detail.inventory[0].limit) return this.setData({
            selectinventory: this.data.detail.inventory[0].id
        }), void this.buy();
        this.setData({
            showinventorypopup: !this.data.showinventorypopup
        });
    },
    onShareAppMessage: function(t) {}
});