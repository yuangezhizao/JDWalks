var n = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), t = require("../../9A15EBF331D3D4DFFC7383F498A3D3F6.js");

Page({
    data: {
        src: ""
    },
    onLoad: function(n) {
        this.setData({
            src: decodeURIComponent(n.jumpurl)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var o = n.getCurrentPageUrlWithArgs(), i = this.data.src, a = t.viewhost + "luckdraw", r = "";
        return ~i.indexOf(a) && (r = "我在这里天天免费抽iPhone X ，Beats等大礼，你也快来"), {
            path: o,
            title: r
        };
    }
});