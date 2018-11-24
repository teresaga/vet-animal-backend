'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-del-controlador', md_auth.ensureAuth ,UserController.pruebas);
api.post('/register', md_auth.ensureAuth, UserController.saveUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/update-user-password/:id', md_auth.ensureAuth, UserController.updateUserPassword);
api.post('/login', UserController.login);
api.put('/deactivate-user/:id', UserController.deactivateUser);
api.put('/activate-user/:id', UserController.activateUser);
api.get('/users-count', UserController.getUserCount);
api.get('/users/:id', md_auth.ensureAuth ,UserController.getUsers);


module.exports = api;