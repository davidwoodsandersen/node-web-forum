'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('./user');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userController.findByUsername(username);
      if (!user) return done(null, false);
      const passwordMatches = userController.passwordMatches(password, user.password);
      if (!passwordMatches) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = {
  passport,
};
