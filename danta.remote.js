danta.remote = {
    get_end_point: function () {
        return danta.config.REMOTE_BASE_PATH;
    },
    
    call: function (fn, params, done) {
        params["fn"] = fn;
        $.post(danta.config.REMOTE_BASE_PATH, params, done);
    }
    
    /*
    get2: function (path, done) {
        $.get(danta.config.REMOTE_BASE_PATH + path, {}, function (response) {
            console.log("RESPONSE!");
            done(response);
        });
    },
    
    get_regex: function (url, regex, done) {
        $.getJSON(danta.remote.get_end_point(), 
        {fn: "get_regex", params: {url: url, regex: regex}}, function (response) {
            done(response);
        });
    }
    */
}
