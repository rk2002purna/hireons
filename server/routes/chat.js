const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all messages for a user (both sent and received)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'name email')
    .populate('recipient', 'name email')
    .populate('jobId', 'title company');

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Get conversation between two users
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'name email')
    .populate('recipient', 'name email')
    .populate('jobId', 'title company');

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Error fetching conversation' });
  }
});

// Send a message
router.post('/send', auth, async (req, res) => {
  try {
    const { recipientId, content, jobId } = req.body;

    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content,
      jobId,
      read: false
    });

    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email')
      .populate('recipient', 'name email')
      .populate('jobId', 'title company');

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Mark message as read
router.put('/:messageId/read', auth, async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.messageId,
        recipient: req.user.id
      },
      { read: true },
      { new: true }
    )
    .populate('sender', 'name email')
    .populate('recipient', 'name email')
    .populate('jobId', 'title company');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Error marking message as read' });
  }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      recipient: req.user.id,
      read: false
    });

    res.json({ count });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ message: 'Error getting unread count' });
  }
});

module.exports = router; 