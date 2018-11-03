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

function getJobs(req, res){
    Job.find({}).exec((err, jobs) => {
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

module.exports = {
    getJobs,
    pruebas
};

