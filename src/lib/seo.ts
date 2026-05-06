/**
 * SEO helpers — meta tags + canonical + truncation.
 * Источник истины: 02_content/seo_strategy.md (унифицированный паттерн «{title} — TERMY», em-dash U+2014).
 */

export const BRAND_NAME = 'TERMY';
export const BRAND_LEGAL = 'ООО «ТЕРМИ»';
export const BRAND_SEPARATOR = ' — '; // em dash (U+2014) per seo_strategy.md iter2 CN2
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

export type OgType = 'website' | 'article' | 'product';

export interface SEOMeta {
  /** ≤60 символов с keyword. */
  title: string;
  /** ≤160 символов. */
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: OgType;
  robotsNoindex?: boolean;
  robotsNofollow?: boolean;
}

/**
 * Обрезка строки с многоточием (U+2026), сохраняя визуальный максимум.
 */
export function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, Math.max(0, max - 1)).trimEnd() + '…';
}

/**
 * Собирает meta-title формата «{page} — TERMY», ограничивая длину до TITLE_MAX.
 * Если page уже содержит «— TERMY» (page outline уже включил суффикс) — не дублирует.
 */
export function buildTitle(page: string): string {
  const suffix = `${BRAND_SEPARATOR}${BRAND_NAME}`;
  if (page.endsWith(suffix)) return truncate(page, TITLE_MAX);
  const room = TITLE_MAX - suffix.length;
  const trimmed = truncate(page, room);
  return `${trimmed}${suffix}`;
}

/**
 * Гарантирует, что description не превышает DESCRIPTION_MAX.
 */
export function buildDescription(text: string): string {
  return truncate(text, DESCRIPTION_MAX);
}

/**
 * Полный canonical URL для страницы. site берётся из Astro.site (astro.config.mjs).
 */
export function buildCanonical(siteUrl: URL | string | undefined, pathname: string): string {
  if (!siteUrl) return pathname;
  const base = typeof siteUrl === 'string' ? siteUrl : siteUrl.toString();
  // Гарантируем trailing slash: trailingSlash: 'always' в astro.config
  const cleanPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return new URL(cleanPath, base).toString();
}

/**
 * Преобразует относительный путь к og:image в абсолютный URL (требование OpenGraph и crawler-friendly SEO).
 * Если ogImage уже абсолютный (http(s)://) — возвращает как есть.
 * Если site не задан — возвращает исходное значение (graceful degradation в dev).
 *
 * Phase 7 iter2 SE12: og:image relative → absolute (closes MEDIUM SEO finding).
 */
export function toAbsoluteOgImage(siteUrl: URL | string | undefined, ogImage: string | undefined): string | undefined {
  if (!ogImage) return undefined;
  if (/^https?:\/\//i.test(ogImage)) return ogImage;
  if (!siteUrl) return ogImage;
  const base = typeof siteUrl === 'string' ? siteUrl : siteUrl.toString();
  return new URL(ogImage, base).toString();
}

/**
 * Готовит финальный набор meta для <head>.
 */
export function makeMeta(input: {
  title: string;
  description: string;
  pathname: string;
  site?: URL | string;
  ogImage?: string;
  ogType?: OgType;
  noindex?: boolean;
}): Required<Omit<SEOMeta, 'ogImage' | 'ogTitle' | 'ogDescription'>> & {
  ogImage: string | undefined;
  ogTitle: string;
  ogDescription: string;
} {
  const title = buildTitle(input.title);
  const description = buildDescription(input.description);
  const canonical = buildCanonical(input.site, input.pathname);
  const ogImage = toAbsoluteOgImage(input.site, input.ogImage);
  return {
    title,
    description,
    canonical,
    ogType: input.ogType ?? 'website',
    ogImage,
    ogTitle: title,
    ogDescription: description,
    robotsNoindex: input.noindex ?? false,
    robotsNofollow: false,
  };
}
