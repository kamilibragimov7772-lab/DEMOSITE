import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';

export function CarriersPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Транспортные компании' }]} />
      <PageTitle title="Транспортные компании" subtitle={`${data.carriers.length} приоритетных ТК рядом со складом в Люберцах`} />

      <Section title="Справочник">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Приоритет</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Название</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">У склада</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Москва</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Россия</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Примечание</th>
            </tr>
          </thead>
          <tbody>
            {data.carriers.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 text-xs text-gray-500">{c.priority ?? '—'}</td>
                <td className="px-3 py-2 text-sm font-medium">{c.name}</td>
                <td className="px-3 py-2">{c.is_preferred_near_warehouse ? <StatusBadge label="да" variant="ok" /> : '—'}</td>
                <td className="px-3 py-2">{c.covers_moscow ? <StatusBadge label="✓" variant="info" /> : '—'}</td>
                <td className="px-3 py-2">{c.covers_russia ? <StatusBadge label="✓" variant="info" /> : '—'}</td>
                <td className="px-3 py-2 text-xs text-gray-500">{c.notes ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
