'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const userController = require('../controllers/user');
const topicController = require('../controllers/topic');
const postController = require('../controllers/post');
const passport = require('../controllers/auth').passport;
const router = express.Router();

function mustBeAuthenticated(req, res, next) {
  if (!req.user) return res.redirect('/signin');
  next();
}

function mustNotBeAuthenticated(req, res, next) {
  if (req.user) return res.redirect('/');
  next();
}

function getVars(req) {
  return {
    signedIn: !!req.user,
    error: req.flash('error')
  }
}

router.get('/ping', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl
  });
});

router.get('/', async (req, res) => {
  try {
    const topics = await topicController.getPopular(10);
    const topContributors = await userController.getTopContributors(10);
    const recentPosts = await postController.getRecent(5);
    res.render('index', Object.assign(getVars(req), {
      topics,
      topContributors,
      recentPosts,
    }));
  } catch (err) {
    console.log(err);
    if (!err instanceof HttpError) {
      err = new HttpError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
      res.status(err.code).send();
    }
  }
});

router.get('/signin', mustNotBeAuthenticated, (req, res) => {
  res.render('signin', getVars(req));
});

router.post('/signin', mustNotBeAuthenticated, passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: 'Invalid username or password.',
  successRedirect: '/'
}));

router.get('/signup', mustNotBeAuthenticated, (req, res) => {
  res.render('signup', getVars(req));
});

router.post('/signup', mustNotBeAuthenticated, async (req, res) => {
  try {
    const user = await userController.createUser({
      username: req.body.username,
      password: req.body.password,
      password2: req.body.password2
    });
    req.login(user, (err) => {
      if (err) throw new Error(err);
      return res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    if (!err instanceof HttpError) {
      err = new HttpError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    req.flash('error', err.message);
    res.status(err.code).redirect('/signup');
  }
});

module.exports = router;
