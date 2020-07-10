'use strict';

const model = require('../models/comment');

async function create(commentData) {
  await model.create(commentData);
}

async function getByPostId(id) {
  return await model.getByPostId(id);
}

module.exports = {
  create,
  getByPostId,
};
