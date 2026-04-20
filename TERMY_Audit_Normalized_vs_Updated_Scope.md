# TERMY | Audit Normalized vs Updated Scope

> Входной документ: TERMY_Site_Structure_Compliance_Audit.md
> Master-ТЗ: ТЗ_на_лучший_B2B_сайт_TERMY_2026 (1).docx
> Текущий scope: 7 brandbook-native solutions (per termy-brandbook-ru)

---

## 1. Verdict

Из 19 замечаний аудита:
- **8 = Type A (real defect)** — чинить независимо от scope
- **5 = Type B (outdated spec conflict)** — ТЗ устарело, сайт следует новому направлению
- **6 = Type C (needs product decision)** — нельзя чинить без решения заказчика

---

## 2. Scope Conflict Summary

Master-ТЗ (v1.0, апрель 2026) зафиксировало 5 отраслевых сегментов на основе бизнес-аудита:
1. Доставка еды
2. Ритейл
3. Дистрибьюторы
4. Производители
5. Фарма

Позднее проект сместился на **7 брендбуковых сегментов** (по termy-brandbook-ru):
1. Онлайн-магазины продуктов
2. Курьер / служба доставки
3. Кейтеринг / мероприятия
4. Фермер / локальные продукты
5. Фарма / медицина
6. Мясник / мясное производство
7. Шеф-повар / ресторан

Это **intentional direction shift**, а не ошибка разработки. ТЗ раздел 20.2 пункт 3 прямо фиксирует: «Финальный список 5 отраслей — ожидает подтверждения руководства». Решение не было принято → проект пошёл по брендбуку.

---

## 3. Полная классификация замечаний

### Type A — Real Defect (чинить независимо от scope)

| # | Замечание | Почему real defect |
|---|----------|-------------------|
| A1 | **Нет /cases/ страницы** | ТЗ: Wave 1 P1. Обоснование: Trust Stack уровни 2+4. Даже при смене scope кейсы остаются обязательным B2B-элементом. Без кейсов конверсия не работает. |
| A2 | **Нет блока «Кейсы» на homepage** | ТЗ: блок 5 из 7. Homepage без social proof нарушает логику Боль→Решение→Доказательство→CTA. Не зависит от scope. |
| A3 | **Нет блока «Брендирование» на homepage** | ТЗ: блок 6 из 7. Брендирование — подтверждённый раздел в обоих scope. Его отсутствие на главной = потеря конверсии. |
| A4 | **Формы mock** — не отправляют в CRM | ТЗ: Bitrix24 интеграция P1. Без работающих форм сайт не генерирует лиды. Главная цель сайта не выполняется. |
| A5 | **Solution pages: нет блока «Проблема»** | ТЗ: шаблон блок 2. Логика PAS (Problem→Agitate→Solve) не работает без блока проблемы. Не зависит от 5 vs 7 сегментов. |
| A6 | **Solution pages: нет блока «Документы»** | ТЗ: шаблон блок 6. Сертификаты/протоколы — обязательный trust-элемент для B2B. Не зависит от scope. |
| A7 | **Нет PDF-спецификаций для скачивания** | ТЗ: Trust Stack уровень 3, карточка товара. Ноль документов. B2B-клиент не может скачать ничего. |
| A8 | **Логотипы клиентов — placeholder** | ТЗ: Trust Stack уровень 1. Homepage «Почему мы» показывает пустые блоки вместо логотипов. |

### Type B — Outdated Spec Conflict (НЕ дефект, shift scope)

