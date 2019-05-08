var t = require("16C2835431D3D4DF70A4EB5317D3D3F6.js");

module.exports = {
    districdata: function() {
        return new Promise(function(e, r) {
            var a = wx.getStorageSync("address3");
            if (a) return e(a);
            t.getaddress3().then(function(t) {
                200 == t.status && (wx.setStorageSync("address3", t.data), e(t.data));
            });
        });
    },
    citydata: function() {
        return new Promise(function(e, r) {
            var a = wx.getStorageSync("address2");
            if (a) return e(a);
            t.getaddress2().then(function(t) {
                200 == t.status && (wx.setStorageSync("address2", t.data), e(t.data));
            });
        });
    },
    regioninit: function() {
        return new Promise(function(e, r) {
            var a = wx.getStorageSync("address1");
            if (a) return e(a);
            t.getaddress1().then(function(t) {
                200 == t.status && (wx.setStorageSync("address1", t.data), e(t.data));
            });
        });
    }
};