function t(t) {
    return "-1" != t.indexOf("pages/user/index") || "-1" != t.indexOf("pages/activity/index") || "-1" != t.indexOf("pages/index/index");
}

function e() {
    return null != s.globalData.userInfo && void 0 != s.globalData.userInfo.urid && s.globalData.userInfo.urid;
}

function n(t) {
    var e = "";
    e = "/" + t.route;
    var n = "";
    if ("{}" != JSON.stringify(t.options)) {
        var r = t.options;
        for (var s in r) n += s + "=" + r[s] + "&";
        e += n = "?" + n;
    }
    wx.setStorageSync("authlastpath", e), wx.navigateTo({
        url: "/pages/webview/index?jumpurl=" + encodeURIComponent(i.jdauthrealname)
    });
}

function r(t, e) {
    if (t = i.apihost + t, e || (e = {}), e.app = i.appid, s.globalData.userInfo) {
        var r = s.globalData.userInfo.urid, a = s.globalData.userInfo.token, o = s.globalData.userInfo.latitude, u = s.globalData.userInfo.longitude;
        r && !e.urid && (e.urid = r, e.userid = r), a && (e.token = a), o && (e.latitude = o), 
        u && (e.longitude = u);
    }
    return new Promise(function(r, i) {
        wx.request({
            url: t,
            data: e,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                201 == t.data.status ? wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: "您的账号已在其他设备登录,请重新授权",
                    success: function(t) {
                        if (t.confirm) return wx.clearStorage(), void wx.reLaunch({
                            url: "/pages/user/userauth"
                        });
                        t.cancel && console.log("用户点击取消");
                    }
                }) : 205 == t.data.status ? wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        if (t.confirm) {
                            var e = getCurrentPages();
                            n(e[e.length - 1]);
                        } else t.cancel && console.log("用户点击取消");
                    }
                }) : r(t.data);
            },
            fail: function(t) {
                wx.hideLoading(), wx.hideNavigationBarLoading(), i(t.data), wx.getNetworkType({
                    success: function(t) {
                        "none" == t.networkType && wx.showToast({
                            title: "当前网路不可用",
                            icon: "none"
                        });
                    }
                });
            }
        });
    });
}

