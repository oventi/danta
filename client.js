var danta = (function (danta) {
    danta.set_server_data = function (data) {
        danta.server = data;
    }

    danta.util = {
        // http://stackoverflow.com/a/10073788
        pad: function (n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
    };

    danta.date = {
        // datetime: yyyy-mm-dd hh:mm
        convert: function (datetime, from_tz, to_tz) {
            var pad = danta.util.pad;

            var parts = datetime.replace(/\-/g, ' ').replace(':', ' ').split(' ');
            for(var i in parts) {
                parts[i] = parseInt(parts[i]);
            }

            var dt = new Date(Date.UTC(parts[0], parts[1]-1, parts[2], parts[3], parts[4]));
            dt.setHours(dt.getHours() - (from_tz - to_tz));

            var new_dt = dt.getUTCFullYear() + '-' + pad(dt.getUTCMonth() + 1, 2) + '-' + pad(dt.getUTCDate(), 2);
            new_dt += ' ' + pad(dt.getUTCHours(), 2) + ':' + pad(dt.getUTCMinutes(), 2);

            return new_dt;
        }
    }

    danta.app = function (danta_application) {
    	var application = new danta_application();
    	application.session = danta.server.session;

    	danta.server.interface.forEach(function (e, i, a) {
            if(e === 'init') {
                return false;
            }

            application[e] = function () {
            	var params = arguments[0];
            	var callback = arguments[1];

            	if(typeof params === 'object' && typeof callback === 'function') {
                    if(params === null) {
                        params = {};
                    }

                    $.ajax({ type: 'post', url: '/' + e, data: JSON.stringify(params),
                    	contentType: 'application/json',
                    	success: function (response) {
                    		application.session = response.session;
                    		callback(response.error, response.data);
                    	},
                        error: function (jqxhr, status, error) {
                            // show error
                        }
                    });
            	}
            	else {
                    throw 'danta.server: a server function needs params and a callback';
            	}
            }
    	});

    	application.init();

    	return application;
    }

    return danta;
})(danta || {});
