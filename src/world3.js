'use strict';
/* ===== world3.js: city 3 (Forest of Patterns) sprites, tiles, props, rooms, creature icons ===== */

/* ---------- characters ---------- */
Object.assign(CH, {
  fern: { skin: '#e9c6a2', skinD: '#d1a780', hair: '#d8ead0', hairL: '#ffffff', eye: '#2a3a2a', top: '#4a9a5a', topD: '#357a44', pants: '#3a5a3a', shoe: '#5a3a22', style: 'elder', robe: true, belt: '#d9c24a', glasses: false },
  qtree: { skin: '#9a7448', skinD: '#7a5a36', hair: '#3f9a48', hairL: '#6fcf6a', eye: '#ffe27a', top: '#6a4a2a', topD: '#4a321c', pants: '#5a4028', shoe: '#3a2a1a', style: 'messy', robe: true, belt: '#3f9a48' },
  sylvan: { skin: '#c9946a', skinD: '#ad7a52', hair: '#3a2a20', hairL: '#5a4232', eye: '#1e140e', top: '#4a7a3a', topD: '#355c2a', pants: '#5a4a32', shoe: '#2e2a20', style: 'braid', bandana: '#d9a23a', cap: '#4a7a3a' },
  oak: { skin: '#e0b48a', skinD: '#c89a70', hair: '#d6cfc0', hairL: '#f2ede2', eye: '#2a2018', top: '#7a5a34', topD: '#5a4020', pants: '#4a3a24', shoe: '#2c2218', style: 'elder', beard: true, robe: true, belt: '#d9a23a' },
  fanatic: { skin: '#f0c19a', skinD: '#d9a074', hair: '#d9422f', hairL: '#f27a5a', eye: '#2a1a14', top: '#2a2a3a', topD: '#1a1a26', pants: '#2a2a3a', shoe: '#d9422f', style: 'spiky', scarf: '#d9422f', scarfD: '#a02a1f', belt: '#e0b84a' },
  heron: { skin: '#e7c4a0', skinD: '#cfa680', hair: '#8ea6c4', hairL: '#b9cde6', eye: '#22303f', top: '#6a86aa', topD: '#4f6a8e', pants: '#7a8a9a', shoe: '#4a5a6a', style: 'bun', glasses: false },
  owlet: { skin: '#dba87c', skinD: '#c28e62', hair: '#8a5a34', hairL: '#b07a4c', eye: '#2a1a0e', top: '#a47a4a', topD: '#7e5a32', pants: '#4a3a2a', shoe: '#2c2218', style: 'messy', glasses: true },
});

