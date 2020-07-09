'use strict';

const db = require('../db');

async function create(topicData) {
  await db.runQuery(
    'INSERT INTO topic (name, description) VALUES (?, ?);',
    [topicData.name, topicData.description]
  );
}

async function getPopular(max) {
  return await db.runQuery(`
    SELECT
      t.id,
      t.name,
      t.description,
      COUNT(*) AS posts
    FROM topic t
    LEFT JOIN post p ON t.id = p.topic_id
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
  getById,
  getPopular,
};
