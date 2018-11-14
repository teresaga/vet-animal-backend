'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HairSchema = Schema({
    name: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Hair', HairSchema);