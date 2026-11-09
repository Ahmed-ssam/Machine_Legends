'use strict';
/* ===== city4.js: Valley of Neighbors (chapter 4): tasks, scenes, trial, Bulk boss ===== */

const sizeTable = (rows) => '<table class="cm ds"><tr><th>' + fmt(t('c4.col.name')) + '</th><th>' + fmt(t('c4.col.size')) + '</th><th>' + fmt(t('c4.col.weight')) + '</th></tr>' +
  rows.map((r) => '<tr><th>' + (CREA[r[0]] ? '<img class="gem-s" alt="" src="' + Creatures.url(r[0]) + '"> ' : '') + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>').join('') + '</table>';
const PL2 = [{ n: 'Skyfin', x: 3, y: 4 }, { n: 'Ripple', x: 8, y: 2 }, { n: 'Emberfox', x: 2, y: 7 }, { n: 'Starling', x: 5, y: 4, unknown: true, hi: true }];
const plot2 = (lines) => (b) => { b.innerHTML = plotHTML(PL2, { coords: true, xlab: 'ax.size', ylab: 'ax.speed', lines: lines || [] }); };
const mcq4 = (id, pre) => mcqBuild(abc(id), 'a', pre);
const cardPre = (name, feats) => (b) => { b.innerHTML = '<div class="cards one">' + creaHTML(name, { feats: feats, label: name }) + '</div>'; };

function scene1Specs4() {
  return [
    sp2('c4.t11', { title: t('c4.t1.title'), build: mcq4('c4.t11', cardPre('Cloudlet', ['ft.wings', 'ft.feathers'])) }),
    sp2('c4.t12', { title: t('c4.t1.title'), build: mcq4('c4.t12', cardPre('Mossling', ['ft.legs4', 'ft.fur'])) }),
    sp2('c4.t13', { title: t('c4.t1.title'), build: mcq4('c4.t13', cardPre('Pebble', [])) }),
  ];
}
function scene2Specs4() {
  return [
    sp2('c4.t21', { title: t('c4.t2.title'), build: mcq4('c4.t21', plot2([[3, 0, 'hl']])) }),
    sp2('c4.t22', { title: t('c4.t2.title'), build: mcq4('c4.t22', plot2([[3, 1, 'hl']])) }),
    sp2('c4.t23', { title: t('c4.t2.title'), build: mcq4('c4.t23', plot2([[3, 0, 'hl'], [3, 1], [3, 2]])) }),
    sp2('c4.t24', { title: t('c4.t2.title'), build: mcq4('c4.t24', plot2([[3, 0, 'hl']])) }),
  ];
}
const SW = [['Pebble', 5, 5000], ['Mossling', 6, 5100], ['Stoneback', 9, 5001]];
function scene3Specs4() {
  const tb = (b) => { b.innerHTML = sizeTable(SW); };
  return [
    sp2('c4.t31', { title: t('c4.t3.title'), build: mcq4('c4.t31', tb) }),
    sp2('c4.t32', { title: t('c4.t3.title'), build: mcq4('c4.t32', tb) }),
    sp2('c4.t33', { title: t('c4.t3.title'), build: mcq4('c4.t33', tb) }),
    sp2('c4.t34', { title: t('c4.t3.title'), build: mcq4('c4.t34', (b) => { b.innerHTML = '<table class="cm ds"><tr><th></th><th>' + fmt(t('ax.size')) + '</th><th>Weight</th></tr><tr><th>Pebble</th><td>0.44</td><td>0.44</td></tr><tr><th>Mossling</th><td>0.56</td><td>0.46</td></tr><tr><th>Stoneback</th><td>0.89</td><td>0.44</td></tr></table>'; }) }),
    sp2('c4.t35', { title: t('c4.t3.title'), build: (body) => tapBuild([1, 2, 3, 4].map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t('c4.t35.' + i)) + '</div>' })), [1, 2], true)(body) }),
  ];
}
const PL4 = [{ n: 'Skyfin', x: 5, y: 6 }, { n: 'Brookle', x: 4, y: 4 }, { n: 'Windle', x: 7, y: 5 }, { n: 'Ripple', x: 8, y: 8 }, { n: 'Emberfox', x: 1, y: 2 }, { n: 'Starling', x: 5, y: 5, unknown: true, hi: true }];
function kSpec() {
  return sp2('c4.t41', { title: t('c4.t4.title'), build: gatedMcq((wrap, ready) => {
    wrap.innerHTML = '<p class="stepc">' + fmt(t('c4.t41.new')) + '</p>' + plotHTML(PL4, { coords: true, xlab: 'ax.size', ylab: 'ax.speed' }); const out = el('div', 'rev-out'); let n = 0; const go = [], row = el('div', 'opts row');
    [1, 3, 5].forEach((k) => { const b = el('button', 'opt small', fmt(t('c4.t41.ask', { k: k }))); b.type = 'button'; const run = () => { if (b.dataset.done) return; b.dataset.done = 1; Aud.sfx('ok'); out.insertAdjacentHTML('beforeend', '<div>' + fmt(t('c4.t41.says' + k)) + '</div>'); b.disabled = true; if (++n === 3) ready(); }; b.addEventListener('click', run); go.push(run); row.appendChild(b); });
    wrap.append(row, out); return () => go.forEach((f) => f());
  }, abc('c4.t41'), 'a', 'c4.t41.need') });
}
const scene4Specs4 = () => [kSpec(), sp2('c4.t42', { title: t('c4.t4.title'), build: mcq4('c4.t42') }), sp2('c4.t43', { title: t('c4.t4.title'), build: mcq4('c4.t43') })];
function trialSpecs4() {
  return [1, 2, 3, 4, 5].map((n, i) => ({ title: t('c4.r.title') + ' (' + (i + 1) + '/5)', p: t('c4.r.' + n), hints: [t('c4.r.h'), t('c4.r.h2'), t('c4.r.ex' + n)], ex: t('c4.r.ex' + n),
    build: mcqBuild(['a', 'b', 'c'].map((k, j) => ({ id: j, txt: t('c4.r.' + n + k) })), 0) }));
}
const sqSpec4 = (k) => sp2('c4.sq' + k, { title: t('c4.sq' + k + '.title'), build: mcq4('c4.sq' + k) });

