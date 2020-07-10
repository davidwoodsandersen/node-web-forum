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
    if (!topic) {
      throw new HttpError('Topic not found.', httpStatus.NOT_FOUND);
    }
    const posts = await postController.getByTopicId(req.params.id);
    res.render('topic', Object.assign(getVars(req), {
      topic,
      posts,
    }));
  } catch (err) {
    console.log(err);
    err = new HttpError(err.message, err.code);
    res.status(err.code).render('error', {
      message: err.message,
      code: err.code
    });
  }
});

module.exports = router;
