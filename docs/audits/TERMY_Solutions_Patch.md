# TERMY | Solutions Patch Document
> Cross Analysis → Patch Mode
> Scope: ТОЛЬКО раздел Solutions (хаб, solution pages, карточки решений на главной, routing)

---

## 1. Вердикт

**МОЖНО** патчить. Все 7 solution pages существуют, маршруты в роутере прописаны, product mapping корректен по KB. Проблемы — на уровне главной (5 карточек вместо 7, битые маршруты, некорректные сегменты) и косметика (маскот-лейблы, фарма-wording).

---

## 2. Список правок

### CRITICAL

| # | Проблема | Описание |
|---|----------|----------|
| C1 | **Главная: 5 карточек решений вместо 7** | Карточки: Доставка еды, Ритейл, Дистрибьюторы, Производители, Фарма. Из них 3 (Ритейл, Дистрибьюторы, Производители) НЕ соответствуют 7 сегментам брендбука и ведут на fallback-страницы |
| C2 | **Битые маршруты** | `/solutions/dostavka/` → alias на p-sol-kurer; `/solutions/retail/` → alias на p-sol-onlayn-magaziny; `/solutions/distributory/` → fallback на p-solutions; `/solutions/proizvoditeli/` → fallback на p-solutions |
| C3 | **Маршруты с главной не каноничные** | Главная ведёт по 4 alias-маршрутам вместо прямых каноничных маршрутов |

### HIGH

| # | Проблема | Описание |
|---|----------|----------|
| H1 | **Фарма-карточка на главной: overstatement** | Текст: "Контроль холодовой цепи +2…+8°C". KB: "Медицинский сегмент документально не закрыт". Формулировка создаёт впечатление полной мед. регуляторики |
| H2 | **Главная: grid g3 не вмещает 7 карточек** | Сейчас `grid g3` (3 колонки), нужен `grid g4` для 7 карточек (4+3) или иной layout |

### MEDIUM

| # | Проблема | Описание |
|---|----------|----------|
| M1 | **Маскот-лейблы: "mascot_N →"** | Все 7 solution pages имеют h3 формата `mascot_N → Сегмент`. По брендбуку: `Персонаж 0N — Сегмент` |
| M2 | **Маскот-описания generic** | Все 7 sol-mascot блоков имеют абстрактные описания. Можно уточнить по KB |
| M3 | **Старые alias-маршруты в роутере** | После патча: alias'ы /solutions/dostavka/, /solutions/retail/ и т.д. можно удалить из router и navKeys |
| M4 | **info-note идентичен на всех 7 pages** | Один и тот же текст про комбинирование. Можно оставить, но не критично |

---

## 3. Patch-таблица

### CRITICAL PATCHES

#### C1 + C2 + C3: Заменить 5 карточек решений на главной на 7 карточек по брендбуку

**Route:** Homepage (`#p-home`)
**Block:** Секция "Отраслевые решения" (line 582–611)
**Element:** `<div class="grid g3" data-a>` с 5 карточками `<a class="card">`

| Поле | Current | Fix | Type |
|------|---------|-----|------|
| Grid class | `grid g3` | `grid g4` | replace |
| Кол-во карточек | 5 (Доставка, Ритейл, Дистрибьюторы, Производители, Фарма) | 7 (все по брендбуку) | replace |

**Детальная замена 5 карточек → 7 карточек:**

| # | Current card | Fix card | Route current → fix | Type |
|---|-------------|----------|---------------------|------|
| 1 | Доставка еды → `/solutions/dostavka/` | Онлайн-магазины продуктов → `/solutions/onlayn-magaziny/` | replace route + text |
| 2 | Ритейл → `/solutions/retail/` | Курьер / служба доставки → `/solutions/kurer/` | replace route + text |
| 3 | Дистрибьюторы → `/solutions/distributory/` | Кейтеринг / мероприятия → `/solutions/kejtering/` | replace route + text |
| 4 | Производители → `/solutions/proizvoditeli/` | Фермер / локальные продукты → `/solutions/fermer/` | replace route + text |
| 5 | Фармацевтика → `/solutions/farma/` | Фарма / медицина → `/solutions/farma/` | replace text only |
| 6 | — | Мясник / мясное производство → `/solutions/myasnik/` | add |
| 7 | — | Шеф-повар / ресторан → `/solutions/shef-restoran/` | add |

