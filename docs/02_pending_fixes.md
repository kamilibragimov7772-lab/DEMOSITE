# Сводный to-do: ТЗ + 8 аудитов → список правок

*Дата: 2026-04-11. Источники: ТЗ v1.0, все 8 TERMY_*_Audit.md, read-only осмотр index.html.*

Легенда статусов:
- 🟢 **APPLIED** — уже применено к index.html
- 🔴 **TODO SAFE** — можно применить без материалов от Камиля
- 🟡 **TODO WAITING** — требует материалов (логотипы, PDF, фото, тексты кейсов)
- 🔵 **TODO DECISION** — требует продуктового/бизнес-решения

## 1. Ранее применённые патчи (зафиксированы в аудит-отчётах)

| # | Патч | Источник | Статус |
|---|------|----------|--------|
| 1 | БаблПак + Термоконверты merge: объединены в `p-bubblpak` с редиректом `/products/termokonverty/` → `p-bubblpak` | `TERMY_BubblePack_ThermoEnvelope_Merge_Report.md` | 🟢 APPLIED |
| 2 | Products hub: унификация в единый `grid g3` из 6 одинаковых `pcard` (убрана 2-tier иерархия с hub-card) | `TERMY_Strict_Products_Grid_Unification.md` | 🟢 APPLIED |
| 3 | Существующие 15 анимаций (scroll reveal, card hover, FAQ accordion, hamburger morph и пр.) сбалансированы | `TERMY_Animation_Transfer_Audit.md` | 🟢 APPLIED |

## 2. Solutions Patch (готовый diff в TERMY_Solutions_Patch.md — приоритет 1)

Весь раздел применяется сразу — инструкции точные, с номерами строк.

| # | Правка | Где | Линии | Тип | Статус |
|---|--------|-----|-------|-----|--------|
| C1 | Главная: 5 карточек решений → 7 каноничных карточек (по брендбуку) | `#p-home`, секция «Отраслевые решения» | 582–611 | replace | 🔴 TODO SAFE |
| C2 | Заменить 4 alias-маршрута на каноничные (онлайн-магазины/курьер/кейтеринг/фермер, + добавить мясник + шеф) | там же | 582–611 | replace | 🔴 TODO SAFE |
| C3 | Правильные маскот-картинки mascot_1..7 в карточках | там же | 582–611 | replace | 🔴 TODO SAFE |
| H1 | Фарма карточка: поменять overstatement wording (нет РУ Росздравнадзора) | там же, карточка 5 | 605–609 | replace | 🔴 TODO SAFE |
| H2 | `grid g3` → `grid g4` для 7 карточек | там же | 584 | replace | 🔴 TODO SAFE |
| M1 | Маскот-лейблы: `mascot_N →` → `Персонаж 0N —` на всех 7 solution pages | 7 разных pages | 1697, 1781, 1865, 1949, 2033, 2115, 2195 | replace | 🔴 TODO SAFE |
| M3a | Удалить 4 alias-маршрута из router `const routes` | JS секция | 2680–2683 | remove | 🔴 TODO SAFE |
| M3b | Удалить те же 4 alias-маршрута из массива `navKeys.sol` | JS секция | 2693 | remove | 🔴 TODO SAFE |

## 3. Структурные недостачи (Type A — critical)

| # | Правка | Источник | Статус | Зависимости |
|---|--------|----------|--------|-------------|
| A1 | Создать страницу `/cases/` с 3 placeholder-кейсами и структурой (задача→решение→результат+цифры) | Site_Structure_Audit §4, ТЗ §12.2 | 🔴 TODO SAFE (скелет) | Реальные цифры кейсов — ждёт Камиля |
| A2 | Добавить блок «Кейсы» на главную (между блоками продукции и финальным CTA) — 2-3 превью кейсов + ссылка /cases/ | Site_Structure_Audit §6, ТЗ §9 | 🔴 TODO SAFE (placeholder) | Тексты кейсов — ждёт Камиля |
| A3 | Добавить блок «Брендирование» на главную — фото + CTA → /branding/ | Site_Structure_Audit §6, ТЗ §9 | 🔴 TODO SAFE | Фото — есть `img/` с существующими |
| A4 | Интеграция форм с Bitrix24 (сейчас mock) | Site_Structure_Audit §9, ТЗ §13.2 | 🔵 TODO DECISION | Webhook URL от Камиля |
| A5 | Solution pages: добавить блок «Проблема» (3–4 боли сегмента) на все 7 страниц | Site_Structure_Audit §7 | 🔴 TODO SAFE (скелет) | Контент болей — частично из KB |
| A6 | Solution pages: добавить блок «Документы» (ссылки на сертификаты/PDF) на все 7 | Site_Structure_Audit §7 | 🔴 TODO SAFE (скелет) | PDF файлы — ждёт Камиля |
| A7 | PDF-спецификации для скачивания на карточках продуктов (мин. 30 PDF по ТЗ) | Site_Structure_Audit §8, ТЗ §12.3 | 🟡 TODO WAITING | PDF файлы от Камиля |
| A8 | Заменить placeholder логотипов «Клиент 1–6» на реальные SVG | Client_Logos_Manifest | 🟡 TODO WAITING | Согласия от клиентов (Ozon Fresh, ВкусВилл, Самокат и т.д.) |

