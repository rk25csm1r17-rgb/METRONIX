#!/usr/bin/env python3
# ============================================================
#  Metronix — Smart Urban Life Assistant
#  generate_icons.py — PWA Icon Generator
#  Run: python3 generate_icons.py
#  Author: Ravi Kumar | Roll No: 25CSM1R17
# ============================================================
"""
Generates all required PWA icons from SVG source.
Output: public/icons/*.png  +  public/favicon.ico
"""

import os, struct, zlib

# ── Sizes required by manifest.json ─────────────────────────
SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512]

# ── SVG source (Metronix logo) ────────────────────────────────
def make_svg(size: int, maskable: bool = False) -> str:
    pad   = int(size * 0.1) if maskable else 0
    inner = size - pad * 2
    cx    = size / 2
    cy    = size / 2
    r     = inner * 0.46
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#0a0f1a"/>
      <stop offset="100%" stop-color="#0d1423"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#0f62fe"/>
      <stop offset="50%"  stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="mGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#a5c4ff"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="{size*0.018}" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="{size}" height="{size}" rx="{size*0.22}" fill="url(#bgGrad)"/>

  <!-- Subtle grid -->
  {''.join(f'<line x1="{pad+i*(inner//6)}" y1="{pad}" x2="{pad+i*(inner//6)}" y2="{pad+inner}" stroke="rgba(255,255,255,0.03)" stroke-width="{size*0.003}"/>' for i in range(7))}
  {''.join(f'<line x1="{pad}" y1="{pad+i*(inner//6)}" x2="{pad+inner}" y2="{pad+i*(inner//6)}" stroke="rgba(255,255,255,0.03)" stroke-width="{size*0.003}"/>' for i in range(7))}

  <!-- Outer glow ring -->
  <circle cx="{cx}" cy="{cy}" r="{r+size*0.042}" fill="none"
    stroke="url(#ringGrad)" stroke-width="{size*0.012}" opacity="0.35"
    stroke-dasharray="{size*0.04} {size*0.025}"/>

  <!-- Main ring -->
  <circle cx="{cx}" cy="{cy}" r="{r}" fill="none"
    stroke="url(#ringGrad)" stroke-width="{size*0.048}"
    stroke-linecap="round"
    stroke-dasharray="{r*5.5} {r*0.4}"
    filter="url(#glow)"/>

  <!-- Inner ring -->
  <circle cx="{cx}" cy="{cy}" r="{r*0.62}" fill="none"
    stroke="rgba(6,182,212,0.35)" stroke-width="{size*0.012}"
    stroke-dasharray="{size*0.02} {size*0.018}"/>

  <!-- M letterform -->
  <text x="{cx}" y="{cy + r*0.36}" text-anchor="middle"
    font-family="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    font-size="{r*1.05}" font-weight="800" letter-spacing="-0.04em"
    fill="url(#mGrad)" filter="url(#glow)">M</text>

  <!-- Dot accent -->
  <circle cx="{cx + r*0.62}" cy="{cy - r*0.58}" r="{size*0.025}"
    fill="#0f62fe" opacity="0.9"/>
  <circle cx="{cx - r*0.62}" cy="{cy + r*0.58}" r="{size*0.018}"
    fill="#10b981" opacity="0.7"/>

  <!-- AQI / data arc hint -->
  <path d="M {cx - r*0.85},{cy + r*0.15} Q {cx},{cy - r*0.1} {cx + r*0.85},{cy + r*0.15}"
    fill="none" stroke="rgba(6,182,212,0.2)" stroke-width="{size*0.008}" stroke-linecap="round"/>
