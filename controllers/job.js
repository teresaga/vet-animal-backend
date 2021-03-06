'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Job = require('../models/job');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de usuarios y la accion pruebas'
    });
}

function saveJob(req, res){
    var job =  new Job;

    var params = req.body;

    if(params.name){
        job.name = params.name;

        var date = moment({});
        job.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        job.end_date = '';
        job.status = 'A';

        job.save((err, jobStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!jobStored){
                    res.status(404).send({message: 'No se ha guardado el puesto'});
                }else{
                    res.status(200).send({job: jobStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre del puesto es obligatorio'});
    }

}

function updateJob(req, res){
    // parms son los Parametros que se pasan por la url
    var jobId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Job.findByIdAndUpdate(jobId, update, {new:true}, (err, jobUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar el puesto'
            });
        }else{
            if(!jobUpdated){
                res.status(404).send({message: 'No se ha actualizado el puesto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({job: jobUpdated});
            }
        }
    });

}

function deactivateJob(req, res){
    // parms son los Parametros que se pasan por la url
    var jobId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date=moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Job.findByIdAndUpdate(jobId, update, {new:true}, (err, jobUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al puesto'
            });
        }else{
            if(!jobUpdated){
                res.status(404).send({message: 'No se ha dar de baja al puesto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({job: jobUpdated});
            }
        }
    });

}

function activateJob(req, res){
    // parms son los Parametros que se pasan por la url
    var jobId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Job.findByIdAndUpdate(jobId, update, {new:true}, (err, jobUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al puesto'
            });
        }else{
            if(!jobUpdated){
                res.status(404).send({message: 'No se ha dar de alta al puesto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({job: jobUpdated});
            }
        }
    });

}

function getJobs(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Job.find({})
        .skip(pag)
        .limit(5).exec((err, jobs) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!jobs){
                res.status(404).send({message: 'No hay puestos'});
            }else{
                Job.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            jobs: jobs,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getJobsA(req, res){
    Job.find({status:'A'}).exec((err, jobs) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!jobs){
                res.status(404).send({message: 'No hay puestos'});
            }else{
                res.status(200).send({jobs});
            }
        }
    });      
}

function getJob(req, res){
    var jobId = req.params.id;

    Job.findById(jobId).exec((err, job) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!job){
                res.status(404).send({message: 'El puesto no existe'});
            }else{
                res.status(200).send({job});
            }
        }
    });
}

module.exports = {
    saveJob,
    updateJob,
    getJobsA,
    deactivateJob,
    activateJob,
    getJobs,
    getJob,
    pruebas
};

