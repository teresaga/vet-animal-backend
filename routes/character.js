'use strict'

var express = require('express');
var CharacterController = require('../controllers/character');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-caracteres',CharacterController.pruebas);
api.post('/character', md_auth.ensureAuth, CharacterController.saveCharacter);
api.put('/update-character/:id', [md_auth.ensureAuth, md_admin.isAdmin], CharacterController.updateCharacter);
api.put('/deactivate-character/:id', [md_auth.ensureAuth, md_admin.isAdmin], CharacterController.deactivateCharacter);
api.put('/activate-character/:id', [md_auth.ensureAuth, md_admin.isAdmin], CharacterController.activateCharacter);
api.get('/characters', CharacterController.getCharacters);
api.get('/charactersa', CharacterController.getCharactersA);
api.get('/character/:id', CharacterController.getCharacter);


module.exports = api;