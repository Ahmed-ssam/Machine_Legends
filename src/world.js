'use strict';
/* ===== world.js: tiles, props, rooms. The world reacts to story flags through Env. ===== */
const TS = 16;
function hash(x, y, k) { let h = (x * 374761393 + y * 668265263 + (k || 0) * 2147483647) | 0; h = (h ^ (h >> 13)) * 1274126177 | 0; return ((h ^ (h >> 16)) >>> 0) / 4294967295; }

/* ---------- environment state (eases toward story flags) ---------- */
const Env = {
  bloom: 0.12, target: 0.12, gate: 0, fruit: 0, door: 0, stairs: 0, lantern: 0, lab: 0, sq1: 0, sq2: 0, sq3: 0, path: 0, trained: 0, tint: 0, crystal: 0.1, engine: 0, seal: 0, academy: 0, acadOpen: 0,
  sync(snap) {
    const f = (k) => Save.d && Save.d.flags[k] ? 1 : 0;
    const c2 = Room.cur && Room.cur.city === 2;
    this.target = c2 ? 0.8 : Math.min(1, 0.12 + 0.22 * f('gateOpen') + 0.26 * f('scene2') + 0.14 * f('scene3') + 0.26 * f('bossDone'));
    this.T = { gate: f('gateOpen'), fruit: f('scene2'), door: f('doorOpen'), stairs: f('archiveOpen'), lantern: f('bossDone'), lab: f('scene4'), sq1: f('sq1'), sq2: f('sq2'), sq3: f('sq3'), path: f('bossDone'), trained: f('trained'), crystal: Math.min(1, 0.1 + 0.18 * (f('c2s1') + f('c2s2') + f('c2s3') + f('c2s4')) + 0.18 * f('c2boss')), engine: f('c2engine'), seal: f('c2s1'), academy: f('c2boss'), acadOpen: f('c2engine') };
    if (snap) { this.bloom = this.target; for (const k in this.T) this[k] = this.T[k]; }
  },
  update(dt) {
    const e = (a, b, r) => (Math.abs(a - b) < 0.002 ? b : a + (b - a) * Math.min(1, dt * r));
    this.bloom = e(this.bloom, this.target, 1.1);
    if (this.T) for (const k in this.T) this[k] = e(this[k], this.T[k], k === 'gate' ? 1.6 : 1.4);
  },
};

