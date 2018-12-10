'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaleSchema = Schema({
    start_date: Date,
    finish_date: Date,
    money_stay: String,
    money_save: String,
    money_sales: String,
    user: { type: Schema.ObjectId, ref: 'User' },
    status: String
});

module.exports = mongoose.model('Corte', SaleSchema);