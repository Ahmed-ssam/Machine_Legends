'use strict';
/* ===== sprites2.js: 16-bit redesign. Hero 20x28 and Milo 22x26: ramped shading, selective outlines, animated scarf ===== */
const PAL2 = {
  hair: ['#1a0f14', '#3a2420', '#5c3a2e', '#8a5c44'], skin: ['#b5775a', '#dca07c', '#f4cba4', '#fff0d8'],
  coat: ['#10162b', '#1c2748', '#2c3d6a', '#4a5f98'], gold: ['#6e4e12', '#b78a22', '#f0c24a', '#fff0a0'],
  red: ['#5a1018', '#8e1f26', '#c8382c', '#f06a48'], boot: ['#2a160e', '#4a2a18', '#7a4a28', '#a8703c'], pant: ['#0e0e1c', '#1a1a30', '#2c2c4a'],
  lens: ['#2a6a86', '#5cc0d8', '#a8ecf6', '#ffffff'], strap: ['#2a1810', '#4a2e1c', '#6e4a2c'],
};
function mk2(w, h) { const c = mkc(w, h); return [c, c.getContext('2d')]; }
function px2(g, x, y, c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); }
function rc2(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
function el2(g, cx, cy, rx, ry, c) { g.fillStyle = c; for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy <= 1) g.fillRect(x, y, 1, 1); } }
function sph2(g, cx, cy, rx, ry, p) { el2(g, cx, cy, rx, ry, p[0]); el2(g, cx - 0.6, cy - 0.5, rx - 0.7, ry - 0.6, p[1]); el2(g, cx - 1.1, cy - 0.9, rx - 1.7, ry - 1.5, p[2]); if (p[3]) { px2(g, Math.round(cx - rx * 0.5), Math.round(cy - ry * 0.55), p[3]); } }
/* selective outline: outline colour = dark shade of the neighbouring fill */
function selout2(c, fixed) {
  const w = c.width, h = c.height, g = c.getContext('2d'), id = g.getImageData(0, 0, w, h), d = id.data, o = new Uint8ClampedArray(d);
  const A = (x, y) => x >= 0 && y >= 0 && x < w && y < h && d[(y * w + x) * 4 + 3] > 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (A(x, y)) continue; let n = null;
    for (const [dx, dy] of [[0, 1], [-1, 0], [1, 0], [0, -1]]) if (A(x + dx, y + dy)) { n = ((y + dy) * w + x + dx) * 4; break; }
    if (n === null) continue; const i = (y * w + x) * 4, k = fixed ? null : 0.38;
    o[i] = fixed ? fixed[0] : d[n] * k * 0.8; o[i + 1] = fixed ? fixed[1] : d[n + 1] * k * 0.7; o[i + 2] = fixed ? fixed[2] : d[n + 2] * k * 1.05 + 10; o[i + 3] = 255;
  }
  id.data.set(o); g.putImageData(id, 0, 0); return c;
}
function hairSpikes2(g, pts, P) { pts.forEach(([x, y, h]) => { for (let i = 0; i < h; i++) { px2(g, x, y - i, P[1]); if (i < h - 1) px2(g, x + 1, y - i, P[1]); } px2(g, x, y - h + 1, P[2]); }); }

