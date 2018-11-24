'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Race = require('../models/race');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de razas y la accion pruebas'
    });
}

function saveRace(req, res){
    var race =  new Race;

    var params = req.body;

    if(params.name && params.specie){
        race.name = params.name;
        race.specie = params.specie;

        var date = moment({});
        race.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        race.end_date = '';
        race.status = 'A';

        race.save((err, raceStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!raceStored){
                    res.status(404).send({message: 'No se ha guardado la raza'});
                }else{
                    res.status(200).send({race: raceStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre de la raza es obligatorio'});
    }

}

function updateRace(req, res){
    // parms son los Parametros que se pasan por la url
    var raceId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Race.findByIdAndUpdate(raceId, update, {new:true}, (err, raceUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar la raza'
            });
        }else{
            if(!raceUpdated){
                res.status(404).send({message: 'No se ha actualizado la raza'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({race: raceUpdated});
            }
        }
    });

}

function deactivateRace(req, res){
    // parms son los Parametros que se pasan por la url
    var raceId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Race.findByIdAndUpdate(raceId, update, {new:true}, (err, raceUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja la raza'
            });
        }else{
            if(!raceUpdated){
                res.status(404).send({message: 'No se ha dar de baja la raza'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({race: raceUpdated});
            }
        }
    });

}

function activateRace(req, res){
    // parms son los Parametros que se pasan por la url
    var raceId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Race.findByIdAndUpdate(raceId, update, {new:true}, (err, raceUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta la raza'
            });
        }else{
            if(!raceUpdated){
                res.status(404).send({message: 'No se ha dar de alta la raza'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({race: raceUpdated});
            }
        }
    });

}

function getRaces(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Race.find({})
    .populate({path: 'specie'})
    .skip(pag)
    .limit(5)
    .exec((err, races) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!races){
                res.status(404).send({message: 'No hay razas'});
            }else{
                Race.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            races: races,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getRacesA(req, res){
    var raceSpecie = req.params.specie;
    Race.find({status:'A', specie: raceSpecie}).populate({path: 'specie'}).exec((err, races) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!races){
                res.status(404).send({message: 'No hay razas'});
            }else{
                res.status(200).send({races});
            }
        }
    });      
}

function getRacesAofSpecie(req, res){
    var specieId = req.params.id;
    Race.find({specie: specieId, status: 'A'})
    .populate({path: 'specie'})
    .exec((err, races) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!races){
                res.status(404).send({message: 'No hay razas'});
            }else{
                Race.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            races: races,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getRace(req, res){
    var raceId = req.params.id;

    Race.findById(raceId).exec((err, race) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!specie){
                res.status(404).send({message: 'La raza no existe'});
            }else{
                res.status(200).send({race});
            }
        }
    });
}

module.exports = {
    saveRace,
    updateRace,
    getRacesA,
    getRacesAofSpecie,
    deactivateRace,
    activateRace,
    getRaces,
    getRace,
    pruebas
};