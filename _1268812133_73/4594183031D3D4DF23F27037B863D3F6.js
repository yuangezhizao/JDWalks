function t(t) {
    var e = t;
    if (!e) {
        var a = getCurrentPages();
        e = a[a.length - 1];
    }
    return e;
}

function e(t) {
    return (t.data.zanui || {}).__zanToastPageConfig || {};
}

function a(i, s) {
    var l = i || {};
    "string" == typeof i && (l = {
        message: i
    });
    var r = t(s), u = e(r), g = Object.assign({}, n, u, l), c = r.selectComponent(g.selector);
    if (c) {
        o.timeoutId && a.clear(), c.show(Object.assign({}, g, {
            show: !0
        }));
        var f = setTimeout(function() {
            c.clear();
        }, g.timeout || 3e3);
        o = {
            timeoutId: f,
            toastCtx: c
        };
    } else console.error("无法找到对应的toast组件，请于页面中注册并在 wxml 中声明 toast 自定义组件");
}

var o = {
    timeoutId: 0,
    toastCtx: null
}, n = {};

a.setDefaultOptions = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "page", o = {
        selector: e.selector || "",
        type: e.type || "",
        icon: e.icon || "",
        image: e.image || "",
        timeout: e.timeout || 3e3
    };
    if ("global" === a) n = Object.assign({}, o); else if ("page" === a) {
        var i;
        t().setData((i = {}, i["zanui.__zanToastPageConfig"] = o, i));
    }
}, a.resetDefaultOptions = function() {
    if ("global" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "page")) n = {}; else {
        var e;
        t().setData((e = {}, e["zanui.__zanToastPageConfig"] = {}, e));
    }
}, a.clear = function() {
    clearTimeout(o.timeoutId);
    try {
        o.toastCtx && o.toastCtx.clear();
    } catch (t) {}
    o = {
        timeoutId: 0,
        toastCtx: null
    };
}, a.loading = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a(Object.assign({}, t, {
        type: "loading"
    }));
}, module.exports = a;