'use strict';
/* ===== city5.js: Valley of Predictions (chapter 5): tasks, scenes, Rote boss ===== */

const HARV = [[2, 10], [4, 18], [6, 26], [8, 34]];
const harvTable = (b, noNew) => { b.innerHTML = '<table class="cm ds"><tr><th>' + fmt(t('c5.col.sun')) + '</th><th>' + fmt(t('c5.col.bask')) + '</th></tr>' + HARV.map((r) => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>').join('') + (noNew ? '' : '<tr><td>' + fmt(t('c5.new')) + '</td><td>' + fmt(t('c5.q')) + '</td></tr>') + '</table>'; };
const ledgerTable = (b) => { const rows = [['A', 20, 18, '+2'], ['B', 30, 33, '−3'], ['C', 40, 36, '+4']]; b.innerHTML = '<table class="cm ds"><tr><th>' + fmt(t('c5.col.f')) + '</th><th>' + fmt(t('c5.col.act')) + '</th><th>' + fmt(t('c5.col.pred')) + '</th><th>' + fmt(t('c5.col.err')) + '</th></tr>' + rows.map((r) => '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>').join('') + '</table>'; };
const sageTable = (b) => { b.innerHTML = '<table class="cm ds"><tr><th>' + fmt(t('c5.col.model')) + '</th><th>' + fmt(t('c5.col.tr')) + '</th><th>' + fmt(t('c5.col.te')) + '</th></tr><tr><th>A</th><td>' + fmt(t('c5.high')) + '</td><td>' + fmt(t('c5.high')) + '</td></tr><tr><th>B</th><td>' + fmt(t('c5.low')) + '</td><td>' + fmt(t('c5.low')) + '</td></tr><tr><th>C</th><td>' + fmt(t('c5.vlow')) + '</td><td>' + fmt(t('c5.high')) + '</td></tr></table>'; };
const mcq5 = (id, pre) => mcqBuild(abc(id), 'a', pre);

/* live toy: line fitter */
function lineToy(body) {
  const W = 220, Hh = 150, X = (x) => 20 + x * 24, Y = (y) => Hh - 12 - y * 3.4, wrap = el('div', 'lt-wrap'), svgBox = el('div', 'lt-chart'), eq = el('p', 'lt-eq');
  let m = 1, b = 0; const sl = (key, min, max, set) => { const row = el('label', 'lt-row'), out = el('b', 'lt-v'), inp = document.createElement('input'); inp.type = 'range'; inp.min = min; inp.max = max; inp.step = 1; inp.value = set === 'm' ? m : b; row.append(el('span', '', fmt(t(key))), inp, out); inp.addEventListener('input', () => { if (set === 'm') m = +inp.value; else b = +inp.value; Aud.sfx('click'); draw(); }); return { row, inp, out }; };
  const sm = sl('c5.slope', 0, 8, 'm'), sb = sl('c5.inter', 0, 12, 'b');
  const draw = () => { sm.out.textContent = m; sb.out.textContent = b; eq.innerHTML = fmt(t('c5.eq', { m: m, b: b })); const y0 = Math.min(Math.max(b, -5), 60), y1 = Math.min(m * 9 + b, 60);
    svgBox.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" class="lt-svg"><rect width="' + W + '" height="' + Hh + '" fill="none"/><line x1="20" y1="' + (Hh - 12) + '" x2="' + (W - 4) + '" y2="' + (Hh - 12) + '" class="lt-ax"/><line x1="20" y1="4" x2="20" y2="' + (Hh - 12) + '" class="lt-ax"/><line x1="' + X(0) + '" y1="' + Y(y0) + '" x2="' + X(9) + '" y2="' + Y(y1) + '" class="lt-line"/>' + HARV.map((p) => '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="4" class="lt-pt"/>').join('') + '</svg>'; };
  wrap.append(svgBox, eq, sm.row, sb.row); body.appendChild(wrap); draw();
  return { check() { return { ok: m === 4 && b === 2 }; }, solve() { m = 4; b = 2; sm.inp.value = 4; sb.inp.value = 2; draw(); } };
}
/* live toy: flexibility slider */
function flexToy(data) {
  return (body) => {
    const wrap = el('div', 'flexw'), row = el('label', 'lt-row'), inp = document.createElement('input'), out = el('b', 'lt-v'), bars = el('div', 'flexbars'); inp.type = 'range'; inp.min = 1; inp.max = 5; inp.step = 1; inp.value = 1;
    row.append(el('span', '', fmt(t('c5.flex', { n: '' }).replace(/:.*/, ':'))), inp, out); wrap.append(row, bars); body.appendChild(wrap);
    const draw = () => { const n = +inp.value; out.textContent = n; const lab = { 1: 'c5.flex.1', 3: 'c5.flex.3', 5: 'c5.flex.5' }[n]; bars.innerHTML = '<div class="fb"><span>' + fmt(t('c5.flex.tr', { v: data.tr[n - 1] })) + '</span><i style="width:' + Math.min(100, data.tr[n - 1] * 6) + '%" class="trn"></i></div><div class="fb"><span>' + fmt(t('c5.flex.te', { v: data.te[n - 1] })) + '</span><i style="width:' + Math.min(100, data.te[n - 1] * 6) + '%" class="ten"></i></div>' + (lab ? '<p class="dim">' + fmt(t(lab)) + '</p>' : ''); };
    inp.addEventListener('input', () => { Aud.sfx('click'); draw(); }); draw();
    return { check() { return { ok: +inp.value === data.best }; }, solve() { inp.value = data.best; draw(); } };
  };
}
const FLEX1 = { tr: [9, 4, 1.5, 0.6, 0], te: [10, 5, 2, 6, 14], best: 3 }, FLEX2 = { tr: [8, 2, 1, 0.5, 0], te: [9, 2.5, 5, 9, 16], best: 2 };

function scene1Specs5() { return [sp2('c5.t11', { title: t('c5.t1.title'), build: mcq5('c5.t11', harvTable) }), sp2('c5.t12', { title: t('c5.t1.title'), build: mcq5('c5.t12') }), sp2('c5.t13', { title: t('c5.t1.title'), build: mcq5('c5.t13', (b) => harvTable(b, true)) })]; }
function scene2Specs5() { return [sp2('c5.t21', { title: t('c5.t2.title'), build: mcq5('c5.t21', (b) => harvTable(b, true)) }), sp2('c5.t22', { title: t('c5.t2.title'), build: mcq5('c5.t22') }), sp2('c5.t23', { title: t('c5.t2.title'), build: lineToy }), sp2('c5.t24', { title: t('c5.t2.title'), build: mcq5('c5.t24', (b) => harvTable(b, true)) })]; }
function scene3Specs5() { return ['31', '32', '33', '34', '35'].map((n) => sp2('c5.t' + n, { title: t('c5.t3.title'), build: mcq5('c5.t' + n, ledgerTable) })); }
function scene4Specs5() { return [sp2('c5.t41', { title: t('c5.t4.title'), build: mcq5('c5.t41') }), sp2('c5.t42', { title: t('c5.t4.title'), build: mcq5('c5.t42') }), sp2('c5.t43', { title: t('c5.t4.title'), build: mcq5('c5.t43', sageTable) }),
  sp2('c5.t44', { title: t('c5.t4.title'), build: (body) => tapBuild([1, 2, 3, 4].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('c5.t44.' + i)) + '</div>' })), [1, 2], true)(body) })]; }
