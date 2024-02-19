const Loyalty = require('../loyalty');

const loyalty = new Loyalty();

loyalty.conf({
    port            : 8080,
    hostname        : 'localhost',
    controllers     : './controllers',
    models          : './models',
    views           : './views'
});

loyalty.routes({
    '/': 'dashboard/index',
    '/login': 'dashboard/login'
});

loyalty.run();