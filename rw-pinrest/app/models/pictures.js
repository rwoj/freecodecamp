'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Picture = new Schema({
  url: {type: String, required: true},
	description: {type: String},
  likes: {type: Number},
  users: {type: Array},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  userUrl: {type: String}
});

module.exports = mongoose.model('Picture', Picture);
