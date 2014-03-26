danta.remote = {
    get_end_point: function () {
        return danta.config.REMOTE_BASE_PATH + "/danta.php";
    },
    
    get: function () {},
    
    get_regex: function (url, regex, done) {
        $.getJSON(danta.remote.get_end_point(), 
        {fn: "get_regex", params: {url: url, regex: regex}}, function (response) {
            done(response);
        });
    }
}
