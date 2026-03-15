require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/workoutlog')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const workoutRoutes = require('./routes/workouts');
app.use(workoutRoutes);

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