const express = require('express');
const router = express.Router();
const BudgetCategories = require('../models/budgetCategory');
const asyncMiddleware = require('../middleware/async');

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const budgetList = await BudgetCategories.find({
      // ! this wont work for ensuring all users see default list
      $or: [{ userId: req.user._id }, { userRole: 'admin' }],
    }).sort({ category: 1 });

    res.json(budgetList);
  })
);

router.put(
  '/update/:id',
  asyncMiddleware(async (req, res) => {
    const budgetList = await BudgetCategories.findOneAndUpdate(
      {
        _id: req.params.id,
      },

      {
        $push: {
          subCategories: {
            subCategory:
              req.body.subCategories[req.body.subCategories.length - 1]
                .subCategory,
          },
        },
      },
      { new: true }
    );
    console.log(req.body.subCategories);

    res.json(budgetList);
  })
);

router.get(
  '/getSubCategories/:category',
  asyncMiddleware(async (req, res) => {
    const budgetList = await BudgetCategories.find({
      userId: req.user._id,
      category: req.params.category,
    });
    // .sort({subCategories[0].subCategory: 1 });
    res.json(budgetList);
  })
);

router.post(
  '/add',
  asyncMiddleware(async (req, res) => {
    const duplicateBudget = await BudgetCategories.find({
      subCategory: req.body.subCategory,
    });
    if (duplicateBudget.length > 0)
      return res.status(401).json({ message: 'This category already exists' });
    const budgetList = new BudgetCategories({
      category: req.body.category,
      subCategories: [{ subCategory: req.body.subCategory }],
      userId: req.user._id,
      userRole: req.user.role,
    });

    await budgetList.save();

    res.send(budgetList);
  })
);

// router.delete(
//   '/delete',
//   asyncMiddlewawre(async (req, res) => {
//     const budgetList = await BudgetCategories.findByIdAndDelete;
//   })
// );
module.exports = router;
