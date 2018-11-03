'use strict'

var express = require('express');
var JobController = require('../controllers/job');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-puestos',JobController.pruebas);
api.get('/jobs', JobController.getJobs);


module.exports = api;