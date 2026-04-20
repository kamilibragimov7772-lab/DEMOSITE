# TERMY | Universal Product Card System — Technical Specification

Version: 1.0  
Date: 2026-04-12  
Status: Architecture phase — pre-build  
Author: Obzharka Consulting × Claude  
Scope: site architecture + Figma design system

---

## 1. Назначение системы

TERMY производит 7 категорий термоупаковки, 43+ SKU, 3 температурных режима, 6 серий термопакетов, 4 объёма аккумуляторов. Продуктовая линейка будет расти.

**Почему нельзя делать уникальную вёрстку под каждый товар:**

- При 43+ SKU уникальная вёрстка создаёт неуправляемый объём кода и дизайн-долга.
- Добавление нового продукта требует полного цикла дизайн → вёрстка → тест вместо заполнения карточки по шаблону.
- Визуальная разрозненность размывает бренд — пользователь не узнаёт систему.
- Невозможно масштабировать контент-операции: каждый продукт — отдельный проект.
- Knowledge base становится бесполезной, если UI не умеет её отображать единообразно.

**Что решает универсальная система:**

- Единый шаблон preview card + detail page, работающий для любого продукта.
- Добавление нового SKU = заполнение data-полей, без изменения кода.
- Визуальная консистентность всей линейки.
- Figma-компоненты с вариантами, а не дублирование макетов.
- Контент из KB маппится в UI автоматически по единой схеме.

---

## 2. Архитектура пользовательского пути

### User flow: основной сценарий

```
[Главная] → [Продуктовая линейка (hub)] → [Preview card grid] → [Detail page]
                                                                       ↓
                                                              [CTA / Запрос прайса]
                                                              [Related products]
                                                              [Совместимые решения]
```

### Полный user flow

| Шаг | Действие | Интерфейс |
|-----|----------|-----------|
| 1 | Вход в раздел «Продукция» | Hub page — верхнеуровневый каталог |
| 2 | Просмотр всех продуктов | Grid preview cards — все категории |
| 3 | Фильтрация / группировка | По категории, по температурному режиму, по задаче |
| 4 | Клик на preview card | Переход на detail page продукта |
| 5 | Изучение detail page | Скролл по секциям: hero → specs → sizes → branding → CTA |
| 6 | CTA | «Запросить прайс» / «Получить расчёт» / WhatsApp |
| 7 | Related products | Блок совместимых продуктов внизу detail page |
| 8 | Возврат | Breadcrumb: Продукция → Категория → Продукт |
| 9 | Cross-navigation | Из detail page — в related product, в отраслевое решение, в кейс |

### CTA-сценарии

| Контекст | CTA |
|----------|-----|
| Preview card | «Подробнее» → detail page |
| Detail page — верх | «Запросить прайс» |
| Detail page — низ | «Получить расчёт» / «Обсудить заказ» |
| Detail page — branding | «Узнать про брендирование» |
| Related products | «Смотреть» → переход на detail page |
| Конфигуратор (SHOCK) | «Получить расчёт» + WhatsApp |

---

## 3. Архитектура раздела Product Line

