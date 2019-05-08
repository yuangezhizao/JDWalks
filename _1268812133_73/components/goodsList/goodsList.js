var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Component({
    externalClasses: [ "coinname", "goodslist", "shadow" ],
    properties: {
        goodsList: {
            type: Array,
            observer: function(e) {
                var s = this;
                e.forEach(function(e, a) {
                    if (e.imgurl = JSON.parse(e.imgurl), e.imgurl[0] = e.imgurl[0] + "?x-oss-process=image/format,jpg/quality,Q_20", 
                    e.tags && (e.tags = JSON.parse(e.tags)), 1 * e.type == 1 && e.goodsAuction[0]) var o = e.goodsAuction[0].endtime_init, i = e.goodsAuction[0].starttime, r = e.goodsAuction[0].endtime;
                    if (o && i) {
                        var g = t.transdate(i), d = t.transdate(o), n = t.transdate(r), c = s.data.systime;
                        e.gstate = c < g ? 0 : c >= g && c <= d ? 1 : c > d && c <= n ? 2 : 3;
                    } else e.gstate = 0;
                }), this.setData({
                    cgoodsList: e
                });
            }
        },
        categorycol: {
            type: Number
        },
        systime: {
            type: Number
        }
    },
    data: {
        cgoodsList: []
    },
    methods: {
        godetail: function(t) {
            var e = t.currentTarget.dataset, s = e.id, a = e.type;
            switch (1 * a) {
              case 1:
                wx.navigateTo({
                    url: "/pages/goods/index?goodsid=" + s + "&type=" + a
                });
                break;

              case 2:
                wx.navigateTo({
                    url: "/pages/goods/exchange?goodsid=" + s + "&type=" + a
                });
                break;

              case 3:
                wx.navigateTo({
                    url: "/pages/goods/seckill?goodsid=" + s + "&type=" + a
                });
            }
        }
    }
});