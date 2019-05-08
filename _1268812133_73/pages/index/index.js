var t = new getApp(), e = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js"), a = require("../../9A15EBF331D3D4DFFC7383F498A3D3F6.js");

Page({
    data: {
        loadingimg: a.loadingimg,
        noticeid: "",
        shownotice: !1,
        noticetxt: "",
        isindex: !0,
        currentstep: 0,
        currentPoints: 0,
        reservey: 0,
        reservex: 0,
        ctxwidth: 90,
        ctxheight: 90,
        circleW: 300,
        circleH: 300,
        circleTop: 38,
        circleLeft: 195,
        ctxH: 534,
        ctxData: [],
        coins: [],
        animationData: [],
        adList: [],
        indexMenu: [ {
            icon: "/images/xrfl.png",
            text: "新人福利",
            link: "/pages/boon/index"
        }, {
            icon: "/images/czrq.png",
            text: "成长日记",
            link: "/pages/share/index"
        }, {
            icon: "/images/1bcj.png",
            text: "1币值抽奖",
            link: "/pages/activity/onejacklist?acid=7"
        }, {
            icon: "/images/pbj.png",
            text: "跑步节",
            link: "/pages/run/run"
        } ],
        userInfo: null,
        authWerun: !0,
        authLocal: !0,
        countpaopao: 0,
        GoodsList: [],
        coinname: t.globalData.sysinfo.coinname,
        systime: "",
        remind: !1,
        time: 4,
        inviterList: [],
        remindrange: [ {
            value: 5,
            show: "5:00"
        }, {
            value: 6,
            show: "6:00"
        }, {
            value: 7,
            show: "7:00"
        }, {
            value: 8,
            show: "8:00"
        }, {
            value: 9,
            show: "9:00"
        }, {
            value: 10,
            show: "10:00"
        }, {
            value: 11,
            show: "11:00"
        }, {
            value: 12,
            show: "12:00"
        }, {
            value: 13,
            show: "13:00"
        }, {
            value: 14,
            show: "14:00"
        }, {
            value: 15,
            show: "15:00"
        }, {
            value: 16,
            show: "16:00"
        }, {
            value: 17,
            show: "17:00"
        }, {
            value: 18,
            show: "18:00"
        }, {
            value: 19,
            show: "19:00"
        }, {
            value: 20,
            show: "20:00"
        }, {
            value: 21,
            show: "21:00"
        }, {
            value: 22,
            show: "22:00"
        }, {
            value: 23,
            show: "23:00"
        } ]
    },
    toggleremind: function() {
        this.setData({
            remind: !this.data.remind
        });
    },
    close: function() {
        this.setData({
            remind: !1
        });
    },
    closeforbidden: function() {
        this.setData({
            forbidden: !1
        });
    },
    bindTimeChange: function(t) {
        this.setData({
            time: t.detail.value
        });
    },
    onLoad: function(t) {
        var a = this;
        if (e.checklogin()) {
            var n = this, i = new Date();
            this.data.remindrange.forEach(function(t, e) {
                t.show == i.getHours() + ":00" && a.setData({
                    time: e
                });
            });
            try {
                var o = wx.getSystemInfoSync(), s = (o.pixelRatio, o.windowWidth), c = s / 750 * n.data.ctxH;
                n.width = s, n.height = c;
            } catch (t) {
                console.log(t);
            }
            n.handleData();
        }
    },
    beginScale: function() {
        var t = this;
        t.setData({
            style: "transform:translateY(15px);"
        }), setTimeout(function() {
            t.setData({
                style: "transform:translateY(0px);"
            });
        }, 1500);
    },
    moveCtr: function(t) {
        var a = t.detail.target.dataset, n = a.x.slice(0, -3) * (this.width / 750), i = a.y.slice(0, -3) * (this.width / 750), o = a.index, s = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        }), c = this.center[0] - n - this.width / 750 * this.data.ctxwidth / 2, r = this.center[1] - i - this.width / 750 * this.data.ctxheight / 2;
        s.translate(c, r).scale(0, 0).step({
            duration: 500
        });
        var u = [];
        u[o] = s.export(), this.setData({
            animationData: u
        }), (s = wx.createAnimation({
            duration: 800,
            timingFunction: "ease"
        })).scale(1.1, 1.1).step({
            duration: 800
        }), this.setData({
            animationcircle: s.export()
        });
        var d = a.value;
        e.formSave({
            formid: t.detail.formId
        }), setTimeout(function() {
            var t = this, n = wx.createAnimation({
                duration: 800,
                timingFunction: "ease"
            });
            n.scale(1, 1).step({
                duration: 800
            });
            var i = a.pid;
            e.getPoint({
                pid: i
            }).then(function(i) {
                200 == i.status ? (t.data.userInfo.totalpoint = 1 * t.data.userInfo.totalpoint + 1 * d, 
                t.setData({
                    countpaopao: 1 * t.data.countpaopao - 1,
                    currentPoints: 1 * t.data.currentPoints + 1 * d,
                    userInfo: t.data.userInfo
                }), a.message && e.ALERT(a.message)) : wx.showToast({
                    title: i.message,
                    icon: "none"
                }), t.data.coins[o].go = 99, t.setData({
                    coins: t.data.coins,
                    animationData: [],
                    animationcircle: n.export()
                });
            });
        }.bind(this), 800);
    },
    randomCoordinate: function(t) {
        wx.getSystemInfoSync().windowWidth, this.data.ctxH;
        var e = [ this.data.reservey + this.data.circleTop, this.data.circleH + this.data.circleTop - this.data.ctxheight ], a = [ this.data.reservex, (690 - this.data.circleW) / 2 - this.data.reservex - this.data.ctxwidth ], n = [ (690 - this.data.circleW) / 2 - this.data.reservex + this.data.circleW, 690 - this.data.reservex - this.data.ctxwidth ];
        if ((i = [])[0] = this.RandomNum(a[0], a[1]), i[1] = this.RandomNum(n[0], n[1]), 
        t % 2 == 0) i = i[0]; else var i = i[1];
        return [ i + "rpx", this.RandomNum(e[0], e[1]) + "rpx" ];
    },
    RandomNum: function(t, e) {
        return t + Math.floor(Math.random() * (e - t + 1));
    },
    onShow: function() {
        var t = this;
        if (e.checklogin()) {
            var a = {
                openId: wx.getStorageSync("userInfo").openid
            };
            getApp().globalData.qd.startPage(a);
            e.getUserInfo().then(function(e) {
                200 == e.status && 1 == e.data.forbidden && t.setData({
                    forbidden: !0
                });
            });
        }
    },
    handleData: function() {
        var t = this;
        this.beginScale(), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.werun"] && e.authSetting["scope.userLocation"] ? (t.getUserRunData(), 
                t.getUserLocation()) : (wx.authorize({
                    scope: "scope.werun",
                    success: function() {
                        t.getUserRunData();
                    },
                    fail: function(e) {
                        t.setData({
                            authWerun: !1
                        });
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                }), wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {
                        t.getUserLocation();
                    },
                    fail: function(e) {
                        t.setData({
                            authLocal: !1
                        });
                    }
                }));
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.getUserInfo(), this.getGoodsShot(), this.getBannerList(), this.getNotice();
    },
    getInvatorList: function() {
        var t = this;
        e.invaterList().then(function(e) {
            if (200 == e.status) {
                var a = e.data;
                a || (a = []), t.setData({
                    inviterList: a
                });
            }
        });
    },
    getGoodsShot: function() {
        var t = this;
        e.indexGoods({
            position: 1
        }).then(function(e) {
            if (200 == e.status) {
                var a = e.data;
                a || (a = []), t.setData({
                    GoodsList: a,
                    systime: e.sys_time
                });
            }
        });
    },
    getUserInfo: function() {
        var t = this;
        e.getUserInfo().then(function(e) {
            200 == e.status && t.setData({
                userInfo: e.data
            });
        });
    },
    gosale: function(t) {
        wx.navigateTo({
            url: "../mall/index?type=1"
        });
    },
    goexchange: function(t) {
        wx.navigateTo({
            url: "../mall/index?type=2"
        });
    },
    gogl: function() {
        wx.navigateTo({
            url: "../rule/index?rulename=gl"
        });
    },
    getMyrecords: function() {
        var t = this;
        e.getMyrecords({
            limit: 1
        }).then(function(e) {
            200 == e.status && t.setData({
                currentstep: e.data.list[0].steps
            });
        }), e.getTodayPoint().then(function(e) {
            200 == e.status && t.setData({
                currentPoints: e.data.total
            });
        });
    },
    getUserLocation: function() {
        this.setData({
            authLocal: !0
        }), wx.getLocation({
            success: function(e) {
                var a = t.globalData.userInfo;
                a && (a.latitude = e.latitude, a.longitude = e.longitude, wx.setStorageSync("userInfo", a), 
                t.globalData.userInfo = a);
            }
        });
    },
    getPaopao: function(t, a, n) {
        var i = this, o = this;
        e.postRunData({
            steps: t,
            iv: a,
            wxcode: n
        }).then(function(t) {
            if (200 == t.status) {
                t.data.points.length ? o.setData({
                    coins: t.data.points,
                    countpaopao: t.data.points.length
                }) : o.setData({
                    coins: [],
                    countpaopao: 0
                });
                (t = wx.getSystemInfoSync()).pixelRatio;
                for (var a = t.windowWidth, n = a / 750 * (o.data.circleH / 2 + o.data.circleTop), s = o.data.ctxData, c = [], r = 0; r < o.data.coins.length; r++) {
                    var t = o.randomCoordinate(r);
                    s[r] = [ t[0], t[1] ], c[r] = "";
                }
                var u = [ a / 2, n ];
                o.center = u, o.setData({
                    ctxData: s,
                    animationData: c
                }), o.amount = o.data.coins.length, i.ppinterval = setInterval(function() {
                    o.beginScale();
                }, 3e3);
            } else e.ALERT("步数跟新失败,请重试!"), wx.login({
                success: function(t) {
                    t.code && e.resetSessionKey({
                        wxcode: t.code
                    });
                }
            });
            o.getMyrecords(), setTimeout(function() {
                wx.hideLoading();
            }, 300);
        });
    },
    getUserRunData: function() {
        var t = this;
        t.setData({
            authWerun: !0
        }), wx.checkSession({
            success: function() {
                wx.getWeRunData({
                    success: function(e) {
                        wx.showLoading({
                            title: "加载中"
                        });
                        var a = e.encryptedData;
                        t.getPaopao(a, e.iv, "");
                    },
                    fail: function(e) {
                        t.getPaopao(0, 0, 0);
                    }
                });
            },
            fail: function() {
                wx.login({
                    success: function(e) {
                        var a = e.code;
                        wx.getWeRunData({
                            success: function(e) {
                                wx.showLoading({
                                    title: "加载中"
                                });
                                var n = e.encryptedData;
                                t.getPaopao(n, e.iv, a);
                            },
                            fail: function(e) {
                                t.getPaopao(0, 0, 0);
                            }
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    openSetting: function() {
        var t = this;
        wx.openSetting({
            success: function(e) {
                e.authSetting["scope.werun"] && t.getUserRunData(), e.authSetting["scope.userLocation"] && t.getUserLocation();
            }
        });
    },
    formatGoodsList: function(t) {},
    getBannerList: function() {
        var t = this;
        e.getBannerList({
            position: 1
        }).then(function(e) {
            200 == e.status && e.data && t.setData({
                adList: e.data
            });
        });
    },
    onShareAppMessage: function(e) {
        return console.log(t.globalData.userInfo.urid), {
            title: "步数当钱花，0元换好礼。快来免费拿！",
            imageUrl: "../../images/share.jpg",
            path: "/pages/index/index?fromuserid=" + t.globalData.userInfo.urid,
            success: function(t) {
                console.log(t);
            }
        };
    },
    gopointslist: function() {
        wx.navigateTo({
            url: "../point/point"
        });
    },
    gosteps: function() {
        wx.navigateTo({
            url: "../step/step"
        });
    },
    goshare: function() {
        wx.navigateTo({
            url: "../share/index"
        });
    },
    onPullDownRefresh: function() {
        clearInterval(this.ppinterval);
        var t = this;
        wx.stopPullDownRefresh(), t.handleData();
    },
    remidTomorrow: function(t) {
        var a = this;
        e.formSave({
            formid: t.detail.formId
        }), e.remindme({
            hour: this.data.remindrange[t.detail.value.hour].value
        }).then(function(t) {
            a.close();
        });
    },
    getNotice: function() {
        var t = this;
        e.getNotice().then(function(e) {
            if (200 == e.status && e.data) {
                var a = "noticestorage" + e.data[0].id, n = wx.getStorageSync(a);
                n ? Date.parse(new Date()) - n.timestamp > 864e5 && t.setData({
                    shownotice: !0,
                    noticetxt: e.data[0].shortdesc,
                    noticeid: e.data[0].id,
                    noticeurl: e.data[0].jumpurl
                }) : t.setData({
                    shownotice: !0,
                    noticetxt: e.data[0].shortdesc,
                    noticeid: e.data[0].id,
                    noticeurl: e.data[0].jumpurl
                });
            }
        });
    },
    gonoticedetail: function(t) {
        wx.navigateTo({
            url: "/pages/webview/index?jumpurl=" + encodeURIComponent(this.data.noticeurl)
        });
    },
    closenotice: function(t) {
        var e = Date.parse(new Date()), a = "noticestorage" + this.data.noticeid;
        wx.setStorageSync(a, e);
    },
    handleMenu: function(t) {
        e.jump(t.currentTarget.dataset.link);
    }
});