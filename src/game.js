'use strict';
/* ===== game.js: menus, quest flow, scenes, activities, boss fight, boot ===== */

/* ---------- small helpers ---------- */
const say = (lines) => Dlg.say(lines);
const fl = (k) => Save.flag(k);
function recHTML(r, o) {
  o = o || {}; const lab = o.lbl !== undefined ? o.lbl : r.l;
  return '<div class="rec' + (o.cls ? ' ' + o.cls : '') + '"><img class="fruit" alt="" src="' + Fruits.url(r) + '"><div class="rec-f">' + fmt([t('col.' + r.c), t('shp.' + r.s), r.w + ' ' + t('unit.g')].join(' · ')) + '</div>' + (lab ? '<div class="rec-l">' + fmt(t('b.card', { x: t('lbl.' + lab) })) + '</div>' : '') + '</div>';
}
function lblName(l) { return t('lbl.' + l); }
function award(xp, codex) { Save.addXP(xp); UI.toast(t('toast.xp', { n: xp })); (codex || []).forEach((c, i) => setTimeout(() => Save.unlock(c), 350 + i * 500)); }
function setFlag(k) { Save.set(k); Env.sync(); HUD.update(); }

/* ---------- task runner (shared by activities, side quests, rehearsal, boss) ---------- */
function mcqBuild(options, correct, pre) {
  return (body) => {
    if (pre) pre(body);
    let sel = null; const box = el('div', 'opts');
    shuffle(options).forEach((o) => { const b = el('button', 'opt', fmt(o.txt)); b.type = 'button'; if (o.id === correct) b.dataset.ok = '1'; b.addEventListener('click', () => { Aud.sfx('click'); sel = o.id; $$('.opt', box).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); }); box.appendChild(b); });
    body.appendChild(box);
    return { check() { return sel == null ? null : { ok: sel === correct }; }, solve() { $('.opt[data-ok="1"]', box).click(); }, incomplete: t('fb.pickfirst') };
  };
}
function tapBuild(items, correct, multi) {
  return (body) => {
    const sel = new Set(), grid = el('div', 'cards');
    items.forEach((it) => { const c = el('div', 'card tap', it.html); c.tabIndex = 0; c.dataset.id = it.id; const tog = () => { Aud.sfx('click'); if (!multi) { sel.clear(); $$('.card', grid).forEach((x) => x.classList.remove('sel')); } if (sel.has(it.id)) { sel.delete(it.id); c.classList.remove('sel'); } else { sel.add(it.id); c.classList.add('sel'); } }; c.addEventListener('click', tog); c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } }); grid.appendChild(c); });
    body.appendChild(grid);
    return { check() { if (!sel.size) return null; return { ok: sel.size === correct.length && correct.every((c) => sel.has(c)) }; }, solve() { $$('.card', grid).forEach((c) => { if (correct.map(String).includes(c.dataset.id)) c.click(); }); }, incomplete: t('fb.pickfirst') };
  };
}
function runTask(box, T) {
  return new Promise((res) => {
    let level = 0, tries = 0, api, done = false;
    const pr = el('div', 'tk-p'), body = el('div', 'tk-b'), fb = el('div', 'tk-fb'), hint = el('div', 'tk-hint'), bar = el('div', 'tk-bar');
    box.innerHTML = ''; box.append(pr, body, fb, hint, bar);
    const mount = () => { pr.innerHTML = fmt(typeof T.p === 'function' ? T.p() : T.p); body.innerHTML = ''; api = T.build(body, { n: tries }); if (TEST) window.__task = { api: api, T: T }; };
    mount();
    const hb = UI.btn(t('hint.btn'), 'ghost', () => {
      if (done) return; level = Math.min(3, level + 1); hint.className = 'tk-hint on' + (level === 3 ? ' worked' : '');
      hint.innerHTML = '<b>' + fmt(level === 3 ? t('hint.worked') : t('hint.n', { n: level })) + '</b> ' + fmt(T.hints[level - 1]); if (level >= 3) hb.disabled = true; if (T.onHint) T.onHint(level);
    });
    const cb = UI.btn(t('ui.check'), 'primary', () => {
      if (done) return; const r = api.check();
      if (r == null) { fb.className = 'tk-fb no'; fb.innerHTML = fmt(api.incomplete || t('fb.complete')); Aud.sfx('no'); return; }
      tries++;
      if (r.ok) {
        done = true; fb.className = 'tk-fb ok'; fb.innerHTML = '<b>' + fmt(t('fb.ok')) + '</b> ' + fmt(r.msg || T.ex || ''); Aud.sfx('ok'); hb.disabled = true; cb.remove();
        $$('button,.card', body).forEach((x) => { x.style.pointerEvents = 'none'; }); if (T.onOk) T.onOk();
        const nx = UI.btn(t('tk.next'), 'primary', () => res({ helped: level >= 3, tries: tries, level: level })); bar.appendChild(nx); nx.focus();
      } else {
        fb.className = 'tk-fb no'; fb.innerHTML = fmt(r.msg || t('fb.no')); Aud.sfx('no'); if (T.onNo) T.onNo(); if (T.rebuild) mount();
      }
    });
    bar.append(hb, cb);
  });
}
/* open a stand-alone activity panel, run tasks in order, then close */
async function runPanel(title, tasks, opts) {
  const box = el('div', 'act'); const card = Panel.card(title, box, { close: false, cls: 'wide' });
  Panel.show(card, 'act'); const out = [];
  for (let i = 0; i < tasks.length; i++) {
    const h = card.querySelector('.pnl-h h2'); h.innerHTML = fmt(tasks[i].title || title);
    const r = await runTask(box, tasks[i]); out.push(r);
  }
  Panel.close(); return out;
}

/* ---------- activity 1: rules versus examples ---------- */
async function activityGate() {
  const box = el('div', 'act'), card = Panel.card(t('a1.title'), box, { close: false, cls: 'wide' }); Panel.show(card, 'act');
  let tried = false;
  const lv = Learner(TRAIN6.concat(PLUMS));
  const showRules = () => {
    box.innerHTML = '<div class="a1"><div class="a1-rules"><h3>' + fmt(t('a1.rules')) + '</h3><ul>' + [1, 2, 3, 4].map((n) => '<li class="' + (n === 4 && tried ? 'new' : '') + '">' + fmt(t('a1.r' + n)) + '</li>').join('') + '</ul></div>' +
      '<div class="a1-fruit"><div class="gatefruit">' + '<img class="fruit big" alt="" src="' + Fruits.url(FRUIT_A) + '"><div class="stamp bad">' + fmt(t('a1.rejected')) + '</div></div><small>' + fmt(t('a1.fruitA')) + '</small></div></div>';
    const q = el('div', 'tk-p', fmt(t('a1.prompt'))); const opts = el('div', 'opts');
    const bR = el('button', 'opt', fmt(t('a1.optRule'))), bE = el('button', 'opt', fmt(t('a1.optEx'))); bR.type = bE.type = 'button';
    if (tried) { bR.disabled = true; bR.classList.add('tried'); }
    opts.append(bR, bE); box.append(q, opts);
    const fb = el('div', 'tk-fb'); box.appendChild(fb);
    if (tried) { fb.className = 'tk-fb no'; fb.innerHTML = fmt(t('a1.afterRule')); }
    const hint = el('div', 'tk-hint'); box.appendChild(hint); let lvl = 0;
    const bar = el('div', 'tk-bar'); const hb = UI.btn(t('hint.btn'), 'ghost', () => { lvl = Math.min(3, lvl + 1); hint.className = 'tk-hint on' + (lvl === 3 ? ' worked' : ''); hint.innerHTML = '<b>' + fmt(lvl === 3 ? t('hint.worked') : t('hint.n', { n: lvl })) + '</b> ' + fmt([t('a1.h1'), t('a1.h2'), t('a1.ex')][lvl - 1]); if (lvl >= 3) hb.disabled = true; }); bar.appendChild(hb); box.appendChild(bar);
    bR.addEventListener('click', () => { Aud.sfx('click'); tried = true; Over.say('finch', 'sweat', 1.4); ruleDemo(); });
    bE.addEventListener('click', () => { Aud.sfx('click'); exDemo(); });
  };
  const ruleDemo = () => {
    box.innerHTML = '<div class="a1"><div class="a1-rules"><h3>' + fmt(t('a1.rules')) + '</h3><ul>' + [1, 2, 3, 4].map((n) => '<li class="' + (n === 4 ? 'new' : '') + '">' + fmt(t('a1.r' + n)) + '</li>').join('') + '</ul></div>' +
      '<div class="a1-fruit"><div class="pair"><div><img class="fruit big" alt="" src="' + Fruits.url(FRUIT_A) + '"><div class="stamp ok">' + fmt(t('a1.accepted', { x: lblName('Plum') })) + '</div></div><div><img class="fruit big" alt="" src="' + Fruits.url(FRUIT_B) + '"><div class="stamp bad">' + fmt(t('a1.rejected')) + '</div></div></div></div></div><div class="tk-fb no">' + fmt(t('a1.afterRule')) + '</div>';
    Aud.sfx('no'); const b = UI.btn(t('ui.again'), 'primary', showRules); const bar = el('div', 'tk-bar'); bar.appendChild(b); box.appendChild(bar); b.focus();
  };
  const exDemo = () => {
    const exs = TRAIN6.concat(PLUMS); const pa = lv.predict(FRUIT_A), pb = lv.predict(FRUIT_B);
    box.innerHTML = '<h3 class="sub">' + fmt(t('a1.exTitle')) + '</h3><div class="cards mini">' + exs.map((r, i) => '<div class="card">' + recHTML(Object.assign({ id: i }, r)) + '</div>').join('') + '</div>' +
      '<div class="pair res"><div><img class="fruit big" alt="" src="' + Fruits.url(FRUIT_A) + '"><div class="stamp ok">' + fmt(t('a1.accepted', { x: lblName(pa.label) })) + '</div></div><div><img class="fruit big" alt="" src="' + Fruits.url(FRUIT_B) + '"><div class="stamp ok">' + fmt(t('a1.accepted', { x: lblName(pb.label) })) + '</div></div></div>' +
      '<div class="tk-fb ok"><b>' + fmt(t('fb.ok')) + '</b> ' + fmt(t('a1.learned') + ' ' + t('a1.ex')) + '</div>';
    Aud.sfx('ok'); const nx = UI.btn(t('tk.next'), 'primary', () => { Panel.close(); done(); }); const bar = el('div', 'tk-bar'); bar.appendChild(nx); box.appendChild(bar); nx.focus();
  };
  let done; const p = new Promise((r) => { done = r; }); showRules(); return p;
}