### Hub page: структура

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                             │
├─────────────────────────────────────────────┤
│ HERO — «Продукция TERMY»                   │
│ Breadcrumb: Главная → Продукция             │
│ Подзаголовок: количество категорий + SKU    │
├─────────────────────────────────────────────┤
│ FILTER BAR                                  │
│ [Все] [Термопакеты] [SHOCK®] [LinerBox®]   │
│ [Термошопперы] [БаблПак] [Термокружки]      │
├─────────────────────────────────────────────┤
│ PRODUCT GRID                                │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │card │ │card │ │card │ │card │            │
│ └─────┘ └─────┘ └─────┘ └─────┘            │
│ ┌─────┐ ┌─────┐ ┌─────┐                    │
│ │card │ │card │ │card │                    │
│ └─────┘ └─────┘ └─────┘                    │
├─────────────────────────────────────────────┤
│ ECOSYSTEM BANNER                            │
│ «Как продукты TERMY работают вместе»        │
├─────────────────────────────────────────────┤
│ CTA — «Не знаете что выбрать?»              │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
└─────────────────────────────────────────────┘
```

### Блоки hub page

| # | Блок | Обязательность | Назначение |
|---|------|---------------|------------|
| 1 | Hero + breadcrumb | обязательный | Позиционирование раздела |
| 2 | Filter bar | обязательный | Навигация по категориям |
| 3 | Product grid | обязательный | Основной контент — preview cards |
| 4 | Ecosystem banner | опциональный | Показать связь между продуктами |
| 5 | CTA fallback | обязательный | Для пользователей, которые не выбрали |
| 6 | Header + Footer | обязательный | Глобальные компоненты |

### Режимы отображения product grid

| Режим | Описание | Когда |
|-------|----------|-------|
| Все продукты | Полный grid без фильтра | По умолчанию |
| По категории | Grid отфильтрован по одной категории | Клик на tab фильтра |
| По температуре | Grid отфильтрован по температурному режиму | Будущая итерация |

### Масштабирование hub page

- Новая категория → новый tab в filter bar + новые preview cards в grid.
- Новый SKU внутри категории → на hub page ничего не меняется (SKU живут внутри detail page).
- Grid строится автоматически из массива продуктов — не из ручной вёрстки.

---

## 4. Универсальная модель product card

### Два уровня карточки

```
PRODUCT CARD SYSTEM
├── Level 1: Preview Card (в hub page grid)
│   └── Компактная карточка — клик → detail page
│
└── Level 2: Detail Page (отдельная страница)
    ├── Core sections (обязательные)
    ├── Conditional sections (зависят от типа продукта)
    ├── Optional sections (если данные есть в KB)
    └── Related / cross-sell (связи с экосистемой)
```

### Связь между уровнями

- Preview card содержит **подмножество** данных detail page.
- Detail page — **полное представление** одного продукта.
- Данные для обоих уровней берутся из одного источника (KB / product data).
- Preview card — это не отдельная сущность, а **проекция** detail page.

---

## 5. Универсальная структура Preview Card

### Макет preview card

```
┌──────────────────────────┐
│                          │
│      [Product Image]     │
│                          │
│  ┌──────────────────┐    │
│  │ Category badge    │    │
│  └──────────────────┘    │
├──────────────────────────┤
│ Product Name             │
│                          │
│ Краткое описание         │
│ (1-2 строки)             │
│                          │
│ ┌────┐ ┌────┐ ┌────┐    │
│ │spec│ │spec│ │spec│    │
│ └────┘ └────┘ └────┘    │
│                          │
│ Цена или «Запросить»     │
│                          │
│ [     Подробнее     ]    │
└──────────────────────────┘
```

### Поля preview card

| Поле | Тип | Обязательность | Источник |
|------|-----|---------------|----------|
| product_image | image | обязательное | assets/products/ |
| category_badge | string | обязательное | product.category |
| product_name | string | обязательное | product.name |
| short_description | string | обязательное | product.short_desc (max 80 символов) |
| key_specs | array[1-3] | обязательное | product.specs[].preview_value |
| temperature_badge | component | условное | product.temp_regime (только для SHOCK, термопакетов) |
| series_count | string | условное | product.series_count (если > 1 серия/SKU) |
| price_display | string | обязательное | product.price_from или «Запросить цену» |
| status_badge | string | опциональное | product.status (новинка, хит, скоро) |
| cta_link | url | обязательное | /products/{category}/{slug}/ |

### Правила preview card

- Максимум 3 key specs. Если у продукта больше — выбирать 3 самых значимых.
- Temperature badge отображается только если product.temp_regime !== null.
- Price: если есть публичная цена — показывать «от X ₽/шт». Если нет — «Запросить цену».
- Изображение: aspect ratio 4:3, фон прозрачный или брендовый.

---

## 6. Универсальная структура Detail Page

### Полная секционная архитектура

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                             │
├─────────────────────────────────────────────┤
│ BREADCRUMB                                  │
│ Продукция → Категория → Продукт             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-01: HERO / PRODUCT INTRO                │
│ Название + краткое позиционирование         │
│ + ключевой визуал                           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-02: TEMPERATURE PARAMETERS              │
│ Температурный режим / диапазон              │
│ Цветовые маркеры, если применимо            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-03: SPECIFICATIONS                      │
│ Таблица характеристик: размеры, масса,      │
│ объём, материалы, конструкция               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-04: SIZES / FORMATS / VARIANTS          │
│ Линейка размеров, объёмов, серий            │
│ Tabs или grid вариантов                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-05: CUSTOMIZATION / BRANDING            │
│ Методы брендирования, MOZ, сроки            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-06: USE CASES / SCENARIOS               │
│ Применение по отраслям / задачам            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-07: ADVANTAGES                          │
│ Ключевые преимущества продукта              │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-08: LIMITATIONS / DISCLAIMERS           │
│ Ограничения, условия хранения, оговорки     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-09: COMPATIBILITY / ECOSYSTEM           │
│ Совместимые продукты TERMY                  │
│ Рекомендуемые комплектации                  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-10: DOCUMENTS / CERTIFICATIONS          │
│ ГОСТ, ТУ, сертификаты, PDF                  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-11: CTA BLOCK                           │
│ «Запросить прайс» / форма / WhatsApp        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ SEC-12: RELATED PRODUCTS                    │
│ Cross-sell / ecosystem mapping              │
│ Preview cards совместимых продуктов          │
│                                             │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
└─────────────────────────────────────────────┘
```

