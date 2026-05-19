// workoutRoutes.js - Express router for workout-related API endpoints
// Defines routes for CRUD operations on workouts, using the Workout Mongoose model.

const express = require('express');  // Router for workout-related API endpoints
const router = express.Router();
const Workout = require('../models/workoutModel');  // Mongoose model for workouts
const requireAuth = require('../middleware/requireAuth');  // Middleware to protect routes

// Protect all workouts routes
router.use(requireAuth);  // All routes below require authentication

// ================================
// Workout routes
// ================================

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({ user_id: req.user._id });  // Find workouts for the authenticated user
    res.json(workouts);  // Return all workouts as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Server error
  }
});

// GET workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });  // Server error
  }
});

// POST Create a new workout
router.post('/', async (req, res) => {
  try {
    //const workout = new Workout(req.body);
    const workout = new Workout({
      ...req.body,
      user_id: req.user._id
    })
    const saved = await workout.save();
    res.status(201).json(saved);  // Successfully created
  } catch (err) {
    res.status(400).json({ error: err.message });  // Validation or client error
  }
});

// PATCH Update an existing workout
router.patch('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });  // Server error
  }
});

// DELETE Delete a workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });  // Server error
  }
});

module.exports = router;