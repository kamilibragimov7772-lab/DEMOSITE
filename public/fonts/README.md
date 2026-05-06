# Шрифты

В этой папке должны лежать self-hosted variable woff2 файлы:

- `Inter-roman.var.woff2` — Inter Variable (Roman, weight 100-900). Покрытие: Latin + Cyrillic + Cyrillic Extended.
- `Inter-italic.var.woff2` — Inter Variable Italic.
- `JetBrainsMono-roman.var.woff2` — JetBrains Mono Variable (для технических блоков, артикулов, температурных кодов).

Файлы поставляются на этапе implementation (phase 6, ассетный этап) либо deploy (phase 8). Для local-dev допустимо взять с rsms.me/inter и github.com/JetBrains/JetBrainsMono. До поставки фактических файлов сайт работает на system-font fallback (см. `font-family.sans` в `tokens.json` — `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`).

Тест-set для визуальной проверки кириллицы (см. `03_design_system/typography.md`):

> Привет, мир. Йошкар-Ола, Ёлка, Жжёт. 0123456789. — — — «кавычки» {скобки} 42×50 см +2…+8°C TERMY®

Юникод-диапазоны (`unicode-range` в `@font-face`):
- `U+0000-007F` — Basic Latin
- `U+0400-04FF` — Cyrillic
- `U+0500-052F` — Cyrillic Supplement
- `U+2000-206F` — General Punctuation (em-dash, кавычки, многоточие)
- `U+2070-209F` — Superscripts and Subscripts
- `U+20A0-20BF` — Currency Symbols
