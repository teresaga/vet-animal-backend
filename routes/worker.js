'use strict'

var express = require('express');
var WorkerController = require('../controllers/worker');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-empleado', md_auth.ensureAuth ,WorkerController.pruebas);
api.post('/worker', WorkerController.saveWorker);
api.put('/update-worker/:id', WorkerController.updateWorker);
api.put('/deactivate-worker/:id', WorkerController.deactivateWorker);
api.put('/activate-worker/:id', WorkerController.activateWorker);
api.get('/workers', WorkerController.getWorkers);
api.get('/worker/:id', WorkerController.getWorker);


module.exports = api;