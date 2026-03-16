export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-xl w-full px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          欢迎来到我的第一个 Next.js 网站！🎉
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-8">
          这是我亲手创建的第一个项目，一切从这里开始。
        </p>
        <button
          onClick={() => alert("谢谢你的光临，这只是一个开始！")}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-500 transition-colors"
        >
          点我打个招呼
        </button>
      </div>
    </main>
  );
}