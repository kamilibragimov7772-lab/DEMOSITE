import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { computeDocumentStatus } from '@/lib/expiryCalc';
import { fmtDate } from '@/lib/formatters';

const TYPE_LABEL: Record<string, string> = {
  declaration: 'Декларация',
  certificate: 'Сертификат',
  patent: 'Патент',
  trademark: 'Товарный знак',
  technical_conditions: 'ТУ',
  test_protocol: 'Протокол испытаний',
};

export function DocumentsListPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Документы' }]} />
      <PageTitle
        title="Реестр регуляторных документов"
        subtitle={`${data.regulatoryDocuments.length} документов · декларации ЕАЭС, ISO 9001, ТУ, патенты, товарные знаки`}
        right={
          <Link to="/documents/expiring" className="text-sm text-brand-primary hover:underline">
            Дашборд просрочек →
          </Link>
        }
      />

      <Section title="Все документы">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Тип</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Номер</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Название</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Выдан</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Истекает</th>
              <th className="text-left px-3 py-2 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.regulatoryDocuments.map((d) => {
              const status = computeDocumentStatus(d);
              return (
                <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-xs text-gray-500">{TYPE_LABEL[d.doc_type] ?? d.doc_type}</td>
                  <td className="px-3 py-2 font-mono text-xs">{d.number}</td>
                  <td className="px-3 py-2">
                    <Link to={`/documents/${d.id}`} className="text-brand-primary hover:underline">
                      {d.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-xs">{fmtDate(d.issued_date)}</td>
                  <td className="px-3 py-2 text-xs">{fmtDate(d.expiry_date)}</td>
                  <td className="px-3 py-2">
                    {status === 'valid' && <StatusBadge label="валиден" variant="ok" />}
                    {status === 'expiring_soon' && <StatusBadge label="скоро истечёт" variant="warn" />}
                    {status === 'expired' && <StatusBadge label="просрочен" variant="danger" />}
                    {status === 'in_renewal' && <StatusBadge label="в процессе" variant="info" />}
                    {status === 'not_started' && <StatusBadge label="не начата" variant="blocked" />}
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
