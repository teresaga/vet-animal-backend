'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = Schema({
    name: String,
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('Job', jobSchema);