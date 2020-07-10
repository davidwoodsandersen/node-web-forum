'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const postController = require('../controllers/post');
const userController = require('../controllers/user');
const commentController = require('../controllers/comment');
const getVars = require('../util').getVars;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const post = await postController.getById(req.params.id);
    const author = await userController.getById(post.userId);
    const comments = await commentController.getByPostId(post.id);
    res.render('post', Object.assign(getVars(req), {
      post,
      author,
      comments,
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
