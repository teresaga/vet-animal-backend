'use strict'

var express = require('express');
var JobController = require('../controllers/job');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-puestos',JobController.pruebas);
api.post('/job', md_auth.ensureAuth, JobController.saveJob);
api.put('/update-job/:id', [md_auth.ensureAuth, md_admin.isAdmin], JobController.updateJob);
api.put('/deactivate-job/:id', [md_auth.ensureAuth, md_admin.isAdmin], JobController.deactivateJob);
api.put('/activate-job/:id', [md_auth.ensureAuth, md_admin.isAdmin], JobController.activateJob);
api.get('/jobs', JobController.getJobs);
api.get('/jobsa', JobController.getJobsA);
api.get('/job/:id', JobController.getJob);


module.exports = api;