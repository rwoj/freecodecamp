'use strict';
var yahooFinance=require('yahoo-finance');
var moment=require('moment')
moment().format();
var Company=require('../models/companies.js')

function StockHandler () {
	this.getCompanies=function (req, res) {
		Company
			.find({})
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};
	this.changeCompanies=function (req, res) {
		if (req.body.what=='add'){
			//checking if valid symbol
			yahooFinance.quote({
				symbol: req.body.symbol,
				modules: ['summaryProfile']
			}, function (err, snapshot) {
					if (err) {
						res.json({summaryProfile: null})
					} else {
						var compObj=new Company;
						compObj.symbol=req.body.symbol
						compObj.description=snapshot.summaryProfile.longBusinessSummary

						compObj
							.save(function (error, company) {
								if (error) throw error;
								res.json(company)
							})
					}
			});
		} else if (req.body.what=='remove') {
			Company
				.findOneAndRemove({'symbol':req.body.symbol}, function (error, result) {
					if (error) { res.json({symbol: null})}
					res.json(result);
				});
		}
	};
	this.getData=function (req, res) {
	//	console.log(req.body.symbol, req.body.from, req.body.to)
	var now=moment().format("YYYY-MM-DD");
	var from=moment().subtract(req.body.period, req.body.periodSymbol).format("YYYY-MM-DD")
	// console.log (now, from, req.body.symbols)
	// period: req.body.period,
		yahooFinance.historical({
			symbols: req.body.symbols,
			from: from,
			to: now
			}, function (err, quotes) {
				if (err) throw err;
			// console.log(quotes[0], quotes[1])
			res.json(quotes)
		});
	}
}
module.exports = StockHandler;
