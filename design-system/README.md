# TERMY — Design System

**TERMY** is a Russian B2B brand of thermal packaging for temperature-sensitive cargo — food, pharma, last-mile delivery. The product family centers on foil-lined bags, shock-absorbing liners, bubbled thermo-wrap (Bublpak), and thermo-boxes for 2–8°C and sub-zero logistics. Primary channel is **termybrand.com**; the brand also lives in distributor decks, trade-show booths, social, and on-pack printing.

This design system captures the visual and verbal language defined in the official TERMY Brandbook v1.0 and cross-checked against the production site (`TERMY_site_final/`). Anyone building a site page, a landing, a distributor deck, a booth panel, an Instagram tile, or packaging copy should start here.

## Sources

- **Brandbook PDF**: `uploads/termy-brandbook-ru ().pdf` — authoritative source for colors, logo, temperature modes, mascots, and pictograms.
- **Production site codebase**: `TERMY_site_final/` (mounted locally, read-only) — verified typography scale, UI rhythm, real product imagery, copy tone.
- **Raw assets lifted from production**: see `assets/` in this repo.

## Index

- `README.md` — this file (brand context, content, visual foundations, iconography)
- `SKILL.md` — Claude Code-compatible skill descriptor
- `colors_and_type.css` — CSS custom properties for every color, type, shadow, spacing and motion token
- `assets/`
  - `client-logos/` — 14 customer logos used on the site (SVG)
  - `mascots/` — 7 TERMY mascots (the persona cast from the brandbook)
  - `products/` — product renders (Termopaket, Bublpak, Termoruzak, Shock liners, Linerbox, Termomug)
  - `renders/` — hero/editorial photographs used on site
  - `industries/` — sector illustrations (retail, fastfood, icecream)
- `preview/` — Design System tab cards (typography, palette, components, etc.)
- `ui_kits/site/` — termybrand.com UI kit (React/JSX components + interactive index.html)

---

## CONTENT FUNDAMENTALS

The voice is **calm, engineering-precise, quietly confident**. No marketing bombast, no superlatives, no emoji. The brand earns authority the way engineering documentation does — by being specific.

### Tone rules

- **Short, declarative sentences.** Facts first, benefits second. "Держит 2–8°C до 36 часов в жаркий день." — not "Наша революционная технология позволяет вам…"
- **Formal, neutral "вы".** Always capitalized plural "Вы" in direct sales/distributor-facing copy; lowercase "вы" is fine in body prose. Never "ты".
- **Technical detail is the hero, not the caveat.** Temperature ranges (−15°C, 2–8°C), hours of hold time, bag dimensions (42×50 см), and material names (Tyvek, PE-foam, вспененный полиэтилен) belong up front, set as visual accents — not hidden in footnotes.
- **No marketing clichés.** Avoid "инновационный", "революционный", "лучший на рынке", "№1", or counter-style stats ("500+ клиентов!"). Replace with concrete numbers in context ("поставки в 14 сетей").
- **No emoji** — ever — in product/marketing surfaces. Pictograms and mascots do that job.
- **Casing**: Sentence case for everything except product names (Termopaket PRO, Bublpak, Liner BOX) and the wordmark itself (TERMY in CAPS). Headings do **not** get title case.
- **Russian typography**: use «ёлочки» for quotes, thin non-breaking spaces in numbers (15 000), em dash — not hyphen — for parenthetical phrases, and the proper minus for negative temperatures (−15 °C, not -15).

### Examples from the real site

- Hero: "Термоупаковка, которая просто работает." — short, no puffery.
- Product label: "Термопакет PRO 42×45 · 5 слоёв · до 36 ч при +30°C" — dimension, structure, performance. Exactly three facts.
- Testimonial lead-in (pull-quote style, not card): "«За два года — ни одной жалобы на разморозку.»" — attributed below.

### What TERMY never sounds like

- ❌ "Революционное решение для вашего бизнеса!"
- ❌ "Мы № 1 в термоупаковке 🔥"
- ❌ "Почему 500+ клиентов выбирают нас?"
- ✅ "Термопакет PRO. Пять слоёв. Держит 2–8°C до 36 часов."

