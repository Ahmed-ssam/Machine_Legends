'use strict';
/* ===== world6.js: city 6 (Islands of Hidden Knowledge): characters, tiles, props, rooms ===== */

Object.assign(CH, {
  keeper: { skin: '#d9a47c', skinD: '#c08560', hair: '#5a4a7a', hairL: '#7a6a9a', eye: '#1e1428', top: '#4a8ab8', topD: '#356a92', pants: '#3a4a6a', shoe: '#2a3248', style: 'bun', robe: true, belt: '#f0c24a', cap: '#8ad0ff' },
  seeker: { skin: '#e3bd98', skinD: '#c99e78', hair: '#a84a2a', hairL: '#d06a3c', eye: '#1e140e', top: '#3f9a7a', topD: '#2f7a5e', pants: '#3a4a4a', shoe: '#26343a', style: 'braid', glasses: true, scarf: '#f0c24a', scarfD: '#c9a02a' },
  sagee: { skin: '#e0b48a', skinD: '#c89a70', hair: '#f0f0f0', hairL: '#ffffff', eye: '#2a2018', top: '#e8e0c8', topD: '#c8bfa0', pants: '#b8ae90', shoe: '#7a6a4a', style: 'elder', beard: true, robe: true, belt: '#c9a24b' },
  sagep: { skin: '#c9946a', skinD: '#ad7a52', hair: '#cfc8e8', hairL: '#ffffff', eye: '#1e1428', top: '#4a3a7a', topD: '#35285e', pants: '#2a2048', shoe: '#1a1430', style: 'elder', robe: true, belt: '#8ad0ff', glasses: true },
  nullc: { skin: '#b8a8d8', skinD: '#9888b8', hair: '#6a5a9a', hairL: '#8a7aba', eye: '#ffd24a', top: '#7a6aaa', topD: '#5a4a8a', pants: '#4a3a6a', shoe: '#2a2048', style: 'messy' },
  ferry1: { skin: '#b9825a', skinD: '#9a6a46', hair: '#2a2018', hairL: '#4a3a2a', eye: '#1e140e', top: '#3a6a9a', topD: '#2a4e76', pants: '#4a4a5a', shoe: '#2a2a36', style: 'messy', cap: '#e0e0e8' },
  ferry2: { skin: '#e0b48a', skinD: '#c89a70', hair: '#6a3a2a', hairL: '#8a5a44', eye: '#2a1a14', top: '#9a5a3a', topD: '#7a4228', pants: '#3a3a4a', shoe: '#2a2a36', style: 'spiky', bandana: '#d9423a' },
  lag: { skin: '#b89a5a', skinD: '#987c42', hair: '#7a6a3a', hairL: '#9a8a52', eye: '#ffd24a', top: '#8a7a4a', topD: '#6a5a32', pants: '#5a4a2a', shoe: '#3a2e1a', style: 'spiky', belt: '#d9b84a', scarf: '#c98a3a', scarfD: '#a06a22', glasses: true },
  core: { skin: '#9ad0ff', skinD: '#6aa8e0', hair: '#ffffff', hairL: '#e8f4ff', eye: '#ffd24a', top: '#6ab0f0', topD: '#4a88c8', pants: '#4a88c8', shoe: '#3a6aa0', style: 'spiky', robe: true, belt: '#ffd24a' },
});
Object.assign(CREA, { Mistling: ['bird', '#b8c8e8'], Stonefang: ['mammal', '#7a7a8a'], Null: ['unknown', '#b8a8d8'] });

Object.assign(Env, { fog6: 0, corefix: 0 });
(function () {
  const _sync = Env.sync.bind(Env);
  Env.sync = function (snap) {
    _sync(snap);
    const f = (k) => (Save.d && Save.d.flags[k] ? 1 : 0);
    if (Room.cur && Room.cur.city === 6) this.target = 0.9;
    Object.assign(this.T, { fog6: (f('c6s1') + f('c6s2') + f('c6s3') + f('c6s4')) / 4 * 0.8 + f('c6boss') * 0.2, corefix: f('c6boss') });
    if (snap) { this.bloom = this.target; for (const k in this.T) this[k] = this.T[k]; }
  };
})();

