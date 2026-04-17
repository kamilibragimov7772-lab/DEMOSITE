# -*- coding: utf-8 -*-
"""
Batch-вырезание фона у фото продукции TERMY.
Вход:  02_github_repo/bot-ponton/img/products/*.webp
Выход: 02_github_repo/bot-ponton/img/products/cutout/*.webp (RGBA)

Особый случай: termopaket-42x45.webp — 2 пакета в кадре, сначала кропнуть левую половину.
"""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import io

ROOT = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\products")
OUT = ROOT / "cutout"
OUT.mkdir(exist_ok=True)

# Модель isnet-general-use даёт лучшие края на packshot-ах
session = new_session("isnet-general-use")

# Список для обработки. Если tuple (file, crop) — crop это (left, top, right, bottom) в долях 0..1
# Если просто str — обрабатываем как есть
TARGETS = [
    # Основная hero-шестёрка
    ("termopaket-42x45.webp",    (0.07, 0.00, 0.52, 0.95)),  # левый пакет из пары, top=0 чтобы сохранить ручку
    "shock-600-cool.webp",
    "linerbox-24l.webp",
    "termorukzak.webp",
    "termopaket-zip-lock.webp",
    "shock-450-gel.webp",
    # Запасные для вариантов композиции
    "termopaket-42x50.webp",
    "termopaket-pro-42x45.webp",
    "shock-300-cool.webp",
    "shock-300-gel.webp",
    "linerbox-40l.webp",
    "bubblpak.webp",
]

def process(spec):
    if isinstance(spec, tuple):
        fname, crop = spec
    else:
        fname, crop = spec, None

    src = ROOT / fname
    if not src.exists():
        print(f"  SKIP (not found): {fname}")
        return

    img = Image.open(src).convert("RGBA")

    if crop is not None:
        w, h = img.size
        l, t, r, b = crop
        img = img.crop((int(w*l), int(h*t), int(w*r), int(h*b)))
        print(f"  cropped {fname} -> {img.size}")

    # В память -> байты для rembg
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    result_bytes = remove(buf.getvalue(), session=session)

    result = Image.open(io.BytesIO(result_bytes)).convert("RGBA")

    # Обрезка прозрачных краёв (bbox по alpha)
    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    out_path = OUT / fname
    result.save(out_path, format="WEBP", quality=92, method=6)
    print(f"  OK {fname} -> {out_path.name} ({result.size[0]}x{result.size[1]})")

if __name__ == "__main__":
    print(f"Input:  {ROOT}")
    print(f"Output: {OUT}")
    print(f"Model:  isnet-general-use\n")
    for t in TARGETS:
        try:
            process(t)
        except Exception as e:
            print(f"  FAIL {t}: {e}")
    print("\nDone.")
