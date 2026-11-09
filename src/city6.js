'use strict';
/* ===== city6.js: Islands of Hidden Knowledge (chapter 6, final): tasks, scenes, Lag boss, ending ===== */

const mcq6 = (id, pre) => mcqBuild(abc(id), 'a', pre);
const sigTable = (b) => { const r = [[-3, 0.047], [-2, 0.119], [-1, 0.269], [0, 0.5], [1, 0.731], [2, 0.881], [3, 0.953]]; b.innerHTML = '<table class="cm ds"><tr><th>' + fmt(t('c6.sig.z')) + '</th>' + r.map((x) => '<td>' + String(x[0]).replace('-', '−') + '</td>').join('') + '</tr><tr><th>' + fmt(t('c6.sig.p')) + '</th>' + r.map((x) => '<td>' + x[1] + '</td>').join('') + '</tr></table>'; };
const CRE6 = [['Cloudlet', 2, 2, 1], ['Mistling', 3, 2, 2], ['Skyfin', 8, 7, 8], ['Windrake', 9, 8, 7], ['Emberfox', 2, 8, 9], ['Flamehorn', 3, 9, 8]];
const crTable6 = (b) => { b.innerHTML = '<table class="cm ds"><tr><th>' + fmt(t('c6.cl.name')) + '</th><th>' + fmt(t('c6.cl.wing')) + '</th><th>' + fmt(t('c6.cl.body')) + '</th><th>' + fmt(t('c6.cl.glow')) + '</th></tr>' + CRE6.map((r) => '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td></tr>').join('') + '</table>'; };

/* toy: threshold slider */
const THR6 = [['Cloudlet', 18, 0], ['Brookle', 27, 0], ['Mistling', 35, 0], ['Ripple', 72, 0], ['Windle', 45, 1], ['Mosskit', 55, 1], ['Emberfox', 63, 1], ['Stonefang', 91, 1]];
function thrToy(body) {
  const wrap = el('div', 'thw'), row = el('label', 'lt-row'), inp = document.createElement('input'), out = el('b', 'lt-v'), cr = el('div', 'cr'), st = el('div', 'dim'); inp.type = 'range'; inp.min = 10; inp.max = 90; inp.step = 5; inp.value = 50;
  row.append(el('span', '', fmt(t('c6.thr.v', { v: '' }).replace(/:.*/, ':'))), inp, out); wrap.append(row, cr, st); body.appendChild(wrap);
  const calc = () => { const th = +inp.value; let tp = 0, fp = 0, fn = 0; THR6.forEach((c) => { const f = c[1] >= th; if (f && c[2]) tp++; else if (f) fp++; else if (c[2]) fn++; }); return { th, tp, fp, fn }; };
  const draw = () => { const r = calc(); out.textContent = (r.th / 100).toFixed(2);
    cr.innerHTML = THR6.map((c) => '<div class="th-c ' + (c[2] ? 'd' : 's') + (c[1] >= r.th ? ' fl' : '') + '"><b>' + c[0] + '</b>' + (c[1] / 100).toFixed(2) + '<i>' + fmt(t(c[2] ? 'c6.thr.d' : 'c6.thr.s')) + '</i></div>').join('');
    st.innerHTML = fmt(t('c6.thr.tp', { v: r.tp + ' / 4' })) + ' · ' + fmt(t('c6.thr.fp', { v: r.fp })) + ' · ' + fmt(t('c6.thr.fn', { v: r.fn })); };
  inp.addEventListener('input', () => { Aud.sfx('click'); draw(); }); draw();
  return { check() { const r = calc(); return { ok: r.fn === 0 && r.fp === 1 }; }, solve() { inp.value = 40; draw(); } };
}
/* toy: K selector */
const KASSIGN6 = { 1: [0, 0, 0, 0, 0, 0], 2: [0, 0, 1, 1, 0, 0], 3: [0, 0, 1, 1, 2, 2], 4: [0, 1, 2, 2, 3, 3], 5: [0, 1, 2, 3, 4, 4] };
function kToy(body) {
  const wrap = el('div', 'clw'), row = el('label', 'lt-row'), inp = document.createElement('input'), out = el('b', 'lt-v'), cr = el('div', 'cr'); inp.type = 'range'; inp.min = 1; inp.max = 5; inp.step = 1; inp.value = 1;
  row.append(el('span', '', fmt(t('c6.k.label'))), inp, out); wrap.append(row, cr, el('p', 'dim', fmt(t('c6.k.note')))); body.appendChild(wrap);
  const draw = () => { const k = +inp.value; out.textContent = k; cr.innerHTML = CRE6.map((c, i) => '<div class="cl-c cl-g' + KASSIGN6[k][i] + '">' + c[0] + '</div>').join(''); };
  inp.addEventListener('input', () => { Aud.sfx('click'); draw(); }); draw();
  return { check() { return { ok: +inp.value === 3 }; }, solve() { inp.value = 3; draw(); } };
}
const tap6 = (id, n, correct) => (body) => tapBuild([1, 2, 3, 4].slice(0, n).map((i) => ({ id: i, html: '<div class="stepc">' + fmt(t(id + '.' + i)) + '</div>' })), correct, true)(body);

