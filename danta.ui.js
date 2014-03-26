danta.ui = {
    widget: {
        no_widget: function (o) {
            o.text('widget "' + o.data("type") + '" is not defined');
            o.addClass("no_widget");
        },
        
        _base: function () {
            var _o = this.o;
            var _data = null;
            
            this.type = _o.data("type");
            
            this.render = function () {
                console.log(JSON.stringify(_data));
            }
            
            this.label = function (label) {
                var obj = _o.children().first();
                
                switch (this.type) {
                    case "table":
                        break;
                    case "textbox":
                        obj.attr("placeholder", label);
                        break;
                    default:
                        obj.text(label);
                        break;
                }
            }
            
            this.value = function (value) {
                var obj = _o.children().first();
                
                if(typeof value === 'undefined') {
                    return obj.val();
                }
                else {
                    obj.val(value);
                }
            }
            
            this.data = function (data) {
                if(typeof data === "undefined") {
                    return _data;
                }
                else {
                    _data = data;
                    this.render();
                }
            }
        },
        
        textbox: function (o) {
            this.o = o;
            danta.ui.widget._base.call(this);
            
            this.render = function () {
                var obj = null;
                
                if(o.data("multiline") === "yes") {
                    obj = $("<textarea />").addClass("form-control");
                    obj.attr("rows", o.data("rows"));
                }
                else {
                    obj = $("<input />").addClass("form-control");
                }
                
                o.append(obj);
                this.label(o.data("label"));
            }
            
            this.render();
        },
        
        checkboxes: function (o) {
            this.o = o;
            danta.ui.widget._base.call(this);
            
            this.render = function () {
                console.log(this.data());
                /*var input = $("<input />").addClass("form-control");
                
                o.append(input);
                this.label(o.data("label"));*/
            }
        },
        
        list: function (o) {
            this.o = o;
            danta.ui.widget._base.call(this);
            
            this.render = function () {
                o.empty();
                
                var data = this.data();
                var ul = $("<ul />").addClass("list-unstyled");
                
                for(var i in data) { 
                    ul.append($("<li />").text(data[i]));
                }
                
                o.append(ul);
            }
        },
        
        button: function (o) {
            this.o = o;
            danta.ui.widget._base.call(this);
            
            this.click = function (fn) {
                o.children().first().on("click", fn);
            }
            
            this.render = function () {
                var button = $("<button />").addClass("btn btn-default");
                
                o.append(button);
                this.label(o.data("label"));
            }
            
            this.render();
        },
        
        _: function () {}
        
        /*
        group: function () {},
        
        label: function (o) {
            this.ping = function () {
                console.log("this is a label");
            }
        },
        
        select: function (o) {
            var _data = null;
            o.addClass("ui select");

            this.value = function () {
                return o.val();
            }

            this.data = function (data) {
                if(data === 'undefined') {
                    return _data;
                }
                else {
                    $("option", o).remove();

                    for(var i in data) {
                        o.append($("<option />").text(data[i]));
                    }

                    _data = data;
                }
            }
        }
        */
    },
    
    autoload: function (app) {
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
            i+=1;
            $(card).addClass("col-xs-12 col-sm-6 col-md-6 col-lg-3");
            
            if(i%2 == 0) {
                $(card).addClass("m2");
            }
            if(i%4 == 0) {
                $(card).addClass("m4");
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
        $(".widget").each(function () {
            var widget_name = $(this).attr("id");
            var parts = $(this).attr("class").split(" ");
            var widget_type = parts[1];
            
            $(this).addClass("ui");
            $(this).data("type", widget_type);
            
            var constructor = danta.ui.widget[widget_type];
            if(typeof constructor == "undefined") {
                constructor = danta.ui.widget.no_widget;
            }
            
            var widget = new constructor($(this));
            
            widgets[widget_name] = widget;
        });
        
        app.widgets = widgets;
    }
}