/* ---------- ground tiles ---------- */
/* anime colour grade: shadows slide toward violet, lights toward warm cream, colours get a little more vivid; keeps tiles/props in the same palette family as the characters */
const Grade = {
  apply(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, im = g.getImageData(0, 0, W, H), d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue; let r = d[i], gg = d[i + 1], b = d[i + 2]; const l = (r * 0.3 + gg * 0.59 + b * 0.11) / 255;
      r = l * 255 + (r - l * 255) * 1.14; gg = l * 255 + (gg - l * 255) * 1.14; b = l * 255 + (b - l * 255) * 1.14;
      if (l < 0.46) { const k = (0.46 - l) / 0.46 * 0.3; r += (88 - r) * k; gg += (46 - gg) * k; b += (50 - b) * k; }
      else if (l > 0.66) { const k = Math.min(1, (l - 0.66) / 0.34) * 0.2; r += (255 - r) * k; gg += (240 - gg) * k; b += (190 - b) * k; }
      d[i] = Math.max(0, Math.min(255, r)); d[i + 1] = Math.max(0, Math.min(255, gg)); d[i + 2] = Math.max(0, Math.min(255, b));
    }
    g.putImageData(im, 0, 0); return c;
  },
};
const SOLID = { T: 1, F: 1, '~': 1, W: 1 };
const Tiles = {
  cache: {},
  get(ch, x, y, theme) {
    const b = Math.round(Env.bloom * 12), v = Math.floor(hash(x, y, 1) * 4);
    let fr = 0; if (ch === '~') fr = Math.floor(Date.now() / 450) % 2;
    const key = ch + v + '_' + b + '_' + fr + (ch === 'F' ? this.fenceKey(x, y) : '') + (ch === 'L' ? Math.round(Env.path * 4) : '') + (ch === 'W' || ch === 's' || ch === '_' ? theme : '');
    if (!this.cache[key]) this.cache[key] = Grade.apply(this.make(ch, x, y, v, Env.bloom, fr, theme));
    return this.cache[key];
  },
  fenceKey(x, y) { const m = Room.cur && Room.cur.map; return m ? ((m[y] && m[y][x - 1] === 'F' ? 'l' : '') + (m[y] && m[y][x + 1] === 'F' ? 'r' : '')) : ''; },
  make(ch, x, y, v, b, fr, theme) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g);
    const gb = mix('#8aa95a', '#74bd42', b), gd = mix('#6c8c4a', '#4e9a34', b), gl = mix('#a9c070', '#9cdc58', b);
    const grass = () => { R(0, 0, 16, 16, gb); for (let i = 0; i < 3; i++) { const px = 1 + Math.floor(hash(x, y, i + 5) * 13), py = 2 + Math.floor(hash(x, y, i + 9) * 12); P(px, py, gd); P(px - 1, py + 1, gd); P(px + 1, py + 1, gd); P(px, py - 1, gl); } for (let i = 0; i < 3; i++) P(Math.floor(hash(x, y, i + 21) * 15), Math.floor(hash(x, y, i + 25) * 15), gl); if (v === 1) { P(5, 6, gd); P(6, 5, gd); P(7, 6, gd); } if (v === 3) { P(11, 10, gl); P(12, 9, gl); P(13, 10, gl); } };
    if (ch === '.' || ch === ',') {
      grass();
      if (ch === ',') {
        const cols = ['#ff7aa8', '#ffe066', '#ffffff', '#8fb8ff'];
        [[3, 4], [10, 9], [6, 12]].forEach(([fx, fy], i) => {
          if (b < 0.4) { R(fx, fy, 1, 3, '#7a6a45'); P(fx + 1, fy, '#7a6a45'); }
          else { const cc = cols[(v + i) % 4]; R(fx, fy + 1, 1, 3, '#3f8a3a'); P(fx - 1, fy, cc); P(fx + 1, fy, cc); P(fx, fy - 1, cc); P(fx, fy + 1 - 1, '#ffd24a'); P(fx, fy, '#ffd24a'); }
        });
      }
    } else if (ch === '=' || ch === 'L') {
      const base = ch === 'L' ? '#6a6f85' : '#cdb78c', dk = ch === 'L' ? '#4d5168' : '#b59d72', lt = ch === 'L' ? '#8a90a8' : '#e0cda4';
      R(0, 0, 16, 16, dk);
      const st = [[0, 0, 7, 7], [8, 0, 8, 6], [0, 8, 6, 8], [7, 7, 9, 9]];
      st.forEach(([sx, sy, sw, sh], i) => { const o = (v + i) % 2; R(sx + 1, sy + 1, sw - 1, sh - 1, o ? base : mix(base, lt, 0.4)); R(sx + 1, sy + 1, sw - 1, 1, lt); });
      if (ch === 'L') { const k = Env.path; const glow = mix('#4d5168', '#6ff3ff', k); R(5, 5, 6, 6, k > 0.05 ? mix('#6a6f85', '#2a8f9b', k) : '#6a6f85'); R(6, 6, 4, 4, glow); P(7, 7, k > 0.5 ? '#e9ffff' : glow); P(8, 8, k > 0.5 ? '#e9ffff' : glow); }
    } else if (ch === 'T') {
      grass(); const d = mix('#4a5738', '#2f7f3b', b), m = mix('#5d6b45', '#3f9f4a', b), l = mix('#7a8a58', '#62c25a', b);
      R(1, 2, 14, 13, d); R(2, 1, 12, 14, d); R(2, 2, 10, 9, m); R(3, 3, 5, 4, l); P(10, 5, l); P(7, 9, l); R(11, 8, 3, 5, d); R(1, 13, 14, 2, shade(d, -0.3)); P(5, 8, d); P(9, 3, d);
      outlineCanvas(c, '#1f3a22');
    } else if (ch === 'f') {
      const soil = mix('#a38c62', '#7a5530', b); R(0, 0, 16, 16, soil);
      for (let r = 0; r < 4; r++) R(0, r * 4 + 2, 16, 1, mix('#8b7650', '#5e3f22', b));
      if (b < 0.55) { P(3, 5, '#6b5a3a'); P(4, 6, '#6b5a3a'); P(10, 9, '#6b5a3a'); P(11, 10, '#6b5a3a'); P(7, 13, '#6b5a3a'); P(6, 3, '#6b5a3a'); }
      else { const k = Math.min(1, (b - 0.55) / 0.35); [[3, 1], [9, 1], [3, 9], [9, 9]].forEach(([cx, cy]) => { const h = Math.round(2 + 3 * k); R(cx + 1, cy + 5 - h, 1, h, '#3f9f4a'); P(cx, cy + 5 - h, '#63c056'); P(cx + 2, cy + 5 - h, '#63c056'); if (k > 0.8) { P(cx + 1, cy + 3 - h, '#ff6b4a'); } }); }
    } else if (ch === '~') {
      R(0, 0, 16, 16, '#3a7fd0'); R(0, 0, 16, 3, '#4a92e0'); const o = fr ? 3 : 0;
      R(2 + o, 6, 5, 1, '#8fc5ff'); R(9 - o, 11, 5, 1, '#8fc5ff'); R(5 + o, 14, 3, 1, '#6aaaf0'); P(12, 4, '#cfe6ff');
    } else if (ch === 'F') {
      grass(); const k = this.fenceKey(x, y);
      R(0, 6, 16, 2, '#a9743d'); R(0, 6, 16, 1, '#c9955a'); R(0, 10, 16, 2, '#a9743d'); R(0, 10, 16, 1, '#c9955a');
      R(6, 3, 4, 12, '#8a5a2c'); R(6, 3, 4, 1, '#c9955a'); R(9, 3, 1, 12, '#6a4220'); P(7, 2, '#8a5a2c'); P(8, 2, '#8a5a2c');
      if (k.indexOf('l') < 0) R(0, 6, 3, 6, 'rgba(0,0,0,0)');
    } else if (ch === '_') {
      const lab = theme === 'lab'; R(0, 0, 16, 16, lab ? '#b8c4d4' : '#b98c58');
      if (lab) { R(0, 0, 16, 1, '#a0adc0'); R(0, 0, 1, 16, '#a0adc0'); R(8, 8, 8, 8, '#c5d0df'); P(3, 4, '#ffffff'); }
      else { R(0, 5, 16, 1, '#9a7243'); R(0, 11, 16, 1, '#9a7243'); R((v * 5) % 14, 2, 1, 3, '#9a7243'); }
    } else if (ch === 's') {
      R(0, 0, 16, 16, '#3a3550'); R(0, 0, 16, 1, '#2c2840'); R(0, 0, 1, 16, '#2c2840'); R(8, 8, 8, 8, '#413b5a'); if (v === 0) { P(4, 4, '#6a5fa0'); P(5, 5, '#6a5fa0'); } if (v === 2) { P(11, 11, '#6a5fa0'); }
    } else if (ch === 'W') {
      if (theme === 'lab') { R(0, 0, 16, 16, '#8fa3bf'); R(0, 0, 16, 2, '#a8bad2'); R(0, 14, 16, 2, '#6d819c'); R(0, 7, 16, 1, '#7a8eaa'); R(7, 0, 1, 16, '#7a8eaa'); P(3, 3, '#cfe0f5'); }
      else { R(0, 0, 16, 16, '#2b2640'); R(0, 7, 16, 1, '#1d1a30'); R(7, 0, 1, 7, '#1d1a30'); R(3, 8, 1, 8, '#1d1a30'); R(11, 8, 1, 8, '#1d1a30'); P(2, 2, '#443d66'); P(10, 11, '#443d66'); }
    } else if (ch === 'c') {
      R(0, 0, 16, 16, '#7a3a52'); R(0, 0, 16, 2, '#c9a24b'); R(0, 14, 16, 2, '#c9a24b'); P(7, 7, '#d9a24b'); P(8, 8, '#d9a24b');
    } else { R(0, 0, 16, 16, '#000'); }
    return c;
  },
};

