const mongoose = require('mongoose');

const JoinedTripSchema = new mongoose.Schema({
  user: {
    type: String, // Accept any string as user id
    required: true
  },
  trip: {
    type: String, // Accept any string as trip id
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JoinedTrip', JoinedTripSchema);