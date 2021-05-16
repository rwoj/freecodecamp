'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserHandler;

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _parseErrors = require('../utils/parseErrors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserHandler() {
  this.signUp = function (req, res) {
    var _req$body$user = req.body.user,
        username = _req$body$user.username,
        password = _req$body$user.password,
        email = _req$body$user.email;

    _User2.default.find({ 'email': email }).then(function (result) {
      if (result.length === 0) {
        var user = new _User2.default({ username: username, email: email });
        user.setPassword(password);

        user.save().then(function (userRecord) {
          return res.json({ "user": { "email": userRecord.email }
          });
        }).catch(function (err) {
          return res.status(400).json({ "errors": (0, _parseErrors.parseErrors)(err.errors) });
        });
      } else {
        res.status(401).json({ "errors": { "global": "User already exists" } });
      }
    });
  }, this.getProfile = function (req, res) {
    console.log("heja", req.user, req.user._id);
    _User2.default.findById(req.user._id).then(function (user) {
      return res.json({ user: user });
    });
    // .cath(err=>res.status(400).json({"errors": parseErrors(err.errors)}))
  }, this.updateProfile = function (req, res) {
    var _req$body$profile = req.body.profile,
        city = _req$body$profile.city,
        state = _req$body$profile.state;

    console.log(req.body.profile);
    _User2.default.findById(req.user._id).then(function (userRecord) {
      userRecord.city = city;
      userRecord.state = state;
      userRecord.save().then(function (user) {
        return res.json({ user: user });
      });
      // .catch(err=>res.status(400).json({"errors": parseErrors(err.errors)}))
    });
  };
  // this.login = (req,res)=>{
  //   const {email, password} = req.body.user
  //   User
  //     .findOne({'email': email})
  //     .then(user=>{
  //       if (user && user.isValidPassword(password) ) {
  //         res.json(user)
  //       } else {
  //         res.status(400).json({"errors": {"global": "user already exists"}})
  //       }
  //     })
  // }
}