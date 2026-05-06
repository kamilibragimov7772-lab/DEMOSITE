import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const dir = process.argv[2] ?? './public/products/_hero';
const targetWidth = Number(process.argv[3] ?? 800);
const quality = Number(process.argv[4] ?? 82);

const files = await readdir(dir);
for (const f of files) {
  if (!/\.(png|jpg|jpeg)$/i.test(f)) continue;
  const inPath = join(dir, f);
  const { name } = parse(f);
  const outPath = join(dir, `${name}.webp`);
  if (outPath === inPath) continue;

  const before = (await stat(inPath)).size;
  await sharp(inPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  const after = (await stat(outPath)).size;
  console.log(`${f} → ${name}.webp  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
}
