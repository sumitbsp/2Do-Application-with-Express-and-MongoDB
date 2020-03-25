const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    function(req, email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          console.log('error in finding user');
          return done(err);
        }
        if (!user || user.password != password) {
          console.log('Invalid email or password');
          req.flash('success', 'Invalid email/passowrd!');
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize function
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err) {
      console.log('error in finding user');
      return done(err);
    }
    return done(null, user);
  });
});

// check for authenticated user
passport.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/sign-in');
};

passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
