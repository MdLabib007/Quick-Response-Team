const Signal = require('../models/Signal');

// Create a new signal
const createSignal = async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const { userName, location, message, status, createdAt } = req.body;

    if (!userName || !location || !location.lat || !location.lon) {
      return res.status(400).json({ error: 'userName and location (with lat/lon) are required' });
    }

    const newSignal = new Signal({
      userName,
      location,
      message,
      status: status || 'pending',
      createdAt: createdAt || new Date(),
    });

    await newSignal.save();
    res.status(201).json(newSignal);
  } catch (error) {
    console.error('Error creating signal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Accept a signal
const acceptSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerName } = req.body;

    if (!volunteerName) {
      return res.status(400).json({ error: 'Volunteer name is required' });
    }

    const signal = await Signal.findById(id);

    if (!signal) {
      return res.status(404).json({ error: 'Signal not found' });
    }

    signal.status = 'accepted';
    signal.volunteerName = volunteerName;
    await signal.save();

    res.status(200).json({ message: 'Signal accepted successfully', signal });
  } catch (error) {
    console.error('Error accepting signal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reject a signal
const rejectSignal = async (req, res) => {
  try {
    const { id } = req.params;

    const signal = await Signal.findById(id);

    if (!signal) {
      return res.status(404).json({ error: 'Signal not found' });
    }

    signal.status = 'rejected';
    await signal.save();

    res.status(200).json({ message: 'Signal rejected successfully', signal });
  } catch (error) {
    console.error('Error rejecting signal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createSignal, acceptSignal, rejectSignal };