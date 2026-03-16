import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addError } from '../api';

const topics = ['二次方程', '函数与图像', '三角形与几何证明', '圆的性质', '概率与统计', '一次函数', '二次函数', '不等式', '相似与全等', '其他'];
const errorTypes = ['概念理解错误', '计算错误', '审题不清', '方法选择错误', '粗心大意', '其他'];

export default function AddError() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    topic: topics[0],
    question: '',
    wrongAnswer: '',
    correctAnswer: '',
    errorType: errorTypes[0],
    note: '',
    difficulty: 3,
  });

  const set = (key: string, value: string | number) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addError(form);
      navigate('/errors');
    } catch (err) {
      console.error(err);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight mb-2">添加错题</h2>
      <p className="text-apple-secondary mb-10">记录一道新的数学错题，帮助你更好地分析薄弱环节。</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="知识点">
            <select value={form.topic} onChange={(e) => set('topic', e.target.value)} className="input-field">
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="错误类型">
            <select value={form.errorType} onChange={(e) => set('errorType', e.target.value)} className="input-field">
              {errorTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="题目内容">
          <textarea
            value={form.question}
            onChange={(e) => set('question', e.target.value)}
            className="input-field min-h-[100px]"
            placeholder="请输入题目..."
            required
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="我的错误答案">
            <input
              value={form.wrongAnswer}
              onChange={(e) => set('wrongAnswer', e.target.value)}
              className="input-field"
              placeholder="你当时的答案"
              required
            />
          </Field>
          <Field label="正确答案">
            <input
              value={form.correctAnswer}
              onChange={(e) => set('correctAnswer', e.target.value)}
              className="input-field"
              placeholder="正确的解答"
              required
            />
          </Field>
        </div>

        <Field label="笔记 / 反思">
          <textarea
            value={form.note}
            onChange={(e) => set('note', e.target.value)}
            className="input-field min-h-[80px]"
            placeholder="写下你的反思，帮助加深记忆..."
          />
        </Field>

        <Field label={`难度：${form.difficulty} / 5`}>
          <input
            type="range"
            min={1}
            max={5}
            value={form.difficulty}
            onChange={(e) => set('difficulty', Number(e.target.value))}
            className="w-full accent-apple-blue"
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-apple-blue py-3.5 text-sm font-medium text-white shadow-sm hover:bg-apple-blueHover transition-colors disabled:opacity-50"
        >
          {loading ? '提交中...' : '保存错题'}
        </button>
      </form>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-apple-text mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
