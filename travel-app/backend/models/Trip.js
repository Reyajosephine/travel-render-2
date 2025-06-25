const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination:     { type: String, required: true },
  departure:       { type: String, required: true },
  fromDate:        { type: Date,   required: true },
  toDate:          { type: Date,   required: true },
  transport:       { type: String, enum: ['Flight','Train','Bus','Car','Cruise','Multiple'], required: true },
  budget: {
    amount:        { type: Number, required: true },
    currency:      { type: String, enum: ['USD','EUR','GBP','JPY','AUD','CAD','CHF','CNY','INR','SGD'], required: true }
  },
  numberOfPeople:  { type: Number, min: 1, required: true },
  maxPeople:       { type: Number, min: 1, required: true },
  genderPreference:{ type: String, enum: ['anyone','menOnly','womenOnly'], default: 'anyone' },
  category:        { type: String, enum: ['Adventure','Beach','City','Cultural','Mountain','Road Trip'], required: true },
  description:     { type: String },
  coverImage:      { type: String }, // store a URL or base64 string
  createdBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
