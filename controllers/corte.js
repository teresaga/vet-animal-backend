'use strict'
//modulos
var moment = require('moment');

//modelos
var Corte = require('../models/corte');


//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de cortes de caja'
    });
}

function saveCorteStart(req, res){
    var corte =  new Corte;

    var date = moment({});
    corte.start_date =  moment(date).format("YYYY-MM-DDTHH:mm:ss.000Z");
    corte.finish_date = '';
    corte.money_stay = '';
    corte.money_save = '';
    corte.money_sales = '';

    corte.status = 'A';

    corte.save((err, corteStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor', err:err});
        }else{
            if(!corteStored){
                res.status(404).send({message: 'No se ha guardado el corte de caja'});
            }else{
                res.status(200).send({corte: corteStored});
            }
        }
    });
    

}

function updateCorte(req, res){
    // parms son los Parametros que se pasan por la url
    var corteId = req.params.id;
    var update = req.body;
    
    update.status = 'T';
    var date = moment({});
    update.finish_date = moment(date);

    Corte.findByIdAndUpdate(corteId, update, {new:true}, (err, corteUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al puesto'
            });
        }else{
            if(!corteUpdated){
                res.status(404).send({message: 'No se ha podido actualizar corte de caja'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({corte: corteUpdated});
            }
        }
    });

}

function getCortes(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Corte.find({status: 'T' ,$and: [ { start_date: { $gte: new Date(datestart) } }, { finish_date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'user'})
    .skip(pag)
    .limit(5)
    .exec((err, cortes) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!cortes){
                res.status(404).send({message: 'No hay cortes'});
            }else{
                Corte.count({$and: [ { start_date: { $gte: new Date(datestart) } }, { finish_date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            cortes: cortes,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getUltimoCorte(req, res){
    Corte.find().sort({$natural:-1}).limit(1).exec((err, corte) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!corte){
                res.status(404).send({message: 'No hay cortes'});
            }else{
                res.status(200).send({
                    corte: corte[0]
                });
            }
        }
    });
    
}

module.exports = {
    pruebas,
    getCortes,
    getUltimoCorte,
    saveCorteStart,
    updateCorte
};