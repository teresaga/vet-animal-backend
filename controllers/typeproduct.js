'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Typeproduct = require('../models/typeproduct');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de tipos de productos y la accion pruebas'
    });
}

function saveTypeproduct(req, res){
    var typeproduct =  new Typeproduct;

    var params = req.body;

    if(params.name){
        typeproduct.name = params.name;

        var date = moment({});
        typeproduct.start_date =  moment(date).format('DD/MM/YYYY');

        typeproduct.end_date = '';
        typeproduct.status = 'A';

        Typeproduct.findOne({name: typeproduct.name.toLowerCase()}, (err, issetTypeproduct) => {
            if(err){
                res.status(500).send({message: 'Error al comprobar el tipo de producto'});
            }else{
                if(!issetTypeproduct){
                    typeproduct.save((err, typeproductStored) => {
                        if(err){
                            res.status(500).send({message: 'Error en el servidor'});
                        }else{
                            if(!typeproductStored){
                                res.status(404).send({message: 'No se ha guardado el tipo de producto'});
                            }else{
                                res.status(200).send({typeproduct: typeproductStored});
                            }
                        }
                    });
                }else{
                    res.status(200).send({message: 'El tipo de producto no puede registrarse'});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre del tipo de producto es obligatorio'});
    }

}

function updateTypeproduct(req, res){
    // parms son los Parametros que se pasan por la url
    var typeproductId = req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;
    
    Typeproduct.findOne({name: update.name}, (err, issetTypeproduct) => {
        if(err){
            res.status(500).send({message: 'Error al comprobar el tipo de producto'});
        }else{
            if(!issetTypeproduct){
                Typeproduct.findByIdAndUpdate(typeproductId, update, {new:true}, (err, typeproductUpdated) => {
                    if(err){
                        res.status(500).send({
                            message: 'Error al actualizar el tipo de producto'
                        });
                    }else{
                        if(!typeproductUpdated){
                            res.status(404).send({message: 'No se ha actualizado el tipo de producto'});
                        }else{
                            // Estatus 200 es para respuestas con exito
                            res.status(200).send({typeproduct: typeproductUpdated, update: issetTypeproduct});
                        }
                    }
                });
            }else{
                res.status(200).send({message: 'El tipo de producto no puede registrarse'});
            }
        }
    });

}

function deactivateTypeproduct(req, res){
    // parms son los Parametros que se pasan por la url
    var typeproductId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Typeproduct.findByIdAndUpdate(typeproductId, update, {new:true}, (err, typeproductUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al tipo de producto'
            });
        }else{
            if(!typeproductUpdated){
                res.status(404).send({message: 'No se ha dar de baja al tipo de producto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({typeproduct: typeproductUpdated});
            }
        }
    });

}

function activateTypeproduct(req, res){
    // parms son los Parametros que se pasan por la url
    var typeproductId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Typeproduct.findByIdAndUpdate(typeproductId, update, {new:true}, (err, typeproductUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al tipo de producto'
            });
        }else{
            if(!typeproductUpdated){
                res.status(404).send({message: 'No se ha dar de alta al tipo de producto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({typeproduct: typeproductUpdated});
            }
        }
    });

}

function getTypeproducts(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Typeproduct.find({})
    .skip(pag)
    .limit(5)
    .exec((err, typeproducts) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!typeproducts){
                res.status(404).send({message: 'No hay tipos de productos'});
            }else{
                Typeproduct.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            typeproducts: typeproducts,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getTypeproductsA(req, res){
    Typeproduct.find({status:'A'}).exec((err, typeproducts) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!typeproducts){
                res.status(404).send({message: 'No hay tipos de productos'});
            }else{
                res.status(200).send({typeproducts});
            }
        }
    });      
}

function getTypeproduct(req, res){
    var typeproductId = req.params.id;

    Typeproduct.findById(typeproductId).exec((err, typeproduct) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!typeproduct){
                res.status(404).send({message: 'El tipo de producto no existe'});
            }else{
                res.status(200).send({typeproduct});
            }
        }
    });
}

module.exports = {
    saveTypeproduct,
    updateTypeproduct,
    getTypeproductsA,
    deactivateTypeproduct,
    activateTypeproduct,
    getTypeproducts,
    getTypeproduct,
    pruebas
};