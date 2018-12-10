'use strict'

var express = require('express');
var ActivityController = require('../controllers/activity');

var api = express.Router();
// Cargar middleware
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/is_admin');

api.get('/pruebas-actividades', ActivityController.pruebas);
api.post('/activity', md_auth.ensureAuth, ActivityController.saveActivity);
api.put('/update-activity/:id', md_auth.ensureAuth, ActivityController.updateActivity);
api.put('/finish-activity/:id', md_auth.ensureAuth, ActivityController.finishActivity);
api.put('/cancel-activity/:id', md_auth.ensureAuth, ActivityController.cancelActivity);
api.put('/start-activity/:id', md_auth.ensureAuth, ActivityController.startActivity);
api.get('/activities', md_auth.ensureAuth, ActivityController.getActivities);
api.get('/activity/:id', md_auth.ensureAuth, ActivityController.getActivity);
api.get('/activities-animal-status-date/:id', md_auth.ensureAuth, ActivityController.getActivities_animalStatusDate);
api.get('/activities-animal-date/:id', md_auth.ensureAuth, ActivityController.getActivities_animalDate);
api.get('/activities-status-date/', md_auth.ensureAuth, ActivityController.getActivities_statusDate);
api.get('/activities-date/', md_auth.ensureAuth, ActivityController.getActivities_date);
api.get('/activities-date-worker/', md_auth.ensureAuth, ActivityController.getActivities_dateWorker);
api.get('/activities-animal-date-worker/:id', md_auth.ensureAuth, ActivityController.getActivities_animalDateWorker);

module.exports = api;