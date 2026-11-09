'use strict';
/* ===== world2.js: city 2 (Model Workshop) tiles, props and rooms ===== */
SOLID.r = 1;
const C2T = { q: 1, r: 1, a: 1 };
(function () {
  const _get = Tiles.get.bind(Tiles), _make = Tiles.make.bind(Tiles);
  Tiles.get = function (ch, x, y, theme) {
    if (!C2T[ch]) return _get(ch, x, y, theme);
    const v = Math.floor(hash(x, y, 1) * 4), key = 'c2' + ch + v + '_' + Math.round(Env.crystal * 6);
    if (!this.cache[key]) this.cache[key] = this.make2(ch, x, y, v);
    return this.cache[key];
  };
  Tiles.make2 = function (ch, x, y, v) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g), k = Env.crystal;
    if (ch === 'q') {
      R(0, 0, 16, 16, mix('#7f7c86', '#a39d8e', k));
      for (let i = 0; i < 7; i++) { const px = Math.floor(hash(x, y, i + 5) * 15), py = Math.floor(hash(x, y, i + 9) * 15); P(px, py, i % 2 ? mix('#6c6974', '#8c8676', k) : mix('#95929c', '#c2bba8', k)); }
      if (v === 1) { R(4, 9, 3, 2, mix('#6c6974', '#8c8676', k)); }
      if (v === 3) { const cols = ['#e0405a', '#37b86a', '#4a7ae0']; P(11, 5, mix('#8a8a9a', cols[(x + y) % 3], k)); P(11, 4, mix('#9a9aaa', '#ffffff', k * 0.7)); }
    } else if (ch === 'r') {
      R(0, 0, 16, 16, '#3b3648'); R(0, 0, 16, 3, '#57516a'); R(0, 7, 16, 1, '#2c2838'); R(5, 3, 1, 4, '#2c2838'); R(11, 8, 1, 8, '#2c2838'); R(2, 8, 1, 8, '#2c2838');
      P(3, 1, '#7a738f'); P(9, 4, '#4a445c'); P(13, 11, '#4a445c');
      if (v === 2) { const cols = ['#e0405a', '#37b86a', '#4a7ae0']; P(8, 12, mix('#6a6a7a', cols[(x + y) % 3], k)); P(8, 11, mix('#7a7a8a', '#ffffff', k * 0.6)); }
    } else if (ch === 'a') {
      const alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#d9cde6' : '#e6dcef'); R(0, 0, 16, 1, '#c3b5d4'); R(0, 0, 1, 16, '#c3b5d4'); if (v === 0) { P(5, 5, '#ffffff'); P(6, 6, '#ffffff'); }
    }
    return c;
  };
})();

