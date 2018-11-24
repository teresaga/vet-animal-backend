'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    client: { type: Schema.ObjectId, ref: 'Client' },
    sex: String,
    birthdate: String,
    specie: { type: Schema.ObjectId, ref: 'Specie' },
    race: { type: Schema.ObjectId, ref: 'Race' },
    character: { type: Schema.ObjectId, ref: 'Character' },
    color: String,
    hair: { type: Schema.ObjectId, ref: 'Hair' },
    habitat: { type: Schema.ObjectId, ref: 'Habitat' },
    weight: String,
    height: String,
    sterilized: String,
    nails: String,
    notes: String,
    image: String,
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('Animal', AnimalSchema);