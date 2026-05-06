// Одноразовый скрипт: убирает фон у hero-картинок продуктов через chroma-key.
// Запуск: node scripts/remove-hero-bg.mjs
// Перезаписывает .webp с alpha-каналом (transparent BG там где цвет близок к BG-sample).

import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_DIR = path.resolve(__dirname, '../public/products/_hero');

/**
 * Chroma-key: sample BG-color из левого-верхнего угла → пиксели близкие к нему делает прозрачными,
 * на границе делает feather (плавная альфа от 0 до 255).
 */
async function removeBackground(filename, threshold = 35, feather = 12) {
  const src = path.join(HERO_DIR, filename);
  console.log(`Processing ${filename}...`);

  // Read file FIRST через fs, чтобы sharp не держал handle на src.
  const fs = await import('node:fs/promises');
  const fileBuf = await fs.readFile(src);

  const { data, info } = await sharp(fileBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`  Size: ${width}×${height}, channels: ${channels}`);

  // Sample BG color из угла (0, 0)
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];
  console.log(`  BG color: rgb(${bgR}, ${bgG}, ${bgB})`);

  const out = Buffer.from(data);
  const thresholdSq = threshold * threshold;
  const featherSq = (threshold + feather) * (threshold + feather);
  const featherDelta = featherSq - thresholdSq;

  let pixelsChanged = 0;
  for (let i = 0; i < out.length; i += 4) {
    const dr = out[i] - bgR;
    const dg = out[i + 1] - bgG;
    const db = out[i + 2] - bgB;
    const distSq = dr * dr + dg * dg + db * db;

    if (distSq <= thresholdSq) {
      out[i + 3] = 0;
      pixelsChanged++;
    } else if (distSq <= featherSq) {
      const t = (distSq - thresholdSq) / featherDelta;
      out[i + 3] = Math.round(255 * t);
      pixelsChanged++;
    }
  }
  console.log(`  Pixels modified: ${pixelsChanged} of ${(out.length / 4)}`);

  // Сохраняем напрямую в .webp (без .tmp — Windows rename падает на existing files)
  // Сначала генерим buffer, затем перезаписываем файл.
  const newBuf = await sharp(out, { raw: { width, height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 92 })
    .toBuffer();

  // writeFile перезаписывает существующий файл — не нужен предварительный unlink.
  await fs.writeFile(src, newBuf);

  const stats = await fs.stat(src);
  console.log(`  ✓ Saved ${(stats.size / 1024).toFixed(1)} KB\n`);
}

(async () => {
  await removeBackground('termoshopper.webp', 42, 16);
  await removeBackground('linerbox-24l.webp', 30, 12);
  console.log('DONE');
})().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
