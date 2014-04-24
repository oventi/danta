danta.ui.widget = {
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
    },

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

    Button: {
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

    List2: {},

    List: { _uuid: "danta.ui.widget.List",
        _parts: [danta.adt.List],
        _init: function () {
            this._items = []; // code repetition from danta.adt.List
        },
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

                this._items.forEach(function (e, i, a) {
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
    }
}
