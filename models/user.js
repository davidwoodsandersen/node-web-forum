'use strict';

const db = require('../db');

async function create(userData) {
  try {
    const conn = await db.getConnection()
      .catch(err => { throw err });
    await conn.query(
      'INSERT INTO user (username, password) VALUES (?, ?);',
      [userData.username, userData.password]
    ).catch(err => { throw err });
    const user = await findByUsername(userData.username)
      .catch(err => { throw err });
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

async function findByUsername(username) {
  try {
    const conn = await db.getConnection()
      .catch(err => { throw err });
    const results = await conn.query(
      'SELECT id, username, password FROM user WHERE username = ?;',
      [username]
    ).catch(err => { throw err });
    const user = results && results.length ? results[0] : null;
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  create,
  findByUsername,
};
