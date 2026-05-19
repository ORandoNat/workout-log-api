// userModel.js - Mongoose schema for user accounts

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,       // Prevent duplicate accounts
        lowercase: true,    // Normalize email to lowercase
        trim: true
    },
    password: {
        type: String,
        required: true,     // Will be hashed before saving
    },
    displayName: {
        type: String,
        required: false,    // Optional display name field
        unique: true,
        trim: true
    }
}, {timestamps:true});      // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('User', userSchema);