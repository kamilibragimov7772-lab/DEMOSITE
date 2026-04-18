import { Link } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { fmtNumber } from '@/lib/formatters';

export function PrintMethodsPage() {
  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Печать · справочник' }]} />
      <PageTitle
        title="Методы печати"
        subtitle={`${data.printingMethods.length} метода · ${data.printConstraints.length} правил · ${data.colorPalette.length} пантонов`}
        right={<Link to="/print/check-mockup" className="text-sm text-brand-primary hover:underline">→ Валидатор макета</Link>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.printingMethods.map((m) => (
          <Section key={m.id} title={m.name}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <dt className="text-gray-500">Поверхность</dt>
              <dd>{m.surface_types?.join(', ') ?? '—'}</dd>
              <dt className="text-gray-500">Макс. цветов</dt>
              <dd>{m.max_colors ?? '—'}</dd>
              <dt className="text-gray-500">МОЗ</dt>
              <dd>{fmtNumber(m.min_order ?? null)} шт{m.optimal_order ? ` (опт. от ${fmtNumber(m.optimal_order)})` : ''}</dd>
              <dt className="text-gray-500">Срок</dt>
              <dd>{m.lead_time_weeks_min}–{m.lead_time_weeks_max} недель</dd>
              <dt className="text-gray-500">Градиенты</dt>
              <dd>{m.gradient_allowed ? '✓ возможны' : '✗ невозможны'}</dd>
              <dt className="text-gray-500">Печать в край</dt>
              <dd>{m.edge_printing_allowed ? '✓ возможна' : '✗ невозможна'}</dd>
              {m.default_print_area && (
                <>
                  <dt className="text-gray-500">Поле печати</dt>
                  <dd>{m.default_print_area}</dd>
                </>
              )}
              <dt className="text-gray-500">Подрядчик</dt>
              <dd>{m.contractor ?? '—'}</dd>
            </dl>
            {m.stability_note && (
              <div className="text-xs text-amber-700 mt-3 border-t border-gray-100 pt-2">⚠ {m.stability_note}</div>
            )}
          </Section>
        ))}
      </div>

      <Section title={`Ограничения печати (${data.printConstraints.length})`}>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 sticky top-0 bg-white">
              <tr>
                <th className="text-left px-2 py-1.5 font-medium text-gray-600">Параметр</th>
                <th className="text-left px-2 py-1.5 font-medium text-gray-600">Значение</th>
                <th className="text-left px-2 py-1.5 font-medium text-gray-600">Метод</th>
                <th className="text-left px-2 py-1.5 font-medium text-gray-600">Тип</th>
              </tr>
            </thead>
            <tbody>
              {data.printConstraints.map((c) => (
                <tr key={c.id} className="border-b border-gray-100">
                  <td className="px-2 py-1.5">{c.parameter}</td>
                  <td className="px-2 py-1.5 text-gray-700">{c.value}</td>
                  <td className="px-2 py-1.5 text-xs text-gray-500">{c.applies_to_method_id ?? '—'}</td>
                  <td className="px-2 py-1.5">
                    <StatusBadge
                      label={c.rule_type ?? 'mandatory'}
                      variant={c.rule_type === 'warning' ? 'warn' : c.rule_type === 'recommended' ? 'info' : 'neutral'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Цветовая палитра (${data.colorPalette.length})`}>
        <div className="flex flex-wrap gap-2">
          {data.colorPalette.map((c) => (
            <div key={c.id} className="px-3 py-1.5 border border-gray-200 rounded-md text-xs">
              <div className="font-mono text-gray-500">{c.pantone_code}</div>
              <div>{c.name_ru}</div>
              {c.cmyk_code && <div className="text-[10px] text-gray-400">CMYK: {c.cmyk_code}</div>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
