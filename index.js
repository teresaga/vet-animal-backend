'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/vet_animal')
	.then(() => {
		console.log("La conexión a la base de datos vet_animal se ha realizado correctamente..");
		
		//Creacion del servidor
		app.listen(port, () => {
			console.log("El servidor local con Node y Express esta corriendo correctamente...")
		});
	})
	.catch(err => console.log(err));
