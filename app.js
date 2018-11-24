'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var worker_routes = require('./routes/worker');
var job_routes = require('./routes/job');
var typeProductos_routes = require('./routes/typeproduct');
var specie_routes = require('./routes/specie');
var race_routes = require('./routes/race');
var unit_routes = require('./routes/measurementunit');
var hair_routes = require('./routes/hair');
var habitat_routes = require('./routes/habitat');
var character_routes = require('./routes/character');
var provider_routes = require('./routes/provider');
var product_routes = require('./routes/product');
var client_routes = require('./routes/client');
var animal_routes = require('./routes/animal');
var consultas_routes = require('./routes/consultas');
var activity_routes = require('./routes/activity');
var sale_routes = require('./routes/sale');

// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Authorization, X-API-KEY, Origin, X-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', worker_routes);
app.use('/api', job_routes);
app.use('/api', typeProductos_routes);
app.use('/api', specie_routes);
app.use('/api', race_routes);
app.use('/api', unit_routes);
app.use('/api', hair_routes);
app.use('/api', habitat_routes);
app.use('/api', character_routes);
app.use('/api', provider_routes);
app.use('/api', product_routes);
app.use('/api', client_routes);
app.use('/api', animal_routes);
app.use('/api', consultas_routes);
app.use('/api', activity_routes);
app.use('/api', sale_routes);

module.exports = app;