const express = require('express');
const router = express.Router();
const JoinedTrip = require('../models/JoinedTrip'); // Adjust path as needed

// Get all joined trips for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // No populate, just return joined trip ids
    const joinedTrips = await JoinedTrip.find({ user: userId });
    res.json(joinedTrips.map(jt => jt.trip));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch joined trips' });
  }
});

// POST route to join a trip
router.post('/', async (req, res) => {
  try {
    const { userId, tripId } = req.body;
    if (!userId || !tripId) {
      return res.status(400).json({ error: 'userId and tripId are required' });
    }
    const joinedTrip = new JoinedTrip({
      user: userId,
      trip: tripId
    });
    await joinedTrip.save();
    res.status(201).json(joinedTrip);
  } catch (err) {
    console.error('Join trip backend error:', err);
    res.status(500).json({ error: 'Failed to join trip' });
  }
});

module.exports = router;