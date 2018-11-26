'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-productos', md_auth.ensureAuth ,ProductController.pruebas);
api.post('/product', [md_auth.ensureAuth, md_vet.isVet] ,ProductController.saveProduct);
api.put('/update-product/:id', [md_auth.ensureAuth, md_vet.isVet] , ProductController.updateProduct);
api.put('/deactivate-product/:id',  [md_auth.ensureAuth, md_vet.isVet] , ProductController.deactivateProduct);
api.put('/activate-product/:id', [md_auth.ensureAuth, md_vet.isVet] , ProductController.activateProduct);
api.get('/products', md_auth.ensureAuth, ProductController.getProducts);
api.get('/productsa', md_auth.ensureAuth, ProductController.getProductsA);
api.get('/productsservicea', md_auth.ensureAuth, ProductController.getProductsServicesA);
api.get('/products-count', ProductController.getProductCount);
api.get('/product/:id', ProductController.getProduct);

module.exports = api;