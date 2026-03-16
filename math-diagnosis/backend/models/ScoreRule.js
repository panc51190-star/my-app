const mongoose = require('mongoose');

const scoreRuleSchema = new mongoose.Schema({
  scoreRange: { type: String, required: true, unique: true },
  knowledgePoints: [{ type: String }],
  coreTopics: [{ type: String }],
});

module.exports = mongoose.model('ScoreRule', scoreRuleSchema);
