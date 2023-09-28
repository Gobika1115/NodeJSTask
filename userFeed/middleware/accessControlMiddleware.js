// Middleware to check if the user has Super Admin role
function ensureSuperAdmin(req, res, next) {
    const user = req.user;
    if (user && user.role === 'Super Admin') {
      next();
    } else {
      res.status(403).json({ message: 'Permission denied: Insufficient role' });
    }
}

module.exports = { ensureSuperAdmin };
