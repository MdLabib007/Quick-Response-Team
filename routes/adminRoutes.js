const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add a new user or volunteer profile
router.post('/add', async (req, res) => {
  try {
    const { name, email, dateOfBirth, nidNumber, phoneNumber, gender, role } = req.body;

    // Validate required fields
    if (!name || !email || !dateOfBirth || !nidNumber || !phoneNumber || !gender || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate role
    if (!['user', 'volunteer'].includes(role)) {
      return res.status(400).json({ error: 'Role must be either "user" or "volunteer"' });
    }

    // Validate gender
    if (!['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ error: 'Gender must be "male", "female", or "other"' });
    }

    // Create a new user profile
    const newUser = new User({
      name,
      email,
      dateOfBirth,
      nidNumber,
      phoneNumber,
      gender,
      role,
    });

    console.log('Creating new user:', newUser); // Debugging log
    await newUser.save();

    res.status(201).json({ message: 'User profile created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all pending profiles
router.get('/pending', async (req, res) => {
  try {
    const pendingProfiles = await User.find({ status: 'pending' });
    res.status(200).json(pendingProfiles);
  } catch (error) {
    console.error('Error fetching pending profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve a profile
router.post('/:id/approve', async (req, res) => {
    const { id } = req.params; // Extract the profile ID from the URL
    const { adminName } = req.body; // Extract adminName from the request body (optional)
  
    // Check if the ObjectId is valid
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }
  
    try {
      const user = await User.findById(id); // Find the user by ID
  
      if (!user) {
        return res.status(404).json({ error: 'Profile not found' }); // Return 404 if user not found
      }
  
      user.status = 'approved'; // Update the status to "approved"
      await user.save(); // Save the updated user
  
      res.status(200).json({
        message: `Profile approved successfully${adminName ? ` by ${adminName}` : ''}`,
        user,
      });
    } catch (error) {
      console.error('Error approving profile:', error);
      res.status(500).json({ error: 'Internal server error' }); // Return 500 for server errors
    }
  });

// Reject a profile
router.post('/:id/reject', async (req, res) => {
  const { id } = req.params; // Extract the profile ID from the URL

  // Check if the ObjectId is valid
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid profile ID' });
  }

  try {
    const user = await User.findById(id); // Find the user by ID

    if (!user) {
      return res.status(404).json({ error: 'Profile not found' }); // Return 404 if user not found
    }

    user.status = 'rejected'; // Update the status to "rejected"
    await user.save(); // Save the updated user

    res.status(200).json({ message: 'Profile rejected successfully', user });
  } catch (error) {
    console.error('Error rejecting profile:', error);
    res.status(500).json({ error: 'Internal server error' }); // Return 500 for server errors
  }
});

module.exports = router;