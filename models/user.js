'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: String,
    password: String,
    worker: { type: Schema.ObjectId, ref: 'Worker' },
    role: String,
    start_date: Date,
    end_date: Date,
    status: String
});

module.exports = mongoose.model('User', UserSchema);