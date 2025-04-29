const express = require('express');
const router = express.Router();
const { registerUser, updateAvailability } = require('../controllers/userController');

// Register a new user or volunteer
router.post('/register', registerUser);

// Update availability status (active/inactive)
router.patch('/:id/availability', updateAvailability);

module.exports = router;