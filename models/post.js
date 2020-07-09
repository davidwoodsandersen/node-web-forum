'use strict';

const db = require('../db');

async function create(postData) {
  await db.runQuery(
    'INSERT INTO post (user_id, topic_id, title, body) VALUES (?, ?, ?, ?);',
    [postData.userId, postData.topicId, postData.title, postData.body]
  );
}

async function getRecent(max) {
  return await db.runQuery(`
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
  `, [max]);
}

async function getByUserId(id, max) {
  return await db.runQuery(`
    SELECT * FROM post
    WHERE user_id = ?
    ORDER BY created DESC
    LIMIT ?;
  `, [id, max]);
}

async function getByTopicId(id) {
  return await db.runQuery(`
    SELECT
      p.*,
      u.avatar_id AS avatarId
    FROM post p
    LEFT JOIN user u ON u.id = p.user_id
    WHERE p.topic_id = ?;
  `, [id]);
}

module.exports = {
  create,
  getByTopicId,
  getByUserId,
  getRecent,
};
