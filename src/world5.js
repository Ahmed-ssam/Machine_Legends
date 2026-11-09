'use strict';
/* ===== world5.js: city 5 (Valley of Predictions) characters, tiles, props, rooms ===== */

Object.assign(CH, {
  lin: { skin: '#e3bd98', skinD: '#c99e78', hair: '#2a2a3a', hairL: '#4a4a62', eye: '#1a1a24', top: '#5a7ac8', topD: '#445ea0', pants: '#3a3a4e', shoe: '#2a2a36', style: 'bun', glasses: true, robe: true, belt: '#f0c24a' },
  sage1: { skin: '#d9a47c', skinD: '#c08560', hair: '#cfcfd8', hairL: '#ffffff', eye: '#2a1a14', top: '#8aa0b8', topD: '#6a8098', pants: '#5a6a7a', shoe: '#3a4654', style: 'elder', robe: true, belt: '#b8c8d8' },
  sage2: { skin: '#e0b48a', skinD: '#c89a70', hair: '#7a2a8a', hairL: '#a84ab8', eye: '#2a1a24', top: '#a83a9a', topD: '#7e2a74', pants: '#4a2a4a', shoe: '#2c1a2c', style: 'spiky', robe: true, belt: '#f0c24a', scarf: '#d86ad0', scarfD: '#a84aa0' },
  rote: { skin: '#a8a098', skinD: '#88807a', hair: '#7a7268', hairL: '#9a9288', eye: '#ffd24a', top: '#8a8278', topD: '#6a625a', pants: '#6a625a', shoe: '#4a443e', style: 'spiky', belt: '#c9a24b', scarf: '#9a9288', scarfD: '#7a7268' },
  citizen: { skin: '#c9946a', skinD: '#ad7a52', hair: '#3a2a20', hairL: '#5a4232', eye: '#1e140e', top: '#e0a23a', topD: '#b8802a', pants: '#4a3a5a', shoe: '#2c2236', style: 'messy', cap: '#d9a23a' },
});
Object.assign(CREA, { Whiskers: ['mammal', '#8a5a34'], Snowy: ['mammal', '#f0f0f0'], Mist: ['mammal', '#9a9aa8'] });

Object.assign(Env, { harvest: 0, balance: 0, lineok: 0, gate5: 0 });
(function () {
  const _sync = Env.sync.bind(Env);
  Env.sync = function (snap) {
    _sync(snap);
    const f = (k) => (Save.d && Save.d.flags[k] ? 1 : 0);
    if (Room.cur && Room.cur.city === 5) this.target = 0.9;
    Object.assign(this.T, { harvest: Math.max(f('c5s1'), 0), balance: f('c5boss'), lineok: f('c5s2'), gate5: f('c5s4') });
    if (snap) { this.bloom = this.target; for (const k in this.T) this[k] = this.T[k]; }
  };
})();

const C5T = { '6': 1, '7': 1, '8': 1, '9': 1 };
(function () {
  const _get = Tiles.get.bind(Tiles);
  Tiles.get = function (ch, x, y, theme) {
    if (!C5T[ch]) return _get(ch, x, y, theme);
    const v = Math.floor(hash(x, y, 1) * 4), key = 'c5' + ch + v + '_' + Math.round(Env.harvest * 6) + (ch === '8' ? Math.round(Env.balance * 4) : '');
    if (!this.cache[key]) this.cache[key] = this.make5(ch, x, y, v);
    return this.cache[key];
  };
  Tiles.make5 = function (ch, x, y, v) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g), k = Env.harvest;
    if (ch === '6') {
      R(0, 0, 16, 16, mix('#7a8a4a', '#9ac05a', k)); for (let i = 0; i < 7; i++) { const px = Math.floor(hash(x, y, i + 3) * 15), py = Math.floor(hash(x, y, i + 8) * 14); P(px, py, mix('#6a7a3a', '#7aa84a', k)); P(px, py + 1, '#5a6a30'); }
      if (v === 2) { P(5, 4, '#ffd24a'); P(11, 10, '#fff3b0'); }
    } else if (ch === '7') {
      R(0, 0, 16, 16, mix('#a8903a', '#e0b84a', k)); for (let i = 0; i < 5; i++) { const px = 1 + i * 3 + (v % 2); R(px, 3, 1, 12, mix('#8a7430', '#c99a2a', k)); R(px - 1, 2, 3, 3, mix('#d8b848', '#ffe27a', k)); P(px, 1, '#ffe27a'); }
    } else if (ch === '8') {
      const alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#d6d0c4' : '#e2dcd0'); R(0, 0, 16, 1, '#b8b2a6'); R(0, 0, 1, 16, '#b8b2a6'); if (v === 1) { P(5, 5, '#f4efe6'); P(6, 6, '#f4efe6'); } if (Env.balance > 0.5 && v === 3) { P(8, 8, '#ffd24a'); }
    } else {
      R(0, 0, 16, 16, '#b89868'); for (let i = 0; i < 5; i++) { const px = Math.floor(hash(x, y, i + 4) * 13), py = Math.floor(hash(x, y, i + 9) * 13); R(px, py, 3, 2, i % 2 ? '#a0824f' : '#cdb07c'); } R(0, 0, 16, 1, '#a58a5c');
    }
    return c;
  };
})();

