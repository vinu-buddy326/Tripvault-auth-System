const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/trips
// @desc    Create a new trip
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating } = req.body;

    const newTrip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.user.id // Provided by auth middleware
    });

    const trip = await newTrip.save();
    res.json(trip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/trips
// @desc    Get all trips for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/trips/:id
// @desc    Get a single trip by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    // Check if the trip belongs to the user
    if (trip.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/trips/:id
// @desc    Update a trip
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, destination, startDate, endDate, description, rating } = req.body;

  // Build trip object
  const tripFields = {};
  if (title) tripFields.title = title;
  if (destination) tripFields.destination = destination;
  if (startDate) tripFields.startDate = startDate;
  if (endDate) tripFields.endDate = endDate;
  if (description !== undefined) tripFields.description = description;
  if (rating) tripFields.rating = rating;

  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    // Check if the trip belongs to the user
    if (trip.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: tripFields },
      { new: true }
    );

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    // Check if the trip belongs to the user
    if (trip.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Trip removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Trip not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
