import { Link, useParams } from 'react-router-dom';
import { findSampleById, data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DemoBanner } from '@/components/common/DemoBanner';
import { fmtDateTime } from '@/lib/formatters';

export function SampleDetailPage() {
  const { sampleId } = useParams<{ sampleId: string }>();
  const sample = sampleId ? findSampleById(sampleId) : undefined;

  if (!sample) {
    return (
      <div>
        <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Образцы', to: '/samples' }, { label: 'Не найдена' }]} />
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center text-gray-500">Заявка «{sampleId}» не найдена.</div>
      </div>
    );
  }

  const customer = data.customers.find((c) => c.id === sample.customer_id);

  return (
    <div>
      <Breadcrumbs
        segments={[
          { label: 'Главная', to: '/' },
          { label: 'Образцы', to: '/samples' },
          { label: sample.id },
        ]}
      />
      <PageTitle
        title={`Заявка ${sample.id}`}
        subtitle={customer?.name ?? sample.customer_id}
        right={
          <div className="flex gap-2 items-center">
            <DemoBanner />
            <StatusBadge label={sample.state} variant={sample.state === 'sent' || sample.state === 'delivered' || sample.state === 'converted_to_deal' ? 'ok' : sample.state === 'approved_by_rop' ? 'warn' : 'info'} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Позиции">
          <ul className="text-sm space-y-1">
            {sample.requested_items.map((i, idx) => {
              const sku = data.skus.find((s) => s.id === i.sku_id);
              return (
                <li key={idx} className="flex items-center justify-between border-b border-gray-100 py-1">
                  <Link to={`/catalog/${i.sku_id}`} className="text-brand-primary hover:underline">
                    {sku?.article_number ?? i.sku_id} · {sku?.variant_name}
                  </Link>
                  <span className="text-xs">× {i.quantity}</span>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section title="Получатель и доставка">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-gray-500">Получатель</dt>
            <dd>{sample.recipient_name}</dd>
            <dt className="text-gray-500">ИНН</dt>
            <dd className="font-mono">{sample.recipient_inn}</dd>
            <dt className="text-gray-500">Телефон</dt>
            <dd>{sample.recipient_phone}</dd>
            <dt className="text-gray-500">Адрес</dt>
            <dd>{sample.recipient_address}</dd>
            <dt className="text-gray-500">Канал</dt>
            <dd>{sample.channel === 'cdek' ? 'СДЭК' : 'Почта России'}</dd>
            <dt className="text-gray-500">Трек</dt>
            <dd className="font-mono text-xs">{sample.tracking_number ?? '—'}</dd>
            <dt className="text-gray-500">Оплата</dt>
            <dd>{sample.payer === 'sender' ? 'Отправитель (Termy)' : 'Получатель'}</dd>
            <dt className="text-gray-500">E-mail плательщика</dt>
            <dd>{sample.payer_email}</dd>
          </dl>
        </Section>

        <Section title="Согласование">
          <div className="text-sm">
            {sample.approved_by_rop ? (
              <div className="text-green-700">✓ Одобрено РОПом</div>
            ) : (
              <div className="text-amber-700">⚠ Ожидает одобрения РОПом (для крупных наборов)</div>
            )}
            {sample.sent_at && (
              <div className="text-xs text-gray-500 mt-2">Отправлено: {fmtDateTime(sample.sent_at)}</div>
            )}
            <div className="text-xs text-gray-500 mt-1">Создана: {fmtDateTime(sample.created_at)}</div>
            {sample.telegram_ref && (
              <div className="text-xs text-gray-500 mt-1">
                Telegram: <span className="font-mono">{sample.telegram_ref}</span>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
