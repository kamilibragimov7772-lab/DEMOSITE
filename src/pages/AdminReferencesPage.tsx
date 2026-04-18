import { useParams, Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';

const REFS: { key: string; name: string; getData: () => unknown[] }[] = [
  { key: 'carriers', name: 'Транспортные компании (ТК)', getData: () => data.carriers },
  { key: 'customer_segments', name: 'Сегменты клиентов', getData: () => data.customerSegments },
  { key: 'crm_statuses', name: 'CRM-статусы', getData: () => data.crmStatuses },
  { key: 'legal_entities', name: 'Юр. лица TERMY', getData: () => data.legalEntities },
  { key: 'printing_partners', name: 'Типографии-партнёры', getData: () => data.printingPartners },
  { key: 'materials', name: 'Материалы', getData: () => data.materials },
  { key: 'color_palette', name: 'Цветовая палитра', getData: () => data.colorPalette },
];

export function AdminReferencesPage() {
  const { refName } = useParams<{ refName?: string }>();
  const current = refName ? REFS.find((r) => r.key === refName) : undefined;

  return (
    <div>
      <Breadcrumbs
        segments={[
          { label: 'Главная', to: '/' },
          { label: 'Admin · Справочники', to: '/admin/references' },
          ...(current ? [{ label: current.name }] : []),
        ]}
      />
      <PageTitle title="Справочники" subtitle={current ? current.name : 'Выберите справочник для просмотра/редактирования'} />

      {!current && (
        <Section title="Справочники">
          <ul className="space-y-2 text-sm">
            {REFS.map((r) => (
              <li key={r.key}>
                <Link to={`/admin/references/${r.key}`} className="text-brand-primary hover:underline">
                  {r.name}
                </Link>
                <span className="text-xs text-gray-400 ml-2">({r.getData().length} записей)</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {current && (
        <Section title={`${current.name} — ${current.getData().length} записей`}>
          <pre className="text-[11px] font-mono overflow-x-auto bg-gray-50 p-3 rounded-md border border-gray-100 max-h-[70vh] overflow-y-auto">
            {JSON.stringify(current.getData(), null, 2)}
          </pre>
          <div className="text-xs text-gray-500 mt-2">
            В demo редактор — только просмотр. В полной системе — форма CRUD + audit log на каждое изменение.
          </div>
        </Section>
      )}
    </div>
  );
}