/* ---------- props ---------- */
const GEM = { ruby: '#e0405a', emerald: '#37b86a', sapphire: '#4a7ae0', amethyst: '#a45ad8' };
function gemShard(R, P, x, y, w, h, col, k) {
  const base = mix('#7d7a88', col, k), lit = mix('#9a98a6', shade(col, 0.45), k);
  R(x, y + 2, w, h - 2, base); R(x + 1, y, w - 2, 3, base); R(x + 1, y + 1, 1, h - 3, lit); P(x + 1, y + 1, mix('#b0aebb', '#ffffff', k));
  R(x + w - 1, y + 3, 1, h - 4, shade(base, -0.3));
}
Object.assign(PROP, {
  workshop: { w: 80, h: 64, sol: [0, 0, 80, 46], draw(g, p, t) {
    const { R, P } = rr(g), e = Env.engine, lit = Math.max(e, Env.crystal * 0.5);
    R(2, 22, 76, 42, '#cdbf9e'); R(2, 22, 76, 3, '#e6dbbc'); R(2, 56, 76, 8, '#a39673'); R(76, 22, 2, 42, '#a39673');
    for (let y = 0; y < 22; y++) { const ins = Math.max(0, 8 - y); R(ins, y, 80 - ins * 2, 1, y % 4 === 3 ? '#2f5f6c' : (y % 4 === 0 ? '#6fb0bb' : '#478693')); }
    R(0, 20, 80, 3, '#2a4e58');
    R(60, 0, 8, 12, '#6a6a7a'); R(60, 0, 8, 2, '#8a8a9c'); R(62, 2, 4, 10, '#55556a');
    R(34, 3, 12, 14, '#2a4e58'); R(36, 5, 8, 10, mix('#3a6a78', '#a8f4ff', lit)); R(39, 3, 2, 14, '#2a4e58'); R(34, 9, 12, 2, '#2a4e58');
    [[8, 30], [58, 30]].forEach(([x, y]) => { R(x, y, 14, 12, '#7a6a4a'); R(x + 1, y + 1, 12, 10, mix('#2a4a52', '#bff6ff', Math.max(lit * 0.9, 0.2))); R(x + 6, y + 1, 1, 10, '#7a6a4a'); });
    R(31, 36, 18, 28, '#7a6a4a'); R(32, 37, 16, 27, mix('#5a3a28', '#2c8a7a', e)); R(32, 37, 16, 2, '#ffffff22'); R(39, 37, 2, 27, '#4a3a28');
    R(37, 44, 6, 7, e > 0.5 ? '#bffff0' : '#ffb0a0'); P(39, 46, '#fff'); P(40, 47, '#fff');
    if (e > 0.5) R(33, 40, 14, 24, 'rgba(180,255,240,0.2)');
    [[4, 44], [68, 44]].forEach(([x, y]) => { gemShard(R, P, x, y, 6, 10, '#4a7ae0', Env.crystal); });
    outlineCanvas(g.canvas, '#1d2a30'); } },
  academy: { w: 96, h: 72, sol: [0, 0, 96, 54], draw(g, p, t) {
    const { R, P } = rr(g), o = Env.acadOpen, done = Env.academy;
    R(2, 26, 92, 46, '#e6dcf0'); R(2, 26, 92, 3, '#ffffff'); R(2, 64, 92, 8, '#b8a8cc'); R(92, 26, 2, 46, '#b8a8cc');
    for (let y = 0; y < 26; y++) { const ins = Math.max(0, 10 - y); R(ins, y, 96 - ins * 2, 1, y % 4 === 3 ? '#4a2f78' : (y % 4 === 0 ? '#8a6ac0' : '#6a4aa0')); }
    R(0, 24, 96, 3, '#c9a24b'); R(0, 24, 96, 1, '#ffe9a0');
    R(40, 4, 16, 16, '#c9a24b'); R(42, 6, 12, 12, mix('#3a2a5a', done > 0.5 ? '#7fffd0' : '#ffd96b', 0.9)); R(47, 8, 2, 8, '#c9a24b'); R(44, 11, 8, 2, '#c9a24b');
    [10, 28, 60, 78].forEach((x) => { R(x, 30, 8, 34, '#f5eefa'); R(x, 30, 8, 3, '#c9a24b'); R(x + 6, 33, 2, 31, '#cfc2de'); R(x - 1, 62, 10, 3, '#c9a24b'); });
    R(36, 40, 24, 32, '#4a2f78'); R(37, 41, 22, 31, mix('#5a3a28', done > 0.5 ? '#2c8a7a' : '#8a5ac0', Math.max(o, done))); R(47, 41, 2, 31, '#c9a24b'); R(36, 40, 24, 2, '#c9a24b');
    if (o > 0.5) R(38, 44, 20, 28, 'rgba(255,240,180,0.22)');
    outlineCanvas(g.canvas, '#241a3a'); } },
  crystal: { w: 20, h: 22, sol: [3, 12, 14, 9], draw(g, p, t) {
    const { R, P } = rr(g), k = Env.crystal, col = GEM[p.col || 'sapphire'], tw = Math.floor(t * 3);
    gemShard(R, P, 2, 8, 6, 13, col, k); gemShard(R, P, 7, 2, 7, 19, col, k); gemShard(R, P, 13, 9, 5, 12, col, k);
    if (k > 0.5) { const sp = [[3, 6], [10, 1], [16, 7], [8, 14]][tw % 4]; P(sp[0], sp[1], '#ffffff'); P(sp[0] - 1, sp[1], '#ffffff88'); P(sp[0] + 1, sp[1], '#ffffff88'); }
    outlineCanvas(g.canvas, '#22202e'); } },
  rock: { w: 18, h: 14, sol: [1, 5, 16, 9], draw(g) { const { R, P } = rr(g); R(2, 4, 14, 9, '#6d6a78'); R(4, 2, 10, 4, '#7d7a88'); R(3, 4, 6, 3, '#8d8a98'); R(10, 9, 5, 4, '#5a5766'); P(6, 3, '#a8a5b4'); outlineCanvas(g.canvas, '#22202e'); } },
  minecart: { w: 30, h: 20, sol: [1, 7, 28, 12], draw(g, p) {
    const { R, P } = rr(g), k = Env.crystal; R(2, 8, 26, 9, '#6a5a52'); R(2, 8, 26, 2, '#8a766a'); R(2, 15, 26, 2, '#4a3a34');
    [['#e0405a', 4], ['#37b86a', 11], ['#4a7ae0', 18]].forEach(([c, x]) => { R(x, 3, 6, 6, mix('#7d7a88', c, k)); P(x + 1, 4, mix('#aaaab5', '#fff', k)); }); R(7, 17, 5, 3, '#2a2530'); R(19, 17, 5, 3, '#2a2530');
    outlineCanvas(g.canvas, '#22202e'); } },
  chamber: { w: 28, h: 42, sol: [1, 20, 26, 20], draw(g, p, t) {
    const { R, P } = rr(g), fr = { train: '#4a7ae0', practice: '#e0b84a', test: '#d94a4a' }[p.kind], sealed = p.kind === 'test', k = Env.crystal, done = Env.academy;
    R(2, 28, 24, 12, '#6a6f85'); R(2, 28, 24, 2, '#9298b0'); R(2, 38, 24, 3, '#4d5168');
    R(4, 4, 20, 26, mix('#a8c8e0', '#d8f4ff', 0.4)); R(5, 5, 18, 24, mix('#2a3550', '#4a7a98', 0.35 + k * 0.2));
    R(2, 2, 24, 3, fr); R(2, 29, 24, 2, fr); R(2, 2, 3, 28, fr); R(23, 2, 3, 28, fr);
    const inside = p.kind === 'train' ? [['#e0405a', 7, 20], ['#37b86a', 12, 16], ['#e0405a', 16, 21], ['#37b86a', 9, 12], ['#e0405a', 14, 10]] : p.kind === 'practice' ? [['#e0405a', 9, 18], ['#37b86a', 15, 15]] : [['#e0405a', 8, 17], ['#37b86a', 13, 19], ['#e0405a', 16, 14]];
    inside.forEach(([c, x, y]) => { R(x, y, 4, 6, mix('#7d7a88', c, Math.max(0.3, k))); P(x + 1, y + 1, '#ffffffcc'); });
    if (sealed) { const pulse = 0.5 + Math.sin(t * 3) * 0.25, col = done > 0.5 ? '#6fffc8' : mix('#7a1f1f', '#ff5a4a', Env.seal * pulse + (1 - Env.seal) * 0.2); R(8, 22, 12, 9, '#2a2a38'); R(9, 23, 10, 7, col); R(11, 18, 6, 5, '#4a4a58'); R(12, 19, 4, 4, '#2a2a38'); P(13, 26, '#fff'); P(14, 26, '#fff'); }
    outlineCanvas(g.canvas, '#1d1526'); } },
  engine: { w: 48, h: 58, sol: [2, 24, 44, 32], draw(g, p, t) {
    const { R, P } = rr(g), e = Env.engine, gold = Env.academy;
    const flick = e > 0.9 ? 1 : (Math.sin(t * 17) > 0.2 || Math.sin(t * 9) > 0.7 ? 0.7 : 0.1);
    R(2, 28, 44, 30, '#7e8aa6'); R(2, 28, 44, 3, '#a9b5d0'); R(2, 52, 44, 6, '#5a6680');
    R(6, 14, 36, 16, '#6a7690'); R(10, 4, 28, 14, '#3a4560');
    R(12, 6, 24, 22, '#9fd0e0'); R(13, 7, 22, 20, mix('#14203a', gold > 0.5 ? '#ffd96b' : '#6ff3ff', 0.25 + 0.6 * flick * (0.4 + 0.6 * Math.max(e, 0.25))));
    for (let i = 0; i < 5; i++) { const hgt = 3 + ((i * 5 + Math.floor(t * (e > 0.9 ? 5 : 11))) % 9) * (e > 0.9 ? 1 : flick > 0.5 ? 1 : 0.3); R(15 + i * 4, 26 - hgt, 3, hgt, gold > 0.5 ? '#fff3b0' : '#e9ffff'); }
    [[6, 36], [18, 36], [30, 36]].forEach(([x, y], i) => { R(x, y, 10, 10, '#3a4560'); R(x + 1, y + 1, 8, 8, '#232b44'); P(x + 4, y + 4, e > 0.9 ? '#7fe08a' : (flick > 0.5 ? '#ffb347' : '#ff6b6b')); });
    R(40, 34, 4, 14, '#e0b84a'); R(40, 34, 4, 2, '#fff3b0');
    if (e < 0.9 && flick > 0.6) { P(11, 3, '#ffe9a0'); P(36, 5, '#ffe9a0'); P(24, 1, '#ffffff'); }
    outlineCanvas(g.canvas, '#1d1526'); } },
  pillar: { w: 14, h: 44, sol: [2, 34, 10, 9], draw(g) { const { R, P } = rr(g); R(2, 4, 10, 34, '#f5eefa'); R(2, 4, 10, 3, '#c9a24b'); R(0, 0, 14, 5, '#c9a24b'); R(1, 38, 12, 5, '#c9a24b'); R(9, 7, 2, 31, '#cfc2de'); R(4, 10, 1, 26, '#ffffff'); outlineCanvas(g.canvas, '#241a3a'); } },
  bench: { w: 34, h: 18, sol: [0, 6, 34, 11], draw(g) { const { R } = rr(g); R(0, 5, 34, 6, '#8a5a8a'); R(0, 5, 34, 2, '#b07ab0'); R(2, 11, 4, 7, '#5a3a5a'); R(28, 11, 4, 7, '#5a3a5a'); R(0, 0, 34, 4, '#6a4a7a'); outlineCanvas(g.canvas, '#241a3a'); } },
  bigbanner: { w: 64, h: 34, sol: null, draw(g, p, t) {
    const { R, P } = rr(g), d = Env.academy; const bg = d > 0.5 ? '#1f7f6f' : '#a8203a', bg2 = d > 0.5 ? '#2fbf9f' : '#e0405a';
    R(0, 0, 64, 3, '#c9a24b'); R(2, 3, 60, 24, bg); R(2, 3, 60, 2, bg2); R(2, 24, 6, 9, bg); R(56, 24, 6, 9, bg); R(8, 24, 6, 6, bg);
    for (let i = 0; i < 9; i++) R(6 + i * 6, 9, 3, 1, '#ffe9a0'), R(6 + i * 6, 12, 3, 1, '#ffe9a0');
    if (d > 0.5) { R(28, 16, 3, 3, '#ffffff'); R(30, 18, 3, 3, '#ffffff'); R(33, 16, 3, 3, '#ffffff'); R(35, 14, 3, 3, '#ffffff'); }
    else { const sx = 32, sy = 18; R(sx - 1, sy - 4, 3, 9, '#ffe9a0'); R(sx - 4, sy - 1, 9, 3, '#ffe9a0'); P(sx - 2, sy - 2, '#ffe9a0'); P(sx + 2, sy - 2, '#ffe9a0'); P(sx - 2, sy + 2, '#ffe9a0'); P(sx + 2, sy + 2, '#ffe9a0'); }
    outlineCanvas(g.canvas, '#241a3a'); } },
  answerkey: { w: 12, h: 14, sol: [1, 6, 10, 7], draw(g) { const { R, P } = rr(g); R(1, 4, 10, 9, '#f3ead0'); R(1, 4, 1, 9, '#c9a24b'); R(3, 6, 6, 1, '#6b4a2a'); R(3, 8, 5, 1, '#6b4a2a'); R(3, 10, 6, 1, '#6b4a2a'); R(8, 0, 3, 5, '#d94a4a'); outlineCanvas(g.canvas, '#241a3a'); } },
});
(function () {
  const _key = Props.key.bind(Props), _solid = Props.solid.bind(Props), q = (v) => Math.round(v * 10);
  Props.key = function (p, t) {
    switch (p.type) {
      case 'workshop': return 'wk' + q(Env.engine) + q(Env.crystal);
      case 'academy': return 'ac' + q(Env.acadOpen) + q(Env.academy);
      case 'crystal': return 'cy' + (p.col || '') + q(Env.crystal) + Math.floor(t * 3);
      case 'chamber': return 'cb' + p.kind + q(Env.seal) + q(Env.crystal) + q(Env.academy) + Math.floor(t * 4);
      case 'engine': return 'en' + q(Env.engine) + q(Env.academy) + (Env.engine > 0.9 ? Math.floor(t * 5) : Math.floor(t * 14));
      case 'minecart': return 'mc' + q(Env.crystal);
      case 'bigbanner': return 'bb' + q(Env.academy);
      default: return _key(p, t);
    }
  };
  Props.solid = function (p) {
    if (p.type === 'workshop') return [[p.x * TS, p.y * TS, 80, 46], [p.x * TS, p.y * TS + 46, 30, 18], [p.x * TS + 50, p.y * TS + 46, 30, 18]];
    if (p.type === 'academy') return [[p.x * TS, p.y * TS, 96, 54], [p.x * TS, p.y * TS + 54, 36, 18], [p.x * TS + 60, p.y * TS + 54, 36, 18]];
    return _solid(p);
  };
})();

