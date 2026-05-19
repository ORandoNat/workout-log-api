// Middleware to require authentication for protected routes
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    // Get token from Authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Format: "Bearer <token>"
    const token = authorization.split(' ')[1];

    try {
        // Verify token
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = await User.findById(id).select('_id');

        next();
    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;