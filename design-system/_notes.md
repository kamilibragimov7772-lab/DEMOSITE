# TERMY working notes

## Source notes
- Brandbook PDF: uploads/termy-brandbook-ru ().pdf (+ copy in TERMY_site_final/docs/)
- Site code: TERMY_site_final/ (mounted)
- Main: TERMY_site_final/index.html (5464 lines, single giant HTML with inline CSS)
- Pages: about, blog, branding, cases, contacts, delivery, faq, products, retail, solutions, knowledge-base, privacy, 404
- Brandbook PDF extracted pages: TERMY_site_final/_archive/misc/brandbook_pages/
- Logo previews: TERMY_site_final/_archive/misc/logo_previews/
- Docs with copy examples: docs/TERMY_База_знаний.docx, docs/ТЗ_*.docx

## Key tokens from site CSS (actually used)
### Surfaces (dark theme on actual site)
- --s900:#0D0F11  --s850:#131619  --s800:#1A1D22  --s700:#22262D  --s600:#2E333B
- --s100:#F4F5F7  --s0:#FFFFFF

### Text
- --t1:#F0F1F3  --t2:#9EA5B1  --t3:#636B78  --t-dark:#1A1D22

### Accents (SITE uses purple — #7D46AF primary)
- --c-a:#7D46AF (primary accent)  --c-ah:#9466BB (hover)
- --c-al:rgba(125,70,175,0.12) (tint)
- NOTE: brandbook spec says #323287 (deeper indigo) + eco #28A096→#32C8BE teal
- There is a mismatch — user's brandbook specifies #323287 indigo, but shipped site uses #7D46AF/#9466BB purple

### Fonts (TEMPORARY per site comments)
- Display: Unbounded 800
- Body: Manrope 500
- Mono: JetBrains Mono
- NOTE: user brandbook says Inter + Instrument Serif for H1 edit layouts. ANOTHER mismatch.

### Hero blobs
- #1B4332 green, #C77D3E orange, #4A7C9A blue, #5B4E75 plum (gooey mix-blend)

### Radii
- --r:8px  --rl:12px  --rxl:16px  --r-badge:4px

### Layout
- --max-w:1280px  --gutter:clamp(1rem,4vw,3rem)  --sec-py:clamp(5rem,10vw,8rem)

### Motion
- --ease:cubic-bezier(.4,0,.2,1)

## Logo
- No SVG/PNG file shipped. Logo is rendered as text + glyph:
  ```
  <a href="/" class="hdr__logo">
    <span style="font-size:1.68rem;font-weight:800;letter-spacing:.08em;color:#fff;text-transform:lowercase">termy</span>
    <span class="hdr__logo-star" style="color:#9466BB;font-size:0.9rem">✻</span>
  </a>
  ```
- Star ✻ spins (logoSpin 4s linear infinite)

## Assets on disk
- img/client-logos/*.svg (14 clients — Ozon Fresh, VkusVill, Samokat, Kuper, Lindt, Fix Price, Azbuka Vkusa, Auchan, X5, Morskoy Ulov, Gemotest, Komus, Delovye Linii, Instamart)
- img/mascots/mascot_1..7.png
- img/products/*.webp (many SKUs) + cutouts, configurator renders
- img/renders/hero-termopaket-pro.webp, three-benefits.webp, box-with-samples.webp, logistics-trucks.webp, master-nad-svezhestyu.webp, termy-sizes-4.webp, branding-flexo-silk.webp, facts-about-termy.webp
- img/branding/fastfood.png, icecream.png, retail.png
- img/production/production-unit.jpg
- _archive/misc/brandbook_pages/*  (brandbook page PNGs)
- _archive/misc/logo_previews/*  (logo files!)

## Typography rules observed
- H1/H2 use Unbounded display, 700-800
- Body Manrope 400/500
- Labels: uppercase, letter-spacing .06-.08em, --c-a color
- Hero: clamp(2.25rem,5vw,3.75rem)

## Components identified in site code
- .hdr (sticky header, shrinks on scroll)
- .btn .btn--p / --s / --ghost / --lg / --sm
- .card, .pcard (product card with aspect-ratio:1 image + pulse ring animation)
- .pill .pill--a .pill--brand
- .hero with blobs + huge ghost "TERMY" bg text
- .cta-sec (2-col: text left, form right)
- .ftr dark footer with 4-col grid
- .tstrip trust strip with numbers
- .crumbs breadcrumbs with → separator
- .pain / .solve (problem / solution cards)
- .tbl table, .tw wrapper
- .tabs (underline tabs)
- .faq accordion
- .form with labels
- .feat-pill (8 reasons grid)
- .cs-hero (animated case-study thumbnails: delivery/cycles/pharma/brand)
- .brand-showcase (crossfading brand packaging showcase)
- Products: Termopakety (Standart/PRO/Light/S dnom/Zip lock/PRO MAX), BaggedBox / BublPak, LinerBox, Termoshopper, Termokruzhka, SHOCK (ice accumulators)

## Copy voice examples (from index.html)
- "Термопакеты TERMY — это не расходник, а страховка вашего товара и репутации."
- "От 49 ₽ за трёхслойный пакет. Готовы конкурировать"
- "Экспресс-отгрузка по Москве за 24 часа после оплаты"
- "Тираж от 1 коробки. Рекордный минимум по рынку"
- "Своё производство с тремя стадиями контроля качества"
- "Ценные кадры с высокой З/П. Работают счастливые люди"
- "Продукция на 100% подлежит вторичной переработке"
- Uses emoji in CTA phone/email: 📞 ✉️ (contrary to brandbook "никаких эмодзи")
- Uses ₽, °C, short declarative, Russian, no formal "Вы" — conversational "we"

## Mismatch with brandbook
User's brandbook spec (via prompt):
- Primary #323287→#28286E indigo
- Eco #28A096→#32C8BE teal
- Warm off-white paper bg
- Inter + Instrument Serif
- Light editorial bento
- No emoji, no radial orbs

Shipped site:
- DARK theme (#0D0F11)
- Purple #7D46AF accent
- Unbounded + Manrope
- Radial orb blobs in hero (AI-slop-adjacent)
- Some emoji (📞 ✉️)

Strategy: **The brandbook is the TRUE NORTH.** Design system = brandbook spec. Site code = reference, use for components + structure + copy, but port colors/type to brandbook. Flag this clearly in README.
