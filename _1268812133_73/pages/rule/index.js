var n = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        rulename: "rule",
        ruleImg: ""
    },
    onLoad: function(e) {
        var t = this;
        e.rulename && this.setData({
            rulename: e.rulename
        }), n.getSystem({
            key: this.data.rulename
        }).then(function(n) {
            t.setData({
                ruleImg: n.data.value
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});