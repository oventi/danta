danta.ui.widget = {
    Button: {
        click: function (fn) {
            $("button", this.element).off();
            $("button", this.element).click(fn);
        },
        
        render: function () {
            var label = this.get_param("label") || "button";
            var button = $("<button />").addClass("btn btn-default").text(label);
            
            this.element.empty();
            this.element.append(button);
            this._attach_behaviors();
        }
    },
    
    List: { _id: "danta.ui.widget.List",
        _parts: [danta.adt.List],
        _methods: {
            append: function (o, list) { list._items.push(o); },
            concat: function (array, list) { list._items = list._items.concat(array); },
            remove: function (i, list) { list._items.splice(i, 1); },
            
            _get: function (o, method, args) {
                o._methods[method](args[0], o);
                o.render();
            }
        },
        _behaviors: { clickable: "ul > li", selectable: "ul > li" },
        _init: function () {
            this._items = []; // code repetition from danta.adt.List
        },
        
        /* ****************************************************************** */
        
        _items: null,
        
        render: function () {
            if(!this.is_empty()) {
                var ul = $("<ul />").addClass("list-unstyled list-group");
                
                this._items.forEach(function (e) {
                    ul.append($("<li />").addClass("list-group-item").append(e));
                });
                
                this.element.empty();
                this.element.append(ul);
                this._attach_behaviors();
            }
        }
    },
    
    /* ********************************************************************** */
    /* ********************************************************************** */
    
    Textbox: {
        _behaviors: {
            Typeable: function (w) {
                return {
                    collection: $("input", w.element)
                };
            },
            Progressable: function () {
                return {};
            }
        },

        value: function () {
            return $("input", this.element).val();
        },

        render: function () {
            var label = this.get_param("label") || "";
            var textbox = $('<input type="text" />').addClass("form-control");
            textbox.attr("placeholder", label);

            this.element.empty();
            this.element.append(textbox);
            this._attach_behaviors();
        }
    },
    
    Textbox2: {
        value: function () {
            return $("input", this.element).val();
        },

        render: function () {
            var label = this.get_param("label") || "";
            var textbox = $('<input type="text" />').addClass("form-control");
            //textbox.attr("placeholder", label);

            this.element.addClass("form-horizontal");
            this.element.empty();
            this.element.append($("<label />").addClass("col-sm-2 control-label").text(label));
            this.element.append(textbox);
            this._attach_behaviors();
        }
    },
    
    Alert: {
        _message: "",
        _type: "",

        display: function (message, type) {
            this._message = message || "";
            this._type = type || "info";

            this.render();
        },

        render: function () {
            this.element.empty();

            var msg = $("<div />").addClass("alert alert-" + this._type).text(this._message);
            this.element.append(msg);
            this.show();
        }
    },
    
    Buttons: {
        actions: {},
        render: function () {
            var o = this;

            o.element.addClass("btn-group");

            $("#" + o.id).find("button").each(function () {
                $(this).addClass("btn btn-default");

                var id = $(this).text().replace(" ", "_");
                if(typeof o.actions[id] === "function") {
                    $(this).click(o.actions[id]);
                }
            });

            //this._attach_behaviors();
        }
    },
    
    ListOld: {
        _behaviors: {
            Clickable: function (w) {
                return {
                    collection: $("ul > li", w.element)
                };
            },
            Selectable: function (w) {
                w.selected_index = -1;
                w.get_selected = function () { return null; };

                return {
                    collection: $("ul > li", w.element),
                    action: function (params) {
                        if(params.multiple) {}
                        else {
                            var index = $("ul > li.behavior_Selectable_selected", w.element).index();
                            w.selected_index = index;
                            w.get_selected = function () {
                                return w._list[w.selected_index];
                            }
                        }
                    }
                };
            }
        }
    },
    
    View: {
        _behaviors: {
            Progressable: function () { return {}; }
        },
        _data: null,

        load: function (data) {
            this._data = data;
            this.render();
        },
        
        hide: function (only_container) { 
            var e = only_container ? $(".container", this.element) : this.element;
            e.hide();
        },
        show: function (only_container) { 
            var e = only_container ? $(".container", this.element) : this.element;
            e.show();
        },

        render: function () {
            var e = this.element;
            if(this._data) {
                for(var i in this._data) {
                    $("#" + i, e).text(this._data[i]);
                }
            }

            this._attach_behaviors();
        }
    }   
}