/* ---------- HERO ---------- */
function heroFrame2(dir, f) {
  const d = dir === 'right' ? 'left' : dir, [c, g] = mk2(22, 30), H = PAL2.hair, SK = PAL2.skin, CO = PAL2.coat, GO = PAL2.gold, RD = PAL2.red, BT = PAL2.boot, PN = PAL2.pant;
  const A = f === 1, B = f === 3, bob = A || B ? -1 : 0, sw = A ? 1 : B ? -1 : 0, ox = 1;
  const X = (x) => x + ox;
  const legs = () => {
    [[7, -sw], [12, sw]].forEach(([x, s]) => { const lift = s > 0 ? 1 : 0; rc2(g, X(x), 21, 3, 4 - lift, PN[1]); rc2(g, X(x), 21, 1, 4 - lift, PN[2]); rc2(g, X(x), 24 - lift, 3, 3, BT[2]); rc2(g, X(x), 24 - lift, 3, 1, BT[3]); rc2(g, X(x), 26 - lift, 3, 1, BT[0]); px2(g, X(x + 1), 24 - lift, GO[2]); });
  };
  if (d === 'down') {
    /* cape wings */
    rc2(g, X(2), 14 + bob, 3, 9, RD[1]); rc2(g, X(15), 14 + bob, 3, 9, RD[1]); rc2(g, X(2), 14 + bob, 1, 9, RD[2]); rc2(g, X(17), 14 + bob, 1, 9, RD[0]); rc2(g, X(3), 22 + bob, 2, 1, RD[0]); rc2(g, X(15), 22 + bob, 2, 1, RD[0]);
    legs();
    /* coat */
    rc2(g, X(5), 14 + bob, 10, 8, CO[2]); rc2(g, X(5), 14 + bob, 2, 8, CO[3]); rc2(g, X(13), 14 + bob, 2, 8, CO[1]); rc2(g, X(4), 20 + bob, 12, 3, CO[2]); rc2(g, X(4), 22 + bob, 12, 1, CO[0]); rc2(g, X(14), 20 + bob, 2, 3, CO[1]);
    rc2(g, X(9), 15 + bob, 2, 8, CO[1]); for (let y = 15; y < 22; y += 2) px2(g, X(10), y + bob, GO[2]);
    /* bandolier strap + belt */
    for (let i = 0; i < 7; i++) { px2(g, X(5 + i), 14 + i + bob, GO[1]); px2(g, X(6 + i), 14 + i + bob, GO[2]); }
    rc2(g, X(5), 19 + bob, 10, 2, PAL2.strap[1]); rc2(g, X(5), 19 + bob, 10, 1, PAL2.strap[2]); rc2(g, X(9), 19 + bob, 2, 2, GO[2]); px2(g, X(9), 19 + bob, GO[3]);
    /* arms */
    const al = 15 - (A ? 1 : 0), ar = 15 - (B ? 1 : 0);
    rc2(g, X(3), al + bob, 2, 5, CO[2]); rc2(g, X(3), al + bob, 1, 5, CO[3]); rc2(g, X(3), al + 4 + bob, 2, 1, GO[2]); px2(g, X(3), al + 5 + bob, SK[2]); px2(g, X(4), al + 5 + bob, SK[1]);
    rc2(g, X(15), ar + bob, 2, 5, CO[1]); rc2(g, X(15), ar + 4 + bob, 2, 1, GO[1]); px2(g, X(15), ar + 5 + bob, SK[1]); px2(g, X(16), ar + 5 + bob, SK[0]);
    /* shoulder pads */
    rc2(g, X(3), 13 + bob, 3, 2, GO[1]); rc2(g, X(14), 13 + bob, 3, 2, GO[0]); px2(g, X(3), 13 + bob, GO[3]);
    /* scarf wrap + tail */
    rc2(g, X(5), 12 + bob, 10, 3, RD[2]); rc2(g, X(5), 12 + bob, 10, 1, RD[3]); rc2(g, X(5), 14 + bob, 10, 1, RD[1]); rc2(g, X(11), 14 + bob, 3, 1, RD[0]);
    const sl = Math.sin(f * 1.6) > 0 ? 1 : 0; rc2(g, X(12), 14 + bob, 3, 5, RD[2]); rc2(g, X(14), 15 + bob, 1, 5, RD[1]); rc2(g, X(12 + sl), 19 + bob, 3, 2, RD[2]); px2(g, X(14 + sl), 20 + bob, RD[0]); px2(g, X(12), 15 + bob, RD[3]);
    /* head */
    const hy = 8 + bob; rc2(g, X(8), 11 + bob, 4, 2, SK[0]);
    sph2(g, X(10), hy + 0.4, 6.6, 5.7, SK);
    /* hair back ring + spikes */
    el2(g, X(10), hy - 3.3, 7.1, 3.7, H[1]); el2(g, X(10), hy - 3.7, 6.2, 3, H[2]); px2(g, X(8), hy - 5, H[3]); rc2(g, X(7), hy - 4, 3, 1, H[3]);
    hairSpikes2(g, [[X(5), hy - 5, 3], [X(9), hy - 7, 3], [X(13), hy - 6, 3], [X(16), hy - 3, 2], [X(3), hy - 2, 2]], H);
    /* fringe */
    [[4, 1], [6, 0], [8, 1], [10, 0], [12, 1], [14, 0]].forEach(([x, h]) => { rc2(g, X(x), hy - 3, 2, h + 2, H[1]); px2(g, X(x), hy - 3, H[2]); }); px2(g, X(9), hy - 1, H[1]); px2(g, X(12), hy - 1, H[1]);
    rc2(g, X(3), hy - 2, 2, 3, H[1]); rc2(g, X(16), hy - 2, 2, 3, H[0]); px2(g, X(3), hy - 2, H[2]);
    /* goggles on forehead */
    rc2(g, X(3), hy - 4, 15, 1, PAL2.strap[1]);
    [5, 13].forEach((x0) => { el2(g, X(x0 + 1), hy - 4.5, 2.9, 2.8, GO[0]); el2(g, X(x0 + 1), hy - 4.6, 2.5, 2.4, GO[2]); el2(g, X(x0 + 1), hy - 4.5, 1.5, 1.5, PAL2.lens[1]); px2(g, X(x0), hy - 5, PAL2.lens[3]); px2(g, X(x0 + 1), hy - 4, PAL2.lens[0]); px2(g, X(x0 + 2), hy - 6, GO[3]); });
    rc2(g, X(9), hy - 4, 3, 1, GO[1]);
    /* face */
    [6, 12].forEach((x0) => { rc2(g, X(x0), hy, 2, 3, '#2a1610'); px2(g, X(x0), hy, '#fff'); px2(g, X(x0 + 1), hy + 1, '#8a4a2a'); px2(g, X(x0), hy + 2, '#8a4a2a'); }); rc2(g, X(6), hy - 1, 2, 1, H[1]); rc2(g, X(12), hy - 1, 2, 1, H[1]);
    px2(g, X(5), hy + 3, '#f0907a'); px2(g, X(14), hy + 3, '#f0907a'); px2(g, X(10), hy + 3, SK[0]); rc2(g, X(9), hy + 4, 3, 1, '#a24a42'); px2(g, X(8), hy + 3, '#a24a42'); px2(g, X(12), hy + 3, '#a24a42');
  } else if (d === 'up') {
    rc2(g, X(2), 13 + bob, 16, 10, RD[1]); rc2(g, X(3), 13 + bob, 2, 10, RD[2]); rc2(g, X(15), 13 + bob, 2, 10, RD[0]); rc2(g, X(2), 22 + bob, 16, 1, RD[0]); for (let x = 3; x < 17; x += 3) px2(g, X(x), 22 + bob, RD[1]);
    px2(g, X(2), 22 + bob, 'rgba(0,0,0,0)');
    /* gear emblem */
    const gx = X(10), gy = 18 + bob; el2(g, gx, gy, 3.4, 3.4, GO[1]); el2(g, gx, gy, 2.6, 2.6, GO[2]); el2(g, gx, gy, 1.1, 1.1, RD[1]); [[0, -4], [0, 4], [-4, 0], [4, 0], [-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(([dx, dy]) => px2(g, gx + dx - (dx > 0 ? 0 : 0), gy + dy, GO[2]));
    legs();
    rc2(g, X(3), 12 + bob, 14, 2, RD[2]); rc2(g, X(3), 12 + bob, 14, 1, RD[3]);
    rc2(g, X(3), 14 + bob, 2, 5, CO[2]); rc2(g, X(15), 14 + bob, 2, 5, CO[1]); rc2(g, X(3), 18 + bob, 2, 1, GO[2]); rc2(g, X(15), 18 + bob, 2, 1, GO[1]); px2(g, X(3), 19 + bob, SK[1]); px2(g, X(16), 19 + bob, SK[0]);
    const hy = 8 + bob; rc2(g, X(8), 11 + bob, 4, 2, SK[0]);
    el2(g, X(10), hy, 6.8, 6.2, H[1]); el2(g, X(10), hy - 0.4, 6.1, 5.6, H[2]); el2(g, X(9), hy - 1.5, 4, 3, H[3]); rc2(g, X(6), hy + 3, 8, 3, H[1]); rc2(g, X(7), hy + 5, 6, 1, H[0]); px2(g, X(5), hy + 4, H[1]);
    hairSpikes2(g, [[X(5), hy - 5, 3], [X(9), hy - 6, 4], [X(13), hy - 6, 3], [X(16), hy - 3, 2], [X(3), hy - 2, 2], [X(7), hy + 6, 2], [X(12), hy + 6, 2]], H);
    rc2(g, X(3), hy - 3, 15, 1, PAL2.strap[1]); rc2(g, X(14), hy - 4, 3, 3, GO[1]); px2(g, X(14), hy - 4, GO[2]);
  } else {
    /* left profile */
    const cw = A ? 1 : B ? 0 : 1;
    rc2(g, X(9), 13 + bob, 5 + cw, 10, RD[1]); rc2(g, X(9), 13 + bob, 1, 10, RD[0]); rc2(g, X(13 + cw), 14 + bob, 1, 9, RD[0]); rc2(g, X(10), 22 + bob, 4 + cw, 1, RD[0]);
    [[8, sw], [10, -sw]].forEach(([x, s], i) => { const back = i === 0 ? 1 : 0; rc2(g, X(x + s * 2 - 1), 21, 3, 4, back ? PN[0] : PN[1]); rc2(g, X(x + s * 2 - 1), 24, 4, 3, back ? BT[1] : BT[2]); rc2(g, X(x + s * 2 - 1), 24, 4, 1, back ? BT[2] : BT[3]); rc2(g, X(x + s * 2 - 1), 26, 4, 1, BT[0]); });
    rc2(g, X(6), 13 + bob, 8, 8, CO[2]); rc2(g, X(6), 13 + bob, 2, 8, CO[3]); rc2(g, X(12), 13 + bob, 2, 8, CO[1]); rc2(g, X(5), 20 + bob, 9, 3, CO[2]); rc2(g, X(5), 22 + bob, 9, 1, CO[0]);
    rc2(g, X(6), 19 + bob, 8, 2, PAL2.strap[1]); rc2(g, X(6), 19 + bob, 8, 1, PAL2.strap[2]); rc2(g, X(7), 19 + bob, 2, 2, GO[2]);
    for (let i = 0; i < 5; i++) px2(g, X(6 + i), 14 + i + bob, GO[2]);
    rc2(g, X(8 - sw), 14 + bob, 3, 5, CO[3]); rc2(g, X(8 - sw), 18 + bob, 3, 1, GO[2]); px2(g, X(8 - sw), 19 + bob, SK[2]); px2(g, X(9 - sw), 19 + bob, SK[1]); rc2(g, X(7 - sw), 13 + bob, 4, 2, GO[1]); px2(g, X(7 - sw), 13 + bob, GO[3]);
    rc2(g, X(6), 12 + bob, 9, 3, RD[2]); rc2(g, X(6), 12 + bob, 9, 1, RD[3]); rc2(g, X(6), 14 + bob, 9, 1, RD[1]);
    const sl = A ? 1 : B ? 0 : 1; rc2(g, X(13), 13 + bob, 3 + sl, 2, RD[2]); rc2(g, X(14 + sl), 15 + bob, 3, 2, RD[1]); px2(g, X(16 + sl), 16 + bob, RD[0]); px2(g, X(13), 13 + bob, RD[3]);
    const hy = 8 + bob; rc2(g, X(7), 11 + bob, 3, 2, SK[0]);
    sph2(g, X(8), hy, 5.2, 5.4, SK); px2(g, X(3), hy + 2, SK[2]); px2(g, X(2), hy + 2, SK[1]);
    el2(g, X(11), hy - 0.6, 5.2, 5.6, H[1]); el2(g, X(10.6), hy - 1, 4.4, 4.8, H[2]); rc2(g, X(10), hy + 3, 4, 2, H[1]); rc2(g, X(9), hy + 5, 4, 1, H[0]); px2(g, X(11), hy - 2, H[3]); px2(g, X(12), hy - 1, H[3]); px2(g, X(10), hy - 3, H[3]); rc2(g, X(8), hy - 5, 4, 1, H[3]);
    el2(g, X(8), hy - 3, 5.4, 2.8, H[1]); el2(g, X(8), hy - 3.4, 4.8, 2.4, H[2]); rc2(g, X(4), hy - 3, 3, 2, H[1]); px2(g, X(3), hy - 2, H[1]);
    hairSpikes2(g, [[X(7), hy - 5, 3], [X(11), hy - 6, 3], [X(14), hy - 4, 3], [X(15), hy, 2], [X(14), hy + 5, 2]], H);
    rc2(g, X(4), hy - 4, 10, 1, PAL2.strap[1]); el2(g, X(6), hy - 4.5, 2.8, 2.8, GO[0]); el2(g, X(6), hy - 4.6, 2.4, 2.4, GO[2]); el2(g, X(6), hy - 4.5, 1.4, 1.4, PAL2.lens[1]); px2(g, X(5), hy - 5, PAL2.lens[3]); px2(g, X(7), hy - 6, GO[3]);
    rc2(g, X(4), hy, 2, 3, '#2a1610'); px2(g, X(4), hy, '#fff'); px2(g, X(5), hy + 1, '#8a4a2a'); rc2(g, X(4), hy - 1, 3, 1, H[1]);
    px2(g, X(5), hy + 3, '#f0907a'); px2(g, X(2), hy + 3, SK[0]); rc2(g, X(3), hy + 4, 2, 1, '#a24a42');
  }
  return selout2(c);
}

/* ---------- MILO ---------- */
function miloFrame2(dir, f) {
  const d = dir === 'right' ? 'left' : dir, [c, g] = mk2(18, 22), fl = f % 2, W = ['#6a6358', '#a89f8a', '#d8cfb6', '#f6f0e0'], GD = PAL2.gold, CY = ['#1f8aa0', '#5ff0ff', '#d8ffff'], SC = ['#0a0e1e', '#161c36', '#222c52'];
  const cx = 9;
  rc2(g, cx - 1, 1, 1, 3, W[1]); rc2(g, cx, 1, 1, 3, W[0]); el2(g, cx, 1.2, 1.6, 1.6, GD[2]); px2(g, cx - 1, 0, GD[3]);
  rc2(g, cx - 1, 17, 3, 1, GD[1]); rc2(g, cx - 1, 18, 3, 2 + fl, '#ffb347'); rc2(g, cx, 18, 1, 3 + fl, '#ffe27a'); px2(g, cx - 1 + fl, 21, '#ff7a2f');
  if (d === 'down') {
    el2(g, cx, 14.5, 3.6, 2.6, W[1]); el2(g, cx - 0.4, 14.2, 2.9, 2, W[2]); rc2(g, cx - 1, 14, 2, 2, GD[1]); px2(g, cx - 1, 14, GD[3]); px2(g, cx, 14, GD[2]);
    rc2(g, 2, 12 + fl, 2, 3, W[2]); rc2(g, 14, 12 + (1 - fl), 2, 3, W[1]); rc2(g, 2, 14 + fl, 2, 1, GD[2]); rc2(g, 14, 14 + (1 - fl), 2, 1, GD[1]);
    rc2(g, 3, 4, 12, 8, W[1]); rc2(g, 4, 3, 10, 1, W[2]); rc2(g, 4, 12, 10, 1, W[0]); rc2(g, 3, 4, 12, 1, W[3]); rc2(g, 3, 5, 1, 7, W[3]); rc2(g, 14, 5, 1, 7, W[0]);
    rc2(g, 1, 6, 2, 4, GD[1]); rc2(g, 15, 6, 2, 4, GD[0]); px2(g, 1, 6, GD[3]); px2(g, 1, 7, GD[2]);
    rc2(g, 4, 5, 10, 6, SC[0]); rc2(g, 4, 5, 10, 1, SC[2]); rc2(g, 4, 6, 1, 4, SC[1]);
    [6, 10].forEach((x) => { rc2(g, x, 6, 2, 3, CY[1]); px2(g, x, 6, '#fff'); px2(g, x + 1, 6, CY[2]); rc2(g, x, 8, 2, 1, CY[0]); });
    rc2(g, 8, 10, 2, 1, CY[0]); px2(g, 7, 9, CY[0]); px2(g, 10, 9, CY[0]);
  } else if (d === 'up') {
    el2(g, cx, 14.5, 3.6, 2.6, W[0]); rc2(g, cx - 1, 14, 2, 2, GD[1]);
    rc2(g, 2, 12 + fl, 2, 3, W[1]); rc2(g, 14, 12 + (1 - fl), 2, 3, W[0]);
    rc2(g, 3, 4, 12, 8, W[1]); rc2(g, 4, 3, 10, 1, W[2]); rc2(g, 4, 12, 10, 1, W[0]); rc2(g, 3, 4, 12, 1, W[3]); rc2(g, 14, 5, 1, 7, W[0]);
    rc2(g, 1, 6, 2, 4, GD[1]); rc2(g, 15, 6, 2, 4, GD[0]);
    rc2(g, 5, 5, 8, 5, W[0]); for (let x = 6; x < 13; x += 2) rc2(g, x, 6, 1, 3, W[1]); rc2(g, 8, 4, 2, 1, GD[2]);
  } else {
    el2(g, cx, 14.5, 3.2, 2.6, W[1]); el2(g, cx - 0.4, 14.2, 2.5, 2, W[2]); rc2(g, cx - 3, 14, 2, 2, GD[1]); px2(g, cx - 3, 14, GD[3]);
    rc2(g, 8 + fl, 12, 3, 3, W[2]); rc2(g, 8 + fl, 14, 3, 1, GD[2]);
    rc2(g, 4, 4, 11, 8, W[1]); rc2(g, 5, 3, 9, 1, W[2]); rc2(g, 5, 12, 9, 1, W[0]); rc2(g, 4, 4, 11, 1, W[3]); rc2(g, 13, 5, 2, 7, W[0]);
    rc2(g, 12, 6, 3, 4, GD[1]); px2(g, 12, 6, GD[3]);
    rc2(g, 2, 5, 5, 6, SC[0]); rc2(g, 2, 5, 5, 1, SC[2]); rc2(g, 3, 6, 2, 3, CY[1]); px2(g, 3, 6, '#fff'); rc2(g, 3, 8, 2, 1, CY[0]);
  }
  return selout2(c);
}

/* ---------- portraits 48x48 (6+ expressions) ---------- */
function portraitHero2(expr) {
  const [c, g] = mk2(48, 48), H = PAL2.hair, SK = PAL2.skin, GO = PAL2.gold, RD = PAL2.red, CO = PAL2.coat, L = PAL2.lens;
  /* shoulders + coat + scarf */
  rc2(g, 4, 38, 40, 10, CO[2]); rc2(g, 4, 38, 40, 2, CO[3]); rc2(g, 33, 40, 11, 8, CO[1]); rc2(g, 6, 38, 6, 4, GO[1]); rc2(g, 6, 38, 6, 1, GO[3]); rc2(g, 8, 38, 2, 3, GO[2]); for (let i = 0; i < 9; i++) { px2(g, 14 + i, 41 + i, GO[1]); px2(g, 15 + i, 41 + i, GO[2]); }
  rc2(g, 3, 36, 4, 12, RD[1]); rc2(g, 41, 36, 4, 12, RD[0]);
  rc2(g, 10, 34, 28, 7, RD[2]); rc2(g, 10, 34, 28, 2, RD[3]); rc2(g, 10, 39, 28, 2, RD[1]); rc2(g, 28, 38, 9, 10, RD[2]); rc2(g, 33, 40, 4, 8, RD[1]); rc2(g, 28, 38, 3, 10, RD[3]);
  rc2(g, 19, 31, 10, 6, SK[0]);
  /* head */
  sph2(g, 24, 21, 15.5, 14.5, SK); rc2(g, 8, 21, 2, 6, SK[1]); rc2(g, 38, 21, 2, 6, SK[0]);
  /* hair mass + spikes + fringe */
  el2(g, 24, 12, 18, 9.5, H[1]); el2(g, 24, 11, 16.5, 8.5, H[2]); el2(g, 20, 8, 9, 4, H[3]); rc2(g, 7, 14, 5, 10, H[1]); rc2(g, 36, 14, 5, 10, H[0]); rc2(g, 8, 14, 2, 8, H[2]);
  [[10, 8, 8], [16, 5, 9], [23, 2, 10], [30, 4, 9], [36, 8, 8], [6, 16, 6], [42, 16, 6]].forEach(([x, y, h]) => { for (let i = 0; i < h; i++) { rc2(g, x + (i > 4 ? 1 : 0), y + i * 0 + (h - i) * 0, 3 - (i > h - 3 ? 1 : 0), 1, 'rgba(0,0,0,0)'); } });
  [[9, 9], [15, 6], [22, 3], [29, 5], [35, 9]].forEach(([x, y], k) => { for (let i = 0; i < 9; i++) { const w = Math.max(1, 5 - Math.floor(i * 0.5)); rc2(g, x + Math.floor((5 - w) / 2) + (k < 2 ? -Math.floor(i / 3) : k > 2 ? Math.floor(i / 3) : 0) * 0, y - 0 + (8 - i), w, 1, i > 6 ? H[2] : H[1]); } });
  [[8, 15], [14, 16], [20, 16], [26, 17], [32, 16], [38, 15]].forEach(([x, y], k) => { for (let i = 0; i < 5; i++) { const w = Math.max(1, 6 - i); rc2(g, x + (6 - w) / 2 | 0, y + i, w, 1, i < 2 ? H[2] : H[1]); } });
  /* goggles on forehead */
  rc2(g, 7, 8, 34, 3, PAL2.strap[1]); rc2(g, 7, 8, 34, 1, PAL2.strap[2]);
  [[17, 8], [31, 8]].forEach(([cx, cy]) => { el2(g, cx, cy, 6.6, 6, GO[0]); el2(g, cx, cy - 0.4, 6, 5.4, GO[2]); el2(g, cx, cy, 4.4, 3.9, GO[1]); el2(g, cx, cy, 3.8, 3.4, L[1]); el2(g, cx + 0.4, cy + 1, 2.8, 2, L[0]); rc2(g, cx - 2, cy - 2, 2, 2, L[3]); px2(g, cx + 1, cy - 2, L[2]); px2(g, cx - 5, cy - 4, GO[3]); px2(g, cx - 4, cy - 5, GO[3]); });
  rc2(g, 23, 7, 3, 3, GO[1]); rc2(g, 23, 7, 3, 1, GO[2]);
  /* eyes / brows / mouth */
  const eye = (x, side) => {
    const dark = '#2a1610', iris = '#8a4a2a';
    if (expr === 'happy') { rc2(g, x, 24, 8, 2, dark); rc2(g, x + 1, 23, 6, 1, dark); rc2(g, x, 26, 2, 1, dark); rc2(g, x + 6, 26, 2, 1, dark); }
    else if (expr === 'sad') { rc2(g, x, 25, 8, 2, dark); rc2(g, x + 1, 27, 6, 1, dark); px2(g, x + 5, 25, '#fff'); px2(g, x + (side ? 7 : 0), 28, '#9ad8ff'); px2(g, x + (side ? 7 : 0), 29, '#9ad8ff'); }
    else if (expr === 'surprised') { rc2(g, x - 1, 21, 10, 9, '#fff'); rc2(g, x + 2, 23, 4, 5, dark); rc2(g, x + 3, 24, 2, 2, '#fff'); }
    else { rc2(g, x, 22, 8, 8, dark); rc2(g, x + 1, 23, 6, 6, iris); rc2(g, x + 2, 24, 4, 5, dark); rc2(g, x, 22, 3, 3, '#fff'); px2(g, x + 6, 28, '#c8805a'); if (expr === 'determined' || expr === 'angry') rc2(g, x, 22, 8, 2, dark); }
  };
  eye(12, 0); eye(28, 1);
  const by = expr === 'surprised' ? 18 : expr === 'angry' || expr === 'determined' ? 21 : 19;
  if (expr === 'angry' || expr === 'determined') { for (let i = 0; i < 9; i++) { px2(g, 12 + i, by + 1 - (i >> 2) + (i > 6 ? 0 : 0), H[0]); px2(g, 36 - i, by + 1 - (i >> 2), H[0]); } rc2(g, 12, by + 1, 9, 1, H[0]); rc2(g, 28, by + 1, 9, 1, H[0]); }
  else if (expr === 'thinking') { rc2(g, 12, by + 1, 8, 1, H[0]); rc2(g, 28, by - 1, 9, 1, H[0]); rc2(g, 33, by - 2, 3, 1, H[0]); }
  else { rc2(g, 12, by, 8, 1, H[1]); rc2(g, 29, by, 8, 1, H[1]); }
  rc2(g, 23, 29, 2, 2, SK[0]);
  const mY = 33;
  if (expr === 'happy') { rc2(g, 19, mY - 1, 10, 4, '#5a1820'); rc2(g, 20, mY - 1, 8, 1, '#fff'); rc2(g, 21, mY + 2, 6, 1, '#e06060'); }
  else if (expr === 'surprised') { rc2(g, 22, mY - 1, 5, 5, '#5a1820'); rc2(g, 23, mY, 3, 2, '#e06060'); }
  else if (expr === 'sad') { rc2(g, 20, mY + 1, 9, 1, '#8a3a38'); px2(g, 19, mY + 2, '#8a3a38'); px2(g, 29, mY + 2, '#8a3a38'); }
  else if (expr === 'angry') { rc2(g, 19, mY, 11, 3, '#5a1820'); rc2(g, 20, mY, 9, 1, '#fff'); for (let x = 21; x < 29; x += 2) px2(g, x, mY + 1, '#d8d0c0'); }
  else if (expr === 'confident' || expr === 'determined') { rc2(g, 20, mY + 1, 8, 1, '#a24a42'); px2(g, 28, mY, '#a24a42'); px2(g, 29, mY - 1, '#a24a42'); px2(g, 19, mY + 2, '#a24a42'); }
  else { rc2(g, 21, mY, 7, 1, '#a24a42'); px2(g, 20, mY - 1, '#a24a42'); px2(g, 28, mY - 1, '#a24a42'); }
  if (expr === 'happy' || expr === 'confident') { rc2(g, 11, 29, 5, 2, '#f58c80'); rc2(g, 32, 29, 5, 2, '#f58c80'); }
  px2(g, 17, 20, 'rgba(0,0,0,0)');
  exprExtras(g, expr);
  return selout2(c);
}
function portraitMilo2(expr) {
  const c = mkc(48, 48), g = c.getContext('2d'), { R, P } = rr(g), S = CH.milo, gold = '#e0b84a', cy = '#5ff0ff', cy2 = '#2fb7c4';
  R(23, 1, 2, 7, S.skinD); R(21, 0, 6, 3, gold); R(22, 0, 3, 1, '#fff3b0');
  R(8, 8, 32, 30, S.skin); R(10, 6, 28, 3, S.skin); R(10, 38, 28, 2, S.skinD); R(8, 8, 2, 30, '#f5f7fc'); R(38, 8, 2, 30, S.skinD); R(9, 36, 30, 2, S.skinD);
  R(4, 17, 4, 12, gold); R(40, 17, 4, 12, gold); R(5, 18, 2, 3, '#fff3b0');
  R(12, 12, 24, 22, '#12172b'); R(12, 12, 24, 2, '#222a4a'); R(11, 13, 1, 20, '#222a4a');
  R(12, 38, 24, 2, S.top); R(14, 40, 20, 8, S.top); R(14, 40, 20, 1, '#f1f3f9'); R(22, 42, 4, 4, gold); R(23, 43, 2, 2, '#fff3b0');
  const ex = (cx, y) => {
    if (expr === 'happy') { R(cx - 1, y - 2, 4, 2, cy); R(cx - 3, y, 3, 2, cy); R(cx + 3, y, 3, 2, cy); R(cx - 4, y + 2, 2, 2, cy); R(cx + 5, y + 2, 2, 2, cy); }
    else if (expr === 'surprised') { R(cx - 3, y - 4, 8, 9, cy); R(cx - 1, y - 2, 4, 5, '#12172b'); P(cx, y - 1, '#e9ffff'); }
    else if (expr === 'thinking') { if (cx < 24) { R(cx - 2, y - 3, 6, 7, cy); R(cx, y - 2, 2, 2, '#e9ffff'); } else { R(cx - 1, y - 1, 4, 4, cy); R(cx, y - 1, 2, 1, '#e9ffff'); } }
    else if (expr === 'sad') { R(cx - 3, y - 1, 7, 2, cy); R(cx - 2, y + 1, 5, 2, cy); R(cx - 1, y + 3, 3, 1, cy); R(cx + (cx < 24 ? -2 : 3), y + 5, 2, 3, '#7fc8ff'); }
    else if (expr === 'angry') { for (let i = 0; i < 7; i++) R(cx - 3 + i, y - 1 + (cx < 24 ? Math.floor(i / 2.5) : 2 - Math.floor(i / 2.5)), 1, 4, cy); }
    else if (expr === 'confident') { R(cx - 3, y - 1, 8, 5, cy); R(cx - 3, y - 1, 8, 2, '#12172b'); R(cx - 1, y + 2, 3, 1, '#e9ffff'); }
    else if (expr === 'determined') { R(cx - 3, y - 1, 7, 5, cy); R(cx - 3, y - 2, 3 + (cx < 24 ? 0 : 4), 2, '#12172b'); R(cx - 1, y, 2, 2, '#e9ffff'); }
    else { R(cx - 2, y - 3, 5, 8, cy); R(cx - 1, y - 2, 2, 2, '#e9ffff'); R(cx - 2, y + 4, 5, 1, cy2); }
  };
  ex(18, 21); ex(30, 21);
  const m = { neutral: () => R(21, 30, 6, 1, cy2), happy: () => { R(20, 29, 8, 1, cy2); R(21, 30, 6, 1, cy2); R(22, 31, 4, 1, cy2); }, surprised: () => { R(22, 29, 4, 4, cy2); R(23, 30, 2, 2, '#12172b'); }, thinking: () => R(21, 30, 5, 1, cy2), sad: () => { R(21, 30, 6, 1, cy2); P(20, 31, cy2); P(27, 31, cy2); }, angry: () => { R(20, 30, 8, 1, cy2); P(20, 29, cy2); P(27, 29, cy2); }, confident: () => { R(20, 30, 7, 1, cy2); P(27, 29, cy2); P(28, 28, cy2); }, determined: () => R(20, 30, 8, 1, cy2) }[expr] || (() => {});
  m();
  exprExtras(g, expr);

  /* 16-bit finish: bevel, rivets, screen glass, gold trim */
  rc2(g, 9, 9, 30, 1, '#fffaf0'); rc2(g, 9, 9, 1, 28, '#fffaf0'); rc2(g, 38, 10, 1, 27, '#8a8068'); rc2(g, 10, 37, 28, 1, '#8a8068');
  [[11, 10], [36, 10], [11, 35], [36, 35]].forEach(([x, y]) => { rc2(g, x, y, 2, 2, '#8a8068'); px2(g, x, y, '#fffaf0'); });
  rc2(g, 13, 13, 22, 1, '#3a4a7a'); rc2(g, 13, 13, 2, 8, '#2a3a6a'); for (let y = 15; y < 33; y += 3) rc2(g, 33, y, 2, 1, 'rgba(95,240,255,0.12)');
  rc2(g, 4, 17, 4, 1, '#fff3b0'); rc2(g, 4, 28, 4, 1, '#8a6a1a'); rc2(g, 40, 17, 4, 1, '#c9a02a'); rc2(g, 40, 28, 4, 1, '#6e4e12');
  rc2(g, 22, 8, 4, 1, '#b78a22');
  return selout2(c);
}
/* ---------- sheet art: hero + Milo cut from the supplied character sheet (art.js) ---------- */
const Art = {
  ready: false, spr: {}, por: {}, hi: {},
  load() { const ld = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; }); return Promise.all([ld(ART.src), ld(ART.srcHi)]).then(([im, ih]) => { try { if (im) { this.slice(im); this.ready = true; } if (ih) this.sliceHi(ih); } catch (e) { console.error(e); } }); },
  sliceHi(im) { ['hero', 'milo'].forEach((id) => { const M = ART.hi[id]; Object.keys(M.y).forEach((d) => { for (let f = 0; f < 4; f++) { const c = mkc(M.cw, M.ch); c.getContext('2d').drawImage(im, f * M.cw, M.y[d], M.cw, M.ch, 0, 0, M.cw, M.ch); this.hi[id + d + (f)] = c; } }); }); },
  slice(im) {
    ['hero', 'milo'].forEach((id) => { const M = ART[id]; ['down', 'up', 'left', 'right'].forEach((d) => { for (let f = 0; f < 4; f++) { const c = mkc(M.cw, M.ch); c.getContext('2d').drawImage(im, f * M.cw, M.y[d], M.cw, M.ch, 0, 0, M.cw, M.ch); this.spr[id + d + f] = c; } }); });
    const PS = ART.por.size, cut = (x, y) => { const c = mkc(PS, PS); c.getContext('2d').drawImage(im, x, y, PS, PS, 0, 0, PS, PS); return c; };
    Object.keys(ART.por.hero).forEach((n) => { this.por['hero' + n] = cut(ART.por.hero[n], ART.por.y); });
    Object.keys(ART.por.milo).forEach((n) => { this.por['milo' + n] = cut(ART.por.milo[n][0], ART.por.milo[n][1]); });
  },
};
const ART_HERO_EXPR = { neutral: 'neutral', happy: 'happy', surprised: 'surprised', thinking: 'thinking', sad: 'sad', angry: 'angry', confident: 'neutral', determined: 'angry' };
const ART_MILO_EXPR = { neutral: 'sparkle', happy: 'happy', surprised: 'surprised', thinking: 'sparkle', sad: 'angry', angry: 'angry', confident: 'happy', determined: 'angry' };
(function () {
  const _get = Sprites.get.bind(Sprites), _pg = Portraits.get.bind(Portraits);
  Sprites.get = function (id, dir, f) {
    if (id !== 'hero' && id !== 'milo') return _get(id, dir, f);
    if (Art.ready) return Art.spr[id + dir + (f & 3)];
    const k = id + '2' + dir + f; if (!this.cache[k]) { const o = id === 'hero' ? heroFrame2(dir === 'right' ? 'left' : dir, f) : miloFrame2(dir === 'right' ? 'left' : dir, f); this.cache[k] = dir === 'right' ? flipH(o) : o; } return this.cache[k];
  };
  /* draw a big (cutscene) sprite: x = feet centre, y = feet bottom, s = scale relative to the in-world size; uses the hi-res art when available */
  Sprites.draw = function (g, id, dir, f, x, y, s) {
    const lo = this.get(id, dir, f), h = Art.ready && Art.hi[id + dir + (f & 3)];
    if (!h) { const mt = this.meta(id); g.drawImage(lo, Math.round(x - mt.ax * s), Math.round(y - lo.height * s), lo.width * s, lo.height * s); return; }
    const k = ART[id].ch / ART.hi[id].ch * s, sm = g.imageSmoothingEnabled; g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(h, Math.round(x - ART.hi[id].ax * k), Math.round(y - h.height * k), h.width * k, h.height * k); g.imageSmoothingEnabled = sm;
  };
  Sprites.meta = function (id) {
    if (Art.ready && (id === 'hero' || id === 'milo')) { const M = ART[id]; return { w: M.cw, h: M.ch, ax: M.ax, ay: M.ch - 1 }; }
    return id === 'hero' ? { w: 22, h: 30, ax: 11, ay: 27 } : id === 'milo' ? { w: 18, h: 22, ax: 9, ay: 16 } : { w: 16, h: 24, ax: 8, ay: 23 };
  };
  Portraits.get = function (id, expr) {
    if (id !== 'hero' && id !== 'milo') return _pg(id, expr);
    expr = EXPR.includes(expr) ? expr : 'neutral';
    if (Art.ready) return Art.por[id + (id === 'hero' ? ART_HERO_EXPR : ART_MILO_EXPR)[expr]];
    const k = id + '2' + expr; if (!this.cache[k]) this.cache[k] = id === 'hero' ? portraitHero2(expr) : portraitMilo2(expr); return this.cache[k];
  };
})();
