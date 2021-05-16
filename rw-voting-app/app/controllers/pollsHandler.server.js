'use strict';

var Polls = require('../models/polls.js');


function PollsHandler() {

	this.getPolls = function (req, res) {
		Polls
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
	//			console.log(result)
				res.json(result);
			});
	 },
	 this.getMyPolls = function (req, res) {
		//  console.log(req.body.userId);
		 Polls
			 .find({'userId':req.body.userId})
			 .exec(function (err, result) {
				 if (err) { throw err; }
	 //			console.log(result)
				 res.json(result);
			 });
		},
	 this.getPoll = function (req, res) {
		 //console.log(req.params.id);
		 Polls
			 .findById(req.params.id, function (err, result) {
				 if (err) { throw err; }
	 //			console.log(result)
				 res.json(result);
			 });
		},
		this.updatePoll = function (req, res) {
			Polls
				.findById(req.params.id,function (err, doc) {
					if (err) { throw err; }
					// console.log(doc, req.body, req.body.id)
					var alreadyVoted=false, userOrIP=req.body.user || req.ip
					doc.voted.forEach(function(x){
						if(x.userOrIp==userOrIP){
							alreadyVoted=true;
						}
					})
					doc.voted.push({userOrIp: userOrIP})
					if (req.body.id==='custom' && req.body.customName!='') {
						doc.options.push({optionName: req.body.customName, nrVotes: 1})
//						doc.options.push({req.body})
					} else {
						doc.options.forEach(function (x) {
							// console.log(x, x._id==req.body.id)
							if(x._id==req.body.id){
								x.nrVotes=x.nrVotes+1;
								// console.log("liczba :", x.nrVotes)
							};
						})
					}
					if(alreadyVoted){
						res.json({noVotes: true})
					} else {
						console.log(doc)
						doc.save(function(err,sres){
							if (err) {throw err;}
							res.json(sres);
						})
					}
				});
		 },
		 this.removePoll = function (req, res) {
			 Polls
				 .findOneAndRemove({'_id':req.params.id}, function (err, result) {
					 if (err) { throw err; }
		// 			console.log(result)
					 res.json(result);
				 });
			},
	 this.addPoll=function(req,res){
		 var poll=new Polls({
			name: req.body.name,
			userId: req.body.userId,
			options: []
		 })
		 if (req.body.options){
			 req.body.options.forEach(function(x){
				 poll.options.push({optionName: x.optionName, nrVotes: 0})
			 })
		 }
//		 console.log(poll);

		 poll
		 	.save(function(err, poll){
				if(err) throw err;
				// console.log(poll);
				res.json(poll)
			})
	  }

}

module.exports = PollsHandler;
