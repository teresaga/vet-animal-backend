'use strict'

var express = require('express');
var TypeproductController = require('../controllers/typeproduct');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-tiposproductos',TypeproductController.pruebas);
api.post('/typeproduct', md_auth.ensureAuth, TypeproductController.saveTypeproduct);
api.put('/update-typeproduct/:id', md_auth.ensureAuth, TypeproductController.updateTypeproduct);
api.put('/deactivate-typeproduct/:id', md_auth.ensureAuth, TypeproductController.deactivateTypeproduct);
api.put('/activate-typeproduct/:id', md_auth.ensureAuth, TypeproductController.activateTypeproduct);
api.get('/typeproducts', TypeproductController.getTypeproducts);
api.get('/typeproductsa', TypeproductController.getTypeproductsA);
api.get('/typeproduct/:id', TypeproductController.getTypeproduct);


module.exports = api;