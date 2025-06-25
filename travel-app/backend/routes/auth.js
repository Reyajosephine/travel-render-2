const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const passport = require('passport');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token after registration
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });


  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;


//oauth


// Redirect to Google for login
// 🔐 Google OAuth Start
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 🔁 Google OAuth Callback
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/auth/google/failure'
  }),
  (req, res) => {
    // Successful login
    const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const userData = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email
    };

    res.redirect(`http://localhost:5173/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
  }
);

router.get('/google/failure', (req, res) => {
  res.redirect('http://localhost:5173/oauth-error?reason=email_exists');
});

