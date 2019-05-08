var a = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        orderid: "",
        type: "",
        orderinfo: "",
        trackingstate: "-1",
        trackingtips: ""
    },
    Clipboard: function(a) {
        a.currentTarget.dataset.index;
        var t = a.currentTarget.dataset.item;
        wx.setClipboardData({
            data: t,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {}
                });
            }
        });
    },
    godetail: function(a) {
        var t = this.data.orderinfo.gid;
        if (1 == this.data.type) e = 1; else var e = this.data.orderinfo.detail[0].gtype;
        switch (1 * e) {
          case 1:
            wx.navigateTo({
                url: "../goods/index?goodsid=" + t + "&type=" + this.data.type
            });
            break;

          case 2:
            wx.navigateTo({
                url: "../goods/exchange?goodsid=" + t
            });
        }
    },
    getOrderDetail: function() {
        var t = this;
        a.winDetail({
            orderno: this.data.orderno
        }).then(function(e) {
            if (200 == e.status) {
                var i = new Date(1e3 * e.data.create_time);
                e.data.description = e.data.description.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto" '), 
                e.data.create_time = a.formatTime(i);
                var n = "因活动过于火爆，我们正在努力处理订单中，请您耐心等待", o = -1;
                e.data.exinfo && (e.data.exinfo = JSON.parse(e.data.exinfo)), "" != e.data.trackingno && "" != e.data.express ? a.expressinfo({
                    orderno: e.data.orderno,
                    ordertype: 3
                }).then(function(a) {
                    if (200 == a.status) {
                        switch (1 * a.data.state) {
                          case 0:
                            n = "在途中";
                            break;

                          case 1:
                            n = "已揽收";
                            break;

                          case 2:
                            n = "疑难";
                            break;

                          case 3:
                            n = "已签收";
                            break;

                          case 4:
                            n = "退签";
                            break;

                          case 5:
                            n = "同城派送中";
                            break;

                          case 6:
                            n = "退回";
                            break;

                          case 7:
                            n = "转单";
                        }
                        o = a.data.state, wx.setStorage({
                            key: "expressinfo",
                            data: a.data.list
                        });
                    }
                    t.setData({
                        trackingtips: n,
                        trackingstate: o
                    });
                }) : t.setData({
                    trackingtips: n,
                    trackingstate: o
                }), t.setData({
                    orderinfo: e.data
                });
            } else a.ALERT(e.message);
            wx.hideLoading();
        });
    },
    onLoad: function(a) {
        wx.showLoading({
            title: "加载中"
        }), this.setData(a), this.getOrderDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});