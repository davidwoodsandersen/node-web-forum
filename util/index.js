'use strict';

function randomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mustBeAuthenticated(req, res, next) {
  if (!req.user) return res.redirect('/signin');
  next();
}

function mustNotBeAuthenticated(req, res, next) {
  if (req.user) return res.redirect('/');
  next();
}

function getVars(req, props = {}) {
  const defaults = {
    signedIn: !!req.user,
    error: req.flash('error')
  };
  return Object.assign(defaults, props);
}

module.exports = {
  getVars,
  mustBeAuthenticated,
  mustNotBeAuthenticated,
  randomInRange,
};
