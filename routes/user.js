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
    if (!user) {
      throw new HttpError('User not found.', httpStatus.NOT_FOUND);
    }
    const posts = await postController.getByUserId(req.params.id, 30);
    res.render('user', getVars(req, {
      user,
      posts,
      breadcrumb: [
        { name: 'Users', link: '/users' },
        { name: user.username }
      ]
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