### Детализация каждой секции

#### SEC-01: Hero / Product Intro

| Элемент | Описание |
|---------|----------|
| product_name | h1, полное название продукта |
| positioning | 1-2 предложения — что это и для чего |
| hero_image | Ключевой визуал продукта, крупный |
| category_badge | Бейдж категории |
| key_metrics | 2-4 метрики-пилюли (цена, защита, MOZ, серии) |

#### SEC-02: Temperature Parameters

| Элемент | Описание |
|---------|----------|
| temp_range | Диапазон температур, если применимо |
| temp_regime_badges | Цветовые маркеры (голубой/зелёный/фиолетовый) |
| protection_duration | Время сохранения температуры |
| filler_type | Тип наполнителя (для SHOCK) |

**Условие:** отображается только если product.has_temperature_data === true.

#### SEC-03: Specifications

| Элемент | Описание |
|---------|----------|
| spec_table | Таблица: параметр → значение |
| construction | Описание конструкции / слоёв |
| materials | Состав материалов |
| regulatory_doc | Номер ТУ / ГОСТ |

**Формат таблицы:**

| Параметр | Значение |
|----------|----------|
| Размеры | 180 × 150 × 20 мм |
| Объём | 300 мл |
| Масса | 340 г |
| Материал | Пищевой пластик |
| Документ | ГОСТ Р 50962-96 |

#### SEC-04: Sizes / Formats / Variants

| Элемент | Описание |
|---------|----------|
| variant_grid | Grid или tabs вариантов (размеры, объёмы, серии) |
| variant_card | Карточка варианта: размер + цена + specs |
| comparison_hint | Подсказка «Сравнить серии» если > 1 серия |

#### SEC-05: Customization / Branding

| Элемент | Описание |
|---------|----------|
| branding_methods | Список методов: шелкография, флексография, стикер, тиснение |
| moz_per_method | MOZ для каждого метода |
| timeline | Сроки изготовления |
| design_note | «Бесплатная проверка макета дизайнером TERMY» |

**Условие:** отображается только если product.has_branding === true.

#### SEC-06: Use Cases / Scenarios

| Элемент | Описание |
|---------|----------|
| use_case_cards | 2-4 карточки сценариев: отрасль + задача + какой продукт решает |
| solution_links | Ссылки на страницы отраслевых решений |

#### SEC-07: Advantages

| Элемент | Описание |
|---------|----------|
| advantage_list | 3-5 пунктов: иконка + заголовок + описание |

#### SEC-08: Limitations / Disclaimers

| Элемент | Описание |
|---------|----------|
| limitation_list | Условия хранения, ограничения по использованию |
| disclaimer | Юридические оговорки, если есть |

**Условие:** отображается только если product.limitations !== null.

#### SEC-09: Compatibility / Ecosystem

| Элемент | Описание |
|---------|----------|
| compatible_products | Preview cards совместимых продуктов |
| recommended_combo | Рекомендуемая комплектация (пакет + аккумулятор + короб) |
| selection_hint | «Как подобрать комплектацию» — ссылка или inline-гайд |

#### SEC-10: Documents / Certifications

| Элемент | Описание |
|---------|----------|
| cert_list | Список сертификатов: название + номер + срок |
| pdf_links | Ссылки на PDF для скачивания |
| safety_data | Данные по безопасности (миграция ПВХ и т.д.) |

**Условие:** отображается только если product.documents.length > 0.

