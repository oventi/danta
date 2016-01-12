var danta = {
    system: {
        error: {
            profiler: {
                description: 'An error ocurred when profiling the application',
                code: 1
            }
        }
    },
    db: {},
    file: {}
};

require('./server/file.js')(danta);
require('./server/db.js')(danta);
require('./server/system.js')(danta);

var danta = (function (danta) {
	/*
	 * main function: creates and initializes all resources needed
	 */
	danta.app = function (application) {
        danta.system.init(application);
        danta.db.connect();
	}

	return danta;
})(danta || {});

exports.danta = danta;
