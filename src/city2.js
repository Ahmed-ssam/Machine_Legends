'use strict';
/* ===== city2.js: Model Workshop (chapter 2): data, tasks, scenes, boss, world map ===== */

/* ---------- crystal data (verified with a 1-nearest-neighbour memorizer) ---------- */
const CRD = [
  [1, 8, 6, 'R'], [2, 7, 8, 'R'], [3, 9, 4, 'R'], [4, 6, 5, 'R'], [5, 8, 9, 'R'], [6, 5, 7, 'R'], [7, 2, 3, 'E'], [8, 3, 6, 'E'], [9, 1, 5, 'E'], [10, 4, 2, 'E'], [11, 2, 8, 'E'], [12, 5, 3, 'E'],
  [13, 7, 6, 'R'], [14, 3, 4, 'E'], [15, 4, 5, 'R'],
  [16, 9, 8, 'R'], [17, 2, 6, 'E'], [18, 4, 6, 'R'], [19, 6, 3, 'E'], [20, 3, 7, 'E'],
].map((r) => ({ id: r[0], g: r[1], s: r[2], l: r[3] }));
const CR_TRAIN = CRD.slice(0, 12), CR_PRAC = CRD.slice(12, 15), CR_TEST = CRD.slice(15);
function crDist(a, b) { return Math.hypot(a.g - b.g, a.s - b.s); }
function crKnn(train, k, x) {
  const n = train.map((r) => ({ d: crDist(r, x), r: r })).sort((a, b) => a.d - b.d || a.r.id - b.r.id).slice(0, k), v = {};
  n.forEach((o) => { v[o.r.l] = (v[o.r.l] || 0) + 1; });
  return Object.keys(v).sort((a, b) => v[b] - v[a] || (a < b ? -1 : 1))[0];
}
function crScore(train, k, set) { return set.filter((x) => crKnn(train, k, x) === x.l).length; }
const lname = (l) => t('lbl.' + (l === 'R' ? 'Ruby' : 'Emerald'));
const SORT10 = [[8, 5, 'R'], [2, 4, 'E'], [7, 7, 'R'], [3, 6, 'E'], [9, 6, 'R'], [1, 3, 'E'], [6, 8, 'R'], [4, 2, 'E'], [8, 8, 'R'], [2, 7, 'E']].map((r, i) => ({ id: 100 + i, g: r[0], s: r[1], l: r[2] }));

const Crystals = {
  cache: {},
  url(kind) {
    if (this.cache[kind]) return this.cache[kind];
    const c = mkc(20, 20), g = c.getContext('2d'), { R, P } = rr(g), col = kind === 'R' ? '#e0405a' : kind === 'E' ? '#37b86a' : '#8a8a9a', hi = shade(col, 0.5), lo = shade(col, -0.32);
    R(6, 2, 8, 2, hi); R(3, 4, 14, 3, col); R(2, 7, 16, 3, col); R(4, 10, 12, 3, col); R(6, 13, 8, 2, lo); R(8, 15, 4, 2, lo); R(9, 17, 2, 1, lo);
    R(4, 5, 3, 2, hi); P(5, 4, '#ffffff'); P(6, 4, '#ffffffaa'); R(13, 6, 3, 4, lo); R(9, 4, 1, 9, shade(col, 0.2));
    if (kind === '?') { R(9, 6, 3, 1, '#fff'); R(11, 7, 1, 2, '#fff'); R(10, 9, 1, 1, '#fff'); R(10, 11, 1, 1, '#fff'); }
    outlineCanvas(c, '#22202e'); return (this.cache[kind] = c.toDataURL());
  },
};
function crHTML(c, o) {
  o = o || {};
  const lab = o.hide ? null : (o.lbl !== undefined ? o.lbl : c.l);
  return '<div class="rec' + (o.cls ? ' ' + o.cls : '') + '"><img class="fruit" alt="" src="' + Crystals.url(o.hide ? '?' : c.l) + '"><div class="rec-f">' + fmt(t('cr.glow') + ' ' + c.g + ' · ' + t('cr.size') + ' ' + c.s) + '</div>' + (lab ? '<div class="rec-l">' + fmt(t('cr.card', { x: lname(lab) })) + '</div>' : '') + (o.extra ? '<div class="rec-x">' + o.extra + '</div>' : '') + '</div>';
}
const gemRow = (arr) => '<div class="gemrow">' + arr.map((c) => '<img class="gem-s" alt="" src="' + Crystals.url(c.l) + '">').join('') + '</div>';
const pct = (n, m) => Math.round(n / m * 100);

/* ---------- task builders ---------- */
function barRow(label, n, m, cls) { return '<div><span>' + fmt(label) + '</span><i class="' + (cls || '') + '" style="width:' + pct(n, m) + '%"></i><b>' + fmt(t('c2.toy.score', { n: n, m: m, pct: pct(n, m) })) + '</b></div>'; }

