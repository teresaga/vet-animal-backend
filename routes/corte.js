'use strict'

var express = require('express');
var CorteController = require('../controllers/corte');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

api.get('/pruebas-corte', CorteController.pruebas);
api.post('/corte',  md_auth.ensureAuth , CorteController.saveCorteStart);
api.put('/update-corte/:id', md_auth.ensureAuth, CorteController.updateCorte);
api.get('/cortes', md_auth.ensureAuth, CorteController.getCortes);
api.get('/ultimo-corte', md_auth.ensureAuth, CorteController.getUltimoCorte);

module.exports = api;