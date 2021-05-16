'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = BookHandler;

var _Book = require('../models/Book');

var _Book2 = _interopRequireDefault(_Book);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _xml2js = require('xml2js');

var _parseErrors = require('../utils/parseErrors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BookHandler() {
  this.getAll = function (req, res) {
    _Book2.default.find({}).then(function (books) {
      return res.json({ books: books });
    });
  }, this.getMy = function (req, res) {
    _Book2.default.find({ userId: req.user._id }).then(function (books) {
      return res.json({ books: books });
    });
  }, this.addMy = function (req, res) {
    // console.log(req.body.book, req.user._id)
    _Book2.default.create(_extends({}, req.body.book, { userId: req.user._id,
      requested: false, requestedUserId: null, approved: false })).then(function (book) {
      return res.json({ book: book });
    }).catch(function (err) {
      return res.status(400).json({ errors: (0, _parseErrors.parseErrors)(err.errors) });
    });
  }, this.deleteBook = function (req, res) {
    // console.log(req.body.data, req.body.data._id)
    _Book2.default.deleteOne({ '_id': req.body.data._id }).then(function () {
      return res.json({ 'bookId': req.body.data._id });
    }).catch(function (err) {
      return res.status(400).json(err);
    });
  }, this.exchangeRequest = function (req, res) {
    _Book2.default.findById(req.body.data.bookId).then(function (bookFound) {
      bookFound.requested = true;
      bookFound.requestedUserId = req.body.data.userId;
      bookFound.save().then(function (book) {
        // console.log(book)
        res.json({ book: book });
      });
    });
  }, this.deleteExchange = function (req, res) {
    // console.log(req.body.data)
    _Book2.default.findById(req.body.data._id).then(function (bookFound) {
      bookFound.requested = false;
      bookFound.requestedUserId = null;
      bookFound.approved = false;
      bookFound.save().then(function (book) {
        // console.log(book)
        res.json({ book: book });
      });
    });
  }, this.approveExchange = function (req, res) {
    // console.log(req.body.data)
    _Book2.default.findById(req.body.data._id).then(function (bookFound) {
      bookFound.approved = true;
      bookFound.save().then(function (book) {
        // console.log(book)
        res.json({ book: book });
      });
    });
  }, this.myExchanges = function (req, res) {
    // console.log("heja", req.body.data)
    _Book2.default.find({ requestedUserId: req.body.data.userId }).then(function (requests) {
      return res.json({ requests: requests });
    });
  }, this.search = function (req, res) {
    _requestPromise2.default.get('https://www.goodreads.com/search/index.xml?key=' + process.env.GOODREADS_KEY + '&q=' + req.query.q).then(function (result) {
      return (0, _xml2js.parseString)(result, function (err, goodreadsResult) {
        return res.json({
          books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(function (work) {
            return {
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              cover: work.best_book[0].image_url[0]
            };
          })
        });
      });
    });
  };
}