/* MCQ that stays locked until a hands-on step ran. pre(wrap, ready) returns run() */
function gatedMcq(pre, options, correct, needKey) {
  return (body) => {
    let ok = false; const wrap = el('div', 'gate-wrap'); body.appendChild(wrap);
    const run = pre(wrap, () => { ok = true; });
    const api = mcqBuild(options, correct)(body), base = api.check;
    return { check() { if (!ok) return null; return base(); }, solve() { run(); api.solve(); }, get incomplete() { return ok ? t('fb.pickfirst') : t(needKey); } };
  };
}
function sortBuild() {
  return (body) => {
    const st = {}, grid = el('div', 'cards'), info = el('div', 'sort-info');
    const upd = () => { const n = { train: 0, prac: 0, test: 0 }; Object.keys(st).forEach((k) => n[st[k]]++); info.innerHTML = fmt(t('c2.sort.count', { a: n.train, b: n.prac, c: n.test })); };
    SORT10.forEach((c) => {
      const card = el('div', 'card', crHTML(c)), row = el('div', 'opts row');
      [['train', 'ch.train'], ['prac', 'ch.prac'], ['test', 'ch.test']].forEach(([k, lk]) => { const b = el('button', 'opt small', fmt(t(lk))); b.type = 'button'; b.dataset.ch = k; b.addEventListener('click', () => { Aud.sfx('click'); st[c.id] = k; $$('.opt', row).forEach((x) => x.classList.toggle('sel', x.dataset.ch === k)); upd(); }); row.appendChild(b); });
      card.appendChild(row); card.dataset.id = c.id; grid.appendChild(card);
    });
    body.append(grid, info); upd();
    return {
      check() {
        if (Object.keys(st).length < 10) return null; const n = { train: 0, prac: 0, test: 0 }; Object.keys(st).forEach((k) => n[st[k]]++);
        if (n.train < 5) return { ok: false, msg: t('c2.sort.few') }; if (n.prac < 1) return { ok: false, msg: t('c2.sort.prac') }; if (n.test < 2) return { ok: false, msg: t('c2.sort.test') };
        if (n.train > 7 || n.prac > 2 || n.test > 3) return { ok: false, msg: t('c2.sort.many') };
        return { ok: true, msg: t('c2.sort.ok') };
      },
      solve() { SORT10.forEach((c, i) => { const k = i < 6 ? 'train' : i < 8 ? 'prac' : 'test'; grid.querySelector('[data-id="' + c.id + '"] [data-ch="' + k + '"]').click(); }); }, incomplete: t('fb.complete'),
    };
  };
}
function toyBuild() {
  const opts = [{ id: 'a', txt: t('c2.toy.a') }, { id: 'b', txt: t('c2.toy.b') }, { id: 'c', txt: t('c2.toy.c') }];
  return gatedMcq((wrap, ready) => {
    let r1 = false, r2 = false;
    wrap.innerHTML = '<div class="chambers"><div class="chm tr"><b>' + fmt(t('c2.toy.train')) + '</b>' + gemRow(CR_TRAIN) + '</div><div class="chm pr"><b>' + fmt(t('c2.toy.prac')) + '</b>' + gemRow(CR_PRAC) + '</div><div class="chm te"><b>' + fmt(t('c2.toy.test')) + '</b>' + gemRow(CR_TEST) + '</div></div>';
    const bars = el('div', 'bars'), bar = el('div', 'opts row'); wrap.append(bar, bars);
    const show = () => { bars.innerHTML = (r1 ? barRow(t('ch.train'), crScore(CR_TRAIN, 1, CR_TRAIN), 12) : '') + (r2 ? barRow(t('ch.test'), crScore(CR_TRAIN, 1, CR_TEST), 5, 'g') : ''); if (r1 && r2) ready(); };
    const b1 = el('button', 'opt small', fmt(t('c2.toy.btn1'))), b2 = el('button', 'opt small', fmt(t('c2.toy.btn2'))); b1.type = b2.type = 'button';
    b1.addEventListener('click', () => { Aud.sfx('click'); r1 = true; show(); }); b2.addEventListener('click', () => { Aud.sfx('click'); r2 = true; show(); }); bar.append(b1, b2);
    wrap.appendChild(el('h4', 'sub', fmt(t('c2.toy.q'))));
    return () => { r1 = r2 = true; show(); };
  }, opts, 'a', 'c2.toy.need');
}
function revealBuild() {
  const k = crScore(CR_TRAIN, 1, CR_TEST), opts = [{ id: 'a', txt: t('c2.rev.a', { k: k, pct: pct(k, 5) }) }, { id: 'b', txt: t('c2.rev.a', { k: 5, pct: 100 }) }, { id: 'c', txt: t('c2.rev.a', { k: 1, pct: 20 }) }];
  return gatedMcq((wrap, ready) => {
    const grid = el('div', 'cards'); let n = 0; const btns = [];
    CR_TEST.forEach((c) => {
      const pr = crKnn(CR_TRAIN, 1, c), card = el('div', 'card', crHTML(c, { hide: true, extra: fmt(t('c2.rev.says', { x: lname(pr) })) })), out = el('div', 'rev-out'), b = el('button', 'opt small', fmt(t('c2.rev.btn'))); b.type = 'button';
      const go = () => { if (b.dataset.done) return; b.dataset.done = 1; Aud.sfx('ok'); const okk = pr === c.l; card.querySelector('img').src = Crystals.url(c.l); out.className = 'rev-out ' + (okk ? 'ok' : 'no'); out.innerHTML = (okk ? '✓ ' : '✗ ') + fmt(t('c2.rev.true', { x: lname(c.l) })); b.remove(); n++; if (n === 5) ready(); };
      b.addEventListener('click', go); btns.push(go); card.append(b, out); grid.appendChild(card);
    });
    wrap.appendChild(grid); wrap.appendChild(el('h4', 'sub', fmt(t('c2.rev.q'))));
    return () => btns.forEach((f) => f());
  }, opts, 'a', 'c2.rev.need');
}
function predRows(pairs) { return '<div class="prrows">' + pairs.map((p) => '<div class="pr ' + (p[0] === p[1] ? 'ok' : 'no') + '">' + (p[0] === p[1] ? '✓' : '✗') + ' ' + fmt(t('c2.t31.row', { g: lname(p[0]), t: lname(p[1]) })) + '</div>').join('') + '</div>'; }
const T31 = [['R', 'R'], ['R', 'R'], ['E', 'E'], ['R', 'E'], ['E', 'E'], ['R', 'R'], ['E', 'R'], ['R', 'R'], ['E', 'E'], ['R', 'R']];
function cmTable() { return '<h4 class="sub">' + fmt(t('c2.cm.title')) + '</h4><table class="cm"><tr><th></th><th>' + fmt(t('c2.cm.saysr')) + '</th><th>' + fmt(t('c2.cm.sayse')) + '</th></tr><tr><th>' + fmt(t('c2.cm.truer')) + '</th><td class="g">9</td><td>0</td></tr><tr><th>' + fmt(t('c2.cm.truee')) + '</th><td class="r">1</td><td>0</td></tr></table>'; }
function modelsTable() { return '<table class="cm models"><tr><th></th><th>' + fmt(t('c2.models.train')) + '</th><th>' + fmt(t('c2.models.test')) + '</th></tr><tr><th>' + fmt(t('c2.models.a')) + '</th><td>100%</td><td class="r">80%</td></tr><tr><th>' + fmt(t('c2.models.b')) + '</th><td>90%</td><td class="g">88%</td></tr></table>'; }
const abc = (id) => [{ id: 'a', txt: t(id + '.a') }, { id: 'b', txt: t(id + '.b') }, { id: 'c', txt: t(id + '.c') }];
function mcq2(id, pre) { return mcqBuild(abc(id), 'a', pre); }
function sp2(id, extra) { return Object.assign({ p: t(id + '.p'), hints: [t(id + '.h1'), t(id + '.h2'), t(id + '.ex')], ex: t(id + '.ex') }, extra || {}); }

