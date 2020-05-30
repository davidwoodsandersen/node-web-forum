'use strict';

const express = require('express');
const db = require('./db');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use('/', routes);

db.connect((err) => {
  if (err) {
    return console.log(`Error connecting to DB: ${err}`);
  }
  app.listen(PORT, (err) => {
    if (err) {
      return console.log(`Server failed to start: ${err}`);
    }
    return console.log(`Server running on port ${PORT}`);
  });
});
