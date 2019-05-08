var t = require("0A268FC731D3D4DF6C40E7C02343D3F6.js");

module.exports = function(e, o) {
    var n = Object.assign({}, t, e), r = o;
    if (!r) {
        var s = getCurrentPages();
        r = s[s.length - 1];
    }
    var c = r.selectComponent(n.selector);
    if (!c) return console.error("无法找到对应的dialog组件，请于页面中注册并在 wxml 中声明 dialog 自定义组件"), 
    Promise.reject({
        type: "component error"
    });
    var i = n.buttons, u = void 0 === i ? [] : i, a = !1;
    if (0 === u.length) {
        if (n.showConfirmButton && u.push({
            type: "confirm",
            text: n.confirmButtonText,
            color: n.confirmButtonColor
        }), n.showCancelButton) {
            var l = {
                type: "cancel",
                text: n.cancelButtonText,
                color: n.cancelButtonColor
            };
            n.buttonsShowVertical ? u.push(l) : u.unshift(l);
        }
    } else a = !0;
    return new Promise(function(t, e) {
        c.setData(Object.assign({}, n, {
            buttons: u,
            showCustomBtns: a,
            key: "" + new Date().getTime(),
            show: !0,
            promiseFunc: {
                resolve: t,
                reject: e
            }
        }));
    });
};