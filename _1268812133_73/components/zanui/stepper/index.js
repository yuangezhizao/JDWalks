Component({
    properties: {
        size: String,
        stepper: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 2147483647
        },
        step: {
            type: Number,
            value: 1
        }
    },
    methods: {
        handleZanStepperChange: function(e, t) {
            var n = e.currentTarget.dataset, a = (void 0 === n ? {} : n).disabled, i = this.data.step, r = this.data.stepper;
            if (a) return null;
            "minus" === t ? r -= i : "plus" === t && (r += i), this.triggerEvent("change", r), 
            this.triggerEvent(t);
        },
        handleZanStepperMinus: function(e) {
            this.handleZanStepperChange(e, "minus");
        },
        handleZanStepperPlus: function(e) {
            this.handleZanStepperChange(e, "plus");
        },
        handleZanStepperBlur: function(e) {
            var t = this, n = e.detail.value, a = this.data, i = a.min, r = a.max;
            n ? ((n = +n) > r ? n = r : n < i && (n = i), this.triggerEvent("change", n)) : setTimeout(function() {
                t.triggerEvent("change", i);
            }, 16);
        }
    }
});