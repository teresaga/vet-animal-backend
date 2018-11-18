'use strict'
//modulos
var moment = require('moment');

//modelos
var Provider = require('../models/provider');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de proveedores y la accion pruebas',
    });
}

function saveProvider(req, res){
    var provider =  new Provider;

    var params = req.body;

    if(params.name && params.business_name && params.rfc && params.address && params.tel && params.email && params.contact_person){
        provider.name = params.name;
        provider.business_name = params.business_name;
        provider.rfc = params.rfc;
        provider.address = params.address;
        provider.tel = params.tel;
        provider.email = params.email;
        provider.contact_person = params.contact_person;
        //Obtiene fecha actual y la da un formato
        var date = moment({});
        provider.start_date =  moment(date).format('DD/MM/YYYY');
        provider.end_date = '';
        provider.status = 'A';

        provider.save((err, providerStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!providerStored){
                    res.status(404).send({message: 'No se ha guardado el proveedor'});
                }else{
                    res.status(200).send({provider: providerStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente para poder registrar al proveedor'});
    }

}

function updateProvider(req, res){
    var providerId =  req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Provider.findByIdAndUpdate(providerId, update, {new:true}, (err, providerUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!providerUpdated){
                res.status(404).send({message: 'No se ha actualizado el proveedor'});
            }else{
                res.status(200).send({provider: providerUpdated});
            }
        }
    });
}

function deactivateProvider(req, res){
    // parms son los Parametros que se pasan por la url
    var providerId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Provider.findByIdAndUpdate(providerId, update, {new:true}, (err, providerUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al proveedor'
            });
        }else{
            if(!providerUpdated){
                res.status(404).send({message: 'No se ha dar de baja al proveedor'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({provider: providerUpdated});
            }
        }
    });

}

function activateProvider(req, res){
    // parms son los Parametros que se pasan por la url
    var providerId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Provider.findByIdAndUpdate(providerId, update, {new:true}, (err, providerUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al proveedor'
            });
        }else{
            if(!providerUpdated){
                res.status(404).send({message: 'No se ha dar de alta al proveedor'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({provider: providerUpdated});
            }
        }
    });

}

function getProviders(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Provider.find({})
        .skip(pag)
        .limit(5)
        .exec((err, providers) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!providers){
                res.status(404).send({message: 'No hay proveedores'});
            }else{

                Provider.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            providers: providers,
                            total: conteo
                        });
                    }
                });
                
            }
        }
    });      
}

function getProvidersA(req, res){
    Provider.find({status:'A'}).exec((err, providers) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!providers){
                res.status(404).send({message: 'No hay proveedores'});
            }else{
                res.status(200).send({providers});
            }
        }
    });      
}

function getProvider(req, res){
    var providerId = req.params.id;

    Provider.findById(providerId).exec((err, provider) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!provider){
                res.status(404).send({message: 'El proveedor no existe'});
            }else{
                res.status(200).send({provider});
            }
        }
    });
}

function getProviderCount(req, res){
    Provider.count({status:'A'}, (err, conteo) => {
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
    saveProvider,
    updateProvider,
    deactivateProvider,
    activateProvider,
    getProviders,
    getProvidersA,
    getProviderCount,
    getProvider
};
