'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          欢迎来到我的网站！
        </h1>
        <p className="text-center text-lg">
          这是我的第一个Next.js网站，成功部署在Vercel上！🎉
        </p>
      </div>
    </main>
  );
}