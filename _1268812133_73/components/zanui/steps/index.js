var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var s = arguments[e];
        for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && (t[r] = s[r]);
    }
    return t;
};

Component({
    options: {
        addGlobalClass: !0
    },
    externalClasses: [ "custom-class" ],
    properties: {
        icon: String,
        steps: {
            type: Array,
            observer: function() {
                this.formatSteps();
            }
        },
        active: {
            type: Number,
            observer: function() {
                this.formatSteps();
            }
        },
        direction: {
            type: String,
            value: "horizontal"
        },
        activeColor: {
            type: String,
            value: "#06bf04"
        }
    },
    attached: function() {
        this.formatSteps();
    },
    methods: {
        formatSteps: function() {
            var e = this, s = this.data.steps.map(function(s, r) {
                return t({}, s, {
                    status: e.getStatus(r)
                });
            });
            this.setData({
                formattedSteps: s
            });
        },
        getStatus: function(t) {
            var e = this.data.active;
            return t < e ? "finish" : t === e ? "process" : "";
        }
    }
});