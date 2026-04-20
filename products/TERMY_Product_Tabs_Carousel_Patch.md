# TERMY · Product page tabs → horizontal carousel

Патч по ТЗ: на странице товара SHOCK® 600 Cool (v2) убран вертикальный page jump по клику на вкладку, вместо этого реализован горизонтальный sliding-carousel с 7 секциями в одном viewport.

## 1. Файлы

### Найдены и изменены
- `products/shock-600-cool-v2.html` — единственный product page в текущем проекте (v1 `shock-600-cool.html` оставлен как базовая версия-референс, не трогался).

### Не изменены
- `index.html` — главная страница каталога;
- `products/shock-600-cool.html` — первая версия эталонной карточки;
- все остальные файлы bot-ponton (server, widget, docs, knowledge-base, img, layout-стили).

Ни один файл вне `products/shock-600-cool-v2.html` не правился.

## 2. Где была старая anchor-scroll логика

В `<script>` внутри `products/shock-600-cool-v2.html` блок «Tabs → scroll to section»:

```js
function goTo(id){
  var el = document.getElementById(id);
  var rect = panesWrap.getBoundingClientRect();
  var target = window.scrollY + rect.top - 120;
  window.scrollTo({top: target, behavior:'smooth'});   // ← вертикальный page jump
  var idx = paneIds.indexOf(id);
  if(idx >= 0) track.scrollTo({left: idx * track.clientWidth, behavior:'smooth'});
  tabs.forEach(function(t){ t.classList.toggle('on', t.dataset.t === id); });
}
```

Параллельно использовался native `scroll-behavior:smooth` на `.panes__track` — давал недостаточно выразительный easing и конфликтовал с `scroll-snap` на середине анимации.

## 3. Как внедрена carousel-track логика

### Разметка (уже существовала)
Семь секций обёрнуты в `.panes > .panes__track > section.pane` (каждая `.pane` занимает `flex:0 0 100%`). Sticky-панель `.panes__nav` с кнопками `‹` / `›` (`#pane-prev`, `#pane-next`).

```
<div class="panes">
  <div class="panes__track" id="panes-track">
    <section class="pane" id="specs">    …</section>
    <section class="pane pane--dk" id="benefits">…</section>
    <section class="pane" id="tech">     …</section>
    <section class="pane pane--dk" id="uc">…</section>
    <section class="pane" id="trust">    …</section>
    <section class="pane" id="dl">       …</section>
    <section class="pane" id="faq">      …</section>
  </div>
  <div class="panes__nav"><button id="pane-prev">‹</button><button id="pane-next">›</button></div>
</div>
```

### Скрипт (переписан в этом патче)
Анимация через `requestAnimationFrame` с easing `easeInOutCubic` — «протягивание», а не дёрг.

```js
function easeInOutCubic(t){ return t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }

function animateScrollLeft(to, duration){
  duration = duration || 650;
  var from = track.scrollLeft, delta = to - from;
  var t0 = performance.now();
  track.classList.add('is-anim');              // на время анимации снимаем scroll-snap
  (function tick(now){
    var p = Math.min(1, (now - t0) / duration);
    track.scrollLeft = from + delta * easeInOutCubic(p);
    if(p < 1) requestAnimationFrame(tick);
    else { track.classList.remove('is-anim'); updateActive(); }
  })(performance.now());
}

function goToIdx(idx){
  idx = Math.max(0, Math.min(paneIds.length - 1, idx));
  animateScrollLeft(idx * track.clientWidth, 680);    // никакого window.scrollTo
  setActive(paneIds[idx]);
  if(history.replaceState) history.replaceState(null, '', '#' + paneIds[idx]);
}
```

Vertical `window.scrollTo` удалён полностью. Клик по табу не прыгает страницу — только двигает track.

### CSS
```
.panes        { overflow:hidden; position:relative; }
.panes__track { display:flex; overflow-x:auto; scroll-snap-type:x mandatory;
                overscroll-behavior-x:contain; touch-action:pan-y pinch-zoom; }
.panes__track.is-anim { scroll-snap-type:none; }     /* чтобы snap не спорил с RAF */
.pane         { flex:0 0 100%; scroll-snap-align:start; }
```

Убран `scroll-behavior:smooth` на треке — управляем анимацией сами через RAF с кастомным easing.

## 4. Синхронизация active tab

Три источника переключения — все ведут в единую функцию `setActive(id)` / `updateActive()`:

1. **Клик по табу** — `goTo(id)` → наша анимация → в её завершении вызывается `updateActive()`, который вычисляет `idx = round(scrollLeft / clientWidth)` и подсвечивает нужную вкладку; попутно обновляется disabled-состояние стрелок и `history.replaceState('#id')`.
2. **Свайп / drag / wheel по треку** — `scroll` event с debounce 60 мс → `updateActive()` (но только если сейчас не работает RAF, чтобы не дёргать лишний раз).
3. **Стрелки `‹` / `›`** — `goToIdx(current ± 1)`.

