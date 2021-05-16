"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _passportConfig = require("./config/passportConfig");

var _passportConfig2 = _interopRequireDefault(_passportConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import path from 'path'
var jsonParser = _bodyParser2.default.json();
//require ('dotenv').load()
// import express from "express"
//
//
// var app = express();
//
// app.get("/", (req, res) => {
//     res.json({hello: 'world'});
// });
//
//
// var port = process.env.PORT || 3000;
//
// var server = app.listen(port, ()=> {
// 	    console.log('Service started on port :' + port);
// });

_dotenv2.default.config();

var app = (0, _express2.default)();

(0, _passportConfig2.default)(_passport2.default);

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(process.env.MONGO_URI, { useMongoClient: true });

var clientPath = process.cwd() + "/client/build";
// app.use('/', express.static(process.cwd()+"/"))
app.use((0, _expressSession2.default)({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(jsonParser);

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

// app.use(express.static(path.join(__dirname, 'client/build')))

(0, _routes2.default)(app, _passport2.default);
// react
// app.use(express.static(clientPath+"/static"))

var port = process.env.PORT || 8080;
app.listen(port, function () {
	return console.log("Running on localhost: " + port);
});