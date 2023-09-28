const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

module.exports = {
  // Generate a JWT token
  generateToken: (userId) => {
    return jwt.sign({ userId }, config.secretKey, { expiresIn: config.tokenExpiration });
  },

  // Verify a JWT token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, config.secretKey);
    } catch (error) {
      throw new Error('JWT verification failed');
    }
  },
};
