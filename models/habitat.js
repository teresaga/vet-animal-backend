'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HabitatSchema = Schema({
    name: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Habitat', HabitatSchema);