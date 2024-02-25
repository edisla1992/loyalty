const Controller = require('../../controller');

module.exports = class Dashboard extends Controller {

    index() {

        return "<h1>Hola Mundo</h1>";

    }

    login() {

        return "<h1>Login</h1>";

    }

    user() {

        return this.htmlview('dashboards');

    }

}