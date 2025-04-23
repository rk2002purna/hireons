const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const createTransporter = require('../config/email');

// Get all jobs
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Create a new job
router.post('/', auth, async (req, res) => {
  try {
    const { title, company, location, description, requirements } = req.body;
    
    const job = new Job({
      title,
      company,
      location,
      description,
      requirements,
      postedBy: req.user.id
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Send a message to job poster
router.post('/:jobId/message', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const message = new Message({
      sender: req.user.id,
      recipient: job.postedBy,
      job: job._id,
      content: req.body.content
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Get messages for a job
router.get('/:jobId/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      job: req.params.jobId,
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Request referral for a job
router.post('/:jobId/request-referral', auth, async (req, res) => {
  try {
    console.log('Request referral received for job:', req.params.jobId);
    console.log('User making request:', req.user._id);

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      console.log('Job not found:', req.params.jobId);
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already requested referral
    const existingRequest = job.referralRequests.find(
      request => request.jobseekerId.toString() === req.user._id.toString()
    );

    if (existingRequest) {
      console.log('User already requested referral:', req.user._id);
      return res.status(400).json({ message: 'You have already requested a referral for this job' });
    }

    // Get jobseeker profile
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      console.log('Profile not found for user:', req.user._id);
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Get employer's email
    const employer = await User.findById(job.postedBy);
    if (!employer) {
      console.log('Employer not found for job:', job._id);
      return res.status(404).json({ message: 'Employer not found' });
    }

    console.log('Adding referral request for user:', {
      jobseekerId: req.user._id,
      jobseekerName: profile.name,
      jobseekerEmail: req.user.email
    });

    // Add referral request
    job.referralRequests.push({
      jobseekerId: req.user._id,
      jobseekerName: profile.name,
      jobseekerEmail: req.user.email,
      status: 'pending'
    });

    await job.save();
    console.log('Referral request saved successfully');

    // Send email notification to employer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employer.email,
      subject: 'New Referral Request Received',
      html: `
        <h2>New Referral Request</h2>
        <p>You have received a new referral request for the position: ${job.title}</p>
        <p><strong>Jobseeker Details:</strong></p>
        <ul>
          <li>Name: ${profile.name}</li>
          <li>Email: ${req.user.email}</li>
        </ul>
        <p>Please log in to your dashboard to review this request.</p>
        <p>Best regards,<br>ReferMe Team</p>
      `
    };

    try {
      const transporter = await createTransporter();
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent to employer');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }

    res.json({ message: 'Referral request sent successfully' });
  } catch (error) {
    console.error('Error requesting referral:', {
      error: error.message,
      stack: error.stack,
      jobId: req.params.jobId,
      userId: req.user._id
    });
    res.status(500).json({ 
      message: 'Error requesting referral',
      error: error.message 
    });
  }
});

// Get referral requests for a job
router.get('/:jobId/referral-requests', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job poster
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view referral requests' });
    }

    res.json(job.referralRequests);
  } catch (error) {
    console.error('Error fetching referral requests:', error);
    res.status(500).json({ message: 'Error fetching referral requests' });
  }
});

module.exports = router; 