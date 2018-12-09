'use strict'
//modulos
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var Consultation = require('../models/consultation');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando '
    });
}

function saveConsultation(req, res){
    var consultation =  new Consultation;

    var params = req.body;

    if(params.client && params.animal && params.weight && params.temperature){
        consultation.animal = params.animal;
        consultation.client = params.client;
        consultation.weight = params.weight;
        consultation.temperature = params.temperature;
        consultation.notes = params.notes;
        consultation.image = params.image;

        var date = moment({});
        consultation.date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        consultation.save((err, consultationStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!consultationStored){
                    res.status(404).send({message: 'No se ha guardado la consulta'});
                }else{
                    res.status(200).send({consultation: consultationStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'Los datos cliente, mascota, peso y temperatura son obligatorios'});
    }

}

function getHistoryOfAnimal(req, res){
    var animalId = req.params.id;
    var pag = req.query.pag || 0;
    pag = Number(pag);
    
    var datestart = req.query.datestart;
    var dateend = req.query.dateend;
    Consultation.find({animal: animalId , $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]})
    .populate({path: 'client'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, consultations) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!consultations){
                res.status(404).send({message: 'No hay consultas'});
            }else{
                Consultation.count({animal: animalId, $and: [ { date: { $gte: new Date(datestart) } }, { date: { $lte: new Date(dateend) } } ]}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            consultations: consultations,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getConsultation(req, res){
    var consultationId = req.params.id;

    Consultation.findById(consultationId)
    .populate({path: 'client'})
    .populate({path: 'animal'})
    .exec((err, consultation) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!consultation){
                res.status(404).send({message: 'La consulta no existe'});
            }else{
                res.status(200).send({consultation});
            }
        }
    });
}

function getConsultations(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Consultation.find({})
    .populate({path: 'client'})
    .populate({path: 'animal'})
    .skip(pag)
    .limit(5)
    .exec((err, consultations) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!consultations){
                res.status(404).send({message: 'No hay consultas'});
            }else{
                Consultation.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            consultations: consultations,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}
/*
function uploadImage(req, res){
    var consultationId = req.params.id;
    var file_name = 'No subido...';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        
            Consultation.findByIdAndUpdate(consultationId, {image: file_name}, {new:true}, (err, consultationUpdated) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar animal'
                    });
                }else{
                    if(!consultationUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar al animal'});
                    }else{
                        // Estatus 200 es para respuestas con exito
                        res.status(200).send({consultation: consultationUpdated, image: file_name});
                    }
                }
            });

        }else{
            fs.unlink(file_path, (err) => {
                if(err){
                    res.status(200).send({message: 'Extensión no valida y fichero no borrado'});
                }else{
                    res.status(200).send({message: 'Extensión no valida'});
                }
            });
        }
            
    }else{
        res.status(200).send({message: 'No se han subido archivos'});
    }
}
*/

function uploadImage(req, res){
    var consultationId = req.params.id;
    
    if(req.files){
        //Obtener nombre del archivo
        var archivo = req.files.image;
        var nombreCortado = archivo.name.split('.');
        var extensionArchivo = nombreCortado[nombreCortado.length-1];

        //Solo estas extensiones aceptamos
        var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
        
        if(extensionesValidas.indexOf(extensionArchivo) < 0){
            res.status(200).send({message: 'Extension no válida, las válidas son png, jpg, gif, jpeg'});
        }else{
            //Nombre de archivo personalizado
            var nombreArchivo = `${ consultationId }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
            //Mover Archivo del temporal a un path
            var path = `./uploads/consultations/${ nombreArchivo }`;

            archivo.mv(path, err =>{
                if(err){
                    res.status(500).send({message: 'Error al mover archivo'});
                }else{
                    //Modificar Consulta
                    Consultation.findByIdAndUpdate(consultationId, {image: file_name}, {new:true}, (err, consultationUpdated) => {
                        if(err){
                            res.status(500).send({
                                message: 'Error al actualizar Consulta'
                            });
                        }else{
                            if(!consultationUpdated){
                                res.status(404).send({message: 'No se ha podido actualizar la consulta'});
                            }else{
                                // Estatus 200 es para respuestas con exito
                                res.status(200).send({consultation: consultationUpdated, image: file_name});
                            }
                        }
                    });
                    //res.status(200).send({message: 'Archivo movido'});
                }

            });
        }
            
    }else{
        res.status(200).send({message: 'No se han subido archivos'});
    }
}

function getImageFile(req, res){
    var imageFile =  req.params.imageFile;
    var path_file = './uploads/consultations/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe'});
        }
    });
}

module.exports = {
    pruebas,
    getImageFile,
    uploadImage,
    getConsultation,
    getConsultations,
    getHistoryOfAnimal,
    saveConsultation
};