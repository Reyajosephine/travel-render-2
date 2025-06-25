// routes/trips.js
const express = require('express');
const Trip    = require('../models/Trip');
const jwt     = require('jsonwebtoken');
const auth = require('../routes/auth')
require('dotenv').config();

const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

router.post('/', authenticate, async (req, res) => {
  try {
    const tripData = {
      ...req.body,
      createdBy: req.userId 
    };

    const newTrip = new Trip(tripData);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Trip creation error:", err.message);
    res.status(500).json({ error: 'Server error while creating trip' });
  }
});


router.get('/', authenticate, async (req, res) => {
  const trips = await Trip.find({ createdBy: req.userId }).sort('-createdAt');
  res.json({ trips });
});

// PATCH /api/trips/:id/decrement-spot
router.patch('/:id/decrement-spot', async (req, res) => {
  try {
    const tripId = req.params.id;
    // Find the trip and decrement maxPeople by 1 if it's greater than 0
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    if (trip.maxPeople <= 0) {
      return res.status(400).json({ error: 'No spots left' });
    }
    trip.maxPeople -= 1;
    await trip.save();
    res.json({ message: 'Spot decremented', trip });
  } catch (err) {
    console.error('Error decrementing spot:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
