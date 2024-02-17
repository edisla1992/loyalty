const http      = require('http');
var url         = require('url');
var path        = require('path');

module.exports = class Loyalty {

    port;
    hostname;
    server;
    controllersPath;
    routeObj = {};
    param = {};

    constructor(obj) {

        this.port = obj.port;
        this.hostname = obj.hostname;

    }

    run() {

        var server = http.createServer();

        server.on('request', (req, res) => {     

            var url = this.routeObj[req.url];

            if(typeof url !== 'undefined') {

                if(url['type'] === 'module') {

                    var dinamicController   = require(url['controller']),
                        dinamicFunc         = url['function'],
                        dinamicClass        = new dinamicController();
                        
                    var content = dinamicClass[dinamicFunc](this.param);
                    
                    // res.end(content);

                }

            } else {

                res.writeHead(400);
                res.end();

            }

        });

        server.listen(this.port, this.hostname);

    }

    conf(obj) {

        if(typeof obj !== 'undefined') {

            if(typeof obj.controllers !== 'undefined') {

                this.controllersPath = path.resolve(obj.controllers);

            }

        }

    }

    routes(obj) {

        for(var i in obj) {

            var module      = obj[i].split('/'),
            controller      = module[0] + '.js',
            func            = module[1];

            this.routeObj[i] = {
                controller  : path.join(this.controllersPath, controller),
                function    : func,
                type        : 'module'
            }

        }

    }

    get(url, callback) {

        

    }

    callback(req, res) {

        if(typeof callback !== 'undefined') {

            var obj = {
                text: (output) => {
                    res.end(output);
                }
            };

            callback(obj);

        }

    }

    url(urlPath, callback) {

        

    }


}