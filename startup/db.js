const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    //DB is not set yet
    const db = process.env.DB
    mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => winston.info('Connected to the ${db}'));
}