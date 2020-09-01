const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logs');
require('./startup/routes')(app);
require('./startup/db')();

const port = 5000;

const server = app.listen(port, () => winston.info(`Connected to ${port}`));

module.exports = server;
