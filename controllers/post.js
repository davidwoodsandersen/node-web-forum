'use strict';

const model = require('../models/post');

async function getRecent(max) {
  return await model.getRecent(max);
}

async function getByUserId(id, max) {
  return await model.getByUserId(id, max);
}

module.exports = {
  getByUserId,
  getRecent,
};
