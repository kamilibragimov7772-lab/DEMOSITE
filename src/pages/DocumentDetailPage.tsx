import { Link, useParams } from 'react-router-dom';
import { findDocumentById, data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { computeDocumentStatus } from '@/lib/expiryCalc';
import { fmtDate } from '@/lib/formatters';

export function DocumentDetailPage() {
  const { docId } = useParams<{ docId: string }>();
  const doc = docId ? findDocumentById(docId) : undefined;

  if (!doc) {
    return (
      <div>
        <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Документы', to: '/documents' }, { label: 'Не найден' }]} />
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500">Документ «{docId}» не найден.</div>
      </div>
    );
  }

  const status = computeDocumentStatus(doc);
  const relatedMap = data.skuDocumentMap.filter((m) => m.document_id === doc.id);
  const relatedSKUs = relatedMap
    .map((m) => data.skus.find((s) => s.id === m.sku_id))
    .filter(Boolean)
    .slice(0, 20);

  return (
    <div>
      <Breadcrumbs
        segments={[
          { label: 'Главная', to: '/' },
          { label: 'Документы', to: '/documents' },
          { label: doc.title },
        ]}
      />
      <PageTitle
        title={doc.title}
        subtitle={`№ ${doc.number} · ${doc.doc_type}`}
        right={
          status === 'valid' ? <StatusBadge label="Валиден" variant="ok" />
          : status === 'expiring_soon' ? <StatusBadge label="Скоро истечёт" variant="warn" />
          : status === 'expired' ? <StatusBadge label="Просрочен" variant="danger" />
          : status === 'in_renewal' ? <StatusBadge label="В процессе" variant="info" />
          : <StatusBadge label="Не начата" variant="blocked" />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="PDF-оригинал">
            {doc.file_path ? (
              <div>
                <div className="bg-gray-100 rounded-md overflow-hidden" style={{ height: '70vh' }}>
                  <embed src={doc.file_path} type="application/pdf" width="100%" height="100%" />
                </div>
                <div className="text-[11px] text-gray-400 mt-2">
                  Файл: <span className="font-mono">{doc.file_path}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                PDF-оригинал не приложен. {doc.notes}
              </div>
            )}
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Метаданные">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500">Тип</dt>
              <dd>{doc.doc_type}</dd>
              <dt className="text-gray-500">Номер</dt>
              <dd className="font-mono">{doc.number}</dd>
              <dt className="text-gray-500">Выдан</dt>
              <dd>{fmtDate(doc.issued_date)}</dd>
              <dt className="text-gray-500">Истекает</dt>
              <dd>{fmtDate(doc.expiry_date)}</dd>
              <dt className="text-gray-500">Орган</dt>
              <dd className="col-span-1">{doc.issuing_authority ?? '—'}</dd>
            </dl>
            {doc.notes && (
              <div className="text-xs text-amber-700 mt-3 border-t border-gray-100 pt-2">⚠ {doc.notes}</div>
            )}
          </Section>

          <Section title={`Применим к SKU (${relatedMap.length})`}>
            {relatedSKUs.length === 0 ? (
              <div className="text-sm text-gray-500">Документ не привязан к SKU.</div>
            ) : (
              <ul className="text-sm space-y-1">
                {relatedSKUs.map((s) => s && (
                  <li key={s.id}>
                    <Link to={`/catalog/${s.id}`} className="text-brand-primary hover:underline">
                      {s.article_number} · {s.variant_name}
                    </Link>
                  </li>
                ))}
                {relatedMap.length > 20 && (
                  <li className="text-xs text-gray-400">...и ещё {relatedMap.length - 20} SKU</li>
                )}
              </ul>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
