// Middleware to check if the user has the required role
exports.checkUserRole = (requiredRole) => {
    return (req, res, next) => {
      // Check if the user's role matches the required role
      if (req.user && req.user.role === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: 'Permission denied: Insufficient role' });
      }
    };
  };
  