/* ---------- rooms ---------- */
function buildCity2(R) {
  /* ---- quarry (outdoor hub of the Model Workshop) ---- */
  { const W = 34, H = 24, m = grid(W, H, 'q'); fillR(m, 0, 0, W, 4, 'r'); fillR(m, 0, H - 2, W, 2, 'r'); fillR(m, W - 2, 0, 2, H, 'r'); fillR(m, 0, 0, 1, 8, 'r'); fillR(m, 0, 16, 1, H - 16, 'r');
    fillR(m, 0, 11, 14, 2, '='); fillR(m, 13, 7, 2, 6, '='); fillR(m, 14, 11, 12, 2, '='); fillR(m, 24, 7, 2, 6, '='); fillR(m, 26, 11, 6, 2, 'L'); fillR(m, 31, 11, 2, 2, 'L');
    R.quarry = { id: 'quarry', city: 2, name: 'room.quarry', w: W, h: H, map: m, theme: 'qy', haze: 'crystal', music: 'meadows', light: 0,
      props: [
        { type: 'workshop', x: 11, y: 3 }, { type: 'academy', x: 22, y: 2 },
        { type: 'crystal', x: 4, y: 5, col: 'sapphire' }, { type: 'crystal', x: 7, y: 6, col: 'ruby' }, { type: 'crystal', x: 3, y: 15, col: 'emerald' }, { type: 'crystal', x: 6, y: 18, col: 'sapphire' },
        { type: 'crystal', x: 19, y: 15, col: 'ruby' }, { type: 'crystal', x: 29, y: 16, col: 'emerald' }, { type: 'crystal', x: 30, y: 6, col: 'sapphire' }, { type: 'crystal', x: 18, y: 19, col: 'amethyst' },
        { type: 'rock', x: 9, y: 9 }, { type: 'rock', x: 17, y: 8 }, { type: 'rock', x: 21, y: 18 }, { type: 'rock', x: 12, y: 19 }, { type: 'rock', x: 28, y: 9 },
        { type: 'minecart', x: 21, y: 14, hs: 'cart2' }, { type: 'minecart', x: 8, y: 14 },
        { type: 'lantern', x: 12, y: 10 }, { type: 'lantern', x: 16, y: 10 }, { type: 'lantern', x: 23, y: 10 }, { type: 'lantern', x: 27, y: 10 },
        { type: 'sign', x: 9, y: 12, hs: 'sign2' },
      ],
      exits: [
        { x: 0, y: 11, w: 1, h: 2, to: 'yard', tx: 27.6, ty: 12.8, dir: 'left' },
        { x: 12.6, y: 6.1, w: 2.4, h: 1.6, to: 'workshop', tx: 10.5, ty: 14, dir: 'up' },
        { x: 24, y: 5.4, w: 2.4, h: 1.2, to: 'academy', tx: 11, ty: 16, need: () => Save.flag('c2engine'), lock: 'lock.acad', dir: 'up' },
        { x: 31.2, y: 11, w: 0.8, h: 2, end2: true, need: () => Save.flag('c2boss'), lock: 'lock.path2', dir: 'right' },
      ],
      spots: [{ x: 14, y: 6.2, r: 22, say: 'tile.mark2' }, { x: 9.5, y: 12.4, r: 16, say: 'tile.sign2' }],
      spawn: [4, 12.4],
    }; }
  /* ---- workshop interior ---- */
  { const W = 22, H = 16, m = grid(W, H, '_'); fillR(m, 0, 0, W, 3, 'W'); fillR(m, 0, 0, 1, H, 'W'); fillR(m, W - 1, 0, 1, H, 'W'); fillR(m, 0, H - 1, W, 1, 'W'); fillR(m, 10, H - 1, 2, 1, '_');
    R.workshop = { id: 'workshop', city: 2, name: 'room.workshop', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [
        { type: 'rug', x: 9, y: 8 }, { type: 'engine', x: 9.5, y: 1, hs: 'engine' },
        { type: 'chamber', x: 3, y: 3, kind: 'train', hs: 'cTrain' }, { type: 'chamber', x: 6, y: 3, kind: 'practice', hs: 'cPractice' }, { type: 'chamber', x: 16, y: 3, kind: 'test', hs: 'cTest' },
        { type: 'banner', x: 2, y: 0 }, { type: 'banner', x: 8, y: 0 }, { type: 'banner', x: 14, y: 0 }, { type: 'banner', x: 19, y: 0 },
        { type: 'cabinet', x: 18, y: 7 }, { type: 'table', x: 3, y: 9 }, { type: 'table', x: 16, y: 11 }, { type: 'desk', x: 3, y: 12 }, { type: 'desklamp', x: 4, y: 11 },
        { type: 'crystal', x: 19, y: 12, col: 'ruby' }, { type: 'crystal', x: 1, y: 7, col: 'emerald' },
      ],
      exits: [{ x: 10, y: 15, w: 2, h: 1, to: 'quarry', tx: 13.8, ty: 8.2, dir: 'down' }],
      spots: [{ x: 9.5, y: 2.6, r: 20, say: 'tile.engine' }, { x: 5, y: 7, r: 16, say: 'tile.chambers' }, { x: 17, y: 6.6, r: 16, say: 'tile.testchamber' }],
      spawn: [10.5, 14],
    }; }
  /* ---- gem academy (boss) ---- */
  { const W = 22, H = 18, m = grid(W, H, 'a'); fillR(m, 0, 0, W, 3, 'W'); fillR(m, 0, 0, 1, H, 'W'); fillR(m, W - 1, 0, 1, H, 'W'); fillR(m, 0, H - 1, W, 1, 'W'); fillR(m, 10, H - 1, 2, 1, 'a');
    R.academy = { id: 'academy', city: 2, name: 'room.academy', w: W, h: H, map: m, theme: 'acad', music: 'meadows', light: 0,
      props: [
        { type: 'bigbanner', x: 9, y: 0 }, { type: 'pillar', x: 3, y: 1 }, { type: 'pillar', x: 17, y: 1 }, { type: 'pillar', x: 3, y: 8 }, { type: 'pillar', x: 17, y: 8 },
        { type: 'bench', x: 5, y: 11 }, { type: 'bench', x: 13, y: 11 }, { type: 'bench', x: 5, y: 14 }, { type: 'bench', x: 13, y: 14 },
        { type: 'answerkey', x: 12, y: 6, vis: () => !Save.flag('c2boss') }, { type: 'rug', x: 8, y: 7 },
        { type: 'crystal', x: 1, y: 13, col: 'amethyst' }, { type: 'crystal', x: 19, y: 13, col: 'amethyst' },
      ],
      exits: [{ x: 10, y: 17, w: 2, h: 1, to: 'quarry', tx: 25.2, ty: 8.0, dir: 'down' }],
      spots: [],
      spawn: [11, 16],
    }; }
}
