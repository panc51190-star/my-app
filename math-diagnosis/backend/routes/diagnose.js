const express = require('express');
const router = express.Router();
const ScoreRule = require('../models/ScoreRule');

router.post('/', async (req, res) => {
  try {
    const { scoreRange } = req.body;
    if (!scoreRange) {
      return res.status(400).json({ message: '请提供分数段' });
    }

    const rule = await ScoreRule.findOne({ scoreRange });
    if (!rule) {
      return res.status(404).json({ message: `未找到分数段 "${scoreRange}" 对应的诊断数据` });
    }

    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
