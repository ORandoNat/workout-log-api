// workoutModel.js - Mongoose schema and model for workout entries

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {                        // Name of the workout (e.g., "Push-ups")
    type: String,
    required: true
  },
  amount: {                      // Amount of the workout (e.g., 10 for 10 push-ups or 10 minutes)
    type: Number,
    required: true
  },
  workType: {                    // Type of the workout (e.g., "reps" or "minutes")
    type: String,
    enum: ['reps', 'minutes'],
    required: true
  },
  notes: {                       // Optional notes about the workout
    type: String,
    required: false
  },
  date: {                        // Date and time of the workout
    type: Date,
    required: true,
    default: Date.now
  },
  user_id: {                     // Reference to the user who logged the workout
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);