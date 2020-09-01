const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  streetNumber: {
    type: Number,
    min: 0,
    max: 999999,
    required: true,
    trim: true,
  },
  streetName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid');
    },
  },
  password: {
    type: String,
    required: true,
    // validator(value) {
    //   if (value.toLowerCase().includes('password'))
    //     throw new Error('Invalid Password');
    // },
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  bio: { type: String, required: false },
  securityQuestion: {},
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  if (!user.role) {
    throw new Error('No user role specified');
  }
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      streetName: user.streetName,
      streetNumber: user.streetNumber,
      email: user.email,
      role: user.role,
      iss: 'api.it-logger',
      aud: 'api.it-logger',
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1hr' }
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  return user;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    streetNumber: Joi.number().min(0).max(99999).required(),
    streetName: Joi.string().min(3).max(20).required(),
    birthday: Joi.date().required(),
    email: Joi.string().min(8).max(50).email().required(),
    password: Joi.string().required().min(5).max(20),
    role: Joi.string(),
    tokens: Joi.array(),
  });
  return schema.validate(user);
}
// userSchema.methods.toJSON = function () {
//   const user = this;

//   //toObject method, gives raw profile data
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.token;
// };

exports.validateUser = validateUser;
exports.User = User;