Ресайз окна — пересчёт `scrollLeft = idx * clientWidth`, чтобы текущая панель не «смещалась» после смены ширины viewport.

## 5. Внесённые CSS/JS изменения

### CSS (3 правила)
- `.panes` → добавлен `overflow:hidden` для чистого визуального «отреза» виньетки вне viewport.
- `.panes__track` → добавлены `overscroll-behavior-x:contain` и `touch-action:pan-y pinch-zoom` (свайп по X, вертикальная прокрутка страницы — как была); удалён `scroll-behavior:smooth`.
- `.panes__track.is-anim` → новый класс, который временно отключает `scroll-snap-type` пока RAF-анимация переставляет `scrollLeft` (иначе snap «перетягивает» trackLeft в конце каждого кадра).

### JS
Полностью переписан блок «Tabs → …» внутри `<script>` в конце `shock-600-cool-v2.html`:

- **Удалено:** `window.scrollTo({top, behavior:'smooth'})` и вызов native `track.scrollTo({left, behavior:'smooth'})`.
- **Добавлено:** `easeInOutCubic`, `animateScrollLeft` (rAF), `goToIdx`, `goTo(id)`, `updateActive`, `updateArrows`, hash-handler, resize-handler.
- **Сохранено:** массив `paneIds`, кнопки `.tabs__btn`, стрелки `#pane-prev`/`#pane-next`, поведение `.tabs` sticky (без правок).

## 6. Ограничения и риски

- **Drag-мышью** не реализован — это потребовало бы `pointer`-слушателей с ручным подсчётом velocity, риск конфликта с `scroll-snap`. На touch-устройствах работает нативный swipe (через `overflow-x:auto`), этого достаточно по ТЗ п. 8.
- **Очень длинный контент в одной панели** (например FAQ со всеми раскрытыми ответами) — страница вытянется по высоте: панели синхронизируют только `scrollLeft` трека, высота считается по максимальному контенту. Если это станет неудобно — можно позже добавить `overflow-y:auto` на `.pane` с лимитом `max-height`, но это требует design-решения, в данный патч не включено.
- **Hash-навигация без jump** — `history.replaceState` вместо `location.hash =`, чтобы браузер не инициировал собственный jump-to-anchor. Внешние ссылки вида `…/shock-600-cool-v2.html#tech` продолжат работать — `handleHash()` на загрузке выставит `scrollLeft` без анимации, без vertical scroll.
- **Sticky `.tabs`** теперь ссылается на панели внутри `.panes`, которые сами не являются sticky — при скролле страницы вниз, если юзер прокрутил мимо всего блока `.panes`, табы уже не соответствуют ничему видимому. Это прежнее поведение, не regresion.
- **Prefers-reduced-motion** не учитывается — при желании легко добавить `if(matchMedia('(prefers-reduced-motion: reduce)').matches){ duration = 0 }`.

## 7. Как проверить локально

1. Сервер уже поднят в фоне: `http://127.0.0.1:8765/` (bot-ponton root).
2. Открыть: `http://127.0.0.1:8765/products/shock-600-cool-v2.html`.
3. Прокрутить страницу до липкой вкладочной навигации (Характеристики / Преимущества / …).
4. Кликнуть по любой вкладке — страница вертикально **не прыгает**, под табами сдвигается только карусель с плавным easing.
5. Свайп пальцем / трекпадом горизонтально на `.panes__track` — активная вкладка подсвечивается в такт прокрутке.
6. Кнопки `‹` / `›` в правом нижнем углу карусели — листают по одной секции.
7. Проверить `?#faq` в адресной строке — при перезагрузке откроется сразу панель FAQ без vertical jump.
8. Responsive: DevTools → мобильная ширина 375 px. Табы в ряд со скроллом, панели — по одной на весь экран, свайп работает.

---

## Итог

### Изменённые файлы
- `products/shock-600-cool-v2.html` — один файл, точечные правки в `<style>` и в `<script>`.

### Что теперь делает интерфейс
- Клик по вкладке локальной product-навигации **не прокручивает страницу вертикально**.
- Под табами один горизонтальный viewport, внутри которого RAF-анимация `scrollLeft` с `easeInOutCubic` плавно «протягивает» нужную секцию слева/справа.
- Active tab всегда синхронизируется с реально видимой панелью (клик, стрелки, swipe, wheel, hash).
- Все 7 секций со всем существующим контентом сохранены в DOM; вне активной позиции они остаются за границей viewport, но рендерятся (SEO-текст и заголовки доступны краулеру).

### Что НЕ менялось
- `index.html`, `products/shock-600-cool.html`, `server/`, `widget/`, `docs/`, `knowledge-base/`, `img/`, остальные MD-аудиты в корне `bot-ponton`.
- Верхний `header`, `nav`, `footer`, брендбук, typography, цветовые токены — все без изменений.
- Контент всех 7 секций (тексты, таблицы, FAQ, отзывы, downloads) сохранён полностью.
