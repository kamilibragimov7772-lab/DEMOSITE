import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';
import { fmtDate, fmtNumber } from '@/lib/formatters';

export function FLFRegistryPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Печать · реестр ФЛФ' }]} />
      <PageTitle
        title="Реестр ФЛФ (флексо-клише)"
        subtitle="Силикон · ресурс 1 000 000 оттисков / 1,5 года / 6 приладок. Хранятся у типографии."
        right={<DemoBanner />}
      />

      <Section title={`Клише (${data.flfForms.length})`}>
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">ID</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Типография</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Клиент</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">SKU</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Печать с</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Оттиски</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Приладок</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.flfForms.map((f) => {
              const partner = data.printingPartners.find((p) => p.id === f.partner_id);
              const customer = data.customers.find((c) => c.id === f.customer_id);
              const sku = data.skus.find((s) => s.id === f.sku_id);
              return (
                <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">{f.id}</td>
                  <td className="px-3 py-2 text-xs">{partner?.name ?? f.partner_id}</td>
                  <td className="px-3 py-2 text-xs">{customer?.name ?? f.customer_id}</td>
                  <td className="px-3 py-2 text-xs font-mono">{sku?.article_number ?? f.sku_id}</td>
                  <td className="px-3 py-2 text-xs">{fmtDate(f.printed_since)}</td>
                  <td className="px-3 py-2 text-xs">{fmtNumber(f.prints_count)} / {fmtNumber(f.expiry_by_count)}</td>
                  <td className="px-3 py-2 text-xs">{f.runs_count} / {f.expiry_by_runs}</td>
                  <td className="px-3 py-2">
                    {f.status === 'active' && <StatusBadge label="активно" variant="ok" />}
                    {f.status === 'expired_by_count' && <StatusBadge label="1 млн оттисков" variant="danger" />}
                    {f.status === 'expired_by_date' && <StatusBadge label="1,5 года" variant="danger" />}
                    {f.status === 'expired_by_runs' && <StatusBadge label="6 приладок" variant="danger" />}
                    {f.status === 'destroyed_with_notice' && <StatusBadge label="уничтожено" variant="neutral" />}
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
