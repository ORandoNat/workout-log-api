// server.js — Main entry point for the Workout Log API.
// Sets up Express, connects to MongoDB, loads routes, and starts the server.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON bodies
app.use(express.static('public'));  // Serve frontend files

// Routes
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic health/config routes  
app.get('/', (req, res) => {
  res.send('Workout Log API is running');
});

app.get('/config', (req, res) => {
  res.json({
    baseUrl: process.env.BASE_URL
  })
})

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});