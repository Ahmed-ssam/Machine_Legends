'use strict';
/* ===== sprites.js: procedural pixel-art characters (4 directions x 4 walk frames), portraits, fruit, emotes ===== */
const OUT = '#1d1526';
function mkc(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function hexRGB(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
function rgbHex(a) { return '#' + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
function shade(h, a) { return rgbHex(hexRGB(h).map((v) => (a >= 0 ? v + (255 - v) * a : v * (1 + a)))); }
function mix(a, b, k) { const A = hexRGB(a), B = hexRGB(b); return rgbHex(A.map((v, i) => v + (B[i] - v) * k)); }
function rr(g) {
  return {
    R: (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); },
    P: (x, y, c) => { g.fillStyle = c; g.fillRect(x, y, 1, 1); },
  };
}
function outlineCanvas(c, col) {
  const w = c.width, h = c.height, g = c.getContext('2d'), id = g.getImageData(0, 0, w, h), d = id.data, o = new Uint8ClampedArray(d), rgb = hexRGB(col || OUT);
  const A = (x, y) => x >= 0 && y >= 0 && x < w && y < h && d[(y * w + x) * 4 + 3] > 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (!A(x, y) && (A(x - 1, y) || A(x + 1, y) || A(x, y - 1) || A(x, y + 1))) { const i = (y * w + x) * 4; o[i] = rgb[0]; o[i + 1] = rgb[1]; o[i + 2] = rgb[2]; o[i + 3] = 255; }
  }
  id.data.set(o); g.putImageData(id, 0, 0); return c;
}
function flipH(c) { const o = mkc(c.width, c.height), g = o.getContext('2d'); g.translate(c.width, 0); g.scale(-1, 1); g.drawImage(c, 0, 0); return o; }

/* ---------- character specs ---------- */
const CH = {
  hero: { skin: '#f0c19a', skinD: '#d9a074', hair: '#3a2622', hairL: '#6a4a3e', eye: '#4a2a18', top: '#2d3050', topD: '#1f2238', pants: '#2a2a3c', shoe: '#8a5a2c', scarf: '#d23b2f', scarfD: '#a82a22', style: 'spiky', goggles: true, cape: '#c0392f', capeD: '#962a22', belt: '#e0b84a', gear: true },
  finch: { skin: '#e8b890', skinD: '#cf9a70', hair: '#e9e9ef', hairL: '#ffffff', eye: '#3a2a20', top: '#3f7f74', topD: '#2f625a', pants: '#5b4636', shoe: '#3a2a20', style: 'elder', beard: true, robe: true, belt: '#c9a24b' },
  pip: { skin: '#f4c7a0', skinD: '#dca47c', hair: '#e0892c', hairL: '#f5b04f', eye: '#3a2418', top: '#efe7d2', topD: '#cfc6ae', pants: '#4a7fd1', shoe: '#5a3a22', style: 'messy', cap: '#4a7fd1', freckles: true, overalls: '#4a7fd1' },
  luma: { skin: '#e7b48a', skinD: '#cf9970', hair: '#5a3a1f', hairL: '#7b5530', eye: '#3a2418', top: '#efe7d2', topD: '#cfc6ae', pants: '#7a5a3a', shoe: '#4a2f1d', style: 'braid', bandana: '#d9558f', apron: '#c0508a' },
  wren: { skin: '#e9c6a2', skinD: '#d1a780', hair: '#bdbdc8', hairL: '#e2e2ea', eye: '#34343f', top: '#3b8f7a', topD: '#2c6e5e', pants: '#4a4a5a', shoe: '#2c2c36', style: 'bun', glasses: true, robe: true, belt: '#8bd0bd' },
  tess: { skin: '#d9a47c', skinD: '#c08560', hair: '#2a2f4a', hairL: '#4a5a8a', eye: '#2a1a14', top: '#8fb8e8', topD: '#6a92c4', pants: '#3a3a5a', shoe: '#5a3a22', style: 'messy', bandana: '#4fb3b0', apron: '#5a7fb8', freckles: true },
  orin: { skin: '#e3bd98', skinD: '#c99e78', hair: '#cfcfe0', hairL: '#ffffff', eye: '#2a2a3a', top: '#6a4a9a', topD: '#503878', pants: '#4a3a5a', shoe: '#2c2236', style: 'elder', robe: true, belt: '#c9a24b', glasses: true },
  bramm: { skin: '#b9825a', skinD: '#9a6a46', hair: '#3a2a20', hairL: '#5a4232', eye: '#1e140e', top: '#8a6a4a', topD: '#6a4e36', pants: '#5a5a6a', shoe: '#2e2a26', style: 'messy', cap: '#d9a23a', overalls: '#5a5a6a' },
  cheater: { skin: '#f0c8a0', skinD: '#d9a67c', hair: '#d9b84a', hairL: '#f5dc7a', eye: '#3a2a18', top: '#5a2a8a', topD: '#3f1d66', pants: '#2a2038', shoe: '#c9a24b', style: 'spiky', scarf: '#e0b84a', scarfD: '#b8902a', belt: '#e0b84a' },
  student: { skin: '#e7b48a', skinD: '#cf9970', hair: '#6a3a2a', hairL: '#8a5a44', eye: '#2a1a14', top: '#8a5ac0', topD: '#6a3f9a', pants: '#2a2038', shoe: '#3a2a20', style: 'braid', bandana: '#c9a24b' },
  misprint: { spirit: true, skin: '#2a2a48', skinD: '#1d1d36', hair: '#2a2a48', hairL: '#4a4a82', eye: '#ffffff', top: '#2a2a48', topD: '#1d1d36' },
  milo: { robot: true, skin: '#ece0c4', skinD: '#bfae8a', hair: '#e0b84a', hairL: '#ffd96b', eye: '#5ff0ff', top: '#d8c9a6', topD: '#a8967a' },
};

/* ---------- humans: 16x24 ---------- */
function human(s, dir, f) {
  const d = dir === 'right' ? 'left' : dir;
  const c = mkc(16, 24), g = c.getContext('2d'), { R, P } = rr(g);
  const A = f === 1, B = f === 3, b = (A || B) ? -1 : 0, ay = A ? 1 : B ? -1 : 0, robe = !!s.robe;
  const Rb = (x, y, w, h, col) => R(x, y + b, w, h, col), Pb = (x, y, col) => P(x, y + b, col);
  const hairC = s.hair, hairH = s.hairL;
  const legs = () => {
    if (robe) { R(4, 18, 8, 5, s.top); R(4, 22, 8, 1, s.topD); R(5, 23, 2, 1, s.shoe); R(9, 23, 2, 1, s.shoe); return; }
    [[5, A], [8, B]].forEach(([x, r]) => { R(x, 18, 3, 4 - (r ? 1 : 0), s.pants); R(x, 22 - (r ? 1 : 0), 3, 2, s.shoe); });
    if (s.overalls) { R(5, 18, 6, 1, s.overalls); }
  };
  const torso = () => {
    Rb(4, 12, 8, 7, s.top); Rb(11, 12, 1, 7, s.topD);
    if (robe) { Rb(4, 18, 8, 1, s.belt || s.topD); }
    else if (s.belt) Rb(4, 18, 8, 1, s.belt); else Rb(4, 18, 8, 1, shade(s.pants, -0.3));
    if (s.overalls) { Rb(5, 15, 6, 4, s.overalls); Rb(5, 13, 1, 2, s.overalls); Rb(10, 13, 1, 2, s.overalls); Pb(6, 16, '#e8c24a'); Pb(9, 16, '#e8c24a'); }
    if (s.apron) { Rb(5, 15, 6, 4, s.apron); Rb(5, 15, 6, 1, shade(s.apron, 0.25)); }
  };
  const scarf = () => { if (s.scarf) { Rb(4, 11, 8, 2, s.scarf); Rb(4, 12, 8, 1, s.scarfD); } };
  const hairFront = () => {
    Rb(5, 1, 6, 1, hairC); Rb(4, 2, 8, 1, hairC); Rb(3, 3, 10, 2, hairC); Rb(3, 5, 1, 4, hairC); Rb(12, 5, 1, 4, hairC);
    Rb(4, 5, 3, 1, hairC); Rb(9, 5, 3, 1, hairC); Pb(7, 5, hairC); Pb(6, 2, hairH); Pb(7, 2, hairH); Pb(9, 3, hairH);
    if (s.style === 'spiky') { Pb(5, 0, hairC); Pb(8, 0, hairC); Pb(10, 0, hairC); Pb(2, 3, hairC); Pb(13, 3, hairC); Pb(8, 5, hairC); }
    if (s.style === 'bun') { Rb(6, 0, 4, 2, hairC); Pb(7, 0, hairH); }
    if (s.style === 'messy') { Pb(5, 0, hairC); Pb(9, 0, hairC); Pb(2, 4, hairC); Pb(13, 4, hairC); }
    if (s.style === 'elder') { Rb(4, 5, 8, 1, hairC); }
  };
  const face = () => {
    Rb(4, 5, 8, 6, s.skin); Rb(5, 11, 6, 1, s.skin); Pb(4, 10, s.skin);
    Rb(4, 9, 1, 2, s.skinD); Rb(11, 9, 1, 2, s.skinD);
    Rb(5, 7, 1, 2, s.eye); Rb(10, 7, 1, 2, s.eye); Pb(5, 7, '#ffffff'); Pb(10, 7, '#ffffff');
    if (!s.beard) { Pb(7, 10, '#b5524a'); Pb(8, 10, '#b5524a'); }
    Pb(4, 9, '#f2a39b'); Pb(11, 9, '#f2a39b');
    if (s.freckles) { Pb(5, 9, s.skinD); Pb(10, 9, s.skinD); Pb(6, 9, s.skinD); Pb(9, 9, s.skinD); }
  };
  const glasses = () => { if (!s.glasses) return; [4, 9].forEach((x0) => { Rb(x0, 6, 3, 1, '#2d2d3a'); Rb(x0, 9, 3, 1, '#2d2d3a'); Pb(x0, 7, '#2d2d3a'); Pb(x0, 8, '#2d2d3a'); Pb(x0 + 2, 7, '#2d2d3a'); Pb(x0 + 2, 8, '#2d2d3a'); }); Pb(7, 7, '#2d2d3a'); Pb(8, 7, '#2d2d3a'); };
  const goggles = () => { if (!s.goggles) return; Rb(3, 3, 10, 1, '#6b4a2a'); [4, 9].forEach((x0) => { Rb(x0, 3, 3, 2, '#c9a24b'); Rb(x0 + 1, 3, 1, 1, '#8fe3f0'); Pb(x0 + 1, 4, '#6fc7d8'); Pb(x0, 3, '#e0b84a'); }); };
  const cap = () => { if (!s.cap) return; Rb(4, 1, 8, 3, s.cap); Rb(5, 0, 6, 1, s.cap); Rb(3, 4, 10, 1, shade(s.cap, 0.25)); Rb(4, 5, 8, 1, shade(s.cap, -0.25)); Pb(7, 2, shade(s.cap, 0.4)); Pb(8, 2, shade(s.cap, 0.4)); };
  const bandana = () => { if (!s.bandana) return; Rb(3, 3, 10, 2, s.bandana); Pb(12, 5, s.bandana); Pb(13, 5, shade(s.bandana, -0.2)); Pb(5, 3, shade(s.bandana, 0.35)); Pb(9, 3, shade(s.bandana, 0.35)); };
  const beardF = () => { if (!s.beard) return; Rb(4, 9, 8, 4, hairC); Rb(5, 8, 2, 1, hairC); Rb(9, 8, 2, 1, hairC); Pb(7, 10, shade(hairC, -0.25)); Pb(8, 10, shade(hairC, -0.25)); Rb(5, 12, 6, 1, hairH); };
  const brows = () => { if (s.style === 'elder') { Rb(4, 6, 3, 1, hairH); Rb(9, 6, 3, 1, hairH); } };

  if (d === 'down') {
    if (s.cape) { Rb(2, 12, 12, 9, s.cape); Rb(2, 20, 12, 1, s.capeD); }
    legs(); torso(); if (s.gear) { Rb(7, 13, 1, 5, '#e0b84a'); Rb(4, 17, 8, 1, '#e0b84a'); } scarf();
    Rb(3, 13 + ay, 1, 4, s.top); Rb(12, 13 - ay, 1, 4, s.top);
    Pb(3, 17 + ay, s.skin); Pb(12, 17 - ay, s.skin);
    if (s.scarf) { Rb(9, 13, 2, 4, s.scarf); Rb(10, 13, 1, 4, s.scarfD); }
    if (s.braid || s.style === 'braid') { Rb(13, 9, 1, 6, hairC); Pb(13, 15, s.bandana || '#c0508a'); Pb(13, 10, hairH); }
    face(); hairFront(); brows(); beardF(); glasses(); goggles(); cap(); bandana();
  } else if (d === 'up') {
    if (s.cape) { Rb(3, 11, 10, 10, s.cape); Rb(4, 12, 1, 8, s.capeD); Rb(11, 12, 1, 8, s.capeD); Rb(3, 20, 10, 1, s.capeD); if (s.gear) { const gc = '#f0b040'; Rb(7, 14, 2, 4, gc); Rb(6, 15, 4, 2, gc); Pb(6, 14, gc); Pb(9, 14, gc); Pb(6, 17, gc); Pb(9, 17, gc); Pb(7, 15, s.capeD); Pb(8, 16, s.capeD); } }
    legs(); if (!s.cape) torso();
    if (s.cape) { Rb(3, 11, 10, 1, s.scarf); }
    else { scarf(); Rb(3, 13 + ay, 1, 4, s.top); Rb(12, 13 - ay, 1, 4, s.top); Pb(3, 17 + ay, s.skin); Pb(12, 17 - ay, s.skin); }
    Rb(5, 1, 6, 1, hairC); Rb(4, 2, 8, 1, hairC); Rb(3, 3, 10, 7, hairC); Rb(4, 10, 8, 1, hairC); Rb(6, 11, 4, 1, hairC);
    Pb(6, 3, hairH); Pb(7, 3, hairH); Pb(9, 5, hairH);
    if (s.style === 'spiky') { Pb(5, 0, hairC); Pb(8, 0, hairC); Pb(10, 0, hairC); Pb(2, 3, hairC); Pb(13, 3, hairC); Pb(4, 11, hairC); Pb(11, 11, hairC); }
    if (s.style === 'bun') { Rb(6, 0, 4, 2, hairC); Pb(7, 0, hairH); }
    if (s.style === 'messy') { Pb(5, 0, hairC); Pb(9, 0, hairC); }
    if (s.style === 'braid') { Rb(7, 11, 2, 8, hairC); Pb(7, 12, hairH); Pb(8, 18, s.bandana); Pb(7, 18, s.bandana); }
    if (s.beard) { Rb(4, 10, 8, 2, hairC); }
    if (s.goggles) { Rb(3, 4, 10, 1, '#6b4a2a'); Pb(12, 4, '#c9a24b'); }
    if (s.cap) { Rb(4, 1, 8, 3, s.cap); Rb(5, 0, 6, 1, s.cap); Rb(3, 4, 10, 1, shade(s.cap, -0.1)); Pb(7, 2, shade(s.cap, 0.4)); }
    if (s.bandana) { Rb(3, 3, 10, 2, s.bandana); Pb(7, 5, s.bandana); Pb(8, 5, shade(s.bandana, -0.2)); Pb(7, 6, s.bandana); }
    if (s.scarf && !s.cape) { Rb(4, 11, 8, 2, s.scarf); }
  } else { /* left */
    const sw = A ? -1 : B ? 1 : 0;
    if (s.cape) { const w = A ? 1 : B ? 0 : 1; Rb(9, 12, 3 + w, 9, s.cape); Rb(11 + w, 13, 1, 8, s.capeD); }
    if (robe) { R(5, 18, 7, 5, s.top); R(5, 22, 7, 1, s.topD); R(5 + sw, 23, 2, 1, s.shoe); R(9 - sw, 23, 2, 1, s.shoe); }
    else {
      R(7 - sw * 2 + 1, 18, 3, 4, shade(s.pants, -0.25)); R(7 - sw * 2 + 1, 22, 3, 2, shade(s.shoe, -0.15));
      R(6 + sw * 2, 18, 3, 4, s.pants); R(5 + sw * 2, 22, 4, 2, s.shoe);
    }
    Rb(5, 12, 6, 7, s.top); Rb(10, 12, 1, 7, s.topD);
    if (s.belt) Rb(5, 18, 6, 1, s.belt); else if (robe) Rb(5, 18, 6, 1, s.belt || s.topD); else Rb(5, 18, 6, 1, shade(s.pants, -0.3));
    if (s.overalls) { Rb(5, 15, 5, 4, s.overalls); Pb(6, 16, '#e8c24a'); }
    if (s.apron) { Rb(5, 15, 4, 4, s.apron); }
    if (s.scarf) { Rb(4, 11, 7, 2, s.scarf); Rb(10, 12, 3, 1, s.scarf); Rb(11 + (A ? 1 : 0), 13, 2, 2, s.scarfD); }
    Rb(7 - sw, 13, 2, 4, shade(s.top, -0.12)); Pb(7 - sw, 17, s.skin); Pb(8 - sw, 17, s.skin);
    /* head */
    Rb(5, 1, 6, 1, hairC); Rb(4, 2, 8, 1, hairC); Rb(3, 3, 10, 2, hairC); Rb(8, 5, 5, 5, hairC); Rb(9, 10, 3, 1, hairC);
    Rb(3, 5, 5, 6, s.skin); Rb(4, 11, 4, 1, s.skin); Pb(2, 9, s.skin); Rb(3, 5, 4, 1, hairC); Pb(7, 5, hairC); Pb(6, 2, hairH); Pb(7, 2, hairH); Pb(10, 6, hairH);
    Rb(4, 7, 1, 2, s.eye); Pb(4, 7, '#fff'); Pb(3, 10, '#b5524a'); Pb(4, 9, '#f2a39b'); Rb(8, 8, 1, 2, s.skinD);
    if (s.freckles) { Pb(4, 9, s.skinD); Pb(5, 9, s.skinD); }
    if (s.style === 'spiky') { Pb(5, 0, hairC); Pb(8, 0, hairC); Pb(11, 1, hairC); Pb(12, 3, hairC); Pb(13, 4, hairC); Pb(12, 9, hairC); }
    if (s.style === 'bun') { Rb(8, 0, 4, 3, hairC); Pb(9, 0, hairH); }
    if (s.style === 'messy') { Pb(5, 0, hairC); Pb(9, 0, hairC); Pb(12, 5, hairC); }
    if (s.style === 'braid') { Rb(11, 6, 2, 9, hairC); Pb(11, 15, s.bandana); Pb(12, 15, s.bandana); Pb(11, 8, hairH); }
    if (s.beard) { Rb(3, 9, 5, 4, hairC); Rb(2, 9, 1, 2, hairC); Rb(4, 12, 3, 1, hairH); }
    if (s.glasses) { Rb(3, 6, 3, 1, '#2d2d3a'); Rb(3, 9, 3, 1, '#2d2d3a'); Pb(3, 7, '#2d2d3a'); Pb(3, 8, '#2d2d3a'); Pb(5, 7, '#2d2d3a'); Pb(5, 8, '#2d2d3a'); R(6, 7 + b, 4, 1, '#2d2d3a'); }
    if (s.goggles) { Rb(3, 3, 9, 1, '#6b4a2a'); Rb(3, 3, 3, 2, '#c9a24b'); Pb(4, 3, '#8fe3f0'); Pb(4, 4, '#6fc7d8'); }
    if (s.cap) { Rb(4, 1, 8, 3, s.cap); Rb(5, 0, 6, 1, s.cap); Rb(1, 4, 11, 1, shade(s.cap, 0.25)); Rb(2, 3, 3, 1, s.cap); Pb(7, 2, shade(s.cap, 0.4)); }
    if (s.bandana) { Rb(3, 3, 9, 2, s.bandana); Pb(12, 4, s.bandana); Pb(13, 5, s.bandana); Pb(13, 4, shade(s.bandana, -0.2)); }
  }
  return outlineCanvas(c);
}

/* ---------- MILO: 16x22, hovering robot ---------- */
function miloFrame(dir, f) {
  const d = dir === 'right' ? 'left' : dir;
  const c = mkc(18, 24), g = c.getContext('2d'), { R, P } = rr(g), S = CH.milo, fl = f % 2;
  const gold = '#e0b84a';
  R(9, 0, 1, 3, S.skinD); R(8, 0, 3, 1, gold); P(9, 0, '#fff3b0');
  if (d === 'down') {
    R(3, 3, 12, 9, S.skin); R(4, 2, 10, 1, S.skin); R(4, 12, 10, 1, S.skinD); R(3, 3, 1, 9, '#f5f7fc'); R(14, 3, 1, 9, S.skinD);
    R(2, 6, 1, 4, gold); R(15, 6, 1, 4, gold);
    R(4, 5, 10, 6, '#12172b'); R(4, 5, 10, 1, '#222a4a');
    R(6, 7, 2, 2, S.eye); R(11, 7, 2, 2, S.eye); P(6, 7, '#d8ffff'); P(11, 7, '#d8ffff'); R(8, 10, 2, 1, '#2fb7c4');
    R(6, 13, 6, 4, S.top); R(6, 13, 6, 1, '#f1f3f9'); P(9, 14, gold); P(8, 15, gold);
    R(4, 13 + fl, 2, 3, S.skin); R(12, 13 + (1 - fl), 2, 3, S.skin); P(4, 16 + fl, gold); P(13, 16 + (1 - fl), gold);
  } else if (d === 'up') {
    R(3, 3, 12, 9, S.skin); R(4, 2, 10, 1, S.skin); R(4, 12, 10, 1, S.skinD); R(14, 3, 1, 9, S.skinD);
    R(2, 6, 1, 4, gold); R(15, 6, 1, 4, gold); R(5, 5, 8, 6, S.skinD); R(6, 6, 6, 1, S.skin); R(6, 8, 6, 1, S.skin); R(6, 10, 6, 1, S.skin);
    R(6, 13, 6, 4, S.topD); P(9, 14, gold);
    R(4, 13 + fl, 2, 3, S.skin); R(12, 13 + (1 - fl), 2, 3, S.skin);
  } else {
    R(4, 3, 10, 9, S.skin); R(5, 2, 8, 1, S.skin); R(5, 12, 8, 1, S.skinD); R(13, 3, 1, 9, S.skinD);
    R(14, 6, 1, 4, gold); R(2, 5, 3, 6, '#12172b'); R(2, 5, 3, 1, '#222a4a'); R(3, 7, 2, 2, S.eye); P(3, 7, '#d8ffff');
    R(6, 13, 6, 4, S.top); P(7, 14, gold); R(8, 13 + fl, 3, 3, S.skin); P(9, 16 + fl, gold);
  }
  R(7, 17, 4, 1, S.skinD); R(8, 18, 2, 1, '#ffb347'); if (fl) { R(8, 19, 2, 2, '#ffd27a'); } else { R(8, 19, 2, 1, '#ffb347'); P(9, 20, '#ff7a2f'); }
  let o = outlineCanvas(c);
  return dir === 'right' ? flipH(o) : o;
}

/* ---------- Misprint: ink spirit 24x30 ---------- */
function misprintFrame(f, mood) {
  const c = mkc(26, 32), g = c.getContext('2d'), { R, P } = rr(g), S = CH.misprint;
  const sw = Math.round(Math.sin(f * Math.PI / 2) * 1);
  /* body rows */
  for (let y = 6; y < 28; y++) {
    let w;
    if (y < 16) w = Math.sqrt(Math.max(0, 81 - Math.pow(y - 15, 2))); else w = 9 - (y - 16) * 0.12 + Math.sin(y * 0.9 + f) * 0.7;
    const x0 = Math.round(13 - w) + (y > 18 ? sw : 0), x1 = Math.round(13 + w) + (y > 18 ? sw : 0);
    R(x0, y, x1 - x0, 1, S.skin);
  }
  [[6, 24, 5 + (f % 2)], [12, 25, 4 + ((f + 1) % 2) * 2], [17, 24, 5 + ((f + 2) % 3)]].forEach(([x, y, h]) => { R(x + sw, y, 3, h, S.skin); R(x + sw + 1, y + h, 1, 1, S.skin); });
  R(8, 9, 3, 1, S.hairL); R(7, 10, 1, 4, S.hairL); R(18, 10, 1, 8, S.skinD); R(17, 20, 1, 6, S.skinD);
  P(10, 8, '#6b6bb0'); P(9, 9, '#6b6bb0');
  /* stamp on head */
  R(11, 0, 4, 4, '#8b5a2b'); R(12, 0, 2, 1, '#b07a42'); R(8, 4, 10, 3, '#d94a5a'); R(8, 4, 10, 1, '#f27a88'); R(8, 6, 10, 1, '#a82e3f');
  /* face */
  const sad = mood === 'sad', ang = mood === 'angry' || mood === 'smug';
  R(7, 12, 4, 5, '#fff'); R(15, 12, 4, 5, '#fff');
  R(sad ? 8 : 9, 14, 2, 3, '#14142b'); R(sad ? 16 : 16, 14, 2, 3, '#14142b'); P(9, 14, '#fff'); P(16, 14, '#fff');
  if (ang) { R(6, 11, 5, 1, '#fff'); R(15, 11, 5, 1, '#fff'); P(10, 12, '#2a2a48'); P(15, 12, '#2a2a48'); }
  if (sad) { R(7, 11, 4, 1, '#2a2a48'); R(15, 11, 4, 1, '#2a2a48'); P(8, 18, '#7fc8ff'); }
  if (mood === 'hurt') { R(7, 12, 4, 5, '#fff'); R(8, 13, 2, 3, '#14142b'); R(7, 14, 4, 1, '#14142b'); R(15, 14, 4, 1, '#14142b'); }
  const m = (x, y) => P(x, y, '#fff');
  if (sad) { [[10, 20], [11, 19], [12, 19], [13, 19], [14, 19], [15, 20]].forEach(([x, y]) => m(x, y)); }
  else { [[9, 19], [10, 20], [11, 19], [12, 20], [13, 19], [14, 20], [15, 19], [16, 20]].forEach(([x, y]) => m(x, y)); }
  return outlineCanvas(c, '#0e0e1f');
}

/* ---------- cache ---------- */
const Sprites = {
  cache: {},
  get(id, dir, f) {
    const k = id + dir + f;
    if (!this.cache[k]) {
      const s = CH[id];
      this.cache[k] = s.robot ? miloFrame(dir, f) : s.spirit ? misprintFrame(f, 'smug') : (dir === 'right' ? flipH(human(s, 'left', f)) : human(s, dir, f));
    }
    return this.cache[k];
  },
  mood(id, f, mood) { const k = id + 'm' + mood + f; if (!this.cache[k]) this.cache[k] = misprintFrame(f, mood); return this.cache[k]; },
};

/* ---------- portraits: 48x48 with 8+ expressions ---------- */
const EXPR = ['neutral', 'happy', 'surprised', 'thinking', 'sad', 'angry', 'confident', 'determined'];
const GLYPH = {
  '!': ['..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '?': ['.###.', '#...#', '...#.', '..#..', '.....', '..#..'],
  star: ['..#..', '..#..', '#####', '..#..', '..#..'],
  anger: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  sweat: ['..#..', '.###.', '.###.', '..#..'],
  heart: ['.#.#.', '#####', '#####', '.###.', '..#..'],
  note: ['..##.', '..#.#', '..#..', '###..', '###..'],
  dots: ['.....', '.....', '#.#.#'],
  z: ['####', '..#.', '.#..', '####'],
};
function glyph(g, name, x, y, col) { const rows = GLYPH[name]; rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] === '#') { g.fillStyle = col; g.fillRect(x + i, y + j, 1, 1); } }); }

