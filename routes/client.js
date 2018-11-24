'use strict'

var express = require('express');
var ClientController = require('../controllers/client');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-cliente' ,ClientController.pruebas);
api.post('/client', md_auth.ensureAuth ,ClientController.saveClient);
api.put('/update-client/:id', md_auth.ensureAuth, ClientController.updateClient);
api.put('/deactivate-client/:id', md_auth.ensureAuth, ClientController.deactivateClient);
api.put('/activate-client/:id', md_auth.ensureAuth, ClientController.activateClient);
api.get('/clients', md_auth.ensureAuth, ClientController.getClients);
api.get('/clients-select', md_auth.ensureAuth, ClientController.getClientsSelect);
api.get('/clientsa', md_auth.ensureAuth, ClientController.getClientsA);
api.get('/clients-count', ClientController.getClientCount);
api.get('/client/:id', ClientController.getClient);


module.exports = api;