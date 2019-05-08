Page({
    data: {},
    getmessage: function(n) {
        console.log(n);
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        var n = {
            openId: wx.getStorageSync("userInfo").openid
        };
        getApp().globalData.qd.startPage(n);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});