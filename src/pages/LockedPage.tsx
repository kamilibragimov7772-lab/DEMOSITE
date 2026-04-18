import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle } from '@/components/common/Section';

export function LockedPage({
  title,
  phase,
  requirements,
  reference,
}: {
  title: string;
  phase: 'Phase 2' | 'Phase 3' | 'Roadmap v2';
  requirements: string[];
  reference: string;
}) {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: title }]} />
      <PageTitle title={title} subtitle={`🔒 Модуль будет доступен в ${phase}`} />
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-10 phase-locked">
        <div className="max-w-2xl">
          <div className="text-5xl mb-4">🔒</div>
          <p className="text-base text-gray-800 mb-4">
            Этот модуль <strong>ещё не готов</strong>. В демо показан намеренно пустым — чтобы было видно полный scope будущей системы, а не только то, что собрано.
          </p>
          <p className="text-sm text-gray-600 mb-3">Чтобы его открыть, нужны:</p>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            {requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-5">
            Пакет запросов: <span className="kbd">{reference}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
