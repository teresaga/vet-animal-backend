'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-del-controlador', md_auth.ensureAuth ,UserController.pruebas);
api.post('/register', [md_auth.ensureAuth, md_admin.isAdmin], UserController.saveUser);
api.put('/update-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.updateUser);
api.put('/update-user-password/:id', md_auth.ensureAuth, UserController.updateUserPassword);
api.post('/login', UserController.login);
api.put('/deactivate-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.deactivateUser);
api.put('/activate-user/:id', [md_auth.ensureAuth, md_admin.isAdmin], UserController.activateUser);
api.get('/users-count', UserController.getUserCount);
api.get('/users/:id', md_auth.ensureAuth ,UserController.getUsers);


module.exports = api;