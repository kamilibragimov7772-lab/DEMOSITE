"""
Переписывает блок `.sol-mascot` на всех 7 solution pages:
заменяет мета-текст «Герой брендбука» на бизнес-описание роли персонажа.
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

INDEX = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\index.html")

# (page_id, number, title, role_paragraph, 4 аспекта)
SEGMENTS = [
    (
        "p-sol-onlayn-magaziny", "01", "Онлайн-магазины продуктов",
        "Отвечает за стабильность температурного режима на участке от склада до клиента. Помогает подобрать связку «термопакет + SHOCK®» под реальный профиль заказа: смешанная корзина, разная температурная нагрузка, плечо доставки от 30 минут до 4 часов.",
        [
            "Сборка корзины с разной температурной нагрузкой в один пакет",
            "Снижение процента температурных рекламаций",
            "Сценарии e-grocery, dark store и pick-up-точек",
            "Выбор формата под типовой заказ: Standart, PRO или LinerBox®",
        ],
    ),
    (
        "p-sol-kurer", "02", "Курьер / служба доставки",
        "Отвечает за стабильность температуры на всём маршруте — от кухни до клиента. Помогает выбрать компактный формат под сценарий «много точек, один курьер» и решает задачу многоразовой выдачи клиенту.",
        [
            "Смешанные температурные зоны в одной сумке или рюкзаке",
            "Задержки на последней миле: подъезд, лифт, ожидание",
            "Единый формат для мульти-ресторанной сборки заказов",
            "Многоразовость шопперов и их обслуживание",
        ],
    ),
    (
        "p-sol-kejtering", "03", "Кейтеринг / мероприятия",
        "Отвечает за перевозку больших объёмов еды без потери качества и температуры. Помогает собрать коробочное решение под банкет: горячее, холодные закуски, десерты — в одной отгрузке, без «плавающих» температурных зон.",
        [
            "Коробочные отгрузки на 80–200 порций за один подход",
            "Зональное хранение внутри одного LinerBox®",
            "Долгое ожидание подачи: сеты, речи, программа",
            "Логистика площадок без лифта и с переноской вручную",
        ],
    ),
    (
        "p-sol-fermer", "04", "Фермер / локальные продукты",
        "Отвечает за деликатную доставку фермерских продуктов от производителя до клиента. Помогает подобрать связку «термопакет + SHOCK® + БаблПак» под ягоды, зелень, молочку и сыры — продукты, чувствительные к тряске и температуре.",
        [
            "Короткая цепь без промежуточных холодильников",
            "Разнородные заказы: молочка, ягоды, мёд, овощи",
            "Сезонные перепады: жара летом, мороз зимой",
            "Премиальная подача как часть eco-food-позиционирования",
        ],
    ),
    (
        "p-sol-farma", "05", "Фарма / медицина",
        "Отвечает за сценарии хранения и транспортировки термолабильных товаров в контролируемом температурном режиме. Помогает собрать решение под конкретное плечо — внутригородское или межрегиональное — с обязательным документальным сопровождением.",
        [
            "Температурный режим и запас по времени на маршруте",
            "Длинные плечи доставки: 24–48 часов и больше",
            "Документация: ТУ, ГОСТ, протоколы испытаний",
            "Запас прочности против риска списания партии",
        ],
    ),
    (
        "p-sol-myasnik", "06", "Мясник / мясное производство",
        "Отвечает за сохранение холода, свежести и санитарных условий мясной продукции. Помогает собрать формат под смешанные отгрузки — охлаждённое и замороженное одновременно — и длинные плечи до точек продаж.",
        [
            "Охлаждённое и замороженное в одной отгрузке",
            "Вес и объёмы: крепкие форматы с усиленным дном",
            "HoReCa-стабильность качества от партии к партии",
            "Длинное плечо до точек продажи: 200–500 км",
        ],
    ),
    (
        "p-sol-shef-restoran", "07", "Шеф-повар / ресторан",
        "Отвечает за сохранение температуры блюд при доставке от кухни до гостя. Помогает собрать формат, который не мнёт презентацию блюда и позволяет курьеру везти 3 температурные зоны одновременно: горячее, холодное, десерт.",
        [
            "Презентация блюда на выдаче — формат не давит сервировку",
            "Три температурные зоны одновременно",
            "Сбор и возврат тары: многоразовость снижает стоимость доставки",
            "Брендирование упаковки под концепцию ресторана",
        ],
    ),
]


def build_new_block(page_id, number, title, paragraph, aspects):
    """Возвращает новый HTML для блока .sol-mascot__bd."""
    aspects_html = "\n".join(
        f'  <li style="padding:.35rem 0 .35rem 1.5rem;position:relative;font-size:var(--sm-fs);color:#636B78;line-height:1.55">'
        f'<span style="position:absolute;left:0;top:.55rem;width:.4rem;height:.4rem;border-radius:50%;background:var(--c-a)"></span>'
        f'{a}</li>'
        for a in aspects
    )
    return (
        '<div class="label mb1" style="display:block">Ответственный за сценарий</div>\n'
        f'<h3 style="color:var(--t-dark);margin-bottom:.5rem">Персонаж {number} — {title}</h3>\n'
        f'<p style="color:#636B78;line-height:1.7;margin-bottom:1rem">{paragraph}</p>\n'
        '<div style="font-size:var(--xs-fs);font-weight:700;text-transform:uppercase;letter-spacing:.5px;'
        'color:var(--c-a);margin-bottom:.5rem">Что решает для бизнеса</div>\n'
        f'<ul style="list-style:none;padding:0;margin:0">\n{aspects_html}\n</ul>'
    )


def patch(html):
    patched = []
    for page_id, number, title, paragraph, aspects in SEGMENTS:
        # Find the page
        page_start = html.find(f'<div class="page" id="{page_id}">')
        if page_start == -1:
            print(f"[skip] {page_id} not found")
            continue
        # Find sol-mascot__bd opening within this page
        bd_marker = '<div class="sol-mascot__bd">'
        bd_start = html.find(bd_marker, page_start)
        if bd_start == -1:
            print(f"[skip] sol-mascot__bd not found in {page_id}")
            continue
        # Find the matching </div> — we need to replace content inside __bd
        # The content structure is: <div class="sol-mascot__bd"> ... </div> (single-level)
        # Find matching </div> by tracking depth
        i = bd_start + len(bd_marker)
        depth = 1
        while depth > 0 and i < len(html):
            next_open = html.find("<div", i)
            next_close = html.find("</div>", i)
            if next_close == -1:
                break
            if next_open != -1 and next_open < next_close:
                depth += 1
                i = next_open + 4
            else:
                depth -= 1
                i = next_close + 6
        # i is now position right after the closing </div>
        end_marker = i - 6  # position of </div>
        # Replace content between bd_start+len(bd_marker) and end_marker
        new_content = build_new_block(page_id, number, title, paragraph, aspects)
        html = (
            html[:bd_start + len(bd_marker)]
            + "\n"
            + new_content
            + "\n"
            + html[end_marker:]
        )
        patched.append(page_id)
    return html, patched


def main():
    html = INDEX.read_text(encoding="utf-8")
    new_html, patched = patch(html)
    INDEX.write_text(new_html, encoding="utf-8")
    print(f"Patched {len(patched)} solution pages: {patched}")
    print(f"New size: {len(new_html)} chars")


if __name__ == "__main__":
    main()
