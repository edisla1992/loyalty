# Loyalty Framework
Loyalty es un framework de Node creado para la programacion MVC (Modelo, Vista, Controlador), fue creado para facilitar y organizar el trabajo, tambien para esos programadores que estan acostumbrados al esquema MVC.

## Instalacion
Para descargar el framework solo tienes que usar composer:

`composer require loyaltyjs/loyalty`

## Inicio

Para iniciar solo tienes que crear un archivo principal y dentro llamar el framework:

`const Loyalty = require('Loyalty')`

Y luego inicializar la clase:

`const loyalty = new Loyalty()`

## Configuracion

Luego de iniciar se requerira iniciar la configuracion para poder trabajar en el framework. En la configuracion es obligatiorio colocar el `hostname` y el `port` seguido de la carpetas donde van a estar ubicados los controlodaros, modelos y vistas ejemplo:

```
loyalty.conf({
    hostname: 'localhost',
    port: 8080,
    controllers: './controllers',
    models: './models',
    views: './views'
});
```

Las carpetas de los controladores, modelos y vistas se pueden colocar donde quieras y llamarlas como quieras.

## Rutas
Las rutas son indispensables y llaman directamente a los controladores, ejemplo:

```
loyalty.routes({
    '/': 'dashboard/index',
    '/login': 'dashboard/login'
});
```

## Run
El framework solo se ejecutara cuando coloques al final el iniciador:

`loyalty.run();`