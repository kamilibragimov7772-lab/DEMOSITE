"""
Массово вставляет блоки «Проблема сегмента» и «Документы и стандарты»
в 6 solution pages (кроме уже-сделанного p-sol-onlayn-magaziny).

Идемпотентность: если блок уже вставлен (есть маркер-комментарий), не вставляет повторно.
"""
import re
from pathlib import Path

INDEX = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\index.html")

# Боли по сегментам (4 карточки на каждый)
PROBLEMS = {
    "p-sol-kurer": {
        "title": "Что ломает курьерскую доставку",
        "cards": [
            ("Смешанные зоны в одном заказе", "Горячее, охлаждённое и мороженое рядом",
             "Без температурного зонирования еда теряет режим за 30–40 минут, а клиент фиксирует, что пицца остыла или мороженое «поплыло»."),
            ("Задержки на последней миле", "Подъезд, лифт, ожидание — это плюс 20–40 минут",
             "Без запаса термозащиты 30-минутное плечо превращается в 90-минутное, и груз не дожил до вручения в нужном состоянии."),
            ("Разнобой упаковки", "Каждый ресторан — свой формат",
             "Курьер тащит 5 разных пакетов от 5 разных партнёров. Единый формат упрощает сборку и выдачу."),
            ("Многоразовость и мойка", "Шопперы надо не только использовать, но и обслуживать",
             "Модель «один шоппер — 10+ циклов» работает только если формат выдерживает мойку и быстрый ход обратно курьеру."),
        ],
    },
    "p-sol-kejtering": {
        "title": "Что ломается в выездных событиях",
        "cards": [
            ("Большой объём на одно плечо", "Сетовая выдача от кухни до площадки",
             "Когда нужно везти 80–200 порций одновременно, стандартные термопакеты не справляются — нужен коробочный формат с аккумуляторами."),
            ("Смешение горячих и холодных позиций", "Банкет = салаты + горячее + десерты",
             "Один LinerBox® с зональной упаковкой удерживает всё в нужном режиме до момента подачи."),
            ("Долгое ожидание перед подачей", "Гости не садятся за стол сразу",
             "Сетапы, речи, задержки программы — еда ждёт в термотаре. Усиленный режим SHOCK® даёт запас ещё на 2–3 часа."),
            ("Логистика площадок", "Загрузка без лифтов, длинные коридоры, улица",
             "Коробочный формат LinerBox® удобнее переносить и штабелировать, чем россыпь термопакетов."),
        ],
    },
    "p-sol-fermer": {
        "title": "Что ломается у фермерских поставок",
        "cards": [
            ("Деликатные позиции", "Ягоды, зелень, сыр, охлаждённое молоко",
             "Эти продукты чувствительны к тряске и температуре сильнее, чем замороженка. Нужна аккуратная термоупаковка + БаблПак."),
            ("Короткая цепь без промежуточных холодильников", "Фермер → клиент напрямую",
             "Без холодильной логистики между сбором и доставкой единственная защита — сам термопакет и SHOCK®."),
            ("Разнородные заказы", "Молочка + ягоды + мёд + овощи в одном пакете",
             "Разные продукты требуют разных режимов. Гелевый SHOCK® + Standart — компромисс, который работает."),
            ("Сезонность", "Летом жара, зимой минус",
             "Летний режим требует усиленной термозащиты и большего количества аккумуляторов. Зимой — защита от заморозки для ягод."),
        ],
    },
    "p-sol-farma": {
        "title": "Что критично для фарма-сегмента",
        "cards": [
            ("Температурный режим +2…+8°C", "Обязательный для ряда препаратов",
             "Нарушение режима ведёт к списанию партии. Требуется связка «термокороб + SHOCK® Голубой» с проверенным запасом."),
            ("Длинные плечи доставки", "Межрегиональные маршруты 24–48 часов",
             "Стандартная упаковка на таких дистанциях не справляется. Решение — LinerBox® + 3–4 аккумулятора под конкретный маршрут."),
            ("Документация и прослеживаемость", "Протоколы, спецификации, сертификаты",
             "Фарма-клиент требует бумагу: ТУ, ГОСТ, протоколы испытаний. Без этого невозможно включить поставщика в список одобренных."),
            ("Риск списания при нарушении", "Стоимость ошибки высока",
             "Партия препаратов стоит в разы дороже упаковки. Экономия на термозащите обходится в десятки раз дороже рекламации."),
        ],
        "wording": "safe",  # без медицинских заявлений
    },
    "p-sol-myasnik": {
        "title": "Что ломается при доставке мяса",
        "cards": [
            ("Одновременно охлаждённое и замороженное", "Разные зоны в одной отгрузке",
             "Свежий стейк в +2°C рядом с замороженным полуфабрикатом −15°C требует разных упаковочных режимов внутри одной коробки."),
            ("Вес и объёмы", "Мясное производство — крупный тоннаж",
             "Стандартные термопакеты не всегда тянут нагрузку. PRO с усиленным дном и LinerBox® крупных размеров — базовый набор."),
            ("HoReCa требует стабильности", "Один и тот же режим от партии к партии",
             "Ресторан-клиент не может работать с нестабильным качеством. Решение — фиксированная спецификация упаковки по договору."),
            ("Длинное плечо до точек продажи", "200–500 км от производства",
             "Без системы SHOCK® + LinerBox® на такой дистанции мясо теряет режим к моменту приёмки."),
        ],
    },
    "p-sol-shef-restoran": {
        "title": "Что ломается в ресторанной доставке",
        "cards": [
            ("Презентация на выдаче", "Блюдо должно выглядеть как в зале",
             "Термоупаковка не должна мять, давить или деформировать сервировку. Формат с внутренним каркасом LinerBox® или термошоппер решает."),
            ("Три температурные зоны одновременно", "Горячее + холодные закуски + десерт",
             "Без зонирования горячее нагревает закуски, десерт тает. Решение — несколько термопакетов в одном LinerBox®."),
            ("Сбор и возврат тары", "Многоразовые форматы снижают стоимость",
             "Термошоппер возвращается с курьером — стоимость на единицу доставки падает после 10+ циклов."),
            ("Брендирование под ресторан", "Упаковка — часть гостевого опыта",
             "Логотип заведения на шоппере или термопакете — дополнительная реклама и узнаваемость формата."),
        ],
    },
}


