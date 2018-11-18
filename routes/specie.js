'use strict'

var express = require('express');
var SpecieController = require('../controllers/specie');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-especies',SpecieController.pruebas);
api.post('/specie', md_auth.ensureAuth, SpecieController.saveSpecie);
api.put('/update-specie/:id', md_auth.ensureAuth, SpecieController.updateSpecie);
api.put('/deactivate-specie/:id', md_auth.ensureAuth, SpecieController.deactivateSpecie);
api.put('/activate-specie/:id', md_auth.ensureAuth, SpecieController.activateSpecie);
api.get('/species', SpecieController.getSpecies);
api.get('/speciesa', SpecieController.getSpeciesA);
api.get('/specie/:id', SpecieController.getSpecie);


module.exports = api;