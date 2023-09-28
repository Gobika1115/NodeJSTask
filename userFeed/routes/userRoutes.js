const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.post('/:id', userController.createUser);

module.exports = router;
