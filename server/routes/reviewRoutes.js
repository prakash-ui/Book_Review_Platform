const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { authMiddleware } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.query.bookId })
      .populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const review = new Review({ ...req.body, userId: req.user._id });
  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;