**Полная спецификация каждой карточки:**

**Карточка 1 (NEW):**
- route: `/solutions/onlayn-magaziny/`
- label: `Онлайн-магазины продуктов`
- title: `Сборка заказов с сохранением температуры`
- text: `Standart / PRO, Termy SHOCK®, LinerBox® и термошопперы для сценариев e-grocery и dark store.`
- image: mascot_1.svg (с фиолетовым gradient bg как на хабе)

**Карточка 2 (NEW):**
- route: `/solutions/kurer/`
- label: `Курьер / служба доставки`
- title: `Компактная и стабильная доставка на маршруте`
- text: `Standart / PRO, Termy SHOCK®, термошопперы и компактные форматы с zip-lock или клеевым клапаном.`
- image: mascot_2.svg

**Карточка 3 (NEW):**
- route: `/solutions/kejtering/`
- label: `Кейтеринг / мероприятия`
- title: `Выездные события, банкетные позиции и сетовые выдачи`
- text: `PRO, LinerBox®, Termy SHOCK® и термошопперы для партий, которые нужно довезти без смысловых фокусов.`
- image: mascot_3.svg

**Карточка 4 (NEW):**
- route: `/solutions/fermer/`
- label: `Фермер / локальные продукты`
- title: `Локальные поставки и деликатные вложения`
- text: `Light / Standart, Termy SHOCK®, термошопперы и БаблПак для аккуратной локальной доставки.`
- image: mascot_4.svg

**Карточка 5 (FIX text):**
- route: `/solutions/farma/` (OK)
- label: `Фарма / медицина` (was: Фармацевтика)
- title: `Сценарии холодовой цепи с осторожным wording` (was: Контроль холодовой цепи +2…+8°C)
- text: `Termy SHOCK®, термопакеты и LinerBox® для сценариев, где важна аккуратная работа с температурой и документами.` (was: Протоколы испытаний. Пищевой гель — безопасен при протечке)
- image: mascot_5.svg

**Карточка 6 (ADD):**
- route: `/solutions/myasnik/`
- label: `Мясник / мясное производство`
- title: `Охлаждённые и замороженные мясные отправки`
- text: `PRO / Standart, Termy SHOCK® и LinerBox® для сырья, полуфабрикатов и производственных отгрузок.`
- image: mascot_6.svg

**Карточка 7 (ADD):**
- route: `/solutions/shef-restoran/`
- label: `Шеф-повар / ресторан`
- title: `Доставка блюд, заготовок и гастрономических заказов`
- text: `Standart / PRO, термошопперы и Termy SHOCK® для холодных сценариев ресторанной доставки.`
- image: mascot_7.svg

---

### HIGH PATCHES

#### H1: Фарма wording на главной

**Route:** Homepage (`#p-home`)
**Block:** Карточка фармы в секции "Отраслевые решения" (line 605–609)
**Element:** `.card__tl` и `.card__tx`

| Поле | Current | Fix | Type |
|------|---------|-----|------|
| `.card__lbl` | Фармацевтика | Фарма / медицина | replace |
| `.card__tl` | Контроль холодовой цепи +2…+8°C | Сценарии холодовой цепи с осторожным wording | replace |
| `.card__tx` | Протоколы испытаний. Пищевой гель — безопасен при протечке | Termy SHOCK®, термопакеты и LinerBox® для сценариев, где важна аккуратная работа с температурой и документами. | replace |

**Причина:** KB раздел 6.4: "РУ Росздравнадзора — Не обещать наличие", "ЕАЭС-документ — Не обещать наличие". Формулировка "Контроль холодовой цепи" создаёт впечатление закрытого медрегуляторного сегмента.

#### H2: Grid layout

