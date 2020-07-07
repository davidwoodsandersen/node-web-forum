'use strict';

const faker = require('faker');
const user = require('../models/user');

console.log('Seeding MySQL database...');

module.exports = async function seed() {
  try {
   for (var i = 0; i < 50; i++) {
     await user.create({
      username: faker.internet.userName(),
      password: faker.internet.password()
     });
   }
  } catch (err) {
    throw new Error(err);
  }
};