function catIcon(g, col, x, y) { const R = (a, b, w, h, c) => { g.fillStyle = c; g.fillRect(x + a, y + b, w, h); }; R(2, 6, 12, 8, col); R(3, 2, 10, 6, col); R(3, 0, 2, 3, col); R(11, 0, 2, 3, col); R(5, 4, 1, 1, '#1a1a1a'); R(10, 4, 1, 1, '#1a1a1a'); R(12, 8, 3, 2, col); }
Object.assign(PROP, {
  wheat: { w: 16, h: 18, draw(g, p, t) { const { R, P } = rr(g), k = Env.harvest; for (let i = 0; i < 4; i++) { const sw = Math.round(Math.sin(t * 2 + i + (p.x || 0)) * 1); R(1 + i * 4 + sw, 4, 1, 13, mix('#8a7430', '#c99a2a', k)); R(i * 4 + sw, 1, 3, 5, mix('#d8b848', '#ffe27a', k)); } } },
  slate: { w: 14, h: 22, sol: [1, 12, 12, 9], draw(g) { const { R, P } = rr(g); R(6, 12, 2, 10, '#6a4a2a'); R(1, 2, 12, 11, '#3a3a4a'); R(2, 3, 10, 9, '#5a5a6e'); for (let i = 0; i < 3; i++) R(3, 4 + i * 3, 3 + (i * 2) % 5, 1, '#e8e0d0'); R(1, 2, 12, 1, '#c9a24b'); outlineCanvas(g.canvas, '#1a1a24'); } },
  silo: { w: 34, h: 56, sol: [2, 22, 30, 30], draw(g) { const { R, P } = rr(g); R(2, 14, 30, 40, '#c9c2b6'); R(2, 14, 4, 40, '#e6e0d4'); R(26, 14, 6, 40, '#a8a196'); for (let y = 18; y < 52; y += 8) R(2, y, 30, 1, '#9a9488'); R(0, 8, 34, 8, '#b84a3a'); R(4, 2, 26, 8, '#d8604a'); R(12, 38, 10, 16, '#6a4a2a'); outlineCanvas(g.canvas, '#2a2218'); } },
  tower5: { w: 56, h: 84, sol: [6, 40, 44, 40], draw(g, p, t) { const { R, P } = rr(g), ok = Env.lineok > 0.5; R(8, 20, 40, 64, '#d0c8dc'); R(8, 20, 40, 3, '#ece6f4'); R(40, 20, 8, 64, '#a89cb8'); for (let y = 28; y < 82; y += 9) R(8, y, 40, 1, '#b4a8c4'); R(4, 14, 48, 8, '#5a4a8a'); R(10, 4, 36, 12, '#7a62b0'); R(22, 0, 12, 6, '#c9a24b'); R(20, 56, 16, 28, '#6a4a2a'); R(21, 57, 14, 27, '#8a6434'); P(33, 72, '#ffd24a'); [[12, 30], [34, 30]].forEach(([x, y]) => { R(x, y, 10, 12, '#4a3a6a'); R(x + 1, y + 1, 8, 10, ok ? '#ffe9a0' : '#a8d4e8'); }); for (let i = 0; i < 6; i++) P(14 + i * 5, 12, ok ? '#ffd24a' : '#8a7a6a'); outlineCanvas(g.canvas, '#241a3a'); } },
  hallbld: { w: 72, h: 62, sol: [0, 20, 72, 36], draw(g) { const { R, P } = rr(g); R(2, 22, 68, 40, '#e4d8c0'); R(2, 22, 68, 3, '#f6ecd6'); R(2, 56, 68, 6, '#b8a888'); for (let i = 0; i < 4; i++) { R(8 + i * 16, 22, 6, 36, '#f6f0e4'); R(6 + i * 16, 22, 10, 3, '#c9a24b'); } R(0, 10, 72, 14, '#c9a24b'); R(6, 4, 60, 10, '#e0c470'); R(28, 36, 16, 26, '#5a3a22'); R(29, 37, 14, 25, '#8a6434'); P(41, 50, '#ffd24a'); outlineCanvas(g.canvas, '#2a2218'); } },
  temple5: { w: 96, h: 78, sol: [0, 24, 96, 46], draw(g, p, t) { const { R, P } = rr(g), ok = Env.balance > 0.5; R(0, 54, 96, 24, '#cfc8bc'); R(4, 22, 88, 36, '#e8e2d6'); R(4, 22, 88, 3, '#fffaf0'); R(0, 14, 96, 10, '#bdb4a4'); R(8, 6, 80, 10, '#d4ccbc'); R(22, 0, 52, 8, '#e8e2d6'); for (let i = 0; i < 6; i++) { R(8 + i * 15, 24, 8, 34, '#faf6ee'); R(8 + i * 15, 24, 2, 34, '#fff'); R(14 + i * 15, 24, 2, 34, '#cfc8bc'); } R(36, 34, 24, 28, '#2a2438'); if (ok) { R(38, 36, 9, 26, '#ffe9a0'); R(49, 36, 9, 26, '#ffe9a0'); } else { R(38, 36, 9, 26, '#6a5a4a'); R(49, 36, 9, 26, '#6a5a4a'); P(46, 50, '#ffd24a'); P(49, 50, '#ffd24a'); } R(42, 8, 12, 6, ok ? '#ffd24a' : '#9a8a6a'); outlineCanvas(g.canvas, '#2a2218'); } },
  sphinx: { w: 48, h: 40, sol: [2, 18, 44, 20], draw(g) { const { R, P } = rr(g); R(2, 22, 44, 16, '#b8b0a2'); R(2, 22, 44, 3, '#d4ccbc'); R(34, 4, 12, 20, '#b8b0a2'); R(36, 0, 8, 8, '#cfc8bc'); R(36, 8, 2, 2, '#ffd24a'); R(42, 8, 2, 2, '#ffd24a'); R(30, 18, 18, 8, '#a49c8e'); R(0, 34, 12, 4, '#a49c8e'); outlineCanvas(g.canvas, '#2a2218'); } },
  catstat: { w: 18, h: 24, sol: [2, 12, 14, 10], draw(g, p) { const { R, P } = rr(g); R(1, 16, 16, 7, '#8a8278'); R(2, 8, 12, 9, '#a09888'); R(3, 4, 10, 6, '#a09888'); R(3, 1, 3, 4, '#a09888'); R(10, 1, 3, 4, '#a09888'); R(5, 6, 1, 1, '#2a2218'); R(10, 6, 1, 1, '#2a2218'); outlineCanvas(g.canvas, '#2a2218'); } },
  tgate: { w: 48, h: 40, draw(g) { const { R, P } = rr(g), ok = Env.gate5 > 0.5; R(0, 6, 8, 34, '#c8c0b2'); R(40, 6, 8, 34, '#c8c0b2'); R(0, 0, 48, 8, '#b4ac9e'); if (!ok) { R(8, 10, 32, 28, '#4a4452'); for (let x = 10; x < 40; x += 5) R(x, 10, 2, 28, '#7a728a'); } outlineCanvas(g.canvas, '#2a2218'); } },
  ledger: { w: 40, h: 36, sol: [0, 20, 40, 14], draw(g) { const { R, P } = rr(g); R(0, 4, 40, 28, '#3a3248'); R(1, 5, 38, 26, '#f0e6cc'); for (let i = 0; i < 5; i++) { R(4, 8 + i * 5, 14, 1, '#6a5a4a'); R(22, 8 + i * 5, 6, 1, '#6a5a4a'); R(31, 8 + i * 5, 5, 1, i % 2 ? '#c0392b' : '#2f8a5a'); } R(18, 32, 4, 4, '#6a4a2a'); outlineCanvas(g.canvas, '#241a3a'); } },
  report: { w: 16, h: 20, draw(g) { const { R, P } = rr(g); R(1, 1, 14, 18, '#f4ecd2'); R(1, 1, 14, 2, '#d8cca4'); for (let i = 0; i < 5; i++) R(3, 5 + i * 3, 10, 1, '#8a7a5a'); R(6, 0, 4, 3, '#c0392b'); outlineCanvas(g.canvas, '#3a2a18'); } },
});
(function () {
  const _key = Props.key.bind(Props), q = (v) => Math.round(v * 10);
  Props.key = function (p, t) {
    switch (p.type) {
      case 'wheat': return 'wh' + q(Env.harvest) + Math.floor(t * 3 + (p.x || 0)) % 3;
      case 'tower5': return 't5' + (Env.lineok > 0.5 ? 1 : 0);
      case 'temple5': return 'tp' + (Env.balance > 0.5 ? 1 : 0);
      case 'tgate': return 'tg' + (Env.gate5 > 0.5 ? 1 : 0);
      case 'slate': case 'silo': case 'hallbld': case 'sphinx': case 'catstat': case 'ledger': case 'report': return p.type;
      default: return _key(p, t);
    }
  };
})();

