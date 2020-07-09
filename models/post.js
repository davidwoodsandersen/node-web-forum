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

async function getRecent(max) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    const results = await conn.query(`
      SELECT
        p.id,
        p.user_id AS userId,
        u.username AS username,
        u.avatar_id AS avatarId,
        p.topic_id AS topicId,
        t.name AS topicName,
        p.title,
        p.created
      FROM post p
      LEFT JOIN topic t ON t.id = p.topic_id
      LEFT JOIN user u ON u.id = p.user_id
      ORDER BY p.created DESC LIMIT ?;
    `, [max]).catch(err => { throw err });
    return results;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

async function getByUserId(id, max) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err })
    const results = await conn.query(`
      SELECT * FROM post
      WHERE user_id = ?
      ORDER BY created DESC
      LIMIT ?;
    `, [id, max]).catch(err => { throw err });
    return results;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  create,
  getByUserId,
  getRecent,
};
