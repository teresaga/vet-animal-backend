'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Character = require('../models/character');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de caracter y la accion pruebas'
    });
}

function saveCharacter(req, res){
    var character =  new Character;

    var params = req.body;

    if(params.name){
        character.name = params.name;

        var date = moment({});
        character.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        character.end_date = '';
        character.status = 'A';

        character.save((err, characterStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!characterStored){
                    res.status(404).send({message: 'No se ha guardado el caracter'});
                }else{
                    res.status(200).send({character: characterStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre del caracter es obligatorio'});
    }

}

function updateCharacter(req, res){
    // parms son los Parametros que se pasan por la url
    var characterId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Character.findByIdAndUpdate(characterId, update, {new:true}, (err, characterUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar el caracter'
            });
        }else{
            if(!characterUpdated){
                res.status(404).send({message: 'No se ha actualizado el caracter'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({character: characterUpdated});
            }
        }
    });

}

function deactivateCharacter(req, res){
    // parms son los Parametros que se pasan por la url
    var characterId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Character.findByIdAndUpdate(characterId, update, {new:true}, (err, characterUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja el caracter'
            });
        }else{
            if(!characterUpdated){
                res.status(404).send({message: 'No se ha dar de baja el caracter'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({character:characterUpdated});
            }
        }
    });

}

function activateCharacter(req, res){
    // parms son los Parametros que se pasan por la url
    var characterId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Character.findByIdAndUpdate(characterId, update, {new:true}, (err, characterUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta el caracter'
            });
        }else{
            if(!characterUpdated){
                res.status(404).send({message: 'No se ha dar de alta el caracter'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({character: characterUpdated});
            }
        }
    });

}

function getCharacters(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Character.find({})
        .skip(pag)
        .limit(5)
        .exec((err, characters) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!characters){
                res.status(404).send({message: 'No hay caracteres'});
            }else{
                Character.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            characters: characters,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getCharactersA(req, res){
    Character.find({status:'A'}).exec((err, characters) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!characters){
                res.status(404).send({message: 'No hay caracteres'});
            }else{
                res.status(200).send({characters});
            }
        }
    });      
}

function getCharacter(req, res){
    var characterId = req.params.id;

    Character.findById(characterId).exec((err, character) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!character){
                res.status(404).send({message: 'El caracter no existe'});
            }else{
                res.status(200).send({character});
            }
        }
    });
}

module.exports = {
    saveCharacter,
    updateCharacter,
    getCharactersA,
    deactivateCharacter,
    activateCharacter,
    getCharacters,
    getCharacter,
    pruebas
};