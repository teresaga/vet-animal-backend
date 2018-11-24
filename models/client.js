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
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('Client', ClientSchema);