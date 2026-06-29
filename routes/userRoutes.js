// userRoutes.js - Routes for user sign up and login

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Helper function to generate JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// SIGNUP Route - Creates a new user account
router.post('/signup', async (req, res) => {
    console.log(">>> SIGNUP ROUTE REALLY HIT <<<");
    console.log("SIGNUP BODY:", req.body);

    const { email, password } = req.body;

    try { 
        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'Email is already registered'});
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long'});
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Creat user
        const user = await User.create({ email, password: hash });

        // Create Token
        const token = createToken(user._id);

        res.status(201).json({
            email: user.email,
            token
        })
    } catch (error) {
        res.status(500).json({ error: 'Signup failed due to server error' });
    }
});

// LOGIN Route - Authenticates user and returns a token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const exists = await User.findOne({ email });
        if (!exists) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const match = await bcrypt.compare(password, exists.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create Token
        const token = createToken(exists._id);

        res.status(200).json({
            user: {
                email: exists.email,
                displayName: exists.displayName
            },
            token
        })
    } catch (error) {
        console.error("SIGNUP ERROR:", error);  //
        res.status(500).json({ error: 'Login failed due to server error' });
    }
});

module.exports = router;