Component({
    options: {
        addGlobalClass: !0
    },
    externalClasses: [ "custom-class" ],
    properties: {
        info: null,
        name: String,
        size: String,
        color: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        }
    },
    methods: {
        onClick: function() {
            this.triggerEvent("click");
        }
    }
});