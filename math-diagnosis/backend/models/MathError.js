const mongoose = require('mongoose');

const mathErrorSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      enum: [
        '二次方程',
        '函数与图像',
        '三角形与几何证明',
        '圆的性质',
        '概率与统计',
        '一次函数',
        '二次函数',
        '不等式',
        '相似与全等',
        '其他',
      ],
    },
    question: { type: String, required: true },
    wrongAnswer: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    errorType: {
      type: String,
      required: true,
      enum: ['概念理解错误', '计算错误', '审题不清', '方法选择错误', '粗心大意', '其他'],
    },
    note: { type: String, default: '' },
    difficulty: { type: Number, min: 1, max: 5, default: 3 },
    mastered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MathError', mathErrorSchema);
