const mongoose = require('mongoose');
const moment = require('moment');
const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  shortDate: {
    type: String,
    default: moment().format('MMM, DD'),
  },
  description: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  paymentType: {
    type: String,
    default: function () {
      const incomeCategories = [
        'Income',
        'Deposit',
        'Cashback',
        'Refund',
        'Payment',
      ];

      return incomeCategories.filter((c) => c === this.category).length > 0
        ? 'Deposit'
        : 'Withdrawal';
    },
  },
  amountValue: {
    type: Number,
    required: true,
    default: function () {
      const amount = this.amount;
      const paymentType = this.paymentType;

      return paymentType === 'Withdrawal' ? amount * -1 : amount;
    },
  },
});

const Transaction = mongoose.model(
  'Transaction',
  transactionSchema,
  'transactions'
);

module.exports = Transaction;
