'use strict';

const model = require('../models/post');

async function getRecent(max) {
  return await model.getRecent(max);
}

module.exports = {
  getRecent,
};