const C6T = { '0': 1, '*': 1, '+': 1, '%': 1 };
(function () {
  const _get = Tiles.get.bind(Tiles);
  Tiles.get = function (ch, x, y, theme) {
    if (!C6T[ch]) return _get(ch, x, y, theme);
    const v = Math.floor(hash(x, y, 1) * 4), key = 'c6' + ch + v + '_' + Math.round(Env.fog6 * 5) + (ch === '+' ? Math.round(Env.corefix * 4) + Math.floor(Date.now() / 600) % 2 : '');
    if (!this.cache[key]) this.cache[key] = this.make6(ch, x, y, v);
    return this.cache[key];
  };
  Tiles.make6 = function (ch, x, y, v) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g), k = Env.fog6;
    if (ch === '0') {
      R(0, 0, 16, 16, mix('#8a9a78', '#7ac090', k)); for (let i = 0; i < 7; i++) { const px = Math.floor(hash(x, y, i + 3) * 15), py = Math.floor(hash(x, y, i + 8) * 14); P(px, py, mix('#7a8a68', '#5ea878', k)); P(px, py + 1, '#4a8a62'); }
      if (v === 1) { P(4, 6, '#fff3b0'); P(11, 11, '#8ad0ff'); }
    } else if (ch === '*') {
      R(0, 0, 16, 16, '#a8845a'); for (let i = 0; i < 4; i++) R(0, i * 4, 16, 1, '#7a5a36'); R(0, 15, 16, 1, '#6a4a2a'); P(2, 2 + (x % 2) * 4, '#5a3e22'); P(13, 2 + (y % 2) * 4, '#5a3e22');
    } else if (ch === '+') {
      const on = Math.floor(Date.now() / 600) % 2, fx = Env.corefix, alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#2a3e66' : '#32486e'); R(0, 0, 16, 1, '#4a6a9a'); R(0, 0, 1, 16, '#4a6a9a');
      if (v === 0) { P(7, 7, mix('#6aa8e8', '#ffe27a', fx)); P(8, 8, on ? '#ffffff' : '#8ad0ff'); } if (v === 2) P(3, 11, mix('#4a78c8', '#ffd24a', fx));
    } else {
      const alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#c8d0dc' : '#d4dce8'); R(0, 0, 16, 1, '#a8b2c4'); R(0, 0, 1, 16, '#a8b2c4'); if (v === 3) { P(6, 6, '#eef4ff'); P(7, 7, '#eef4ff'); }
    }
    return c;
  };
})();