function sqTSpec() {
  const model = (x) => crKnn(CR_TRAIN, 5, x);
  return sp2('c2.sqT', { title: t('c2.sqT.title'), build: gatedMcq((wrap, ready) => {
    const bars = el('div', 'bars'), b = el('button', 'opt small', fmt(t('c2.sqT.btn'))); b.type = 'button';
    const tr = CR_TRAIN.filter((x) => model(x) === x.l).length, te = CR_TEST.filter((x) => model(x) === x.l).length;
    bars.innerHTML = barRow(t('ch.train'), tr, 12);
    const run = () => { if (b.dataset.done) return; b.dataset.done = 1; Aud.sfx('ok'); bars.insertAdjacentHTML('beforeend', barRow(t('ch.test'), te, 5, 'g')); b.remove(); ready(); };
    b.addEventListener('click', run); wrap.append(bars, b); return run;
  }, abc('c2.sqT'), 'a', 'c2.sqT.need') });
}
function sqBSpec() {
  const set = [[8, 5], [7, 7], [9, 6], [6, 8], [8, 8], [3, 6], [7, 4], [9, 4], [6, 5], [8, 6]].map((r, i) => ({ id: 200 + i, g: r[0], s: r[1], l: i === 5 ? 'E' : 'R' }));
  return sp2('c2.sqB', { title: t('c2.sqB.title'), build: (body) => tapBuild(shuffle(set.map((c) => ({ id: c.id, html: crHTML(c, { extra: fmt(t('c2.sqB.says')) }) }))), [205], false)(body) });
}
function sqPSpec() {
  const rows = [['A', 1], ['B', 3], ['C', 2]];
  return sp2('c2.sqP', { title: t('c2.sqP.title'), build: mcq2('c2.sqP', (b) => { b.innerHTML = '<div class="bars">' + rows.map((r) => '<div><span>' + fmt(t('c2.sqP.row', { k: r[0], n: r[1] })) + '</span><i class="' + (r[0] === 'B' ? 'g' : '') + '" style="width:' + pct(r[1], 3) + '%"></i></div>').join('') + '</div>'; }) });
}
function orderBuild(prefix) {
  return (body) => {
    const ids = ['s1', 's2', 's3', 's4'], chosen = [], pool = el('div', 'opts row'), line = el('div', 'order');
    const draw = () => { line.innerHTML = chosen.length ? '' : '<em>' + fmt(t(prefix + '.order', { x: '…' })) + '</em>'; chosen.forEach((s, i) => line.appendChild(el('span', 'chip', (i + 1) + '. ' + fmt(t(prefix + '.' + s))))); $$('.opt', pool).forEach((b) => b.classList.toggle('sel', chosen.includes(b.dataset.s))); };
    shuffle(ids).forEach((s) => { const b = el('button', 'opt small', fmt(t(prefix + '.' + s))); b.type = 'button'; b.dataset.s = s; b.addEventListener('click', () => { Aud.sfx('click'); const i = chosen.indexOf(s); if (i >= 0) chosen.splice(i, 1); else chosen.push(s); draw(); }); pool.appendChild(b); });
    body.append(pool, line); draw();
    return { solve() { ids.forEach((s) => pool.querySelector('[data-s="' + s + '"]').click()); }, check() { if (chosen.length < 4) return null; return { ok: chosen.join() === ids.join() }; } };
  };
}
const stepCards = (prefix, n) => Array.from({ length: n }, (_, i) => ({ id: i + 1, html: '<div class="stepc">' + fmt(t(prefix + '.s' + (i + 1))) + '</div>' }));
const C2_V3 = [
  [[8, 5, 'R'], [7, 7, 'R'], [2, 4, 'E'], [9, 6, 'R'], [3, 6, 'E'], [6, 8, 'R'], [8, 8, 'R'], [7, 5, 'R'], [9, 7, 'R'], [8, 6, 'R']],
  [[8, 5, 'R'], [2, 7, 'E'], [7, 7, 'R'], [3, 6, 'E'], [9, 6, 'R'], [1, 3, 'E'], [6, 8, 'R'], [8, 8, 'R'], [9, 4, 'R'], [7, 6, 'R']],
];
const C2_V6 = [
  { rows: [['R', 'R'], ['E', 'E'], ['R', 'E'], ['R', 'R'], ['E', 'E'], ['E', 'R'], ['R', 'R'], ['E', 'E']], bad: [3, 6] },
  { rows: [['R', 'R'], ['E', 'R'], ['R', 'R'], ['R', 'R'], ['E', 'E'], ['R', 'R'], ['E', 'R'], ['E', 'E']], bad: [2, 7] },
];

function bossSpecs2() {
  const stepItems = shuffle(stepCards('q2.4', 6));
  return [
    sp2('q2.1', { build: mcq2('q2.1') }),
    sp2('q2.2', { build: mcq2('q2.2') }),
    sp2('q2.3', { rebuild: true, build: (body, c) => { const v = C2_V3[c.n % 2], cs = v.map((r, i) => ({ id: 300 + i, g: r[0], s: r[1], l: r[2] })); return tapBuild(shuffle(cs.map((x) => ({ id: x.id, html: crHTML(x, { extra: fmt(t('c2.sqB.says')) }) }))), cs.filter((x) => x.l === 'E').map((x) => x.id), true)(body); } }),
    sp2('q2.4', { build: (body) => tapBuild(shuffle(stepItems.slice()), [1, 4, 5], true)(body) }),
    sp2('q2.5', { build: (body) => {
      const items = [[1, 't', 8, 5, 'R'], [2, 't', 2, 4, 'E'], [3, 't', 7, 7, 'R'], [4, 'p', 3, 6, 'E'], [5, 'x', 9, 6, 'R'], [6, 'd', 9, 6, 'R']];
      return tapBuild(shuffle(items.map((it) => ({ id: it[0], html: crHTML({ g: it[2], s: it[3], l: it[4] }, { lbl: null, extra: fmt(t('q2.5.l' + it[1])) }) }))), [1, 2, 3], true)(body);
    } }),
    sp2('q2.6', { rebuild: true, build: (body, c) => { const v = C2_V6[c.n % 2]; return tapBuild(v.rows.map((r, i) => ({ id: i + 1, html: '<div class="pr ' + (r[0] === r[1] ? 'ok' : 'no') + '" style="background:none">' + fmt(t('c2.t31.row', { g: lname(r[0]), t: lname(r[1]) })) + '</div>' })), v.bad, true)(body); } }),
    sp2('q2.7', { build: mcq2('q2.7') }),
    sp2('q2.8', { build: orderBuild('q2.8') }),
    sp2('q2.9', { build: (body) => tapBuild([{ id: 'g', html: '<div class="stepc"><b>' + fmt(t('cr.glow')) + '</b><br>8 · 2 · 7 · 3</div>' }, { id: 's', html: '<div class="stepc"><b>' + fmt(t('cr.size')) + '</b><br>5 · 4 · 7 · 6</div>' }, { id: 'l', html: '<div class="stepc"><b>' + fmt(t('cr.label')) + '</b><br>Ruby · Emerald · Ruby · Emerald</div>' }], ['l'], false)(body) }),
    sp2('q2.10', { build: mcq2('q2.10') }),
  ];
}

