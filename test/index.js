const Loyalty = require('../loyalty');

const loyalty = new Loyalty({
    port: 8080,
    hostname: 'localhost'
});

loyalty.conf({
    controllers   : './controllers',
    modules       : './modules',
    views         : './views',
    libraries     : './'
});

loyalty.routes({
    '/': 'dashboard/index'
});

loyalty.run();