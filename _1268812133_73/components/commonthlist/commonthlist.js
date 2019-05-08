Component({
    externalClasses: [ "page-container-padding", "page-container-margin" ],
    properties: {
        list: {
            type: Object,
            observer: function(t) {
                var e = this.formatlist(t);
                this.setData({
                    showlist: e
                });
            }
        }
    },
    data: {
        showlist: []
    },
    methods: {
        customMethod: function() {},
        formatlist: function(t) {
            return t.forEach(function(t, e) {
                var n = new Date(1e3 * t.create_time), o = n.getFullYear() + "年", a = n.getMonth() + 1 + "月", r = n.getDate() + "日", s = n.getHours(), i = n.getMinutes();
                s < 10 && (s = "0" + s), i < 10 && (i = "0" + i), t.recorddate = a + r + " " + s + ":" + i, 
                t.curMounth = o + a, t.month = a;
            }), t;
        }
    }
});