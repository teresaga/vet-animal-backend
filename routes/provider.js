'use strict'

var express = require('express');
var ProviderController = require('../controllers/provider');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-proveedor', md_auth.ensureAuth ,ProviderController.pruebas);
api.post('/provider', [md_auth.ensureAuth, md_vet.isVet] ,ProviderController.saveProvider);
api.put('/update-provider/:id', [md_auth.ensureAuth, md_vet.isVet], ProviderController.updateProvider);
api.put('/deactivate-provider/:id', [md_auth.ensureAuth, md_vet.isVet], ProviderController.deactivateProvider);
api.put('/activate-provider/:id', [md_auth.ensureAuth, md_vet.isVet], ProviderController.activateProvider);
api.get('/providers', md_auth.ensureAuth, ProviderController.getProviders);
api.get('/providersa', md_auth.ensureAuth, ProviderController.getProvidersA);
api.get('/providers-count', ProviderController.getProviderCount);
api.get('/provider/:id', ProviderController.getProvider);


module.exports = api;