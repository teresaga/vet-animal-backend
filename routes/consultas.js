'use strict'

var express = require('express');
var ConsultationController = require('../controllers/consultas');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

// cargar modulo para cargar imagenes y definir carpeta donde se guardaran
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/consultations' });
var md_admin = require('../middlewares/is_admin');
var md_vet = require('../middlewares/is_vet');
var md_cajero = require('../middlewares/is_cajero');

api.get('/pruebas-consultas', ConsultationController.pruebas);
api.post('/consultation',  [md_auth.ensureAuth, md_vet.isVet] , ConsultationController.saveConsultation);
api.get('/consultations',  [md_auth.ensureAuth, md_vet.isVet] , ConsultationController.getConsultations);
api.get('/history-animal/:id', [md_auth.ensureAuth, md_vet.isVet], ConsultationController.getHistoryOfAnimal);
api.get('/consultation/:id', ConsultationController.getConsultation);
api.put('/upload-image-consultation/:id', [md_auth.ensureAuth, md_vet.isVet], ConsultationController.uploadImage);
api.get('/get-image-consultation/:imageFile', ConsultationController.getImageFile);

module.exports = api;