/* ---------- props ---------- */
function house(g, col) {
  const { R, P } = rr(g), roof = { red: '#c8463c', blue: '#3f6fc0', green: '#3a9a6a' }[col] || '#c8463c', rl = shade(roof, 0.28), rd = shade(roof, -0.3);
  R(4, 22, 40, 26, '#f1e4c4'); R(4, 22, 40, 2, '#d9c9a2'); R(4, 40, 40, 8, '#cfbe97'); R(4, 22, 2, 26, '#cfbe97'); R(42, 22, 2, 26, '#b9a77f');
  for (let y = 0; y < 22; y++) { const ins = Math.max(0, 10 - y); R(ins, y, 48 - ins * 2, 1, y % 4 === 3 ? rd : (y % 4 === 0 ? rl : roof)); }
  R(0, 20, 48, 3, rd); R(0, 20, 48, 1, rl);
  for (let x = 4; x < 46; x += 6) for (let y = 4; y < 20; y += 4) P(x + ((y / 4) % 2) * 3, y, rd);
  R(34, 0, 6, 8, '#8a6a58'); R(34, 0, 6, 2, '#6a4a3a'); R(36, 2, 2, 6, '#a58770');
  R(20, 32, 9, 16, '#7a4a28'); R(20, 32, 9, 1, '#a0693a'); R(24, 32, 1, 16, '#5a3418'); P(27, 41, '#ffd24a');
  [[7, 30], [32, 30]].forEach(([x, y]) => { R(x, y, 9, 9, '#5a3d28'); R(x + 1, y + 1, 7, 7, '#9bd6ff'); R(x + 4, y + 1, 1, 7, '#5a3d28'); R(x + 1, y + 4, 7, 1, '#5a3d28'); P(x + 2, y + 2, '#e9f7ff'); R(x - 1, y + 9, 11, 2, '#8a5a2c'); [0, 3, 6].forEach((o) => { P(x + o, y + 8, '#ff7aa8'); P(x + o + 1, y + 8, '#5cb85c'); }); });
  outlineCanvas(g.canvas, '#2b1d1f');
}
function bigtree(g, bloom) {
  const { R, P } = rr(g), d = mix('#4a5738', '#2f7f3b', bloom), m = mix('#5d6b45', '#3f9f4a', bloom), l = mix('#7a8a58', '#66c75c', bloom);
  R(12, 26, 8, 12, '#6b4a2a'); R(12, 26, 3, 12, '#8a6038'); R(10, 36, 12, 2, '#4a3220');
  [[0, 8, 32, 18], [4, 2, 24, 24], [8, 0, 16, 28]].forEach(([x, y, w, h]) => R(x, y, w, h, d));
  [[3, 9, 26, 14], [6, 4, 20, 20]].forEach(([x, y, w, h]) => R(x, y, w, h, m));
  R(7, 6, 9, 6, l); R(18, 10, 5, 4, l); R(5, 14, 6, 3, l); P(22, 17, d); P(12, 18, d); P(16, 8, l);
  if (bloom > 0.6) [[10, 14], [20, 16], [15, 9], [8, 18]].forEach(([x, y]) => P(x, y, '#ff6b4a'));
  outlineCanvas(g.canvas, '#1f3a22');
}
const PROP = {
  house: { w: 48, h: 48, sol: [2, 22, 44, 26], draw(g, p) { house(g, p.col); } },
  bigtree: { w: 32, h: 40, sol: [11, 30, 10, 8], draw(g) { bigtree(g, Env.bloom); } },
  bush: { w: 16, h: 14, sol: [1, 6, 14, 8], draw(g) { const { R, P } = rr(g), m = mix('#5d6b45', '#3f9f4a', Env.bloom), l = mix('#7a8a58', '#66c75c', Env.bloom); R(1, 4, 14, 9, mix('#4a5738', '#2f7f3b', Env.bloom)); R(2, 3, 12, 8, m); R(4, 4, 5, 3, l); if (Env.bloom > 0.5) { P(11, 7, '#ff7aa8'); P(5, 9, '#ffe066'); } outlineCanvas(g.canvas, '#1f3a22'); } },
  sign: { w: 16, h: 20, sol: [4, 12, 8, 6], draw(g) { const { R } = rr(g); R(7, 8, 2, 11, '#6b4a2a'); R(1, 1, 14, 9, '#b98c58'); R(1, 1, 14, 1, '#d9ab72'); R(3, 4, 10, 1, '#6b4a2a'); R(3, 6, 7, 1, '#6b4a2a'); outlineCanvas(g.canvas, '#2b1d1f'); } },
  fountain: { w: 32, h: 40, sol: [2, 18, 28, 18], draw(g, p, t) {
    const { R, P } = rr(g), k = Env.bloom, glow = mix('#5a6a80', '#6ff3ff', k), core = mix('#8a98aa', '#d8ffff', k);
    R(0, 24, 32, 14, '#8d93a6'); R(2, 22, 28, 4, '#b0b6c8'); R(2, 26, 28, 10, '#5a8fd0'); R(4, 27, 24, 2, '#8fc5ff'); R(0, 36, 32, 2, '#6a7088');
    R(13, 8 + Math.round(Math.sin(t * 2) * 1), 6, 16, glow); R(14, 4 + Math.round(Math.sin(t * 2) * 1), 4, 6, core); P(15, 2 + Math.round(Math.sin(t * 2)), core); R(15, 12, 2, 8, '#fff');
    if (k > 0.5) for (let i = 0; i < 4; i++) { const a = t * 1.6 + i * 1.57; P(16 + Math.round(Math.cos(a) * 9), 14 + Math.round(Math.sin(a) * 4), '#e9ffff'); }
    outlineCanvas(g.canvas, '#1d1526'); } },
  gate: { w: 32, h: 36, sol: null, draw(g, p, t) {
    const { R, P } = rr(g), o = Env.gate, wood = '#8a5a2c', woodL = '#b07a42', st = '#a9a49a';
    R(0, 4, 5, 32, st); R(27, 4, 5, 32, st); R(0, 4, 5, 2, '#cfcabd'); R(27, 4, 5, 2, '#cfcabd'); R(0, 0, 32, 6, '#8d8a80'); R(0, 0, 32, 2, '#cfcabd');
    R(1, 12, 1, 24, '#8d8a80'); R(28, 12, 1, 24, '#8d8a80');
    const dw = Math.round(11 * (1 - o)) + 2;
    if (o < 0.98) { R(5, 6, dw, 30, wood); R(27 - dw, 6, dw, 30, wood); R(5, 6, dw, 1, woodL); R(27 - dw, 6, dw, 1, woodL); if (dw > 5) { R(5, 14, dw, 2, '#4a3a2a'); R(5, 28, dw, 2, '#4a3a2a'); R(27 - dw, 14, dw, 2, '#4a3a2a'); R(27 - dw, 28, dw, 2, '#4a3a2a'); } }
    if (o < 0.5) { const pulse = 0.55 + Math.sin(t * 4) * 0.25; const c = mix('#7a1f1f', '#ff5a4a', pulse); R(13, 18, 6, 8, '#2a2a2a'); R(14, 19, 4, 6, c); P(15, 21, '#ffe0d8'); P(16, 22, '#ffe0d8'); P(15, 20, '#fff'); P(16, 20, '#fff'); R(14, 16, 4, 3, '#4a4a4a'); }
    else { R(8, 8, 16, 28, mix('#8d8a80', '#fff3b0', o * 0.55)); R(10, 10, 12, 26, mix('#a9a49a', '#fff6c8', o * 0.5)); }
    R(13, 1, 6, 4, '#e0b84a'); P(15, 2, '#fff3b0'); P(16, 3, '#fff3b0');
    outlineCanvas(g.canvas, '#1d1526'); } },
  chalk: { w: 24, h: 26, sol: [2, 16, 20, 8], draw(g) {
    const { R, P } = rr(g), d = Env.sq1;
    R(3, 22, 2, 4, '#6b4a2a'); R(19, 22, 2, 4, '#6b4a2a'); R(0, 0, 24, 22, '#8a5a2c'); R(2, 2, 20, 18, '#2f4a3c'); R(2, 2, 20, 1, '#3f604e');
    R(4, 5, 8, 1, '#e8e8e0'); R(4, 8, 12, 1, '#e8e8e0'); R(4, 11, 7, 1, '#e8e8e0'); R(4, 14, 10, 1, '#e8e8e0');
    if (d > 0.5) { R(3, 4, 12, 1, '#ff6b6b'); R(14, 12, 3, 3, '#7fe08a'); R(16, 13, 2, 2, '#5cb85c'); P(18, 11, '#7fe08a'); R(18, 14, 3, 3, '#ff6b4a'); R(17, 5, 3, 3, '#ffe066'); }
    else { P(15, 6, '#c8a2ff'); R(15, 7, 3, 3, '#c8a2ff'); P(18, 11, '#e8e8e0'); R(14, 13, 1, 2, '#e8e8e0'); P(14, 16, '#e8e8e0'); }
    R(21, 20, 2, 1, '#fff'); outlineCanvas(g.canvas, '#2b1d1f'); } },
  pedestal: { w: 14, h: 16, sol: [2, 8, 10, 7], draw(g) { const { R, P } = rr(g); R(2, 8, 10, 7, '#9a9aa8'); R(1, 7, 12, 2, '#c0c0cc'); const c = '#8e44ad'; R(4, 2, 6, 5, c); R(3, 3, 8, 3, c); P(5, 3, '#c8a2ff'); R(6, 0, 2, 2, '#4f7a2a'); outlineCanvas(g.canvas, '#1d1526'); } },
  crate: { w: 16, h: 16, sol: [0, 6, 16, 10], draw(g, p) {
    const { R, P } = rr(g), has = Env.fruit > 0.5 ? !!p.full : !!p.some;
    R(0, 6, 16, 10, '#b07a42'); R(0, 6, 16, 2, '#d9a465'); R(0, 12, 16, 1, '#8a5a2c'); R(0, 6, 1, 10, '#8a5a2c'); R(15, 6, 1, 10, '#8a5a2c'); R(2, 9, 12, 1, '#8a5a2c');
    if (has) { const col = [['#d9342b', '#8fe08a'], ['#f2d02a', '#e0b84a'], ['#f28a1c', '#8fe08a']][p.kind % 3]; [[1, 2], [6, 1], [10, 2], [4, 4], [8, 4]].forEach(([x, y]) => { R(x, y + 1, 4, 4, col[0]); P(x + 1, y + 1, '#fff'); }); P(7, 0, col[1]); }
    if (!(Env.sq3 > 0.5)) { R(6, 8, 4, 4, '#f3ead0'); P(7, 9, '#2b1d1f'); P(8, 9, '#2b1d1f'); P(8, 10, '#2b1d1f'); P(7, 11, '#2b1d1f'); }
    outlineCanvas(g.canvas, '#2b1d1f'); } },
  basket: { w: 14, h: 12, sol: [0, 4, 14, 8], draw(g, p) { const { R, P } = rr(g); R(0, 5, 14, 7, '#c9955a'); R(0, 5, 14, 1, '#e3b87c'); R(0, 8, 14, 1, '#a9743d'); const cs = Env.sq2 > 0.5 ? ['#d9342b', '#f2d02a', '#f28a1c', '#d9342b'] : ['#d9342b', '#d9342b', '#d9342b', '#d9342b']; cs.forEach((c, i) => { R(1 + i * 3, 2, 3, 4, c); P(2 + i * 3, 2, '#fff'); }); outlineCanvas(g.canvas, '#2b1d1f'); } },
  stall: { w: 48, h: 40, sol: [2, 18, 44, 20], draw(g) {
    const { R, P } = rr(g); R(3, 20, 42, 18, '#a9743d'); R(3, 20, 42, 2, '#d9a465'); R(3, 30, 42, 1, '#8a5a2c');
    for (let i = 0; i < 8; i++) R(i * 6, 6, 6, 14, i % 2 ? '#f3ead0' : '#d9534a');
    R(0, 4, 48, 3, '#b8403a'); for (let i = 0; i < 8; i++) { R(i * 6, 20, 6, 3, i % 2 ? '#f3ead0' : '#d9534a'); }
    R(2, 6, 2, 32, '#6b4a2a'); R(44, 6, 2, 32, '#6b4a2a');
    const fr = ['#f2d02a', '#f2d02a', '#f28a1c', '#d9342b', '#f28a1c', '#d9342b']; fr.forEach((c, i) => { R(7 + i * 6, 24, 5, 5, c); P(8 + i * 6, 24, '#fff'); });
    outlineCanvas(g.canvas, '#2b1d1f'); } },
  scarecrow: { w: 20, h: 30, sol: [7, 22, 6, 8], draw(g) { const { R, P } = rr(g); R(9, 8, 2, 22, '#6b4a2a'); R(2, 12, 16, 2, '#6b4a2a'); R(6, 12, 8, 9, '#b0603a'); R(6, 3, 8, 8, '#e6c08a'); R(4, 1, 12, 3, '#8a5a2c'); R(7, 0, 6, 2, '#8a5a2c'); P(8, 6, '#2b1d1f'); P(11, 6, '#2b1d1f'); R(8, 9, 4, 1, '#2b1d1f'); R(0, 12, 3, 4, '#e0b84a'); R(17, 12, 3, 4, '#e0b84a'); outlineCanvas(g.canvas, '#2b1d1f'); } },
  cart: { w: 32, h: 24, sol: [2, 10, 28, 12], draw(g) { const { R, P } = rr(g); R(2, 8, 28, 10, '#a9743d'); R(2, 8, 28, 2, '#d9a465'); R(4, 4, 24, 5, '#c9955a'); [[6, 6], [12, 6], [18, 6]].forEach(([x, y]) => { R(x, y, 5, 4, ['#d9342b', '#f2d02a', '#f28a1c'][((x / 6) | 0) % 3]); }); R(10, 12, 12, 5, '#f3ead0'); R(12, 13, 8, 3, '#2b1d1f'); R(13, 13, 2, 3, '#f3ead0'); R(16, 13, 3, 1, '#f3ead0'); R(8, 18, 6, 6, '#4a3220'); R(20, 18, 6, 6, '#4a3220'); R(10, 20, 2, 2, '#9a7243'); R(22, 20, 2, 2, '#9a7243'); outlineCanvas(g.canvas, '#2b1d1f'); } },
  lantern: { w: 10, h: 24, sol: [3, 18, 4, 6], draw(g, p, t) { const { R, P } = rr(g), k = Env.lantern; R(4, 8, 2, 16, '#4a4a58'); R(1, 2, 8, 8, '#2a2a38'); R(2, 3, 6, 6, k > 0.3 ? mix('#5a5a70', '#ffe9a0', k) : '#5a5a70'); R(0, 1, 10, 2, '#4a4a58'); if (k > 0.5) { P(4, 5, '#fff'); P(5, 5, '#fff'); } outlineCanvas(g.canvas, '#1d1526'); } },
  haystack: { w: 26, h: 20, sol: [1, 8, 24, 11], draw(g) { const { R, P } = rr(g); R(2, 6, 22, 13, '#d9b04a'); R(5, 2, 16, 6, '#e8c45a'); R(0, 10, 26, 8, '#c99a35'); [[6, 5], [14, 8], [10, 14], [19, 12]].forEach(([x, y]) => R(x, y, 4, 1, '#a07a24')); outlineCanvas(g.canvas, '#2b1d1f'); } },
  center: { w: 80, h: 64, sol: [0, 0, 80, 48], draw(g, p, t) {
    const { R, P } = rr(g), open = Env.door, lit = Env.lab;
    R(2, 22, 76, 42, '#d6d9e4'); R(2, 22, 76, 3, '#f1f3f9'); R(2, 56, 76, 8, '#aab0c4'); R(76, 22, 2, 42, '#a7adc0');
    for (let y = 0; y < 22; y++) { const ins = Math.max(0, 8 - y); R(ins, y, 80 - ins * 2, 1, y % 4 === 3 ? '#4a5a82' : (y % 4 === 0 ? '#8fa3d6' : '#6f84b8')); }
    R(0, 20, 80, 3, '#3a4a72'); R(34, 4, 12, 12, '#2a3558'); R(36, 6, 8, 8, mix('#5a6a98', '#ffd96b', lit)); R(39, 4, 2, 12, '#2a3558'); R(34, 9, 12, 2, '#2a3558');
    [[8, 30], [58, 30]].forEach(([x, y]) => { R(x, y, 14, 12, '#4a5a82'); R(x + 1, y + 1, 12, 10, mix('#2a3558', '#ffe9a0', Math.max(lit, open * 0.6))); R(x + 6, y + 1, 1, 10, '#4a5a82'); });
    R(31, 36, 18, 28, '#4a5a82'); R(32, 37, 16, 27, mix('#6a3030', '#2e7a58', open)); R(32, 37, 16, 2, '#fff2'); R(39, 37, 2, 27, '#2a3558');
    R(37, 44, 6, 7, open > 0.5 ? '#bfffd8' : '#ffb0a0'); P(39, 46, '#fff'); P(40, 47, '#fff');
    if (open > 0.5) { R(33, 40, 14, 24, 'rgba(180,255,210,0.22)'); }
    outlineCanvas(g.canvas, '#1d1526'); } },
  machine: { w: 48, h: 44, sol: [2, 16, 44, 26], draw(g, p, t) {
    const { R, P } = rr(g), run = p.running ? 1 : 0, tr = Env.trained;
    R(2, 14, 44, 28, '#7e8aa6'); R(2, 14, 44, 3, '#a9b5d0'); R(2, 38, 44, 4, '#5a6680'); R(0, 6, 8, 12, '#a9b5d0'); R(40, 6, 8, 12, '#a9b5d0');
    R(8, 0, 32, 20, '#3a4560'); R(10, 2, 28, 16, '#0f1730'); const pulse = run ? 0.5 + 0.5 * Math.sin(t * 12) : 0;
    const sc = tr ? '#6ff3ff' : '#2a4a6a';
    R(12, 4, 24, 12, mix('#0f1730', sc, tr || run ? 0.22 + pulse * 0.3 : 0.12));
    if (tr || run) { for (let i = 0; i < 5; i++) { R(14 + i * 4, 14 - ((i * 3 + Math.floor(t * 6)) % 8), 3, 2 + (i % 3) * 2, '#6ff3ff'); } }
    else { R(14, 6, 18, 1, '#3a5a8a'); R(14, 9, 12, 1, '#3a5a8a'); R(14, 12, 15, 1, '#3a5a8a'); }
    [[6, 22], [18, 22], [30, 22]].forEach(([x, y], i) => { R(x, y, 10, 10, '#3a4560'); R(x + 1, y + 1, 8, 8, '#232b44'); P(x + 4, y + 4, run ? '#ffb347' : (tr ? '#7fe08a' : '#ff6b6b')); const a = run ? t * 6 : 0; P(x + 5 + Math.round(Math.cos(a + i) * 3), y + 5 + Math.round(Math.sin(a + i) * 3), '#d8e2ff'); });
    R(40, 22, 4, 14, '#e0b84a'); R(40, 22, 4, 2, '#fff3b0');
    outlineCanvas(g.canvas, '#1d1526'); } },
  shelf: { w: 32, h: 36, sol: [0, 14, 32, 22], draw(g, p) {
    const { R, P } = rr(g), dark = p.dark; R(0, 0, 32, 36, dark ? '#4a3a58' : '#8a5a2c'); R(1, 1, 30, 34, dark ? '#2b2240' : '#6a4220');
    const cols = dark ? ['#7a5aa8', '#a8587a', '#4a7ac8', '#c8a24b', '#5aa88a'] : ['#c8463c', '#3f6fc0', '#e0b84a', '#3a9a6a', '#a96ac8'];
    [3, 13, 23].forEach((y, r) => { R(1, y + 8, 30, 2, dark ? '#4a3a58' : '#8a5a2c'); let x = 2; for (let i = 0; x < 29; i++) { const w = 2 + ((i * 7 + r * 3 + (p.x | 0)) % 3), h = 6 + ((i * 5 + r) % 3); R(x, y + 8 - h, w, h, cols[(i + r * 2) % 5]); x += w + (i % 4 === 0 ? 1 : 0); } });
    outlineCanvas(g.canvas, '#1d1526'); } },
  desk: { w: 32, h: 24, sol: [0, 8, 32, 16], draw(g) { const { R, P } = rr(g); R(0, 8, 32, 12, '#b07a42'); R(0, 8, 32, 3, '#d9a465'); R(2, 18, 3, 6, '#6b4a2a'); R(27, 18, 3, 6, '#6b4a2a'); R(4, 3, 10, 6, '#f3ead0'); R(6, 5, 6, 1, '#6b4a2a'); R(20, 2, 6, 7, '#c8463c'); R(22, 0, 2, 3, '#e0b84a'); outlineCanvas(g.canvas, '#2b1d1f'); } },
  stairs: { w: 32, h: 20, sol: null, draw(g, p, t) { const { R } = rr(g), k = Env.stairs; R(0, 0, 32, 20, '#2a2540'); for (let i = 0; i < 5; i++) { R(2 + i, i * 3 + 2, 28 - i * 2, 3, mix('#4a4560', '#8a7ac0', 0.4 + i * 0.1)); R(2 + i, i * 3 + 2, 28 - i * 2, 1, mix('#6a6590', '#c8b8ff', 0.3)); } R(0, 0, 32, 2, '#c9a24b'); R(0, 0, 2, 20, '#c9a24b'); R(30, 0, 2, 20, '#c9a24b'); if (k > 0.4) R(6, 4, 20, 14, 'rgba(180,160,255,' + (0.18 + Math.sin(t * 3) * 0.06) + ')'); else R(0, 0, 32, 20, 'rgba(10,8,20,0.55)'); outlineCanvas(g.canvas, '#1d1526'); } },
  banner: { w: 16, h: 28, sol: null, draw(g) { const { R, P } = rr(g); R(2, 0, 12, 2, '#c9a24b'); R(3, 2, 10, 22, '#3f6fc0'); R(3, 22, 3, 5, '#3f6fc0'); R(10, 22, 3, 5, '#3f6fc0'); R(5, 8, 6, 6, '#e0b84a'); R(7, 10, 2, 2, '#3f6fc0'); R(7, 6, 2, 1, '#e0b84a'); outlineCanvas(g.canvas, '#1d1526'); } },
  desklamp: { w: 12, h: 16, sol: null, draw(g, p, t) { const { R } = rr(g); R(5, 6, 2, 10, '#4a4a58'); R(2, 1, 8, 6, '#e0b84a'); R(3, 7, 6, 2, 'rgba(255,240,160,0.5)'); outlineCanvas(g.canvas, '#1d1526'); } },
  rug: { w: 64, h: 32, sol: null, flat: true, draw(g) { const { R } = rr(g); R(0, 0, 64, 32, '#3f6fc0'); R(2, 2, 60, 28, '#e0b84a'); R(4, 4, 56, 24, '#2f4f90'); R(28, 12, 8, 8, '#e0b84a'); R(30, 14, 4, 4, '#2f4f90'); } },
  inkpool: { w: 28, h: 14, sol: null, flat: true, draw(g, p, t) { const { R } = rr(g); R(2, 3, 24, 8, '#1a1a38'); R(5, 1, 18, 12, '#1a1a38'); R(8, 4, 5, 2, '#3a3a6a'); } },
  cabinet: { w: 24, h: 28, sol: [0, 10, 24, 18], draw(g) { const { R, P } = rr(g); R(0, 6, 24, 22, '#8f9ab5'); R(0, 6, 24, 2, '#c0c9df'); R(2, 10, 9, 16, '#6f7a95'); R(13, 10, 9, 16, '#6f7a95'); R(10, 16, 1, 4, '#e0b84a'); R(13, 16, 1, 4, '#e0b84a'); R(4, 12, 5, 3, '#7fe08a'); R(15, 12, 5, 3, '#ffb347'); outlineCanvas(g.canvas, '#1d1526'); } },
  table: { w: 28, h: 22, sol: [0, 8, 28, 12], draw(g) { const { R, P } = rr(g); R(0, 6, 28, 8, '#c9955a'); R(0, 6, 28, 2, '#e3b87c'); R(2, 14, 3, 8, '#8a5a2c'); R(23, 14, 3, 8, '#8a5a2c'); R(5, 2, 6, 5, '#d9342b'); R(14, 3, 5, 4, '#f2d02a'); R(20, 2, 5, 5, '#f28a1c'); outlineCanvas(g.canvas, '#2b1d1f'); } },
};
const Props = {
  cache: {},
  key(p, t) {
    const b = Math.round(Env.bloom * 12), q = (v) => Math.round(v * 10);
    switch (p.type) {
      case 'bigtree': case 'bush': return p.type + b;
      case 'gate': return 'gate' + q(Env.gate) + Math.floor(t * 6);
      case 'fountain': return 'fo' + b + Math.floor(t * 8);
      case 'crate': return 'cr' + p.kind + (p.some ? 1 : 0) + (p.full ? 1 : 0) + q(Env.fruit) + q(Env.sq3);
      case 'basket': return 'bk' + q(Env.sq2);
      case 'chalk': return 'ch' + q(Env.sq1);
      case 'machine': return 'ma' + (p.running ? 1 : 0) + q(Env.trained) + Math.floor(t * 8);
      case 'center': return 'ce' + q(Env.door) + q(Env.lab);
      case 'lantern': return 'la' + q(Env.lantern);
      case 'stairs': return 'st' + q(Env.stairs) + Math.floor(t * 4);
      case 'shelf': return 'sh' + (p.dark ? 1 : 0) + p.x;
      default: return p.type + (p.col || '');
    }
  },
  draw(g, p, x, y, t) {
    const d = PROP[p.type]; if (!d) return;
    const k = this.key(p, t);
    if (!this.cache[k]) { const c = mkc(d.w, d.h); d.draw(c.getContext('2d'), p, t); this.cache[k] = Grade.apply(c); }
    g.drawImage(this.cache[k], Math.round(x), Math.round(y));
  },
  solid(p) {
    const d = PROP[p.type]; if (!d) return null;
    if (p.type === 'gate') return Env.gate > 0.9 ? [[p.x * TS, p.y * TS + 6, 5, 30], [p.x * TS + 27, p.y * TS + 6, 5, 30]] : [[p.x * TS, p.y * TS + 6, 32, 30]];
    if (!d.sol) return null;
    if (p.type === 'center') return [[p.x * TS, p.y * TS, 80, 46], [p.x * TS, p.y * TS + 46, 30, 18], [p.x * TS + 50, p.y * TS + 46, 30, 18]];
    return [[p.x * TS + d.sol[0], p.y * TS + d.sol[1], d.sol[2], d.sol[3]]];
  },
  base(p) { const d = PROP[p.type]; return d.flat ? -1 : p.y * TS + (d.sol ? d.sol[1] + d.sol[3] : d.h) - 1; },
};

