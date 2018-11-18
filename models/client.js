'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name: String,
    paternal_surname: String,
    maternal_surname: String,
    address: String,
    tel: String,
    birthdate: String,
    email: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Client', ClientSchema);