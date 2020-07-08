'use strict';

const model = require('../models/topic');

async function getPopular(max) {
  return await model.getPopular(max);
}

module.exports = {
  getPopular,
};
