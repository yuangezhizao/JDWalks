function t() {
    var t = this.data.url, a = void 0 === t ? "" : t, n = e(this.data.isLink);
    this.data.isLink && a && "true" !== a && "false" !== a && ("boolean" === n || "string" === n ? -1 !== [ "navigateTo", "redirectTo", "switchTab", "reLaunch" ].indexOf(this.data.linkType) ? wx[this.data.linkType].call(wx, {
        url: a
    }) : i("linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch", this.data.linkType) : i("isLink 属性值必须是一个字符串或布尔值", this.data.isLink));
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = function(t, e) {
    console.warn(t);
};

Component({
    externalClasses: [ "cell-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../cell-group/index": {
            type: "parent"
        }
    },
    properties: {
        title: {
            type: String,
            description: "左侧标题"
        },
        label: {
            type: String,
            description: "标题下方的描述信息"
        },
        value: {
            type: String,
            description: "右侧内容"
        },
        onlyTapFooter: {
            type: Boolean,
            description: "只有点击 footer 区域才触发 tab 事件"
        },
        isLink: {
            type: null,
            value: "",
            description: "是否展示右侧箭头并开启尝试以 url 跳转"
        },
        linkType: {
            type: String,
            value: "navigateTo",
            description: "链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch"
        },
        url: {
            type: String,
            value: ""
        }
    },
    data: {
        isLastCell: !0
    },
    methods: {
        footerTap: function() {
            this.data.onlyTapFooter && (this.triggerEvent("tap", {}), t.call(this));
        },
        cellTap: function() {
            this.data.onlyTapFooter || (this.triggerEvent("tap", {}), t.call(this));
        },
        updateIsLastCell: function(t) {
            this.setData({
                isLastCell: t
            });
        }
    }
});