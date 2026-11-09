'use strict';
/* ===== engine.js: UI layers, dialogue, scenes, overworld ===== */
const stage = $('#stage'), cv = $('#cv'), cx = cv.getContext('2d');
const buf = mkc(320, 240), bg = buf.getContext('2d');
cx.imageSmoothingEnabled = false; bg.imageSmoothingEnabled = false;
const G = { mode: 'boot', t: 0, cine: false, last: 0 };
function fit() { const w = Math.min(innerWidth, innerHeight * 4 / 3); stage.style.width = w + 'px'; stage.style.height = (w * 3 / 4) + 'px'; stage.style.setProperty('--u', (w / 640) + 'px'); }
addEventListener('resize', fit); fit();
const FAST = TEST ? 0.04 : 1;
const ASYNC = (ms) => sleep(ms * FAST);

/* ---------- UI helpers ---------- */
const UI = {
  refresh: [],
  relang() {
    const ar = isAr(), d = document.documentElement;
    d.lang = ar ? 'ar' : 'en'; d.dir = ar ? 'rtl' : 'ltr';
    const b = document.body.classList;
    b.toggle('ar', ar); b.toggle('hc', !!Settings.contrast); b.toggle('rm', !!Settings.reduceMotion);
    b.remove('sz-s', 'sz-m', 'sz-l'); b.add('sz-' + (Settings.textSize || 'm'));
    this.refresh.forEach((f) => f());
  },
  toast(msg) {
    const e = el('div', 'toastm', fmt(msg)); $('#toast').appendChild(e);
    setTimeout(() => e.classList.add('out'), 2600 * (TEST ? 0.3 : 1)); setTimeout(() => e.remove(), 3200 * (TEST ? 0.3 : 1));
    while ($('#toast').children.length > 3) $('#toast').firstChild.remove();
  },
  caption(txt) { const c = $('#cap'); c.textContent = txt; c.classList.add('on'); clearTimeout(this._ct); this._ct = setTimeout(() => c.classList.remove('on'), 1400); },
  fade(to, ms) {
    const f = $('#fade'); f.style.transitionDuration = (ms * FAST) + 'ms'; f.style.opacity = to;
    return sleep(ms * FAST + 20);
  },
  prompt(txt) { const p = $('#prompt'); if (txt) { p.innerHTML = '<kbd>' + t('hud.act') + '</kbd> ' + fmt(txt); p.classList.add('on'); } else p.classList.remove('on'); },
  btn(txt, cls, fn) { const b = el('button', 'btn ' + (cls || ''), fmt(txt)); b.type = 'button'; if (fn) b.addEventListener('click', () => { Aud.sfx('click'); fn(b); }); return b; },
};
UIHook.toast = (m) => UI.toast(m);
UIHook.caption = (c) => UI.caption(c);

/* ---------- HUD ---------- */
const HUD = {
  built: false,
  build() {
    const h = $('#hud');
    h.innerHTML = '<div class="hud-card"><canvas class="hud-av" width="48" height="48"></canvas><div class="hud-info"><div class="hud-lv"></div><div class="xpbar"><i></i></div><div class="frags"></div></div></div>' +
      '<div class="hud-loc"></div><div class="hud-quest"><b></b><span></span></div><div class="hud-keys"></div><button class="hud-menu" type="button" aria-label="Menu">☰</button>';
    const av = $('.hud-av'), g = av.getContext('2d'); g.imageSmoothingEnabled = false; g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high'; g.drawImage(Portraits.get('hero', 'happy'), 0, 0, 48, 48);
    $('.hud-menu').addEventListener('click', () => Menus.pause());
    this.built = true; this.update();
  },
  show(on) { $('#hud').classList.toggle('on', !!on); },
  update() {
    if (!this.built || !Save.d) return;
    const xp = Save.d.xp, lv = 1 + Math.floor(xp / 80);
    $('.hud-lv').innerHTML = fmt(t('hud.lv') + ' ' + lv + ' · ' + xp + ' ' + t('ui.xp'));
    $('.xpbar i').style.width = ((xp % 80) / 80 * 100) + '%';
    $('.frags').innerHTML = Array.from({ length: 6 }, (_, i) => '<s class="' + (i < Save.d.fragments ? 'lit' : '') + '"></s>').join('');
    $('.hud-keys').innerHTML = fmt(t('hud.keys'));
    $('.hud-loc').innerHTML = Over.room ? fmt(t(Over.room.name)) : '';
    const q = Quest.objective();
    $('.hud-quest b').innerHTML = fmt(t('hud.main')); $('.hud-quest span').innerHTML = q ? fmt(q.text) : '';
    $('.hud-quest').style.display = q ? '' : 'none';
  },
};
UIHook.hud = () => HUD.update();
UI.refresh.push(() => HUD.update());

/* ---------- panels ---------- */
const Panel = {
  open: false, onclose: null,
  show(node, cls, onclose) { const p = $('#panel'); p.innerHTML = ''; p.className = 'on ' + (cls || ''); p.appendChild(node); this.open = true; this.onclose = onclose || null; },
  close() { const p = $('#panel'); p.className = ''; p.innerHTML = ''; this.open = false; const f = this.onclose; this.onclose = null; if (document.activeElement) document.activeElement.blur(); if (f) f(); },
  card(title, body, opts) {
    opts = opts || {};
    const n = el('div', 'pnl ' + (opts.cls || ''));
    const head = el('div', 'pnl-h'); head.appendChild(el('h2', '', fmt(title)));
    if (opts.close !== false) { const x = el('button', 'pnl-x', '✕'); x.type = 'button'; x.setAttribute('aria-label', t('ui.close')); x.addEventListener('click', () => { Aud.sfx('click'); Panel.close(); }); head.appendChild(x); }
    n.appendChild(head); const b = el('div', 'pnl-b'); if (typeof body === 'string') b.innerHTML = body; else b.appendChild(body); n.appendChild(b);
    return n;
  },
};

/* ---------- dialogue ---------- */
const BLIP = { keeper: 200, seeker: 290, sagee: 150, sagep: 350, nullc: 420, ferry1: 170, ferry2: 230, lag: 120, core: 520, lin: 310, sage1: 160, sage2: 360, rote: 110, citizen: 250, nara: 300, tarn: 220, sera: 340, rowan: 150, tumble: 270, bulk: 100, fern: 200, qtree: 170, sylvan: 240, oak: 140, fanatic: 280, hero: 330, milo: 560, finch: 180, pip: 430, luma: 300, wren: 240, misprint: 130, tess: 400, orin: 150, bramm: 110, cheater: 260, student: 380 };
const EMO_OF = { surprised: '!', happy: 'note', thinking: '?', sad: 'sweat', angry: 'anger', confident: 'star', determined: 'star' };
function L(w, k, x) { return { w: w, k: k, x: x || 'neutral' }; }
function partial(html, n) {
  let out = '', cnt = 0, i = 0; const stack = [];
  while (i < html.length && cnt < n) {
    const ch = html[i];
    if (ch === '<') { const j = html.indexOf('>', i), tag = html.slice(i, j + 1); out += tag; if (tag[1] === '/') stack.pop(); else stack.push(tag.match(/^<(\w+)/)[1]); i = j + 1; }
    else if (ch === '&') { const j = html.indexOf(';', i); out += html.slice(i, j + 1); cnt++; i = j + 1; }
    else { out += ch; cnt++; i++; }
  }
  while (stack.length) out += '</' + stack.pop() + '>';
  return { html: out, done: i >= html.length };
}
const Dlg = {
  active: false, choosing: false, q: [], i: 0, typing: false, timer: null, sel: 0,
  say(lines) {
    return new Promise((res) => { this.q = lines.filter(Boolean); this.i = 0; this.res = res; this.active = true; UI.prompt(null); $('#dlg').className = 'on'; this.next(); });
  },
  next() { if (this.i >= this.q.length) { this.close(); return; } this.render(this.q[this.i++]); },
  close() { this.active = false; this.typing = false; clearInterval(this.timer); $('#dlg').className = ''; $('#dlg').innerHTML = ''; const r = this.res; this.res = null; if (r) r(); },
  render(ln) {
    const who = ln.w || 'none', txt = ln.txt != null ? ln.txt : t(ln.k), side = who === 'hero' ? 'r' : 'l', nm = who === 'none' ? '' : t(who === 'hero' ? 'spk.you' : 'spk.' + who);
    const d = $('#dlg'), exp = ln.x || 'neutral';
    d.innerHTML = '<div class="dbox ' + side + (who === 'none' ? ' nar' : '') + '">' + (who === 'none' ? '' : '<div class="dport"><img alt="" src="' + Portraits.url(who, exp) + '"></div>') +
      '<div class="dmain">' + (nm ? '<div class="dname">' + fmt(nm) + '</div>' : '') + '<div class="dtext"></div><div class="dnext">▼</div></div></div>';
    d.querySelector('.dbox').addEventListener('click', () => this.advance());
    const tx = d.querySelector('.dtext'), html = fmt(txt), speed = Settings.textSpeed === 'instant' || TEST ? 0 : Settings.textSpeed === 'slow' ? 34 : 17;
    if (typeof Over !== 'undefined' && Over.react) Over.react(who, exp);
    if (!speed) { tx.innerHTML = html; this.typing = false; d.querySelector('.dnext').classList.add('on'); return; }
    let n = 0; this.typing = true; this.full = html; const port = d.querySelector('.dport');
    port && port.classList.add('talk'); clearInterval(this.timer);
    this.timer = setInterval(() => {
      n += 1; const p = partial(html, n); tx.innerHTML = p.html;
      if (n % 2 === 0 && txt[n] && txt[n] !== ' ') Aud.blip((BLIP[who] || 260) + (n % 3) * 18);
      if (p.done) { clearInterval(this.timer); this.typing = false; port && port.classList.remove('talk'); const nx = d.querySelector('.dnext'); nx && nx.classList.add('on'); }
    }, speed);
  },
  advance() {
    if (this.choosing) return;
    if (this.typing) { clearInterval(this.timer); this.typing = false; const d = $('#dlg'), tx = d.querySelector('.dtext'); if (tx) tx.innerHTML = this.full; const p = d.querySelector('.dport'); p && p.classList.remove('talk'); const nx = d.querySelector('.dnext'); nx && nx.classList.add('on'); return; }
    Aud.sfx('click'); this.next();
  },
  /* ask the player to choose. opts: [{k|txt}] returns index */
  choose(opts, line) {
    return new Promise((res) => {
      this.active = true; this.choosing = true; this.sel = 0; UI.prompt(null);
      const d = $('#dlg'); d.className = 'on';
      const who = line && line.w ? line.w : 'none', side = who === 'hero' ? 'r' : 'l';
      d.innerHTML = '<div class="dbox ch ' + side + (who === 'none' ? ' nar' : '') + '">' + (who === 'none' ? '' : '<div class="dport"><img alt="" src="' + Portraits.url(who, (line && line.x) || 'neutral') + '"></div>') + '<div class="dmain">' + (line ? '<div class="dtext">' + fmt(line.txt != null ? line.txt : t(line.k)) + '</div>' : '') + '<div class="dchoices"></div></div></div>';
      const box = d.querySelector('.dchoices'), btns = opts.map((o, i) => { const b = el('button', 'btn ch', fmt(o.txt != null ? o.txt : t(o.k))); b.type = 'button'; b.addEventListener('click', () => pick(i)); box.appendChild(b); return b; });
      const mark = () => btns.forEach((b, i) => b.classList.toggle('sel', i === this.sel));
      const pick = (i) => { Aud.sfx('click'); this.choosing = false; this.pick = null; this.move = null; this.close(); res(i); };
      this.pick = () => pick(this.sel); this.move = (dd) => { this.sel = (this.sel + dd + btns.length) % btns.length; mark(); };
      mark();
    });
  },
};

