var e = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Component({
    externalClasses: [ "shadow" ],
    properties: {
        bannerList: {
            type: Array,
            observer: function(e) {}
        },
        noradius: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        jump: function(a) {
            var r = a.currentTarget.dataset, t = r.type, s = r.url, i = r.value;
            switch (1 * t) {
              case 1:
                e.istabbar(s) ? wx.switchTab({
                    url: s
                }) : wx.navigateTo({
                    url: s
                });
                break;

              case 2:
                wx.navigateTo({
                    url: "/pages/webview/index?jumpurl=" + r.url
                });
                break;

              case 3:
                wx.navigateToMiniProgram({
                    appId: i,
                    path: s,
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        }
    }
});