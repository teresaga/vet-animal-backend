'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = Schema({
    amount: String,
    client: { type: Schema.ObjectId, ref: 'Client' },
    animal: { type: Schema.ObjectId, ref: 'Animal' },
    date: String
});

module.exports = mongoose.model('Sale', SaleSchema);