/* ---------- logo intro ---------- */
function logoSVG(cls, live) {
  /* iP + upil sit tight together: the gap between every glyph is the same small, even spacing */
  const I = '#1F1F1F', Y = '#F4B223', C = '#FAF7EE', sh = live ? '' : '';
  return '<svg class="' + (cls || 'logo-svg') + (live ? ' live' : '') + '" viewBox="0 0 484 230" aria-label="iPupil"><defs><linearGradient id="sheen' + (live ? 'L' : '') + '" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
    '<g transform="translate(8 0)">' +
    '<g class="lg g1"><rect x="18" y="92" width="34" height="76" rx="17" fill="' + I + '"/><circle class="dot" cx="35" cy="56" r="19" fill="' + Y + '"/></g>' +
    '<g transform="translate(-12 0)"><g class="lg g2"><rect x="74" y="48" width="40" height="122" rx="20" fill="' + I + '"/><circle cx="142" cy="96" r="54" fill="' + I + '"/><circle cx="146" cy="96" r="31" fill="' + C + '"/>' +
    '<g class="pupil"><circle cx="150" cy="96" r="17" fill="' + I + '"/><circle cx="156" cy="89" r="5.5" fill="' + C + '"/><circle cx="144" cy="104" r="2.4" fill="' + C + '" opacity=".7"/></g><ellipse class="lid" cx="146" cy="96" rx="32" ry="32" fill="' + I + '"/></g></g>' +
    '<g transform="translate(-33 0)"><g class="lg g3" fill="none" stroke="' + I + '" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"><path d="M236 108 V138 a30 30 0 0 0 60 0 M296 108 V168"/></g>' +
    '<g class="lg g4" fill="none" stroke="' + I + '" stroke-width="34" stroke-linecap="round"><path d="M336 108 V208"/><circle cx="368" cy="138" r="30"/></g>' +
    '<g class="lg g5"><path d="M432 108 V168" stroke="' + I + '" stroke-width="34" stroke-linecap="round"/><circle cx="432" cy="62" r="19" fill="' + I + '"/></g>' +
    '<g class="lg g6"><path d="M486 40 V168" stroke="' + I + '" stroke-width="34" stroke-linecap="round"/></g></g>' +
    '<path class="spark" d="M184 14 L189 30 L205 35 L189 40 L184 56 L179 40 L163 35 L179 30 Z" fill="' + Y + '"/>' +
    '<rect class="sheen" x="-80" y="30" width="70" height="190" fill="url(#sheen' + (live ? 'L' : '') + ')" transform="skewX(-18)"/></g></svg>';
}
const Intro = {
  done: null, skipped: false,
  run() {
    return new Promise((res) => {
      G.mode = 'logo'; document.body.dataset.mode = 'logo'; this.skipped = false; this.done = res;
      const L = $('#logo'); L.className = 'on';
      L.innerHTML = '<div class="lg-bg"><i class="qc q1"></i><i class="qc q2"></i><i class="qc q3"></i><i class="qc q4"></i></div><div class="lg-wrap">' + logoSVG() + '<div class="lg-line"></div><div class="lg-pres">' + fmt(t('logo.pres')) + '</div></div>';
      this.timer = setTimeout(() => this.finish(), TEST ? 300 : 6400);
      L.addEventListener('pointerdown', () => this.skip(), { once: true });
    });
  },
  skip() { if (G.mode === 'logo') { this.finish(); } },
  finish() {
    if (this.skipped) return; this.skipped = true; clearTimeout(this.timer);
    const L = $('#logo'); L.classList.add('out'); setTimeout(() => { L.className = ''; L.innerHTML = ''; const r = this.done; this.done = null; r && r(); }, TEST ? 30 : 700);
  },
};

