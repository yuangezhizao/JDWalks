function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return "object" === (void 0 === t ? "undefined" : e(t)) ? t : {
        content: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Component({
    properties: {
        content: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: "#e64340"
        },
        isShow: {
            type: Boolean,
            value: !1
        },
        duration: {
            type: Number,
            value: 3e3
        }
    },
    methods: {
        show: function() {
            var t = this, e = this.data.duration;
            this._timer && clearTimeout(this._timer), this.setData({
                isShow: !0
            }), e > 0 && e !== 1 / 0 && (this._timer = setTimeout(function() {
                t.hide();
            }, e));
        },
        hide: function() {
            this._timer = clearTimeout(this._timer), this.setData({
                isShow: !1
            });
        }
    }
}), module.exports = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = getCurrentPages(), i = o[o.length - 1], n = {
        selector: "#zan-toptips",
        duration: 3e3
    };
    e = Object.assign(n, t(e));
    var r = i.selectComponent(e.selector);
    delete e.selector, r.setData(Object.assign({}, e)), r && r.show();
};