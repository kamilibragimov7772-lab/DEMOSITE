/**
 * Типы для CasesGrid organism — вынесены в отдельный .ts файл,
 * так как `import type {...}` из `.astro` файла не парсится esbuild стабильно
 * (актуально для Astro 6 + rolldown-vite, см. astro/issues #16542 и смежные).
 */

export type CaseIndustry =
  | 'all'
  | 'dostavka'
  | 'retail'
  | 'distributory'
  | 'proizvoditeli'
  | 'farma'
  | 'branding';

export interface CaseCard {
  /** Slug для /cases/<slug>/. Если null — карточка ведёт на /cases/ хаб (coming-soon). */
  slug?: string;
  industry: Exclude<CaseIndustry, 'all'>;
  industryLabel: string;
  title: string;
  excerpt: string;
  metrics: ReadonlyArray<{ label: string; value: string }>;
  isCalculatedExample?: boolean;
  isComingSoon?: boolean;
  cover?: string;
}

export interface FilterChip {
  /** ID индустрии или 'all'. */
  id: CaseIndustry;
  label: string;
}
