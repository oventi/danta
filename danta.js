var danta = {
    Base: { _type: "danta.Base",
        _init: function () {},
        get_dto: function () {
            /* if the object is a Ui widget */
            if("element" in this) { delete this.element; }
            
            var dto = JSON.parse(JSON.stringify(this));
            for(var i in dto) { if(i.indexOf("_") !== -1) { delete dto[i]; } }
            
            return dto;
        },
        
        serialize: function () {
            return JSON.stringify(this.get_dto());
        }
    },
    
    /* implements multiple inheritance */
    platypus: function (_o) {
        var o = Object.create(_o);
        var pool = {};
        
        if("_parts" in o) {
            o._parts.forEach(function (part) { $.extend(pool, danta.platypus(part)); });
            delete o._parts;
            
            return $.extend(pool, o);
        }
        else {
            return o;
        }
    },
    o: function (_o, properties) {
        var o = Object.create(_o);
        
        if(!("_parts" in o)) { o._parts = []; }
        o._parts.push(danta.Base);
        
        var n = danta.platypus(o);
        if(typeof properties === "object") { $.extend(n, properties); }
        n._init(n);
        
        if("_parts" in n) {
            delete n._parts; // fix, why is it not being deleted in danta.platypus?
        }
        
        return n;
    },
    
    data: {
        Store: { _type: "danta.data.Store",
            id: "danta.data.Store",
            data: null,
            autosave: false,
            
            get_data: function () {
                return this.data.get();
            },
            
            put: function (o) {
                var dto = null;
                
                if("get_dto" in o && typeof o.get_dto === "function") {
                    dto = o.get_dto();
                }
                else {
                    dto = o;
                }
                
                this.data.append(dto);
                
                if(this.autosave) { this.save(); }
            },
            
            remove: function (o) {
                this.data.get().forEach(function (item, i, items) {
                    if(JSON.stringify(item) === o.serialize()) { items.splice(i, 1); }
                });
                
                if(this.autosave) { this.save(); }
            },
            
            save: function () {
                delete localStorage[this.id];
                localStorage[this.id] = JSON.stringify(this.data.get());
            },
            
            _init: function () {
                this.data = danta.o(danta.adt.List);
                
                if(localStorage[this.id]) {
                    this.data.concat(JSON.parse(localStorage[this.id]));
                }
            }
        }
    },
    
    app: function (app) {
        this.helper.init();
        
        $(document).ready(function () {
            /* autoloading ui/widgets */
            var autoload = danta.ui._autoload();
            
            /* 
             * $w.x: access declared widgets html
             * $w(): creates widget
             */
            var wrapper = danta.ui.widget.wrapper(autoload);
            
            var _app = new app(danta, wrapper);
            _app.init();
        });
    }
}
