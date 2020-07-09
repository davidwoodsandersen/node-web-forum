'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const postController = require('../controllers/post');
const userController = require('../controllers/user');
const getVars = require('../util').getVars;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const post = await postController.getById(req.params.id);
    const author = await userController.getById(post.userId);
    res.render('post', Object.assign(getVars(req), {
      post,
      author,
    }));
  } catch (err) {
    console.log(err);
    if (!err instanceof HttpError) {
      err = new HttpError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
    res.status(err.code).send();
  }
});

module.exports = router;
