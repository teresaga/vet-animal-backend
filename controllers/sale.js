'use strict'
//modulos
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Sale = require('../models/sale');
var SaleDetail = require('../models/saledetail');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando '
    });
}

function saveSale(req, res){
    var sale =  new Sale;

    var params = req.body;

    if(params.amount){
        sale.amount = params.amount;
        if (params.client == 'null' || !params.client){
            delete sale.client;
        }else{
            sale.client = params.client;
        }
        var date = moment({});
        sale.date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        sale.save((err, saleStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor', err:err});
            }else{
                if(!saleStored){
                    res.status(404).send({message: 'No se ha guardado la venta'});
                }else{
                    res.status(200).send({sale: saleStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Error en el servidor'});
    }

}

function saveSaledetails(req, res){
    var saledetail =  new SaleDetail;

    var params = req.body;

    if(params.sale && params.product && params.quantity && params.price){
        saledetail.sale = params.sale;
        saledetail.product = params.product;
        saledetail.quantity = params.quantity;
        saledetail.price = params.price;

        saledetail.save((err, saledetailStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!saledetailStored){
                    res.status(404).send({message: 'No se ha guardado el detalle de la venta'});
                }else{
                    res.status(200).send({saledetail: saledetailStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Error en el servidor'});
    }

}

function getSales(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Sale.find({$and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .skip(pag)
    .limit(5)
    .exec((err, sales) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!sales){
                res.status(404).send({message: 'No hay ventas'});
            }else{
                Sale.count({$and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            sales: sales,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getSalesofClient(req, res){
    var id = req.params.id;
    
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Sale.count({client: id , $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            res.status(200).send({
                total: conteo
            });
        }
    });
}

function getSalesDetails(req, res){
    var saleId = req.params.id;
    SaleDetail.find({sale: saleId})
    .populate({path: 'sale'})
    .populate({path: 'product'})
    .exec((err, saledetails) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            SaleDetail.count({sale: saleId}, (err, conteo) => {
                if(err){
                    res.status(500).send({message: 'Error en la petición'});
                }else{
                    res.status(200).send({
                        saledetails: saledetails,
                        total: conteo
                    });
                }
            });
        }
    });
}

function getSalesDetailsProductos(req, res){
    var productId = req.params.id;
    
    SaleDetail.find({product: productId})
    .populate({path: 'sale'})
    .populate({path: 'product'})
    .exec((err, saledetails) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            SaleDetail.count({product: productId}, (err, conteo) => {
                if(err){
                    res.status(500).send({message: 'Error en la petición'});
                }else{
                    res.status(200).send({
                        saledetails: saledetails,
                        total: conteo
                    });
                }
            });
        }
    });
}

module.exports = {
    pruebas,
    getSales,
    getSalesDetails,
    getSalesDetailsProductos,
    getSalesofClient,
    saveSaledetails,
    saveSale
};