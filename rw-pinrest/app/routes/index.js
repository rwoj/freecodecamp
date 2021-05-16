'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = process.cwd();

var PicturesHandler = require(path + '/app/controllers/picturesHandler.server.js');

module.exports = function (app, passport) {
	var picturesHandler = new PicturesHandler();

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path+'/public/login.html')
		})
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/mypictures')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/mypictures.html');
		});

	app.route('/api/pictures/all')
		.get(picturesHandler.getAll)
		.post(jsonParser, picturesHandler.getSomeones)

	app.route('/api/pictures/my')
		.get(isLoggedIn, picturesHandler.getMy)
		.post(isLoggedIn, jsonParser, picturesHandler.addMy)
		.delete(isLoggedIn, jsonParser, picturesHandler.deleteMy)

	app.route('/api/likes')
		.post(isLoggedIn, jsonParser, picturesHandler.modifyLike)

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', { failureRedirect: '/login'}), function (req,res) {
			res.redirect('/');
		});
};
