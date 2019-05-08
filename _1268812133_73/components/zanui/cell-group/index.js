Component({
    relations: {
        "../cell/index": {
            type: "child",
            linked: function() {
                this._updateIsLastCell();
            },
            linkChanged: function() {
                this._updateIsLastCell();
            },
            unlinked: function() {
                this._updateIsLastCell();
            }
        }
    },
    data: {
        cellUpdateTimeout: 0
    },
    methods: {
        _updateIsLastCell: function() {
            var t = this;
            if (!(this.data.cellUpdateTimeout > 0)) {
                var e = setTimeout(function() {
                    t.setData({
                        cellUpdateTimeout: 0
                    });
                    var e = t.getRelationNodes("../cell/index");
                    if (e.length > 0) {
                        var a = e.length - 1;
                        e.forEach(function(t, e) {
                            t.updateIsLastCell(e === a);
                        });
                    }
                });
                this.setData({
                    cellUpdateTimeout: e
                });
            }
        }
    }
});