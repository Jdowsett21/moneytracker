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

router.put(
  '/updateTransaction/:id',
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    const accounts = await Account.find({ userId: user._id });

    // const correctAccount = accounts.filter(
    //   (account) => req.body.accountName === account.accountName
    // );

    // if (correctAccount.length < 1) {
    //   return res.status(400).json({
    //     message: 'This individual does not have an account under this name',
    //   });
    // }
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        shortDate: req.body.shortDate,
        description: req.body.description,
        accountName: req.body.accountName,
        category: req.body.category,
        subCategory: req.body.subCategory,
        amount: req.body.amount,
      },
      { new: true }
    );

    // await Account.findByIdAndUpdate(
    //   correctAccount,
    //   {
    //     $inc: {
    //       balance:
    //         transaction.paymentType === 'Withdrawal' &&
    //         transaction.amount > req.body.amount
    //           ? -(transaction.amount - req.body.amount)
    //           : req.body.amount > transaction.amount
    //           ? -(req.body.amount - transaction.amount)
    //           : transaction.paymentType === 'Deposit' &&
    //             transaction.amount > req.body.amount
    //           ? transaction.amount - req.body.amount
    //           : req.body.amount - transaction.amount,
    //     },
    //   },
    //   { new: true }
    // );
    res.send(transaction);
  })
);

router.get(
  '/monthAndType/:month/:type',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      userId: req.user._id,
      shortDate: { $regex: req.params.month, $options: 'i' },
      paymentType: req.params.type,
    });
    res.send(transactions);
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
  '/account/:account',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      userId: req.user._id,
      accountId: req.params.account,
    });

    res.send(transactions);
  })
);

router.get(
  '/accountCategory/:accountCategory',
  asyncMiddleware(async (req, res) => {
    const { accountCategory } = req.params;

    const accounts =
      accountCategory === 'Cash & Credit'
        ? await Account.find({
            userId: req.user._id,
            $or: [{ accountCategory: 'Cash' }, { accountCategory: 'Credit' }],
          })
        : await Account.find({
            userId: req.user._id,
            accountCategory: accountCategory,
          });

    const transactions = await Transaction.find({
      userId: req.user._id,
      // map through all accounts to find all transactions
      //within that account
      accountId: { $in: accounts.map((account) => account._id) },
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
