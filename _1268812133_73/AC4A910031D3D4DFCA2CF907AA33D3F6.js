var n = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll" ], r = function(n) {
    return "__$" + n;
};

module.exports = {
    extractComponentId: function() {
        return ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).currentTarget || {}).dataset.componentId;
    },
    extend: Object.assign,
    extendCreator: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.life, t = void 0 === o ? n : o, a = e.exclude, i = void 0 === a ? [] : a, f = i.concat(n.map(r));
        if (!Array.isArray(t) || !Array.isArray(i)) throw new Error("Invalid Extend Config");
        var c = t.filter(function(r) {
            return n.indexOf(r) >= 0;
        });
        return function(n) {
            for (var e = arguments.length, o = Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++) o[t - 1] = arguments[t];
            return o.forEach(function(e) {
                e && Object.keys(e).forEach(function(o) {
                    var t = e[o];
                    if (!(f.indexOf(o) >= 0)) if (c.indexOf(o) >= 0 && "function" == typeof t) {
                        var a = r(o);
                        if (n[a] || (n[a] = [], n[o] && n[a].push(n[o]), n[o] = function() {
                            for (var r = this, e = arguments.length, o = Array(e), t = 0; t < e; t++) o[t] = arguments[t];
                            n[a].forEach(function(n) {
                                return n.apply(r, o);
                            });
                        }), e[a]) {
                            var i;
                            (i = n[a]).push.apply(i, e[a]);
                        } else n[a].push(t);
                    } else n[o] = t;
                });
            }), n;
        };
    }
};