Object.assign(PROP, {
  lantern6: { w: 14, h: 30, sol: [4, 22, 6, 7], draw(g, p, t) { const { R, P } = rr(g), on = 0.6 + Math.sin(t * 3 + (p.x || 0)) * 0.25; R(6, 8, 2, 22, '#4a4258'); R(2, 4, 10, 6, '#4a4258'); R(3, 5, 8, 4, mix('#c9a24b', '#fff3b0', on)); R(5, 0, 4, 4, '#6a6078'); outlineCanvas(g.canvas, '#1a1424'); P(7, 6, '#ffffff'); } },
  boat: { w: 44, h: 26, draw(g, p, t) { const { R, P } = rr(g), b = Math.round(Math.sin(t * 1.6 + (p.x || 0)) * 1); R(2, 12 + b, 40, 8, '#8a5a34'); R(4, 20 + b, 36, 3, '#6a4020'); R(0, 10 + b, 44, 3, '#b07a44'); R(20, 0 + b, 2, 12, '#6a4a2a'); R(22, 2 + b, 12, 8, '#e8e0d0'); R(34, 12 + b, 6, 3, '#ffd24a'); outlineCanvas(g.canvas, '#22160e'); } },
  ringgate: { w: 72, h: 60, sol: [0, 16, 14, 40], draw(g, p, t) { const { R, P } = rr(g), open = Env.fog6 > 0.78; R(0, 12, 12, 48, '#b8c2d6'); R(60, 12, 12, 48, '#b8c2d6'); R(8, 0, 56, 14, '#c8d2e6'); R(0, 8, 72, 6, '#d8e0f0'); for (let i = 0; i < 6; i++) R(10 + i * 9, 10, 4, 4, open ? '#ffd24a' : '#5a6a8a'); if (!open) { R(12, 16, 48, 44, '#2e3a5a'); for (let x = 14; x < 60; x += 6) R(x, 16, 2, 44, '#5a6a8a'); } outlineCanvas(g.canvas, '#1a2034'); } },
  corering: { w: 112, h: 96, sol: [0, 70, 112, 24], draw(g, p, t) { const { R, P } = rr(g), fx = Env.corefix, fr = (Save.d && Save.d.fragments) || 0, cx = 56, cy = 46; for (let a = 0; a < 40; a++) { const ang = a / 40 * Math.PI * 2, miss = fx < 0.5 && (a % 7 === 3 || a % 13 === 0), x = Math.round(cx + Math.cos(ang) * 40), y = Math.round(cy + Math.sin(ang) * 38); if (miss && !(a % 7 === 3 && fr > a % 5)) { R(x - 1, y - 1, 3, 3, '#2a3a5a'); continue; } const c = mix('#4a9be8', '#ffe27a', fx); R(x - 3, y - 3, 7, 7, c); R(x - 2, y - 2, 3, 3, '#ffffff'); } R(cx - 6, cy - 6, 12, 12, mix('#6ab0f0', '#fff3b0', fx)); R(cx - 3, cy - 3, 6, 6, '#ffffff'); R(30, 84, 52, 8, '#5a6a8a'); outlineCanvas(g.canvas, '#101a30'); } },
  bookstack: { w: 22, h: 26, sol: [2, 12, 18, 12], draw(g) { const { R, P } = rr(g); R(2, 16, 18, 8, '#7a3a2a'); R(3, 17, 16, 2, '#d8c8a8'); R(3, 9, 16, 7, '#2f6a8a'); R(4, 10, 14, 2, '#d8c8a8'); R(5, 3, 13, 6, '#c9a24b'); R(6, 4, 11, 2, '#fff3b0'); outlineCanvas(g.canvas, '#1a1424'); } },
  datacrystal: { w: 18, h: 30, sol: [3, 18, 12, 10], draw(g, p, t) { const { R, P } = rr(g), gl = 0.5 + Math.sin(t * 2 + (p.x || 0)) * 0.3, c = mix('#4a7ad8', '#9ad0ff', gl); R(6, 4, 6, 20, c); R(4, 8, 10, 12, c); R(7, 2, 4, 4, '#cfe8ff'); R(8, 6, 2, 10, '#ffffffaa'); R(3, 24, 12, 4, '#4a5a7a'); outlineCanvas(g.canvas, '#101a30'); } },
  runecircle: { w: 48, h: 32, draw(g, p, t) { const { R, P } = rr(g), c = p.col || '#8ad0ff', r = 0.45 + Math.sin(t * 1.5 + (p.x || 0)) * 0.15; g.strokeStyle = c; g.globalAlpha = r + 0.3; g.lineWidth = 2; g.beginPath(); g.ellipse(24, 16, 21, 12, 0, 0, 7); g.stroke(); g.globalAlpha = 0.5; g.beginPath(); g.ellipse(24, 16, 11, 6, 0, 0, 7); g.stroke(); g.globalAlpha = 1; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; P(Math.round(24 + Math.cos(a) * 21), Math.round(16 + Math.sin(a) * 12), '#ffffff'); } } },
  isign: { w: 14, h: 22, sol: [1, 12, 12, 9], draw(g) { const { R, P } = rr(g); R(6, 10, 2, 12, '#6a4a2a'); R(1, 2, 12, 9, '#3a4a6a'); R(2, 3, 10, 7, '#5a6e92'); R(4, 5, 6, 1, '#e8e0d0'); R(4, 7, 4, 1, '#e8e0d0'); R(1, 2, 12, 1, '#c9a24b'); outlineCanvas(g.canvas, '#1a1424'); } },
});
(function () {
  const _key = Props.key.bind(Props), q = (v) => Math.round(v * 10);
  Props.key = function (p, t) {
    switch (p.type) {
      case 'lantern6': return 'l6' + Math.floor(t * 4) % 6 + (p.x | 0) % 3;
      case 'boat': return 'bt' + Math.floor(t * 2) % 4 + (p.x | 0) % 5;
      case 'ringgate': return 'rg' + (Env.fog6 > 0.78 ? 1 : 0);
      case 'corering': return 'cr' + q(Env.corefix) + ((Save.d && Save.d.fragments) || 0);
      case 'datacrystal': return 'dc' + Math.floor(t * 4) % 6 + (p.x | 0) % 3;
      case 'runecircle': return 'rc' + Math.floor(t * 4) % 10 + (p.col || '') + (p.x | 0) % 4;
      case 'bookstack': case 'isign': return p.type;
      default: return _key(p, t);
    }
  };
})();