const sqSpec5 = (k) => k === 'W' ? sp2('c5.sqW', { title: t('c5.sqW.title'), build: flexToy(FLEX2) }) : sp2('c5.sq' + k, { title: t('c5.sq' + k + '.title'), build: mcq5('c5.sq' + k) });

function bossSpecs5() {
  return [
    sp2('q5.1', { build: mcq5('q5.1') }), sp2('q5.2', { build: mcq5('q5.2') }),
    sp2('q5.3', { build: (body) => tapBuild([1, 2, 3, 4].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('q5.3.' + i)) + '</div>' })), [1, 2, 4], true)(body) }),
    sp2('q5.4', { build: mcq5('q5.4') }), sp2('q5.5', { build: mcq5('q5.5') }), sp2('q5.6', { build: mcq5('q5.6') }),
    sp2('q5.7', { build: flexToy(FLEX1) }), sp2('q5.8', { build: mcq5('q5.8') }), sp2('q5.9', { build: mcq5('q5.9') }), sp2('q5.10', { build: mcq5('q5.10') }),
  ];
}
Arena.bgTemple = function (g, t) {
  for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#5a4a7a', '#f0d8a8', y / 120); g.fillRect(0, y, 320, 4); }
  g.fillStyle = '#e8e2d6'; for (let i = 0; i < 6; i++) { g.fillRect(20 + i * 52, 22, 10, 80); g.fillStyle = '#c9a24b'; g.fillRect(16 + i * 52, 20, 18, 4); g.fillStyle = '#e8e2d6'; }
  g.fillStyle = '#d6d0c4'; g.fillRect(0, 98, 320, 22); g.fillStyle = '#b8b2a6'; g.fillRect(0, 98, 320, 2);
  for (let i = 0; i < 5; i++) { const x = (i * 71 + t * 10) % 340 - 10, y = 30 + ((i * 29) % 40) + Math.sin(t * 1.3 + i) * 4; g.fillStyle = '#a89c8a'; g.fillRect(x, y, 10, 7); g.fillRect(x + 1, y - 3, 3, 3); g.fillRect(x + 6, y - 3, 3, 3); }
};
ARENA_T.temple = { bg: 'bgTemple', spr: 'rote' };
const BOSS5 = { boss: 'rote', theme: 'temple', specs: bossSpecs5, phases: { 0: 'b5.ph1', 3: 'b5.ph2', 6: 'b5.ph3', 8: 'b5.ph4' }, start: 'c5.b.start', taunt: 'b5.taunt', vict: 'b5.vict', frag: 'end5.frag', codex: 'b5.rCodex', xp: 250, log: 'bossLog5', mast: 'balance' };

