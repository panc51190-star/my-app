import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ErrorList from './pages/ErrorList';
import AddError from './pages/AddError';
import Diagnosis from './pages/Diagnosis';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/errors', label: '错题本' },
  { to: '/add', label: '添加错题' },
  { to: '/diagnosis', label: '诊断分析' },
];

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 h-12">
          <Link to="/" className="text-lg font-semibold tracking-tight text-apple-text">
            📐 数学错题诊断
          </Link>
          <ul className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`transition-colors ${
                    location.pathname === item.to
                      ? 'text-apple-blue font-medium'
                      : 'text-apple-secondary hover:text-apple-text'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/errors" element={<ErrorList />} />
          <Route path="/add" element={<AddError />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
        </Routes>
      </main>

      <footer className="py-6 text-center text-xs text-apple-secondary border-t border-gray-100">
        九年级数学错题诊断系统 &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
