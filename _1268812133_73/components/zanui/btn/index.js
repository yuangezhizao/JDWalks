var t = require("../../../75BB05E131D3D4DF13DD6DE68E23D3F6.js");

Component({
    externalClasses: [ "custom-class" ],
    behaviors: [ t ],
    relations: {
        "../btn-group/index": {
            type: "parent",
            linked: function() {
                this.setData({
                    inGroup: !0
                });
            },
            unlinked: function() {
                this.setData({
                    inGroup: !1
                });
            }
        }
    },
    properties: {
        type: {
            type: String,
            value: ""
        },
        size: {
            type: String,
            value: ""
        },
        plain: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        loading: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        inGroup: !1,
        isLast: !1
    },
    methods: {
        handleTap: function() {
            this.data.disabled ? this.triggerEvent("disabledclick") : this.triggerEvent("btnclick");
        },
        switchLastButtonStatus: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.setData({
                isLast: t
            });
        }
    }
});