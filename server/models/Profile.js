const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  field: String,
  startDate: String,
  endDate: String,
  current: Boolean
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
  current: Boolean
});

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: String,
  location: String,
  gender: String,
  bio: String,
  currentCompany: String,
  currentRole: String,
  currentLocation: String,
  currentStartDate: String,
  currentEndDate: String,
  currentDescription: String,
  isCurrentlyWorking: Boolean,
  companyEmail: {
    email: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date
  },
  education: [{
    degree: {
      type: String,
      required: true
    },
    institution: String,
    field: String,
    startDate: String,
    endDate: String
  }],
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    startDate: String,
    endDate: String,
    link: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }],
  skills: [String],
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String
  },
  resumeUrl: String, // This will store the AWS S3 URL
  position: String,
  phoneNumber: String,
  isProfileCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Pre-save middleware to format education and experience
profileSchema.pre('save', function(next) {
  // Format education if it's a string
  if (this.education && this.education.length > 0) {
    this.education = this.education.map(edu => {
      if (typeof edu === 'string') {
        return {
          school: edu,
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false
        };
      }
      return edu;
    });
  }

  // Format experience if it's a string
  if (this.experience && this.experience.length > 0) {
    this.experience = this.experience.map(exp => {
      if (typeof exp === 'string') {
        return {
          company: exp,
          role: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          current: false
        };
      }
      return exp;
    });
  }

  next();
});

module.exports = mongoose.model('Profile', profileSchema); 