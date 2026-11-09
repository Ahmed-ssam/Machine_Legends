'use strict';
/* ===== world4.js: city 4 (Valley of Neighbors) characters, creatures, plots, tiles, props, rooms ===== */

Object.assign(CH, {
  nara: { skin: '#d9a47c', skinD: '#c08560', hair: '#6a3a2a', hairL: '#8a5a44', eye: '#2a1a14', top: '#e0a23a', topD: '#b8802a', pants: '#5a4a3a', shoe: '#4a3322', style: 'bun', robe: true, belt: '#8a5a2a' },
  tarn: { skin: '#e3bd98', skinD: '#c99e78', hair: '#2a3a5a', hairL: '#4a5a8a', eye: '#2a1a14', top: '#4a7ab8', topD: '#355a8e', pants: '#3a3a4a', shoe: '#2c2c36', style: 'messy', glasses: true, bandana: '#f0c24a' },
  sera: { skin: '#c9946a', skinD: '#ad7a52', hair: '#8a4a2a', hairL: '#b56a3c', eye: '#1e140e', top: '#9a6ac0', topD: '#7a4ea0', pants: '#4a3a5a', shoe: '#2c2236', style: 'braid', bandana: '#f0c24a', apron: '#d8c8a8', glasses: true },
  rowan: { skin: '#e0b48a', skinD: '#c89a70', hair: '#e8e0d0', hairL: '#ffffff', eye: '#2a2018', top: '#3f7f74', topD: '#2f625a', pants: '#5b4636', shoe: '#3a2a20', style: 'elder', beard: true, robe: true, belt: '#d9c24a' },
  tumble: { skin: '#b9825a', skinD: '#9a6a46', hair: '#3a2a20', hairL: '#5a4232', eye: '#1e140e', top: '#d9423a', topD: '#a82a22', pants: '#3a4a6a', shoe: '#5a3a22', style: 'messy', cap: '#e0b84a', apron: '#e0b84a' },
  bulk: { skin: '#8c8c9c', skinD: '#6c6c7c', hair: '#5a5a68', hairL: '#7a7a88', eye: '#ffd24a', top: '#7a7a88', topD: '#5a5a68', pants: '#5a5a68', shoe: '#4a4a58', style: 'spiky', belt: '#c9a24b', scarf: '#8a8a98', scarfD: '#6a6a78' },
});
Object.assign(CREA, { Cloudlet: ['bird', '#e8eef8'], Glimmer: ['bird', '#4aa0e8'], Starling: ['bird', '#6a5a7a'], Mossling: ['mammal', '#7aa84a'], Stoneback: ['mammal', '#8a8a96'], Pebble: ['unknown', '#9a9aa8'], Nib: ['bird', '#d8a060'], Dab: ['mammal', '#c88a50'], Wren: ['finch', '#b88a5a'] });

/* scatter plot widget: pts [{n, x, y, cls, hi, unknown}], lines [[i,j]], returns html */
function plotHTML(pts, o) {
  o = o || {}; const mx = o.max || 10, my = o.maxY || o.max || 10;
  let svg = '<svg class="pl-lines" viewBox="0 0 100 100" preserveAspectRatio="none">' + (o.lines || []).map((l) => '<line x1="' + (pts[l[0]].x / mx * 100) + '" y1="' + (100 - pts[l[0]].y / my * 100) + '" x2="' + (pts[l[1]].x / mx * 100) + '" y2="' + (100 - pts[l[1]].y / my * 100) + '" class="' + (l[2] || '') + '"/>').join('') + '</svg>';
  const dots = pts.map((p) => '<div class="pl-d' + (p.hi ? ' hi' : '') + (p.unknown ? ' q' : '') + '" style="left:' + (p.x / mx * 100) + '%;bottom:' + (p.y / my * 100) + '%"><img alt="" src="' + Creatures.url(p.n) + '"><span>' + p.n + (o.coords ? ' (' + p.x + ', ' + p.y + ')' : '') + '</span></div>').join('');
  return '<div class="plotw"><div class="pl-y">' + fmt(t(o.ylab || 'ax.tail')) + '</div><div class="plot">' + svg + dots + '</div><div class="pl-x">' + fmt(t(o.xlab || 'ax.size')) + '</div></div>';
}

