'use strict';

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var path = process.cwd();
var PollsHandler = require(path + '/app/controllers/pollsHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var pollsHandler= new PollsHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/allpolls')
	.get(function (req, res) {
		res.sendFile(path + '/public/allpolls.html');
	});

  app.route('/mypolls')
	  .get(isLoggedIn, function (req, res) {
	  	res.sendFile(path+'/public/mypolls.html')
	  })

	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newpoll.html');
		})
		.post(jsonParser, pollsHandler.addPoll)

	app.route('/pollvotes/:id')
		.get(function (req, res) {
			res.sendFile(path + '/public/pollvotes.html');
		})

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	// app.route('/profile')
	// 	.get(isLoggedIn, function (req, res) {
	// 		res.sendFile(path + '/public/profile.html');
	// 	});

 app.route('/api/polls')
		.get(pollsHandler.getPolls)
		.post(jsonParser, pollsHandler.getMyPolls)

	app.route('/api/poll/:id')
 		.get(pollsHandler.getPoll)
		.post(jsonParser, pollsHandler.updatePoll)
		.delete(pollsHandler.removePoll)

	app.route('/api/user/:id')
		.get(function (req, res) {
			if (req.user){
				res.json(req.user.github);
			} else {
				res.json(JSON.stringify({'id':null}))
			}
		})

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/allpolls',
			failureRedirect: '/'
		}));
 };
