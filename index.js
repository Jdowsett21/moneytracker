const express = require('express');
const app = express();
const winston = require('winston');


//require('./startup/logs');
require('./startup/db');
require('./startup/routes');


const port = process.env.PORT;

const server = app.listen(port, () => winston.info(`Connected to ${port}`));

module.exports = server;