/* ---------- scene art (title + story), drawn on 320x240 ---------- */
const CORE_COL = { ok: ['#fff9d0', '#ffd24a', '#d98a1a', '#7a3c10'], dim: ['#c4cce4', '#7c88aa', '#454e70', '#1e2438'], crack: ['#ffd8c4', '#ff7a5a', '#c03828', '#5a1414'] };
const CORE_CACHE = {};
function coreSprite(mode, fi, px) {
  const key = mode + fi + '_' + px; if (CORE_CACHE[key]) return CORE_CACHE[key];
  const K = 8, S = 120, hi = mkc(S * K, S * K), g = hi.getContext('2d'); g.scale(K, K); g.lineJoin = 'round';
  const C = CORE_COL[mode] || CORE_COL.ok, ph = fi / 24 * 6.2832, bob = Math.sin(ph) * 1.8, cx = 60, cy = 60;
  /* orbit shards: back half first */
  const SC = ['#ffd24a', '#6ff3ff', '#ff6bd6', '#7fe08a', '#ff9a4a', '#6a8aff'].map((c) => mode === 'dim' ? mix(c, '#3a4060', 0.6) : c);
  const shard = (i, front) => { const th = ph + i * 1.0472, sx = cx + Math.cos(th) * 54, sy = cy + 6 + Math.sin(th) * 17 + bob * 0.5; if ((Math.sin(th) > 0) !== front) return; bzF(g, bzG([[sx, sy - 6], [sx + 3.6, sy], [sx, sy + 6], [sx - 3.6, sy]]), SC[i], { l: 0.5, lw: 1 }); g.fillStyle = 'rgba(255,255,255,.8)'; g.fillRect(sx - 0.8, sy - 2.6, 1.6, 1.6); };
  for (let i = 0; i < 6; i++) shard(i, false);
  /* outer toothed gear ring */
  const gp = { p: (gg) => { const n = 12, r1 = 47, r2 = 41, a0 = -ph / 12; for (let i = 0; i < n; i++) { const a = a0 + i / n * 6.2832, w = 6.2832 / n; [[a - w * 0.32, r2], [a - w * 0.2, r1], [a + w * 0.2, r1], [a + w * 0.32, r2]].forEach((q, k) => { const X = cx + Math.cos(q[0]) * q[1], Y = cy + 4 + Math.sin(q[0]) * q[1] * 0.0 + Math.sin(q[0]) * q[1]; (i === 0 && k === 0) ? gg.moveTo(X, Y) : gg.lineTo(X, Y); }); } gg.closePath(); gg.moveTo(cx + 34, cy + 4); gg.arc(cx, cy + 4, 34, 0, 6.2832, true); }, b: [13, 17, 107, 111] };
  g.save(); g.translate(0, bob * 0.4); bzF(g, gp, mode === 'dim' ? '#6a7090' : '#c99230', { l: 0.4, lw: 1.6 });
  /* inner rune ring */
  g.strokeStyle = mode === 'dim' ? '#8a92b0' : '#ffe9a0'; g.lineWidth = 1.2; g.beginPath(); g.ellipse(cx, cy + 4, 30, 30, 0, 0, 7); g.stroke();
  for (let i = 0; i < 16; i++) { const a = ph / 8 * -1 + i / 16 * 6.2832, r0 = 26, r1 = i % 2 ? 28.5 : 30; g.beginPath(); g.moveTo(cx + Math.cos(a) * r0, cy + 4 + Math.sin(a) * r0); g.lineTo(cx + Math.cos(a) * r1, cy + 4 + Math.sin(a) * r1); g.strokeStyle = i % 4 === 0 ? (mode === 'crack' ? '#ff9a7a' : '#6ff3ff') : '#ffe9a0'; g.lineWidth = i % 4 === 0 ? 2 : 1; g.stroke(); }
  g.restore();
  /* faceted crystal */
  g.save(); g.translate(0, bob);
  const T = [60, 14], L = [37, 58], R = [83, 58], B = [60, 108], M = [60, 62], Lm = [49, 60], Rm = [71, 60];
  const fac = (pts, col, o) => bzF(g, bzG(pts), col, Object.assign({ l: 0.08, d: -0.18, lw: 1.3 }, o));
  fac([T, L, Lm], C[0]); fac([T, Lm, M, Rm], mix(C[0], C[1], 0.45)); fac([T, Rm, R], C[1]); fac([L, B, M, Lm], C[2]); fac([Lm, M, B], mix(C[1], C[2], 0.5)); fac([M, Rm, B], C[2], { d: -0.3 }); fac([Rm, R, B], C[3], { d: -0.2 });
  const ig = g.createRadialGradient(60, 60, 1, 60, 60, 18); ig.addColorStop(0, 'rgba(255,255,255,.95)'); ig.addColorStop(0.5, 'rgba(255,255,255,.35)'); ig.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = ig; g.fillRect(40, 40, 40, 40);
  g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(T[0], T[1] + 3); g.lineTo(Lm[0], Lm[1] - 1); g.moveTo(T[0], T[1] + 3); g.lineTo(Rm[0], Rm[1] - 1); g.stroke();
  g.fillStyle = '#fff'; g.beginPath(); g.moveTo(47, 34); g.lineTo(50, 28); g.lineTo(52, 34); g.lineTo(50, 40); g.closePath(); g.fill();
  if (mode === 'crack') { g.strokeStyle = '#3a0808'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(60, 14); g.lineTo(56, 34); g.lineTo(64, 46); g.lineTo(55, 64); g.lineTo(63, 84); g.lineTo(58, 106); g.stroke(); g.strokeStyle = '#ffb090'; g.lineWidth = 0.8; g.stroke(); }
  g.restore();
  for (let i = 0; i < 6; i++) shard(i, true);
  const o = bzPix(hi, px, px, 10); CORE_CACHE[key] = o; return o;
}
const Scn = {
  rect(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); },
  sky(g, stops, y0, y1) { y0 = y0 || 0; y1 = y1 || 240; for (let y = y0; y < y1; y += 4) { const k = (y - y0) / (y1 - y0); let i = 0; while (i < stops.length - 2 && k > stops[i + 1][0]) i++; const a = stops[i], b = stops[i + 1], kk = Math.max(0, Math.min(1, (k - a[0]) / (b[0] - a[0]))); this.rect(g, 0, y, 320, 4, mix(a[1], b[1], kk)); } },
  stars(g, t, n, seed, ymax) { for (let i = 0; i < n; i++) { const x = hash(i, seed, 1) * 320, y = hash(i, seed, 2) * (ymax || 140), tw = Math.sin(t * 2 + i * 1.7); if (tw > -0.3) this.rect(g, x, y, tw > 0.7 ? 2 : 1, tw > 0.7 ? 2 : 1, tw > 0.4 ? '#ffffff' : '#b9b3e6'); } },
  cloud(g, x, y, w, c) { this.rect(g, x + 4, y, w - 8, 4, c); this.rect(g, x, y + 3, w, 4, c); this.rect(g, x + 6, y + 6, w - 12, 3, shade(c, -0.08)); },
  hills(g, base, amp, col, seed, ph) { for (let x = 0; x < 320; x += 2) { const h = base + Math.sin((x + ph) * 0.02 + seed) * amp + Math.sin((x + ph) * 0.05 + seed * 2) * amp * 0.4; this.rect(g, x, h, 2, 240 - h, col); } },
  core(g, x, y, t, mode, r) {
    r = r || 22; const gl = mode === 'dim' ? 0.22 : 0.55 + Math.sin(t * 3) * 0.1, warm = mode === 'crack' ? '255,120,90' : mode === 'dim' ? '150,170,220' : '255,226,120';
    const gr = g.createRadialGradient(x, y, 2, x, y, r * 3.2); gr.addColorStop(0, 'rgba(' + warm + ',' + gl + ')'); gr.addColorStop(0.45, 'rgba(' + warm + ',' + gl * 0.28 + ')'); gr.addColorStop(1, 'rgba(' + warm + ',0)'); g.fillStyle = gr; g.fillRect(x - r * 3.4, y - r * 3.4, r * 6.8, r * 6.8);
    if (mode !== 'dim') { g.save(); g.globalAlpha = 0.14 + Math.sin(t * 2) * 0.03; g.fillStyle = 'rgb(' + warm + ')'; for (let k = 0; k < 10; k++) { const a = t * 0.15 + k * 0.628, w = 0.07; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a - w) * r * 4, y + Math.sin(a - w) * r * 4); g.lineTo(x + Math.cos(a + w) * r * 4, y + Math.sin(a + w) * r * 4); g.fill(); } g.restore(); }
    const px = Math.round(r * 3.1), fi = Math.floor(t * 10) % 24, sp = coreSprite(mode, fi, px); g.drawImage(sp, Math.round(x - sp.width / 2), Math.round(y - sp.height / 2));
  },
  island(g, x, y, w, col, grass) { const h = w * 0.45; for (let k = 0; k < h; k += 2) { const ww = w * Math.pow(1 - k / h, 0.75); this.rect(g, x - ww / 2, y + k, ww, 2, mix(col || '#6a5a7a', '#2a2036', k / h)); } this.rect(g, x - w / 2, y - 3, w, 4, grass || '#7ad36a'); this.rect(g, x - w / 2 + 2, y - 4, w - 4, 2, shade(grass || '#7ad36a', 0.25)); },
  town(g, x, y, seed, dark) {
    const wall = dark ? ['#5a4a7a', '#6a5a8a', '#4a3a68'] : ['#f6e8c8', '#f0d8a8', '#ead0b0'], roof = dark ? ['#3a2a58', '#4a2a50', '#40305a'] : ['#d8603a', '#b84a4a', '#c8803a'], lit = dark ? '#2a2040' : '#ffd878';
    for (let k = 0; k < 6; k++) { const w = 12 + Math.floor(hash(k, seed, 1) * 10), h = 14 + Math.floor(hash(k, seed, 2) * 22), bx = x - 52 + k * 17 + Math.floor(hash(k, seed, 3) * 3), c = wall[k % 3];
      this.rect(g, bx, y - h, w, h, c); this.rect(g, bx, y - h, w, 2, shade(c, 0.2)); this.rect(g, bx + w - 3, y - h, 3, h, shade(c, -0.14));
      if (k % 3 === 1) { g.fillStyle = roof[k % 3]; g.beginPath(); g.arc(bx + w / 2, y - h, w / 2 + 1, Math.PI, 0); g.fill(); this.rect(g, bx + w / 2 - 1, y - h - w / 2 - 5, 2, 5, '#e6c04a'); }
      else { g.fillStyle = roof[k % 3]; g.beginPath(); g.moveTo(bx - 2, y - h); g.lineTo(bx + w / 2, y - h - 8); g.lineTo(bx + w + 2, y - h); g.fill(); this.rect(g, bx + w - 4, y - h - 10, 3, 6, shade(roof[k % 3], -0.2)); }
      for (let j = 4; j < h - 3; j += 7) { this.rect(g, bx + 2, y - h + j, 3, 3, lit); if (w > 11) this.rect(g, bx + w - 7, y - h + j, 3, 3, lit); } }
    [[-62, 0.8], [58, 1]].forEach(([dx, s_]) => { this.rect(g, x + dx - 1, y - 8 * s_, 2, 8 * s_, '#5a3a22'); g.fillStyle = dark ? '#2a4a4a' : '#4aa85a'; g.beginPath(); g.arc(x + dx, y - 12 * s_, 7 * s_, 0, 7); g.fill(); g.fillStyle = dark ? '#3a5a5a' : '#6cc86a'; g.beginPath(); g.arc(x + dx - 2, y - 14 * s_, 4 * s_, 0, 7); g.fill(); });
  },
  falls(g, x, y, h, t) { this.rect(g, x, y, 4, h, 'rgba(180,230,255,.75)'); for (let k = 0; k < 5; k++) this.rect(g, x + 1, y + ((t * 40 + k * 17) % h), 2, 4, 'rgba(255,255,255,.9)'); },
  tower(g, x, y, w, h, col, lit) { this.rect(g, x, y - h, w, h, col); this.rect(g, x - 1, y - h, w + 2, 2, shade(col, 0.2)); for (let j = 4; j < h - 3; j += 7) { this.rect(g, x + 2, y - h + j, 2, 3, lit); if (w > 8) this.rect(g, x + w - 4, y - h + j, 2, 3, lit); } },
  cine(g, t, i) {
    /* cinematic finish: drifting particles per scene, vignette, letterbox bars, fade-in */
    const kinds = [['#fff3b0', 38, 0], ['#ffffff', 30, 1], ['#ff7a5a', 46, 2], ['#c8c8d0', 34, 3], ['#ffe9a0', 44, 4], ['#9fffe0', 40, 5]], [col, n, sd] = kinds[Math.min(i, 5)];
    for (let k = 0; k < n; k++) { const fall = i === 2 || i === 3, x = (hash(k, sd, 1) * 340 + t * (fall ? 6 : 9) * (0.5 + hash(k, sd, 5))) % 340 - 10, y = fall ? (hash(k, sd, 2) * 260 + t * (10 + k % 9)) % 250 - 5 : 20 + hash(k, sd, 2) * 190 + Math.sin(t * 1.2 + k) * 5, tw = 0.5 + 0.5 * Math.sin(t * 2.2 + k * 1.7); g.fillStyle = col; g.globalAlpha = 0.25 + tw * 0.6; g.fillRect(Math.round(x), Math.round(y), 1 + (k % 4 === 0), 1 + (k % 4 === 0)); }
    g.globalAlpha = 1; const vg = g.createRadialGradient(160, 120, 70, 160, 120, 210); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(6,0,18,.5)'); g.fillStyle = vg; g.fillRect(0, 0, 320, 240);
    const b = Math.min(1, t / 0.6) * 12; g.fillStyle = '#05020c'; g.fillRect(0, 0, 320, b); g.fillRect(0, 240 - b, 320, b);
    const f = Math.max(0, 1 - t / 0.7); if (f > 0) { g.fillStyle = 'rgba(0,0,0,' + f + ')'; g.fillRect(0, 0, 320, 240); }
  },
  sprite(g, c, x, y, s) { g.drawImage(c, Math.round(x), Math.round(y), c.width * s, c.height * s); },
  title(g, t) {
    this.sky(g, [[0, '#120a3a'], [0.45, '#5b2a8a'], [0.7, '#d4527a'], [1, '#ffb07a']]);
    this.stars(g, t, 70, 7, 110);
    this.cloud(g, (t * 6) % 380 - 50, 40, 60, 'rgba(255,170,200,0.35)'); this.cloud(g, (t * 4 + 160) % 380 - 50, 68, 80, 'rgba(255,190,220,0.3)');
    this.core(g, 232, 54, t, 'ok', 26);
    this.island(g, 232, 112, 92, '#6a5a8a', '#8fd36a'); this.tower(g, 214, 109, 10, 18, '#8a7aa8', '#ffe9a0'); this.tower(g, 226, 109, 14, 24, '#a090c0', '#ffe9a0'); this.tower(g, 246, 109, 10, 14, '#8a7aa8', '#ffe9a0');
    this.island(g, 120, 90, 38, '#6a5a8a', '#8fd36a'); this.tower(g, 114, 88, 6, 12, '#a090c0', '#ffe9a0'); this.island(g, 296, 120, 30, '#6a5a8a', '#8fd36a');
    this.hills(g, 150, 10, '#5a2c78', 1, t * 2); this.hills(g, 172, 8, '#3d1e60', 3, t * 4);
    this.hills(g, 198, 5, '#24123f', 5, 0);
    this.ledge(g, t);
    for (let i = 0; i < 14; i++) { const x = (hash(i, 4, 8) * 320 + t * (4 + i)) % 330, y = 170 + hash(i, 4, 9) * 60 + Math.sin(t * 2 + i) * 3; this.rect(g, x, y, 1, 1, i % 2 ? '#ffe9a0' : '#9fffe0'); }
    /* both heroes stand on the grass, facing the viewer */
    const bob = Math.round(Math.sin(t * 2.4) * 1);
    Sprites.draw(g, 'milo', 'down', 0, 40, 222 + bob, 2.6);
    Sprites.draw(g, 'hero', 'down', 0, 86, 224, 2.7);
    this.rect(g, 20, 196, 2, 2, '#ffe27a'); this.rect(g, 96, 196, 2, 2, '#ff9ac0'); this.rect(g, 30, 197, 2, 2, '#fff');
  },
  /* the grassy cliff edge on the title screen */
  ledge(g, t) {
    g.save(); g.fillStyle = '#3c2548'; g.fillRect(0, 206, 320, 34);
    g.fillStyle = '#4a8a4a'; g.fillRect(0, 202, 320, 8); g.fillStyle = '#6fc260'; g.fillRect(0, 202, 320, 4); g.fillStyle = '#9fe080'; g.fillRect(0, 202, 320, 1);
    for (let k = 0; k < 40; k++) { const x = 4 + k * 8, ln = 3 + (k * 5) % 6, sw = Math.sin(t * 1.5 + k) * 1; g.fillStyle = '#5fae5a'; g.fillRect(x + sw, 206 + ((k * 3) % 4), 2, ln); }
    g.fillStyle = '#2a1838'; for (let k = 0; k < 12; k++) g.fillRect((k * 29) % 300 + 4, 220 + (k % 3) * 6, 14 + (k % 3) * 8, 2);
    g.restore();
  },
  /* the hero, seated on the cliff edge in profile, legs dangling; composed from the hi-res side-view art */
  sitHero(g, x, y, s, t) {
    const h = Art.ready && Art.hi.heroright0; if (!h) { Sprites.draw(g, 'hero', 'right', 0, x, y + 14, s); return; }
    const k = (ART.hero.ch / ART.hi.hero.ch) * s, ax = ART.hi.hero.ax, HIP = 100, KNEE = 118, sm = g.imageSmoothingEnabled, br = Math.sin(t * 1.6) * 0.5, sw = Math.sin(t * 2.1) * 0.16;
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    const len = (KNEE - HIP) * k;
    g.save(); g.translate(x, y - 2 * k); g.rotate(-Math.PI / 2); g.drawImage(h, 0, HIP, h.width, KNEE - HIP, -ax * k, 0, h.width * k, len); g.restore();
    g.save(); g.translate(x + len, y - 2 * k); g.rotate(sw); g.drawImage(h, 0, KNEE - 2, h.width, h.height - KNEE + 2, -ax * k, -2 * k, h.width * k, (h.height - KNEE + 2) * k); g.restore();
    g.drawImage(h, 0, 0, h.width, HIP + 2, Math.round(x - ax * k), Math.round(y - (HIP + 2) * k + br), h.width * k, (HIP + 2) * k);
    g.imageSmoothingEnabled = sm;
  },
  story(g, i, t) {
    const R = (x, y, w, h, c) => this.rect(g, x, y, w, h, c);
    if (i === 0) { /* golden age */
      this.sky(g, [[0, '#7ec8f0'], [0.6, '#cfeaff'], [1, '#ffe9b8']]); this.cloud(g, (t * 8) % 380 - 50, 30, 70, '#ffffff'); this.cloud(g, (t * 5 + 130) % 380 - 50, 76, 56, '#ffffff');
      for (let k = 0; k < 8; k++) { const a = -0.2 + k * 0.1; g.save(); g.globalAlpha = 0.12; g.fillStyle = '#fff3b0'; g.beginPath(); g.moveTo(160, 80); g.lineTo(160 + Math.cos(a + 1.1) * 300, 80 + Math.sin(a + 1.1) * 300); g.lineTo(160 + Math.cos(a + 1.17) * 300, 80 + Math.sin(a + 1.17) * 300); g.fill(); g.restore(); }
      [[34, 96, 44], [286, 80, 40], [250, 128, 28]].forEach(([x, y, w], n) => { const yy = y + Math.sin(t * 0.8 + n) * 2; this.island(g, x, yy, w, '#8a7a6a', '#8fe070'); this.rect(g, x - 2, yy - 10, 4, 10, '#f6e8c8'); this.rect(g, x - 3, yy - 13, 6, 3, '#d8603a'); this.falls(g, x + w * 0.2, yy + 4, 26, t + n); });
      this.island(g, 160, 150, 160, '#8a7a6a', '#8fe070'); this.falls(g, 218, 154, 34, t); this.town(g, 160, 148, 3, false);
      this.core(g, 160, 94, t, 'ok', 26);
      for (let b = 0; b < 4; b++) { const x = (t * 20 + b * 80) % 360 - 20, y = 40 + b * 18 + Math.sin(t * 3 + b) * 4, f = Math.floor(t * 6 + b) % 2; R(x, y + f, 3, 1, '#4a3a5a'); R(x + 3, y + 1 - f, 3, 1, '#4a3a5a'); }
      this.hills(g, 205, 6, '#7ad36a', 2, t * 2); this.hills(g, 225, 4, '#5cb85c', 4, 0);
    } else if (i === 1) { /* everything works */
      this.sky(g, [[0, '#a9d8ff'], [1, '#fff1d0']]); this.cloud(g, (t * 6) % 380 - 50, 24, 60, '#fff');
      const nodes = [[60, 150, '#7ad36a', 'farm'], [260, 150, '#c8a2ff', 'lib'], [160, 190, '#e0b84a', 'gate']];
      nodes.forEach(([x, y, c, k], n) => {
        for (let d = 0; d < 9; d++) { const p = ((t * 0.5 + d / 9 + n * 0.3) % 1); R(160 + (x - 160) * p, 70 + (y - 70) * p, 2, 2, '#fff3b0'); }
        this.island(g, x, y, 64, '#8a7a6a', c);
        if (k === 'farm') { for (let r = 0; r < 3; r++) for (let q = 0; q < 4; q++) { R(x - 22 + q * 11, y - 10 + r * 4, 3, 3 + Math.round(Math.sin(t * 2 + q) * 1), '#2f9a3a'); R(x - 22 + q * 11, y - 12 + r * 4, 3, 2, '#ff6b4a'); } }
        if (k === 'lib') { R(x - 18, y - 22, 36, 20, '#b98c58'); R(x - 20, y - 26, 40, 5, '#7a4a28'); for (let q = 0; q < 6; q++) R(x - 15 + q * 5, y - 18, 3, 12, ['#c8463c', '#3f6fc0', '#e0b84a', '#3a9a6a'][q % 4]); }
        if (k === 'gate') { R(x - 18, y - 26, 6, 24, '#a9a49a'); R(x + 12, y - 26, 6, 24, '#a9a49a'); R(x - 18, y - 28, 36, 6, '#8d8a80'); R(x - 12, y - 22, 24, 20, '#fff3b0'); }
      });
      this.core(g, 160, 66, t, 'ok', 20);
    } else if (i === 2) { /* crack + fragments */
      this.sky(g, [[0, '#07041a'], [0.6, '#2a1250'], [1, '#6a2a5a']]); this.stars(g, t, 80, 3, 160);
      const ph = Math.min(1, t / 2.4), flash = t > 2.3 && t < 2.6 ? 1 : 0;
      this.island(g, 160, 150, 150, '#4a3a5a', '#3a6a4a'); this.town(g, 160, 148, 3, true);
      this.core(g, 160, 94, t, ph < 1 ? 'crack' : 'dim', 26);
      g.strokeStyle = '#ff5a4a'; g.lineWidth = 2; g.beginPath(); const pts = [[160, 70], [154, 82], [166, 90], [152, 100], [164, 112], [158, 120]]; g.moveTo(pts[0][0], pts[0][1]); pts.slice(1, 1 + Math.ceil(ph * 5)).forEach((p) => g.lineTo(p[0], p[1])); g.stroke();
      if (flash) R(0, 0, 320, 240, 'rgba(255,255,255,0.8)');
      const cols = ['#ffd24a', '#6ff3ff', '#ff6bd6', '#7fe08a', '#ff9a4a', '#6a8aff'];
      if (t > 2.4) cols.forEach((c, k) => { const p = Math.min(1, (t - 2.4) / 3.2), ang = -2.6 + k * 0.52, x = 160 + Math.cos(ang) * 300 * p * 0.9, y = 94 + (Math.sin(ang) * -1 * 60 + 200 * p * p) * (0.4 + p); for (let s = 0; s < 7; s++) R(x - Math.cos(ang) * s * 4, y - s * 3, 3 - Math.floor(s / 3), 3 - Math.floor(s / 3), s ? mix(c, '#2a1250', s / 8) : '#ffffff'); });
      this.hills(g, 214, 6, '#1a0f30', 9, 0);
    } else if (i === 3) { /* broken world */
      this.sky(g, [[0, '#6a6a7a'], [1, '#b8b4b0']]); this.cloud(g, (t * 5) % 380 - 50, 30, 80, '#8a8a98'); this.cloud(g, (t * 3 + 100) % 380 - 50, 60, 60, '#9a9aa8');
      this.hills(g, 170, 8, '#8a8f6a', 2, 0); R(0, 190, 320, 50, '#8c8760');
      for (let k = 0; k < 6; k++) { R(20 + k * 52, 204, 30, 2, '#7a7452'); R(24 + k * 52, 200, 2, 4, '#6b5a3a'); R(34 + k * 52, 198, 2, 6, '#6b5a3a'); }
      R(110, 130, 12, 60, '#a9a49a'); R(198, 130, 12, 60, '#a9a49a'); R(106, 124, 108, 10, '#8d8a80'); R(122, 142, 76, 48, '#4a3a2a'); R(158, 150, 4, 32, '#2a2a2a');
      const pulse = Math.sin(t * 4) * 0.5 + 0.5; R(150, 156, 20, 18, mix('#4a1f1f', '#ff5a4a', pulse)); R(155, 160, 10, 10, '#ffe0d8');
      R(40, 170, 40, 22, '#b07a42'); R(40, 170, 40, 3, '#d9a465'); R(54, 160, 12, 12, '#d9342b'); R(56, 162, 2, 2, '#fff');
      g.strokeStyle = '#ff5a4a'; g.lineWidth = 3; g.beginPath(); g.moveTo(236, 146); g.lineTo(264, 174); g.moveTo(264, 146); g.lineTo(236, 174); g.stroke();
      for (let k = 0; k < 5; k++) { const x = 230 + k * 14, y = 100 + Math.sin(t * 1.5 + k) * 6 - k * 3; R(x, y, 10, 13, '#f3ead0'); R(x + 2, y + 3, 6, 1, '#6b4a2a'); R(x + 2, y + 6, 5, 1, '#6b4a2a'); R(x + 2, y + 9, 6, 1, '#c8463c'); }
    } else if (i === 4) { /* awakening */
      this.sky(g, [[0, '#ffb07a'], [0.5, '#ffd9a0'], [1, '#bfe6ff']]);
      const rise = Math.min(1, t / 4); R(0, 0, 0, 0, '#000'); g.fillStyle = '#fff3b0'; g.beginPath(); g.arc(160, 150 - rise * 60, 34, 0, 7); g.fill(); g.fillStyle = 'rgba(255,243,176,0.3)'; g.beginPath(); g.arc(160, 150 - rise * 60, 52, 0, 7); g.fill();
      this.hills(g, 150, 10, '#8fd36a', 1, 0); this.hills(g, 172, 7, '#6cc060', 4, 0); R(0, 190, 320, 50, '#5cb85c');
      for (let k = 0; k < 34; k++) { const x = hash(k, 2, 3) * 320, y = 190 + hash(k, 2, 4) * 48; R(x, y, 2, 2, ['#ff7aa8', '#ffe066', '#fff', '#8fb8ff'][k % 4]); R(x, y + 2, 1, 3, '#3f8a3a'); }
      Sprites.draw(g, 'hero', 'down', 0, 132, 204, 3.7); Sprites.draw(g, 'milo', 'down', Math.floor(t * 3) % 4, 218, 208 + Math.round(Math.sin(t * 2.4) * 3), 3.7);
      for (let k = 0; k < 10; k++) { const a = t * 1.5 + k * 0.63, x = 214 + Math.cos(a) * (14 + k * 2), y = 150 + Math.sin(a) * (14 + k * 2); R(x, y, 2, 2, k % 2 ? '#fff3b0' : '#9fffe0'); }
    } else { /* map of six cities */
      this.sky(g, [[0, '#2a1a5a'], [0.5, '#6a3a8a'], [1, '#ff9a6a']]); this.stars(g, t, 50, 11, 100);
      this.hills(g, 190, 8, '#3d1e60', 5, 0); this.hills(g, 214, 5, '#24123f', 8, 0);
      const P = [[40, 196], [92, 150], [142, 188], [196, 142], [244, 176], [284, 120]];
      g.strokeStyle = '#ffd24a'; g.lineWidth = 2; g.setLineDash([4, 4]); g.lineDashOffset = -t * 10; g.beginPath(); P.forEach((p, n) => n ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])); g.stroke(); g.setLineDash([]);
      const cols = ['#ffd24a', '#6ff3ff', '#ff6bd6', '#7fe08a', '#ff9a4a', '#6a8aff'];
      P.forEach((p, n) => { const on = n === 0, pu = on ? 1 + Math.sin(t * 5) * 0.25 : 0; g.fillStyle = on ? cols[n] : mix(cols[n], '#2a1a5a', 0.55); g.beginPath(); g.arc(p[0], p[1], 8 * (on ? pu : 1), 0, 7); g.fill(); g.fillStyle = '#1d1526'; g.beginPath(); g.arc(p[0], p[1], 4, 0, 7); g.fill(); g.fillStyle = on ? '#fff' : '#9a8ac0'; g.fillRect(p[0] - 1, p[1] - 1, 2, 2); });
      this.core(g, 160, 76, t, 'dim', 18);
      for (let k = 0; k < 6; k++) { const a = t * 0.8 + k * 1.05; R(160 + Math.cos(a) * 54 - 2, 76 + Math.sin(a) * 22 - 2, 4, 4, cols[k]); }
    }
  },
};