/* ---------- creature icons (20x20) ---------- */
const CREA = {
  Skyfin: ['bird', '#4a9be0'], Cloudwing: ['bird', '#d8e4f0'], Windle: ['bird', '#e0a040'], Ripple: ['fish', '#38b8c8'], Deepglow: ['fish', '#7a5ad8'],
  Brookle: ['amph', '#5ab85a'], Pondle: ['amph', '#3a9a7a'], Emberfox: ['mammal', '#e0702a'], Mosskit: ['mammal', '#6a9a4a'],
  finch: ['finch', '#e8c040'], heron: ['heron', '#8ea6c4'], owl: ['owl', '#a47a4a'], bat: ['bat', '#5a4a6a'], '?': ['unknown', '#8a8a9a'],
};
const Creatures = {
  cache: {},
  url(name) {
    if (this.cache[name]) return this.cache[name];
    const [kind, col] = CREA[name] || CREA['?'], c = mkc(20, 20), g = c.getContext('2d'), { R, P } = rr(g), hi = shade(col, 0.4), lo = shade(col, -0.3);
    if (kind === 'bird') { R(2, 9, 4, 2, lo); R(5, 7, 10, 7, col); R(6, 8, 6, 3, hi); R(11, 4, 5, 5, col); P(17, 6, '#e8a020'); P(16, 6, '#e8a020'); P(14, 5, '#222'); R(7, 9, 5, 3, lo); R(8, 14, 1, 3, '#8a5a2a'); R(11, 14, 1, 3, '#8a5a2a'); }
    else if (kind === 'finch') { R(4, 8, 8, 6, col); R(5, 9, 4, 3, hi); R(9, 5, 5, 5, col); P(15, 7, '#d98020'); P(11, 6, '#222'); R(2, 10, 3, 2, lo); R(6, 14, 1, 2, '#8a5a2a'); R(9, 14, 1, 2, '#8a5a2a'); R(6, 9, 4, 2, lo); }
    else if (kind === 'heron') { R(5, 6, 8, 5, col); R(6, 7, 5, 2, hi); R(12, 2, 2, 6, col); R(12, 1, 4, 3, col); R(16, 2, 4, 1, '#e8a020'); P(13, 2, '#222'); R(8, 11, 1, 8, '#6a4a2a'); R(11, 11, 1, 8, '#6a4a2a'); R(3, 7, 3, 2, lo); }
    else if (kind === 'owl') { R(4, 4, 12, 13, col); R(5, 8, 10, 8, hi); R(4, 3, 3, 3, lo); R(13, 3, 3, 3, lo); R(5, 6, 4, 4, '#fff'); R(11, 6, 4, 4, '#fff'); P(7, 8, '#222'); P(12, 8, '#222'); P(9, 11, '#e8a020'); P(10, 11, '#e8a020'); R(7, 17, 2, 2, '#e8a020'); R(11, 17, 2, 2, '#e8a020'); }
    else if (kind === 'bat') { R(1, 6, 6, 4, col); R(13, 6, 6, 4, col); R(2, 9, 3, 2, lo); R(15, 9, 3, 2, lo); R(7, 5, 6, 8, lo); R(7, 3, 2, 3, lo); R(11, 3, 2, 3, lo); P(8, 7, '#ff6a6a'); P(11, 7, '#ff6a6a'); }
    else if (kind === 'fish') { R(3, 7, 11, 7, col); R(4, 8, 7, 3, hi); R(14, 8, 4, 5, lo); R(17, 7, 2, 7, lo); R(7, 4, 5, 3, lo); P(5, 9, '#fff'); P(5, 9, '#222'); R(9, 14, 3, 2, lo); P(4, 12, hi); }
    else if (kind === 'amph') { R(3, 9, 13, 6, col); R(4, 10, 8, 3, hi); R(2, 5, 7, 6, col); R(3, 4, 2, 2, col); R(7, 4, 2, 2, col); P(3, 4, '#fff'); P(7, 4, '#fff'); P(3, 5, '#222'); P(7, 5, '#222'); R(1, 14, 4, 3, lo); R(14, 14, 4, 3, lo); R(10, 15, 3, 2, lo); }
    else if (kind === 'mammal') { R(1, 8, 4, 3, lo); R(4, 8, 11, 6, col); R(5, 9, 6, 3, hi); R(13, 5, 5, 6, col); R(13, 3, 2, 3, col); R(16, 3, 2, 3, col); P(17, 8, '#222'); P(18, 9, '#fff'); R(5, 14, 2, 4, lo); R(8, 14, 2, 4, lo); R(11, 14, 2, 4, lo); R(14, 14, 2, 4, lo); R(1, 10, 3, 2, '#fff'); }
    else { R(5, 4, 10, 12, col); R(9, 7, 2, 4, '#fff'); R(9, 12, 2, 2, '#fff'); }
    outlineCanvas(c, '#1d2a20'); return (this.cache[name] = c.toDataURL());
  },
};
function creaHTML(name, o) {
  o = o || {};
  const feats = o.feats ? '<div class="rec-f">' + o.feats.map((f) => fmt(t(f))).join(' · ') + '</div>' : '';
  return '<div class="rec' + (o.cls ? ' ' + o.cls : '') + '"><img class="fruit" alt="" src="' + Creatures.url(name) + '"><div class="rec-l">' + (o.label || (CREA[name] ? name : '')) + '</div>' + feats + (o.extra ? '<div class="rec-x">' + o.extra + '</div>' : '') + '</div>';
}

