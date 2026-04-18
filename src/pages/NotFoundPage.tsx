import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-3">404</div>
      <h1 className="text-xl font-semibold mb-2">Страница не найдена</h1>
      <p className="text-sm text-gray-500 mb-5">Такого маршрута в демо нет. Возможно, он появится в Phase 2 или Phase 3.</p>
      <Link to="/" className="text-brand-primary text-sm hover:underline">← На главную</Link>
    </div>
  );
}
