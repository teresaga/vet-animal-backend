'use strict'

var express = require('express');
var RaceController = require('../controllers/race');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-razas',RaceController.pruebas);
api.post('/race', md_auth.ensureAuth, RaceController.saveRace);
api.put('/update-race/:id', md_auth.ensureAuth, RaceController.updateRace);
api.put('/deactivate-race/:id', md_auth.ensureAuth, RaceController.deactivateRace);
api.put('/activate-race/:id', md_auth.ensureAuth, RaceController.activateRace);
api.get('/races', RaceController.getRaces);
api.get('/racesa-specie/:id', RaceController.getRacesAofSpecie);
api.get('/race/:id', RaceController.getRace);


module.exports = api;