/* ---------- activity 4: the first learner ---------- */
async function activityLearner() {
  const box = el('div', 'act'), card = Panel.card(t('a4.title'), box, { close: false, cls: 'wide' }); Panel.show(card, 'act');
  let trained = false, guess = null, learner = null, lvl = 0; let done; const p = new Promise((r) => { done = r; });
  const mach = () => Room.all.training.props.find((q) => q.type === 'machine');
  const render = () => {
    box.innerHTML = '<div class="a4"><div class="a4-l"><div class="chip ' + (trained ? 'ok' : '') + '">' + fmt(t(trained ? 'a4.status1' : 'a4.status0')) + '</div><h3 class="sub">' + fmt(t('a4.s1')) + '</h3><div class="cards mini">' + TRAIN6.map((r, i) => '<div class="card">' + recHTML(Object.assign({ id: i }, r)) + '</div>').join('') + '</div></div>' +
      '<div class="a4-r"><h3 class="sub">' + fmt(t('a4.s2')) + '</h3><div class="newfruit"><div>' + fmt(t('a4.new')) + '</div>' + recHTML(Object.assign({ id: 99 }, NEW_FRUIT), { lbl: null }) + '</div><div class="tk-p">' + fmt(t('a4.pickq')) + '</div><div class="opts row"></div></div></div><div class="tk-fb"></div><div class="tk-hint"></div><div class="tk-bar"></div>';
    const opts = $('.opts', box); LABELS.forEach((l) => { const b = el('button', 'opt' + (guess === l ? ' sel' : ''), fmt(lblName(l))); b.type = 'button'; b.addEventListener('click', () => { Aud.sfx('click'); guess = l; $$('.opt', opts).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); }); opts.appendChild(b); });
    const bar = $('.tk-bar', box), fb = $('.tk-fb', box), hint = $('.tk-hint', box);
    const hb = UI.btn(t('hint.btn'), 'ghost', () => { lvl = Math.min(3, lvl + 1); hint.className = 'tk-hint on' + (lvl === 3 ? ' worked' : ''); hint.innerHTML = '<b>' + fmt(lvl === 3 ? t('hint.worked') : t('hint.n', { n: lvl })) + '</b> ' + fmt([t('a4.h1'), t('a4.h2'), t('a4.ex')][lvl - 1]); if (lvl >= 3) hb.disabled = true; });
    const tr = UI.btn(t('a4.train'), 'primary', async () => { if (trained) return; tr.disabled = true; const m = mach(); if (m) m.running = true; Aud.sfx('train'); Over.parts.length = 0; fb.className = 'tk-fb'; fb.innerHTML = '…'; await ASYNC(1300); if (m) m.running = false; trained = true; learner = Learner(TRAIN6); Aud.sfx('ok'); const keepG = guess; render(); guess = keepG; $$('.opt', box).forEach((x) => x.classList.toggle('sel', x.textContent === lblName(guess))); const f2 = $('.tk-fb', box); f2.className = 'tk-fb ok'; f2.innerHTML = fmt(t('a4.trainedMsg', { n: TRAIN6.length })); });
    if (trained) tr.disabled = true;
    const pr = UI.btn(t('a4.predict'), 'primary', () => {
      if (!trained) { fb.className = 'tk-fb no'; fb.innerHTML = fmt(t('a4.notrained')); Aud.sfx('no'); return; }
      if (!guess) { fb.className = 'tk-fb no'; fb.innerHTML = fmt(t('fb.pickfirst')); Aud.sfx('no'); return; }
      const r = learner.predict(NEW_FRUIT); Aud.sfx('ok'); fb.className = 'tk-fb ok';
      fb.innerHTML = fmt(t('a4.model', { x: lblName(r.label) }) + ' ' + t('a4.nearest', { x: lblName(r.neighbors[0].r.l) + ' (' + t('col.' + r.neighbors[0].r.c) + ')' }) + ' ' + t('a4.ex') + ' ' + t('a4.note'));
      bar.innerHTML = ''; const nx = UI.btn(t('tk.next'), 'primary', () => { Panel.close(); done(); }); bar.appendChild(nx); nx.focus();
    });
    bar.append(hb, tr, pr);
  };
  render(); return p;
}

