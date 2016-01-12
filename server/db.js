var monk = require('monk');

module.exports = function (self) {
    var db = self.db;

    db.connect = function () {
        var config = self.config;

        if(config.db) {
            db.monk = monk(config.db);
        }
    }

    db.crud = function (params) {
        var collection = db.monk.get(params.collection);

        return new function () {
            this.create = function (data, callback) {
                collection.insert(data, callback);
            }

            this.read = function (data, callback) {
                collection.find(data, callback);
            }

            this.update = function (data, callback) {}

            this.delete = function (data, callback) {
                collection.remove(data, callback);
            }
        }
    }

	return self;
};
