"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  cover: { type: String, required: true },
  goodreadsId: { type: String },
  requested: { type: Boolean },
  requestedUserId: { type: _mongoose2.default.Schema.Types.ObjectId },
  approved: { type: Boolean },
  userId: { type: _mongoose2.default.Schema.Types.ObjectId, required: true }
});

exports.default = _mongoose2.default.model("Book", schema);