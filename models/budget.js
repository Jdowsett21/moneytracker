const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
  },
  budgetLimit: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  budgetType: {
    type: String,
    default: function () {
      return this.category === 'Income' ? 'Income' : 'Spending';
    },
  },
});

const Budget = mongoose.model('Budgets', budgetSchema);

module.exports = Budget;