/* ---------- decision tree widget (HTML) ---------- */
function treeHTML(n) {
  if (!n) return '<div class="tleaf ghost">?</div>';
  if (n.leaf) return '<div class="tleaf' + (n.hi ? ' hi' : '') + '">' + fmt(t(n.leaf)) + '</div>';
  return '<div class="tnode"><div class="tq' + (n.hi ? ' hi' : '') + '">' + fmt(t(n.q)) + '</div><div class="tbr"><div class="tb"><span class="tl">' + fmt(t('tr.yes')) + '</span>' + treeHTML(n.y) + '</div><div class="tb"><span class="tl">' + fmt(t('tr.no')) + '</span>' + treeHTML(n.n) + '</div></div></div>';
}

/* connectors: straight or slanted lines drawn from each node to its children */
function drawTree(box) {
  if (!box.isConnected) return; const old = box.querySelector(':scope > svg.tlines'); if (old) old.remove();
  const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg'), br = box.getBoundingClientRect(), sx = box.scrollLeft, sy = box.scrollTop;
  svg.setAttribute('class', 'tlines'); svg.setAttribute('width', box.scrollWidth); svg.setAttribute('height', box.scrollHeight);
  const pos = (e, bottom) => { const r = e.getBoundingClientRect(); return [r.left - br.left + sx + r.width / 2, (bottom ? r.bottom : r.top) - br.top + sy]; };
  box.querySelectorAll('.tnode').forEach((nd) => {
    const par = nd.querySelector(':scope > .tq'); if (!par) return; const [px, py] = pos(par, true);
    nd.querySelectorAll(':scope > .tbr > .tb').forEach((kid) => {
      const ch = kid.querySelector(':scope > .tnode > .tq, :scope > .tleaf'), lb = kid.querySelector(':scope > .tl'); if (!ch) return;
      const [cx, cy] = pos(ch, false), l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', px); l.setAttribute('y1', py); l.setAttribute('x2', cx); l.setAttribute('y2', cy); svg.appendChild(l);
      if (lb) { const mx = (px + cx) / 2, my = (py + cy) / 2, g = document.createElementNS(NS, 'g'), r = document.createElementNS(NS, 'rect'), tx = document.createElementNS(NS, 'text'); tx.textContent = lb.textContent;
        tx.setAttribute('x', mx); tx.setAttribute('y', my + 4); tx.setAttribute('text-anchor', 'middle'); g.appendChild(r); g.appendChild(tx); svg.appendChild(g);
        const w = Math.max(18, lb.textContent.length * 7 + 8); r.setAttribute('x', mx - w / 2); r.setAttribute('y', my - 8); r.setAttribute('width', w); r.setAttribute('height', 16); r.setAttribute('rx', 4); }
    });
  });
  box.insertBefore(svg, box.firstChild);
}
(function () {
  if (typeof MutationObserver === 'undefined') return;
  const go = (b) => { if (b._tl) return; b._tl = 1; const f = () => drawTree(b); requestAnimationFrame(f); if (typeof ResizeObserver !== 'undefined') new ResizeObserver(f).observe(b); setTimeout(f, 250); };
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType !== 1) return; if (n.matches && n.matches('.treebox')) go(n); else if (n.querySelectorAll) n.querySelectorAll('.treebox').forEach(go); }))).observe(document.documentElement, { childList: true, subtree: true });
})();

/* ---------- Env: levels for the forest ---------- */
Object.assign(Env, { forest: 0, qtree: 0, council: 0, bgate: 0 });
(function () {
  const _sync = Env.sync.bind(Env);
  Env.sync = function (snap) {
    _sync(snap);
    const f = (k) => (Save.d && Save.d.flags[k] ? 1 : 0);
    if (Room.cur && Room.cur.city === 3) this.target = 0.85;
    Object.assign(this.T, { forest: f('c3s1'), qtree: f('c3s2'), council: f('c3s4'), bgate: f('c3boss') });
    if (snap) { this.bloom = this.target; for (const k in this.T) this[k] = this.T[k]; }
  };
})();

