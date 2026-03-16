import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats, type Stats } from '../api';

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <div className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          掌握每一道错题
          <br />
          <span className="text-apple-blue">成就数学满分。</span>
        </h1>
        <p className="mt-6 text-lg text-apple-secondary max-w-xl mx-auto leading-relaxed">
          记录、分析、攻克你的数学薄弱环节。专为九年级学生设计的智能错题诊断系统。
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/add"
            className="inline-flex items-center rounded-full bg-apple-blue px-7 py-3 text-sm font-medium text-white shadow-sm hover:bg-apple-blueHover transition-colors"
          >
            开始记录错题
          </Link>
          <Link
            to="/diagnosis"
            className="inline-flex items-center rounded-full bg-transparent border border-apple-blue px-7 py-3 text-sm font-medium text-apple-blue hover:bg-blue-50 transition-colors"
          >
            查看诊断报告
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
          <StatCard label="错题总数" value={stats.total} color="text-red-500" />
          <StatCard label="已掌握" value={stats.mastered} color="text-green-500" />
          <StatCard label="待攻克" value={stats.unmastered} color="text-orange-500" />
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl bg-apple-gray p-8 text-center transition-shadow hover:shadow-md">
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
      <p className="mt-2 text-sm text-apple-secondary">{label}</p>
    </div>
  );
}
