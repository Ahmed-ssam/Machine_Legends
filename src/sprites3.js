'use strict';
/* ===== sprites3.js: high-detail painted characters (all humans). Painted at 4x, then reduced to the hero's pixel density ===== */
const NW = 31, NH = 42, NK = 4, NOUT = '#1a1020';
function npGrad(c) { return c; }
function pathFill(g, fn, base, lw) {
  g.save(); g.beginPath(); fn(g); g.fillStyle = shade(base, -0.34); g.fill(); g.clip(); g.translate(-0.9, -0.9); g.beginPath(); fn(g); g.fillStyle = base; g.fill(); g.restore();
  g.save(); g.beginPath(); fn(g); g.strokeStyle = shade(base, -0.62); g.lineWidth = lw || 0.5; g.stroke(); g.restore();
}
const E = (cx, cy, rx, ry) => (g) => g.ellipse(cx, cy, rx, ry, 0, 0, 7);
const RR = (x, y, w, h, r) => (g) => g.roundRect(x, y, w, h, r);
const PL = (pts) => (g) => { g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); };
function npcOutline(c, K) {
  const o = mkc(c.width, c.height), g = o.getContext('2d'), t = mkc(c.width, c.height), tg = t.getContext('2d'); tg.drawImage(c, 0, 0); tg.globalCompositeOperation = 'source-in'; tg.fillStyle = NOUT; tg.fillRect(0, 0, c.width, c.height);
  const r = K * 0.85; for (let a = 0; a < 16; a++) g.drawImage(t, Math.cos(a / 16 * 6.283) * r, Math.sin(a / 16 * 6.283) * r); g.drawImage(c, 0, 0); return o;
}
function npcReduce(hi) { const o = mkc(NW, NH), g = o.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.filter = 'contrast(1.18) saturate(1.12)'; g.drawImage(hi, 0, 0, NW, NH); return o; }

