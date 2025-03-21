'use strict';

const db = require('../db');

async function create(topicData) {
  const results = await db.runQuery(
    'INSERT INTO topic (name, description) VALUES (?, ?);',
    [topicData.name, topicData.description]
  );
  return await getById(results.insertId);
}

async function getAll() {
  return await db.runQuery(`
    SELECT
      t.*,
      COUNT(*) AS posts
    FROM topic t
    LEFT JOIN post p ON t.id = p.topicId
    GROUP BY t.id
    ORDER BY t.name ASC;
  `);
}

async function getPopular(max) {
  return await db.runQuery(`
    SELECT
      t.id,
      t.name,
      t.description,
      COUNT(*) AS posts
    FROM topic t
    LEFT JOIN post p ON t.id = p.topicId
    GROUP BY t.id
    ORDER BY COUNT(*) DESC LIMIT ?;
  `, [max]);
}

async function getById(id) {
  const results = await db.runQuery(
    'SELECT * FROM topic WHERE id = ?;',
    [id]
  );
  const topic = results && results.length ? results[0] : null;
  return topic;
}

module.exports = {
  create,
  getAll,
  getById,
  getPopular,
};