/* ---------- Env ---------- */
Object.assign(Env, { valley: 0, scalefix: 0 });
(function () {
  const _sync = Env.sync.bind(Env);
  Env.sync = function (snap) {
    _sync(snap);
    const f = (k) => (Save.d && Save.d.flags[k] ? 1 : 0);
    if (Room.cur && Room.cur.city === 4) this.target = 0.9;
    Object.assign(this.T, { valley: f('c4s1'), scalefix: f('c4boss') });
    if (snap) { this.bloom = this.target; for (const k in this.T) this[k] = this.T[k]; }
  };
})();

/* ---------- tiles ---------- */
const C4T = { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1 };
(function () {
  const _get = Tiles.get.bind(Tiles);
  Tiles.get = function (ch, x, y, theme) {
    if (!C4T[ch]) return _get(ch, x, y, theme);
    const v = Math.floor(hash(x, y, 1) * 4), key = 'c4' + ch + v + '_' + Math.round(Env.valley * 6) + (ch === '5' ? Math.round(Env.scalefix * 4) : '');
    if (!this.cache[key]) this.cache[key] = this.make4(ch, x, y, v);
    return this.cache[key];
  };
  Tiles.make4 = function (ch, x, y, v) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g), k = Env.valley;
    if (ch === '1') {
      R(0, 0, 16, 16, mix('#6a8a46', '#8ab656', k));
      for (let i = 0; i < 8; i++) { const px = Math.floor(hash(x, y, i + 3) * 15), py = Math.floor(hash(x, y, i + 8) * 14); P(px, py, i % 2 ? '#5a7a3a' : mix('#8aa858', '#b4dc7a', k)); P(px, py + 1, '#5a7a3a'); }
      if (v === 1) { P(4, 5, '#ffd24a'); P(5, 5, '#fff3b0'); } if (v === 3) { P(11, 9, '#e8788a'); P(10, 9, '#ffd0d8'); }
    } else if (ch === '2') {
      R(0, 0, 16, 16, '#b0a48a'); for (let i = 0; i < 6; i++) { const px = Math.floor(hash(x, y, i + 4) * 13), py = Math.floor(hash(x, y, i + 9) * 13); R(px, py, 3, 2, i % 2 ? '#9a8e74' : '#c8bca2'); }
      R(0, 0, 16, 1, '#a09478'); R(0, 15, 16, 1, '#a09478');
    } else if (ch === '3') {
      R(0, 0, 16, 16, '#c9d8b8'); R(0, 0, 16, 1, '#8aa070'); R(0, 0, 1, 16, '#8aa070'); if (v === 0) { P(8, 8, '#8aa070'); } if ((x + y) % 2) R(1, 1, 15, 15, '#d4e2c4'); if (v === 2) { R(0, 0, 16, 1, '#5a7a50'); }
    } else if (ch === '4') {
      R(0, 0, 16, 16, (x % 2) ? '#b8894f' : '#c4955a'); R(0, 7, 16, 1, '#8a6434'); R(0, 15, 16, 1, '#8a6434'); P(3 + v * 3, 3, '#9a7440'); P(10 - v, 11, '#9a7440');
    } else {
      const alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#a8a4b4' : '#b4b0c0'); R(0, 0, 16, 1, '#8a869a'); R(0, 0, 1, 16, '#8a869a'); if (v === 1) { P(6, 6, '#cfcbdc'); P(7, 7, '#cfcbdc'); }
    }
    return c;
  };
})();