/* ---------- title wordmark: custom block letters (5x7), bevelled gold with extrusion ---------- */
const WM_GLYPH = {
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'], A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'], I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'], N: ['10001', '11001', '10101', '10101', '10011', '10001', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'], G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'], S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
};
function wmWord(g, word, x0, y0, cs, pal) {
  const cells = []; let cx = 0; for (const ch of word) { const gl = WM_GLYPH[ch]; gl.forEach((row, ry) => [...row].forEach((v, rx) => { if (v === '1') cells.push([cx + rx, ry]); })); cx += 6; }
  const has = new Set(cells.map((c) => c[0] + ',' + c[1]));
  for (let d = 6; d >= 1; d--) cells.forEach(([x, y]) => { g.fillStyle = mix(pal.ext0, pal.ext1, d / 6); g.fillRect(x0 + x * cs + d * 1.2, y0 + y * cs + d * 1.6, cs, cs); });
  g.fillStyle = pal.ol; cells.forEach(([x, y]) => g.fillRect(x0 + x * cs - 2.2, y0 + y * cs - 2.2, cs + 4.4, cs + 4.4));
  cells.forEach(([x, y]) => {
    const k = y / 6, px = x0 + x * cs, py = y0 + y * cs, c = k < 0.5 ? mix(pal.a, pal.b, k * 2) : mix(pal.b, pal.c, (k - 0.5) * 2);
    g.fillStyle = c; g.fillRect(px, py, cs, cs);
    if (!has.has(x + ',' + (y - 1))) { g.fillStyle = pal.hi; g.fillRect(px, py, cs, Math.max(1.5, cs * 0.16)); }
    if (!has.has((x - 1) + ',' + y)) { g.fillStyle = pal.hi; g.fillRect(px, py, Math.max(1.5, cs * 0.16), cs); }
    if (!has.has(x + ',' + (y + 1))) { g.fillStyle = pal.lo; g.fillRect(px, py + cs - Math.max(1.5, cs * 0.18), cs, Math.max(1.5, cs * 0.18)); }
    if (!has.has((x + 1) + ',' + y)) { g.fillStyle = pal.lo; g.fillRect(px + cs - Math.max(1.5, cs * 0.18), py, Math.max(1.5, cs * 0.18), cs); }
    if ((x * 7 + y * 3) % 11 === 0) { g.fillStyle = 'rgba(255,255,255,.65)'; g.fillRect(px + cs * 0.3, py + cs * 0.3, cs * 0.22, cs * 0.22); }
  });
}
function wmBase() {
  const W = 620, H = 214, c = mkc(W, H), g = c.getContext('2d');
  const gold = { a: '#fffbd8', b: '#ffd24a', c: '#e8861a', hi: '#fffdf0', lo: '#b8600e', ol: '#241034', ext0: '#9a4a10', ext1: '#2a1030' };
  const ice = { a: '#ffffff', b: '#bfeaff', c: '#5a9ae0', hi: '#ffffff', lo: '#3a6ab0', ol: '#241034', ext0: '#3a4a9a', ext1: '#1a1040' };
  wmWord(g, 'MACHINE', 14, 16, 8, ice); wmWord(g, 'LEGENDS', 12, 88, 13.4, gold);
  /* flourish right of MACHINE */
  g.strokeStyle = '#ffd24a'; g.lineWidth = 3; g.beginPath(); g.moveTo(376, 44); g.lineTo(590, 44); g.stroke(); g.strokeStyle = '#241034'; g.lineWidth = 1; g.beginPath(); g.moveTo(376, 49); g.lineTo(590, 49); g.stroke();
  [[376, 44], [590, 44]].forEach(([x, y]) => { g.fillStyle = '#ffd24a'; g.beginPath(); g.moveTo(x, y - 8); g.lineTo(x + 8, y); g.lineTo(x, y + 8); g.lineTo(x - 8, y); g.closePath(); g.fill(); g.strokeStyle = '#241034'; g.lineWidth = 2; g.stroke(); });
  return c;
}
const WM = { base: null, raf: 0, draw(cv, t) {
  if (!this.base) this.base = wmBase(); const g = cv.getContext('2d'), W = cv.width, H = cv.height; g.clearRect(0, 0, W, H); g.drawImage(this.base, 0, 0);
  const ph = (t % 5.5) / 5.5 * 1.5 - 0.25; if (ph > -0.2 && ph < 1.2) { g.save(); g.globalCompositeOperation = 'source-atop'; const x = ph * (W + 160) - 80, gr = g.createLinearGradient(x - 60, 0, x + 60, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,.75)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.transform(1, 0, -0.3, 1, 0, 0); g.fillRect(x - 60 + 0.3 * H * 0.5, 0, 120, H); g.restore(); }
  [[0, 20, 0.0], [1, 60, 0.9], [2, 150, 1.7]].forEach(([i, x, o]) => { const a = Math.sin(t * 3 + o * 3); if (a > 0.55) { const X = 60 + x * 3.4, Y = 20 + i * 70; g.fillStyle = 'rgba(255,255,255,' + (a - 0.4) + ')'; g.fillRect(X - 1, Y - 6, 2, 12); g.fillRect(X - 6, Y - 1, 12, 2); } });
} };
/* ---------- title screen ---------- */
const Title = {
  idx: 0,
  show() {
    G.mode = 'title'; document.body.dataset.mode = 'title'; Aud.playMusic('title'); HUD.show(false); this.build();
    $('#title').className = 'on';
  },
  hide() { $('#title').className = ''; },
  build() {
    const T = $('#title');
    T.innerHTML = '<div class="tt-lang"><button type="button" data-l="en">English</button><button type="button" data-l="ar">العربية</button></div>' +
      '<div class="tt-logo"><h1 class="sr">Machine Legends</h1><div class="tt-wm2"><img alt="" src="' + ML_LOGO + '"><i class="shn"></i><b class="gs s1"></b><b class="gs s2"></b><b class="gs s3"></b><b class="gs s4"></b><b class="gs s5"></b><u class="mt m1"></u><u class="mt m2"></u><u class="mt m3"></u><u class="mt m4"></u><u class="mt m5"></u><u class="mt m6"></u></div><div class="tt-tag"><i></i><p>' + fmt(t('tt.tag')) + '</p><i></i></div></div>' +
      '<div class="tt-menu"></div><div class="tt-foot"><span class="tt-studio" title="iPupil">' + logoSVG('mini', true) + '</span><span class="tt-ver">' + fmt(t('tt.ver')) + '</span></div>';
    $('.tt-wm2 .shn', T).style.setProperty('--lg', 'url(' + ML_LOGO + ')');
    $$('.tt-lang button', T).forEach((b) => { b.classList.toggle('sel', Settings.lang === b.dataset.l); b.addEventListener('click', () => { Aud.sfx('click'); Settings.lang = b.dataset.l; saveSettings(); UI.relang(); }); });
    const ICONS = ['<svg viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" fill="currentColor"/></svg>', '<svg viewBox="0 0 16 16"><path d="M2 2h9l3 3v9H2z" fill="currentColor"/><rect x="5" y="2" width="5" height="4" fill="#1c1430"/><rect x="4" y="9" width="8" height="5" fill="#1c1430"/></svg>', '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="2.2 2.1"/></svg>'];
    const m = $('.tt-menu', T), items = [['tt.start', () => Game.start()], ['tt.saved', () => Menus.saves()], ['tt.settings', () => Menus.settings()]];
    this.btns = items.map(([k, fn], i) => { const b = UI.btn(t(k), 'tt-b', fn); b.insertAdjacentHTML('afterbegin', '<span class="tt-ic">' + ICONS[i] + '</span>'); b.addEventListener('mouseenter', () => this.focus(i)); if (k === 'tt.saved' && !Save.has()) b.classList.add('dim'); m.appendChild(b); return b; });
    this.focus(this.idx);
  },
  focus(i) { this.idx = (i + this.btns.length) % this.btns.length; this.btns.forEach((b, k) => b.classList.toggle('sel', k === this.idx)); },
};
UI.refresh.push(() => { if (G.mode === 'title' && $('#title').classList.contains('on') && !Panel.open) Title.build(); });

