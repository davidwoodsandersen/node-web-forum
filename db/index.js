'use strict';

const mysql = require('mysql');

var connection;

function connect(callback) {
  connection = mysql.createConnection({
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });
  connection.connect(callback);
}

function query() {
  connection.query(arguments);
}

module.exports = {
  connect,
  query
};
