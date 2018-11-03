'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: String,
    password: String,
    worker: { type: Schema.ObjectId, ref: 'Worker' },
    role: String,
    start_date: String,
    end_date: String,
    status: String
});

module.exports = mongoose.model('User', UserSchema);