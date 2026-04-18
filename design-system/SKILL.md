---
name: termy-design
description: Use this skill to generate well-branded interfaces and assets for TERMY (Russian B2B thermal-packaging brand, termybrand.com), either for production code or throwaway prototypes, mocks, decks, landing pages, social tiles, or booth panels. Contains essential design guidelines, colors, type, fonts, real product/mascot assets, and a termybrand.com UI kit for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `ui_kits/site/`, `preview/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, landing pages), copy assets out of `assets/` and `ui_kits/site/` and create static HTML files for the user to view. Always import `colors_and_type.css` so the brand tokens are live. Default page background is the warm paper `--paper` (#F5F2EC), never pure white.

If working on production code, read the tokens and tone guidance in `README.md` and copy the relevant React/JSX components out of `ui_kits/site/` to become a fluent designer in this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions (surface, audience, product family, temperature mode, inclusion of mascot), and act as an expert designer who outputs HTML artifacts or production code, depending on the need.

Brand non-negotiables (repeat back before starting work):

- Use **Inter** everywhere (Instrument Serif only for editorial H1).
- No emoji, no unicode-as-icon, no dark mode + radial orbs, no glassmorphism.
- Gradients are **brand pairs** (purple, indigo, teal, shock, amber, temperature modes) — never invented.
- Grain texture on colored blocks, warm paper background on light surfaces.
- Tone: short, engineering-precise, Russian; temperatures and specs are visual accents, not footnotes.
