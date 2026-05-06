// Style Dictionary v4 build — W3C Design Tokens (DTCG) → CSS variables.
// Источник: ../tokens/tokens.json (W3C-формат с $value / $type / $description).
// Выход:    ../src/styles/tokens.css.
//
// Запуск: npm run tokens (или npm run build — tokens.css регенерируется перед astro build).

import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

/**
 * camelCase → kebab-case для каждого сегмента имени.
 * Например, lineHeight → line-height, letterSpacing → letter-spacing.
 */
function kebab(s) {
  return String(s).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Преобразование имён токенов в CSS-переменные с осмысленным префиксом.
 * Пример: color.semantic.text-primary → --color-text-primary
 *         color.primitive.neutral-900 → --color-neutral-900
 *         font.size.h1-fluid          → --font-size-h1-fluid
 *         font.lineHeight.normal      → --font-line-height-normal
 *         duration.fast               → --duration-fast
 */
StyleDictionary.registerTransform({
  name: 'name/termy/cssVar',
  type: 'name',
  transform: (token) => {
    const parts = token.path.slice();
    // Сжимаем подуровни "primitive" / "semantic" — они нужны только для
    // организации в JSON, в CSS остаётся плоское имя --color-text-primary
    // вместо --color-semantic-text-primary. "overlay" — оставляем явно как
    // --color-overlay-* (это отдельный логический tier для прозрачностей).
    if (parts[0] === 'color' && (parts[1] === 'primitive' || parts[1] === 'semantic')) {
      parts.splice(1, 1);
    }
    return parts.map(kebab).join('-');
  },
});

// Кастомный transform-group: используем dtcg-base + наш name-transform.
StyleDictionary.registerTransformGroup({
  name: 'termy/css',
  transforms: [
    'attribute/cti',
    'name/termy/cssVar',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/css',
    'asset/url',
    'fontFamily/css',
    'cubicBezier/css',
    'strokeStyle/css/shorthand',
    'border/css/shorthand',
    'typography/css/shorthand',
    'transition/css/shorthand',
    'shadow/css/shorthand',
  ],
});

const sd = new StyleDictionary({
  source: [resolve(ROOT, 'tokens/tokens.json')],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'termy/css',
      buildPath: resolve(ROOT, 'src/styles/'),
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
  },
  log: { warnings: 'warn', verbosity: 'default' },
});

await sd.hasInitialized;

// Собираем; падающие preprocessors не блокируют — DTCG-формат поддерживается из коробки.
try {
  await sd.cleanAllPlatforms();
} catch (err) {
  // ignore — clean fails on first run when output doesn't exist
}

await sd.buildAllPlatforms();

console.log('[style-dictionary] tokens.css → src/styles/tokens.css');
