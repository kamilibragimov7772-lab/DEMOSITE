/**
 * Генерация webp для всех 53 SKU из zip-архива в public/products/_catalog/.
 * Запуск: node scripts/build-catalog-images.mjs
 * Источник: /tmp/termy-product-photos/1. Продукция termy/  (распакован руками заранее).
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:\\Users\\kamil\\AppData\\Local\\Temp\\termy-product-photos\\1. Продукция termy';
const DST = './public/products/_catalog';

const TARGET_W = 600;
const QUALITY = 82;

mkdirSync(DST, { recursive: true });

/** Маппинг slug → относительный путь от SRC. */
const map = {
  // Термопакеты
  'light-42x50':              'Термопакет Терми Лайт 42х50/Термопакет Терми Лайт 42х50_1.png',
  'light-60x55':              'Термопакет Терми Лайт 60х55/Термопакет Терми Лайт 60х55_1.png',
  'standart-32x35-pvd':       'Термопакет Терми 32х35/Термопакет Терми 320х350_круглые ручки_без фона.png',
  'standart-32x35-met':       'Термопакет Терми 32х35/Термопакет Терми 320х350_круглые ручки.jpg',
  'standart-42x45-pvd':       'Термопакет Терми 42х45/Термопакет Терми 420х450_круглые ручки_без фона.png',
  'standart-42x45-met':       'Термопакет Терми 42х45/Термопакет Терми 420х450_круглые ручки.jpg',
  'standart-42x50-pvd':       'Термопакет Терми 42х50/Термопакет Терми 420х500_круглые ручки_без фона.png',
  'standart-42x50-met':       'Термопакет Терми 42х50/Термопакет Терми 420х500_круглые ручки.jpg',
  'standart-60x55-pvd':       'Термопакет Терми 60х55/Термопакет Терми 600х550_круглые ручки_без фона.png',
  'standart-60x55-met':       'Термопакет Терми 60х55/Термопакет Терми 600х550_круглые ручки.jpg',
  'pro-42x45':                'Термопакет Терми Pro 42х45/1_Post.png',
  'pro-60x55':                'Термопакет Терми Pro MAX 60х55/1_Post.png',
  'standart-dno-42x45':       'Термопакет с дном/Термопакет_termy_с дном_42х45/1_Post.png',
  'standart-dno-60x50':       'Термопакет с дном/Термопакет_termy_с дном_60х55/1_Post.png',
  'zip-lock-25x40':           'Термопакет с зип-лок 240х400/Термопакет с зип-лок без фона_1.png',
  'klapan-42x45-met':         'Термопакет Терми_обезличенный/Термопакет_без лого.png',
  'klapan-42x45-pvd':         'Термопакет Терми_обезличенный/Термопакет_без лого.png',
  'klapan-42x45-1l':          'Термопакет Терми_обезличенный/Термопакет_без лого.png',

  // SHOCK
  'shock-300-gel':            'Хладоэлемент termy shock 300 мл/Аккумулятор холода Termy Shock 300 мл, гель, 0 (фиолетовый)/7_Post.png',
  'shock-300-cool':           'Хладоэлемент termy shock 300 мл/Аккумулятор холода Termy Shock 300 мл, водно-солевой, +2 +8 (синий)/4_Post.png',
  'shock-300-freeze':         'Хладоэлемент termy shock 300 мл/Аккумулятор холода Termy Shock 300 мл, водно-солевой, 0  -15 (зеленый)/1_Post.png',
  'shock-450-gel':            'Хладоэлемент termy shock 450 мл/Аккумулятор холода Termy Shock 450 мл, гель, 0/4_Post.png',
  'shock-450-cool':           'Хладоэлемент termy shock 450 мл/Аккумулятор холода Termy Shock 450 мл, водно-солевой, +2 +8 (Синий)/1_Post.png',
  'shock-450-freeze':         'Хладоэлемент termy shock 450 мл/Аккумулятор холода Termy Shock 450 мл, водно-солевой, 0  -15 (Зеленый)/1_Post.png',
  'shock-600-gel':            'Хладоэлемент termy shock 600 мл/Аккумулятор холода Termy Shock 600 мл, гель, 0 (фиолетовый)/1_Post.png',
  'shock-600-cool':           'Хладоэлемент termy shock 600 мл/Аккумулятор холода Termy Shock 600 мл, водно-солевой, +2 +8 (синий)/13_Post.png',
  'shock-600-freeze':         'Хладоэлемент termy shock 600 мл/Аккумулятор холода Termy Shock 600 мл, водно-солевой, 0  -15 (зеленый)/7_Post.png',
  'shock-1000-gel':           'Хладоэлемент termy shock 1100 мл/хладоэлемент 1100 мл 1_Post.jpg',
  'shock-1000-cool':          'Хладоэлемент termy shock 1100 мл/хладоэлемент 1100 мл 2_Post.jpg',
  'shock-1000-freeze':        'Хладоэлемент termy shock 1100 мл/хладоэлемент 1100 мл 3_Post.jpg',

  // Жидкие — placeholder reuse SHOCK 450 без этикетки
  'liquid-cooling-pack':      'Хладоэлемент termy shock 450 мл/Аккумулятор холода Termy Shock 450 мл - Без этикетки/termy Shock_1.png',

  // БаблПак (folder = inner size)
  'bablpak-130x170-silver':   'Баблпак/110х160/1_Post.png',
  'bablpak-140x220-silver':   'Баблпак/120х210/1_Post.png',
  'bablpak-170x220-silver':   'Баблпак/150х210/1_Post.png',
  'bablpak-200x270-silver':   'Баблпак/180х260/1_Post.png',
  'bablpak-240x270-silver':   'Баблпак/220х260/1_Post.png',
  'bablpak-240x340-silver':   'Баблпак/220х330/1_Post.png',
  'bablpak-260x340-silver':   'Баблпак/240х330/1_Post.png',
  'bablpak-290x370-silver':   'Баблпак/220х330/1_Post.png',
  'bablpak-320x450-silver':   'Баблпак/300х440/1_Post.png',
  'bablpak-370x480-silver':   'Баблпак/350х470/1_Post.png',
  // Чёрный мат — берём 2_Post (предположительно второй цветовариант) из соответствующей папки
  'bablpak-130x170-black':    'Баблпак/110х160/2_Post.png',
  'bablpak-140x220-black':    'Баблпак/120х210/2_Post.png',
  'bablpak-170x220-black':    'Баблпак/150х210/2_Post.png',

  // Термосумки / LinerBox
  'linerbox-16':              'Термокороб ЛайнерБокс /ЛайнерБокс_16л.png',
  'linerbox-24':              'Термокороб ЛайнерБокс /ЛайнерБокс_24л.png',
  'linerbox-40':              'Термокороб ЛайнерБокс /40л_ЛайнерБокс_1.jpg',
  'termosumka-50l-courier':   'Терморюкзак Терми/Термосумка терми ПНГ/1_Термосумка для доставки.png',

  // Термошопперы — у нас они в PDF, используем существующий /products/_hero/termoshopper.webp
  // Здесь оставляем в маппинге empty — катался выше, копию через external path.
  'termoshopper-tape-240x240': null,
  'termoshopper-tape-260x260': null,
  'termoshopper-tape-300x300': null,
  'termoshopper-tape-450x450': null,
  'termoshopper-velcro-260x260': null,
};

let processed = 0;
let skipped = 0;
let missing = [];

for (const [slug, rel] of Object.entries(map)) {
  if (rel === null) {
    skipped++;
    continue;
  }
  const srcPath = join(SRC, rel);
  const dstPath = join(DST, `${slug}.webp`);
  if (!existsSync(srcPath)) {
    missing.push(`${slug} → ${srcPath}`);
    continue;
  }
  await sharp(srcPath)
    .resize({ width: TARGET_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dstPath);
  const after = statSync(dstPath).size;
  console.log(`✓ ${slug}.webp  ${(after / 1024).toFixed(0)} KB`);
  processed++;
}

console.log(`\nProcessed ${processed}, skipped ${skipped}, missing ${missing.length}`);
if (missing.length) {
  console.error('Missing sources:');
  missing.forEach((m) => console.error('  - ' + m));
  process.exit(1);
}
