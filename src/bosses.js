'use strict';
/* ===== bosses.js: six original boss designs. Painted as vector art at high resolution, then pixelised (limited palette + selective outline) ===== */
const BZK = 6, BZW = 100, BZH = 130, BZFEET = 124;
const BOSS_ARENA_H = { misprint: 100, cheater: 96, fanatic: 104, bulk: 100, rote: 96, lag: 104 };
const BOSS_WORLD_H = { misprint: 54, cheater: 48, fanatic: 56, bulk: 56, rote: 48, lag: 56 };
const BOSS_FLOAT = { misprint: 2.5, lag: 2 };
const BZE = {
  neutral: { o: 1, t: 0, c: 0.15, m: 0 }, happy: { o: 0.3, t: -0.25, c: 1, m: 0.7, arc: 1 }, surprised: { o: 1.35, t: -0.6, c: 0, m: 1 },
  thinking: { o: 0.85, t: 0.35, c: -0.15, m: 0, look: 1, asym: 1 }, sad: { o: 0.7, t: -0.8, c: -0.9, m: 0, tear: 1 }, angry: { o: 0.8, t: 1, c: -0.6, m: 0.6 },
  confident: { o: 0.55, t: 0.25, c: 0.8, m: 0 }, determined: { o: 0.75, t: 0.75, c: -0.05, m: 0 },
};
const bzBB = (p) => [Math.min(...p.map((a) => a[0])), Math.min(...p.map((a) => a[1])), Math.max(...p.map((a) => a[0])), Math.max(...p.map((a) => a[1]))];
const bzO = (cx, cy, rx, ry, rot) => ({ p: (g) => g.ellipse(cx, cy, rx, ry, rot || 0, 0, 7), b: [cx - rx, cy - ry, cx + rx, cy + ry] });
const bzR = (x, y, w, h, r) => ({ p: (g) => g.roundRect(x, y, w, h, r), b: [x, y, x + w, y + h] });
const bzG = (pts) => ({ p: (g) => { g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); }, b: bzBB(pts) });
const bzB = (pts) => ({ p: (g) => { const n = pts.length; g.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2); for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; g.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } g.closePath(); }, b: bzBB(pts) });
function bzF(g, s, base, o) {
  o = o || {}; g.save(); g.beginPath(); s.p(g); g.clip(); const [x0, y0, x1, y1] = s.b;
  const gr = g.createLinearGradient(x0, y0, x0 + (x1 - x0) * 0.7, y1); gr.addColorStop(0, shade(base, o.l == null ? 0.24 : o.l)); gr.addColorStop(0.5, base); gr.addColorStop(1, shade(base, o.d == null ? -0.4 : o.d));
  g.fillStyle = gr; g.fillRect(x0 - 3, y0 - 3, x1 - x0 + 6, y1 - y0 + 6); g.lineJoin = 'round';
  g.save(); g.translate(1.6, 1.6); g.beginPath(); s.p(g); g.strokeStyle = shade(base, 0.55); g.globalAlpha = 0.6; g.lineWidth = 1.8; g.stroke(); g.restore();
  g.save(); g.translate(-2.2, -2.2); g.beginPath(); s.p(g); g.strokeStyle = shade(base, -0.6); g.globalAlpha = 0.5; g.lineWidth = 3.4; g.stroke(); g.restore(); g.restore();
  if (o.ol !== false) { g.save(); g.beginPath(); s.p(g); g.strokeStyle = o.olc || shade(base, -0.66); g.lineWidth = o.lw || 1.5; g.lineJoin = 'round'; g.stroke(); g.restore(); }
}
const bzL = (g, pts, col, w, cap) => { g.save(); g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.strokeStyle = col; g.lineWidth = w; g.lineCap = cap || 'round'; g.lineJoin = 'round'; g.stroke(); g.restore(); };
const bzQ = (g, a, c, b, col, w) => { g.save(); g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(c[0], c[1], b[0], b[1]); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.stroke(); g.restore(); };
const bzD = (g, x, y, r, col) => { g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); };
/* generic eyes (both sides), brows and mouth for any face; e = BZE entry */
function bzEyes(g, cx, cy, sp, r, e, c) {
  c = c || {}; const ink = c.ink || '#1a1020', white = c.white || '#fff8ee', iris = c.iris || '#6a3a2a';
  [-1, 1].forEach((s) => {
    const x = cx + s * sp; let rr = r;
    if (e.arc) { bzQ(g, [x - rr, cy + rr * 0.3], [x, cy - rr * 1.5], [x + rr, cy + rr * 0.3], ink, rr * 0.55); }
    else {
      const ry = Math.max(rr * 0.35, rr * 1.15 * Math.min(e.o, 1.25)), rx = rr * (e.o > 1.2 ? 1.12 : 1);
      g.fillStyle = ink; g.beginPath(); g.ellipse(x, cy, rx + 0.7, ry + 0.7, 0, 0, 7); g.fill();
      g.fillStyle = white; g.beginPath(); g.ellipse(x, cy, rx, ry, 0, 0, 7); g.fill();
      const px = x + (e.look ? rr * 0.45 : 0), pr = e.o > 1.2 ? rr * 0.42 : rr * 0.66; g.save(); g.beginPath(); g.ellipse(x, cy, rx, ry, 0, 0, 7); g.clip();
      g.fillStyle = iris; g.beginPath(); g.ellipse(px, cy + (e.o < 0.9 ? ry * 0.15 : 0), pr, pr * 1.3, 0, 0, 7); g.fill(); g.fillStyle = ink; g.beginPath(); g.ellipse(px, cy + (e.o < 0.9 ? ry * 0.15 : 0), pr * 0.55, pr * 0.8, 0, 0, 7); g.fill();
      g.fillStyle = '#fff'; g.fillRect(px - pr * 0.6, cy - ry * 0.45, pr * 0.55, pr * 0.55);
      if (e.o < 0.9) { g.fillStyle = c.lid || '#b87a5a'; g.fillRect(x - rx - 1, cy - ry - 1, rx * 2 + 2, ry * 0.55 + 1); }
      g.restore();
      if (e.tear && s > 0) { g.fillStyle = '#8fd0ff'; g.beginPath(); g.ellipse(x + rr * 0.6, cy + ry + rr * 0.9, rr * 0.35, rr * 0.55, 0, 0, 7); g.fill(); }
    }
    let by = cy - rr * 1.95 - (e.asym && s > 0 ? rr * 0.9 : 0);
    bzL(g, [[x - s * rr * 1.3, by + e.t * rr * 0.95 * (e.asym ? 0.3 : 1)], [x + s * rr * 1.3, by - e.t * rr * 0.55]], c.brow || '#2a1810', rr * 0.5);
  });
}
function bzMouth(g, cx, cy, w, e, c) {
  c = c || {}; const ink = c.ink || '#5a1820';
  if (e.m > 0.45) { g.fillStyle = ink; g.beginPath(); if (e.m >= 1) g.ellipse(cx, cy + w * 0.2, w * 0.45, w * 0.6, 0, 0, 7); else { g.moveTo(cx - w, cy); g.quadraticCurveTo(cx, cy + w * (0.6 + e.c * 0.7), cx + w, cy); g.quadraticCurveTo(cx, cy - w * 0.15, cx - w, cy); } g.fill(); if (e.m < 1 && e.m > 0.5) { g.fillStyle = '#fff'; g.fillRect(cx - w * 0.6, cy - w * 0.02, w * 1.2, w * 0.2); } }
  else bzQ(g, [cx - w, cy - e.c * w * 0.1], [cx, cy + e.c * w * 0.8], [cx + w, cy - e.c * w * 0.1], c.line || '#7a2a2a', Math.max(1.2, w * 0.18));
}
function bzMark(g, expr) {
  g.save(); g.lineCap = 'round';
  if (expr === 'surprised') { g.fillStyle = '#ffd24a'; g.strokeStyle = '#6a3a00'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(84, 6); g.lineTo(92, 6); g.lineTo(90, 26); g.lineTo(86, 26); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(88, 33, 3, 0, 7); g.fill(); g.stroke(); }
  else if (expr === 'thinking') { g.fillStyle = '#ffd24a'; g.font = 'bold 34px sans-serif'; g.strokeStyle = '#6a3a00'; g.lineWidth = 3; g.strokeText('?', 80, 34); g.fillText('?', 80, 34); }
  else if (expr === 'sad') { g.fillStyle = '#8fd0ff'; g.strokeStyle = '#2a5a9a'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(84, 8); g.quadraticCurveTo(92, 22, 84, 26); g.quadraticCurveTo(76, 22, 84, 8); g.fill(); g.stroke(); }
  else if (expr === 'angry') { g.strokeStyle = '#ff3030'; g.lineWidth = 3; [[0, 0], [10, 0], [0, 10], [10, 10]].forEach(([a, b]) => { }); g.beginPath(); g.moveTo(80, 10); g.quadraticCurveTo(84, 14, 80, 18); g.moveTo(92, 10); g.quadraticCurveTo(88, 14, 92, 18); g.moveTo(80, 22); g.quadraticCurveTo(84, 26, 80, 30); g.moveTo(92, 22); g.quadraticCurveTo(88, 26, 92, 30); g.stroke(); }
  else if (expr === 'confident' || expr === 'determined' || expr === 'happy') { g.fillStyle = expr === 'determined' ? '#ff9a3a' : '#ffe27a'; const st = (x, y, r) => { g.beginPath(); g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r); g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill(); }; st(86, 14, 9); st(94, 30, 5); }
  g.restore();
}
/* pixelise a high-res canvas: hard alpha, posterised palette, selective outline */
function bzPix(hi, W, H, lv) {
  const c = mkc(W, H), g = c.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(hi, 0, 0, W, H);
  const im = g.getImageData(0, 0, W, H), d = im.data, L = (lv || 8) - 1;
  for (let i = 0; i < d.length; i += 4) { if (d[i + 3] < 120) { d[i + 3] = 0; continue; } d[i + 3] = 255; for (let k = 0; k < 3; k++) { let v = d[i + k]; v = (v - 128) * 1.12 + 128; d[i + k] = Math.max(0, Math.min(255, Math.round(v / 255 * L) / L * 255)); } }
  const o = mkc(W + 2, H + 2), og = o.getContext('2d'), out = og.createImageData(W + 2, H + 2), od = out.data, W2 = W + 2;
  const A = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : d[(y * W + x) * 4 + 3];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4, j = ((y + 1) * W2 + x + 1) * 4; if (d[i + 3]) { od[j] = d[i]; od[j + 1] = d[i + 1]; od[j + 2] = d[i + 2]; od[j + 3] = 255; } }
  for (let y = -1; y <= H; y++) for (let x = -1; x <= W; x++) { if (A(x, y)) continue; let best = null; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => { if (A(x + a, y + b)) { const i = ((y + b) * W + x + a) * 4, l = d[i] + d[i + 1] + d[i + 2]; if (!best || l < best[3]) best = [d[i], d[i + 1], d[i + 2], l]; } }); if (best) { const j = ((y + 1) * W2 + x + 1) * 4; od[j] = best[0] * 0.28 + 12; od[j + 1] = best[1] * 0.28 + 8; od[j + 2] = best[2] * 0.3 + 20; od[j + 3] = 255; } }
  og.putImageData(out, 0, 0); return o;
}
/* ---------- 1. Misprint, the Mislabeler: a wraith of spilled ink with a rubber stamp and a wrongly-stuck paper label for a face ---------- */
function bzMisprint(g, o) {
  const d = o.dir, e = BZE[o.expr || 'neutral'], p = o.ph * 6.283, bob = Math.sin(p) * 1.8, back = d === 'up', fx = 50 + (o.tx || 0);
  const INK = '#2b2a70', INK2 = '#4a48a8', PAP = '#f6eed2', RED = '#d8404a', BLU = '#3a5ad0', WOOD = '#a87238';
  g.save(); g.translate(0, bob);
  const stamp = (sx) => { bzF(g, bzR(sx - 3.5, 56, 7, 26, 3), WOOD); bzF(g, bzO(sx, 55, 6, 5), WOOD); bzF(g, bzR(sx - 11, 80, 22, 9, 2), '#2a2a44'); bzF(g, bzR(sx - 10, 88, 20, 5, 1.5), RED, { l: 0.3 }); g.fillStyle = RED; [[sx - 6, 93, 2.4, 6], [sx + 3, 93, 2.2, 4]].forEach(([x, y, w, h]) => { g.beginPath(); g.ellipse(x, y + h / 2, w, h / 2, 0, 0, 7); g.fill(); }); };
  const cloak = d === 'side' ? [[52, 18], [68, 26], [72, 54], [78, 90], [68, 104], [74, 122], [60, 110], [54, 127], [46, 112], [36, 124], [40, 100], [28, 86], [30, 52], [36, 26]] : [[50, 18], [70, 26], [78, 52], [86, 88], [76, 102], [84, 122], [70, 110], [63, 127], [53, 112], [44, 128], [36, 110], [22, 124], [26, 102], [14, 88], [22, 52], [30, 26]];
  if (d !== 'side') bzF(g, bzB(back ? [[50, 40], [60, 56], [62, 84], [56, 90], [44, 90], [38, 84], [40, 56]] : [[50, 40], [60, 56], [62, 84], [56, 90], [44, 90], [38, 84], [40, 56]]), INK, { ol: false, l: 0, d: -0.2 });
  bzF(g, bzB(cloak), INK, { l: 0.3 });
  bzF(g, bzB([[28, 52], [50, 44], [72, 52], [70, 68], [50, 62], [30, 68]]), INK2, { l: 0.3 });
  for (let i = 0; i < 5; i++) bzQ(g, [26 + i * 11, 70 + (i % 2) * 6], [28 + i * 11, 88], [24 + i * 11 + (i % 2 ? 4 : -4), 104 + (i % 3) * 4], 'rgba(150,160,255,.45)', 1.8);
  if (!back) { g.save(); g.translate(50, 79); g.rotate(-0.12); g.strokeStyle = RED; g.lineWidth = 2.4; g.beginPath(); g.ellipse(0, 0, 10, 10, 0, 0, 7); g.stroke(); g.lineWidth = 1.6; g.beginPath(); g.ellipse(0, 0, 6.6, 6.6, 0, 0, 7); g.stroke(); bzL(g, [[-8, 3], [8, -3]], RED, 2); g.restore(); }
  /* hanging wrong labels */
  [[30, 96, 0.2], [46, 104, -0.15], [64, 98, 0.12]].forEach(([x, y, r], i) => { g.save(); g.translate(x, y); g.rotate(r + Math.sin(p + i) * 0.1); bzL(g, [[0, -8], [0, 0]], '#c8b890', 1); bzF(g, bzR(-5, 0, 10, 13, 1.5), PAP, { l: 0.1, d: -0.2, lw: 1.1 }); bzL(g, [[-2.5, 4], [2.5, 8]], i % 2 ? BLU : RED, 1.7); bzL(g, [[2.5, 4], [-2.5, 8]], i % 2 ? BLU : RED, 1.7); g.restore(); });
  /* arms */
  if (d !== 'side') { bzF(g, bzB([[24, 56], [14, 72], [12, 96], [20, 100], [26, 78]]), INK); bzD(g, 17, 100, 5, '#1a1850'); }
  bzF(g, bzB(d === 'side' ? [[66, 56], [78, 66], [76, 84], [70, 84], [66, 68]] : [[76, 56], [88, 66], [86, 84], [80, 86], [74, 68]]), INK); stamp(d === 'side' ? 73 : 82);
  /* hood */
  bzF(g, bzO(50, 34, 24, 25), INK2, { l: 0.34 });
  bzF(g, bzB([[26, 20], [38, 4], [50, 0], [62, 6], [74, 22], [60, 12], [50, 12], [40, 14]]), INK, { ol: false }); bzF(g, bzG([[46, 6], [50, -8], [58, 8]]), INK2, { l: 0.3 });
  if (!back) {
    bzF(g, bzO(fx, 36, 17, 18), '#0a0820', { l: 0, d: 0, lw: 1 });
    g.save(); g.translate(fx, 35); g.rotate(-0.07); bzF(g, bzR(-16, -13, 32, 27, 6), PAP, { l: 0.12, d: -0.2 }); g.fillStyle = 'rgba(120,90,60,.35)'; g.beginPath(); g.moveTo(8, 14); g.lineTo(16, 14); g.lineTo(16, 6); g.closePath(); g.fill();
    g.restore();
    [-1, 1].forEach((s) => { const x = fx + s * 7, y = 31, r = 3.6; if (e.arc) bzQ(g, [x - r, y + 1.5], [x, y - 5], [x + r, y + 1.5], s < 0 ? RED : BLU, 2.4); else if (s < 0) { const k = r * (e.o > 1.2 ? 1.2 : e.o < 0.9 ? 0.8 : 1); bzL(g, [[x - k, y - k], [x + k, y + k]], RED, 2.5); bzL(g, [[x + k, y - k], [x - k, y + k]], RED, 2.5); } else { g.strokeStyle = BLU; g.lineWidth = 2.4; g.beginPath(); g.ellipse(x, y, r * (e.o > 1.2 ? 1.25 : 1), r * Math.max(0.55, e.o > 1.2 ? 1.4 : e.o), 0, 0, 7); g.stroke(); bzD(g, x + (e.look ? 1.6 : 0), y, 1.2, '#1a1a50'); } bzL(g, [[x - s * 4.6, y - 7 + e.t * 3.4], [x + s * 4.6, y - 7 - e.t * 2]], '#2a2866', 1.6); });
    bzMouth(g, fx, 44, 6, e, { ink: '#2a2866', line: '#2a2866' }); if (e.tear) bzD(g, fx + 11, 38, 1.4, '#6aa8ff');
  } else { g.save(); g.translate(50, 70); g.rotate(0.06); bzL(g, [[-4, -14], [-6, -4]], '#c8b890', 1); bzL(g, [[4, -14], [6, -4]], '#c8b890', 1); bzF(g, bzR(-11, -4, 22, 26, 2), PAP, { l: 0.1, d: -0.2 }); bzL(g, [[-6, 4], [6, 16]], RED, 2.6); bzL(g, [[6, 4], [-6, 16]], RED, 2.6); g.restore(); }
  g.restore();
}
/* ---------- 2. Cheater, the Data Leaker: a trench-coat thief whose satchel leaks stolen answer sheets ---------- */
function bzCheater(g, o) {
  const d = o.dir, e0 = BZE[o.expr || 'neutral'], p = o.ph * 6.283, bob = Math.sin(p) * 1.2, back = d === 'up', fx = 50 + (o.tx || 0);
  const e = Object.assign({}, e0, { c: e0.c < 0.3 && !e0.tear && o.expr !== 'angry' ? 0.7 : e0.c });
  const COAT = '#3f7076', COAT2 = '#2b5258', PAP = '#f6eed2', RED = '#d8404a', SK = '#ecc296', CAP = '#4a3260';
  g.save(); g.translate(0, bob);
  const sheet = (x, y, rot, sc) => { g.save(); g.translate(x, y); g.rotate(rot); bzF(g, bzR(-6 * sc, -8 * sc, 12 * sc, 16 * sc, 1.5), PAP, { l: 0.1, d: -0.22, lw: 1.2 }); [-4, -1].forEach((k) => bzL(g, [[-3.5 * sc, k * sc], [3.5 * sc, k * sc]], '#8a9ab0', 1)); bzL(g, [[-3.5 * sc, 2.5 * sc], [0.5 * sc, 2.5 * sc]], RED, 1.5); g.restore(); };
  bzF(g, bzR(38, 98, 11, 22, 3), '#2e2a40'); bzF(g, bzR(52, 98, 11, 22, 3), '#2e2a40'); bzF(g, bzR(35, 117, 15, 8, 3), '#7a4a30'); bzF(g, bzR(52, 117, 15, 8, 3), '#7a4a30');
  /* leaking papers */
  [[16, 104 + Math.sin(p) * 2, -0.5, 0.8], [8, 116, 0.6, 0.8], [88, 108 + Math.cos(p) * 2, 0.4, 0.7]].forEach((a) => sheet(...a));
  bzF(g, bzB([[26, 42], [50, 38], [76, 44], [82, 76], [86, 108], [50, 112], [14, 108], [18, 76]]), COAT, { l: 0.28 });
  bzF(g, bzG([[44, 44], [56, 44], [60, 110], [40, 110]]), COAT2, { ol: false, l: 0, d: -0.1 });
  g.save(); g.beginPath(); bzB([[26, 42], [50, 38], [76, 44], [82, 76], [86, 108], [50, 112], [14, 108], [18, 76]]).p(g); g.clip(); bzL(g, [[18, 78], [82, 78]], '#1c1828', 6); g.restore(); bzF(g, bzR(46, 74, 8, 8, 1.5), '#e6c04a', { l: 0.4 });
  if (!back) { sheet(28, 90, -0.2, 0.9); sheet(70, 92, 0.25, 0.9); bzF(g, bzR(30, 88, 14, 7, 1.5), COAT2, { l: 0.1 }); bzF(g, bzR(58, 90, 14, 7, 1.5), COAT2, { l: 0.1 }); }
  else { bzF(g, bzO(52, 90, 8, 11), '#1a1424', { l: 0, d: 0, lw: 1 }); sheet(48, 88, -0.3, 0.9); sheet(58, 96, 0.3, 0.8); }
  bzF(g, bzG([[32, 42], [44, 46], [38, 62], [24, 54]]), shade(COAT, 0.12)); bzF(g, bzG([[68, 42], [56, 46], [62, 62], [76, 54]]), shade(COAT, 0.12));
  /* satchel */
  if (d !== 'side' || true) { bzF(g, bzR(6, 76, 20, 22, 4), '#8a5a34'); bzL(g, [[8, 82], [24, 82]], '#5a3820', 1.4); bzD(g, 16, 88, 2, '#e6c04a'); bzG && sheet(15, 74, -0.2, 0.9); }
  bzF(g, bzB([[24, 52], [14, 70], [14, 92], [24, 94], [30, 70]]), COAT); bzF(g, bzB([[76, 52], [86, 66], [78, 74], [72, 62]]), COAT);
  if (!back) { sheet(70, 62, 0.15, 1.15); bzD(g, 66, 70, 5, SK); bzD(g, 78, 68, 4.4, SK); }
  /* head */
  bzF(g, bzO(50, 30, 17, 18), SK, { l: 0.12 }); bzF(g, bzO(33, 32, 3.2, 4.6), SK); bzF(g, bzO(67, 32, 3.2, 4.6), SK);
  if (back) { bzF(g, bzO(50, 30, 17, 18), '#e6c04a', { l: 0.2 }); } else { [[34, 22, 26, 34, 36, 34], [66, 22, 74, 34, 64, 34], [30, 30, 24, 40, 36, 38]].forEach((q) => bzF(g, bzG([[q[0], q[1]], [q[2], q[3]], [q[4], q[5]]]), '#e6c04a', { l: 0.3, lw: 1.2 })); }
  if (!back) { bzF(g, bzR(32, 28, 36, 10, 5), '#1c1424', { l: 0.2, d: -0.1 }); bzEyes(g, fx, 33, 8.5 * (d === 'side' ? 0.8 : 1), 3.1, e, { iris: '#d89018', lid: '#1c1424', brow: '#1c1424' }); bzMouth(g, fx + (o.tx || 0) * 0.2, 45, 5.5, e); if (e.m < 0.4 && e.c > 0.5) bzL(g, [[fx + 5, 44], [fx + 7.5, 42]], '#7a2a2a', 1.2); }
  bzF(g, bzB([[30, 22], [38, 8], [52, 5], [66, 10], [72, 22], [64, 24], [36, 24]]), CAP, { l: 0.3 }); bzF(g, bzR(28, 20, 52, 6, 3), shade(CAP, -0.15)); bzD(g, 40, 14, 1.6, '#e6c04a');
  g.restore();
}
/* ---------- 3. Fanatic, the Biased Learner: a zealot whose helmet has blinkers, so he only ever sees one thing ---------- */
function bzFanatic(g, o) {
  const d = o.dir, e = BZE[o.expr || 'neutral'], p = o.ph * 6.283, bob = Math.sin(p) * 1.1, back = d === 'up', fx = 50 + (o.tx || 0);
  const CR = '#b02a3c', IV = '#efe4cc', ST = '#8d93ab', GO = '#e6c04a', BR = '#5a3a2a';
  g.save(); g.translate(0, bob);
  /* banner + staff */
  bzF(g, bzR(80, 14, 3.2, 110, 1.4), '#7a5230'); bzF(g, bzG([[83, 18], [99, 22], [93, 33], [99, 44], [83, 44]]), CR, { l: 0.3 }); bzF(g, bzO(81.6, 12, 4.6, 4.6), GO, { l: 0.4 });
  const glyph = (x, y, r, c) => { g.save(); g.fillStyle = c || GO; g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r * 0.5, y); g.lineTo(x, y + r); g.lineTo(x - r * 0.5, y); g.closePath(); g.fill(); g.restore(); };
  glyph(91, 33, 5);
  bzF(g, bzG([[36, 46], [64, 46], [82, 122], [18, 122]]), IV, { l: 0.2 });
  bzF(g, bzG([[41, 46], [59, 46], [63, 122], [37, 122]]), CR, { l: 0.25, lw: 1.2 });
  if (!back) { glyph(50, 62, 6); glyph(50, 82, 5); glyph(50, 100, 4.4); bzL(g, [[38, 108], [62, 108]], GO, 1.6); bzL(g, [[37, 114], [63, 114]], GO, 1.6); } else { glyph(50, 80, 9); }
  bzF(g, bzR(32, 70, 36, 5, 2), BR); bzF(g, bzR(46, 69, 8, 7, 1.5), GO, { l: 0.4 });
  bzF(g, bzO(28, 50, 11, 8), ST, { l: 0.34 }); bzF(g, bzO(72, 50, 11, 8), ST, { l: 0.34 }); bzF(g, bzG([[20, 50], [28, 54], [36, 50], [32, 44]]), CR, { ol: false });
  bzF(g, bzB([[22, 52], [14, 66], [18, 82], [26, 80], [28, 62]]), IV); bzF(g, bzB([[78, 52], [86, 64], [84, 74], [76, 70]]), IV);
  bzF(g, bzR(10, 78, 16, 12, 5), ST, { l: 0.4 }); bzF(g, bzR(74, 66, 14, 12, 5), ST, { l: 0.4 });
  /* helmet */
  bzF(g, bzO(50, 28, 19, 21), ST, { l: 0.4 }); bzF(g, bzR(46, 4, 8, 22, 3), CR, { l: 0.3 }); bzF(g, bzG([[47, 10], [53, 10], [58, 2], [42, 2]]), CR, { ol: false });
  if (!back) {
    bzF(g, bzR(27, 22, 11, 20, 4), BR, { l: 0.3 }); bzF(g, bzR(62, 22, 11, 20, 4), BR, { l: 0.3 }); bzD(g, 32, 32, 1.3, GO); bzD(g, 68, 32, 1.3, GO);
    bzF(g, bzR(38, 26, 24, 11, 3), '#120a1c', { l: 0, d: 0 });
    const op = Math.max(0.25, Math.min(1.3, e.o)), ew = d === 'side' ? 6 : 10 + (e.o > 1.2 ? 3 : 0);
    g.save(); g.fillStyle = e.arc ? '#ffd24a' : '#ffb830'; g.shadowColor = '#ff9020'; g.shadowBlur = 5; g.beginPath(); if (e.arc) { g.ellipse(fx, 32, ew * 0.9, 2.2, 0, Math.PI, 0); g.closePath(); } else g.ellipse(fx, 31.6, ew, 1.6 + op * 2.4, 0, 0, 7); g.fill(); g.restore();
    bzL(g, [[fx - 11, 24.5 + e.t * 2.6 * 0.5], [fx + 11, 24.5 - e.t * 2.6 * 0.5]], '#120a1c', 2); bzL(g, [[fx - 11, 24 - e.t * 2], [fx - 3, 25 + e.t * 2.4]], ST, 0); 
    bzF(g, bzR(39, 38, 22, 8, 3), shade(ST, -0.1), { l: 0.2 }); [43, 47, 51, 55].forEach((x) => bzL(g, [[x, 39.5], [x, 44.5]], '#2a2a3c', 1.1));
    if (e.m > 0.45) { g.fillStyle = '#120a1c'; g.fillRect(43, 40, 14, 4); }
  } else { bzF(g, bzR(44, 30, 12, 14, 3), shade(ST, -0.1)); bzF(g, bzR(27, 22, 11, 20, 4), BR); bzF(g, bzR(62, 22, 11, 20, 4), BR); }
  g.restore();
}
/* ---------- 4. Bulk, the Loudest Number: a hulking golem built from numerals, with a megaphone for a mouth ---------- */
function bzBulk(g, o) {
  const d = o.dir, e = BZE[o.expr || 'neutral'], p = o.ph * 6.283, bob = Math.sin(p) * 1.4, back = d === 'up', fx = 50 + (o.tx || 0);
  const BRS = '#d08c2e', IRN = '#3e3650', RED = '#ff4a38', CY = '#6af0ff';
  g.save(); g.translate(0, bob);
  bzF(g, bzR(24, 92, 21, 30, 5), IRN); bzF(g, bzR(55, 92, 21, 30, 5), IRN); bzF(g, bzR(20, 114, 28, 12, 4), BRS); bzF(g, bzR(52, 114, 28, 12, 4), BRS); bzF(g, bzR(24, 96, 21, 8, 3), BRS, { l: 0.3 }); bzF(g, bzR(55, 96, 21, 8, 3), BRS, { l: 0.3 });
  /* arms: big fists shaped like zeros */
  bzF(g, bzB([[16, 46], [4, 66], [4, 92], [20, 96], [24, 66]]), IRN); bzF(g, bzB([[84, 46], [96, 66], [96, 92], [80, 96], [76, 66]]), IRN);
  [[11, 98], [89, 98]].forEach(([x, y]) => { bzF(g, bzO(x, y, 12, 12), BRS, { l: 0.4 }); bzF(g, bzO(x, y, 5.4, 5.4), '#1c1628', { l: 0, d: 0, lw: 1 }); });
  bzF(g, bzR(14, 38, 72, 58, 11), BRS, { l: 0.32 });
  g.save(); g.beginPath(); bzR(14, 38, 72, 58, 11).p(g); g.clip(); bzL(g, [[14, 84], [86, 84]], shade(BRS, -0.35), 3); bzL(g, [[14, 50], [86, 50]], shade(BRS, -0.3), 2); g.restore();
  [[20, 44], [80, 44], [20, 90], [80, 90]].forEach(([x, y]) => { bzD(g, x, y, 2.3, shade(BRS, 0.45)); });
  if (!back) {
    bzF(g, bzR(28, 54, 44, 30, 4), '#140f20', { l: 0, d: 0, lw: 1.2 });
    g.save(); g.font = 'bold 30px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = RED; g.shadowBlur = 6; g.fillStyle = RED; g.fillText(e.m > 0.9 ? '999' : '99', 50, 70); g.restore();
    g.save(); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(30, 56, 40, 6); g.restore();
  } else { bzF(g, bzR(30, 54, 40, 30, 4), IRN); bzL(g, [[36, 62], [64, 62]], '#1c1628', 2); bzL(g, [[36, 70], [64, 70]], '#1c1628', 2); bzL(g, [[36, 78], [64, 78]], '#1c1628', 2); }
  bzF(g, bzR(34, 14, 32, 28, 7), IRN, { l: 0.4 }); bzF(g, bzR(30, 38, 40, 8, 3), BRS);
  if (!back) {
    const slit = (x, s) => { g.save(); g.fillStyle = e.arc ? '#ffd24a' : RED; g.shadowColor = RED; g.shadowBlur = 4; g.beginPath(); if (e.arc) { g.ellipse(x, 24, 4.2, 2.6, 0, Math.PI, 0); g.closePath(); } else g.rect(x - 4, 21 + (1.2 - Math.min(e.o, 1.3)) * 1.6, 8, 1.8 + Math.min(e.o, 1.3) * 2.4); g.fill(); g.restore(); bzL(g, [[x - 5, 18 + e.t * 1.8 * s], [x + 5, 18 - e.t * 1.8 * s]], '#140f20', 1.8); };
    slit(fx - 8, -1); slit(fx + 8, 1);
    bzF(g, bzO(fx, 36, 11 - (o.tx ? 3 : 0), 8), '#8a5a1c', { l: 0.3 }); bzF(g, bzO(fx, 36, 7.5 - (o.tx ? 2 : 0), 5.4 + (e.m > 0.45 ? 1.5 : 0)), '#1a1018', { l: 0, d: 0, lw: 1 });
    if (e.m > 0.45 || e.c > 0.3) [[17, 0.8], [23, 0.5]].forEach(([r, a]) => { g.save(); g.strokeStyle = CY; g.globalAlpha = a; g.lineWidth = 1.8; g.beginPath(); g.arc(fx, 36, r, -0.9, 0.9); g.stroke(); g.beginPath(); g.arc(fx, 36, r, Math.PI - 0.9, Math.PI + 0.9); g.stroke(); g.restore(); });
  } else bzF(g, bzR(44, 8, 12, 6, 2), BRS);
  g.restore();
}
/* ---------- 5. Rote, the Overfitter: a scholarly parrot that repeats every page it has memorised, word for word ---------- */
function bzRote(g, o) {
  const d = o.dir, e = BZE[o.expr || 'neutral'], p = o.ph * 6.283, bob = Math.sin(p) * 1.4, back = d === 'up', fx = 50 + (o.tx || 0);
  const SC = '#d83a3e', BL = '#2f6ad0', YE = '#f0c83a', BK = '#f2b050', PAP = '#f6eed2';
  g.save(); g.translate(0, bob);
  bzF(g, bzB([[44, 90], [30, 126], [42, 130], [50, 100]]), BL, { l: 0.3 }); bzF(g, bzB([[56, 90], [70, 126], [58, 130], [50, 100]]), SC, { l: 0.3 }); bzF(g, bzB([[50, 92], [50, 130], [44, 128]]), YE, { l: 0.3 });
  bzF(g, bzR(38, 108, 6, 16, 2), '#d8923a'); bzF(g, bzR(56, 108, 6, 16, 2), '#d8923a'); [[36, 124], [44, 124], [54, 124], [62, 124]].forEach(([x, y]) => bzF(g, bzO(x + 1, y + 1, 4, 3), '#e8a84a', { lw: 1.2 }));
  bzF(g, bzO(50, 80, 28, 34), SC, { l: 0.3 });
  if (!back) { bzF(g, bzO(50, 88, 16, 23), '#f6d878', { l: 0.2 }); [[44, 76, -0.2], [57, 86, 0.2], [48, 98, 0.1]].forEach(([x, y, r]) => { g.save(); g.translate(x, y); g.rotate(r); bzF(g, bzR(-3.5, -3.5, 7, 7, 1), '#ffe86a', { l: 0.2, d: -0.15, lw: 1 }); g.restore(); }); }
  else { for (let i = 0; i < 4; i++) bzQ(g, [30 + i * 13, 62], [34 + i * 13, 80], [30 + i * 13, 104], shade(SC, -0.4), 1.8); }
  bzF(g, bzB([[26, 62], [14, 82], [18, 108], [28, 100], [32, 76]]), BL, { l: 0.3 }); bzF(g, bzB([[74, 62], [86, 82], [82, 108], [72, 100], [68, 76]]), BL, { l: 0.3 });
  [[17, 92], [20, 98], [24, 102]].forEach(([x, y]) => bzL(g, [[x, y - 6], [x + 1, y + 4]], YE, 2)); [[83, 92], [80, 98], [76, 102]].forEach(([x, y]) => bzL(g, [[x, y - 6], [x - 1, y + 4]], YE, 2));
  if (!back) { /* the book it clutches */
    bzF(g, bzR(28, 82, 44, 26, 3), '#2a5a8a', { l: 0.2 }); bzF(g, bzR(31, 84, 18, 21, 2), PAP, { l: 0.1, d: -0.2, lw: 1.1 }); bzF(g, bzR(51, 84, 18, 21, 2), PAP, { l: 0.1, d: -0.2, lw: 1.1 });
    for (let k = 0; k < 4; k++) { bzL(g, [[33, 88 + k * 4.5], [47, 88 + k * 4.5]], '#6a7a9a', 1.1); bzL(g, [[53, 88 + k * 4.5], [67, 88 + k * 4.5]], '#6a7a9a', 1.1); }
    bzD(g, 30, 106, 4.4, SC); bzD(g, 70, 106, 4.4, SC);
  }
  [[36, 18, -0.5, YE], [50, 12, 0, BL], [64, 18, 0.5, SC]].forEach(([x, y, r, c]) => { g.save(); g.translate(x, y); g.rotate(r); bzF(g, bzB([[0, -12], [5, -2], [0, 6], [-5, -2]]), c, { l: 0.3 }); g.restore(); });
  bzF(g, bzO(50, 38, 21, 21), SC, { l: 0.3 });
  if (!back) {
    bzF(g, bzO(fx, 40, 14, 13), '#fbeed0', { l: 0.1, d: -0.15 });
    bzF(g, bzO(fx - 9 * (d === 'side' ? 0.8 : 1), 36, 7, 7), '#fff8ee', { l: 0.05, d: -0.1, lw: 1.2 }); bzF(g, bzO(fx + 9 * (d === 'side' ? 0.8 : 1), 36, 7, 7), '#fff8ee', { l: 0.05, d: -0.1, lw: 1.2 });
    bzEyes(g, fx, 36, 9 * (d === 'side' ? 0.8 : 1), 2.9, e, { iris: '#2a4a8a', lid: '#fbeed0' });
    [-1, 1].forEach((s) => { g.save(); g.strokeStyle = '#d8a030'; g.lineWidth = 1.4; g.beginPath(); g.ellipse(fx + s * 9 * (d === 'side' ? 0.8 : 1), 36, 7.6, 7.6, 0, 0, 7); g.stroke(); g.restore(); }); bzL(g, [[fx - 2, 35], [fx + 2, 35]], '#d8a030', 1.4);
    const open = e.m > 0.45 ? 5 : 0; bzF(g, bzB([[fx - 8, 42], [fx, 40], [fx + 8, 42], [fx + 5, 50 + open * 0.4], [fx + 1, 56 + open * 0.3], [fx - 3, 50 + open * 0.4]]), BK, { l: 0.4 }); if (open) { g.fillStyle = '#6a2020'; g.beginPath(); g.ellipse(fx, 52 + open * 0.5, 3.2, 2 + open * 0.3, 0, 0, 7); g.fill(); } bzL(g, [[fx - 4, 46], [fx + 4, 46]], shade(BK, -0.45), 1.1);
  } else { bzF(g, bzO(50, 40, 18, 17), shade(SC, -0.12)); }
  bzF(g, bzG([[26, 20], [50, 10], [74, 20], [50, 29]]), '#1c1c34', { l: 0.4 }); bzF(g, bzR(36, 22, 28, 8, 3), '#2a2a48'); bzL(g, [[70, 20], [78, 34], [78, 42]], YE, 1.8); bzD(g, 78, 43, 2.6, YE);
  g.restore();
}
/* ---------- 6. Lag, the Drifting Model: an alarm-clock automaton in a cape of old calendar pages; always a moment behind itself ---------- */
function bzLagBody(g, o) {
  const d = o.dir, e = BZE[o.expr || 'neutral'], back = d === 'up', fx = 50 + (o.tx || 0), p = o.ph * 6.283;
  const BR = '#d8a840', TL = '#3e7a8a', PAP = '#efe4c8', RED = '#d8404a', SAND = '#f0c860';
  [[18, 62, 0.15], [86, 66, -0.12], [26, 92, 0.1], [78, 96, -0.08], [34, 110, -0.06], [66, 112, 0.1]].forEach(([x, y, r], i) => { g.save(); g.translate(x, y); g.rotate(r); bzF(g, bzG([[-11, -14], [11, -14], [12, 14], [3, 12], [-2, 16], [-9, 12], [-12, 14]]), PAP, { l: 0.1, d: -0.25, lw: 1.2 }); bzL(g, [[-8, -6], [8, -6]], RED, 1.6); g.restore(); });
  bzF(g, bzB([[26, 48], [74, 48], [86, 84], [90, 118], [50, 112], [10, 118], [14, 84]]), '#5a4a6a', { l: 0.2, d: -0.5 });
  [[20, 64], [34, 66], [50, 62], [66, 66], [80, 64]].forEach(([x, y], i) => { g.save(); g.translate(x, y + Math.sin(p + i) * 1.2); g.rotate((i - 2) * 0.08); bzF(g, bzG([[-8, -10], [8, -10], [9, 18], [2, 15], [-3, 19], [-9, 16]]), PAP, { l: 0.12, d: -0.22, lw: 1.2 }); bzL(g, [[-5, -3], [5, -3]], i % 2 ? RED : '#6a7a9a', 1.5); bzL(g, [[-5, 3], [3, 3]], '#8a9ab0', 1.1); g.restore(); });
  /* legs: coil springs */
  [38, 62].forEach((x) => { bzL(g, [[x, 96], [x - 5, 100], [x + 5, 104], [x - 5, 108], [x + 5, 112], [x - 4, 116], [x, 118]], '#9ab0c0', 3); bzF(g, bzR(x - 8, 117, 16, 8, 3), BR, { l: 0.4 }); });
  /* hourglass torso */
  const hg = bzB([[34, 44], [66, 44], [58, 62], [50, 68], [58, 76], [68, 96], [32, 96], [42, 76], [50, 68], [42, 62]]);
  bzF(g, hg, '#9ad6e0', { l: 0.4, d: -0.3 }); g.save(); g.beginPath(); hg.p(g); g.clip(); g.fillStyle = SAND; g.beginPath(); g.moveTo(32, 100); g.lineTo(68, 100); g.lineTo(62, 84); g.quadraticCurveTo(50, 78, 38, 84); g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(50, 62, 2, 40); g.fillStyle = SAND; g.beginPath(); g.moveTo(40, 46); g.lineTo(60, 46); g.lineTo(54, 54); g.lineTo(46, 54); g.fill(); g.restore();
  bzF(g, bzR(30, 40, 40, 6, 3), BR, { l: 0.4 }); bzF(g, bzR(30, 94, 40, 6, 3), BR, { l: 0.4 });
  bzL(g, [[52, 70], [54, 76], [51, 84], [54, 96]], '#f8e8a0', 1.2); [[56, 104], [48, 110], [60, 116]].forEach(([x, y], i) => bzD(g, x + Math.sin(p + i) * 1.5, y, 1.4, SAND));
  /* arms */
  bzQ(g, [30, 52], [14, 62], [16, 84], '#9ab0c0', 3); bzF(g, bzO(16, 86, 5.4, 5.4), BR, { l: 0.4 }); bzQ(g, [70, 52], [86, 62], [84, 78], '#9ab0c0', 3); bzF(g, bzO(84, 80, 5.4, 5.4), BR, { l: 0.4 });
  /* clock head */
  [[34, 8, -0.4], [66, 8, 0.4]].forEach(([x, y, r]) => { bzF(g, bzO(x, y, 8, 5, r), BR, { l: 0.45 }); bzL(g, [[x, y + 4], [x + (x < 50 ? 4 : -4), y + 14]], '#9ab0c0', 2); });
  bzF(g, bzO(50, 30, 24, 24), BR, { l: 0.45 }); bzF(g, bzO(50, 30, 19.5, 19.5), PAP, { l: 0.12, d: -0.18, lw: 1.2 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; bzL(g, [[50 + Math.sin(a) * 16, 30 - Math.cos(a) * 16], [50 + Math.sin(a) * (i % 3 ? 14.6 : 13.4), 30 - Math.cos(a) * (i % 3 ? 14.6 : 13.4)]], '#3a3a50', i % 3 ? 1 : 1.6); }
  if (back) { bzF(g, bzO(50, 30, 19.5, 19.5), shade(BR, -0.1)); bzD(g, 50, 30, 4, shade(BR, 0.3)); }
  else {
    bzL(g, [[fx - 11, 34], [fx - 11, 34.1]], '#3a3a50', 0);
    const hm = (e.t * 0.5), by = e.t > 0 ? 1 : -1;
    [-1, 1].forEach((s) => { const x = fx + s * 7.5; let ey = 30, h; if (e.arc) { bzQ(g, [x - 3, ey + 1.4], [x, ey - 4], [x + 3, ey + 1.4], '#2a2a40', 1.8); } else { h = 1.6 + Math.min(e.o, 1.35) * 2.2; g.fillStyle = '#2a2a40'; g.beginPath(); g.ellipse(x + (e.look ? 1.4 : 0), ey, 2.5 * (e.o > 1.2 ? 1.2 : 1), h, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; g.fillRect(x - 1 + (e.look ? 1.4 : 0), ey - h * 0.6, 1.2, 1.2); }
      bzL(g, [[x - s * 3.6, 22.5 + e.t * 2.6], [x + s * 3.6, 22.5 - e.t * 1.6]], '#2a2a40', 1.4); });
    const mA = -0.5 + e.t * 0.4 + (d === 'side' ? 0.4 : 0); bzL(g, [[fx, 30], [fx + Math.sin(0.6 + hm) * 12, 30 - Math.cos(0.6 + hm) * 12]], RED, 1.8); bzL(g, [[fx, 30], [fx - Math.sin(1.9 - hm) * 8, 30 + Math.cos(1.9 - hm) * 8 * 0.4]], '#3a3a50', 2.2); bzD(g, fx, 30, 1.8, '#3a3a50');
    bzL(g, [[fx - 9, 21], [fx - 2, 26], [fx + 5, 36]], 'rgba(60,60,80,.55)', 1); /* hairline crack */
    bzMouth(g, fx, 40, 4.6, e, { ink: '#3a3a50', line: '#3a3a50' });
  }
}
function bzLag(g, o) {
  const p = o.ph * 6.283, bob = Math.sin(p) * 2;
  /* delayed echoes of itself, trailing behind */
  const t = mkc(g.canvas.width, g.canvas.height), tg = t.getContext('2d'); tg.scale(BZK, BZK); bzLagBody(tg, Object.assign({}, o)); tg.setTransform(1, 0, 0, 1, 0, 0); tg.globalCompositeOperation = 'source-atop'; tg.fillStyle = 'rgba(90,230,255,0.85)'; tg.fillRect(0, 0, t.width, t.height);
  [[-15, 0.22, 4], [-8, 0.4, 2]].forEach(([dx, a, dy]) => { g.save(); g.globalAlpha = a; g.drawImage(t, (o.dir === 'side' ? -dx : dx) * BZK, (dy + Math.sin(p + dx) * 1.5) * BZK, t.width, t.height); g.restore(); });
  g.save(); g.translate(0, bob); bzLagBody(g, o); g.restore();
}
const BZPAINT = { misprint: bzMisprint, cheater: bzCheater, fanatic: bzFanatic, bulk: bzBulk, rote: bzRote, lag: bzLag };
const BZHEAD = { misprint: [50, 36, 52], cheater: [50, 36, 60], fanatic: [50, 38, 64], bulk: [50, 36, 66], rote: [50, 42, 58], lag: [50, 34, 54] };
const BossArt = {
  cache: {}, meta: {},
  has(id) { return !!BZPAINT[id]; },
  paint(id, dir, ph, expr, H) {
    const W = Math.round(H * BZW / BZH), hi = mkc(BZW * BZK, BZH * BZK), g = hi.getContext('2d'); g.scale(BZK, BZK);
    const o = { dir: dir === 'left' ? 'side' : dir, ph, expr: expr || 'neutral', tx: dir === 'left' || dir === 'right' ? 7 : 0 };
    if (o.dir === 'side') { g.translate(50, 0); g.scale(0.82, 1); g.translate(-50, 0); }
    BZPAINT[id](g, o); let c = bzPix(hi, W, H, 9);
    if (dir === 'left') { const f = mkc(c.width, c.height), fg = f.getContext('2d'); fg.translate(c.width, 0); fg.scale(-1, 1); fg.drawImage(c, 0, 0); c = f; }
    return c;
  },
  sprite(id, dir, f, H) { H = H || BOSS_WORLD_H[id]; const k = id + dir + (f & 3) + '_' + H; if (!this.cache[k]) this.cache[k] = this.paint(id, dir, (f & 3) / 4, 'neutral', H); return this.cache[k]; },
  bust(id, expr) {
    const k = id + 'b' + expr; if (this.cache[k]) return this.cache[k];
    const hi = mkc(600, 600), g = hi.getContext('2d'), [cx, cy, sz] = BZHEAD[id], sc = 100 / sz;
    g.save(); g.scale(BZK, BZK); g.translate(50, 56); g.scale(sc, sc); g.translate(-cx, -cy); BZPAINT[id](g, { dir: 'down', ph: 0.25, expr, tx: 0 }); g.restore(); g.save(); g.scale(BZK, BZK); bzMark(g, expr); g.restore();
    return (this.cache[k] = bzPix(hi, 126, 126, 9));
  },
};
(function () {
  const _get = Sprites.get.bind(Sprites), _meta = Sprites.meta.bind(Sprites), _pg = Portraits.get.bind(Portraits);
  Sprites.get = function (id, dir, f) { return BossArt.has(id) ? BossArt.sprite(id, dir === 'down' || dir === 'up' || dir === 'left' || dir === 'right' ? dir : 'down', f | 0) : _get(id, dir, f); };
  Sprites.meta = function (id) { if (!BossArt.has(id)) return _meta(id); const H = BOSS_WORLD_H[id], W = Math.round(H * BZW / BZH); return { w: W + 2, h: H + 2, ax: Math.round(W / 2) + 1, ay: Math.round(H * BZFEET / BZH) + 1 }; };
  Portraits.get = function (id, expr) { if (!BossArt.has(id)) return _pg(id, expr); expr = EXPR.includes(expr) ? expr : 'neutral'; return BossArt.bust(id, expr); };
  Sprites.drawBoss = function (g, id, cx, by, h, f) {
    const c = BossArt.sprite(id, 'down', f | 0, BOSS_ARENA_H[id]), k = h / BOSS_ARENA_H[id], W = c.width * k, H = c.height * k;
    g.drawImage(c, Math.round(cx - W / 2), Math.round(by - (BZFEET / BZH * BOSS_ARENA_H[id] + 1) * k), W, H);
  };
})();
