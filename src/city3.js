'use strict';
/* ===== city3.js: Forest of Patterns (chapter 3): tasks, scenes, trial, Bird Gate boss ===== */

const PREDS = { Skyfin: ['Bird', ['ft.wings', 'ft.feathers']], Pondle: ['Amphibian', ['ft.legs4', 'ft.water']], Emberfox: ['Mammal', ['ft.legs4', 'ft.fur']] };
const clsOpts = (list, prefix) => list.map((c) => ({ id: c, txt: t('cls.' + c) }));
const TREE_FUR = { q: 'qs.feathers', y: { leaf: 'cls.Bird' }, n: { q: 'qs.fur', y: { leaf: 'cls.Mammal' }, n: { leaf: 'cls.Unknown' } } };
const withHi = (tr, path) => { const c = JSON.parse(JSON.stringify(tr)); let n = c; c.hi = true; path.forEach((d) => { n = n[d]; n.hi = true; }); return c; };
const treePre = (tr) => (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(tr) + '</div>'; };
const T_WATER = { q: 'qs.water', y: { q: 'qs.fins', y: { leaf: 'cls.Fish' }, n: { leaf: 'cls.Amphibian' } }, n: { leaf: 'cls.Bird' } };
const T_FULL = { q: 'qs.feathers', y: { leaf: 'cls.Bird' }, n: { q: 'qs.water', y: { q: 'qs.fins', y: { leaf: 'cls.Fish' }, n: { leaf: 'cls.Amphibian' } }, n: { leaf: 'cls.Mammal' } } };
const DS3 = [['Skyfin', 1, 0, 0, 'Bird'], ['Cloudwing', 1, 0, 0, 'Bird'], ['Windle', 1, 0, 0, 'Bird'], ['Ripple', 0, 1, 1, 'Fish'], ['Deepglow', 0, 1, 1, 'Fish'], ['Brookle', 0, 1, 0, 'Amphibian'], ['Emberfox', 0, 0, 0, 'Mammal']];
const yn = (v) => t(v ? 'tr.yes' : 'tr.no');
function dataTable(rows, showClass) {
  return '<table class="cm ds"><tr><th></th><th>' + fmt(t('qs.feathers')) + '</th><th>' + fmt(t('qs.water')) + '</th><th>' + fmt(t('qs.fins')) + '</th>' + (showClass ? '<th>' + fmt(t('tr.class')) + '</th>' : '') + '</tr>' +
    rows.map((r) => '<tr><th><img class="gem-s" alt="" src="' + Creatures.url(r[0]) + '"> ' + r[0] + '</th><td>' + fmt(yn(r[1])) + '</td><td>' + fmt(yn(r[2])) + '</td><td>' + fmt(yn(r[3])) + '</td>' + (showClass ? '<td>' + fmt(t('cls.' + r[4])) + '</td>' : '') + '</tr>').join('') + '</table>';
}
const pre2 = (...fs) => (b) => { b.innerHTML = fs.map((f) => (typeof f === 'function' ? f() : f)).join(''); };
const mcq3 = (id, pre, order) => mcqBuild((order || ['a', 'b', 'c']).map((k) => ({ id: k, txt: t(id + '.' + k) })), 'a', pre);

/* ---------- scene 1 ---------- */
function classTaskSpec(name, i) {
  const [cls, feats] = PREDS[name], others = ['Bird', 'Amphibian', 'Mammal'];
  return { title: t('c3.t1.title'), p: t('c3.t1.p', { n: name, f: feats.map((f) => t(f)).join(', ') }), hints: [t('c3.t1.h1'), t('c3.t1.h2'), t('c3.t1.ex' + (i + 1))], ex: t('c3.t1.ex' + (i + 1)),
    build: (body) => { body.insertAdjacentHTML('beforeend', '<div class="cards one">' + creaHTML(name, { feats: feats, label: name }) + '</div>'); return mcqBuild(clsOpts(others), cls)(body); } };
}
function featuresTapSpec() {
  const items = [['f1', t('ft.feathers')], ['c1', t('cls.Bird')], ['f2', t('ft.water')], ['c2', t('cls.Fish')]];
  return sp2('c3.t1f', { title: t('c3.t1.title'), build: tapBuild(items.map((x) => ({ id: x[0], html: '<div class="stepc">' + fmt(x[1]) + '</div>' })), ['f1', 'f2'], true) });
}

