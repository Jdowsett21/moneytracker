const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { User } = require('../models/user');
const Account = require('../models/account');
const asyncMiddleware = require('../middleware/async');
const moment = require('moment');
router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find();
    //user specific searches disabled for
    //display purposes
    // { userId: req.user._id });

    res.send(transactions);
  })
);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const accounts = await Account.find({ userId: req.user._id });

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
      userId: req.user._id,
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
    const accounts = await Account.find();
    // { userId: req. user._id });

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        date: new Date(moment(req.body.shortDate).format('YYYY,MM,DD')),
        shortDate: req.body.shortDate,
        description: req.body.description,
        accountName: req.body.accountName,
        category: req.body.category,
        subCategory: req.body.subCategory,
        amount: req.body.amount,
      },
      { new: true }
    );
    s;

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
  '/dateAndType/:date1/:date2/:type',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
      date: {
        $gte: new Date(req.params.date1),
        $lte: new Date(req.params.date2),
      },
      paymentType: req.params.type,
    });
    res.send(transactions);
  })
);

router.get(
  '/category/:category',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
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
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
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
            //user specific searches disabled for
            //display purposes
            // userId: req.user._id,
            $or: [{ accountCategory: 'Cash' }, { accountCategory: 'Credit' }],
          })
        : await Account.find({
            //user specific searches disabled for
            //display purposes
            // userId: req.user._id,
            accountCategory: accountCategory,
          });

    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,

      // map through all accounts to find all transactions
      //within that account
      accountId: { $in: accounts.map((account) => account._id) },
    });

    res.send(transactions);
  })
);

router.get(
  '/month/:date1/:date2',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
      date: {
        $gte: new Date(req.params.date1),
        $lte: new Date(req.params.date2),
      },
    });
    res.send(transactions);
  })
);

router.get(
  '/account/:account',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
      accountId: req.params.account,
    });

    res.send(transactions);
  })
);
router.get(
  '/dateAndCategory/:category/:date1/:date2',
  asyncMiddleware(async (req, res) => {
    const transactions = await Transaction.find({
      //user specific searches disabled for
      //display purposes
      // userId: req.user._id,
      category: req.params.category,
      date: {
        $gte: new Date(req.params.date1),
        $lte: new Date(req.params.date2),
      },
    });

    res.send(transactions);
  })
);

router.get(
  '/graphInfo/:range1/:range2/:type/:subType/:tags',
  async (req, res) => {
    const accountToFilter = req.query.accounts.map((account) => {
      return JSON.parse(account);
    });

    const typeArray = ['Withdrawal', 'Deposit'];

    const transactions = await Transaction.find({
      date: {
        $gte: new Date(req.params.range1),
        $lte: new Date(req.params.range2),
      },
      accountId: { $in: accountToFilter.map((account) => account._id) },
      paymentType:
        req.params.type === 'Spending'
          ? typeArray[0]
          : req.params.type === 'Income'
          ? typeArray[1]
          : { $in: typeArray.map((type) => type) },
    });

    res.send(transactions);
  }
);

router.get('/overviewGraph/:range1/:range2/:type', async (req, res) => {
  const transactions = await Transaction.find({
    date: {
      $gte: new Date(req.params.range1),
      $lte: new Date(req.params.range2),
    },
    paymentType: req.params.type,
  });

  res.send(transactions);
});

module.exports = router;