/* ---------- arena theme for the academy ---------- */
Arena.bgAcademy = function (g, t) {
  for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#241a44', '#4a3478', y / 120); g.fillRect(0, y, 320, 4); }
  for (let i = 0; i < 6; i++) { g.fillStyle = '#e6dcf0'; g.fillRect(i * 62 + 6, 4, 10, 88); g.fillStyle = '#c9a24b'; g.fillRect(i * 62 + 4, 4, 14, 4); g.fillRect(i * 62 + 4, 88, 14, 4); }
  g.fillStyle = '#a8203a'; g.fillRect(104, 6, 112, 26); g.fillStyle = '#e0405a'; g.fillRect(104, 6, 112, 3); g.fillStyle = '#ffe9a0'; g.fillRect(158, 14, 4, 12); g.fillRect(154, 18, 12, 4);
  g.fillStyle = '#d9cde6'; g.fillRect(0, 92, 320, 28); g.fillStyle = '#c3b5d4'; for (let x = 0; x < 320; x += 28) g.fillRect(x, 92, 1, 28);
  for (let i = 0; i < 8; i++) { const x = (i * 43 + t * 14) % 340 - 10, y = 36 + ((i * 29) % 36) + Math.sin(t * 1.6 + i) * 5; g.fillStyle = i % 2 ? '#e0405a' : '#37b86a'; g.fillRect(x, y, 7, 9); g.fillStyle = '#ffffffcc'; g.fillRect(x + 1, y + 1, 2, 2); }
};
const ARENA_T = { acad: { bg: 'bgAcademy', spr: 'cheater' } };
(function () {
  const _start = Arena.start.bind(Arena), _draw = Arena.draw.bind(Arena);
  Arena.start = function (cv, theme) { this.theme = theme || 'arch'; _start(cv); };
  Arena.draw = function (tt) {
    const TH = ARENA_T[this.theme]; if (!TH) return _draw(tt);
    const g = this.g, s = this.s, dt = 1 / 60; g.clearRect(0, 0, 320, 120); this[TH.bg](g, tt);
    const hop = s.hero === 'cheer' ? Math.abs(Math.sin(s.ht * 8)) * 8 : 0, shk = s.hero === 'worry' ? Math.sin(s.ht * 40) * 1.5 : 0;
    g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(24, 107, 30, 4); Sprites.draw(g, 'hero', 'right', 0, 42 + shk, 114 - hop, 1.7);; Sprites.draw(g, 'milo', 'right', Math.floor(tt * 6) % 4, 82, 108 - hop * 0.7 + Math.sin(tt * 3) * 2, 2);;
    const sc = (s.boss === 'taunt' ? 1 + 0.06 * Math.sin(s.bt * 10) : 1), bh = BOSS_ARENA_H[TH.spr] * sc, bx = 236 + (s.boss === 'hit' ? Math.sin(s.bt * 50) * 3 : 0), by = 108 + Math.sin(tt * 2) * 2 * (BOSS_FLOAT[TH.spr] ? 1.5 : 0.5) - (BOSS_FLOAT[TH.spr] ? 6 : 0);
    g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(236 - 26, 107, 52, 5);
    g.save(); if (s.boss === 'hit') g.filter = 'brightness(2.6)'; if (s.boss === 'defeat') g.globalAlpha = Math.max(0, s.bt / 3);
    Sprites.drawBoss(g, TH.spr, bx, by - (s.boss === 'defeat' ? (3 - s.bt) * 10 : 0), bh, Math.floor(tt * 2.2) % 4); g.restore();
    const E = (k, x, y) => { const e = s.emo[k]; if (!e) return; e.t -= dt; if (e.t <= 0) { delete s.emo[k]; return; } g.drawImage(Emotes.get(e.n), x, y - Math.sin(tt * 8) * 1.5); };
    E('hero', 32, 40); E('milo', 74, 40); E('boss', 228, 6);
    s.parts = s.parts.filter((p) => { p.l -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 80 * dt; g.fillStyle = p.c; g.fillRect(p.x, p.y, 3, 3); return p.l > 0; });
    if (s.bt > 0) { s.bt -= dt; if (s.bt <= 0 && s.boss !== 'defeat') s.boss = 'idle'; } if (s.ht > 0) { s.ht -= dt; if (s.ht <= 0) s.hero = 'idle'; }
    if (s.pt > 0) { s.pt -= dt; g.fillStyle = 'rgba(10,6,26,' + Math.min(0.7, s.pt) + ')'; g.fillRect(0, 44, 320, 30); g.globalAlpha = Math.min(1, s.pt * 2); g.fillStyle = '#ffd24a'; g.font = 'bold 14px "DotGothic16", sans-serif'; g.textAlign = 'center'; g.fillText(s.phase, 160, 64); g.globalAlpha = 1; g.textAlign = 'start'; }
  };
})();

