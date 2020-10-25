const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const { secretKey } = require('../config');

module.exports = (context) => {
  // extract the authorization header from request headers
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError('Authorization header is required');
  }

  // extract the Bearer token
  const token = authHeader.split('Bearer ')[1];
  if (!token) {
    throw new Error('Authentication token must be \'Bearer [token]');
  }

  // validate the token
  try {
    const user = jwt.verify(token, secretKey);
    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};
