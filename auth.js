"use strict";

var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy
  , db = require('./db')
  , host = global.host;

var strategy = new GoogleStrategy({
    returnURL: host + '/login/return',
    realm: host
  },
  login);

passport.use(strategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

function serialize(user, done){
  done(null, user.email);
}

function deserialize(email, done){
  db.findUser(email).then(function(user) {
    done(null, user);
  });
}

function login(identifier, profile, done) {
  var email = profile.emails[0].value;
  db.findOrCreateUser(email).then(function(user) {
    done(null, user);
  });
}

function restrict(req, res, next){
  if(req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

exports.authenticate = passport.authenticate("google", {
  failureRedirect: '/login/fail',
  successRedirect: '/'
});
exports.restrict = restrict;
exports.passport = passport;
