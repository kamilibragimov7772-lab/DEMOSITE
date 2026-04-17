"""
Генерирует SVG-плашки с бренд-цветами для 14 клиентов TERMY
взамен текстовых placeholder'ов (которые были белым текстом на прозрачном фоне).

Каждый SVG — это цветная pill-плашка с читаемым текстом,
работает на любом фоне (светлом/тёмном).
"""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

OUT = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\client-logos")
OUT.mkdir(parents=True, exist_ok=True)

# (slug, display_text, background_color, text_color, font_family_hint)
BRANDS = [
    ("ozon-fresh",    "Ozon Fresh",    "#005BFF", "#FFFFFF", "sans"),
    ("vkusvill",      "ВкусВилл",      "#7FBF2D", "#FFFFFF", "sans"),
    ("samokat",       "Самокат",       "#FF3365", "#FFFFFF", "sans"),
    ("kuper",         "Купер",         "#F76D26", "#FFFFFF", "sans"),
    ("instamart",     "Инстамарт",     "#00B956", "#FFFFFF", "sans"),
    ("auchan",        "Auchan",        "#E30613", "#FFFFFF", "sans"),
    ("x5-group",      "X5",            "#00A3E0", "#FFFFFF", "sans"),
    ("azbuka-vkusa",  "Азбука вкуса",  "#0F0F0F", "#CAA658", "serif"),
    ("lindt",         "Lindt",         "#B0122A", "#F2C94C", "serif"),
    ("fix-price",     "Fix Price",     "#E30031", "#FFFFFF", "sans"),
    ("morskoy-ulov",  "Морской Улов",  "#0B3D91", "#FFFFFF", "sans"),
    ("gemotest",      "Гемотест",      "#009640", "#FFFFFF", "sans"),
    ("komus",         "Комус",         "#0066B3", "#FFFFFF", "sans"),
    ("delovye-linii", "Деловые Линии", "#CE181E", "#FFFFFF", "sans"),
]

# viewBox аспектов — высота 48, ширина зависит от длины текста (грубо по символам)
def calc_width(text):
    # rough heuristic: 12 px per char + 32 padding, minimum 120
    return max(120, len(text) * 13 + 32)


def build_svg(slug, text, bg, fg, font_hint):
    w = calc_width(text)
    h = 48
    radius = 8
    # Font stack
    if font_hint == "serif":
        font = "&apos;Playfair Display&apos;, Georgia, serif"
        font_weight = "700"
    else:
        font = "&apos;Inter&apos;, -apple-system, &apos;Segoe UI&apos;, Arial, sans-serif"
        font_weight = "800"
    font_size = 18 if len(text) <= 6 else 16 if len(text) <= 10 else 14

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f'<rect x="0" y="0" width="{w}" height="{h}" rx="{radius}" ry="{radius}" fill="{bg}"/>'
        f'<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" '
        f'font-family="{font}" font-size="{font_size}" font-weight="{font_weight}" '
        f'fill="{fg}" letter-spacing="0.5">{text}</text>'
        f'</svg>'
    )
    return svg


for slug, text, bg, fg, hint in BRANDS:
    svg = build_svg(slug, text, bg, fg, hint)
    path = OUT / f"{slug}.svg"
    path.write_text(svg, encoding="utf-8")
    print(f"[ok] {slug}.svg  ({text}, {bg}, {fg}, {len(svg)}B)")

print(f"\nGenerated {len(BRANDS)} SVG logos in {OUT}")
