/**
 * Собирает single-file HTML из готовой dist-сборки.
 * - Inline CSS файлов (rel=stylesheet) → <style>
 * - Inline JS (src=...) → <script>
 * - Конвертирует все <img src="/..."> и url(...) в CSS → base64 data URIs
 * - Шрифты в @font-face → base64
 *
 * Запуск: node scripts/inline-html.mjs <input.html> <output.html>
 * Default: dist/index.html → Desktop/TERMY-home.html
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, extname, join } from 'node:path';
import { existsSync } from 'node:fs';

const DIST = resolve('./dist');
const inputArg = process.argv[2] ?? join(DIST, 'index.html');
const outputArg = process.argv[3] ?? 'C:\\Users\\kamil\\Desktop\\TERMY-home.html';

const MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

/** Преобразует URL вида /assets/foo.css в путь файла внутри dist/. */
function urlToFile(url) {
  if (!url.startsWith('/')) return null;
  // Strip query/hash
  const clean = url.split('?')[0].split('#')[0];
  return join(DIST, clean);
}

async function fileToDataUri(filePath) {
  const ext = extname(filePath).toLowerCase();
  const mime = MIME[ext] ?? 'application/octet-stream';
  const buf = await readFile(filePath);
  if (ext === '.svg') {
    // Inline SVG as text/utf-8 base64 (still works as data URI)
    return `data:${mime};base64,${buf.toString('base64')}`;
  }
  return `data:${mime};base64,${buf.toString('base64')}`;
}

/** Inline url(...) references inside a CSS string. */
async function inlineCssAssets(css, baseDir) {
  const urlRegex = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
  const matches = [...css.matchAll(urlRegex)];
  for (const m of matches) {
    const url = m[1];
    if (url.startsWith('data:') || url.startsWith('http')) continue;
    let filePath;
    if (url.startsWith('/')) {
      filePath = urlToFile(url);
    } else {
      filePath = resolve(baseDir, url);
    }
    if (filePath && existsSync(filePath)) {
      try {
        const dataUri = await fileToDataUri(filePath);
        css = css.replaceAll(m[0], `url('${dataUri}')`);
      } catch (e) {
        console.warn(`! cannot inline ${url}: ${e.message}`);
      }
    }
  }
  return css;
}

async function main() {
  console.log(`Reading ${inputArg}...`);
  let html = await readFile(inputArg, 'utf8');

  // 1. Inline <link rel="stylesheet" href="/assets/foo.css">
  const linkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g;
  const linkMatches = [...html.matchAll(linkRegex)];
  for (const m of linkMatches) {
    const href = m[1];
    const filePath = urlToFile(href);
    if (filePath && existsSync(filePath)) {
      let css = await readFile(filePath, 'utf8');
      css = await inlineCssAssets(css, dirname(filePath));
      html = html.replace(m[0], `<style>${css}</style>`);
      console.log(`  CSS inlined: ${href}`);
    }
  }
  // Also handle preload as=style with onload pattern (Astro inserts these)
  const preloadCss = /<link[^>]*rel=["']preload["'][^>]*as=["']style["'][^>]*href=["']([^"']+)["'][^>]*>/g;
  for (const m of [...html.matchAll(preloadCss)]) {
    const href = m[1];
    const filePath = urlToFile(href);
    if (filePath && existsSync(filePath)) {
      let css = await readFile(filePath, 'utf8');
      css = await inlineCssAssets(css, dirname(filePath));
      html = html.replace(m[0], `<style>${css}</style>`);
      console.log(`  CSS preload inlined: ${href}`);
    }
  }

  // 2. Inline <script src="/assets/foo.js">
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/g;
  for (const m of [...html.matchAll(scriptRegex)]) {
    const src = m[1];
    const filePath = urlToFile(src);
    if (filePath && existsSync(filePath)) {
      const js = await readFile(filePath, 'utf8');
      const attrs = m[0].replace(/src=["'][^"']+["']/, '').replace(/<script/, '<script').replace(/><\/script>/, '>');
      html = html.replace(m[0], `${attrs}${js}</script>`);
      console.log(`  JS inlined: ${src}`);
    }
  }

  // 3. Inline <img src="/...">
  const imgRegex = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/g;
  for (const m of [...html.matchAll(imgRegex)]) {
    const src = m[1];
    if (src.startsWith('data:') || src.startsWith('http')) continue;
    const filePath = urlToFile(src);
    if (filePath && existsSync(filePath)) {
      try {
        const dataUri = await fileToDataUri(filePath);
        html = html.replace(`src="${src}"`, `src="${dataUri}"`).replace(`src='${src}'`, `src='${dataUri}'`);
        console.log(`  IMG inlined: ${src}`);
      } catch (e) {
        console.warn(`! cannot inline ${src}: ${e.message}`);
      }
    }
  }

  // 4. Inline href to icons (favicon, apple-touch-icon)
  const iconRegex = /<link[^>]*rel=["'](?:icon|apple-touch-icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/g;
  for (const m of [...html.matchAll(iconRegex)]) {
    const href = m[1];
    const filePath = urlToFile(href);
    if (filePath && existsSync(filePath)) {
      try {
        const dataUri = await fileToDataUri(filePath);
        html = html.replace(`href="${href}"`, `href="${dataUri}"`);
        console.log(`  ICON inlined: ${href}`);
      } catch (e) { /* ignore */ }
    }
  }

  await writeFile(outputArg, html, 'utf8');
  const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
  console.log(`\n✓ Saved ${outputArg} — ${sizeKb} KB`);
}

main().catch((e) => { console.error(e); process.exit(1); });
