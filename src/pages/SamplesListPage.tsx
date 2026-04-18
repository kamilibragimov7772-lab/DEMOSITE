import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';
import { fmtDate } from '@/lib/formatters';

const STATE_VARIANT: Record<string, 'info' | 'warn' | 'ok' | 'neutral' | 'danger'> = {
  requested: 'info',
  approved_by_rop: 'warn',
  sent: 'ok',
  delivered: 'ok',
  converted_to_deal: 'ok',
  lost: 'neutral',
};

export function SamplesListPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Заявки на образцы' }]} />
      <PageTitle
        title="Заявки на образцы"
        subtitle="Процесс формализован: заказ → одобрение РОПом (для крупных) → отправка СДЭК / Почта России → трек-номер"
        right={
          <div className="flex items-center gap-3">
            <DemoBanner />
            <Link to="/samples/new" className="bg-brand-primary text-white px-3 py-1.5 rounded-md text-sm hover:bg-brand-primary/90">
              + Новая заявка
            </Link>
          </div>
        }
      />

      <Section title={`Активные заявки (${data.sampleRequests.length})`}>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">ID</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Клиент</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Позиции</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Канал</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Трек</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Создана</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.sampleRequests.map((s) => {
              const customer = data.customers.find((c) => c.id === s.customer_id);
              return (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">
                    <Link to={`/samples/${s.id}`} className="text-brand-primary hover:underline">{s.id}</Link>
                  </td>
                  <td className="px-3 py-2 text-xs">{customer?.name ?? s.customer_id}</td>
                  <td className="px-3 py-2 text-xs">{s.requested_items.length} позиц.</td>
                  <td className="px-3 py-2 text-xs">{s.channel === 'cdek' ? 'СДЭК' : 'Почта России'}</td>
                  <td className="px-3 py-2 text-xs font-mono text-gray-500">{s.tracking_number ?? '—'}</td>
                  <td className="px-3 py-2 text-xs">{fmtDate(s.created_at)}</td>
                  <td className="px-3 py-2">
                    <StatusBadge label={s.state} variant={STATE_VARIANT[s.state] ?? 'neutral'} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
