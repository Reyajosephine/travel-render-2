const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trip')
const joinedTripsRoutes = require('./routes/joinedTrips');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/joined-trips', joinedTripsRoutes);


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { 
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
