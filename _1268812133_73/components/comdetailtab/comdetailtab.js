Component({
    externalClasses: [ "shadow" ],
    properties: {
        detail: {
            type: String,
            observer: function(t) {}
        },
        rule: {
            type: String,
            observer: function(t) {}
        }
    },
    attached: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    sliderLeft: (e.windowWidth / 750 * 690 / t.data.tabs.length - 100) / 2,
                    sliderOffset: e.windowWidth / 750 * 690 / t.data.tabs.length * t.data.activeIndex
                });
            }
        });
    },
    data: {
        tabs: [ "商品详情" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        BannerList: []
    },
    methods: {
        tabClick: function(t) {
            this.setData({
                sliderOffset: t.currentTarget.offsetLeft,
                activeIndex: t.currentTarget.id
            });
        },
        customMethod: function() {},
        showheader: function(t) {
            console.log(item), console.log(index);
        }
    }
});