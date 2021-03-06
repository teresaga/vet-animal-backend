'use strict'
//modulos
var fs = require('fs');
var path = require('path');
var moment = require('moment');

//modelos
var Animal = require('../models/animal');

//acciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de animales y la accion pruebas',
        user: req.user
    });
}

function saveAnimal(req, res){
    var animal =  new Animal;

    var params = req.body;

    if(params.name && params.client && params.sex && params.birthdate && params.specie && params.race && params.weight && params.height && params.sterilized && params.nails){
        animal.name = params.name;
        animal.client = params.client;
        animal.sex = params.sex;
        animal.birthdate = params.birthdate;
        animal.specie = params.specie;
        animal.race = params.race;
        animal.character = params.character;
        animal.color = params.color;
        animal.hair = params.hair;
        animal.habitat = params.habitat;
        animal.weight = params.weight;
        animal.height = params.height;
        animal.sterilized = params.sterilized;
        animal.nails = params.nails;
        animal.notes = params.notes;
        animal.image = params.image;

        var date = moment({});
        animal.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        animal.end_date = '';
        animal.status = 'A';

        animal.save((err, animalStored) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!animalStored){
                    res.status(404).send({message: 'No se ha guardado el animal'});
                }else{
                    res.status(200).send({animal: animalStored});
                }
            }
        });
    }else{
        res.status(200).send({message: 'El nombre del animal es obligatorio'});
    }

}

function getAnimals(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Animal.find({})
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .skip(pag)
    .limit(5)
    .exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animals){
                res.status(404).send({message: 'No hay animales'});
            }else{
                Animal.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            animals: animals,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getAnimalsSelect(req, res){
    var clientId = req.params.id;
    Animal.find({client: clientId})
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animals){
                res.status(404).send({message: 'No hay animales'});
            }else{
                res.status(200).send({
                    animals: animals
                });
            }
        }
    });
}

function getAnimalsA(req, res){
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Animal.find({status:'A'})
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .skip(pag)
    .limit(5)
    .exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animals){
                res.status(404).send({message: 'No hay animales'});
            }else{
                Animal.count({status:'A'}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            animals: animals,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getAnimalsofClient(req, res){
    var clientId = req.params.id;
    var pag = req.query.pag || 0;
    pag = Number(pag);
    Animal.find({client: clientId})
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .skip(pag)
    .limit(5)
    .exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animals){
                res.status(404).send({message: 'No hay animales'});
            }else{
                Animal.count({client: clientId}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            animals: animals,
                            total: conteo
                        });
                    }
                });
            }
        }
    });
}

function getAnimalsAofClient(req, res){
    var clientId = req.params.id;
    Animal.find({client: clientId, status: 'A'})
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .exec((err, animals) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animals){
                res.status(404).send({message: 'No hay animales'});
            }else{
                res.status(200).send({
                    animals: animals
                });
            }
        }
    });
}

function getAnimal(req, res){
    var animalId = req.params.id;

    Animal.findById(animalId)
    .populate({path: 'client'})
    .populate({path: 'specie'})
    .populate({path: 'race'})
    .populate({path: 'character'})
    .populate({path: 'hair'})
    .populate({path: 'habitat'})
    .exec((err, animal) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animal){
                res.status(404).send({message: 'El animal no existe'});
            }else{
                res.status(200).send({animal});
            }
        }
    });
}

function updateAnimal(req, res){
    var animalId =  req.params.id;
    var update = req.body;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    Animal.findByIdAndUpdate(animalId, update, {new:true}, (err, animalUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!animalUpdated){
                res.status(404).send({message: 'No se ha actualizado el animal'});
            }else{
                res.status(200).send({animal: animalUpdated});
            }
        }
    });
}
/*
function uploadImage(req, res){
    var animalId = req.params.id;
    var file_name = 'No subido...';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        
            Animal.findByIdAndUpdate(animalId, {image: file_name}, {new:true}, (err, animalUpdated) => {
                if(err){
                    res.status(500).send({
                        message: 'Error al actualizar animal'
                    });
                }else{
                    if(!animalUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar al animal'});
                    }else{
                        // Estatus 200 es para respuestas con exito
                        res.status(200).send({animal: animalUpdated, image: file_name});
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
    var animalId = req.params.id;
    
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
            var nombreArchivo = `${ animalId }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;
            //Mover Archivo del temporal a un path
            var path = `./uploads/animals/${ nombreArchivo }`;

            archivo.mv(path, err =>{
                if(err){
                    res.status(500).send({message: 'Error al mover archivo'});
                }else{
                    //Modificar Animal
                    Animal.findByIdAndUpdate(animalId, {image: nombreArchivo}, {new:true}, (err, animalUpdated) => {
                        if(err){
                            res.status(500).send({
                                message: 'Error al actualizar animal'
                            });
                        }else{
                            if(!animalUpdated){
                                res.status(404).send({message: 'No se ha podido actualizar al animal'});
                            }else{
                                // Estatus 200 es para respuestas con exito
                                res.status(200).send({animal: animalUpdated, image: nombreArchivo});
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
    var path_file = './uploads/animals/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe'});
        }
    });
}

function deactivateAnimal(req, res){
    // parms son los Parametros que se pasan por la url
    var animalId = req.params.id;
    var update = req.body;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    Animal.findByIdAndUpdate(animalId, update, {new:true}, (err, animalUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja el animal'
            });
        }else{
            if(!animalUpdated){
                res.status(404).send({message: 'No se dio de baja al animal'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({animal:animalUpdated});
            }
        }
    });

}

function activateAnimal(req, res){
    // parms son los Parametros que se pasan por la url
    var animalId = req.params.id;
    var update = req.body;

    update.status = 'A';
    update.end_date = '';

    Animal.findByIdAndUpdate(animalId, update, {new:true}, (err, animalUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de alta el animal'
            });
        }else{
            if(!animalUpdated){
                res.status(404).send({message: 'No se dio de alta al animal'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({animal:animalUpdated});
            }
        }
    });

}

function getAnimalCount(req, res){
    Animal.count({status:'A'}, (err, conteo) => {
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
    saveAnimal,
    getAnimals,
    getAnimalsA,
    getAnimalsofClient,
    getAnimalsAofClient,
    getAnimalCount,
    getAnimal,
    getAnimalsSelect,
    deactivateAnimal,
    activateAnimal,
    updateAnimal,
    uploadImage,
    getImageFile
};