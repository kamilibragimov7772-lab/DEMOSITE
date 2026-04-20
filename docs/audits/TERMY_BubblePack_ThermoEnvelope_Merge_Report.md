# TERMY | БаблПак + Термоконверты Merge Report

## 1. Что было найдено

### БаблПак (p-bubblpak, /products/bubblpak/)
- **Статус KB**: Confirmed
- **SKU**: 13 (10 серебро + 3 чёрный мат)
- **Материал**: ВПП/Мет
- **Данные**: полная таблица размеров, упаковки
- **Фото**: img/bablpak-termy.png
- **CTA**: форма data-form="bp"
- **Упоминания**: home page, products hub, solutions (fermer), branding, footer, FAQ

### Термоконверты (p-termokonverty, /products/termokonverty/)
- **Статус KB**: Provisional
- **SKU**: не зафиксированы
- **Материал**: ВПЭ/Мет, клеевой клапан
- **Данные**: только описание, нет таблиц, нет размеров, нет цен
- **Фото**: нет (SVG placeholder)
- **CTA**: ссылка на /contacts/
- **Упоминания**: home page, products hub, router, navKeys

## 2. Каноничная сущность

- **Canonical ID**: `p-bubblpak`
- **Canonical route**: `/products/bubblpak/`
- **Canonical title**: «БаблПак и термоконверты TERMY»
- **Redirect**: `/products/termokonverty/` → `p-bubblpak` (через router)

## 3. Изменённые файлы

| Файл | Изменения |
|------|-----------|
| `index.html` | Merge обеих сущностей |
| `TERMY_BubblePack_ThermoEnvelope_Merge_Report.md` | Этот отчёт |

## 4. Обновлённые route / references

| Элемент | Было | Стало |
|---------|------|-------|
| Route `/products/termokonverty/` | `'p-termokonverty'` | `'p-bubblpak'` (redirect) |
| navKeys.prod | Содержал `/products/termokonverty/` | Удалён из массива |
| Home page grid | 2 отдельные карточки | Карточка Термоконвертов удалена |
| Products hub grid | 2 отдельные карточки | Карточка Термоконвертов удалена |

## 5. Что объединено

- Заголовок product page: «БаблПак — термоконверты ВПП/Мет» → «БаблПак и термоконверты TERMY»
- Описание: добавлена информация о ВПЭ/Мет термоконвертах
- Pill теги: добавлен «ВПП/Мет + ВПЭ/Мет»
- Новая секция на странице: «Термоконверты ВПЭ/Мет — под заказ» с описанием материала и условий
- CTA: «Запросить прайс на БаблПак» → «Запросить прайс на БаблПак и термоконверты»

## 6. Что удалено как дубль

- `<div class="page" id="p-termokonverty">` — вся standalone page
- Карточка Термоконвертов на home page (grid g4)
- Карточка Термоконвертов на /products/ hub (grid g4)

## 7. Почему merge безопасен

1. **БаблПак** — confirmed, 13 SKU, полные данные → каноничная основа
2. **Термоконверты** — provisional, нет SKU, нет размеров, нет цен → вся полезная информация (материал, клеевой клапан, под заказ) перенесена в секцию на странице БаблПак
3. Route `/products/termokonverty/` сохранён как redirect → нет битых ссылок
4. Термоконверты по сути — тот же продуктовый класс (термоконверты), что и БаблПак, но из другого материала

## 8. Проверка

- [x] Router: `/products/bubblpak/` → `p-bubblpak` ✓
- [x] Router: `/products/termokonverty/` → `p-bubblpak` (redirect) ✓
- [x] Products hub: одна карточка БаблПак, нет дубля Термоконвертов ✓
- [x] Home page: нет дубля Термоконвертов ✓
- [x] Product page: объединённый контент с секцией ВПЭ/Мет ✓
- [x] navKeys: обновлён ✓
- [x] Footer: ссылка на bubblpak сохранена ✓
- [x] No orphan `p-termokonverty` page div ✓
- [x] Другие разделы сайта не изменены ✓