function faceParts(g, s, expr, ink, white, cx0, cy, browC, mouthC, spirit) {
  const { R, P } = rr(g), lx = cx0 - 7, rx = cx0 + 7;
  const eye = (cx, side) => {
    const y = cy;
    if (expr === 'happy') { R(cx - 1, y - 1, 3, 1, ink); R(cx - 2, y, 2, 1, ink); R(cx + 1, y, 2, 1, ink); R(cx - 3, y + 1, 2, 1, ink); R(cx + 2, y + 1, 2, 1, ink); return; }
    if (expr === 'surprised') { R(cx - 3, y - 4, 6, 8, ink); R(cx - 2, y - 3, 4, 6, white); R(cx - 1, y - 2, 2, 3, ink); P(cx - 1, y - 2, white); return; }
    if (expr === 'thinking') { R(cx - 3, y - 3, 6, 6, ink); R(cx - 2, y - 2, 4, 4, white); R(cx, y - 2, 2, 2, ink); return; }
    if (expr === 'sad') { R(cx - 2, y - 2, 4, 5, ink); R(cx - 1, y - 1, 2, 2, white); P(cx - 1, y + 2, white); R(cx - 3 + (side > 0 ? 5 : 0), y + 4, 1, 2, '#7fc8ff'); return; }
    if (expr === 'angry') { R(cx - 2, y - 1, 4, 3, ink); P(cx - 1, y - 1, white); return; }
    if (expr === 'confident') { R(cx - 2, y - 1, 4, 3, ink); R(cx - 3, y - 2, 6, 1, ink); R(cx - 1, y, 1, 1, white); return; }
    if (expr === 'determined') { R(cx - 2, y - 2, 4, 5, ink); R(cx - 1, y - 2, 2, 2, white); return; }
    R(cx - 1, y - 3, 2, 1, ink); R(cx - 2, y - 2, 4, 4, ink); R(cx - 1, y + 2, 2, 1, ink); R(cx - 1, y - 2, 1, 2, white);
  };
  eye(lx, -1); eye(rx, 1);
  const brow = (cx, side, slope, lift) => {
    const base = cy - 6 - lift;
    for (let i = 0; i < 6; i++) {
      const inner = side < 0 ? 5 : 0, dd = Math.abs(i - inner), yy = base - Math.round(slope * (5 - dd) / 2.5);
      P(cx - 3 + i, yy, browC); if (slope === 0 && false) P(cx - 3 + i, yy + 1, browC);
    }
  };
  if (!spirit || true) {
    const m = { neutral: [0, 0], happy: [0, 1], surprised: [0, 3], thinking: [0, 0], sad: [1, 0], angry: [-1, 0], confident: [0, 0], determined: [-1, 0] }[expr] || [0, 0];
    brow(lx, -1, m[0], m[1]); brow(rx, 1, expr === 'thinking' ? 0 : m[0], expr === 'thinking' ? 3 : m[1]);
    if (expr === 'determined') { R(lx - 3, cy - 5, 6, 1, browC); R(rx - 3, cy - 5, 6, 1, browC); }
  }
  const my = cy + 8, mc = mouthC;
  if (expr === 'neutral') R(cx0 - 2, my, 5, 1, mc);
  if (expr === 'happy') { R(cx0 - 3, my - 1, 7, 1, mc); R(cx0 - 2, my, 5, 2, '#b3262f'); R(cx0 - 1, my + 2, 3, 1, mc); R(cx0 - 2, my, 5, 1, '#fff'); }
  if (expr === 'surprised') { R(cx0 - 1, my - 1, 3, 4, mc); R(cx0, my, 1, 2, '#b3262f'); }
  if (expr === 'thinking') { R(cx0 - 1, my, 4, 1, mc); P(cx0 + 3, my - 1, mc); }
  if (expr === 'sad') { R(cx0 - 2, my + 1, 5, 1, mc); P(cx0 - 3, my + 2, mc); P(cx0 + 3, my + 2, mc); }
  if (expr === 'angry') { R(cx0 - 3, my + 1, 7, 1, mc); P(cx0 - 3, my, mc); P(cx0 + 3, my, mc); R(cx0 - 2, my + 2, 5, 1, '#fff'); }
  if (expr === 'confident') { R(cx0 - 3, my, 6, 1, mc); P(cx0 + 3, my - 1, mc); P(cx0 + 4, my - 2, mc); }
  if (expr === 'determined') { R(cx0 - 3, my + 1, 7, 1, mc); P(cx0 - 3, my + 2, mc); P(cx0 + 3, my + 2, mc); }
}

