'use strict'

var express = require('express');
var JobController = require('../controllers/job');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-puestos',JobController.pruebas);
api.post('/job', JobController.saveJob);
api.put('/update-job/:id', JobController.updateJob);
api.put('/deactivate-job/:id', JobController.deactivateJob);
api.put('/activate-job/:id', JobController.activateJob);
api.get('/jobs', JobController.getJobs);
api.get('/job/:id', JobController.getJob);


module.exports = api;