/* ---------- activity 2 and 3 task specs ---------- */
function specSample() {
  return {
    title: t('a2.t1'), p: t('a2.q1'), hints: [t('a2.h1'), t('a2.h2'), t('a2.ex')], ex: t('a2.ex'),
    build: mcqBuild([{ id: 'a', txt: t('a2.o1a') }, { id: 'b', txt: t('a2.o1b') }, { id: 'c', txt: t('a2.o1c') }], 'a'),
  };
}
function specDataset() {
  const loose = TRAIN6.map((r, i) => Object.assign({ id: i }, r)).concat([{ id: 6, c: 'Orange', s: 'Round', w: 175, l: 'Orange' }, { id: 7, c: 'Red', s: 'Round', w: 162, l: 'Apple' }, { id: 8, c: 'Yellow', s: 'Long', w: 133, l: 'Banana' }]);
  return {
    title: t('a2.t2'), p: t('a2.q2'), hints: [t('a2.h3'), t('a2.h4'), t('a2.ex2')], ex: t('a2.ex'),
    build(body) {
      const inBox = new Set(); const top = el('div', 'dbx-count'), pool = el('div', 'cards mini'), dbx = el('div', 'dbx'); const upd = () => { top.innerHTML = fmt(t('a2.box', { n: inBox.size })); };
      loose.forEach((r) => { const c = el('div', 'card tap', recHTML(r)); c.addEventListener('click', () => { Aud.sfx('click'); if (inBox.has(r.id)) { inBox.delete(r.id); pool.appendChild(c); c.classList.remove('in'); } else { inBox.add(r.id); dbx.appendChild(c); c.classList.add('in'); } upd(); }); pool.appendChild(c); });
      body.append(pool, top, dbx); upd();
      return { solve() { $$('.card', pool).slice(0, 7).forEach((c) => c.click()); }, check() { if (!inBox.size) return null; return inBox.size >= 6 ? { ok: true } : { ok: false, msg: t('a2.few', { n: inBox.size }) }; } };
    },
  };
}
function specFeatures() {
  const rows = [['color', 'a3.f.color', 'f'], ['weight', 'a3.f.weight', 'f'], ['shape', 'a3.f.shape', 'f'], ['type', 'a3.f.type', 'l']];
  return {
    title: t('a3.t1'), p: t('a3.q1'), hints: [t('a3.h1'), t('a3.h2'), t('a3.ex')], ex: t('a3.ex'),
    build(body) {
      const ans = {}; const tb = el('div', 'sort');
      shuffle(rows).forEach(([id, key]) => { const r = el('div', 'sort-r'); r.appendChild(el('span', 'sort-n', fmt(t(key)))); ['f', 'l'].forEach((v) => { const b = el('button', 'opt small', fmt(t(v === 'f' ? 'a3.feat' : 'a3.lab'))); b.type = 'button'; b.addEventListener('click', () => { Aud.sfx('click'); ans[id] = v; $$('.opt', r).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); }); r.appendChild(b); }); tb.appendChild(r); });
      body.appendChild(tb);
      return { solve() { $$('.sort-r', tb).forEach((r, i) => { const nm = r.querySelector('.sort-n').textContent; const lab = nm === t('a3.f.type'); r.querySelectorAll('.opt')[lab ? 1 : 0].click(); }); }, check() { if (Object.keys(ans).length < 4) return null; return { ok: rows.every(([id, , w]) => ans[id] === w) }; } };
    },
  };
}
function specLabels() {
  const recs = [{ c: 'Red', s: 'Round', w: 155, a: 'Apple' }, { c: 'Yellow', s: 'Long', w: 130, a: 'Banana' }, { c: 'Orange', s: 'Round', w: 175, a: 'Orange' }];
  return {
    title: t('a3.t2'), p: t('a3.q2'), hints: [t('a3.h3'), t('a3.h4'), t('a3.ex2')], ex: t('a3.ex2'),
    build(body) {
      const ans = {}; const grid = el('div', 'cards');
      recs.forEach((r, i) => { const c = el('div', 'card', recHTML(r, { lbl: null })); const row = el('div', 'opts row'); LABELS.forEach((l) => { const b = el('button', 'opt small', fmt(lblName(l))); b.type = 'button'; b.addEventListener('click', () => { Aud.sfx('click'); ans[i] = l; $$('.opt', row).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); }); row.appendChild(b); }); c.appendChild(row); grid.appendChild(c); });
      body.appendChild(grid);
      return { solve() { $$('.card', grid).forEach((c, i) => { c.querySelectorAll('.opt')[LABELS.indexOf(recs[i].a)].click(); }); }, check() { if (Object.keys(ans).length < 3) return null; return { ok: recs.every((r, i) => ans[i] === r.a) }; } };
    },
  };
}

/* ---------- boss questions ---------- */
function A(id) { return ARCH.find((r) => r.id === id); }
function bossSpecs(S_) {
  const q = (n, kind) => ({ p: t('q' + n + '.p'), hints: [t('q' + n + '.h1'), t('q' + n + '.h2'), t('q' + n + '.ex')], ex: t('q' + n + '.ex') });
  const bigLearner = Learner(archiveAsIs());
  const Q4F = { c: 'Yellow', s: 'Long', w: 126 }, q4pred = bigLearner.predict(Q4F);
  const fixedLearner = Learner(archiveAsIs(8)), q5pred = fixedLearner.predict(Q4F);
  const before = accuracy(bigLearner, CHECK6), after = accuracy(Learner(cleanedArchive()), CHECK6);
  return [
    Object.assign(q(1), { rebuild: true, build: (body, c) => { const v = Q1_VARIANTS[c.n % 2]; return tapBuild(shuffle(v.ids).map((id) => ({ id: id, html: recHTML(A(id)) })), [v.bad], false)(body); } }),
    Object.assign(q(2), { build: (body) => { body.innerHTML = '<div class="cards mini pair2"><div class="card">' + recHTML({ c: 'Red', s: 'Round', w: 150 }, { lbl: 'Apple' }) + '</div><div class="card">' + recHTML({ c: 'Red', s: 'Round', w: 152 }, { lbl: 'Orange' }) + '</div></div>'; return mcqBuild([{ id: 'a', txt: t('q2.a') }, { id: 'b', txt: t('q2.b') }, { id: 'c', txt: t('q2.c') }], 'a')(body); } }),
    Object.assign(q(3), { rebuild: true, build: (body, c) => { const v = Q3_VARIANTS[c.n % 2]; return tapBuild(shuffle(v.ids).map((id) => ({ id: id, html: recHTML(A(id)) })), v.bad, true)(body); } }),
    Object.assign(q(4), { p: t('q4.p', { x: lblName(q4pred.label) }), build: (body) => { const near = q4pred.neighbors.map((n) => '<div class="card">' + recHTML(n.r) + '</div>').join(''); return mcqBuild([{ id: 'a', txt: t('q4.a') }, { id: 'b', txt: t('q4.b') }, { id: 'c', txt: t('q4.c') }], 'a', (b) => { b.innerHTML = '<div class="newfruit">' + recHTML(Q4F, { lbl: null }) + '</div><h4 class="sub">' + fmt(t('q4.near')) + '</h4><div class="cards mini">' + near + '</div>'; })(body); } }),
    Object.assign(q(5), { build: (body) => mcqBuild(LABELS.map((l) => ({ id: l, txt: lblName(l) })), q5pred.label, (b) => { b.innerHTML = '<div class="newfruit">' + recHTML(Q4F, { lbl: null }) + '</div>'; })(body), ex: t('q5.ex') + ' ' + t('q5.res', { x: lblName(q5pred.label) }) }),
    Object.assign(q(6), { build: mcqBuild([{ id: 'a', txt: t('q6.a') }, { id: 'b', txt: t('q6.b') }, { id: 'c', txt: t('q6.c') }], 'a') }),
    Object.assign(q(7), { build: (body) => {
      const st = {}; const grid = el('div', 'cards');
      Q7_CARDS.forEach((cd) => { const r = A(cd.id), c = el('div', 'card', recHTML(r)); const row = el('div', 'opts row'), lab = el('div', 'opts row sub2');
        const setAct = (a) => { st[cd.id] = { a: a }; $$('.opt', row).forEach((x) => x.classList.toggle('sel', x.dataset.a === a)); lab.style.display = a === 'fix' ? '' : 'none'; $$('.opt', lab).forEach((x) => x.classList.remove('sel')); };
        ['keep', 'fix', 'flag'].forEach((a) => { const b = el('button', 'opt small', fmt(t('q7.' + a))); b.type = 'button'; b.dataset.a = a; b.addEventListener('click', () => { Aud.sfx('click'); setAct(a); }); row.appendChild(b); });
        LABELS.forEach((l) => { const b = el('button', 'opt small', fmt(lblName(l))); b.type = 'button'; b.addEventListener('click', () => { Aud.sfx('click'); st[cd.id].to = l; $$('.opt', lab).forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); }); lab.appendChild(b); }); lab.style.display = 'none';
        c.append(row, lab); c.dataset.id = cd.id; grid.appendChild(c); });
      body.appendChild(grid);
      return { solve() { Q7_CARDS.forEach((cd) => { const c = grid.querySelector('[data-id="' + cd.id + '"]'); c.querySelector('[data-a="' + cd.want + '"]').click(); if (cd.want === 'fix') c.querySelectorAll('.sub2 .opt')[LABELS.indexOf(cd.to)].click(); }); }, check() {
        if (Q7_CARDS.some((cd) => !st[cd.id] || (st[cd.id].a === 'fix' && !st[cd.id].to))) return null;
        const bad = Q7_CARDS.filter((cd) => !(st[cd.id].a === cd.want && (cd.want !== 'fix' || st[cd.id].to === cd.to)));
        $$('.card', grid).forEach((c) => c.classList.toggle('wrong', bad.some((cd) => String(cd.id) === c.dataset.id)));
        return { ok: !bad.length, msg: undefined };
      }, incomplete: t('fb.complete') };
    } }),
    Object.assign(q(8), { build: mcqBuild([{ id: 'a', txt: t('q8.a') }, { id: 'b', txt: t('q8.b') }, { id: 'c', txt: t('q8.c') }], 'a') }),
    Object.assign(q(9), { p: t('q9.p', { a: before, b: after }), build: (body) => mcqBuild([{ id: 'a', txt: t('q9.a') }, { id: 'b', txt: t('q9.b') }, { id: 'c', txt: t('q9.c') }], 'a', (b) => { b.innerHTML = '<div class="bars"><div><span>' + fmt(t('q9.before')) + '</span><i style="width:' + (before / 6 * 100) + '%"></i><b>' + before + '/6</b></div><div><span>' + fmt(t('q9.after')) + '</span><i class="g" style="width:' + (after / 6 * 100) + '%"></i><b>' + after + '/6</b></div></div>'; })(body) }),
    Object.assign(q(10), { build: (body) => {
      const steps = [['s1', 1], ['s2', 2], ['s3', 3], ['s4', 4]], chosen = []; const pool = el('div', 'opts row'), line = el('div', 'order');
      const draw = () => { line.innerHTML = chosen.length ? '' : '<em>' + fmt(t('q10.order', { x: '…' })) + '</em>'; chosen.forEach((s, i) => { line.appendChild(el('span', 'chip', (i + 1) + '. ' + fmt(t('q10.' + s)))); }); $$('.opt', pool).forEach((b) => b.classList.toggle('sel', chosen.includes(b.dataset.s))); };
      shuffle(steps).forEach(([s]) => { const b = el('button', 'opt small', fmt(t('q10.' + s))); b.type = 'button'; b.dataset.s = s; b.addEventListener('click', () => { Aud.sfx('click'); const i = chosen.indexOf(s); if (i >= 0) chosen.splice(i, 1); else chosen.push(s); draw(); }); pool.appendChild(b); });
      body.append(pool, line); draw();
      return { solve() { ['s1', 's2', 's3', 's4'].forEach((s) => pool.querySelector('[data-s="' + s + '"]').click()); }, check() { if (chosen.length < 4) return null; return { ok: chosen.join() === 's1,s2,s3,s4' }; } };
    } }),
  ];
}

