import { Link, useParams } from 'react-router-dom';
import {
  findSKU,
  findProductLine,
  findTechSpecsForSKU,
  findDocsForSKU,
  findPrintingSupportForSKU,
  findMaterialsForSKU,
  data,
} from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { computeDocumentStatus, daysUntilExpiry } from '@/lib/expiryCalc';
import { fmtDate, fmtNumber } from '@/lib/formatters';

export function SKUDetailPage() {
  const { skuId } = useParams<{ skuId: string }>();
  const sku = skuId ? findSKU(skuId) : undefined;

  if (!sku) {
    return (
      <div>
        <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: 'SKU не найден' }]} />
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500">SKU «{skuId}» не найден в каталоге.</div>
      </div>
    );
  }

  const line = findProductLine(sku.product_line_id);
  const techSpecs = findTechSpecsForSKU(sku.id);
  const applicableDocs = findDocsForSKU(sku.id);
  const printingSupport = findPrintingSupportForSKU(sku.id);
  const materials = findMaterialsForSKU(sku.id);
  const claims = data.claims.filter((c) => c.public_allowed).slice(0, 5);

  return (
    <div>
      <Breadcrumbs
        segments={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог', to: '/catalog' },
          { label: sku.variant_name },
        ]}
      />

      <PageTitle
        title={sku.variant_name}
        subtitle={`${line?.name_canonical ?? sku.product_line_id} · ${sku.sub_series ?? ''}`}
        right={
          sku.sku_source === 'purchased' ? (
            <StatusBadge label="Закупка (Китай)" variant="warn" />
          ) : (
            <StatusBadge label="Своё производство" variant="ok" />
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Идентификация">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <dt className="text-gray-500">Артикул</dt>
              <dd className="font-mono">{sku.article_number}</dd>
              <dt className="text-gray-500">EAN-13</dt>
              <dd className="font-mono">{sku.ean_13 ?? '—'}</dd>
              <dt className="text-gray-500">Линия</dt>
              <dd>{line?.name_canonical ?? sku.product_line_id}</dd>
              <dt className="text-gray-500">Серия</dt>
              <dd>{sku.sub_series ?? '—'}</dd>
              <dt className="text-gray-500">Размер</dt>
              <dd>{sku.size_descriptor ?? '—'}</dd>
              <dt className="text-gray-500">Объём</dt>
              <dd>{sku.volume_liters != null ? `${sku.volume_liters} л` : '—'}</dd>
              <dt className="text-gray-500">Грузоподъёмность</dt>
              <dd>{sku.load_capacity_kg != null ? `${sku.load_capacity_kg} кг` : '—'}</dd>
              <dt className="text-gray-500">Тип ручки</dt>
              <dd>{sku.handle_type ?? '—'}</dd>
              <dt className="text-gray-500">Застёжка</dt>
              <dd>{sku.closure_type ?? '—'}</dd>
              <dt className="text-gray-500">Цвет</dt>
              <dd>{sku.color_options ?? '—'}</dd>
              {sku.conflict_flag && (
                <>
                  <dt className="text-gray-500">Конфликт</dt>
                  <dd><StatusBadge label="R01: есть конфликт в данных" variant="warn" /></dd>
                </>
              )}
            </dl>
          </Section>

          <Section title="Технические спецификации (TS01)">
            {techSpecs.length === 0 ? (
              <div className="text-sm text-gray-500">Спецификации не привязаны в Master KB.</div>
            ) : (
              <div className="space-y-3">
                {techSpecs.map((ts) => (
                  <div key={ts.id} className="border-l-2 border-brand-primary pl-3">
                    <div className="text-sm font-medium">{ts.layer_composition_text ?? 'Состав не указан'}</div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs mt-1">
                      {ts.layer_count != null && (<><dt className="text-gray-500">Слоёв</dt><dd>{ts.layer_count}</dd></>)}
                      {ts.mat_meta_thickness_um != null && (<><dt className="text-gray-500">Мет, мкм</dt><dd>{ts.mat_meta_thickness_um}</dd></>)}
                      {ts.vpe_thickness_um != null && (<><dt className="text-gray-500">ВПЭ, мкм</dt><dd>{ts.vpe_thickness_um}</dd></>)}
                      {ts.vpp_thickness_cm != null && (<><dt className="text-gray-500">ВПП, см</dt><dd>{ts.vpp_thickness_cm}</dd></>)}
                      {ts.pvd_thickness_um != null && (<><dt className="text-gray-500">ПВД, мкм</dt><dd>{ts.pvd_thickness_um}</dd></>)}
                      {ts.holding_time_hours != null && (<><dt className="text-gray-500">Время изоляции, ч</dt><dd>{ts.holding_time_hours}</dd></>)}
                      {ts.holding_time_description && (<><dt className="text-gray-500">Описание</dt><dd>{ts.holding_time_description}</dd></>)}
                      {ts.temperature_range && (<><dt className="text-gray-500">Диапазон</dt><dd>{ts.temperature_range}</dd></>)}
                    </dl>
                    {ts.notes && <div className="text-xs text-amber-700 mt-1.5">⚠ {ts.notes}</div>}
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Упаковка">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <dt className="text-gray-500">В коробе</dt>
              <dd>{sku.pack_quantity != null ? `${fmtNumber(sku.pack_quantity)} шт` : '—'}</dd>
              <dt className="text-gray-500">Паллета (европоддон)</dt>
              <dd className="text-xs text-gray-500">4×4=16 коробов H=1470 мм или 4×5=20 коробов H=1850 мм (Условия работы.md:62-65)</dd>
            </dl>
          </Section>

          <Section title="Материалы (состав)">
            {materials.length === 0 ? (
              <div className="text-sm text-gray-500">Материалы не зафиксированы.</div>
            ) : (
              <ul className="space-y-1 text-sm">
                {materials.map((m, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-gray-100 py-1 last:border-0">
                    <span>{m.material.name_ru}</span>
                    <span className="text-xs text-gray-500">{m.function}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="text-[11px] text-gray-400 mt-2">Нормы расхода — M4 (blocked до визита).</div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Применимые документы">
            {applicableDocs.length === 0 ? (
              <div className="text-sm text-gray-500">Документов не привязано.</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {applicableDocs.map((d) => {
                  const status = computeDocumentStatus(d);
                  const days = daysUntilExpiry(d);
                  return (
                    <li key={d.id} className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link to={`/documents/${d.id}`} className="text-brand-primary hover:underline font-medium">
                          {d.title}
                        </Link>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          № {d.number}{d.expiry_date ? ` · до ${fmtDate(d.expiry_date)}` : ''}
                        </div>
                      </div>
                      {status === 'valid' && <StatusBadge label="валиден" variant="ok" />}
                      {status === 'expiring_soon' && <StatusBadge label={`${days}д`} variant="warn" />}
                      {status === 'expired' && <StatusBadge label="просрочен" variant="danger" />}
                      {status === 'in_renewal' && <StatusBadge label="в процессе" variant="info" />}
                      {status === 'not_started' && <StatusBadge label="не начата" variant="blocked" />}
                    </li>
                  );
                })}
              </ul>
            )}
          </Section>

          <Section title="Параметры печати (СТМ)">
            {printingSupport.length === 0 ? (
              <div className="text-sm text-gray-500">Методы печати не настроены для этого SKU.</div>
            ) : (
              <ul className="space-y-3 text-sm">
                {printingSupport.map((p, i) => (
                  <li key={i} className="pb-2 border-b border-gray-100 last:border-0">
                    <div className="font-medium">{p.method?.name}</div>
                    <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                      <div>МОЗ: {fmtNumber(p.moqOverride ?? p.method?.min_order ?? null)} шт</div>
                      <div>Срок: {p.leadTimeOverrideWeeks ?? `${p.method?.lead_time_weeks_min}–${p.method?.lead_time_weeks_max} нед.`}</div>
                      {p.method?.max_colors != null && <div>До {p.method.max_colors} цветов</div>}
                      {p.notes && <div className="text-amber-700 mt-1">⚠ {p.notes}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/print/check-mockup" className="text-xs text-brand-primary hover:underline mt-2 inline-block">
              → Проверить макет (12 правил)
            </Link>
          </Section>

          <Section title="Продающие заявления (claims)">
            <ul className="space-y-1.5 text-xs text-gray-700">
              {claims.map((c) => (
                <li key={c.id} className="pl-2 border-l-2 border-gray-200">{c.text_ru}</li>
              ))}
            </ul>
          </Section>

          <Section title="Связанная информация">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Остатки по SKU: <span className="text-gray-400">откроются в Phase 2 (после интеграции с 1С УНФ)</span></div>
              <div>Производственный прогресс: <span className="text-gray-400">Phase 3 (после визита)</span></div>
              <div>Себестоимость: <span className="text-gray-400">вне scope Phase 1</span></div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