function exprExtras(g, expr) {
  const gold = '#ffd24a';
  if (expr === 'surprised') glyph(g, '!', 38, 2, gold);
  if (expr === 'thinking') glyph(g, '?', 37, 2, '#7fc8ff');
  if (expr === 'angry') glyph(g, 'anger', 37, 3, '#ff5a4a');
  if (expr === 'confident') { glyph(g, 'star', 38, 4, gold); }
  if (expr === 'happy') { glyph(g, 'star', 39, 3, gold); }
  if (expr === 'sad') { glyph(g, 'dots', 36, 6, '#9aa7c7'); }
  if (expr === 'determined') { glyph(g, 'star', 38, 5, '#ff9a4a'); }
}

function portraitHuman(id, expr) {
  const s = CH[id], c = mkc(48, 48), g = c.getContext('2d'), { R, P } = rr(g);
  const hair = s.hair, hl = s.hairL, bd = shade(s.hair, -0.45);
  /* hair back */
  if (s.style === 'braid') { R(9, 18, 4, 24, hair); R(33, 18, 5, 26, hair); R(35, 30, 4, 12, hair); R(36, 44, 3, 2, s.bandana); }
  if (s.style === 'elder') { R(9, 16, 4, 14, hair); R(35, 16, 4, 14, hair); }
  if (s.style === 'bun') { R(9, 18, 4, 12, hair); R(35, 18, 4, 12, hair); R(18, 1, 12, 8, hair); R(20, 1, 6, 2, hl); }
  if (s.style === 'spiky') { R(9, 16, 4, 10, hair); R(35, 16, 4, 10, hair); }
  if (s.style === 'messy') { R(9, 16, 4, 12, hair); R(35, 16, 4, 12, hair); }
  /* body */
  R(9, 40, 30, 8, s.top); R(9, 40, 30, 1, shade(s.top, 0.2)); R(10, 39, 28, 1, s.top); R(36, 41, 3, 7, s.topD);
  if (s.overalls) { R(13, 41, 5, 7, s.overalls); R(30, 41, 5, 7, s.overalls); P(15, 44, '#e8c24a'); P(32, 44, '#e8c24a'); }
  if (s.apron) { R(15, 43, 18, 5, s.apron); }
  if (s.robe && s.belt) { R(22, 41, 4, 7, s.belt); }
  /* neck */
  R(20, 34, 8, 7, s.skinD);
  if (s.scarf) { R(11, 38, 26, 5, s.scarf); R(11, 41, 26, 2, s.scarfD); R(30, 42, 6, 6, s.scarf); R(32, 43, 3, 5, s.scarfD); }
  /* head */
  for (let y = 7; y <= 37; y++) {
    const dy = y - 22, ry = y < 22 ? 14 : 15, w = 13.5 * Math.sqrt(Math.max(0, 1 - Math.pow(dy / ry, 2)));
    if (w > 0) R(Math.round(24 - w), y, Math.round(w * 2), 1, s.skin);
  }
  R(10, 22, 1, 4, s.skinD); R(37, 22, 1, 4, s.skinD);
  /* cheeks */
  if (expr === 'happy' || expr === 'confident') { R(12, 27, 4, 2, '#f7a1a0'); R(32, 27, 4, 2, '#f7a1a0'); }
  if (s.freckles) { [[15, 27], [18, 28], [13, 28], [30, 28], [33, 27], [35, 28]].forEach(([x, y]) => P(x, y, s.skinD)); }
  faceParts(g, s, expr, s.eye, '#ffffff', 24, 23, bd, '#7a2b2b', false);
  /* beard / glasses before hair so hair frames */
  if (s.beard) { R(14, 28, 20, 10, hair); R(16, 36, 16, 3, hair); R(18, 27, 5, 2, hair); R(25, 27, 5, 2, hair); R(15, 28, 18, 1, hl); R(20, 30, 8, 1, shade(hair, -0.2));
    const my = 31; R(21, my, 6, 2, shade(hair, -0.35)); if (expr === 'happy') R(22, my + 1, 4, 2, '#b3262f'); }
  if (s.glasses) { [17, 31].forEach((cx) => { R(cx - 5, 17, 10, 1, '#2d2d3a'); R(cx - 5, 27, 10, 1, '#2d2d3a'); R(cx - 5, 17, 1, 11, '#2d2d3a'); R(cx + 4, 17, 1, 11, '#2d2d3a'); R(cx - 4, 18, 8, 1, 'rgba(255,255,255,0.35)'); }); R(22, 22, 4, 1, '#2d2d3a'); }
  /* hair front */
  for (let y = 5; y <= 17; y++) {
    const dy = y - 22, w = 15 * Math.sqrt(Math.max(0, 1 - Math.pow(dy / 17.5, 2)));
    if (w > 0) R(Math.round(24 - w), y, Math.round(w * 2), 1, hair);
  }
  R(11, 14, 3, 12, hair); R(34, 14, 3, 12, hair);
  for (let x = 12; x <= 35; x++) { const dx = Math.abs(x - 24), len = 2 + Math.floor(dx / 4) + ((x % 5 < 2) ? 1 : 0); R(x, 14, 1, len + 1, hair); }
  R(18, 8, 10, 2, hl); R(22, 11, 6, 1, hl);
  if (s.style === 'spiky') { [[14, 3, 4, 5], [20, 1, 4, 6], [27, 2, 4, 6], [33, 4, 4, 5], [9, 10, 4, 4], [37, 11, 3, 4]].forEach(([x, y, w, h]) => R(x, y, w, h, hair)); R(21, 2, 2, 3, hl); }
  if (s.style === 'messy') { [[14, 3, 4, 4], [22, 1, 4, 5], [30, 3, 4, 4]].forEach(([x, y, w, h]) => R(x, y, w, h, hair)); }
  if (s.style === 'elder') { R(12, 12, 24, 3, hair); R(14, 8, 20, 4, hair); R(18, 6, 12, 2, hl); R(14, 15, 6, 3, hair); R(28, 15, 6, 3, hair); R(14, 15, 20, 1, hair); }
  if (s.goggles) { R(10, 11, 28, 3, '#6b4a2a'); R(12, 7, 10, 7, '#c9a24b'); R(26, 7, 10, 7, '#c9a24b'); R(14, 9, 6, 4, '#8fe3f0'); R(28, 9, 6, 4, '#8fe3f0'); R(15, 9, 2, 2, '#e9ffff'); R(29, 9, 2, 2, '#e9ffff'); R(14, 12, 6, 1, '#5fb7c8'); R(28, 12, 6, 1, '#5fb7c8'); }
  if (s.cap) { R(11, 4, 26, 12, s.cap); R(14, 2, 20, 3, s.cap); R(9, 15, 30, 3, shade(s.cap, 0.2)); R(11, 18, 26, 2, shade(s.cap, -0.3)); R(20, 6, 8, 3, shade(s.cap, 0.35)); R(22, 9, 4, 4, shade(s.cap, 0.15)); P(24, 10, '#fff'); }
  if (s.bandana) { R(10, 10, 28, 6, s.bandana); R(10, 10, 28, 1, shade(s.bandana, 0.3)); R(34, 14, 6, 5, s.bandana); R(38, 17, 3, 5, shade(s.bandana, -0.2)); [[14, 12], [20, 13], [26, 12], [32, 13]].forEach(([x, y]) => R(x, y, 2, 2, '#fff2')); }
  exprExtras(g, expr);
  return outlineCanvas(c);
}

