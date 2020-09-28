const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  mongoose
    .connect(process.env.ASCENSION_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to the ${process.env.ASCENSION_DB}`))
    .catch((err) => winston.error(err));
};
