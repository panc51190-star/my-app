const express = require('express');
const router = express.Router();
const MathError = require('../models/MathError');

router.get('/', async (_req, res) => {
  try {
    const errors = await MathError.find().sort({ createdAt: -1 });
    res.json(errors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const total = await MathError.countDocuments();
    const mastered = await MathError.countDocuments({ mastered: true });

    const byTopic = await MathError.aggregate([
      { $group: { _id: '$topic', count: { $sum: 1 }, masteredCount: { $sum: { $cond: ['$mastered', 1, 0] } } } },
      { $sort: { count: -1 } },
    ]);

    const byErrorType = await MathError.aggregate([
      { $group: { _id: '$errorType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const recent = await MathError.find().sort({ createdAt: -1 }).limit(5);

    res.json({ total, mastered, unmastered: total - mastered, byTopic, byErrorType, recent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const error = new MathError(req.body);
    const saved = await error.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updated = await MathError.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: '未找到该错题' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MathError.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '未找到该错题' });
    res.json({ message: '已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
