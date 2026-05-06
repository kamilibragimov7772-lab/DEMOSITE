/**
 * schema.org JSON-LD generators.
 * Источник истины: 02_content/seo_strategy.md §«Schema.org coverage».
 * Все генераторы возвращают plain-object — сериализуется через JSON.stringify в BaseLayout.
 */

export const ORG_NAME = 'TERMY';
export const ORG_LEGAL_NAME = 'ООО «ТЕРМИ»';
export const ORG_PHONE = '+7-800-101-15-25';
export const ORG_EMAIL = 'info@termybrand.com';

export interface OrgAddress {
  country: string;
  region: string;
  locality: string;
  streetAddress: string;
  postalCode: string;
}

export const ORG_ADDRESS_DEFAULT: OrgAddress = {
  country: 'RU',
  region: 'Москва',
  locality: 'Коммунарка',
  streetAddress: 'ул. Потаповская Роща, д. 4, к. 1, помещ. 91, офис 42',
  postalCode: '108826',
};

/** Organization root — на каждой странице (через BaseLayout). */
export function organization(opts: { siteUrl: string; logoUrl?: string; sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${opts.siteUrl}#org`,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: opts.siteUrl,
    logo: opts.logoUrl ?? `${opts.siteUrl}assets/logo/termy-logo-1200x630.png`,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressCountry: ORG_ADDRESS_DEFAULT.country,
      addressRegion: ORG_ADDRESS_DEFAULT.region,
      addressLocality: ORG_ADDRESS_DEFAULT.locality,
      streetAddress: ORG_ADDRESS_DEFAULT.streetAddress,
      postalCode: ORG_ADDRESS_DEFAULT.postalCode,
    },
    foundingDate: '2022-06-10',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: ORG_PHONE,
        contactType: 'sales',
        areaServed: 'RU',
        availableLanguage: ['ru'],
        hoursAvailable: 'Mo-Fr 09:00-18:00',
      },
    ],
    ...(opts.sameAs && opts.sameAs.length > 0 ? { sameAs: opts.sameAs } : {}),
  };
}

