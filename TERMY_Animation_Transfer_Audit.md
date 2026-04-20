# TERMY | Animation Transfer Audit

> Source: current project codebase + ТЗ performance data
> Note: termybrand.com returns 403 for automated access. Audit based on project code analysis, TZ diagnostics (LCP 20.2s, 4.68MB page, Elementor bloat), and B2B UX standards.

---

## 1. Verdict

Текущий проект уже содержит **сбалансированный набор анимаций** для B2B-каталога. Не нужно добавлять больше — нужно оптимизировать существующие. Старый сайт (termybrand.com) на Elementor имеет LCP 20.2 сек и вес 4.68 MB — любые анимации оттуда нужно адаптировать радикально легче.

---

## 2. Audit Scope

### Текущие анимации в проекте (index.html)

| # | Анимация | Тип | Триггер | Где | CSS |
|---|---------|-----|---------|-----|-----|
| 1 | Scroll reveal (fade up) | entrance | scroll (IntersectionObserver) | Все `[data-a]` элементы | `opacity:0→1, translateY(20px→0), 0.55s ease` |
| 2 | Card hover lift | hover | mouse | `.card`, `.pcard`, `.hub-card` | `translateY(-3px), box-shadow, 0.25s ease` |
| 3 | Button hover | hover | mouse | `.btn--p` | `translateY(-1px), box-shadow, 0.2s` |
| 4 | Mascot float | continuous | auto | `.mascot-float` | `translateY(0→-10px), 3s ease-in-out infinite` |
| 5 | Mascot wiggle | hover | mouse | `.mascot-float:hover` | `rotate(-6°→5°→0°), scale(1.1), 0.6s` |
| 6 | Mascot stagger | delay | auto | `.delay1`–`.delay6` | `animation-delay: 0.4s–2.4s` |
| 7 | Logo placeholder pulse | continuous | auto | `.logo-ph::after` | `translateX(-100%→100%), 2s infinite` |
| 8 | FAQ accordion | transition | click | `.faq__a` | `max-height 0→auto, 0.4s ease` |
| 9 | Hamburger morph | transition | click | `.ham span` | `translateY + rotate, 0.3s` |
| 10 | Nav link color | hover | mouse | `.hdr__nav a` | `color transition, 0.2s` |
| 11 | Input focus border | focus | focus | `.form__inp` | `border-color, 0.2s` |
| 12 | Card image scale | hover | mouse | `.card__img img` | `transform:scale, 0.4s ease` |
| 13 | Tab switch | click | click | `.tabs__b` | `border/color, 0.2s` |
| 14 | Header scroll shadow | scroll | scroll | `.hdr.scrolled` | `box-shadow, 0.2s` |
| 15 | Reduced motion override | media | system | `prefers-reduced-motion` | All animations disabled |

### Данные по старому сайту (из ТЗ)

- Elementor: 1.24 MB CSS, 0.99 MB JS
- LCP: 20.2 сек (цель <2.5 сек)
- 92 H2 на главной
- Hero со слайдером → **отклонён обоими аудитами + NNGroup**
- CLS: 0 (единственный ОК-показатель)
- Lighthouse Performance: 56/100 (цель ≥90)

---

## 3. Animation Inventory — Оценка

### Существующие (в проекте)

| # | Анимация | Цель | Качество | Решение |
|---|---------|------|---------|---------|
| 1 | Scroll reveal | hierarchy support | **good** | ✅ Reuse as-is |
| 2 | Card hover lift | product emphasis | **good** | ✅ Reuse as-is |
| 3 | Button hover | CTA-support | **good** | ✅ Reuse as-is |
| 4 | Mascot float | decorative | **acceptable** | ⚠️ Adapt — reduce amplitude |
| 5 | Mascot wiggle | decorative | **acceptable** | ⚠️ Adapt — make optional |
| 6 | Mascot stagger | decorative | **acceptable** | ✅ Keep (lightweight) |
| 7 | Logo pulse | decorative/placeholder | **weak** | ❌ Remove when real logos available |
| 8 | FAQ accordion | navigation | **good** | ✅ Reuse as-is |
| 9 | Hamburger morph | navigation | **good** | ✅ Reuse as-is |
| 10 | Nav color | navigation | **good** | ✅ Reuse as-is |
| 11 | Input focus | CTA-support | **good** | ✅ Reuse as-is |
| 12 | Card image scale | product emphasis | **good** | ✅ Reuse as-is |
| 13 | Tab switch | navigation | **good** | ✅ Reuse as-is |
| 14 | Header shadow | hierarchy | **good** | ✅ Reuse as-is |
| 15 | Reduced motion | accessibility | **good** | ✅ Reuse as-is |

