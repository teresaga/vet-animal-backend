'use strict'

var express = require('express');
var MeasurementunitController = require('../controllers/measurementunit');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');

api.get('/pruebas-unit',MeasurementunitController.pruebas);
api.post('/unit', md_auth.ensureAuth, MeasurementunitController.saveMeasurementunit);
api.put('/update-unit/:id', md_auth.ensureAuth, MeasurementunitController.updateMeasurementunit);
api.put('/deactivate-unit/:id', md_auth.ensureAuth, MeasurementunitController.deactivateMeasurementunit);
api.put('/activate-unit/:id', md_auth.ensureAuth, MeasurementunitController.activateMeasurementunit);
api.get('/units', MeasurementunitController.getMeasurementunits);
api.get('/unitsa', MeasurementunitController.getMeasurementunitsA);
api.get('/unit/:id', MeasurementunitController.getMeasurementunit);


module.exports = api;