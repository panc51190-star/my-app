require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const errorRoutes = require('./routes/errors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let dbConnected = false;

const inMemoryErrors = [];
let idCounter = 1;

function fallbackRoutes(router) {
  router.get('/api/errors', (_req, res) => {
    res.json([...inMemoryErrors].reverse());
  });

  router.get('/api/errors/stats', (_req, res) => {
    const total = inMemoryErrors.length;
    const mastered = inMemoryErrors.filter((e) => e.mastered).length;

    const topicMap = {};
    inMemoryErrors.forEach((e) => {
      if (!topicMap[e.topic]) topicMap[e.topic] = { count: 0, masteredCount: 0 };
      topicMap[e.topic].count++;
      if (e.mastered) topicMap[e.topic].masteredCount++;
    });
    const byTopic = Object.entries(topicMap).map(([_id, v]) => ({ _id, ...v })).sort((a, b) => b.count - a.count);

    const typeMap = {};
    inMemoryErrors.forEach((e) => {
      if (!typeMap[e.errorType]) typeMap[e.errorType] = 0;
      typeMap[e.errorType]++;
    });
    const byErrorType = Object.entries(typeMap).map(([_id, count]) => ({ _id, count })).sort((a, b) => b.count - a.count);

    const recent = [...inMemoryErrors].reverse().slice(0, 5);
    res.json({ total, mastered, unmastered: total - mastered, byTopic, byErrorType, recent });
  });

  router.post('/api/errors', (req, res) => {
    const error = { _id: String(idCounter++), ...req.body, mastered: false, createdAt: new Date().toISOString() };
    inMemoryErrors.push(error);
    res.status(201).json(error);
  });

  router.patch('/api/errors/:id', (req, res) => {
    const idx = inMemoryErrors.findIndex((e) => e._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: '未找到该错题' });
    Object.assign(inMemoryErrors[idx], req.body);
    res.json(inMemoryErrors[idx]);
  });

  router.delete('/api/errors/:id', (req, res) => {
    const idx = inMemoryErrors.findIndex((e) => e._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: '未找到该错题' });
    inMemoryErrors.splice(idx, 1);
    res.json({ message: '已删除' });
  });

  return router;
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    dbConnected = true;
    console.log('✅ MongoDB 已连接');
    app.use('/api/errors', errorRoutes);
  } catch (err) {
    console.log('⚠️  MongoDB 未连接，使用内存存储模式:', err.message);
    fallbackRoutes(app);
  }

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', db: dbConnected ? 'mongodb' : 'in-memory' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 后端服务运行在 http://localhost:${PORT}`);
  });
}

start();
