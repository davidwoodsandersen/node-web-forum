'use strict';

const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl
  });
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
