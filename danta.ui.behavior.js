danta.ui.behavior = {
    Progressable: function (o, params) {
        if($(".progress", o.element).length <= 0) {
            o.element.addClass("behavior_Progressable");
            
            o.start_progress = function () { $(".progress", o.element).show(); }
            o.stop_progress  = function () { $(".progress", o.element).hide(); }
            
            var progress_bar = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div>');
            o.element.prepend(progress_bar);
        }
    },
    
    Typeable: function (o, params) {
        /*
        altGraphKey: false
        altKey: false
        charCode: 0
        ctrlKey: false
        keyCode: 8
        metaKey: false
        shiftKey: false
        which: 8               
        */
        
        var typeable = o._behaviors.Typeable(o);
        
        typeable.collection.addClass("behavior_Typeable");
        
        if(params.delay && params.action) {
            typeable.collection.keydown(_.debounce(params.action, params.delay));
        }
    },
    
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
}