/* ---------- scenes 2-4 task specs ---------- */
function treeQ(id, tr, path, hiPath) { return sp2(id, { title: t('c3.t2.title'), build: mcq3(id, (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(withHi(tr, hiPath)) + '</div>'; }) }); }
function scene2Specs() {
  return [
    sp2('c3.t21', { title: t('c3.t2.title'), build: mcq3('c3.t21', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(TREE_FUR) + '</div><div class="cards one">' + creaHTML('Cloudwing', { feats: ['ft.wings', 'ft.feathers'], label: 'Cloudwing' }) + '</div>'; }) }),
    sp2('c3.t22', { title: t('c3.t2.title'), build: mcq3('c3.t22', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(TREE_FUR) + '</div><div class="cards one">' + creaHTML('Mosskit', { feats: ['ft.fur'], label: 'Mosskit' }) + '</div>'; }) }),
  ];
}
const scene2bSpecs = () => [
  sp2('c3.t23', { title: t('c3.t2.title'), build: mcq3('c3.t23', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(withHi({ q: 'qs.feathers', y: { leaf: 'cls.Bird' }, n: { q: 'qs.fur', y: { leaf: 'cls.Mammal' }, n: { leaf: 'cls.Unknown' } } }, [])) + '</div>'; }) }),
  sp2('c3.t24', { title: t('c3.t2.title'), build: mcq3('c3.t24', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(TREE_FUR) + '</div>'; }) }),
];
const scene2cSpec = () => sp2('c3.t25', { title: t('c3.t25.title'), build: mcq3('c3.t25', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML({ q: 'qs.water', y: { q: 'qs.fins', hi: true, y: { leaf: 'cls.Fish' }, n: { leaf: 'cls.Amphibian' } }, n: { leaf: 'cls.Bird' } }).replace('tq hi', 'tq hi ghostq') + '</div>' + dataTable([['Ripple', 0, 1, 1, 'Fish'], ['Brookle', 0, 1, 0, 'Amphibian'], ['Skyfin', 1, 0, 0, 'Bird']], true).replace('<th>' + fmt(t('qs.fins')) + '</th>', '<th>' + fmt(t('qs.fins')) + '</th>'); }) });
function scene3Specs() {
  const grp = (qk, fi) => t('c3.t3.group', { q: t(qk), y: DS3.filter((r) => r[fi]).map((r) => r[0]).join(isAr() ? '/' : ', ') || '-', n: DS3.filter((r) => !r[fi]).map((r) => r[0]).join(isAr() ? '/' : ', ') || '-' });
  const tbl = () => '<h4 class="sub">' + fmt(t('c3.t3.data')) + '</h4>' + dataTable(DS3, true);
  return [
    sp2('c3.t31', { title: t('c3.t3.title'), build: mcq3('c3.t31', (b) => { b.innerHTML = tbl() + '<div class="grp">' + [['qs.feathers', 1], ['qs.water', 2], ['qs.fins', 3]].map((x) => '<div>' + fmt(grp(x[0], x[1])) + '</div>').join('') + '</div>'; }) }),
    sp2('c3.t32', { title: t('c3.t3.title'), build: mcq3('c3.t32', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML({ q: 'qs.feathers', y: { leaf: 'cls.Bird' }, n: { hi: true, q: 'qs.water', y: null, n: null } }) + '</div>' + dataTable(DS3.filter((r) => !r[1]), true); }) }),
    sp2('c3.t33', { title: t('c3.t3.title'), build: mcq3('c3.t33', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML({ q: 'qs.feathers', y: { leaf: 'cls.Bird' }, n: { q: 'qs.water', y: { hi: true, q: 'qs.fins', y: null, n: null }, n: { leaf: 'cls.Mammal' } } }) + '</div>' + dataTable(DS3.filter((r) => r[2]), true); }) }),
    sp2('c3.t34', { title: t('c3.t3.title'), build: mcq3('c3.t34', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(T_FULL) + '</div><div class="cards one">' + creaHTML('?', { label: '?', extra: fmt([['qs.feathers', 0], ['qs.water', 1], ['qs.fins', 0]].map((x) => t(x[0]) + ' ' + yn(x[1])).join(' · ')) }) + '</div>'; }) }),
  ];
}
function voteSpec() {
  const trees = [['Amphibian'], ['Fish'], ['Amphibian']];
  return sp2('c3.t41', { title: t('c3.t4.title'), build: gatedMcq((wrap, ready) => {
    wrap.innerHTML = '<p class="stepc">' + fmt(t('c3.t4.new')) + '</p>'; const row = el('div', 'cards'); let n = 0; const go = [];
    trees.forEach((tr, i) => {
      const card = el('div', 'card', '<div class="rec"><img class="fruit" alt="" src="' + Creatures.url('?') + '"><div class="rec-l">' + fmt(t('c3.t4.ask', { n: i + 1 })) + '</div></div>'), out = el('div', 'rev-out'), b = el('button', 'opt small', fmt(t('c3.t4.ask', { n: i + 1 }))); b.type = 'button';
      const run = () => { if (b.dataset.done) return; b.dataset.done = 1; Aud.sfx('ok'); card.querySelector('img').src = Creatures.url(tr[0]); out.innerHTML = fmt(t('c3.t4.says', { n: i + 1, c: t('cls.' + tr[0]) })); b.remove(); if (++n === 3) ready(); };
      b.addEventListener('click', run); go.push(run); card.append(b, out); row.appendChild(card);
    });
    wrap.appendChild(row); return () => go.forEach((f) => f());
  }, [{ id: 'a', txt: t('c3.t41.a') }, { id: 'b', txt: t('c3.t41.b') }, { id: 'c', txt: t('c3.t41.c') }], 'a', 'c3.t4.need') });
}
const voteSpec2 = () => sp2('c3.t42', { title: t('c3.t42.title'), build: mcq3('c3.t42', (b) => { b.innerHTML = '<div class="grp"><div>' + fmt(t('c3.t42.table')) + '</div></div>'; }) });

