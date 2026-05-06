/**
 * Каталог TERMY — единый источник истины SKU.
 * Источник данных: TERMY-site-FINAL/TERMY База знаний конец.docx (раздел 2-3).
 * Цены SHOCK — из 3.2.2 (до 500 шт). Остальные цены — placeholder «от XX ₽» из page_outlines.
 */

export type Category =
  | 'termopakety'
  | 'akkumulyatory-holoda'
  | 'zhidkie-hladoelementy'
  | 'bablpak'
  | 'termosumki-bolshie'
  | 'termoshoppery';

export type Series =
  | 'light'
  | 'standart'
  | 'pro'
  | 'standart-dno'
  | 'zip-lock'
  | 'klapan'
  | 'shock-300'
  | 'shock-450'
  | 'shock-600'
  | 'shock-1000'
  | 'bablpak-silver'
  | 'bablpak-black'
  | 'linerbox'
  | 'termoshopper-tape'
  | 'termoshopper-velcro';

export type TempMode = 'cool-2-8' | 'freeze-0-15' | 'gel-0' | 'hot' | 'na';
export type PrintMethod = 'silkscreen' | 'flexo' | 'tampo' | 'sticker' | 'none';
export type Industry = 'e-grocery' | 'horeca' | 'catering' | 'farm' | 'pharma' | 'meat' | 'dark-kitchen' | 'logistics' | 'retail';
export type Color = 'silver' | 'black-mat' | 'white' | 'yellow' | 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'kraft' | 'transparent';

export interface SkuRow {
  /** Уникальный slug — используется как URL: /products/<category>/<slug>/ */
  slug: string;
  category: Category;
  /** Артикул из 1С / прайса — отображается в карточке. */
  artikul: string;
  /** Заголовок карточки. */
  title: string;
  /** Серия — для фильтра. */
  series: Series;
  /** Внешний размер. Для пакетов — «42×50», для коробов — «25×39×28», для SHOCK — «175×100×33». */
  size: string;
  /** Полезный объём в литрах. */
  volumeL: number | null;
  /** Доминирующий цвет; для SHOCK — соответствует tempMode. */
  color: Color;
  /** Температурный режим (для SHOCK / товаров с холодовой цепью). */
  tempMode: TempMode;
  /** Доступные методы брендирования. */
  printMethods: PrintMethod[];
  /** Профили отраслей применения. */
  industries: Industry[];
  /** Цена «от» (₽) на единицу при минимальной партии. */
  priceFrom: number;
  /** Минимальный заказ в штуках. */
  mozPcs: number;
  /** Минимальный заказ человеческим текстом — для отображения. */
  mozLabel: string;
  /** В наличии на складе или под заказ. */
  inStock: boolean;
  /** Доп. бэдж (НОВИНКА / ХИТ / ОГРАНИЧЕННО). */
  badge?: 'hit' | 'new' | 'pharma' | 'limited';
  /** Путь к webp-фото — необязателен; если не задан — placeholder packshot. */
  image?: string;
  /** Сертификация / характеристики (для фасетного фильтра). */
  features: Array<'food-contact' | 'three-layer' | 'waterproof' | 'reusable' | 'gost-50962' | 'tu-22-22-11' | 'iso-9001'>;
}

/* ────────────────────────────────────────────────────────────────────
   ТЕРМОПАКЕТЫ — 16 SKU (KB §2.2.2 Light, §2.2.3 Standart, §2.2.4 PRO,
   §2.3.1 Standart с дном, §2.3.2 Zip-Lock, §2.3.3 Клапан)
   ──────────────────────────────────────────────────────────────────── */
