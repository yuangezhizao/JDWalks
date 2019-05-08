Component({
    properties: {
        inviter_list: {
            type: Array,
            observer: function(t) {
                for (;5 != t.length; ) {
                    var i = {
                        avatarurl: ""
                    };
                    t.push(i);
                }
                t.forEach(function(t) {
                    t.nickname ? t.state = "已发放" : t.state = "待发放";
                }), this.setData({
                    c_inviter_list: t
                });
            }
        }
    },
    lifetimes: {
        ready: function() {
            for (;5 != this.data.inviter_list.length; ) {
                var t = {
                    avatarurl: ""
                };
                this.data.inviter_list.push(t);
            }
            this.data.inviter_list.forEach(function(t) {
                t.nickname ? t.state = "已发放" : t.state = "待发放";
            }), this.setData({
                c_inviter_list: this.data.inviter_list
            });
        },
        detached: function() {}
    },
    data: {
        c_inviter_list: []
    },
    methods: {
        gomyinvitation: function() {
            console.log(1), wx.navigateTo({
                url: "../../pages/friends/friends",
                success: function(t) {},
                fail: function() {},
                complete: function() {}
            });
        }
    }
});