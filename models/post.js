'use strict';

const db = require('../db');

async function create(postData) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    await conn.query(
      'INSERT INTO post (user_id, topic_id, title, body) VALUES (?, ?, ?, ?);',
      [postData.userId, postData.topicId, postData.title, postData.body]
    ).catch(err => { throw err });
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  create,
};
