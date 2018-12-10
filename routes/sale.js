'use strict'

var express = require('express');
var SaleController = require('../controllers/sale');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-ventas', SaleController.pruebas);
api.post('/sale', md_auth.ensureAuth ,SaleController.saveSale);
api.get('/sales', [md_auth.ensureAuth, md_admin.isAdmin], SaleController.getSales);
api.post('/saledetail', md_auth.ensureAuth ,SaleController.saveSaledetails);
api.get('/saledetails/:id',[md_auth.ensureAuth, md_admin.isAdmin], SaleController.getSalesDetails);
api.get('/saledetails-product/:id',[md_auth.ensureAuth, md_admin.isAdmin], SaleController.getSalesDetailsProductos);
api.get('/sales-client/:id',[md_auth.ensureAuth, md_admin.isAdmin], SaleController.getSalesofClient);

api.get('/sales-sinlimite', md_auth.ensureAuth, SaleController.getSalesSinLimite);

module.exports = api;