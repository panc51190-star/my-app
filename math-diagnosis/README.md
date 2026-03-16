# 📐 九年级数学错题诊断系统

一个帮助九年级学生记录、分析和攻克数学错题的 Web 应用。采用苹果官网风格的极简设计。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 19 + Vite + TailwindCSS + Recharts |
| 后端 | Express + MongoDB (Mongoose) |
| 语言 | TypeScript (前端) / JavaScript (后端) |

## 快速启动

```bash
# 1. 安装依赖
cd math-diagnosis/backend && npm install
cd ../frontend && npm install

# 2. 启动（前后端同时启动）
cd .. && bash start.sh
```

- 前端: http://localhost:5173
- 后端: http://localhost:5000

> **注意**：如果没有安装 MongoDB，后端会自动切换为内存存储模式，所有功能正常使用，但数据不会持久化。

## 功能

- **首页**：总览统计数据
- **错题本**：浏览、筛选、标记掌握、删除错题
- **添加错题**：记录新的数学错题
- **诊断分析**：图表展示薄弱环节，精准提升