/* ---------- rooms ---------- */
function grid(w, h, ch) { const m = []; for (let y = 0; y < h; y++) m.push(new Array(w).fill(ch)); return m; }
function fillR(m, x, y, w, h, ch) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (m[j] && m[j][i] !== undefined) m[j][i] = ch; }
function scatter(m, seed, ch, n, avoid) { for (let i = 0; i < n; i++) { const x = 2 + Math.floor(hash(i, seed, 31) * (m[0].length - 4)), y = 2 + Math.floor(hash(i, seed, 32) * (m.length - 4)); if (m[y][x] === '.' && !(avoid && avoid(x, y))) m[y][x] = ch; } }
function edgeFrame() { /* no-op: borders were never drawn in the shipped build (name clash with the main loop) */ }

function buildRooms() {
  const R = {};
  /* ---- village: the Farm Gate ---- */
  { const m = grid(30, 22, '.'); edgeFrame(m, 2);
    fillR(m, 2, 2, 26, 2, 'f'); fillR(m, 2, 4, 12, 1, 'F'); fillR(m, 16, 4, 12, 1, 'F');
    fillR(m, 14, 2, 2, 18, '='); fillR(m, 11, 9, 8, 6, '='); fillR(m, 6, 12, 5, 1, '='); fillR(m, 19, 12, 5, 1, '=');
    fillR(m, 7, 16, 6, 3, '~'); fillR(m, 6, 17, 1, 1, '~'); fillR(m, 13, 17, 1, 1, '~');
    scatter(m, 3, ',', 26, (x, y) => (x >= 11 && x <= 18 && y >= 9 && y <= 14));
    R.village = { id: 'village', name: 'room.village', w: 30, h: 22, map: m, theme: 'out', music: 'meadows', light: 0,
      props: [
        { type: 'gate', x: 14, y: 3 }, { type: 'pedestal', x: 12, y: 5, vis: () => !Save.flag('gateOpen') },
        { type: 'house', x: 4, y: 6, col: 'red' }, { type: 'house', x: 22, y: 6, col: 'blue' }, { type: 'house', x: 3, y: 13, col: 'green' }, { type: 'house', x: 22, y: 13, col: 'red' },
        { type: 'fountain', x: 14, y: 10 }, { type: 'chalk', x: 8, y: 10 }, { type: 'sign', x: 12, y: 18, hs: 'sign' },
        { type: 'bigtree', x: 9, y: 6 }, { type: 'bigtree', x: 19, y: 6 }, { type: 'bigtree', x: 26, y: 12 }, { type: 'bigtree', x: 2, y: 10 }, { type: 'bush', x: 17, y: 16 }, { type: 'bush', x: 20, y: 17 }, { type: 'bush', x: 10, y: 14 },
        { type: 'lantern', x: 13, y: 7, vis: () => true }, { type: 'lantern', x: 17, y: 7, vis: () => true }, { type: 'lantern', x: 13, y: 15 }, { type: 'lantern', x: 17, y: 15 },
      ],
      exits: [{ x: 14, y: 2, w: 2, h: 1, to: 'yard', tx: 15, ty: 23.4, need: () => Save.flag('gateOpen'), lock: 'lock.gate', dir: 'up' }],
      spots: [{ x: 12.5, y: 19, r: 14, say: 'tile.sign' }, { x: 15, y: 12, r: 18, say: 'tile.fount' }],
      spawn: [14.5, 18.2],
    }; }
  /* ---- harvest yard ---- */
  { const m = grid(30, 26, '.'); edgeFrame(m, 2);
    fillR(m, 14, 9, 2, 17, '='); fillR(m, 14, 7, 10, 2, '='); fillR(m, 22, 5, 2, 3, '='); fillR(m, 11, 13, 8, 2, '=');
    fillR(m, 3, 4, 8, 9, 'f'); fillR(m, 18, 11, 9, 9, 'f'); fillR(m, 24, 12, 6, 2, 'L'); fillR(m, 28, 12, 2, 2, 'L');
    scatter(m, 9, ',', 30, (x, y) => m[y][x] !== '.');
    R.yard = { id: 'yard', name: 'room.yard', w: 30, h: 26, map: m, theme: 'out', music: 'meadows', light: 0,
      props: [
        { type: 'center', x: 20, y: 2 },
        { type: 'crate', x: 9, y: 16, kind: 0, some: true, full: true }, { type: 'crate', x: 10, y: 16, kind: 1, full: true }, { type: 'crate', x: 11, y: 16, kind: 2, full: true },
        { type: 'crate', x: 9, y: 17, kind: 2, full: true }, { type: 'crate', x: 10, y: 17, kind: 0, full: true }, { type: 'crate', x: 11, y: 17, kind: 1, full: true },
        { type: 'basket', x: 7, y: 15 }, { type: 'stall', x: 4, y: 19 }, { type: 'scarecrow', x: 7, y: 8 }, { type: 'cart', x: 17, y: 21 }, { type: 'haystack', x: 22, y: 21 }, { type: 'haystack', x: 4, y: 14 },
        { type: 'bigtree', x: 24, y: 8 }, { type: 'bigtree', x: 3, y: 22 }, { type: 'bigtree', x: 26, y: 22 }, { type: 'bigtree', x: 12, y: 3 }, { type: 'bush', x: 16, y: 19 }, { type: 'bush', x: 13, y: 22 },
        { type: 'lantern', x: 13, y: 10 }, { type: 'lantern', x: 16, y: 10 }, { type: 'lantern', x: 13, y: 21 }, { type: 'lantern', x: 16, y: 24 }, { type: 'lantern', x: 22, y: 9 },
      ],
      exits: [
        { x: 14, y: 25, w: 2, h: 1, to: 'village', tx: 15, ty: 5.8, dir: 'down' },
        { x: 21.6, y: 5, w: 2.4, h: 1.6, to: 'training', tx: 10, ty: 14, need: () => Save.flag('doorOpen'), lock: 'lock.door', dir: 'up' },
        { x: 29, y: 12, w: 1, h: 2, end: true, need: () => Save.flag('bossDone'), lock: 'lock.path', dir: 'right' },
      ],
      spots: [{ x: 8, y: 19, r: 20, say: 'tile.stall' }, { x: 7.5, y: 17, r: 18, say: 'tile.B' }, { x: 18, y: 23, r: 20, say: 'tile.cart', sq3: true }],
      spawn: [15, 23.4],
    }; }
  /* ---- training center ---- */
  { const m = grid(20, 16, '_'); fillR(m, 0, 0, 20, 3, 'W'); fillR(m, 0, 0, 1, 16, 'W'); fillR(m, 19, 0, 1, 16, 'W'); fillR(m, 0, 15, 20, 1, 'W');
    fillR(m, 9, 15, 2, 1, '_');
    R.training = { id: 'training', name: 'room.training', w: 20, h: 16, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [
        { type: 'rug', x: 7, y: 8 },
        { type: 'machine', x: 8, y: 2, hs: 'machine' }, { type: 'banner', x: 6, y: 0 }, { type: 'banner', x: 13, y: 0 }, { type: 'banner', x: 2, y: 0 }, { type: 'banner', x: 17, y: 0 },
        { type: 'cabinet', x: 3, y: 3 }, { type: 'cabinet', x: 15, y: 3 }, { type: 'table', x: 3, y: 9 }, { type: 'table', x: 14, y: 9 }, { type: 'desk', x: 3, y: 12 },
        { type: 'stairs', x: 17, y: 12 }, { type: 'desklamp', x: 4, y: 11 },
      ],
      exits: [
        { x: 9, y: 15, w: 2, h: 1, to: 'yard', tx: 22.8, ty: 8.0, dir: 'down' },
        { x: 17, y: 13, w: 2, h: 2, to: 'archive', tx: 12, ty: 16, need: () => Save.flag('archiveOpen'), lock: 'lock.stairs', dir: 'down' },
      ],
      spots: [{ x: 10, y: 5.5, r: 18, say: 'tile.M' }],
      spawn: [10, 14],
    }; }
  /* ---- harvest archive (boss) ---- */
  { const m = grid(24, 18, 's'); fillR(m, 0, 0, 24, 3, 'W'); fillR(m, 0, 0, 1, 18, 'W'); fillR(m, 23, 0, 1, 18, 'W'); fillR(m, 0, 17, 24, 1, 'W'); fillR(m, 11, 17, 2, 1, 's');
    R.archive = { id: 'archive', name: 'room.archive', w: 24, h: 18, map: m, theme: 'arch', music: 'meadows', light: 1,
      props: [
        { type: 'inkpool', x: 8, y: 7 }, { type: 'inkpool', x: 14, y: 10 }, { type: 'inkpool', x: 5, y: 13 },
        { type: 'shelf', x: 1, y: 1, dark: true }, { type: 'shelf', x: 4, y: 1, dark: true }, { type: 'shelf', x: 7, y: 1, dark: true }, { type: 'shelf', x: 15, y: 1, dark: true }, { type: 'shelf', x: 18, y: 1, dark: true }, { type: 'shelf', x: 21, y: 1, dark: true },
        { type: 'shelf', x: 1, y: 6, dark: true, hs: 'shelf' }, { type: 'shelf', x: 1, y: 9, dark: true }, { type: 'shelf', x: 21, y: 6, dark: true }, { type: 'shelf', x: 21, y: 9, dark: true },
        { type: 'desk', x: 4, y: 12, hs: 'desk' }, { type: 'desklamp', x: 6, y: 11 }, { type: 'banner', x: 11, y: 0 }, { type: 'stairs', x: 11, y: 16, up: true },
      ],
      exits: [{ x: 11, y: 17, w: 2, h: 1, to: 'training', tx: 18, ty: 12.4, dir: 'down' }],
      spots: [{ x: 3, y: 9, r: 20, say: 'tile.S' }],
      spawn: [12, 16],
    }; }
  if (typeof buildCity2 === 'function') buildCity2(R); buildCity3(R); buildCity4(R); buildCity5(R); buildCity6(R);
  return R;
}
const Room = { cur: null, all: null };
