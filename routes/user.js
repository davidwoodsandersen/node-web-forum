'use strict';

const express = require('express');
const httpStatus = require('http-status-codes');
const HttpError = require('../util/http-error');
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const getVars = require('../util').getVars;
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await userController.getById(req.params.id);
    const posts = await postController.getByUserId(req.params.id, 30);
    res.render('user', Object.assign(getVars(req), {
      user,
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
