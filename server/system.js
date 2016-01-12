var express = require('express');
var body_parser = require('body-parser');
var session = require('express-session');

module.exports = function (self) {
    var system = self.system;

    /*
     * The profiler gets an object with the functions, config, etc
     * this is then used to create a wrapper in the client to call this functions
     * and to setup configuration
     */
    var profiler = require('./system/profiler.js');

    system.init = function (application) {
        var profile = null;
        try {
            profile = profiler(new application());
            self.config = profile.config;
        }
        catch(ex) {
            var error = self.system.error.profiler;

            console.log(error.description, '| code:', error.code);
            process.exit(error.code);
        }

        var server = express();
        server.set('port', (process.env.PORT || 5000));

        server.use(express.static('client'));
		server.use(body_parser.json());
		server.use(session({
			secret: 'danta' + new Date().getTime(),
			resave: false, saveUninitialized: false
		}));

        // entry point express route, loads index.html file
        server.get('/', function (request, response) {
            response.sendFile('client/index.html', { root: __dirname + '/../' });
        });

        // loads the danta client library
        server.get('/js/danta.js', function (request, response) {
            response.sendFile('client.js', { root: __dirname + '/../' });
        });

        // sends the danta server data: exposed public methods in the server application and the session data
        server.get('/js/danta.server.data.js', function (request, response) {
            var server_data = {
                interface: profile.functions,
                session: request.session
            };

            response.set('Content-Type', 'application/javascript');
            response.send('danta.set_server_data(' + JSON.stringify(server_data) + ');');
        });

        // main entry point express route to handle all server application method calls from the client application
        server.post('*', function (request, response) {
            var method_name = request.url.split('/')[1];
            var app = new application();

            app.config = self.config;
            app.session = request.session;
            app.init();

            app[method_name](request.body, function (error, data) {
                if(error) {
                    response.status(500).send({ error: error });
                }
                else {
                    response.status(200).send({ data: data, session: app.session });
                }
            });
        });

        server.listen(server.get('port'));
    }

    return self;
}
