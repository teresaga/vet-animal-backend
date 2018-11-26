'use strict'

var express = require('express');
var RaceController = require('../controllers/race');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-razas',RaceController.pruebas);
api.post('/race', md_auth.ensureAuth, RaceController.saveRace);
api.put('/update-race/:id',[md_auth.ensureAuth, md_admin.isAdmin], RaceController.updateRace);
api.put('/deactivate-race/:id', [md_auth.ensureAuth, md_admin.isAdmin], RaceController.deactivateRace);
api.put('/activate-race/:id', [md_auth.ensureAuth, md_admin.isAdmin], RaceController.activateRace);
api.get('/races', RaceController.getRaces);
api.get('/racesa-specie/:id', RaceController.getRacesAofSpecie);
api.get('/race/:id', RaceController.getRace);


module.exports = api;