/* ---------- boss arena (canvas inside the boss panel) ---------- */
const Arena = {
  start(cvEl) {
    this.g = cvEl.getContext('2d'); this.g.imageSmoothingEnabled = false; this.s = { boss: 'idle', bt: 0, hero: 'idle', ht: 0, emo: {}, parts: [], phase: '', pt: 0, hp: 1 }; this.run = true; this.t0 = performance.now();
    const loop = () => { if (!this.run) return; this.draw((performance.now() - this.t0) / 1000); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
  },
  stop() { this.run = false; },
  hit() { const s = this.s; s.boss = 'hit'; s.bt = 0.8; s.hero = 'cheer'; s.ht = 0.9; s.emo.hero = { n: 'star', t: 1.2 }; s.emo.milo = { n: 'note', t: 1.2 }; for (let i = 0; i < 18; i++) s.parts.push({ x: 232, y: 50, vx: (Math.random() - 0.3) * 60, vy: -Math.random() * 50, l: 0.9, c: i % 2 ? '#3a3a6a' : '#fff3b0' }); },
  taunt() { const s = this.s; s.boss = 'taunt'; s.bt = 1; s.hero = 'worry'; s.ht = 1; s.emo.milo = { n: 'sweat', t: 1.2 }; s.emo.boss = { n: 'dots', t: 1 }; for (let i = 0; i < 8; i++) s.parts.push({ x: 200 - i * 12, y: 54 + Math.sin(i) * 5, vx: -70, vy: 0, l: 0.6, c: '#1a1a38' }); },
  defeat() { this.s.boss = 'defeat'; this.s.bt = 3; for (let i = 0; i < 30; i++) this.s.parts.push({ x: 232, y: 56, vx: (Math.random() - 0.5) * 80, vy: -Math.random() * 70, l: 1.6, c: ['#ffd24a', '#fff3b0', '#6ff3ff'][i % 3] }); },
  phase(txt) { this.s.phase = txt; this.s.pt = 2.4; },
  draw(t) {
    const g = this.g, s = this.s, dt = 1 / 60; g.clearRect(0, 0, 320, 120);
    for (let y = 0; y < 120; y += 4) { g.fillStyle = mix('#1a1430', '#38285e', y / 120); g.fillRect(0, y, 320, 4); }
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#2a2046' : '#241a3c'; g.fillRect(i * 38 - 6, 6, 30, 82); for (let j = 0; j < 4; j++) { g.fillStyle = ['#7a5aa8', '#a8587a', '#4a7ac8', '#c8a24b'][(i + j) % 4]; g.fillRect(i * 38 - 3 + (j % 2) * 3, 12 + j * 20, 22, 4); } }
    g.fillStyle = '#3a3550'; g.fillRect(0, 92, 320, 28); g.fillStyle = '#2c2840'; for (let x = 0; x < 320; x += 24) g.fillRect(x, 92, 1, 28);
    for (let i = 0; i < 7; i++) { const x = (i * 49 + t * 12) % 340 - 10, y = 18 + ((i * 37) % 50) + Math.sin(t * 1.5 + i) * 5; g.fillStyle = 'rgba(243,234,208,0.75)'; g.fillRect(x, y, 9, 12); g.fillStyle = '#6b4a2a'; g.fillRect(x + 2, y + 3, 5, 1); g.fillRect(x + 2, y + 6, 4, 1); }
    /* hero + milo */
    const hop = s.hero === 'cheer' ? Math.abs(Math.sin(s.ht * 8)) * 8 : 0, shk = s.hero === 'worry' ? Math.sin(s.ht * 40) * 1.5 : 0;
    g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(24, 107, 30, 4); Sprites.draw(g, 'hero', 'right', 0, 42 + shk, 114 - hop, 1.7);;
    Sprites.draw(g, 'milo', 'right', Math.floor(t * 6) % 4, 82, 108 - hop * 0.7 + Math.sin(t * 3) * 2, 2);;
    /* boss */
    const sc = (s.boss === 'taunt' ? 1 + 0.06 * Math.sin(s.bt * 10) : 1), bh = BOSS_ARENA_H.misprint * sc, bx = 232 + (s.boss === 'hit' ? Math.sin(s.bt * 50) * 3 : 0), by = 102 + Math.sin(t * 2) * 3;
    g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(232 - 30, 107, 60, 5);
    g.save(); if (s.boss === 'hit') g.filter = 'brightness(2.6)'; if (s.boss === 'defeat') g.globalAlpha = Math.max(0, s.bt / 3);
    Sprites.drawBoss(g, 'misprint', bx, by - (s.boss === 'defeat' ? (3 - s.bt) * 10 : 0), bh, Math.floor(t * 2.2) % 4); g.restore();
    /* emotes */
    const E = (k, x, y) => { const e = s.emo[k]; if (!e) return; e.t -= dt; if (e.t <= 0) { delete s.emo[k]; return; } g.drawImage(Emotes.get(e.n), x, y - Math.sin(t * 8) * 1.5); };
    E('hero', 32, 40); E('milo', 74, 40); E('boss', 224, 8);
    s.parts = s.parts.filter((p) => { p.l -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 80 * dt; g.fillStyle = p.c; g.fillRect(p.x, p.y, 3, 3); return p.l > 0; });
    if (s.bt > 0) { s.bt -= dt; if (s.bt <= 0 && s.boss !== 'defeat') s.boss = 'idle'; } if (s.ht > 0) { s.ht -= dt; if (s.ht <= 0) s.hero = 'idle'; }
    if (s.pt > 0) { s.pt -= dt; g.fillStyle = 'rgba(10,6,26,' + Math.min(0.7, s.pt) + ')'; g.fillRect(0, 44, 320, 30); g.globalAlpha = Math.min(1, s.pt * 2); g.fillStyle = '#ffd24a'; g.font = 'bold 14px "DotGothic16", sans-serif'; g.textAlign = 'center'; g.fillText(s.phase, 160, 64); g.globalAlpha = 1; g.textAlign = 'start'; }
  },
};

/* ---------- boss fight ---------- */
async function bossFight() {
  Aud.playMusic('boss');
  const root = el('div', 'boss'); let hpPct = 100, mastered = 0;
  root.innerHTML = '<div class="b-top"><img class="b-p hero" alt="" src="' + Portraits.url('hero', 'determined') + '"><div class="b-bar"><div class="b-name">' + fmt(t('b.start').replace(/^[^:]*:\s*/, '')) + '</div><div class="hp"><i></i></div><div class="b-q-n"></div></div><img class="b-p boss" alt="" src="' + Portraits.url('misprint', 'confident') + '"></div><canvas class="b-arena" width="320" height="120"></canvas><div class="b-q"></div>';
  Panel.show(root, 'boss'); Arena.start($('.b-arena', root));
  const setP = (who, e) => { $('.b-p.' + who, root).src = Portraits.url(who === 'hero' ? 'hero' : 'misprint', e); };
  const specs = bossSpecs(), phaseAt = { 0: 'b.ph1', 3: 'b.ph2', 6: 'b.ph3', 8: 'b.ph4' };
  const log = [];
  for (let i = 0; i < 10; i++) {
    if (phaseAt[i]) { Arena.phase(t(phaseAt[i])); await ASYNC(i === 0 ? 900 : 700); }
    $('.b-q-n', root).innerHTML = fmt(t('b.q', { n: i + 1 })); setP('hero', 'determined'); setP('boss', 'confident');
    const sp = specs[i]; sp.onOk = () => { Arena.hit(); hpPct -= 10; $('.hp i', root).style.width = Math.max(0, hpPct) + '%'; setP('boss', 'surprised'); setP('hero', 'happy'); };
    sp.onNo = () => { Arena.taunt(); setP('boss', 'angry'); setP('hero', 'sad'); UI.toast(t('boss.taunt')); };
    const r = await runTask($('.b-q', root), sp); if (!r.helped) mastered++; log.push({ q: i + 1, helped: r.helped, tries: r.tries });
  }
  Arena.defeat(); setP('boss', 'sad'); setP('hero', 'happy'); await ASYNC(1600); Arena.stop();
  Save.d.bossLog = { mastered: mastered, log: log }; Save.d.mastery.quality = mastered >= 8 ? 2 : 1; Save.write();
  /* victory */
  root.innerHTML = '<div class="victory"><div class="v-title">' + fmt(t('boss.victory')) + '</div><p>' + fmt(t('boss.vict2')) + '</p><div class="v-rewards"><h3>' + fmt(t('boss.rewards')) + '</h3><div class="v-row"><div><b>+200</b><span>XP</span></div><div><b class="gem"></b><span>' + fmt(t('boss.rFrag')) + '</span></div><div><b class="book"></b><span>' + fmt(t('boss.rCodex')) + '</span></div></div></div><div class="v-m">' + fmt(t('end.score', { n: mastered })) + ' · ' + fmt(t('boss.mast', { m: t('mst.' + Save.d.mastery.quality) })) + '</div><img class="v-hero" alt="" src="' + Portraits.url('hero', 'happy') + '"><img class="v-milo" alt="" src="' + Portraits.url('milo', 'happy') + '"></div>';
  Aud.sfx('fragment'); Aud.playMusic('meadows');
  await new Promise((res) => { const b = UI.btn(t('tk.next'), 'primary', res); root.querySelector('.victory').appendChild(b); b.focus(); });
  Panel.close(); return mastered;
}

/* ---------- quest objective ---------- */
const POS = { finch: [14.5, 6.4], pip: [10.6, 12.6], lumaY: [12.8, 15.6], lumaL: [7.2, 7.8], finchL: [12.6, 8.2], wren: [7.6, 11.6], mis: [12, 8], finchA: [9, 13] };
const Quest = {
  objective() {
    if (!Save.d || !fl('intro') || fl('chapterEnd')) return null;
    const cur = Over.room && Over.room.id;
    if (fl('bossDone')) return { room: 'yard', x: 29 * 16, y: 13 * 16, text: t('obj.path') };
    if (fl('archiveOpen')) return cur === 'archive' ? { room: 'archive', x: POS.mis[0] * 16, y: POS.mis[1] * 16, text: t('obj.boss') } : { room: 'archive', x: 12 * 16, y: 16 * 16, text: t('obj.stairs') };
    if (fl('doorOpen')) return cur === 'training' ? { room: 'training', x: POS.lumaL[0] * 16, y: POS.lumaL[1] * 16, text: t('obj.machine') } : { room: 'training', x: 10 * 16, y: 14 * 16, text: t('obj.training') };
    if (fl('scene2')) return { room: 'yard', x: POS.lumaY[0] * 16, y: POS.lumaY[1] * 16, text: t('obj.luma3') };
    if (fl('gateOpen')) return { room: 'yard', x: POS.lumaY[0] * 16, y: POS.lumaY[1] * 16, text: cur === 'village' ? t('obj.yard') : t('obj.luma2') };
    return { room: 'village', x: POS.finch[0] * 16, y: POS.finch[1] * 16, text: t('obj.finch') };
  },
};

/* ---------- story ---------- */
const Story = {
  npcsFor(room) {
    const out = [], N = (o) => out.push(o);
    if (room === 'village') {
      N({ id: 'finch', sp: 'finch', spr: 'finch', tx: POS.finch[0], ty: POS.finch[1], dir: 'down', mark: () => (!fl('gateOpen') ? 'main' : null) });
      N({ id: 'pip', sp: 'pip', spr: 'pip', tx: POS.pip[0], ty: POS.pip[1], dir: 'right', mark: () => (!fl('sq1') ? 'side' : null) });
    }
    if (room === 'yard' && !fl('doorOpen')) N({ id: 'luma', sp: 'luma', spr: 'luma', tx: POS.lumaY[0], ty: POS.lumaY[1], dir: 'down', mark: () => (fl('gateOpen') && !fl('scene3') ? 'main' : null) });
    if (room === 'training') {
      if (fl('doorOpen')) N({ id: 'luma', sp: 'luma', spr: 'luma', tx: POS.lumaL[0], ty: POS.lumaL[1], dir: 'down', mark: () => (!fl('scene4') ? 'main' : (!fl('sq3') ? 'side' : null)) });
      if (fl('finchLab')) N({ id: 'finch', sp: 'finch', spr: 'finch', tx: POS.finchL[0], ty: POS.finchL[1], dir: 'left' });
    }
    if (room === 'archive') {
      N({ id: 'wren', sp: 'wren', spr: 'wren', tx: POS.wren[0], ty: POS.wren[1], dir: 'right' });
      if (!fl('bossDone')) N({ id: 'misprint', sp: 'misprint', spr: 'misprint', spirit: true, tx: POS.mis[0], ty: POS.mis[1], dir: 'down', fixed: true, mark: () => 'main' });
      else N({ id: 'finch', sp: 'finch', spr: 'finch', tx: POS.finchA[0], ty: POS.finchA[1], dir: 'left' });
    }
    return out;
  },
  async talk(id) {
    if (G.cine) return; const busyFlag = () => { G.cine = true; return () => { G.cine = false; }; };
    try {
      if (id === 'finch') return await this.talkFinch();
      if (id === 'pip') return await this.talkPip();
      if (id === 'luma') return await this.talkLuma();
      if (id === 'wren') return await this.talkWren();
      if (id === 'misprint') return await this.talkBoss();
    } finally { HUD.update(); }
  },
  look(s) {
    let k = s.say; if (k === 'tile.M' && fl('trained')) k = 'tile.M2';
    return say([L('none', k)]);
  },
  lockMsg(ex) { Over.say('milo', 'dots', 1.4); UI.toast(t(ex.lock)); },
  async onEnter(room) {
    if (room === 'yard' && !fl('yardSeen')) { Save.set('yardSeen'); await say([L('milo', 'yard.1', 'sad')]); }
    if (room === 'training' && !fl('labSeen')) { Save.set('labSeen'); await say([L('milo', 'lab.1', 'happy')]); }
    if (room === 'archive' && !fl('archiveSeen')) { Save.set('archiveSeen'); Aud.playMusic('boss'); Settings.bossMusic === 'full' && 0; await say([L('milo', 'arch.1', 'surprised')]); }
    if (room === 'archive' && fl('bossDone')) Aud.playMusic('meadows');
    HUD.update();
  },
  /* ---- Elder Finch: scene 1 ---- */
  async talkFinch() {
    if (Over.room.id === 'archive') { await say([L('finch', 'finch.win', 'happy')]); return; }
    if (Over.room.id === 'training') return;
    if (fl('gateOpen')) {
      await say([L('finch', fl('bossDone') ? 'finch.win' : 'f1.idle', 'happy')]);
      const c = await Dlg.choose([{ k: 'f1.reh' }, { k: 'f1.talk' }], L('finch', 'f1.idle2', 'neutral'));
      if (c === 0) await this.rehearsal(); return;
    }
    await say([L('finch', 'f1.1', 'surprised'), L('hero', 'f1.2', 'thinking'), L('finch', 'f1.3', 'sad'), L('milo', 'f1.4', 'thinking'), L('finch', 'f1.5', 'thinking'), L('milo', 'f1.6', 'confident')]);
    await activityGate();
    await say([L('milo', 'f1.7', 'thinking'), L('finch', 'f1.8', 'surprised'), L('milo', 'f1.9', 'happy'), L('finch', 'f1.win', 'happy')]);
    G.cine = true; UI.prompt(null);
    await Over.pan(15 * 16, 4.2 * 16, 900); Aud.sfx('gate'); setFlag('gateOpen'); Over.shake(2, 0.5); Over.burst(15 * 16, 4 * 16, ['#ffd24a', '#fff3b0', '#ffffff'], 36);
    Over.emo.finch = { n: 'heart', t: 2 }; Over.hop.finch = 1.4; Over.emo.milo = { n: 'star', t: 2 }; Over.hop.milo = 1.2; await ASYNC(1700);
    UI.toast(t('after.gate')); await Over.pan(null); await ASYNC(500); G.cine = false;
    award(40, ['ml', 'rules']);
    await say([L('finch', 'f1.t1', 'happy'), L('hero', 'f1.t2', 'determined'), L('milo', 'f1.t3', 'thinking'), L('finch', 'f1.t4', 'confident')]);
    HUD.update();
  },
  async rehearsal() {
    const defs = [[1, 'r.1', ['r.1a', 'r.1b', 'r.1c'], 1], [2, 'r.2', ['r.2a', 'r.2b', 'r.2c'], 2], [3, 'r.3', ['r.3a', 'r.3b', 'r.3c'], 0], [4, 'r.4', ['r.4a', 'r.4b', 'r.4c'], 0], [5, 'r.5', ['r.5a', 'r.5b', 'r.5c'], 1]];
    const tasks = defs.map(([n, p, opts, c], i) => ({ title: t('r.title') + ' (' + (i + 1) + '/5)', p: t(p), hints: [t('r.h'), t('r.h2'), t('r.ex' + n)], ex: t('r.ex' + n), build: mcqBuild(opts.map((k, j) => ({ id: j, txt: t(k) })), c) }));
    await runPanel(t('r.title'), tasks); UI.toast(t('r.done')); if (!fl('rehDone')) { Save.set('rehDone'); award(15); }
    Over.cheer();
  },
  /* ---- Pip: side quest 1 ---- */
  async talkPip() {
    if (fl('bossDone')) { await say([L('pip', 'pip.win', 'happy')]); return; }
    if (fl('sq1')) { await say([L('pip', 'pip.done', 'happy'), L('pip', 'pip.more', 'confident')]); return; }
    await say([L('pip', 'pip.1', 'thinking'), L('pip', 'pip.2', 'neutral')]);
    const c = await Dlg.choose([{ k: 'pip.opt' }, { k: 'luma.cancel' }], L('pip', 'pip.ask', 'happy')); if (c !== 0) return;
    UI.toast(t('toast.quest', { name: t('pip.sq') }));
    const items = [['Red apple', 'Red', 'Round', 'Apple', 'Apple', 150], ['Banana', 'Yellow', 'Long', 'Banana', 'Banana', 130], ['Orange', 'Orange', 'Round', 'Orange', 'Orange', 180], ['Green apple', 'Green', 'Round', 'Orange', 'Apple', 150], ['Golden apple', 'Yellow', 'Round', 'Banana', 'Apple', 155], ['Cherry', 'Red', 'Round', 'Apple', 'Cherry', 40]];
    const spec = { title: t('pip.sq'), p: t('sq1.p'), hints: [t('sq1.h1'), t('sq1.h2'), t('sq1.ex')], ex: t('sq1.ex'), build: (body) => tapBuild(shuffle(items.map((it, i) => ({ id: i, html: '<img class="fruit" alt="" src="' + Fruits.url({ c: it[1], s: it[2], w: it[5], kind: it[0] === 'Cherry' ? 'cherry' : '' }) + '"><div class="rec-f">' + fmt(t('fr.' + it[0])) + '</div><div class="rec-l">' + fmt(t('sq1.says', { x: lblName(it[3]) })) + '</div>' }))), [3, 4, 5], true)(body) };
    await runPanel(t('pip.sq'), [spec]); Save.set('sq1'); setFlag('sq1'); award(25); Over.emo.pip = { n: 'heart', t: 2 }; Over.hop.pip = 1.2; Over.burst(Over.npc('pip').x, Over.npc('pip').y - 14, ['#ffd24a', '#ff7aa8'], 14);
    await say([L('pip', 'sq1.done', 'happy')]);
  },
  /* ---- Luma ---- */
  async talkLuma() {
    const inLab = Over.room.id === 'training', stage = !fl('scene2') ? 2 : !fl('scene3') ? 3 : !fl('scene4') ? 4 : 0;
    const opts = []; if (stage) opts.push({ k: stage === 2 ? 'luma.main2' : 'luma.main3', id: 'main' });
    if (fl('scene2') && !fl('sq2')) opts.push({ k: 'sq2.opt', id: 'sq2' }); if (fl('scene3') && !fl('sq3')) opts.push({ k: 'sq3.opt', id: 'sq3' });
    if (stage === 4) { opts.shift(); opts.unshift({ k: 'luma.lab', id: 'main' }); }
    if (!opts.length) { await say([L('luma', fl('bossDone') ? 'luma.win' : 'luma.idle', 'happy')]); return; }
    let pick = 'main'; if (opts.length > 1 || (!stage)) { const c = await Dlg.choose(opts.concat([{ k: 'luma.cancel', id: 'x' }]), L('luma', 'luma.ask', 'happy')); pick = c < opts.length ? opts[c].id : 'x'; } else pick = opts[0].id;
    if (pick === 'x') return;
    if (pick === 'main') { if (stage === 2) return await this.sceneSample(); if (stage === 3) return await this.sceneFeatures(); if (stage === 4) return await this.sceneTrain(); }
    if (pick === 'sq2') return await this.sqBasket(); if (pick === 'sq3') return await this.sqCart();
  },
  async sceneSample() {
    await say([L('luma', 'f2.1', 'happy'), L('milo', 'f2.2', 'thinking'), L('luma', 'f2.3', 'sad'), L('milo', 'f2.4', 'thinking'), L('luma', 'f2.5', 'surprised'), L('milo', 'f2.6', 'confident'), L('hero', 'f2.7', 'thinking'), L('milo', 'f2.8', 'happy'), L('luma', 'f2.9', 'determined')]);
    await runPanel(t('a2.t1'), [specSample(), specDataset()]);
    G.cine = true; setFlag('scene2'); Aud.sfx('ok'); Over.burst(10 * 16, 16.5 * 16, ['#ffd24a', '#ff6b4a', '#7fe08a'], 30); Over.emo.luma = { n: 'heart', t: 2 }; Over.hop.luma = 1.4; await ASYNC(1400); UI.toast(t('after.fruit')); G.cine = false;
    award(40, ['sample', 'dataset']);
    await say([L('luma', 'f2.win', 'happy'), L('luma', 'f2.t1', 'sad'), L('luma', 'f2.t2', 'thinking'), L('milo', 'f2.t3', 'confident'), L('luma', 'f2.t4', 'surprised'), L('milo', 'f2.t5', 'happy')]);
  },
  async sceneFeatures() {
    await say([L('luma', 'f3.1', 'sad'), L('milo', 'f3.2', 'thinking'), L('luma', 'f3.3', 'neutral'), L('milo', 'f3.4', 'thinking'), L('hero', 'f3.5', 'surprised'), L('milo', 'f3.6', 'confident'), L('hero', 'f3.7', 'happy'), L('milo', 'f3.8', 'confident'), L('luma', 'f3.9', 'determined')]);
    await runPanel(t('a3.t1'), [specFeatures(), specLabels()]);
    setFlag('scene3'); award(40, ['feature', 'label']);
    await say([L('hero', 'f3.win', 'thinking'), L('milo', 'f3.win2', 'confident'), L('luma', 'f3.t1', 'thinking'), L('milo', 'f3.t2', 'thinking'), L('milo', 'f3.t3', 'confident'), L('luma', 'f3.t4', 'happy')]);
    Save.unlock('supervised');
    G.cine = true; await Over.walk('luma', 23.5, 6.2, 70); Over.emo.luma = { n: 'note', t: 1 };
    await Over.pan(23.5 * 16, 5.5 * 16, 800); Aud.sfx('door'); setFlag('doorOpen'); Over.burst(23.5 * 16, 5.6 * 16, ['#bfffd8', '#ffffff', '#7fe08a'], 30); await ASYNC(1300);
    Over.refreshNPCs(); await Over.pan(null); await ASYNC(400); G.cine = false; HUD.update();
  },
  async sceneTrain() {
    await say([L('luma', 'f4.1', 'sad'), L('milo', 'f4.2', 'thinking'), L('luma', 'f4.3', 'neutral'), L('milo', 'f4.4', 'confident'), L('hero', 'f4.5', 'thinking'), L('milo', 'f4.6', 'happy'), L('hero', 'f4.7', 'thinking'), L('milo', 'f4.8', 'happy'), L('hero', 'f4.9', 'surprised'), L('milo', 'f4.10', 'determined')]);
    await activityLearner(); setFlag('trained'); award(50, ['training', 'prediction']);
    await say([L('luma', 'tn.1', 'happy'), L('milo', 'tn.2', 'surprised')]);
    Over.shake(2, 0.5); Aud.sfx('no'); Over.emo.luma = { n: 'sweat', t: 1.6 }; Over.emo.milo = { n: '!', t: 1.6 };
    G.cine = true; setFlag('finchLab'); Over.refreshNPCs(); const f = Over.npc('finch'); if (f) { f.x = 10 * 16; f.y = 14 * 16; } Over.burst(10 * 16, 13.5 * 16, ['#ffd24a', '#ffffff'], 12);
    await Over.walk('finch', POS.finchL[0], POS.finchL[1], 60); G.cine = false;
    await say([L('luma', 'tn.3', 'surprised'), L('finch', 'tn.4', 'sad')]);
    setFlag('scene4'); Save.unlock('noise');
    G.cine = true; await Over.pan(17.5 * 16, 12.5 * 16, 800); Aud.sfx('gate'); setFlag('archiveOpen'); Over.burst(17.5 * 16, 12.5 * 16, ['#b8a8ff', '#ffffff'], 28); await ASYNC(1400); await Over.pan(null); await ASYNC(300); G.cine = false; HUD.update();
  },
  async sqBasket() {
    await say([L('luma', 'lumaSQ2.in', 'thinking')]); UI.toast(t('toast.quest', { name: t('sq2.name') }));
    const spec = { title: t('sq2.name'), p: t('sq2.intro'), hints: [t('sq2.h1'), t('sq2.h2'), t('sq2.ex')], ex: t('sq2.ex'), build: mcqBuild([{ id: 'A', txt: t('sq2.A') }, { id: 'B', txt: t('sq2.B') }, { id: 'C', txt: t('sq2.C') }], 'B') };
    await runPanel(t('sq2.name'), [spec]); setFlag('sq2'); award(25, ['rep']); await say([L('luma', 'sq2.done', 'happy')]); Over.emo.luma = { n: 'heart', t: 1.8 };
  },
  async sqCart() {
    await say([L('luma', 'lumaSQ3.in', 'thinking')]); UI.toast(t('toast.quest', { name: t('sq3.name') }));
    const spec = { title: t('sq3.name'), p: t('sq3.intro'), hints: [t('sq3.h1'), t('sq3.h2'), t('sq3.ex')], ex: t('sq3.ex'), build: mcqBuild(['col1', 'col2', 'col3', 'col4'].map((k, i) => ({ id: i, txt: t('sq3.' + k) })), 3) };
    await runPanel(t('sq3.name'), [spec]); setFlag('sq3'); award(25, ['usefeat']); await say([L('luma', 'sq3.done', 'happy')]); Over.emo.luma = { n: 'star', t: 1.8 };
  },
  async talkWren() { await say([L('wren', fl('bossDone') ? 'wren.win' : 'wren.pre', fl('bossDone') ? 'happy' : 'sad')]); },
  /* ---- boss ---- */
  async talkBoss() {
    await say([L('wren', 'b.2', 'neutral'), L('misprint', 'b.3', 'confident'), L('hero', 'b.4', 'determined')]);
    G.cine = true; UI.prompt(null); Over.shake(3, 0.6); Aud.sfx('no'); const m = Over.npc('misprint'); if (m) m.mood = 'angry'; await ASYNC(700); await UI.fade(1, 350); G.cine = false;
    const p = bossFight(); await UI.fade(0, 350); await p; await UI.fade(1, 250); Aud.playMusic('meadows'); await UI.fade(0, 350);
    G.cine = true; if (m) m.mood = 'sad'; Aud.sfx('fragment'); Over.burst(m.x, m.y - 20, ['#ffd24a', '#fff3b0', '#6ff3ff'], 40); await ASYNC(600); G.cine = false;
    await say([L('misprint', 'b.win1', 'sad'), L('hero', 'b.win2', 'determined'), L('none', 'b.win3')]);
    G.cine = true; Save.d.fragments = 1; Save.write(); HUD.update(); UI.toast(t('toast.frag')); Over.burst(Over.x, Over.y - 20, ['#ffd24a', '#fff3b0'], 40); await ASYNC(900);
    setFlag('bossDone'); Over.refreshNPCs(); Aud.playMusic('meadows'); G.cine = false; award(200, ['audit', 'quality']);
    Over.cheer(); await ASYNC(1400);
    await say([L('none', 'b.frag'), L('milo', 'b.milo', 'sad'), L('milo', 'b.br1', 'thinking'), L('hero', 'b.br2', 'thinking'), L('finch', 'b.br3', 'confident'), L('none', 'b.path')]);
    HUD.update();
  },
  /* ---- end of chapter ---- */
  async endChapter() {
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('fragment'); await UI.fade(1, 600);
    setFlag('chapterEnd'); const m = (Save.d.bossLog && Save.d.bossLog.mastered) || 0;
    const body = el('div', 'endc'); body.innerHTML = '<div class="v-title">' + fmt(t('end.title2')) + '</div><p>' + fmt(t('end.body')) + '</p><div class="v-m">' + fmt(t('end.score', { n: m })) + '</div><div class="v-m">' + fmt(t('end.concept') + ': ' + t('mst.' + (Save.d.mastery.quality || 1))) + '</div><div class="v-m gold">' + fmt(t('end.frag')) + '</div><p class="dim">' + fmt(t('end.cliff')) + '</p>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('end.cont'), 'primary', () => { Panel.close(); }), UI.btn(t('ui.quit'), 'ghost', () => { Panel.close(); Game.toTitle(); }));
    body.appendChild(bar); await UI.fade(0, 500); G.cine = false; Panel.show(Panel.card(t('chapter.end'), body, { close: false, cls: 'wide' }), 'act', () => { Over.x = 27 * 16; Over.y = 13 * 16; });
    HUD.update();
  },
  journal() {
    const steps = ['gateOpen', 'scene2', 'scene3', 'scene4', 'bossDone', 'chapterEnd'], cur = steps.findIndex((s) => !fl(s));
    const main = steps.map((s, i) => ({ k: 'j.' + (i + 1), st: fl(s) ? 'done' : (i === cur ? 'avail' : 'locked') }));
    const side = [{ k: 'pip.sq', st: fl('sq1') ? 'done' : 'avail' }, { k: 'sq2.name', st: fl('sq2') ? 'done' : (fl('scene2') ? 'avail' : 'locked') }, { k: 'sq3.name', st: fl('sq3') ? 'done' : (fl('scene3') ? 'avail' : 'locked') }, { k: 'jr.reh', st: fl('rehDone') ? 'done' : (fl('gateOpen') ? 'avail' : 'locked') }];
    return { main, side };
  },
};

/* ---------- menus ---------- */
const Menus = {
  get open() { return Panel.open && this._m; }, _m: false,
  show(card, cls) { this._m = true; Panel.show(card, cls || '', () => { this._m = false; if (G.mode === 'title') Title.build(); }); },
  back() { if (Panel.open && this._m) { Panel.close(); return true; } return false; },
  confirm(q) {
    return new Promise((res) => { const b = el('div', 'conf', '<p>' + fmt(q) + '</p>'); const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('ui.yes'), 'primary', () => { Panel.close(); res(true); }), UI.btn(t('ui.no'), 'ghost', () => { Panel.close(); res(false); })); b.appendChild(bar); Panel.show(Panel.card(t('ui.settings') === '' ? '' : '?', b, { close: false, cls: 'small' }), ''); });
  },
  pause() {
    if (G.mode !== 'play' || Panel.open || Dlg.active || G.cine) return;
    const b = el('div', 'menu-list');
    [['ui.resume', () => Panel.close()], ['ui.journal', () => this.journal()], ['map.title', () => { Panel.close(); setTimeout(() => Maps.open(), 0); }], ['ui.codex', () => this.codex()], ['ui.settings', () => this.settings()], ['menu.save', () => { Save.d.x = Over.x; Save.d.y = Over.y; Save.write(); UI.toast(t('menu.saved')); }], ['ui.quit', () => { Panel.close(); Game.toTitle(); }]].forEach(([k, fn]) => b.appendChild(UI.btn(t(k), 'menu-b', fn)));
    this.show(Panel.card(t('menu.title'), b, { cls: 'small' })); const f = $('.menu-b', b); f && f.focus();
  },
  journal() {
    const j = Story.journal(), b = el('div', 'journal'); const sec = (title, arr) => '<h3>' + fmt(title) + '</h3><ul>' + arr.map((x) => '<li class="' + x.st + '"><i></i>' + fmt(t(x.k)) + '<span>' + fmt(t('jr.' + (x.st === 'avail' ? 'avail' : x.st === 'done' ? 'done' : 'locked'))) + '</span></li>').join('') + '</ul>';
    b.innerHTML = sec(t('jr.main'), j.main) + sec(t('jr.side'), j.side) + '<h3>' + fmt(t('end.concept')) + '</h3><div class="chip">' + fmt(t('mst.' + (Save.d.mastery.quality || 0))) + '</div>';
    this.show(Panel.card(t('journal.title'), b, { cls: 'wide' }));
  },
  codex() {
    const b = el('div', 'codex'); const ids = CODEX.concat(['quality']);
    b.innerHTML = ids.map((id) => { const on = Save.d.codex.includes(id); return '<div class="cx ' + (on ? 'on' : '') + '"><b>' + fmt(on ? t('cx.' + id + '.term') : '???') + '</b><p>' + fmt(on ? t('cx.' + id + '.body') : t('codex.locked')) + '</p></div>'; }).join('');
    this.show(Panel.card(t('codex.title') + ' (' + Save.d.codex.length + '/' + ids.length + ')', b, { cls: 'wide' }));
  },
  saves() {
    const b = el('div', 'saves');
    if (!Save.has()) { b.innerHTML = '<p class="dim">' + fmt(t('sv.none')) + '</p><p>' + fmt(t('sv.none2')) + '</p>'; this.show(Panel.card(t('sv.title'), b, { cls: 'small' })); return; }
    Save.load(); const d = Save.d;
    b.innerHTML = '<div class="slot"><img alt="" src="' + Portraits.url('hero', 'happy') + '"><div><h3>' + fmt(t('sv.chapter')) + '</h3><p>' + fmt(t('sv.where') + ': ' + t(Room.all[d.room] ? Room.all[d.room].name : 'room.village')) + '</p><p>' + fmt(t('hud.lv') + ' ' + (1 + Math.floor(d.xp / 80)) + ' · ' + d.xp + ' ' + t('ui.xp')) + '</p><p>' + fmt(t('sv.frag') + ': ' + d.fragments + '/6 · ' + t('sv.codex') + ': ' + d.codex.length) + '</p>' + (d.flags.chapterEnd ? '<p class="gold">' + fmt(t('sv.done')) + '</p>' : '') + '</div></div>';
    const bar = el('div', 'tk-bar'); bar.append(UI.btn(t('sv.load'), 'primary', () => { Panel.close(); Game.load(); }), UI.btn(t('sv.del'), 'ghost', async () => { if (await Menus.confirm(t('sv.delq'))) { try { localStorage.removeItem('ml_save'); } catch (e) { /* ignore */ } Save.d = null; Title.build(); } else Menus.saves(); }));
    b.appendChild(bar); this.show(Panel.card(t('sv.title'), b, { cls: 'small' }));
  },
  settings() {
    const b = el('div', 'settings');
    const build = () => {
      b.innerHTML = '';
      const sec = (k) => { const h = el('h3', '', fmt(t(k))); b.appendChild(h); };
      const row = (label, ctrl) => { const r = el('div', 'set-r'); r.appendChild(el('span', 'set-l', fmt(label))); r.appendChild(ctrl); b.appendChild(r); };
      const seg = (opts, key, after) => { const w = el('div', 'seg'); opts.forEach(([v, lab]) => { const x = el('button', 'seg-b' + (Settings[key] === v ? ' sel' : ''), fmt(lab)); x.type = 'button'; x.addEventListener('click', () => { Aud.sfx('click'); Settings[key] = v; saveSettings(); Aud.apply(); UI.relang(); if (after) after(); build(); }); w.appendChild(x); }); return w; };
      const tog = (key) => { const x = el('button', 'tog' + (Settings[key] ? ' on' : ''), fmt(t(Settings[key] ? 'set.on' : 'set.off'))); x.type = 'button'; x.addEventListener('click', () => { Settings[key] = !Settings[key]; saveSettings(); Aud.apply(); UI.relang(); Aud.sfx('click'); build(); }); return x; };
      const slider = (key, mute, test) => { const w = el('div', 'sl'); const r = el('input'); r.type = 'range'; r.min = 0; r.max = 100; r.value = Math.round(Settings[key] * 100); const v = el('b', '', r.value + '%'); r.addEventListener('input', () => { Settings[key] = r.value / 100; v.textContent = r.value + '%'; Aud.apply(); }); r.addEventListener('change', () => { saveSettings(); test && test(); }); const m = el('button', 'tog' + (Settings[mute] ? ' on' : ''), Settings[mute] ? '🔇' : '🔊'); m.type = 'button'; m.setAttribute('aria-label', t('set.mute')); m.addEventListener('click', () => { Settings[mute] = !Settings[mute]; saveSettings(); Aud.apply(); build(); }); w.append(r, v, m); return w; };
      sec('set.lang'); row(t('set.lang'), seg([['en', 'English'], ['ar', 'العربية']], 'lang', () => { }));
      sec('set.sound');
      row(t('set.master'), slider('master', 'muteMaster', () => Aud.sfx('ok'))); row(t('set.music'), slider('music', 'muteMusic')); row(t('set.sfx'), slider('sfx', 'muteSfx', () => Aud.sfx('ok'))); row(t('set.blip'), slider('blip', 'muteBlip', () => { Aud.blip(330); setTimeout(() => Aud.blip(380), 80); }));
      row(t('set.boss'), seg([['full', t('set.boss.full')], ['calm', t('set.boss.calm')], ['off', t('set.boss.off')]], 'bossMusic')); row(t('set.captions'), tog('captions'));
      sec('set.display');
      row(t('set.speed'), seg([['slow', t('set.speed.slow')], ['normal', t('set.speed.normal')], ['instant', t('set.speed.instant')]], 'textSpeed')); row(t('set.size'), seg([['s', t('set.size.s')], ['m', t('set.size.m')], ['l', t('set.size.l')]], 'textSize'));
      row(t('set.contrast'), tog('contrast')); row(t('set.motion'), tog('reduceMotion'));
      b.appendChild(el('p', 'dim', fmt(t('set.note'))));
    };
    build(); UI.refresh.push(() => { }); const card = Panel.card(t('ui.settings'), b, { cls: 'wide' }); this.show(card);
  },
};

