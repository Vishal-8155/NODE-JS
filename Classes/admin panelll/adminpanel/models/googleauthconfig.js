const passport = require('passport')
const mongoose = require('mongoose');

const model = require("./registermodels")
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 
passport.use(new GoogleStrategy({
    clientID:"843629882441-sq995b7pbi0i9443nstfrn25at3bu3m6.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    model.findOrCreate({ googleId: profile.id }, function (err, user,created) {
      
      if(created) {
        
        user.created = true;
        user.profile = profile;
        // console.log("Created ",created);
        return cb(err, user);
      } else {
        user.created = false;
         console.log('Updated "%s"', user.googleId);
          return cb(err, user);
        
      }
      
      // model.findOrCreate({googleId: profile.id}, function(err, user, created) {
      //   // created will be false here
      //   console.log('Updated "%s"', user.googleId);
      // })
    });
  }
));