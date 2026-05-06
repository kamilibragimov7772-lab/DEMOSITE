/**
 * Объединяет несколько already-inlined HTML файлов в один файл с навигацией tabs/hash.
 * Каждая страница = <iframe srcdoc="..."> внутри top-level navigation.
 *
 * Запуск: node scripts/combine-html.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';

const PAGES = [
  { id: 'home',    label: 'Главная',  file: 'C:\\Users\\kamil\\Desktop\\TERMY-home.html' },
  { id: 'catalog', label: 'Каталог',  file: 'C:\\Users\\kamil\\Desktop\\TERMY-catalog.html' },
  { id: 'pdp',     label: 'Карточка', file: 'C:\\Users\\kamil\\Desktop\\TERMY-pdp.html' },
];
const OUT = 'C:\\Users\\kamil\\Desktop\\TERMY-site-single.html';

const pages = await Promise.all(
  PAGES.map(async (p) => ({ ...p, html: await readFile(p.file, 'utf8') }))
);

/* Экранируем "</script" и спец-символы для srcdoc-атрибута. */
function escapeForSrcdoc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TERMY — site preview</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%237D46AF'/><text x='16' y='22' font-family='Arial' font-weight='800' font-size='14' fill='white' text-anchor='middle'>T</text></svg>">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
  body { display: flex; flex-direction: column; background: #0D0F11; color: #fff; }
  .nav {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #6428A0, #9466BB);
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
    flex-shrink: 0;
  }
  .nav__brand { font-weight: 800; letter-spacing: -0.02em; font-size: 18px; margin-right: 16px; }
  .nav__btn {
    padding: 6px 14px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 999px;
    color: #fff; cursor: pointer;
    font-size: 13px; font-weight: 500;
    transition: background .15s, border-color .15s;
  }
  .nav__btn:hover { background: rgba(255,255,255,.22); }
  .nav__btn.is-active { background: #fff; color: #6428A0; border-color: #fff; font-weight: 600; }
  .nav__hint { margin-left: auto; font-size: 11px; opacity: .7; }
  .stage { flex: 1; position: relative; background: #fff; }
  .stage iframe {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    border: 0; display: none;
  }
  .stage iframe.is-active { display: block; }
</style>
</head>
<body>
<header class="nav">
  <span class="nav__brand">TERMY*</span>
  ${pages.map((p, i) => `<button class="nav__btn${i === 0 ? ' is-active' : ''}" data-tab="${p.id}">${p.label}</button>`).join('\n  ')}
  <span class="nav__hint">3 страницы · single file ~3 МБ · все ассеты внутри</span>
</header>

<main class="stage">
  ${pages.map((p, i) => `<iframe data-frame="${p.id}" class="${i === 0 ? 'is-active' : ''}" srcdoc="${escapeForSrcdoc(p.html)}"></iframe>`).join('\n  ')}
</main>

<script>
  const tabs = document.querySelectorAll('[data-tab]');
  const frames = document.querySelectorAll('[data-frame]');
  tabs.forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.tab;
    tabs.forEach(b => b.classList.toggle('is-active', b === btn));
    frames.forEach(f => f.classList.toggle('is-active', f.dataset.frame === id));
  }));
</script>
</body>
</html>`;

await writeFile(OUT, html, 'utf8');
const sizeMB = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2);
console.log(`✓ Saved ${OUT} — ${sizeMB} MB`);
