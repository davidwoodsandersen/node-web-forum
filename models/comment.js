'use strict';

const db = require('../db');

async function create(commentData) {
  await db.runQuery(
    'INSERT INTO comment (userId, postId, body) VALUES (?, ?, ?)',
    [commentData.userId, commentData.postId, commentData.body]
  );
}

async function getByPostId(id) {
  return await db.runQuery(`
    SELECT
      c.*,
      u.avatarId,
      u.username
    FROM comment c
    LEFT JOIN user u ON u.id = c.userId
    WHERE c.postId = ?;
  `, [id]);
}

module.exports = {
  create,
  getByPostId,
};
