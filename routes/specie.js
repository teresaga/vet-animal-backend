'use strict'

var express = require('express');
var SpecieController = require('../controllers/specie');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-especies',SpecieController.pruebas);
api.post('/specie',  md_auth.ensureAuth, SpecieController.saveSpecie);
api.put('/update-specie/:id',  [md_auth.ensureAuth, md_admin.isAdmin], SpecieController.updateSpecie);
api.put('/deactivate-specie/:id',  [md_auth.ensureAuth, md_admin.isAdmin], SpecieController.deactivateSpecie);
api.put('/activate-specie/:id',  [md_auth.ensureAuth, md_admin.isAdmin], SpecieController.activateSpecie);
api.get('/species', SpecieController.getSpecies);
api.get('/speciesa', SpecieController.getSpeciesA);
api.get('/specie/:id', SpecieController.getSpecie);


module.exports = api;