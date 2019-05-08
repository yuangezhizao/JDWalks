Component({
    properties: {
        steplist: {
            type: Object,
            observer: function(e) {}
        }
    },
    methods: {
        customMethod: function() {},
        showheader: function(e) {
            console.log(item), console.log(index);
        }
    }
});