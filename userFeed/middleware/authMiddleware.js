const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

// Middleware to verify JWT token
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
