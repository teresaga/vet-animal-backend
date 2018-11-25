'use strict'
//modulos
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Activity = require('../models/activity');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando '
    });
}

function saveActivity(req, res){
    var activity =  new Activity;

    var params = req.body;

    if(params.client && params.animal && params.service && params.worker){
        activity.animal = params.animal;
        activity.client = params.client;
        activity.service = params.service;
        activity.worker = params.worker;
        activity.notes = params.notes;
        
        var date = moment({});
        activity.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        activity.end_date = '';
        activity.status = 'PE';

        if(params.date){
            activity.date =  moment(params.date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]');
        }else{ 
            var date2 = moment({});
            activity.date =  moment(date2).format('YYYY-MM-DD 00:00:00.000[Z]');
        }

        activity.save((err, activityStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!activityStored){
                    res.status(404).send({message: 'No se ha guardado la actividad'});
                }else{
                    res.status(200).send({activity: activityStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Los datos cliente, mascota, servicio, empleado, fecha y hora son obligatorios'});
    }

}

function updateActivity(req, res){
    // parms son los Parametros que se pasan por la url
    var activityId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Activity.findByIdAndUpdate(activityId, update, {new:true}, (err, activityUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar el puesto'
            });
        }else{
            if(!activityUpdated){
                res.status(404).send({message: 'No se ha actualizado el puesto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({activity: activityUpdated});
            }
        }
    });

}

function finishActivity(req, res){
    // parms son los Parametros que se pasan por la url
    var activityId = req.params.id;
    var update = req.body;

    update.status = 'T';

    var date = moment({});
    update.end_date=moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Activity.findByIdAndUpdate(activityId, update, {new:true}, (err, activityUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al terminar actividad'
            });
        }else{
            if(!activityUpdated){
                res.status(404).send({message: 'No se pudo terminar actividad'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({activity: activityUpdated});
            }
        }
    });

}

function startActivity(req, res){
    // parms son los Parametros que se pasan por la url
    var activityId = req.params.id;
    var update = req.body;

    update.status = 'PR';
    update.end_date =  '';

    Activity.findByIdAndUpdate(activityId, update, {new:true}, (err, activityUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al activar actividad'
            });
        }else{
            if(!activityUpdated){
                res.status(404).send({message: 'No se pudo activar la actividad'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({activity: activityUpdated});
            }
        }
    });

}

function getActivities_animalStatusDate(req, res){
    var animalId = req.params.id;
    var pag = req.query.pag || 0;
    pag = Number(pag);
    var status =  req.query.status;
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Activity.find({animal: animalId, status: status, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, activities) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activities){
                res.status(404).send({message: 'No hay actividades'});
            }else{
                Activity.count({animal: animalId, status: status, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            activities: activities,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getActivities_animalDate(req, res){
    var animalId = req.params.id;
    var pag = req.query.pag || 0;
    pag = Number(pag);
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Activity.find({animal: animalId, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, activities) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activities){
                res.status(404).send({message: 'No hay actividades'});
            }else{
                Activity.count({animal: animalId, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            activities: activities,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getActivities_statusDate(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    var status =  req.query.status;
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Activity.find({status: status, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, activities) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activities){
                res.status(404).send({message: 'No hay actividades'});
            }else{
                Activity.count({status: status, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            activities: activities,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getActivities_date(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Activity.find({$and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, activities) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activities){
                res.status(404).send({message: 'No hay actividades'});
            }else{
                Activity.count({$and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            activities: activities,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getActivity(req, res){
    var activityId = req.params.id;

    Activity.findById(activityId)
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .exec((err, activity) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activity){
                res.status(404).send({message: 'La actividad no existe'});
            }else{
                res.status(200).send({activity});
            }
        }
    });
}

function getActivities(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Activity.find({})
    .populate({path: 'client'})
    .populate({path: 'worker'})
    .populate({path: 'service'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, activities) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!activities){
                res.status(404).send({message: 'No hay actividades'});
            }else{
                Activity.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            activities: activities,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}
module.exports = {
    pruebas,
    getActivity,
    getActivities,
    getActivities_animalStatusDate,
    getActivities_animalDate,
    getActivities_statusDate,
    getActivities_date,
    updateActivity,
    finishActivity,
    startActivity,
    saveActivity
};