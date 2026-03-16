import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getStats, type Stats } from '../api';

const COLORS = ['#0071e3', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5ac8fa', '#ff2d55', '#ffcc00', '#30b0c7', '#8e8e93'];

export default function Diagnosis() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) {
    return <p className="text-center text-apple-secondary py-24">加载中...</p>;
  }

  if (stats.total === 0) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">诊断分析</h2>
        <p className="text-apple-secondary">暂无数据。添加一些错题后再来查看诊断报告吧！</p>
      </section>
    );
  }

  const masteryRate = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

  const weakTopics = stats.byTopic
    .filter((t) => t.count - t.masteredCount > 0)
    .sort((a, b) => (b.count - b.masteredCount) - (a.count - a.masteredCount));

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight mb-2">诊断分析</h2>
      <p className="text-apple-secondary mb-12">基于你的错题数据，分析薄弱环节，精准提升。</p>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <MiniCard label="总错题" value={stats.total} />
        <MiniCard label="已掌握" value={stats.mastered} />
        <MiniCard label="待攻克" value={stats.unmastered} />
        <MiniCard label="掌握率" value={`${masteryRate}%`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-apple-gray rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">各知识点错题分布</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.byTopic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0071e3" radius={[6, 6, 0, 0]} name="错题数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-apple-gray rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">错误类型占比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stats.byErrorType} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}>
                {stats.byErrorType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak areas */}
      {weakTopics.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-semibold mb-4">📋 薄弱环节排行</h3>
          <div className="space-y-3">
            {weakTopics.map((t, i) => {
              const unmasteredCount = t.count - t.masteredCount;
              const pct = Math.round((unmasteredCount / t.count) * 100);
              return (
                <div key={t._id} className="flex items-center gap-4 bg-apple-gray rounded-xl px-5 py-3">
                  <span className="text-lg font-bold text-apple-secondary w-6">#{i + 1}</span>
                  <span className="font-medium flex-1">{t._id}</span>
                  <span className="text-sm text-red-500 font-medium">{unmasteredCount} 道未掌握</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function MiniCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-apple-gray rounded-2xl p-5 text-center">
      <p className="text-2xl font-bold text-apple-text">{value}</p>
      <p className="text-xs text-apple-secondary mt-1">{label}</p>
    </div>
  );
}
