//routes
const accounts = require('../routes/accounts');
const auth = require('../routes/auth');
const settings = require('../routes/settings');
const transactions = require('../routes/transactions');
const users = require('../routes/users');
const budgets = require('../routes/budgets');
//middleware
const jwt = require('express-jwt');
const attachUser = require('../middleware/attachUser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');

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
  app.use('/api/auth', auth);
  app.use(attachUser);
  app.use(verifyJwt);
  app.use(csrfProtection);
  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
  app.use('/api/settings', settings);
  app.use('/api/transactions', transactions);
  app.use('/api/budgets', budgets);
};
