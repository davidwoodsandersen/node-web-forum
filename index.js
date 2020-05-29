'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/ping', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Server failed to start: ${err}`);
  }
  return console.log(`Server running on port ${PORT}`);
});
