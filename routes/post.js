'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const postController = require('../controllers/post');
const userController = require('../controllers/user');
const commentController = require('../controllers/comment');
const getVars = require('../util').getVars;
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const post = await postController.create({
      userId: req.user.id,
      topicId: req.body.topicId,
      title: req.body.title,
      body: req.body.body
    });
    res.status(201).redirect(`/posts/${post.id}`);
  } catch (err) {
    console.log(err);
    err = new HttpError(err.message, err.code);
    res.status(err.code).render('error', getVars(req, {
      message: err.message,
      code: err.code
    }));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postController.getById(req.params.id);
    if (!post) {
      throw new HttpError('Post not found.', httpStatus.NOT_FOUND);
    }
    const author = await userController.getById(post.userId);
    const comments = await commentController.getByPostId(post.id);
    res.render('post', getVars(req, {
      post,
      author,
      comments,
    }))
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
