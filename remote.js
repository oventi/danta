danta.remote = {
    call: function (fn, params, done) {
        params["fn"] = fn;
        $.post(danta.config.REMOTE_BASE_PATH, params, done, "json");
    }
};
