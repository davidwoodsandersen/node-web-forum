'use strict';

const model = require('../models/post');

async function create(postData) {
  return await model.create(postData);
}

async function getRecent(max) {
  return await model.getRecent(max);
}

async function getById(id) {
  return await model.getById(id);
}

async function getByUserId(id, max) {
  return await model.getByUserId(id, max);
}

async function getByTopicId(id) {
  return await model.getByTopicId(id);
}

module.exports = {
  create,
  getById,
  getByTopicId,
  getByUserId,
  getRecent,
};