function trialSpecs() {
  return [1, 2, 3, 4, 5].map((n, i) => ({ title: t('c3.r.title') + ' (' + (i + 1) + '/5)', p: t('c3.r.' + n), hints: [t('c3.r.h'), t('c3.r.h2'), t('c3.r.ex' + n)], ex: t('c3.r.ex' + n),
    build: mcqBuild(['a', 'b', 'c'].map((k, j) => ({ id: j, txt: t('c3.r.' + n + k) })), 0) }));
}
function sqSpec(kind) {
  if (kind === 'F') return sp2('c3.sqF', { title: t('c3.sqF.title'), build: tapBuild([1, 2, 3, 4].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('c3.sqF.' + i)) + '</div>' })), [1, 2], true) });
  if (kind === 'S') return sp2('c3.sqS', { title: t('c3.sqS.title'), build: tapBuild([1, 2, 3].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('c3.sqS.' + i)) + '</div>' })), [1, 2], true) });
  return sp2('c3.sqO', { title: t('c3.sqO.title'), build: mcq3('c3.sqO') });
}

/* ---------- boss: Fanatic, the Biased Learner ---------- */
const GV = [{ g: 'g.heron', n: 1, m: 4 }, { g: 'g.owl', n: 1, m: 5 }];
function bossSpecs3() {
  const gtrain = () => '<div class="grp"><div>' + fmt(t('g.train', { a: 92, b: 5, c: 3 })) + '</div><div>' + fmt(t('g.all', { n: 94, m: 100 })) + '</div></div>';
  const grows = [['finch', 'g.finch', 94, 95], ['heron', 'g.heron', 0, 3], ['owl', 'g.owl', 0, 2]];
  const treeSmall = { q: 'qs.small', y: { q: 'qs.beak', y: { leaf: 'cls.Bird' }, n: { leaf: 'cls.NotBird' } }, n: { leaf: 'cls.NotBird', hi: true } };
  let calls = 0; const q33 = {
    p: () => { const v = GV[calls++ % 2]; return t('q3.3.p', { n: v.n, m: v.m, g: t(v.g) }); },
    build: (body) => { const v = GV[(calls - 1) % 2], p = Math.round(v.n / v.m * 100); return mcqBuild([{ id: 'a', txt: p + '%' }, { id: 'b', txt: (100 - p) + '%' }, { id: 'c', txt: v.n + '%' }], 'a')(body); },
  };
  return [
    sp2('q3.1', { build: mcq3('q3.1', gtrain) }),
    sp2('q3.2', { build: (body) => { body.insertAdjacentHTML('beforeend', '<div class="grp"><div>' + fmt(t('g.all', { n: 94, m: 100 })) + '</div></div>'); return tapBuild(grows.map((r) => ({ id: r[0], html: '<div class="stepc"><img class="gem-s" alt="" src="' + Creatures.url(r[0] === 'finch' ? 'finch' : r[0]) + '"><br>' + fmt(t('g.row', { g: t(r[1]), n: r[2], m: r[3] })) + '</div>' })), ['heron', 'owl'], true)(body); } }),
    sp2('q3.3', { rebuild: true, p: q33.p, build: q33.build }),
    sp2('q3.4', { build: mcq3('q3.4', (b) => { b.innerHTML = '<div class="treebox">' + treeHTML(treeSmall) + '</div><div class="cards one">' + creaHTML('heron', { label: 'Heron' }) + '</div>'; }) }),
    sp2('q3.5', { build: mcq3('q3.5', gtrain) }),
    sp2('q3.6', { build: mcq3('q3.6', (b) => { b.innerHTML = '<div class="cards">' + creaHTML('heron', { label: 'Heron' }) + creaHTML('owl', { label: 'Owl' }) + creaHTML('finch', { label: 'Finch' }) + creaHTML('bat', { label: 'Bat' }) + '</div>'; }) }),
    sp2('q3.7', { build: (body) => tapBuild([1, 2, 3, 4].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('q3.7.' + i)) + '</div>' })), [1, 3], true)(body) }),
    sp2('q3.8', { build: mcq3('q3.8') }),
    sp2('q3.9', { build: orderBuild('q3.9') }),
    sp2('q3.10', { build: mcq3('q3.10', (b) => { b.innerHTML = '<table class="cm models"><tr><th></th><th>' + fmt(t('b3.before')) + '</th><th>' + fmt(t('b3.after')) + '</th></tr><tr><th>' + fmt(t('g.heron')) + '</th><td class="r">0%</td><td class="g">75%</td></tr><tr><th>' + fmt(t('g.owl')) + '</th><td class="r">0%</td><td class="g">60%</td></tr><tr><th>' + fmt(t('g.all0')) + '</th><td>94%</td><td>93%</td></tr></table>'; }) }),
  ];
}
S('b3.before', `Before`, `قبل`); S('b3.after', `After`, `بعد`); S('g.all0', `All birds`, `كل الطيور`);