def build_problem_block(segment_key):
    info = PROBLEMS[segment_key]
    cards_html = []
    for lbl, title, text in info["cards"]:
        cards_html.append(
            '<div class="card"><div class="card__bd">'
            f'<div class="card__lbl" style="color:#A53728">{lbl}</div>'
            f'<div class="card__tl" style="color:var(--t-dark)">{title}</div>'
            f'<p class="card__tx" style="color:#636B78">{text}</p>'
            '</div></div>'
        )
    return (
        '<!-- Блок 2 ТЗ: Проблема сегмента -->\n'
        '<section class="sec sec--lt"><div class="ctr">\n'
        '<div class="mb6" data-a><span class="label mb1" style="display:block">Проблема сегмента</span>'
        f'<h2 style="color:var(--t-dark)">{info["title"]}</h2></div>\n'
        '<div class="grid g4" data-a>\n'
        + "\n".join(cards_html) + "\n"
        '</div>\n'
        '</div></section>\n\n'
    )


DOCUMENTS_BLOCK = """<!-- Блок 6 ТЗ: Документы и стандарты -->
<h2 style="color:var(--t-dark);margin-top:3rem;margin-bottom:1.5rem" data-a>Документы и стандарты</h2>
<div class="grid g3" data-a>
<div style="background:var(--s0);border:1px solid #E5E7EB;border-radius:var(--rl);padding:1.25rem">
<div style="font-weight:600;color:var(--t-dark);margin-bottom:.25rem">ТУ 22.22.11-001-47645032-2022</div>
<div style="font-size:var(--xs-fs);color:#636B78">Нормативный документ на термопакеты</div>
<span class="badge-confirmed" style="margin-top:.5rem;display:inline-flex">Confirmed</span>
</div>
<div style="background:var(--s0);border:1px solid #E5E7EB;border-radius:var(--rl);padding:1.25rem">
<div style="font-weight:600;color:var(--t-dark);margin-bottom:.25rem">ГОСТ Р 50962-96</div>
<div style="font-size:var(--xs-fs);color:#636B78">Сертификат на SHOCK®, до 26.02.2028</div>
<span class="badge-confirmed" style="margin-top:.5rem;display:inline-flex">Confirmed</span>
</div>
<div style="background:var(--s0);border:1px solid #E5E7EB;border-radius:var(--rl);padding:1.25rem">
<div style="font-weight:600;color:var(--t-dark);margin-bottom:.25rem">Протокол испытаний 2025</div>
<div style="font-size:var(--xs-fs);color:#636B78">Удержание температуры Standart + SHOCK®</div>
<span class="badge-confirmed" style="margin-top:.5rem;display:inline-flex">Confirmed</span>
</div>
</div>

"""


