//routes
const accounts = require('../routes/accounts');
const auth = require('../routes/auth');
const settings = require('../routes/settings');
const transactions = require('../routes/transactions');
const users = require('../routes/users');
const budgets = require('../routes/budgets');
const budgetCategories = require('../routes/budgetCategories');
//middleware
const jwt = require('express-jwt');
const attachUser = require('../middleware/attachUser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const express = require('express');
const csrfProtection = csrf({ cookie: true });

const verifyJwt = jwt({
  secret: process.env.JWT_SECRET,
  iss: 'api.money-tracker',
  aud: 'api.money-tracker',
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.token,
});

module.exports = function (app) {
  app.use(cookieParser());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }
  app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html file path'));
  });
  app.use('/api/auth', auth);
  app.use(attachUser);
  app.use(verifyJwt);
  app.use(csrfProtection);
  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
  app.use('/api/settings', settings);
  app.use('/api/transactions', transactions);
  app.use('/api/budgets', budgets);
  app.use('/api/budgetCategories', budgetCategories);
};
