function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    for (var a = ""; a.length < e; ) a += "0";
    return (a + t).slice(-e);
}

function a(t, a, s) {
    for (var i = []; t <= a; ) i.push(e(t, s)), t++;
    return i;
}

function s(t) {
    var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY:MM:DD";
    if (t || 0 === t || (t = new Date()), "Invalid Date" === (t = new Date(t)).toString()) throw new Error("Invalid Date");
    var s = function(e, a) {
        return a ? a(t["get" + e]()) : t["get" + e]();
    }, i = new Map();
    i.set(/(Y+)/i, function() {
        return s("FullYear", function(t) {
            return (t + "").substr(4 - RegExp.$1.length);
        });
    }), i.set(/(M+)/, function() {
        return s("Month", function(t) {
            return e(t + 1, RegExp.$1.length);
        });
    }), i.set(/(D+)/i, function() {
        return s("Date", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), i.set(/(H+)/i, function() {
        return s("Hours", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), i.set(/(m+)/, function() {
        return s("Minutes", function(t) {
            return e(t, RegExp.$1.length);
        });
    }), i.set(/(s+)/, function() {
        return s("Seconds", function(t) {
            return e(t, RegExp.$1.length);
        });
    });
    for (var n = i, r = Array.isArray(n), o = 0, n = r ? n : n[Symbol.iterator](); ;) {
        var h;
        if (r) {
            if (o >= n.length) break;
            h = n[o++];
        } else {
            if ((o = n.next()).done) break;
            h = o.value;
        }
        var u = h, d = u[0], c = u[1];
        d.test(a) && (a = a.replace(RegExp.$1, c.call(null)));
    }
    return a;
}

var i = function() {
    function e(s) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date(), n = arguments[2];
        t(this, e), this.types = [ "year", "month", "day", "hour", "minute", "second" ], 
        this.months = a(1, 12, 2), this.hours = a(0, 23, 2), this.seconds = a(0, 59, 2), 
        this.minutes = a(0, 59, 2), this.init(i, n);
    }
    return e.prototype.getYears = function(t) {
        var e = Math.floor(25);
        return a(t - e, t + (50 - e), 4);
    }, e.prototype.lastDay = function(t, e) {
        return 12 !== e ? new Date(new Date(t + "/" + (e + 1) + "/1").getTime() - 864e5).getDate() : 31;
    }, e.prototype.init = function(t, e) {
        var s = new Date(t), i = s.getFullYear(), n = s.getMonth() + 1, r = this.getYears(i), o = a(1, this.lastDay(i, n), 2);
        this._years = r, this._dataList = [ r, this.months, o, this.hours, this.minutes, this.seconds ], 
        this._indexs = [ 25, n - 1, s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds() ], 
        e && e({
            dataList: this._dataList,
            indexs: this._indexs
        });
    }, e.prototype.update = function(t, e, a) {
        switch (this.types[t]) {
          case "year":
            this._updateYear(t, e, a);
            break;

          case "month":
            this._updateMonth(t, e, a);
            break;

          default:
            this._indexs[t] = e, a && a({
                dataList: this._dataList,
                indexs: this._indexs,
                updateColumn: t,
                updateIndex: e
            });
        }
    }, e.prototype._updateYear = function(t, e, a) {
        var s = this._dataList[t][e];
        this._dataList[t] = this.getYears(+s), this._indexs[t] = Math.floor(25), a && a({
            dataList: this._dataList,
            indexs: this._indexs,
            updateColumn: t
        });
    }, e.prototype._updateMonth = function(t, e, s) {
        var i = this._dataList[t][e], n = this._dataList[0][this._indexs[0]], r = this.lastDay(+n, +i);
        this._indexs[t] = e, this._dataList[2] = a(1, r, 2), this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2], 
        s && s({
            dataList: this._dataList,
            indexs: this._indexs,
            updateColumn: 2,
            updateIndex: this._indexs[2]
        }), s && s({
            dataList: this._dataList,
            indexs: this._indexs,
            updateColumn: 1,
            updateIndex: e
        });
    }, e;
}(), n = [];

Component({
    properties: {
        placeholder: {
            type: String,
            value: "请选择时间"
        },
        format: {
            type: String,
            value: "YYYY-MM-DD HH:mm:ss"
        },
        native: {
            type: Boolean
        },
        pickerView: {
            type: Boolean
        },
        date: {
            type: String,
            value: new Date()
        },
        notUse: {
            type: Array
        }
    },
    externalClasses: [ "placeholder-class" ],
    data: {
        transPos: [ 0, 0, 0, 0, 0, 0 ]
    },
    attached: function() {
        var t = this;
        this.use = {}, [ "years", "months", "days", "hours", "minutes", "seconds" ].forEach(function(e) {
            -1 === (t.data.notUse || []).indexOf(e) && (t.use[e] = !0);
        }), this.setData({
            use: this.use
        }), this.data.pickerView && !this.data.native && this.showPicker();
    },
    ready: function() {
        this.setData({
            dataList: [ [ "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043" ], a(1, 12, 2), a(0, 31, 2), a(0, 23, 2), a(0, 59, 2), a(0, 59, 2) ]
        }), this.picker = new i(this.data.format, this.data.date, this.updatePicker.bind(this));
    },
    methods: {
        updatePicker: function(t) {
            var e = t.dataList, a = t.indexs, s = t.updateColumn, i = t.updateIndex, r = {};
            n = a, s && (r["transPos[" + s + "]"] = -36 * n[s], r["dataList[" + s + "]"] = e[s]), 
            void 0 !== i && (r["transPos[" + s + "]"] = -36 * n[s], r["selected[" + s + "]"] = a[s]), 
            s || void 0 !== i || (r = {
                dataList: e,
                selected: a
            }, n.forEach(function(t, e) {
                r["transPos[" + e + "]"] = 36 * -t;
            })), this.setData(r);
        },
        touchmove: function(t) {
            var e = t.changedTouches, a = t.target.dataset.col, s = e[0].clientY;
            if (a) {
                var i = {}, n = this.data.dataList[a].length;
                i["transPos[" + a + "]"] = this.startTransPos + (s - this.startY), i["transPos[" + a + "]"] >= 0 ? i["transPos[" + a + "]"] = 0 : 36 * -(n - 1) >= i["transPos[" + a + "]"] && (i["transPos[" + a + "]"] = 36 * -(n - 1)), 
                this.setData(i);
            }
        },
        touchStart: function(t) {
            var e = t.target, a = t.changedTouches, s = e.dataset.col, i = a[0];
            s && (this.startY = i.clientY, this.startTime = t.timeStamp, this.startTransPos = this.data.transPos[s]);
        },
        touchEnd: function(t) {
            var e = t.target.dataset.col;
            if (e) {
                var a = this.data.transPos[e], s = Math.round(a / 36);
                this.columnchange({
                    detail: {
                        column: +e,
                        value: -s
                    }
                });
            }
        },
        columnchange: function(t) {
            var e = t.detail, a = e.column, s = e.value;
            n[a] = s, this.picker.update(a, s, this.updatePicker.bind(this)), this.data.pickerView && !this.data.native && this.change({
                detail: {
                    value: n
                }
            });
        },
        getFormatStr: function() {
            var t = this, e = new Date();
            return [ "FullYear", "Month", "Date", "Hours", "Minutes", "Seconds" ].forEach(function(a, s) {
                var i = t.data.dataList[s][n[s]];
                "Month" === a && (i = +t.data.dataList[s][n[s]] - 1), e["set" + a](+i);
            }), s(e, this.data.format);
        },
        showPicker: function() {
            this.setData({
                show: !0
            });
        },
        hidePicker: function(t) {
            var e = t.currentTarget.dataset.action;
            this.setData({
                show: !1
            }), "cancel" === e ? this.cancel({
                detail: {}
            }) : this.change({
                detail: {
                    value: n
                }
            });
        },
        change: function(t) {
            var e = t.detail.value, a = this.data.dataList.map(function(t, a) {
                return +t[e[a]];
            });
            if (this.triggerEvent("change", {
                value: a
            }), this.data.pickerView && this.data.native) for (var s = 0; s < e.length; s++) if (n[s] !== e[s]) {
                this.columnchange({
                    detail: {
                        column: s,
                        value: e[s]
                    }
                });
                break;
            }
            this.setData({
                text: this.getFormatStr()
            });
        },
        cancel: function(t) {
            this.triggerEvent("cancel", t.detail);
        }
    }
});