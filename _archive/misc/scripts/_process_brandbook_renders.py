"""
Берёт 7 ключевых рендеров из brandbook_pages/, оптимизирует их в WebP
с нужными размерами и укладывает в img/renders/ с осмысленными именами.
"""
import io
import sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

SRC = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\03_content_draft\brandbook_pages")
DST = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\renders")
DST.mkdir(parents=True, exist_ok=True)

RENDERS = [
    # (output_name, source_filename, max_dim, target_kb, note)
    ("hero-termopaket-pro.webp",    "bb_p27_i00.jpeg", 1600, 200, "Hero: термопакет Pro с призывом попробовать"),
    ("logistics-trucks.webp",       "bb_p27_i01.jpeg", 1600, 180, "Грузовики Penske — фон для /delivery/"),
    ("box-with-samples.webp",       "bb_p27_i02.jpeg", 1600, 200, "Коробочка с образцами 4 категорий"),
    ("master-nad-svezhestyu.webp",  "bb_p28_i00.jpeg", 1400, 180, "Маскот-04 фермер на фиолетовом — /about/"),
    ("three-benefits.webp",         "bb_p28_i01.jpeg", 1600, 200, "3 benefits: 25% лучше, много решений, 3 слоя"),
    ("facts-about-termy.webp",      "bb_p28_i02.jpeg", 1600, 200, "4 факта: 24ч, 100000+, 3 стадии, 100% recycle"),
    ("termy-sizes-4.webp",          "bb_p28_i03.jpeg", 1600, 200, "4 размера: 32×35, 42×50, 45×45, 50×55"),
    ("branding-flexo-silk.webp",    "bb_p29_i00.jpeg", 1400, 180, "Флексопечать + шелкография /branding/"),
]


def process(src_name, dst_name, max_dim, target_kb):
    src = SRC / src_name
    if not src.exists():
        return f"[miss] {src_name}"
    im = Image.open(src)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > max_dim:
        scale = max_dim / max(w, h)
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    for q in (85, 80, 75, 70, 65, 60, 55, 50):
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=q, method=6)
        kb = buf.tell() / 1024
        if kb <= target_kb or q == 50:
            (DST / dst_name).write_bytes(buf.getvalue())
            return f"[ok]   {dst_name:32s} ← {src_name} {im.size[0]}×{im.size[1]} {kb:.0f}KB q={q}"
    return f"[fail] {dst_name}"


for out, src, md, tk, note in RENDERS:
    print(process(src, out, md, tk))
print(f"\nTotal to {DST}")