const scene1Specs6 = () => [sp2('c6.t11', { title: t('c6.t1.title'), build: mcq6('c6.t11', sigTable) }), sp2('c6.t12', { title: t('c6.t1.title'), build: mcq6('c6.t12') }), sp2('c6.t13', { title: t('c6.t1.title'), build: mcq6('c6.t13') }), sp2('c6.t14', { title: t('c6.t1.title'), build: thrToy }), sp2('c6.t15', { title: t('c6.t1.title'), build: mcq6('c6.t15') }), sp2('c6.t16', { title: t('c6.t1.title'), build: mcq6('c6.t16') })];
const scene2Specs6 = () => [sp2('c6.t21', { title: t('c6.t2.title'), build: mcq6('c6.t21', crTable6) }), sp2('c6.t22', { title: t('c6.t2.title'), build: mcq6('c6.t22', crTable6) }), sp2('c6.t23', { title: t('c6.t2.title'), build: kToy }), sp2('c6.t24', { title: t('c6.t2.title'), build: mcq6('c6.t24') }), sp2('c6.t25', { title: t('c6.t2.title'), build: mcq6('c6.t25') })];
const scene3Specs6 = () => ['31', '32', '33', '34'].map((n) => sp2('c6.t' + n, { title: t('c6.t3.title'), build: mcq6('c6.t' + n) })).concat([sp2('c6.t35', { title: t('c6.t3.title'), build: tap6('c6.t35', 4, [1, 3]) }), sp2('c6.t36', { title: t('c6.t3.title'), build: mcq6('c6.t36') })]);
const scene4Specs6 = () => ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'].map((n) => sp2('c6.' + n, { title: t('c6.t4.title'), build: mcq6('c6.' + n) }));
const sqSpec6 = (k) => sp2('c6.sq' + k, { title: t('c6.sq' + k + '.title'), build: mcq6('c6.sq' + k) });
const bossSpecs6 = () => [
  sp2('q6.1', { build: mcq6('q6.1') }), sp2('q6.2', { build: mcq6('q6.2') }), sp2('q6.3', { build: tap6('q6.3', 4, [1, 2, 4]) }),
  sp2('q6.4', { build: mcq6('q6.4', _cmTab) }), sp2('q6.5', { build: mcq6('q6.5') }), sp2('q6.6', { build: mcq6('q6.6') }),
  sp2('q6.7', { build: mcq6('q6.7') }), sp2('q6.8', { build: mcq6('q6.8') }), sp2('q6.9', { build: tap6('q6.9', 4, [1, 2, 4]) }), sp2('q6.10', { build: mcq6('q6.10') }),
];
Arena.bgCore = function (g, t) {
  for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#0e1838', '#3a5a9a', y / 120); g.fillRect(0, y, 320, 4); }
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2 + t * 0.2; g.fillStyle = i % 3 ? '#4a9be8' : '#ffe27a'; g.fillRect(Math.round(160 + Math.cos(a) * 70), Math.round(50 + Math.sin(a) * 38), 5, 5); }
  g.fillStyle = '#fff3b0'; g.fillRect(156, 46, 8, 8);
  for (let i = 0; i < 6; i++) { const x = (i * 61 + t * 8) % 340 - 10, y = 20 + ((i * 37) % 60); g.fillStyle = '#c9a24b'; g.fillRect(x, y, 6, 6); g.fillStyle = '#7a6a3a'; g.fillRect(x + 2, y + 2, 2, 2); }
  g.fillStyle = '#2a3e66'; g.fillRect(0, 100, 320, 20); g.fillStyle = '#4a6a9a'; g.fillRect(0, 100, 320, 2);
};
ARENA_T.core = { bg: 'bgCore', spr: 'lag' };
const BOSS6 = { boss: 'lag', theme: 'core', specs: bossSpecs6, phases: { 0: 'b6.ph1', 3: 'b6.ph2', 6: 'b6.ph3', 8: 'b6.ph4' }, start: 'c6.b.start', taunt: 'b6.taunt', vict: 'b6.vict', frag: 'end6.frag', codex: 'b6.rCodex', xp: 300, log: 'bossLog6', mast: 'honest' };

