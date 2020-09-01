const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { User } = require('../models/user');
const Account = require('../models/account');
const asyncMiddleware = require('../middleware/async');

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user._id });

    res.send(transactions);
  })
);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    const accounts = await Account.find({ userId: user._id });

    const correctAccount = accounts.filter(
      (account) => req.body.accountName === account.accountName
    );
    console.log('correctAccount', correctAccount);
    if (correctAccount.length < 1) {
      return res.status(400).json({
        message: 'This individual does not have an account under this name',
      });
    }
    const transaction = new Transaction({
      ...req.body,
      accountId: correctAccount[0]._id,
      userId: user._id,
    });

    await transaction.save();

    await Account.findByIdAndUpdate(
      correctAccount,
      {
        $inc: {
          balance:
            transaction.paymentType === 'Withdrawal'
              ? -transaction.amount
              : +transaction.amount,
        },
      },
      { new: true }
    );
    res.send(transaction);
  })
);

router.get(
  '/category/:category',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      userId: req.user._id,
      category: req.params.category,
    });
    if (transactions.length < 1)
      return res.status(400).json({
        message: 'User does not have any transactions under this category',
      });

    res.send(transactions);
  })
);

router.get(
  '/month/:month',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      userId: req.user._id,
      shortDate: { $regex: req.params.month, $options: 'i' },
    });

    res.send(transactions);
  })
);

module.exports = router;
