const http          = require('http');
const url           = require('url');
const path          = require('path');
const fs            = require('fs');

module.exports = class Loyalty {

    port;
    hostname;
    server;
    controllersPath;
    routeObj = {};
    param = {};

    constructor(obj) {


    }

    run() {

        var server = http.createServer();

        server.on('request', (req, res) => {

            var data = {
                route: this.routeObj[req.url],
                res: res
            };

            this.findControllers(data, (result) => {

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(result),
                    'Content-Type': 'text/html'
                });

                res.end(result);

            });
            

        });

        server.listen(this.port, this.hostname);

    }

    findControllers(data, callback) {

        if(typeof data.route !== 'undefined') {

            var route = data.route;

            fs.lstat(route['controller'], (err, stats) => {

                if(err) {

                    var result = this.errors(1, route['controller']);

                    callback(result);

                } else {

                    var dinamicController   = require(route['controller']),
                        dinamicFunc         = route['function'],
                        dinamicClass        = new dinamicController();

                        if(typeof dinamicClass[dinamicFunc] === 'undefined') {

                            var result = this.errors(2, route['function']);

                            callback(result);

                        } else {

                            var content = dinamicClass[dinamicFunc](this.param);

                            callback(content);
                        }

                }

            });

        }

    }

    errors(code, data) {

        var result;

        switch(code) {
            case 1:
                result = "<h2>Controller no found</h2><br>" + data;
                break;
            case 2:
                result = "<h2>Function no found</h2><br>" + data;
                break;
        }

        return result;

    }

    conf(obj) {

        this.port = obj.port;
        this.hostname = obj.hostname;

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