**Route:** Homepage (`#p-home`)
**Block:** Секция "Отраслевые решения" (line 584)
**Element:** `<div class="grid g3" data-a>`

| Current | Fix | Type |
|---------|-----|------|
| `class="grid g3"` | `class="grid g4"` | replace |

**Причина:** 7 карточек в grid g3 (3 колонки) → первый ряд 4, второй ряд 3. Grid g4 обеспечит корректную раскладку.

---

### MEDIUM PATCHES

#### M1: Маскот-лейблы

**Route:** Все 7 solution pages
**Block:** `.sol-mascot` → `h3`
**Element:** `<h3>` внутри `.sol-mascot__bd`

| Page | Line | Current | Fix | Type |
|------|------|---------|-----|------|
| p-sol-onlayn-magaziny | 1697 | `mascot_1 → Онлайн-магазины продуктов` | `Персонаж 01 — Онлайн-магазины продуктов` | replace |
| p-sol-kurer | 1781 | `mascot_2 → Курьер / служба доставки` | `Персонаж 02 — Курьер / служба доставки` | replace |
| p-sol-kejtering | 1865 | `mascot_3 → Кейтеринг / мероприятия` | `Персонаж 03 — Кейтеринг / мероприятия` | replace |
| p-sol-fermer | 1949 | `mascot_4 → Фермер / локальные продукты` | `Персонаж 04 — Фермер / локальные продукты` | replace |
| p-sol-farma | 2033 | `mascot_5 → Фарма / медицина` | `Персонаж 05 — Фарма / медицина` | replace |
| p-sol-myasnik | 2115 | `mascot_6 → Мясник / мясное производство` | `Персонаж 06 — Мясник / мясное производство` | replace |
| p-sol-shef-restoran | 2195 | `mascot_7 → Шеф-повар / ресторан` | `Персонаж 07 — Шеф-повар / ресторан` | replace |

Также исправить alt-атрибуты img с `mascot_N →` на `Персонаж 0N —`.

#### M2: Маскот-описания (герой брендбука label)

**Route:** Все 7 solution pages
**Block:** `.sol-mascot` → `.label`
**Element:** `<div class="label mb1">Герой брендбука</div>`

Оставить без изменений — "Герой брендбука" — корректная формулировка.

#### M3: Очистка alias-маршрутов в роутере

**Route:** JavaScript router (line 2680–2683)
**Block:** `const routes = { ... }`
**Element:** 4 alias-маршрута

| Line | Current | Fix | Type |
|------|---------|-----|------|
| 2680 | `'/solutions/dostavka/': 'p-sol-kurer',` | удалить | remove |
| 2681 | `'/solutions/retail/': 'p-sol-onlayn-magaziny',` | удалить | remove |
| 2682 | `'/solutions/distributory/': 'p-solutions',` | удалить | remove |
| 2683 | `'/solutions/proizvoditeli/': 'p-solutions',` | удалить | remove |

Также очистить navKeys (line 2693) — удалить эти 4 маршрута из массива `sol`.

**Route:** JavaScript navKeys (line 2693)
**Block:** `navKeys.sol`
**Element:** массив маршрутов

| Current (в массиве) | Fix | Type |
|---------------------|-----|------|
| `'/solutions/dostavka/'` | удалить | remove |
| `'/solutions/retail/'` | удалить | remove |
| `'/solutions/distributory/'` | удалить | remove |
| `'/solutions/proizvoditeli/'` | удалить | remove |

---

## 4. Битые маршруты и их исправление

### Текущее состояние маршрутов

| Маршрут | Где используется | Куда ведёт сейчас | Проблема |
|---------|-----------------|-------------------|----------|
| `/solutions/dostavka/` | Главная (line 585) | alias → p-sol-kurer | Не каноничный, label несовместим |
| `/solutions/retail/` | Главная (line 590) | alias → p-sol-onlayn-magaziny | Не каноничный, label несовместим |
| `/solutions/distributory/` | Главная (line 595) | fallback → p-solutions (хаб) | Своей страницы нет |
| `/solutions/proizvoditeli/` | Главная (line 600) | fallback → p-solutions (хаб) | Своей страницы нет |

