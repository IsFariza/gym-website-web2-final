const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

router.get('/', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainerById);

module.exports = router;
