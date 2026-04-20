# TERMY | Strict Products Grid Unification

## 1. Verdict
Products page unified into single flat grid. No more visual hierarchy or "Дополнительные продукты" separation.

## 2. Previous layout
- **Термопакеты**: separate h2 + full-width `hub-card`
- **SHOCK®**: separate h2 + full-width `hub-card`
- **LinerBox®**: separate h2 + full-width `hub-card`
- **"Дополнительные продукты"**: separate h2 + `grid g4` with 3 `pcard` cards (Термошопперы, БаблПак, Термокружки)

Result: two-tier visual hierarchy — 3 "main" products get large cards, 3 "additional" products get small cards.

## 3. New unified layout
Single `grid g3` containing 6 uniform `pcard` cards:
1. Термопакеты
2. Аккумуляторы SHOCK®
3. Термокороба LinerBox®
4. Термошопперы
5. БаблПак и термоконверты
6. Термокружки

All cards use identical `pcard` pattern with image, series tag, title, spec tags, and price/CTA line.

## 4. Files changed
- `index.html` — products hub section (p-products)
- `TERMY_Strict_Products_Grid_Unification.md` — this report

## 5. Grid rules
| Breakpoint | Columns | Source |
|-----------|---------|--------|
| Desktop (>1024px) | 3 | `.g3{grid-template-columns:repeat(3,1fr)}` |
| Tablet (641-1024px) | 2 | `@media(max-width:1024px){.g3{grid-template-columns:repeat(2,1fr)}}` |
| Mobile (≤640px) | 1 | `@media(max-width:640px){.g3{grid-template-columns:1fr}}` |

## 6. Removed hierarchy
- ~~`<h2>Термопакеты</h2>` + `<a class="btn">Подробнее →</a>`~~
- ~~`<h2>Аккумуляторы SHOCK®</h2>` + `<a class="btn">Подробнее →</a>`~~
- ~~`<h2>Термокороба LinerBox®</h2>` + `<a class="btn">Подробнее →</a>`~~
- ~~`<h2>Дополнительные продукты</h2>`~~
- ~~3 × `hub-card` (full-width card with side image layout)~~
- ~~`grid g4` (4-column grid for "additional" products)~~

## 7. Link/router check
All 6 product routes preserved:
- `/products/termopackety/` -> p-termopackety
- `/products/akkumulyatory-holoda/` -> p-shock
- `/products/termokoroba/` -> p-termokoroba
- `/products/termoshoppery/` -> p-termoshoppery
- `/products/bubblpak/` -> p-bubblpak
- `/products/termokruzhki/` -> p-termokruzhki

## 8. Responsive check
- Desktop: 3 columns (2 rows of 3) via `.g3`
- Tablet: 2 columns (3 rows) via media query
- Mobile: 1 column (6 rows) via media query
- No custom breakpoints added — uses existing grid system

## 9. Acceptance check
- [x] No "Дополнительные продукты" heading
- [x] No special-case layout for SHOCK® or LinerBox® (no hub-card)
- [x] All 6 cards in single `grid g3`
- [x] Desktop: 3 per row
- [x] All cards use uniform `pcard` pattern
- [x] All product images preserved
- [x] All links/routes working
- [x] No other pages modified