const POS5 = { rowan: [6, 11.2], tumble: [31.5, 14.2], linT: [10.2, 7.2], linH: [12, 7.8], linP: [15.4, 8.2], sage1: [9.4, 10.2], sage2: [20.4, 10.2], rote: [13.2, 9.4], roteW: [10, 11.4], cit: [6, 12.4] };
const C5ROOMS = ['fields', 'tower', 'hall', 'temple', 'courtyard'];
const C5IDS = ['rowan5', 'tumble5', 'lin', 'sage1', 'sage2', 'rote', 'citizen'];
const seq5 = (rows) => say(rows.map((r) => L(r[0], r[1], r[2])));
const City5 = {
  npcs(room) {
    const out = [], N = (o) => out.push(o), P = POS5;
    if (room === 'fields') {
      N({ id: 'rowan5', sp: 'rowan', spr: 'rowan', tx: P.rowan[0], ty: P.rowan[1], dir: 'right', mark: () => (!fl('c5s1') ? 'main' : (fl('c5s3') && !fl('c5sqR') ? 'side' : null)) });
      N({ id: 'tumble5', sp: 'tumble', spr: 'tumble', tx: P.tumble[0], ty: P.tumble[1], dir: 'left', mark: () => (fl('c5s2') && !fl('c5sqT') ? 'side' : null) });
    }
    if (room === 'tower' && !fl('c5s2')) N({ id: 'lin', sp: 'lin', spr: 'lin', tx: P.linT[0], ty: P.linT[1], dir: 'down', mark: () => (fl('c5s1') ? 'main' : null) });
    if (room === 'hall' && fl('c5s2') && !fl('c5s3')) N({ id: 'lin', sp: 'lin', spr: 'lin', tx: P.linH[0], ty: P.linH[1], dir: 'down', mark: () => 'main' });
    if (room === 'temple') {
      if (fl('c5s3')) N({ id: 'lin', sp: 'lin', spr: 'lin', tx: P.linP[0], ty: P.linP[1], dir: 'down', mark: () => (!fl('c5s4') ? 'main' : (!fl('c5sqW') ? 'side' : null)) });
      N({ id: 'sage1', sp: 'sage1', spr: 'sage1', tx: P.sage1[0], ty: P.sage1[1], dir: 'right', fixed: true, mark: () => (fl('c5s3') && !fl('c5s4') ? 'main' : null) });
      N({ id: 'sage2', sp: 'sage2', spr: 'sage2', tx: P.sage2[0], ty: P.sage2[1], dir: 'left', fixed: true });
    }
    if (room === 'courtyard') {
      if (!fl('c5boss')) N({ id: 'rote', sp: 'rote', spr: 'rote', tx: P.rote[0], ty: P.rote[1], dir: 'down', fixed: true, mark: () => 'main' });
      else { N({ id: 'rote', sp: 'rote', spr: 'rote', tx: P.roteW[0], ty: P.roteW[1], dir: 'right' }); N({ id: 'citizen', sp: 'citizen', spr: 'citizen', tx: P.cit[0], ty: P.cit[1], dir: 'right' }); }
    }
    return out;
  },
  objective() {
    const cur = Over.room && Over.room.id, at = (room, pos, key) => ({ room: room, x: pos[0] * 16, y: pos[1] * 16, text: t(key) });
    if (fl('c5end')) return fl('c6start') ? null : { room: 'courtyard', x: 25 * 16, y: 8 * 16, text: t('obj6.travel') };
    if (fl('c5boss')) return { room: 'courtyard', x: 25 * 16, y: 8 * 16, text: t('obj5.path') };
    if (fl('c5s4')) return cur === 'courtyard' ? at('courtyard', POS5.rote, 'obj5.boss') : { room: 'temple', x: 15.5 * 16, y: 2.4 * 16, text: t('obj5.courtyard') };
    if (fl('c5s3')) return cur === 'temple' ? at('temple', POS5.linP, 'obj5.sages') : { room: 'temple', x: 3 * 16, y: 13 * 16, text: t('obj5.temple') };
    if (fl('c5s2')) return cur === 'hall' ? at('hall', POS5.linH, 'obj5.lin') : { room: 'hall', x: 12 * 16, y: 12.5 * 16, text: t('obj5.hall') };
    if (fl('c5s1')) return cur === 'tower' ? at('tower', POS5.linT, 'obj5.lin') : { room: 'tower', x: 10 * 16, y: 12.5 * 16, text: t('obj5.tower') };
    return at('fields', POS5.rowan, 'obj5.rowan');
  },
  async onEnter(room) {
    if (room === 'fields' && !fl('c5arrive')) { Save.set('c5arrive'); await seq5([['milo', 'c5.a1', 'surprised'], ['rowan', 'c5.a2', 'happy']]); }
    HUD.update();
  },
  async talk(id) {
    const f = this, w = (who, k, m) => say([L(who, k, m || 'neutral')]);
    if (id === 'rowan5') return !fl('c5s1') ? f.scene1() : (fl('c5s3') && !fl('c5sqR') ? f.sq('R') : w('rowan', fl('c5boss') ? 'c5.rowan.win' : 'c5.rowan.idle', 'happy'));
    if (id === 'tumble5') return fl('c5s2') && !fl('c5sqT') ? f.sq('T') : w('tumble', 'c5.tumble.idle', 'happy');
    if (id === 'lin') {
      if (!fl('c5s1')) return w('lin', 'c5.lin.wait');
      if (!fl('c5s2')) return f.scene2();
      if (!fl('c5s3')) return f.scene3();
      if (!fl('c5s4')) return f.scene4();
      return !fl('c5sqW') ? f.sq('W') : w('lin', 'c5.lin.idle', 'happy');
    }
    if (id === 'sage1' || id === 'sage2') return fl('c5s3') && !fl('c5s4') ? f.scene4() : w(id, 'c5.' + id + '.idle');
    if (id === 'rote') return fl('c5boss') ? w('rote', 'c5.crote.win', 'happy') : f.boss();
    if (id === 'citizen') return w('citizen', 'c5.b.5', 'happy');
  },
  async scene1() {
    await seq5([['rowan', 'c5.s1.1', 'worried'], ['milo', 'c5.s1.2', 'thinking'], ['rowan', 'c5.s1.3', 'neutral'], ['hero', 'c5.s1.4', 'confident'], ['rowan', 'c5.s1.5', 'happy']]);
    await runPanel(t('c5.t1.title'), scene1Specs5());
    setFlag('c5s1'); award(150, ['regress']); Aud.sfx('ok'); Over.cheer();
    await seq5([['rowan', 'c5.s1.win', 'happy'], ['milo', 'c5.s1.win2', 'confident'], ['milo', 'c5.s1.win3', 'thinking'], ['rowan', 'c5.s1.t1', 'happy']]);
  },
  async scene2() {
    await seq5([['lin', 'c5.s2.1', 'happy'], ['lin', 'c5.s2.2', 'thinking'], ['hero', 'c5.s2.3', 'thinking'], ['lin', 'c5.s2.4', 'happy'], ['milo', 'c5.s2.5', 'thinking'], ['lin', 'c5.s2.6', 'neutral']]);
    await runPanel(t('c5.t2.title'), scene2Specs5());
    setFlag('c5s2'); award(150, ['linear']); Aud.sfx('ok'); Over.refreshNPCs();
    await seq5([['lin', 'c5.s2.win', 'happy'], ['hero', 'c5.s2.win2', 'happy'], ['milo', 'c5.s2.win3', 'thinking'], ['lin', 'c5.s2.t1', 'neutral']]);
  },
  async scene3() {
    await seq5([['lin', 'c5.s3.1', 'thinking'], ['lin', 'c5.s3.2', 'neutral'], ['milo', 'c5.s3.3', 'confident'], ['milo', 'c5.s3.4', 'thinking']]);
    await runPanel(t('c5.t3.title'), scene3Specs5());
    setFlag('c5s3'); award(150, ['errors']); Aud.sfx('ok'); Over.refreshNPCs();
    await seq5([['lin', 'c5.s3.win', 'happy'], ['hero', 'c5.s3.win2', 'happy'], ['milo', 'c5.s3.report', 'surprised'], ['milo', 'c5.s3.report2', 'sad'], ['lin', 'c5.s3.report3', 'neutral'], ['lin', 'c5.s3.t1', 'neutral']]);
  },
  async scene4() {
    await seq5([['sage1', 'c5.s4.1', 'neutral'], ['sage2', 'c5.s4.2', 'happy'], ['lin', 'c5.s4.3', 'worried'], ['milo', 'c5.s4.4', 'thinking']]);
    await runPanel(t('c5.t4.title'), scene4Specs5());
    setFlag('c5s4'); award(250, ['fitting', 'biasvar']); Aud.sfx('ok'); Over.cheer(); Env.sync();
    await seq5([['sage1', 'c5.sage1.idle', 'happy'], ['sage2', 'c5.sage2.idle', 'happy'], ['lin', 'c5.s4.win', 'happy'], ['hero', 'c5.s4.win2', 'happy'], ['milo', 'c5.s4.win3', 'confident']]);
    G.cine = true; Over.shake(2.5, 1.0); Aud.sfx('door'); await ASYNC(900); G.cine = false;
    await seq5([['milo', 'c5.s4.gate', 'surprised'], ['rowan', 'c5.s4.rowan', 'worried']]);
  },
  async sq(k) {
    const w = { T: 'tumble', R: 'rowan', W: 'lin' }[k], nm = 'c5.sq' + k;
    await say([L(w, nm + '.in', 'thinking')]); UI.toast(t('toast.quest', { name: t(nm + '.name') }));
    await runPanel(t(nm + '.name'), [sqSpec5(k)]); setFlag('c5sq' + k); award(25, k === 'T' ? ['priceline'] : (k === 'W' ? ['wiggle'] : []));
    await say([L(w, nm + '.done', 'happy')]);
  },
  async boss() {
    await seq5([['rote', 'c5.b.1', 'confident'], ['hero', 'c5.b.2', 'determined'], ['rote', 'c5.b.3', 'confident'], ['hero', 'c5.b.4', 'determined']]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight2(BOSS5); await UI.fade(0, 350); await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    G.cine = true; Aud.sfx('fragment'); const ch = Over.npc('rote'); if (ch) Over.burst(ch.x, ch.y - 20, ['#ffd24a', '#fff3b0', '#ffffff'], 40); await ASYNC(600); G.cine = false;
    await seq5([['rote', 'c5.bw.1', 'sad'], ['lin', 'c5.bw.2', 'neutral']]);
    G.cine = true; Save.d.fragments = 5; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('c5boss'); Over.refreshNPCs(); G.cine = false; award(250, ['fitting']); Over.cheer(); await ASYNC(1400);
    await seq5([['citizen', 'c5.b.5', 'happy'], ['none', 'c5.frag'], ['milo', 'c5.mem', 'thinking'], ['lin', 'c5.br.1', 'thinking'], ['hero', 'c5.br.2', 'determined'], ['milo', 'c5.br.3', 'confident']]);
    HUD.update();
  },
  journal() {
    const steps = ['c5s1', 'c5s2', 'c5s3', 'c5s4', 'c5boss', 'c5end'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j5.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'c5.sqT.name', st: fl('c5sqT') ? 'done' : (fl('c5s2') ? 'avail' : 'locked') }, { k: 'c5.sqR.name', st: fl('c5sqR') ? 'done' : (fl('c5s3') ? 'avail' : 'locked') }, { k: 'c5.sqW.name', st: fl('c5sqW') ? 'done' : (fl('c5s4') ? 'avail' : 'locked') }];
    return { main, side, mastery: Save.d.mastery.balance || 0 };
  },
  async endChapter() {
    if (fl('c5end')) { if (!G.cine) Maps.travel(6); return; }
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('c5end'); const m = (Save.d.bossLog5 && Save.d.bossLog5.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end5.title')) + '</div><p>' + fmt(t('end5.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end5.concept') + ': ' + t('mst.' + (Save.d.mastery.balance || 1))) + '</div><div class="v-m gold">' + fmt(t('end5.frag')) + '</div><p class="dim">' + fmt(t('end5.cliff')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('end.map'), 'primary', () => { Panel.close(); Maps.open(); }), UI.btn(t('end.cont'), 'ghost', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end5'), body, { close: false, cls: 'wide' }), 'act', () => { Over.x = 24 * 16; Over.y = 8 * 16; }); HUD.update();
  },
};
(function () {
  const _npcs = Story.npcsFor.bind(Story), _talk = Story.talk.bind(Story), _enter = Story.onEnter.bind(Story), _journal = Story.journal.bind(Story), _obj = Quest.objective.bind(Quest);
  Story.npcsFor = function (room) { return C5ROOMS.includes(room) ? City5.npcs(room) : _npcs(room); };
  Story.talk = async function (id) { if (C5IDS.includes(id)) { if (G.cine) return; try { await City5.talk(id); } finally { HUD.update(); } return; } return _talk(id); };
  Story.onEnter = async function (room, prev) { if (C5ROOMS.includes(room)) return City5.onEnter(room); return _enter(room, prev); };
  Story.journal = function () { return Over.room && Over.room.city === 5 ? City5.journal() : _journal(); };
  Quest.objective = function () { if (Save.d && fl('intro') && Over.room && Over.room.city === 5) return City5.objective(); return _obj(); };
})();
