import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '@/lib/dataLoader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageTitle, Section } from '@/components/common/Section';
import { useAudit } from '@/context/AuditContext';
import { useRole } from '@/context/RoleContext';

export function SampleNewPage() {
  const navigate = useNavigate();
  const { append } = useAudit();
  const { currentUser } = useRole();

  const [form, setForm] = useState({
    customer_id: data.customers[0]?.id ?? '',
    sku_id: 'PV-007',
    quantity: 5,
    recipient_name: '',
    recipient_inn: '',
    recipient_phone: '',
    recipient_address: '',
    payer: 'sender' as 'sender' | 'receiver',
    payer_email: '',
    channel: 'cdek' as 'cdek' | 'russian_post',
    telegram_ref: '',
  });

  const missing = Object.entries({
    customer_id: form.customer_id,
    recipient_name: form.recipient_name,
    recipient_inn: form.recipient_inn,
    recipient_phone: form.recipient_phone,
    recipient_address: form.recipient_address,
    payer_email: form.payer_email,
  })
    .filter(([, v]) => !v || String(v).trim() === '')
    .map(([k]) => k);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missing.length > 0) {
      alert('Заполните обязательные поля: ' + missing.join(', '));
      return;
    }
    const id = `SR-${Math.floor(1000 + Math.random() * 9000)}`;
    append({
      user_id: currentUser.id,
      user_login: currentUser.login,
      action: 'sample_request.create',
      object_type: 'SampleRequest',
      object_id: id,
      diff_before: null,
      diff_after: { state: 'requested', customer_id: form.customer_id, sku_id: form.sku_id, quantity: form.quantity },
    });
    alert(`Заявка ${id} создана (demo). Записано в audit log.\n\nВ реальном процессе:\n— Отправляется сообщение в Telegram-чат «Образцы ОП».\n— При крупном наборе требуется одобрение РОПа.`);
    navigate('/samples');
  };

  return (
    <div>
      <Breadcrumbs segments={[{ label: 'Главная', to: '/' }, { label: 'Образцы', to: '/samples' }, { label: 'Новая заявка' }]} />
      <PageTitle title="Новая заявка на образец" subtitle="Формат — из Telegram-чата «Образцы ОП»" />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4">
        <Section title="Клиент и SKU">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Клиент *">
              <select
                value={form.customer_id}
                onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md"
              >
                {data.customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="SKU *">
              <select
                value={form.sku_id}
                onChange={(e) => setForm({ ...form, sku_id: e.target.value })}
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md"
              >
                {data.skus.slice(0, 30).map((s) => (
                  <option key={s.id} value={s.id}>{s.article_number} · {s.variant_name}</option>
                ))}
              </select>
            </Field>
            <Field label="Количество">
              <input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md"
              />
            </Field>
          </div>
        </Section>

        <Section title="Получатель">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Название получателя *">
              <input type="text" value={form.recipient_name} onChange={(e) => setForm({ ...form, recipient_name: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" />
            </Field>
            <Field label="ИНН *">
              <input type="text" value={form.recipient_inn} onChange={(e) => setForm({ ...form, recipient_inn: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" />
            </Field>
            <Field label="Телефон *">
              <input type="text" value={form.recipient_phone} onChange={(e) => setForm({ ...form, recipient_phone: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" />
            </Field>
            <Field label="Адрес *">
              <input type="text" value={form.recipient_address} onChange={(e) => setForm({ ...form, recipient_address: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" />
            </Field>
          </div>
        </Section>

        <Section title="Доставка и оплата">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Канал">
              <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value as 'cdek' | 'russian_post' })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md">
                <option value="cdek">СДЭК (через чат «Образцы ОП»)</option>
                <option value="russian_post">Почта России (через секретаря)</option>
              </select>
            </Field>
            <Field label="Кто оплачивает">
              <select value={form.payer} onChange={(e) => setForm({ ...form, payer: e.target.value as 'sender' | 'receiver' })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md">
                <option value="sender">Отправитель (Termy)</option>
                <option value="receiver">Получатель (клиент)</option>
              </select>
            </Field>
            <Field label="E-mail плательщика *">
              <input type="email" value={form.payer_email} onChange={(e) => setForm({ ...form, payer_email: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" />
            </Field>
            <Field label="Telegram-ссылка на заявку (опц.)">
              <input type="text" value={form.telegram_ref} onChange={(e) => setForm({ ...form, telegram_ref: e.target.value })} className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md" placeholder="https://t.me/c/..." />
            </Field>
          </div>
        </Section>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm hover:bg-brand-primary/90">
            Создать заявку
          </button>
          {missing.length > 0 && (
            <span className="text-xs text-amber-700">Не заполнены: {missing.join(', ')}</span>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  );
}
