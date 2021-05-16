// import { Strategy } from "passport-local"
import User from "../models/User"
import {Strategy} from 'passport-local'

const passportConfig = (passport)=>{
  passport.use(new Strategy(
    {usernameField: 'email', passwordField: 'password'},
    function(email, password, next){
      User
      .findOne({'email': email})
      .then(userRecord=>{
        console.log("user", userRecord)
        if (userRecord && userRecord.isValidPassword(password) ) {
          return next(null, userRecord)
        } else {
          return next(null, false, {message: "email doesn't exist"})
        }
      })
      .catch(err=>next(err))
    }
));
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
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

}

export default passportConfig
