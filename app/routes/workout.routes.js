const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workout.controller')
const { verifyToken } = require('../middlewares/authJwt')

router.post('/', [verifyToken], workoutController.createWorkout)
router.get('/', [verifyToken], workoutController.getMyWorkouts)
router.put('/:id', [verifyToken], workoutController.updateWorkout)
router.delete('/:id', [verifyToken], workoutController.deleteWorkout)
router.post('/:id/trainer', [verifyToken], workoutController.addTrainerToWorkout)
router.delete('/:id/trainer', [verifyToken], workoutController.deleteTrainerFromPlan)

module.exports = router