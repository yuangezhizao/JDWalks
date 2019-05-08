var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

new getApp();

Page({
    data: {
        friendslist: null,
        page: 1,
        havenext: !0
    },
    onLoad: function(t) {},
    onReady: function() {
        this.getFriendsList();
    },
    getFriendsList: function() {
        var a = this;
        a.data.havenext && (wx.showNavigationBarLoading(), t.getMyFriends({
            limit: 30,
            page: a.data.page
        }).then(function(t) {
            if (200 == t.status) {
                t.data.pages > a.data.page ? a.setData({
                    page: a.data.page + 1
                }) : a.setData({
                    havenext: !1
                });
                var n = t.data.list;
                n.forEach(function(t, a) {
                    t.fromuavatar = t.avatarurl, t.description = t.nickname;
                }), a.data.friendslist ? a.setData({
                    friendslist: a.data.friendslist.concat(n)
                }) : a.setData({
                    friendslist: n
                });
            }
            setTimeout(function() {
                wx.hideNavigationBarLoading();
            }, 1e3);
        }));
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getFriendsList();
    }
});