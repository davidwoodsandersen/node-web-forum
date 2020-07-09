'use strict';

const db = require('../db');

async function create(userData) {
  await db.runQuery(`
    INSERT INTO user (username, password, avatar_id)
    VALUES (?, ?, ?);
  `, [userData.username, userData.password, userData.avatarId])
}

async function findByUsername(username) {
  const results = await db.runQuery(`
    SELECT id, username, password, avatar_id AS avatarId
    FROM user WHERE username = ?;
  `, [username]);
  const user = results && results.length ? results[0] : null;
  return user;
}

async function getById(id) {
  const results = await db.runQuery(`
    SELECT id, username, password, avatar_id AS avatarId
    FROM user WHERE id = ?;
  `, [id]);
  const user = results && results.length ? results[0] : null;
  return user;
}

async function getTopContributors(max) {
  return await db.runQuery(`
    SELECT
      u.id,
      u.username,
      u.avatar_id AS avatarId,
      COUNT(*) AS posts
    FROM post p
    LEFT JOIN user u ON u.id = p.user_id
    GROUP BY p.user_id
    ORDER BY COUNT(*) DESC LIMIT ?;
  `, [max]);
}

module.exports = {
  create,
  findByUsername,
  getById,
  getTopContributors,
};
