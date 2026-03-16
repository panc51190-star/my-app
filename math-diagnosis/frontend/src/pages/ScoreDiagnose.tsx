import { useState } from 'react';
import { diagnoseByScore, type ScoreRule } from '../api';

const presetRanges = ['0-30', '30-50', '50-60', '60-70', '70-80', '80-90', '90-100'];

export default function ScoreDiagnose() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScoreRule | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (range?: string) => {
    const scoreRange = range || input.trim();
    if (!scoreRange) {
      setError('请输入分数段');
      return;
    }
    if (!/^\d+-\d+$/.test(scoreRange)) {
      setError('格式不正确，请输入如 "80-90" 的分数段');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await diagnoseByScore(scoreRange);
      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '查询失败';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const resp = (err as { response?: { data?: { message?: string } } }).response;
        setError(resp?.data?.message || msg);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      {/* Input area */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-3">分数段诊断</h2>
        <p className="text-apple-secondary text-lg mb-10">
          输入你的数学分数段，获取精准的薄弱考点和核心专题分析。
        </p>

        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="输入分数段，如 80-90"
            className="flex-1 rounded-xl border border-gray-200 bg-apple-gray px-5 py-3.5 text-base text-apple-text placeholder-apple-secondary outline-none transition-all focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="shrink-0 rounded-xl bg-apple-blue px-6 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-apple-blueHover transition-colors disabled:opacity-50"
          >
            {loading ? '查询中...' : '提交诊断'}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {/* Quick picks */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {presetRanges.map((r) => (
            <button
              key={r}
              onClick={() => { setInput(r); handleSubmit(r); }}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-apple-gray text-apple-secondary hover:bg-gray-200 transition-colors"
            >
              {r} 分
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center">
            <span className="inline-block px-5 py-2 rounded-full bg-apple-blue/10 text-apple-blue text-lg font-semibold">
              {result.scoreRange} 分
            </span>
          </div>

          <ResultCard
            title="📌 需要重点突破的考点"
            items={result.knowledgePoints}
            color="blue"
          />

          <ResultCard
            title="🎯 核心专题"
            items={result.coreTopics}
            color="purple"
          />
        </div>
      )}
    </section>
  );
}

function ResultCard({ title, items, color }: { title: string; items: string[]; color: 'blue' | 'purple' }) {
  const colors = {
    blue: { bg: 'bg-blue-50', tag: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
    purple: { bg: 'bg-purple-50', tag: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400' },
  };
  const c = colors[color];

  return (
    <div className={`rounded-2xl ${c.bg} p-8`}>
      <h3 className="text-lg font-semibold mb-5">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${c.dot} shrink-0`} />
            <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium ${c.tag}`}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
