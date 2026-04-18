import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';

export function AdminRolesPage() {
  const confirmed = data.roles.filter((r) => !r.pending_validation);
  const inferred = data.roles.filter((r) => r.pending_validation);

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Admin · Роли' }]} />
      <PageTitle title="Роли и права" subtitle={`${confirmed.length} подтверждённых · ${inferred.length} inferred (pending validation)`} />

      <Section title={`Подтверждённые роли (${confirmed.length})`}>
        <div className="space-y-2">
          {confirmed.map((r) => (
            <div key={r.id} className="flex items-start justify-between border-b border-gray-100 py-2 last:border-0">
              <div>
                <div className="text-sm font-medium">{r.name_ru}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.description}</div>
              </div>
              <StatusBadge label="confirmed" variant="ok" />
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Inferred роли — требуют валидации (${inferred.length})`}>
        <div className="text-xs text-amber-700 mb-3 p-2 bg-amber-50 rounded-md border border-amber-200">
          ⚠ Эти роли <strong>не имеют прав</strong> к объектам M5/M6/M7 в Phase 1. Валидация — на визите в Люберцы
          (см. TERMY_04A_One_Day_Visit_Runbook.md, блок B3).
        </div>
        <div className="space-y-2">
          {inferred.map((r) => (
            <div key={r.id} className="flex items-start justify-between border-b border-gray-100 py-2 last:border-0">
              <div>
                <div className="text-sm font-medium">{r.name_ru}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.description}</div>
              </div>
              <StatusBadge label="pending validation" variant="warn" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