#### SEC-11: CTA Block

| Элемент | Описание |
|---------|----------|
| cta_heading | «Запросить прайс на {product_name}» |
| form | Имя + Телефон + Email + Комментарий |
| whatsapp_link | Deep-link в WhatsApp с предзаполненным текстом |
| phone | Прямой телефон |

#### SEC-12: Related Products

| Элемент | Описание |
|---------|----------|
| related_cards | 2-4 preview cards из той же или смежной категории |
| ecosystem_link | Ссылка на hub page «Все продукты» |

---

## 7. Принцип универсальности

### Матрица обязательности секций

| Секция | Термопакеты | SHOCK® | LinerBox® | Термошопперы | БаблПак | Термокружки |
|--------|-------------|--------|-----------|-------------|---------|------------|
| SEC-01 Hero | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SEC-02 Temperature | ✅ | ✅ | ✅ | ⚪ | ⚪ | ⚪ |
| SEC-03 Specs | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SEC-04 Variants | ✅ | ✅ | ✅ | ⚪ | ✅ | ✅ |
| SEC-05 Branding | ✅ | ✅ | ✅ | ⚪ | ⚪ | ⚪ |
| SEC-06 Use Cases | ✅ | ✅ | ✅ | ✅ | ⚪ | ⚪ |
| SEC-07 Advantages | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SEC-08 Limitations | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ |
| SEC-09 Ecosystem | ✅ | ✅ | ✅ | ✅ | ⚪ | ⚪ |
| SEC-10 Documents | ⚪ | ✅ | ⚪ | ⚪ | ⚪ | ⚪ |
| SEC-11 CTA | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SEC-12 Related | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Легенда:**  
✅ — обязательно для этого типа продукта  
⚪ — опционально (отображается если данные есть в KB)

### Категории секций

| Категория | Секции | Правило |
|-----------|--------|---------|
| Обязательные для всех | SEC-01, SEC-03, SEC-07, SEC-11, SEC-12 | Всегда рендерятся |
| Условно-обязательные | SEC-02, SEC-04, SEC-05, SEC-06, SEC-09 | Рендерятся если product.has_{feature} === true |
| Опциональные | SEC-08, SEC-10 | Рендерятся только если данные есть |

---

## 8. Масштабирование системы

### Сценарии роста

| Сценарий | Что менять | Что НЕ менять |
|----------|-----------|---------------|
| Новая категория (например «Термобоксы для авиа») | + tab в filter bar, + preview cards, + detail page template | Hub page layout, card structure, section system |
| Новый SKU в существующей категории (SHOCK 1500 мл) | + данные в product data, + variant card в SEC-04 | Detail page структура, preview card |
| Новый температурный режим (например +15…+25°C) | + цветовой маркер в design tokens, + badge variant | Temperature system logic, UI structure |
| Продукт с минимальными данными | Секции с пустыми данными скрываются автоматически | Card structure — degradation graceful |
| Продуктовая ветка (серия внутри категории) | + variant tabs в SEC-04 | Hub page, preview card |

### Правило деградации

Если для продукта нет данных по секции — секция **не отображается**, а не показывает пустой placeholder. Страница адаптируется к полноте данных.

### Правило расширения

Новый тип секции (например «Видео-демонстрация») добавляется в систему как новый optional module. Существующие detail pages не ломаются — новая секция появляется только у продуктов, у которых есть соответствующие данные.

---

## 9. Site structure

### Роутинг

```
/products/                              → Hub page (все продукты)
/products/termopackety/                 → Detail page: Термопакеты
/products/akkumulyatory-holoda/         → Detail page: SHOCK®
/products/akkumulyatory-holoda/configurator/ → Конфигуратор SHOCK
/products/termokoroba/                  → Detail page: LinerBox®
/products/termoshoppery/                → Detail page: Термошопперы
/products/bubblpak/                     → Detail page: БаблПак
/products/termokruzhki/                 → Detail page: Термокружки
/products/termokruzhki/600-ml/          → Variant page: Термокружка 600мл
/products/termokruzhki/900-ml/          → Variant page: Термокружка 900мл
```

### Навигация

| Элемент | Расположение | Назначение |
|---------|-------------|------------|
| Breadcrumb | Верх detail page | Продукция → Категория → Продукт |
| Filter bar | Hub page | Фильтрация по категории |
| Related products | Низ detail page | Cross-navigation между продуктами |
| Ecosystem banner | Hub page | Объяснение связей между продуктами |
| Back to catalog | Detail page | Кнопка возврата к hub page |

