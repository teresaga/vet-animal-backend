'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-del-controlador', md_auth.ensureAuth ,UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/deactivate-user/:id', UserController.deactivateUser);
api.put('/activate-user/:id', UserController.activateUser);
api.get('/users', UserController.getUsers);


module.exports = api;