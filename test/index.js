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
    '/login': 'dashboard/login',
    '/user/get/$1/$2/$3': 'dashboard/user/$1/$2/$3'
});

loyalty.run();