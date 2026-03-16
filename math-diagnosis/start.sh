#!/bin/bash
echo "🚀 启动数学错题诊断系统..."
echo ""

# Start backend
echo "📦 启动后端 (端口 5000)..."
cd "$(dirname "$0")/backend"
node server.js &
BACKEND_PID=$!

# Start frontend
echo "🎨 启动前端 (端口 5173)..."
cd "$(dirname "$0")/frontend"
npx vite --host &
FRONTEND_PID=$!

echo ""
echo "✅ 系统已启动！"
echo "   前端: http://localhost:5173"
echo "   后端: http://localhost:5000"
echo ""
echo "按 Ctrl+C 停止所有服务"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
