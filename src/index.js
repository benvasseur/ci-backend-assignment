const express = require('express');
const passport = require('passport');
const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(passport.initialize());
require('./strategies/jsonWTStrategy')(passport);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use('/', routes);

module.exports = app;
