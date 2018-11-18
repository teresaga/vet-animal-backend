'use strict'

var express = require('express');
var ProviderController = require('../controllers/provider');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-proveedor', md_auth.ensureAuth ,ProviderController.pruebas);
api.post('/provider', md_auth.ensureAuth ,ProviderController.saveProvider);
api.put('/update-provider/:id', md_auth.ensureAuth, ProviderController.updateProvider);
api.put('/deactivate-provider/:id', md_auth.ensureAuth, ProviderController.deactivateProvider);
api.put('/activate-provider/:id', md_auth.ensureAuth, ProviderController.activateProvider);
api.get('/providers', md_auth.ensureAuth, ProviderController.getProviders);
api.get('/providersa', md_auth.ensureAuth, ProviderController.getProvidersA);
api.get('/providers-count', ProviderController.getProviderCount);
api.get('/provider/:id', ProviderController.getProvider);


module.exports = api;