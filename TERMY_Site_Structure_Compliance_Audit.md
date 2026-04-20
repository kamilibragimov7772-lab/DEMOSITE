# TERMY | Site Structure Compliance Audit vs Master ТЗ (v2)
> Источник: ТЗ_на_лучший_B2B_сайт_TERMY_2026 (1).docx — Version 1.0, April 2026

## 1. Verdict

**Частично соответствует (≈55%).**

Сайт корректно реализует B2B lead-gen модель, продуктовый каталог и CTA-систему. Но 4 из 5 отраслевых страниц Wave 1 отсутствуют (заменены на 7 брендбуковых сегментов), /cases/ не реализован, homepage имеет 8 блоков вместо 7 по ТЗ (нет кейсов и брендирования, добавлены 2 SHOCK-тизера). Карточки товаров упрощены vs ТЗ.

---

## 2. Audit Scope

- **Эталон**: ТЗ_на_лучший_B2B_сайт_TERMY_2026 (41KB, 28K символов)
- **Проверено**: 28 routes, 27 pages, header/footer nav, homepage 8 sections, product/solution architecture, forms, CTA hierarchy

---

## 3. Навигация (ТЗ раздел 7)

### Главная навигация (1-й уровень)

| ТЗ | URL по ТЗ | На сайте | Статус |
|----|-----------|----------|--------|
| Решения | /solutions/ | ✅ /solutions/ | Match |
| Продукция | /products/ | ✅ /products/ | Match |
| Брендирование | /branding/ | ✅ /branding/ | Match |
| **Кейсы** | **/cases/** | ❌ Нет | **Missing (Critical)** |
| О производстве | /about/ | ✅ /about/ | Match |
| Контакты | /contacts/ | ✅ /contacts/ | Match |

### Вторичная навигация

| ТЗ | URL по ТЗ | На сайте | Статус |
|----|-----------|----------|--------|
| Доставка и условия | /delivery/ | ✅ /delivery/ | Match |
| **Оплата для юрлиц** | **/payment/** | ❌ Нет | **Missing (Wave 1)** |
| Блог | /blog/ | ❌ Нет | Missing (Wave 2 — OK) |
| FAQ | /faq/ | ✅ /faq/ | Match |
| Розница | /retail/ | ❌ Нет | Missing (Wave 2 — OK) |

---

## 4. Волна 1 — страницы к запуску (ТЗ раздел 8.1)

| Тип | Страница по ТЗ | URL по ТЗ | На сайте | Статус |
|-----|----------------|-----------|----------|--------|
| Главная | Главная | / | ✅ | Match |
| Решения | Для доставки еды | /solutions/dostavka/ | ❌ → /solutions/kurer/ | **Replaced** |
| Решения | Для ритейла | /solutions/retail/ | ❌ → /solutions/onlayn-magaziny/ | **Replaced** |
| Решения | Для дистрибьюторов | /solutions/distributory/ | ❌ Нет аналога | **Missing** |
| Решения | Для производителей | /solutions/proizvoditeli/ | ❌ Нет аналога | **Missing** |
| Решения | Для фармацевтики | /solutions/farma/ | ✅ /solutions/farma/ | Match |
| Каталог | Термопакеты | /products/termopakety/ | ✅ /products/termopackety/ | Match (slug differs) |
| Каталог | Аккумуляторы SHOCK | /products/akkumulyatory-holoda/ | ✅ + 3 sub-pages | Match (enhanced) |
| Каталог | Термокороба LinerBox | /products/termokoroba/ | ✅ | Match |
| Каталог | Термошопперы | /products/termoshoppery/ | ✅ | Match |
| Каталог | Карточки товаров (~30 SKU) | /products/[category]/[sku]/ | ⚠️ Нет SKU-level URL | **Simplified** |
| Брендирование | Ваш дизайн | /branding/ | ✅ | Match |
| **Кейсы** | **Страница кейсов** | **/cases/** | ❌ | **Missing (Critical)** |
| О компании | О производстве | /about/ | ✅ | Match |
| Сервис | Доставка | /delivery/ | ✅ | Match |
| Сервис | Контакты | /contacts/ | ✅ | Match |
| Сервис | FAQ | /faq/ | ✅ | Match |

**Итог Wave 1: 11 из 17 страниц реализованы (65%). 4 solutions заменены, /cases/ и /payment/ отсутствуют.**

---

## 5. Волна 2 (ТЗ раздел 8.2)

| Страница по ТЗ | URL по ТЗ | На сайте | Статус |
|----------------|-----------|----------|--------|
| БаблПак | /products/bubblepack/ | ✅ /products/bubblpak/ | Implemented early |
| Распродажа (термосы) | /products/sale/ | ❌ | Not implemented |
| Блог | /blog/[slug]/ | ❌ | Not implemented |
| Оплата | /payment/ | ❌ | Not implemented |
| Розница | /retail/ | ❌ | Not implemented |
| Калькулятор | /calculator/ | ❌ | Not implemented |
| Карты термозащиты | /thermomap/ | ❌ | Not implemented |

**Сайт также реализовал НЕ из ТЗ**: термокружки (hub + 2 sub-pages), 7 solutions вместо 5, SHOCK mode sub-pages.

---

## 6. Главная страница (ТЗ раздел 9)

ТЗ требует **7 блоков**. Сайт имеет **8 блоков**.

| # | Блок по ТЗ | На сайте | Статус |
|---|-----------|----------|--------|
| 1 | Hero + Proof-bar (VP + «от 49₽», MOQ, отгрузка, брендирование) | ✅ Hero + trust strip (5 метрик) | **Match** |
| 2 | Почему TERMY (3-4 аргумента + логотипы клиентов) | ✅ «Почему мы» (4 карточки + placeholder логотипов) | **Partial** — логотипы placeholder |
| 3 | Решения по отраслям (5 карточек → отраслевые) | ✅ 7 карточек с маскотами | **Modified** — 7 vs 5 |
| 4 | Продукция (4 категории) | ✅ 7 карточек (grid g4) | **Modified** — 7 vs 4 |
| 5 | **Кейсы и доказательства** (2-3 кейса + ссылка /cases/) | ❌ **MISSING** | **Critical** |
| 6 | **Брендирование** (фото + CTA «Узнать про нанесение логотипа») | ❌ **MISSING** | **High** |
| 7 | Финальный CTA (форма ≤4 поля + телефон + WhatsApp) | ✅ CTA форма | **Partial** — нет WhatsApp |
| — | SHOCK® teaser (3 температурных режима) | Extra — нет в ТЗ | Extra |
| — | SHOCK® color markers (брендбук визуал) | Extra — нет в ТЗ | Extra |

---

## 7. Отраслевые страницы (ТЗ раздел 11)

### Сегменты

| ТЗ (5 сегментов) | Сайт (7 сегментов) | Совпадение |
|------------------|--------------------|-----------|
| Доставка еды | Курьер / служба доставки | Partial |
| Ритейл | Онлайн-магазины продуктов | Partial |
| Дистрибьюторы | — | ❌ Missing |
| Производители | — | ❌ Missing |
| Фарма | Фарма / медицина | ✅ Match |
| — | Кейтеринг / мероприятия | Extra |
| — | Фермер / локальные продукты | Extra |
| — | Мясник / мясное производство | Extra |
| — | Шеф-повар / ресторан | Extra |

### Шаблон отраслевой страницы

| Блок по ТЗ | На сайте | Статус |
|-----------|----------|--------|
| 1. Hero с болью сегмента | ✅ Hero + breadcrumbs + h1 + описание | Match |
| 2. **Проблема** (3-4 боли с цифрами) | ❌ Нет блока проблем | **Missing (High)** |
| 3. Решение TERMY | ⚠️ 2 карточки подхода/логики | Partial |
| 4. **Кейс** (реальная история с цифрами) | ❌ Нет кейсов | **Missing (High)** |
| 5. Рекомендуемые продукты | ✅ 4 карточки продуктов | Match |
| 6. **Документы** (сертификаты, PDF) | ❌ Нет блока документов | **Missing (Medium)** |
| 7. CTA | ✅ Форма запроса | Match |

**Итог: 3 из 7 блоков шаблона реализованы (43%).**

---

## 8. Карточки товаров (ТЗ раздел 10.2)

| Элемент по ТЗ | На сайте | Статус |
|---------------|----------|--------|
| Фото (packshot + ракурсы) | ⚠️ 1 фото или placeholder | Partial |
| Название (серия + размер + состав) | ✅ | Match |
| Цена «от XX ₽/шт» | ⚠️ Только на SHOCK (с прайсом) | Partial |
| MOQ | ✅ На product pages | Match |
| Наличие | ❌ Нет | Missing |
| Срок отгрузки | ✅ На delivery page | Partial |
| Характеристики | ✅ Таблицы | Match |
| Удержание температуры | ✅ В описаниях | Match |
| Совместимость (перелинковка SHOCK) | ✅ На solution pages | Match |
| PDF скачать | ❌ Нет | **Missing (High)** |
| **CTA «Запросить расчёт»** | ✅ На каждой странице | Match |
| CTA «Заказать образец» | ❌ Нет | Missing |
| Вкладки (Описание/Хар-ки/Доставка/Документы) | ⚠️ Есть tabs на термопакетах (серии) | Partial |

---

## 9. CTA / UX / CRO (ТЗ раздел 13)

| Требование ТЗ | На сайте | Статус |
|---------------|----------|--------|
| Primary CTA: «Получить прайс» / «Запросить расчёт» | ✅ На каждой странице | Match |
| Secondary CTA: «Заказать образцы» | ❌ Нет | Missing |
| Tertiary: «Скачать PDF-каталог» (с email-гейтингом) | ❌ Нет | **Missing (High)** |
| Quick: Телефон кликабельный в хедере | ✅ | Match |
| Quick: WhatsApp | ❌ Нет виджета | **Missing (Medium)** |
| Sticky mobile CTA | ✅ Sticky bar (Позвонить + Получить прайс) | Match |
| Формы ≤4 поля | ✅ 2-4 поля | Match |
| Телефон — обязательное поле | ✅ | Match |
| ПДн чекбокс | ✅ | Match |
| Интеграция с Bitrix24 | ❌ Формы mock (не отправляют) | **Missing (Critical)** |

---

## 10. Trust Stack (ТЗ раздел 12)

| Уровень | Элемент по ТЗ | На сайте | Статус |
|---------|--------------|----------|--------|
| 1 | Proof-bar (цена/MOQ/отгрузка) | ✅ Trust strip | Match |
| 1 | Логотипы клиентов (6-8 шт) | ⚠️ Placeholder | **Missing real logos** |
| 2 | Кейсы с цифрами | ❌ Нет | **Missing (Critical)** |
| 2 | Фото/видео производства | ⚠️ Placeholder | **Missing real content** |
| 3 | PDF-спецификации | ❌ Нет | **Missing (High)** |
| 3 | «Карты термозащиты» | ❌ Нет | Missing (Wave 2) |
| 4 | Полные кейсы /cases/ | ❌ Нет | **Missing (Critical)** |
| 5 | Юр. реквизиты в footer | ✅ ИНН, ОГРН, © | Match |

---

## 11. SEO (ТЗ раздел 15)

| Требование | На сайте | Статус |
|-----------|----------|--------|
| 1 уникальный H1 на страницу | ✅ | Match |
| Иерархия H1→H2→H3 | ✅ | Match |
| Уникальные title/description | ⚠️ Один title/description на весь SPA | **Issue (SPA limitation)** |
| Schema markup (Product, Organization, FAQ, Breadcrumb) | ❌ Нет | **Missing (High)** |
| Breadcrumbs на всех страницах | ✅ | Match |
| Alt-теги на изображениях | ✅ Осмысленные alt | Match |
| Canonical URLs | ⚠️ Один canonical на корень | Issue |
| XML Sitemap | ❌ Нет | Missing |
| Robots.txt | ❌ Нет | Missing |

---

## 12. Приоритет расхождений

### Critical
1. **Нет /cases/** — кейсы полностью отсутствуют (Trust Stack уровни 2 и 4)
2. **Нет кейсов на homepage** — блок 5 из 7 по ТЗ missing
3. **Формы не интегрированы** — mock submit, нет CRM
4. **4 из 5 отраслевых страниц Wave 1 не реализованы** — заменены на 7 брендбуковых

### High
5. **Нет блока «Проблема» и «Кейс» в solution pages** — шаблон на 43% от ТЗ
6. **Нет брендирования на homepage** — блок 6 из 7 missing
7. **Нет PDF-спецификаций** — ни одного документа для скачивания
8. **Нет WhatsApp** — ТЗ требует quick-CTA
9. **Нет Schema markup** — Product, FAQ, Breadcrumb
10. **Нет SKU-level URL** — ТЗ требует /products/[category]/[sku]/

### Medium
11. Нет /payment/ — условия оплаты не на отдельной странице
12. Логотипы клиентов — placeholder
13. Фото производства — placeholder
14. «Заказать образцы» CTA отсутствует
15. SPA не даёт уникальные title/description на каждую страницу

### Low
16. Slug mismatch: termopakety vs termopackety
17. Нет /blog/, /retail/, /calculator/, /thermomap/ (Wave 2)
18. Copyright © 2024-2026 (ТЗ: © 2026)
19. 2 extra SHOCK блока на homepage (не вредят)

---

## 13. Финальное заключение

**Частично соответствует (~55%).**

| Категория | Реализовано | Комментарий |
|-----------|-----------|-------------|
| B2B lead-gen модель | ✅ 90% | CTA на каждой странице, формы, телефон |
| Навигация | ✅ 80% | 5/6 primary, 2/5 secondary |
| Wave 1 pages | ⚠️ 65% | 11/17 страниц |
| Homepage | ⚠️ 71% | 5/7 блоков |
| Products architecture | ✅ 85% | Все категории + enhanced hierarchy |
| Solutions architecture | ⚠️ 40% | 7 вместо 5 сегментов, шаблон на 43% |
| Trust stack | ❌ 30% | Нет кейсов, PDF, реальных логотипов |
| SEO | ❌ 25% | SPA ограничение, нет schema/sitemap |
| UX/CRO | ⚠️ 60% | CTA есть, нет WhatsApp/образцы/PDF |
| Техническая база | ⚠️ 50% | Работает, но нет CRM интеграции |

### Топ-3 для немедленного исправления:
1. Добавить /cases/ (даже с placeholder-кейсами) + блок кейсов на homepage
2. Добавить блок «Брендирование» на homepage
3. Реализовать блоки «Проблема» и «Документы» в шаблоне solution pages
