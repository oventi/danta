var danta = {
    math: {
        get_random_int: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    
    app: function (app) {
        var app = new app();
        
        $(document).ready(function () {
            // autoloading ui/widgets
            danta.ui.autoload(app);
            
            app.init();
        });
    }
}
