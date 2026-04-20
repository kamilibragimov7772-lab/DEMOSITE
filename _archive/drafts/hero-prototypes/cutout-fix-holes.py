# -*- coding: utf-8 -*-
"""
Фикс термопакета 42×45 (и других продуктов с «дырявой» вырезкой):
1) birefnet-general вместо isnet-general-use — точнее держит светлую лицевую сторону
2) post-process: заливаем внутренние прозрачные дыры в alpha (всё, что не связано с краями изображения = часть продукта)
"""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import numpy as np
import io

try:
    from scipy.ndimage import binary_fill_holes
    HAS_SCIPY = True
except ImportError:
    HAS_SCIPY = False
    print("scipy не установлен — fallback на чистый numpy flood-fill")

ROOT = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\products")
OUT = ROOT / "cutout"

session = new_session("birefnet-general")

TARGETS = [
    ("termopaket-42x45.webp", (0.07, 0.00, 0.52, 0.95)),
    ("termopaket-42x50.webp", (0.07, 0.00, 0.52, 0.95)),
    ("termopaket-pro-42x45.webp", None),
    ("shock-600-cool.webp", None),
    ("shock-450-gel.webp", None),
    ("termorukzak.webp", None),
]

def fill_holes_in_alpha(rgba: Image.Image, bg_fill=(245, 245, 245)) -> Image.Image:
    """Внутренние прозрачные пиксели → непрозрачные. Цвет — bg_fill (светло-серый 'пластик')."""
    arr = np.array(rgba)
    alpha = arr[:, :, 3]
    mask = alpha > 20

    if HAS_SCIPY:
        filled = binary_fill_holes(mask)
    else:
        h, w = mask.shape
        visited = np.zeros_like(mask, dtype=bool)
        stack = []
        for i in range(h):
            if not mask[i, 0]: stack.append((i, 0))
            if not mask[i, w - 1]: stack.append((i, w - 1))
        for j in range(w):
            if not mask[0, j]: stack.append((0, j))
            if not mask[h - 1, j]: stack.append((h - 1, j))
        while stack:
            y, x = stack.pop()
            if y < 0 or y >= h or x < 0 or x >= w: continue
            if visited[y, x] or mask[y, x]: continue
            visited[y, x] = True
            stack.extend([(y+1, x), (y-1, x), (y, x+1), (y, x-1)])
        filled = mask | ~visited

    holes = filled & ~mask
    if holes.any():
        arr[holes, 0] = bg_fill[0]
        arr[holes, 1] = bg_fill[1]
        arr[holes, 2] = bg_fill[2]
        arr[holes, 3] = 255
        print(f"    filled {holes.sum()} hole pixels")

    return Image.fromarray(arr)

def process(fname, crop):
    src = ROOT / fname
    if not src.exists():
        print(f"  SKIP: {fname}"); return

    img = Image.open(src).convert("RGBA")
    if crop:
        w, h = img.size
        l, t, r, b = crop
        img = img.crop((int(w*l), int(h*t), int(w*r), int(h*b)))
        print(f"  cropped {fname} -> {img.size}")

    buf = io.BytesIO(); img.save(buf, format="PNG"); buf.seek(0)
    result_bytes = remove(buf.getvalue(), session=session)
    result = Image.open(io.BytesIO(result_bytes)).convert("RGBA")

    result = fill_holes_in_alpha(result)

    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    out = OUT / fname
    result.save(out, format="WEBP", quality=92, method=6)
    print(f"  OK {fname} -> {result.size[0]}x{result.size[1]}")

if __name__ == "__main__":
    for fname, crop in TARGETS:
        try: process(fname, crop)
        except Exception as e: print(f"  FAIL {fname}: {e}")
    print("\nDone.")
