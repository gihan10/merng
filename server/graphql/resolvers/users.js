/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { secretKey } = require('../../config');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');

function generateToken(user, secret) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    secret,
    { expiresIn: '1h' },
  );
}

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          username, email, password, confirmPassword,
        },
      },
    ) {
      // @todo validation
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // @todo unique username/email
      const user = await User.findOne({
        username,
      });

      if (user) {
        throw new UserInputError('Username exists', {
          errors: {
            username: ['This username is taken'],
          },
        });
      }

      const pwd = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        pwd,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();
      const token = generateToken(result, secretKey);

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('There are some input errors', { errors });
      }
      const user = await User.findOne({
        username,
      });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = ['Wrong credentials'];
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user, secretKey);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
  },
};
