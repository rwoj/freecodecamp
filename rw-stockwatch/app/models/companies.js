'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Company = new Schema({
	symbol: String,
	description: String
});

module.exports = mongoose.model('Company', Company);
