var danta = {
    system: {},
    db: {}
};

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
