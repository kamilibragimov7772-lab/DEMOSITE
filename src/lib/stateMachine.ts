import type { OrderState } from '@/types';

export const ORDER_STATES: { code: OrderState; label_ru: string; description: string }[] = [
  { code: 'draft', label_ru: 'Черновик', description: 'Заказ создан, ещё не отправлен в работу.' },
  { code: 'awaiting_payment', label_ru: 'Ждёт оплату', description: 'Блокер 1: без оплаты заказы не идут дальше.' },
  { code: 'awaiting_mockup_approval', label_ru: 'Ждёт подписанный макет', description: 'Блокер 2 (только для СТМ): без подписанного макета не пускается в production.' },
  { code: 'registered_in_1c', label_ru: 'Зарегистрирован в 1С УНФ', description: 'Вкладка «Доставка ТЕРМИ» заполнена, заказ в 1С УНФ.' },
  { code: 'in_production', label_ru: 'В производстве', description: 'Цех принял в работу.' },
  { code: 'ready_to_ship', label_ru: 'Готов к отгрузке', description: 'Партия собрана, ждёт отгрузки.' },
  { code: 'shipped', label_ru: 'Отгружен', description: 'Отправлен ТК, трек-номер выдан клиенту.' },
  { code: 'delivered', label_ru: 'Доставлен', description: 'Получен клиентом.' },
  { code: 'nps_requested', label_ru: 'NPS запрошен', description: 'Собираем обратную связь.' },
  { code: 'closed', label_ru: 'Закрыт', description: 'Заказ завершён.' },
];

const TRANSITIONS: Record<OrderState, OrderState[]> = {
  draft: ['awaiting_payment'],
  awaiting_payment: ['awaiting_mockup_approval', 'registered_in_1c'],
  awaiting_mockup_approval: ['registered_in_1c'],
  registered_in_1c: ['in_production'],
  in_production: ['ready_to_ship'],
  ready_to_ship: ['shipped'],
  shipped: ['delivered'],
  delivered: ['nps_requested'],
  nps_requested: ['closed'],
  closed: [],
};

export function allowedTransitionsFrom(state: OrderState): OrderState[] {
  return TRANSITIONS[state] ?? [];
}

export function canTransition(
  from: OrderState,
  to: OrderState,
  opts: { mockupSigned?: boolean; orderType?: string } = {}
): { allowed: boolean; reason?: string } {
  const candidates = allowedTransitionsFrom(from);
  if (!candidates.includes(to)) {
    return { allowed: false, reason: `Переход ${from} → ${to} не разрешён.` };
  }
  if (to === 'registered_in_1c' && from === 'awaiting_mockup_approval') {
    if (!opts.mockupSigned) {
      return {
        allowed: false,
        reason: 'Блокер: подписанный макет не загружен. Без подписи клиента заказ не ставится в производство (Книга продаж.md:49).',
      };
    }
  }
  return { allowed: true };
}

export function labelForState(code: OrderState): string {
  return ORDER_STATES.find((s) => s.code === code)?.label_ru ?? code;
}