function buildCity6(R) {
  const sea = (W, H) => grid(W, H, '~');
  /* dock (hub) */
  { const W = 36, H = 22, m = sea(W, H); fillR(m, 0, 8, 6, 4, '*'); fillR(m, 6, 5, 22, 10, '*'); fillR(m, 16, 0, 3, 6, '*'); fillR(m, 28, 9, 8, 3, '*'); fillR(m, 16, 14, 3, 8, '*'); fillR(m, 25, 0, 3, 6, '*');
    R.dock = { id: 'dock', city: 6, name: 'room.dock', w: W, h: H, map: m, theme: 'fo', haze: 'fog6', music: 'meadows', light: 0,
      props: [{ type: 'boat', x: 1, y: 6.4 }, { type: 'lantern6', x: 7, y: 5 }, { type: 'lantern6', x: 12, y: 5 }, { type: 'lantern6', x: 20, y: 5 }, { type: 'lantern6', x: 26, y: 5 }, { type: 'lantern6', x: 8, y: 12.6 }, { type: 'lantern6', x: 22, y: 12.6 }, { type: 'lantern6', x: 28, y: 12 },
        { type: 'isign', x: 14.5, y: 8 }, { type: 'isign', x: 24, y: 8.6 }, { type: 'boat', x: 31, y: 14 }, { type: 'boat', x: 9, y: 16 }],
      exits: [
        { x: 16, y: 0, w: 3, h: 1, to: 'isle1', tx: 10.5, ty: 13.4, dir: 'up' },
        { x: 35, y: 9, w: 1, h: 3, to: 'isle2', tx: 2.5, ty: 8.4, need: () => Save.flag('c6s1'), lock: 'lock.isle2', dir: 'right' },
        { x: 16, y: 21, w: 3, h: 1, to: 'isle3', tx: 12.6, ty: 2.6, need: () => Save.flag('c6s2'), lock: 'lock.isle3', dir: 'down' },
        { x: 25, y: 0, w: 3, h: 1, to: 'gate6', tx: 11.6, ty: 13.4, need: () => Save.flag('c6s3'), lock: 'lock.gate6', dir: 'up' },
      ],
      spots: [{ x: 14.5, y: 8.8, r: 20, say: 'tile.isign1' }, { x: 24, y: 9.4, r: 20, say: 'tile.isign2' }], spawn: [3, 9.8] }; }
  /* island of probabilities */
  { const W = 22, H = 16, m = sea(W, H); fillR(m, 2, 3, 18, 10, '0'); fillR(m, 10, 12, 2, 4, '*');
    R.isle1 = { id: 'isle1', city: 6, name: 'room.isle1', w: W, h: H, map: m, theme: 'fo', haze: 'fog6', music: 'meadows', light: 0,
      props: [{ type: 'lantern6', x: 4, y: 5 }, { type: 'lantern6', x: 8, y: 4.6 }, { type: 'lantern6', x: 14, y: 4.6 }, { type: 'lantern6', x: 17, y: 5 }, { type: 'lantern6', x: 5, y: 10 }, { type: 'lantern6', x: 16, y: 10 }, { type: 'runecircle', x: 9, y: 9, col: '#ffd24a' }, { type: 'fbush', x: 3, y: 7.4 }, { type: 'fbush', x: 18, y: 7, v: 1 }, { type: 'shroom', x: 7, y: 11.5 }],
      exits: [{ x: 10, y: 15, w: 2, h: 1, to: 'dock', tx: 17.4, ty: 2.6, dir: 'down' }], spots: [], spawn: [10.5, 13.4] }; }
  /* island of hidden groups */
  { const W = 24, H = 16, m = sea(W, H); fillR(m, 3, 3, 19, 10, '0'); fillR(m, 0, 7, 4, 3, '*');
    R.isle2 = { id: 'isle2', city: 6, name: 'room.isle2', w: W, h: H, map: m, theme: 'fo', haze: 'fog6', music: 'meadows', light: 0,
      props: [{ type: 'runecircle', x: 6, y: 5, col: '#8ad0ff' }, { type: 'runecircle', x: 15, y: 4.6, col: '#ffd24a' }, { type: 'runecircle', x: 15.5, y: 10, col: '#e8788a' }, { type: 'datacrystal', x: 6.5, y: 6 }, { type: 'datacrystal', x: 8, y: 7.4 }, { type: 'datacrystal', x: 16.4, y: 5.4 }, { type: 'datacrystal', x: 17.5, y: 6.6 }, { type: 'datacrystal', x: 16.2, y: 10.8 },
        { type: 'lantern6', x: 4.5, y: 11 }, { type: 'lantern6', x: 20.5, y: 11 }, { type: 'fbush', x: 21, y: 4.4 }, { type: 'shroom', x: 11, y: 11.5 }],
      exits: [{ x: 0, y: 7, w: 1, h: 3, to: 'dock', tx: 33.6, ty: 10.4, dir: 'left' }], spots: [], spawn: [2.5, 8.4] }; }
  /* twin paths */
  { const W = 26, H = 18, m = sea(W, H); fillR(m, 2, 4, 22, 11, '0'); fillR(m, 12, 0, 2, 5, '*'); fillR(m, 12, 5, 2, 5, '*'); fillR(m, 6, 14, 3, 3, '*'); fillR(m, 17, 14, 3, 3, '*');
    R.isle3 = { id: 'isle3', city: 6, name: 'room.isle3', w: W, h: H, map: m, theme: 'fo', haze: 'fog6', music: 'meadows', light: 0,
      props: [{ type: 'bookstack', x: 4, y: 6 }, { type: 'bookstack', x: 4, y: 9 }, { type: 'bookstack', x: 9, y: 6 }, { type: 'bookstack', x: 9.6, y: 10 }, { type: 'datacrystal', x: 17, y: 6 }, { type: 'datacrystal', x: 21, y: 6.4 }, { type: 'datacrystal', x: 21.4, y: 10 }, { type: 'datacrystal', x: 17.2, y: 10.4 },
        { type: 'boat', x: 5.5, y: 16 }, { type: 'boat', x: 16.4, y: 16 }, { type: 'lantern6', x: 11, y: 12.6 }, { type: 'lantern6', x: 14.6, y: 12.6 }, { type: 'runecircle', x: 4.6, y: 11.6, col: '#c9a24b' }, { type: 'runecircle', x: 18.5, y: 12, col: '#8ad0ff' }],
      exits: [{ x: 12, y: 0, w: 2, h: 1, to: 'dock', tx: 17.4, ty: 19.6, dir: 'up' }], spots: [], spawn: [12.6, 2.6] }; }
  /* convergence gate */
  { const W = 24, H = 16, m = sea(W, H); fillR(m, 2, 2, 20, 12, '%'); fillR(m, 11, 14, 3, 2, '*');
    R.gate6 = { id: 'gate6', city: 6, name: 'room.gate6', w: W, h: H, map: m, theme: 'fo', haze: 'fog6', music: 'meadows', light: 0,
      props: [{ type: 'ringgate', x: 8.2, y: -0.3, hs: 'ringgate' }, { type: 'lantern6', x: 4, y: 5 }, { type: 'lantern6', x: 19, y: 5 }, { type: 'lantern6', x: 4, y: 11 }, { type: 'lantern6', x: 19, y: 11 }, { type: 'runecircle', x: 10, y: 8, col: '#ffd24a' }],
      exits: [{ x: 10.8, y: 3.2, w: 2.6, h: 1, to: 'core', tx: 14, ty: 16, need: () => Save.flag('c6s4'), lock: 'lock.core', dir: 'up' }, { x: 11, y: 15, w: 3, h: 1, to: 'dock', tx: 26.6, ty: 2.6, dir: 'down' }], spots: [], spawn: [11.6, 13.4] }; }
  /* the learning core */
  { const W = 28, H = 18, m = grid(W, H, '+'); fillR(m, 0, 0, W, 2, '~'); fillR(m, 0, 0, 1, H, '~'); fillR(m, W - 1, 0, 1, H, '~'); fillR(m, 0, H - 1, W, 1, '~'); fillR(m, 13, H - 1, 3, 1, '+');
    R.core = { id: 'core', city: 6, name: 'room.core', w: W, h: H, map: m, theme: 'lab', music: 'meadows', light: 0,
      props: [{ type: 'corering', x: 10.5, y: 1.2, hs: 'corering' }, { type: 'datacrystal', x: 4, y: 6 }, { type: 'datacrystal', x: 22.5, y: 6 }, { type: 'datacrystal', x: 4.4, y: 12 }, { type: 'datacrystal', x: 22.4, y: 12 }, { type: 'runecircle', x: 12, y: 10, col: '#ffd24a' }],
      exits: [{ x: 13, y: 17, w: 3, h: 1, to: 'gate6', tx: 11.6, ty: 4.4, dir: 'down' }], spots: [], spawn: [14, 16] }; }
}
