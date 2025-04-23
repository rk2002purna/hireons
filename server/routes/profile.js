const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');
const createTransporter = require('../config/email');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const { upload } = require('../utils/s3');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('profile');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete profile
router.post('/complete', auth, async (req, res) => {
  try {
    const {
      education,
      skills,
      experience,
      currentCompany,
      position,
      location,
      phoneNumber,
      bio
    } = req.body;

    // Validate required fields
    if (!education || !education[0]?.degree) {
      return res.status(400).json({ message: 'Education degree is required' });
    }

    // Create or update profile
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        education,
        skills,
        experience,
        currentCompany,
        position,
        location,
        phoneNumber,
        bio,
        isProfileCompleted: true
      },
      { new: true, upsert: true }
    );

    // Update user's profile completion status
    await User.findByIdAndUpdate(req.user.id, {
      'profile.isProfileCompleted': true
    });

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Add experience
router.post('/experience', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { experience: req.body } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Error adding experience' });
  }
});

// Add education
router.post('/education', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { education: req.body } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error adding education:', error);
    res.status(500).json({ message: 'Error adding education' });
  }
});

// Verify company email
router.post('/verify-company-email', auth, async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // More permissive email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address',
        details: 'Email should be in the format: example@domain.com'
      });
    }

    // Check if email is already verified
    const existingProfile = await Profile.findOne({ 
      userId: req.user.id,
      'companyEmail.email': email,
      'companyEmail.isVerified': true 
    });

    if (existingProfile) {
      return res.status(400).json({ message: 'This email has already been verified' });
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    try {
      // Create email transporter
      const transporter = await createTransporter();

      // Send verification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Company Email',
        html: `
          <h1>Verify Your Company Email</h1>
          <p>Click the link below to verify your company email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <p>This link will expire in 24 hours.</p>
        `
      });

      // Update profile with verification token
      await Profile.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            'companyEmail.email': email,
            'companyEmail.verificationToken': token,
            'companyEmail.verificationTokenExpires': Date.now() + 24 * 60 * 60 * 1000 // 24 hours
          }
        },
        { upsert: true, new: true }
      );

      res.json({ 
        message: 'Verification email sent successfully',
        details: 'Please check your email for the verification link'
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      res.status(500).json({ 
        message: 'Failed to send verification email',
        details: 'Please try again later'
      });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      message: 'An error occurred during email verification',
      details: error.message 
    });
  }
});

// Verify email with code
router.post('/verify-email-code', auth, async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      return res.status(400).json({ message: 'No verification code found. Please request a new one.' });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Update user's verification status
    user.isVerified = true;
    user.verifiedCompanyDomain = user.email.split('@')[1];
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    return res.json({ 
      message: 'Email verified successfully',
      isVerified: true
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      message: 'Failed to verify email',
      error: error.message
    });
  }
});

module.exports = router; 