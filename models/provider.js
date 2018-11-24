'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = Schema({
    name: String,
    business_name: String,
    rfc: String,
    address: String,
    tel: String,
    email: String,
    contact_person: String,
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('Provider', ProviderSchema);