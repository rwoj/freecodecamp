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

import express from "express";
// import path from 'path'
import routes from "./routes"
import mongoose from "mongoose";
import Promise from "bluebird";
import passport from "passport"
import session from "express-session"
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
//require ('dotenv').load()
import dotenv from "dotenv";
dotenv.config();

const app = express();
import passportConfig from './config/passportConfig'
passportConfig(passport)

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

const clientPath=process.cwd()+"/client/build"
// app.use('/', express.static(process.cwd()+"/"))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(jsonParser)

app.use(passport.initialize());
app.use(passport.session());


// app.use(express.static(path.join(__dirname, 'client/build')))

routes(app, passport);
// react
	// app.use(express.static(clientPath+"/static"))

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Running on localhost: ${port}`));
