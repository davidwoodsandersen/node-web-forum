'use strict';

const faker = require('faker');
const user = require('../models/user');
const topic = require('../models/topic');
const post = require('../models/post');
const comment = require('../models/comment');
const util = require('../util');
const constants = require('../constants');

console.log('Seeding MySQL database...');

module.exports = async function seed() {
  try {
    for (var i = 0; i < constants.USER_SEED_COUNT; i++) {
      await user.create({
       username: faker.internet.userName(),
       password: faker.internet.password(),
       avatarId: util.randomInRange(1, constants.AVATAR_COUNT)
      });
    }

    for (var i = 0; i < constants.TOPIC_SEED_COUNT; i++) {
      await topic.create({
        name: faker.lorem.words(),
        description: faker.lorem.sentence()
      });
    }

    for (var i = 0; i < constants.POST_SEED_COUNT; i++) {
      await post.create({
        userId: util.randomInRange(1, constants.USER_SEED_COUNT),
        topicId: util.randomInRange(1, constants.TOPIC_SEED_COUNT),
        title: faker.lorem.words(),
        body: faker.lorem.text()
      });
    }

    for (var i = 0; i < constants.COMMENT_SEED_COUNT; i++) {
      await comment.create({
        userId: util.randomInRange(1, constants.USER_SEED_COUNT),
        postId: util.randomInRange(1, constants.POST_SEED_COUNT),
        body: faker.lorem.text()
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};
