'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = Schema({
    name: String,
    paternal_surname: String,
    maternal_surname: String,
    address: String,
    tel: String,
    age: Number,
    email: String,
    salary: String,
    entry_horary: String,
    departure_horary: String,
    start_date: String,
    end_date: String,
    status: String,
    job: { type: Schema.ObjectId, ref: 'Job' }
});

module.exports = mongoose.model('Worker', WorkerSchema);