| # | Замечание | Почему НЕ дефект |
|---|----------|-----------------|
| B1 | **5 solutions по ТЗ vs 7 на сайте** | ТЗ: раздел 20.2 пункт 3 — «Финальный список отраслей ожидает подтверждения». Проект пошёл по брендбуку (7 сегментов). Это intentional. |
| B2 | **Нет /solutions/dostavka/, /retail/, /distributory/, /proizvoditeli/** | Заменены на 7 brandbook-native routes. Старые slug из ТЗ неактуальны. |
| B3 | **Homepage: 7 solution cards вместо 5** | Следствие B1. Карточки соответствуют текущим 7 сегментам. |
| B4 | **Homepage: 7 product cards вместо 4** | ТЗ предполагало 4 категории (термопакеты, SHOCK, LinerBox, термошопперы). Сайт добавил БаблПак и Термокружки — confirmed в KB. Расширение scope, не ошибка. |
| B5 | **2 SHOCK-тизера на homepage** | Не в ТЗ, но не нарушают структуру. SHOCK — ключевой продукт. Допустимое enhancement. |

### Type C — Needs Product Decision

| # | Замечание | Какое решение нужно |
|---|----------|-------------------|
| C1 | **Нет WhatsApp CTA** | ТЗ требует. Но нужен реальный WhatsApp-номер и подтверждение, что менеджеры отвечают. Решение: раздел 20.2 пункт 8 ТЗ. |
| C2 | **Нет SKU-level URL** (/products/[category]/[sku]/) | ТЗ требует ~30 карточек. Текущая SPA-архитектура не предполагает отдельные URL per SKU. Нужно решение: tabs vs full pages vs dynamic routing. |
| C3 | **Нет /payment/** | ТЗ: Wave 1 вторичная навигация. Условия оплаты частично на /delivery/. Нужно решение: отдельная страница или объединить с delivery. |
| C4 | **CTA «Заказать образцы»** отсутствует | ТЗ: secondary CTA. Нужно бизнес-решение: предоставляются ли образцы бесплатно, и если да — через какую форму. |
| C5 | **Schema markup отсутствует** | ТЗ: раздел 15.2. В SPA реализация schema требует либо SSR, либо JSON-LD injection per page. Архитектурное решение. |
| C6 | **Фото производства — placeholder** | ТЗ: раздел 12.4 — «обязательные 70+ кадров». Фотосессия не проведена (ТЗ: раздел 19.1 пункт 3). Нужен контент, а не код. |

---

## 4. Solutions Structure: 5 vs 7 — Детальный разбор

### Что требует ТЗ (раздел 4 + 8.1 + 11)
5 сегментов, привязанных к B2B-аудитории:

| # | Сегмент | ЛПР | Ключевой оффер | URL |
|---|---------|-----|---------------|-----|
| 1 | Службы доставки еды | Операционный директор | Гарантия прочности, замена партии | /solutions/dostavka/ |
| 2 | Крупный ритейл | Категорийный закупщик | Рост продаж категории до 15% | /solutions/retail/ |
| 3 | Дистрибьюторы | Собственник/комдир | Эксклюзивный склад, поставка 24ч | /solutions/distributory/ |
| 4 | Производители | Руководитель логистики | Страхование партии | /solutions/proizvoditeli/ |
| 5 | Фарма | Специалист по качеству | Протоколы, compliance, +2…+8°C | /solutions/farma/ |

### Что требует новый scope (брендбук)
7 сегментов, привязанных к маскотам:

| # | Сегмент | Маскот | URL |
|---|---------|--------|-----|
| 1 | Онлайн-магазины | Персонаж 01 | /solutions/onlayn-magaziny/ |
| 2 | Курьер | Персонаж 02 | /solutions/kurer/ |
| 3 | Кейтеринг | Персонаж 03 | /solutions/kejtering/ |
| 4 | Фермер | Персонаж 04 | /solutions/fermer/ |
| 5 | Фарма | Персонаж 05 | /solutions/farma/ |
| 6 | Мясник | Персонаж 06 | /solutions/myasnik/ |
| 7 | Шеф-повар | Персонаж 07 | /solutions/shef-restoran/ |

### Что на сайте сейчас
7 сегментов по брендбуку. ✅ Полностью соответствует новому scope.

### Verdict по solutions
- **Количество сегментов (5→7)**: Type B — intentional scope shift, NOT a defect.
- **Шаблон solution page (3/7 блоков)**: Type A — real defect. Блоки «Проблема», «Кейс», «Документы» отсутствуют НЕЗАВИСИМО от того, 5 или 7 сегментов. Шаблон должен быть полным на любом количестве страниц.
- **Маскоты вместо бизнес-ЛПР**: Type C — needs decision. ТЗ строит страницы вокруг ЛПР и бизнес-болей. Сайт строит вокруг маскотов и продуктовых сценариев. Это два разных подхода, выбор за заказчиком.

---

## 5. Critical Items — Fix Regardless of Scope

| # | Item | Type | Why critical |
|---|------|------|-------------|
| 1 | /cases/ page | A1 | B2B trust = 0 без кейсов |
| 2 | Cases block on homepage | A2 | Homepage воронка разорвана |
| 3 | Branding block on homepage | A3 | Дифференциация не продвигается |
| 4 | Forms → CRM integration | A4 | Лиды теряются |
| 5 | Solution pages: Problem block | A5 | PAS-логика не работает |
| 6 | Solution pages: Documents block | A6 | B2B без документов не конвертит |
| 7 | PDF downloads | A7 | Нечего скачать |
| 8 | Client logos (real, not placeholder) | A8 | Trust Stack level 1 пустой |

---

## 6. Items NOT to Fix Until Scope Re-Approved

| # | Item | Type | Why wait |
|---|------|------|---------|
| 1 | 5 vs 7 solutions | B1 | Intentional scope shift |
| 2 | Old solution slugs | B2 | Replaced by brandbook routes |
| 3 | 7 vs 5 solution cards on homepage | B3 | Follows current scope |
| 4 | 7 vs 4 product cards on homepage | B4 | Follows KB-confirmed products |
| 5 | Extra SHOCK blocks on homepage | B5 | Not harmful |

---

## 7. Items Needing Product Decision Before Fix

| # | Item | Type | Decision needed |
|---|------|------|----------------|
| 1 | WhatsApp CTA | C1 | Номер + готовность менеджеров |
| 2 | SKU-level URLs | C2 | SPA tabs vs full pages |
| 3 | /payment/ page | C3 | Отдельная или часть /delivery/ |
| 4 | «Заказать образцы» CTA | C4 | Бизнес-процесс образцов |
| 5 | Schema markup | C5 | SSR vs JSON-LD injection |
| 6 | Production photos | C6 | Фотосессия не проведена |

---

## 8. Final Prioritized Action List

### Fix Now (Type A — real defects, no scope dependency)
1. **Добавить /cases/** — даже с placeholder-кейсами, структура страницы обязательна
2. **Добавить блок «Кейсы» на homepage** — между Продукцией и финальным CTA
3. **Добавить блок «Брендирование» на homepage** — фото + CTA → /branding/
4. **Solution pages: добавить блок «Проблема»** — 3-4 боли сегмента
5. **Solution pages: добавить блок «Документы»** — ссылки на сертификаты
6. **Интегрировать формы** — хотя бы email-отправка, идеально CRM
7. **Добавить PDF-документы** для скачивания (ТУ, ГОСТ, протокол)
8. **Заменить placeholder логотипов** реальными (с подтверждением прав)

### Fix After Scope Approval (Type B — ждёт подтверждения направления)
9. Re-align solution segments (5 vs 7) — only if заказчик решит вернуться к 5
10. Adjust homepage cards count — only if scope меняется

### Fix After Product Decision (Type C)
11. WhatsApp CTA — после подтверждения номера
12. SKU-level URL — после архитектурного решения
13. /payment/ page — после решения о структуре
14. «Заказать образцы» — после бизнес-решения
15. Schema markup — после выбора подхода (SSR/JSON-LD)
16. Production photos — после фотосессии
