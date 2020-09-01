const express = require('express');
const router = express.Router();
const { validateUser, User } = require('../models/user');
const asyncMiddleware = require('../middleware/async');
const jwtDecode = require('jwt-decode');
const _ = require('lodash');
const { hashPassword } = require('../utils');

router.post(
  '/login',
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (user) {
      const { password, ...rest } = user;
      const userInformation = Object.assign({}, { ...rest });

      const token = await user.generateAuthToken();

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      //moving the token to cookies

      const { firstName, lastName, email, role } = userInformation._doc;

      const userInfo = {
        firstName,
        lastName,
        email,
        role,
      };

      res.cookie('token', token, { httpOnly: true });

      res.json({
        message: 'Login successful!',
        token,
        userInfo,
        expiresAt,
      });
    }
  })
);

router.post(
  '/signup',
  asyncMiddleware(async (req, res) => {
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const {
      firstName,
      email,
      lastName,
      streetName,
      streetNumber,
      birthday,
      password,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    const userData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      streetName,
      streetNumber,
      birthday,
      password: hashedPassword,
      role: 'admin',
    };

    const existingEmail = await User.findOne({ email: userData.email }).lean();

    if (existingEmail)
      return res.status(400).json({ message: 'User already exists' });

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = await newUser.generateAuthToken();
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const userInfo = {
        firstName,
        lastName,
        birthday,
        streetName,
        streetNumber,
        email,
        token,
      };

      res.cookie('token', token, { httpOnly: true });

      return res.json({
        message: 'User Created!',
        userInfo,
        expiresAt,
      });
    }
  })
);

module.exports = router;
