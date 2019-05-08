Page({
    data: {
        steps: []
    },
    onLoad: function(t) {
        var n = this;
        wx.getStorage({
            key: "expressinfo",
            success: function(t) {
                t.data.forEach(function(t, n) {
                    t.time && (t.text = t.time), t.context && (t.desc = t.context), t.msgTime && (t.text = t.msgTime), 
                    t.content && (t.desc = t.content);
                }), n.setData({
                    steps: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});