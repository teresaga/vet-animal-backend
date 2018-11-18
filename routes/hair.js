'use strict'

var express = require('express');
var HairController = require('../controllers/hair');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-pelo',HairController.pruebas);
api.post('/hair', md_auth.ensureAuth, HairController.saveHair);
api.put('/update-hair/:id', md_auth.ensureAuth, HairController.updateHair);
api.put('/deactivate-hair/:id', md_auth.ensureAuth, HairController.deactivateHair);
api.put('/activate-hair/:id', md_auth.ensureAuth, HairController.activateHair);
api.get('/hairs', HairController.getHairs);
api.get('/hairsa', HairController.getHairsA);
api.get('/hair/:id', HairController.getHair);


module.exports = api;