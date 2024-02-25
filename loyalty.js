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

            var e           = (i.endsWith('/') && i != '/')? i.slice(0, -1) : i, //Removed last slash
                module      = obj[i].split('/'),
                controller  = module[0] + '.js',
                func        = module[1],
                params      = [],
                index       = e;

            for(var m in module) {

                var isParam = module[m].indexOf('$');

                if(isParam == 0) {

                    params.push(module[m]);

                    index = index.replace("/" + module[m], "");

                }

            }

            this.routeObj[index] = {
                controller  : path.join(this.controllersPath, controller),
                function    : func,
                type        : 'module',
                params      : params
            }

        }

    }

}