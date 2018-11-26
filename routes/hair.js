'use strict'

var express = require('express');
var HairController = require('../controllers/hair');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-pelo',HairController.pruebas);
api.post('/hair', md_auth.ensureAuth, HairController.saveHair);
api.put('/update-hair/:id', [md_auth.ensureAuth, md_admin.isAdmin], HairController.updateHair);
api.put('/deactivate-hair/:id', [md_auth.ensureAuth, md_admin.isAdmin], HairController.deactivateHair);
api.put('/activate-hair/:id', [md_auth.ensureAuth, md_admin.isAdmin], HairController.activateHair);
api.get('/hairs', HairController.getHairs);
api.get('/hairsa', HairController.getHairsA);
api.get('/hair/:id', HairController.getHair);


module.exports = api;