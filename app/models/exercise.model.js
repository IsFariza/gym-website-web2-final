
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { 
    type: String, 
    required: [true],
    enum: ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'] 
  },
  description: String,
  machineRequired: { type: String, default: "None"}
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);

const planSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  exercises: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exercise' 
  }],
  schedule: [String], //["Monday", "Wednesday"]
}, { timestamps: true });

const PersonalPlan = mongoose.model('PersonalPlan', planSchema);

module.exports = { Exercise, PersonalPlan };