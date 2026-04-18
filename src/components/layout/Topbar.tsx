import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RoleSwitcher } from './RoleSwitcher';
import { data } from '@/lib/dataLoader';

export function Topbar() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [hint, setHint] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim().toLowerCase();
    if (!query) return;
    // Поиск SKU: по артикулу, EAN, названию
    const hit = data.skus.find(
      (s) =>
        (s.article_number?.toLowerCase() ?? '').includes(query) ||
        (s.ean_13 ?? '').includes(query) ||
        (s.variant_name?.toLowerCase() ?? '').includes(query) ||
        s.id.toLowerCase() === query
    );
    if (hit) {
      navigate(`/catalog/${hit.id}`);
      setQ('');
      setHint(null);
    } else {
      setHint(`Ничего не найдено по запросу «${q}». Попробуйте артикул (например «ТПС») или EAN.`);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Поиск SKU (артикул, EAN, название)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
        />
        {hint && <div className="text-[11px] text-gray-500 mt-1">{hint}</div>}
      </form>
      <RoleSwitcher />
    </header>
  );
}
