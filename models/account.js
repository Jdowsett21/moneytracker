const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountName: {
    type: 'String',
    required: true,
  },
  accountType: {
    type: 'String',
    enum: [
      'Chequing',
      'TFSA',
      'Savings',
      'RESP',
      'Line Of Credit',
      'Mortgage',
      'OSAP',
      'RRSP',
      'Margin',
      'RPP',
      'GIC',
      'Mutual Fund',
      'MasterCard',
      'American Express',
      'Visa',
      'Bond',
      'Car Loan',
      'House',
      'Car',
      'Boat',
    ],
    default: function () {
      return this.accountName.split(' ').length > 1
        ? this.accountName.split(' ').slice(1).join()
        : this.accountName;
    },
    required: true,
  },
  accountCategory: {
    type: 'String',
    default: function () {
      accountType = this.accountType;
      if (
        accountType === 'Mortgage' ||
        accountType === 'OSAP' ||
        accountType === 'Car Loan' ||
        accountType === 'Line Of Credit'
      )
        return 'Loan';
      if (
        accountType === 'MasterCard' ||
        accountType === 'Visa' ||
        accountType === 'American Express'
      )
        return 'Credit';

      if (accountType === 'Chequing' || accountType === 'Savings')
        return 'Cash';
      if (
        accountType === 'Car' ||
        accountType === 'House' ||
        accountType === 'Boat'
      )
        return 'Property';
      return 'Investment';
    },
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  accountNumber: {
    type: String,
    unique: true,
    default: function () {
      let accountType = this.accountType;
      let accountCategory = this.accountCategory;
      console.log(accountCategory);
      if (accountCategory === 'Property') {
        return '';
      } else {
        let digits = Math.floor(
          Math.random() * (999999999999 - 100000000000 + 1) + 100000000000
        );

        if (accountType === 'TFSA') return `5010${digits}`;
        if (accountType === 'Chequing') return `5187${digits}`;
        if (accountType === 'Savings') return `5197${digits}`;
        if (accountType === 'RESP') return `5127${digits}`;
        if (accountType === 'Line Of Credit') return `5197${digits}`;
        if (accountType === 'Mortgage') return `5137${digits}`;
        if (accountType === 'OSAP') return `5067${digits}`;
        if (accountType === 'RRSP') return `5077${digits}`;
        if (accountType === 'Margin') return `5147${digits}`;
        if (accountType === 'RPP') return `5429${digits}`;
        if (accountType === 'GIC') return `5177${digits}`;
        if (accountType === 'Mutual Fund') return `5157${digits}`;
        if (accountType === 'MasterCard') return `5207${digits}`;
        if (accountType === 'American Express') return `5217${digits}`;
        if (accountType === 'Visa') return `5227${digits}`;
        if (accountType === 'Bond') return `5237${digits}`;
        if (accountType === 'Car Loan') return `5237${digits}`;
      }
    },
    required: true,
  },
  hiddenAccountNumber: {
    type: String,
    default: function () {
      let num = this.accountNumber;
      if (num === '') {
        return 1;
      } else {
        let hiddenNumber = `${num
          .split('')
          .slice(0, 4)
          .join('')} **** **** ${num.split('').slice(12, 16).join('')}`;
        return hiddenNumber;
      }
    },
    required: true,
  },

  institution: {
    type: String,
    default: function () {
      accountName = this.accountName;
      return accountName.split(' ').length > 1
        ? this.accountName.split(' ')[0]
        : 'Property';
    },
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

accountSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'accountId',
});

const Account = mongoose.model('Account', accountSchema, 'accounts');

module.exports = Account;
