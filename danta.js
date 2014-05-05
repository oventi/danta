var danta = {
    Base: { _type: "danta.Base",
        _init: function () {}
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
        n._is_danta_object = true;
        n._init(n);
        
        if("_parts" in n) {
            delete n._parts; // fix, why is it not being deleted in danta.platypus?
        }
        
        return n;
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
