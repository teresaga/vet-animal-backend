'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitiesSchema = Schema({
    date: String,
    time: String,
    service: { type: Schema.ObjectId, ref: 'Product' },
    client: { type: Schema.ObjectId, ref: 'Client' },
    animal: { type: Schema.ObjectId, ref: 'Animal' },
    worker: { type: Schema.ObjectId, ref: 'Worker' },
    notes: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Activitie', ActivitiesSchema);