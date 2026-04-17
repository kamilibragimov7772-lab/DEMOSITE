# -*- coding: utf-8 -*-
"""
Фикс проблемных файлов:
- LinerBox: rembg с birefnet-general (лучше берёт нейтральные тона на белом фоне)
- termopaket-42x50 и bubblpak: сдвоенные кадры → crop до одного продукта
"""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import io

ROOT = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\products")
OUT = ROOT / "cutout"

# birefnet-general — одна из лучших моделей, берёт сложные края
session_bi = new_session("birefnet-general")

TARGETS = [
    # (file, crop, session_name)
    ("linerbox-24l.webp",     None,                   "birefnet-general"),
    ("linerbox-40l.webp",     None,                   "birefnet-general"),
    ("termopaket-42x50.webp", (0.07, 0.10, 0.52, 0.95), "birefnet-general"),
    ("bubblpak.webp",         (0.05, 0.05, 0.58, 0.95), "birefnet-general"),
]

SESSIONS = {"birefnet-general": session_bi}

def process(fname, crop, session_name):
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
    result_bytes = remove(buf.getvalue(), session=SESSIONS[session_name])
    result = Image.open(io.BytesIO(result_bytes)).convert("RGBA")

    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    out = OUT / fname
    result.save(out, format="WEBP", quality=92, method=6)
    print(f"  OK {fname} -> {result.size[0]}x{result.size[1]} [{session_name}]")

if __name__ == "__main__":
    for t in TARGETS:
        try: process(*t)
        except Exception as e: print(f"  FAIL {t[0]}: {e}")
    print("\nDone.")