/* ---------- generic boss runner (city 2 uses it; city 1 keeps its own) ---------- */
async function bossFight2(cfg) {
  cfg = Object.assign({ boss: 'cheater', theme: 'acad', specs: bossSpecs2, phases: { 0: 'b2.ph1', 3: 'b2.ph2', 6: 'b2.ph3', 8: 'b2.ph4' }, start: 'c2.b.start', taunt: 'b2.taunt', vict: 'b2.vict2', frag: 'end2.frag', codex: 'b2.rCodex', xp: 200, log: 'bossLog2', mast: 'split' }, cfg || {});
  Aud.playMusic('boss');
  const root = el('div', 'boss'); let hpPct = 100, mastered = 0;
  root.innerHTML = '<div class="b-top"><img class="b-p hero" alt="" src="' + Portraits.url('hero', 'determined') + '"><div class="b-bar"><div class="b-name">' + fmt(t(cfg.start)) + '</div><div class="hp"><i></i></div><div class="b-q-n"></div></div><img class="b-p boss" alt="" src="' + Portraits.url(cfg.boss, 'confident') + '"></div><canvas class="b-arena" width="320" height="120"></canvas><div class="b-q"></div>';
  Panel.show(root, 'boss'); Arena.start($('.b-arena', root), cfg.theme);
  const setP = (who, e) => { $('.b-p.' + who, root).src = Portraits.url(who === 'hero' ? 'hero' : cfg.boss, e); };
  const specs = cfg.specs(), phaseAt = cfg.phases, log = [];
  for (let i = 0; i < 10; i++) {
    if (phaseAt[i]) { Arena.phase(t(phaseAt[i])); await ASYNC(i === 0 ? 900 : 700); }
    $('.b-q-n', root).innerHTML = fmt(t('b.q', { n: i + 1 })); setP('hero', 'determined'); setP('boss', 'confident');
    const sp = specs[i]; sp.onOk = () => { Arena.hit(); hpPct -= 10; $('.hp i', root).style.width = Math.max(0, hpPct) + '%'; setP('boss', 'surprised'); setP('hero', 'happy'); };
    sp.onNo = () => { Arena.taunt(); setP('boss', 'angry'); setP('hero', 'sad'); UI.toast(t(cfg.taunt)); };
    const r = await runTask($('.b-q', root), sp); if (!r.helped) mastered++; log.push({ q: i + 1, helped: r.helped, tries: r.tries });
  }
  Arena.defeat(); setP('boss', 'sad'); setP('hero', 'happy'); await ASYNC(1600); Arena.stop();
  Save.d[cfg.log] = { mastered: mastered, log: log }; Save.d.mastery[cfg.mast] = mastered >= 8 ? 2 : 1; Save.write();
  root.innerHTML = '<div class="victory"><div class="v-title">' + fmt(t('boss.victory')) + '</div><p>' + fmt(t(cfg.vict)) + '</p><div class="v-rewards"><h3>' + fmt(t('boss.rewards')) + '</h3><div class="v-row"><div><b>+' + cfg.xp + '</b><span>XP</span></div><div><b class="gem"></b><span>' + fmt(t(cfg.frag)) + '</span></div><div><b class="book"></b><span>' + fmt(t(cfg.codex)) + '</span></div></div></div><div class="v-m">' + fmt(t('end.score', { n: mastered })) + ' · ' + fmt(t('boss.mast', { m: t('mst.' + Save.d.mastery[cfg.mast]) })) + '</div><img class="v-hero" alt="" src="' + Portraits.url('hero', 'happy') + '"><img class="v-milo" alt="" src="' + Portraits.url('milo', 'happy') + '"></div>';
  Aud.sfx('fragment'); Aud.playMusic('meadows');
  await new Promise((res) => { const b = UI.btn(t('tk.next'), 'primary', res); root.querySelector('.victory').appendChild(b); b.focus(); });
  Panel.close(); return mastered;
}

