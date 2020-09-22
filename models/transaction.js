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
  //merchant ex Uber.com, Interac e transfer
  description: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  //Income, Utilities, Food and Dining
  category: {
    type: String,
    required: true,
  },
  //Groceries, Phone Bill etc
  subCategory: {
    type: String,
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
      return this.category === 'Income'
        ? 'Deposit'
        : this.category === 'Transfer'
        ? 'Transfer'
        : 'Withdrawal';
    },
  },
  amountValue: {
    type: Number,
    required: true,
    default: function () {
      const amount = this.amount;
      const paymentType = this.paymentType;

      return paymentType === 'Withdrawal'
        ? amount * -1
        : paymentType === 'Transfer'
        ? 0
        : amount;
    },
  },
});

const Transaction = mongoose.model(
  'Transaction',
  transactionSchema,
  'transactions'
);

module.exports = Transaction;
