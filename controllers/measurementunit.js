'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Measurementunit = require('../models/measurementunit');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de unidades de medida y la accion pruebas'
    });
}

function saveMeasurementunit(req, res){
    var measurementunit =  new Measurementunit;

    var params = req.body;

    if(params.name){
        measurementunit.name = params.name;

        var date = moment({});
        measurementunit.start_date =  moment(date).format('DD/MM/YYYY');

        measurementunit.end_date = '';
        measurementunit.status = 'A';

        measurementunit.save((err, measurementunitStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!measurementunitStored){
                    res.status(404).send({message: 'No se ha guardado la unidad'});
                }else{
                    res.status(200).send({measurementunit: measurementunitStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre de la unidad de medida es obligatorio'});
    }

}

function updateMeasurementunit(req, res){
    // parms son los Parametros que se pasan por la url
    var measurementunitId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Measurementunit.findByIdAndUpdate(measurementunitId, update, {new:true}, (err, measurementunitUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al actualizar la unidad de medida'
            });
        }else{
            if(!measurementunitUpdated){
                res.status(404).send({message: 'No se ha actualizado la unidad de medida'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({measurementunit: measurementunitUpdated});
            }
        }
    });

}

function deactivateMeasurementunit(req, res){
    // parms son los Parametros que se pasan por la url
    var measurementunitId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Measurementunit.findByIdAndUpdate(measurementunitId, update, {new:true}, (err, measurementunitUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja la unidad de medida'
            });
        }else{
            if(!measurementunitUpdated){
                res.status(404).send({message: 'No se ha dar de baja la unidad de medida'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({measurementunit: measurementunitUpdated});
            }
        }
    });

}

function activateMeasurementunit(req, res){
    // parms son los Parametros que se pasan por la url
    var measurementunitId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Measurementunit.findByIdAndUpdate(measurementunitId, update, {new:true}, (err, measurementunitUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta la unidad de medida'
            });
        }else{
            if(!measurementunitUpdated){
                res.status(404).send({message: 'No se ha dar de alta la unidad de medida'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({measurementunit: measurementunitUpdated});
            }
        }
    });

}

function getMeasurementunits(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Measurementunit.find({})
    .skip(pag)
    .limit(5)
    .exec((err, measurementunits) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!measurementunits){
                res.status(404).send({message: 'No hay unidades de medida'});
            }else{
                Measurementunit.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            measurementunits: measurementunits,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getMeasurementunitsA(req, res){
    Measurementunit.find({status:'A'}).exec((err, measurementunits) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!measurementunits){
                res.status(404).send({message: 'No hay unidades de medida'});
            }else{
                res.status(200).send({measurementunits});
            }
        }
    });      
}

function getMeasurementunit(req, res){
    var measurementunitId = req.params.id;

    Measurementunit.findById(measurementunitId).exec((err, measurementunit) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!measurementunit){
                res.status(404).send({message: 'La unidad de medida no existe'});
            }else{
                res.status(200).send({measurementunit});
            }
        }
    });
}

module.exports = {
    saveMeasurementunit,
    updateMeasurementunit,
    getMeasurementunitsA,
    deactivateMeasurementunit,
    activateMeasurementunit,
    getMeasurementunits,
    getMeasurementunit,
    pruebas
};