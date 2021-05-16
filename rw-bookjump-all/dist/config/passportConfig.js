'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Strategy } from "passport-local"
var passportConfig = function passportConfig(passport) {
  passport.use(new _passportLocal.Strategy({ usernameField: 'email', passwordField: 'password' }, function (email, password, next) {
    _User2.default.findOne({ 'email': email }).then(function (userRecord) {
      console.log("user", userRecord);
      if (userRecord && userRecord.isValidPassword(password)) {
        return next(null, userRecord);
      } else {
        return next(null, false, { message: "email doesn't exist" });
      }
    }).catch(function (err) {
      return next(err);
    });
  }));
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  passport.deserializeUser(function (id, cb) {
    _User2.default.findById(id, function (err, user) {
      cb(err, user);
    });
  });
  // function(username, password, done) {
  //   User.findOne({ username: username }, function (err, user) {
  //     console.log("autoryzacja", err, user)
  //     if (err) { return done(err); }
  //     if (!user) { return done(null, false, {message: "Incorrect username"}); }
  //     // if (!user.verifyPassword(password)) { return done(null, false, {message: "Incorrect password"}); }
  //     return done(null, user);
  //   });
  // }
};

exports.default = passportConfig;