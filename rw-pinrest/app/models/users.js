'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		displayName: String,
		username: String,
		url: String
	}
});

module.exports = mongoose.model('User', User);
