const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  budgetLimit: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Budget = mongoose.model('Budgets', budgetSchema);

module.exports = Budget;
