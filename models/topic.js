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

async function getPopular(max) {
  var conn;
  try {
    conn = await db.getConnection()
      .catch(err => { throw err });
    const results = await conn.query(`
      SELECT
        t.id,
        t.name,
        t.description,
        COUNT(*) AS posts
      FROM topic t
      LEFT JOIN post p ON t.id = p.topic_id
      GROUP BY t.id
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
  getPopular,
};
