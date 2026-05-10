# Termy Site — Demo 2 Improvements

Ветка: `claude/trusting-tereshkova-fcd57f`

## Что сделано

### Hero (`src/pages/index.astro`)
- Eyebrow: «Производитель термоупаковки · Подмосковье»
- Lead: добавлен «формат 42×50 — первый в РФ», «LinerBox до 72 ч»
- Stat 4: «от 100 шт» → «30+ циклов (ресурс SHOCK® по ГОСТ)»

### AdvantagesGrid (`src/components/organisms/AdvantagesGrid.astro` + data в index.astro)
- Новый prop `backgroundImage` — factory-bg.jpg как 6% текстура фона
- Новый prop `icon` на каждый Advantage — SVG 22×22 иконка + фиолетовый бэкграунд
- Hover на карточках: border + box-shadow
- Реальные данные из vault: 310 млн ₽ выручка 2025, ~1 млн ед/мес, >10 млн ед/год, ISO 9001:2015, ПВХ-миграция ×10 ниже нормы, 17 федеральных клиентов
- Pills: 4 → 8 штук (добавлены ISO 9001:2015, ГОСТ Р 50962-96, >10 млн шт/год, ПВХ-миграция ×10 ниже нормы)

### IndustryCardsGrid (данные в index.astro)
- Каждая карточка теперь называет реальных клиентов: Самокат/ВкусВилл, X5/Ашан/Fix Price, Мираторг/Шеф-Маркет, Гемотест
- Vault-точные спеки: 6 ч удержание, LinerBox 72 ч, PRO в 10× толще, SHOCK Freeze

### BrandingDuo (данные в index.astro)
- 2 → 3 карточки: добавлен термошоппер (`slug: 'termoshoppery'`)
- Описания с реальными клиентами: Додо Пицца, Азбука вкуса

### Clients strip (index.astro)
- 17 именных клиентов: Самокат, ВкусВилл, Купер, X5 Group, Ozon Fresh, Сбермаркет, Мираторг, Fix Price, Азбука вкуса, Ашан, Lindt, Гемотест, Додо Пицца, Деловые Линии, Комус, Метро, Шеф-Маркет

### FAQ (данные в index.astro)
- 5 → 6 вопросов; все B2B-критичные:
  1. МОЗ и как считается (по категориям)
  2. Сроки отгрузки + логистика по СНГ
  3. **НДС 20% + пакет документов (УПД / ТОРГ-12 / CMR)**
  4. SHOCK® циклы + 3 температурных режима
  5. **Тендер / 44-ФЗ / 223-ФЗ**
  6. Сертификаты и как получить

## Файлы, изменённые в ветке
- `src/pages/index.astro` — все данные главной
- `src/components/organisms/AdvantagesGrid.astro` — новые props + CSS