/* arena backdrop for the Bird Gate */
Arena.bgGate = function (g, t) {
  for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#1d4a3a', '#7ac88a', y / 120); g.fillRect(0, y, 320, 4); }
  for (let i = 0; i < 7; i++) { const x = i * 52 - 6; g.fillStyle = '#1d3a28'; g.fillRect(x + 10, 20, 10, 80); g.fillStyle = '#2a5a38'; g.fillRect(x, 6, 30, 26); g.fillStyle = '#3a7a46'; g.fillRect(x + 4, 2, 22, 14); }
  g.fillStyle = '#8a7a96'; g.fillRect(118, 18, 18, 76); g.fillRect(190, 18, 18, 76); g.fillRect(114, 10, 98, 12); g.fillStyle = '#b8aac4'; g.fillRect(114, 10, 98, 3); g.fillStyle = '#6a3a4a'; g.fillRect(138, 13, 50, 6);
  g.fillStyle = '#4a4a5a'; for (let x = 138; x < 188; x += 7) g.fillRect(x, 22, 2, 72);
  g.fillStyle = '#4f9a4f'; g.fillRect(0, 94, 320, 26); g.fillStyle = '#3a7a3a'; for (let x = 0; x < 320; x += 12) g.fillRect(x, 94, 6, 2);
  g.fillStyle = '#9a7648'; g.fillRect(138, 94, 50, 26);
  for (let i = 0; i < 6; i++) { const x = (i * 57 + t * 20) % 340 - 10, y = 38 + ((i * 23) % 36) + Math.sin(t * 2 + i) * 5; g.fillStyle = i < 5 ? '#e8c040' : '#8ea6c4'; g.fillRect(x, y, 7, 4); g.fillRect(x + 2, y - 2, 3, 2); g.fillStyle = '#fff'; g.fillRect(x + 5, y + 1, 1, 1); }
};
ARENA_T.gate = { bg: 'bgGate', spr: 'fanatic' };
const BOSS3 = { boss: 'fanatic', theme: 'gate', specs: bossSpecs3, phases: { 0: 'b3.ph1', 3: 'b3.ph2', 6: 'b3.ph3', 8: 'b3.ph4' }, start: 'c3.b.start', taunt: 'b3.taunt', vict: 'b3.vict', frag: 'end3.frag', codex: 'b3.rCodex', xp: 250, log: 'bossLog3', mast: 'fair', frag3: true };