/* ---------- props ---------- */
Object.assign(PROP, {
  vhouse: { w: 64, h: 56, sol: [0, 18, 64, 34], draw(g, p) {
    const { R, P } = rr(g), c1 = { r: '#c8503a', b: '#4a7ab8', g: '#4a9a5a', y: '#d9a23a' }[p.c || 'r'], c2 = shade(c1, 0.3), c3 = shade(c1, -0.3);
    R(3, 24, 58, 30, '#efe1bd'); R(3, 24, 58, 3, '#fff3d4'); R(3, 50, 58, 4, '#c9b88e'); R(58, 24, 3, 30, '#c9b88e');
    for (let y = 0; y < 24; y++) { const ins = Math.max(0, 10 - y); R(ins, y, 64 - ins * 2, 1, y % 4 === 3 ? c3 : (y % 4 === 0 ? c2 : c1)); } R(0, 22, 64, 3, c3);
    R(26, 34, 12, 20, '#6a4a2a'); R(27, 35, 10, 19, '#8a6434'); P(35, 45, '#ffd24a'); [[8, 32], [46, 32]].forEach(([x, y]) => { R(x, y, 10, 10, '#6a4a2a'); R(x + 1, y + 1, 8, 8, '#a8d4e8'); R(x + 4, y + 1, 1, 8, '#6a4a2a'); });
    R(46, 4, 6, 10, '#8a7a6a'); R(46, 4, 6, 2, '#a89a8a'); outlineCanvas(g.canvas, '#2a2218'); } },
  marker: { w: 14, h: 24, sol: [2, 16, 10, 7], draw(g, p) {
    const { R, P } = rr(g); R(2, 6, 10, 18, '#9a96a6'); R(2, 6, 10, 2, '#c0bccc'); R(10, 8, 2, 16, '#7a768a'); R(3, 9, 8, 5, '#e0b84a'); R(3, 15, 8, 5, '#4a8ad8');
    for (let i = 0; i < 3; i++) { P(4 + i * 2, 11, '#6a4a10'); P(4 + i * 2, 17, '#10305a'); } P(5, 0, '#c0bccc'); R(4, 2, 6, 5, '#9a96a6'); outlineCanvas(g.canvas, '#22202e'); } },
  scalehouse: { w: 80, h: 70, sol: [0, 20, 80, 38], draw(g, p, t) {
    const { R, P } = rr(g), f = Env.scalefix;
    R(2, 26, 76, 44, '#d8c8e0'); R(2, 26, 76, 3, '#f0e4f6'); R(2, 64, 76, 6, '#a898b8'); R(76, 26, 2, 44, '#a898b8');
    for (let y = 0; y < 24; y++) { const ins = Math.max(0, 8 - y); R(ins, y + 4, 80 - ins * 2, 1, y % 4 === 3 ? '#4a2f78' : (y % 4 === 0 ? '#8a6ac0' : '#6a4aa0')); } R(0, 26, 80, 3, '#4a2f78');
    R(38, 0, 4, 12, '#6a5a7a'); R(26, 8, 28, 3, '#c9a24b'); R(26, 11, 2, 8, '#c9a24b'); R(52, 11, 2, 8, '#c9a24b'); R(22, 18, 12, 3, '#e0d0a0'); R(46, 18, 12, 3, '#e0d0a0');
    R(30, 40, 20, 30, '#6a4a2a'); R(31, 41, 18, 29, '#8a6434'); R(39, 41, 2, 29, '#4a321c'); P(46, 56, '#ffd24a');
    [[8, 38], [58, 38]].forEach(([x, y]) => { R(x, y, 14, 12, '#6a4a2a'); R(x + 1, y + 1, 12, 10, '#a8d4e8'); R(x + 6, y + 1, 1, 10, '#6a4a2a'); }); outlineCanvas(g.canvas, '#241a3a'); } },
  bscale: { w: 48, h: 44, sol: [4, 28, 40, 14], draw(g, p, t) {
    const { R, P } = rr(g), tilt = Env.scalefix > 0.5 ? 0 : 1; R(21, 8, 6, 34, '#8a7a96'); R(17, 38, 14, 5, '#6a5a76'); R(18, 2, 12, 8, '#c9a24b');
    const y1 = 10 + tilt * 3, y2 = 10 - tilt * 3; R(4, 8 + (tilt ? 3 : 0), 40, 3, '#c9a24b'); R(4, y1 + 2, 2, 12, '#c9a24b'); R(42, y2 + 2, 2, 12, '#c9a24b'); R(2, y1 + 14, 12, 3, '#e0d0a0'); R(34, y2 + 14, 12, 3, '#e0d0a0');
    R(5, y1 + 8, 8, 6, '#6a6a7a'); R(36, y2 + 10, 6, 4, '#e0405a'); outlineCanvas(g.canvas, '#241a3a'); } },
  cart: { w: 46, h: 34, sol: [2, 14, 42, 18], draw(g) {
    const { R, P } = rr(g); R(2, 14, 42, 14, '#8a5a34'); R(2, 14, 42, 3, '#b07a44'); for (let i = 0; i < 4; i++) { R(2 + i * 11, 0, 11, 10, i % 2 ? '#e8e0d0' : '#d9423a'); } R(0, 9, 46, 3, '#6a3a1a'); R(3, 2, 2, 12, '#6a4a2a'); R(41, 2, 2, 12, '#6a4a2a');
    [['#e0b84a', 5], ['#4a8ad8', 14], ['#e8788a', 23], ['#7aa84a', 32]].forEach(([c, x]) => { R(x, 17, 8, 8, c); P(x + 1, 18, '#ffffffbb'); }); R(8, 28, 8, 6, '#2a2218'); R(30, 28, 8, 6, '#2a2218'); outlineCanvas(g.canvas, '#22160e'); } },
  cstone: { w: 22, h: 40, sol: [3, 26, 16, 13], draw(g, p, t) {
    const { R, P } = rr(g), c = { bird: '#4a9be0', fish: '#38b8c8', mam: '#e0702a', amph: '#5ab85a', unk: '#c9a24b' }[p.col || 'unk'], glow = 0.5 + Math.sin(t * 2 + (p.i || 0)) * 0.2;
    R(3, 6, 16, 33, '#9a96a6'); R(5, 2, 12, 6, '#9a96a6'); R(3, 6, 16, 2, '#c0bccc'); R(15, 8, 4, 31, '#7a768a'); R(4, 36, 14, 3, '#6a667a');
    R(7, 14, 8, 8, mix('#5a566a', c, glow)); R(8, 15, 6, 6, mix('#7a768a', c, glow + 0.2)); P(9, 16, '#ffffffcc'); R(6, 26, 10, 2, '#7a768a'); outlineCanvas(g.canvas, '#22202e'); } },
  gscale: { w: 132, h: 72, sol: [4, 30, 124, 38], draw(g, p, t) {
    const { R, P } = rr(g), f = Env.scalefix;
    R(4, 38, 124, 32, '#a8a4b4'); R(4, 38, 124, 3, '#d0ccdc'); R(4, 64, 124, 8, '#6a667a'); R(124, 38, 4, 34, '#7a768a');
    R(30, 6, 72, 36, '#6a667a'); R(34, 10, 64, 28, f > 0.5 ? '#e8f4e0' : '#e8dcc8'); R(34, 10, 64, 3, '#c9a24b');
    for (let i = 0; i <= 8; i++) { R(40 + i * 7, 26, 1, i % 2 ? 4 : 7, '#3a3548'); } const ang = f > 0.5 ? 0.5 : (0.9 + Math.sin(t * 5) * 0.03); const nx = 66 + Math.cos(Math.PI * (1 - ang)) * 24, ny = 36 - Math.sin(Math.PI * (1 - ang)) * 24; for (let s = 0; s < 20; s++) P(Math.round(66 + (nx - 66) * s / 20), Math.round(36 + (ny - 36) * s / 20), f > 0.5 ? '#2f8a5a' : '#d9423a');
    R(62, 33, 8, 6, '#3a3548'); R(44, 14, 44, 5, f > 0.5 ? '#2f8a5a' : '#d9423a'); R(8, 44, 14, 20, '#7a768a'); R(110, 44, 14, 20, '#7a768a'); outlineCanvas(g.canvas, '#241a3a'); } },
});
(function () {
  const _key = Props.key.bind(Props), _solid = Props.solid.bind(Props), q = (v) => Math.round(v * 10);
  Props.key = function (p, t) {
    switch (p.type) {
      case 'vhouse': return 'vh' + (p.c || 'r');
      case 'scalehouse': return 'sc' + q(Env.scalefix);
      case 'bscale': return 'bs' + (Env.scalefix > 0.5 ? 1 : 0);
      case 'cstone': return 'cs' + (p.col || '') + (p.i || 0) + Math.floor(t * 4);
      case 'gscale': return 'gs' + q(Env.scalefix) + (Env.scalefix > 0.5 ? 0 : Math.floor(t * 10));
      default: return _key(p, t);
    }
  };
  Props.solid = function (p) { return _solid(p); };
})();

