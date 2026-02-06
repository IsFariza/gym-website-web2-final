const Exercise = require('../models/exercise.model');

// POST /api/exercises 
exports.createExercise = async (req, res) => {
    try {
        const { name, muscleGroup, description, machineRequired } = req.body;
        if (!name || !muscleGroup) {
            return res.status(400).json({ message: "Name and Muscle Group are required." });
        }

        const newExercise = new Exercise({
            name,
            muscleGroup,
            description,
            machineRequired
        });

        const savedExercise = await newExercise.save();
        res.status(201).json({
            message: "Exercise created successfully",
            data: savedExercise
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving exercise", error: error.message });
    }
};

// GET /api/exercises
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find().sort({ name: 1 });
        
        if (exercises.length === 0) {
            return res.status(404).json({ message: "Exercises not found" });
        }

        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};