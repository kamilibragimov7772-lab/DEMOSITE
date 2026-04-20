# — финальный сайт 

## Структура

- `index.html` — финальная версия сайта (готова к деплою)
  Собрана из `_blobs-preview.html` (правки от 17 апреля, все картинки грузятся)
- `404.html`, `robots.txt`, `sitemap.xml` — стандартные файлы сайта
- `package.json`, `Dockerfile`, `.dockerignore` — конфигурация деплоя
- `img/` — все изображения сайта (логотипы, продукты, маскоты, брендинг)
- `products/` — страницы карточек продуктов (HTML)
- `knowledge-base/` — контент базы знаний (markdown: about, faq, pricing, cases, articles)
- `server/` — заготовка бэкенд-части (Node.js)
- `widget/` — код чат-виджета
- `docs/` — ТЗ, брифы, брендбук, аудиты, спецификации
  - `docs/audits/` — 8 аудит-отчётов (TERMY_*.md)
- `_archive/` — **НЕ ТРОГАТЬ при работе над финалом**
  - `_archive/versions/` — старые версии HTML (v5f, v5g, index из bot-ponton, portable, _archive-* из products)
  - `_archive/drafts/` — hero-прототипы, 3d-прототипы, hero-animation
  - `_archive/unused_assets/` — зарезервировано (пусто; unused-анализ не проводился)
  - `_archive/misc/` — хладоэлименты (139 MB), brandbook_pages, logo_previews, скрипты-генераторы, дубли

## Как работать дальше

- Все правки — только в `index.html` и сопутствующих `img/ products/ knowledge-base/ server/ widget/`
- Перед любыми изменениями сверяйся с этим README
- Если нужна старая версия — смотри `_archive/versions/`
- Структура `assets/{css,js,images,fonts}/` из исходного ТЗ не применена:
  CSS и шрифты не вынесены в файлы (inline + Google Fonts), изображения живут в `img/`,
  перенос нарушил бы относительные пути в HTML

## Исходная папка

Оригинал остался нетронутым: `C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\`
(только `TERMY_site_final/` добавлен рядом)

## Дата систематизации

2026-04-17

## Финальная версия собрана из

`02_github_repo/bot-ponton/_blobs-preview.html` (17 апреля, 0.24 MB)

## Что НЕ скопировано

- `.git/` репозиторий bot-ponton (15 MB, VCS-состояние — в оригинале не тронут)
- Системный мусор: `~$тимизация_каталога_термопродукции.docx` (Word temp)
- Пустые папки: `05_references/`, `03_content_draft/_scripts/`

## Что скопировано, но требует решения пользователя

- Дубли brandbook PDF (16 MB) — оставлен в `docs/` + копия в `_archive/misc/`
- `хладоэлименты/` (139 MB) — помещено в `_archive/misc/`;
  если это не часть сайта, можно удалить всю папку из архива
- `server/` и `widget/` — скопированы, но используются ли на проде — решать вам