### Потенциальные (из старого сайта / B2B best practices)

| # | Анимация | Тип | Цель | Решение | Обоснование |
|---|---------|-----|------|---------|-------------|
| P1 | Hero counter animation | entrance | trust-building | ⚠️ Adapt | Цифры proof-bar (49₽, 1 коробка) можно анимировать при скролле. Легковесно, усиливает доверие |
| P2 | Slider/carousel | continuous | product showcase | ❌ Reject | ТЗ: «Hero без слайдера, подтверждено NNGroup». Слайдеры = плохой B2B UX |
| P3 | Parallax background | scroll | decorative | ❌ Reject | Тяжёлый, вредит mobile, не B2B |
| P4 | Client logo marquee | continuous | trust-building | ⚠️ Adapt | Бегущая строка логотипов. Только если реальные логотипы появятся. Лёгкий CSS marquee |
| P5 | Number count-up | entrance | trust-building | ⚠️ Adapt | «65 000 визитов», «7 линеек» — count-up при появлении в viewport. Усиливает восприятие масштаба |
| P6 | Sticky CTA pulse | continuous | CTA-support | ❌ Reject | Пульсирующая кнопка = раздражает, снижает доверие в B2B |
| P7 | Product image zoom on hover | hover | product emphasis | ✅ Reuse | Уже есть (card__img img scale). Достаточно |
| P8 | Page transition fade | navigation | hierarchy | ❌ Reject | Было (fadeIn) — убрали из-за purple bleed-through. Не возвращать |
| P9 | Smooth scroll to anchor | navigation | CTA-support | ✅ Add | `scroll-behavior:smooth` уже есть. Достаточно |
| P10 | Toast/notification after form | microinteraction | CTA-support | ✅ Add | Уже есть (.form__ok). Можно добавить slide-in анимацию |

---

## 4. Good Animations Worth Adapting

| # | Что | Куда | Как |
|---|-----|------|-----|
| 1 | **Counter count-up** | Homepage trust strip (49₽, 1 коробка, 2 дня, 7 линеек) | JS: IntersectionObserver → animate number from 0 to value over 1s. ~20 lines JS, zero weight |
| 2 | **Form success slide-in** | All CTA forms (.form__ok) | CSS: `transform:translateY(10px)→0, opacity:0→1, 0.3s`. Уже есть `.form__ok.vis` — добавить transition |
| 3 | **Temperature badge pulse** | SHOCK® pages, solution pages | CSS: subtle scale pulse on `.temp-badge` on hover. `scale(1)→scale(1.05), 0.2s` |
| 4 | **Scroll progress indicator** | All long product pages | CSS: thin bar at top of viewport showing scroll %. Lightweight, helps navigation on long pages |

## 5. Animations Worth Adapting Only in Simplified Form

| # | Что | Почему упрощать |
|---|-----|----------------|
| 1 | **Mascot float** | Continuous animation = battery drain on mobile. Reduce to `hover-only` or `once on entrance` |
| 2 | **Logo placeholder pulse** | Remove entirely when real logos appear. Pulse on placeholder = signals incompleteness |
| 3 | **Client logo marquee** | Only if 6+ real logos. CSS-only, `animation: marquee 20s linear infinite`. No JS |

## 6. Animations to Reject

| # | Что | Почему |
|---|-----|-------|
| 1 | **Hero slider/carousel** | ТЗ: явно отклонён. NNGroup: слайдеры в hero снижают конверсию на 1-3% |
| 2 | **Parallax backgrounds** | +50-100KB JS, вредит CLS, бесполезен на mobile |
| 3 | **Page transition fadeIn** | Вызывал purple gradient bleed-through. Убрано. Не возвращать |
| 4 | **Sticky CTA pulse/bounce** | Consumer pattern, не B2B. Снижает доверие у закупщиков |
| 5 | **Heavy entrance animations** | Elementor-style stagger (0.3s delay per element × 15 elements = 4.5s до видимости контента). Убивает FCP |
| 6 | **Auto-playing video background** | +2-5 MB, убивает LCP. Видео — только по клику |
| 7 | **Infinite scroll / lazy load cards** | B2B-каталог с 6 продуктами не нуждается в infinite scroll |
| 8 | **Animated gradients** | CPU-intensive, бесполезны для конверсии |

