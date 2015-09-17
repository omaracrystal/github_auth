//github passport strategy
//
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user');
var mongoose = require('mongoose');
var config = require('../../_config');
var shellScript = require('../../env.sh')

var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || config.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || config.GITHUB_CLIENT_SECRET;

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    var githubUser = new User({
      username: profile.displayName,
      email: profile.emails[0].value
    });
    githubUser.save(function(err, user){
      if (err) {
        done(err);
      } else {
        done(null, user);
      }
    });
  }
));

// serialize and deserialize user (passport)
passport.serializeUser(function(user, done) {
  // console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    // console.log(user);
    if(!err) done(null, user);
    else done(err, null);
  });
});

module.exports = passport;

