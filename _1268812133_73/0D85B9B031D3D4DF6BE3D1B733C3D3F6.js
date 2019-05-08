function e(e) {
    var t = {
        param: {}
    };
    return t.ex1 = w.shareId, Object.keys(e).forEach(function(n) {
        return "function" != typeof e[n] && ("title" === n ? t.ex2 = e[n] : "path" === n ? t.ex3 = e.path : t.param[n] = e[n], 
        !1);
    }), t;
}

function t() {
    w.seq += 1;
}

function n() {
    w.shareId += 1;
}

function o() {
    var e = w.url;
    w.url = "", w.rp = "";
    var t = getCurrentPages();
    1 > t.length || (w.url = t[t.length - 1].route || "", w.rp = 2 > t.length ? "" : t[t.length - 2].route), 
    "" === w.rp && "" !== e && (w.rp = e), b.getTitle(t[t.length - 1].route);
}

function r() {
    m.sl.forEach(function(e) {
        var t = b.getStorageSync(e);
        t && (w[e] = t);
    });
}

function a(e) {
    m.sl.forEach(function(t) {
        C.call(e, t) && "" !== e[t] && b.setStorageSync(t, e[t]);
    });
}

function i(e, t) {
    var n = t;
    return Object.keys(e).forEach(function(t) {
        t in n && (n[t] = e[t], t in m.sl && wx.setStorageSync(t, e[t]));
    }), t;
}

function c() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return t.length >= 1 && t[0] && a(t[0]), r(), new Promise(function(e) {
        Promise.all([ b.getNetworkType(), b.getUserInfo(), b.getLocation() ]).then(function() {
            var n = {
                sessionId: w.sid || "",
                appKey: m.appKey || "",
                appId: m.appId || "",
                unionId: w.unionId || "",
                pin: w.pin || "",
                openId: w.openId || "",
                ex1: t[0] && C.call(t[0], "ex1") ? t[0].ex1 : "",
                ex2: t[0] && C.call(t[0], "ex2") ? t[0].ex2 : "",
                ex3: t[0] && C.call(t[0], "ex3") ? t[0].ex3 : "",
                ctm: new Date().getTime()
            };
            e(n);
        });
    });
}

function s(e, t) {
    var n = {};
    c(t).then(function(o) {
        n = {
            typ: e,
            url: w.url,
            eid: t.eid || "",
            ela: t.ela || "",
            eli: t.eli || "",
            param: JSON.stringify(t.param) || "",
            rtm: new Date().getTime()
        }, n = x.joinJson([ n, o ]);
    }).then(function() {
        b.request("event", n);
    });
}

function u() {
    Object.keys(I).forEach(function(e) {
        C.call(m, e) && (m[e] = I[e]);
    });
}

function p() {
    var e = b.getStorageSync("sid"), t = "";
    if (e) {
        var n = e.split("-"), o = n.length;
        n[o - 1] = parseInt(n[o - 1], 10) + 1, t = n.join("-"), b.setStorageSync("sid", t);
    } else t = x.makeId(20) + "-1", b.setStorageSync("sid", t);
    w.sid = t;
}

function g() {
    var e = "";
    e = x.makeKey(m.appSecret), m.reqKey = e || "";
}

function f() {
    b.onNetworkStatusChange();
}

function l() {
    b.getSystemInfoSync();
}

function h() {
    x.logger("Page onShow..."), T.startPage();
}

function d() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    var o = t[0].onShareAppMessage;
    t[0].onShareAppMessage = function() {
        x.logger("Page onShareAppMessage...");
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        var r = o.apply(this, t);
        return T.startShare("share", [ r, t[0] ]), "object" != (void 0 === r ? "undefined" : v(r)) && (r = {
            path: w.url
        }), r;
    };
}

function y() {
    x.logger("App onLaunch..."), T.init(), T.startApp(arguments.length <= 0 ? void 0 : arguments[0]);
}

