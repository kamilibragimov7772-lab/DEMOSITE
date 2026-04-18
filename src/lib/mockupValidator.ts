import type { MockupRule, MockupValidationResult } from '@/types';

export const MOCKUP_RULES: MockupRule[] = [
  { id: 'format_pdf', label_ru: 'Формат файла — PDF (вектор)', check: 'auto', description: 'Принимается только PDF. Растровые / Word — не подходят.' },
  { id: 'size_matches_print', label_ru: 'Размер совпадает с печатным', check: 'manual', description: 'Макет в реальном размере печати (30×30 см макс.).' },
  { id: 'text_in_curves', label_ru: 'Все тексты — в кривых', check: 'manual', description: 'Тексты не должны быть шрифтами; все — в кривых (или шрифты приложены).' },
  { id: 'color_cmyk', label_ru: 'Цветовая модель — CMYK', check: 'manual', description: 'Без RGB и SPOT COLOR.' },
  { id: 'pantones_solid_coated', label_ru: 'Пантоны — solid coated', check: 'manual', description: 'Единственная допустимая раскладка.' },
  { id: 'no_rgb_spot', label_ru: 'Нет объектов в RGB или SPOT COLOR', check: 'manual', description: 'Если есть — вернёт ошибки при печати.' },
  { id: 'no_self_intersect', label_ru: 'Нет самопересечений переведённых шрифтов', check: 'manual', description: 'Область самопересечения становится прозрачной.' },
  { id: 'black_overprint', label_ru: 'Чёрный цвет — Overprint, остальные — вывороткой', check: 'manual', description: 'Правило препресса Termy.' },
  { id: 'min_text_size', label_ru: 'Минимальный кегль соблюдён', check: 'manual', description: 'Рубленая 10 pt / выворотка 12 pt; засечки 12/14 pt; художественные 12–13/14–15 pt.' },
  { id: 'min_line_width', label_ru: 'Минимальная толщина линии соблюдена', check: 'manual', description: 'Тёмный 0,5 мм / выворотка 1,5 мм.' },
  { id: 'no_system_fonts', label_ru: 'Не используются системные шрифты', check: 'manual', description: 'Arial, Times New Roman, Courier — запрещены без уведомления.' },
  { id: 'max_curve_nodes', label_ru: 'Число узлов в кривой ≤ 1024', check: 'manual', description: 'Препрес-технолог «Партнёр-Медиа» проверяет.' },
];

export async function validateMockup(file: File): Promise<MockupValidationResult[]> {
  const results: MockupValidationResult[] = [];

  // Rule: format_pdf — auto
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  results.push({ rule_id: 'format_pdf', passed: isPdf, note: isPdf ? 'PDF обнаружен' : `Тип файла: ${file.type || 'unknown'}` });

  // Остальные 11 правил — помечены manual (null), ожидают ручной отметки оператора.
  for (const rule of MOCKUP_RULES) {
    if (rule.id === 'format_pdf') continue;
    results.push({ rule_id: rule.id, passed: null, note: 'Требует ручной проверки' });
  }

  return results;
}
