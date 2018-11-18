'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-productos', md_auth.ensureAuth ,ProductController.pruebas);
api.post('/product', md_auth.ensureAuth ,ProductController.saveProduct);
api.put('/update-product/:id', md_auth.ensureAuth, ProductController.updateProduct);
api.put('/deactivate-product/:id', md_auth.ensureAuth, ProductController.deactivateProduct);
api.put('/activate-product/:id', md_auth.ensureAuth, ProductController.activateProduct);
api.get('/products', md_auth.ensureAuth, ProductController.getProducts);
api.get('/productsa', md_auth.ensureAuth, ProductController.getProductsA);
api.get('/products-count', ProductController.getProductCount);
api.get('/product/:id', ProductController.getProduct);

module.exports = api;