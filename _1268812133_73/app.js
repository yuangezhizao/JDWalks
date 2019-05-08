var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("/0D85B9B031D3D4DF6BE3D1B733C3D3F6.js")), t = require("/9A15EBF331D3D4DFFC7383F498A3D3F6.js");

e.default.init();

var o = wx.getUpdateManager();

App({
    onShow: function(e) {
        o.onCheckForUpdate(function(e) {
            console.log(e.hasUpdate);
        }), o.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "版本已升级,是否重启应用?",
                success: function(e) {
                    e.confirm && o.applyUpdate();
                }
            });
        }), o.onUpdateFailed(function() {
            wx.showModal({
                title: "更新提示",
                content: "版本跟新失败,是否重新跟新?",
                success: function(e) {
                    e.confirm && o.applyUpdate();
                }
            });
        }), console.log("onshow");
    },
    getLastPath: function(e) {
        var t = "";
        t = "/" + e.path;
        var o = "";
        if (e.query) {
            var r = e.query;
            for (var n in r) o += n + "=" + r[n] + "&";
            t += o = "?" + o;
        }
        wx.setStorageSync("loginpath", t);
    },
    onLaunch: function(o) {
        var r = o.query;
        if (r && r.fromuserid && wx.setStorageSync("fromuserid", r.fromuserid), r && r.gid && wx.setStorageSync("gid", r.gid), 
        r && r.appurid && wx.setStorageSync("appurid", r.appurid), o && o.referrerInfo && o.referrerInfo.appId && wx.setStorageSync("extappid", o.referrerInfo.appId), 
        console.log(o.query), o.query.scene) {
            var n = decodeURIComponent(o.query.scene);
            n = n.split("="), wx.setStorageSync(n[0], n[1]);
        }
        this.globalData.sysinfo = t.sysparams, this.checkUserLogin(o), console.log("onlaunch");
        var a = {
            openId: wx.getStorageSync("userInfo").openid
        };
        e.default.startApp(a);
    },
    checkUserLogin: function(e) {
        var t = this;
        if (!this.globalData.userInfo) {
            var o = wx.getStorageSync("userInfo");
            if (!o) return this.getLastPath(e), void wx.redirectTo({
                url: "/pages/user/userauth",
                success: function(e) {
                    console.log(e);
                },
                fail: function(e) {
                    console.log(e);
                }
            });
            if ((new Date().getTime() - o.logintime) / 1e3 / 86400 >= 7) return this.getLastPath(e), 
            void wx.redirectTo({
                url: "/pages/user/userauth"
            });
            t.globalData.userInfo = o;
        }
    },
    globalData: {
        userInfo: null,
        sysinfo: "",
        qd: e.default
    }
});