const POS6 = { keeper: [10.5, 8.6], seeker: [12, 8.4], nul: [18.5, 11.6], sagee: [8, 8.2], sagep: [18, 8.2], f1: [6.4, 12.4], f2: [20, 12.4], keeperG: [11.6, 7], lag: [14, 9.6] };
const C6ROOMS = ['dock', 'isle1', 'isle2', 'isle3', 'gate6', 'core'];
const C6IDS = ['keeper6', 'seeker6', 'null6', 'sagee6', 'sagep6', 'ferry6a', 'ferry6b', 'lag6'];
const seq6 = (rows) => say(rows.map((r) => L(r[0], r[1], r[2])));
const City6 = {
  npcs(room) {
    const out = [], N = (o) => out.push(o), P = POS6;
    if (room === 'isle1') N({ id: 'keeper6', sp: 'keeper', spr: 'keeper', tx: P.keeper[0], ty: P.keeper[1], dir: 'down', mark: () => (!fl('c6s1') ? 'main' : (!fl('c6sqF') ? 'side' : null)) });
    if (room === 'isle2') {
      N({ id: 'seeker6', sp: 'seeker', spr: 'seeker', tx: P.seeker[0], ty: P.seeker[1], dir: 'down', mark: () => (fl('c6s1') && !fl('c6s2') ? 'main' : null) });
      N({ id: 'null6', sp: 'nullc', spr: 'nullc', tx: P.nul[0], ty: P.nul[1], dir: 'left', mark: () => (fl('c6s2') && !fl('c6sqN') ? 'side' : null) });
    }
    if (room === 'isle3') {
      N({ id: 'sagee6', sp: 'sagee', spr: 'sagee', tx: P.sagee[0], ty: P.sagee[1], dir: 'right', fixed: true, mark: () => (fl('c6s2') && !fl('c6s3') ? 'main' : null) });
      N({ id: 'sagep6', sp: 'sagep', spr: 'sagep', tx: P.sagep[0], ty: P.sagep[1], dir: 'left', fixed: true });
      N({ id: 'ferry6a', sp: 'ferry1', spr: 'ferry1', tx: P.f1[0], ty: P.f1[1], dir: 'down', mark: () => (fl('c6s3') && !fl('c6sqB') ? 'side' : null) });
      N({ id: 'ferry6b', sp: 'ferry2', spr: 'ferry2', tx: P.f2[0], ty: P.f2[1], dir: 'down' });
    }
    if (room === 'gate6' && !fl('c6s4')) N({ id: 'keeper6', sp: 'keeper', spr: 'keeper', tx: P.keeperG[0], ty: P.keeperG[1], dir: 'down', mark: () => (fl('c6s3') ? 'main' : null) });
    if (room === 'core') N({ id: 'lag6', sp: 'lag', spr: 'lag', tx: P.lag[0], ty: P.lag[1], dir: 'down', fixed: !fl('c6boss'), mark: () => (!fl('c6boss') ? 'main' : null) });
    return out;
  },
  objective() {
    const cur = Over.room && Over.room.id, at = (room, pos, key) => ({ room: room, x: pos[0] * 16, y: pos[1] * 16, text: t(key) }), bw = (room, x, y, key) => ({ room: room, x: x * 16, y: y * 16, text: t(key) });
    if (fl('c6end')) return null;
    if (fl('c6boss')) return cur === 'core' ? bw('core', 14, 17, 'obj6.end') : bw('core', 14, 17, 'obj6.end');
    if (fl('c6s4')) return cur === 'core' ? at('core', POS6.lag, 'obj6.boss') : (cur === 'gate6' ? bw('gate6', 12, 3.4, 'obj6.core') : bw('dock', 26, 1.5, 'obj6.gate'));
    if (fl('c6s3')) return cur === 'gate6' ? at('gate6', POS6.keeperG, 'obj6.keeper2') : (cur === 'dock' ? bw('dock', 26, 1.5, 'obj6.gate') : bw('isle3', 13, 3, 'obj6.gate'));
    if (fl('c6s2')) return cur === 'isle3' ? at('isle3', POS6.sagee, 'obj6.sages2') : (cur === 'dock' ? bw('dock', 17.5, 20.5, 'obj6.sages') : bw('isle2', 0.5, 8.5, 'obj6.sages'));
    if (fl('c6s1')) return cur === 'isle2' ? at('isle2', POS6.seeker, 'obj6.seeker2') : (cur === 'dock' ? bw('dock', 35, 10.5, 'obj6.seeker') : bw('isle1', 11, 15, 'obj6.seeker'));
    return cur === 'isle1' ? at('isle1', POS6.keeper, 'obj6.keeper') : bw('dock', 17.5, 0.5, 'obj6.keeper');
  },
  async onEnter(room) {
    if (room === 'dock' && !fl('c6arrive')) { Save.set('c6arrive'); await seq6([['none', 'c6.a1'], ['milo', 'c6.a2', 'thinking'], ['milo', 'c6.a3', 'confident']]); }
    HUD.update();
  },
  async talk(id) {
    const f = this, w = (who, k, m) => say([L(who, k, m || 'neutral')]);
    if (id === 'keeper6') {
      if (Over.room.id === 'gate6') return f.scene4();
      return !fl('c6s1') ? f.scene1() : (!fl('c6sqF') ? f.sq('F') : w('keeper', fl('c6boss') ? 'c6.keeper.win' : 'c6.keeper.idle', 'happy'));
    }
    if (id === 'seeker6') return !fl('c6s2') ? f.scene2() : w('seeker', 'c6.seeker.idle', 'happy');
    if (id === 'null6') return fl('c6s2') && !fl('c6sqN') ? f.sq('N') : w('nullc', 'c6.null.idle', 'happy');
    if (id === 'sagee6' || id === 'sagep6') return fl('c6s2') && !fl('c6s3') ? f.scene3() : w(id === 'sagee6' ? 'sagee' : 'sagep', id === 'sagee6' ? 'c6.sagee.idle' : 'c6.sagep.idle');
    if (id === 'ferry6a') return fl('c6s3') && !fl('c6sqB') ? f.sq('B') : w('ferry1', 'c6.ferry.idle', 'happy');
    if (id === 'ferry6b') return fl('c6s3') && !fl('c6sqB') ? f.sq('B') : w('ferry2', 'c6.ferry.idle', 'happy');
    if (id === 'lag6') return fl('c6boss') ? w('lag', 'c6.lagidle', 'happy') : f.boss();
  },
  async scene1() {
    await seq6([['keeper', 'c6.s1.1', 'neutral'], ['keeper', 'c6.s1.2', 'thinking'], ['milo', 'c6.s1.3', 'thinking'], ['keeper', 'c6.s1.4', 'neutral'], ['keeper', 'c6.s1.5', 'happy']]);
    await runPanel(t('c6.t1.title'), scene1Specs6());
    setFlag('c6s1'); award(150, ['logistic', 'threshold', 'confmat']); Aud.sfx('ok'); Over.cheer(); UI.toast(t('item.compass')); Env.sync();
    await seq6([['hero', 'c6.s1.win', 'thinking'], ['keeper', 'c6.s1.win2', 'neutral'], ['keeper', 'c6.s1.win3', 'happy'], ['milo', 'c6.s1.t1', 'confident']]);
  },
  async scene2() {
    await seq6([['seeker', 'c6.s2.1', 'worried'], ['milo', 'c6.s2.2', 'thinking'], ['seeker', 'c6.s2.3', 'happy'], ['hero', 'c6.s2.4', 'thinking'], ['seeker', 'c6.s2.5', 'neutral']]);
    await runPanel(t('c6.t2.title'), scene2Specs6());
    setFlag('c6s2'); award(150, ['cluster', 'kmeans']); Aud.sfx('ok'); Over.cheer(); UI.toast(t('item.lens')); Env.sync(); Over.refreshNPCs();
    await seq6([['seeker', 'c6.s2.win', 'happy'], ['seeker', 'c6.s2.win2', 'neutral'], ['seeker', 'c6.s2.win3', 'happy'], ['milo', 'c6.s2.t1', 'confident']]);
  },
  async scene3() {
    await seq6([['sagee', 'c6.s3.1', 'neutral'], ['sagee', 'c6.s3.2', 'happy'], ['sagep', 'c6.s3.3', 'neutral'], ['sagep', 'c6.s3.4', 'thinking']]);
    await runPanel(t('c6.t3.title'), scene3Specs6());
    setFlag('c6s3'); award(150, ['paradigms']); Aud.sfx('ok'); Over.cheer(); UI.toast(t('item.emblem')); Env.sync(); Over.refreshNPCs();
    await seq6([['sagee', 'c6.s3.win', 'happy'], ['sagep', 'c6.s3.win2', 'neutral'], ['milo', 'c6.s3.t1', 'confident']]);
  },
  async scene4() {
    await seq6([['keeper', 'c6.s4.1', 'neutral'], ['keeper', 'c6.s4.2', 'happy']]);
    await runPanel(t('c6.t4.title'), scene4Specs6());
    setFlag('c6s4'); award(250, ['drift']); Aud.sfx('ok'); Over.cheer(); UI.toast(t('item.guardian')); Env.sync(); Over.refreshNPCs();
    await seq6([['keeper', 'c6.s4.win', 'happy'], ['milo', 'c6.s4.win2', 'surprised']]);
    G.cine = true; Over.shake(2.5, 1.0); Aud.sfx('door'); await ASYNC(900); G.cine = false;
    await seq6([['milo', 'c6.s4.gate', 'confident']]);
  },
  async sq(k) {
    const w = { F: 'keeper', N: 'nullc', B: 'ferry1' }[k], nm = 'c6.sq' + k;
    await say([L(w, nm + '.in', 'thinking')]); UI.toast(t('toast.quest', { name: t(nm + '.name') }));
    await runPanel(t(nm + '.name'), [sqSpec6(k)]); setFlag('c6sq' + k); award(25, [{ F: 'foglamp', N: 'nullout', B: 'labelpath' }[k]]);
    await say([L(w, nm + '.done', 'happy')]);
  },
  async boss() {
    await seq6([['core', 'c6.c.2', 'neutral'], ['milo', 'c6.c.3', 'sad'], ['none', 'c6.c.4'], ['lag', 'c6.b.1', 'confident'], ['hero', 'c6.b.2', 'determined'], ['lag', 'c6.b.3', 'confident']]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight2(BOSS6); await UI.fade(0, 350); await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    G.cine = true; Aud.sfx('fragment'); const ch = Over.npc('lag6') || Over.npc('lag'); if (ch) Over.burst(ch.x, ch.y - 20, ['#ffd24a', '#fff3b0', '#ffffff'], 40); await ASYNC(600); G.cine = false;
    await seq6([['none', 'c6.bw.1'], ['core', 'c6.bw.2', 'neutral'], ['hero', 'c6.bw.3', 'determined'], ['core', 'c6.bw.4', 'sad'], ['milo', 'c6.bw.5', 'confident'], ['milo', 'c6.bw.6', 'confident'], ['core', 'c6.bw.7', 'neutral'], ['milo', 'c6.bw.8', 'thinking']]);
    G.cine = true; Save.d.fragments = 6; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('c6boss'); Env.sync(); Over.refreshNPCs(); G.cine = false; award(300, ['drift']); Over.cheer(); await ASYNC(1400);
    await seq6([['none', 'c6.frag'], ['none', 'c6.ep.1'], ['hero', 'c6.ep.2', 'thinking'], ['milo', 'c6.ep.3', 'neutral']]);
    HUD.update(); await finale(); await this.endChapter();
  },
  journal() {
    const steps = ['c6s1', 'c6s2', 'c6s3', 'c6s4', 'c6boss', 'c6end'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j6.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'c6.sqF.name', st: fl('c6sqF') ? 'done' : (fl('c6s1') ? 'avail' : 'locked') }, { k: 'c6.sqN.name', st: fl('c6sqN') ? 'done' : (fl('c6s2') ? 'avail' : 'locked') }, { k: 'c6.sqB.name', st: fl('c6sqB') ? 'done' : (fl('c6s3') ? 'avail' : 'locked') }];
    return { main, side, mastery: Save.d.mastery.honest || 0 };
  },
  async endChapter() {
    if (fl('c6end')) return;
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('c6end'); const m = (Save.d.bossLog6 && Save.d.bossLog6.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end6.title')) + '</div><p>' + fmt(t('end6.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end6.concept') + ': ' + t('mst.' + (Save.d.mastery.honest || 1))) + '</div><div class="v-m gold">' + fmt(t('end6.frag')) + '</div><p class="dim">' + fmt(t('end6.final')) + '</p><p class="dim">' + fmt(t('end6.thanks')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('cert.view'), 'primary', () => { Cert.show(); }), UI.btn(t('end6.codex'), 'ghost', () => { Panel.close(); setTimeout(() => Menus.codex(), 0); }), UI.btn(t('end6.free'), 'ghost', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end6'), body, { close: false, cls: 'wide' }), 'act'); HUD.update();
  },
};
(function () {
  const _npcs = Story.npcsFor.bind(Story), _talk = Story.talk.bind(Story), _enter = Story.onEnter.bind(Story), _journal = Story.journal.bind(Story), _obj = Quest.objective.bind(Quest);
  Story.npcsFor = function (room) { return C6ROOMS.includes(room) ? City6.npcs(room) : _npcs(room); };
  Story.talk = async function (id) { if (C6IDS.includes(id)) { if (G.cine) return; try { await City6.talk(id); } finally { HUD.update(); } return; } return _talk(id); };
  Story.onEnter = async function (room, prev) { if (C6ROOMS.includes(room)) return City6.onEnter(room); return _enter(room, prev); };
  Story.journal = function () { return Over.room && Over.room.city === 6 ? City6.journal() : _journal(); };
  Quest.objective = function () { if (Save.d && fl('intro') && Over.room && Over.room.city === 6) return City6.objective(); return _obj(); };
})();

