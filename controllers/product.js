'use strict'
//modulos
var moment = require('moment');

//modelos
var Product = require('../models/product');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de productos y la accion pruebas',
    });
}

function saveProduct(req, res){
    var product =  new Product;

    var params = req.body;

    if(params.description && params.price && params.typeproduct){
        product.description = params.description;
        product.price = params.price;
        product.typeproduct = params.typeproduct;
        product.cost = params.cost;
        if (params.provider == 'null'){
            delete product.provider;
        }else{
            product.provider = params.provider;
        }
        product.measurementunit = params.measurementunit;
        product.typeproduct = params.typeproduct;
        product.stock_min = params.stock_min;
        product.stock_max = params.stock_max;
        product.stock = params.stock;

        //Obtiene fecha actual y la da un formato
        var date = moment({});
        product.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');
        product.end_date = '';
        product.status = 'A';

        product.save((err, productStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!productStored){
                    res.status(404).send({message: 'No se ha guardado el producto'});
                }else{
                    res.status(200).send({product: productStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Introduce los datos correctamente para poder registrar el producto'});
    }

}

function updateProduct(req, res){
    var productId =  req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!productUpdated){
                res.status(404).send({message: 'No se ha actualizado el producto'});
            }else{
                res.status(200).send({product: productUpdated});
            }
        }
    });
}

function deactivateProduct(req, res){
    // parms son los Parametros que se pasan por la url
    var productId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al producto'
            });
        }else{
            if(!productUpdated){
                res.status(404).send({message: 'No se ha dar de baja al producto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({product: productUpdated});
            }
        }
    });

}

function activateProduct(req, res){
    // parms son los Parametros que se pasan por la url
    var productId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date =  '';

    Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta al producto'
            });
        }else{
            if(!productUpdated){
                res.status(404).send({message: 'No se ha dar de alta al producto'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({product: productUpdated});
            }
        }
    });

}

function getProducts(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Product.find({})
        .populate({path: 'provider'})
        .populate({path: 'typeproduct'})
        .populate({path: 'measurementunit'})
        .skip(pag)
        .limit(5)
        .exec((err, products) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!products){
                res.status(404).send({message: 'No hay productos'});
            }else{

                Product.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            products: products,
                            total: conteo
                        });
                    }
                });
                
            }
        }
    });      
}

function getProductsA(req, res){
    Product.find({status:'A'}).exec((err, products) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!products){
                res.status(404).send({message: 'No hay productos'});
            }else{
                res.status(200).send({products});
            }
        }
    });      
}

function getProduct(req, res){
    var productId = req.params.id;

    Product.findById(productId).exec((err, product) => {
        if(err){
            res.status(500).send({err});
        }else{
            if(!product){
                res.status(404).send({message: 'El producto no existe'});
            }else{
                res.status(200).send({product});
            }
        }
    });
}

function getProductCount(req, res){
    Product.count({status:'A'}, (err, conteo) => {
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
    saveProduct,
    updateProduct,
    deactivateProduct,
    activateProduct,
    getProducts,
    getProductsA,
    getProductCount,
    getProduct
};
