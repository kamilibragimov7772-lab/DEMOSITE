import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import type { DocumentStatus, RegulatoryDocument } from '@/types';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { computeDocumentStatus, daysUntilExpiry } from '@/lib/expiryCalc';
import { fmtDate } from '@/lib/formatters';

type ExpiryItem = { doc: RegulatoryDocument; status: DocumentStatus; days: number | null };

export function DocumentsExpiringPage() {
  const now = new Date();
  const computed = data.regulatoryDocuments.map((d) => ({
    doc: d,
    status: computeDocumentStatus(d, now),
    days: daysUntilExpiry(d, now),
  }));

  const expired = computed.filter((x) => x.status === 'expired');
  const expiring = computed.filter((x) => x.status === 'expiring_soon').sort((a, b) => (a.days ?? 0) - (b.days ?? 0));
  const inRenewal = computed.filter((x) => x.status === 'in_renewal');
  const notStarted = computed.filter((x) => x.status === 'not_started');
  const valid = computed.filter((x) => x.status === 'valid');

  return (
    <div>
      <Breadcrumbs
        segments={[
          { label: 'Главная', to: '/' },
          { label: 'Документы', to: '/documents' },
          { label: 'Дашборд просрочек' },
        ]}
      />
      <PageTitle
        title="Контроль сроков документов"
        subtitle={`Текущая дата: ${fmtDate(now.toISOString())} · Порог: 90 дней`}
      />

      {expired.length > 0 && (
        <Section title={`🔴 Просрочены (${expired.length})`}>
          <ExpiryList items={expired} />
        </Section>
      )}

      {expiring.length > 0 && (
        <Section title={`🟡 Истекают в ближайшие 90 дней (${expiring.length})`}>
          <ExpiryList items={expiring} />
        </Section>
      )}

      {inRenewal.length > 0 && (
        <Section title={`🔵 В процессе получения / продления (${inRenewal.length})`}>
          <ExpiryList items={inRenewal} />
        </Section>
      )}

      {notStarted.length > 0 && (
        <Section title={`⛔ Процедура не начата (${notStarted.length})`}>
          <ExpiryList items={notStarted} />
        </Section>
      )}

      <Section title={`🟢 Действующие (${valid.length})`}>
        <ExpiryList items={valid} compact />
      </Section>
    </div>
  );
}

function ExpiryList({ items, compact = false }: { items: ExpiryItem[]; compact?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map(({ doc, status, days }) => (
        <li key={doc.id} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2 last:border-0">
          <div className="min-w-0">
            <Link to={`/documents/${doc.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-primary">
              {doc.title}
            </Link>
            <div className="text-xs text-gray-500 mt-0.5">№ {doc.number}{doc.expiry_date ? ` · до ${fmtDate(doc.expiry_date)}` : ''}</div>
            {!compact && doc.notes && <div className="text-[11px] text-amber-700 mt-1">⚠ {doc.notes}</div>}
          </div>
          <div className="flex-shrink-0">
            {status === 'expired' && <StatusBadge label="Просрочен" variant="danger" />}
            {status === 'expiring_soon' && <StatusBadge label={`${days} дн.`} variant="warn" />}
            {status === 'valid' && <StatusBadge label="Валиден" variant="ok" />}
            {status === 'in_renewal' && <StatusBadge label="В процессе" variant="info" />}
            {status === 'not_started' && <StatusBadge label="Не начата" variant="blocked" />}
          </div>
        </li>
      ))}
    </ul>
  );
}
