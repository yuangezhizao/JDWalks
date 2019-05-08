var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), e = new getApp();

Page({
    data: {
        oneJackDetail: "",
        oneid: "",
        bannerList: []
    },
    onLoad: function(t) {
        this.setData({
            oneid: t.oneid
        }), this.getDetail(), this.getBannerList();
    },
    getBannerList: function() {
        var e = this;
        t.getBannerList({
            position: 2,
            categoryid: this.data.oneid
        }).then(function(t) {
            200 == t.status && t.data && e.setData({
                bannerList: t.data
            });
        });
    },
    getDetail: function() {
        var e = this;
        t.oneJackDetail({
            oneid: this.data.oneid
        }).then(function(n) {
            200 == n.status && (n.data.description = n.data.description.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto" '), 
            t.jackstateOpt(n.data, n.sys_time), e.setData({
                oneJackDetail: n.data
            }));
        });
    },
    attenDoneJack: function(e) {
        t.formSave({
            formid: e.detail.formId
        });
        var n = this;
        wx.showModal({
            title: "提示",
            content: "参与抽奖将花费1成长币,是否参与抽奖?",
            success: function(e) {
                e.confirm ? t.attenDonejack({
                    acid: n.data.oneJackDetail.acid,
                    oneid: n.data.oneid
                }).then(function(e) {
                    200 == e.status ? n.getDetail() : 206 == e.status ? wx.showModal({
                        title: "提示",
                        content: e.message,
                        confirmText: "领取",
                        success: function(e) {
                            e.confirm && t.Sign().then(function(e) {
                                200 == e.status ? wx.showToast({
                                    title: "领取成功,可以抽奖啦！",
                                    icon: "none",
                                    duration: 2e3
                                }) : t.ALERT(e.message);
                            });
                        }
                    }) : t.ALERT(e.message);
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    godraw: function() {
        wx.navigateTo({
            url: "../address/index?oneid=" + this.data.oneid + "&orderno=" + this.data.oneJackDetail.orderinfo.orderno + "&ordertype=999"
        });
    },
    goorderdetail: function() {
        wx.navigateTo({
            url: "../myluckdraw/detail?orderno=" + this.data.oneJackDetail.orderinfo.orderno
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "兄die！这里每天都在抽大奖，怎可错过！赶紧来瞧~",
            path: t.getCurrentPageUrlWithArgs() + "&fromuserid=" + e.globalData.userInfo.urid
        };
    }
});