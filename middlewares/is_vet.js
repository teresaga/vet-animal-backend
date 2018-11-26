'use strict'

exports.isVet = function(req, res, next){
    if(req.user.role != 'ADMIN' && req.user.role != 'VET'){
        return res.status(200).send({message: 'No tienes acceso a esta zona'});
    }

    next();
};