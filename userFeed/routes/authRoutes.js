const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { checkUserRole } = require('../middleware/roleMiddleware');
const userController = require('../controllers/userController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/:id', authenticate, userController.getUserById);
router.delete('/:id', authenticate, checkUserRole('Super Admin'), userController.deleteUser);

module.exports = router;







