'use strict';
/* ===== npcs.js: the supporting cast. Anime-styled vector painting (big glossy eyes, strand-clumped hair, cel shading) pixelised to the hero's density.
   One head/body kit drives the in-world 4-direction sprites AND the 8-expression dialogue busts, so the two always match. ===== */
const NPW = 58, NPH = 78, NPK = 8;
const NPD = { h: 1, age: 'adult', skin: '#f0c19a', eye: '#4a2a18', hair: '#3a2622', hairL: '#6a4a3e', style: 'messy', top: '#3f6fa0', pants: '#3a3a4a', shoe: '#5a3a22', outfit: 'tunic', hat: null, glasses: null, beard: null };
/* ---------- the cast: each is built from its name, role and the world it lives in ---------- */
const NPS = {
  /* Village: the quiet home of the Learning Core */
  finch: { h: 0.93, age: 'elder', skin: '#eac09a', eye: '#4a3020', hair: '#f0f0f6', hairL: '#ffffff', style: 'long', beard: 'long', brow: '#e6e6ee', top: '#2f7f78', trim: '#e0b84a', outfit: 'robe', belt: '#8a5a2a', shoe: '#5a3a22', acc: 'staff', pin: 'gear' },
  pip: { h: 0.74, age: 'kid', skin: '#f6caa4', eye: '#3a6a3a', hair: '#e8862c', hairL: '#ffb858', style: 'messy', top: '#f4ecd6', pants: '#4a78c8', outfit: 'overall', hat: 'straw', hatC: '#e6c46a', hatC2: '#d8483a', freckles: true, shoe: '#6a4228', acc: 'can' },
  luma: { h: 0.97, age: 'teen', skin: '#e9b890', eye: '#7a3a6a', hair: '#7a3a5a', hairL: '#b0608a', style: 'braid', top: '#f2e8d8', pants: '#5a4a6a', outfit: 'apron', apron: '#c0508a', hat: 'goggles', hatC: '#c9a24b', shoe: '#4a2f1d', acc: 'wrench' },
  wren: { h: 0.96, age: 'elder', skin: '#ecc8a8', eye: '#34343f', hair: '#c8c8d6', hairL: '#f0f0fa', style: 'bun', top: '#3b8f7a', trim: '#e6d8a0', outfit: 'robe', belt: '#8bd0bd', glasses: 'round', shoe: '#2c2c36', acc: 'book' },
  /* Academy: supervised learning, labelled examples */
  tess: { h: 0.97, age: 'teen', skin: '#d9a47c', eye: '#2a6a7a', hair: '#27305a', hairL: '#5a72b8', style: 'side', top: '#f4f6fa', trim: '#4fb3b0', outfit: 'coat', inner: '#4a78b8', pants: '#3a3a5a', hat: 'band', hatC: '#4fb3b0', freckles: true, shoe: '#5a3a22', acc: 'clip' },
  orin: { h: 0.95, age: 'elder', skin: '#e3bd98', eye: '#2a2a3a', hair: '#d0d0e2', hairL: '#ffffff', style: 'side', beard: 'goatee', brow: '#dcdcec', top: '#6a4a9a', trim: '#e0b84a', outfit: 'robe', belt: '#c9a24b', glasses: 'half', hat: 'scholar', hatC: '#3a2a5a', shoe: '#2c2236', acc: 'scroll' },
  bramm: { h: 1.04, age: 'adult', skin: '#b9825a', eye: '#1e140e', hair: '#2a1e18', hairL: '#4a3a30', style: 'messy', top: '#8a6a4a', pants: '#4a4a5a', outfit: 'overall', hat: 'cap', hatC: '#d9a23a', shoe: '#2e2a26', beard: 'stubble', broad: true, acc: 'wrench' },
  student: { h: 0.9, age: 'teen', skin: '#e7b48a', eye: '#2a1a14', hair: '#5a3022', hairL: '#8a5a44', style: 'braid', top: '#7a52b8', trim: '#e0b84a', outfit: 'blazer', pants: '#2a2038', hat: 'beret', hatC: '#7a52b8', shoe: '#3a2a20', acc: 'book' },
  /* Forest: decisions branch like trees */
  fern: { h: 0.95, age: 'elder', skin: '#e9c6a2', eye: '#2a6a3a', hair: '#d8ead0', hairL: '#ffffff', style: 'long', top: '#4a9a5a', trim: '#e6d86a', outfit: 'robe', belt: '#d9c24a', hat: 'laurel', hatC: '#58b05a', shoe: '#5a3a22', acc: 'leafstaff' },
  qtree: { h: 1.02, age: 'elder', skin: '#9a7448', eye: '#ffe27a', hair: '#3f9a48', hairL: '#78d86a', style: 'curly', top: '#6a4a2a', trim: '#58b05a', outfit: 'robe', belt: '#3f9a48', hat: 'branch', hatC: '#7a5a38', shoe: '#3a2a1a', bark: true, glow: true },
  sylvan: { h: 1, age: 'adult', skin: '#c9946a', eye: '#3a6a2a', hair: '#3a2a20', hairL: '#6a5240', style: 'braid', top: '#5a8a3a', trim: '#d9a23a', outfit: 'vest', inner: '#e8dcb0', pants: '#5a4a32', hat: 'hood', hatC: '#4a7a3a', shoe: '#2e2a20', acc: 'staff' },
  oak: { h: 1, age: 'elder', skin: '#e0b48a', eye: '#2a2018', hair: '#e2dccc', hairL: '#ffffff', style: 'side', beard: 'long', brow: '#e2dccc', top: '#7a5a34', trim: '#d9a23a', outfit: 'robe', belt: '#d9a23a', shoe: '#2c2218', broad: true, acc: 'staff' },
  heron: { h: 1.02, age: 'adult', skin: '#e7c4a0', eye: '#2a5a8a', hair: '#8ea6c4', hairL: '#d0e0f4', style: 'bun', top: '#6a86aa', trim: '#e8eef8', outfit: 'coat', inner: '#dfe8f4', pants: '#4a5a7a', shoe: '#2a3a4a', acc: 'scope', slim: true },
  owlet: { h: 0.82, age: 'kid', skin: '#dba87c', eye: '#c8801a', hair: '#8a5a34', hairL: '#c08a5a', style: 'messy', top: '#a47a4a', trim: '#f0d8a0', outfit: 'poncho', pants: '#4a3a2a', glasses: 'big', shoe: '#2c2218', acc: 'book' },
  /* Valley: bias and variance, weighing things fairly */
  nara: { h: 0.97, age: 'adult', skin: '#d9a47c', eye: '#3a2214', hair: '#5a2e22', hairL: '#8a5a44', style: 'bun', top: '#e0a23a', trim: '#8a3a2a', outfit: 'robe', belt: '#8a3a2a', hat: 'turban', hatC: '#c85a3a', shoe: '#4a3322', acc: 'basket' },
  tarn: { h: 0.98, age: 'teen', skin: '#d6a27a', eye: '#2a2a4a', hair: '#2e3a50', hairL: '#5a72a0', style: 'messy', top: '#5a7a8a', trim: '#e0b84a', outfit: 'vest', inner: '#ece4d0', pants: '#5a5a4a', glasses: 'round', hat: 'goggles', hatC: '#6a8a9a', shoe: '#3a2a20', acc: 'clip' },
  sera: { h: 0.96, age: 'adult', skin: '#f0c8a4', eye: '#6a4a8a', hair: '#4a2a3a', hairL: '#8a5a7a', style: 'bob', top: '#e8e0d0', trim: '#a8602a', outfit: 'apron', apron: '#a8602a', pants: '#5a4a3a', glasses: 'mono', hat: 'visor', hatC: '#4a7a5a', shoe: '#3a2a20', acc: 'scale' },
  rowan: { h: 0.94, age: 'elder', skin: '#e4b890', eye: '#3a2a18', hair: '#e8e0d4', hairL: '#ffffff', style: 'side', beard: 'short', brow: '#e8e0d4', top: '#6a7a3a', trim: '#d8582a', outfit: 'robe', belt: '#d8582a', hat: 'circlet', hatC: '#e0b84a', shoe: '#3a2a1a', acc: 'staff' },
  tumble: { h: 0.82, age: 'kid', skin: '#e8b890', eye: '#2a1a0e', hair: '#d8883a', hairL: '#f8b868', style: 'messy', top: '#d8483a', pants: '#3a4a7a', outfit: 'apron', apron: '#f4ecd6', hat: 'cap', hatC: '#58a84a', freckles: true, shoe: '#4a2a1a', acc: 'basket' },
  /* Temple: layers of neurons, simple and complex minds */
  lin: { h: 0.96, age: 'adult', skin: '#ecc8a4', eye: '#2a2a4a', hair: '#1e1e30', hairL: '#4a4a7a', style: 'bun', top: '#3a4a8a', trim: '#e0c860', outfit: 'coat', inner: '#e8ecf8', pants: '#2a2a4a', glasses: 'round', shoe: '#1e1e30', acc: 'tablet' },
  sage1: { h: 0.94, age: 'elder', skin: '#e6c4a0', eye: '#4a3a2a', hair: '#f0eee6', hairL: '#ffffff', style: 'bald', brow: '#f0eee6', top: '#f2eadc', trim: '#c8b890', outfit: 'robe', belt: '#c8b890', shoe: '#8a7a5a', acc: 'staff' },
  sage2: { h: 1.02, age: 'adult', skin: '#d8b090', eye: '#8a3acc', hair: '#cfc4f0', hairL: '#ffffff', style: 'spiky', top: '#5a2a8a', trim: '#f0c850', outfit: 'robe', belt: '#f0c850', hat: 'circlet', hatC: '#f0c850', shoe: '#2a1a3a', acc: 'orb', pattern: true },
  citizen: { h: 0.92, age: 'adult', skin: '#d9a47c', eye: '#2a1a14', hair: '#4a3022', hairL: '#7a5a44', style: 'messy', top: '#b08a5a', pants: '#4a3a2a', outfit: 'tunic', hat: 'cap', hatC: '#7a5a38', shoe: '#2c2218', belt: '#6a4a2a' },
  /* Core Isles: probability, hidden groups, nothing at all */
  keeper: { h: 0.98, age: 'adult', skin: '#eac4a0', eye: '#7a2a3a', hair: '#2a2030', hairL: '#6a5a7a', style: 'side', top: '#5a2a6a', trim: '#e0b84a', outfit: 'vest', inner: '#f4ecd6', pants: '#2a2038', glasses: 'mono', hat: 'tophat', hatC: '#2a2038', hatC2: '#e0b84a', shoe: '#1e1628', acc: 'dice' },
  seeker: { h: 0.96, age: 'teen', skin: '#e2b088', eye: '#2a8a8a', hair: '#7a3a22', hairL: '#d08a58', style: 'ponytail', top: '#e8e2d0', trim: '#2a8a8a', outfit: 'tunic', pants: '#4a4a5a', scarf: '#2a8a8a', scarfD: '#e8d870', hat: 'lens', hatC: '#c9a24b', shoe: '#3a2a20', belt: '#8a5a2a', acc: 'lens' },
  nullc: { h: 1, age: 'adult', skin: '#aab4c8', eye: '#e8f4ff', hair: '#2a2f45', hairL: '#4a5272', style: 'bald', top: '#2a2f45', trim: '#7a86aa', outfit: 'robe', belt: '#7a86aa', hat: 'hood', hatC: '#242840', shoe: '#1a1c2c', hollow: true },
  sagee: { h: 0.95, age: 'elder', skin: '#e7c3a0', eye: '#3a4a2a', hair: '#f0f0f0', hairL: '#ffffff', style: 'long', beard: 'goatee', brow: '#f0f0f0', top: '#8a5a3a', trim: '#f0e0b0', outfit: 'robe', belt: '#c9a24b', glasses: 'round', acc: 'scroll', tags: true, shoe: '#3a2a1a' },
  sagep: { h: 0.95, age: 'elder', skin: '#e4bf9c', eye: '#2a3a6a', hair: '#bfc8e0', hairL: '#f0f4ff', style: 'long', brow: '#bfc8e0', top: '#3a6a9a', trim: '#e0e8f8', outfit: 'robe', belt: '#e0e8f8', hat: 'circlet', hatC: '#7ad0e8', glasses: 'half', pattern: true, acc: 'staff', shoe: '#2a3a5a' },
  ferry1: { h: 1.03, age: 'adult', skin: '#d4986e', eye: '#2a3a4a', hair: '#e6e2da', hairL: '#ffffff', style: 'side', beard: 'long', brow: '#e6e2da', top: '#f0f0f0', trim: '#2a4a7a', outfit: 'stripe', pants: '#2a3a5a', hat: 'capn', hatC: '#2a4a7a', shoe: '#2a2a2a', broad: true, acc: 'oar' },
  ferry2: { h: 0.97, age: 'teen', skin: '#c9946a', eye: '#2a1a14', hair: '#2a2a3a', hairL: '#5a5a7a', style: 'messy', top: '#3a8ab0', trim: '#f4ecd6', outfit: 'vest', inner: '#f4ecd6', pants: '#3a4a5a', hat: 'band', hatC: '#d8483a', shoe: '#3a2a20', acc: 'oar' },
};
Object.keys(NPS).forEach((k) => { const q = Object.assign({}, NPD, NPS[k], { id: k }); q.bg = q.bg || mix(mix(q.top, '#8a8aae', 0.55), '#ffffff', 0.32); NPS[k] = q; });
const NPE = BZE;
let NPB = false; /* true while painting a dialogue bust: bigger, more detailed features */
const npInk = '#1a1020';
/* true pixel shading: each part is rasterised to a hard mask, lit from the top-left in four tones with a little 2x2 dithering at the tone borders, rim-lit on the light side and outlined in a dark shade of its own colour */
const NPMC = mkc(8, 8), NPT = mkc(8, 8), NPBAY = [0, 0.5, 0.75, 0.25];
function npCel(g, s, base, o) {
  o = o || {}; const W = g.canvas.width, H = g.canvas.height;
  if (NPMC.width !== W || NPMC.height !== H) { NPMC.width = W; NPMC.height = H; }
  const m = NPMC.getContext('2d', { willReadFrequently: true }); m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, W, H); m.setTransform(g.getTransform()); m.beginPath(); s.p(m); m.fillStyle = '#000'; m.fill();
  const im = m.getImageData(0, 0, W, H).data, A = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : im[(y * W + x) * 4 + 3] >= 128 ? 1 : 0);
  let x0 = W, y0 = H, x1 = -1, y1 = -1; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (A(x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) return; const w = x1 - x0 + 1, h = y1 - y0 + 1, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const T = [shade(base, o.l == null ? 0.22 : o.l), base, shade(base, o.d == null ? -0.26 : o.d), shade(base, -0.46)].map(hexRGB), OL = hexRGB(o.olc || shade(base, -0.64));
  if (NPT.width < w + 2 || NPT.height < h + 2) { NPT.width = w + 2; NPT.height = h + 2; }
  const tg = NPT.getContext('2d', { willReadFrequently: true }); tg.clearRect(0, 0, NPT.width, NPT.height); const id = tg.createImageData(w, h), d = id.data, flat = o.l === 0 && o.sx === 0;
  const sp = Math.max(w, h) * 0.5 + 0.001;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    if (!A(x, y)) continue; const i = ((y - y0) * w + (x - x0)) * 4, edge = !(A(x - 1, y) && A(x + 1, y) && A(x, y - 1) && A(x, y + 1));
    let c;
    if (edge && o.ol !== false) c = OL;
    else if (flat) c = T[1];
    else {
      const L = -(((x - cx) / (w / 2 + 0.01)) * 0.5 + ((y - cy) / (h / 2 + 0.01)) * 0.85) / 1.35;
      const e2 = !(A(x - 2, y) && A(x + 2, y) && A(x, y - 2) && A(x, y + 2)), lowRim = !A(x + 1, y + 1) || (!A(x + 1, y) && !A(x, y + 1)), hiRim = !A(x - 1, y - 1) && A(x + 1, y + 1);
      let t = L + (lowRim ? -0.55 : 0) + (hiRim && !edge ? 0.5 : 0) + (e2 && L < 0 ? -0.12 : 0); const bay = (NPBAY[((x & 1) << 1) | (y & 1)] - 0.375) * 0.3; t += bay;
      c = t > 0.42 ? T[0] : t > -0.22 ? T[1] : t > -0.62 ? T[2] : T[3];
    }
    d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
  }
  tg.putImageData(id, 0, 0); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(NPT, 0, 0, w, h, x0, y0, w, h); g.restore();
}
const npF = (g, pts, c, o) => npCel(g, bzB(pts), c, o);
const npP = (g, pts, c, o) => npCel(g, bzG(pts), c, o);
const npE = (g, x, y, rx, ry, c, o) => c[0] === 'r' ? 0 : npCel(g, bzO(x, y, rx, ry, (o && o.r) || 0), c, o);
const npR = (g, x, y, w, h, r, c, o) => c[0] === 'r' ? 0 : npCel(g, bzR(x, y, w, h, r), c, o);
/* anime shading: shadows slide toward violet, lights toward warm cream, instead of plain grey/black */
const npShade0 = shade;
function npWarm(fn) { shade = (h, a) => { const b = npShade0(h, a); return a < 0 ? mix(b, '#6a2e2a', Math.min(0.3, -a * 0.34)) : mix(b, '#fff2c8', Math.min(0.3, a * 0.3)); }; try { return fn(); } finally { shade = npShade0; } }
/* ---------- pixel-art finish: snap to a small per-character palette (3 tones per colour) and add a coloured selective outline ---------- */
const NPG = ['#fffaf0', '#1b1018', '#5a1820', '#8a3a3a', '#9a6a3a', '#f0d070', '#f4ecd6', '#6aa8d8', '#aab4c0', '#c9a24b', '#58b05a', '#e0b84a', '#d8404a', '#e8c040', '#ffd24a', '#ff3030', '#8fd0ff', '#9ae8f4', '#b070f0', '#2d2d3a', '#f8f4ea', '#b8884a', '#7ae8f0', '#c84a4a'];
function npPal(S) {
  const key = ['bg', 'skin', 'hair', 'hairL', 'top', 'trim', 'pants', 'shoe', 'hatC', 'hatC2', 'apron', 'inner', 'belt', 'scarf', 'scarfD', 'eye', 'brow'], L = [];
  key.forEach((k) => { const c = S[k]; if (typeof c === 'string' && c[0] === '#' && c.length === 7) [0.22, 0, -0.26, -0.46, -0.64].forEach((a) => L.push(hexRGB(shade(c, a)))); });
  NPG.forEach((c) => [0, -0.3].forEach((a) => L.push(hexRGB(shade(c, a))))); return L;
}
function npPix(hi, W, H, S) {
  const HW = hi.width, HH = hi.height, g = hi.getContext('2d'), im = g.getImageData(0, 0, HW, HH), d = im.data, pal = npPal(S), n = pal.length, cache = {};
  const px = new Int16Array(HW * HH);
  for (let i = 0, k = 0; i < HW * HH; i++, k += 4) {
    if (d[k + 3] < 140) { px[i] = -1; continue; }
    const key = (d[k] >> 2) << 12 | (d[k + 1] >> 2) << 6 | (d[k + 2] >> 2); let b = cache[key];
    if (b === undefined) { let bd = 1e9; for (let j = 0; j < n; j++) { const p = pal[j], dr = p[0] - d[k], dg = p[1] - d[k + 1], db = p[2] - d[k + 2], dd = dr * dr * 0.9 + dg * dg * 1.2 + db * db * 0.8; if (dd < bd) { bd = dd; b = j; } } cache[key] = b; }
    px[i] = b;
  }
  /* outer outline, 2px thick at this resolution */
  const T = Math.max(1, Math.round(HW / 60)), out = new Uint8Array(HW * HH);
  for (let y = 0; y < HH; y++) for (let x = 0; x < HW; x++) { if (px[y * HW + x] >= 0) continue; let best = -1, bl = 1e9; for (let yy = -T; yy <= T; yy++) for (let xx = -T; xx <= T; xx++) { if (xx * xx + yy * yy > T * T + 1) continue; const X = x + xx, Y = y + yy; if (X < 0 || Y < 0 || X >= HW || Y >= HH) continue; const c = px[Y * HW + X]; if (c >= 0) { const l = pal[c][0] + pal[c][1] + pal[c][2]; if (l < bl) { bl = l; best = c; } } } if (best >= 0) out[y * HW + x] = 1, px[y * HW + x] = -2 - best; }
  const c = mkc(HW, HH), cg = c.getContext('2d'), o = cg.createImageData(HW, HH), od = o.data;
  for (let i = 0; i < HW * HH; i++) { const v = px[i]; if (v === -1) continue; const k = i * 4; if (v >= 0) { const p = pal[v]; od[k] = p[0]; od[k + 1] = p[1]; od[k + 2] = p[2]; } else { const p = pal[-2 - v]; od[k] = p[0] * 0.28 + 26; od[k + 1] = p[1] * 0.22 + 12; od[k + 2] = p[2] * 0.22 + 10; } od[k + 3] = 255; }
  cg.putImageData(o, 0, 0); if (W === HW && H === HH) return c;
  const r = mkc(W, H), rg = r.getContext('2d'); rg.imageSmoothingEnabled = true; rg.imageSmoothingQuality = 'high'; rg.drawImage(c, 0, 0, W, H); return r;
}
/* ---------- anime eyes ---------- */
function npEye(g, S, x, y, side, e) {
  const ink = '#1b1018', iris = S.eye;
  if (S.hollow) { g.fillStyle = '#e8f4ff'; g.beginPath(); g.ellipse(x, y, 3, 3.8 * Math.min(e.o, 1.2) + 0.5, 0, 0, 7); g.fill(); g.strokeStyle = ink; g.lineWidth = 1.2; g.stroke(); return; }
  if (e.arc) { bzQ(g, [x - 3.4, y + 1.6], [x, y - 4.4], [x + 3.4, y + 1.6], ink, 1.8); return; }
  const op = Math.min(e.o, 1.3), rx = (NPB ? 3.7 : 3.2) * (e.o > 1.2 ? 1.12 : 1), ry = Math.max(1.4, (NPB ? 4.9 : 4.1) * op), ly = y + (e.o < 0.8 ? 0.7 : 0);
  g.save(); g.beginPath(); g.ellipse(x, ly, rx, ry, 0, 0, 7); g.fillStyle = '#fffaf0'; g.fill(); g.clip();
  const px = x + (e.look ? 1.4 : 0); g.fillStyle = shade(iris, -0.3); g.beginPath(); g.ellipse(px, ly + ry * 0.12, rx * 0.78, ry * 0.92, 0, 0, 7); g.fill();
  g.fillStyle = ink; g.beginPath(); g.ellipse(px, ly + ry * 0.18, rx * 0.46, ry * 0.58, 0, 0, 7); g.fill();
  g.fillStyle = '#ffffff'; g.beginPath(); g.rect(px - rx * 0.5, ly - ry * 0.55, rx * 0.52, ry * 0.4); g.fill();
  if (e.o < 0.9) { g.fillStyle = shade(S.skin, -0.12); g.fillRect(x - rx - 1, ly - ry - 1, rx * 2 + 2, ry * (1 - e.o) * 1.7 + 1); }
  g.restore();
  g.strokeStyle = ink; g.lineWidth = NPB ? 2 : 1.5; g.lineCap = 'round'; g.beginPath(); g.ellipse(x, ly, rx + 0.2, ry + 0.1, 0, Math.PI * 1.02, Math.PI * 1.98); g.stroke(); if (NPB) { g.strokeStyle = shade(S.skin, -0.4); g.lineWidth = 0.8; g.beginPath(); g.ellipse(x, ly + 0.4, rx, ry + 0.2, 0, Math.PI * 0.15, Math.PI * 0.85); g.stroke(); }
  if (e.tear && side > 0) { g.fillStyle = '#9ad8ff'; g.beginPath(); g.ellipse(x + 2.4, ly + ry + 2.6, 1.1, 1.9, 0, 0, 7); g.fill(); }
}

