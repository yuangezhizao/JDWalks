var t = require("../../../0A268FC731D3D4DF6C40E7C02343D3F6.js"), e = function() {};

Component({
    properties: {},
    data: Object.assign({}, t, {
        key: "",
        show: !1,
        showCustomBtns: !1,
        promiseFunc: {}
    }),
    methods: {
        handleButtonClick: function(t) {
            var o = t.currentTarget, s = (void 0 === o ? {} : o).dataset, a = void 0 === s ? {} : s, i = this.data.promiseFunc || {}, n = i.resolve, r = void 0 === n ? e : n, c = i.reject, d = void 0 === c ? e : c;
            this.setData({
                show: !1
            }), this.data.showCustomBtns ? r({
                type: a.type
            }) : "confirm" === a.type ? r({
                type: "confirm"
            }) : d({
                type: "cancel"
            });
        }
    }
});