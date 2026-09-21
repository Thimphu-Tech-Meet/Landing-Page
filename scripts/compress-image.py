#!/usr/bin/env python3
"""
Shrink photos before adding them to /public.

    python scripts/compress-image.py <source> <destination> [--max-width 1600] [--max-kb 300]

Resizes to at most --max-width pixels wide (aspect ratio kept), strips
EXIF, and lowers JPEG quality step by step until the file is under
--max-kb. Needs Python 3 and Pillow (`pip install pillow`); nothing is
added to the site's own dependencies.
"""
import argparse
import io
import sys

from PIL import Image, ImageOps


def compress(src: str, dst: str, max_width: int, max_kb: int) -> tuple[int, int, int, int]:
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if im.width > max_width:
        ratio = max_width / im.width
        im = im.resize((max_width, round(im.height * ratio)), Image.LANCZOS)

    quality = 88
    while True:
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
        if buf.tell() <= max_kb * 1024 or quality <= 40:
            break
        quality -= 4

    with open(dst, "wb") as f:
        f.write(buf.getvalue())
    return im.width, im.height, quality, buf.tell()


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("source")
    p.add_argument("destination")
    p.add_argument("--max-width", type=int, default=1600)
    p.add_argument("--max-kb", type=int, default=300)
    a = p.parse_args()

    w, h, q, size = compress(a.source, a.destination, a.max_width, a.max_kb)
    print(f"{a.destination}: {w}x{h}, quality {q}, {size / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
