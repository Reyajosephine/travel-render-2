// server.js
require('dotenv').config();

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const session    = require('express-session');
const MongoStore = require('connect-mongo');
const passport   = require('passport');

require('./config/passport');

const authRoutes         = require('./routes/auth');
const tripRoutes         = require('./routes/trip');
const joinedTripsRoutes  = require('./routes/joinedTrips');

const PORT = process.env.PORT || 5000;
const app  = express();

/* ──────── MIDDLEWARE ────────────────────────────────────────── */
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json());

/* ──────── SESSION SETUP ─────────────────────────────────────── */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me-in-.env',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* ──────── ROOT ROUTE ───────────────────────────────────────── */
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

/* ──────── API ROUTES ───────────────────────────────────────── */
app.use('/api/auth',         authRoutes);
app.use('/api/trips',        tripRoutes);
app.use('/api/joined-trips', joinedTripsRoutes);

/* ──────── DATABASE & SERVER START ─────────────────────────── */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
