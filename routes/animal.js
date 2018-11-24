'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// cargar modulo para cargar imagenes y definir carpeta donde se guardaran
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/animals' });

api.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal', md_auth.ensureAuth, AnimalController.saveAnimal);
api.put('/update-animal/:id', md_auth.ensureAuth, AnimalController.updateAnimal);
api.put('/deactivate-animal/:id', md_auth.ensureAuth, AnimalController.deactivateAnimal);
api.put('/activate-animal/:id', md_auth.ensureAuth, AnimalController.activateAnimal);
api.get('/animals', md_auth.ensureAuth, AnimalController.getAnimals);
api.get('/animals-select/:id', md_auth.ensureAuth, AnimalController.getAnimalsSelect);
api.get('/animals-client/:id', md_auth.ensureAuth, AnimalController.getAnimalsofClient);
api.get('/animalsa-client/:id', md_auth.ensureAuth, AnimalController.getAnimalsAofClient);
api.get('/animalsa', md_auth.ensureAuth, AnimalController.getAnimalsA);
api.get('/animals-count', AnimalController.getAnimalCount);
api.get('/animal/:id', AnimalController.getAnimal);
api.post('/upload-image-animal/:id', [md_auth.ensureAuth, md_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);


module.exports = api;