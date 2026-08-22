const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  let { name, username, email, password, bio } = req.body;

  try {
    // Check if user with email exists
    let existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Auto-generate username if not provided
    if (!username || !username.trim()) {
      const baseHandle = (name || email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
      username = `${baseHandle}${Math.floor(100 + Math.random() * 900)}`;
    } else {
      username = username.trim().toLowerCase();
    }

    // Check if username exists
    let existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const user = new User({
      name,
      username,
      email,
      password,
      bio: bio || ''
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User registered successfully', username: user.username });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Ensure user has a username if created earlier
    if (!user.username) {
      const baseHandle = (user.name || user.email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
      user.username = `${baseHandle}${Math.floor(100 + Math.random() * 900)}`;
      await user.save();
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio || ''
          }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure username field exists
    if (!user.username) {
      const baseHandle = (user.name || user.email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '');
      user.username = `${baseHandle}${Math.floor(100 + Math.random() * 900)}`;
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error('Me endpoint error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