function S(e, t, n) {
    var o = e[t];
    e[t] = function() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        o.apply(this, t), n.apply(this, t);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, m = {
    v: "2.0.1",
    appName: "",
    appId: "",
    appKey: "",
    appSecret: "",
    getUserInfo: !0,
    api_base: "https://qidianmp.jd.com",
    api_test: "https://qd.jd.com/ad/mini",
    reqTest: !1,
    log: !0,
    isLoc: !1,
    prefix: "qidian_",
    sl: [ "pin", "openId", "unionId" ],
    reqType: {
        app: "i",
        page: "p",
        event: "e"
    }
}, w = {
    seq: 0,
    shareId: 0
}, x = {
    makeId: function(e) {
        for (var t = ""; e > t.length; ) t += Math.random().toString(36).substr(2);
        return (new Date().getTime().toString(36) + "-" + t.substr(0, e)).toLocaleUpperCase();
    },
    makeKey: function(e) {
        for (var t = 0, n = 0; e.length > n; n += 1) t += e.charCodeAt(n);
        return t %= 1e3;
    },
    compile: function(e, t) {
        for (var n = String.fromCharCode(e.charCodeAt(0) + t), o = 1; e.length > o; o += 1) n += String.fromCharCode(e.charCodeAt(o) + e.charCodeAt(o - 1));
        return escape(n);
    },
    uncompile: function(e, t) {
        for (var n = unescape(e), o = String.fromCharCode(n.charCodeAt(0) - t), r = 1; n.length > r; r += 1) o += String.fromCharCode(n.charCodeAt(r) - o.charCodeAt(r - 1));
        return o;
    },
    joinJson: function(e) {
        if ("Object" === e.constructor.name) return e;
        for (var t = e[0], n = e.length - 1; n > 0; n -= 1) !function(n) {
            Object.keys(e[n]).forEach(function(o) {
                t[o] = e[n][o];
            });
        }(n);
        return t;
    },
    logger: function() {
        if (!m.log) return !1;
        if ("object" == ("undefined" == typeof console ? "undefined" : v(console)) && console.log) try {
            var e;
            return (e = console).log.apply(e, arguments);
        } catch (e) {
            console.log(arguments.length <= 0 ? void 0 : arguments[0]);
        }
        return !1;
    }
}, q = require("75BC276331D3D4DF13DA4F64E0B3D3F6.js"), b = {
    getSystemInfo: function() {
        return new Promise(function(e) {
            wx.getSystemInfo({
                success: function(e) {
                    w.mct = e.brand, w.dvc = e.model, w.osp = e.platform, w.osv = e.system, w.scr = e.pixelRatio, 
                    w.apv = e.version, w.mnv = e.SDKVersion, w.scw = e.screenWidth, w.sch = e.screenHeight, 
                    w.winw = e.windowWidth, w.winh = e.windowHeight, w.sbh = e.statusBarHeight, w.lang = e.language, 
                    w.fsiz = e.fontSizeSetting;
                },
                complete: function() {
                    e();
                }
            });
        });
    },
    getLocation: function() {
        var e = this;
        return new Promise(function(t) {
            q.location ? m.isLoc ? (w.loc = e.getStorageSync("loc"), t()) : e.getSetting().then(function() {
                m.authSetting["scope.userLocation"] || (w.loc = "-", e.setStorageSync("loc", w.loc), 
                m.isLoc = !0, t()), wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        w.loc = t.longitude + "|" + t.latitude, e.setStorageSync("loc", w.loc), m.isLoc = !0;
                    },
                    complete: function() {
                        t();
                    }
                });
            }) : (w.loc = "-", e.setStorageSync("loc", w.loc), t());
        });
    },
    getSystemInfoSync: function() {
        try {
            var e = wx.getSystemInfoSync();
            w.mct = e.brand, w.dvc = e.model, w.osp = e.platform, w.osv = e.system, w.scr = e.pixelRatio, 
            w.apv = e.version, w.mnv = e.SDKVersion, w.scw = e.screenWidth, w.sch = e.screenHeight, 
            w.winw = e.windowWidth, w.winh = e.windowHeight, w.sbh = e.statusBarHeight, w.lang = e.language, 
            w.fsiz = e.fontSizeSetting;
        } catch (e) {
            x.logger(e);
        }
    },
    getNetworkType: function() {
        return new Promise(function(e) {
            wx.getNetworkType({
                success: function(e) {
                    w.net = e.networkType;
                },
                complete: function() {
                    e();
                }
            });
        });
    },
    getSetting: function() {
        return new Promise(function(e) {
            wx.getSetting({
                success: function(t) {
                    m.authSetting = t.authSetting, e();
                },
                fail: function() {
                    e(!1);
                }
            });
        });
    },
    getUserInfo: function() {
        var e = this;
        return new Promise(function(t) {
            e.getSetting().then(function() {
                q.userInfo && m.authSetting["scope.userInfo"] || t(), wx.getUserInfo({
                    success: function(e) {
                        w.city = e.userInfo.city, w.country = e.userInfo.country, w.gender = e.userInfo.gender, 
                        w.prov = e.userInfo.province;
                    },
                    complete: function() {
                        t();
                    }
                });
            });
        });
    },
    getLaunchOptionsSync: function() {
        if (wx.getLaunchOptionsSync) {
            var e = wx.getLaunchOptionsSync();
            w.src = e.scene, w.spath = e.path;
        }
    },
    onNetworkStatusChange: function() {
        wx.onNetworkStatusChange(function(e) {
            w.net = e.networkType;
        });
    },
    getStorageSync: function(e) {
        var t = "";
        try {
            t = wx.getStorageSync(m.prefix + e);
        } catch (e) {
            return x.logger(e), !1;
        }
        return t;
    },
    setStorageSync: function(e, t) {
        try {
            wx.setStorageSync(m.prefix + e, t);
        } catch (e) {
            x.logger(e);
        }
    },
    getTitle: function(e) {
        var t = "";
        if (__wxConfig.tabBar && (__wxConfig.tabBar.list.find(function(n) {
            return n.pathPath !== e && n.pagePath !== e + ".html" || n && n.text && (t = n.text), 
            !0;
        }), 0 === t.length)) {
            var n = __wxConfig.page[e] || __wxConfig.page[e + ".html"];
            t = n && n.window.navigationBarTitleText ? n.window.navigationBarTitleText : __wxConfig.global.window.navigationBarTitleText;
        }
        w.tle = t;
    },
    request: function(e, t) {
        var n = x.compile(JSON.stringify(t), m.reqKey);
        if (x.logger("req", e, t), this.isRequestTestURL(), wx.request({
            url: m.api_base + "/" + m.reqType[e],
            data: {
                appKey: m.appKey,
                data: n
            },
            method: "POST"
        }), m.reqTest) {
            var o = t;
            o.monitorId = m.testCode, o.reqType = e, x.logger("reqTest", e, t), wx.request({
                url: m.api_test,
                data: o,
                method: "POST"
            });
        }
    },
    isRequestTestURL: function() {
        wx.getClipboardData({
            success: function(e) {
                if (e.data.length > 19 && "❧" === e.data[0] && "❧" === e.data[e.data.length - 1]) {
                    var t = e.data.split("❧").join(""), n = x.makeKey("miniprogram"), o = x.uncompile(t, n);
                    -1 !== o.search("QD") && 19 === o.length && (m.testCode = o, m.reqTest = !0, x.logger("开启奇点测试:", "code:" + o), 
                    wx.setClipboardData({
                        data: ""
                    }));
                }
            }
        });
    }
}, I = require("75BC276331D3D4DF13DA4F64E0B3D3F6.js"), C = Object.prototype.hasOwnProperty, A = {
    init: function() {
        u(), p(), f(), g(), l();
    },
    app: function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        var o = {};
        b.getLaunchOptionsSync(), c().then(function(e) {
            o = x.joinJson([ o = {
                appName: m.appName || "",
                net: w.net || "",
                osv: w.osv || "",
                osp: w.osp || "",
                dvc: w.dvc || "",
                mct: w.mct || "",
                scr: w.scr || "",
                apv: w.apv || "",
                phn: w.phn || "",
                loc: w.loc || "",
                gender: w.gender || "",
                city: w.city || "",
                prov: w.prov || "",
                country: w.country || "",
                spath: w.spath || "",
                src: w.src || "",
                scw: w.scw || "",
                sch: w.sch || "",
                winw: w.winw || "",
                winh: w.winh || "",
                sbh: w.sbh || "",
                lang: w.lang || "",
                fsiz: w.fsiz || "",
                wpv: w.wpv || ""
            }, e ]), t[0] && (o = i(t[0], o)), b.request("app", o);
        });
    },
    page: function() {
        for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
        var a = {};
        t(), o(), c(n[0]).then(function(e) {
            a = x.joinJson([ a = {
                seq: w.seq,
                url: w.url,
                referPath: w.rp || "-",
                tle: w.tle
            }, e ]), n[0] && (a = i(n[0], a)), b.request("page", a);
        });
    },
    event: s,
    share: function(t, o) {
        var r = {}, a = x.joinJson(o);
        switch (t) {
          case "share":
            n(), s("share_0", r = e(a));
            break;

          case "success":
            r.ex1 = w.shareId, r.param = a, s("share_1", r);
            break;

          case "fail":
            r.ex1 = w.shareId, r.param = a, s("share_2", r);
        }
    },
    setData: function(e) {
        Object.keys(e).forEach(function(t) {
            C.call(e, t) && (w[t] = e[t], t in m.sl && b.setStorageSync(t, e[t]));
        });
    }
}, T = {
    init: function() {
        A.init();
    },
    startApp: function() {
        A.app(arguments.length <= 0 ? void 0 : arguments[0]);
    },
    startPage: function() {
        A.page(arguments.length <= 0 ? void 0 : arguments[0]);
    },
    startEven: function(e, t) {
        A.event(e, t);
    },
    setData: function(e) {
        A.setData(e);
    },
    startShare: function(e, t) {
        A.share(e, t);
    }
}, P = Page, j = App, k = {
    qdApp: function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        x.logger("App inject start..."), S(t[0], "onLaunch", y), j.apply(this, t);
    },
    qdPage: function() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        x.logger("Page inject start..."), S(t[0], "onShow", h), "function" == typeof t[0].onShareAppMessage && d(t[0]), 
        P.apply(this, t);
    }
};

T.qdApp = k.qdApp, T.qdPage = k.qdPage, exports.default = T;