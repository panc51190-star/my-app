import { useEffect, useState } from 'react';
import { getErrors, updateError, deleteError, type MathError } from '../api';

export default function ErrorList() {
  const [errors, setErrors] = useState<MathError[]>([]);
  const [filter, setFilter] = useState('全部');

  useEffect(() => {
    getErrors().then(setErrors).catch(console.error);
  }, []);

  const toggleMastered = async (item: MathError) => {
    const updated = await updateError(item._id, { mastered: !item.mastered });
    setErrors((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这道错题？')) return;
    await deleteError(id);
    setErrors((prev) => prev.filter((e) => e._id !== id));
  };

  const topics = ['全部', ...new Set(errors.map((e) => e.topic))];
  const filtered = filter === '全部' ? errors : errors.filter((e) => e.topic === filter);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight mb-2">我的错题本</h2>
      <p className="text-apple-secondary mb-8">共 {errors.length} 道错题，已掌握 {errors.filter((e) => e.mastered).length} 道。</p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === t ? 'bg-apple-blue text-white' : 'bg-apple-gray text-apple-secondary hover:bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-apple-secondary py-20">暂无错题记录，去添加第一道吧！</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className={`rounded-2xl border p-6 transition-all hover:shadow-md ${
                item.mastered ? 'border-green-200 bg-green-50/50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {item.topic}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                      {item.errorType}
                    </span>
                    {item.mastered && (
                      <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        ✓ 已掌握
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-apple-text mb-3 whitespace-pre-wrap">{item.question}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-red-500 font-medium">✗ 我的答案：</span>
                      <span className="text-apple-secondary">{item.wrongAnswer}</span>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium">✓ 正确答案：</span>
                      <span className="text-apple-secondary">{item.correctAnswer}</span>
                    </div>
                  </div>
                  {item.note && <p className="mt-3 text-sm text-apple-secondary italic">💡 {item.note}</p>}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => toggleMastered(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      item.mastered
                        ? 'bg-gray-100 text-apple-secondary hover:bg-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {item.mastered ? '取消掌握' : '标记掌握'}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