## 4. SEO и техническое (High/Medium)

| # | Правка | Источник | Статус |
|---|--------|----------|--------|
| S1 | Создать `sitemap.xml` (все 27 страниц + priorities) | ТЗ §15.2, Audit §11 | 🔴 TODO SAFE |
| S2 | Создать `robots.txt` (allow all + sitemap link) | ТЗ §15.2 | 🔴 TODO SAFE |
| S3 | Добавить `og:image` meta (брендированное изображение из брендбука или hero screenshot) | ТЗ §15.2 | 🔴 TODO SAFE (placeholder с hero webm frame) |
| S4 | Добавить `twitter:card` meta | ТЗ §15.2 | 🔴 TODO SAFE |
| S5 | Per-page title/description/JSON-LD injection через JS-роутер при смене маршрута | ТЗ §15.2, Audit §11 | 🔴 TODO SAFE |
| S6 | Schema markup: Organization (есть) + Product + FAQ + Breadcrumb | ТЗ §15.2 | 🔴 TODO SAFE |
| S7 | Canonical URLs per-page (через JS) | Audit §11 | 🔴 TODO SAFE |

## 5. UX / CRO (medium)

| # | Правка | Источник | Статус |
|---|--------|----------|--------|
| U1 | Counter count-up для proof-bar на главной (49₽, 1 коробка, 2 дня, 7 линеек) | Animation_Audit §4, §9 | 🔴 TODO SAFE (~20 строк JS) |
| U2 | Form success slide-in анимация (улучшить `.form__ok`) | Animation_Audit §4, §9 | 🔴 TODO SAFE (~3 строки CSS) |
| U3 | WhatsApp CTA-виджет (плавающий или в sticky bar) | Site_Structure_Audit §9, ТЗ §13.1 | 🔵 TODO DECISION (нужен номер + готовность менеджеров) |
| U4 | «Заказать образцы» secondary CTA | Site_Structure_Audit §9, ТЗ §13.1 | 🔵 TODO DECISION (бизнес-процесс образцов) |
| U5 | `/payment/` отдельная страница (условия для юрлиц) | Audit §3 | 🔵 TODO DECISION (отдельно или часть /delivery/) |

## 6. Контент и копирайт (medium)

| # | Правка | Источник | Статус |
|---|--------|----------|--------|
| K1 | Copyright: `© 2024-2026` → `© 2026` (обновить год везде) | ТЗ §17.4 | 🔴 TODO SAFE |
| K2 | Политика конфиденциальности (пустая — добавить минимальный текст) | ТЗ §17.4 | 🔴 TODO SAFE (шаблон) |
| K3 | Cookie notification baner | ТЗ §17.4 | 🔴 TODO SAFE |
| K4 | Alt-теги на всех изображениях — сверить, что нет `alt=«1»`, `alt=«2»` (Explore сказал что осмысленные, но перепроверить) | ТЗ §15.2 | 🔴 TODO SAFE (проверка) |
| K5 | `knowledge-base/cases.md` — скелет для 3 кейсов с TODO-маркерами | KB inventory | 🔴 TODO SAFE |

## 7. Не трогаем (Type B — intentional scope shift)

