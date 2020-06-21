const express = require('express');
const app = express.Router();
const add_accounts = require('../models/add_account')
const budgets = require('../routes/budgets');
const goals = require('../routes/goals');
const login = require('../routes/login');
const logout = require('../routes/logout');
const overview = require('../routes/overview');
const profile = require('../routes/profile');
const settings= require('../routes/settings');
const tour = require('../routes/tour');
const transactions = require('../routes/transactions');
const waysToSave = require('../routes/waysToSave');



module.exports = function(app) {
    app.use(express.json());
    app.use('/mint/add_accounts', add_accounts);
    app.use('/mint/budgets', budgets);
    app.use('/mint/goals', goals);
    app.use('/mint/login', login);
    app.use('/mint/logout', logout);
    app.use('/mint/overview', overview);
    app.use('/mint/profile', profile);
    app.use('/mint/settings', settings);
    app.use('/mint/tour', tour);
    app.use('/mint/trends', transactions);
    app.use('/mint/waysToSave', waysToSave);
    app.use(error);
}