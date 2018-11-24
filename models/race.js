'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaceSchema = Schema({
    name: String,
    specie: { type: Schema.ObjectId, ref: 'Specie' },
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('Race', RaceSchema);