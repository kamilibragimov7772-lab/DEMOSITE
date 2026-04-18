import { useState } from 'react';
import { useAudit } from '@/context/AuditContext';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { fmtDateTime } from '@/lib/formatters';

export function AdminAuditPage() {
  const { entries } = useAudit();
  const [filter, setFilter] = useState('');

  const filtered = entries.filter((e) => {
    if (!filter.trim()) return true;
    const q = filter.toLowerCase();
    return (
      (e.user_login ?? '').toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q) ||
      (e.object_type ?? '').toLowerCase().includes(q) ||
      (e.object_id ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Admin · Audit log' }]} />
      <PageTitle
        title="Audit log"
        subtitle="Append-only. Удалить или изменить запись нельзя. Хранится в localStorage в demo; в production — в БД."
        right={<StatusBadge label="append-only" variant="info" />}
      />

      <div className="mb-3">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Фильтр: пользователь, действие, объект…"
          className="w-full max-w-md text-sm px-2 py-1.5 border border-gray-200 rounded-md"
        />
      </div>

      <Section title={`Записи (${filtered.length} из ${entries.length})`}>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600 w-40">Время</th>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600">Пользователь</th>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600">Действие</th>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600">Объект</th>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600">ID</th>
              <th className="text-left px-2 py-1.5 font-medium text-gray-600">Было / стало</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50 align-top">
                <td className="px-2 py-1.5 text-xs text-gray-500">{fmtDateTime(e.timestamp)}</td>
                <td className="px-2 py-1.5 text-xs font-mono">{e.user_login ?? e.user_id}</td>
                <td className="px-2 py-1.5 text-xs font-mono">{e.action}</td>
                <td className="px-2 py-1.5 text-xs text-gray-500">{e.object_type}</td>
                <td className="px-2 py-1.5 text-xs font-mono text-gray-500">{e.object_id ?? '—'}</td>
                <td className="px-2 py-1.5 text-[11px] text-gray-600 max-w-md">
                  {e.diff_before && <div className="text-red-600">− {JSON.stringify(e.diff_before)}</div>}
                  {e.diff_after && <div className="text-green-700">+ {JSON.stringify(e.diff_after)}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
