var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Page({
    data: {
        orderid: "",
        type: "",
        orderinfo: "",
        trackingstate: -1,
        trackingtips: ""
    },
    Clipboard: function(t) {
        var a = t.currentTarget.dataset.orderno;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            icon: "none",
                            title: "已复制订单号到剪切板"
                        });
                    }
                });
            }
        });
    },
    godetail: function(t) {
        var a = this.data.orderinfo.gid;
        if (1 == this.data.type) e = 1; else var e = this.data.orderinfo.detail[0].gtype;
        switch (1 * e) {
          case 1:
            wx.navigateTo({
                url: "../goods/index?goodsid=" + a + "&type=" + this.data.type
            });
            break;

          case 2:
            wx.navigateTo({
                url: "../goods/exchange?goodsid=" + a
            });
            break;

          case 3:
            wx.navigateTo({
                url: "../goods/seckill?goodsid=" + a
            });
        }
    },
    getOrderDetail: function() {
        var a = this;
        t.orderDetail({
            orderid: this.data.orderid,
            type: this.data.type
        }).then(function(e) {
            if (200 == e.status) {
                var i = "因活动过于火爆，我们正在努力处理订单中，请您耐心等待";
                1 == e.data.isblack && 2 == a.data.type ? 0 == e.data.detail[0].gproperty && (i = "您的账号经系统判定涉嫌违规操作，订单已被拦截。") : 1 == e.data.isblack && (i = "您的账号经系统判定涉嫌违规操作，订单已被拦截。");
                var o = -1, d = 1 * e.data.paytype;
                if (4 == d || "" != e.data.trackingno && "" != e.data.express) {
                    var n = 1 == a.data.type ? 2 : 1;
                    t.expressinfo({
                        orderno: e.data.orderno,
                        ordertype: n
                    }).then(function(t) {
                        200 == t.status && (4 == d ? (i = t.data.list[t.data.list.length - 1].content, o = 1) : (i = t.data.list[0].context, 
                        o = t.data.state), wx.setStorage({
                            key: "expressinfo",
                            data: t.data.list
                        })), a.setData({
                            trackingtips: i,
                            trackingstate: o
                        });
                    });
                } else a.setData({
                    trackingtips: i,
                    trackingstate: o
                });
                2 == a.data.type && (e.data.gname = e.data.detail[0].gname, e.data.gimgurl = e.data.detail[0].gpimgurl, 
                e.data.gid = e.data.detail[0].gid), a.setData({
                    orderinfo: e.data
                });
            } else t.ALERT(e.message);
            wx.hideLoading();
        });
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        }), this.setData(t), this.getOrderDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});