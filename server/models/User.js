const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employee'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedCompanyDomain: String,
  verificationCode: String,
  verificationCodeExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    isProfileCompleted: {
      type: Boolean,
      default: false
    }
  },
  preferences: {
    jobTypes: [String], // Full-time, Part-time, Contract, etc.
    industries: [String],
    locations: [String],
    remotePreference: String, // Remote, Hybrid, On-site
    salaryExpectation: {
      min: Number,
      max: Number,
      currency: String
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 