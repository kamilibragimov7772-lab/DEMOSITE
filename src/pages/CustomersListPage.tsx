import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';

export function CustomersListPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Клиенты' }]} />
      <PageTitle
        title="Клиенты"
        subtitle="Приложение = reference-слой поверх Bitrix24, не дубль CRM. Согласие на публичное упоминание — не получено."
        right={<DemoBanner />}
      />

      <Section title={`Клиенты (${data.customers.length}) — demo`}>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Название</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Сегмент</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус CRM</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Bitrix24</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Публичное имя</th>
            </tr>
          </thead>
          <tbody>
            {data.customers.map((c) => {
              const seg = data.customerSegments.find((s) => s.id === c.segment_id);
              const st = data.crmStatuses.find((s) => s.code === c.crm_status_code);
              return (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm">{c.name}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{seg?.name ?? c.segment_id}</td>
                  <td className="px-3 py-2">
                    <StatusBadge
                      label={st?.name_ru ?? c.crm_status_code}
                      variant={c.crm_status_code === 'active' ? 'ok' : c.crm_status_code === 'in_work' ? 'info' : c.crm_status_code === 'in_mailing' ? 'neutral' : 'neutral'}
                    />
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-400 italic">{c.bitrix_deal_id ?? 'Phase 2'}</td>
                  <td className="px-3 py-2 text-xs">
                    {c.public_allowed_for_mention
                      ? <StatusBadge label="разрешено" variant="ok" />
                      : <StatusBadge label="скрыто" variant="warn" />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      <Section title={`Сегменты (${data.customerSegments.length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.customerSegments.map((s) => (
            <div key={s.id} className="border border-gray-200 rounded-md p-3 text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.segment_type}</div>
              {s.pains && <div className="text-xs mt-2 text-gray-600"><span className="text-red-600">Боли:</span> {s.pains}</div>}
              {s.expectations && <div className="text-xs mt-1 text-gray-600"><span className="text-green-700">Ожидания:</span> {s.expectations}</div>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
