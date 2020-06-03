'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./controllers/auth').passport;
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

// Make the public directory available
// from the client side:
app.use(express.static('public'));

// Enable user authentication and sessions:
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Enable flash messages:
app.use(flash());

// Enable parsing of query params:
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use('/', routes);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(`Server failed to start: ${err}`);
  }
  return console.log(`Server running on port ${PORT}`);
});