| # | Что | Причина |
|---|-----|---------|
| B1 | 7 сегментов вместо 5 (брендбуковые маскоты) | Intentional — проект пошёл по брендбуку, а не по ТЗ v1.0 |
| B2 | 7 карточек продуктов на главной (вместо 4 по ТЗ) | Добавлены БаблПак и Термокружки — confirmed в KB |
| B3 | 2 экстра-блока SHOCK на главной | Допустимое enhancement, ключевой продукт |

## 8. Приоритет выполнения (текущая сессия)

**Волна 1 — сейчас** (без материалов Камиля):

1. ✅ Solutions Patch (C1+C2+C3+H1+H2+M1+M3) — готовый diff, применяем блоком
2. ✅ Блок «Кейсы» на главной + страница `/cases/` (скелет, TODO для Камиля)
3. ✅ Блок «Брендирование» на главной (фото из `img/`, CTA → /branding/)
4. ✅ Solution pages: блоки «Проблема» и «Документы» (скелет на всех 7)
5. ✅ SEO: `sitemap.xml`, `robots.txt`, `og:image` на hero, twitter:card, per-page title/description через JS
6. ✅ Counter count-up и form slide-in анимации
7. ✅ Copyright 2024-2026 → 2026
8. ✅ `knowledge-base/cases.md` скелет
9. ✅ Отчёт `04_final/00_RELEASE_NOTES.md`

**Волна 2 — когда Камиль загрузит материалы** (в `01_source_materials/`):

10. ⏳ Реальные логотипы клиентов → `img/client-logos/*.svg`
11. ⏳ PDF-сертификаты → `assets/docs/*.pdf`, подшиваем в solution pages и карточки продуктов
12. ⏳ Фото производства → оптимизация в WebP → `img/production/`
13. ⏳ Фото команды → `img/team/`
14. ⏳ Тексты кейсов с цифрами → `/cases/` реальный контент + `knowledge-base/cases.md`
15. ⏳ Реальный брендбуковый `og:image` → заменить placeholder
16. 🟢 **APPLIED** Packshot продукции → `img/products/` (2026-04-16: 93 alt-ракурса + 129 WebP, `_gallery-map.json` для 36 SKU; GAP-I01 закрыт)

**Волна 3 — после бизнес-решений Камиля:**

17. 🔵 CRM Bitrix24 webhook → интеграция форм
18. 🔵 WhatsApp номер → виджет + sticky CTA
19. 🔵 `/payment/` страница
20. 🔵 «Заказать образцы» CTA + бизнес-процесс

---

## Волна 4 — Canonical PDP (2026-04-16) — APPLIED

21. 🟢 **APPLIED** Master-template v3 для PDP (sliding indicator, ARIA, landmarks, focus-visible, reduced-motion, type=button)
22. 🟢 **APPLIED** 5 canonical PDP наполнены из vault: SHOCK / Термопакет PRO / LinerBox / БаблПак / Термошоппер
23. 🟢 **APPLIED** Gallery-map.json подключён к hero-thumbs (реальные ракурсы каждого SKU × mode/size)
24. 🟢 **APPLIED** Консолидация: одна версия сайта, без `-beta/-v2/-demo`, старые в `products/_archive/`
25. 🟢 **APPLIED** `PRODUCT_REDIRECTS` в navigateTo() — 28 старых SPA-маршрутов редиректят на canonical HTML
26. 🟢 **APPLIED** `sitemap.xml` — 5 новых PDP как HTML-URL

## Открытые блокеры Волны 5 (ждут клиента)

27. 🟡 Реальные цены → заменить `base:0` («По запросу») на цифры в PRICE_MATRIX 5 PDP
28. 🟡 Реальные отзывы с именами/компаниями → сейчас анонимные (согласие в процессе)
29. 🟡 Видео-руководство по сборке LinerBox → упомянуто в FAQ#3 как TODO
30. 🟡 Вес изделия (wt) → в PRICE_MATRIX у ряда SKU стоит `TODO` (LinerBox, Термошоппер, БаблПак)
31. 🟡 Позиционирование БаблПак → на карточке info-плашка «Предварительная карточка. Позиционирование уточняется»
32. 🟡 4-й use case БаблПак → пометка `TODO: уточнить у клиента`
33. 🟡 FAQ «Как стирать термошоппер» → ответ «уточняйте у менеджера»
34. 🟡 FAQ «Как утилизировать БаблПак» → TODO у Камиля
35. 🟡 `og:image` для 5 PDP — сейчас fallback, нужны брендированные 1200×630
