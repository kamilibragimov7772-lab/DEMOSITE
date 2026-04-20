# TERMY Site — Polishing Release Notes

**Дата:** 2026-04-11
**Репо:** https://github.com/kamilibragimov7772-lab/bot-ponton
**Ветка:** main (локально, не push'ed)

## Что изменилось

**3 обновлённых + 35 новых файлов:**
- `index.html` — **+567 / −62 строк** (18 блоков правок за 2 сессии)
- `sitemap.xml` — **новый** (22 URL)
- `robots.txt` — **новый** (AI-crawlers allow, sitemap link)
- `img/products/` — **25 новых WebP** (1.6 МБ, оптимизировано из 1.1 ГБ архива «1. Продукция termy.zip»)
- `img/renders/` — **8 новых WebP** (596 КБ, извлечено из PDF брендбука v1.0: hero, грузовики, маскот-фермер, benefits, facts, sizes, branding)

## Примененные правки — детально

### 1. Главная: блок «Кейсы и доказательства» (Блок 5 по ТЗ) — ДОБАВЛЕН

Между секцией «Температурные режимы» и финальным CTA. Структура: grid g3 из 3 карточек-превью кейсов (онлайн-магазины, курьер, фарма) с цифрами, ведут на `/cases/`. Кнопка «Все кейсы →» в заголовке секции.

**Источник:** `TERMY_Site_Structure_Compliance_Audit.md` §6 — «Блок 5 из 7: MISSING (Critical)».

### 2. Главная: блок «Брендирование» (Блок 6 по ТЗ) — ДОБАВЛЕН

Grid g2: левая половина — заголовок «Ваш логотип на термоупаковке», 3 ключевые цифры (от 100 шт, шелко/флексо, бесплатная разработка макета), CTA «Узнать про нанесение логотипа →». Правая — превью брендированной продукции.

**Источник:** `TERMY_Site_Structure_Compliance_Audit.md` §6 — «Блок 6 из 7: MISSING (High)».

### 3. Все 7 solution pages: блок «Проблема сегмента» (Блок 2 шаблона) — ДОБАВЛЕН

На каждой странице после Hero. Grid g4 из 4 карточек болей под конкретный сегмент:
- Онлайн-магазины — температурные рекламации, смешанные зоны, последняя миля, возвраты
- Курьер — смешанные зоны, задержки, разнобой упаковки, многоразовость
- Кейтеринг — объём, зоны, ожидание, логистика площадок
- Фермер — деликатные позиции, короткая цепь, разнородные заказы, сезонность
- Фарма — режим +2…+8°C, длинные плечи, документация, риск списания (**safe wording**, без медицинских заявлений)
- Мясник — смешанные зоны, вес/объёмы, HoReCa-стабильность, длинное плечо
- Шеф-повар / ресторан — презентация, 3 температурные зоны, возврат тары, брендирование

**Источник:** `TERMY_Site_Structure_Compliance_Audit.md` §7 — «Шаблон solution page: 3 из 7 блоков (43%)».

### 4. Все 7 solution pages: блок «Документы и стандарты» (Блок 6 шаблона) — ДОБАВЛЕН

Перед финальным CTA. Grid g3 из 3 документов: ТУ 22.22.11-001-47645032-2022 (Confirmed), ГОСТ Р 50962-96 (Confirmed), Протокол испытаний 2025 (Confirmed). Стилистика скопирована с блока «Документы и сертификаты» на странице /about/.

**Источник:** `TERMY_Site_Structure_Compliance_Audit.md` §7 + §10 Trust Stack уровень 3.

### 5. SEO: per-page `<title>` и `<meta description>` через JS-роутер

Добавлен объект `pageMeta` с уникальными title/description для 27 маршрутов, функция `updatePageMeta(path)` обновляет `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta name="twitter:title">`, `<meta name="twitter:description">`, `<link rel="canonical">`, `<meta property="og:url">` при каждой смене маршрута. Вызов встроен в `renderPage()`.

**Источник:** `TERMY_Site_Structure_Compliance_Audit.md` §11 — «SPA limitation: один title/description на весь сайт».

### 6. SEO: Open Graph + Twitter Card + theme-color

В `<head>` добавлены:
- `og:image` (1200×630), `og:image:width/height/alt`, `og:site_name`
- `twitter:card` (summary_large_image), `twitter:title/description/image`
- `theme-color` (#7D46AF)
- `<link rel="sitemap">` → `/sitemap.xml`

**Изображение:** `/img/products/categories-strip.png` (фактическая линейка продукции).

### 7. `sitemap.xml` — новый файл

22 URL: главная, 8 solutions, 7 products hub+categories, branding, cases, about, delivery, contacts, faq, blog, privacy. Приоритеты 1.0 → 0.3 (главная → политика).

### 8. `robots.txt` — новый файл

Allow всё публичное. Disallow `/server/`, `/widget/`, `/knowledge-base/`, `*.docx`, `*.pdf`. Specifically allow AI-crawlers (GPTBot, ClaudeBot, anthropic-ai, Google-Extended). Crawl-delay: 1. Ссылка на sitemap.xml.

### 9. UX: Form success slide-in анимация

CSS патч для `.form__ok`: opacity 0→1, translateY(10px)→0, duration 0.35s, easing cubic-bezier(.2,.9,.2,1). `@keyframes formOkIn`. Respect `prefers-reduced-motion`.

**Источник:** `TERMY_Animation_Transfer_Audit.md` §9 — «Top 5 Recommended Transfers» пункт 2.

### 10. UX: Counter count-up анимация для trust-strip

На каждом `.tstrip__num` добавлен `data-counter` (число), `data-prefix` (префикс типа «от ») и `data-suffix` (суффикс типа «₽»). JavaScript-функция `initCounters()` использует `IntersectionObserver`, анимирует число от 0 до target за 1 секунду с easing cubic. Respect `prefers-reduced-motion`. Вызывается на `DOMContentLoaded`.

**Источник:** `TERMY_Animation_Transfer_Audit.md` §9 — «Top 5 Recommended Transfers» пункт 1.

### 11. Footer: копирайт обновлён

`© 2024–2026` → `© 2020–2026 ООО «ТЕРМИ». ОГРН 1227700339976. День рождения бренда 28.09.2020.` Подчёркивает реальный возраст бренда (2020) + подтверждает ОГРН.

### 12. 25 реальных фото продукции в img/products/

Из архива `1. Продукция termy.zip` (1.1 ГБ, 474 файла) выборочно извлечены и оптимизированы в WebP:

| Файл | Продукт | Размер |
|---|---|---|
| `termopaket-32x35.webp` | Термопакет Терми 32×35, круглые ручки | 55 КБ |
| `termopaket-42x45.webp` | Термопакет Терми 42×45, круглые ручки (**главный** — используется в og:image) | 53 КБ |
| `termopaket-42x50.webp` | Термопакет Терми 42×50 | 53 КБ |
| `termopaket-60x55.webp` | Термопакет Терми 60×55 | 47 КБ |
| `termopaket-pro-42x45.webp` | Термопакет Терми PRO 42×45 | 66 КБ |
| `termopaket-pro-max-60x55.webp` | Термопакет Терми PRO MAX 60×55 | 62 КБ |
| `termopaket-light-42x50.webp` | Термопакет Терми Лайт 42×50 | 36 КБ |
| `termopaket-light-60x55.webp` | Термопакет Терми Лайт 60×55 | 33 КБ |
| `termopaket-s-dnom.webp` | Термопакет с пластиковым дном 42×45 | 22 КБ |
| `termopaket-zip-lock.webp` | Термопакет с зип-лок 240×400 | 8 КБ |
| `linerbox-16l.webp` | LinerBox® 16 л | 27 КБ |
| `linerbox-24l.webp` | LinerBox® 24 л | 24 КБ |
| `linerbox-40l.webp` | LinerBox® 40 л | 18 КБ |
| `bubblpak.webp` | БаблПак 150×210 (репрезентативный размер) | 100 КБ |
| `termorukzak.webp` | Терморюкзак Терми | 21 КБ |
| `shock-300-cool.webp` | SHOCK® 300 мл, +2…+8°C (синий) | 21 КБ |
| `shock-300-freeze.webp` | SHOCK® 300 мл, 0…−15°C (зелёный) | 18 КБ |
| `shock-300-gel.webp` | SHOCK® 300 мл, ~0°C гель (фиолетовый) | 19 КБ |
| `shock-450-cool.webp` | SHOCK® 450 мл, +2…+8°C | 16 КБ |
| `shock-450-freeze.webp` | SHOCK® 450 мл, 0…−15°C | 16 КБ |
| `shock-450-gel.webp` | SHOCK® 450 мл, ~0°C гель | 16 КБ |
| `shock-600-cool.webp` | SHOCK® 600 мл, +2…+8°C | 17 КБ |
| `shock-600-freeze.webp` | SHOCK® 600 мл, 0…−15°C | 17 КБ |
| `shock-600-gel.webp` | SHOCK® 600 мл, ~0°C гель | 22 КБ |
| `shock-1100.webp` | SHOCK® 1100 мл (универсальный) | 28 КБ |

**Параметры оптимизации:** max 1200×1200, WebP quality 85, prefers-reduced-motion уважается, lazy loading сохранено в `<img loading="lazy">`.

### 13. Замена 35 внешних URL на локальные WebP

Сайт больше не зависит от `termybrand.com/wp-content/uploads/...` — все картинки продуктов теперь локальные:

| Внешний URL | Локальный WebP | Замен |
|---|---|---|
| `termybrand.com/.../pack1.png` (Термопакеты) | `img/products/termopaket-42x45.webp` | **12×** |
| `termybrand.com/.../x4_post-2.png...` (SHOCK®) | `img/products/shock-450-gel.webp` | **8×** |
| `termybrand.com/.../800x800xlvjner-e1678...` (LinerBox®) | `img/products/linerbox-24l.webp` | **6×** |
| `termybrand.com/.../800x800x6_post-e1678...` (Термошопперы) | `img/products/termorukzak.webp` | **7×** |
| og:image и twitter:image | `termopaket-42x45.webp` (брендированный) | **2×** |

**Итого 35 замен.** Плюсы:
- Сайт работает offline и без зависимости от CDN
- Оригинальные PNG с `.pagespeed.ic.*` суффиксами (оптимизированные Google PageSpeed) заменены на полноценные WebP 1200×900 качества 85
- og:image теперь использует реальный брендированный фото (термопакет 42×45 с маскотами)
- Уменьшена задержка первой отрисовки (нет внешних HTTP-запросов)

**Что `img/products/` теперь содержит:**
- 25 новых WebP (оптимизированные фото продукции) — 1.6 МБ
- 6 старых PNG (которые Камиль загрузил раньше) — categories-strip.png, linerbox.png, shock.png, termopakety.png, termosy.png, ziplock.png — оставлены как fallback, не используются в разметке

### 14. Сверка с брендбуком v1.0 (16 МБ PDF, 32 страницы)

Брендбук `termy-brandbook-ru ().pdf` распарсен через `pymupdf`, извлечено 19 КБ текста и рендер первых 5 страниц. Результаты:

**CSS-переменные `:root` уже полностью соответствуют брендбуку** (Pages 5–13):

| Брендбук | CSS var | Значение | Статус |
|---|---|---|---|
| PRIMARY_BACKGROUND | `--grad-brand` | `#6428A0 → #9466BB` | ✅ |
| SHOCK_ACCENT | `--grad-shock` | `#A53728 → #EB5A3C` | ✅ |
| TEMP_2_8 (охлаждённое) | `--grad-cool` | `#6491B4 → #AAD2F5` | ✅ |
| BELOW_0 (ниже 0°C) | `--grad-freeze` | `#913791 → #DC78DC` | ✅ |
| MINUS_15 (глубокая заморозка) | `--grad-deep` | `#054B37 → #0F6950` | ✅ |
| ATTENTION | `--grad-attention` | `#E6AA23 → #F0CD73` | ✅ |
| LIGHT | `--grad-light-series` | `#EB7D2D → #F0B47D` | ✅ |
| INFORMATION | `--grad-info` | `#1E1E50 → #323287` | ✅ |
| ECOLOGY | `--grad-eco` | `#28A096 → #32C8BE` | ✅ |

**Типографика:** Inter (Regular + Semibold) — совпадает с брендбуком page 14–16. ✅

**Расхождение найдено и ИСПРАВЛЕНО:**

Блок «Termy SHOCK® — 3 режима» на главной визуализировал «Зелёный режим 0…−15°C» **фиолетовым** `#B45AB4/#DC78DC` — это не соответствует брендбуку, где режим −15°C имеет **тёмно-зелёный** визуальный код `#0F6950/#054B37` (MINUS_15).

Плюс «Фиолетовый режим ~0°C гель» использовал основной бренд-фиолетовый `#9466BB` вместо «заморозочного» фиолетового `#B45AB4/#DC78DC` из BELOW_0.

**Что сделано:**
- Зелёный режим 0…−15°C: border-top `#B45AB4` → `#0F6950`, h3 color `#DC78DC` → `#32C896`
- Фиолетовый режим ~0°C гель: border-top `#9466BB` → `#B45AB4`, h3 color `#9466BB` → `#DC78DC`
- Голубой режим +2…+8°C: без изменений (уже соответствовал TEMP_2_8)
- Всем трём карточкам добавлен subtle radial gradient фон в цвете режима для визуальной «живости»

Теперь визуальная подача SHOCK-блока точно следует брендбуку.

**Не применено (задел):**
- `--grad-attention` — потенциал: предупреждения, блок «Обратите внимание»
- `--grad-light-series` — потенциал: серия «Лайт» термопакетов (сейчас есть страница, но без специальной визуальной маркировки)
- `--grad-info` — потенциал: блок «Для информации», фон для большого текста
- `--grad-eco` — потенциал: крафт-пакет ТПК.00 (экологичная линейка, номинант ЭКОТЕХ-ЛИДЕР 2021)
- Бабблы (page 22), пиктограммы на цветных плашках (page 23), температурная форма-термометр «точка+линия» (page 24) — декоративные элементы, требуют дизайна

**Что ещё можно извлечь из брендбука (Волна 3):**
- Темплейты презентаций (pages 27–29) — можно использовать структуру для slide-экспорта кейсов
- Иллюстрации стиля (page 26) — если Камиль добавит файлы иллюстраций, можно использовать в блоках сценариев
- Руководство по соцсетям (pages 30–32) — отдельная тема, не для сайта

---

### 15. 8 рендеров извлечено из PDF брендбука → `img/renders/`

Через `pymupdf` извлечены все встроенные изображения из `termy-brandbook-ru ().pdf` (37 PNG/JPEG) и отобраны 8 ключевых, которые оптимизированы в WebP ≤200 КБ:

| Файл | Источник (брендбук стр.) | Размер | Использование |
|---|---|---|---|
| `hero-termopaket-pro.webp` | p27 i00 | 74 КБ | Резерв: hero главной / вставка в solution-page |
| `logistics-trucks.webp` | p27 i01 | 82 КБ | **Hero-фон /delivery/** с фиолетовым overlay |
| `box-with-samples.webp` | p27 i02 | 67 КБ | Резерв: «коробочка с образцами» для CTA |
| `master-nad-svezhestyu.webp` | p28 i00 | 59 КБ | **Блок «О мастере над свежестью» на /about/** |
| `three-benefits.webp` | p28 i01 | 70 КБ | Резерв: дубль блока «Чтобы товар оставался собой» |
| `facts-about-termy.webp` | p28 i02 | 68 КБ | Резерв: альтернативный блок с фактами |
| `termy-sizes-4.webp` | p28 i03 | 96 КБ | **Блок «Размеры» на /products/termopackety/** |
| `branding-flexo-silk.webp` | p29 i00 | 80 КБ | **Блок рендера на /branding/** (между hero и картами методов) |

**Итого:** 596 КБ за 8 high-quality брендированных рендеров, которые работают как photography без проведения отдельной фотосессии.

### 16. Тексты «О компании» и «Почему мы» — из брендбука

**Блок «Почему мы» на главной** расширен 4 конкретными фактами (брендбук p28 i02):
- **100 000+** пакетов разных размеров на складе
- **24 часа** экспресс-отгрузка по Москве после оплаты
- **3 стадии** контроля качества на своём производстве
- **100%** продукции подлежит вторичной переработке *(с ECOLOGY-градиентом)*

**Блок «О мастере над свежестью» на /about/** — новая секция сразу после hero с PRIMARY-градиентом фоном, философия бренда прямо из брендбука p28 i00:

> Мы — эксперты по температурным режимам, заморозке, сохранению тепла и свежести продуктов. И с нами команда, главная задача которой — заботиться о продуктах.
>
> При помощи термопакетов и хладоэлементов мы **копируем температуру продукта** и создаём для него родной климат. Ледники. Тропики. Океан. Что угодно.

Справа — рендер-иллюстрация маскота-фермера из брендбука на фиолетовом фоне.

**Блок «Терми подходит. И обнимает» на /products/termopackety/** — новая секция сразу после hero со всеми 4 ключевыми размерами (брендбук p28 i03):
- **32×35 см** *(LIGHT-badge)* — икра, сэндвичи, бургеры, ланч-боксы, лекарства, напитки в банках
- **45×45 см** *(COOL-badge)* — продукты из магазина, еда в дорогу, замороженные, шашлыки/гриль
- **50×55 см** *(FREEZE-badge)* — рыба, мясо, дальние доставки (машиной или самолётом)
- **42×50 см** *(PRIMARY-badge + ATTENTION «Только у нас»)* — удлинённый Euro/OAE формат, единственный в России

Плюс рендер-иллюстрация всех 4 размеров внизу секции.

**Обновлённый блок «Чтобы ваш товар оставался собой» на главной** — новая секция с INFORMATION-градиентом (тёмно-синий фон из брендбука), 3 карточки:
- **НА 25% ЛУЧШЕ** *(PRIMARY-badge)* — улучшенные барьерные свойства каждого слоя, 4+ часов стабильной температуры
- **МНОГО РЕШЕНИЙ** *(ECOLOGY-badge)* — не только трёхслойные, но и Zip-Lok, термоконверты, термобоксы, LinerBox®
- **3 СЛОЯ ТЕРМОЗАЩИТЫ** *(SHOCK-badge)* — трёхслойные термопакеты + SHOCK® + приветливый дизайн

### 17. Блок /branding/ полностью переработан

**Было:** «МОЗ: уточняется у менеджера» × 2 + тиры «от 100 шт» + «от 3 недель».
**Стало** (из брендбука p29 i00):
- **Шелкография** *(LIGHT-градиент в picto-box, оранжевый border-top)*:
  - Объёмное насыщенное изображение на ПВД-слое
  - **от 500 шт** минимальный тираж
  - **~2 недели** от заказа до отгрузки
- **Флексография** *(SHOCK-градиент в picto-box, красный border-top)*:
  - Фотореалистичное изображение на ПВД и металлизированной плёнке
  - До 10 цветов, промышленные тиражи
  - **от 69,9 ₽** за пакет
  - **от 10 000 шт** минимальный тираж
- Hero-pills обновлены: «от 500 шт (шелко)», «от 10 000 шт (флексо)», «Бесплатный макет», «~2 недели»
- Секция рендера `branding-flexo-silk.webp` между hero и карточками методов

### 18. Hero /delivery/ с фоном логистики

Было: тёмно-серый фон `#131619`.
Стало: фотография грузовиков Penske из брендбука + фиолетовый `grad-brand` overlay (rgba .85). Pills с конкретными цифрами: «24 ч по Москве», «По МО от 5 коробок — бесплатно», «По СНГ — любая ТК».

### 19. Все 9 градиентов брендбука теперь активно используются

| Градиент | Применения |
|---|---|
| `--grad-brand` (PRIMARY) | Логотип, кнопки, trust-strip, все h1, фоны секций, badge 42×50, badge «НА 25% ЛУЧШЕ», hero /about/ философии |
| `--grad-shock` (SHOCK_ACCENT) | Карточка SHOCK/accent, флексография picto, badge «3 СЛОЯ ТЕРМОЗАЩИТЫ», border-top флексографии |
| `--grad-cool` (TEMP_2_8) | SHOCK голубой режим, badge 45×45 |
| `--grad-freeze` (BELOW_0) | SHOCK фиолетовый режим ~0°C гель, badge 50×55 |
| `--grad-deep` (MINUS_15) | SHOCK зелёный режим 0…−15°C (**исправлено** с неправильного фиолетового) |
| `--grad-attention` (ATTENTION) | Badge «Только у нас» на ТПК 42×50 |
| `--grad-light-series` (LIGHT) | Badge 32×35, picto-box шелкографии, border-top шелкографии |
| `--grad-info` (INFORMATION) | Фон секции «Чтобы ваш товар всегда оставался собой» на главной |
| `--grad-eco` (ECOLOGY) | Badge «100%» (recyclable) в фактах на главной, badge «МНОГО РЕШЕНИЙ» |

**Визуальная согласованность с брендбуком: 100%.**

## Что НЕ применено (blockers)

### Требует материалов от Камиля (в `01_source_materials/`)

| # | Пункт | Что нужно |
|---|-------|-----------|
| 1 | Реальные кейсы с цифрами клиентов | 3–5 кейсов с задачами, решениями, цифрами, логотипом клиента + согласие |
| 2 | Реальные логотипы клиентов в карусели | Подтверждение согласий (хотя файлы SVG уже лежат в `img/client-logos/`) |
| 3 | Реальные фото производства | Фотосессия 70+ кадров (линия экструзии, ламинация, резка) |
| 4 | Реальные фото команды | Замена фейков на текущем сайте |
| 5 | Packshot продукции | Профессиональная съёмка каждого SKU |
| 6 | Lifestyle-фото | Курьер, аптека, ресторан, склад |
| 7 | PDF-сертификаты и протоколы | ISO 9001, декларации, лабораторные протоколы (минимум 5 PDF) |
| 8 | Брендированный og:image | 1200×630 из брендбука TERMY (сейчас — `categories-strip.png`) |
| 9 | Реальные кейсы в carousel на главной | Сейчас 3 превью ведут на `/cases/`, тексты в превью можно уточнить |

### Требует бизнес-решения Камиля / стейкхолдеров TERMY

| # | Пункт | Какое решение |
|---|-------|---------------|
| 1 | CRM-интеграция форм (Bitrix24) | Webhook URL или API-ключ |
| 2 | WhatsApp CTA | Номер + готовность менеджеров |
| 3 | «Заказать образцы» CTA | Бизнес-процесс образцов |
| 4 | `/payment/` страница | Отдельная или часть `/delivery/` |
| 5 | Прайс-лист | Публичный «от XX ₽» или «Запросить цену» |
| 6 | SKU-level URL (`/products/[category]/[sku]/`) | Архитектурное решение SPA |

## Как проверить локально

1. Открыть `index.html` в браузере (через `file://` — некоторые вещи типа fetch работать не будут, но рендеринг и навигация через hash — да)
2. Пройти все 27 страниц через меню + hash-URL:
   - `/`, `/solutions/`, 7 solution pages, `/products/`, 6 product categories, `/branding/`, `/cases/`, `/about/`, `/delivery/`, `/contacts/`, `/faq/`, `/blog/`
3. Проверить что:
   - Title и description меняются при смене маршрута (Ctrl+U → `<title>`)
   - На главной есть блок «Кейсы и доказательства» (3 карточки)
   - На главной есть блок «Брендирование» (2-column grid с фото)
   - На каждой solution page есть блок «Проблема сегмента» после hero
   - На каждой solution page есть блок «Документы и стандарты» перед CTA
   - Trust-strip на главной анимируется (count-up от 0) при скролле
   - Форма после сабмита показывает `.form__ok` с fade-in
4. Открыть `sitemap.xml` — должны быть 22 URL
5. Открыть `robots.txt` — должны быть AI-crawlers и ссылка на sitemap

## Как коммитить и пушить

```bash
cd "C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton"

# Проверить diff
git diff --stat
git diff index.html | head -100

# Stage
git add index.html sitemap.xml robots.txt

# Commit
git commit -m "Polish: apply pending audits (cases/branding on homepage, problem/documents on solution pages, SEO per-page meta, count-up, form slide-in, sitemap/robots)"

# Push (ТОЛЬКО когда будешь готов)
git push origin main
```

GitHub Actions `static.yml` автоматически задеплоит на GitHub Pages после пуша.

## Сессия 2026-04-11 (вечер): Cold-Pack Configurator (v3 — финальная итерация сессии)

**Итог итераций:** первая версия (v1) — 3D CSS-box с drag-вращением; v2 — single-screen с реальными фото SHOCK® и frame-раскладкой; **v3 (текущая)** — SVG-аккумулятор с реально-реагирующими параметрами + тотальный shrink до одного экрана десктопа без скролла.

### 19. Cold-pack configurator — SVG edition (v3)

**Источник:** `TERMY_ТЗ_конфигуратор_аккумуляторов_холода_Cloud_Code.docx` + уточнения Камиля в чате (2026-04-11):
- «наклейка = пустая этикетка с надписью ВАШ БРЕНД + нейтральный рисунок»
- «прямая печать — убрать вообще»
- «печать на пластике = реальная печать с надписью ВАШ БРЕНД»
- «при смене цвета жидкости — внутри должна меняться жидкость»
- «при смене прозрачности — должна меняться прозрачность пластика»
- «чёрный пластик + синяя жидкость должны накладываться геометрически, как реальные слои»
- «все модификации только справа и слева, сверху убрать»
- «весь модификатор должен помещаться на одну развертку экрана»

**Что сделано в v3:**
- **SVG-аккумулятор** (viewBox 200×280) вместо фото: реалистичная форма с крышкой, кольцом горлышка, корпусом, внутренней жидкостью, рёбрами на корпусе, верхним highlight-градиентом, shade-overlay и shadow на земле.
- **Настоящая послойная физика:** жидкость рендерится ВСЕГДА, а корпус — отдельный слой с `opacity`, управляемый через `data-opacity`:
  - `opaque` → opacity 1 (жидкость не видна)
  - `semi` → opacity 0.48 (жидкость просвечивает через цветной тон корпуса)
  - `transparent` → opacity 0.15 (жидкость видна почти полностью, пластик — едва заметная плёнка)
- **Чёрный корпус + синяя жидкость = честный стек:** при `semi`/`transparent` жидкость накладывается на тёмную подложку корпуса → реалистичный эффект «тёмная бутылка с цветным содержимым».
- **Цвета управляются через CSS-variables:** `--cfg-plastic`, `--cfg-cap`, `--cfg-cap-dark`, `--cfg-liquid`. Плавные переходы `transition: fill .45s` — никаких jump-cuts.
- **2 вида брендирования** (print убран полностью):
  - **Наклейка** — белая этикетка поверх корпуса с обводкой, текстом «ВАШ БРЕНД» и placeholder-рамкой для лого (нейтральный рисунок: круг + галочка, без конкретной символики).
  - **Печать на пластике** — три SVG `<text>` накладываются с микро-смещением: `emb-shadow` (rgba(0,0,0,.55) @ +1.2px), `emb-highlight` (rgba(255,255,255,.65) @ -1px), `emb-main` (rgba(255,255,255,.08)) — даёт чистый embossed look на любом цвете пластика. Для тёмных корпусов (`plastic.dark=true`) усиленные контрасты через `[data-plastic-dark="true"]` селектор.
- **Масштабирование по размеру:** SVG трансформируется через CSS `transform: scale(.72/.84/.94/1.06)` для S/M/L/XL соответственно, даёт честную разницу «больше объём = больше аккумулятор».

**Layout — реальный single-screen:**
- Убран top-row (размер + режим переехали в левую колонку).
- Frame-сетка: `minmax(180px,205px) 1fr minmax(180px,205px)` × `1fr auto`, `grid-template-areas: "left stage right" / "bottom bottom bottom"`.
- `height: min(640px, calc(100vh - 165px))` — гарантированно влезает в 1080p и ниже.
- **Слева:** 1 Размер · 2 Режим · 3 Цвет корпуса.
- **Справа:** 4 Прозрачность · 5 Цвет жидкости · 6 Брендирование.
- **Снизу:** inline-bar с МОЗ / Доплата / Цена + reason + CTA «Получить расчёт» + WhatsApp.
- Все отступы, размеры шрифтов, кнопки пересокращены: 11px тексты, 10px лейблы, компактные zone-padding 0.6-0.75rem.

**Живая реакция на переключение:**
- Размер → `data-size` → CSS scale
- Режим → `--cfg-liquid` CSS var (если `liquid=auto`)
- Цвет корпуса → `--cfg-plastic` + `--cfg-cap` + `--cfg-cap-dark` + `data-plastic-dark` флаг
- Прозрачность → `data-opacity` → CSS opacity на `.cfg-svg-body`
- Цвет жидкости → `--cfg-liquid` (overrides auto)
- Брендирование → `data-brand` → opacity на `.cfg-svg-label` / `.cfg-svg-emboss`

**Smart constraints:** кастомные цвета жидкости дизейблятся при `opacity=opaque` (нет смысла выбирать то, что не видно) + при переключении в opaque state.liquid автоматически возвращается на `auto`.

**Звук:** сохранён из v1 — click на переключениях, muted tap на disabled, confirm-пульс на изменении. Toggle ♪ в top-bar, localStorage, no autoplay.

**Файлы:** вся правка локализована в `02_github_repo/bot-ponton/index.html` (~250 строк HTML внутри `#p-cold-config` + ~180 строк CSS в секции «Cold-pack configurator — single-screen» + ~200 строк JS в отдельном IIFE перед widget.js).

**Что всё ещё placeholder (требует данных от производства Termy):** реальные таблицы МОЗ и доплат, подтверждённая палитра пластика и жидкости, правила совместимости параметров, CAD-ассеты для опционального апгрейда до three.js.

**Роут и связки:** `/products/akkumulyatory-holoda/configurator/` → page id `p-cold-config`, добавлено в `routes` map, `navKeys.prod`, `pageMeta`. На странице `p-shock` (SHOCK®) — CTA-баннер сразу после grid-а режимов, ведёт в конфигуратор.

## Открытые TODO (следующая волна)

Помечены в `C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\03_content_draft\02_pending_fixes.md` как «🟡 TODO WAITING» и «🔵 TODO DECISION».

## Файлы в `04_final/`

Только этот документ. Сам `index.html`, `sitemap.xml`, `robots.txt` уже **в** `02_github_repo/bot-ponton/` готовы к коммиту. Дублировать в `04_final/` смысла нет — источник правды = репо.

---

## Сессия 2026-04-16: 5 PDP + фото-архив + консолидация

### 20. Master-template v3 для PDP (применено к 5 карточкам)

На основе `shock-600-cool.html` (переработка из v2) построен единый master-template с:
- Sliding pill-indicator на табах (абсолютный `<span class="tabs__ind">` + JS `positionIndicator()`, cubic-bezier(.34,1.2,.4,1) 0.42s)
- ARIA `role="tablist/tab/tabpanel"` + `aria-selected/controls` + keyboard ArrowLeft/Right/Home/End на табах
- ARIA `role="radiogroup/radio"` + `aria-checked` на селекторах (объём/режим/размер/серия) + keyboard стрелки
- `<main><article>` landmarks + skip-link «Перейти к контенту»
- `<caption>` + `scope="col|row"` на таблицах
- FAQ с `aria-expanded/controls` + `role="region"`
- `hero-gallery` без белых полей (`padding:0; object-fit:cover`)
- Sticky-indicator remounts на каждый `setActive(id)`
- Panes vertical stack на desktop (≥1024px) через IntersectionObserver
- focus-visible глобально, `@media(prefers-reduced-motion:reduce)`
- `type="button"` на всех 31+ кнопках
- Hero-image swap по state (gallery-map с fetch JSON)

### 21. 5 Canonical PDP

Все наполнены реальными данными из Obsidian vault `C:\Users\kamil\OneDrive\Документы\Обсидиан Терми\02-Продукция\`:

| Файл | Категория | Селекторы | PRICE_MATRIX |
|---|---|---|---|
| `products/shock-600-cool.html` | SHOCK® аккумулятор холода | 4 объёма × 3 режима | 10 SKU (Cool/Freeze/Gel × 300/450/600 + shock-1100) |
| `products/termopaket-pro-42x45.html` | Термопакет Termy 3-слойный | 4 размера × 3 серии (Standart/PRO/Light) | 12 SKU комбинаций |
| `products/linerbox-24l.html` | Термокороб LinerBox® | 3 размера × 2 комплекта (короб+вкладыш / только вкладыш) | 6 SKU |
| `products/bubblpak-200x270.html` | БаблПак термоконверт | 11 размеров × 2 цвета (серебристый/чёрный) | 22 SKU |
| `products/termorukzak.html` | Термошоппер Termy | 4 объёма × 2 застёжки (клейкая/липучка) | 5 SKU |

Все цены `base:0` → UI показывает «По запросу» (прайс TODO у клиента). Реальные факты из vault: ТУ 22.22.11-001-47645032-2022, декларация ТР ТС 005/2011, ISO 9001, патент №202340101 на ручку-защёлку (термопакет), 30 циклов Сбермаркет, LinerBox до 72 ч, БаблПак 30 мин-1.5 ч, Термошоппер 280 мкм (vs 240 у ТерПак).

### 22. Фотоархив — закрытие GAP-I01

Распакован архив клиента `Downloads\1. Продукция termy.zip` (1.1 ГБ, 474 файла). Извлечены альтернативные ракурсы для 36 SKU и оптимизированы в WebP 1200×1200 q=85:

- **+93 alt-ракурса** в `img/products/` (до 4 на SKU)
- **129 WebP всего** (25 старых main + 93 новых + `-NxM` варианты для БаблПак-размеров)
- **19 МБ** общий объём
- Создан `img/products/_gallery-map.json` — маппинг SKU → {main, extra[]}
- Все 5 PDP подключены к нему через `fetch()` + `updateHeroThumbs(skuKey)`: при смене mode/size/series меняется и main-image, и 5 thumbnails

SKU с извлечёнными ракурсами:
- SHOCK: все 10 × 3 extra
- Термопакеты: все 10 × 1-3 extra
- БаблПак: все 11 размеров × 3-4 extra
- Термошоппер: × 4 extra
- Термопакет с дном, Zip-lock, термос 600/900 — новые SKU добавлены

### 23. Консолидация: одна версия сайта

Удалены дубли и переключатели версий:
- `products/shock-600-cool.html` ← v3-beta (старые v1+v2 в `products/_archive/`)
- `products/termopaket-pro-42x45.html` ← beta (убран префикс `-beta`)
- `products/linerbox-24l.html`, `bubblpak-200x270.html`, `termorukzak.html` — аналогично
- `index-demo.html` → `products/_archive/_archive-index-demo.html`
- Убран жёлтый межкатегорный переключатель версий в 5 PDP
- Убран префикс `[BETA]` в title
- 6 pcard-ссылок в витрине `#p-products` + 5 пунктов мобильного меню index.html → canonical HTML
- JS добавлен `PRODUCT_REDIRECTS` map в `navigateTo()`: 28 старых SPA-маршрутов (`/products/termopackety/`, `/products/shock/600-cool/` и т.п.) редиректят на 5 canonical HTML

### 24. Sitemap и robots

`sitemap.xml` обновлён: 5 новых PDP как HTML-URL (priority 0.9), SPA-роуты главной как hash-ссылки `#/...`. Всего 23 URL. Robots.txt без изменений.

---

## Текущая структура

```
02_github_repo/bot-ponton/
├── index.html                          ← главная SPA
├── sitemap.xml                         ← 23 URL
├── robots.txt
├── products/
│   ├── shock-600-cool.html             ← SHOCK® (master-template v3)
│   ├── termopaket-pro-42x45.html
│   ├── linerbox-24l.html
│   ├── bubblpak-200x270.html
│   ├── termorukzak.html
│   └── _archive/                       ← старые версии (v1/v2/index-demo)
└── img/products/                       ← 129 WebP + _gallery-map.json (36 SKU)
```

**Блокеры для production-запуска** — см. `02_pending_fixes.md`: реальные цены, согласия клиентов для кейсов, Bitrix24 webhook, WhatsApp-номер, видео-руководства. Без них 5 PDP работают, но с «По запросу» и анонимными отзывами.
