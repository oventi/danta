var http = require("http");

var danta = {};
danta.server = {
    request: function (req, res) {
        console.log("Request received.");
        
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Tea Party");
        res.end();
    }
};

http.createServer(danta.server.request).listen(8888);

console.log("Server has started.");
