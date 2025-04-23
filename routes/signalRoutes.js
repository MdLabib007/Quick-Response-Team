const express = require('express');
const router = express.Router();
const { createSignal, acceptSignal, rejectSignal } = require('../controllers/signalController');
const Signal = require('../models/Signal'); // Ensure the path to the Signal model is correct

// Create a new signal
router.post('/', createSignal);

// Get all pending signals
router.get('/', async (req, res) => {
  try {
    const signals = await Signal.find({ status: 'pending' }); // Find all signals that are 'pending'
    res.json(signals);
  } catch (error) {
    console.error('Error fetching signals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Accept a signal
router.post('/:id/accept', acceptSignal);

// Reject a signal
router.post('/:id/reject', rejectSignal);

module.exports = router;