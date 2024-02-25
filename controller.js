const path          = require('path');
const fs            = require('fs');
const Errors        = require('./system/errors');
const errors        = new Errors();

module.exports = class Controller {

    constructor() {


    }

    htmlview(file, data) {

        var sufix           = '.html',
            filename        = file + sufix,
            file            = path.join(this.viewsPath, filename);

        try {

            var fileData = fs.realpathSync(file);
            console.log(fileData);

        } catch(err) {

            var result = errors.output(4, {name: filename, file: file});
            return result;

        }

        return "hola";

    }

}
