var request = require('request');

module.exports = function (self) {
    var file = self.file;

    file.get_url = function (url, callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        });
    }

    return self;
};