### Каноничные маршруты (все 7)

| # | Маршрут | Page ID | Статус |
|---|---------|---------|--------|
| 1 | `/solutions/onlayn-magaziny/` | p-sol-onlayn-magaziny | OK — в роутере (line 2673) |
| 2 | `/solutions/kurer/` | p-sol-kurer | OK — в роутере (line 2674) |
| 3 | `/solutions/kejtering/` | p-sol-kejtering | OK — в роутере (line 2675) |
| 4 | `/solutions/fermer/` | p-sol-fermer | OK — в роутере (line 2676) |
| 5 | `/solutions/farma/` | p-sol-farma | OK — в роутере (line 2677) |
| 6 | `/solutions/myasnik/` | p-sol-myasnik | OK — в роутере (line 2678) |
| 7 | `/solutions/shef-restoran/` | p-sol-shef-restoran | OK — в роутере (line 2679) |

### План исправления

1. **Главная** — заменить 5 карточек на 7 с каноничными маршрутами (см. C1)
2. **Роутер** — удалить 4 alias-маршрута (см. M3)
3. **navKeys** — очистить массив sol от alias'ов (см. M3)
4. **Solutions Hub** — без изменений (уже 7 корректных карточек)
5. **Footer** — без изменений (уже 7 корректных ссылок, lines 2617–2623)

---

## 5. Верификация product mapping

### KB vs Site — product mapping по solution pages

| Сегмент | KB | Сайт | Статус |
|---------|-----|------|--------|
| Онлайн-магазины | Standart/PRO, SHOCK®, LinerBox®, термошопперы | Standart/PRO, SHOCK®, LinerBox®, термошопперы | OK |
| Курьер | Standart/PRO, SHOCK®, термошопперы, zip-lock/клапан | Standart/PRO, SHOCK®, термошопперы, Zip-lock/клапан | OK |
| Кейтеринг | PRO, LinerBox®, SHOCK®, термошопперы | PRO, LinerBox®, SHOCK®, термошопперы | OK |
| Фермер | Light/Standart, SHOCK®, термошопперы, БаблПак | Light/Standart, SHOCK®, термошопперы, БаблПак | OK |
| Фарма | SHOCK®, Standart/PRO, LinerBox® | SHOCK®, Standart/PRO, LinerBox® | OK |
| Мясник | PRO/Standart, SHOCK®, LinerBox® | PRO/Standart, SHOCK®, LinerBox® | OK |
| Шеф-повар | Standart/PRO, термошопперы, SHOCK®, термокружки | Standart/PRO, термошопперы, SHOCK®, термокружки | OK |

**Вердикт: product mapping на всех 7 solution pages полностью соответствует KB. Правки не требуются.**

---

## 6. Что НЕ трогаем (out of scope)

- Страница SHOCK® (product page) — вне scope
- Страница термопакетов (product page) — вне scope
- Trust strip "от 49₽" — вне scope
- Брендирование "от 100 шт" — вне scope
- 6-шаговый гид (порядок шагов) — вне scope
- Плейсхолдеры логотипов клиентов — вне scope
- Плейсхолдер "Фотографии производства" — вне scope
- ISO 9001 / certificates — вне scope

---

## 7. Контрольный чек-лист после патча

- [ ] Главная показывает 7 карточек решений
- [ ] Все 7 карточек ведут по каноничным маршрутам
- [ ] Grid g4 корректно раскладывает 7 карточек (4+3)
- [ ] Фарма-карточка не содержит overstatement
- [ ] Роутер не содержит alias-маршрутов
- [ ] navKeys.sol содержит только 7 каноничных маршрутов + хаб
- [ ] Маскот-лейблы на solution pages: "Персонаж 0N —"
- [ ] Solutions hub (p-solutions) не изменён (уже корректен)
- [ ] Footer не изменён (уже корректен)
- [ ] Product mapping на solution pages не изменён (уже корректен)