/* ---------- city 2 story ---------- */
const POS2 = { tessQ: [11.8, 8.6], tessW: [5.6, 8.6], orin: [11.4, 6.7], bramm: [20.2, 16.6], cheater: [11, 8.4], cheaterW: [14.2, 7.6], student: [8.6, 10.2] };
const C2ROOMS = ['quarry', 'workshop', 'academy'];
const City2 = {
  npcs(room) {
    const out = [], N = (o) => out.push(o);
    if (room === 'quarry') {
      if (!fl('c2s1')) N({ id: 'tess', sp: 'tess', spr: 'tess', tx: POS2.tessQ[0], ty: POS2.tessQ[1], dir: 'down', mark: () => 'main' });
      N({ id: 'bramm', sp: 'bramm', spr: 'bramm', tx: POS2.bramm[0], ty: POS2.bramm[1], dir: 'left', mark: () => (fl('c2s3') && !fl('c2sqB') ? 'side' : null) });
    }
    if (room === 'workshop') {
      N({ id: 'tess', sp: 'tess', spr: 'tess', tx: POS2.tessW[0], ty: POS2.tessW[1], dir: 'down', mark: () => (!fl('c2s1') ? 'main' : ((fl('c2s2') && !fl('c2sqT')) || (fl('c2s4') && !fl('c2sqP')) ? 'side' : null)) });
      N({ id: 'orin', sp: 'orin', spr: 'orin', tx: POS2.orin[0], ty: POS2.orin[1], dir: 'down', mark: () => (fl('c2s1') && !fl('c2s4') ? 'main' : null) });
    }
    if (room === 'academy') {
      if (!fl('c2boss')) N({ id: 'cheater', sp: 'cheater', spr: 'cheater', tx: POS2.cheater[0], ty: POS2.cheater[1], dir: 'down', fixed: true, mark: () => 'main' });
      else N({ id: 'cheater', sp: 'cheater', spr: 'cheater', tx: POS2.cheaterW[0], ty: POS2.cheaterW[1], dir: 'left' });
      N({ id: 'student', sp: 'student', spr: 'student', tx: POS2.student[0], ty: POS2.student[1], dir: 'right' });
    }
    return out;
  },
  objective() {
    const cur = Over.room && Over.room.id; if (fl('c2end')) return fl('c3start') ? null : { room: 'quarry', x: 31.6 * 16, y: 12 * 16, text: t('obj3.travel') };
    if (fl('c2boss')) return { room: 'quarry', x: 31.6 * 16, y: 12 * 16, text: t('obj2.path') };
    if (fl('c2engine')) return cur === 'academy' ? { room: 'academy', x: POS2.cheater[0] * 16, y: POS2.cheater[1] * 16, text: t('obj2.boss') } : { room: 'academy', x: 11 * 16, y: 16 * 16, text: t('obj2.acad') };
    if (!fl('c2s1')) return cur === 'workshop' ? { room: 'workshop', x: POS2.tessW[0] * 16, y: POS2.tessW[1] * 16, text: t('obj2.tess') } : { room: 'workshop', x: 10.5 * 16, y: 14 * 16, text: t('obj2.workshop') };
    return cur === 'workshop' ? { room: 'workshop', x: POS2.orin[0] * 16, y: POS2.orin[1] * 16, text: t('obj2.orin') } : { room: 'workshop', x: 10.5 * 16, y: 14 * 16, text: t('obj2.workshop') };
  },
  async onEnter(room) {
    if (room === 'quarry' && !fl('c2arrive')) { Save.set('c2arrive'); await say([L('milo', 'c2.a1', 'surprised'), L('tess', 'c2.a2', 'surprised'), L('orin', 'c2.a3', 'neutral'), L('milo', 'c2.a4', 'thinking')]); }
    HUD.update();
  },
  async talk(id) {
    if (id === 'tess') return await this.talkTess();
    if (id === 'orin') return await this.talkOrin();
    if (id === 'bramm') return await this.talkBramm();
    if (id === 'cheater') return await this.talkCheater();
    if (id === 'student') { await say([L('student', fl('c2boss') ? 'c2.student.win' : 'c2.student.idle', fl('c2boss') ? 'happy' : 'worried')]); }
  },
  async menu(opts, who) { return await Dlg.choose(opts.concat([{ k: 'c2.cancel' }]), L(who, 'c2.ask', 'neutral')); },
  async talkTess() {
    if (Over.room.id === 'quarry') { await say([L('tess', 'c2.tess.out', 'happy')]); return; }
    if (!fl('c2s1')) return await this.scene1();
    const opts = []; if (fl('c2s2') && !fl('c2sqT')) opts.push({ k: 'c2.sqT.opt', id: 'T' }); if (fl('c2s4') && !fl('c2sqP')) opts.push({ k: 'c2.sqP.opt', id: 'P' });
    if (!opts.length) { await say([L('tess', fl('c2boss') ? 'c2.tess.win' : 'c2.tess.idle', 'happy')]); return; }
    const c = await this.menu(opts, 'tess'); if (c >= opts.length) return;
    if (opts[c].id === 'T') return await this.sqTess(); return await this.sqPractice();
  },
  async talkOrin() {
    if (!fl('c2s1')) { await say([L('orin', 'c2.orin.wait', 'neutral')]); return; }
    const st = !fl('c2s2') ? 2 : !fl('c2s3') ? 3 : !fl('c2s4') ? 4 : 0, opts = [];
    if (st) opts.push({ k: 'c2.main.s' + st, id: 'main' }); opts.push({ k: 'c2.reh.opt', id: 'reh' });
    if (!st) { await say([L('orin', fl('c2boss') ? 'c2.orin.win' : 'c2.orin.idle', 'happy')]); }
    const c = await this.menu(opts, 'orin'); if (c >= opts.length) return;
    if (opts[c].id === 'reh') return await this.rehearsal();
    if (st === 2) return await this.scene2(); if (st === 3) return await this.scene3(); if (st === 4) return await this.scene4();
  },
  async talkBramm() {
    if (fl('c2s3') && !fl('c2sqB')) return await this.sqMiner();
    await say([L('bramm', fl('c2sqB') ? 'c2.bramm.win' : 'c2.bramm.idle', fl('c2sqB') ? 'happy' : 'neutral')]);
  },
  async scene1() {
    await say([L('tess', 'c2.s1.1', 'sad'), L('milo', 'c2.s1.2', 'thinking'), L('tess', 'c2.s1.3', 'neutral'), L('milo', 'c2.s1.4', 'confident'), L('hero', 'c2.s1.5', 'thinking'), L('tess', 'c2.s1.6', 'happy'), L('milo', 'c2.s1.7', 'thinking'), L('tess', 'c2.s1.8', 'thinking'), L('tess', 'c2.s1.9', 'determined')]);
    await runPanel(t('c2.t1.title'), [sp2('c2.sort', { title: t('c2.t1.title'), build: sortBuild() }), sp2('c2.toy', { title: t('c2.toy.title'), build: toyBuild() })]);
    setFlag('c2s1'); award(40, ['split']); Aud.sfx('ok'); Over.burst(Over.npc('tess').x, Over.npc('tess').y - 20, ['#8fe0ff', '#ffffff', '#ffd24a'], 26); Over.emo.tess = { n: 'heart', t: 2 }; Over.hop.tess = 1.3;
    await say([L('tess', 'c2.s1.win', 'happy'), L('milo', 'c2.s1.win2', 'happy'), L('tess', 'c2.s1.t1', 'happy')]);
    Over.refreshNPCs();
  },
  async scene2() {
    await say([L('orin', 'c2.s2.1', 'neutral'), L('hero', 'c2.s2.2', 'thinking'), L('orin', 'c2.s2.3', 'confident'), L('milo', 'c2.s2.4', 'thinking'), L('orin', 'c2.s2.5', 'happy')]);
    await runPanel(t('c2.t2.title'), [sp2('c2.t21', { title: t('c2.t2.title'), build: mcq2('c2.t21') })]);
    await say([L('orin', 'c2.s2.6', 'neutral')]);
    await runPanel(t('c2.t22.title'), [sp2('c2.t22', { title: t('c2.t22.title'), build: revealBuild() })]);
    setFlag('c2s2'); award(40); Aud.sfx('ok'); Over.emo.orin = { n: 'note', t: 2 };
    await say([L('orin', 'c2.s2.win', 'happy'), L('milo', 'c2.s2.win2', 'confident'), L('orin', 'c2.s2.t1', 'neutral')]);
  },
  async scene3() {
    await say([L('orin', 'c2.s3.1', 'neutral')]);
    await runPanel(t('c2.t3.title'), [sp2('c2.t31', { title: t('c2.t3.title'), build: mcq2('c2.t31', (b) => { b.innerHTML = predRows(T31); }) })]);
    await say([L('orin', 'c2.s3.2', 'thinking'), L('milo', 'c2.s3.3', 'thinking')]);
    await runPanel(t('c2.t3.title'), [sp2('c2.t32', { title: t('c2.t3.title'), build: mcq2('c2.t32', (b) => { b.innerHTML = cmTable(); }) })]);
    setFlag('c2s3'); award(40, ['accuracy', 'cm']); Aud.sfx('ok'); Over.refreshNPCs();
    await say([L('orin', 'c2.s3.win', 'confident'), L('milo', 'c2.s3.win2', 'thinking'), L('orin', 'c2.s3.t1', 'neutral')]);
  },
  async scene4() {
    await say([L('orin', 'c2.s4.1', 'neutral')]);
    await runPanel(t('c2.t4.title'), [sp2('c2.t41', { title: t('c2.t4.title'), build: mcq2('c2.t41', (b) => { b.innerHTML = modelsTable(); }) }), sp2('c2.t42', { title: t('c2.t4.title'), build: mcq2('c2.t42', (b) => { b.innerHTML = modelsTable(); }) })]);
    setFlag('c2s4'); award(50, ['gen']);
    await say([L('orin', 'c2.s4.win', 'happy'), L('milo', 'c2.s4.win2', 'thinking')]);
    G.cine = true; UI.prompt(null); await Over.pan(11.5 * 16, 4.5 * 16, 800); Aud.sfx('gate'); setFlag('c2engine'); Over.shake(2, 0.6); Over.burst(11.5 * 16, 4 * 16, ['#8ff6ff', '#ffffff', '#ffd24a'], 40);
    Over.emo.tess = { n: 'heart', t: 2 }; Over.hop.tess = 1.4; Over.emo.orin = { n: 'star', t: 2 }; Over.hop.orin = 1.2; Over.emo.milo = { n: 'star', t: 2 }; await ASYNC(1700); await Over.pan(null); G.cine = false;
    await say([L('tess', 'c2.turn.1', 'happy'), L('tess', 'c2.turn.2', 'surprised'), L('orin', 'c2.turn.3', 'surprised')]);
    G.cine = true; Aud.sfx('door'); UI.toast(t('c2.turn.bell')); Over.shake(1.5, 0.5); await ASYNC(1200); G.cine = false;
    await say([L('orin', 'c2.turn.4', 'worried'), L('milo', 'c2.turn.5', 'confident'), L('none', 'c2.turn.6')]);
    HUD.update();
  },
  async sqTess() {
    await say([L('tess', 'c2.sqT.in', 'happy')]); UI.toast(t('toast.quest', { name: t('c2.sqT.name') }));
    await runPanel(t('c2.sqT.name'), [sqTSpec()]); setFlag('c2sqT'); award(25, ['fairtest']); await say([L('tess', 'c2.sqT.done', 'happy')]); Over.emo.tess = { n: 'star', t: 1.8 };
  },
  async sqMiner() {
    await say([L('bramm', 'c2.sqB.in', 'happy')]); UI.toast(t('toast.quest', { name: t('c2.sqB.name') }));
    await runPanel(t('c2.sqB.name'), [sqBSpec()]); setFlag('c2sqB'); award(25, ['trap']); await say([L('bramm', 'c2.sqB.done', 'surprised')]); Over.emo.bramm = { n: 'heart', t: 1.8 };
  },
  async sqPractice() {
    await say([L('tess', 'c2.sqP.in', 'thinking')]); UI.toast(t('toast.quest', { name: t('c2.sqP.name') }));
    await runPanel(t('c2.sqP.name'), [sqPSpec()]); setFlag('c2sqP'); award(25, ['valid']); await say([L('tess', 'c2.sqP.done', 'happy')]); Over.emo.tess = { n: 'star', t: 1.8 };
  },
  async rehearsal() {
    const defs = [[1, 1], [2, 0], [3, 0], [4, 0], [5, 0]];
    const tasks = defs.map(([n, c], i) => ({ title: t('c2.r.title') + ' (' + (i + 1) + '/5)', p: t('c2.r.' + n), hints: [t('c2.r.h'), t('c2.r.h2'), t('c2.r.ex' + n)], ex: t('c2.r.ex' + n), build: mcqBuild(['a', 'b', 'c'].map((k, j) => ({ id: j, txt: t('c2.r.' + n + k) })), 0) }));
    await runPanel(t('c2.r.title'), tasks); UI.toast(t('c2.r.done')); if (!fl('c2reh')) { Save.set('c2reh'); award(15); }
    Over.cheer();
  },
  async talkCheater() {
    if (fl('c2boss')) { await say([L('cheater', 'c2.cheater.win', 'happy')]); return; }
    await say([L('student', 'c2.b.1', 'worried'), L('cheater', 'c2.b.2', 'confident'), L('hero', 'c2.b.3', 'thinking'), L('cheater', 'c2.b.4', 'confident'), L('milo', 'c2.b.5', 'determined'), L('hero', 'c2.b.6', 'determined')]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight2(); await UI.fade(0, 350); await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    const ch = Over.npc('cheater'); G.cine = true; Aud.sfx('fragment'); if (ch) Over.burst(ch.x, ch.y - 20, ['#ffd24a', '#fff3b0', '#8ff6ff'], 40); await ASYNC(600); G.cine = false;
    await say([L('student', 'c2.bw.1', 'happy'), L('hero', 'c2.bw.2', 'determined'), L('cheater', 'c2.bw.3', 'sad'), L('none', 'c2.bw.4')]);
    G.cine = true; Save.d.fragments = 2; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('c2boss'); Over.refreshNPCs(); G.cine = false; award(200, ['leak']); Over.cheer(); await ASYNC(1400);
    await say([L('none', 'c2.frag'), L('milo', 'c2.mem', 'sad'), L('tess', 'c2.mem2', 'happy'), L('orin', 'c2.br.1', 'neutral'), L('milo', 'c2.br.2', 'thinking'), L('none', 'c2.br.3')]);
    HUD.update();
  },
  journal() {
    const steps = ['c2s1', 'c2s2', 'c2s3', 'c2s4', 'c2boss', 'c2end'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j2.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'c2.sqT.name', st: fl('c2sqT') ? 'done' : (fl('c2s2') ? 'avail' : 'locked') }, { k: 'c2.sqB.name', st: fl('c2sqB') ? 'done' : (fl('c2s3') ? 'avail' : 'locked') }, { k: 'c2.sqP.name', st: fl('c2sqP') ? 'done' : (fl('c2s4') ? 'avail' : 'locked') }, { k: 'jr.reh2', st: fl('c2reh') ? 'done' : (fl('c2s1') ? 'avail' : 'locked') }];
    return { main, side, mastery: Save.d.mastery.split || 0 };
  },
  async endChapter() {
    if (fl('c2end')) { if (!G.cine) Maps.travel(3); return; }
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('c2end'); const m = (Save.d.bossLog2 && Save.d.bossLog2.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end2.title')) + '</div><p>' + fmt(t('end2.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end2.concept') + ': ' + t('mst.' + (Save.d.mastery.split || 1))) + '</div><div class="v-m gold">' + fmt(t('end2.frag')) + '</div><p class="dim">' + fmt(t('end2.cliff')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('end.map'), 'primary', () => { Panel.close(); Maps.open(); }), UI.btn(t('end.cont'), 'ghost', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end2'), body, { close: false, cls: 'wide' }), 'act', () => { Over.x = 29.6 * 16; Over.y = 12.4 * 16; }); HUD.update();
  },
};
S('end2.concept', 'Split and test skill', 'مهارة التقسيم والاختبار');
S('c2.orin.wait', 'Tess will show you the chambers first. Go and talk to her.', 'ستريكما Tess الغرف أولًا. اذهبا وتحدّثا معها.');