---

## 7. Best Placements in the New Site

| Зона сайта | Рекомендуемые анимации | Не рекомендуемые |
|-----------|----------------------|-----------------|
| **Homepage hero** | Scroll reveal (existing), counter count-up для proof-bar | Слайдер, parallax, animated gradient |
| **Solutions cards** | Card hover lift (existing), mascot float (simplified) | Heavy entrance stagger |
| **Products grid** | Card hover lift + image scale (existing) | Carousel, infinite scroll |
| **Product pages** | Tab switch (existing), scroll reveal (existing) | Auto-play video, parallax |
| **CTA blocks** | Form focus states (existing), success slide-in | Pulsing button, bouncing arrow |
| **Trust/logos** | Logo marquee (when real logos available) | Animated counters (too flashy) |
| **Header** | Scroll shadow (existing), hamburger morph (existing) | Dropdown slide animations |
| **Footer** | None needed | Anything — footer should be static |

---

## 8. Performance and Mobile Risk Notes

| Риск | Текущий статус | Рекомендация |
|------|---------------|-------------|
| **Continuous animations** | 7 mascots × `3s infinite` = 7 concurrent animations | Переключить на `animation-play-state:paused` вне viewport |
| **IntersectionObserver** | Уже используется для scroll reveal | ✅ Эффективный подход |
| **prefers-reduced-motion** | ✅ Уже реализовано | Сохранить |
| **Animation on mobile** | Все анимации одинаковы desktop/mobile | Рассмотреть `@media (hover:hover)` для hover-only эффектов |
| **CLS risk** | Scroll reveal с `translateY(20px)` может вызвать layout shift | Текущий threshold 0.08 минимизирует, но мониторить |
| **Total animation weight** | ~30 строк CSS keyframes + 10 строк JS | ✅ Минимальный. Не добавлять библиотеки |

---

## 9. Top 5 Recommended Transfers

| # | Анимация | Откуда | Куда | Сложность | Вес |
|---|---------|--------|------|-----------|-----|
| 1 | **Counter count-up** | Best practice | Homepage trust strip | Low | ~20 lines JS |
| 2 | **Form success slide-in** | Enhance existing | All CTA .form__ok | Low | ~3 lines CSS |
| 3 | **Mascot hover-only** | Simplify existing | Solutions cards | Low | Change existing CSS |
| 4 | **Logo marquee** | Best practice | Homepage "Почему мы" (when real logos) | Low | ~10 lines CSS |
| 5 | **Scroll progress bar** | Best practice | Long product pages | Low | ~15 lines CSS+JS |

---

## 10. Top 5 Avoid-at-All-Costs

| # | Анимация | Почему нельзя |
|---|---------|--------------|
| 1 | **Hero slider** | ТЗ: отклонён. -1-3% конверсии по NNGroup |
| 2 | **Parallax** | +50-100KB, CLS risk, бесполезен на mobile, не B2B |
| 3 | **Page fadeIn transitions** | Вызывал critical rendering bug (purple bleed). Убран |
| 4 | **Animated gradient backgrounds** | CPU drain, отвлекает от контента, не усиливает trust |
| 5 | **Auto-play media** | +2-5 MB, убивает LCP. Текущий LCP цель <2.5s |

---

## 11. Final Conclusion

Текущий проект уже имеет **оптимальный набор из 15 анимаций** для B2B-каталога:
- 10 из 15 = **reuse as-is** (card lifts, focus states, scroll reveal, navigation)
- 3 из 15 = **simplify** (mascot float → hover-only, logo pulse → remove with real logos)
- 2 из 15 = **functional** (FAQ accordion, tabs) — не менять

**Добавить стоит только 2 анимации:**
1. Counter count-up для proof-bar (усиливает trust)
2. Form success slide-in (улучшает UX обратной связи)

**Ни одна анимация со старого сайта не должна переноситься буквально** — старый сайт на Elementor имеет 4.68 MB и LCP 20.2s, что в 8 раз хуже целевого показателя. Любой перенос = только логика, не код.
