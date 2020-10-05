const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to the ${process.env.MONGODB_URL}`))
    .catch((err) => winston.error(err));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
  });
};
