import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { computeDocumentStatus, daysUntilExpiry } from '@/lib/expiryCalc';
import { PageTitle, Section } from '@/components/common/Section';
import { useRole } from '@/context/RoleContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { labelForState } from '@/lib/stateMachine';
import { fmtDate } from '@/lib/formatters';

export function DashboardPage() {
  const { currentUser, currentRole } = useRole();
  const now = new Date();

  const expiringDocs = data.regulatoryDocuments
    .map((d) => ({ doc: d, days: daysUntilExpiry(d, now), status: computeDocumentStatus(d, now) }))
    .filter((x) => x.status === 'expiring_soon' || x.status === 'expired' || x.status === 'in_renewal' || x.status === 'not_started')
    .sort((a, b) => (a.days ?? 99999) - (b.days ?? 99999))
    .slice(0, 5);

  const mySamples = data.sampleRequests
    .filter((s) => s.state === 'requested' || s.state === 'approved_by_rop' || s.state === 'sent')
    .slice(0, 5);

  const myOrders = data.orders
    .filter((o) => o.state !== 'closed')
    .slice(0, 5);

  return (
    <div>
      <PageTitle
        title={`Здравствуйте, ${currentUser.full_name}`}
        subtitle={`Роль: ${currentRole} · Сегодня: ${fmtDate(now.toISOString())}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section
          title="Ближайшие просрочки документов"
          action={<Link to="/documents/expiring" className="text-xs text-brand-primary hover:underline">Все →</Link>}
        >
          {expiringDocs.length === 0 ? (
            <div className="text-sm text-gray-500">Нет критичных дат в ближайшие 3 месяца.</div>
          ) : (
            <ul className="space-y-2">
              {expiringDocs.map(({ doc, days, status }) => (
                <li key={doc.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link to={`/documents/${doc.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-primary">
                      {doc.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-0.5">
                      № {doc.number} · истекает {fmtDate(doc.expiry_date)}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {status === 'expired' && <StatusBadge label="Просрочен" variant="danger" />}
                    {status === 'expiring_soon' && <StatusBadge label={`${days} дн.`} variant="warn" />}
                    {status === 'in_renewal' && <StatusBadge label="В процессе" variant="info" />}
                    {status === 'not_started' && <StatusBadge label="Не начата" variant="blocked" />}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section
          title="Заявки на образцы"
          action={<Link to="/samples" className="text-xs text-brand-primary hover:underline">Все →</Link>}
        >
          {mySamples.length === 0 ? (
            <div className="text-sm text-gray-500">Нет активных заявок.</div>
          ) : (
            <ul className="space-y-2">
              {mySamples.map((s) => {
                const customer = data.customers.find((c) => c.id === s.customer_id);
                return (
                  <li key={s.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/samples/${s.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-primary">
                        {s.id} · {customer?.name ?? s.customer_id}
                      </Link>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {s.channel === 'cdek' ? 'СДЭК' : 'Почта России'} · {s.requested_items.length} позиц.
                      </div>
                    </div>
                    <StatusBadge
                      label={s.state}
                      variant={
                        s.state === 'requested' ? 'info'
                        : s.state === 'approved_by_rop' ? 'warn'
                        : s.state === 'sent' ? 'ok'
                        : 'neutral'
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section
          title="Производственные задания"
          action={<Link to="/orders" className="text-xs text-brand-primary hover:underline">Все →</Link>}
        >
          {myOrders.length === 0 ? (
            <div className="text-sm text-gray-500">Нет активных заказов.</div>
          ) : (
            <ul className="space-y-2">
              {myOrders.map((o) => {
                const customer = data.customers.find((c) => c.id === o.customer_id);
                return (
                  <li key={o.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/orders/${o.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-primary">
                        {o.id} · {customer?.name ?? o.customer_id}
                      </Link>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {o.order_type} · отгрузка {fmtDate(o.planned_shipment_date)}
                      </div>
                    </div>
                    <StatusBadge
                      label={labelForState(o.state)}
                      variant={
                        o.state === 'draft' ? 'neutral'
                        : o.state === 'awaiting_payment' || o.state === 'awaiting_mockup_approval' ? 'warn'
                        : o.state === 'ready_to_ship' || o.state === 'shipped' || o.state === 'delivered' ? 'ok'
                        : 'info'
                      }
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section
          title="Быстрый поиск SKU"
          action={<Link to="/catalog" className="text-xs text-brand-primary hover:underline">Весь каталог →</Link>}
        >
          <p className="text-sm text-gray-500 mb-3">
            Используйте поисковую строку сверху: ищет по артикулу, EAN-13 или части названия. В каталоге {data.skus.length} SKU × {data.productLines.length} продуктовых линий.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link to="/catalog/PV-007" className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">ТПС 05/1</Link>
            <Link to="/catalog" className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">Термопакеты</Link>
            <Link to="/catalog" className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">SHOCK® 450 мл</Link>
            <Link to="/catalog" className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">LinerBox 24 л</Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
