'use strict';

const model = require('../models/topic');

async function getPopular(max) {
  return await model.getPopular(max);
}

async function getById(id) {
  return await model.getById(id);
}

module.exports = {
  getById,
  getPopular,
};
