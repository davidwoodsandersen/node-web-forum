'use strict';

const bcrypt = require('bcryptjs');
const httpStatus = require('http-status-codes');
const model = require('../models/user');
const HttpError = require('../util/http-error');

async function findByUsername(username) {
  return await model.findByUsername(username);
}

function passwordMatches(raw, hashed) {
  return bcrypt.compareSync(raw, hashed);
}

function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

async function createUser(user) {
  if (!user.username || !user.password) {
    throw new HttpError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Invalid username or password.'
    );
  }
  if (user.password !== user.password2) {
    throw new HttpError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Both passwords must be identical.'
    );
  }
  const username = user.username;
  const password = encryptPassword(user.password);
  return await model.create({
    username,
    password,
  });
}

module.exports = {
  createUser,
  findByUsername,
  passwordMatches,
};
