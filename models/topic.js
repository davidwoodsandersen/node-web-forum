'use strict';

const db = require('../db');

async function create(topicData) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    await conn.query(
      'INSERT INTO topic (name, description) VALUES (?, ?);',
      [topicData.name, topicData.description]
    ).catch(err => { throw err; });
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  create,
};
