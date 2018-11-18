'use strict'

var express = require('express');
var HabitatController = require('../controllers/habitat');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-habitats',HabitatController.pruebas);
api.post('/habitat', md_auth.ensureAuth, HabitatController.saveHabitat);
api.put('/update-habitat/:id', md_auth.ensureAuth, HabitatController.updateHabitat);
api.put('/deactivate-habitat/:id', md_auth.ensureAuth, HabitatController.deactivateHabitat);
api.put('/activate-habitat/:id', md_auth.ensureAuth, HabitatController.activateHabitat);
api.get('/habitats', HabitatController.getHabitats);
api.get('/habitatsa', HabitatController.getHabitatsA);
api.get('/habitat/:id', HabitatController.getHabitat);


module.exports = api;