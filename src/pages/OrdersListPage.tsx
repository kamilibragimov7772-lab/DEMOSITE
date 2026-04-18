import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';
import { labelForState } from '@/lib/stateMachine';
import { fmtDate } from '@/lib/formatters';

export function OrdersListPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Производственные задания' }]} />
      <PageTitle
        title="Производственные задания (shell)"
        subtitle="Phase 1 — абстрактный ProductionOrder с 10-состоянным state machine и блокером «подписанный макет». Реальные статусы 1С УНФ — Phase 2."
        right={<DemoBanner />}
      />

      <Section title={`Заказы (${data.orders.length}) — demo`}>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">ID</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Клиент</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Тип</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Позиций</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Плановая отгрузка</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Макет</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((o) => {
              const customer = data.customers.find((c) => c.id === o.customer_id);
              const lines = data.orderLines.filter((l) => l.order_id === o.id);
              const approval = data.approvalArtifacts.find((a) => a.order_id === o.id);
              return (
                <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">
                    <Link to={`/orders/${o.id}`} className="text-brand-primary hover:underline">{o.id}</Link>
                  </td>
                  <td className="px-3 py-2 text-xs">{customer?.name ?? o.customer_id}</td>
                  <td className="px-3 py-2 text-xs">{o.order_type}</td>
                  <td className="px-3 py-2 text-xs">{lines.length}</td>
                  <td className="px-3 py-2 text-xs">{fmtDate(o.planned_shipment_date)}</td>
                  <td className="px-3 py-2 text-xs">
                    {approval?.sign_status === 'signed' && <StatusBadge label="✓ подписан" variant="ok" />}
                    {approval?.sign_status === 'not_requested' && <StatusBadge label="не запрошен" variant="warn" />}
                    {approval?.sign_status === 'requested' && <StatusBadge label="ждёт" variant="info" />}
                    {!approval && <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-3 py-2">
                    <StatusBadge
                      label={labelForState(o.state)}
                      variant={
                        o.state === 'draft' ? 'neutral'
                        : o.state === 'awaiting_payment' || o.state === 'awaiting_mockup_approval' ? 'warn'
                        : o.state === 'shipped' || o.state === 'delivered' || o.state === 'closed' ? 'ok'
                        : 'info'
                      }
                    />
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