/* ---------- hook city 2 into the existing story ---------- */
(function () {
  const _npcs = Story.npcsFor.bind(Story), _talk = Story.talk.bind(Story), _enter = Story.onEnter.bind(Story), _look = Story.look.bind(Story), _journal = Story.journal.bind(Story), _obj = Quest.objective.bind(Quest);
  Story.npcsFor = function (room) { return C2ROOMS.includes(room) ? City2.npcs(room) : _npcs(room); };
  Story.talk = async function (id) {
    if (['tess', 'orin', 'bramm', 'cheater', 'student'].includes(id)) { if (G.cine) return; try { await City2.talk(id); } finally { HUD.update(); } return; }
    return _talk(id);
  };
  Story.onEnter = async function (room, prev) { if (C2ROOMS.includes(room)) return City2.onEnter(room); return _enter(room, prev); };
  Story.look = function (s) { if (s.say === 'tile.engine' && fl('c2engine')) return say([L('none', 'tile.engine2')]); return _look(s); };
  Story.journal = function () { return Over.room && Over.room.city === 2 ? City2.journal() : _journal(); };
  Quest.objective = function () {
    if (!Save.d || !fl('intro')) return null; const city = Over.room && Over.room.city;
    if (city === 2) return City2.objective();
    if (fl('chapterEnd')) return fl('c2start') ? null : { room: 'yard', x: 29 * 16, y: 13 * 16, text: t('obj2.travel') };
    return _obj();
  };
  const _end = Story.endChapter.bind(Story);
  Story.endChapter = async function () { if (fl('chapterEnd')) { if (G.cine) return; return Maps.travel(2); } return _end(); };
})();