function portraitMilo(expr) {
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
  return outlineCanvas(c);
}

function portraitMisprint(expr) {
  const c = mkc(48, 48), g = c.getContext('2d'), { R, P } = rr(g), S = CH.misprint;
  /* blob */
  for (let y = 10; y < 48; y++) {
    const dy = y - 26, w = y < 26 ? 18 * Math.sqrt(Math.max(0, 1 - Math.pow(dy / 16, 2))) : 18 - (y - 26) * 0.1 + Math.sin(y * 0.7) * 0.8;
    R(Math.round(24 - w), y, Math.round(w * 2), 1, S.skin);
  }
  R(10, 18, 3, 8, S.hairL); R(14, 13, 6, 2, S.hairL); R(36, 24, 2, 14, S.skinD);
  [[12, 44, 4, 4], [22, 46, 4, 2], [32, 44, 4, 4]].forEach(([x, y, w, h]) => R(x, y, w, h, S.skin));
  /* stamp */
  R(21, 0, 6, 6, '#8b5a2b'); R(22, 0, 3, 1, '#b07a42'); R(15, 6, 18, 4, '#d94a5a'); R(15, 6, 18, 1, '#f27a88'); R(15, 9, 18, 1, '#a82e3f');
  /* face with white eyes */
  faceParts(g, S, expr, '#14142b', '#ffffff', 24, 25, '#ffffff', '#ffffff', true);
  [[17, 25], [31, 25]].forEach(([cx, cy]) => { R(cx - 4, cy - 4, 8, 9, '#fff'); });
  const pup = (cx, cy, dx, dy, h) => { R(cx - 1 + dx, cy - 1 + dy, 3, h || 4, '#14142b'); P(cx - 1 + dx, cy - 1 + dy, '#fff'); };
  const dyE = expr === 'sad' ? 1 : 0;
  pup(17, 25, expr === 'thinking' ? 1 : 0, dyE - (expr === 'thinking' ? 1 : 0), expr === 'surprised' ? 3 : 4); pup(31, 25, expr === 'thinking' ? 1 : 0, dyE - (expr === 'thinking' ? 1 : 0), expr === 'surprised' ? 3 : 4);
  if (expr === 'angry' || expr === 'determined' || expr === 'confident') { R(13, 20, 9, 2, S.skin); R(27, 20, 9, 2, S.skin); }
  if (expr === 'happy') { R(13, 20, 9, 5, S.skin); R(27, 20, 9, 5, S.skin); R(14, 25, 7, 1, '#fff'); R(28, 25, 7, 1, '#fff'); }
  if (expr === 'sad') { R(13, 20, 9, 2, S.skin); R(27, 20, 9, 2, S.skin); R(16, 31, 2, 4, '#7fc8ff'); }
  /* mouth: jagged white smile */
  const mm = expr === 'sad' ? [[19, 36], [21, 35], [23, 35], [25, 35], [27, 35], [29, 36]] : [[17, 34], [19, 36], [21, 34], [23, 36], [25, 34], [27, 36], [29, 34], [31, 36]];
  R(15, 33, 18, 4, S.skin); mm.forEach(([x, y]) => R(x, y, 2, 1, '#fff'));
  exprExtras(g, expr);
  return outlineCanvas(c, '#0e0e1f');
}

