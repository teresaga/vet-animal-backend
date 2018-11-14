'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConsultationSchema = Schema({
    client: { type: Schema.ObjectId, ref: 'Client' },
    animal: { type: Schema.ObjectId, ref: 'Animal' },
    weight: String,
    temperature: String,
    notes: String,
    image: String,
    date: String
});

module.exports = mongoose.model('Consultation', ConsultationSchema);