/* ---------- boss ---------- */
function bossSpecs4() {
  const mm = { calls: 0 }, sd = { calls: 0 };
  const rawTable = (b) => { b.innerHTML = sizeTable([['Dot', 3, 2000], ['Moss', 4, 2400], ['Stone', 9, 2010]]); };
  const kgTable = (b) => { b.innerHTML = sizeTable([['Dot', 3, '2.0 kg'], ['Moss', 4, '2.4 kg'], ['Stone', 9, '2.01 kg']]); };
  return [
    sp2('q4.1', { build: mcq4('q4.1', rawTable) }),
    sp2('q4.2', { build: mcq4('q4.2', kgTable) }),
    sp2('q4.3', { build: mcq4('q4.3') }),
    sp2('q4.4', { rebuild: true, p: () => t('q4.4.p', { x: BMM[mm.calls++ % 2].x }), build: (body) => { const v = BMM[(mm.calls - 1) % 2]; return mcqBuild([{ id: 'a', txt: v.c.toFixed(2) }, { id: 'b', txt: v.w[0] }, { id: 'c', txt: v.w[1] }], 'a')(body); } }),
    sp2('q4.5', { rebuild: true, p: () => t('q4.5.p', { x: BSD[sd.calls++ % 2].x }), build: (body) => { const v = BSD[(sd.calls - 1) % 2]; return mcqBuild([{ id: 'a', txt: v.z }, { id: 'b', txt: v.w[0] }, { id: 'c', txt: v.w[1] }], 'a')(body); } }),
    sp2('q4.6', { build: mcq4('q4.6') }),
    sp2('q4.7', { build: mcq4('q4.7') }),
    sp2('q4.8', { build: mcq4('q4.8') }),
    sp2('q4.9', { build: orderBuild('q4.9') }),
    sp2('q4.10', { build: mcq4('q4.10') }),
  ];
}
Arena.bgValley = function (g, t) {
  for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#3a3a5a', '#aab8d8', y / 120); g.fillRect(0, y, 320, 4); }
  g.fillStyle = '#6a7a9a'; g.beginPath(); g.moveTo(0, 70); g.lineTo(60, 34); g.lineTo(110, 66); g.lineTo(170, 28); g.lineTo(240, 68); g.lineTo(290, 40); g.lineTo(320, 62); g.lineTo(320, 94); g.lineTo(0, 94); g.fill();
  g.fillStyle = '#6a9a4a'; g.fillRect(0, 92, 320, 28); g.fillStyle = '#58863c'; for (let x = 0; x < 320; x += 12) g.fillRect(x, 92, 6, 2);
  g.fillStyle = '#a8a4b4'; g.fillRect(84, 98, 152, 22); g.fillStyle = '#c0bccc'; g.fillRect(84, 98, 152, 3);
  const nums = ['5000', '9', '2', '1000', '40', '7', '300'];
  for (let i = 0; i < 7; i++) { const x = (i * 49 + t * 12) % 340 - 12, y = 22 + ((i * 31) % 40) + Math.sin(t * 1.4 + i) * 5, big = i === 0 || i === 3; g.fillStyle = big ? '#e8d48a' : '#c8d4ee'; g.font = (big ? 'bold 14px' : '8px') + ' "DotGothic16", sans-serif'; g.fillText(nums[i], x, y); }
};
ARENA_T.valley = { bg: 'bgValley', spr: 'bulk' };
const BOSS4 = { boss: 'bulk', theme: 'valley', specs: bossSpecs4, phases: { 0: 'b4.ph1', 3: 'b4.ph2', 6: 'b4.ph3', 8: 'b4.ph4' }, start: 'c4.b.start', taunt: 'b4.taunt', vict: 'b4.vict', frag: 'end4.frag', codex: 'b4.rCodex', xp: 250, log: 'bossLog4', mast: 'scale' };
S('mst.scale', `Scaling`, `Scaling`);

