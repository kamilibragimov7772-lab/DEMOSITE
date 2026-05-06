/**
 * Content Collections schema (Astro 5 Content Layer API).
 * Типы коллекций соответствуют sitemap.md Wave 1 (32 outlines + ~37 PDP).
 *
 * Коллекции:
 * - solutions   — 5 industry-pages (`/solutions/*`).
 * - products    — ~37 PDP (`/products/<cat>/<sku>/`); category hubs реализуются как Astro pages.
 * - branding    — 3 service-pages (`/branding/*`).
 * - cases       — карточки кейсов (`/cases/<slug>/`).
 * - blog        — блог-статьи (Wave 1: SEO-якорь; Wave 2: ~9 статей).
 * - legal       — 3 юридические страницы.
 * - pages       — single-page outlines (homepage, hubs, about-cluster, contacts, faq, delivery — placeholder копирайт).
 */

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const ogImage = z.string().optional();
const seoKeywords = z.array(z.string()).max(12).optional();

// --- Solutions (5 industry pages) ---
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/solutions' }),
  schema: z.object({
    slug: z.enum(['dostavka', 'retail', 'distributory', 'proizvoditeli', 'farma']),
    title: z.string().max(80),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    eyebrow: z.string().max(40),
    h1: z.string().max(120),
    leadHtml: z.string(),
    audience: z.enum(['B1', 'B2', 'B3', 'B4', 'B5']),
    primaryCta: z.string().default('Получить расчёт'),
    primaryKeyword: z.string(),
    seoKeywords,
    ogImage,
    draft: z.boolean().default(false),
    order: z.number().int().default(0),
    updatedAt: z.coerce.date().optional(),
  }),
});

// --- Products (PDP) ---
const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    sku: z.string(),
    mpn: z.string().optional(),
    title: z.string().max(140),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    category: z.enum([
      'termopakety',
      'akkumulyatory-holoda',
      'zhidkie-hladoelementy',
      'bablpak',
      'termosumki-bolshie',
      'termoshoppery',
    ]),
    series: z.string().optional(),
    sizeWidthCm: z.number().nonnegative().optional(),
    sizeHeightCm: z.number().nonnegative().optional(),
    sizeDepthCm: z.number().nonnegative().optional(),
    volumeMl: z.number().int().nonnegative().optional(),
    volumeL: z.number().nonnegative().optional(),
    weightG: z.number().int().nonnegative().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    temperatureMode: z.enum(['cool', 'gel', 'freeze', 'deep', 'hot', 'ambient']).optional(),
    moqUnits: z.number().int().nonnegative().optional(),
    priceFromRub: z.number().nonnegative().optional(),
    priceInKpOnly: z.boolean().default(true),
    availability: z.enum(['InStock', 'PreOrder', 'OutOfStock']).default('InStock'),
    images: z.array(z.string()).default([]),
    descriptionLongMd: z.string().optional(),
    relatedSku: z.array(z.string()).max(8).default([]),
    seoKeywords,
    ogImage,
    draft: z.boolean().default(false),
  }),
});

// --- Branding (3 service-pages) ---
const branding = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/branding' }),
  schema: z.object({
    slug: z.enum(['termopakety', 'akkumulyatory', 'termoshoppery']),
    title: z.string().max(80),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    eyebrow: z.string().max(40),
    h1: z.string().max(120),
    leadHtml: z.string(),
    methods: z
      .array(
        z.object({
          name: z.enum(['Шелкография', 'Флексопечать', 'Тампопечать', 'УФ-печать', 'Наклейка', 'Выбивка']),
          moqUnits: z.number().int().nonnegative(),
          colors: z.string().optional(),
          terms: z.string().optional(),
        }),
      )
      .default([]),
    primaryKeyword: z.string(),
    seoKeywords,
    ogImage,
    draft: z.boolean().default(false),
  }),
});

// --- Cases ---
const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    title: z.string().max(140),
    clientPublic: z.string().optional(),
    clientAnonymized: z.string().optional(),
    industry: z.enum(['dostavka', 'retail', 'distributory', 'proizvoditeli', 'farma']),
    audience: z.enum(['B1', 'B2', 'B3', 'B4', 'B5']),
    year: z.number().int().min(2020).max(2030),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    excerpt: z.string().max(220),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string(), note: z.string().optional() }))
      .default([]),
    isCalculatedExample: z.boolean().default(false),
    cover: z.string().optional(),
    ogImage,
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// --- Blog ---
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(120),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    excerpt: z.string().max(220),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    primaryKeyword: z.string(),
    seoKeywords,
    schemaType: z.enum(['Article', 'BlogPosting']).default('Article'),
    articleSection: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// --- Legal ---
const legal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/legal' }),
  schema: z.object({
    slug: z.enum(['privacy', 'oferta', 'cookies']),
    title: z.string(),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    specialty: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// --- Pages (single-page outlines) ---
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    metaTitle: z.string().max(80),
    metaDescription: z.string().max(170),
    h1: z.string(),
    eyebrow: z.string().optional(),
    leadHtml: z.string().optional(),
    primaryKeyword: z.string().optional(),
    seoKeywords,
    schemaType: z
      .enum(['WebPage', 'Organization', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage'])
      .default('WebPage'),
    ogImage,
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  solutions,
  products,
  branding,
  cases,
  blog,
  legal,
  pages,
};
