'use strict';

const model = require('../models/topic');

async function create(topicData) {
  return await model.create(topicData);
}

async function getAll() {
  return await model.getAll();
}

async function getPopular(max) {
  return await model.getPopular(max);
}

async function getById(id) {
  return await model.getById(id);
}

module.exports = {
  create,
  getAll,
  getById,
  getPopular,
};
