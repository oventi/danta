var danta = (function (danta) {
	danta.set_server_data = function (data) {
		danta.server = data;
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
