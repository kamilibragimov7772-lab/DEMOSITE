/**
 * Сканит все .astro файлы в src/pages и вытаскивает структуру каждой страницы:
 *   - какие компоненты-organisms используются
 *   - в каком порядке
 *   - заголовки H1/H2 (если найдём)
 * Выдаёт markdown-документ.
 *
 * Запуск: node scripts/dump-site-structure.mjs
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, relative, basename } from 'node:path';

const PAGES_ROOT = './src/pages';
const OUT = process.argv[2] ?? './SITE_STRUCTURE.md';

/** Recursively find all .astro files. */
async function walk(dir) {
  const entries = await readdir(dir);
  const files = [];
  for (const e of entries) {
    const p = join(dir, e);
    const s = await stat(p);
    if (s.isDirectory()) files.push(...await walk(p));
    else if (e.endsWith('.astro')) files.push(p);
  }
  return files;
}

/** Extract array of components AND inline sections from astro file in document order. */
function extractStructure(content) {
  const blocks = [];

  /* Split into frontmatter и template */
  const m = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!m) return blocks;
  const template = m[2];

  /* Импортированные organisms из frontmatter */
  const imports = Array.from(content.matchAll(/import\s+(\w+)\s+from\s+['"]@components\/organisms\/[^'"]+['"]/g))
    .map((mm) => mm[1]);
  const organismSet = new Set(imports);

  /* Comments {/* ... */ /*} помогают определить блоки в больших inline-страницах */
  const commentRegex = /\{\s*\/\*\s*([^*]+(?:\*(?!\/)[^*]*)*?)\s*\*\/\s*\}/g;
  /* Component opens */
  const componentRegex = /<([A-Z]\w+)([\s\S]*?)\/?>/g;
  /* Section starts with optional id/aria + класс */
  const sectionRegex = /<section\b([^>]*?)>/g;
  /* H2 inside near a section */
  function findH2After(pos) {
    const slice = template.slice(pos, pos + 4000);
    const h2 = slice.match(/<h2\b[^>]*>\s*([\s\S]*?)\s*<\/h2>/);
    return h2 ? h2[1].replace(/\s+/g, ' ').replace(/<[^>]+>/g, '').trim() : null;
  }

  /* Сначала собираем positions событий */
  const events = [];

  /* Comments — {/* P.X Title */ /*} */
  let cm;
  const localCommentRegex = new RegExp(commentRegex.source, 'g');
  while ((cm = localCommentRegex.exec(template)) !== null) {
    const text = cm[1].trim();
    /* Брать только короткие — это label блока, не длинные тексты */
    if (text.length < 100 && !/^astro/i.test(text)) {
      events.push({ pos: cm.index, type: 'comment', text });
    }
  }

  /* Components */
  let mm;
  const localCompRegex = new RegExp(componentRegex.source, 'g');
  while ((mm = localCompRegex.exec(template)) !== null) {
    const name = mm[1];
    if (!organismSet.has(name)) continue;
    const propsBlock = mm[2];
    const headingMatch = propsBlock.match(/heading=["']([^"']+)["']/) ||
                         propsBlock.match(/heading=\{`([^`]+)`\}/);
    const eyebrowMatch = propsBlock.match(/eyebrow=["']([^"']+)["']/);
    events.push({
      pos: mm.index,
      type: 'component',
      name,
      heading: headingMatch ? headingMatch[1] : null,
      eyebrow: eyebrowMatch ? eyebrowMatch[1] : null,
    });
  }

  /* Inline sections — берём class и aria-labelledby */
  let sm;
  const localSectionRegex = new RegExp(sectionRegex.source, 'g');
  while ((sm = localSectionRegex.exec(template)) !== null) {
    const attrs = sm[1];
    const classMatch = attrs.match(/class=["']([^"']+)["']/);
    const className = classMatch ? classMatch[1].split(' ')[0] : 'section';
    /* Skip pdp-section без специфики (берём comment рядом) */
    const heading = findH2After(sm.index);
    events.push({
      pos: sm.index,
      type: 'section',
      className,
      heading,
    });
  }

  /* Сортируем по позиции */
  events.sort((a, b) => a.pos - b.pos);

  /* Объединяем: comment перед section/component → label для него */
  let pendingLabel = null;
  for (const e of events) {
    if (e.type === 'comment') {
      pendingLabel = e.text;
    } else if (e.type === 'component') {
      blocks.push({
        component: e.name,
        heading: e.heading,
        eyebrow: e.eyebrow,
        label: pendingLabel,
      });
      pendingLabel = null;
    } else if (e.type === 'section') {
      /* Section блок имеет смысл только если он не внутри organism (organism сам себе section).
         Берём только если есть содержимое — heading или label или конкретный класс. */
      if (e.heading || pendingLabel) {
        blocks.push({
          component: `<section class="${e.className}">`,
          heading: e.heading,
          eyebrow: null,
          label: pendingLabel,
        });
        pendingLabel = null;
      }
    }
  }

  return blocks;
}

/** Convert pages path to URL slug. */
function pageToUrl(filePath) {
  let p = relative(PAGES_ROOT, filePath).replaceAll('\\', '/');
  p = p.replace(/\.astro$/, '');
  if (p.endsWith('/index')) p = p.slice(0, -6) || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (p === '/index') return '/';
  return p + (p === '/' ? '' : '/');
}

const files = await walk(PAGES_ROOT);
files.sort();

const groups = {
  '/': [],
  '/products/': [],
  '/solutions/': [],
  '/about/': [],
  '/branding/': [],
  '/blog/': [],
  '/cases/': [],
  '/contacts/': [],
  '/delivery/': [],
  '/faq/': [],
  '/legal/': [],
  '/404': [],
};

for (const file of files) {
  const content = await readFile(file, 'utf8');
  const blocks = extractStructure(content);
  const url = pageToUrl(file);
  const data = { url, file: relative('.', file).replaceAll('\\', '/'), blocks };

  /* Распределяем по группам */
  if (url === '/') groups['/'].push(data);
  else if (url.startsWith('/products')) groups['/products/'].push(data);
  else if (url.startsWith('/solutions')) groups['/solutions/'].push(data);
  else if (url.startsWith('/about')) groups['/about/'].push(data);
  else if (url.startsWith('/branding')) groups['/branding/'].push(data);
  else if (url.startsWith('/blog')) groups['/blog/'].push(data);
  else if (url.startsWith('/cases')) groups['/cases/'].push(data);
  else if (url.startsWith('/contacts')) groups['/contacts/'].push(data);
  else if (url.startsWith('/delivery')) groups['/delivery/'].push(data);
  else if (url.startsWith('/faq')) groups['/faq/'].push(data);
  else if (url.startsWith('/legal')) groups['/legal/'].push(data);
  else groups['/404'].push(data);
}

/** Render markdown */
let out = `# Структура сайта TERMY

Автогенерация из \`src/pages/**\`. Дата: ${new Date().toISOString().slice(0, 10)}.
По каждой странице — список **organisms** (крупных блоков) в порядке появления, с их заголовком (если есть).

---

`;

const groupLabels = {
  '/': '## Главная',
  '/products/': '## Каталог и карточки товаров',
  '/solutions/': '## Решения по отраслям',
  '/about/': '## О компании',
  '/branding/': '## Брендирование',
  '/blog/': '## Блог',
  '/cases/': '## Кейсы',
  '/contacts/': '## Контакты',
  '/delivery/': '## Доставка',
  '/faq/': '## FAQ',
  '/legal/': '## Юридические страницы',
  '/404': '## 404',
};

for (const [groupKey, label] of Object.entries(groupLabels)) {
  const pages = groups[groupKey];
  if (pages.length === 0) continue;

  out += `${label}\n\n`;

  for (const page of pages) {
    out += `### \`${page.url}\` <sup>↪ ${page.file}</sup>\n\n`;
    if (page.blocks.length === 0) {
      out += '_(нет organisms — простая статика)_\n\n';
      continue;
    }
    page.blocks.forEach((b, i) => {
      const num = String(i + 1).padStart(2, '0');
      const heading = b.heading ? ` — «${b.heading}»` : '';
      const eye = b.eyebrow ? ` _(${b.eyebrow})_` : '';
      const label = b.label ? ` _[${b.label}]_` : '';
      out += `${num}. **${b.component}**${heading}${eye}${label}\n`;
    });
    out += '\n';
  }
}

out += `\n---\n\n## Сводка\n\n`;
const total = Object.values(groups).flat().length;
out += `- Всего страниц: **${total}**\n`;
for (const [k, v] of Object.entries(groups)) {
  if (v.length > 0) out += `- \`${k}\`: ${v.length}\n`;
}

await writeFile(OUT, out, 'utf8');
console.log(`✓ Saved ${OUT} (${(Buffer.byteLength(out, 'utf8') / 1024).toFixed(1)} KB, ${total} pages)`);