/* ---------- story intro ---------- */
const StoryScreen = {
  i: 0, t0: 0, typing: false,
  play() {
    return new Promise((res) => {
      this.res = res; this.i = 0; G.mode = 'story'; document.body.dataset.mode = 'story'; Title.hide(); Aud.playMusic('title');
      const S_ = $('#story'); S_.className = 'on';
      S_.innerHTML = '<button class="st-skip btn" type="button"></button><div class="st-box"><div class="st-text"></div><div class="st-foot"><div class="st-dots"></div><div class="st-next">▼</div></div></div>';
      $('.st-skip').addEventListener('click', (e) => { e.stopPropagation(); Aud.sfx('click'); this.howto(); });
      S_.addEventListener('click', (e) => { if (e.target.closest('.st-skip') || e.target.closest('.how')) return; this.advance(); });
      this.show(0);
    });
  },
  show(i) {
    this.i = i; this.t0 = G.t; const tx = $('.st-text'), txt = t('st.' + (i + 1));
    $('.st-skip').innerHTML = fmt(t('st.skip') + ' ›');
    $('.st-dots').innerHTML = Array.from({ length: 6 }, (_, k) => '<s class="' + (k === i ? 'on' : k < i ? 'seen' : '') + '"></s>').join('');
    $('.st-next').classList.remove('on'); const html = fmt(txt); clearInterval(this.timer); this.typing = true; this.full = html; let n = 0;
    const speed = Settings.textSpeed === 'instant' || TEST ? 0 : Settings.textSpeed === 'slow' ? 38 : 22;
    const fin = () => { this.typing = false; tx.innerHTML = html; $('.st-next').classList.add('on'); };
    if (!speed) { fin(); return; }
    this.timer = setInterval(() => { n++; const p = partial(html, n); tx.innerHTML = p.html; if (n % 3 === 0) Aud.blip(220); if (p.done) { clearInterval(this.timer); fin(); } }, speed);
  },
  advance() {
    if (!$('#story').classList.contains('on') || $('.how')) return;
    if (this.typing) { clearInterval(this.timer); this.typing = false; $('.st-text').innerHTML = this.full; $('.st-next').classList.add('on'); return; }
    Aud.sfx('click'); if (this.i >= 5) this.howto(); else this.show(this.i + 1);
  },
  howto() {
    if ($('.how')) return; clearInterval(this.timer);
    const h = el('div', 'how');
    h.innerHTML = '<h2>' + fmt(t('how.title')) + '</h2><div class="how-steps">' + [1, 2, 3].map((n) => '<div class="how-s"><div class="how-ic i' + n + '"></div><b>' + fmt(t('how.' + n + 't')) + '</b><p>' + fmt(t('how.' + n + 'b')) + '</p></div>').join('') + '</div><div class="how-goal">' + fmt(t('how.goal')) + '</div>';
    h.appendChild(UI.btn(t('how.go'), 'primary', () => this.finish()));
    $('#story').appendChild(h); this.how = true;
  },
  finish() { clearInterval(this.timer); const S_ = $('#story'); S_.className = ''; S_.innerHTML = ''; const r = this.res; this.res = null; r && r(); },
};

