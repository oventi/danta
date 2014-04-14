var danta = {
    Base: {
        get_param: function (key) {
            if(key in this) {
                return this[key];
            }
            else {
                if(this.element) { // has a jQuery object associated
                    return this.element.data(key);
                }
                
                return null;
            }
        }
    },
    
    adt: { /* abstract data type */
        List: {
            _list: null,
            _get: function () {
                if(this._list === null) {
                    this._list = [];
                }
                
                return this._list;
            },
            
            is_empty: function () {
                return this._get().length <= 0;
            },
            
            /* prepend: function () {}, */
            
            append: function (item, times) {
                if(arguments.length >=2 ) {
                    for(var i = 0; i < times; i++) {
                        this._get().push(item);
                    }
                }
                else {
                    this._get().push(item);
                }
            },
            
            concat: function (arr) {
                this._get();
                this._list = this._list.concat(arr);
            },
            
            /*
            head: function () {
                return this._get()[0];
            },
            */
            /* 
             * an operation for referring to the list consisting of all the components 
             * of a list except for its first (this is called the "tail" of the list.)
             * 
             * tail: function () {},
             */
            
            size: function () {
                return this._get().length;
            },
            
            get: function (i) {
                if(arguments.length == 1) {
                    return this._get()[i];
                }
                
                return this._get();
            },
            
            set: function (i, item) {
                var list = this._get();
                list[i] = item;
            },
            
            empty: function () {
                delete this._list;
                this._list = [];
            },
            
            has: function (item) {
                var has = false;
                
                this._list.forEach(function (e, i, a) {
                    var o1 = JSON.stringify(e);
                    var o2 = JSON.stringify(item);
                    
                    //console.log(o1, o2, o1 === o2);
                    
                    if(o1 === o2) {
                        has = true;
                    }
                });
                
                return has;
            }
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
        }
    },
    
    $: {
        attach: function (data) {
            console.log("attaching... ", data);
        }
    },
    
    init_helpers: function () {
        //Array.prototype.shuffle = danta.Array.shuffle;
        //Array.prototype = $.extend(Array.prototype, danta.Array);
        
        $.extend(Array.prototype, danta.Array);
        $.extend(Math, danta.Math);
        //$.fn.extend(danta.$);
    },
    
    app: function (app) {
        this.init_helpers();
        
        $(document).ready(function () {
            var fn = function () {} // TODO: make $w() create widgets and $w.x reference them
            
            // autoloading ui/widgets
            var ui = danta.ui._autoload();
            
            var _app = new app(danta, ui.widgets);
            danta.caller = _app;
            
            _app.init();
        });
    }
}