/* ---------- city 3 story ---------- */
const POS3 = { fern: [6, 12.2], qtree: [16.6, 11.9], sylvan: [29.5, 12.2], oak: [12, 7.4], fanatic: [13, 8.4], fanaticW: [9.4, 9.4], heron: [8.4, 10.8], owlet: [17.6, 10.9] };
const C3ROOMS = ['forest', 'council', 'birdgate'];
const C3IDS = ['fern', 'qtree', 'sylvan', 'oak', 'fanatic', 'heron', 'owlet'];
const City3 = {
  npcs(room) {
    const out = [], N = (o) => out.push(o), P = POS3;
    if (room === 'forest') {
      N({ id: 'fern', sp: 'fern', spr: 'fern', tx: P.fern[0], ty: P.fern[1], dir: 'right', mark: () => (!fl('c3s1') ? 'main' : (!fl('c3sqF') ? 'side' : null)) });
      N({ id: 'qtree', sp: 'qtree', spr: 'qtree', tx: P.qtree[0], ty: P.qtree[1], dir: 'down', fixed: true, mark: () => (fl('c3s1') && !fl('c3s2') ? 'main' : null) });
      N({ id: 'sylvan', sp: 'sylvan', spr: 'sylvan', tx: P.sylvan[0], ty: P.sylvan[1], dir: 'left', mark: () => (fl('c3s2') && !fl('c3s3') ? 'main' : (fl('c3s3') && !fl('c3sqS') ? 'side' : null)) });
    }
    if (room === 'council') N({ id: 'oak', sp: 'oak', spr: 'oak', tx: P.oak[0], ty: P.oak[1], dir: 'down', fixed: true, mark: () => (fl('c3s3') && !fl('c3trial') ? 'main' : (fl('c3s4') && !fl('c3sqO') ? 'side' : null)) });
    if (room === 'birdgate') {
      if (!fl('c3boss')) N({ id: 'fanatic', sp: 'fanatic', spr: 'fanatic', tx: P.fanatic[0], ty: P.fanatic[1], dir: 'down', fixed: true, mark: () => 'main' });
      else N({ id: 'fanatic', sp: 'fanatic', spr: 'fanatic', tx: P.fanaticW[0], ty: P.fanaticW[1], dir: 'right' });
      N({ id: 'heron', sp: 'heron', spr: 'heron', tx: P.heron[0], ty: P.heron[1], dir: 'up' });
      N({ id: 'owlet', sp: 'owlet', spr: 'owlet', tx: P.owlet[0], ty: P.owlet[1], dir: 'up' });
    }
    return out;
  },
  objective() {
    const cur = Over.room && Over.room.id, at = (room, pos, key) => ({ room: room, x: pos[0] * 16, y: pos[1] * 16, text: t(key) });
    if (fl('c3end')) return fl('c4start') ? null : { room: 'birdgate', x: 13 * 16, y: 5.2 * 16, text: t('obj4.travel') };
    if (fl('c3boss')) return { room: 'birdgate', x: 13 * 16, y: 5.2 * 16, text: t('obj3.path') };
    if (fl('c3trial')) return cur === 'birdgate' ? at('birdgate', POS3.fanatic, 'obj3.boss') : { room: 'birdgate', x: 13 * 16, y: 13 * 16, text: t('obj3.gate') };
    if (fl('c3s4')) return at('council', POS3.oak, 'obj3.oak');
    if (fl('c3s3')) return cur === 'council' ? at('council', POS3.oak, 'obj3.oak') : { room: 'council', x: 12 * 16, y: 14 * 16, text: t('obj3.council') };
    if (fl('c3s2')) return at('forest', POS3.sylvan, 'obj3.sylvan');
    if (fl('c3s1')) return at('forest', POS3.qtree, 'obj3.tree');
    return at('forest', POS3.fern, 'obj3.fern');
  },
  async onEnter(room) {
    if (room === 'forest' && !fl('c3arrive')) { Save.set('c3arrive'); await say([L('milo', 'c3.a1', 'surprised'), L('fern', 'c3.a2', 'happy')]); }
    HUD.update();
  },
  async talk(id) {
    const f = this;
    if (id === 'fern') return !fl('c3s1') ? f.scene1() : (!fl('c3sqF') ? f.sq('F') : say([L('fern', fl('c3boss') ? 'c3.fern.win' : 'c3.fern.idle', 'happy')]));
    if (id === 'qtree') return !fl('c3s1') ? say([L('qtree', 'c3.tree.wait', 'neutral')]) : (!fl('c3s2') ? f.scene2() : say([L('qtree', 'c3.tree.idle', 'happy')]));
    if (id === 'sylvan') return !fl('c3s2') ? say([L('sylvan', 'c3.sylvan.wait', 'neutral')]) : (!fl('c3s3') ? f.scene3() : (!fl('c3sqS') ? f.sq('S') : say([L('sylvan', 'c3.sylvan.idle', 'happy')])));
    if (id === 'oak') return f.talkOak();
    if (id === 'fanatic') return fl('c3boss') ? say([L('fanatic', 'c3.cfan.win', 'happy')]) : f.boss();
    if (id === 'heron') return say([L('heron', fl('c3boss') ? 'c3.heron.win' : 'c3.heron.idle', fl('c3boss') ? 'happy' : 'worried')]);
    if (id === 'owlet') return say([L('owlet', fl('c3boss') ? 'c3.owlet.win' : 'c3.owlet.idle', fl('c3boss') ? 'happy' : 'sad')]);
  },
  async talkOak() {
    if (!fl('c3s3')) return say([L('oak', 'c3.oak.wait', 'neutral')]);
    if (!fl('c3s4')) return this.scene4();
    const opts = []; if (!fl('c3trial')) opts.push({ k: 'c3.trial.opt', id: 'T' }); if (!fl('c3sqO')) opts.push({ k: 'c3.sqO.opt', id: 'O' });
    if (!opts.length) return say([L('oak', 'c3.oak.idle', 'happy')]);
    const c = await Dlg.choose(opts.concat([{ k: 'c2.cancel' }]), L('oak', 'c3.ask', 'neutral')); if (c >= opts.length) return;
    return opts[c].id === 'T' ? this.trial() : this.sq('O');
  },
  async scene1() {
    await say(['1', '2', '3', '4', '5', '6', '7', '8'].map((n, i) => L(['fern', 'hero', 'fern', 'milo', 'fern', 'milo', 'hero', 'fern'][i], 'c3.s1.' + n, ['sad', 'thinking', 'sad', 'happy', 'surprised', 'confident', 'determined', 'determined'][i])));
    await runPanel(t('c3.t1.title'), [classTaskSpec('Skyfin', 0), classTaskSpec('Pondle', 1), classTaskSpec('Emberfox', 2), featuresTapSpec()]);
    setFlag('c3s1'); award(100, ['classify', 'feature']); Aud.sfx('ok'); const n = Over.npc('fern'); if (n) { Over.burst(n.x, n.y - 20, ['#7fe08a', '#ffffff', '#ffd24a'], 26); Over.emo.fern = { n: 'heart', t: 2 }; Over.hop.fern = 1.3; }
    await say([L('fern', 'c3.s1.win', 'happy'), L('hero', 'c3.s1.win2', 'happy'), L('milo', 'c3.s1.win3', 'thinking'), L('fern', 'c3.s1.t1', 'happy')]);
    Over.refreshNPCs();
  },
  async scene2() {
    await say([L('qtree', 'c3.s2.1', 'neutral'), L('hero', 'c3.s2.2', 'thinking'), L('qtree', 'c3.s2.3', 'sad'), L('milo', 'c3.s2.4', 'confident'), L('qtree', 'c3.s2.5', 'happy')]);
    await runPanel(t('c3.t2.title'), scene2Specs());
    await say([L('qtree', 'c3.s2.mid', 'neutral')]);
    await runPanel(t('c3.t2.title'), scene2bSpecs().concat([scene2cSpec()]));
    setFlag('c3s2'); award(100, ['tree']); Aud.sfx('ok'); Over.emo.qtree = { n: 'star', t: 2 }; Over.shake(1.5, 0.5);
    await say([L('qtree', 'c3.s2.win', 'happy'), L('hero', 'c3.s2.win2', 'happy'), L('milo', 'c3.s2.win3', 'happy'), L('qtree', 'c3.s2.t1', 'thinking')]);
  },
  async scene3() {
    await say([L('sylvan', 'c3.s3.1', 'worried'), L('hero', 'c3.s3.2', 'determined'), L('milo', 'c3.s3.3', 'thinking'), L('sylvan', 'c3.s3.4', 'neutral'), L('sylvan', 'c3.s3.5', 'happy')]);
    await runPanel(t('c3.t3.title'), scene3Specs());
    setFlag('c3s3'); award(150, ['split3']); Aud.sfx('ok'); Over.refreshNPCs();
    await say([L('sylvan', 'c3.s3.win', 'happy'), L('hero', 'c3.s3.win2', 'happy'), L('milo', 'c3.s3.win3', 'thinking'), L('sylvan', 'c3.s3.t1', 'happy')]);
  },
  async scene4() {
    await say([L('oak', 'c3.s4.1', 'neutral'), L('hero', 'c3.s4.2', 'thinking'), L('milo', 'c3.s4.3', 'confident'), L('oak', 'c3.s4.4', 'happy'), L('milo', 'c3.s4.5', 'thinking')]);
    await runPanel(t('c3.t4.title'), [voteSpec(), voteSpec2()]);
    setFlag('c3s4'); award(150, ['forest', 'vote']); Aud.sfx('ok'); Over.cheer();
    await say([L('oak', 'c3.s4.win', 'happy'), L('hero', 'c3.s4.win2', 'happy'), L('oak', 'c3.s4.win3', 'neutral'), L('oak', 'c3.s4.t1', 'happy')]);
  },
  async trial() {
    await say([L('oak', 'c3.trial.1', 'neutral'), L('hero', 'c3.trial.2', 'determined')]);
    const res = await runPanel(t('c3.r.title'), trialSpecs()), score = res.filter((r) => r.tries === 1 && !r.helped).length;
    const rank = score === 5 ? '5' : score >= 3 ? '3' : '0'; UI.toast(t('c3.rank.t', { r: t('c3.rank.' + rank) }));
    setFlag('c3trial'); award(150); Aud.sfx('fragment'); Over.cheer(); await ASYNC(900);
    await say([L('oak', 'c3.trial.win', 'happy'), L('milo', 'c3.trial.win2', 'thinking'), L('milo', 'c3.trial.gate', 'worried')]);
  },
  async sq(k) {
    const w = { F: 'fern', S: 'sylvan', O: 'oak' }[k], nm = 'c3.sq' + k;
    await say([L(w, nm + '.in', 'thinking')]); UI.toast(t('toast.quest', { name: t(nm + '.name') }));
    await runPanel(t(nm + '.name'), [sqSpec(k)]); setFlag('c3sq' + k); award(25); Over.emo[w] = { n: 'star', t: 1.8 };
    await say([L(w, nm + '.done', 'happy')]);
  },
  async boss() {
    await say([L('fanatic', 'c3.b.1', 'confident'), L('hero', 'c3.b.2', 'determined'), L('heron', 'c3.b.3', 'sad'), L('milo', 'c3.b.4', 'thinking'), L('fanatic', 'c3.b.5', 'angry'), L('hero', 'c3.b.6', 'determined')]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight2(BOSS3); await UI.fade(0, 350); const m = await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    const ch = Over.npc('fanatic'); G.cine = true; Aud.sfx('fragment'); if (ch) Over.burst(ch.x, ch.y - 20, ['#ffd24a', '#fff3b0', '#8fe0a0'], 40); await ASYNC(600); G.cine = false;
    await say([L('heron', 'c3.bw.1', 'happy'), L('hero', 'c3.bw.2', 'determined'), L('fanatic', 'c3.bw.3', 'sad'), L('milo', 'c3.bw.4', 'thinking')]);
    G.cine = true; Save.d.fragments = 3; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('c3boss'); Over.refreshNPCs(); G.cine = false; award(250, ['bias']); Over.cheer(); await ASYNC(1400);
    await say([L('none', 'c3.frag'), L('milo', 'c3.mem', 'sad'), L('hero', 'c3.mem2', 'happy'), L('milo', 'c3.br.1', 'thinking'), L('hero', 'c3.br.2', 'thinking')]);
    HUD.update();
  },
  journal() {
    const steps = ['c3s1', 'c3s2', 'c3s3', 'c3s4', 'c3trial', 'c3boss', 'c3end'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j3.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'c3.sqF.name', st: fl('c3sqF') ? 'done' : (fl('c3s1') ? 'avail' : 'locked') }, { k: 'c3.sqS.name', st: fl('c3sqS') ? 'done' : (fl('c3s3') ? 'avail' : 'locked') }, { k: 'c3.sqO.name', st: fl('c3sqO') ? 'done' : (fl('c3s4') ? 'avail' : 'locked') }];
    return { main, side, mastery: Save.d.mastery.fair || 0 };
  },
  async endChapter() {
    if (fl('c3end')) { if (!G.cine) Maps.travel(4); return; }
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('c3end'); const m = (Save.d.bossLog3 && Save.d.bossLog3.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end3.title')) + '</div><p>' + fmt(t('end3.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end3.concept') + ': ' + t('mst.' + (Save.d.mastery.fair || 1))) + '</div><div class="v-m gold">' + fmt(t('end3.frag')) + '</div><p class="dim">' + fmt(t('end3.cliff')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('end.map'), 'primary', () => { Panel.close(); Maps.open(); }), UI.btn(t('end.cont'), 'ghost', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end3'), body, { close: false, cls: 'wide' }), 'act', () => { Over.x = 13 * 16; Over.y = 8.6 * 16; }); HUD.update();
  },
};
S('c3.trial.opt', `Begin the Forest Mastery Trial`, `ابدأ Forest Mastery Trial`);