/* ---------- chapter title card ---------- */
const Card = {
  show() { return new Promise((res) => { const c = $('#card'); c.innerHTML = '<div class="cc"><small>' + fmt(t('card.ch')) + '</small><h2>' + fmt(t('card.name')) + '</h2><p>' + fmt(t('card.sub')) + '</p><em>' + fmt(t('card.theme')) + '</em></div>'; c.className = 'on'; setTimeout(() => { c.className = ''; c.innerHTML = ''; res(); }, TEST ? 100 : 3600); }); },
};

/* ---------- input ---------- */
const Input = {
  k: { up: 0, down: 0, left: 0, right: 0 },
  vec() { return [(this.k.right ? 1 : 0) - (this.k.left ? 1 : 0), (this.k.down ? 1 : 0) - (this.k.up ? 1 : 0)]; },
  act() {
    if (Dlg.choosing) { Dlg.pick && Dlg.pick(); return; }
    if (Dlg.active) { Dlg.advance(); return; }
    if (G.mode === 'logo') { Intro.skip(); return; }
    if (G.mode === 'story') { StoryScreen.advance(); return; }
    if (G.mode === 'title') { if (!Panel.open && Title.btns) Title.btns[Title.idx].click(); return; }
    if (G.mode === 'play' && !isBusy()) Over.interact();
  },
};
function isBusy() { return Dlg.active || Panel.open || Menus.open || G.cine || G.mode !== 'play'; }
const KEYS = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key, tag = (e.target.tagName || '');
  if (KEYS[k]) {
    if (Dlg.choosing && e.type === 'keydown' && !e.repeat && Dlg.move) { if (KEYS[k] === 'up' || KEYS[k] === 'left') Dlg.move(-1); if (KEYS[k] === 'down' || KEYS[k] === 'right') Dlg.move(1); e.preventDefault(); return; }
    if (G.mode === 'title' && !e.repeat && !Panel.open) { if (KEYS[k] === 'up') Title.focus(Title.idx - 1); if (KEYS[k] === 'down') Title.focus(Title.idx + 1); e.preventDefault(); return; }
    if (tag === 'INPUT' || tag === 'SELECT') return; Input.k[KEYS[k]] = 1; if (G.mode === 'play') e.preventDefault(); return;
  }
  if (k === 'Enter' || k === ' ' || k === 'e' || k === 'E') {
    if (tag === 'BUTTON' && !Dlg.active) return; if (tag === 'INPUT') return;
    if (tag === 'BUTTON' && Dlg.choosing) return;
    e.preventDefault(); if (!e.repeat) Input.act(); return;
  }
  if (k === 'Escape') { if (Menus.back()) return; if (G.mode === 'play' && !Dlg.active && !G.cine) Menus.pause(); return; }
  if ((k === 'j' || k === 'J') && G.mode === 'play' && !Dlg.active && !G.cine && !Panel.open) { Menus.journal(); return; }
  if ((k === 'm' || k === 'M') && G.mode === 'play' && !Dlg.active && !G.cine && !Panel.open) { Maps.open(); return; }
  if ((k === 'c' || k === 'C') && G.mode === 'play' && !Dlg.active && !G.cine && !Panel.open) { Menus.codex(); return; }
});
addEventListener('keyup', (e) => { if (KEYS[e.key]) Input.k[KEYS[e.key]] = 0; });
addEventListener('blur', () => { for (const k in Input.k) Input.k[k] = 0; });
(function touchInit() {
  const on = () => document.body.classList.add('touch');
  if (matchMedia('(pointer:coarse)').matches) on(); addEventListener('touchstart', on, { once: true, passive: true });
  $$('#dpad button').forEach((b) => { const d = b.dataset.d; const dn = (e) => { e.preventDefault(); Input.k[d] = 1; }, up = (e) => { e.preventDefault(); Input.k[d] = 0; }; b.addEventListener('pointerdown', dn); b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up); });
  $('#tact').addEventListener('pointerdown', (e) => { e.preventDefault(); Input.act(); });
})();

