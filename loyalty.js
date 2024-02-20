const http          = require('http');
const url           = require('url');
const path          = require('path');
const fs            = require('fs');
const Core          = require('./system/core.js');
const core          = new Core();

module.exports = class Loyalty {

    port;
    hostname;
    server;
    controllersPath;
    routeObj = {};
    param = {};

    constructor() {


    }

    run() {

        var server = http.createServer();

        server.on('request', (req, res) => {

            //Removed last slash
            var e = (req.url.endsWith('/') && req.url != '/')? req.url.slice(0, -1) : req.url;

            console.log(e);
            var data = {
                route: this.routeObj[e],
                res: res
            };

            core.findControllers(data, (result) => {

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(result),
                    'Content-Type': 'text/html'
                });

                res.end(result);

            });

        });

        server.listen(this.port, this.hostname);

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

            //Removed last slash
            var e = (i.endsWith('/') && i != '/')? i.slice(0, -1) : i;

            var module = obj[i].split('/');

            for(var m in module) {

                

            }

            var controller  = module[0] + '.js',
            func = module[1];

            this.routeObj[e] = {
                controller  : path.join(this.controllersPath, controller),
                function    : func,
                type        : 'module'
            }

        }

    }

    get(url, callback) {

        

    }

    url(urlPath, callback) {

        

    }


}