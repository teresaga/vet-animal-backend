'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = Schema({
    name: String,
    paternal_surname: String,
    maternal_surname: String,
    address: String,
    tel: String,
    birthdate: String,
    email: String,
    salary: String,
    entry_horary: String,
    departure_horary: String,
    start_date: Date,
    end_date: Date,
    status: String,
    job: { type: Schema.ObjectId, ref: 'Job' }
});

module.exports = mongoose.model('Worker', WorkerSchema);