const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const asyncMiddleware = require('../middleware/async');
const _ = require('lodash');

router.get('/csrf-token', async (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
router.get(
  '/me',
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.json(user);
  })
);

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const user = await User.find();
    res.send(user);
  })
);

router.patch(
  '/me',
  asyncMiddleware(async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'email',
      'password',
      'streetName',
      'streetNumber',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      return res.status(400).send({ error: 'Invalid Updates' });

    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    const user = await User.findById(req.user._id);

    await user
      .populate({
        path: 'accounts1',
        select: 'category balance hiddenAccountNumber',
        model: 'Account',
      })
      .execPopulate();

    res.send(
      _.pick(
        user,
        'name',
        'streetNumber',
        'streetName',
        'birthday',
        'email',
        'accounts1'
      )
    );
  })
);

router.post(
  '/logout',

  asyncMiddleware(async (req, res) => {
    //filtering through array of tokens, 1 for each active login
    //until token for login is found, then removing it
    req.user.tokens = req.user.tokens.filter((token) => {
      //filters out all tokens that are equal to the current login
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  })
);

router.post(
  '/logoutAll',

  asyncMiddleware(async (req, res) => {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  })
);

router.delete(
  '/me',
  asyncMiddleware(async (req, res) => {
    await req.user.remove();

    res.send(req.user);
  })
);

module.exports = router;
