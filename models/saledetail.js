'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SaledetailSchema = Schema({
    sale: { type: Schema.ObjectId, ref: 'Sale' },
    product: { type: Schema.ObjectId, ref: 'Product' },
    quantity: String,
    price: String
});

module.exports = mongoose.model('Saledetail', SaledetailSchema);