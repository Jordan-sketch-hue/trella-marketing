"""Process the real Trella logo (tm.jpg) into a clean brand asset suite."""
import colorsys
from PIL import Image

SRC = r"C:/Users/jader/Downloads/tm.jpg"
WEB = r"C:/Users/jader/projects/trella-marketing/public"
APP = r"C:/Users/jader/projects/trella-marketing/src/app"

img = Image.open(SRC).convert("RGB")
W, H = img.size
px = img.load()
print("source size:", W, H)

def whiteness(p):       # min channel: high => white/light
    return min(p[0], p[1], p[2])

def sat(p):
    r, g, b = [c / 255 for c in p]
    mx, mn = max(r, g, b), min(r, g, b)
    return 0 if mx == 0 else (mx - mn) / mx

# ---- 1. content bounding box (ignore white + light drop shadow) ----
INK = 200   # whiteness below this = real ink (glyph), above = bg/shadow
def col_has_ink(x):
    return any(whiteness(px[x, y]) < INK for y in range(0, H, 2))
def row_has_ink(y):
    return any(whiteness(px[x, y]) < INK for x in range(0, W, 2))

xs = [x for x in range(W) if col_has_ink(x)]
ys = [y for y in range(H) if row_has_ink(y)]
x0, x1 = min(xs), max(xs)
y0, y1 = min(ys), max(ys)
print("content bbox:", x0, y0, x1, y1)

pad = int(0.04 * (x1 - x0))
def clamp(v, lo, hi):
    return max(lo, min(hi, v))
cx0, cy0 = clamp(x0 - pad, 0, W), clamp(y0 - pad, 0, H)
cx1, cy1 = clamp(x1 + pad, 0, W), clamp(y1 + pad, 0, H)

# ---- 2. sample brand blue + red (median of each solid-fill hue family) ----
blues, reds = [], []
for y in range(y0, y1, 1):
    for x in range(x0, x1, 1):
        p = px[x, y]
        r, g, b = p
        s = sat(p); mx = max(r, g, b) / 255
        if s < 0.5 or mx < 0.35:
            continue
        h = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)[0] * 360
        if 215 <= h <= 265 and mx > 0.45:
            blues.append(p)
        if (h <= 14 or h >= 346) and mx > 0.55:
            reds.append(p)
def median_color(lst):
    n = len(lst)
    rs = sorted(c[0] for c in lst); gs = sorted(c[1] for c in lst); bs = sorted(c[2] for c in lst)
    return (rs[n // 2], gs[n // 2], bs[n // 2])
def bright_median(lst, frac=0.6):   # median of the brightest (1-frac) = solid fill, not dark edges
    s = sorted(lst, key=lambda c: max(c))
    return median_color(s[int(len(s) * frac):])
hexc = lambda p: "#%02X%02X%02X" % tuple(p)
best_blue = bright_median(blues); best_red = bright_median(reds)
print("BRAND BLUE:", hexc(best_blue), best_blue, "n=", len(blues))
print("BRAND RED :", hexc(best_red), best_red, "n=", len(reds))
def patch(cx, cy, r=4):
    cs = [px[x, y] for y in range(cy - r, cy + r) for x in range(cx - r, cx + r)]
    return median_color(cs)
print("sample T-stem :", hexc(patch((x0 + x1) // 2 - 360, (y0 + y1) // 2)))
print("sample trella :", hexc(patch(x0 + int(0.72 * (x1 - x0)), (y0 + y1) // 2 - 30)))

# ---- 3. full lockup, white bg (crop) ----
lockup = img.crop((cx0, cy0, cx1, cy1))
lockup.save(WEB + "/logo.png")
print("saved logo.png", lockup.size)

# ---- 4. transparent knockout helper ----
def knockout(im):
    im = im.convert("RGBA")
    d = im.load()
    w, h = im.size
    for yy in range(h):
        for xx in range(w):
            r, g, b, _ = d[xx, yy]
            mn = min(r, g, b)
            s = sat((r, g, b))
            if s >= 0.18 or mn <= 60:          # colored or near-black: keep
                a = 255
            elif mn >= 205:                     # white / light shadow: drop
                a = 0
            else:                               # ramp edge band
                a = int((205 - mn) / 145 * 255)
            d[xx, yy] = (r, g, b, a)
    return im

knockout(lockup).save(WEB + "/logo-transparent.png")
print("saved logo-transparent.png")

# ---- 5. isolate TM monogram (leftmost ink run, separated by whitespace) ----
sub = img.crop((cx0, cy0, cx1, cy1))
sw, sh = sub.size
sp = sub.load()
INK_GAP = 110   # strict: strong glyph pixels only, so the drop shadow can't bridge the gap
def scol_ink(x):
    return any(whiteness(sp[x, y]) < INK_GAP for y in range(0, sh, 1))
ink_cols = [scol_ink(x) for x in range(sw)]
# find first run of ink, then first gap wider than ~1.5% of width
gap_min = max(6, int(0.015 * sw))
i = 0
while i < sw and not ink_cols[i]:
    i += 1
run_start = i
gap = 0
mono_end = sw
while i < sw:
    if ink_cols[i]:
        gap = 0
    else:
        gap += 1
        if gap >= gap_min:
            mono_end = i - gap + 1
            break
    i += 1
mono = sub.crop((run_start, 0, mono_end, sh))
# tighten vertical
mp = mono.convert("RGB").load()
mw, mh = mono.size
mrows = [y for y in range(mh) if any(whiteness(mp[x, y]) < INK for x in range(0, mw, 2))]
mono = mono.crop((0, min(mrows), mw, max(mrows) + 1))
print("monogram crop:", mono.size)

def square_pad(im, bg, padfrac=0.12):
    im = im.convert("RGBA")
    w, h = im.size
    side = int(max(w, h) * (1 + 2 * padfrac))
    canvas = Image.new("RGBA", (side, side), bg)
    canvas.alpha_composite(im, ((side - w) // 2, (side - h) // 2))
    return canvas

mono_white = square_pad(mono, (255, 255, 255, 255))
mono_white.convert("RGB").save(WEB + "/monogram.png")
mono_t = square_pad(knockout(mono), (0, 0, 0, 0))
mono_t.save(WEB + "/monogram-transparent.png")
print("saved monogram.png + monogram-transparent.png", mono_white.size)

# ---- 6. favicons / app icons (Next app router) ----
mono_white.resize((256, 256)).convert("RGB").save(APP + "/icon.png")
# apple icon: white rounded look (just white square padded)
square_pad(mono, (255, 255, 255, 255), padfrac=0.18).resize((180, 180)).convert("RGB").save(APP + "/apple-icon.png")
print("saved src/app/icon.png + apple-icon.png")
print("DONE")
