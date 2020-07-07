'use strict';

const faker = require('faker');
const user = require('../models/user');
const topic = require('../models/topic');
const post = require('../models/post');

console.log('Seeding MySQL database...');

const USER_COUNT = 50;
const TOPIC_COUNT = 20;
const POST_COUNT = 100;

function randomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async function seed() {
  try {
    for (var i = 0; i < USER_COUNT; i++) {
      await user.create({
       username: faker.internet.userName(),
       password: faker.internet.password()
      });
    }

    for (var i = 0; i < TOPIC_COUNT; i++) {
      await topic.create({
        name: faker.lorem.words(),
        description: faker.lorem.sentence()
      });
    }

    for (var i = 0; i < POST_COUNT; i++) {
      await post.create({
        userId: randomInRange(1, USER_COUNT),
        topicId: randomInRange(1, TOPIC_COUNT),
        title: faker.lorem.words(),
        body: faker.lorem.text()
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
