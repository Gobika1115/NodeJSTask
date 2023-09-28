const express = require('express');
const feedController = require('../controllers/feedController');
const router = express.Router();

router.get('/:id', feedController.getFeedById);
router.post('/', feedController.createFeed);
router.put('/:id', feedController.updateFeed);
router.delete('/:id', feedController.deleteFeed);

module.exports = router;