/* ---------- tiles ---------- */
SOLID.T = 1;
const C3T = { f: 1, d: 1, m: 1 };
(function () {
  const _get = Tiles.get.bind(Tiles);
  Tiles.get = function (ch, x, y, theme) {
    if (!C3T[ch]) return _get(ch, x, y, theme);
    const v = Math.floor(hash(x, y, 1) * 4), key = 'c3' + ch + v + '_' + Math.round(Env.forest * 6);
    if (!this.cache[key]) this.cache[key] = this.make3(ch, x, y, v);
    return this.cache[key];
  };
  Tiles.make3 = function (ch, x, y, v) {
    const c = mkc(TS, TS), g = c.getContext('2d'), { R, P } = rr(g), k = Env.forest;
    if (ch === 'f') {
      R(0, 0, 16, 16, mix('#2c6a3a', '#3f8a46', k));
      for (let i = 0; i < 9; i++) { const px = Math.floor(hash(x, y, i + 3) * 15), py = Math.floor(hash(x, y, i + 8) * 14); P(px, py, i % 2 ? '#245a30' : mix('#4aa050', '#7acf6a', k)); P(px, py + 1, '#245a30'); }
      if (v === 1) { P(4, 5, '#ffe27a'); P(5, 5, '#fff7c0'); P(4, 6, '#3f7a3a'); }
      if (v === 3) { P(11, 9, '#e07ab0'); P(10, 9, '#ffd0e6'); P(11, 10, '#3f7a3a'); }
    } else if (ch === 'd') {
      R(0, 0, 16, 16, '#9a7648'); for (let i = 0; i < 7; i++) { const px = Math.floor(hash(x, y, i + 4) * 15), py = Math.floor(hash(x, y, i + 9) * 15); P(px, py, i % 2 ? '#7e5e38' : '#b8925c'); }
      if (v === 2) { R(5, 8, 3, 2, '#7e5e38'); } R(0, 0, 16, 1, '#8a6a40'); R(0, 15, 16, 1, '#8a6a40');
    } else {
      const alt = (x + y) % 2; R(0, 0, 16, 16, alt ? '#7c8f78' : '#889c82'); R(0, 0, 16, 1, '#667a63'); R(0, 0, 1, 16, '#667a63'); if (v === 0) { P(5, 5, '#a8bca2'); P(6, 6, '#a8bca2'); } if (v === 2) { R(9, 9, 3, 1, '#4a8a4a'); }
    }
    return c;
  };
})();

