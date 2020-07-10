'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const topicController = require('../controllers/topic');
const postController = require('../controllers/post');
const getVars = require('../util').getVars;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const topic = await topicController.getById(req.params.id);
    const posts = await postController.getByTopicId(req.params.id);
    res.render('topic', Object.assign(getVars(req), {
      topic,
      posts,
    }));
  } catch (err) {
    console.log(err);
    err = new HttpError(err);
    res.status(err.code).render('error', {
      message: err.message
    });
  }
});

module.exports = router;