---

## VISUAL FOUNDATIONS

### Color — the full family (see `colors_and_type.css` for hex)

TERMY uses **gradient pairs, not flat colors**. Every brand color is specified as `start → end` and applied as a diagonal gradient on blocks, pictograms, and temperature pills.

| Family | Role | Example gradient |
|---|---|---|
| **Brand purple** | Primary hero surfaces, CTAs, brand blocks | `#6428A0 → #9466BB` |
| **Information indigo** | Long-form text blocks, infographics, dark footers | `#1E1E50 → #323287` |
| **Ecology teal** | Sustainability, recyclable-material messaging | `#28A096 → #32C8BE` |
| **Shock red-orange** | Warnings, bold statements, Shock product line | `#A53728 → #EB5A3C` |
| **Attention amber** | "Hot" temperature mode, call-outs | `#E6AA23 → #F0CD73` |
| **Light orange** | Ease/accessibility contexts, softer signal | `#EB7D2D → #F0B47D` |
| **Temperature 2–8°C** | Chilled (blue) | `#6491B4 → #AAD2F5` |
| **Temperature <0°C** | Frozen (magenta) | `#913791 → #DC78DC` |
| **Temperature −15°C** | Deep freeze (dark green) | `#054B37 → #0F6950` |
| **Paper** | Default background — warm off-white, never #FFF | `#F5F2EC` |

**Vibe**: the palette is **modern, saturated, slightly printerly**. Purple and indigo read as "tech + trust"; the warm paper canvas prevents the bluish-purple from feeling like generic SaaS. The temperature system is a genuine information layer, not decoration — it shows up on pills, pictogram plates, and spec badges across the product catalog.

### Typography

- **Inter** — primary, everywhere. Regular (400) for body, Semibold (600) for headings, Medium (500) for UI labels.
- **Instrument Serif italic** — permitted only in editorial H1s (landing pages, distributor-deck covers). Not for body, not for UI.
- **Monospaced** — temperature readouts and dimensional specs (`42×50 см`, `−15°C`) use a monospaced face (JetBrains Mono fallback) with tabular-nums to keep engineering specs crisp.
- **Case**: sentence case; **eyebrow labels** are uppercase with wide tracking (0.12em) — a brandbook signature you see on section intros like `Б  Р  Е  Н  Д  Б  У  К`.

### Layout & composition

- **Editorial, asymmetric**. The site's hero is a **2-column split** (image left, copy right), not a centered full-bleed stadium. Most sections use **bento-style grids** with purposefully different cell sizes, not uniform 3-columns.
- **Max content width** ≈ 1240px, gutter ≈ 24–40px fluid.
- **Section rhythm** alternates: paper canvas → brand-purple block → paper → information-indigo block. The color of a section is an information signal.
- **Whitespace is generous**. Section vertical padding ≈ 96–128px.

### Backgrounds & surfaces