function npcPaint(s, dir, f, K) {
  K = K || NK; const hi = mkc(NW * K, NH * K), g = hi.getContext('2d'); g.scale(K, K); g.translate(0, 1.5); g.lineJoin = 'round'; g.lineCap = 'round';
  const A = f === 1, B = f === 3, bob = A || B ? -0.8 : 0, sw = A ? 1 : B ? -1 : 0, cx = 15.5, robe = !!s.robe, hairC = s.hair, hairL = s.hairL;
  const P = pathFill.bind(null, g), skin = s.skin, topC = s.top, pantC = s.pants || shade(topC, -0.4), shoeC = s.shoe;
  const eyeFace = (x, y, sc) => { sc = sc || 1; P(E(x, y, 1.6 * sc, 2.1 * sc), '#2a1620', 0.3); g.fillStyle = mix(s.eye, '#ffffff', 0.15); g.beginPath(); g.ellipse(x, y + 0.2, 1.1 * sc, 1.6 * sc, 0, 0, 7); g.fill(); g.fillStyle = '#20121a'; g.beginPath(); g.ellipse(x, y + 0.4, 0.65 * sc, 1.0 * sc, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 0.5 * sc, y - 0.6 * sc, 0.55 * sc, 0, 7); g.fill(); };
  const legs = () => {
    if (robe) { P(PL([[10.2, 29], [20.8, 29], [22.4, 37.4], [8.6, 37.4]]), topC); g.fillStyle = shade(topC, -0.25); g.fillRect(9, 36.4, 13, 1.1); g.fillStyle = shoeC; g.beginPath(); g.ellipse(12.6 + sw * 0.8, 38.2, 2, 1.2, 0, 0, 7); g.ellipse(18.4 - sw * 0.8, 38.2, 2, 1.2, 0, 0, 7); g.fill(); return; }
    [[11, A ? -1.4 : 0], [16.2, B ? -1.4 : 0]].forEach(([x, lift]) => { P(RR(x, 30.5, 4.2, 7 + lift, 1.2), pantC); P(RR(x - 0.2, 35.2 + lift, 4.6, 3.8, 1.4), shoeC); g.fillStyle = shade(shoeC, 0.3); g.fillRect(x + 0.5, 35.8 + lift, 2, 0.7); });
  };
  const torso = (front) => {
    P(RR(9.2, 18.6 + bob, 12.6, 13.2, 3), topC);
    if (front) {
      if (s.belt) { g.fillStyle = s.belt; g.fillRect(9.2, 28 + bob, 12.6, 1.9); g.fillStyle = '#fff3b0'; g.fillRect(14.4, 27.9 + bob, 2.2, 2.1); }
      else { g.fillStyle = shade(pantC, -0.2); g.fillRect(9.2, 29 + bob, 12.6, 1.2); }
      g.strokeStyle = shade(topC, -0.45); g.lineWidth = 0.4; g.beginPath(); g.moveTo(15.5, 20 + bob); g.lineTo(15.5, 28 + bob); g.stroke(); g.fillStyle = shade(topC, 0.35); g.fillRect(14.2, 22 + bob, 0.8, 0.8); g.fillRect(16.2, 24.5 + bob, 0.8, 0.8);
      if (s.apron) { P(RR(11, 22 + bob, 9, 9.5, 1.5), s.apron); g.fillStyle = shade(s.apron, 0.3); g.fillRect(11.6, 22.6 + bob, 7.8, 0.8); }
      if (s.overalls) { P(RR(11, 22.5 + bob, 9, 8.5, 1.4), s.overalls); P(RR(11, 18.6 + bob, 1.8, 5, 0.6), s.overalls); P(RR(18.2, 18.6 + bob, 1.8, 5, 0.6), s.overalls); g.fillStyle = '#e8c24a'; g.fillRect(11.2, 23 + bob, 1.4, 1.4); g.fillRect(18.4, 23 + bob, 1.4, 1.4); }
    } else if (s.apron) { g.fillStyle = shade(s.apron, -0.1); g.fillRect(14.6, 28.4 + bob, 1.8, 3); }
  };
  const arms = (front) => {
    [[6.2, A ? -1 : 0, false], [21.4, B ? -1 : 0, true]].forEach(([x, sh, r]) => { P(RR(x, 19.6 + bob + sh, 3.5, 9.4, 1.7), r ? shade(topC, -0.1) : topC); if (front || true) { g.fillStyle = skin; g.beginPath(); g.arc(x + 1.75, 29.6 + bob + sh, 1.7, 0, 7); g.fill(); g.strokeStyle = shade(skin, -0.5); g.lineWidth = 0.4; g.stroke(); } if (s.belt && front) { g.fillStyle = s.belt; g.fillRect(x, 27.6 + bob + sh, 3.5, 0.9); } });
  };
  const scarf = () => { if (!s.scarf) return; P(RR(8.8, 17.3 + bob, 13.4, 3.8, 1.9), s.scarf); P(RR(17.6, 19.4 + bob, 3.8, 8.5, 1.3), s.scarfD || shade(s.scarf, -0.2)); g.fillStyle = shade(s.scarf, 0.3); g.fillRect(10, 18 + bob, 6, 0.8); };
  const hairBack = () => {
    if (s.style === 'braid') { P(RR(21.2, 10 + bob, 3, 17, 1.5), hairC); g.fillStyle = s.bandana || '#c0508a'; g.fillRect(21.1, 26 + bob, 3.2, 1.6); g.strokeStyle = shade(hairC, -0.5); g.lineWidth = 0.35; for (let y = 12; y < 26; y += 2.6) { g.beginPath(); g.moveTo(21.4, y + bob); g.lineTo(24, y + 1.2 + bob); g.stroke(); } }
    if (s.style === 'bun') P(E(cx, 2.4 + bob, 3.6, 3.2), hairC);
    if (s.style === 'elder') P(RR(6.4, 7 + bob, 18.2, 12, 4), hairC);
    if (s.style === 'spiky' || s.style === 'messy') P(E(cx, 9.5 + bob, 9.4, 8), hairC);
  };
  const hairFront = () => {
    const hy = bob; P(E(cx, 7.6 + hy, 8.8, 5.8), hairC);
    const fr = s.style === 'spiky' ? [[7.2, 9], [9.4, 13], [11.4, 9.6], [13.3, 13.2], [15.5, 9.4], [17.7, 13.2], [19.6, 9.6], [21.6, 13], [23.8, 9]] : s.style === 'elder' ? [[7, 9], [9, 11.5], [12, 9.4], [15.5, 10.4], [19, 9.4], [22, 11.5], [24, 9]] : s.style === 'bun' ? [[7.2, 9], [9, 10.4], [15.5, 8.2], [22, 10.4], [23.8, 9]] : [[7.2, 9], [9.6, 12.2], [12, 9.8], [15, 11.6], [18, 9.6], [21.4, 12.2], [23.8, 9]];
    P(PL([[7, 5.5 + hy], ...fr.map((p) => [p[0], p[1] + hy]), [24, 5.5 + hy]]), hairC);
    g.fillStyle = hairL; g.beginPath(); g.ellipse(12.2, 4.6 + hy, 3.2, 1, -0.3, 0, 7); g.fill(); g.fillRect(17, 6 + hy, 2.5, 0.8);
    if (s.style === 'spiky') { [[[9, 4.6], [7.4, -0.2], [12.2, 3.2]], [[12.6, 3], [14.2, -1.6], [17.4, 3]], [[18, 3.4], [23, -0.2], [22.4, 5.6]], [[6.8, 8], [4.8, 4.2], [9, 5.4]], [[24.2, 8], [26.6, 4.6], [22, 5.4]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + hy])), hairC, 0.4)); }
    if (s.style === 'messy') { [[[10, 3.6], [9.4, -0.4], [13, 2.8]], [[16, 2.8], [18.6, -0.6], [20, 4]], [[6.8, 8], [5, 5], [9, 5.4]], [[24.2, 8], [26, 5.2], [22, 5.4]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + hy])), hairC, 0.4)); }
  };
  const faceBase = () => { P(E(7.6, 12.8 + bob, 1.2, 1.9), shade(skin, -0.05), 0.4); P(E(23.4, 12.8 + bob, 1.2, 1.9), shade(skin, -0.12), 0.4); P(E(cx, 11.8 + bob, 7.8, 7.2), skin); };
  const faceDetails = () => {
    const y = 12.4 + bob; eyeFace(11.6, y); eyeFace(19.4, y);
    g.strokeStyle = shade(hairC, -0.3); g.lineWidth = 0.7; g.beginPath(); g.moveTo(9.6, y - 3.2); g.lineTo(13.4, y - 3.6); g.moveTo(17.6, y - 3.6); g.lineTo(21.4, y - 3.2); g.stroke();
    g.strokeStyle = '#a24a42'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(14, y + 4.1); g.quadraticCurveTo(15.5, y + 5, 17, y + 4.1); g.stroke();
    g.fillStyle = 'rgba(240,120,110,0.35)'; g.beginPath(); g.ellipse(9.6, y + 3, 1.5, 0.9, 0, 0, 7); g.ellipse(21.4, y + 3, 1.5, 0.9, 0, 0, 7); g.fill();
    g.fillStyle = shade(skin, -0.25); g.fillRect(15.1, y + 1.8, 0.8, 0.9);
    if (s.freckles) { g.fillStyle = shade(skin, -0.3); [[9, 15.4], [10.5, 16], [12, 15.4], [19, 15.4], [20.5, 16], [22, 15.4]].forEach(([a, b]) => g.fillRect(a, b + bob, 0.7, 0.7)); }
  };
  const beard = () => { if (!s.beard) return; P(PL([[7.8, 13.6 + bob], [9, 19 + bob], [12, 23.4 + bob], [15.5, 24.8 + bob], [19, 23.4 + bob], [22, 19 + bob], [23.2, 13.6 + bob], [20, 15.6 + bob], [15.5, 16 + bob], [11, 15.6 + bob]]), hairC); g.fillStyle = hairL; g.fillRect(12, 19.6 + bob, 7, 0.8); g.fillStyle = shade(skin, -0.3); g.fillRect(14.2, 17.2 + bob, 2.6, 0.9); };
  const glasses = () => { if (!s.glasses) return; const y = 12.4 + bob; g.strokeStyle = '#2d2d3a'; g.lineWidth = 0.75; g.fillStyle = 'rgba(190,230,255,0.22)'; [11.6, 19.4].forEach((x) => { g.beginPath(); g.ellipse(x, y, 2.7, 2.6, 0, 0, 7); g.fill(); g.stroke(); }); g.beginPath(); g.moveTo(14.3, y - 0.3); g.lineTo(16.7, y - 0.3); g.stroke(); };
  const headgear = () => {
    const hy = bob;
    if (s.cap) { P(E(cx, 7 + hy, 8.8, 5.6), s.cap); P(RR(5.6, 9.2 + hy, 19.8, 2.2, 1.1), shade(s.cap, 0.18)); g.fillStyle = shade(s.cap, 0.45); g.beginPath(); g.ellipse(12.6, 4.4 + hy, 2.4, 0.9, -0.3, 0, 7); g.fill(); g.fillStyle = shade(s.cap, -0.1); g.fillRect(15.1, 1.8 + hy, 1, 1); }
    if (s.bandana) { P(RR(6.8, 8 + hy, 17.8, 3, 1.4), s.bandana); P(PL([[23.4, 9], [27, 8], [26.4, 12.4]]), shade(s.bandana, -0.12)); g.fillStyle = shade(s.bandana, 0.4); [[10, 9], [14, 9.6], [18.5, 9], [21.6, 9.6]].forEach(([a, b]) => g.fillRect(a, b + hy, 0.9, 0.9)); }
  };
  if (dir === 'down') {
    hairBack(); legs(); torso(true); arms(true); scarf(); faceBase(); faceDetails(); beard(); glasses(); hairFront(); headgear();
  } else if (dir === 'up') {
    legs(); torso(false); arms(false); if (s.scarf) P(RR(8.8, 17.3 + bob, 13.4, 3.4, 1.7), s.scarf);
    P(RR(7.6, 4 + bob, 15.8, 17, 6), hairC); P(E(cx, 11 + bob, 8.4, 8), hairC); g.fillStyle = hairL; g.beginPath(); g.ellipse(13, 6 + bob, 3.4, 1.2, -0.3, 0, 7); g.fill();
    if (s.style === 'bun') P(E(cx, 2.4 + bob, 3.6, 3.2), hairC);
    if (s.style === 'braid') { P(RR(14, 15 + bob, 3, 14, 1.5), hairC); g.fillStyle = s.bandana || '#c0508a'; g.fillRect(13.9, 27.4 + bob, 3.2, 1.6); }
    if (s.style === 'spiky') { [[[9, 4.6], [7.4, -0.2], [12.2, 3.2]], [[12.6, 3], [14.2, -1.6], [17.4, 3]], [[18, 3.4], [23, -0.2], [22.4, 5.6]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + bob])), hairC, 0.4)); }
    if (s.style === 'messy') { [[[10, 3.6], [9.4, -0.4], [13, 2.8]], [[16, 2.8], [18.6, -0.6], [20, 4]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + bob])), hairC, 0.4)); }
    if (s.cap) { P(E(cx, 7.4 + bob, 8.9, 6), s.cap); g.fillStyle = shade(s.cap, 0.4); g.beginPath(); g.ellipse(13, 5 + bob, 2.6, 1, -0.3, 0, 7); g.fill(); }
    if (s.bandana) { P(RR(6.8, 8 + bob, 17.8, 3, 1.4), s.bandana); }
    if (s.beard) { P(RR(8, 15 + bob, 15, 6, 3), hairC); }
    if (s.glasses) { g.strokeStyle = '#2d2d3a'; g.lineWidth = 0.7; g.beginPath(); g.moveTo(7.6, 11.6 + bob); g.lineTo(23.4, 11.6 + bob); g.stroke(); }
  } else { /* left profile */
    const lx = 3.2;
    if (s.style === 'braid') { P(RR(18.6, 11 + bob, 3, 16, 1.5), hairC); g.fillStyle = s.bandana || '#c0508a'; g.fillRect(18.5, 25.6 + bob, 3.2, 1.6); }
    if (s.style === 'bun') P(E(17.6, 2.6 + bob, 3.6, 3.2), hairC);
    if (s.style === 'elder') P(RR(13, 7 + bob, 10, 13, 4), hairC);
    [[12.4, -sw * 1.7, 0], [14.2, sw * 1.7, 1]].forEach(([x, dx, fr]) => { if (robe) return; P(RR(x + dx - 1.2, 30.5, 4.2, 7, 1.2), fr ? pantC : shade(pantC, -0.18)); P(RR(x + dx - 1.6, 35.2, 5, 3.8, 1.4), fr ? shoeC : shade(shoeC, -0.15)); });
    if (robe) { P(PL([[11.4, 29], [19.6, 29], [21.2, 37.4], [9.8, 37.4]]), topC); g.fillStyle = shoeC; g.beginPath(); g.ellipse(11.6 + sw, 38.2, 2.4, 1.2, 0, 0, 7); g.ellipse(17 - sw, 38.2, 2.4, 1.2, 0, 0, 7); g.fill(); }
    P(RR(10.6, 18.6 + bob, 9.4, 13.2, 3), topC);
    if (s.belt) { g.fillStyle = s.belt; g.fillRect(10.6, 28 + bob, 9.4, 1.9); }
    if (s.apron) P(RR(10.4, 22 + bob, 4, 9.4, 1.2), s.apron);
    if (s.overalls) P(RR(10.4, 22.4 + bob, 5, 8.6, 1.2), s.overalls);
    if (s.scarf) { P(RR(9.6, 17.3 + bob, 11, 3.8, 1.9), s.scarf); P(RR(19, 18.6 + bob, 5.5 + (A ? 1 : 0), 2.4, 1.1), s.scarfD || shade(s.scarf, -0.2)); }
    P(RR(12.8 - sw * 0.4, 19.8 + bob, 3.6, 9.2, 1.7), shade(topC, 0.06)); g.fillStyle = skin; g.beginPath(); g.arc(14.6 - sw * 0.4, 29.6 + bob, 1.7, 0, 7); g.fill();
    P(E(17.6, 12.6 + bob, 1.1, 1.8), shade(skin, -0.15), 0.4);
    P(E(14.6, 11.8 + bob, 7.2, 7.2), skin); P(E(11.2, 14 + bob, 1.1, 0.9), shade(skin, 0.0), 0.3); /* nose */
    P(E(17, 8 + bob, 8, 7.4), hairC);
    g.fillStyle = hairL; g.beginPath(); g.ellipse(15, 4.8 + bob, 3, 1, -0.2, 0, 7); g.fill();
    P(PL([[7.4, 8.4 + bob], [9.4, 12 + bob], [11.4, 9.4 + bob], [13.4, 11.6 + bob], [15.6, 8.6 + bob], [16, 5 + bob], [8, 5 + bob]]), hairC, 0.4);
    if (s.style === 'spiky') { [[[10, 4.6], [8.4, -0.2], [13.2, 3.2]], [[14, 3.2], [16.6, -1.4], [18.6, 3.6]], [[19, 4], [24.2, 1.2], [22.2, 6.4]], [[22, 8.4], [26, 7.6], [22, 11.6]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + bob])), hairC, 0.4)); }
    if (s.style === 'messy') { [[[11, 3.6], [10.4, -0.4], [14, 2.8]], [[17, 3], [19.6, -0.2], [21, 4.4]], [[22, 8.4], [25.4, 8.2], [22, 11.2]]].forEach((t) => P(PL(t.map((p) => [p[0], p[1] + bob])), hairC, 0.4)); }
    eyeFace(10.6, 12.4 + bob, 0.95);
    g.strokeStyle = shade(hairC, -0.3); g.lineWidth = 0.7; g.beginPath(); g.moveTo(8.8, 9 + bob); g.lineTo(12.4, 8.6 + bob); g.stroke();
    g.strokeStyle = '#a24a42'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(9.6, 16.6 + bob); g.lineTo(11.6, 16.8 + bob); g.stroke();
    g.fillStyle = 'rgba(240,120,110,0.35)'; g.beginPath(); g.ellipse(11.4, 15 + bob, 1.4, 0.8, 0, 0, 7); g.fill();
    if (s.freckles) { g.fillStyle = shade(skin, -0.3); g.fillRect(10, 15.4 + bob, 0.7, 0.7); g.fillRect(12, 15.6 + bob, 0.7, 0.7); }
    if (s.beard) P(PL([[7.6, 14.2 + bob], [8.4, 19 + bob], [12, 23 + bob], [16, 22 + bob], [20, 15 + bob], [14, 15.6 + bob], [10, 15.8 + bob]]), hairC);
    if (s.glasses) { g.strokeStyle = '#2d2d3a'; g.lineWidth = 0.75; g.fillStyle = 'rgba(190,230,255,0.22)'; g.beginPath(); g.ellipse(10.6, 12.4 + bob, 2.5, 2.5, 0, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(13, 12 + bob); g.lineTo(17.4, 11.6 + bob); g.stroke(); }
    if (s.cap) { P(E(17, 7 + bob, 8.2, 5.6), s.cap); P(RR(2.4, 9.2 + bob, 14, 2.2, 1.1), shade(s.cap, 0.18)); g.fillStyle = shade(s.cap, 0.45); g.beginPath(); g.ellipse(14, 4.4 + bob, 2.4, 0.9, -0.3, 0, 7); g.fill(); }
    if (s.bandana) { P(RR(7.6, 8 + bob, 17, 3, 1.4), s.bandana); P(PL([[22.6, 9], [26.4, 8.2], [25.6, 12.4]]), shade(s.bandana, -0.12)); }
  }
  return hi;
}
const NPC3 = { cache: {} };
function npcFrame(s, dir, f) { const hi = npcOutline(npcPaint(s, dir === 'right' ? 'left' : dir, f), NK); const o = npcReduce(hi); return dir === 'right' ? flipH(o) : o; }