var i = require("9A15EBF331D3D4DFFC7383F498A3D3F6.js"), s = new getApp(), a = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    islogin: e,
    checklogin: function() {
        return !!e() || void wx.redirectTo({
            url: "/pages/user/userauth"
        });
    },
    formSave: function(t) {
        return r("/user/formsave", t);
    },
    getSystem: function(t) {
        return r("/api/system", t);
    },
    auctionPreorder: function(t) {
        return r("/pay/auctionpreorder", t);
    },
    myLikeList: function(t) {
        return r("/user/likelist", t);
    },
    myAuction: function(t) {
        return r("/user/myauction", t);
    },
    myOrder: function(t) {
        return r("/user/myorder", t);
    },
    likeGoods: function(t) {
        return r("/user/likegoods", t);
    },
    Sign: function(t) {
        return r("/user/signin", t);
    },
    sendList: function(t) {
        return r("/user/sendlist", t);
    },
    sendPoint: function(t) {
        return r("/user/sendpoint", t);
    },
    payAuction: function(t) {
        return r("/pay/auction", t);
    },
    getBannerList: function(t) {
        return r("/api/banner", t);
    },
    getGoodshot: function(t) {
        return r("/point/goodshot", t);
    },
    getTodayPoint: function(t) {
        return r("/point/todaypoint", t);
    },
    getPoint: function(t) {
        return r("/point/getpoint", t);
    },
    payOrder: function(t) {
        return r("pay/payorder", t);
    },
    delAddress: function(t) {
        return r("/user/addressdel", t);
    },
    getAddress: function(t) {
        return r("/user/addressdetail", t);
    },
    handleAddress: function(t) {
        return r("/user/addressedit", t);
    },
    getAddressList: function(t) {
        return r("/user/addresslist", t);
    },
    prePayorder: function(t) {
        return r("/pay/prepayorder", t);
    },
    getGoodsDetail: function(t) {
        return r("point/goodsdetail", t);
    },
    getGoodsList: function(t) {
        return r("point/goodslist", t);
    },
    getMypoints: function(t) {
        return r("user/points", t);
    },
    getMyrecords: function(t) {
        return r("user/myrecords", t);
    },
    postRunData: function(t) {
        return r("user/commituserrecord", t);
    },
    getUserInfo: function(t) {
        return r("user/userinfo", t);
    },
    userLogin: function(t) {
        return r("user/login", t);
    },
    formatTime: function(t) {
        var e = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), i = t.getHours(), s = t.getMinutes(), o = t.getSeconds();
        return [ e, n, r ].map(a).join("/") + " " + [ i, s, o ].map(a).join(":");
    },
    countTime: function(t, e) {
        var n, r, i, s;
        return t >= 0 && (n = Math.floor(t / 1e3 / 60 / 60 / 24), r = Math.floor(t / 1e3 / 60 / 60 % 24), 
        i = Math.floor(t / 1e3 / 60 % 60), s = Math.floor(t / 1e3 % 60)), e ? n + "天" + r + "小时" : n + "天" + r + "小时" + i + "分" + s + "秒";
    },
    compareVersion: function(t, e) {
        t = t.split("."), e = e.split(".");
        for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
        for (;e.length < n; ) e.push("0");
        for (var r = 0; r < n; r++) {
            var i = parseInt(t[r]), s = parseInt(e[r]);
            if (i > s) return 1;
            if (i < s) return -1;
        }
        return 0;
    },
    formatBignumber: function(t) {
        return (t / 1e4).toFixed(2);
    },
    transdate: function(t) {
        var e = new Date();
        return e.setFullYear(t.substring(0, 4)), e.setMonth(t.substring(5, 7) - 1, t.substring(8, 10)), 
        e.setHours(t.substring(11, 13)), e.setMinutes(t.substring(14, 16)), e.setSeconds(t.substring(17, 19)), 
        Date.parse(e) / 1e3;
    },
    timeStamp: function(t, e) {
        var n = parseInt(t) + "秒";
        if (parseInt(t) > 60) {
            var r = parseInt(t) % 60;
            if (n = (a = parseInt(t / 60)) + "分" + r + "秒", a > 60) a = parseInt(t / 60) % 60, 
            n = (s = parseInt(parseInt(t / 60) / 60)) + "小时" + a + "分" + r + "秒", s > 24 ? (s = parseInt(parseInt(t / 60) / 60) % 24, 
            n = (i = parseInt(parseInt(parseInt(t / 60) / 60) / 24)) + "天" + s + "小时" + a + "分" + r + "秒") : i = 0; else var i = 0, s = 0;
        } else {
            var i = 0, s = 0, a = 0;
            r = parseInt(t);
        }
        return 2 == e && (n = [ i, s, a, r ]), n;
    },
    payCodeOrder: function(t) {
        return r("pay/paycodeorder", t);
    },
    myCard: function(t) {
        return r("/user/mycodes", t);
    },
    indexGoods: function(t) {
        return r("point/category", t);
    },
    categoryList: function(t) {
        return r("point/categorygoods", t);
    },
    auctionHelp: function(t) {
        return r("user/auctionhelp", t);
    },
    orderDetail: function(t) {
        return r("user/orderdetail", t);
    },
    ALERT: function(t, e) {
        wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(t) {}
        });
    },
    expressinfo: function(t) {
        return r("user/orderexpress", t);
    },
    remindme: function(t) {
        return r("user/remindme", t);
    },
    getMyFriends: function(t) {
        return r("user/myinvite", t);
    },
    getMinicode: function(t) {
        return r("api/getminicode", t);
    },
    getShareimage: function(t) {
        return r("api/getshareimage", t);
    },
    jdAuth: function(t) {
        var e = "";
        e = "/" + t.route;
        var n = "";
        if ("{}" != JSON.stringify(t.options)) {
            var r = t.options;
            for (var s in r) n += s + "=" + r[s] + "&";
            e += n = "?" + n;
        }
        wx.setStorageSync("authlastpath", e), wx.navigateTo({
            url: "/pages/webview/index?jumpurl=" + encodeURIComponent(i.jdauth)
        });
    },
    jdAuthRealName: n,
    fetchUserVerify: function(t) {
        return r("user/verify", t);
    },
    fetchUserRealNameVerify: function(t) {
        return r("user/realverify", t);
    },
    istabbar: t,
    invaterList: function(t) {
        return r("user/todayinvite", t);
    },
    getCurrentPageUrlWithArgs: function() {
        var t = !!arguments[0] && arguments[0], e = getCurrentPages(), n = e[e.length - 1], r = n.route, i = n.options, s = "/" + r + "?";
        for (var a in i) {
            if (1 == t) o = decodeURIComponent(i[a]); else var o = i[a];
            s += a + "=" + o + "&";
        }
        return s = s.substring(0, s.length - 1);
    },
    getMinicodeurl: function(t) {
        return r("api/getminicodeurl", t);
    },
    myWinlist: function(t) {
        return r("activity/mywinlist", t);
    },
    addAddress: function(t) {
        return r("activity/addaddress", t);
    },
    winDetail: function(t) {
        return r("activity/windetail", t);
    },
    activityList: function(t) {
        return r("activity/list", t);
    },
    oneJacklist: function(t) {
        return r("activity/onejacklist", t);
    },
    oneJackDetail: function(t) {
        return r("activity/onejackdetail", t);
    },
    attenDonejack: function(t) {
        return r("activity/attendonejack", t);
    },
    getNotice: function(t) {
        return r("user/getnotice", t);
    },
    getaddress1: function(t) {
        return r("jdvop/getaddress1", t);
    },
    getaddress2: function(t) {
        return r("jdvop/getaddress2", t);
    },
    getaddress3: function(t) {
        return r("jdvop/getaddress3", t);
    },
    getaddress4: function(t) {
        return r("/jdvop/getaddress4", t);
    },
    jackstateOpt: function(t, e) {
        var n = 1 * t.starttime, r = 1 * t.endtime, i = 1 * t.drawtime;
        t.jumpdisabled = !1, e < n && (t.timestateimg = "/images/gstate0@2x.png", t.btntips = "未参与", 
        t.jumpdisabled = !0, t.showtips = "活动尚未开始,请开始后查看", t.showstart = !0), e >= n && e <= r && (t.timestateimg = "/images/timestate1.png", 
        t.detaildrawtips = '<div class="tips"><div>1成长币参与抽奖,已有<span class="text-red">' + t.attendnum + '</span>人参与</div><div class="notice">奖品有效期1天，过期未领作废</div></div>', 
        t.state ? (t.btntips = "已参与", t.detailstateimg = "/images/joined.png") : (t.btntips = "点击参与", 
        t.classname = "join", t.detailstateimg = "/images/tojoin.png", t.attendonejack = !0)), 
        e > r && e < i && (t.timestateimg = "/images/jackstate0.png", t.state ? t.btntips = "已参与" : t.btntips = "未参与", 
        t.jumpdisabled = !0, t.showtips = "活动暂未开奖,请开奖后查看"), e >= i && (t.timestateimg = "/images/jackstate1.png", 
        t.state ? (t.btntips = "已参与", t.hituser && t.hituser.urid ? s.globalData.userInfo.urid == t.hituser.urid ? (t.detailstateimg = "/images/drawsuccess.png", 
        t.orderinfo && t.orderinfo.address ? (t.detaildrawtips = "<div class='tips'><div class='mvbutton'>已领奖</div></div>", 
        t.bindtap = "goorderdetail") : 1 * e - 1 * t.drawtime > 259200 ? t.detaildrawtips = "<button class='mvbutton' disabled>奖品已过期</button><view>奖品有效期1天，过期未领作废</view>" : (t.detaildrawtips = "<div class='tips'><div class='mvbutton godraw'>点击领奖</div><div class='notice'>奖品有效期1天，过期未领作废</div></div>", 
        t.bindtap = "godraw")) : (t.detailstateimg = "/images/drawfail.png", t.detaildrawtips = '<div class=\'tips\' style="color:#F15A24;"><div class="luckuser">中奖者</div>  <div class="lukcuseravatar"><img class="avatar" src="' + t.hituser.avatarurl + '"></div><div class="nickname">' + t.hituser.nickname + "</div></div>") : t.detailstateimg = "/images/drawfail.png") : (t.btntips = "未参与", 
        t.detailstateimg = "/images/nojoin.png", t.hituser && (t.detaildrawtips = '<div class=\'tips\' style="color:#F15A24;"><div class="luckuser">中奖者</div>  <div class="lukcuseravatar"><img class="avatar" src="' + t.hituser.avatarurl + '"></div><div class="nickname">' + t.hituser.nickname + "</div></div>")));
        var a = new Date();
        t.showstart && t.showstart ? a.setTime(1e3 * n) : a.setTime(1e3 * i);
        a.getFullYear();
        var o = a.getMonth() + 1, u = a.getDate(), d = a.getHours(), c = a.getMinutes().toString();
        c = c[1] ? c : "0" + c, t.showstart && t.showstart ? t.drawtimeshow = "开始时间:" + o + "月" + u + "日" + d + ":" + c : t.drawtimeshow = "开奖时间:" + o + "月" + u + "日" + d + ":" + c;
    },
    jump: function(e) {
        t(e) ? wx.switchTab({
            url: e
        }) : wx.navigateTo({
            url: e
        });
    },
    taskList: function(t) {
        return r("task/tasklist", t);
    },
    taskBonus: function(t) {
        return r("task/taskbonus", t);
    },
    Sharediary: function(t) {
        return r("user/sharediary", t);
    },
    resetSessionKey: function(t) {
        return r("user/savesession", t);
    }
};