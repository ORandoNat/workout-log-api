// server.js — Main entry point for the Workout Log API.
// Sets up Express, connects to MongoDB, loads routes, and starts the server.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const PORT = process.env.PORT || 4000;

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000',
  'http://172.27.185.122:3000',
  'https://workout-log-tfw8.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);  // allow tools/curl/mobile apps
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());  // Parse incoming JSON bodies

// Routes
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);

app.use(express.static('public'));  // Serve frontend files

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});