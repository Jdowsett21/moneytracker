const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const Account = require('../models/account');
const bcrypt = require('bcryptjs');
const asyncMiddleware = require('../middleware/async');

router.post(
  '/createAccount',
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    const existingAccounts = await Account.find({ userId: user._id });

    const duplicateAccount = existingAccounts.filter(
      (account) => req.body.accountType === account.accountType
    );
    if (duplicateAccount.length > 0)
      return res.status(400).send('Account type already exists');

    const account = new Account({
      ...req.body,
      userId: req.user._id,
    });

    account.accountNumber = await bcrypt.hash(account.accountNumber, 10);

    await account.save();
    res.send(account);
  })
);

router.get(
  '/getAccounts',

  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    const accounts = await Account.find();
    //user specific searches disabled for
    //display purposes
    // { userId: user._id });

    res.json(accounts);
  })
);

router.get(
  '/getSingleAccount/:accountId',

  asyncMiddleware(async (req, res) => {
    const singleAccount = await Account.findById(req.params.accountId);

    res.json(singleAccount);
  })
);
module.exports = router;
