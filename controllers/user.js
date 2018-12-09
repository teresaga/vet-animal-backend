'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

//modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
    res.status(200).send({
        messagee: 'Probando el controlador de usuarios y la accion pruebas',
        user: req.user
    });
}

function saveUser(req, res){
    // Crea objeto de  usuario
    var user = new User();

    // Recoger parametros peticion
    var params = req.body;

    if (params.password && params.username && params.worker && params.role ){
        // Asignar valores al objeto usuario
        user.username = params.username;
        user.worker = params.worker;
        user.role = params.role;

        //Obtiene fecha actual y la da un formato
        var date = moment({});
        user.start_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

        user.end_date = '';
        user.status = 'A';

        User.findOne({username: user.username.toLowerCase()}, (err, issetUser) => {
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'});
            }else{
                if(!issetUser){

                    //Verifica que el empleado no sea registrado dos veces
                    User.findOne({worker: user.worker}, (err, issetUser2) => {
                        if(!issetUser2){
                            // Cifrar contraseña
                            bcrypt.hash(params.password, null, null, function(err, hash){
                                user.password = hash;

                                // Guardar usuario en la BD
                                user.save((err, userStored) => {
                                    if(err){
                                        res.status(500).send({message: 'Error al guardar el usuario'});
                                    }else{
                                        if(!userStored){
                                            res.status(404).send({message: 'No se ha registrado el usuario'});
                                        }else{
                                            res.status(200).send({user: userStored});
                                        }
                                    }
                                });
                            });
                        }else{
                            res.status(200).send({message: 'El usuario no puede registrarse, el empleado ya ha sido asignado antes'});
                        }
                    });

                }else{
                    res.status(200).send({message: 'El usuario no puede registrarse'});
                }
            }
        });
    }else{
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        });
    }
}

function updateUser(req, res){
    var userId =  req.params.id;
    var update = req.body;
    delete update.username;
    delete update.password;
    delete update.start_date;
    delete update.end_date;
    delete update.status;


    User.findOne({worker: update.worker, _id: { $ne: userId }}, (err, issetUser2) => {
        if(!issetUser2){
            if(update.worker=='' || update.worker==null){
                delete update.worker;
            }
            User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error en la petición'});
                }else{
                    if(!userUpdated){
                        res.status(404).send({message: 'No se ha actualizado el usuario'});
                    }else{
                        res.status(200).send({user: userUpdated});
                    }
                }
            });
        }else{
            res.status(200).send({message: 'El usuario no se pudo actualizar, el empleado ya ha sido asignado antes'});
        }
    });
}

function updateUserPassword(req, res){
    var userId =  req.params.id;
    var update = req.body;
    delete update.username;
    delete update.worker;
    delete update.role;
    delete update.start_date;
    delete update.end_date;
    delete update.status;

    bcrypt.hash(update.password, null, null, function(err, hash){
        update.password = hash;
        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if(err){
                res.status(500).send({message: 'Error en la petición'});
            }else{
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha actualizado el usuario'});
                }else{
                    res.status(200).send({user: userUpdated});
                }
            }
        });
    });
}

function login(req, res){
    var params = req.body;

    var username =  params.username;
    var password = params.password;
    User.findOne({username: username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error al comprobar el usuario'});
        }else{
            if(user){
                if(user.status=='A'){
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        //Comparar y generar token
                        if(params.gettoken){
                            //devolver token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                        
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
                    }
                });
                
                }else{
                    res.status(404).send({message: 'El usuario ha sido dado de baja'});
                }
            }else{
                res.status(404).send({message: 'El usuario no ha podido loguearse'});
            }
        }
    });

}

function deactivateUser(req, res){
    // parms son los Parametros que se pasan por la url
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    delete update.username;
    delete update.worker;
    delete update.role;
    delete update.start_date;

    update.status = 'B';

    var date = moment({});
    update.end_date =  moment(date).format('YYYY-MM-DD 00:00:00.000[Z]');

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al usuario'
            });
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha dar de baja al usuario'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({user: userUpdated});
            }
        }
    });

}

function activateUser(req, res){
    // parms son los Parametros que se pasan por la url
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    delete update.username;
    delete update.worker;
    delete update.role;
    delete update.start_date;

    update.status = 'A';
    update.end_date =  '';

    User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) => {
        if(err){
            res.status(500).send({
                message: 'Error al dar de baja al usuario'
            });
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha dar de baja al usuario'});
            }else{
                // Estatus 200 es para respuestas con exito
                res.status(200).send({user: userUpdated});
            }
        }
    });

}

function getUsers(req, res){
    var userId = req.params.id;
    var pag = req.query.pag || 0;
    pag = Number(pag);
    User.find({ _id: { $ne: userId }, worker: { $exists: false }})
    .populate({path: 'worker'})
    .skip(pag)
    .limit(5)
    .exec((err, users) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay usuarios'});
            }else{
                User.count({}, (err, conteo) => {
                    if(err){
                        res.status(500).send({message: 'Error en la petición'});
                    }else{
                        res.status(200).send({
                            users: users,
                            total: conteo
                        });
                    }
                });
            }
        }
    });      
}

function getUserCount(req, res){
    User.count({status:'A'}, (err, conteo) => {
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
    saveUser,
    login,
    deactivateUser,
    activateUser,
    getUserCount,
    updateUser,
    updateUserPassword,
    getUsers
};

