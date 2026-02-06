const Workout = require("../models/workout.model")
const Trainer = require('../models/trainer.model')

exports.createWorkout = async (req, res) => {
    try {
        const workout = new Workout({
            user: req.user.id, 
            title: req.body.title,
            exercises: req.body.exercises, 
            level: req.body.level,
            schedule: req.body.schedule
        })

        const savedWorkout = await workout.save()
        res.status(201).json(savedWorkout)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id })
            .populate("exercises", "name muscle type") 
        
        res.json(workouts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        
        if (!workout) 
            return res.status(404).json({ message: "workout not found"})

        
        if (workout.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied: not your workout"})
        }

        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true, 
                runValidators: true 
            }
        ).populate("exercises")

        res.json(updatedWorkout)
    } catch (error) {
        res.status(400).json({ message: "Invalid data or ID" })
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)

        if (!workout) 
            return res.status(404).json({ message: "workout not found" })

        if (workout.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied: not your plan" })
        }
    
        if (workout.trainer) {
            const trainer = await Trainer.findById(workout.trainer);
            if (trainer) {
                trainer.busyDays = trainer.busyDays.filter(day => !workout.schedule.includes(day));
                await trainer.save();
            }
        }

        await workout.deleteOne();
        res.json({ message: "Workout plan deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting plan" })
    }
}

exports.addTrainerToWorkout = async(req, res) => {
    const { trainerId } = req.body
    const { id } = req.params

    try{
        const workout = await Workout.findById(id)
        const trainer = await Trainer.findById(trainerId)

        if(!trainer) 
            return res.status(404).json({message: 'Trainer not found'})

        if (!workout)
            return res.status(404).json({message: 'Workout not found'})
        
        for (let day of workout.schedule){
            if(trainer.busyDays.includes(day)){
                return res.status(400).json({message: 'Trainer is not available on ${day}'})
            }
        }

        workout.trainer = trainerId
        trainer.busyDays.push(...workout.schedule)

        await workout.save()
        await trainer.save()

        res.json({message: 'Trainer assignedsuccessfully', workout})
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.deleteTrainerFromPlan = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        if (!workout || !workout.trainer) 
            return res.status(404).json({ message: 'No trainer found to this workout' })

        const trainer = await Trainer.findById(workout.trainer);

        if (trainer) {
            trainer.busyDays = trainer.busyDays.filter(day => !workout.schedule.includes(day));
            await trainer.save();
        }

        workout.trainer = null;
        await workout.save();

        res.json({ message: "Trainer removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};