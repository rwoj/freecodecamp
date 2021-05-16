'use strict';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var path = process.cwd();
var StockHandler = require(path + '/app/controllers/stockHandler.server.js');

module.exports = function (app, passport) {
	var stockHandler = new StockHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

  app.route('/api/companies')
		.get(stockHandler.getCompanies)
		.post(jsonParser, stockHandler.changeCompanies)

	app.route('/api/stock')
		.post(jsonParser, stockHandler.getData);
};
