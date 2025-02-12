const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Submit form data
router.post('/submit', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ success: true, data: formData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await FormData.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get submission by ID
router.get('/submission/:id', async (req, res) => {
  try {
    const submission = await FormData.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }
    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