/* ---------- portraits: painted at 128x128 (unit space 48) ---------- */
function npcPortrait(id, expr) {
  const s = CH[id], K = 128 / 48, c = mkc(128, 128), g = c.getContext('2d'); g.scale(K, K); g.lineJoin = 'round'; g.lineCap = 'round';
  const P = pathFill.bind(null, g), hairC = s.hair, hairL = s.hairL, skin = s.skin, ink = '#241018';
  const shy = 0.8; /* shading offset scale */
  /* hair behind */
  if (s.style === 'braid') { P(RR(8, 17, 6, 26, 3), hairC); P(RR(34, 17, 6, 28, 3), hairC); P(RR(36, 30, 4, 14, 2), hairC); g.fillStyle = s.bandana || '#c0508a'; g.fillRect(36, 44, 4, 2); }
  if (s.style === 'elder') { P(RR(7, 14, 8, 22, 4), hairC); P(RR(33, 14, 8, 22, 4), hairC); }
  if (s.style === 'bun') { P(E(24, 5, 6, 5), hairC); P(RR(8, 17, 6, 14, 3), hairC); P(RR(34, 17, 6, 14, 3), hairC); }
  if (s.style === 'spiky' || s.style === 'messy') P(E(24, 17, 17, 14), hairC);
  /* body */
  P(RR(5, 38, 38, 12, 6), s.top); if (s.belt) { g.fillStyle = s.belt; g.fillRect(20, 40, 8, 8); }
  if (s.apron) P(RR(14, 41, 20, 8, 2), s.apron);
  if (s.overalls) { P(RR(12, 41, 7, 8, 1.5), s.overalls); P(RR(29, 41, 7, 8, 1.5), s.overalls); }
  P(RR(19, 31, 10, 9, 3), shade(skin, -0.12));
  if (s.scarf) { P(RR(8, 36, 32, 7, 3.5), s.scarf); P(RR(29, 40, 8, 9, 2), s.scarfD || shade(s.scarf, -0.2)); }
  /* head */
  P(E(8.8, 24, 1.8, 3.2), shade(skin, -0.1), 0.5); P(E(39.2, 24, 1.8, 3.2), shade(skin, -0.14), 0.5);
  P(E(24, 22, 15, 15), skin, 0.7);
  /* expression */
  const em = expr, ey = 24;
  const eye = (x, side) => {
    if (em === 'happy') { g.strokeStyle = ink; g.lineWidth = 1.5; g.beginPath(); g.arc(x, ey + 1, 3, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); return; }
    if (em === 'sad') { P(E(x, ey + 0.8, 2.8, 3.2), '#2a1620', 0.3); g.fillStyle = mix(s.eye, '#fff', 0.15); g.beginPath(); g.ellipse(x, ey + 1.2, 2, 2.4, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 0.9, ey, 0.9, 0, 7); g.fill(); g.fillStyle = '#9ad8ff'; g.beginPath(); g.ellipse(x + (side ? 3 : -3), ey + 5.5, 0.9, 1.6, 0, 0, 7); g.fill(); return; }
    const rx = em === 'surprised' ? 3.6 : 3.1, ry = em === 'surprised' ? 4.4 : (em === 'angry' || em === 'determined' ? 3.2 : 3.9);
    P(E(x, ey, rx, ry), '#2a1620', 0.3); g.fillStyle = mix(s.eye, '#ffffff', 0.12); g.beginPath(); g.ellipse(x, ey + 0.4, rx - 0.9, ry - 0.8, 0, 0, 7); g.fill();
    g.fillStyle = '#1c0f16'; g.beginPath(); g.ellipse(x, ey + 0.8, rx * 0.5, ry * 0.62, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 1.2, ey - 1.2, 1.15, 0, 7); g.arc(x + 1.2, ey + 1.6, 0.55, 0, 7); g.fill();
  };
  eye(16.5, 0); eye(31.5, 1);
  g.strokeStyle = shade(hairC, -0.35); g.lineWidth = 1.3; g.beginPath();
  const by = em === 'surprised' ? ey - 7.6 : ey - 6;
  if (em === 'angry' || em === 'determined') { g.moveTo(12.5, by - 1.2); g.lineTo(20, by + 1.2); g.moveTo(35.5, by - 1.2); g.lineTo(28, by + 1.2); } else if (em === 'sad') { g.moveTo(12.5, by + 1); g.lineTo(20, by - 0.6); g.moveTo(35.5, by + 1); g.lineTo(28, by - 0.6); } else if (em === 'thinking') { g.moveTo(12.5, by); g.lineTo(20, by); g.moveTo(28, by - 1.4); g.lineTo(35.5, by - 0.2); } else { g.moveTo(12.5, by); g.lineTo(20, by - 0.3); g.moveTo(28, by - 0.3); g.lineTo(35.5, by); }
  g.stroke();
  g.fillStyle = shade(skin, -0.25); g.fillRect(23.2, ey + 4.4, 1.7, 1.6);
  const my = 33; g.strokeStyle = '#8a3a38'; g.lineWidth = 1.2; g.fillStyle = '#5a1820';
  if (em === 'happy') { g.beginPath(); g.moveTo(19, my - 0.5); g.quadraticCurveTo(24, my + 6, 29, my - 0.5); g.closePath(); g.fill(); g.fillStyle = '#fff'; g.fillRect(20.6, my - 0.2, 6.8, 1.3); }
  else if (em === 'surprised') { g.beginPath(); g.ellipse(24, my + 1, 2.4, 3, 0, 0, 7); g.fill(); }
  else if (em === 'sad') { g.beginPath(); g.moveTo(20, my + 2); g.quadraticCurveTo(24, my - 1.4, 28, my + 2); g.stroke(); }
  else if (em === 'angry') { g.beginPath(); g.moveTo(19.5, my); g.lineTo(28.5, my); g.lineTo(27.4, my + 3); g.lineTo(20.6, my + 3); g.closePath(); g.fill(); g.fillStyle = '#fff'; g.fillRect(20.8, my + 0.2, 6.4, 1); }
  else if (em === 'confident' || em === 'determined') { g.beginPath(); g.moveTo(20, my + 1); g.quadraticCurveTo(25, my + 3.2, 29.4, my - 0.6); g.stroke(); }
  else if (em === 'thinking') { g.beginPath(); g.moveTo(21.5, my + 1); g.lineTo(26.5, my + 0.6); g.stroke(); }
  else { g.beginPath(); g.moveTo(20, my); g.quadraticCurveTo(24, my + 2.6, 28, my); g.stroke(); }
  if (em === 'happy' || em === 'confident' || em === 'surprised') { g.fillStyle = 'rgba(240,120,110,0.4)'; g.beginPath(); g.ellipse(12.6, 29.6, 3, 1.8, 0, 0, 7); g.ellipse(35.4, 29.6, 3, 1.8, 0, 0, 7); g.fill(); }
  if (s.freckles) { g.fillStyle = shade(skin, -0.3); [[13, 29], [16, 30.4], [19, 29.2], [29, 29.2], [32, 30.4], [35, 29]].forEach(([a, b]) => g.fillRect(a, b, 1.2, 1.2)); }
  if (s.beard) { P(PL([[10, 26], [11.4, 34], [16, 41], [24, 44], [32, 41], [36.6, 34], [38, 26], [32, 30.4], [24, 31], [16, 30.4]]), hairC); g.fillStyle = hairL; g.fillRect(17, 36, 14, 1.6); if (em === 'happy' || em === 'surprised') { g.fillStyle = '#5a1820'; g.beginPath(); g.ellipse(24, 33.6, 3.2, 2.2, 0, 0, 7); g.fill(); } }
  if (s.glasses) { g.strokeStyle = '#2d2d3a'; g.lineWidth = 1.5; g.fillStyle = 'rgba(190,230,255,0.2)'; [16.5, 31.5].forEach((x) => { g.beginPath(); g.ellipse(x, ey, 5.8, 5.6, 0, 0, 7); g.fill(); g.stroke(); }); g.beginPath(); g.moveTo(22.3, ey - 0.6); g.lineTo(25.7, ey - 0.6); g.stroke(); g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(12.6, ey - 4, 3, 1); g.fillRect(27.6, ey - 4, 3, 1); }
  /* hair front */
  P(E(24, 12.5, 16.5, 10.6), hairC);
  const fr = s.style === 'spiky' ? [[8, 17], [12, 25], [16, 18.5], [19.6, 25.2], [24, 18], [28.4, 25.2], [32, 18.5], [36, 25], [40, 17]] : s.style === 'elder' ? [[8, 17], [12, 22], [18, 17.4], [24, 19.6], [30, 17.4], [36, 22], [40, 17]] : s.style === 'bun' ? [[8, 17], [11, 20.6], [24, 16.4], [37, 20.6], [40, 17]] : [[8, 17], [12.6, 23.4], [17, 18], [22, 22], [26, 17.6], [31, 23.4], [36, 18], [40, 17]];
  P(PL([[7, 9], ...fr, [41, 9]]), hairC, 0.6);
  g.fillStyle = hairL; g.beginPath(); g.ellipse(19, 8, 6, 1.8, -0.2, 0, 7); g.fill(); g.fillRect(28, 11, 5, 1.4);
  if (s.style === 'spiky') { [[[11, 10], [8, 1.6], [17, 7]], [[17, 7], [23, -1.4], [30, 7]], [[28, 7], [38, 1], [37, 11]], [[8, 18], [3, 11], [11, 12]], [[40, 18], [45, 11], [37, 12]]].forEach((t) => P(PL(t), hairC, 0.6)); }
  if (s.style === 'messy') { [[[13, 8], [11, 1.6], [19, 6]], [[25, 6], [31, 0.6], [34, 8]], [[8, 18], [4, 12], [11, 12]], [[40, 18], [44, 12], [37, 12]]].forEach((t) => P(PL(t), hairC, 0.6)); }
  if (s.style === 'bun') { P(E(24, 4.4, 6.4, 5.2), hairC); g.fillStyle = hairL; g.fillRect(21, 2, 5, 1.4); }
  if (s.cap) { P(E(24, 11, 16, 9.6), s.cap, 0.6); P(RR(6, 17, 36, 4, 2), shade(s.cap, 0.2), 0.6); g.fillStyle = shade(s.cap, 0.5); g.beginPath(); g.ellipse(19, 7, 5, 1.8, -0.2, 0, 7); g.fill(); }
  if (s.bandana) { P(RR(8, 14.6, 32, 6.4, 3), s.bandana, 0.6); P(PL([[36, 17], [44, 15], [43, 24]]), shade(s.bandana, -0.12), 0.6); g.fillStyle = shade(s.bandana, 0.45); [[13, 16.4], [20, 17.4], [27, 16.4], [33, 17.4]].forEach(([a, b]) => g.fillRect(a, b, 1.6, 1.6)); }
  const o = npcOutline(c, 128 / 48 * 0.5); return o;
}
(function () {
  const _get = Sprites.get.bind(Sprites), _meta = Sprites.meta.bind(Sprites), _pg = Portraits.get.bind(Portraits);
  const isH = (id) => CH[id] && !CH[id].robot && !CH[id].spirit && id !== 'hero';
  Sprites.get = function (id, dir, f) { if (!isH(id)) return _get(id, dir, f); const k = 'n3' + id + dir + f; if (!this.cache[k]) this.cache[k] = npcFrame(CH[id], dir, f); return this.cache[k]; };
  Sprites.meta = function (id) { return isH(id) ? { w: NW, h: NH, ax: 15.5, ay: NH - 3 } : _meta(id); };
  Portraits.get = function (id, expr) { if (!isH(id)) return _pg(id, expr); expr = EXPR.includes(expr) ? expr : 'neutral'; const k = 'n3' + id + expr; if (!this.cache[k]) this.cache[k] = npcPortrait(id, expr); return this.cache[k]; };
})();
