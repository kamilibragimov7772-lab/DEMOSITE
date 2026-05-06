---
type: engineering_readme
project: termy-site
created: 2026-05-02
agent: astro-engineer
methodology_framework: [Astro 5+, Tailwind v4 (CSS-first), TypeScript strict, Style Dictionary v4 (W3C DTCG), WCAG 2.2 AA]
phase: 5
mode: setup
---



. Astro 5 multi-page (static), TypeScript strict, Tailwind v4 (CSS-first), Style Dictionary для дизайн-токенов.

## Стек

- **Astro 5+** — multi-page static site, prefetch на viewport, sitemap-интеграция, content collections (Content Layer API).
- **TypeScript strict** — `astro/tsconfigs/strict` + `noUncheckedIndexedAccess` + `noImplicitOverride`.
- **Tailwind v4** через `@tailwindcss/vite` (CSS-first config в `src/styles/global.css` через `@theme inline`).
- **Style Dictionary v4** — генерирует `src/styles/tokens.css` из `tokens/tokens.json` (W3C Design Tokens Community Group формат).
- **MDX** для блога / кейсов; **astro-icon** (Lucide); **sharp** для image pipeline; **@astrojs/sitemap** для sitemap.xml.

## Команды

| Команда            | Что делает                                                                |
|--------------------|----------------------------------------------------------------------------|
| `npm install`      | Установить зависимости.                                                    |
| `npm run dev`      | Dev-сервер на http://127.0.0.1:4321.                                       |
| `npm run tokens`   | Регенерировать `src/styles/tokens.css` из `tokens/tokens.json`.            |
| `npm run typecheck`| `astro check` — проверка TS strict + Astro components.                     |
| `npm run build`    | tokens → astro check → astro build → `dist/` (production-сборка).         |
| `npm run preview`  | Preview production-сборки локально.                                        |

## Структура

```
site/
├── astro.config.mjs        # site, integrations, prefetch, image, vite tailwind plugin
├── tsconfig.json           # strict + path-aliases (~, @components, @layouts, @lib, @styles)
├── package.json            # зависимости + scripts
├── public/
│   ├── fonts/              # Inter / JetBrains Mono variable woff2 (поставка отдельно)
│   ├── images/             # статические изображения
│   ├── favicon.svg         # SVG favicon
│   └── robots.txt
├── src/
│   ├── content/
│   │   ├── config.ts       # коллекции: solutions / products / branding / cases / blog / legal / pages
│   │   ├── solutions/      # MD-файлы (наполняются phase 6 / ghostwriter)
│   │   ├── products/
│   │   ├── branding/
│   │   ├── cases/
│   │   ├── blog/
│   │   ├── legal/
│   │   └── pages/
│   ├── layouts/
│   │   └── BaseLayout.astro    # title/description/canonical/og/schema/skip-link/preload
│   ├── components/
│   │   ├── atoms/              # Button, Input
│   │   ├── molecules/          # FormField, CardBase
│   │   ├── organisms/          # Header, Footer
│   │   └── icons/              # astro-icon collection
│   ├── pages/
│   │   ├── index.astro         # главная (placeholder; полная реализация — phase 6)
│   │   └── 404.astro
│   ├── lib/
│   │   ├── seo.ts              # makeMeta + truncate + buildTitle/Canonical
│   │   ├── schema.ts           # JSON-LD: Organization, Service, Product, Article, Breadcrumb, FAQ, ContactPage
│   │   └── nav.ts              # PRIMARY_NAV + footer-колонки + legal
│   ├── styles/
│   │   ├── global.css          # tailwind + tokens + @font-face + reset + focus + skip-link + reduced-motion
│   │   └── tokens.css          # генерируется (gitignored)
│   └── env.d.ts
├── tokens/
│   └── tokens.json             # W3C DTCG-формат (источник истины дизайн-системы)
└── style-dictionary/
    └── build.mjs               # генератор tokens.css
```

