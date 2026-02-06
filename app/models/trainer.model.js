const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: String,
    experience: Number,
    phoneNumber: String,
    busyDays: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        default: []
    }
});

module.exports = mongoose.model('Trainer', trainerSchema);