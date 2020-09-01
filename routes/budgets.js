const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const Budget = require('../models/budget');
router.get(
  '/getBudgets',
  asyncMiddleware(async (req, res) => {
    const budget = await Budget.find();

    res.send(budget);
  })
);

router.post(
  '/addBudget',
  asyncMiddleware(async (req, res) => {
    const duplicateBudget = await Budget.find({ category: req.body.category });

    if (duplicateBudget.length > 0)
      return res
        .status(400)
        .json({ message: 'Budget with that category already exists' });

    const budget = new Budget({ ...req.body, userId: req.user._id });

    await budget.save();

    res.json(budget);
  })
);

router.put(
  '/updateBudget/:id',
  asyncMiddleware(async (req, res) => {
    const duplicateBudget = await Budget.find({ category: req.body.category });

    if (duplicateBudget)
      return res
        .status(400)
        .json({ message: 'Budget with that category already exists' });

    const budget = await Budget.findByIdAndUpdate(
      req.params._id,
      {
        category: req.body.category,
        budgetLimit: req.body.budgetLimit,
      },
      { new: true }
    );
    res.json(budget);
  })
);

router.delete('/deleteBudget/:id', async (req, res) => {
  const budget = await Budget.findByIdAndDelete(req.params.id);
  res.send(budget);
});

module.exports = router;
