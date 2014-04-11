danta.ui = {
    behavior: {
        Clickable: function (o, params) {
            var clickable = o._behaviors.Clickable(o);
            
            clickable.collection.addClass("behavior_Clickable");
            
            clickable.collection.click(function () {
                params.action($(this));
            });
        },
        
        Selectable: function (o, params) {
            var selectable = o._behaviors.Selectable(o);
            var collection = selectable.collection;
            var css = {
                selectable: "behavior_Selectable",
                selected: "behavior_Selectable_selected"
            };
            
            collection.addClass(css.selectable);
            
            if(params.multiple) {}
            else { /* single select */
                collection.click(function () {
                    collection.removeClass(css.selected);
                    $(this).addClass(css.selected);
                    
                    selectable.action(params);
                });
            }
        }
        
        /*
        Selectable: function (o, params) {
            var collection = o.selectable();
            o.selected_item = null;
            
            var onselect = function () {};
            if(typeof params.action === "function") {
                onselect = params.action;
            }
            
            if(params.multiple) { // TODO: add/remove to selected_items
                collection.click(function () {
                    $(this).toggleClass("selected");
                });
            }
            else { // single select
                collection.click(function () {
                    collection.removeClass("selected");
                    $(this).addClass("selected");
                    o.selected_index = $(this).index();
                    o.selected_item = o.items[o.selected_index];
                    onselect();
                });
            }
            
            o.get_selected = function () {
                //var selected_items = [];
                $(".selected", collection.parent()).each(function () {
                  //  
                });
            }
        }
        */
    },
    
    widget2: {
        Widget2: {
            behave: function (b, params) {
                this._behaviors.push(b);
                var behavior = danta.ui.behavior[b];
                behavior(this, params || {});
            }
        },
        List2: {
            selectable: function () {
                return this.get_view().children();
            }
        }
    },
    
    /* ********************************************************************** */
    /* ********************************************************************** */
    /* base ui objects ****************************************************** */
    
    _Widget: {
        _behave: null,
        _behaviors: {},
        
        _attach_behaviors: function () {
            this._behave = this._behave || [];
            
            this._behave.forEach(function (e, i, a) {
                var bo = danta.ui.behavior[e.behavior];
                bo(this, e.params);
            }, this);
        },
        
        behave: function (behavior, params) {
            this._behave = this._behave || [];
            if(typeof params === "undefined") {
                params = {};
            }
            
            if(this._behaviors[behavior]) {
                this._behave.push({ behavior: behavior, params: params });
            }
            else {
                throw this.id + " cannot behave " + behavior;
            }
        },
        
        render: function () {
            var dl = $("<dl />").addClass("default");
            
            for(var i in this) {
                if(this.hasOwnProperty(i) && typeof this[i] !== "function") {
                    dl.append("<dt>" + i + "</dt>");
                    dl.append("<dd>" + this[i] + "</dd>");
                }
            }
            
            this.element.append(dl);
        }
    },
    
    /* user ui objects ****************************************************** */
    
    
    
    /* widget objects/functions ********************************************* */
    
    widget: {
        Button: {
            _family: ["Base", "ui._Widget"],
            
            click: function () {},
            
            render: function () {
                var label = this.get_param("label") || "button";
                var button = $("<button />").addClass("default").text(label);
                
                button.click(this.click);
                
                this.element.empty();
                this.element.append(button);
            }
        },
        
        Buttons: {
            _family: ["Base", "ui._Widget"],
            
            actions: {},
            
            render: function () {
                var o = this;
                
                $("#" + this.id).find("button").each(function () {
                    $(this).addClass("default");
                    
                    var id = $(this).text().replace(" ", "_");
                    if(typeof o.actions[id] === "function") {
                        $(this).click(o.actions[id]);
                    }
                });
                
                /*
                $("#" + this.id).children().each(function () {
                    
                    console.log(text, id);
                    
                    
                });
                */
                //var buttons = $("#" + this.id).children();
                //var buttons = $("button", );
                //console.log(this.id);
                //console.log(typeof o);
                /*for(var i in buttons) {
                    var button = buttons[i];
                    console.log(button);
                }*/
            }
        },
        
        List: {
            _family: ["Base", "adt.List", "ui._Widget"],
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
            },
            
            render: function () {
                if(!this.is_empty()) {
                    var ul = $("<ul />").addClass("default list-unstyled");
                    
                    this._list.forEach(function (e, i, a) {
                        var view = null;
                        
                        switch(typeof e) {
                            case "object":
                                if(typeof e.get_view === "undefined") {
                                    view = e.text !== "" ? e.text : e;
                                }
                                else {
                                    view = e.get_view();
                                }
                                break;
                            default:
                                view = e;
                                break;
                        }
                        ul.append($("<li />").append(view));
                    });
                    
                    this.element.empty();
                    this.element.append(ul);
                    this._attach_behaviors();
                }
            }
        },
        
        _make: function (jo, type) { /* TODO: how can setters and getter be preserved */
            var pool = {}; var original = null;
            var eo = eval("danta." + type);
            
            if(typeof eo === "undefined") {
                original = danta.ui.widget[type];
            }
            else { original = eo; }
            
            if(typeof original === "undefined") { return {}; }
            
            var o = {}; $.extend(o, original);
            
            if("_family" in o) {
                o._family.forEach(function (e, i, a) {
                    var member = danta.ui.widget._make(null, e);
                    $.extend(pool, member);
                });
                
                delete o._family;
            }
            
            var o = $.extend(pool, o);
            
            if(jo !== null) {
                jo.addClass("widget");
                o.element = jo;
            }
            
            return o;
        }
    },
    
    /* ui functions ********************************************************* */
    
    _make_widget: function (id) {
        var jo = $("#" + id);
        var o = {};
        
        if(jo.length > 0) {
            var data = jo[0].dataset;
            
            if(data.widget) {
                if(typeof danta.ui.widget[data.widget] === "object") {
                    return danta.ui.widget._make(jo, data.widget);
                }
            }
        }
        
        throw "danta.ui.widget._make: error";
    },
    
    _autoload: function () { /* Using Bootstrap for default layout */
        var container = null;
        var row = null;
        
        container = $("<div />").addClass("container-fluid");
        
        row = $('<div class="row"></div>');
        $("header").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
        row.append($("header").detach());
        container.append(row);
        
        row = $('<div class="row"></div>');
        $("section").each(function (i, card) {
            if(!$(card).hasClass("no_auto")) {
                i+=1;
                $(card).addClass("col-xs-12 col-sm-6 col-md-6 col-lg-3");
                
                if(i%2 == 0) { $(card).addClass("m2"); }
                if(i%4 == 0) { $(card).addClass("m4"); }
            }
        });
        row.append($("section").detach());
        container.append(row);
        
        row = $('<div class="row"></div>');
        $("footer").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
        row.append($("footer").detach());
        container.append(row);
        
        $("body").append(container);
        
        /* Widgets */
        var widgets = {};
        $("[data-widget]").each(function () {
            var widget_id = $(this).attr("id");
            var widget = danta.ui._make_widget(widget_id);
            
            if(widget.get_param("autorender") === "yes") {
                widget.render();
            }
            
            widget.id = widget_id;
            widgets[widget_id] = widget;
        });
        
        return { widgets: widgets };
    }
}
