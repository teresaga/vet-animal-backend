'use strict'

var express = require('express');
var WorkerController = require('../controllers/worker');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-empleado', md_auth.ensureAuth ,WorkerController.pruebas);
api.post('/worker', md_auth.ensureAuth ,WorkerController.saveWorker);
api.put('/update-worker/:id', md_auth.ensureAuth, WorkerController.updateWorker);
api.put('/deactivate-worker/:id', md_auth.ensureAuth, WorkerController.deactivateWorker);
api.put('/activate-worker/:id', md_auth.ensureAuth, WorkerController.activateWorker);
api.get('/workers', md_auth.ensureAuth, WorkerController.getWorkers);
api.get('/workersa', md_auth.ensureAuth, WorkerController.getWorkersA);
api.get('/workers-count', WorkerController.getWorkerCount);
api.get('/worker/:id', WorkerController.getWorker);


module.exports = api;