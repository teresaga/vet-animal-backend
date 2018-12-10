'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3789;

mongoose.Promise = global.Promise;
//mongodb://localhost:27017/vet_animal
//mongodb://teresagalaviz:teresa1997@ds051665.mlab.com:51665/vet_animal
mongoose.connect('mongodb://teresagalaviz:teresa1997@ds051665.mlab.com:51665/vet_animal')
	.then(() => {
		console.log("La conexión a la base de datos vet_animal se ha realizado correctamente..");
		
		//Creacion del servidor
		app.listen( process.env.PORT || port, () => {
			console.log("El servidor local con Node y Express esta corriendo correctamente...")
		});
	})
	.catch(err => console.log(err));
