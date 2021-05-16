"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  email: String,
  username: String,
  passwordHash: String,
  city: String,
  state: String
  // displayName: String,
});

schema.methods.isValidPassword = function isValidPassword(password) {
  return _bcrypt2.default.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = _bcrypt2.default.hashSync(password, 10);
};

exports.default = _mongoose2.default.model("User", schema);