'use strict';

const model = require('../models/comment');

async function getByPostId(id) {
  return await model.getByPostId(id);
}

module.exports = {
  getByPostId,
};