/* ---------- world map and travel ---------- */
const Maps = {
  built: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true }, pos: { 1: [12, 70], 2: [29, 36], 3: [46, 66], 4: [62, 30], 5: [78, 64], 6: [90, 24] },
  state(c) {
    const here = (Over.room && Over.room.city) || 1;
    if (c === here) return 'here'; if (c === 1) return fl('chapterEnd') ? 'done' : 'open';
    if (c === 2) return !fl('chapterEnd') ? 'locked' : (fl('c2end') ? 'done' : 'open');
    if (c === 3) return !fl('c2end') ? 'locked' : (fl('c3end') ? 'done' : 'open');
    if (c === 4) return !fl('c3end') ? 'locked' : (fl('c4end') ? 'done' : 'open');
    if (c === 5) return !fl('c4end') ? 'locked' : (fl('c5end') ? 'done' : 'open');
    return !fl('c5end') ? 'locked' : (fl('c6end') ? 'done' : 'open');
  },
  open() {
    if (G.mode !== 'play' || Panel.open || Dlg.active || G.cine) return;
    const box = el('div', 'wmap'); let sel = (Over.room && Over.room.city) || 1;
    const render = () => {
      const pts = [1, 2, 3, 4, 5, 6].map((c) => this.pos[c]);
      let h = '<div class="wm-field"><svg class="wm-path" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="' + pts.map((p) => p[0] + ',' + p[1]).join(' ') + '" /></svg>';
      [1, 2, 3, 4, 5, 6].forEach((c) => { const s = this.state(c), p = this.pos[c]; h += '<button type="button" class="wm-n ' + s + (c === sel ? ' sel' : '') + '" data-c="' + c + '" style="left:' + p[0] + '%;top:' + p[1] + '%"><i>' + (s === 'locked' || s === 'soon' ? '?' : c) + '</i><span>' + fmt(t('map.c' + c)) + '</span></button>'; });
      h += '</div>';
      const s = this.state(sel), can = (s === 'open' || s === 'done') && this.built[sel];
      h += '<div class="wm-info"><h3>' + fmt(t('map.c' + sel)) + '</h3><p>' + fmt(t('map.t' + sel)) + '</p><p class="dim">' + fmt(t('map.boss') + ': ' + t('map.b' + sel)) + ' · ' + fmt(t('map.' + (s === 'here' ? 'here' : s === 'done' ? 'done' : s === 'open' ? 'open' : s === 'soon' ? 'soon' : 'locked'))) + '</p><div class="wm-bar"></div></div>';
      box.innerHTML = h; const bar = $('.wm-bar', box);
      if (can) bar.appendChild(UI.btn(t('map.go'), 'primary', () => { Panel.close(); this.travel(sel); }));
      bar.appendChild(UI.btn(t('map.close'), 'ghost', () => Panel.close()));
      $$('.wm-n', box).forEach((b) => b.addEventListener('click', () => { const c = +b.dataset.c; Aud.sfx('click'); const st = this.state(c); if (!this.built[c] && st !== 'here') UI.toast(t(st === 'soon' ? 'map.soonmsg' : 'map.lockedmsg')); else if (st === 'locked') UI.toast(t('map.lockedmsg')); sel = c; render(); const nb = $('.wm-n[data-c="' + c + '"]', box); nb && nb.focus(); }));
    };
    render(); const card = Panel.card(t('map.title'), box, { cls: 'wide' }); card.appendChild(el('p', 'dim wm-hint', fmt(t('map.hint')))); Menus.show(card, 'act');
  },
  async travel(c) {
    if (G.cine || Dlg.active) return; const here = (Over.room && Over.room.city) || 1; G.cine = true; UI.prompt(null); Aud.sfx('door'); await UI.fade(1, 450);
    if (c === 1) Over.enter('village', 14.5, 18.2, 'up'); else if (c === 3) { Save.set('c3start'); Over.enter('forest', 3, 12.4, 'right'); } else if (c === 4) { Save.set('c4start'); Over.enter('valley', 3, 12.2, 'right'); } else if (c === 5) { Save.set('c5start'); Over.enter('fields', 3, 11.2, 'right'); } else if (c === 6) { Save.set('c6start'); Over.enter('dock', 3, 9.8, 'right'); } else { Save.set('c2start'); Over.enter('quarry', 4, 12.4, 'right'); }
    Env.sync(true); HUD.update(); await UI.fade(0, 500); G.cine = false; await Story.onEnter(c === 1 ? 'village' : c === 3 ? 'forest' : c === 4 ? 'valley' : c === 5 ? 'fields' : c === 6 ? 'dock' : 'quarry');
  },
};