/* ---------- overworld ---------- */
function routeNext(from, to) {
  if (from === to) return null; const seen = { [from]: null }, q = [from];
  while (q.length) { const c = q.shift(); if (c === to) break; (Room.all[c].exits || []).forEach((ex) => { if (ex.to && !(ex.to in seen)) { seen[ex.to] = { from: c, ex: ex }; q.push(ex.to); } }); }
  if (!(to in seen)) return null; let c = to, step = null; while (seen[c]) { step = seen[c]; c = step.from; } return step.ex;
}
const Over = {
  room: null, x: 0, y: 0, dir: 'down', anim: 0, moving: false, npcs: [], milo: { x: 0, y: 0, dir: 'down', f: 0 }, cam: { x: 0, y: 0 }, camOv: null, parts: [], emo: {}, hop: {}, shk: 0, lockCd: 0, near: null, step: 0, lightCv: null, facePlayerT: 0,
  enter(id, tx, ty, dir) {
    Room.cur = this.room = Room.all[id]; this.x = tx * TS; this.y = ty * TS; this.dir = dir || this.dir; this.milo.x = this.x; this.milo.y = this.y + 4; this.parts = []; this.emo = {}; this.hop = {};
    Env.sync(true); this.refreshNPCs(); this.cam.x = this.x - 160; this.cam.y = this.y - 120; this.clampCam(true); Aud.playMusic(this.room.music);
    if (Save.d) { Save.d.room = id; Save.d.x = this.x; Save.d.y = this.y; Save.write(); }
    HUD.update();
  },
  refreshNPCs() { const old = this._nr === this.room.id ? this.npcs : []; this._nr = this.room.id; this.npcs = Story.npcsFor(this.room.id).map((d) => { const o = old.find((n) => n.id === d.id); return Object.assign({ anim: 0, dir: 'down', bt: Math.random() * 6 }, o ? { dir: o.dir, x: o.x, y: o.y } : { x: d.tx * TS, y: d.ty * TS }, d); }); },
  npc(id) { return this.npcs.find((n) => n.id === id || n.sp === id); },
  tileSolid(tx, ty) { const r = this.room; if (tx < 0 || ty < 0 || tx >= r.w || ty >= r.h) return true; return !!SOLID[r.map[ty][tx]]; },
  rects() {
    const out = []; this.room.props.forEach((p) => { if (p.vis && !p.vis()) return; const s = Props.solid(p); if (s) out.push(...s); });
    this.npcs.forEach((n) => { if (n.nosolid) return; out.push([n.x - 5, n.y - 5, 10, 5]); }); return out;
  },
  free(x, y, rs) {
    const x0 = x - 4, x1 = x + 3, y0 = y - 5, y1 = y - 1;
    for (const [px, py] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) if (this.tileSolid(Math.floor(px / TS), Math.floor(py / TS))) return false;
    for (const r of rs) if (x1 >= r[0] && x0 <= r[0] + r[2] - 1 && y1 >= r[1] && y0 <= r[1] + r[3] - 1) return false;
    return true;
  },
  react(who, exp) {
    const e = EMO_OF[exp]; if (!e) return;
    const key = who === 'hero' ? 'hero' : who === 'milo' ? 'milo' : (this.npc(who) || {}).id; if (!key) return;
    this.emo[key] = { n: e, t: 1.5 }; this.hop[key] = 0.3;
    if (who !== 'hero' && who !== 'milo') { const n = this.npc(who); if (n && !n.fixed) n.dir = this.dirTo(n.x, n.y, this.x, this.y); }
  },
  say(key, name, t_) { this.emo[key] = { n: name, t: t_ || 1.6 }; },
  cheer() { this.npcs.forEach((n) => { this.emo[n.id] = { n: n.id === 'misprint' ? 'dots' : (Math.random() < 0.5 ? 'heart' : 'star'), t: 2.4 }; this.hop[n.id] = 1.6; n.dir = this.dirTo(n.x, n.y, this.x, this.y); }); this.emo.milo = { n: 'note', t: 2.4 }; this.hop.milo = 1.6; this.emo.hero = { n: 'star', t: 2.4 }; this.hop.hero = 1.6; this.burst(this.x, this.y - 12, ['#ffd24a', '#fff3b0', '#ff7aa8', '#6ff3ff'], 26); },
  dirTo(ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down'); },
  burst(x, y, cols, n) { if (Settings.reduceMotion) n = Math.ceil(n / 4); for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, s = 20 + Math.random() * 40; this.parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 20, l: 0.8 + Math.random() * 0.6, c: cols[i % cols.length], g: 60 }); } },
  shake(a, d) { if (Settings.reduceMotion) return; this.shk = d; this.shkA = a; },
  clampCam(snap) {
    const W = this.room.w * TS, H = this.room.h * TS; let fx = this.camOv ? this.camOv.x : this.x, fy = this.camOv ? this.camOv.y : this.y - 10 + (Dlg.active && !this.camOv ? 24 : 0);
    const tx = W <= 320 ? (W - 320) / 2 : Math.max(0, Math.min(W - 320, fx - 160)), ty = H <= 240 ? (H - 240) / 2 : Math.max(0, Math.min(H - 240, fy - 120));
    if (snap) { this.cam.x = tx; this.cam.y = ty; } else { this.cam.x += (tx - this.cam.x) * 0.12; this.cam.y += (ty - this.cam.y) * 0.12; }
  },
  pan(x, y, ms) { this.camOv = x == null ? null : { x: x, y: y }; return sleep((ms || 800) * FAST); },
  walk(id, tx, ty, speed) {
    const who = id === 'hero' ? this : this.npc(id); if (!who) return Promise.resolve();
    return new Promise((res) => { const sp = speed || 40, go = () => { const dx = tx * TS - who.x, dy = ty * TS - who.y, d = Math.hypot(dx, dy); if (d < 2 || TEST) { who.x = tx * TS; who.y = ty * TS; who.moving = false; res(); return; } who.x += dx / d * sp / 60; who.y += dy / d * sp / 60; who.dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down'); who.moving = true; who.anim += 1 / 60; requestAnimationFrame(go); }; go(); });
  },
  interact() {
    const n = this.near; if (!n) return; Aud.sfx('click');
    if (n.type === 'npc') { n.o.dir = this.dirTo(n.o.x, n.o.y, this.x, this.y); this.dir = this.dirTo(this.x, this.y, n.o.x, n.o.y); Story.talk(n.o.id); }
    else if (n.type === 'spot') { Story.look(n.o); }
  },
  findNear() {
    let best = null, bd = 1e9;
    this.npcs.forEach((n) => { if (n.nointeract) return; const d = Math.hypot(n.x - this.x, (n.y - 6) - (this.y - 6)); if (d < 26 && d < bd) { bd = d; best = { type: 'npc', o: n }; } });
    (this.room.spots || []).forEach((s) => { if (s.vis && !s.vis()) return; const d = Math.hypot(s.x * TS - this.x, s.y * TS - this.y); if (d < s.r && d < bd - 4) { bd = d; best = { type: 'spot', o: s }; } });
    return best;
  },
  update(dt) {
    const busy = isBusy(), r = this.room; this.moving = false; const prev = [this.x, this.y];
    if (!busy) {
      let [ix, iy] = Input.vec(); if (ix || iy) {
        const rs = this.rects(), sp = 54 * dt * ((ix && iy) ? 0.7071 : 1), dx = ix * sp, dy = iy * sp;
        if (this.free(this.x + dx, this.y, rs)) this.x += dx; else if (dx && this.free(this.x + dx, this.y - 2, rs)) { this.x += dx; this.y -= 1; }
        if (this.free(this.x, this.y + dy, rs)) this.y += dy; else if (dy && this.free(this.x + 2, this.y + dy, rs)) this.x += 1; else if (dy && this.free(this.x - 2, this.y + dy, rs)) this.x -= 1;
        this.dir = Math.abs(ix) >= Math.abs(iy) && ix ? (ix < 0 ? 'left' : 'right') : (iy < 0 ? 'up' : 'down');
        this.moving = (this.x !== prev[0] || this.y !== prev[1]);
        if (this.moving) { this.anim += dt; this.step += dt; if (this.step > 0.27) { this.step = 0; Aud.tone(80 + Math.random() * 25, 0.05, 'triangle', 0.1, Aud.sfxG); } }
      }
      /* exits */
      for (const ex of r.exits || []) {
        const inx = this.x >= ex.x * TS && this.x < (ex.x + ex.w) * TS, iny = this.y - 2 >= ex.y * TS && this.y - 2 < (ex.y + ex.h) * TS;
        if (inx && iny) {
          if (!ex.need || ex.need()) { if (ex.end) { Story.endChapter(); } else if (ex.end2) { City2.endChapter(); } else if (ex.end3) { City3.endChapter(); } else if (ex.end4) { City4.endChapter(); } else if (ex.end5) { City5.endChapter(); } else this.go(ex); break; }
          this.x = prev[0]; this.y = prev[1]; if (this.lockCd <= 0) { this.lockCd = 2.4; Story.lockMsg(ex); }
        }
      }
      this.near = this.findNear();
      const key = this.near ? (this.near.type === 'npc' ? (this.near.o.mark && this.near.o.mark() ? 'hud.talk' : 'hud.talk') : 'hud.look') : null;
      UI.prompt(key ? t(key) : null);
    } else this.near = null;
    this.lockCd -= dt;
    /* npcs */
    this.npcs.forEach((n) => {
      n.bt += dt; if (!n.moving) n.anim = 0;
      if (!busy && !n.fixed && n.look !== false) { const d = Math.hypot(n.x - this.x, n.y - this.y); if (d < 52) n.dir = this.dirTo(n.x, n.y, this.x, this.y); }
    });
    /* milo */
    const m = this.milo, side = { up: [10, 6], down: [-10, -2], left: [12, 2], right: [-12, 2] }[this.dir], tx = this.x + side[0], ty = this.y + side[1];
    const dx = tx - m.x, dy = ty - m.y, dist = Math.hypot(dx, dy); if (dist > 90) { m.x = tx; m.y = ty; } else { m.x += dx * Math.min(1, dt * 4.5); m.y += dy * Math.min(1, dt * 4.5); }
    if (dist > 3) m.dir = Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 'left' : 'right') : (dy < 0 ? 'up' : 'down'); else m.dir = this.dir;
    m.f += dt * 6;
    /* timers */
    for (const k in this.emo) { this.emo[k].t -= dt; if (this.emo[k].t <= 0) delete this.emo[k]; }
    for (const k in this.hop) { this.hop[k] -= dt; if (this.hop[k] <= 0) delete this.hop[k]; }
    if (this.shk > 0) this.shk -= dt;
    this.parts = this.parts.filter((p) => { p.l -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += p.g * dt; return p.l > 0; });
    if (!Settings.reduceMotion) {
      if (r.theme === 'out' && Env.bloom > 0.5 && this.parts.length < 34 && Math.random() < dt * 3) this.parts.push({ x: this.cam.x + Math.random() * 360, y: this.cam.y - 6, vx: 8 + Math.random() * 8, vy: 12 + Math.random() * 10, l: 9, c: Math.random() < 0.5 ? '#ffc0d8' : '#ffffff', g: 0, pet: 1 });
      if (r.light && this.parts.length < 30 && Math.random() < dt * 4) this.parts.push({ x: this.cam.x + Math.random() * 320, y: this.cam.y + Math.random() * 240, vx: (Math.random() - 0.5) * 4, vy: -3 - Math.random() * 3, l: 5, c: 'rgba(200,190,255,0.8)', g: 0 });
    }
    this.clampCam(false);
    Env.update(dt);
    if (G.t - G.lastSave > 4 && Save.d && !busy) { G.lastSave = G.t; Save.d.x = this.x; Save.d.y = this.y; Save.write(); }
  },
  async go(ex) {
    if (G.cine) return; G.cine = true; UI.prompt(null); Aud.sfx('door');
    await UI.fade(1, 260); const prevRoom = this.room.id; this.enter(ex.to, ex.tx, ex.ty, ex.dir); this.near = null;
    await UI.fade(0, 300); G.cine = false; await Story.onEnter(ex.to, prevRoom);
  },
  shadow(g, x, y, w) { g.fillStyle = 'rgba(0,0,0,0.28)'; g.fillRect(Math.round(x - w / 2 + 1), Math.round(y - 2), w - 2, 3); g.fillRect(Math.round(x - w / 2), Math.round(y - 1), w, 1); },
  humanFrame(o) { return o.moving ? [0, 1, 2, 3][Math.floor(o.anim * 8) % 4] : 0; },
  draw() {
    const g = bg, r = this.room, t = G.t; g.fillStyle = '#0f0c1a'; g.fillRect(0, 0, 320, 240);
    const sh = this.shk > 0 ? (Math.random() - 0.5) * (this.shkA || 2) : 0, ox = -Math.round(this.cam.x + sh), oy = -Math.round(this.cam.y + sh);
    g.save(); g.translate(ox, oy);
    const x0 = Math.max(0, Math.floor(this.cam.x / TS)), x1 = Math.min(r.w - 1, Math.floor((this.cam.x + 320) / TS)), y0 = Math.max(0, Math.floor(this.cam.y / TS)), y1 = Math.min(r.h - 1, Math.floor((this.cam.y + 240) / TS));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g.drawImage(Tiles.get(r.map[y][x], x, y, r.theme), x * TS, y * TS);
    const ents = [];
    r.props.forEach((p) => { if (p.vis && !p.vis()) return; const d = PROP[p.type], px = p.x * TS, py = p.y * TS; if (px > this.cam.x + 330 || py > this.cam.y + 250 || px + d.w < this.cam.x - 10 || py + d.h < this.cam.y - 10) return; if (d.flat) Props.draw(g, p, px, py, t); else ents.push({ y: Props.base(p), f: () => Props.draw(g, p, px, py, t) }); });
    this.npcs.forEach((n) => ents.push({ y: n.y, f: () => this.drawNPC(g, n, t) }));
    ents.push({ y: this.y, f: () => this.drawHero(g, t) });
    ents.push({ y: this.milo.y + 5, f: () => this.drawMilo(g, t) });
    ents.sort((a, b) => a.y - b.y); ents.forEach((e) => e.f());
    this.parts.forEach((p) => { g.fillStyle = p.c; g.fillRect(Math.round(p.x), Math.round(p.y), p.pet ? 2 : 1 + (p.l > 0.4 ? 1 : 0), p.pet ? 1 : 1 + (p.l > 0.4 ? 1 : 0)); });
    /* emotes */
    const E = (key, x, y) => { const e = this.emo[key]; if (!e) return; const c = Emotes.get(e.n), bob = Math.round(Math.sin(t * 8) * 1), pop = Math.min(1, (1.6 - e.t) * 8 + 0.4); g.globalAlpha = Math.min(1, e.t * 3); g.drawImage(c, Math.round(x - 5), Math.round(y - 12 - bob - (1 - pop) * 3)); g.globalAlpha = 1; };
    E('hero', this.x, this.y - 25); E('milo', this.milo.x, this.milo.y - 24);
    this.npcs.forEach((n) => { E(n.id, n.x, n.y - (BossArt.has(n.spr) ? Sprites.meta(n.spr).ay + 4 : n.spirit ? 38 : 26)); const mk = n.mark && !Dlg.active && !Panel.open && n.mark(); if (mk && !this.emo[n.id]) { const c = Emotes.get(mk === 'side' ? '?' : '!'), bob = Math.round(Math.sin(t * 5 + n.bt) * 1.5); g.drawImage(c, Math.round(n.x - 5), Math.round(n.y - (n.spirit ? 48 : 38) - bob)); } });
    g.restore();
    /* lighting for dark rooms */
    if (r.light) this.drawLight(g, ox, oy, t);
    if (r.theme === 'out' && Env.bloom < 0.95) { g.fillStyle = 'rgba(112,118,136,' + ((1 - Env.bloom) * 0.3).toFixed(3) + ')'; g.fillRect(0, 0, 320, 240); }
    if (r.haze && Env[r.haze] < 0.95) { g.fillStyle = 'rgba(112,118,136,' + ((1 - Env[r.haze]) * 0.34).toFixed(3) + ')'; g.fillRect(0, 0, 320, 240); }
    if (r.theme === 'lab') { g.fillStyle = 'rgba(180,200,255,0.05)'; g.fillRect(0, 0, 320, 240); }
    this.drawArrow(g, t, ox, oy);
  },
  drawHero(g, t) { const f = this.humanFrame(this), hop = this.hop.hero ? Math.abs(Math.sin(this.hop.hero * 9)) * 4 : 0; this.shadow(g, this.x, this.y, 10); { const sp = Sprites.get('hero', this.dir, f), mt = Sprites.meta('hero'); g.drawImage(sp, Math.round(this.x - mt.ax), Math.round(this.y - mt.ay - hop)); } },
  drawNPC(g, n, t) {
    const hop = this.hop[n.id] ? Math.abs(Math.sin(this.hop[n.id] * 9)) * 4 : 0, bob = (Math.floor(n.bt * 2) % 2) * 0, f = n.moving ? this.humanFrame(n) : 0;
    if (BossArt.has(n.spr)) { const mt = Sprites.meta(n.spr), fl = BOSS_FLOAT[n.spr] ? Math.sin(t * 2.2) * BOSS_FLOAT[n.spr] : 0, ff = n.moving ? f : Math.floor(t * 2.2) % 4; this.shadow(g, n.x, n.y, 14); g.drawImage(Sprites.get(n.spr, n.dir, ff), Math.round(n.x - mt.ax), Math.round(n.y - mt.ay - hop + fl - (BOSS_FLOAT[n.spr] ? 4 : 0))); return; }
    if (n.spirit) { const fl = Math.sin(t * 2.2) * 2.5, mood = n.mood || 'smug'; this.shadow(g, n.x, n.y, 18); g.drawImage(Sprites.mood('misprint', Math.floor(t * 3) % 4, mood), Math.round(n.x - 13), Math.round(n.y - 28 - 6 + fl - hop)); return; }
    { const mt = Sprites.meta(n.spr); this.shadow(g, n.x, n.y, 10); g.drawImage(Sprites.get(n.spr, n.dir, f), Math.round(n.x - mt.ax), Math.round(n.y - mt.ay - hop - bob)); }
  },
  drawMilo(g, t) { const m = this.milo, hop = this.hop.milo ? Math.abs(Math.sin(this.hop.milo * 9)) * 5 : 0, b = Math.sin(t * 3.2) * 1.6; this.shadow(g, m.x, m.y + 5, 8); { const mt = Sprites.meta('milo'), lift = Art.ready ? 3 : 6; g.drawImage(Sprites.get('milo', m.dir, Math.floor(t * 6) % 4), Math.round(m.x - mt.ax), Math.round(m.y - mt.ay - lift + b * (Art.ready ? 0.5 : 1) - hop)); } },
  drawLight(g, ox, oy, t) {
    if (!this.lightCv) { this.lightCv = mkc(320, 240); }
    const l = this.lightCv.getContext('2d'); l.globalCompositeOperation = 'source-over'; l.fillStyle = 'rgba(6,4,18,0.84)'; l.fillRect(0, 0, 320, 240); l.globalCompositeOperation = 'destination-out';
    const spot = (x, y, rad, a) => { const gr = l.createRadialGradient(x, y, 2, x, y, rad); gr.addColorStop(0, 'rgba(0,0,0,' + a + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)'); l.fillStyle = gr; l.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
    spot(this.x + ox, this.y - 10 + oy, 74, 0.95); spot(this.milo.x + ox, this.milo.y - 14 + oy, 46, 0.8);
    this.room.props.forEach((p) => { if (p.type === 'desklamp') spot(p.x * TS + 6 + ox, p.y * TS + 6 + oy, 48, 0.9); if (p.type === 'stairs') spot(p.x * TS + 16 + ox, p.y * TS + 10 + oy, 36, 0.6); });
    this.npcs.forEach((n) => { if (n.spirit) spot(n.x + ox, n.y - 22 + oy, 54 + Math.sin(t * 3) * 4, 0.8); else spot(n.x + ox, n.y - 10 + oy, 30, 0.6); });
    if (Env.bloom > 0.9) spot(160, 120, 140, 0.3);
    g.drawImage(this.lightCv, 0, 0);
  },
  drawArrow(g, t, ox, oy) {
    if (G.cine || Dlg.active || Panel.open) return; const o = Quest.objective(); if (!o) return;
    let tx, ty; if (o.room === this.room.id) { tx = o.x; ty = o.y; } else { const ex = routeNext(this.room.id, o.room); if (!ex) return; tx = (ex.x + ex.w / 2) * TS; ty = (ex.y + ex.h / 2) * TS; }
    const sx = tx + ox, sy = ty + oy, bob = Math.sin(t * 5) * 2.5, gold = '#ffd24a', dk = '#7a4a10';
    const avoid = (x, y) => { if (x < 98 && y < 36) y = 36; if (x > 100 && x < 218 && y < 22) y = 22; if (x < 142 && y > 196) y = 196; if (x > 198 && y > 210) y = 210; return y; };
    const arrow = (x, y) => { y = avoid(x, y); [[0, 9], [-1, 8], [-2, 7], [-3, 6], [-4, 5]].forEach(([dx, w]) => { }); for (let i = 0; i < 6; i++) { const w = 11 - i * 2; g.fillStyle = dk; g.fillRect(Math.round(x - w / 2 - 1), Math.round(y + i * 2 - 1), w + 2, 4); } for (let i = 0; i < 6; i++) { const w = 11 - i * 2; g.fillStyle = i < 2 ? '#fff3b0' : gold; g.fillRect(Math.round(x - w / 2), Math.round(y + i * 2), w, 2); } };
    if (sx > 14 && sx < 306 && sy > 22 && sy < 226) { g.fillStyle = 'rgba(255,210,74,0.18)'; g.beginPath(); g.arc(sx, sy - 6, 9 + bob, 0, 7); g.fill(); arrow(sx, Math.max(24, sy - 40 + bob + (o.room === this.room.id ? 0 : 20))); return; }
    const cxs = 160, cys = 120, ang = Math.atan2(sy - cys, sx - cxs), px = Math.max(16, Math.min(304, cxs + Math.cos(ang) * 400)), py = Math.max(24, Math.min(222, cys + Math.sin(ang) * 400));
    const ex = Math.min(Math.max(px, 16), 304), ey = avoid(ex, Math.min(Math.max(py, 24), 222));
    g.save(); g.translate(ex, ey); g.rotate(ang - Math.PI / 2 + Math.PI); g.rotate(Math.PI);
    g.fillStyle = 'rgba(255,210,74,0.25)'; g.beginPath(); g.arc(0, 0, 13 + bob, 0, 7); g.fill();
    g.fillStyle = dk; g.beginPath(); g.moveTo(0, 12 + bob); g.lineTo(-9, -4 + bob); g.lineTo(0, -1 + bob); g.lineTo(9, -4 + bob); g.closePath(); g.fill();
    g.fillStyle = gold; g.beginPath(); g.moveTo(0, 9 + bob); g.lineTo(-6, -2 + bob); g.lineTo(0, 0 + bob); g.lineTo(6, -2 + bob); g.closePath(); g.fill(); g.restore();
  },
};

/* ---------- main loop ---------- */
function frame(ts) {
  const dt = Math.min(0.05, (ts - G.last) / 1000 || 0.016); G.last = ts; G.t += dt;
  if (G.mode === 'title') Scn.title(bg, G.t);
  else if (G.mode === 'story') { const tt = G.t - StoryScreen.t0; bg.save(); const z = 1 + Math.min(tt, 16) * 0.005; bg.translate(160, 120); bg.scale(z, z); bg.translate(-160, -120); bg.translate(0, [0, 0, 0, -36, -50, -34][StoryScreen.i] || 0); Scn.story(bg, StoryScreen.i, tt); { const dy = [0, 0, 0, -36, -50, -34][StoryScreen.i] || 0; if (dy) { bg.fillStyle = ['', '', '', '#8c8760', '#5cb85c', '#24123f'][StoryScreen.i]; bg.fillRect(0, 238, 320, -dy + 4); } } bg.restore(); Scn.cine(bg, tt, StoryScreen.i); }
  else if (G.mode === 'play') { Over.update(dt); Over.draw(); }
  else if (G.mode === 'logo') { bg.fillStyle = '#FAF7EE'; bg.fillRect(0, 0, 320, 240); }
  else if (G.mode === 'hold') { /* keep last frame */ }
  cx.drawImage(buf, 0, 0, 640, 480);
  requestAnimationFrame(frame);
}
