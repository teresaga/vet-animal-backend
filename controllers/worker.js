'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

//modelos
var User = require('../models/user');
var Worker = require('../models/worker');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de empleados y la accion pruebas',
    });
}

function saveWorker(req, res){
    var worker =  new Worker;

    var params = req.body;

    if(params.name && params.paternal_surname && params.address && params.tel && params.email && params.birthdate && params.salary && params.job && params.entry_horary && params.departure_horary){
        worker.name = params.name;
        worker.paternal_surname = params.paternal_surname;
        worker.maternal_surname = params.maternal_surname;
        worker.address = params.address;
        worker.tel = params.tel;
        worker.email = params.email;
        worker.birthdate = params.birthdate;
        worker.salary = params.salary;
        worker.job = params.job;
        worker.entry_horary = params.entry_horary;
        worker.departure_horary = params.departure_horary;
        //Obtiene fecha actual y la da un formato
        var date = moment({});
        worker.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');
        worker.end_date = '';
        worker.status = 'A';

        worker.save((err, workerStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!workerStored){
                    res.status(404).send({message: 'No se ha guardado el empleado'});
                }else{
                    res.status(200).send({worker: workerStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente para poder registrar al empleado'});
    }

}

function updateWorker(req, res){
    var workerId =  req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Worker.findByIdAndUpdate(workerId, update, {new:true}, (err, workerUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!workerUpdated){
                res.status(404).send({message: 'No se ha actualizado el empleado'});
            }else{
                res.status(200).send({worker: workerUpdated});
            }
        }
    });
}

function deactivateWorker(req, res){
    // parms son los Parametros que se pasan por la url
    var workerId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Worker.findByIdAndUpdate(workerId, update, {new:true}, (err, workerUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al empleado'
            });
        }else{
            if(!workerUpdated){
                res.status(404).send({message: 'No se ha dar de baja al empleado'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({worker: workerUpdated});
            }
        }
    });

}

function activateWorker(req, res){
    // parms son los Parametros que se pasan por la url
    var workerId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Worker.findByIdAndUpdate(workerId, update, {new:true}, (err, workerUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al empleado'
            });
        }else{
            if(!workerUpdated){
                res.status(404).send({message: 'No se ha dar de alta al empleado'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({worker: workerUpdated});
            }
        }
    });

}

function getWorkers(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Worker.find({})
        .populate({path: 'job'})
        .skip(pag)
        .limit(5)
        .exec((err, workers) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!workers){
                res.status(404).send({message: 'No hay empleados'});
            }else{

                Worker.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            workers: workers,
                            total: conteo
                        });
                    }
                });
                
            }
        }
    });      
}

function getWorkersA(req, res){
    Worker.find({})
        .populate({path: 'job'})
        .exec((err, workers) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!workers){
                res.status(404).send({message: 'No hay empleados'});
            }else{

                res.status(200).send({
                    workers: workers
                });
                
            }
        }
    });      
}

function getWorker(req, res){
    var workerId = req.params.id;

    Worker.findById(workerId).populate({path: 'job'}).exec((err, worker) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!worker){
                res.status(404).send({message: 'El animal no existe'});
            }else{
                res.status(200).send({worker});
            }
        }
    });
}

function getWorkerCount(req, res){
    Worker.count({status:'A'}, (err, conteo) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            res.status(200).send({
                total: conteo
            });
        }
    });
}

module.exports = {
    pruebas,
    saveWorker,
    updateWorker,
    deactivateWorker,
    activateWorker,
    getWorkers,
    getWorkersA,
    getWorker,
    getWorkerCount
};

