var a = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        prizeList: [],
        page: 1,
        havenext: !0
    },
    onLoad: function(a) {
        this.setData({
            acid: a.acid
        }), this.getMyWinlist();
    },
    onReachBottom: function() {
        this.getMyWinlist();
    },
    getMyWinlist: function() {
        var t = this;
        t.data.havenext && (wx.showNavigationBarLoading(), a.myWinlist({
            page: t.data.page,
            acid: t.data.acid
        }).then(function(e) {
            200 == e.status && e.data && e.data.list && e.data.list.length > 0 && (e.data.pages > t.data.page ? t.setData({
                page: t.data.page + 1
            }) : t.setData({
                havenext: !1
            }), e.data.list.forEach(function(t, e) {
                var i = new Date(1e3 * t.create_time);
                t.create_time = a.formatTime(i), t.exinfo && (t.exinfo = JSON.parse(t.exinfo));
            }), t.data.prizeList ? t.setData({
                prizeList: t.data.prizeList.concat(e.data.list)
            }) : t.setData({
                pointslist: e.data.list
            })), setTimeout(function() {
                wx.hideNavigationBarLoading();
            }, 1e3);
        }));
    },
    godetail: function(a) {
        var t = a.currentTarget.dataset, e = t.add, i = t.type, n = t.orderno;
        switch (1 * i) {
          case 1:
            e ? wx.navigateTo({
                url: "../myluckdraw/detail?orderno=" + n
            }) : wx.navigateTo({
                url: "../address/index?orderno=" + n + "&ordertype=998"
            });
            break;

          case 2:
            break;

          case 3:
            wx.navigateTo({
                url: "../myluckdraw/detail?orderno=" + n
            });
        }
    },
    Clipboard: function(a) {
        var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.item;
        wx.setClipboardData({
            data: e,
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {
                        wx.showToast({
                            icon: "none",
                            title: "已复制" + t + "到剪切板"
                        });
                    }
                });
            }
        });
    }
});