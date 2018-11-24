'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Hair = require('../models/hair');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de tipo de pelo y la accion pruebas'
    });
}

function saveHair(req, res){
    var hair =  new Hair;

    var params = req.body;

    if(params.name){
        hair.name = params.name;

        var date = moment({});
        hair.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        hair.end_date = '';
        hair.status = 'A';

        hair.save((err, hairStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!hairStored){
                    res.status(404).send({message: 'No se ha guardado al tipo de pelo'});
                }else{
                    res.status(200).send({hair: hairStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre del tipo de pelo es obligatorio'});
    }

}

function updateHair(req, res){
    // parms son los Parametros que se pasan por la url
    var hairId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Hair.findByIdAndUpdate(hairId, update, {new:true}, (err, hairUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar al tipo de pelo'
            });
        }else{
            if(!hairUpdated){
                res.status(404).send({message: 'No se ha actualizado al tipo de pelo'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({hair: hairUpdated});
            }
        }
    });

}

function deactivateHair(req, res){
    // parms son los Parametros que se pasan por la url
    var hairId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Hair.findByIdAndUpdate(hairId, update, {new:true}, (err, hairUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al tipo de pelo'
            });
        }else{
            if(!hairUpdated){
                res.status(404).send({message: 'No se ha dar de baja al tipo de pelo'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({hair: hairUpdated});
            }
        }
    });

}

function activateHair(req, res){
    // parms son los Parametros que se pasan por la url
    var hairId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Hair.findByIdAndUpdate(hairId, update, {new:true}, (err, hairUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al tipo de pelo'
            });
        }else{
            if(!hairUpdated){
                res.status(404).send({message: 'No se ha dar de alta al tipo de pelo'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({hair: hairUpdated});
            }
        }
    });

}

function getHairs(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Hair.find({})
    .skip(pag)
    .limit(5)
    .exec((err, hairs) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!hairs){
                res.status(404).send({message: 'No hay tipo de pelo'});
            }else{
                Hair.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            hairs: hairs,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getHairsA(req, res){
    Hair.find({status:'A'}).exec((err, hairs) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!hairs){
                res.status(404).send({message: 'No hay tipo de pelo'});
            }else{
                res.status(200).send({hairs});
            }
        }
    });      
}

function getHair(req, res){
    var hairId = req.params.id;

    Hair.findById(hairId).exec((err, hair) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!hair){
                res.status(404).send({message: 'El tipo de pelo no existe'});
            }else{
                res.status(200).send({hair});
            }
        }
    });
}

module.exports = {
    saveHair,
    updateHair,
    getHairsA,
    deactivateHair,
    activateHair,
    getHairs,
    getHair,
    pruebas
};