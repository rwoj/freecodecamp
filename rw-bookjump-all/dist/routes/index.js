'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserHandler = require('../controllers/UserHandler');

var _UserHandler2 = _interopRequireDefault(_UserHandler);

var _BookHandler = require('../controllers/BookHandler');

var _BookHandler2 = _interopRequireDefault(_BookHandler);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd() + "/src";
var clientPath = process.cwd() + "/client/build";
var userHandler = new _UserHandler2.default();
var booksHandler = new _BookHandler2.default();

var routes = function routes(app, passport) {
  // const isLoggedIn=(req, res, next)=>{
  //   if(req.isAuthenicated()){
  //     return next()
  //   } else {
  //     res.redirect("/")
  //   }
  // }
  var isAuthorized = function isAuthorized(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.user = {};
      return next();
      // res.redirect("/")
    }
  };
  // app.use("/", express.static(path))
  // app.get("/", (req, res) => {
  //   res.sendFile(path + "/index.html");
  // });

  app.get("/api/books/all", booksHandler.getAll);

  app.get("/api/books/my", isAuthorized, booksHandler.getMy);
  app.post("/api/books/my", isAuthorized, booksHandler.addMy);

  app.post("/api/books/delete", isAuthorized, booksHandler.deleteBook);

  app.post("/api/books/exchange/my", isAuthorized, booksHandler.myExchanges);
  app.post("/api/books/exchange/new", isAuthorized, booksHandler.exchangeRequest);
  app.post("/api/books/exchange/delete", isAuthorized, booksHandler.deleteExchange);
  app.post("/api/books/exchange/approve", isAuthorized, booksHandler.approveExchange);

  app.get("/api/books/search", booksHandler.search);

  app.get("/api/user/profile", isAuthorized, userHandler.getProfile);
  app.post("/api/user/profile", isAuthorized, userHandler.updateProfile);

  app.post("/api/signup", userHandler.signUp);
  app.get('/api/login', function (req, res) {
    res.status(401).json({ 'errors': { "global": "Credentials are not valid" } });
  });
  app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/login' }), function (req, res) {
    res.json({ user: { email: req.user.email, username: req.user.username, userId: req.user._id } });
    // res.redirect('/');
  });
  app.get('/api/logout', function (req, res) {
    req.logout();
    res.json({});
  });

  // app.use("/", express.static(clientPath))
  // app.get("/", (req, res) => {
  //   res.sendFile(clientPath + "/index.html");
  // });

  // react
  app.use(_express2.default.static(clientPath));
  app.get("*", function (req, res) {
    res.sendFile(clientPath + "/index.html");
  });
};
exports.default = routes;

// Define routes.
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });