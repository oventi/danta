var danta = {
    Base: { _id: "danta.Base",
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
    o: function (_o) {
        var o = Object.create(_o);
        
        if(!("_parts" in o)) { o._parts = []; }
        o._parts.push(danta.Base);
        
        var n = danta.platypus(o);
        n._init(n);
        if("_parts" in n) {
            delete n._parts; // fix, why is it not being deleted in danta.platypus?
        }
        
        return n;
    },
    
    cache: {
        _stack: {},
        
        get: function (key) {
            if(danta.cache._stack[key]) {
                return danta.cache._stack[key];
            }
        },
        
        set: function (key, value) {
            danta.cache._stack[key] = value;
        }
    },
    
    Math: {
        get_random_int: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    
    Array: {
        // http://stackoverflow.com/a/10142256
        shuffle: function () {
            for(
                var j, x, i = this.length; i;
                j = Math.floor(Math.random() * i), 
                x = this[--i], this[i] = this[j], this[j] = x
            );

            return this;
        },
        
        empty: function() {
            while (this.length > 0) { this.pop(); }
        }
    },
    
    init_helpers: function () {
        $.extend(Array.prototype, danta.Array);
        $.extend(Math, danta.Math);
    },
    
    app: function (app) {
        this.init_helpers();
        
        $(document).ready(function () {
            var fn = function () {} // TODO: make $w() create widgets and $w.x reference them
            
            // autoloading ui/widgets
            var al = danta.ui._autoload();
            
            var widget = danta.ui._widget;
            for(var w in al.widgets) {
                widget[w] = al.widgets[w];
            }
            
            var _app = new app(danta, widget);
            danta.caller = _app;
            
            _app.init();
        });
    }
}