- **Default page background is warm paper (#F5F2EC)** — never pure white. This is the single most important "feel" decision.
- **Brand-purple blocks** host hero CTAs, product callouts, and section dividers. White text, slightly muted white for secondary.
- **Information-indigo blocks** host long-form stats, comparison tables, and anything data-dense.
- **Grain texture (SVG noise) is always on top of colored surfaces** at ~30–40% opacity / multiply blend. This is the "handmade" signal the brandbook calls out — nothing in TERMY is fully flat.
- **No dark mode + radial orbs**. No mesh gradients with floating blurs. No glassmorphism. The brand is explicitly anti-AI-slop.

### Imagery

- **Warm, naturalistic product photography** — boxes on warm wood or paper, master-craftsman hands, real trucks at real depots. Imagery bias: warm highlights, neutral-to-warm shadows, slight film grain.
- **Never stock-photo "business people shaking hands"**. Never gradient-ball 3D renders. No isometric cartoons.
- **Pictograms sit on colored square plates** (radius 8–12px) — white glyph on brand/temperature-mode color. The plate color *is* the message.

### Borders, radii, shadows

- **Corner radii**: `4 / 8 / 12 / 16 / 24` — cards typically 12–16px; pills fully rounded. Cards are **never pill-shaped**.
- **Borders**: 1px, very low-opacity ink (`rgba(15,16,20,.10)`). Used sparingly — the grain and colored plates do most of the separation work.
- **Shadows**: two-layer, quiet. `shadow-1` for resting cards, `shadow-2` for raised, `shadow-lift` (brand-tinted) for hover. No huge drop shadows.
- **Transparency / blur**: almost never. No glass panels. Overlays on imagery use a solid-ish color at 85–92% alpha, not blur.

### Motion

- **Anims are deliberate and staggered**, not "fade-up on everything". Entry motions are short (240–420ms), easing `cubic-bezier(.16,1,.3,1)`, with **differentiated delays per element** so the eye lands on something first.
- **Hover**: color-shift (darken brand by ~8%, or lighten by ~10%) and sometimes a subtle shadow lift. **No uniform `translateY(-4px)`** — that's the tell of a template.
- **Press**: scale 0.98 and a small color darken. No bounces.
- **Scroll**: parallax is fine on hero imagery (subtle, <10% travel). Never on UI.

### Layout rules / fixed elements

- Header is **static at top**, not sticky-floating. It becomes compact on scroll only on landing pages.
- CTA never floats. Put it in the flow.
- No modals except for contact form and cookie banner.

### Quotes & testimonials

- **Pull-quote style**, large Instrument Serif italic for the quote, attribution below in tiny eyebrow caps. **Not** uniform testimonial cards.

---

## ICONOGRAPHY

TERMY's icon system is **custom pictogram plates**, not a standard icon font. The brand does not use Feather/Lucide/Heroicons directly.

### What exists

- **Pictogram plates**: square (12px radius), filled with a brand or temperature-mode gradient, bearing a single white glyph. Used for product features ("5 слоёв", "−15°C", "ЭКО-материал"), industry tags, delivery modes. Glyphs are ~1.5px-stroke line-art with slight rounding. See the site's `/img/pictograms/` directory (not copied wholesale here — add on demand).
- **Mascots** (`assets/mascots/`): 7 persona illustrations — one per core audience (distributor, lab courier, ice-cream driver, retail ops, etc.). Used in distributor decks, HR pages, and on industry-specific landings. Do not use mascots as icons.
- **Client logos** (`assets/client-logos/`): 14 real SVG customer marks — used in the "Нам доверяют" strip. Grayscale at rest, full color on hover.
- **Temperature pills**: mini-pictograms (thermometer, snowflake, flame) on the matching temperature-mode plate, paired with a mono temperature readout (`2–8°C`, `−15°C`).

### Iconography rules

- **No emoji**, anywhere — including in headings and list bullets. The brandbook and user guidance both explicitly forbid this.
- **No unicode glyphs as icons** (no ❄, no 🔥, no ✓ as a decorative check). Use the pictogram-on-plate or a line glyph.
- **When a specific site pictogram isn't available in this repo**, the temporary substitute is **Lucide** (same stroke weight, same rounded-line feel) loaded from CDN — wrapped on a brand-colored plate so the TERMY treatment still reads. Flag the substitution in mocks.
- **SVGs preferred** for everything static. PNG only for photographic mascots and real renders.

### Substitutions we made

- Lucide icons are used in UI kit scaffolding (menu, close, arrow, check) as a placeholder until the full TERMY pictogram set is provided. **Please share the pictogram SVG pack** from the production `assets/pictograms/` folder (wasn't in the snapshot).
- **Instrument Serif** is loaded from Google Fonts; if TERMY has an internal variant with custom metrics, send the font files.

---

## UI Kits

- **`ui_kits/site/`** — a working recreation of termybrand.com: header, editorial hero, product grid, temperature-mode pills, client logo strip, pull-quote testimonial, CTA section, footer.

Open `ui_kits/site/index.html` for an interactive walkthrough (product grid → detail → contact flow, all fake).
