const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const auth = require('../middleware/authMiddleware');

// @route   GET /api/users/:username/profile
// @desc    Get public user profile and their trips (No Auth Required)
// @access  Public
router.get('/:username/profile', async (req, res) => {
  try {
    const rawUsername = req.params.username ? req.params.username.trim().toLowerCase() : '';
    
    // Find user by username or ID if applicable
    let user = await User.findOne({ username: rawUsername }).select('-password -email');

    if (!user) {
      // Fallback try by ID if param matches ObjectId format
      if (rawUsername.match(/^[0-9a-fA-F]{24}$/)) {
        user = await User.findById(rawUsername).select('-password -email');
      }
    }

    if (!user) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    // Fetch user's public trips
    const trips = await Trip.find({ user: user._id })
      .select('title destination startDate endDate description rating coverImage photos createdAt')
      .sort({ createdAt: -1 });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio || '',
        createdAt: user.createdAt,
      },
      trips,
    });
  } catch (err) {
    console.error('Public profile endpoint error:', err.message);
    res.status(500).json({ msg: 'Server error fetching user profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update logged-in user's bio and/or username
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { bio, username } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (username && username.trim().toLowerCase() !== user.username) {
      const cleanUsername = username.trim().toLowerCase();
      const existing = await User.findOne({ username: cleanUsername });
      if (existing && existing._id.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'Username is already taken by another user' });
      }
      user.username = cleanUsername;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    res.json({
      msg: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
      }
    });
  } catch (err) {
    console.error('Update profile endpoint error:', err.message);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
});

module.exports = router;