/* ---------- rooms ---------- */
function buildCity4(R) {
  /* ---- the village (hub) ---- */
  { const W = 44, H = 26, m = grid(W, H, '1');
    fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 2, W, 2, 'T'); fillR(m, 0, 0, 1, 11, 'T'); fillR(m, 0, 14, 1, H - 14, 'T'); fillR(m, W - 1, 0, 1, 11, 'T'); fillR(m, W - 1, 14, 1, H - 14, 'T');
    fillR(m, 0, 11, W, 3, '2'); fillR(m, 32, 7, 2, 4, '2'); fillR(m, 22, 14, 3, 12, '2'); fillR(m, 12, 3, 14, 7, '3');
    R.valley = { id: 'valley', city: 4, name: 'room.valley', w: W, h: H, map: m, theme: 'fo', haze: 'valley', music: 'meadows', light: 0,
      props: [
        { type: 'scalehouse', x: 30, y: 2.5, hs: 'scalehouse' },
        { type: 'vhouse', x: 3, y: 3.5, c: 'r' }, { type: 'vhouse', x: 6, y: 17, c: 'b' }, { type: 'vhouse', x: 35, y: 17, c: 'g' }, { type: 'vhouse', x: 38, y: 3.5, c: 'y' }, { type: 'vhouse', x: 14, y: 17.5, c: 'y' },
        { type: 'marker', x: 8.5, y: 9.6 }, { type: 'marker', x: 10.5, y: 14.2 }, { type: 'marker', x: 27.5, y: 9.6 }, { type: 'marker', x: 38.5, y: 14.2 }, { type: 'marker', x: 12.2, y: 9.6 }, { type: 'marker', x: 25.8, y: 9.6 },
        { type: 'cart', x: 28.5, y: 14.6 },
        { type: 'ftree', x: 1.5, y: 8, v: 1 }, { type: 'ftree', x: 40, y: 8 }, { type: 'ftree', x: 18, y: 18.5 }, { type: 'ftree', x: 29, y: 19.5, v: 1 }, { type: 'ftree', x: 1.5, y: 20 }, { type: 'ftree', x: 41, y: 20, v: 1 },
        { type: 'fbush', x: 5, y: 14.6 }, { type: 'fbush', x: 21, y: 15, v: 1 }, { type: 'fbush', x: 34, y: 14.6 }, { type: 'shroom', x: 12, y: 18 }, { type: 'stump', x: 27, y: 17.6 }, { type: 'fence', x: 10, y: 10.4 }, { type: 'fence', x: 11, y: 10.4 },
      ],
      exits: [
        { x: 0, y: 11, w: 1, h: 3, to: 'birdgate', tx: 13, ty: 8, dir: 'left' },
        { x: 31.7, y: 6.6, w: 1.6, h: 1.2, to: 'scalehouse', tx: 10, ty: 12, need: () => Save.flag('c4s2'), lock: 'lock.scale4', dir: 'up' },
        { x: 22, y: 24.2, w: 3, h: 1, to: 'council4', tx: 12, ty: 13.4, need: () => Save.flag('c4s3'), lock: 'lock.council4', dir: 'down' },
        { x: 43, y: 11, w: 1, h: 3, to: 'greatscale', tx: 13, ty: 14, need: () => Save.flag('c4trial'), lock: 'lock.scale4b', dir: 'right' },
      ],
      spots: [{ x: 9.5, y: 11.6, r: 20, say: 'tile.marker4' }, { x: 19, y: 3.6, r: 24, say: 'tile.grounds' }],
      spawn: [3, 12.2],
    }; }
  /* ---- scale keeper's workshop ---- */
  { const W = 20, H = 14, m = grid(W, H, '4'); fillR(m, 0, 0, W, 3, 'W'); fillR(m, 0, 0, 1, H, 'W'); fillR(m, W - 1, 0, 1, H, 'W'); fillR(m, 0, H - 1, W, 1, 'W'); fillR(m, 9, H - 1, 2, 1, '4');
    R.scalehouse = { id: 'scalehouse', city: 4, name: 'room.scalehouse', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'bscale', x: 8.5, y: 2.2, hs: 'bscale' }, { type: 'rug', x: 7, y: 7.5 }, { type: 'cabinet', x: 2, y: 3 }, { type: 'cabinet', x: 16, y: 3 }, { type: 'table', x: 3, y: 8 }, { type: 'table', x: 14, y: 9 }, { type: 'banner', x: 5, y: 0 }, { type: 'banner', x: 13, y: 0 }, { type: 'desklamp', x: 4, y: 7 }],
      exits: [{ x: 9, y: 13, w: 2, h: 1, to: 'valley', tx: 32.5, ty: 8, dir: 'down' }],
      spots: [{ x: 10, y: 4.6, r: 18, say: 'tile.bscale' }], spawn: [10, 12],
    }; }
  /* ---- council of neighbors ---- */
  { const W = 24, H = 16, m = grid(W, H, '1'); fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 1, W, 1, 'T'); fillR(m, 0, 0, 1, H, 'T'); fillR(m, W - 1, 0, 1, H, 'T'); fillR(m, 10, 6, 4, 9, '2'); fillR(m, 9, 5, 6, 3, '2'); fillR(m, 11, H - 1, 2, 1, '2');
    R.council4 = { id: 'council4', city: 4, name: 'room.council4', w: W, h: H, map: m, theme: 'fo', haze: 'valley', music: 'meadows', light: 0,
      props: [{ type: 'cstone', x: 3, y: 5, col: 'bird', i: 0 }, { type: 'cstone', x: 6.5, y: 3, col: 'fish', i: 1 }, { type: 'cstone', x: 10.5, y: 1.6, col: 'mam', i: 2 }, { type: 'cstone', x: 14.5, y: 3, col: 'amph', i: 3 }, { type: 'cstone', x: 18, y: 5, col: 'bird', i: 4 },
        { type: 'fbush', x: 2, y: 11, v: 1 }, { type: 'fbush', x: 20, y: 11 }, { type: 'shroom', x: 5, y: 12 }, { type: 'stump', x: 17, y: 11 }, { type: 'rug', x: 9, y: 8.5 }],
      exits: [{ x: 11, y: 15, w: 2, h: 1, to: 'valley', tx: 23.5, ty: 22.6, dir: 'up' }], spots: [], spawn: [12, 14],
    }; }
  /* ---- the great scale (boss) ---- */
  { const W = 26, H = 16, m = grid(W, H, '5'); fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 1, W, 1, 'T'); fillR(m, 0, 0, 1, H, 'T'); fillR(m, W - 1, 0, 1, 6, 'T'); fillR(m, W - 1, 11, 1, H - 11, 'T'); fillR(m, 12, H - 1, 2, 1, '5');
    R.greatscale = { id: 'greatscale', city: 4, name: 'room.greatscale', w: W, h: H, map: m, theme: 'fo', haze: 'valley', music: 'meadows', light: 0,
      props: [{ type: 'gscale', x: 9.5, y: 2.5 }, { type: 'marker', x: 6, y: 5 }, { type: 'marker', x: 19.5, y: 5 }, { type: 'ftree', x: 2, y: 4 }, { type: 'ftree', x: 21.5, y: 4, v: 1 }, { type: 'fbush', x: 4, y: 11 }, { type: 'fbush', x: 20, y: 11, v: 1 }],
      exits: [{ x: 12, y: 15, w: 2, h: 1, to: 'valley', tx: 41.4, ty: 12.4, dir: 'down' }, { x: 25, y: 7, w: 1, h: 4, end4: true, need: () => Save.flag('c4boss'), lock: 'lock.path4', dir: 'right' }],
      spots: [], spawn: [13, 14],
    }; }
}
