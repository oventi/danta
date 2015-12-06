module.exports = function (application) {
    var app_functions = [];
    var constants = [];
    var objects = [];
    var app_config = application.config || {};

    for(var i in application) {
        var type = typeof i;
        switch(typeof application[i]) {
            case 'function':
                app_functions.push(i);
                break;
        }
    }

    return {
        functions: app_functions,
        config: app_config
    };
}
