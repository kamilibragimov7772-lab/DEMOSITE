import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';

type CategoryFilter = 'all' | 'Термоупаковка' | 'Аккумуляторы температуры' | 'Посуда';
type SourceFilter = 'all' | 'production' | 'purchased';

export function CatalogListPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [source, setSource] = useState<SourceFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return data.skus.filter((s) => {
      const line = data.productLines.find((l) => l.id === s.product_line_id);
      if (category !== 'all' && line?.category !== category) return false;
      if (source !== 'all' && s.sku_source !== source) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          s.article_number?.toLowerCase().includes(q) ||
          s.ean_13?.includes(q) ||
          s.variant_name?.toLowerCase().includes(q) ||
          s.size_descriptor?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [category, source, search]);

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]} />
      <PageTitle title="Каталог продукции" subtitle={`${data.skus.length} SKU · ${data.productLines.length} линий · 3 категории`} />

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-[11px] uppercase text-gray-500 mb-1">Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as CategoryFilter)} className="text-sm px-2 py-1 border border-gray-200 rounded-md">
            <option value="all">Все</option>
            <option value="Термоупаковка">Термоупаковка</option>
            <option value="Аккумуляторы температуры">Аккумуляторы температуры</option>
            <option value="Посуда">Посуда</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase text-gray-500 mb-1">Источник</label>
          <select value={source} onChange={(e) => setSource(e.target.value as SourceFilter)} className="text-sm px-2 py-1 border border-gray-200 rounded-md">
            <option value="all">Все</option>
            <option value="production">production (своё)</option>
            <option value="purchased">purchased (Китай)</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] uppercase text-gray-500 mb-1">Поиск</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Артикул, EAN, размер, название…"
            className="w-full text-sm px-2 py-1 border border-gray-200 rounded-md"
          />
        </div>
        <div className="text-xs text-gray-500 pb-1">Найдено: <strong>{filtered.length}</strong></div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Линия</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Артикул</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Название</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Размер</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">В коробе</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">EAN-13</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Источник</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const line = data.productLines.find((l) => l.id === s.product_line_id);
              return (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-500">{line?.name_canonical ?? s.product_line_id}</td>
                  <td className="px-3 py-2 font-mono text-xs">{s.article_number}</td>
                  <td className="px-3 py-2">
                    <Link to={`/catalog/${s.id}`} className="text-brand-primary hover:underline">
                      {s.variant_name}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-xs">{s.size_descriptor ?? '—'}</td>
                  <td className="px-3 py-2 text-xs">{s.pack_quantity ?? '—'}</td>
                  <td className="px-3 py-2 text-xs font-mono text-gray-500">{s.ean_13 ?? '—'}</td>
                  <td className="px-3 py-2">
                    {s.sku_source === 'purchased' ? (
                      <StatusBadge label="Китай" variant="warn" />
                    ) : (
                      <StatusBadge label="Своё" variant="ok" />
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-sm text-gray-500">Ничего не найдено</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
