'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const topicController = require('../controllers/topic');
const postController = require('../controllers/post');
const mustBeAuthenticated = require('../util').mustBeAuthenticated;
const getVars = require('../util').getVars;
const router = express.Router();

router.get('/create', mustBeAuthenticated, (req, res) => {
  res.render('new-topic', getVars(req));
});

router.post('/create', mustBeAuthenticated, async (req, res) => {
  try {
    const topic = await topicController.create({
      name: req.body.name,
      description: req.body.description
    });
    res.status(201).redirect(`/topics/${topic.id}`);
  } catch (err) {
    console.log(err);
    err = new HttpError(err.message, err.code);
    res.status(err.code).render('error', getVars(req, {
      message: err.message,
      code: err.code
    }));
  }
});

router.get('/:id/post', mustBeAuthenticated, (req, res) => {
  res.render('new-post', getVars(req, {
    topicId: req.params.id
  }));
});

router.get('/:id', async (req, res) => {
  try {
    const topic = await topicController.getById(req.params.id);
    if (!topic) {
      throw new HttpError('Topic not found.', httpStatus.NOT_FOUND);
    }
    const posts = await postController.getByTopicId(req.params.id);
    res.render('topic', getVars(req, {
      topic,
      posts,
    }));
  } catch (err) {
    console.log(err);
    err = new HttpError(err.message, err.code);
    res.status(err.code).render('error', getVars(req, {
      message: err.message,
      code: err.code
    }));
  }
});

module.exports = router;