const termopakety: SkuRow[] = [
  // Light
  { slug: 'light-42x50', category: 'termopakety', artikul: 'ТПЛ_01/1', title: 'Термопакет TERMY Light 42×50',
    series: 'light', size: '42×50', volumeL: 18, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['e-grocery', 'horeca', 'catering', 'dark-kitchen'],
    priceFrom: 65, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    image: '/products/_hero/termopaket-42x45.webp',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'light-60x55', category: 'termopakety', artikul: 'ТПЛ_02/1', title: 'Термопакет TERMY Light 60×55',
    series: 'light', size: '60×55', volumeL: 33, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['e-grocery', 'catering', 'farm'],
    priceFrom: 89, mozPcs: 60, mozLabel: 'от 1 коробки (60 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  // Standart (8 SKU)
  { slug: 'standart-32x35-pvd', category: 'termopakety', artikul: 'ТПС_01/1', title: 'Термопакет TERMY Standart 32×35',
    series: 'standart', size: '32×35', volumeL: 6, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['horeca', 'catering', 'dark-kitchen'],
    priceFrom: 52, mozPcs: 150, mozLabel: 'от 1 коробки (150 шт)', inStock: true,
    image: '/products/_hero/termopaket-42x45.webp',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-32x35-met', category: 'termopakety', artikul: 'ТПС_02/1', title: 'Термопакет TERMY Standart 32×35 Мет',
    series: 'standart', size: '32×35', volumeL: 6, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['horeca', 'catering', 'pharma'],
    priceFrom: 56, mozPcs: 150, mozLabel: 'от 1 коробки (150 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-42x45-pvd', category: 'termopakety', artikul: 'ТПС_03/1', title: 'Термопакет TERMY Standart 42×45',
    series: 'standart', size: '42×45', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['e-grocery', 'horeca', 'meat'],
    priceFrom: 69, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'hit',
    image: '/products/_hero/termopaket-42x45.webp',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-42x45-met', category: 'termopakety', artikul: 'ТПС_04/1', title: 'Термопакет TERMY Standart 42×45 Мет',
    series: 'standart', size: '42×45', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['e-grocery', 'horeca', 'pharma'],
    priceFrom: 73, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-42x50-pvd', category: 'termopakety', artikul: 'ТПС_05/1', title: 'Термопакет TERMY Standart 42×50',
    series: 'standart', size: '42×50', volumeL: 18, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['e-grocery', 'horeca', 'catering'],
    priceFrom: 75, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'hit',
    image: '/products/_catalog/termopaket-standart-42x50.webp',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-42x50-met', category: 'termopakety', artikul: 'ТПС_06/1', title: 'Термопакет TERMY Standart 42×50 Мет',
    series: 'standart', size: '42×50', volumeL: 18, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['e-grocery', 'horeca', 'pharma'],
    priceFrom: 79, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-60x55-pvd', category: 'termopakety', artikul: 'ТПС_07/1', title: 'Термопакет TERMY Standart 60×55',
    series: 'standart', size: '60×55', volumeL: 33, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['catering', 'farm', 'meat'],
    priceFrom: 119, mozPcs: 60, mozLabel: 'от 1 коробки (60 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-60x55-met', category: 'termopakety', artikul: 'ТПС_08/1', title: 'Термопакет TERMY Standart 60×55 Мет',
    series: 'standart', size: '60×55', volumeL: 33, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['catering', 'farm', 'meat', 'pharma'],
    priceFrom: 125, mozPcs: 60, mozLabel: 'от 1 коробки (60 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  // PRO (2 SKU)
  { slug: 'pro-42x45', category: 'termopakety', artikul: 'ТПП_01/1', title: 'Термопакет TERMY PRO 42×45',
    series: 'pro', size: '42×45', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen', 'none'],
    industries: ['pharma', 'meat', 'logistics'],
    priceFrom: 109, mozPcs: 20, mozLabel: 'от 1 коробки (20 шт)', inStock: true,
    badge: 'pharma',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'pro-60x55', category: 'termopakety', artikul: 'ТПП_02/1', title: 'Термопакет TERMY PRO 60×55',
    series: 'pro', size: '60×55', volumeL: 33, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen', 'none'],
    industries: ['pharma', 'meat', 'logistics'],
    priceFrom: 159, mozPcs: 15, mozLabel: 'от 1 коробки (15 шт)', inStock: true,
    badge: 'pharma',
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  // Standart с дном (2 SKU)
  { slug: 'standart-dno-42x45', category: 'termopakety', artikul: 'ТПСД01/1', title: 'Термопакет TERMY Standart 42×45 + дно',
    series: 'standart-dno', size: '42×45+дно', volumeL: 18, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['horeca', 'catering', 'meat'],
    priceFrom: 89, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'standart-dno-60x50', category: 'termopakety', artikul: 'ТПСД02/2', title: 'Термопакет TERMY Standart 60×50 + дно',
    series: 'standart-dno', size: '60×50+дно', volumeL: 33, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'none'],
    industries: ['catering', 'farm', 'meat'],
    priceFrom: 145, mozPcs: 30, mozLabel: 'от 1 коробки (30 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  // Zip-Lock
  { slug: 'zip-lock-25x40', category: 'termopakety', artikul: 'ТПЗЛ01/1', title: 'Термопакет TERMY Zip-Lock 25×40',
    series: 'zip-lock', size: '25×40', volumeL: 6, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker', 'none'],
    industries: ['e-grocery', 'horeca', 'pharma'],
    priceFrom: 49, mozPcs: 700, mozLabel: 'от 1 коробки (700 шт)', inStock: true,
    image: '/products/_hero/zip-lock.webp',
    features: ['waterproof', 'reusable', 'tu-22-22-11', 'food-contact'] },
  // Клеевой клапан (3 SKU)
  { slug: 'klapan-42x45-met', category: 'termopakety', artikul: 'ТПКС01/1', title: 'Термопакет TERMY на клапане 42×45 Мет',
    series: 'klapan', size: '42×45+5см', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery', 'logistics'],
    priceFrom: 79, mozPcs: 120, mozLabel: 'от 1 коробки (120 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'klapan-42x45-pvd', category: 'termopakety', artikul: 'ТПКС02/1', title: 'Термопакет TERMY на клапане 42×45',
    series: 'klapan', size: '42×45+5см', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['silkscreen', 'flexo', 'sticker'],
    industries: ['e-grocery', 'logistics'],
    priceFrom: 75, mozPcs: 120, mozLabel: 'от 1 коробки (120 шт)', inStock: true,
    features: ['three-layer', 'reusable', 'tu-22-22-11', 'food-contact'] },
  { slug: 'klapan-42x45-1l', category: 'termopakety', artikul: 'ТПКС03/2', title: 'Термопакет TERMY на клапане 42×45 однослойный',
    series: 'klapan', size: '42×45+5см', volumeL: 15, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery'],
    priceFrom: 39, mozPcs: 500, mozLabel: 'от 1 коробки (500 шт)', inStock: true,
    features: ['waterproof', 'tu-22-22-11', 'food-contact'] },
];

/* ────────────────────────────────────────────────────────────────────
   АККУМУЛЯТОРЫ ХОЛОДА Termy SHOCK® — 12 SKU (KB §3.2.1 + §3.2.2)
   Цены — «до 500 шт» (round до целых).
   ──────────────────────────────────────────────────────────────────── */
const shock: SkuRow[] = [
  // 300 мл
  { slug: 'shock-300-gel', category: 'akkumulyatory-holoda', artikul: 'АХД_07/1', title: 'Termy SHOCK® 300 мл · гель · фиолетовый',
    series: 'shock-300', size: '180×150×20', volumeL: 0.3, color: 'purple', tempMode: 'gel-0',
    printMethods: ['sticker'],
    industries: ['horeca', 'e-grocery', 'pharma'],
    priceFrom: 75, mozPcs: 75, mozLabel: 'от 1 коробки (75 шт)', inStock: true,
    image: '/products/_hero/shock-450-gel.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-300-cool', category: 'akkumulyatory-holoda', artikul: 'АХД_08/1', title: 'Termy SHOCK® 300 мл · водно-солевой · голубой',
    series: 'shock-300', size: '180×150×20', volumeL: 0.3, color: 'blue', tempMode: 'cool-2-8',
    printMethods: ['sticker'],
    industries: ['pharma', 'e-grocery', 'retail'],
    priceFrom: 68, mozPcs: 75, mozLabel: 'от 1 коробки (75 шт)', inStock: true,
    image: '/products/_hero/shock-600-cool.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-300-freeze', category: 'akkumulyatory-holoda', artikul: 'АХД_09/1', title: 'Termy SHOCK® 300 мл · водно-солевой · зелёный',
    series: 'shock-300', size: '180×150×20', volumeL: 0.3, color: 'green', tempMode: 'freeze-0-15',
    printMethods: ['sticker'],
    industries: ['pharma', 'meat', 'logistics'],
    priceFrom: 70, mozPcs: 75, mozLabel: 'от 1 коробки (75 шт)', inStock: true,
    features: ['gost-50962', 'reusable', 'food-contact'] },
  // 450 мл
  { slug: 'shock-450-gel', category: 'akkumulyatory-holoda', artikul: 'АХД_01/1', title: 'Termy SHOCK® 450 мл · гель · фиолетовый',
    series: 'shock-450', size: '175×100×33', volumeL: 0.45, color: 'purple', tempMode: 'gel-0',
    printMethods: ['sticker'],
    industries: ['horeca', 'e-grocery', 'pharma'],
    priceFrom: 76, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true,
    badge: 'hit',
    image: '/products/_hero/shock-450-gel.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-450-cool', category: 'akkumulyatory-holoda', artikul: 'АХД_02/1', title: 'Termy SHOCK® 450 мл · водно-солевой · голубой',
    series: 'shock-450', size: '175×100×33', volumeL: 0.45, color: 'blue', tempMode: 'cool-2-8',
    printMethods: ['sticker'],
    industries: ['pharma', 'e-grocery', 'retail'],
    priceFrom: 69, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true,
    image: '/products/_hero/shock-600-cool.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-450-freeze', category: 'akkumulyatory-holoda', artikul: 'АХД_03/1', title: 'Termy SHOCK® 450 мл · водно-солевой · зелёный',
    series: 'shock-450', size: '175×100×33', volumeL: 0.45, color: 'green', tempMode: 'freeze-0-15',
    printMethods: ['sticker'],
    industries: ['pharma', 'meat', 'logistics'],
    priceFrom: 71, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true,
    features: ['gost-50962', 'reusable', 'food-contact'] },
  // 600 мл
  { slug: 'shock-600-gel', category: 'akkumulyatory-holoda', artikul: 'АХД_04/1', title: 'Termy SHOCK® 600 мл · гель · фиолетовый',
    series: 'shock-600', size: '245×135×25', volumeL: 0.6, color: 'purple', tempMode: 'gel-0',
    printMethods: ['sticker'],
    industries: ['horeca', 'logistics', 'pharma'],
    priceFrom: 109, mozPcs: 25, mozLabel: 'от 1 коробки (25 шт)', inStock: true,
    image: '/products/_hero/shock-450-gel.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-600-cool', category: 'akkumulyatory-holoda', artikul: 'АХД_05/1', title: 'Termy SHOCK® 600 мл · водно-солевой · голубой',
    series: 'shock-600', size: '245×135×25', volumeL: 0.6, color: 'blue', tempMode: 'cool-2-8',
    printMethods: ['sticker'],
    industries: ['pharma', 'logistics', 'retail'],
    priceFrom: 101, mozPcs: 25, mozLabel: 'от 1 коробки (25 шт)', inStock: true,
    image: '/products/_hero/shock-600-cool.webp',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-600-freeze', category: 'akkumulyatory-holoda', artikul: 'АХД_06/1', title: 'Termy SHOCK® 600 мл · водно-солевой · зелёный',
    series: 'shock-600', size: '245×135×25', volumeL: 0.6, color: 'green', tempMode: 'freeze-0-15',
    printMethods: ['sticker'],
    industries: ['pharma', 'meat', 'logistics'],
    priceFrom: 104, mozPcs: 25, mozLabel: 'от 1 коробки (25 шт)', inStock: true,
    features: ['gost-50962', 'reusable', 'food-contact'] },
  // 1000 мл
  { slug: 'shock-1000-gel', category: 'akkumulyatory-holoda', artikul: 'АХД_10/1', title: 'Termy SHOCK® 1000 мл · гель · фиолетовый',
    series: 'shock-1000', size: 'крупный формат', volumeL: 1, color: 'purple', tempMode: 'gel-0',
    printMethods: ['sticker'],
    industries: ['logistics', 'pharma'],
    priceFrom: 161, mozPcs: 24, mozLabel: 'от 1 коробки (24 шт)', inStock: false,
    badge: 'limited',
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-1000-cool', category: 'akkumulyatory-holoda', artikul: 'АХД_11/1', title: 'Termy SHOCK® 1000 мл · водно-солевой · голубой',
    series: 'shock-1000', size: 'крупный формат', volumeL: 1, color: 'blue', tempMode: 'cool-2-8',
    printMethods: ['sticker'],
    industries: ['logistics', 'pharma'],
    priceFrom: 153, mozPcs: 24, mozLabel: 'от 1 коробки (24 шт)', inStock: false,
    features: ['gost-50962', 'reusable', 'food-contact'] },
  { slug: 'shock-1000-freeze', category: 'akkumulyatory-holoda', artikul: 'АХД_12/1', title: 'Termy SHOCK® 1000 мл · водно-солевой · зелёный',
    series: 'shock-1000', size: 'крупный формат', volumeL: 1, color: 'green', tempMode: 'freeze-0-15',
    printMethods: ['sticker'],
    industries: ['logistics', 'pharma'],
    priceFrom: 157, mozPcs: 24, mozLabel: 'от 1 коробки (24 шт)', inStock: false,
    features: ['gost-50962', 'reusable', 'food-contact'] },
];

/* ────────────────────────────────────────────────────────────────────
   ЖИДКИЕ ХЛАДОЭЛЕМЕНТЫ — Provisional, KB не зафиксированы.
   Один представительский placeholder «под запрос».
   ──────────────────────────────────────────────────────────────────── */
const liquid: SkuRow[] = [
  { slug: 'liquid-cooling-pack', category: 'zhidkie-hladoelementy', artikul: 'ЖКЭ_01', title: 'Жидкие хладоэлементы Termy',
    series: 'shock-300', size: 'разные', volumeL: null, color: 'transparent', tempMode: 'cool-2-8',
    printMethods: ['sticker', 'none'],
    industries: ['pharma', 'e-grocery', 'logistics'],
    priceFrom: 0, mozPcs: 1000, mozLabel: 'под запрос', inStock: false,
    image: '/products/_catalog/liquid-cooling-pack.webp',
    features: ['food-contact', 'reusable'] },
];

/* ────────────────────────────────────────────────────────────────────
   БАБЛПАК — 13 SKU (KB §2.3.4)
   ──────────────────────────────────────────────────────────────────── */
const bablpak: SkuRow[] = [
  // Серебро (10)
  { slug: 'bablpak-130x170-silver', category: 'bablpak', artikul: 'БП_S_01', title: 'БаблПак 130×170 серебро',
    series: 'bablpak-silver', size: '130×170', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['e-grocery', 'logistics'],
    priceFrom: 14, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    features: ['waterproof'] },
  { slug: 'bablpak-140x220-silver', category: 'bablpak', artikul: 'БП_S_02', title: 'БаблПак 140×220 серебро',
    series: 'bablpak-silver', size: '140×220', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'],
    industries: ['e-grocery', 'logistics'],
    priceFrom: 17, mozPcs: 200, mozLabel: 'от 1 коробки (200 шт)', inStock: true,
    image: '/products/_catalog/bablpak.webp',
    features: ['waterproof'] },
  { slug: 'bablpak-170x220-silver', category: 'bablpak', artikul: 'БП_S_03', title: 'БаблПак 170×220 серебро',
    series: 'bablpak-silver', size: '170×220', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 19, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-200x270-silver', category: 'bablpak', artikul: 'БП_S_04', title: 'БаблПак 200×270 серебро',
    series: 'bablpak-silver', size: '200×270', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 22, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-240x270-silver', category: 'bablpak', artikul: 'БП_S_05', title: 'БаблПак 240×270 серебро',
    series: 'bablpak-silver', size: '240×270', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 25, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-240x340-silver', category: 'bablpak', artikul: 'БП_S_06', title: 'БаблПак 240×340 серебро',
    series: 'bablpak-silver', size: '240×340', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 29, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-260x340-silver', category: 'bablpak', artikul: 'БП_S_07', title: 'БаблПак 260×340 серебро',
    series: 'bablpak-silver', size: '260×340', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 31, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-290x370-silver', category: 'bablpak', artikul: 'БП_S_08', title: 'БаблПак 290×370 серебро',
    series: 'bablpak-silver', size: '290×370', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 35, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-320x450-silver', category: 'bablpak', artikul: 'БП_S_09', title: 'БаблПак 320×450 серебро',
    series: 'bablpak-silver', size: '320×450', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 42, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true, features: ['waterproof'] },
  { slug: 'bablpak-370x480-silver', category: 'bablpak', artikul: 'БП_S_10', title: 'БаблПак 370×480 серебро',
    series: 'bablpak-silver', size: '370×480', volumeL: null, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 49, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true, features: ['waterproof'] },
  // Чёрный мат (3)
  { slug: 'bablpak-130x170-black', category: 'bablpak', artikul: 'БП_B_01', title: 'БаблПак 130×170 чёрный мат',
    series: 'bablpak-black', size: '130×170', volumeL: null, color: 'black-mat', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 17, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'new', features: ['waterproof'] },
  { slug: 'bablpak-140x220-black', category: 'bablpak', artikul: 'БП_B_02', title: 'БаблПак 140×220 чёрный мат',
    series: 'bablpak-black', size: '140×220', volumeL: null, color: 'black-mat', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 20, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'new', features: ['waterproof'] },
  { slug: 'bablpak-170x220-black', category: 'bablpak', artikul: 'БП_B_03', title: 'БаблПак 170×220 чёрный мат',
    series: 'bablpak-black', size: '170×220', volumeL: null, color: 'black-mat', tempMode: 'na',
    printMethods: ['flexo', 'none'], industries: ['e-grocery', 'logistics'],
    priceFrom: 22, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'new', features: ['waterproof'] },
];

/* ────────────────────────────────────────────────────────────────────
   ТЕРМОСУМКИ БОЛЬШИЕ / LinerBox — 3 SKU (KB §2.3.6)
   + 1 термосумка-рюкзак из public/products/_catalog
   ──────────────────────────────────────────────────────────────────── */
const termosumki: SkuRow[] = [
  { slug: 'linerbox-16', category: 'termosumki-bolshie', artikul: 'ТКЛ_16/1', title: 'LinerBox® 16 л',
    series: 'linerbox', size: '25×39×28', volumeL: 16, color: 'kraft', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen', 'none'],
    industries: ['logistics', 'pharma', 'meat'],
    priceFrom: 1190, mozPcs: 75, mozLabel: 'от 1 паллеты (75 шт)', inStock: true,
    features: ['three-layer', 'reusable'] },
  { slug: 'linerbox-24', category: 'termosumki-bolshie', artikul: 'ТКЛ_24/1', title: 'LinerBox® 24 л',
    series: 'linerbox', size: '36×39×28', volumeL: 24, color: 'kraft', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen', 'none'],
    industries: ['logistics', 'pharma', 'meat'],
    priceFrom: 1490, mozPcs: 50, mozLabel: 'от 1 паллеты (50 шт)', inStock: true,
    badge: 'hit',
    image: '/products/_hero/linerbox-24l.webp',
    features: ['three-layer', 'reusable'] },
  { slug: 'linerbox-40', category: 'termosumki-bolshie', artikul: 'ТКЛ_40/1', title: 'LinerBox® 40 л',
    series: 'linerbox', size: '38×45×34', volumeL: 40, color: 'kraft', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen', 'none'],
    industries: ['logistics', 'pharma', 'meat', 'farm'],
    priceFrom: 1990, mozPcs: 50, mozLabel: 'от 1 паллеты (50 шт)', inStock: true,
    features: ['three-layer', 'reusable'] },
  { slug: 'termosumka-50l-courier', category: 'termosumki-bolshie', artikul: 'ТРМ_50/1', title: 'Термосумка курьерская 50 л',
    series: 'linerbox', size: '40×45×35', volumeL: 50, color: 'yellow', tempMode: 'na',
    printMethods: ['flexo', 'silkscreen'],
    industries: ['horeca', 'e-grocery', 'catering'],
    priceFrom: 2490, mozPcs: 1, mozLabel: 'от 1 шт', inStock: true,
    image: '/products/_catalog/termosumka-50l.webp',
    features: ['waterproof', 'reusable'] },
];

/* ────────────────────────────────────────────────────────────────────
   ТЕРМОШОППЕРЫ — 5 SKU (KB §2.3.5)
   ──────────────────────────────────────────────────────────────────── */
const termoshoppery: SkuRow[] = [
  { slug: 'termoshopper-tape-240x240', category: 'termoshoppery', artikul: 'ТШК_01', title: 'Термошоппер с клейкой лентой 240×240×150',
    series: 'termoshopper-tape', size: '240×240×150', volumeL: 8, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery', 'horeca'],
    priceFrom: 119, mozPcs: 200, mozLabel: 'от 1 коробки (200 шт)', inStock: true,
    image: '/products/_hero/termoshopper.webp',
    features: ['three-layer', 'food-contact'] },
  { slug: 'termoshopper-tape-260x260', category: 'termoshoppery', artikul: 'ТШК_02', title: 'Термошоппер с клейкой лентой 260×260×170',
    series: 'termoshopper-tape', size: '260×260×170', volumeL: 10, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery', 'horeca'],
    priceFrom: 139, mozPcs: 200, mozLabel: 'от 1 коробки (200 шт)', inStock: true,
    image: '/products/_hero/termoshopper.webp',
    features: ['three-layer', 'food-contact'] },
  { slug: 'termoshopper-tape-300x300', category: 'termoshoppery', artikul: 'ТШК_03', title: 'Термошоппер с клейкой лентой 300×300×200',
    series: 'termoshopper-tape', size: '300×300×200', volumeL: 16, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery', 'horeca', 'catering'],
    priceFrom: 169, mozPcs: 100, mozLabel: 'от 1 коробки (100 шт)', inStock: true,
    badge: 'hit',
    image: '/products/_hero/termoshopper.webp',
    features: ['three-layer', 'food-contact'] },
  { slug: 'termoshopper-tape-450x450', category: 'termoshoppery', artikul: 'ТШК_04', title: 'Термошоппер с клейкой лентой 450×450×290',
    series: 'termoshopper-tape', size: '450×450×290', volumeL: 53, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['catering', 'farm'],
    priceFrom: 289, mozPcs: 50, mozLabel: 'от 1 коробки (50 шт)', inStock: true,
    image: '/products/_hero/termoshopper.webp',
    features: ['three-layer', 'food-contact'] },
  { slug: 'termoshopper-velcro-260x260', category: 'termoshoppery', artikul: 'ТШЛ_01', title: 'Термошоппер с липучкой 260×260×170',
    series: 'termoshopper-velcro', size: '260×260×170', volumeL: 10, color: 'silver', tempMode: 'na',
    printMethods: ['flexo', 'sticker'],
    industries: ['e-grocery', 'horeca'],
    priceFrom: 149, mozPcs: 200, mozLabel: 'от 1 коробки (200 шт)', inStock: true,
    image: '/products/_hero/termoshopper.webp',
    features: ['reusable', 'food-contact'] },
];

export const SKUS: ReadonlyArray<SkuRow> = [
  ...termopakety,
  ...shock,
  ...liquid,
  ...bablpak,
  ...termosumki,
  ...termoshoppery,
];

export const CATEGORIES: Array<{ slug: Category; label: string; total: number }> = [
  { slug: 'termopakety', label: 'Термопакеты', total: termopakety.length },
  { slug: 'akkumulyatory-holoda', label: 'SHOCK®', total: shock.length },
  { slug: 'zhidkie-hladoelementy', label: 'Жидкие хладоэлементы', total: liquid.length },
  { slug: 'bablpak', label: 'БаблПак', total: bablpak.length },
  { slug: 'termosumki-bolshie', label: 'Термосумки большие', total: termosumki.length },
  { slug: 'termoshoppery', label: 'Термошопперы', total: termoshoppery.length },
];

/* Лейблы для UI (используются и в фильтрах, и в карточках). */
export const LABELS = {
  series: {
    light: 'Light',
    standart: 'Standart',
    pro: 'PRO',
    'standart-dno': 'Standart с дном',
    'zip-lock': 'Zip-Lock',
    klapan: 'На клапане',
    'shock-300': 'SHOCK 300 мл',
    'shock-450': 'SHOCK 450 мл',
    'shock-600': 'SHOCK 600 мл',
    'shock-1000': 'SHOCK 1000 мл',
    'bablpak-silver': 'БаблПак серебро',
    'bablpak-black': 'БаблПак чёрный мат',
    linerbox: 'LinerBox / Термосумки',
    'termoshopper-tape': 'С клейкой лентой',
    'termoshopper-velcro': 'С липучкой',
  } satisfies Record<Series, string>,
  tempMode: {
    'cool-2-8': '+2…+8 °C',
    'freeze-0-15': '0…−15 °C',
    'gel-0': '~0 °C (гель)',
    hot: 'Горячее',
    na: '—',
  } satisfies Record<TempMode, string>,
  printMethod: {
    silkscreen: 'Шелкография (от 500 шт)',
    flexo: 'Флексография (от 10 000 шт)',
    tampo: 'Тампопечать (от 1 000 шт)',
    sticker: 'Наклейка (от 1 000 шт)',
    none: 'Без печати (от 1 коробки)',
  } satisfies Record<PrintMethod, string>,
  industry: {
    'e-grocery': 'E-grocery / meal-kit',
    horeca: 'HoReCa / рестораны',
    catering: 'Кейтеринг',
    farm: 'Фермерские продукты',
    pharma: 'Фарма / медицина',
    meat: 'Мясное производство',
    'dark-kitchen': 'Dark kitchen',
    logistics: 'Логистика / 3PL',
    retail: 'Ритейл / сети',
  } satisfies Record<Industry, string>,
  color: {
    silver: 'Серебро',
    'black-mat': 'Чёрный мат',
    white: 'Белый',
    yellow: 'Жёлтый',
    red: 'Красный',
    blue: 'Голубой',
    green: 'Зелёный',
    purple: 'Фиолетовый',
    orange: 'Оранжевый',
    kraft: 'Крафт',
    transparent: 'Прозрачный',
  } satisfies Record<Color, string>,
  feature: {
    'food-contact': 'Food contact (ТР ТС 005/2011)',
    'three-layer': 'Трёхслойная конструкция',
    waterproof: 'Водостойкий',
    reusable: 'Многоразовый',
    'gost-50962': 'ГОСТ Р 50962-96',
    'tu-22-22-11': 'ТУ 22.22.11-001',
    'iso-9001': 'ISO 9001',
  } satisfies Record<SkuRow['features'][number], string>,
  colorSwatch: {
    silver: 'linear-gradient(135deg,#cdd5dd,#9aa3ac)',
    'black-mat': '#222',
    white: '#f4f4f5',
    yellow: '#facc15',
    red: '#ef4444',
    blue: '#60a5fa',
    green: '#4ade80',
    purple: '#a78bfa',
    orange: '#fb923c',
    kraft: '#c8a26d',
    transparent: 'repeating-linear-gradient(45deg,#eee 0 4px,#ddd 4px 8px)',
  } satisfies Record<Color, string>,
  badge: {
    hit: { label: 'ХИТ', bg: '#fde68a', fg: '#92400e' },
    new: { label: 'НОВИНКА', bg: '#bbf7d0', fg: '#166534' },
    pharma: { label: 'ФАРМА', bg: '#ddd6fe', fg: '#5b21b6' },
    limited: { label: 'ОГРАНИЧЕННО', bg: '#fecaca', fg: '#991b1b' },
  },
};
