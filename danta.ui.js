danta.ui = {
    
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
        Textbox: {
            _family: ["Base", "ui._Widget"],
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
                var textbox = $('<input type="text" />').addClass("form-control");
                
                this.element.empty();
                this.element.append(textbox);
                this._attach_behaviors();
            }
        },
        
        MessageBox: {
            _family: ["Base", "ui._Widget"],
            _message: "",
            
            display: function (message) {
                this._message = message;
                this.render();
            },
            
            render: function () {
                this.element.addClass("message");
                var msg = $("<div />").text(this._message);
                
                this.element.empty();
                this.element.append(msg);
                this._attach_behaviors();
            }
        },
        
        Button: {
            _family: ["Base", "ui._Widget"],
            
            click: function () {},
            
            render: function () {
                var label = this.get_param("label") || "button";
                var button = $("<button />").addClass("btn btn-default").text(label);
                
                button.click(this.click);
                
                this.element.empty();
                this.element.append(button);
                this._attach_behaviors();
            }
        },
        
        Buttons: {
            _family: ["Base", "ui._Widget"],
            
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
                    var ul = $("<ul />").addClass("list-unstyled list-group");
                    
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
                        ul.append($("<li />").addClass("list-group-item").append(view));
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
        
        // @TODO: how should the header and footer be styled?
        
        if(!$("body").hasClass("no_autoload")) {
            container = $("<div />").addClass("container-fluid");
            
            row = $('<div class="row"></div>');
            
            //$("header").addClass("page-header");
            $("header").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
            
            row.append($("header").detach());
            container.append(row);
            
            row = $('<div class="row"></div>');
            $("section").each(function (i, card) {
                if(!$(card).hasClass("no_autoload")) {
                    i+=1;
                    /*
                     * Default stacking of cards:
                     *      mobile: one
                     *      tablet: two
                     *      desktop: four
                     */
                    $(card).addClass("jumbotron col-xs-12 col-sm-6 col-md-6 col-lg-3");

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
        }
        
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