/* ---------- city 4 story ---------- */
const POS4 = { nara: [5.5, 12.2], tarn: [19, 10.6], tumble: [32, 15.8], sera: [10.4, 6.6], rowan: [12, 7.4], bulk: [13, 9.2], bulkW: [10, 10.4] };
const C4ROOMS = ['valley', 'scalehouse', 'council4', 'greatscale'];
const C4IDS = ['nara', 'tarn', 'sera', 'rowan', 'tumble', 'bulk'];
const seq4 = (rows) => say(rows.map((r) => L(r[0], r[1], r[2])));
const City4 = {
  npcs(room) {
    const out = [], N = (o) => out.push(o), P = POS4;
    if (room === 'valley') {
      N({ id: 'nara', sp: 'nara', spr: 'nara', tx: P.nara[0], ty: P.nara[1], dir: 'right', mark: () => (!fl('c4s1') ? 'main' : null) });
      N({ id: 'tarn', sp: 'tarn', spr: 'tarn', tx: P.tarn[0], ty: P.tarn[1], dir: 'up', mark: () => (fl('c4s1') && !fl('c4s2') ? 'main' : (fl('c4s2') && !fl('c4sqT') ? 'side' : null)) });
      N({ id: 'tumble', sp: 'tumble', spr: 'tumble', tx: P.tumble[0], ty: P.tumble[1], dir: 'left', mark: () => (fl('c4s3') && !fl('c4sqU') ? 'side' : null) });
    }
    if (room === 'scalehouse') N({ id: 'sera', sp: 'sera', spr: 'sera', tx: P.sera[0], ty: P.sera[1], dir: 'down', mark: () => (fl('c4s2') && !fl('c4s3') ? 'main' : null) });
    if (room === 'council4') N({ id: 'rowan', sp: 'rowan', spr: 'rowan', tx: P.rowan[0], ty: P.rowan[1], dir: 'down', fixed: true, mark: () => (fl('c4s3') && !fl('c4trial') ? 'main' : (fl('c4s4') && !fl('c4sqR') ? 'side' : null)) });
    if (room === 'greatscale') {
      if (!fl('c4boss')) N({ id: 'bulk', sp: 'bulk', spr: 'bulk', tx: P.bulk[0], ty: P.bulk[1], dir: 'down', fixed: true, mark: () => 'main' });
      else N({ id: 'bulk', sp: 'bulk', spr: 'bulk', tx: P.bulkW[0], ty: P.bulkW[1], dir: 'right' });
    }
    return out;
  },
  objective() {
    const cur = Over.room && Over.room.id, at = (room, pos, key) => ({ room: room, x: pos[0] * 16, y: pos[1] * 16, text: t(key) });
    if (fl('c4end')) return fl('c5start') ? null : { room: 'greatscale', x: 25 * 16, y: 8.6 * 16, text: t('obj5.travel') };
    if (fl('c4boss')) return { room: 'greatscale', x: 25 * 16, y: 9 * 16, text: t('obj4.path') };
    if (fl('c4trial')) return cur === 'greatscale' ? at('greatscale', POS4.bulk, 'obj4.boss') : { room: 'greatscale', x: 13 * 16, y: 14.5 * 16, text: t('obj4.scale') };
    if (fl('c4s4')) return at('council4', POS4.rowan, 'obj4.rowan');
    if (fl('c4s3')) return cur === 'council4' ? at('council4', POS4.rowan, 'obj4.rowan') : { room: 'council4', x: 12 * 16, y: 14.5 * 16, text: t('obj4.council') };
    if (fl('c4s2')) return at('scalehouse', POS4.sera, 'obj4.sera');
    if (fl('c4s1')) return at('valley', POS4.tarn, 'obj4.tarn');
    return at('valley', POS4.nara, 'obj4.nara');
  },
  async onEnter(room) {
    if (room === 'valley' && !fl('c4arrive')) { Save.set('c4arrive'); await seq4([['milo', 'c4.a1', 'surprised'], ['nara', 'c4.a2', 'happy']]); }
    HUD.update();
  },
  async talk(id) {
    const f = this, w = (who, k, m) => say([L(who, k, m || 'neutral')]);
    if (id === 'nara') return !fl('c4s1') ? f.scene1() : w('nara', fl('c4boss') ? 'c4.nara.win' : 'c4.nara.idle', 'happy');
    if (id === 'tarn') return !fl('c4s1') ? w('tarn', 'c4.tarn.wait') : (!fl('c4s2') ? f.scene2() : (!fl('c4sqT') ? f.sq('T') : w('tarn', 'c4.tarn.idle', 'happy')));
    if (id === 'sera') return !fl('c4s2') ? w('sera', 'c4.sera.wait') : (!fl('c4s3') ? f.scene3() : w('sera', 'c4.sera.idle', 'happy'));
    if (id === 'tumble') return fl('c4s3') && !fl('c4sqU') ? f.sq('U') : w('tumble', 'c4.tumble.idle', 'happy');
    if (id === 'rowan') return f.talkRowan();
    if (id === 'bulk') return fl('c4boss') ? w('bulk', 'c4.cbulk.win', 'happy') : f.boss();
  },
  async talkRowan() {
    if (!fl('c4s3')) return say([L('rowan', 'c4.rowan.wait', 'neutral')]);
    if (!fl('c4s4')) return this.scene4();
    const opts = []; if (!fl('c4trial')) opts.push({ k: 'c4.trial.opt', id: 'T' }); if (!fl('c4sqR')) opts.push({ k: 'c4.sqR.opt', id: 'R' });
    if (!opts.length) return say([L('rowan', 'c4.rowan.idle', 'happy')]);
    const c = await Dlg.choose(opts.concat([{ k: 'c2.cancel' }]), L('rowan', 'c3.ask', 'neutral')); if (c >= opts.length) return;
    return opts[c].id === 'T' ? this.trial() : this.sq('R');
  },
  async scene1() {
    await seq4([['nara', 'c4.s1.1', 'happy'], ['hero', 'c4.s1.2', 'thinking'], ['nara', 'c4.s1.3', 'neutral'], ['milo', 'c4.s1.4', 'confident'], ['nara', 'c4.s1.5', 'happy']]);
    await runPanel(t('c4.t1.title'), scene1Specs4());
    setFlag('c4s1'); award(150, ['similar']); Aud.sfx('ok'); const n = Over.npc('nara'); if (n) { Over.burst(n.x, n.y - 20, ['#ffd24a', '#ffffff', '#8ad0ff'], 26); Over.emo.nara = { n: 'heart', t: 2 }; Over.hop.nara = 1.3; }
    await seq4([['nara', 'c4.s1.win', 'happy'], ['hero', 'c4.s1.win2', 'thinking'], ['milo', 'c4.s1.win3', 'confident'], ['nara', 'c4.s1.t1', 'happy']]);
  },
  async scene2() {
    await seq4([['tarn', 'c4.tarn.in1', 'happy'], ['tarn', 'c4.s2.1', 'neutral'], ['hero', 'c4.s2.2', 'thinking'], ['tarn', 'c4.s2.3', 'happy'], ['milo', 'c4.s2.4', 'thinking']]);
    await runPanel(t('c4.t2.title'), scene2Specs4());
    setFlag('c4s2'); award(150, ['distance']); Aud.sfx('ok'); Over.shake(1.2, 0.4);
    await seq4([['tarn', 'c4.s2.win', 'happy'], ['hero', 'c4.s2.win2', 'happy'], ['milo', 'c4.s2.win3', 'thinking'], ['tarn', 'c4.s2.t1', 'neutral']]);
  },
  async scene3() {
    await seq4([['sera', 'c4.s3.1', 'worried'], ['hero', 'c4.s3.2', 'thinking'], ['sera', 'c4.s3.3', 'sad'], ['milo', 'c4.s3.4', 'confident'], ['milo', 'c4.s3.5', 'thinking'], ['sera', 'c4.s3.6', 'happy']]);
    await runPanel(t('c4.t3.title'), scene3Specs4());
    setFlag('c4s3'); award(200, ['scaling']); Aud.sfx('ok'); Over.refreshNPCs();
    await seq4([['sera', 'c4.s3.win', 'happy'], ['milo', 'c4.s3.win2', 'thinking'], ['hero', 'c4.s3.win3', 'thinking'], ['sera', 'c4.s3.t1', 'happy']]);
  },
  async scene4() {
    await seq4([['rowan', 'c4.s4.1', 'neutral'], ['hero', 'c4.s4.2', 'thinking'], ['milo', 'c4.s4.3', 'confident'], ['rowan', 'c4.s4.4', 'happy'], ['milo', 'c4.s4.5', 'thinking']]);
    await runPanel(t('c4.t4.title'), scene4Specs4());
    setFlag('c4s4'); award(200, ['knn']); Aud.sfx('ok'); Over.cheer();
    await seq4([['rowan', 'c4.s4.win', 'happy'], ['hero', 'c4.s4.win2', 'happy'], ['rowan', 'c4.s4.win3', 'neutral'], ['rowan', 'c4.s4.t1', 'happy']]);
  },
  async trial() {
    await seq4([['rowan', 'c4.trial.1', 'neutral'], ['hero', 'c4.trial.2', 'determined']]);
    const res = await runPanel(t('c4.r.title'), trialSpecs4()), score = res.filter((r) => r.tries === 1 && !r.helped).length;
    const rank = score === 5 ? '5' : score >= 3 ? '3' : '0'; UI.toast(t('c4.rank.t', { r: t('c4.rank.' + rank) }));
    setFlag('c4trial'); award(150); Aud.sfx('fragment'); Over.cheer(); await ASYNC(900);
    await seq4([['rowan', 'c4.trial.win', 'happy']]);
    G.cine = true; Over.shake(3, 1); Aud.sfx('no'); await ASYNC(900); G.cine = false;
    await seq4([['milo', 'c4.trial.rumble', 'worried'], ['sera', 'c4.trial.sera', 'worried']]);
  },
  async sq(k) {
    const w = { T: 'tarn', U: 'tumble', R: 'rowan' }[k], nm = 'c4.sq' + k;
    await say([L(w, nm + '.in', 'thinking')]); UI.toast(t('toast.quest', { name: t(nm + '.name') }));
    await runPanel(t(nm + '.name'), [sqSpec4(k)]); setFlag('c4sq' + k); award(25); Over.emo[w] = { n: 'star', t: 1.8 };
    await say([L(w, nm + '.done', 'happy')]);
  },
  async boss() {
    await seq4([['bulk', 'c4.b.1', 'confident'], ['hero', 'c4.b.2', 'determined'], ['milo', 'c4.b.3', 'worried'], ['hero', 'c4.b.4', 'thinking'], ['bulk', 'c4.b.5', 'angry'], ['hero', 'c4.b.6', 'determined']]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight2(BOSS4); await UI.fade(0, 350); await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    const ch = Over.npc('bulk'); G.cine = true; Aud.sfx('fragment'); if (ch) Over.burst(ch.x, ch.y - 20, ['#ffd24a', '#fff3b0', '#a8c8ff'], 40); await ASYNC(600); G.cine = false;
    await seq4([['bulk', 'c4.bw.1', 'sad'], ['bulk', 'c4.bw.2', 'sad'], ['rowan', 'c4.bw.3', 'neutral'], ['milo', 'c4.bw.4', 'thinking']]);
    G.cine = true; Save.d.fragments = 4; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('c4boss'); Over.refreshNPCs(); G.cine = false; award(250, ['scaling']); Over.cheer(); await ASYNC(1400);
    await seq4([['none', 'c4.frag'], ['milo', 'c4.mem', 'sad'], ['hero', 'c4.mem2', 'happy'], ['rowan', 'c4.rowan.gift', 'happy'], ['milo', 'c4.br.1', 'thinking'], ['hero', 'c4.br.2', 'determined']]);
    HUD.update();
  },
  journal() {
    const steps = ['c4s1', 'c4s2', 'c4s3', 'c4s4', 'c4trial', 'c4boss', 'c4end'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j4.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'c4.sqT.name', st: fl('c4sqT') ? 'done' : (fl('c4s2') ? 'avail' : 'locked') }, { k: 'c4.sqU.name', st: fl('c4sqU') ? 'done' : (fl('c4s3') ? 'avail' : 'locked') }, { k: 'c4.sqR.name', st: fl('c4sqR') ? 'done' : (fl('c4s4') ? 'avail' : 'locked') }];
    return { main, side, mastery: Save.d.mastery.scale || 0 };
  },
  async endChapter() {
    if (fl('c4end')) { if (!G.cine) Maps.travel(5); return; }
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('c4end'); const m = (Save.d.bossLog4 && Save.d.bossLog4.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end4.title')) + '</div><p>' + fmt(t('end4.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end4.concept') + ': ' + t('mst.' + (Save.d.mastery.scale || 1))) + '</div><div class="v-m gold">' + fmt(t('end4.frag')) + '</div><p class="dim">' + fmt(t('end4.cliff')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('end.map'), 'primary', () => { Panel.close(); Maps.open(); }), UI.btn(t('end.cont'), 'ghost', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end4'), body, { close: false, cls: 'wide' }), 'act', () => { Over.x = 24 * 16; Over.y = 9 * 16; }); HUD.update();
  },
};

/* ---------- hook city 4 into the story ---------- */
(function () {
  const _npcs = Story.npcsFor.bind(Story), _talk = Story.talk.bind(Story), _enter = Story.onEnter.bind(Story), _look = Story.look.bind(Story), _journal = Story.journal.bind(Story), _obj = Quest.objective.bind(Quest);
  Story.npcsFor = function (room) { return C4ROOMS.includes(room) ? City4.npcs(room) : _npcs(room); };
  Story.talk = async function (id) { if (C4IDS.includes(id)) { if (G.cine) return; try { await City4.talk(id); } finally { HUD.update(); } return; } return _talk(id); };
  Story.onEnter = async function (room, prev) { if (C4ROOMS.includes(room)) return City4.onEnter(room); return _enter(room, prev); };
  Story.look = _look;
  Story.journal = function () { return Over.room && Over.room.city === 4 ? City4.journal() : _journal(); };
  Quest.objective = function () { if (Save.d && fl('intro') && Over.room && Over.room.city === 4) return City4.objective(); return _obj(); };
})();
