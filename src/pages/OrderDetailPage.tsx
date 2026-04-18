import { Link, useParams } from 'react-router-dom';
import {
  findOrderById,
  findOrderLinesFor,
  findApprovalForOrder,
  findCustomerById,
  findCarrierById,
  data,
} from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';
import { ORDER_STATES, allowedTransitionsFrom, canTransition, labelForState } from '@/lib/stateMachine';
import { fmtDate } from '@/lib/formatters';

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? findOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div>
        <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Заказы', to: '/orders' }, { label: 'Не найден' }]} />
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500">Заказ «{orderId}» не найден.</div>
      </div>
    );
  }

  const customer = findCustomerById(order.customer_id);
  const lines = findOrderLinesFor(order.id);
  const approval = findApprovalForOrder(order.id);
  const allowed = allowedTransitionsFrom(order.state);
  const delivery = order.delivery;
  const carrier = delivery ? findCarrierById(delivery.carrier_id) : undefined;

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Заказы', to: '/orders' }, { label: order.id }]} />
      <PageTitle
        title={`Заказ ${order.id}`}
        subtitle={`${customer?.name ?? order.customer_id} · ${order.order_type}`}
        right={
          <div className="flex gap-2 items-center">
            <DemoBanner />
            <StatusBadge label={labelForState(order.state)} variant="info" />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title={`Позиции (${lines.length})`}>
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left px-2 py-1 font-medium text-gray-600">SKU</th>
                  <th className="text-left px-2 py-1 font-medium text-gray-600">Название</th>
                  <th className="text-left px-2 py-1 font-medium text-gray-600">Количество</th>
                  <th className="text-left px-2 py-1 font-medium text-gray-600">Примечание</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => {
                  const sku = data.skus.find((s) => s.id === l.sku_id);
                  return (
                    <tr key={l.id} className="border-b border-gray-100">
                      <td className="px-2 py-1 font-mono text-xs">
                        <Link to={`/catalog/${l.sku_id}`} className="text-brand-primary hover:underline">
                          {sku?.article_number ?? l.sku_id}
                        </Link>
                      </td>
                      <td className="px-2 py-1 text-xs">{sku?.variant_name ?? ''}</td>
                      <td className="px-2 py-1 text-xs">{l.quantity} шт</td>
                      <td className="px-2 py-1 text-xs text-gray-500">{l.notes ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Section>

          <Section title="State machine">
            <div className="space-y-2">
              {ORDER_STATES.map((s) => {
                const isCurrent = s.code === order.state;
                return (
                  <div
                    key={s.code}
                    className={`flex items-start gap-3 p-2 rounded-md border ${
                      isCurrent ? 'bg-brand-primary/5 border-brand-primary' : 'border-gray-100'
                    }`}
                  >
                    <div className="text-xs font-mono text-gray-400 w-8 flex-shrink-0">
                      {ORDER_STATES.findIndex((x) => x.code === s.code) + 1}.
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{s.label_ru}</div>
                      <div className="text-xs text-gray-500">{s.description}</div>
                    </div>
                    {isCurrent && <StatusBadge label="текущее" variant="info" />}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-600 mb-2">Доступные переходы:</div>
              {allowed.length === 0 ? (
                <div className="text-xs text-gray-500">Из «{labelForState(order.state)}» дальше не переводят (финальное состояние).</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {allowed.map((to) => {
                    const check = canTransition(order.state, to, {
                      mockupSigned: approval?.sign_status === 'signed',
                      orderType: order.order_type,
                    });
                    return (
                      <button
                        key={to}
                        disabled={!check.allowed}
                        title={check.reason ?? `→ ${labelForState(to)}`}
                        onClick={() => {
                          if (!check.allowed) alert(check.reason);
                          else alert(`В demo смена статуса не сохраняется. Действие помечено для audit log.`);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-md border ${
                          check.allowed
                            ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                            : 'border-red-200 text-red-600 bg-red-50 cursor-not-allowed'
                        }`}
                      >
                        → {labelForState(to)}
                        {!check.allowed && ' 🚫'}
                      </button>
                    );
                  })}
                </div>
              )}
              {approval?.sign_status !== 'signed' && order.state === 'awaiting_mockup_approval' && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800">
                  <strong>Блокер:</strong> подписанный макет не загружен. Без подписи клиента заказ не ставится в производство
                  (см. Книга продаж.md:49).
                </div>
              )}
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Вкладка «Доставка ТЕРМИ»">
            {delivery ? (
              <dl className="grid grid-cols-1 gap-y-2 text-xs">
                <div><dt className="text-gray-500">Заказчик</dt><dd>{delivery.recipient_name}</dd></div>
                <div><dt className="text-gray-500">ИНН / КПП</dt><dd className="font-mono">{delivery.recipient_inn} {delivery.recipient_kpp ? `/ ${delivery.recipient_kpp}` : ''}</dd></div>
                <div><dt className="text-gray-500">Телефон</dt><dd>{delivery.recipient_phone}</dd></div>
                <div><dt className="text-gray-500">ТК</dt><dd>{carrier?.name ?? delivery.carrier_id}</dd></div>
                <div><dt className="text-gray-500">Адрес</dt><dd>{delivery.address}</dd></div>
                <div><dt className="text-gray-500">Часы приёма</dt><dd>{delivery.reception_hours ?? '—'}</dd></div>
                <div><dt className="text-gray-500">Плательщик</dt><dd>{delivery.delivery_payer === 'sender' ? 'Отправитель' : 'Получатель'}</dd></div>
                <div><dt className="text-gray-500">Требования к паллете</dt><dd>{delivery.pallet_requirements ?? '—'}</dd></div>
                <div><dt className="text-gray-500">Требования к документам</dt><dd>{delivery.document_requirements ?? '—'}</dd></div>
                <div><dt className="text-gray-500">Пропуска</dt><dd>{delivery.pass_requirements ?? '—'}</dd></div>
              </dl>
            ) : (
              <div className="text-sm text-gray-500">Вкладка «Доставка ТЕРМИ» ещё не заполнена.</div>
            )}
          </Section>

          <Section title="Подписанный макет">
            {approval ? (
              <div className="text-sm">
                <div className="mb-2">
                  {approval.sign_status === 'signed' && <StatusBadge label="✓ подписан" variant="ok" />}
                  {approval.sign_status === 'not_requested' && <StatusBadge label="не запрошен" variant="warn" />}
                  {approval.sign_status === 'requested' && <StatusBadge label="ждёт подписи" variant="info" />}
                  {approval.sign_status === 'rejected' && <StatusBadge label="отклонён" variant="danger" />}
                </div>
                {approval.signed_at && <div className="text-xs text-gray-500">Подписан: {fmtDate(approval.signed_at)}</div>}
                {approval.scan_path && <div className="text-xs text-gray-500 mt-1">Скан: <span className="font-mono">{approval.scan_path}</span></div>}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Макет не требуется (серийный заказ).</div>
            )}
          </Section>

          <Section title="Интеграции">
            <div className="text-xs space-y-2">
              <div>
                <div className="text-gray-500">1С УНФ (external_ref_1c)</div>
                <div className="font-mono text-gray-400">{order.external_ref_1c ?? '— (Phase 2)'}</div>
              </div>
              <div>
                <div className="text-gray-500">Telegram «Заказы ОП»</div>
                <div className="font-mono text-gray-600 break-all">{order.telegram_ref ?? '—'}</div>
              </div>
            </div>
          </Section>

          <Section title="Метаданные">
            <dl className="text-xs space-y-1">
              <div><dt className="text-gray-500">Создан</dt><dd>{fmtDate(order.created_at)}</dd></div>
              <div><dt className="text-gray-500">Плановая отгрузка</dt><dd>{fmtDate(order.planned_shipment_date)}</dd></div>
              <div><dt className="text-gray-500">Ответственный РОП</dt><dd>{order.rop_responsible_id ?? '—'}</dd></div>
              <div><dt className="text-gray-500">Ответственный менеджер</dt><dd>{order.manager_responsible_id ?? '—'}</dd></div>
            </dl>
          </Section>
        </div>
      </div>
    </div>
  );
}
