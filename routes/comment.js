'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const commentController = require('../controllers/comment');
const getVars = require('../util').getVars;
const mustBeAuthenticated = require('../util').mustBeAuthenticated;
const router = express.Router();

router.post('/create', mustBeAuthenticated, async (req, res) => {
  try {
    await commentController.create({
      postId: req.body.post,
      userId: req.user.id,
      body: req.body.comment
    });
    res.status(201).redirect(`/posts/${req.body.post}`);
  } catch (err) {
    console.log(err);
    if (!err instanceof HttpError) {
      err = new HttpError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    res.status(err.code).send();
  }
});

module.exports = router;
