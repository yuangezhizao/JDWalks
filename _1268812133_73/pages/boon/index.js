var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), s = new getApp();

Page({
    data: {
        GoodsList: [],
        taskList: []
    },
    getGoodsShot: function() {
        var s = this;
        t.indexGoods({
            position: 2
        }).then(function(t) {
            if (200 == t.status) {
                var o = t.data;
                o || (o = []), s.setData({
                    GoodsList: o
                });
            }
        });
    },
    getTaskList: function() {
        var s = this;
        t.taskList().then(function(t) {
            200 == t.status && t.data && t.data.list && (t.data.list[0].systime = t.sys_time, 
            s.setData({
                taskList: t.data.list
            }));
        });
    },
    onLoad: function(t) {
        this.getGoodsShot(), this.getTaskList();
    },
    onReady: function() {},
    onShow: function() {
        var t = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: "步数当钱花，0元换好礼。快来免费拿！",
            imageUrl: "../../images/share.jpg",
            path: "/pages/index/index?fromuserid=" + s.globalData.userInfo.urid,
            success: function(t) {
                console.log(t);
            }
        };
    }
});