/* ---------- hair: head-local space (face centre 0,0; skull top -20) ---------- */
const NPCAP = [[-16, 3], [-16.6, -8], [-10, -17.6], [0, -21], [10, -17.6], [16.6, -8], [16, 3], [13, -3.5], [8, -9.5], [2, -6.8], [-3, -10], [-9, -7], [-13, -2.5]];
function npHairBack(g, S, v) {
  const H = S.hair, st = S.style, s = v === 's' ? 1 : 0;
  if (st === 'long') { npF(g, [[-17, -6], [-19, 10], [-17, 30], [-6, 34], [0, 30], [6, 34], [17, 30], [19, 10], [17, -6], [0, -20]].map((p) => [p[0] + s * 3, p[1]]), H); }
  if (st === 'bob') npF(g, [[-18, -4], [-18.5, 12], [-12, 14], [0, 8], [12, 14], [18.5, 12], [18, -4], [0, -20]], H);
  if (st === 'bun') { npE(g, s * 4, -24, 6.5, 5.6, H); npE(g, s * 4 - 1.8, -25.6, 2.4, 1.4, S.hairL, { ol: false }); }
  if (st === 'braid') { const bx = v === 'f' ? 15 : v === 'b' ? 6 : 12; for (let i = 0; i < 7; i++) npE(g, bx + (i % 2 ? 0.8 : -0.8), 4 + i * 5, 3.4 - i * 0.1, 3, H); npE(g, bx, 40, 2.6, 2.2, S.hatC || '#d9558f', { ol: false }); }
  if (st === 'ponytail') { const tx = v === 'f' ? 17 : v === 's' ? 13 : 0; npF(g, [[tx - 3, -8], [tx + 6, -2], [tx + 8, 12], [tx + 3, 24], [tx - 1, 16], [tx - 3, 4]], H); }
  if (st === 'pigtails') { [-1, 1].forEach((k) => npF(g, [[k * 15, -6], [k * 23, 0], [k * 22, 18], [k * 17, 26], [k * 14, 12]], H)); }
  if (st === 'curly') { for (let i = 0; i < 9; i++) { const a = Math.PI * (1 + i / 8); npE(g, Math.cos(a) * 15.5, -2 + Math.sin(a) * 18, 5.6, 5.6, H); } }
  if (st === 'bald' && v !== 'f') { npF(g, [[-14, -2], [-15, 8], [-9, 10], [0, 2], [9, 10], [15, 8], [14, -2], [0, -8]], H); }
  if (st === 'bald' && v === 'f') { npF(g, [[-15, -6], [-18, 4], [-14, 12], [-12, 2]], H); npF(g, [[15, -6], [18, 4], [14, 12], [12, 2]], H); }
}
function npShine(g, S, v) {
  const H = S.hair, L = S.hairL, M = mix(H, L, 0.45), D = shade(H, -0.45); if (S.style === 'bald') return;
  const sh = v === 's' ? 3 : 0;
  [[[-14, -6], [-14, -13], [-9, -18], [-8, -12]], [[-5, -19], [0, -20.5], [3, -17], [-3, -15]], [[5, -18], [10, -16], [12, -11], [7, -13]]].forEach((q) => npP(g, q.map((p) => [p[0] + sh, p[1]]), M, { ol: false, l: 0, d: 0, sx: 0 }));
  [[[-12, -12], [-10, -16.5], [-7, -16], [-9, -12]], [[-3, -18], [0, -19.6], [1.4, -18], [-1, -16.6]], [[7, -16.4], [10, -15], [10.6, -12.6], [8, -13.8]]].forEach((q) => npP(g, q.map((p) => [p[0] + sh, p[1]]), L, { ol: false, l: 0, d: 0, sx: 0 }));
  [[-9, -8, -10, -2], [-1, -7, -1.4, -1.6], [8, -8, 9.6, -2.4]].forEach(([a, b, c, d]) => bzL(g, [[a + sh, b], [c + sh, d]], D, 1.1));
}
function npHairFront(g, S, v, x0) {
  const H = S.hair, L = S.hairL, st = S.style, o = x0 || 0;
  if (v === 'b') { npF(g, [[-16.5, 4], [-17, -9], [-10, -18], [0, -21.5], [10, -18], [17, -9], [16.5, 4], [11, 11], [0, 13], [-11, 11]], H); npF(g, [[-6, -17], [0, -12], [7, -16], [3, -19]], L, { ol: false, l: 0 }); if (st === 'spiky') [[[-13, -14], [-21, -21], [-7, -18]], [[-4, -19], [-4, -30], [5, -19]], [[7, -18], [18, -27], [14, -12]]].forEach((t) => npP(g, t, H)); return; }
  if (v === 's') {
    npF(g, [[-12, -3], [-13, -12], [-7, -18], [2, -21], [11, -18], [17, -10], [17, 2], [15, 12], [8, 6], [7, -4], [2, -8], [-3, -9], [-8, -5]], H);
    npF(g, [[-6, -17], [0, -13], [7, -17], [3, -20]], L, { ol: false, l: 0 });
    if (st === 'spiky') [[[-10, -13], [-19, -17], [-6, -19]], [[-4, -19], [-4, -30], [5, -20]], [[6, -19], [16, -28], [15, -13]], [[15, -8], [24, -8], [16, -2]], [[-12, -5], [-16, 2], [-8, -5]]].forEach((t) => npP(g, t, H));
    if (st === 'messy' || st === 'curly') [[[-8, -17], [-8, -26], [0, -20]], [[2, -20], [10, -28], [11, -16]], [[15, -6], [22, -4], [16, 2]]].forEach((t) => npP(g, t, H));
    if (st === 'bob') npF(g, [[16, 0], [16, 12], [9, 12], [8, 2]], H);
    return;
  }
  /* front */
  if (st === 'bald') { npF(g, [[-16, 0], [-16, -3], [-13, -5], [-12, 0]], H, { ol: false }); return; }
  let cap = NPCAP;
  if (st === 'bob') cap = [[-18, 12], [-18.4, -8], [-10, -17.6], [0, -21], [10, -17.6], [18.4, -8], [18, 12], [13, 10], [12.6, -3], [6, -6], [0, -4.6], [-6, -6], [-12.6, -3], [-13, 10]];
  if (st === 'side') cap = [[-16, 3], [-16.6, -8], [-10, -17.6], [0, -21], [10, -17.6], [16.6, -8], [16, 3], [13, -2], [9, -8], [2, -10], [-8, -9], [-14, -3]];
  if (st === 'long') cap = [[-17, 8], [-17.4, -8], [-10, -17.8], [0, -21], [10, -17.8], [17.4, -8], [17, 8], [13.6, -2], [7, -9], [0, -6], [-7, -9], [-13.6, -2]];
  npF(g, cap, H);
  npF(g, [[-9, -17], [-2, -13.5], [5, -16.5], [0, -19.5]], L, { ol: false, l: 0 });
  
  [[-7, -17, -8, -11], [7, -17, 8, -12]].forEach(([a, b, c, d]) => bzL(g, [[a, b], [c, d]], L, 1));
  const hh = ['straw', 'cap', 'capn', 'beret', 'tophat', 'scholar', 'turban', 'hood'].includes(S.hat);
  if (st === 'spiky' && !hh) { [[[-14, -12], [-22, -19], [-8, -17]], [[-9, -17], [-11, -28], [0, -19]], [[-1, -19], [4, -30], [9, -18]], [[8, -17], [18, -26], [15, -11]], [[14, -6], [23, -7], [15, -13]], [[-15, -4], [-23, -2], [-15, -10]]].forEach((t) => npP(g, t, H)); [[[-12, -6], [-8, 3.4], [-5, -6.5]], [[-4, -8], [-1, 4.6], [3, -8]], [[4, -7], [9, 3], [12, -6]]].forEach((t) => npP(g, t, H, { ol: true })); }
  if (st === 'messy' && !hh) { [[[-12, -12], [-17, -22], [-6, -18]], [[-4, -19], [-1, -29], [7, -19]], [[9, -17], [17, -24], [15, -10]], [[-15, -3], [-22, 1], [-15, -8]], [[15, -3], [22, 0], [15, -8]]].forEach((t) => npP(g, t, H)); [[[-9, -8], [-6, 2], [-3, -8]], [[3, -8], [6, 2.4], [10, -7]]].forEach((t) => npP(g, t, H)); }
  if (st === 'curly') { for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i / 6.5); npE(g, Math.cos(a) * 12.5, -4 + Math.sin(a) * 14, 5.4, 5.2, H); } npF(g, cap, H, { ol: false }); }
  if (st === 'bun') npF(g, [[-16, 3], [-16, 9], [-12, 5]], H, { ol: false });
  if (st === 'pigtails') npF(g, [[-8, -8], [-3, 0], [0, -8], [3, 0], [8, -8]], H, { ol: false });
  if (st === 'ponytail') npP(g, [[-4, -9], [-1, 2], [3, -8]], H);
}
/* ---------- face, headwear ---------- */
function npHat(g, S, v) {
  const h = S.hat; if (!h) return; const C = S.hatC || '#888', C2 = S.hatC2 || shade(C, 0.3), sd = v === 's' ? -3 : 0;
  if (h === 'straw') { npE(g, sd, -9, 24, 5.4, C); g.save(); g.strokeStyle = shade(C, -0.35); g.lineWidth = 0.7; for (let i = -20; i < 21; i += 4) { g.beginPath(); g.moveTo(i + sd, -13); g.lineTo(i * 1.1 + sd, -5); g.stroke(); } g.restore(); npF(g, [[-12, -9], [-11.4, -19], [-5, -25], [5, -25], [11.4, -19], [12, -9]], C); npR(g, -12, -13.6, 24, 4, 1.4, C2); bzL(g, [[11, -10], [15, -7]], C2, 2); }
  if (h === 'cap') { npF(g, [[-16.6, -5], [-16.6, -14], [-10, -21], [0, -23.5], [10, -21], [16.6, -14], [16.6, -5], [8, -8.6], [-8, -8.6]], C); npP(g, [[-17, -7], [-10, -6.4], [-4, -4.4], [-4, -8.6], [-17, -9.4]].map((p) => [p[0] + (v === 's' ? -5 : 0), p[1]]), shade(C, -0.1)); bzD(g, 0, -23.4, 1.4, shade(C, 0.45)); npF(g, [[-8, -19], [-1, -17], [4, -21], [-2, -22.4]], shade(C, 0.4), { ol: false, l: 0 }); }
  if (h === 'capn') { npF(g, [[-17, -6], [-16, -16], [-9, -22], [9, -22], [16, -16], [17, -6], [9, -9], [-9, -9]], C); npR(g, -18, -10.6, 36, 4.4, 2, '#f0f0f0'); npP(g, [[-17, -8], [-24, -5], [-11, -4.5]].map((p) => [p[0] + sd, p[1]]), shade(C, -0.35)); npE(g, 0, -17, 3.4, 3.4, '#e8c040', { l: 0.4 }); bzL(g, [[0, -19], [0, -15]], '#6a4a10', 1); bzL(g, [[-2, -16], [2, -16]], '#6a4a10', 1); }
  if (h === 'beret') { npF(g, [[-18, -5], [-17, -15], [-6, -22], [8, -22], [18, -14], [19, -5], [8, -8], [-8, -9]], C); bzL(g, [[2, -22], [2, -26]], shade(C, -0.3), 2.2); bzD(g, 2, -26, 1.6, shade(C, 0.3)); npF(g, [[-12, -17], [-3, -18], [2, -21], [-6, -21]], shade(C, 0.4), { ol: false, l: 0 }); }
  if (h === 'hood') { npF(g, [[-20, 14], [-22, -6], [-14, -20], [0, -26], [14, -20], [22, -6], [20, 14], [16, 4], [14, -6], [8, -13], [0, -15], [-8, -13], [-14, -6], [-16, 4]], C); if (S.id === 'sylvan' || h === 'hood' && !S.hollow) { npP(g, [[8, -22], [18, -34], [14, -20]], '#e8e0c0', { l: 0.2 }); } }
  if (h === 'band') { npR(g, -16.6, -11, 33.2, 4.6, 2, C); npP(g, [[14, -10], [24, -14], [22, -5]], shade(C, -0.1)); bzD(g, -6, -8.7, 0.9, shade(C, 0.5)); bzD(g, 0, -8.7, 0.9, shade(C, 0.5)); bzD(g, 6, -8.7, 0.9, shade(C, 0.5)); }
  if (h === 'goggles') { npR(g, -16.6, -12, 33.2, 3.2, 1.4, '#5a3a22'); [-7.5, 7.5].forEach((x) => { npE(g, x, -10.4, 5.4, 5.2, C, { l: 0.4 }); npE(g, x, -10.4, 3.6, 3.4, '#9ae8f4', { l: 0.4, d: -0.2 }); npE(g, x - 1, -11.8, 1.1, 0.8, '#ffffff', { ol: false }); }); }
  if (h === 'scholar') { npF(g, [[-17, -10], [-15, -17], [0, -19], [15, -17], [17, -10], [10, -12], [-10, -12]], C); npP(g, [[-22, -19], [0, -26], [22, -19], [0, -13]], shade(C, 0.1)); bzL(g, [[0, -20], [20, -17], [21, -9]], S.trim || '#e0b84a', 1.4); bzD(g, 21, -8, 1.8, S.trim || '#e0b84a'); bzD(g, 0, -20, 1.4, S.trim || '#e0b84a'); }
  if (h === 'visor') { npR(g, -17, -12, 34, 4.6, 2, shade(C, 0.1)); npP(g, [[-17, -10], [17, -10], [24, -5], [-10, -4]].map((p) => [p[0] + sd, p[1]]), C, { l: 0.3 }); npR(g, -17, -20, 34, 10, 4, 'rgba(0,0,0,0)', { ol: false }); }
  if (h === 'laurel' || h === 'branch') { const lf = (x, y, r, c) => { g.save(); g.translate(x, y); g.rotate(r); npF(g, [[0, -5], [3, 0], [0, 5], [-3, 0]], c, { l: 0.3 }); g.restore(); }; if (h === 'laurel') { for (let i = 0; i < 9; i++) { const a = Math.PI * (1.08 + i / 8.4); lf(Math.cos(a) * 17, -3 + Math.sin(a) * 15, a + Math.PI / 2 + 0.5, C); } bzD(g, 0, -18, 1.6, '#f0e080'); } else { [[-1, -1], [1, -1]].forEach(([k]) => { bzL(g, [[k * 8, -17], [k * 11, -26], [k * 9, -34]], C, 2.6); bzL(g, [[k * 11, -26], [k * 18, -30]], C, 2); bzL(g, [[k * 10, -21], [k * 17, -21]], C, 1.8); lf(k * 9, -36, k * 0.5, '#58b05a'); lf(k * 19, -31, k * 1.2, '#78d86a'); lf(k * 18, -21, k * 1.4, '#58b05a'); }); } }
  if (h === 'tophat') { npE(g, 0, -13, 22, 4.4, shade(C, 0.05)); npF(g, [[-11, -13], [-11.6, -34], [-9, -37], [9, -37], [11.6, -34], [11, -13]], C); npR(g, -11.4, -21, 22.8, 5, 1, C2, { l: 0.3 }); npP(g, [[9, -22], [16, -34], [12, -20]], '#f4ecd6', { l: 0.1 }); bzL(g, [[13, -26], [15, -30]], '#d8404a', 1.4); }
  if (h === 'circlet') { npR(g, -15.6, -12.4, 31.2, 2.8, 1.4, C, { l: 0.4 }); npP(g, [[0, -19], [3.4, -13], [0, -8], [-3.4, -13]], S.pattern ? '#ff6a9a' : '#6ad8f0', { l: 0.4, d: -0.2 }); }
  if (h === 'turban') { npF(g, [[-18, -4], [-17, -16], [-7, -23], [8, -23], [18, -14], [18, -4], [6, -9], [-8, -9]], C); for (let i = 0; i < 3; i++) bzQ(g, [-16 + i * 3, -6 - i * 4], [0, -15 - i * 3], [16 - i * 3, -6 - i * 4], shade(C, -0.38), 1.1); npE(g, 0, -16, 2.6, 2.6, '#f0d070', { l: 0.4 }); }
  if (h === 'lens') { npR(g, -16.6, -11.4, 33.2, 3, 1.4, '#8a5a2a'); npE(g, 0, -10, 4.2, 4.2, C, { l: 0.4 }); npE(g, 0, -10, 2.8, 2.8, '#7ae8e8', { l: 0.4, d: -0.2 }); }
}
function npBrow(g, xi, yi, xo, yo, w, c) { g.fillStyle = c; g.beginPath(); g.moveTo(xi, yi - w * 0.55); g.lineTo(xo, yo - w * 0.2); g.lineTo(xo, yo + w * 0.25); g.lineTo(xi, yi + w * 0.6); g.closePath(); g.fill(); }
function npEyeB(g, S, x, y, side, e, expr) {
  const ink = '#2a1a1c', rx = 3 * (e.o > 1.2 ? 1.12 : 1), ry = Math.max(1.2, 3.5 * Math.min(e.o, 1.3)), ly = y + (e.o < 0.8 ? 0.5 : 0);
  if (e.arc) { bzQ(g, [x - 3.2, y + 1.4], [x, y - 3.8], [x + 3.2, y + 1.4], ink, 1.8); return; }
  g.save(); g.beginPath(); g.ellipse(x, ly, rx, ry, 0, 0, 7); g.fillStyle = '#fffaf0'; g.fill(); g.clip();
  const px = x + (e.look ? 1.3 : 0); g.fillStyle = shade(S.eye, -0.45); g.beginPath(); g.ellipse(px, ly + ry * 0.1, rx * 0.74, ry * 0.94, 0, 0, 7); g.fill();
  g.fillStyle = '#ffffff'; g.fillRect(px - rx * 0.5, ly - ry * 0.5, rx * 0.5, ry * 0.42);
  if (e.o < 0.9) { g.fillStyle = shade(S.skin, -0.14); g.fillRect(x - rx - 1, ly - ry - 1, rx * 2 + 2, ry * (1 - e.o) * 1.8 + 1); }
  g.restore();
  g.strokeStyle = ink; g.lineCap = 'round'; g.lineWidth = 1.4; g.beginPath(); g.ellipse(x, ly, rx + 0.2, ry + 0.1, 0, Math.PI * 1.05, Math.PI * 1.95); g.stroke();
  if (e.tear && side > 0) { g.fillStyle = '#9ad8ff'; g.beginPath(); g.ellipse(x + 2.2, ly + ry + 2.4, 1, 1.8, 0, 0, 7); g.fill(); }
}
function npMouthB(g, S, my, e, expr) {
  const K = '#5a1820', lc = shade(S.skin, -0.5);
  if (expr === 'happy') { g.fillStyle = K; g.beginPath(); g.moveTo(-3.8, my - 0.4); g.quadraticCurveTo(0, my + 1.2, 3.8, my - 0.4); g.quadraticCurveTo(0, my + 5.4, -3.8, my - 0.4); g.fill(); return; }
  if (expr === 'surprised') { g.fillStyle = K; g.beginPath(); g.ellipse(0, my + 1.6, 2, 2.8, 0, 0, 7); g.fill(); return; }
  if (expr === 'angry') { g.fillStyle = K; g.beginPath(); g.moveTo(-3.6, my); g.lineTo(3.6, my); g.lineTo(2.8, my + 2.8); g.lineTo(-2.8, my + 2.8); g.closePath(); g.fill(); g.fillStyle = '#fffaf0'; g.fillRect(-3.2, my + 0.2, 6.4, 1.2); return; }
  if (expr === 'sad') { bzQ(g, [-3, my + 1.8], [0, my - 0.8], [3, my + 1.8], lc, 1.4); return; }
  if (expr === 'thinking') { bzL(g, [[-2, my + 0.6], [3.4, my - 0.4]], lc, 1.4); return; }
  if (expr === 'confident') { bzQ(g, [-3, my + 0.2], [1, my + 2.2], [3.8, my - 1], lc, 1.5); return; }
  if (expr === 'determined') { bzL(g, [[-3.2, my + 0.5], [3.2, my + 0.5]], lc, 1.6); return; }
  bzQ(g, [-2.8, my], [0, my + 0.9], [2.8, my], lc, 1.4);
}
function npFaceBust(g, S, expr) {
  const e = NPE[expr || 'neutral'], tone = S.hollow ? '#aab4c8' : S.skin, el = S.age === 'elder', kid = S.age === 'kid', W = kid ? 14.4 : S.slim ? 12 : 13, ch = kid ? 17 : 19.5;
  npE(g, -W - 0.4, 3, 2.2, 3.8, shade(tone, -0.06)); npE(g, W + 0.4, 3, 2.2, 3.8, shade(tone, -0.12));
  const pts = [[-W, -8], [-W - 0.2, 3.5], [-W + 3, 12.5], [-5.4, ch - 1], [0, ch + 1.4], [5.4, ch - 1], [W - 3, 12.5], [W + 0.2, 3.5], [W, -8], [0, -16]];
  npF(g, pts, tone, { l: 0, d: -0.16, sx: 1.8, lw: 1.1 });
  g.save(); g.beginPath(); bzB(pts).p(g); g.clip();
  g.fillStyle = 'rgba(130,60,50,0.18)'; g.beginPath(); g.ellipse(0, -9.5, W + 3, 6.4, 0, 0, 7); g.fill(); g.restore();
  const ey = kid ? 3.6 : 3, sp = kid ? 6.6 : 6.4; npEyeB(g, S, -sp, ey, -1, e, expr); npEyeB(g, S, sp, ey, 1, e, expr);
  const bc = S.brow || shade(S.hair, -0.34), by = ey - 7.4 - (e.o > 1.2 ? 2 : 0), bw = el ? 2.4 : 1.6, tl = e.t, th = Math.max(-1, Math.min(1, tl));
  const yi = by + th * 1.8, yo = by - th * 1.2 - (e.asym ? 0 : 0);
  npBrow(g, -sp + 3.6, yi, -sp - 4.8, yo + 0.6, bw, bc); npBrow(g, sp - 3.6, yi - (e.asym ? 2 : 0), sp + 4.8, yo + 0.6 - (e.asym ? 1.4 : 0), bw, bc);
  bzL(g, [[0.2, ey + 6.4], [1.4, ey + 7.2]], shade(tone, -0.42), 1);
  npMouthB(g, S, ch - 5.8, e, expr || 'neutral');
  if (['happy', 'confident', 'surprised', 'sad', 'angry'].includes(expr) || kid) { g.fillStyle = 'rgba(236,110,110,0.4)'; g.beginPath(); g.ellipse(-sp - 1.6, ey + 6.8, 3.4, 1.9, 0, 0, 7); g.ellipse(sp + 1.6, ey + 6.8, 3.4, 1.9, 0, 0, 7); g.fill(); }
  if (S.freckles) { g.fillStyle = shade(tone, -0.32); [[-10, 9], [-8, 10], [-6, 9], [6, 9], [8, 10], [10, 9]].forEach(([x, y]) => g.fillRect(x - 0.4, y - 0.4, 1, 1)); }
  if (el) { bzL(g, [[-W + 3, 8], [-W + 5, 11.4]], shade(tone, -0.28), 0.8); bzL(g, [[W - 3, 8], [W - 5, 11.4]], shade(tone, -0.28), 0.8); bzL(g, [[-6, ey - 4.6], [6, ey - 4.6]], 'rgba(0,0,0,0)', 0); }
  if (S.beard === 'stubble') { g.fillStyle = 'rgba(40,30,30,0.12)'; g.beginPath(); g.moveTo(-W + 2, 7); g.quadraticCurveTo(0, ch + 4, W - 2, 7); g.quadraticCurveTo(0, 10, -W + 2, 7); g.fill(); }
}
function npFace(g, S, v, expr) {
  if (NPB && v === 'f') return npFaceBust(g, S, expr);
  const e = NPE[expr || 'neutral'], sk = S.skin, kid = S.age === 'kid', el = S.age === 'elder', ch = kid ? 14 : S.slim ? 17 : 16, W = kid ? 14.8 : S.slim ? 13 : 14;
  const tone = S.hollow ? '#aab4c8' : sk;
  if (v === 'b') { npE(g, -W - 0.6, 3, 2.2, 3.4, shade(tone, -0.06)); npE(g, W + 0.6, 3, 2.2, 3.4, shade(tone, -0.12)); npF(g, [[-W + 2, 8], [0, 16], [W - 2, 8], [W, 0], [0, -4]], shade(tone, -0.08), { ol: false }); return; }
  if (v === 's') {
    npE(g, 6, 3.5, 2.4, 3.6, shade(tone, -0.1));
    npF(g, [[-12, -8], [-13.4, 0], [-14.8, 4.2], [-12.4, 5.6], [-12, 9], [-6, 14.5], [3, 14], [10, 8], [13, -3], [10, -14], [0, -17], [-8, -15]], tone);
    npE(g, 2, 4, 1.6, 2.4, shade(tone, -0.12), { ol: false });
    npEye(g, S, -5.4, 2, -1, e); const bc = S.brow || shade(S.hair, -0.3); bzL(g, [[-9.6, -4 + e.t * 1.2], [-2.6, -4.6 - e.t * 0.8]], bc, el ? 2 : 1.5);
    bzL(g, [[-13.4, 4.6], [-12, 5.6]], shade(tone, -0.4), 0.9); bzQ(g, [-10.2, 10], [-8, 10.6 - e.c * 0.7], [-5.4, 10], '#8a3a3a', 1); if (e.m > 0.45) { g.fillStyle = '#5a1820'; g.beginPath(); g.ellipse(-8, 10.6, 1.6, 1.5, 0, 0, 7); g.fill(); }
    g.fillStyle = 'rgba(240,110,110,0.34)'; g.beginPath(); g.ellipse(-3, 8, 2.6, 1.6, 0, 0, 7); g.fill();
    return;
  }
  const pts = [[-W, -8], [-W - 0.4, 4], [-W + 5, 11], [-3, ch + 0.4], [0, ch + 1.6], [3, ch + 0.4], [W - 5, 11], [W + 0.4, 4], [W, -8], [0, -16]];
  npE(g, -W - 0.4, 2.4, 2.2, 3.6, shade(tone, -0.06)); npE(g, W + 0.4, 2.4, 2.2, 3.6, shade(tone, -0.12));
  npF(g, pts, tone, { l: 0, d: -0.17, sx: 1.7, lw: 1.1 });
  g.save(); g.beginPath(); bzB(pts).p(g); g.clip(); g.fillStyle = 'rgba(120,50,110,0.16)'; g.beginPath(); g.ellipse(0, -9, W + 2, 6.4, 0, 0, 7); g.fill(); g.fillStyle = 'rgba(120,50,110,0.12)'; g.beginPath(); g.ellipse(0, ch + 4, W - 3, 5, 0, 0, 7); g.fill(); g.restore();
  const ey = kid ? 3.4 : 2.4, sp = kid ? 6.4 : 6.2; npEye(g, S, -sp, ey, -1, e); npEye(g, S, sp, ey, 1, e);
  const bc = S.brow || shade(S.hair, -0.3), by = ey - 7.4 - (e.o > 1.2 ? 1.8 : 0), bw = el ? 2.6 : 1.6, tl = e.t;
  if (tl > 0.5) { bzL(g, [[-sp - 4.4, by - 1.1], [-sp + 4, by + 1.8]], bc, bw); bzL(g, [[sp + 4.4, by - 1.1], [sp - 4, by + 1.8]], bc, bw); }
  else if (tl < -0.4) { bzL(g, [[-sp - 4.4, by + 1.4], [-sp + 4, by - 0.9]], bc, bw); bzL(g, [[sp + 4.4, by + 1.4], [sp - 4, by - 0.9]], bc, bw); }
  else if (e.asym) { bzL(g, [[-sp - 4, by], [-sp + 4, by - 0.4]], bc, bw); bzL(g, [[sp - 4, by - 2.4], [sp + 4, by - 0.4]], bc, bw); }
  else { bzL(g, [[-sp - 4, by + 0.3], [-sp + 4, by - 0.5]], bc, bw); bzL(g, [[sp - 4, by - 0.5], [sp + 4, by + 0.3]], bc, bw); }
  bzL(g, [[0.4, ey + 5.6], [1.2, ey + 6.8]], shade(tone, -0.4), 0.9);
  const my = ch - 3.6; bzMouth(g, 0, my, kid ? 2.6 : 3.2, e, { ink: '#5a1820', line: '#8a3a3a' });
  if (e.m < 0.2 && e.c > 0.7) { }
  if (['happy', 'confident', 'surprised', 'sad'].includes(expr) || kid) { g.fillStyle = 'rgba(240,110,110,0.36)'; g.beginPath(); g.ellipse(-sp - 1, ey + 5.6, 3, 1.7, 0, 0, 7); g.ellipse(sp + 1, ey + 5.6, 3, 1.7, 0, 0, 7); g.fill(); }
  if (S.freckles) { g.fillStyle = shade(tone, -0.3); [[-9, 7.4], [-7, 8.4], [-5, 7.4], [5, 7.4], [7, 8.4], [9, 7.4]].forEach(([x, y]) => g.fillRect(x - 0.4, y - 0.4, 0.9, 0.9)); }
  if (el) { bzL(g, [[-W + 3, 7.6], [-W + 5, 10.4]], shade(tone, -0.25), 0.7); bzL(g, [[W - 3, 7.6], [W - 5, 10.4]], shade(tone, -0.25), 0.7); }
  if (S.beard === 'stubble') { g.fillStyle = 'rgba(40,30,30,0.28)'; g.beginPath(); g.moveTo(-W + 2, 6); g.quadraticCurveTo(0, ch + 3, W - 2, 6); g.quadraticCurveTo(0, 8, -W + 2, 6); g.fill(); }
}
function npBeard(g, S, v, expr) {
  const b = S.beard; if (!b || b === 'stubble') return; const e = NPE[expr || 'neutral'], H = S.hair, L = S.hairL, mo = e.m > 0.45;
  if (v === 'b') return;
  if (v === 's') { if (b === 'long') npF(g, [[-13, 6], [-12, 14], [-6, 24], [4, 28], [10, 20], [9, 8], [0, 8]], H); else npF(g, [[-12, 8], [-9, 14], [0, 16], [6, 10], [0, 7]], H); return; }
  if (b === 'long') { npF(g, [[-14, 4], [-14, 14], [-8, 24], [0, 31], [8, 24], [14, 14], [14, 4], [8, 9], [3.4, 8.6], [0, 10], [-3.4, 8.6], [-8, 9]], H); npF(g, [[-6, 15], [0, 26], [2, 15]], L, { ol: false, l: 0 }); if (mo) npE(g, 0, 11.6, 2.4, 1.8, '#5a1820', { ol: false }); }
  if (b === 'short') { npF(g, [[-13, 5], [-12, 13], [-6, 18], [0, 19], [6, 18], [12, 13], [13, 5], [7, 9], [0, 8.4], [-7, 9]], H); if (mo) npE(g, 0, 12, 2.2, 1.6, '#5a1820', { ol: false }); }
  if (b === 'goatee') { npF(g, [[-3.4, 12], [-2, 19], [0, 21], [2, 19], [3.4, 12]], H); npF(g, [[-6.6, 8.4], [-3, 7.4], [0, 8.4], [3, 7.4], [6.6, 8.4], [3, 10.4], [-3, 10.4]], H); }
}
function npGlass(g, S, v) {
  const t = S.glasses; if (!t || v === 'b') return; const ey = S.age === 'kid' ? 3.4 : 2.4, ink = '#7a6a5a', big = t === 'big', r = big ? 6.6 : 5.4, xs = v === 's' ? [-5.4] : [-6.3, 6.3];
  if (v === 's') { bzL(g, [[-5.4 + r, ey - 1], [13, ey - 2.4]], ink, 1); }
  xs.forEach((x, i) => { g.save(); g.fillStyle = 'rgba(190,232,255,0.2)'; g.strokeStyle = ink; g.lineWidth = big ? 1.3 : 0.9; if (t === 'half') { g.beginPath(); g.ellipse(x, ey, r, r - 1, 0, 0, Math.PI); g.stroke(); } else { g.beginPath(); g.ellipse(x, ey, r, r - 0.2, 0, 0, 7); g.fill(); g.stroke(); } g.fillStyle = 'rgba(255,255,255,0.55)'; g.fillRect(x - r * 0.6, ey - r * 0.5, 2.4, 0.9); g.restore(); if (t === 'mono' && i === 1) { bzL(g, [[x + r * 0.7, ey + r * 0.7], [x + 8, ey + 14]], '#c9a24b', 0.7); } });
  if (xs.length > 1) bzL(g, [[-1, ey - 0.4], [1, ey - 0.4]], ink, 1);
  if (t === 'mono' && xs.length === 1) { }
}
function npHead(g, S, v, expr) {
  npHairBack(g, S, v); npFace(g, S, v, expr); if (S.hollow && v === 'f') { }
  if (S.id === 'qtree') { g.save(); g.strokeStyle = shade(S.skin, -0.4); g.lineWidth = 0.8; [[-10, 6, -5, 7], [8, 5, 11, 8], [-3, -6, 3, -5]].forEach(([a, b, c, d]) => { if (v === 'f') { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); } }); g.restore(); }
  npBeard(g, S, v, expr); npGlass(g, S, v); npHairFront(g, S, v); npHat(g, S, v);
}
/* ---------- body: origin at the feet, +y down, shoulders at -38 ---------- */
function npAcc(g, S, v, hx, hy) {
  const a = S.acc; if (!a) return; const W = '#8a5a2a';
  g.save(); g.translate(hx, hy);
  if (a === 'staff' || a === 'leafstaff') { npR(g, -1.4, -38, 2.8, 46, 1.4, '#9a6a3a'); if (a === 'staff') { npE(g, 0, -41, 4.6, 4.6, '#f0d070', { l: 0.5 }); bzD(g, -1.2, -42.4, 1.1, '#ffffff'); } else { [[-5, -42, -0.7], [5, -42, 0.7], [0, -47, 0]].forEach(([x, y, r]) => { g.save(); g.translate(x, y); g.rotate(r); npF(g, [[0, -6], [4, 0], [0, 6], [-4, 0]], '#58b05a', { l: 0.3 }); g.restore(); }); } }
  if (a === 'book') { npR(g, -5.5, -9, 11, 13, 1.4, '#8a3a3a', { l: 0.3 }); npR(g, -4.6, -8, 9.2, 11, 1, '#f4ecd6'); bzL(g, [[-3, -4], [3, -4]], '#8a7a6a', 0.7); bzL(g, [[-3, -1.6], [2, -1.6]], '#8a7a6a', 0.7); npR(g, -5.5, -9, 2, 13, 1, '#6a2a2a', { ol: false }); }
  if (a === 'scroll') { npR(g, -8, -6, 16, 6, 3, '#f0e4c0', { l: 0.1 }); npR(g, -9, -7, 3, 8, 1.4, '#a8602a'); npR(g, 6, -7, 3, 8, 1.4, '#a8602a'); bzL(g, [[-4, -4], [4, -4]], '#8a7a6a', 0.7); bzL(g, [[-4, -2], [2, -2]], '#8a7a6a', 0.7); }
  if (a === 'wrench') { g.rotate(0.5); npR(g, -1.8, -22, 3.6, 24, 1.6, '#aab4c0', { l: 0.4 }); npE(g, 0, -24, 5, 5, '#aab4c0', { l: 0.4 }); npR(g, -1.6, -29, 3.2, 5.6, 0.6, 'rgba(0,0,0,0)', { ol: false }); g.fillStyle = '#4a6a3a'; g.fillRect(-1.2, -29.6, 2.4, 4); }
  if (a === 'can') { npP(g, [[-6, -8], [6, -8], [7, 4], [-7, 4]], '#6aa8d8', { l: 0.4 }); bzL(g, [[6, -4], [14, -12]], '#6aa8d8', 2.4); bzL(g, [[-6, -8], [-1, -14], [5, -8]], '#4a78a8', 1.6); bzD(g, 14.4, -12.4, 2, '#4a78a8'); }
  if (a === 'clip') { npR(g, -6, -11, 12, 15, 1.4, '#a8782a'); npR(g, -4.6, -9.6, 9.2, 12, 0.8, '#f8f4ea'); [-6, -3, 0].forEach((y) => bzL(g, [[-3, y], [3, y]], '#8a9ab0', 0.7)); npR(g, -2, -12.4, 4, 2.4, 0.8, '#aab4c0'); }
  if (a === 'tablet') { npR(g, -6, -11, 12, 15, 1.6, '#2a3250'); npR(g, -4.8, -9.8, 9.6, 12.4, 0.8, '#7ae0f0', { l: 0.2 }); bzL(g, [[-3, -2], [-1, -6], [1, -3], [3, -7]], '#ffffff', 0.9); }
  if (a === 'scale') { bzL(g, [[0, -4], [0, 4]], '#c9a24b', 1.6); bzL(g, [[-9, -9], [9, -9]], '#c9a24b', 1.4); bzL(g, [[-9, -9], [-12, -2], [-6, -2], [-9, -9]], '#a88a3a', 0.8); bzL(g, [[9, -9], [6, -3], [12, -3], [9, -9]], '#a88a3a', 0.8); npE(g, -9, -1, 3.8, 1.6, '#e8d070', { l: 0.4 }); npE(g, 9, -2, 3.8, 1.6, '#e8d070', { l: 0.4 }); bzD(g, 0, -10, 1.5, '#e8d070'); }
  if (a === 'basket') { npP(g, [[-8, -5], [8, -5], [6, 5], [-6, 5]], '#b8884a', { l: 0.3 }); bzL(g, [[-7, -5], [0, -14], [7, -5]], '#8a5a2a', 1.4); bzD(g, -3, -6.6, 2.6, '#d8483a'); bzD(g, 2, -7, 2.6, '#f0c040'); bzD(g, 4.6, -5.6, 2.2, '#78c050'); }
  if (a === 'scope') { g.rotate(-0.6); npR(g, -2.6, -16, 5.2, 18, 1.6, '#6a5a3a', { l: 0.3 }); npR(g, -3.4, -19, 6.8, 5, 1.6, '#c9a24b', { l: 0.4 }); npE(g, 0, -19.4, 2.8, 1.1, '#9ae8f4'); }
  if (a === 'dice') { g.rotate(0.2); npR(g, -4, -9, 8, 8, 1.6, '#f8f4ea', { l: 0.1, d: -0.25 }); [[-1.6, -7.4], [1.6, -3.6], [0, -5.4]].forEach(([x, y]) => bzD(g, x, y, 0.8, '#d8404a')); npR(g, 2, -4, 7, 7, 1.4, '#f8f4ea', { l: 0.1, d: -0.25 }); bzD(g, 4, -2, 0.7, '#1a1a2a'); bzD(g, 7, 1, 0.7, '#1a1a2a'); }
  if (a === 'orb') { npE(g, 0, -8, 5.8, 5.8, '#b070f0', { l: 0.6, d: -0.2 }); bzD(g, -1.8, -10, 1.6, '#ffffff'); g.save(); g.strokeStyle = 'rgba(255,230,120,0.8)'; g.lineWidth = 0.9; g.beginPath(); g.ellipse(0, -8, 8.4, 2.4, -0.4, 0, 7); g.stroke(); g.restore(); }
  if (a === 'lens') { bzL(g, [[0, 2], [0, -8]], '#8a5a2a', 2.4); npE(g, 0, -13, 6, 6, 'rgba(0,0,0,0)', { ol: false }); g.fillStyle = 'rgba(160,240,240,0.4)'; g.beginPath(); g.arc(0, -13, 5.4, 0, 7); g.fill(); g.strokeStyle = '#c9a24b'; g.lineWidth = 1.8; g.beginPath(); g.arc(0, -13, 5.6, 0, 7); g.stroke(); g.fillStyle = '#ffffff'; g.fillRect(-3, -16, 2.4, 0.9); }
  if (a === 'oar') { npR(g, -1.4, -36, 2.8, 48, 1.2, '#b8884a', { l: 0.3 }); npP(g, [[-4, -36], [4, -36], [3.6, -22], [-3.6, -22]], '#c8985a', { l: 0.3 }); }
  g.restore();
}
function npBody(g, S, v, f, mid) {
  const A = f === 1, B = f === 3, top = S.top, side = v === 's', bk = v === 'b', robe = S.outfit === 'robe', bw = S.broad ? 1.16 : S.slim ? 0.9 : 1, tw = side ? 0.62 : bw, sw = A ? 1 : B ? -1 : 0;
  const lift = (k) => (k === 0 ? (A ? -2.6 : 0) : (B ? -2.6 : 0));
  const pants = S.pants, shoe = S.shoe, trim = S.trim || shade(top, 0.3), inner = S.inner || shade(top, 0.4);
  const boot = (x, y, w) => npF(g, [[x - w, y - 7], [x + w, y - 7], [x + w + 0.6, y - 1], [x + w + 1.4, y + 0.4], [x - w - 0.6, y + 0.4], [x - w - 0.2, y - 2]], shoe, { l: 0.3 });
  /* back cloak / outfits that sit behind the body */
  if (S.outfit === 'poncho' && !bk) { }
  /* legs */
  if (!robe && S.outfit !== 'poncho') {
    if (side) { [[-1, 0], [1, 1]].forEach(([d, k]) => { const dx = d * sw * 3.2; npR(g, -3.6 + dx, -19 + lift(k) * 0.6, 7.2, 13, 2.2, k ? pants : shade(pants, -0.16)); boot(dx, -4 + lift(k), 4.8); }); }
    else [0, 1].forEach((k) => { const x = k ? 5.4 : -5.4; npR(g, x - 3.8 * bw, -19 + lift(k) * 0.6, 7.6 * bw, 14, 2.2, pants); boot(x, -4 + lift(k), 4.2 * bw); });
  } else {
    npF(g, side ? [[-9, -22], [9, -22], [11, -2], [-11, -2]] : [[-12 * bw, -24], [12 * bw, -24], [16 * bw, -2], [-16 * bw, -2]], top, { l: 0.2 });
    npR(g, -16 * bw, -4.4, 32 * bw, 3, 1, trim, { l: 0.3 }); [-5, 5].forEach((x) => npE(g, x + (A ? 1 : 0) * (x > 0 ? -1 : 1), -0.6, 4.4, 2, shoe, { l: 0.3 }));
    if (S.outfit === 'poncho') { }
  }
  /* torso */
  const tp = side ? [[-8, -39], [0, -41], [9, -39], [8, -27], [8.6, -19], [-8.6, -19], [-8, -27]] : [[-13 * tw, -38], [0, -40.4], [13 * tw, -38], [11.4 * tw, -28], [11 * tw, -18], [-11 * tw, -18], [-11.4 * tw, -28]];
  const hemY = robe ? -3 : -17;
  if (S.outfit === 'coat') { npF(g, side ? [[-9, -39], [9, -39], [9, -10], [-9, -10]] : [[-13 * tw, -38], [13 * tw, -38], [14 * tw, -10], [-14 * tw, -10]], top, { l: 0.2 }); if (!side && !bk) { npP(g, [[-4 * tw, -39], [4 * tw, -39], [2 * tw, -10], [-2 * tw, -10]], inner, { l: 0.2, d: -0.2 }); npP(g, [[-4 * tw, -39], [-9 * tw, -34], [-4 * tw, -28]], trim, { l: 0.3 }); npP(g, [[4 * tw, -39], [9 * tw, -34], [4 * tw, -28]], trim, { l: 0.3 }); npR(g, -11 * tw, -22, 22 * tw, 2, 0.6, shade(top, -0.3), { ol: false }); [-8, 8].forEach((x) => npR(g, x * tw - 2.4, -16, 4.8, 4.4, 0.8, shade(top, -0.12), { l: 0.1 })); } }
  else npF(g, tp, top, { l: 0.2 });
  if (!bk && !side) {
    if (robe) { npP(g, [[-3.6, -39], [0, -34], [3.6, -39], [4.4, -4], [-4.4, -4]], shade(top, 0.14), { l: 0.1, ol: false }); npP(g, [[-7, -39], [0, -29], [7, -39], [3.6, -39], [0, -34], [-3.6, -39]], trim, { l: 0.3, d: -0.2 }); npR(g, -11.6 * tw, -24, 23.2 * tw, 4.4, 1.2, S.belt || shade(top, -0.3), { l: 0.3 }); npE(g, 0, -22, 2.6, 2.6, '#f0d070', { l: 0.5 }); }
    else if (S.outfit === 'apron') { npP(g, [[-7, -34], [7, -34], [9, -12], [-9, -12]], S.apron, { l: 0.25 }); npR(g, -11 * tw, -23, 22 * tw, 2.2, 0.6, shade(S.apron, -0.3), { ol: false }); npR(g, -5.4, -21, 4.4, 4.4, 0.8, shade(S.apron, -0.14), { l: 0.1 }); npR(g, 1, -21, 4.4, 4.4, 0.8, shade(S.apron, -0.14), { l: 0.1 }); bzL(g, [[-7, -34], [-9, -38]], shade(S.apron, -0.3), 1.2); bzL(g, [[7, -34], [9, -38]], shade(S.apron, -0.3), 1.2); }
    else if (S.outfit === 'overall') { npP(g, [[-9, -28], [9, -28], [11, -16], [-11, -16]], pants, { l: 0.2 }); npR(g, -9, -39, 3.2, 12, 1, pants); npR(g, 5.8, -39, 3.2, 12, 1, pants); bzD(g, -7.4, -28, 1.5, '#f0d070'); bzD(g, 7.4, -28, 1.5, '#f0d070'); npR(g, -5, -24, 10, 5, 1, shade(pants, -0.12), { l: 0.1 }); }
    else if (S.outfit === 'vest') { npP(g, [[-13 * tw, -38], [-4, -39], [-3, -18], [-12 * tw, -18]], inner, { l: 0.2 }); npP(g, [[13 * tw, -38], [4, -39], [3, -18], [12 * tw, -18]], inner, { l: 0.2 }); npP(g, [[-11.6 * tw, -38], [-4.6, -39], [-4, -24], [-11.8 * tw, -18]], top); npP(g, [[11.6 * tw, -38], [4.6, -39], [4, -24], [11.8 * tw, -18]], top); [-30, -26, -22].forEach((y) => bzD(g, 0, y, 0.9, trim)); }
    else if (S.outfit === 'blazer') { npP(g, [[-4, -39], [4, -39], [3, -22], [-3, -22]], '#f4ecd6'); npP(g, [[-4, -39], [-10 * tw, -33], [-4, -24]], trim, { l: 0.3 }); npP(g, [[4, -39], [10 * tw, -33], [4, -24]], trim, { l: 0.3 }); bzL(g, [[0, -39], [0, -22]], shade(top, -0.4), 0.8); bzD(g, -1.4, -28, 0.9, trim); bzD(g, 1.4, -24, 0.9, trim); npP(g, [[-4, -37], [0, -30], [4, -37]], '#c84a4a'); npR(g, -11 * tw, -22, 22 * tw, 3, 0.6, shade(top, -0.2), { ol: false }); }
    else if (S.outfit === 'stripe') { for (let y = -36; y < -18; y += 5) npR(g, -11 * tw + 0.6, y, 22 * tw - 1.2, 2.2, 0, trim, { ol: false, l: 0, d: 0 }); npR(g, -11 * tw, -22, 22 * tw, 3.4, 0.6, '#3a2a1a'); npR(g, -2, -22, 4, 3.4, 0.8, '#c9a24b', { l: 0.4 }); }
    else if (S.outfit === 'poncho') { npF(g, [[-16, -38], [0, -41], [16, -38], [18, -10], [0, -6], [-18, -10]], top, { l: 0.25 }); npR(g, -18, -12, 36, 3.2, 1, trim, { l: 0.3 }); npP(g, [[-4, -39], [0, -33], [4, -39]], shade(top, -0.4)); [[-9, -22], [8, -26], [-3, -16], [11, -17]].forEach(([x, y]) => npP(g, [[x, y - 2.4], [x + 2.4, y], [x, y + 2.4], [x - 2.4, y]], trim, { ol: false, l: 0 })); }
    else { /* tunic */ npP(g, [[-4, -39], [0, -34], [4, -39]], shade(top, -0.45)); npR(g, -11.6 * tw, -22, 23.2 * tw, 3.6, 1, S.belt || shade(top, -0.34), { l: 0.3 }); npR(g, -2.2, -22.2, 4.4, 4, 1, '#f0d070', { l: 0.5 }); bzL(g, [[0, -34], [0, -23]], shade(top, -0.3), 0.7); }
    if (S.pattern) { for (let i = 0; i < 4; i++) { const x = -8 + i * 5.4; npP(g, [[x, -14 - i % 2 * 4], [x + 2.4, -10 - i % 2 * 4], [x, -6 - i % 2 * 4], [x - 2.4, -10 - i % 2 * 4]], trim, { ol: false, l: 0, d: 0 }); } }
    if (S.tags) { [[-9, -14, 0.2], [7, -10, -0.25], [-2, -7, 0.1], [10, -17, 0.3]].forEach(([x, y, r]) => { g.save(); g.translate(x, y); g.rotate(r); npR(g, -2.4, -2.2, 4.8, 4.4, 0.4, '#f8f0d0', { l: 0.1, d: -0.2 }); g.restore(); }); }
    if (S.pin === 'gear') { npE(g, -7, -31, 2.6, 2.6, '#e0b84a', { l: 0.4 }); npE(g, -7, -31, 1, 1, '#2f7f78', { ol: false }); }
    if (S.scarf) { npF(g, [[-12 * tw, -40], [0, -37], [12 * tw, -40], [12 * tw, -35], [0, -32], [-12 * tw, -35]], S.scarf, { l: 0.3 }); npP(g, [[5, -35], [11, -34], [12, -16], [6, -17]], S.scarfD || shade(S.scarf, -0.2), { l: 0.2 }); }
    if (S.id === 'qtree') { g.strokeStyle = shade(top, -0.4); g.lineWidth = 0.8; [[-8, -16, -5, -8], [6, -18, 9, -10], [-3, -30, -1, -22]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); }); [[-9, -14], [9, -20]].forEach(([x, y]) => npF(g, [[x, y - 3.4], [x + 2.6, y], [x, y + 3.4], [x - 2.6, y]], '#58b05a', { l: 0.3 })); }
    if (S.hollow) { [[-6, -30], [3, -20], [-4, -14]].forEach(([x, y]) => { g.fillStyle = 'rgba(232,244,255,0.5)'; g.fillRect(x, y, 3.4, 3.4); }); }
  } else if (bk) {
    if (robe) npR(g, -11 * tw, -24, 22 * tw, 4, 1, S.belt || shade(top, -0.3), { l: 0.3 });
    if (S.outfit === 'overall') { npR(g, -9, -39, 3.2, 12, 1, pants); npR(g, 5.8, -39, 3.2, 12, 1, pants); npR(g, -9, -28, 18, 11, 1, pants, { l: 0.2 }); }
    if (S.scarf) npF(g, [[-12, -40], [0, -37], [12, -40], [12, -34], [0, -31], [-12, -34]], S.scarf, { l: 0.3 });
    if (S.outfit === 'poncho') { npF(g, [[-16, -38], [0, -41], [16, -38], [18, -10], [0, -6], [-18, -10]], top, { l: 0.25 }); }
    if (S.pattern) npP(g, [[0, -34], [3, -26], [0, -18], [-3, -26]], trim, { ol: false });
  } else { /* side */
    if (S.outfit === 'apron') npP(g, [[-9, -33], [-3, -33], [-3, -12], [-9, -12]], S.apron, { l: 0.25 });
    if (S.outfit === 'overall') { npR(g, -9, -30, 8, 13, 1, pants, { l: 0.2 }); npR(g, -6, -39, 3, 10, 1, pants); }
    if (robe) npR(g, -9, -24, 18, 4.4, 1.2, S.belt || shade(top, -0.3), { l: 0.3 });
    else if (S.outfit === 'tunic' || S.outfit === 'stripe') npR(g, -9, -22, 18, 3.4, 1, S.belt || shade(top, -0.34), { l: 0.3 });
    if (S.scarf) { npF(g, [[-9, -40], [0, -38], [9, -40], [9, -35], [0, -33], [-9, -35]], S.scarf, { l: 0.3 }); npP(g, [[4, -35], [12 + sw, -33], [13 + sw, -22], [6, -24]], S.scarfD || shade(S.scarf, -0.2), { l: 0.2 }); }
  }
  /* arms */
  const sl = S.outfit === 'poncho' || robe ? top : S.outfit === 'coat' ? top : S.outfit === 'vest' ? S.inner : top, cuff = S.outfit === 'robe' || S.outfit === 'coat' ? trim : shade(sl, -0.2), hand = S.hollow ? '#aab4c8' : S.skin;
  const arm = (sx, swing, front) => {
    if (side) { const x = -2 + swing * 4; npR(g, x - 3.4, -38, 6.8, 15, 3.2, front ? sl : shade(sl, -0.16)); npR(g, x - 3.6, -26, 7.2, 3.2, 1, cuff, { l: 0.3 }); npE(g, x, -21, 3.2, 3.2, hand, { l: 0.2 }); return [x, -21]; }
    const x = sx * (12.6 * tw + 1.6), y1 = bk ? -37 : -37, dx = sx * swing * 0.6; npF(g, [[x - 3.8, y1], [x + 3.8, y1], [x + 3.6 + dx + (robe ? sx * 1.6 : 0), -22], [x - 3.6 + dx, -22]], sl, { l: 0.2 }); npR(g, x - 4 + dx, -26, 8, 3.2, 1, cuff, { l: 0.3 }); npE(g, x + dx, -20.6, 3.2, 3.2, hand, { l: 0.2 }); return [x + dx, -20.6];
  };
  const l = arm(-1, A ? 2 : B ? -2 : 0, false), r = arm(1, B ? 2 : A ? -2 : 0, true);
  if (S.id === 'qtree' || S.hollow) { }
  if (S.acc && S.acc !== 'none') { const hx = side ? r[0] : r[0], hy = r[1]; if (!bk || ['staff', 'leafstaff', 'oar'].includes(S.acc)) npAcc(g, S, v, hx, hy + (S.acc === 'staff' || S.acc === 'leafstaff' || S.acc === 'oar' ? 0 : -1)); }
}
/* neck + head helper for world space */
function npHeadWorld(g, S, v, bob, expr) {
  g.save(); g.translate(0, -53.4 + bob); g.scale(0.88, 0.88);
  if (v !== 's' || true) { npR(g, -4.6, 13, 9.2, 6, 2, shade(S.hollow ? '#aab4c8' : S.skin, -0.12), { ol: false }); }
  if (v === 's') g.translate(2, 0);
  npHead(g, S, v, expr); g.restore();
}
function npWorld(id, dir, f) { return npWarm(() => npWorld0(id, dir, f)); }
function npWorld0(id, dir, f) {
  const S = NPS[id], hi = mkc(104, 140), g = hi.getContext('2d', { willReadFrequently: true }); g.scale(1.8, 1.8); g.translate(NPW / 2, NPH - 3); g.scale(S.h, S.h); g.lineJoin = 'round';
  const v = dir === 'up' ? 'b' : dir === 'down' ? 'f' : 's', bob = f & 1 ? -1 : 0;
  g.save(); g.translate(0, bob); npBody(g, S, v, f); g.restore(); npHeadWorld(g, S, v, bob, 'neutral');
  let c = npPix(hi, 29, 39, S); if (dir === 'right') c = flipH(c); return c;
}
/* ---------- dialogue bust ---------- */
function npBust(id, expr) { NPB = true; try { return npWarm(() => npBust0(id, expr)); } finally { NPB = false; } }
function npBust0(id, expr) {
  const S = NPS[id], hi = mkc(160, 160), g = hi.getContext('2d', { willReadFrequently: true }); g.scale(1.6, 1.6); g.lineJoin = 'round'; g.fillStyle = S.bg; g.fillRect(0, 0, 100, 100);
  const tall = ['tophat', 'branch', 'laurel', 'straw', 'scholar', 'capn'].includes(S.hat) || S.style === 'spiky', sc = tall ? 2.05 : 2.45; g.translate(50, tall ? 60 : 57); g.scale(sc, sc);
  /* shoulders */
  const top = S.top, tr = S.trim || shade(top, 0.3), sk = S.hollow ? '#aab4c8' : S.skin;
  npR(g, -5, 14, 10, 8, 2, shade(sk, -0.12), { ol: false });
  const robe = S.outfit === 'robe';
  g.save(); g.translate(0, -5);
  npF(g, [[-30, 40], [-26, 24], [-14, 19], [0, 22], [14, 19], [26, 24], [30, 40]], S.outfit === 'poncho' ? top : top, { l: 0.2 });
  if (S.outfit === 'coat') { npP(g, [[-5, 21], [5, 21], [4, 40], [-4, 40]], S.inner || '#f4ecd6'); npP(g, [[-5, 21], [-14, 27], [-5, 38]], tr, { l: 0.3 }); npP(g, [[5, 21], [14, 27], [5, 38]], tr, { l: 0.3 }); }
  else if (S.outfit === 'blazer') { npP(g, [[-4.6, 21], [4.6, 21], [3, 36], [-3, 36]], '#f4ecd6'); npP(g, [[-4.6, 21], [-14, 27], [-5, 36]], tr, { l: 0.3 }); npP(g, [[4.6, 21], [14, 27], [5, 36]], tr, { l: 0.3 }); npP(g, [[-4, 22], [0, 30], [4, 22]], '#c84a4a'); }
  else if (S.outfit === 'vest') { npP(g, [[-18, 22], [-5, 20], [-4, 40], [-26, 40]], S.inner, { l: 0.2 }); npP(g, [[18, 22], [5, 20], [4, 40], [26, 40]], S.inner, { l: 0.2 }); npP(g, [[-15, 23], [-5, 20], [-4, 40], [-22, 40]], top); npP(g, [[15, 23], [5, 20], [4, 40], [22, 40]], top); [28, 33].forEach((y) => bzD(g, 0, y, 0.9, tr)); }
  else if (S.outfit === 'overall') { npP(g, [[-17, 40], [-14, 26], [-9, 24], [-8, 40]], S.pants); npP(g, [[17, 40], [14, 26], [9, 24], [8, 40]], S.pants); bzD(g, -11, 29, 1.8, '#f0d070'); bzD(g, 11, 29, 1.8, '#f0d070'); }
  else if (S.outfit === 'apron') { npP(g, [[-9, 28], [9, 28], [11, 40], [-11, 40]], S.apron); bzL(g, [[-9, 28], [-12, 21]], shade(S.apron, -0.3), 1.6); bzL(g, [[9, 28], [12, 21]], shade(S.apron, -0.3), 1.6); }
  else if (S.outfit === 'stripe') { for (let y = 24; y < 40; y += 5) npR(g, -26 + Math.abs(y - 24) * 0.2, y, 52 - Math.abs(y - 24) * 0.4, 2.2, 0, tr, { ol: false, l: 0, d: 0 }); }
  else if (S.outfit === 'poncho') { npP(g, [[-6, 20], [0, 28], [6, 20]], shade(top, -0.4)); [[-14, 32], [12, 30], [0, 36]].forEach(([x, y]) => npP(g, [[x, y - 2.6], [x + 2.6, y], [x, y + 2.6], [x - 2.6, y]], tr, { ol: false, l: 0 })); }
  else { npP(g, [[-6, 20], [0, 29], [6, 20], [3.6, 20], [0, 25], [-3.6, 20]], robe ? tr : shade(top, -0.4), { l: 0.3 }); }
  if (robe) npP(g, [[-7, 20], [0, 30], [7, 20], [4, 20], [0, 26], [-4, 20]], tr, { l: 0.3, d: -0.2 });
  if (S.pattern) for (let i = 0; i < 3; i++) { const x = -12 + i * 12; npP(g, [[x, 33], [x + 3, 36.6], [x, 40], [x - 3, 36.6]], tr, { ol: false, l: 0, d: 0 }); }
  if (S.tags) [[-14, 34, 0.2], [12, 32, -0.25], [-3, 37, 0.1]].forEach(([x, y, r]) => { g.save(); g.translate(x, y); g.rotate(r); npR(g, -3, -2.6, 6, 5.2, 0.4, '#f8f0d0', { l: 0.1, d: -0.2 }); g.restore(); });
  if (S.pin === 'gear') { npE(g, -15, 28, 3, 3, '#e0b84a', { l: 0.4 }); npE(g, -15, 28, 1.1, 1.1, '#2f7f78', { ol: false }); }
  if (S.scarf) { npF(g, [[-20, 22], [0, 27], [20, 22], [22, 30], [0, 34], [-22, 30]], S.scarf, { l: 0.3 }); npP(g, [[8, 30], [20, 30], [22, 40], [10, 40]], S.scarfD || shade(S.scarf, -0.2), { l: 0.2 }); }
  if (S.hollow) [[-18, 30], [14, 34], [-6, 37]].forEach(([x, y]) => { g.fillStyle = 'rgba(232,244,255,0.5)'; g.fillRect(x, y, 3.6, 3.6); });
  if (S.id === 'qtree') [[-14, 30], [12, 34]].forEach(([x, y]) => npF(g, [[x, y - 3.4], [x + 2.6, y], [x, y + 3.4], [x - 2.6, y]], '#58b05a', { l: 0.3 }));
  g.restore();
  npHead(g, S, 'f', expr);
  g.setTransform(1, 0, 0, 1, 0, 0); g.save(); g.scale(1.6, 1.6); bzMark(g, expr); g.restore();
  return npPix(hi, 160, 160, S);
}
const NPCA = { cache: {} };
(function () {
  const _get = Sprites.get.bind(Sprites), _meta = Sprites.meta.bind(Sprites), _pg = Portraits.get.bind(Portraits);
  Sprites.get = function (id, dir, f) { if (!NPS[id]) return _get(id, dir, f); const k = 'np' + id + dir + (f & 3); return NPCA.cache[k] || (NPCA.cache[k] = npWorld(id, dir === 'left' || dir === 'right' || dir === 'up' || dir === 'down' ? dir : 'down', f & 3)); };
  Sprites.meta = function (id) { return NPS[id] ? { w: 31, h: 41, ax: 15.5, ay: 39 } : _meta(id); };
  Portraits.get = function (id, expr) { if (!NPS[id]) return _pg(id, expr); expr = EXPR.includes(expr) ? expr : 'neutral'; const k = 'npb' + id + expr; return NPCA.cache[k] || (NPCA.cache[k] = npBust(id, expr)); };
})();
