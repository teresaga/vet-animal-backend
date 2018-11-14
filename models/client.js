'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name: String,
    paternal_surname: String,
    maternal_surname: String,
    address: String,
    tel: String,
    age: Number,
    email: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Client', ClientSchema);