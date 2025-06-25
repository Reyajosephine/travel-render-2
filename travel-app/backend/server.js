// server.js
require('dotenv').config();

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const session   = require('express-session');
const MongoStore= require('connect-mongo');          // ⬅ persistent sessions
const passport  = require('passport');

require('./config/passport');                        // passport strategy config

const authRoutes        = require('./routes/auth');
const tripRoutes        = require('./routes/trip');
const joinedTripsRoutes = require('./routes/joinedTrips');

const PORT = process.env.PORT || 5000;
const app  = express();

/* ──────── MIDDLEWARE ────────────────────────────────────────── */
app.use(cors({ origin: true, credentials: true }));  // allow cookies
app.use(express.json());

/* ──────── SESSION (must come *before* routes that use passport) */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me-in-.env',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,     // 14-day session life
    }),
    cookie: {
      sameSite: 'lax',            // adjust if you need cross-site cookies
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* ──────── ROUTES ───────────────────────────────────────────── */
app.use('/api/auth',        authRoutes);
app.use('/api/trips',       tripRoutes);
app.use('/api/joined-trips',joinedTripsRoutes);

/* ──────── DATABASE & SERVER START ─────────────────────────── */
mongoose
  .connect(process.env.MONGO_URI)         // ⬅ no deprecated options needed
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB error:', err));
