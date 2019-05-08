Component({
    options: {
        addGlobalClass: !0
    },
    externalClasses: [ "custom-class" ],
    properties: {
        text: {
            type: String,
            value: "",
            observer: function() {
                this.setData({}, this._init);
            }
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 0
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        rightIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#f60"
        },
        backgroundColor: {
            type: String,
            value: "#fff7cc"
        }
    },
    data: {
        show: !0,
        width: void 0,
        wrapWidth: void 0,
        elapse: void 0,
        animation: null,
        resetAnimation: null,
        timer: null
    },
    detached: function() {
        var t = this.data.timer;
        t && clearTimeout(t);
    },
    methods: {
        _init: function() {
            var t = this;
            wx.createSelectorQuery().in(this).select(".van-notice-bar__content").boundingClientRect(function(e) {
                e && e.width && (t.setData({
                    width: e.width
                }), wx.createSelectorQuery().in(t).select(".van-notice-bar__content-wrap").boundingClientRect(function(e) {
                    if (e && e.width) {
                        var i = e.width, a = t.data, n = a.width, o = a.speed, r = a.scrollable, l = a.delay;
                        if (r && i < n) {
                            var s = n / o * 1e3, c = wx.createAnimation({
                                duration: s,
                                timeingFunction: "linear",
                                delay: l
                            }), u = wx.createAnimation({
                                duration: 0,
                                timeingFunction: "linear"
                            });
                            t.setData({
                                elapse: s,
                                wrapWidth: i,
                                animation: c,
                                resetAnimation: u
                            }, function() {
                                t._scroll();
                            });
                        }
                    }
                }).exec());
            }).exec();
        },
        _scroll: function() {
            var t = this, e = this.data, i = e.animation, a = e.resetAnimation, n = e.wrapWidth, o = e.elapse, r = e.speed;
            a.translateX(n).step();
            var l = i.translateX(-o * r / 1e3).step();
            this.setData({
                animationData: a.export()
            }), setTimeout(function() {
                t.setData({
                    animationData: l.export()
                });
            }, 100);
            var s = setTimeout(function() {
                t._scroll();
            }, o);
            this.setData({
                timer: s
            });
        },
        onHandleButtonClick: function(t) {
            var e = this.data.timer;
            e && clearTimeout(e), this.setData({
                show: !1,
                timer: null
            }), this.triggerEvent("closeclick", t);
        },
        onClick: function(t) {
            this.triggerEvent("click", t);
        }
    }
});