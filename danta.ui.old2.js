danta.ui = {
    
    Widget: {
        render: function () {
            var dl = $("<dl />").addClass("default_render");
            
            for(var i in this) {
                if(this.hasOwnProperty(i) && typeof this[i] !== "function") {
                    dl.append("<dt>" + i + "</dt>");
                    dl.append("<dd>" + this[i] + "</dd>");
                }
            }
            
            this.element.append(dl);
        }
    },
    
    behavior: {
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
    },
    
    widget: {
        create: function (jo, type) { /* TODO: how can setters and getter be preserved */
            var pool = {};
            var original = null;
            
            //console.log("type", type);
            
            var eo = eval("danta." + type);
            
            if(typeof eo === "undefined") {
                original = danta.ui.widget[type];
            }
            else {
                original = eo;
            }
            
            //console.log("danta." + type, original);
            
            if(typeof original === "undefined") {
                return {};
            }
            
            var o = {}; $.extend(o, original);
            
            if("_family" in o) {
                o._family.forEach(function (e, i, a) {
                    //console.log(i, e);
                    var member = danta.ui.widget.create(null, e);
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
        },
        
        
        Widget2: {
            element: null,
            _view: null,
            _behaviors: [],
            
            render: function () {
                /*
                this.element.empty();
                this._view = null;
                
                if(this.get_param("title")) {
                    this.element.append($("<h3 />").text(this.get_param("title")));
                }
                this.element.append(this.get_view());
                var that = this;
                this._behaviors.forEach(function (e, i, a) {
                    that.behave(e);
                });
                */
            },
            
            behave: function (b, params) {
                this._behaviors.push(b);
                var behavior = danta.ui.behavior[b];
                behavior(this, params || {});
            }
        },
        
        Button: {
            _family: ["Widget"],
            
            get_view: function () {
                var button = $("<button />");
                button.text(this.get_param("label") || "button");
                
                var action = function () {};
                if(this.get_param("action")) {
                    var that = this;
                    action = function () {danta.call(that.get_param("action"));};
                }
                button.click(action);
                
                return button;
            }
        },
        
        List: {
            _family: [
                "Base", "adt.List", "ui.Widget"
            ],
            
            render: function () {
                if(!this.is_empty()) {
                    var ul = $("<ul />").addClass("list-unstyled");
                    
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
                }
            }
        },
        
        List2: {
            _family: ["Widget"],
            items: [],
            
            selectable: function () {
                return this.get_view().children();
            },
            
            add: function (items) {
                if(items instanceof Array) {                 
                    this.items = this.items.concat(items);
                }
                else {
                    this.items.push(items);
                }
            }
            
            
        }
        
    },
    
    make_widget: function (id) {
        var jo = $("#" + id);
        var o = {};
        
        if(jo.length > 0) {
            var data = jo[0].dataset;
            
            if(data.widget) {
                if(typeof danta.ui.widget[data.widget] === "object") {
                    return danta.ui.widget.create(jo, data.widget);
                }
            }
        }
        
        throw "danta.ui.make_widget: error";
    },
    
    autoload: function () {
        /* Using Bootstrap for default layout */
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
                
                if(i%2 == 0) {$(card).addClass("m2");}
                if(i%4 == 0) {$(card).addClass("m4");}
            }
        });
        row.append($("section").detach());
        container.append(row);

        row = $('<div class="row"></div>');
        $("footer").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
        row.append($("footer").detach());
        container.append(row);

        $("body").append(container);
        
        /*
        // collapsible cards
        $("body > section > h2").each(function () {
            var parent = $(this).parent();
            if(!parent.hasClass("non-collapsible")) {
                $(this).click(function () {
                    $("div", parent).first().toggle();
                });
            }
        });
        */
        
        /* Widgets */
        var widgets = {};
        $("[data-widget]").each(function () {
            var widget_id = $(this).attr("id");
            var widget = danta.ui.make_widget(widget_id);
            
            if(widget.get_param("autorender") === "yes") {
                widget.render();
            }
            
            widget.id = widget_id;
            
            widgets[widget_id] = widget;
        });
        
        return {widgets: widgets};
    }
}