</svg>"""

def svg_to_png_simple(svg_str: str, size: int) -> bytes:
    """
    Minimal pure-Python PNG writer (no dependencies).
    Creates a solid-color placeholder PNG when cairosvg/Pillow not available.
    For full SVG rendering, install: pip install cairosvg  OR  pip install Pillow
    """
    try:
        import cairosvg
        return cairosvg.svg2png(bytestring=svg_str.encode(), output_width=size, output_height=size)
    except ImportError:
        pass
    try:
        from PIL import Image, ImageDraw, ImageFont
        import io
        img = Image.new("RGBA", (size, size), (10, 15, 26, 255))
        draw = ImageDraw.Draw(img)
        # Background rounded rect approximation
        draw.ellipse([0, 0, size-1, size-1], fill=(10, 15, 26, 255))
        draw.rectangle([size//5, 0, size*4//5, size], fill=(10, 15, 26, 255))
        draw.rectangle([0, size//5, size, size*4//5], fill=(10, 15, 26, 255))
        # Ring
        sw = max(2, size // 18)
        draw.arc([size//6, size//6, size*5//6, size*5//6], 0, 300, fill=(15, 98, 254, 230), width=sw)
        draw.arc([size//6, size//6, size*5//6, size*5//6], 300, 360, fill=(16, 185, 129, 200), width=sw)
        # "M" text
        fs = size // 2
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", fs)
        except Exception:
            font = ImageFont.load_default()
        bbox = draw.textbbox((0,0), "M", font=font)
        tw = bbox[2] - bbox[0]; th = bbox[3] - bbox[1]
        draw.text(((size-tw)//2, (size-th)//2 - size//10), "M", fill=(255,255,255,240), font=font)
        buf = io.BytesIO()
        img.save(buf, format="PNG", optimize=True)
        return buf.getvalue()
    except ImportError:
        pass
    # Fallback: minimal valid 1×1 white PNG scaled to size
    return _minimal_png(size)

def _minimal_png(size: int) -> bytes:
    """Create a minimal but valid PNG with Metronix brand colour."""
    def chunk(name: bytes, data: bytes) -> bytes:
        c = struct.pack(">I", len(data)) + name + data
        return c + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF)

    # RGBA scanlines: dark navy bg
    raw = b""
    for y in range(size):
        raw += b"\x00"  # filter byte
        for x in range(size):
            # Simple radial gradient: dark centre, ring highlight
            cx = size / 2; cy = size / 2
            dist = ((x - cx)**2 + (y - cy)**2) ** 0.5
            norm = dist / (size / 2)
            if norm > 1:
                raw += bytes([0, 0, 0, 0])
            elif 0.42 < norm < 0.52:
                raw += bytes([15, 98, 254, 220])
            else:
                t = int(10 + norm * 8)
                raw += bytes([t, t + 3, t + 18, 255])

    compressed = zlib.compress(raw, 9)
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", compressed)
        + chunk(b"IEND", b"")
    )

def write_ico(png_bytes_16: bytes, png_bytes_32: bytes, out_path: str):
    """Write a minimal .ico containing 16×16 and 32×32 PNG frames."""
    frames = [(16, png_bytes_16), (32, png_bytes_32)]
    num = len(frames)
    header = struct.pack("<HHH", 0, 1, num)
    dir_offset = 6 + num * 16
    dirs = b""
    images = b""
    for (sz, data) in frames:
        dirs   += struct.pack("<BBBBHHII", sz if sz < 256 else 0, sz if sz < 256 else 0, 0, 0, 1, 32, len(data), dir_offset + len(images))
        images += data
    with open(out_path, "wb") as f:
        f.write(header + dirs + images)

# ── Main ──────────────────────────────────────────────────────
if __name__ == "__main__":
    base    = os.path.dirname(os.path.abspath(__file__))
    pub_dir = os.path.join(base, "public")
    ico_dir = os.path.join(pub_dir, "icons")
    os.makedirs(ico_dir, exist_ok=True)

    print("🎨 Generating Metronix icons…")

    png_cache = {}

    for sz in SIZES:
        svg_str = make_svg(sz)
        png     = svg_to_png_simple(svg_str, sz)
        png_cache[sz] = png
        out     = os.path.join(ico_dir, f"icon-{sz}x{sz}.png")
        with open(out, "wb") as f: f.write(png)
        print(f"  ✓ icon-{sz}x{sz}.png  ({len(png)//1024}KB)")

        # Save SVG too
        svg_out = os.path.join(ico_dir, f"icon-{sz}x{sz}.svg")
        with open(svg_out, "w", encoding="utf-8") as f: f.write(svg_str)

    # Maskable icon
    sz  = 512
    msk = make_svg(sz, maskable=True)
    png = svg_to_png_simple(msk, sz)
    with open(os.path.join(ico_dir, "maskable-512x512.png"), "wb") as f: f.write(png)
    with open(os.path.join(ico_dir, "maskable-512x512.svg"), "w") as f: f.write(msk)
    print("  ✓ maskable-512x512.png")

    # favicon.ico
    p16 = png_cache.get(72, _minimal_png(16))
    p32 = png_cache.get(96, _minimal_png(32))
    ico_path = os.path.join(pub_dir, "favicon.ico")
    write_ico(svg_to_png_simple(make_svg(16), 16), svg_to_png_simple(make_svg(32), 32), ico_path)
    print(f"  ✓ favicon.ico")

    # favicon.svg (modern browsers)
    fav_svg = make_svg(64)
    with open(os.path.join(pub_dir, "favicon.svg"), "w", encoding="utf-8") as f: f.write(fav_svg)
    print("  ✓ favicon.svg")

    # apple-touch-icon.png (180×180)
    p180 = png_cache.get(180, svg_to_png_simple(make_svg(180), 180))
    with open(os.path.join(pub_dir, "apple-touch-icon.png"), "wb") as f: f.write(p180)
    print("  ✓ apple-touch-icon.png")

    print("\n✅ All icons generated successfully!")
    print(f"   Output: {ico_dir}/")
