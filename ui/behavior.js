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
    
    clickable: function (o, params) {
        var affected = $(o._behaviors.clickable, o.element);
        
        affected.addClass("clickable");
        affected.click(function () { params.action($(this)); });
    },
    
    selectable: function (o, params) {
        var affected = $(o._behaviors.selectable, o.element);
        var css = {
            selectable: "selectable",
            selected: "selectable_selected"
        };
        
        affected.addClass(css.selectable);
        
        if(params.multiple) {}
        else { /* single select */
            affected.click(function () {
                affected.removeClass(css.selected);
                $(this).addClass(css.selected);
                
                o.selected = $(this);
            });
        }
    }
}
