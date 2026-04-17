"""
Выборочная распаковка архива «1. Продукция termy.zip» →
оптимизация в WebP 1200×1200 ≤250 КБ →
укладка в img/products/ репозитория.

Для каждого SKU выбираем один главный файл (предпочтение JPG+круглые ручки).
"""
import io
import sys
import zipfile
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

ZIP = Path(r"C:\Users\kamil\Downloads\1. Продукция termy.zip")
OUT_DIR = Path(r"C:\Users\kamil\OneDrive\Документы\TERMY-site-polish\02_github_repo\bot-ponton\img\products")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Целевые выходные имена и фильтры поиска
TARGETS = [
    # (output_name, path_substring_must_contain, prefer_substring, exclude_substring)
    ("termopaket-32x35.webp",         "Термопакет Терми 32х35",         "круглые ручки", "без фона"),
    ("termopaket-42x45.webp",         "Термопакет Терми 42х45",         "круглые ручки", "без фона"),
    ("termopaket-42x50.webp",         "Термопакет Терми 42х50",         "круглые ручки", "без фона"),
    ("termopaket-60x55.webp",         "Термопакет Терми 60х55",         "круглые ручки", "без фона"),
    ("termopaket-pro-42x45.webp",     "Термопакет Терми Pro 42х45",     "1_Post",        None),
    ("termopaket-pro-max-60x55.webp", "Термопакет Терми Pro MAX 60х55", "1_Post",        None),
    ("termopaket-light-42x50.webp",   "Термопакет Терми Лайт 42х50",    "_1",            None),
    ("termopaket-light-60x55.webp",   "Термопакет Терми Лайт 60х55",    "_1",            None),
    ("termopaket-s-dnom.webp",        "Термопакет с дном/Термопакет_termy_с дном_42х45", "1_Post", None),
    ("termopaket-zip-lock.webp",      "Термопакет с зип-лок 240х400",   "Термопакет с зип-лок.jpg", None),
    ("linerbox-16l.webp",             "Термокороб ЛайнерБокс /16л_ЛайнерБокс_1", None, None),
    ("linerbox-24l.webp",             "Термокороб ЛайнерБокс /24л_ЛайнерБокс_1", None, None),
    ("linerbox-40l.webp",             "Термокороб ЛайнерБокс /40л_ЛайнерБокс_1", None, None),
    ("bubblpak.webp",                 "Баблпак/150х210/1_Post",         None,            None),
    ("termorukzak.webp",              "Терморюкзак Терми/1_Post",       None,            None),
    ("shock-300-cool.webp",           "Termy Shock 300 мл, водно-солевой, +2 +8 (синий)", ".jpg", None),
    ("shock-300-freeze.webp",         "Termy Shock 300 мл, водно-солевой, 0  -15 (зеленый)/1_Post", None, None),
    ("shock-300-gel.webp",            "Termy Shock 300 мл, гель",       "1_Post",        None),
    ("shock-450-cool.webp",           "Termy Shock 450 мл, водно-солевой, +2 +8 (Синий)/1_Post", None, None),
    ("shock-450-freeze.webp",         "Termy Shock 450 мл",             "зеленый",       None),
    ("shock-450-gel.webp",            "Termy Shock 450 мл",             "фиолетовый",    None),
    ("shock-600-cool.webp",           "Termy Shock 600 мл, водно-солевой, +2 +8 (синий)", ".jpg", None),
    ("shock-600-freeze.webp",         "Termy Shock 600 мл",             "зеленый",       None),
    ("shock-600-gel.webp",            "Termy Shock 600 мл",             "фиолетовый",    None),
    ("shock-1100.webp",               "хладоэлемент 1100 мл 1_Post",    None,            None),
]

MAX_DIM = 1200
TARGET_SIZE_KB = 250


def find_candidate(namelist, must_contain, prefer=None, exclude=None):
    """Возвращает имя файла, удовлетворяющее фильтрам. Приоритет: JPG > PNG."""
    candidates = [n for n in namelist if must_contain in n]
    if exclude:
        candidates = [n for n in candidates if exclude not in n]
    if prefer:
        preferred = [n for n in candidates if prefer in n]
        if preferred:
            candidates = preferred
    # JPG первым
    candidates.sort(key=lambda n: (0 if n.lower().endswith(".jpg") else 1, len(n)))
    return candidates[0] if candidates else None


def process_image(img_bytes, output_path):
    """Resize + WebP с подбором качества под target size."""
    im = Image.open(io.BytesIO(img_bytes))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    # Ресайз
    w, h = im.size
    if max(w, h) > MAX_DIM:
        scale = MAX_DIM / max(w, h)
        im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    # Сохранение с подбором качества
    for quality in (85, 80, 75, 70, 65, 60, 55, 50):
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=quality, method=6)
        kb = buf.tell() / 1024
        if kb <= TARGET_SIZE_KB or quality == 50:
            output_path.write_bytes(buf.getvalue())
            return im.size, round(kb, 1), quality
    return im.size, None, None


def main():
    z = zipfile.ZipFile(ZIP, "r")
    namelist = z.namelist()
    extracted = 0
    missing = []
    for out_name, must, prefer, excl in TARGETS:
        found = find_candidate(namelist, must, prefer, excl)
        if not found:
            missing.append(out_name)
            print(f"[miss] {out_name:40s} — не найдено: '{must}'")
            continue
        raw = z.read(found)
        target = OUT_DIR / out_name
        size, kb, q = process_image(raw, target)
        print(f"[ok]   {out_name:40s} ← {Path(found).name[:40]:42s} {size[0]}×{size[1]} {kb}KB q={q}")
        extracted += 1
    print()
    print(f"Extracted: {extracted}/{len(TARGETS)}")
    if missing:
        print("Missing:", missing)


if __name__ == "__main__":
    main()
