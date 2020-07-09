'use strict';

const bcrypt = require('bcryptjs');
const httpStatus = require('http-status-codes');
const model = require('../models/user');
const HttpError = require('../util/http-error');
const util = require('../util');
const constants = require('../constants');

async function findByUsername(username) {
  return await model.findByUsername(username);
}

async function getById(id) {
  return await model.getById(id);
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
  const avatarId = util.randomInRange(1, constants.AVATAR_ICON);
  return await model.create({
    username,
    password,
    avatarId,
  });
}

async function getTopContributors(max) {
  return await model.getTopContributors(max);
}

module.exports = {
  createUser,
  findByUsername,
  getById,
  getTopContributors,
  passwordMatches,
};