const Portraits = {
  cache: {},
  get(id, expr) {
    expr = EXPR.includes(expr) ? expr : 'neutral';
    const k = id + expr;
    if (!this.cache[k]) this.cache[k] = id === 'milo' ? portraitMilo(expr) : id === 'misprint' ? portraitMisprint(expr) : portraitHuman(id, expr);
    return this.cache[k];
  },
  url(id, expr) { const c = this.get(id, expr); if (!c._u) c._u = c.toDataURL(); return c._u; },
};

/* ---------- fruit icons ---------- */
const Fruits = {
  cache: {},
  get(f, size) {
    const k = [f.c, f.s, Math.round((f.w || 120) / 10), f.kind || '', size || 16].join();
    if (this.cache[k]) return this.cache[k];
    const c = mkc(16, 16), g = c.getContext('2d'), { R, P } = rr(g), col = (COLORS[f.c] || COLORS.Red).css;
    const hi = shade(col, 0.45), lo = shade(col, -0.32);
    if (f.kind === 'cherry') {
      [[4, 10], [10, 10]].forEach(([x, y]) => { R(x - 2, y - 2, 5, 5, col); R(x - 1, y - 3, 3, 1, col); R(x - 1, y + 3, 3, 1, lo); P(x - 1, y - 1, '#fff'); });
      R(5, 4, 1, 4, '#4f7a2a'); R(10, 4, 1, 4, '#4f7a2a'); R(6, 3, 4, 1, '#4f7a2a'); R(8, 2, 3, 1, '#6fb04a');
    } else if (f.s === 'Long') {
      const pts = [[3, 11], [4, 12], [5, 12], [6, 12], [7, 12], [8, 11], [9, 10], [10, 8], [11, 6], [12, 4]];
      pts.forEach(([x, y]) => { R(x, y - 2, 1, 4, col); });
      pts.forEach(([x, y]) => { P(x, y + 1, lo); P(x, y - 2, hi); });
      R(12, 2, 2, 2, '#7a5a2a'); R(2, 11, 2, 2, '#4a3a1c');
    } else {
      const r = Math.max(4, Math.min(7, 3 + (f.w || 120) / 40)), cx = 8, cy = 9;
      for (let y = -8; y <= 8; y++) for (let x = -8; x <= 8; x++) { const d = Math.sqrt(x * x + y * y); if (d <= r) { P(cx + x, cy + y, d > r - 1.2 && (x + y > 0) ? lo : col); } }
      for (let y = -8; y <= 8; y++) for (let x = -8; x <= 8; x++) { const d = Math.sqrt((x + 2) * (x + 2) + (y + 2) * (y + 2)); if (d < r * 0.35) P(cx + x, cy + y, hi); }
      R(8, Math.round(cy - r) - 2, 1, 3, '#5a3a1f'); R(9, Math.round(cy - r) - 3, 3, 2, '#5cb85c'); P(10, Math.round(cy - r) - 3, '#8bd46e');
      if (f.c === 'Orange') { [[6, 8], [9, 11], [11, 8], [7, 12]].forEach(([x, y]) => P(x, y, lo)); }
      if (f.c === 'Purple' || f.c === 'Lilac') { R(7, Math.round(cy - r) + 1, 2, 1, lo); }
    }
    outlineCanvas(c, '#2b1d1f'); this.cache[k] = c; return c;
  },
  url(f) { const c = this.get(f); if (!c._u) c._u = c.toDataURL(); return c._u; },
  img(f, cls) { const i = new Image(); i.src = this.url(f); i.className = 'fruit ' + (cls || ''); i.alt = ''; return i; },
};

