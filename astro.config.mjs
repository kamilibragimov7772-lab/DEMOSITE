// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
// Tailwind v4 подключён через PostCSS (postcss.config.mjs) — workaround
// для совместимости Astro 6 rolldown-vite с tailwind-плагинами:
// https://github.com/withastro/astro/issues/16542

// Production domain — placeholder. Финал — phase 8 (deploy-engineer).
const SITE = 'https://termy.ru';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    mdx(),
    icon({
      include: {
        lucide: [
          'chevron-down', 'chevron-right', 'arrow-right', 'arrow-up-right',
          'search', 'x', 'plus', 'minus', 'check',
          'info', 'alert-triangle', 'circle-alert', 'circle-check',
          'phone', 'mail', 'message-circle', 'send',
          'download', 'external-link', 'calendar', 'file-text',
          'menu', 'package', 'thermometer', 'snowflake', 'flame',
        ],
      },
    }),
  ],
  vite: {
    // PostCSS работает через postcss.config.mjs автоматически.
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  experimental: {},
});
