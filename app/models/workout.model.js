const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { //Leg Day or Cardio
    type: String,
    required: true,
    trim: true
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ],
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer', 
    required: false 
  },
  schedule: {
    type: [String], 
    default: []
}
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Workout', workoutSchema);