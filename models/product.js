'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    description: String,
    price: String,
    cost: String,
    provider: { type: Schema.ObjectId, ref: 'Provider' },
    measurementunit: { type: Schema.ObjectId, ref: 'Measurementunit' },
    typeproduct: { type: Schema.ObjectId, ref: 'Typeproduct' },
    stock_min: String,
    stock_max: String,
    stock: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('Product', ProductSchema);