var t = require("../../16C2835431D3D4DF70A4EB5317D3D3F6.js");

Component({
    externalClasses: [ "shadow", "page-container-padding", "czb", "mvbutton" ],
    properties: {
        systime: {
            type: Number
        },
        taskList: {
            type: Array,
            observer: function(t) {
                var e = t, s = t[0].systime;
                e.length && (e.forEach(function(t, e) {
                    switch (1 * t.state) {
                      case 1:
                        a = {
                            disabled: !1,
                            text: "领取奖励",
                            class: "toget"
                        };
                        break;

                      case 2:
                        if (s > t.validate) {
                            a = {
                                disabled: !0,
                                text: "新人专享",
                                class: "disabled"
                            };
                            break;
                        }
                        a = {
                            disabled: !1,
                            text: "去完成",
                            class: "todo"
                        };
                        break;

                      case 3:
                        var a = {
                            disabled: !0,
                            text: "已完成",
                            class: "disabled"
                        };
                    }
                    t.button = a;
                }), this.setData({
                    taskList: e
                }));
            }
        }
    },
    methods: {
        handleTask: function(e) {
            var s = this;
            switch (e.currentTarget.dataset.item.button.class) {
              case "todo":
                t.jump(e.currentTarget.dataset.item.jumpurl);
                break;

              case "toget":
                t.taskBonus({
                    tid: e.currentTarget.dataset.item.id
                }).then(function(e) {
                    200 == e.status ? s.triggerEvent("refreshTask", e) : t.ALERT(e.message);
                });
            }
        },
        handleTaskList: function() {}
    },
    attached: function() {}
});