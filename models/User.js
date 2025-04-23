const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nidNumber: {
    type: String,
    required: true,
    unique: true, // Ensure NID number is unique
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // Restrict gender to specific values
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'volunteer'], // Either a user or a volunteer
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Approval status
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;