const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller');
const { verifyToken } = require('../middlewares/authJwt');
const { isAdmin } = require('../middlewares/verifyRole');

//get all 
router.get('/', [verifyToken], exerciseController.getAllExercises);

//create (only for admin)
router.post('/', [verifyToken, isAdmin], exerciseController.createExercise);

module.exports = router;