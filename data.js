danta.data = {
    Store: { _type: "danta.data.Store",
        id: "danta.data.Store",
        data: null,
        
        find: function () { return this.data.get(); },
        
        insert: function (o) {
            if(typeof o !== "object") {
                throw this._type + " error: you can only insert objects";
            }
            else {
                this.data.append(danta.data.o(o));
                this._save();
            }
        },
        
        remove: function (query) {
            if(JSON.stringify(query) === "{}") { this.data.empty(); }
            else {
                var new_data = _.reject(this.find(), function (o) {
                    return _.findWhere([o], query) !== undefined;
                });
                
                this.data.empty();
                this.data.concat(new_data);
            }
            this._save();
        },
        
        _save: function () {
            delete localStorage[this.id];
            localStorage[this.id] = JSON.stringify(this.find());
        },
        
        _init: function () {
            this.data = danta.o(danta.adt.List);
            
            if(localStorage[this.id]) {
                this.data.concat(JSON.parse(localStorage[this.id]));
            }
        }
    },
    
    o: function (o) {
        if(o._is_danta_object) {
            /* if the object is a Ui widget */
            if("element" in o) { delete o.element; }

            var o = JSON.parse(JSON.stringify(o));
            for(var i in o) { if(i.indexOf("_") !== -1) { delete o[i]; } }

            return o;
        }
        else {
            return o;
        }
    }
    
    /*serialize: function (o) {
        // if the object is a Ui widget
        if("element" in o) { delete o.element; }
        
        var o = JSON.parse(JSON.stringify(o));
        for(var i in o) { if(i.indexOf("_") !== -1) { delete o[i]; } }
        
        return JSON.stringify(o);
    }*/
};
