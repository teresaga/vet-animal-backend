'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Habitat = require('../models/habitat');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de habitat y la accion pruebas'
    });
}

function saveHabitat(req, res){
    var habitat =  new Habitat;

    var params = req.body;

    if(params.name){
        habitat.name = params.name;

        var date = moment({});
        habitat.start_date =  moment(date).format('DD/MM/YYYY');

        habitat.end_date = '';
        habitat.status = 'A';

        habitat.save((err, habitatStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!habitatStored){
                    res.status(404).send({message: 'No se ha guardado el habitat'});
                }else{
                    res.status(200).send({habitat: habitatStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre de la habitat es obligatorio'});
    }

}

function updateHabitat(req, res){
    // parms son los Parametros que se pasan por la url
    var habitatId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Habitat.findByIdAndUpdate(habitatId, update, {new:true}, (err, habitatUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar el habitat'
            });
        }else{
            if(!habitatUpdated){
                res.status(404).send({message: 'No se ha actualizado el habitat'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({habitat: habitatUpdated});
            }
        }
    });

}

function deactivateHabitat(req, res){
    // parms son los Parametros que se pasan por la url
    var habitatId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Habitat.findByIdAndUpdate(habitatId, update, {new:true}, (err, habitatUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja el habitat'
            });
        }else{
            if(!habitatUpdated){
                res.status(404).send({message: 'No se ha dar de baja el habitat'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({habitat: habitatUpdated});
            }
        }
    });

}

function activateHabitat(req, res){
    // parms son los Parametros que se pasan por la url
    var habitatId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Habitat.findByIdAndUpdate(habitatId, update, {new:true}, (err, habitatUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta el habitat'
            });
        }else{
            if(!habitatUpdated){
                res.status(404).send({message: 'No se ha dar de alta el habitat'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({habitat: habitatUpdated});
            }
        }
    });

}

function getHabitats(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Habitat.find({})
    .skip(pag)
    .limit(5)
    .exec((err, habitats) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!habitats){
                res.status(404).send({message: 'No hay habitats'});
            }else{
                Habitat.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            habitats: habitats,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getHabitatsA(req, res){
    Habitat.find({status:'A'}).exec((err, habitats) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!habitats){
                res.status(404).send({message: 'No hay habitats'});
            }else{
                res.status(200).send({habitats});
            }
        }
    });      
}

function getHabitat(req, res){
    var habitatId = req.params.id;

    Habitat.findById(habitatId).exec((err, habitat) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!habitat){
                res.status(404).send({message: 'La habitat no existe'});
            }else{
                res.status(200).send({habitat});
            }
        }
    });
}

module.exports = {
    saveHabitat,
    updateHabitat,
    getHabitatsA,
    deactivateHabitat,
    activateHabitat,
    getHabitats,
    getHabitat,
    pruebas
};