/* ---------- emotes (7x7 bubble icons drawn in world) ---------- */
const EMOTE_ART = {
  '!': { c: '#ffd24a', g: '!' }, '?': { c: '#7fc8ff', g: '?' }, heart: { c: '#ff6b8a', g: 'heart' }, star: { c: '#ffd24a', g: 'star' },
  sweat: { c: '#7fc8ff', g: 'sweat' }, anger: { c: '#ff5a4a', g: 'anger' }, note: { c: '#b58cff', g: 'note' }, dots: { c: '#9aa7c7', g: 'dots' }, z: { c: '#9aa7c7', g: 'z' },
};
const Emotes = {
  cache: {},
  get(name) {
    if (this.cache[name]) return this.cache[name];
    const e = EMOTE_ART[name] || EMOTE_ART['!'], c = mkc(11, 11), g = c.getContext('2d');
    g.fillStyle = '#fffdf2'; g.fillRect(1, 0, 9, 9); g.fillRect(0, 1, 11, 7); g.fillRect(3, 9, 3, 2);
    g.fillStyle = '#1d1526'; g.fillRect(1, 0, 9, 1); g.fillRect(1, 9, 3, 1); g.fillRect(6, 9, 4, 1); g.fillRect(0, 1, 1, 8); g.fillRect(10, 1, 1, 8); g.fillRect(3, 10, 3, 1); g.fillRect(2, 9, 1, 1); g.fillRect(6, 9, 1, 1);
    g.fillStyle = '#fffdf2'; g.fillRect(3, 9, 3, 1);
    const rows = GLYPH[e.g], w = rows[0].length, h = rows.length;
    glyph(g, e.g, 1 + Math.floor((9 - w) / 2) + 0, 1 + Math.floor((8 - h) / 2), e.c);
    return (this.cache[name] = c);
  },
};
