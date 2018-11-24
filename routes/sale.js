'use strict'

var express = require('express');
var SaleController = require('../controllers/sale');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

api.get('/pruebas-ventas', SaleController.pruebas);
api.post('/sale', md_auth.ensureAuth ,SaleController.saveSale);
api.get('/sales', md_auth.ensureAuth, SaleController.getSales);
api.post('/saledetail', md_auth.ensureAuth ,SaleController.saveSaledetails);
api.get('/saledetails/:id', md_auth.ensureAuth, SaleController.getSalesDetails);

module.exports = api;