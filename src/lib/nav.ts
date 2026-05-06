/**
 * Навигация — единый источник истины для Header + Footer + Breadcrumbs.
 * Источник: 01_ia/sitemap.md (Wave 1).
 */

export interface NavLink {
  label: string;
  href: string;
  /** Для подменю (dropdown). */
  children?: readonly NavLink[];
}

export const PRIMARY_NAV: readonly NavLink[] = [
  {
    label: 'Решения',
    href: '/solutions/',
    children: [
      { label: 'Доставка еды',           href: '/solutions/dostavka/' },
      { label: 'Крупный ритейл',         href: '/solutions/retail/' },
      { label: 'Дистрибьюторы',          href: '/solutions/distributory/' },
      { label: 'Производители скоропорта', href: '/solutions/proizvoditeli/' },
      { label: 'Фарм-смежные сегменты',  href: '/solutions/farma/' },
    ],
  },
  {
    label: 'Каталог',
    href: '/products/',
    children: [
      { label: 'Термопакеты',           href: '/products/termopakety/' },
      { label: 'Аккумуляторы SHOCK®',   href: '/products/akkumulyatory-holoda/' },
      { label: 'Жидкие хладоэлементы', href: '/products/zhidkie-hladoelementy/' },
      { label: 'БаблПак',               href: '/products/bablpak/' },
      { label: 'Термосумки большие',   href: '/products/termosumki-bolshie/' },
      { label: 'Термошопперы',          href: '/products/termoshoppery/' },
    ],
  },
  {
    label: 'Брендирование',
    href: '/branding/',
    children: [
      { label: 'Термопакеты',         href: '/branding/termopakety/' },
      { label: 'SHOCK®',              href: '/branding/akkumulyatory-holoda/' },
      { label: 'Термошопперы',        href: '/branding/termoshoppery/' },
    ],
  },
  { label: 'О компании', href: '/about/' },
  { label: 'Контакты',   href: '/contacts/' },
];

export const FOOTER_COL_PRODUCTS: readonly NavLink[] = [
  { label: 'Термопакеты',           href: '/products/termopakety/' },
  { label: 'Аккумуляторы SHOCK®',   href: '/products/akkumulyatory-holoda/' },
  { label: 'Жидкие хладоэлементы', href: '/products/zhidkie-hladoelementy/' },
  { label: 'БаблПак',               href: '/products/bablpak/' },
  { label: 'Термосумки большие',   href: '/products/termosumki-bolshie/' },
  { label: 'Термошопперы',          href: '/products/termoshoppery/' },
  { label: 'Брендирование',         href: '/branding/' },
];

export const FOOTER_COL_SOLUTIONS: readonly NavLink[] = [
  { label: 'Доставка еды',                  href: '/solutions/dostavka/' },
  { label: 'Крупный ритейл',                href: '/solutions/retail/' },
  { label: 'Дистрибьюторы',                 href: '/solutions/distributory/' },
  { label: 'Производители скоропорта',      href: '/solutions/proizvoditeli/' },
  { label: 'Фарм-смежные сегменты',         href: '/solutions/farma/' },
];

export const FOOTER_COL_COMPANY: readonly NavLink[] = [
  { label: 'О компании',     href: '/about/' },
  { label: 'Производство',   href: '/about/production/' },
  { label: 'Преимущества',   href: '/about/advantages/' },
  { label: 'Кейсы',          href: '/cases/' },
  { label: 'Блог',           href: '/blog/' },
  { label: 'FAQ',            href: '/faq/' },
];

export const FOOTER_COL_CONTACTS: readonly NavLink[] = [
  { label: 'Контакты',         href: '/contacts/' },
  { label: 'Доставка',         href: '/delivery/' },
  { label: 'Оплата для юрлиц', href: '/payment/' },
];

export const FOOTER_LEGAL: readonly NavLink[] = [
  { label: 'Политика конфиденциальности', href: '/legal/privacy/' },
  { label: 'Публичная оферта',            href: '/legal/oferta/' },
  { label: 'Cookies',                     href: '/legal/cookies/' },
];