def patch_page(html, segment_key):
    # Маркер идемпотентности
    if f'<!-- Блок 2 ТЗ: Проблема сегмента --><!-- {segment_key} -->' in html:
        return html, False

    # Находим границы page div
    page_start = html.find(f'<div class="page" id="{segment_key}">')
    if page_start == -1:
        print(f"  [skip] page {segment_key} not found")
        return html, False
    # Находим конец hero section внутри этой page
    hero_end_marker = '</section>\n\n<section class="sec sec--lt"><div class="ctr">\n<div class="sol-mascot"'
    hero_end_idx = html.find(hero_end_marker, page_start)
    if hero_end_idx == -1:
        print(f"  [skip] hero end marker not found in {segment_key}")
        return html, False

    # Вставляем Problem после закрытия hero и перед sec--lt+sol-mascot
    problem_block = build_problem_block(segment_key).replace(
        '<!-- Блок 2 ТЗ: Проблема сегмента -->',
        f'<!-- Блок 2 ТЗ: Проблема сегмента --><!-- {segment_key} -->'
    )
    insert_point = hero_end_idx + len('</section>\n\n')
    html = html[:insert_point] + problem_block + html[insert_point:]

    # Теперь находим блок «Полезные материалы ... </div>` перед cta-sec
    page_end_search_start = html.find(f'<div class="page" id="{segment_key}">')
    page_end = html.find('</div><!-- /' + segment_key + ' -->', page_end_search_start)
    if page_end == -1:
        print(f"  [skip] page end marker not found for {segment_key}")
        return html, False

    # Ищем cta-sec начало внутри этой страницы
    cta_idx = html.rfind('<section class="cta-sec">', page_end_search_start, page_end)
    if cta_idx == -1:
        print(f"  [skip] cta-sec not found in {segment_key}")
        return html, False

    # Ищем закрытие основной секции перед cta-sec: </div></section>
    close_sec_marker = '</div></section>\n\n<section class="cta-sec">'
    close_sec_idx = html.rfind(close_sec_marker, page_end_search_start, cta_idx + 30)
    if close_sec_idx == -1:
        print(f"  [skip] close section before cta not found in {segment_key}")
        return html, False

    # Вставляем Documents перед </div></section>
    docs_block = DOCUMENTS_BLOCK.replace(
        '<!-- Блок 6 ТЗ: Документы и стандарты -->',
        f'<!-- Блок 6 ТЗ: Документы и стандарты --><!-- {segment_key} -->'
    )
    html = html[:close_sec_idx] + docs_block + html[close_sec_idx:]
    return html, True


def main():
    html = INDEX.read_text(encoding="utf-8")
    patched = []
    skipped = []
    for key in PROBLEMS.keys():
        html, ok = patch_page(html, key)
        if ok:
            patched.append(key)
        else:
            skipped.append(key)
    INDEX.write_text(html, encoding="utf-8")
    print(f"Patched: {patched}")
    print(f"Skipped: {skipped}")
    print(f"New size: {len(html)} chars")


if __name__ == "__main__":
    main()
