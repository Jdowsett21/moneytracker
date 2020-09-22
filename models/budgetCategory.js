const mongoose = require('mongoose');

const budgetCategoriesSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subCategories: [{ subCategory: { type: String, required: true } }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userRole: { type: mongoose.Schema.Types, required: true, ref: 'User' },
});

const BudgetCategories = mongoose.model(
  'Budget Categories',
  budgetCategoriesSchema
);

module.exports = BudgetCategories;