/** WebSite — на главной (с SearchAction опционально). */
export function webSite(opts: { siteUrl: string; searchUrl?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: opts.siteUrl,
    inLanguage: 'ru-RU',
    ...(opts.searchUrl
      ? {
          potentialAction: {
            '@type': 'SearchAction',
            target: `${opts.searchUrl}?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }
      : {}),
  };
}

/** Service — для industry-pages (`/solutions/*`). */
export function service(opts: {
  name: string;
  description: string;
  audience?: string;
  areaServed?: string;
  termsOfServiceUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    provider: { '@type': 'Organization', name: ORG_NAME },
    serviceType: 'B2B термоупаковка',
    areaServed: { '@type': 'Country', name: opts.areaServed ?? 'Россия' },
    ...(opts.audience
      ? { audience: { '@type': 'BusinessAudience', name: opts.audience } }
      : {}),
    ...(opts.termsOfServiceUrl ? { termsOfService: opts.termsOfServiceUrl } : {}),
  };
}

/** Product — для PDP. */
export interface ProductOffer {
  url: string;
  priceCurrency: 'RUB';
  price?: string;
  priceValidUntil?: string;
  availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
}

/**
 * Брендовый fallback-image для Product schema, когда у SKU ещё нет реальных
 * фото (placeholder pre-shoot stage). Google Rich Results принимает любое
 * валидное изображение; нужно чтобы поле image присутствовало для eligibility.
 */
const PRODUCT_IMAGE_FALLBACK = '/assets/og/og-default.jpg';

export function product(opts: {
  name: string;
  sku: string;
  mpn?: string;
  category: string;
  description: string;
  images?: string[];
  color?: string;
  material?: string;
  width?: { value: string | number; unitCode: 'CMT' | 'MMT' };
  height?: { value: string | number; unitCode: 'CMT' | 'MMT' };
  weight?: { value: string | number; unitCode: 'GRM' | 'KGM' };
  offers: ProductOffer;
  isRelatedTo?: string[];
}) {
  const productImages =
    opts.images && opts.images.length > 0 ? opts.images : [PRODUCT_IMAGE_FALLBACK];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name,
    sku: opts.sku,
    ...(opts.mpn ? { mpn: opts.mpn } : {}),
    category: opts.category,
    brand: { '@type': 'Brand', name: ORG_NAME },
    manufacturer: { '@type': 'Organization', name: ORG_LEGAL_NAME },
    description: opts.description,
    image: productImages,
    ...(opts.color ? { color: opts.color } : {}),
    ...(opts.material ? { material: opts.material } : {}),
    ...(opts.width
      ? { width: { '@type': 'QuantitativeValue', value: opts.width.value, unitCode: opts.width.unitCode } }
      : {}),
    ...(opts.height
      ? { height: { '@type': 'QuantitativeValue', value: opts.height.value, unitCode: opts.height.unitCode } }
      : {}),
    ...(opts.weight
      ? { weight: { '@type': 'QuantitativeValue', value: opts.weight.value, unitCode: opts.weight.unitCode } }
      : {}),
    offers: {
      '@type': 'Offer',
      url: opts.offers.url,
      priceCurrency: opts.offers.priceCurrency,
      ...(opts.offers.price ? { price: opts.offers.price } : {}),
      ...(opts.offers.priceValidUntil ? { priceValidUntil: opts.offers.priceValidUntil } : {}),
      ...(opts.offers.availability
        ? { availability: `https://schema.org/${opts.offers.availability}` }
        : {}),
    },
    ...(opts.isRelatedTo && opts.isRelatedTo.length > 0 ? { isRelatedTo: opts.isRelatedTo } : {}),
  };
}

/** Article — для блога / кейсов. */
export function article(opts: {
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  articleSection?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    mainEntityOfPage: opts.url,
    author: { '@type': 'Organization', name: opts.authorName ?? ORG_NAME },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: `${new URL(opts.url).origin}/assets/logo/termy-logo-1200x630.png` },
    },
    datePublished: opts.datePublished,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
    ...(opts.articleSection ? { articleSection: opts.articleSection } : {}),
  };
}

/** ContactPage — для /contacts/. */
export function contactPage(opts: { url: string; orgId: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: opts.url,
    mainEntity: { '@id': opts.orgId },
  };
}

/**
 * LocalBusiness — для `/contacts/` (geo + opening hours + price range).
 * Отличается от Organization тем, что добавляет geo-coordinates, openingHoursSpecification,
 * priceRange — что улучшает Knowledge Panel и локальный поиск.
 *
 * Источник: 02_content/seo_strategy.md §«Schema.org coverage» + brief phase-5 §helpers п.7.
 */
export interface OpeningHours {
  /** "Mo", "Tu" … или массив дней */
  dayOfWeek: ReadonlyArray<'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su'>;
  /** ISO time, например "09:00" */
  opens: string;
  /** ISO time, например "18:00" */
  closes: string;
}

export interface GeoCoords {
  latitude: number;
  longitude: number;
}

export function localBusiness(opts: {
  siteUrl: string;
  /** Список часов работы — массив объектов. Default — Пн-Пт 09:00-18:00. */
  hours?: ReadonlyArray<OpeningHours>;
  geo?: GeoCoords;
  priceRange?: string;
  logoUrl?: string;
  sameAs?: ReadonlyArray<string>;
}) {
  const hours: ReadonlyArray<OpeningHours> = opts.hours ?? [
    { dayOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '09:00', closes: '18:00' },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${opts.siteUrl}#localbusiness`,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: opts.siteUrl,
    logo: opts.logoUrl ?? `${opts.siteUrl}assets/logo/termy-logo-1200x630.png`,
    image: opts.logoUrl ?? `${opts.siteUrl}assets/logo/termy-logo-1200x630.png`,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    priceRange: opts.priceRange ?? 'B2B',
    address: {
      '@type': 'PostalAddress',
      addressCountry: ORG_ADDRESS_DEFAULT.country,
      addressRegion: ORG_ADDRESS_DEFAULT.region,
      addressLocality: ORG_ADDRESS_DEFAULT.locality,
      streetAddress: ORG_ADDRESS_DEFAULT.streetAddress,
      postalCode: ORG_ADDRESS_DEFAULT.postalCode,
    },
    ...(opts.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: opts.geo.latitude,
            longitude: opts.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek.map((d) => `https://schema.org/${
        d === 'Mo' ? 'Monday' :
        d === 'Tu' ? 'Tuesday' :
        d === 'We' ? 'Wednesday' :
        d === 'Th' ? 'Thursday' :
        d === 'Fr' ? 'Friday' :
        d === 'Sa' ? 'Saturday' : 'Sunday'
      }`),
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: ORG_PHONE,
        contactType: 'sales',
        areaServed: 'RU',
        availableLanguage: ['ru'],
      },
    ],
    ...(opts.sameAs && opts.sameAs.length > 0 ? { sameAs: opts.sameAs } : {}),
  };
}

/** WebPage — fallback для legal / service. */
export function webPage(opts: {
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  specialty?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    isPartOf: { '@type': 'WebSite', name: ORG_NAME },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.specialty ? { specialty: opts.specialty } : {}),
  };
}

/** CollectionPage — для hub-страниц (/products/, /solutions/, etc.). */
export function collectionPage(opts: {
  name: string;
  description: string;
  numberOfItems?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    isPartOf: { '@type': 'WebSite', name: ORG_NAME },
    ...(opts.numberOfItems !== undefined ? { numberOfItems: opts.numberOfItems } : {}),
  };
}

/** BreadcrumbList — на любой странице глубже 1 уровня. */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbList(items: readonly BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** ItemList — для каталога / hub-страниц со списком SKU.
 * Даёт Google сигнал «список товаров» и eligibility для Carousel rich result.
 * Источник: schema.org/ItemList + Google «List Carousel» guidelines (2024). */
export interface ItemListEntry {
  url: string;
  name?: string;
  image?: string;
}

export function itemList(opts: { name?: string; items: readonly ItemListEntry[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(opts.name ? { name: opts.name } : {}),
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: entry.url,
      ...(entry.name ? { name: entry.name } : {}),
      ...(entry.image ? { image: entry.image } : {}),
    })),
  };
}

/** FAQPage — для /faq/ и блоков FAQ внутри страниц с ≥3 Q&A. */
export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPage(items: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Объединяет несколько JSON-LD объектов в одну ноду @graph. */
export function graph(items: ReadonlyArray<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': items.map((item) => {
      const { ['@context']: _ctx, ...rest } = item as { '@context'?: unknown } & Record<string, unknown>;
      return rest;
    }),
  };
}
