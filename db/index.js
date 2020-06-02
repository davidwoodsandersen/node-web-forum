'use strict';

const mysql = require('promise-mysql');

var pool;

async function getConnection() {
  if (!pool) {
    pool = await mysql.createPool({
      connectionLimit: process.env.MYSQL_CONN_LIMIT || 100,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    });
  }
  return await pool.getConnection();
}

module.exports = {
  getConnection,
}