/* ---------- hook city 3 into the story ---------- */
(function () {
  const _npcs = Story.npcsFor.bind(Story), _talk = Story.talk.bind(Story), _enter = Story.onEnter.bind(Story), _look = Story.look.bind(Story), _journal = Story.journal.bind(Story), _obj = Quest.objective.bind(Quest);
  Story.npcsFor = function (room) { return C3ROOMS.includes(room) ? City3.npcs(room) : _npcs(room); };
  Story.talk = async function (id) { if (C3IDS.includes(id)) { if (G.cine) return; try { await City3.talk(id); } finally { HUD.update(); } return; } return _talk(id); };
  Story.onEnter = async function (room, prev) { if (C3ROOMS.includes(room)) return City3.onEnter(room); return _enter(room, prev); };
  Story.look = function (s) {
    if (s.say === 'tile.signs' && fl('c3s1')) return say([L('none', 'tile.signs2')]);
    if (s.say === 'tile.gate3' && fl('c3boss')) return say([L('none', 'tile.gate3b')]);
    return _look(s);
  };
  Story.journal = function () { return Over.room && Over.room.city === 3 ? City3.journal() : _journal(); };
  Quest.objective = function () { if (Save.d && fl('intro') && Over.room && Over.room.city === 3) return City3.objective(); return _obj(); };
})();