### Связи с другими разделами сайта

| Откуда | Куда | Тип связи |
|--------|------|-----------|
| Detail page SEC-06 | /solutions/{segment}/ | Use case → решение для отрасли |
| Detail page SEC-09 | /products/{related}/ | Совместимый продукт |
| Detail page SEC-05 | /branding/ | Брендирование продукта |
| /solutions/{segment}/ | Detail page | «Релевантные продукты» → preview cards |
| /cases/ | Detail page | Кейс ссылается на продукт |
| Главная → каталог | Hub page | Preview cards → hub или detail |

---

## 10. Figma structure

### Page structure (Figma pages)

```
TERMY — Product Card System
├── 00. Cover
├── 01. Design Tokens
├── 02. Components — Atoms
├── 03. Components — Preview Card
├── 04. Components — Detail Page Sections
├── 05. Templates — Hub Page
├── 06. Templates — Detail Page
├── 07. Product Instances (заполненные карточки)
└── 08. Responsive Variants
```

### 01. Design Tokens

| Token group | Tokens |
|-------------|--------|
| Colors / Brand | --brand-purple, --brand-dark, --brand-light, --surface, --text |
| Colors / Temperature | --temp-cool (#3B82F6), --temp-freeze (#22C55E), --temp-gel (#A855F7) |
| Colors / Card surfaces | --card-bg, --card-border, --card-hover, --card-shadow |
| Typography | --heading-xl, --heading-lg, --heading-md, --body, --caption, --badge |
| Spacing | --space-xs (4), --space-sm (8), --space-md (16), --space-lg (24), --space-xl (32), --space-2xl (48) |
| Radius | --radius-sm (8), --radius-md (12), --radius-lg (16) |
| Shadows | --shadow-card, --shadow-card-hover |

### 02. Components — Atoms

| Component | Variants | Properties |
|-----------|----------|------------|
| Temperature Badge | cool / freeze / gel | label, color |
| Category Badge | 7 categories | label, color |
| Status Badge | new / hit / soon / none | label, color |
| Spec Pill | default / highlighted | icon, label, value |
| Price Display | from_price / request | value, currency |
| CTA Button | primary / secondary / ghost | label, size, icon |
| Product Image | placeholder / filled | src, aspect_ratio (4:3) |
| Section Heading | h2 / h3 | text, subtitle |
| Breadcrumb | 2-level / 3-level | items[] |
| Filter Tab | active / inactive | label, count |

### 03. Components — Preview Card

| Component | Description |
|-----------|-------------|
| Preview Card | Master component |
| ├── .image | Product Image atom (4:3) |
| ├── .category | Category Badge atom |
| ├── .temp_badge | Temperature Badge atom (conditional) |
| ├── .title | Product name (heading-md) |
| ├── .description | Short text (body, 2 lines max) |
| ├── .specs | Row of 1-3 Spec Pill atoms |
| ├── .price | Price Display atom |
| └── .cta | CTA Button atom (ghost) |

**Component Properties:**

| Property | Type | Default |
|----------|------|---------|
| productName | text | "Название продукта" |
| category | variant | "Термопакеты" |
| showTempBadge | boolean | false |
| tempRegime | variant | "cool" |
| specCount | variant | "2" / "3" |
| priceType | variant | "from_price" / "request" |
| showStatusBadge | boolean | false |
| statusType | variant | "new" / "hit" |

### 04. Components — Detail Page Sections

Каждая секция — отдельный Figma-компонент с вариантами:

| Section Component | Variants | Notes |
|-------------------|----------|-------|
| SEC-01 Hero | with_metrics / without_metrics | Swap product image |
| SEC-02 Temperature | 1_regime / 2_regimes / 3_regimes | Uses Temperature Badge |
| SEC-03 Specs | table_sm (3-5 rows) / table_lg (6-10 rows) | Auto-height |
| SEC-04 Variants | grid_2 / grid_3 / grid_4 / tabs | For different SKU counts |
| SEC-05 Branding | compact / expanded | With/without method cards |
| SEC-06 Use Cases | 2_cards / 3_cards / 4_cards | With solution links |
| SEC-07 Advantages | 3_items / 4_items / 5_items | Icon + text |
| SEC-08 Limitations | list_short / list_long | Conditional visibility |
| SEC-09 Ecosystem | horizontal_scroll / grid | Preview cards |
| SEC-10 Documents | list_compact / list_detailed | With PDF icons |
| SEC-11 CTA | form_only / form_plus_whatsapp | Product name in heading |
| SEC-12 Related | 2_cards / 3_cards / 4_cards | Preview Card instances |

### 05. Templates — Hub Page

| Template | Layout |
|----------|--------|
| Hub Page Desktop (1440px) | Header → Hero → Filter Bar → Grid (4 cols) → Ecosystem → CTA → Footer |
| Hub Page Tablet (768px) | Header → Hero → Filter Bar (scroll) → Grid (2 cols) → CTA → Footer |
| Hub Page Mobile (375px) | Header → Hero → Filter Bar (scroll) → Grid (1 col) → CTA → Footer |

### 06. Templates — Detail Page

| Template | Layout |
|----------|--------|
| Detail Full (все секции) | SEC-01 through SEC-12 — max config |
| Detail Minimal (core only) | SEC-01 → SEC-03 → SEC-07 → SEC-11 → SEC-12 |
| Detail Moderate | SEC-01 → SEC-03 → SEC-04 → SEC-07 → SEC-11 → SEC-12 |

### 07. Product Instances

Заполненные карточки для каждого реального продукта TERMY:

| Instance | Template used |
|----------|--------------|
| Термопакеты | Detail Full |
| SHOCK® | Detail Full |
| LinerBox® | Detail Full |
| Термошопперы | Detail Moderate |
| БаблПак | Detail Moderate |
| Термокружки | Detail Minimal |

### 08. Responsive Variants

| Breakpoint | Width | Grid cols | Card width |
|------------|-------|-----------|------------|
| Desktop | 1440px | 4 | 320px |
| Tablet | 768px | 2 | 340px |
| Mobile | 375px | 1 | 335px |

---

## 11. Design system constraints

### Цвета

| Назначение | Token | Значение |
|------------|-------|----------|
| Brand primary | --brand-purple | #6428A0 |
| Brand dark | --brand-dark | #1F1438 |
| Surface light | --surface-light | #F8F8FA |
| Surface card | --card-bg | #FFFFFF |
| Text primary | --text-primary | #1A1A1E |
| Text secondary | --text-secondary | #6B6B73 |
| Temp Cool | --temp-cool | #3B82F6 (blue) |
| Temp Freeze | --temp-freeze | #22C55E (green) |
| Temp Gel | --temp-gel | #A855F7 (purple) |
| CTA primary | --cta-primary | #6428A0 |
| CTA danger/accent | --cta-accent | #F54D40 |

### Temperature markers

- Форма: pill-badge с цветным фоном и белым текстом.
- Размер: high 28px, padding 8px 12px.
- Всегда отображают диапазон: «+2…+8°C», «0…−15°C», «~0°C».
- Используются в: preview card, detail page SEC-02, конфигуратор, отраслевые решения.

### Типографика

| Стиль | Использование | Размер desktop / mobile |
|-------|---------------|------------------------|
| heading-xl | Detail page h1 | 40px / 28px |
| heading-lg | Section h2 | 32px / 24px |
| heading-md | Card title, section h3 | 22px / 18px |
| body | Описания, текст | 16px / 15px |
| caption | Бейджи, подписи, specs | 13px / 12px |
| badge | Category, status, temp | 11px / 11px |

### Карточные поверхности

- Background: #FFFFFF.
- Border: 1px solid #E5E5EB.
- Border-radius: 12px.
- Shadow: 0 2px 8px rgba(0,0,0,0.06).
- Hover: shadow → 0 4px 16px rgba(0,0,0,0.10), translate Y -2px.

### CTA поведение

| Тип | Стиль | Где |
|-----|-------|-----|
| Primary | Filled purple, white text | SEC-11, hero metrics |
| Secondary | Outlined purple | Related products, ecosystem |
| Ghost | Text-only + arrow | Preview card «Подробнее» |
| WhatsApp | Green filled, WhatsApp icon | SEC-11 alt |

### Адаптивность

- Breakpoints: 1440 → 1024 → 768 → 375.
- Preview card grid: 4 → 3 → 2 → 1 колонка.
- Detail page: 2-col hero → 1-col, spec tables → stack.
- Filter bar: fixed → horizontal scroll.
- Images: srcset с 3 размерами.

---

## 12. Интеграция с Knowledge Base

### Принцип

Все текстовые данные в карточках продуктов должны **происходить из KB**, а не из маркетинговых формулировок дизайнера или разработчика.

### Текущие файлы KB и их роль

| Файл KB | Что маппится в card system |
|---------|---------------------------|
| services.md | Описания продуктов, конструкция, материалы, характеристики |
| pricing.md | Таблица цен SHOCK® (4 объёма × 3 режима × 4 тиера) |
| about.md | Общая информация о компании, список категорий |
| cases.md | Сценарии использования → SEC-06 |
| faq.md | Частые вопросы → может линковаться из detail page |
| articles/*.md | Гайды → SEC-06 use cases, SEC-09 ecosystem |

### Правила

1. Если KB содержит данные по продукту — использовать только их.
2. Если KB не содержит данных — секция не отображается (не додумывать).
3. Конфликты в KB (например, durability термошопперов: 10+ vs 30+) — фиксировать в data quality log, не публиковать до резолюции.
4. Цены из pricing.md — единственный источник ценовых данных.
5. Сертификаты — только подтверждённые (ГОСТ Р 50962-96, ТУ 22.22.11-001-47645032-2022).

---

## 13. Связь с контентной моделью

### Product Data Schema (field → UI mapping)

```
Product {
  // ── Identity ──
  id:                 string       → internal, not displayed
  slug:               string       → URL: /products/{category}/{slug}/
  name:               string       → preview card title, detail h1
  name_short:         string       → breadcrumb, filter tabs
  category:           enum         → category badge, filter
  
  // ── Description ──
  short_desc:         string(80)   → preview card description
  positioning:        string(200)  → detail hero subtitle
  
  // ── Visual ──
  image_main:         url          → preview card image, detail hero
  image_gallery:      url[]        → detail hero gallery
  
  // ── Temperature ──
  has_temperature:    boolean      → show/hide temp badge
  temp_regimes:       TempRegime[] → SEC-02 badges
  protection_hours:   number       → spec pill, SEC-02
  
  // ── Specs ──
  specs: [{
    label:            string       → spec table row label
    value:            string       → spec table row value
    preview:          boolean      → show in preview card spec pills
  }]
  
  // ── Variants ──
  has_variants:       boolean      → show/hide SEC-04
  variants: [{
    name:             string       → variant card title
    dimensions:       string       → variant card spec
    volume:           string       → variant card spec
    price:            PriceData    → variant card price
    sku:              string       → internal
  }]
  
  // ── Price ──
  price_from:         number|null  → preview card price (null = «Запросить»)
  price_currency:     string       → «₽»
  price_unit:         string       → «/шт», «/кор»
  price_tiers:        PriceTier[]  → SEC-03 pricing table
  
  // ── Branding ──
  has_branding:       boolean      → show/hide SEC-05
  branding_methods:   BrandMethod[]→ SEC-05 method cards
  
  // ── Use Cases ──
  use_cases:          UseCase[]    → SEC-06 cards
  solution_links:     string[]     → SEC-06 links to /solutions/
  
  // ── Advantages ──
  advantages:         Advantage[]  → SEC-07 list
  
  // ── Limitations ──
  limitations:        string[]|null→ SEC-08 (null = hidden)
  
  // ── Ecosystem ──
  compatible_products: string[]    → SEC-09 product IDs
  recommended_combo:  ComboData|null→ SEC-09 combo block
  
  // ── Documents ──
  documents: [{
    title:            string       → SEC-10 doc name
    type:             enum         → cert / tu / gost / test_report
    number:           string       → document number
    valid_until:      date|null    → expiration
    pdf_url:          string|null  → download link
  }]
  
  // ── Metadata ──
  series_count:       number|null  → preview card series badge
  status:             enum|null    → status badge (new/hit/soon/null)
  sort_order:         number       → position in hub page grid
  
  // ── KB source ──
  kb_source:          string       → filename in knowledge-base/
  data_completeness:  enum         → full / partial / minimal
}
```

### Sub-types

```
TempRegime {
  mode:     enum    → cool / freeze / gel
  range:    string  → "+2…+8°C"
  color:    string  → blue / green / purple
  filler:   string  → "водно-солевой раствор" / "гель CMC"
}

PriceTier {
  min_qty:    number  → 1 / 500 / 2500 / 5000
  price:      number  → цена за единицу
  with_vat:   boolean → включён ли НДС
}

BrandMethod {
  method:     string  → "Шелкография" / "Флексография" / "Стикер" / "Тиснение"
  moz:        number  → минимальный тираж
  timeline:   string  → "2-4 недели"
  colors:     string  → "до 5 цветов" / "без ограничений"
}

UseCase {
  industry:   string  → название отрасли
  task:       string  → задача
  solution:   string  → как продукт решает
}

Advantage {
  icon:       string  → icon ID
  title:      string  → заголовок
  desc:       string  → описание
}
```

---

## 14. Риски

| # | Риск | Последствие | Митигация |
|---|------|------------|-----------|
| R1 | Уникальная вёрстка под каждый товар вместо системы | Неуправляемый рост кода, потеря консистентности | Единый шаблон detail page + preview card |
| R2 | Потеря универсальности при добавлении «особого» продукта | Шаблон ломается, начинается копирование вместо расширения | Условные секции вместо уникальных страниц |
| R3 | Смешение продуктовой карточки с отраслевыми решениями | Размытие фокуса — пользователь не понимает, продукт это или решение | Карточка = продукт. Решение = отдельный раздел. Связь через ссылки, не через вложение |
| R4 | Смешение продуктовой карточки с кейсами | Маркетинговый текст вместо спецификаций | Кейсы — отдельный раздел. В карточке — только SEC-06 (use cases из KB) |
| R5 | Перегруз detail page | Пользователь не доскролливает до CTA | Обязательный CTA в hero + финальный CTA. Секции опциональны и скрываются |
| R6 | Недозаполненные поля | Пустые секции, placeholder-текст в продакшене | Graceful degradation: пустая секция = скрытая секция |
| R7 | Конфликт между брендбуком и текущим UI | Карточки выглядят чужеродно в текущем дизайне | Design tokens привязаны к существующему брендбуку, не к новому |
| R8 | Конфликт между KB и маркетинговыми формулировками | Данные в карточке не совпадают с реальностью | KB = source of truth. Маркетинговый текст проходит сверку с KB |
| R9 | Дублирование данных (KB + hardcoded HTML) | Рассинхрон при обновлении | Единый data source → render. Не хардкодить текст |
| R10 | Конфликтующие данные внутри KB | Пользователь видит разные цифры в разных местах | Data quality log. Не публиковать данные с конфликтами |

### Известные конфликты в KB (на 2026-04-12)

| Поле | Конфликт | Статус |
|------|---------|--------|
| Термошопперы: циклы использования | 10+ vs 30+ | Не резолвлен — не публиковать |
| LinerBox: грузоподъёмность | Конфликт в источниках | Не резолвлен |
| Аккумуляторы тепла | В разработке vs доступны | Не резолвлен — не включать в каталог |
| SHOCK 1000 мл: размеры | Отсутствуют в KB | Запросить у производства |
| SHOCK 450 мл: штрихкоды | Отсутствуют | Запросить |

---

## 15. Рекомендованный следующий шаг

**Не переходить к build.**

Следующее действие:

### Шаг 1: Content Schema Validation

- Взять Product Data Schema из раздела 13.
- Пройтись по каждому продукту TERMY и проверить: какие поля заполнены, какие пусты, какие конфликтуют.
- Результат: таблица data completeness по каждому продукту.

### Шаг 2: Field Priority Matrix

- Определить обязательные поля (без них карточка не рендерится).
- Определить опциональные поля (скрываются если пусты).
- Определить поля, требующие резолюции конфликтов.

### Шаг 3: Content Collection

- Заполнить недостающие поля из первичных источников (производство, сертификаты, внутренние документы).
- Резолвить конфликты в KB.

### Шаг 4: Figma Design

- Собрать компоненты в Figma по структуре из раздела 10.
- Заполнить instances реальными данными.
- Согласовать с клиентом.

### Шаг 5: Build

- Только после согласования Figma + data completeness → переходить к HTML/React.

---

*Система названа: TERMY Universal Product Card System (TUPCS)*  
*Версия архитектуры: 1.0*  
*Следующая ревизия: после content schema validation*