/* ---------- props ---------- */
function leafBlob(R, x, y, w, h, c1, c2, c3) { R(x + 2, y, w - 4, h, c1); R(x, y + 2, w, h - 4, c1); R(x + 3, y + 1, w - 8, 3, c2); R(x + w - 6, y + h - 5, 4, 3, c3); R(x + 2, y + h - 4, 5, 2, c3); }
Object.assign(PROP, {
  ftree: { w: 40, h: 56, sol: [14, 40, 12, 14], draw(g, p) {
    const { R, P } = rr(g), k = Env.forest, c1 = mix('#2a6a38', '#3f9a48', k), c2 = mix('#3a8a46', '#6fcf6a', k), c3 = mix('#1d4a2a', '#2a7a38', k);
    R(15, 30, 10, 26, '#6a4a2a'); R(15, 30, 3, 26, '#8a6a40'); R(22, 34, 3, 22, '#4a321c'); R(12, 52, 16, 4, '#4a321c');
    leafBlob(R, 2, 14, 36, 22, c1, c2, c3); leafBlob(R, 6, 2, 28, 20, c1, c2, c3); leafBlob(R, 0, 24, 22, 14, c1, c2, c3);
    if (p.v === 1) { P(10, 22, '#ffe27a'); P(26, 12, '#ffe27a'); } outlineCanvas(g.canvas, '#13281a'); } },
  fbush: { w: 18, h: 14, sol: [1, 5, 16, 8], draw(g, p) { const { R, P } = rr(g), k = Env.forest; leafBlob(R, 1, 3, 16, 10, mix('#2a6a38', '#3f9a48', k), mix('#3a8a46', '#6fcf6a', k), mix('#1d4a2a', '#2a7a38', k)); if (p.v === 1) { P(5, 6, '#e07ab0'); P(12, 8, '#ffe27a'); } outlineCanvas(g.canvas, '#13281a'); } },
  shroom: { w: 12, h: 12, sol: null, draw(g) { const { R, P } = rr(g); R(5, 6, 3, 5, '#f0e6d0'); R(2, 2, 9, 5, '#d9423a'); R(3, 1, 7, 2, '#e8574c'); P(4, 3, '#fff'); P(8, 4, '#fff'); P(6, 2, '#fff'); outlineCanvas(g.canvas, '#2a1a1a'); } },
  stump: { w: 18, h: 14, sol: [1, 5, 16, 8], draw(g) { const { R, P } = rr(g); R(2, 4, 14, 9, '#6a4a2a'); R(2, 3, 14, 4, '#c89a62'); R(5, 4, 8, 2, '#a87a44'); R(7, 5, 4, 1, '#c89a62'); R(3, 9, 2, 4, '#4a321c'); outlineCanvas(g.canvas, '#24180e'); } },
  fsign: { w: 22, h: 30, sol: [6, 22, 10, 7], draw(g, p, t) {
    const { R, P } = rr(g), ok = Env.forest > 0.5, a = ok ? 0 : Math.floor(t * 2.5 + p.x) % 4;
    R(10, 8, 3, 22, '#6a4a2a'); R(10, 8, 1, 22, '#8a6a40');
    const plank = (y, dir) => { const x0 = dir > 0 ? 3 : 1; R(x0, y, 17, 6, '#c89a62'); R(x0, y, 17, 1, '#e0b680'); R(x0, y + 5, 17, 1, '#8a6a40'); R(dir > 0 ? x0 + 17 : x0 - 2, y + 1, 2, 4, '#c89a62'); P(dir > 0 ? x0 + 19 : x0 - 3, y + 2, '#c89a62'); R(x0 + 3, y + 2, 9, 2, '#6a4a2a'); };
    if (ok) { plank(2, 1); plank(11, 1); } else { plank(1 + (a % 2) * 2, a < 2 ? -1 : 1); plank(10 - (a % 2) * 2, a % 2 ? 1 : -1); P(4 + a * 3, 0, '#ffe27a'); }
    outlineCanvas(g.canvas, '#24180e'); } },
  qtree: { w: 72, h: 84, sol: [26, 60, 20, 22], draw(g, p, t) {
    const { R, P } = rr(g), e = Env.qtree, c1 = mix('#2a5a34', '#3f9a48', Math.max(Env.forest, e)), c2 = mix('#3a7a44', '#6fcf6a', Math.max(Env.forest, e)), c3 = mix('#1d3f24', '#2a7a38', Math.max(Env.forest, e));
    R(26, 40, 22, 44, '#6a4a2a'); R(26, 40, 5, 44, '#8a6a40'); R(42, 46, 5, 38, '#4a321c'); R(20, 78, 34, 6, '#4a321c'); R(22, 72, 6, 8, '#6a4a2a'); R(46, 72, 6, 8, '#6a4a2a');
    if (e > 0.5) { R(12, 36, 14, 3, '#6a4a2a'); R(10, 32, 5, 5, '#6a4a2a'); R(48, 36, 14, 3, '#6a4a2a'); R(58, 32, 5, 5, '#6a4a2a'); }
    else { R(10, 38, 16, 3, '#6a4a2a'); R(8, 30, 4, 10, '#6a4a2a'); R(8, 30, 10, 3, '#6a4a2a'); R(48, 42, 16, 3, '#6a4a2a'); R(60, 34, 4, 11, '#6a4a2a'); R(54, 34, 10, 3, '#6a4a2a'); R(28, 36, 16, 3, '#4a321c'); }
    leafBlob(R, 4, 14, 64, 28, c1, c2, c3); leafBlob(R, 12, 2, 48, 24, c1, c2, c3); leafBlob(R, 0, 24, 30, 16, c1, c2, c3); leafBlob(R, 42, 24, 30, 16, c1, c2, c3);
    const eye = e > 0.5 ? '#ffe27a' : '#cfc27a', bl = Math.floor(t * 0.6) % 6 === 0;
    R(30, 52, 6, bl ? 1 : 4, '#1d1208'); R(40, 52, 6, bl ? 1 : 4, '#1d1208'); if (!bl) { R(31, 53, 4, 2, eye); R(41, 53, 4, 2, eye); P(32, 53, '#fff'); P(42, 53, '#fff'); }
    if (e > 0.5) { R(32, 62, 12, 2, '#1d1208'); P(31, 61, '#1d1208'); P(44, 61, '#1d1208'); } else { R(33, 62, 10, 2, '#1d1208'); P(32, 63, '#1d1208'); P(43, 61, '#1d1208'); }
    if (e > 0.5) for (let i = 0; i < 4; i++) { P(8 + i * 17, 10 + (i % 2) * 8, '#ffffffaa'); P(9 + i * 17, 10 + (i % 2) * 8, '#ffe27a'); }
    outlineCanvas(g.canvas, '#13281a'); } },
  ctree: { w: 36, h: 52, sol: [10, 36, 16, 14], draw(g, p, t) {
    const { R, P } = rr(g), e = Env.council, c1 = mix('#2a5a34', '#3f9a48', Math.max(Env.forest, 0.5 + e * 0.5)), c2 = mix('#3a7a44', '#6fcf6a', 0.5 + e * 0.5), c3 = '#1d4a2a';
    R(12, 26, 12, 26, '#6a4a2a'); R(12, 26, 3, 26, '#8a6a40'); R(20, 30, 3, 22, '#4a321c'); R(9, 48, 18, 4, '#4a321c');
    leafBlob(R, 2, 8, 32, 22, c1, c2, c3); leafBlob(R, 6, 0, 24, 16, c1, c2, c3);
    const bl = Math.floor(t * 0.5 + p.i) % 7 === 0; R(14, 36, 3, bl ? 1 : 3, '#1d1208'); R(20, 36, 3, bl ? 1 : 3, '#1d1208'); if (!bl) { P(15, 37, e > 0.5 ? '#ffe27a' : '#cfc27a'); P(21, 37, e > 0.5 ? '#ffe27a' : '#cfc27a'); }
    R(15, 42, 7, 1, '#1d1208'); if (p.i % 2) P(14, 41, '#1d1208'); else P(22, 41, '#1d1208');
    outlineCanvas(g.canvas, '#13281a'); } },
  birdgate: { w: 96, h: 70, sol: null, draw(g, p, t) {
    const { R, P } = rr(g), o = Env.bgate, open = o > 0.5;
    [[0, 18], [68, 18]].forEach(([x, y]) => { R(x, y, 28, 52, '#8a7a96'); R(x, y, 28, 4, '#b8aac4'); R(x + 22, y + 4, 6, 48, '#6a5a76'); R(x + 3, y + 8, 3, 36, '#a698b2'); R(x - 2, 62, 32, 8, '#6a5a76'); R(x + 6, y + 14, 4, 3, '#4a3a56'); R(x + 14, y + 26, 5, 3, '#4a3a56'); });
    R(0, 8, 96, 14, '#8a7a96'); R(0, 8, 96, 3, '#b8aac4'); R(0, 19, 96, 3, '#6a5a76'); R(6, 2, 84, 8, '#7a6a86'); R(6, 2, 84, 2, '#a698b2');
    R(26, 11, 44, 8, open ? '#2f8a5a' : '#6a3a4a'); R(26, 11, 44, 1, open ? '#7fe0a8' : '#a85a6a');
    for (let i = 0; i < 9; i++) { const lx = 30 + i * 4.6; R(Math.floor(lx), 14, 2, 3, open ? '#d8ffe8' : '#ffd0d8'); }
    [[8, 24], [76, 24]].forEach(([x, y]) => { R(x, y, 12, 3, '#a87a44'); R(x + 4, y + 3, 4, 10, '#6a4a2a'); });
    if (!open) { for (let x = 30; x < 66; x += 6) { R(x, 22, 2, 48, '#4a4a5a'); R(x, 22, 1, 48, '#7a7a8a'); } R(28, 38, 40, 3, '#4a4a5a'); R(28, 56, 40, 3, '#4a4a5a'); }
    else { R(30, 22, 36, 48, 'rgba(255,240,180,0.18)'); R(30, 22, 3, 40, '#7a7a8a'); R(63, 22, 3, 40, '#7a7a8a'); }
    const sw = Math.sin(t * 2) * 0; [[14, 14], [80, 14]].forEach(([x, y]) => { R(x, y, 3, 4, open ? '#7fe0a8' : '#e0405a'); P(x + 1, y - 1, '#fff'); });
    outlineCanvas(g.canvas, '#241a3a'); } },
  fence: { w: 16, h: 14, sol: [0, 6, 16, 8], draw(g) { const { R } = rr(g); R(0, 4, 16, 2, '#a87a44'); R(0, 9, 16, 2, '#a87a44'); R(1, 1, 3, 13, '#8a6a40'); R(12, 1, 3, 13, '#8a6a40'); outlineCanvas(g.canvas, '#24180e'); } },
});
(function () {
  const _key = Props.key.bind(Props), _solid = Props.solid.bind(Props), q = (v) => Math.round(v * 10);
  Props.key = function (p, t) {
    switch (p.type) {
      case 'ftree': case 'fbush': return p.type + (p.v || 0) + q(Env.forest);
      case 'fsign': return 'fs' + (Env.forest > 0.5 ? 'ok' : Math.floor(t * 2.5 + p.x) % 4) + p.x;
      case 'qtree': return 'qt' + q(Env.qtree) + q(Env.forest) + (Math.floor(t * 0.6) % 6 === 0 ? 'b' : 'o');
      case 'ctree': return 'ct' + p.i + q(Env.council) + q(Env.forest) + (Math.floor(t * 0.5 + p.i) % 7 === 0 ? 'b' : 'o');
      case 'birdgate': return 'bg' + (Env.bgate > 0.5 ? 'o' : 'c');
      default: return _key(p, t);
    }
  };
  Props.solid = function (p) {
    if (p.type === 'birdgate') return [[p.x * TS, p.y * TS + 18, 28, 44], [p.x * TS + 68, p.y * TS + 18, 28, 44], [p.x * TS, p.y * TS, 96, 22]];
    return _solid(p);
  };
})();

