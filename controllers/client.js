'use strict'
//modulos
var moment = require('moment');

//modelos
var Client = require('../models/client');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de clientes y la accion pruebas',
    });
}

function saveClient(req, res){
    var client =  new Client;

    var params = req.body;

    if(params.name && params.paternal_surname && params.address && params.tel && params.email && params.birthdate){
        client.name = params.name;
        client.paternal_surname = params.paternal_surname;
        client.maternal_surname = params.maternal_surname;
        client.address = params.address;
        client.tel = params.tel;
        client.email = params.email;
        client.birthdate = params.birthdate;
        //Obtiene fecha actual y la da un formato
        var date = moment({});
        client.start_date =  moment(date).format('DD/MM/YYYY');
        client.end_date = '';
        client.status = 'A';

        client.save((err, clientStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!clientStored){
                    res.status(404).send({message: 'No se ha guardado el cliente'});
                }else{
                    res.status(200).send({client: clientStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente para poder registrar al cliente'});
    }

}

function updateClient(req, res){
    var clientId =  req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Client.findByIdAndUpdate(clientId, update, {new:true}, (err, clientUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!clientUpdated){
                res.status(404).send({message: 'No se ha actualizado el cliente'});
            }else{
                res.status(200).send({client: clientUpdated});
            }
        }
    });
}

function deactivateClient(req, res){
    // parms son los Parametros que se pasan por la url
    var clientId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('DD/MM/YYYY');

    Client.findByIdAndUpdate(clientId, update, {new:true}, (err, clientUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al cliente'
            });
        }else{
            if(!clientUpdated){
                res.status(404).send({message: 'No se ha dar de baja al cliente'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({client: clientUpdated});
            }
        }
    });

}

function activateClient(req, res){
    // parms son los Parametros que se pasan por la url
    var clientId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date = '';

    Client.findByIdAndUpdate(clientId, update, {new:true}, (err, clientUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al cliente'
            });
        }else{
            if(!clientUpdated){
                res.status(404).send({message: 'No se ha dar de alta al cliente'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({client: clientUpdated});
            }
        }
    });

}

function getClients(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Client.find({})
        .skip(pag)
        .limit(5)
        .exec((err, clients) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!clients){
                res.status(404).send({message: 'No hay clientes'});
            }else{

                Client.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            clients: clients,
                            total: conteo
                        });
                    }
                });
                
            }
        }
    });      
}

function getClientsA(req, res){
    Client.find({status:'A'}).exec((err, clients) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!clients){
                res.status(404).send({message: 'No hay clientes'});
            }else{
                res.status(200).send({clients});
            }
        }
    });      
}

function getClient(req, res){
    var clientId = req.params.id;

    Client.findById(clientId).exec((err, client) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!client){
                res.status(404).send({message: 'El cliente no existe'});
            }else{
                res.status(200).send({client});
            }
        }
    });
}

function getClientCount(req, res){
    Client.count({status:'A'}, (err, conteo) => {
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
    saveClient,
    updateClient,
    deactivateClient,
    activateClient,
    getClients,
    getClientsA,
    getClientCount,
    getClient
};