/* ---------- game flow ---------- */
const Game = {
  async boot() {
    if (!Settings.lang) { Settings.lang = /^ar/i.test(navigator.language || '') ? 'ar' : 'en'; }
    Room.all = buildRooms(); UI.relang(); Save.load(); if (Save.d) Env.sync(true);
    Aud.stopMusic(); requestAnimationFrame(frame); HUD.build();
    if (TEST && /[?&]skipintro=1/.test(location.search)) { Title.show(); return; }
    await Intro.run(); await UI.fade(1, 1); Title.show(); await UI.fade(0, 600);
  },
  async start() {
    if (Save.has() && !await Menus.confirm(t('ui.confirmNew'))) return;
    await UI.fade(1, 500); Save.new(); Env.sync(true); Aud.sfx('ok');
    const sp = $('#story'); await StoryScreen.playIntro();
  },
  async afterStory() {
    await UI.fade(1, 500); G.mode = 'hold'; document.body.dataset.mode = 'play'; const sp = Room.all.village.spawn;
    G.mode = 'play'; Over.enter('village', sp[0], sp[1], 'up'); HUD.show(true); HUD.update(); await UI.fade(0, 700); await Card.show();
    G.cine = true; await say([L('milo', 'p.1', 'surprised'), L('hero', 'p.2', 'thinking'), L('milo', 'p.3', 'happy'), L('none', 'arr.1'), L('milo', 'arr.2', 'sad'), L('milo', 'milo.hint', 'confident'), L('milo', 'milo.arrow', 'happy')]);
    G.cine = false; Save.set('intro'); HUD.update(); Over.say('finch', '!', 3);
  },
  async load() {
    if (!Save.load()) return; await UI.fade(1, 400); Title.hide(); Env.sync(true); G.mode = 'play'; document.body.dataset.mode = 'play';
    const d = Save.d; if (!Room.all[d.room]) { d.room = 'village'; d.x = 232; d.y = 288; } Over.enter(d.room, (d.x || 232) / 16, (d.y || 288) / 16, 'down'); HUD.show(true); HUD.update(); await UI.fade(0, 600);
    if (!d.flags.intro) { await this.afterStory(); }
  },
  async toTitle() { await UI.fade(1, 400); HUD.show(false); G.mode = 'title'; Panel.open && Panel.close(); Title.show(); await UI.fade(0, 500); },
};
StoryScreen.playIntro = async function () {
  const p = this.play(); await UI.fade(0, 600); await p; await Game.afterStory();
};
