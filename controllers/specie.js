'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Specie = require('../models/specie');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de especies y la accion pruebas'
    });
}

function saveSpecie(req, res){
    var specie =  new Specie;

    var params = req.body;

    if(params.name){
        specie.name = params.name;

        var date = moment({});
        specie.start_date =  moment(date).format('DD/MM/YYYY');

        specie.end_date = '';
        specie.status = 'A';

        specie.save((err, specieStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!specieStored){
                    res.status(404).send({message: 'No se ha guardado la especie'});
                }else{
                    res.status(200).send({specie: specieStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre de la especie es obligatorio'});
    }

}

function updateSpecie(req, res){
    // parms son los Parametros que se pasan por la url
    var specieId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Specie.findByIdAndUpdate(specieId, update, {new:true}, (err, specieUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar la especie'
            });
        }else{
            if(!specieUpdated){
                res.status(404).send({message: 'No se ha actualizado la especie'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({specie: specieUpdated});
            }
        }
    });

}

function deactivateSpecie(req, res){
    // parms son los Parametros que se pasan por la url
    var specieId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Specie.findByIdAndUpdate(specieId, update, {new:true}, (err, specieUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja la especie'
            });
        }else{
            if(!specieUpdated){
                res.status(404).send({message: 'No se ha dar de baja la especie'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({specie: specieUpdated});
            }
        }
    });

}

function activateSpecie(req, res){
    // parms son los Parametros que se pasan por la url
    var specieId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Specie.findByIdAndUpdate(specieId, update, {new:true}, (err, specieUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta la especie'
            });
        }else{
            if(!specieUpdated){
                res.status(404).send({message: 'No se ha dar de alta la especie'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({specie: specieUpdated});
            }
        }
    });

}

function getSpecies(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Specie.find({})
    .skip(pag)
    .limit(5)
    .exec((err, species) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!species){
                res.status(404).send({message: 'No hay especies'});
            }else{
                Specie.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            species: species,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getSpeciesA(req, res){
    Specie.find({status:'A'}).exec((err, species) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!species){
                res.status(404).send({message: 'No hay especies'});
            }else{
                res.status(200).send({species});
            }
        }
    });      
}

function getSpecie(req, res){
    var specieId = req.params.id;

    Specie.findById(specieId).exec((err, specie) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!specie){
                res.status(404).send({message: 'La especie no existe'});
            }else{
                res.status(200).send({specie});
            }
        }
    });
}

module.exports = {
    saveSpecie,
    updateSpecie,
    getSpeciesA,
    deactivateSpecie,
    activateSpecie,
    getSpecies,
    getSpecie,
    pruebas
};