/* ===== finale: the world freed (full-screen animated ending) ===== */
const FIN_SCENES = [
  { c: ['#0e1838', '#3a5a9a'], k: 'core' }, { c: ['#7ac0e8', '#bfe8a0'], k: 'meadow' }, { c: ['#5a4a7a', '#e8a860'], k: 'gears' },
  { c: ['#2a5a4a', '#a8d890'], k: 'forest' }, { c: ['#4a6ab0', '#e0d0a0'], k: 'valley' }, { c: ['#e8b860', '#f8e8a8'], k: 'wheat' }, { c: ['#506a98', '#c8d8f0'], k: 'isles' }, { c: ['#0e1838', '#3a5a9a'], k: 'map' }, { c: ['#070b1c', '#1a2650'], k: 'end' },
];
const FIN_DUR = [5500, 5000, 5000, 5000, 5000, 5000, 5500, 6000, 9000];
const FXW = 640, FXH = 360, FXCOL = ['#ffd24a', '#6ff3ff', '#ff6bd6', '#7fe08a', '#ff9a4a', '#6a8aff'];
const FX = {
  sky(g, c0, c1) { const gr = g.createLinearGradient(0, 0, 0, FXH); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(0, 0, FXW, FXH); },
  hills(g, y, amp, col, seed, T, spd) { g.fillStyle = col; g.beginPath(); g.moveTo(0, FXH); for (let x = 0; x <= FXW; x += 8) g.lineTo(x, y + Math.sin((x + T * spd) * 0.012 + seed) * amp + Math.sin((x + T * spd) * 0.031 + seed * 2) * amp * 0.4); g.lineTo(FXW, FXH); g.fill(); },
  cloud(g, x, y, s, a) { g.fillStyle = 'rgba(255,255,255,' + a + ')'; [[0, 0, 26], [22, -8, 22], [46, 0, 28], [70, 4, 20], [24, 6, 24]].forEach(([dx, dy, r]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, r * s, 0, 7); g.fill(); }); },
  rays(g, x, y, T, col, a, n, len) { g.save(); g.fillStyle = col; g.globalAlpha = a; for (let i = 0; i < n; i++) { const an = T * 0.08 + i * 6.283 / n, w = 0.05; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an - w) * len, y + Math.sin(an - w) * len); g.lineTo(x + Math.cos(an + w) * len, y + Math.sin(an + w) * len); g.fill(); } g.restore(); },
  motes(g, T, n, col, seed, y0, y1) { for (let i = 0; i < n; i++) { const x = (hash(i, seed, 1) * FXW + T * (6 + i % 7)) % FXW, y = y0 + hash(i, seed, 2) * (y1 - y0) + Math.sin(T * 1.3 + i) * 6, tw = 0.5 + 0.5 * Math.sin(T * 2 + i * 1.9); g.fillStyle = col; g.globalAlpha = 0.35 + tw * 0.65; g.fillRect(Math.round(x), Math.round(y), 2 + (i % 3 === 0), 2 + (i % 3 === 0)); } g.globalAlpha = 1; },
  tree(g, x, y, s, c1, c2, trunk) { g.fillStyle = trunk || '#4a3020'; g.fillRect(x - 3 * s, y - 14 * s, 6 * s, 16 * s); [[0, -34, 20], [-13, -22, 15], [13, -22, 15], [0, -18, 18]].forEach(([dx, dy, r], i) => { g.fillStyle = i < 3 ? c1 : c2; g.beginPath(); g.arc(x + dx * s, y + dy * s, r * s, 0, 7); g.fill(); }); g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(x - 6 * s, y - 40 * s, 8 * s, 0, 7); g.fill(); },
  pine(g, x, y, s, c) { g.fillStyle = '#3a2418'; g.fillRect(x - 2 * s, y - 6 * s, 4 * s, 8 * s); for (let k = 0; k < 4; k++) { g.fillStyle = k % 2 ? shade(c, 0.1) : c; g.beginPath(); g.moveTo(x, y - (46 - k * 4) * s + k * 2 * s); g.lineTo(x + (10 + k * 5) * s, y - (4 + (3 - k) * 0) * s - (3 - k) * 10 * s + 6 * s); g.lineTo(x - (10 + k * 5) * s, y - (4) * s - (3 - k) * 10 * s + 6 * s); g.fill(); } },
  gear(g, x, y, r, T, col, n) { n = n || 12; g.save(); g.translate(x, y); g.rotate(T); g.fillStyle = col; g.beginPath(); for (let i = 0; i < n; i++) { const a = i / n * 6.283, w = 6.283 / n; [[a - w * 0.3, r * 0.82], [a - w * 0.18, r], [a + w * 0.18, r], [a + w * 0.3, r * 0.82]].forEach((q, k) => { const X = Math.cos(q[0]) * q[1], Y = Math.sin(q[0]) * q[1]; (i || k) ? g.lineTo(X, Y) : g.moveTo(X, Y); }); } g.closePath(); g.moveTo(r * 0.45, 0); g.arc(0, 0, r * 0.45, 0, 6.283, true); g.fill(); g.fillStyle = 'rgba(255,255,255,.15)'; g.fillRect(-r * 0.9, -r * 0.08, r * 1.8, r * 0.16); g.restore(); },
  core(g, x, y, T, px, mode) { const gl = g.createRadialGradient(x, y, 4, x, y, px * 1.5); gl.addColorStop(0, 'rgba(255,230,140,.7)'); gl.addColorStop(1, 'rgba(255,200,80,0)'); g.fillStyle = gl; g.fillRect(x - px * 1.5, y - px * 1.5, px * 3, px * 3); const sp = coreSprite(mode || 'ok', Math.floor(T * 10) % 24, px); g.drawImage(sp, Math.round(x - sp.width / 2), Math.round(y - sp.height / 2)); },
  boss(g, id, x, y, H, T, label) { const c = BossArt.sprite(id, 'down', 0, H), fl = BOSS_FLOAT[id] ? Math.sin(T * 2) * 5 - 10 : Math.sin(T * 3) * 1.5; g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 3, H * 0.34, H * 0.06, 0, 0, 7); g.fill(); g.drawImage(c, Math.round(x - c.width / 2), Math.round(y - H * BZFEET / BZH - 1 + fl)); },
  heroes(g, x, y, T, dir) { Sprites.draw(g, 'hero', dir || 'up', Math.floor(T * 2) % 2 ? 0 : 2, x, y, 3.6); Sprites.draw(g, 'milo', dir || 'up', Math.floor(T * 3) % 4, x + 70, y + 8 + Math.round(Math.sin(T * 2.4) * 3), 3.6); },
  sparkle(g, x, y, r, col) { g.fillStyle = col; g.beginPath(); g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r); g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill(); },
};
function finDraw(g, k, p, T) {
  const W = FXW, H = FXH, sc = FIN_SCENES.find((s) => s.k === k); FX.sky(g, sc.c[0], sc.c[1]);
  if (k === 'core' || k === 'map' || k === 'end') { for (let i = 0; i < 90; i++) { const tw = 0.5 + 0.5 * Math.sin(T * 2 + i); g.fillStyle = 'rgba(255,255,255,' + (0.3 + tw * 0.6) + ')'; g.fillRect((i * 97) % W, (i * 61) % 200, 1 + (i % 7 === 0), 1 + (i % 7 === 0)); } }
  if (k === 'core') {
    FX.hills(g, 292, 10, '#0a1230', 1, T, 3); g.fillStyle = '#16264a'; g.fillRect(0, 258, W, 14); const sea = g.createLinearGradient(0, 258, 0, H); sea.addColorStop(0, '#2a4a8a'); sea.addColorStop(1, '#0a1430'); g.fillStyle = sea; g.fillRect(0, 258, W, 102);
    for (let i = 0; i < 18; i++) { const w = 18 + (i * 13) % 50; g.fillStyle = 'rgba(255,226,140,' + (0.25 - i * 0.01) + ')'; g.fillRect(320 - w / 2 + Math.sin(T * 2 + i) * 6, 264 + i * 5, w, 2); }
    FX.rays(g, 320, 150, T, '#ffe9a0', 0.12 + p * 0.1, 12, 420); FX.core(g, 320, 150, T, 150 + Math.min(1, p * 3) * 30, 'ok');
    for (let r = 0; r < 3; r++) { const q = ((p * 2 + r / 3) % 1); g.strokeStyle = 'rgba(255,240,170,' + (1 - q) * 0.7 + ')'; g.lineWidth = 2; g.beginPath(); g.arc(320, 150, 40 + q * 330, 0, 7); g.stroke(); }
    FXCOL.forEach((c, i) => { const a = Math.min(1, Math.max(0, p * 1.6 - i * 0.08)), ang = -2.9 + i * 0.58, X = 320 + Math.cos(ang) * 120 * (0.2 + a * 3.2), Y = 150 + Math.sin(ang) * 70 * (0.3 + a * 2) + a * a * 40; for (let s = 0; s < 8; s++) { g.fillStyle = c; g.globalAlpha = (1 - s / 8) * 0.8; g.fillRect(X - Math.cos(ang) * s * 7, Y - Math.sin(ang) * s * 4, 5 - s * 0.4, 5 - s * 0.4); } g.globalAlpha = 1; FX.sparkle(g, X, Y, 8, c); });
    FX.heroes(g, 96, 350, T, 'up');
  }
  if (k === 'meadow') {
    FX.rays(g, 520, 40, T, '#fff6c0', 0.1, 9, 600); FX.cloud(g, (T * 10) % 760 - 100, 70, 1.4, 0.9); FX.cloud(g, (T * 6 + 300) % 760 - 100, 120, 1, 0.8);
    FX.hills(g, 210, 16, '#9ad8a0', 2, T, 2); FX.hills(g, 245, 14, '#6ec06e', 5, T, 4); FX.hills(g, 280, 10, '#4aa85a', 9, T, 0);
    [[90, 262], [210, 250], [440, 258], [570, 250]].forEach(([x, y], i) => FX.tree(g, x, y, 1.5, i % 2 ? '#ffb0d0' : '#ff8ab8', '#ff6a9a', '#6a4028'));
    for (let i = 0; i < 60; i++) { const x = hash(i, 5, 1) * W, y = 285 + hash(i, 5, 2) * 70; g.fillStyle = ['#ffd24a', '#ff9ac0', '#fff', '#8ad0ff'][i % 4]; g.fillRect(x, y, 3, 3); g.fillStyle = '#3a8a3a'; g.fillRect(x + 1, y + 3, 1, 5); }
    FX.boss(g, 'misprint', 440, 300, 190, T);
    for (let i = 0; i < 5; i++) { const a = T * 0.9 + i * 1.26, x = 440 + Math.cos(a) * 110, y = 200 + Math.sin(a) * 36 - 20; g.fillStyle = '#f6eed2'; g.fillRect(x - 8, y - 10, 16, 20); g.fillStyle = '#2ea04a'; g.fillRect(x - 4, y - 2, 3, 6); g.fillRect(x - 2, y + 2, 8, 3); }
    FX.heroes(g, 110, 350, T, 'right'); FX.motes(g, T, 40, '#fff7b0', 3, 80, 300);
  }
  if (k === 'gears') {
    FX.rays(g, 320, 30, T, '#ffd890', 0.09, 10, 700); FX.gear(g, 110, 130, 90, T * 0.35, '#7a5a8a'); FX.gear(g, 250, 80, 56, -T * 0.55, '#9a6a6a'); FX.gear(g, 520, 120, 100, -T * 0.3, '#6a4a7a'); FX.gear(g, 410, 60, 48, T * 0.6, '#a87a5a'); FX.gear(g, 590, 240, 70, T * 0.4, '#8a5a6a');
    FX.hills(g, 280, 6, '#3a2a4a', 4, T, 0); g.fillStyle = '#2a1c3a'; g.fillRect(0, 300, W, 60); for (let i = 0; i < 6; i++) { g.fillStyle = '#4a3a5a'; g.fillRect(30 + i * 108, 220 - (i % 3) * 20, 44, 82 + (i % 3) * 20); for (let w = 0; w < 4; w++) { g.fillStyle = (w + i) % 2 ? '#ffd890' : '#6a4a5a'; g.fillRect(38 + i * 108 + (w % 2) * 18, 232 - (i % 3) * 20 + Math.floor(w / 2) * 22, 10, 12); } g.fillStyle = 'rgba(220,210,230,.5)'; for (let q = 0; q < 3; q++) { g.beginPath(); g.arc(46 + i * 108 + Math.sin(T + q + i) * 6, 205 - (i % 3) * 20 - q * 16 - (T * 8 + q * 5) % 16, 8 + q * 3, 0, 7); g.fill(); } }
    FX.boss(g, 'cheater', 440, 316, 170, T); for (let i = 0; i < 7; i++) { const x = 400 + hash(i, 3, 1) * 90, y = 300 - ((T * 22 + i * 38) % 200); g.save(); g.translate(x, y); g.rotate(Math.sin(T + i) * 0.5); g.fillStyle = '#f6eed2'; g.fillRect(-6, -8, 12, 16); g.fillStyle = '#2ea04a'; g.fillRect(-3, -3, 6, 2); g.restore(); }
    FX.heroes(g, 130, 352, T, 'right'); FX.motes(g, T, 36, '#ffcf70', 6, 100, 300);
  }
  if (k === 'forest') {
    FX.rays(g, 420, -20, T, '#e8ffc0', 0.14, 7, 700); for (let i = 0; i < 12; i++) FX.pine(g, 20 + i * 58, 250, 1.1, i % 2 ? '#2a6a4a' : '#1f5a40');
    FX.hills(g, 270, 8, '#3a8a5a', 3, T, 0); for (let i = 0; i < 7; i++) FX.tree(g, 40 + i * 100 + (i % 2) * 20, 300 + (i % 2) * 12, 1.8, '#3aa05a', '#2f8a4a', '#4a3020');
    g.fillStyle = '#2a6a40'; g.fillRect(0, 312, W, 48); FX.boss(g, 'fanatic', 450, 322, 190, T);
    for (let i = 0; i < 7; i++) { const x = 70 + i * 90, y = 150 + (i % 3) * 22 + Math.sin(T + i) * 5; g.fillStyle = '#ffe27a'; g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); g.fillStyle = 'rgba(255,226,122,.22)'; g.beginPath(); g.arc(x, y, 16, 0, 7); g.fill(); }
    FX.heroes(g, 130, 352, T, 'right'); FX.motes(g, T, 50, '#c8ff9a', 8, 90, 320);
  }
  if (k === 'valley') {
    FX.cloud(g, (T * 8) % 760 - 100, 60, 1.3, 0.85); FX.hills(g, 190, 22, '#d8b878', 2, T, 1); FX.hills(g, 235, 18, '#c8a468', 6, T, 2); FX.hills(g, 280, 10, '#b89458', 8, T, 0);
    [[90, 210, '#8ad0ff'], [320, 230, '#ffd24a'], [560, 215, '#e8788a']].forEach(([cx, cy, c], j) => { for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + T * 0.5 + j, r = 26 + (i % 3) * 8; g.fillStyle = c; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.45, 6, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.6)'; g.fillRect(cx + Math.cos(a) * r - 2, cy + Math.sin(a) * r * 0.45 - 3, 2, 2); } });
    FX.boss(g, 'bulk', 330, 330, 210, T); g.font = 'bold 22px monospace'; g.textAlign = 'center'; ['1', '2', '3', '4'].forEach((n, i) => { const a = T + i * 1.57; g.fillStyle = '#6af0ff'; g.globalAlpha = 0.85; g.fillText(n, 330 + Math.cos(a) * 130, 200 + Math.sin(a) * 24); g.globalAlpha = 1; });
    FX.heroes(g, 110, 352, T, 'right'); FX.motes(g, T, 30, '#fff2b0', 9, 100, 300);
  }
  if (k === 'wheat') {
    g.fillStyle = '#fff1a0'; g.beginPath(); g.arc(470, 130 + (1 - Math.min(1, p * 2)) * 40, 46, 0, 7); g.fill(); g.fillStyle = 'rgba(255,241,160,.3)'; g.beginPath(); g.arc(470, 130 + (1 - Math.min(1, p * 2)) * 40, 80, 0, 7); g.fill();
    FX.hills(g, 230, 12, '#e8c060', 1, T, 1); g.fillStyle = '#d8a83a'; g.fillRect(0, 262, W, 100); g.fillStyle = '#6a4a30'; g.fillRect(120, 160, 16, 100); g.save(); g.translate(128, 166); g.rotate(T * 0.8); for (let i = 0; i < 4; i++) { g.rotate(1.5708); g.fillStyle = '#f6eed2'; g.fillRect(2, -6, 52, 12); g.fillStyle = '#c8a060'; g.fillRect(2, -1, 52, 2); } g.restore();
    for (let i = 0; i < 90; i++) { const x = (i * 8) % W, sw = Math.sin(T * 2 + i * 0.7) * 3, y = 270 + (i % 5) * 16; g.fillStyle = '#c99a2a'; g.fillRect(x + sw, y - 28, 2, 30); g.fillStyle = '#ffe27a'; g.fillRect(x + sw - 1, y - 36, 4, 10); }
    FX.boss(g, 'rote', 400, 320, 180, T); for (let i = 0; i < 6; i++) { const a = T * 0.6 + i, x = 400 + Math.cos(a) * 130, y = 170 + Math.sin(a * 1.3) * 30; g.fillStyle = ['#2a5a8a', '#c8463c', '#e0b84a'][i % 3]; g.save(); g.translate(x, y); g.rotate(Math.sin(T * 2 + i) * 0.4); g.fillRect(-9, -7, 18, 14); g.fillStyle = '#f6eed2'; g.fillRect(-7, -5, 14, 10); g.restore(); }
    FX.heroes(g, 150, 352, T, 'right'); FX.motes(g, T, 36, '#fff0a0', 11, 90, 300);
  }
  if (k === 'isles') {
    FX.cloud(g, (T * 8) % 760 - 100, 220, 1.6, 0.6); FX.cloud(g, (T * 5 + 300) % 760 - 100, 270, 1.3, 0.5); FX.rays(g, 320, 20, T, '#ffffff', 0.08, 8, 700);
    [[110, 190, 110], [300, 230, 140], [520, 180, 100]].forEach(([x, y, w], i) => { const yy = y + Math.sin(T + i * 1.7) * 5; g.fillStyle = '#6a5a7a'; g.beginPath(); g.moveTo(x - w / 2, yy); g.lineTo(x + w / 2, yy); g.lineTo(x + w * 0.1, yy + w * 0.45); g.lineTo(x - w * 0.1, yy + w * 0.5); g.closePath(); g.fill(); g.fillStyle = '#7ab868'; g.fillRect(x - w / 2, yy - 6, w, 8); g.fillStyle = 'rgba(160,220,255,.75)'; g.fillRect(x + w * 0.2, yy + 2, 4, 70 + i * 10); FX.tree(g, x - w * 0.25, yy - 4, 0.8, '#4a9a5a', '#3a8a4a'); g.fillStyle = '#c8b898'; g.fillRect(x + 8, yy - 22, 14, 16); g.fillStyle = '#a86a4a'; g.fillRect(x + 6, yy - 26, 18, 5); });
    FX.boss(g, 'lag', 330, 230, 210, T); for (let i = 0; i < 5; i++) { const a = T * 0.7 + i * 1.26; g.strokeStyle = '#d8a840'; g.lineWidth = 2; g.beginPath(); g.arc(330 + Math.cos(a) * 150, 150 + Math.sin(a) * 30, 9, 0, 7); g.stroke(); g.fillStyle = '#efe4c8'; g.fill(); g.strokeStyle = '#3a3a50'; g.beginPath(); g.moveTo(330 + Math.cos(a) * 150, 150 + Math.sin(a) * 30); g.lineTo(330 + Math.cos(a) * 150 + Math.cos(T * 2 + i) * 6, 150 + Math.sin(a) * 30 + Math.sin(T * 2 + i) * 6); g.stroke(); }
    FX.heroes(g, 110, 352, T, 'right'); FX.motes(g, T, 40, '#ffffff', 12, 60, 320);
  }
  if (k === 'map') {
    const pts = [[70, 270], [170, 190], [270, 270], [370, 190], [470, 270], [570, 170]]; FX.hills(g, 300, 10, '#0c1634', 3, T, 0); g.strokeStyle = 'rgba(138,208,255,.5)'; g.lineWidth = 2; g.setLineDash([8, 6]); g.lineDashOffset = -T * 20; g.beginPath(); pts.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.stroke(); g.setLineDash([]);
    const ids = ['misprint', 'cheater', 'fanatic', 'bulk', 'rote', 'lag'];
    pts.forEach((q, i) => { const on = p * 6 > i, a = Math.max(0, Math.min(1, p * 6 - i)); const gl = g.createRadialGradient(q[0], q[1], 2, q[0], q[1], 46); gl.addColorStop(0, FXCOL[i] + (on ? 'cc' : '33')); gl.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gl; g.fillRect(q[0] - 50, q[1] - 50, 100, 100); g.fillStyle = on ? FXCOL[i] : '#2a3a6a'; g.beginPath(); g.arc(q[0], q[1], 30, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke(); if (on) { g.save(); g.beginPath(); g.arc(q[0], q[1], 27, 0, 7); g.clip(); g.globalAlpha = a; g.drawImage(BossArt.bust(ids[i], 'happy'), q[0] - 32, q[1] - 34, 64, 64); g.restore(); } });
    FX.core(g, 320, 70, T, 130, 'ok');
  }
  if (k === 'end') {
    FX.hills(g, 300, 14, '#0c1634', 3, T, 0); FX.hills(g, 330, 10, '#060b1c', 5, T, 0); FXCOL.forEach((c, i) => { const x = 90 + i * 92, y = 300 - (i % 2) * 14; const gl = g.createRadialGradient(x, y, 1, x, y, 30); gl.addColorStop(0, c); gl.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gl; g.fillRect(x - 30, y - 30, 60, 60); g.fillStyle = '#fff'; g.fillRect(x - 1, y - 1, 3, 3); });
    FX.core(g, 320, 218, T, 100, 'ok'); for (let i = 0; i < 4; i++) { const q = ((T * 0.25 + i * 0.27) % 1); g.strokeStyle = 'rgba(255,255,255,' + (1 - q) * 0.9 + ')'; g.lineWidth = 2; g.beginPath(); g.moveTo(80 + q * 480, 30 + q * 90); g.lineTo(80 + q * 480 - 34, 30 + q * 90 - 12); g.stroke(); }
    FX.heroes(g, 250, 350, T, 'up'); FX.motes(g, T, 50, '#ffe27a', 14, 120, 340);
  }
  const vg = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,12,.55)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  g.fillStyle = '#000'; g.fillRect(0, 0, W, 22); g.fillRect(0, H - 22, W, 22);
}
async function finale() {
  const host = ($('#fade') || document.body).parentNode, box = el('div', 'finale'), cv = el('canvas', 'fin-cv'), cap = el('div', 'fin-cap'), end = el('div', 'fin-end'), sk = el('div', 'fin-skip', fmt(t('fin.skip')));
  cv.width = FXW; cv.height = FXH; box.append(cv, cap, end, sk); host.appendChild(box); const g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
  let done = false, t0 = performance.now(), idx = -1, seg0 = 0, raf = 0; Aud.playMusic('title');
  const fin = new Promise((res) => {
    const stop = () => { if (done) return; done = true; cancelAnimationFrame(raf); box.classList.add('off'); setTimeout(() => { box.remove(); res(); }, 600); };
    box.addEventListener('click', () => { if (performance.now() - t0 > 1500) stop(); }); window.addEventListener('keydown', function kd(e) { if (done) { window.removeEventListener('keydown', kd); return; } if ((e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') && performance.now() - t0 > 1500) { e.stopPropagation(); stop(); } }, true);
    const loop = (now) => {
      if (done) return; const el_ = now - t0; let i = 0, a = 0; while (i < FIN_DUR.length - 1 && el_ >= a + FIN_DUR[i]) { a += FIN_DUR[i]; i++; }
      const last = i === FIN_DUR.length - 1;
      if (i !== idx) { idx = i; seg0 = a; cap.classList.remove('on'); setTimeout(() => { cap.innerHTML = fmt(t('fin.' + i)); cap.classList.add('on'); }, 250); if (i > 0 && i < 8) Aud.sfx('ok'); if (last) end.innerHTML = '<b>' + fmt(t('fin.end')) + '</b><span>' + fmt(t('end6.thanks')) + '</span>'; if (last) end.classList.add('on'); }
      const p = Math.min(1, (el_ - seg0) / FIN_DUR[i]); finDraw(g, FIN_SCENES[i].k, p, el_ / 1000);
      g.fillStyle = 'rgba(0,0,0,' + Math.max(0, 1 - Math.min((el_ - seg0) / 700, 1)) * 0.95 + ')'; g.fillRect(0, 0, FXW, FXH);
      if (last && el_ - seg0 > FIN_DUR[i] - 400) { stop(); return; } raf = requestAnimationFrame(loop);
    }; raf = requestAnimationFrame(loop);
  });
  await fin;
}