/* ---------- rooms ---------- */
function buildCity3(R) {
  /* ---- the glade (hub) ---- */
  { const W = 38, H = 26, m = grid(W, H, 'f');
    fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 2, W, 2, 'T'); fillR(m, 0, 0, 1, 10, 'T'); fillR(m, 0, 16, 1, H - 16, 'T'); fillR(m, W - 1, 0, 1, 10, 'T'); fillR(m, W - 1, 16, 1, H - 16, 'T'); fillR(m, 0, 2, W, 1, 'T');
    fillR(m, 0, 11, W, 3, 'd'); fillR(m, 16, 2, 3, 9, 'd');
    R.forest = { id: 'forest', city: 3, name: 'room.forest', w: W, h: H, map: m, theme: 'fo', haze: 'forest', music: 'meadows', light: 0,
      props: [
        { type: 'qtree', x: 14, y: 4.4, hs: 'qtree' },
        { type: 'fsign', x: 8, y: 9 }, { type: 'fsign', x: 11, y: 14.8 }, { type: 'fsign', x: 23, y: 9 }, { type: 'fsign', x: 27, y: 14.8 },
        { type: 'ftree', x: 3, y: 3.5, v: 1 }, { type: 'ftree', x: 6.5, y: 4.5 }, { type: 'ftree', x: 2, y: 17 }, { type: 'ftree', x: 5, y: 19.5, v: 1 }, { type: 'ftree', x: 10, y: 17.5 }, { type: 'ftree', x: 21, y: 4 }, { type: 'ftree', x: 24.5, y: 5.5, v: 1 },
        { type: 'ftree', x: 31, y: 3.5 }, { type: 'ftree', x: 34, y: 5 , v: 1}, { type: 'ftree', x: 16, y: 18 }, { type: 'ftree', x: 21, y: 19 }, { type: 'ftree', x: 29, y: 18.5, v: 1 }, { type: 'ftree', x: 33, y: 17 },
        { type: 'fbush', x: 12, y: 8, v: 1 }, { type: 'fbush', x: 19.5, y: 8.5 }, { type: 'fbush', x: 4, y: 14.8 }, { type: 'fbush', x: 25, y: 15, v: 1 }, { type: 'fbush', x: 13.5, y: 15 },
        { type: 'shroom', x: 7, y: 8 }, { type: 'shroom', x: 8, y: 8.6 }, { type: 'shroom', x: 31, y: 9 }, { type: 'shroom', x: 20, y: 16 }, { type: 'stump', x: 12, y: 15.6 }, { type: 'stump', x: 30.5, y: 15.8 },
        { type: 'fence', x: 29, y: 9.4 }, { type: 'fence', x: 30, y: 9.4 }, { type: 'fence', x: 31, y: 9.4 },
      ],
      exits: [
        { x: 0, y: 11, w: 1, h: 3, to: 'quarry', tx: 29.4, ty: 12.4, dir: 'left' },
        { x: 16, y: 2.2, w: 3, h: 1.2, to: 'council', tx: 12, ty: 14, need: () => Save.flag('c3s3'), lock: 'lock.council', dir: 'up' },
        { x: 37, y: 11, w: 1, h: 3, to: 'birdgate', tx: 13, ty: 14, need: () => Save.flag('c3trial'), lock: 'lock.gate', dir: 'right' },
      ],
      spots: [{ x: 9, y: 11.2, r: 22, say: 'tile.signs' }],
      spawn: [3, 12.4],
    }; }
  /* ---- council clearing ---- */
  { const W = 24, H = 16, m = grid(W, H, 'm'); fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 1, W, 1, 'T'); fillR(m, 0, 0, 1, H, 'T'); fillR(m, W - 1, 0, 1, H, 'T'); fillR(m, 11, H - 1, 2, 1, 'm');
    fillR(m, 0, 2, 3, 3, 'f'); fillR(m, W - 3, 2, 3, 3, 'f');
    R.council = { id: 'council', city: 3, name: 'room.council', w: W, h: H, map: m, theme: 'fo', haze: 'council', music: 'meadows', light: 0,
      props: [
        { type: 'ctree', x: 2, y: 5, i: 0 }, { type: 'ctree', x: 6, y: 3, i: 1 }, { type: 'ctree', x: 10, y: 2, i: 2 }, { type: 'ctree', x: 14, y: 3, i: 3 }, { type: 'ctree', x: 18, y: 5, i: 4 },
        { type: 'rug', x: 9, y: 8 }, { type: 'shroom', x: 4, y: 11 }, { type: 'shroom', x: 19, y: 11 }, { type: 'fbush', x: 2, y: 12, v: 1 }, { type: 'fbush', x: 20, y: 12 }, { type: 'stump', x: 6, y: 10 }, { type: 'stump', x: 16, y: 10 },
      ],
      exits: [{ x: 11, y: 15, w: 2, h: 1, to: 'forest', tx: 17.5, ty: 3.6, dir: 'down' }],
      spots: [], spawn: [12, 14],
    }; }
  /* ---- bird gate (boss) ---- */
  { const W = 26, H = 16, m = grid(W, H, 'f'); fillR(m, 0, 0, W, 2, 'T'); fillR(m, 0, H - 1, W, 1, 'T'); fillR(m, 0, 0, 1, H, 'T'); fillR(m, W - 1, 0, 1, H, 'T'); fillR(m, 12, 2, 3, 13, 'd'); fillR(m, 12, H - 1, 2, 1, 'd');
    R.birdgate = { id: 'birdgate', city: 3, name: 'room.birdgate', w: W, h: H, map: m, theme: 'fo', haze: 'forest', music: 'meadows', light: 0,
      props: [
        { type: 'birdgate', x: 10, y: 2 }, { type: 'ftree', x: 2, y: 4, v: 1 }, { type: 'ftree', x: 20.5, y: 4 }, { type: 'ftree', x: 2.5, y: 9.5 }, { type: 'ftree', x: 21, y: 10 , v: 1}, { type: 'fbush', x: 7, y: 7 }, { type: 'fbush', x: 18, y: 7, v: 1 },
        { type: 'shroom', x: 5, y: 12 }, { type: 'stump', x: 7, y: 12 }, { type: 'stump', x: 17.5, y: 12 }, { type: 'fsign', x: 9, y: 11 },
      ],
      exits: [
        { x: 12, y: 15, w: 2, h: 1, to: 'forest', tx: 35.4, ty: 12.4, dir: 'down' },
        { x: 11.6, y: 4.6, w: 2.8, h: 1.2, end3: true, need: () => Save.flag('c3boss'), lock: 'lock.path3', dir: 'up' },
      ],
      spots: [{ x: 13, y: 7.4, r: 18, say: 'tile.gate3', alt: 'tile.gate3b' }],
      spawn: [13, 13.4],
    }; }
}
