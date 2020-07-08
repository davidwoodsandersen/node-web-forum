'use strict';

const db = require('../db');

async function create(userData) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    await conn.query(`
      INSERT INTO user (username, password, avatar_id)
      VALUES (?, ?, ?);
    `, [userData.username, userData.password, userData.avatarId])
      .catch(err => { throw err });
    const user = await findByUsername(userData.username)
      .catch(err => { throw err });
    return user;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

async function findByUsername(username) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    const results = await conn.query(`
      SELECT id, username, password, avatar_id
      FROM user WHERE username = ?;
    `, [username]).catch(err => { throw err });
    const user = results && results.length ? results[0] : null;
    return user;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

async function getTopContributors(max) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    const results = await conn.query(`
      SELECT
        u.id,
        u.username,
        u.avatar_id AS avatarId,
        COUNT(*) AS posts
      FROM post p
      LEFT JOIN user u ON u.id = p.user_id
      GROUP BY p.user_id
      ORDER BY COUNT(*) DESC LIMIT ?;
    `, [max]).catch(err => { throw err });
    return results;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  create,
  findByUsername,
  getTopContributors,
};