## Дизайн-токены и темизация

Источник истины — `tokens/tokens.json` (W3C Design Tokens Community Group). Никаких magic-цветов и magic-numbers в компонентах: всё через `var(--color-*)`, `var(--spacing-*)`, `var(--duration-*)`, `var(--easing-*)`.

Мост к Tailwind v4 — `@theme inline { ... }` в `src/styles/global.css`. Это даёт возможность использовать утилитарные классы `text-text-primary`, `bg-bg-page`, `rounded-base` параллельно с авторскими CSS-классами в scoped `<style>` блоках компонентов.

Регенерация после изменения tokens.json: `npm run tokens`.

## Доступность (WCAG 2.2 AA, baseline)

- Skip-to-content link (SC 2.4.1).
- `:focus-visible` outline + box-shadow ring (SC 2.4.7).
- Touch targets ≥44×44px на мобильных (SC 2.5.8).
- Семантические заголовки h1-h4 + единый шрифтовый ритм.
- `prefers-reduced-motion` глобальный fallback (SC 2.3.3).
- ARIA только где нет нативной семантики (dropdown summary aria-haspopup, форма aria-describedby/aria-invalid).

## SEO baseline

- canonical + og + twitter card + schema.org `@graph` (Organization root + per-page nodes) встроены в BaseLayout.
- Унифицированный паттерн title: `«{page} — TERMY»` (em dash U+2014).
- Astro sitemap-интеграция формирует `sitemap-index.xml`.
- robots.txt разрешает crawl, исключает /api/, /admin/, /search?, /404.

## Реализованное в phase 5 setup

- Конфиг и тулинг: astro.config, tsconfig strict, package.json, .npmrc, .gitignore.
- Структура `src/` (atoms/molecules/organisms/layouts/lib/styles/content).
- Дизайн-токены — копия `tokens.json` + Style Dictionary v4 build script + `global.css` с `@theme inline` мостом к Tailwind v4.
- Типографика: `@font-face` Inter Variable + JetBrains Mono с правильными `unicode-range` для кириллицы.
- Базовые компоненты: BaseLayout, Header (sticky + dropdown + mobile drawer), Footer (4 колонки + email-gate прайс-лист + 152-ФЗ consent + legal strip), Button (5 variants × 3 sizes × 7 states), Input (text/textarea/select × 6 states), FormField (label + input + helper + error), CardBase (3 variants).
- SEO + schema helpers: `lib/seo.ts` + `lib/schema.ts` (Organization / WebSite / Service / Product / Article / ContactPage / WebPage / CollectionPage / BreadcrumbList / FAQPage / @graph).
- Content Collections schema: 7 коллекций по sitemap.md Wave 1 (solutions / products / branding / cases / blog / legal / pages) с типизированными zod-схемами.
- Placeholder pages: `index.astro`, `404.astro`.

## Что выполнит phase 6 implementation

- 31 страница из `04_visuals/*.spec.md` (homepage, 5 industry, hub каталога + 6 категорий, PDP-template + variants, 3 about, 19-contacts, 20-22 legal, 23-404, 24-31 хаб брендирования + 3 branding + хаб кейсов + блог-якорь + delivery + faq).
- Расширение atomic inventory: Badge, Chip, Divider, Spinner, ProgressBar, TempMarker, Skeleton, Logo + остальные molecules / organisms из `03_design_system/components_atomic.md`.
- Заполнение content collections placeholder-копирайтом из page outlines (финал — ghostwriter).

## Деплой

Phase 8 (deploy-engineer). Пока не реализовано: `runbook.md`, `.well-known/security.txt`, CMS-интеграция (если потребуется), CDN/edge-config.

## Релевантные источники (ретро-валидация)

Все артефакты предыдущих фаз находятся в рабочем каталоге pipeline (вне репозитория, в vault Obsidian — соответствующий path знает orchestr). В коде нет ссылок на конкретные клиентские имена / NDA-данные.
