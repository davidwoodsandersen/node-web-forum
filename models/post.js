'use strict';

const db = require('../db');

async function create(postData) {
  const results = await db.runQuery(
    'INSERT INTO post (userId, topicId, title, body) VALUES (?, ?, ?, ?);',
    [postData.userId, postData.topicId, postData.title, postData.body]
  );
  return await getById(results.insertId);
}

async function getById(id) {
  const results = await db.runQuery(`
    SELECT
      p.*,
      t.name AS topicName
    FROM post p
    LEFT JOIN topic t ON t.id = p.topicId
    WHERE p.id = ?;
  `, [id]);
  const post = results && results.length ? results[0] : null;
  return post;
}

async function getRecent(max) {
  return await db.runQuery(`
    SELECT
      p.id,
      p.userId,
      u.username AS username,
      u.avatarId,
      p.topicId,
      t.name AS topicName,
      p.title,
      p.created
    FROM post p
    LEFT JOIN topic t ON t.id = p.topicId
    LEFT JOIN user u ON u.id = p.userId
    ORDER BY p.created ASC LIMIT ?;
  `, [max]);
}

async function getByUserId(id, max) {
  return await db.runQuery(`
    SELECT * FROM post
    WHERE userId = ?
    ORDER BY created DESC
    LIMIT ?;
  `, [id, max]);
}

async function getByTopicId(id) {
  return await db.runQuery(`
    SELECT
      p.*,
      u.avatarId
    FROM post p
    LEFT JOIN user u ON u.id = p.userId
    WHERE p.topicId = ?;
  `, [id]);
}

module.exports = {
  create,
  getById,
  getByTopicId,
  getByUserId,
  getRecent,
};
