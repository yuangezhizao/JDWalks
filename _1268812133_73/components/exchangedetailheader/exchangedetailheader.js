var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Component({
    externalClasses: [ "page-container-margin", "shadow" ],
    properties: {
        detail: {
            type: Object,
            observer: function(t) {},
            value: {
                sellingpoints: 0,
                bottomprice: 0,
                auction: {
                    auction_price: 0,
                    auction_uname: ""
                }
            }
        }
    },
    attached: function() {},
    data: {},
    methods: {
        previewimage: function() {
            wx.previewImage({
                urls: this.data.detail.imgurl
            });
        },
        like: function() {
            var i = this;
            wx.showLoading({
                title: "处理中"
            });
            var e = this.data.detail;
            e.islike = 1 == e.islike ? 2 : 1, t.likeGoods({
                gid: this.data.detail.id,
                state: e.islike
            }).then(function(t) {
                200 == t.status && i.setData({
                    detail: e
                }), setTimeout(function() {
                    wx.hideLoading();
                }.bind(i), 500);
            });
        },
        customMethod: function() {},
        showheader: function(t) {
            console.log(item), console.log(index);
        }
    }
});