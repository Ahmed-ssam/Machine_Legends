import json, base64, io, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
SRC = sys.argv[1]; HERO_H = float(sys.argv[2]) if len(sys.argv) > 2 else 36
im = Image.open(SRC).convert('RGBA'); a = np.array(im)
lab, n = ndi.label(ndi.binary_dilation(a[..., 3] > 40, iterations=3))
objs = ndi.find_objects(lab)
def comp(i):
    y, x = objs[i - 1]; m = (lab[y, x] == i)
    sub = a[y, x].copy(); sub[..., 3] = np.where(ndi.binary_dilation(m, iterations=1), sub[..., 3], 0)
    return sub, (x.start, y.start, x.stop, y.stop)
def union(ids):
    cs = [comp(i) for i in ids]; x0 = min(c[1][0] for c in cs); y0 = min(c[1][1] for c in cs); x1 = max(c[1][2] for c in cs); y1 = max(c[1][3] for c in cs)
    out = np.zeros((y1 - y0, x1 - x0, 4), np.uint8)
    for sub, (a0, b0, a1, b1) in cs:
        reg = out[b0 - y0:b1 - y0, a0 - x0:a1 - x0]; msk = sub[..., 3] > reg[..., 3]; reg[msk] = sub[msk]
    return Image.fromarray(out)
def rs(img, s):
    w, h = max(1, round(img.width * s)), max(1, round(img.height * s)); r = img.convert('RGBa').resize((w, h), Image.LANCZOS).convert('RGBA')
    rgb = r.convert('RGB').filter(ImageFilter.UnsharpMask(1.0, 70, 2)); al = r.split()[3].point(lambda v: 0 if v < 36 else min(255, int(v * 1.25)))
    rgb.putalpha(al); return rgb
HERO = {'down': [8, 5, 6, 7], 'up': [14, 15, 16, 13], 'left': [24, 26, 27, 25], 'right': [41, 42, 43, 40]}
MILO = {'down': [18, 19, 20, 21], 'up': [29, 30, 31, 32], 'left': [35, 37, 38, 36], 'right': [45, 46, 47, 48]}
hs = [comp(i)[0].shape[0] for r in HERO.values() for i in r]; S = HERO_H / float(np.median(hs))
print('scale', S, 'median h', np.median(hs))
def frames(group, s):
    res = {}
    for d, ids in group.items():
        fr = []
        for i in ids:
            g = rs(union([i]), s); fr.append(g)
        res[d] = fr
    return res
def feet_x(g):
    al = np.array(g.split()[3]); h = al.shape[0]; reg = al[int(h * 0.78):]; cols = np.where(reg.max(axis=0) > 100)[0]
    return (cols.min() + cols.max()) / 2.0 if len(cols) else g.width / 2
def pack(fr, pad=1):
    allf = [g for d in fr.values() for g in d]
    left = max(feet_x(g) for g in allf); right = max(g.width - feet_x(g) for g in allf); H = max(g.height for g in allf)
    cw = int(np.ceil(left + right)) + 2 * pad; ch = H + pad; cells = {}
    for d, lst in fr.items():
        cells[d] = []
        for g in lst:
            c = Image.new('RGBA', (cw, ch), (0, 0, 0, 0)); c.alpha_composite(g, (int(round(left + pad - feet_x(g))), ch - g.height)); cells[d].append(c)
    return cw, ch, int(round(left + pad)), cells
hcw, hch, hax, hcells = pack(frames(HERO, S)); mcw, mch, max_, mcells = pack(frames(MILO, S))
PS = 128
def portrait(ids):
    g = union(ids); sc = (PS - 4) / max(g.width, g.height); r = rs(g, sc); c = Image.new('RGBA', (PS, PS), (0, 0, 0, 0)); c.alpha_composite(r, ((PS - r.width) // 2, PS - 2 - r.height)); return c
HP = {'neutral': [1], 'happy': [2, 4], 'surprised': [3], 'thinking': [9, 12], 'sad': [10], 'angry': [11]}
MP = {'happy': [17, 22, 23], 'sparkle': [28, 33, 34], 'surprised': [39], 'angry': [44]}
hp = {k: portrait(v) for k, v in HP.items()}; mp = {k: portrait(v) for k, v in MP.items()}
W = max(4 * hcw, 4 * mcw, 10 * PS); Hh = 4 * hch + 4 * mch + 2 * PS
atlas = Image.new('RGBA', (W, Hh), (0, 0, 0, 0)); man = {'hero': {'cw': hcw, 'ch': hch, 'ax': hax, 'y': {}}, 'milo': {'cw': mcw, 'ch': mch, 'ax': max_, 'y': {}}, 'por': {'size': PS, 'hero': {}, 'milo': {}}}
y = 0
for d in ['down', 'up', 'left', 'right']:
    man['hero']['y'][d] = y
    for k, c in enumerate(hcells[d]): atlas.alpha_composite(c, (k * hcw, y))
    y += hch
for d in ['down', 'up', 'left', 'right']:
    man['milo']['y'][d] = y
    for k, c in enumerate(mcells[d]): atlas.alpha_composite(c, (k * mcw, y))
    y += mch
man['por']['y'] = y
for k, (n, c) in enumerate(hp.items()): atlas.alpha_composite(c, (k * PS, y)); man['por']['hero'][n] = k * PS
y2 = y + PS
for k, (n, c) in enumerate(mp.items()): atlas.alpha_composite(c, (k * PS, y2)); man['por']['milo'][n] = [k * PS, y2]
man['por']['y2'] = y2

# ---- hi-res atlas (large cutscene draws): down/up/right at ~3.5x the in-world size ----
SH = S * 3.6
hh, mm = frames({k: HERO[k] for k in ('down', 'up', 'right')}, SH), frames({k: MILO[k] for k in ('down', 'up', 'right')}, SH)
hcw2, hch2, hax2, hc2 = pack(hh); mcw2, mch2, max2, mc2 = pack(mm)
A2 = Image.new('RGBA', (4 * max(hcw2, mcw2), 3 * hch2 + 3 * mch2), (0, 0, 0, 0)); hi = {'hero': {'cw': hcw2, 'ch': hch2, 'ax': hax2, 'y': {}}, 'milo': {'cw': mcw2, 'ch': mch2, 'ax': max2, 'y': {}}}
y = 0
for d in ('down', 'up', 'right'):
    hi['hero']['y'][d] = y
    for k, c in enumerate(hc2[d]): A2.alpha_composite(c, (k * hcw2, y))
    y += hch2
for d in ('down', 'up', 'right'):
    hi['milo']['y'][d] = y
    for k, c in enumerate(mc2[d]): A2.alpha_composite(c, (k * mcw2, y))
    y += mch2
b2 = io.BytesIO(); A2.save(b2, 'PNG', optimize=True)
buf = io.BytesIO(); atlas.save(buf, 'PNG', optimize=True)
open('src/art.js', 'w').write("'use strict';\n/* ===== art.js: hero + Milo sprites and portraits sliced from the supplied character sheet (generated by tools/make_art.py) ===== */\nconst ART = " + json.dumps(man) + ";\nART.hi = " + json.dumps(hi) + ";\nART.srcHi = 'data:image/png;base64," + base64.b64encode(b2.getvalue()).decode() + "';\nART.src = 'data:image/png;base64," + base64.b64encode(buf.getvalue()).decode() + "';\n")
atlas.save('/tmp/atlas.png'); print(man['hero']['cw'], man['hero']['ch'], man['milo']['cw'], man['milo']['ch'], len(buf.getvalue()))
