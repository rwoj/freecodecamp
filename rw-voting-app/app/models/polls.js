'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
      name: String,
			userId: String,
			options: [{
				optionName: String,
				nrVotes: Number
			}],
      voted:[{
        userOrIp: String
      }]
});

module.exports = mongoose.model('Poll', Poll);
