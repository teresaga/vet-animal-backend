'use strict'

var express = require('express');
var HabitatController = require('../controllers/habitat');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-habitats',HabitatController.pruebas);
api.post('/habitat', md_auth.ensureAuth, HabitatController.saveHabitat);
api.put('/update-habitat/:id',[md_auth.ensureAuth, md_admin.isAdmin], HabitatController.updateHabitat);
api.put('/deactivate-habitat/:id', [md_auth.ensureAuth, md_admin.isAdmin], HabitatController.deactivateHabitat);
api.put('/activate-habitat/:id', [md_auth.ensureAuth, md_admin.isAdmin], HabitatController.activateHabitat);
api.get('/habitats', HabitatController.getHabitats);
api.get('/habitatsa', HabitatController.getHabitatsA);
api.get('/habitat/:id', HabitatController.getHabitat);


module.exports = api;