function buildCity5(R) {
  const border = (m, W, H, ch) => { fillR(m, 0, 0, W, 2, ch); fillR(m, 0, H - 1, W, 1, ch); fillR(m, 0, 0, 1, H, ch); fillR(m, W - 1, 0, 1, H, ch); };
  /* fields (hub) */
  { const W = 46, H = 24, m = grid(W, H, '6'); fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 2, W, 2, 'T');
    fillR(m, 0, 10, W, 3, '9'); fillR(m, 15, 4, 2, 6, '9'); fillR(m, 31, 4, 2, 6, '9'); fillR(m, 22, 13, 2, 9, '9');
    fillR(m, 4, 14, 12, 7, '7'); fillR(m, 26, 14, 14, 7, '7'); fillR(m, 3, 3, 8, 5, '7'); fillR(m, 38, 3, 6, 5, '7'); fillR(m, 22, 23 - 1, 2, 2, '9');
    R.fields = { id: 'fields', city: 5, name: 'room.fields', w: W, h: H, map: m, theme: 'fo', haze: 'harvest', music: 'meadows', light: 0,
      props: [{ type: 'tower5', x: 14.5, y: 1.3, hs: 'tower5' }, { type: 'hallbld', x: 30, y: 1.6 }, { type: 'silo', x: 40, y: 8.2 }, { type: 'slate', x: 10, y: 8.6 }, { type: 'slate', x: 19, y: 8.6 }, { type: 'cart', x: 28, y: 12.6 },
        { type: 'vhouse', x: 4, y: 15.5, c: 'r' }, { type: 'vhouse', x: 38.5, y: 15.8, c: 'y' }, { type: 'ftree', x: 19, y: 16 }, { type: 'ftree', x: 42, y: 20, v: 1 }, { type: 'ftree', x: 1.5, y: 20 }, { type: 'fbush', x: 12, y: 13.6 }, { type: 'fence', x: 20, y: 18 }, { type: 'fence', x: 21, y: 18 }]
        .concat([[4, 4], [6, 5.2], [8, 4.3], [5, 6.3], [27, 15.5], [30, 16.8], [33, 15.4], [36, 17], [29, 19], [34, 19.5], [6, 17.5], [9, 18.8], [12, 17.2], [39, 4.2], [41, 5.6]].map((q, i) => ({ type: 'wheat', x: q[0], y: q[1] }))),
      exits: [
        { x: 0, y: 10, w: 1, h: 3, to: 'greatscale', tx: 24, ty: 9, dir: 'left' },
        { x: 15.2, y: 5.6, w: 1.6, h: 1.4, to: 'tower', tx: 10, ty: 12, need: () => Save.flag('c5s1'), lock: 'lock.tower5', dir: 'up' },
        { x: 31.8, y: 4.9, w: 2.2, h: 1.2, to: 'hall', tx: 12, ty: 12, need: () => Save.flag('c5s2'), lock: 'lock.hall5', dir: 'up' },
        { x: 45, y: 10, w: 1, h: 3, to: 'temple', tx: 3, ty: 13, need: () => Save.flag('c5s3'), lock: 'lock.temple5', dir: 'right' },
      ],
      spots: [{ x: 10, y: 9.6, r: 20, say: 'tile.slate5' }, { x: 19, y: 9.6, r: 20, say: 'tile.slate5' }], spawn: [3, 11.2] }; }
  /* linekeeper's tower */
  { const W = 20, H = 14, m = grid(W, H, '8'); fillR(m, 0, 0, W, 3, 'W'); fillR(m, 0, 0, 1, H, 'W'); fillR(m, W - 1, 0, 1, H, 'W'); fillR(m, 0, H - 1, W, 1, 'W'); fillR(m, 9, H - 1, 2, 1, '8');
    R.tower = { id: 'tower', city: 5, name: 'room.tower', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'cabinet', x: 2, y: 3 }, { type: 'cabinet', x: 16, y: 3 }, { type: 'table', x: 4, y: 8 }, { type: 'table', x: 13, y: 8.5 }, { type: 'rug', x: 7, y: 6.5 }, { type: 'banner', x: 5, y: 0 }, { type: 'banner', x: 13, y: 0 }, { type: 'desklamp', x: 5, y: 7 }],
      exits: [{ x: 9, y: 13, w: 2, h: 1, to: 'fields', tx: 15.9, ty: 8, dir: 'down' }], spots: [], spawn: [10, 12] }; }
  /* hall of errors */
  { const W = 24, H = 14, m = grid(W, H, '8'); fillR(m, 0, 0, W, 3, 'W'); fillR(m, 0, 0, 1, H, 'W'); fillR(m, W - 1, 0, 1, H, 'W'); fillR(m, 0, H - 1, W, 1, 'W'); fillR(m, 11, H - 1, 2, 1, '8');
    R.hall = { id: 'hall', city: 5, name: 'room.hall', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'ledger', x: 4, y: 2.4 }, { type: 'ledger', x: 10, y: 2.4 }, { type: 'ledger', x: 16.5, y: 2.4 }, { type: 'report', x: 21, y: 1.8, hs: 'report' }, { type: 'rug', x: 9, y: 7 }, { type: 'banner', x: 7, y: 0 }, { type: 'banner', x: 14, y: 0 }, { type: 'cabinet', x: 1.5, y: 3 }, { type: 'desklamp', x: 19, y: 8 }, { type: 'table', x: 18.5, y: 8.5 }],
      exits: [{ x: 11, y: 13, w: 2, h: 1, to: 'fields', tx: 32.9, ty: 7.4, dir: 'down' }], spots: [{ x: 21.5, y: 3.4, r: 22, say: 'tile.report5' }], spawn: [12, 12] }; }
  /* temple of balance (front) */
  { const W = 30, H = 18, m = grid(W, H, '8'); border(m, W, H, 'T'); fillR(m, 0, 0, W, 2, 'W'); fillR(m, 0, 0, 2, 0, 'W'); fillR(m, 0, 12, 1, 3, '8'); fillR(m, 14, 0, 3, 2, '8');
    R.temple = { id: 'temple', city: 5, name: 'room.temple', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'tgate', x: 13.5, y: 0.2 }, { type: 'rug', x: 11.5, y: 8.5 }, { type: 'banner', x: 5, y: 0 }, { type: 'banner', x: 24, y: 0 }, { type: 'fbush', x: 3, y: 5 }, { type: 'fbush', x: 25, y: 5, v: 1 }, { type: 'ftree', x: 3, y: 13, v: 1 }, { type: 'ftree', x: 26, y: 13 }, { type: 'stump', x: 7, y: 14 }, { type: 'stump', x: 21, y: 14 }],
      exits: [{ x: 0, y: 12, w: 1, h: 3, to: 'fields', tx: 44, ty: 11.4, dir: 'left' }, { x: 14, y: 1.6, w: 3, h: 1.2, to: 'courtyard', tx: 13, ty: 14, need: () => Save.flag('c5s4'), lock: 'lock.gate5', dir: 'up' }],
      spots: [], spawn: [3, 13.4] }; }
  /* courtyard (boss) */
  { const W = 26, H = 16, m = grid(W, H, '8'); border(m, W, H, 'T'); fillR(m, 0, 0, W, 2, 'W'); fillR(m, 12, H - 1, 2, 1, '8'); fillR(m, W - 1, 6, 1, 5, '9');
    R.courtyard = { id: 'courtyard', city: 5, name: 'room.courtyard', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'temple5', x: 8.5, y: 0 }, { type: 'sphinx', x: 11, y: 5.2 }, { type: 'catstat', x: 4, y: 6 }, { type: 'catstat', x: 6.5, y: 9 }, { type: 'catstat', x: 19, y: 6 }, { type: 'catstat', x: 17, y: 9.5 }, { type: 'catstat', x: 21.5, y: 9 }, { type: 'fbush', x: 2.5, y: 12 }, { type: 'fbush', x: 22, y: 12, v: 1 }],
      exits: [{ x: 12, y: 15, w: 2, h: 1, to: 'temple', tx: 15.5, ty: 3.6, dir: 'down' }, { x: 25, y: 6, w: 1, h: 5, end5: true, need: () => Save.flag('c5boss'), lock: 'lock.path5', dir: 'right' }],
      spots: [], spawn: [13, 14] }; }
}
