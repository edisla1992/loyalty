
const fs            = require('fs');
const Errors        = require('./errors.js');
const errors        = new Errors();

module.exports = class Core {

    findControllers(data, callback) {

        if(typeof data.route !== 'undefined') {

            var route = data.route;

            fs.lstat(route['controller'], (err, stats) => {
            
                if(err) {

                    var result = errors.output(1, route['controller']);

                    callback(result);

                } else {

                    var dinamicController   = require(route['controller']),
                        dinamicFunc         = route['function'],
                        dinamicClass        = new dinamicController();

                    if(typeof dinamicClass[dinamicFunc] === 'undefined') {

                        var result = errors.output(2, route['function']);

                        callback(result);

                    } else {

                        var content = dinamicClass[dinamicFunc](this.param);

                        callback(content);
                    }

                }

            });

        } else {

            var result = errors.output(3);

            callback(result);

        }

    }

}