'use strict'

var express = require('express');
var WorkerController = require('../controllers/worker');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-empleado', md_auth.ensureAuth ,WorkerController.pruebas);
api.post('/worker', [md_auth.ensureAuth, md_vet.isVet] ,WorkerController.saveWorker);
api.put('/update-worker/:id', [md_auth.ensureAuth, md_vet.isVet], WorkerController.updateWorker);
api.put('/deactivate-worker/:id', [md_auth.ensureAuth, md_vet.isVet], WorkerController.deactivateWorker);
api.put('/activate-worker/:id', [md_auth.ensureAuth, md_vet.isVet], WorkerController.activateWorker);
api.get('/workers', md_auth.ensureAuth, WorkerController.getWorkers);
api.get('/workersa', md_auth.ensureAuth, WorkerController.getWorkersA);
api.get('/workers-count', WorkerController.getWorkerCount);
api.get('/worker/:id', WorkerController.getWorker);


module.exports = api;