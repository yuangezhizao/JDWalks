var s = {
    show: !1,
    message: "",
    icon: "",
    image: "",
    mask: !1
}, a = [ "loading", "success", "fail" ];

Component({
    data: Object.assign({}, s),
    methods: {
        show: function(s) {
            var e = Object.assign({}, s), t = s.icon || "", i = s.image || "";
            a.indexOf(s.type) > -1 && (t = s.type, i = ""), this.setData(Object.assign({}, e, {
                icon: t,
                image: i
            }));
        },
        clear: function() {
            this.setData(Object.assign({}, s));
        }
    }
});