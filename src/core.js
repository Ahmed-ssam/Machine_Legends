'use strict';
/* ===== core.js: helpers, settings, save, i18n, audio ===== */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const TEST = /[?&]test=1/.test(location.search);

/* ---------- settings ---------- */
const DEFAULTS = {
  lang: null, master: 0.8, music: 0.5, sfx: 0.8, blip: 0.5,
  muteMaster: false, muteMusic: false, muteSfx: false, muteBlip: false,
  bossMusic: 'full', captions: false, textSpeed: 'normal', textSize: 'm',
  contrast: false, reduceMotion: false,
};
const Settings = Object.assign({}, DEFAULTS);
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: play without saving */ } }
(function loadSettings() {
  try { Object.assign(Settings, JSON.parse(lsGet('ml_settings') || '{}')); } catch (e) { /* ignore */ }
})();
function saveSettings() { lsSet('ml_settings', JSON.stringify(Settings)); }

/* ---------- i18n ---------- */
const TXT = {};
function S(key, en, ar) { TXT[key] = { en: en, ar: ar }; }
function t(key, p) {
  const e = TXT[key];
  let s = e ? ((Settings.lang === 'ar' && e.ar) || e.en) : key;
  if (p) for (const k in p) s = s.split('{' + k + '}').join(p[k]);
  return s;
}
const _AR = '\\u0600-\\u06FF', _GRP = '\\((?:[^()' + _AR + ']|\\([^()' + _AR + ']*\\))*\\)', _ATOM = '√?(?:' + _GRP + "|[A-Za-z][A-Za-z0-9₀-₉²'’\\/\\-]*|[0-9]+(?:[.][0-9]+)?(?:[A-Za-z][A-Za-z0-9₀-₉²]*)?)²?";
const LATIN = new RegExp(_ATOM + '(?: (?:(?:&lt;|[=+−×÷≈]) )?' + _ATOM + ')*', 'g');
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
/* Escapes text, keeps English terms/names left-to-right inside Arabic, supports **bold** */
function fmt(s) {
  s = esc(s);
  if (Settings.lang === 'ar') {
    if (!/[\u0600-\u06FF]/.test(s)) return '<bdi dir="ltr">' + s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') + '</bdi>';
    s = s.replace(LATIN, (m) => '<bdi dir="ltr">' + m + '</bdi>');
  }
  return s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}
function isAr() { return Settings.lang === 'ar'; }

/* ---------- save ---------- */
const Save = {
  d: null,
  fresh() { return { flags: {}, xp: 0, codex: [], fragments: 0, mastery: {}, room: 'village', x: 9, y: 12, bossLog: null, v: 1 }; },
  valid(o) { return !!o && typeof o === 'object' && o.v === 1 && o.flags && typeof o.flags === 'object' && Array.isArray(o.codex) && typeof o.xp === 'number' && o.mastery && typeof o.mastery === 'object' && typeof o.room === 'string'; },
  load() {
    let o = null; try { o = JSON.parse(lsGet('ml_save') || 'null'); } catch (e) { o = null; }
    if (!this.valid(o)) { if (o) { try { localStorage.removeItem('ml_save'); } catch (e) { /* ignore */ } } this.d = null; return false; }
    this.d = Object.assign(this.fresh(), o); return true;
  },
  has() { let o = null; try { o = JSON.parse(lsGet('ml_save') || 'null'); } catch (e) { o = null; } return this.valid(o); },
  new() { this.d = this.fresh(); this.write(); },
  write() { if (this.d) lsSet('ml_save', JSON.stringify(this.d)); },
  flag(k) { return !!(this.d && this.d.flags[k]); },
  set(k, v) { this.d.flags[k] = v === undefined ? true : v; this.write(); },
  addXP(n) { this.d.xp += n; this.write(); UIHook.hud && UIHook.hud(); },
  unlock(id) { if (!this.d.codex.includes(id)) { this.d.codex.push(id); this.write(); UIHook.toast && UIHook.toast(t('toast.codex', { term: t('cx.' + id + '.term') })); Aud.sfx('ok'); } },
};
const UIHook = {};

/* ---------- audio ---------- */
/* Each track: tonic frequency, tempo (eighth-note grid, 8 steps per bar), one chord per bar, a melody (semitones over the tonic, '-' holds, null rests). */
const TRACKS = {
  title: {
    bpm: 80, root: 261.63, lead: ['triangle', 'sine'], leadVol: 0.2, drums: 0, arp: 0, bassStyle: 0,
    chords: [[0, 'M'], [9, 'm'], [5, 'M'], [7, 'M'], [0, 'M'], [4, 'm'], [5, 'M'], [7, 'M']],
    mel: [[7, '-', '-', 4, 7, '-', 12, '-'], [9, '-', '-', 12, 16, '-', 12, 9], [9, '-', '-', 5, 9, '-', 12, '-'], [11, '-', 7, '-', 14, '-', '-', null],
          [12, '-', '-', 7, 4, '-', 7, '-'], [11, '-', '-', 7, 4, '-', 7, 11], [12, '-', 9, '-', 5, '-', 9, 12], [14, '-', '-', '-', 11, '-', 7, '-']],
  },
  meadows: {
    bpm: 104, root: 196, lead: ['triangle', 'square'], leadVol: 0.17, drums: 1, arp: 1, bassStyle: 1,
    chords: [[0, 'M'], [2, 'M'], [4, 'm'], [5, 'M'], [0, 'M'], [2, 'M'], [5, 'M'], [2, 'M']],
    mel: [[7, 9, 11, '-', 12, 11, 9, 7], [6, '-', 9, '-', 14, '-', 12, 11], [11, '-', 16, '-', 14, 12, 11, '-'], [12, '-', 9, '-', 7, 9, 12, '-'],
          [7, 9, 11, 12, 14, '-', 11, '-'], [14, '-', 9, '-', 6, 9, 14, '-'], [12, '-', 16, '-', 14, 12, 9, '-'], [14, '-', 11, '-', 9, '-', '-', null]],
  },
  boss: {
    bpm: 148, root: 220, lead: ['square', 'sawtooth'], leadVol: 0.12, drums: 2, arp: 2, bassStyle: 2,
    chords: [[0, 'm'], [8, 'M'], [3, 'M'], [10, 'M'], [0, 'm'], [8, 'M'], [7, 'M'], [7, 'M']],
    mel: [[12, 12, 15, 12, 14, 12, 10, 12], [8, 12, 15, 12, 8, 12, 15, 17], [15, 15, 19, 15, 17, 15, 12, 15], [14, 14, 17, 14, 10, 14, 17, 19],
          [12, 15, 19, 15, 17, 15, 14, 12], [20, '-', 17, '-', 15, 17, 20, '-'], [11, 14, 19, 14, 11, 14, 16, 14], [11, '-', 14, '-', 19, '-', '-', null]],
  },
};
const Aud = {
  ctx: null, track: null, timer: null, step: 0, next: null,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const c = (this.ctx = new AC());
      this.master = c.createGain(); this.music = c.createGain(); this.sfxG = c.createGain(); this.blipG = c.createGain();
      this.filter = c.createBiquadFilter(); this.filter.type = 'lowpass'; this.filter.frequency.value = 9000;
      this.music.connect(this.filter); this.filter.connect(this.master);
      this.sfxG.connect(this.master); this.blipG.connect(this.master); this.master.connect(c.destination);
      this.dly = c.createDelay(1); this.dly.delayTime.value = 0.3; const fb = c.createGain(); fb.gain.value = 0.33, this.send = c.createGain(); this.send.gain.value = 0.3;
      const dlp = c.createBiquadFilter(); dlp.type = 'lowpass'; dlp.frequency.value = 2600;
      this.send.connect(this.dly); this.dly.connect(dlp); dlp.connect(fb); fb.connect(this.dly); dlp.connect(this.filter);
      const nb = c.createBuffer(1, c.sampleRate, c.sampleRate), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1; this.noise = nb;
      this.apply();
      if (this.track) this.playMusic(this.track);
    } catch (e) { this.ctx = null; }
  },
  apply() {
    if (!this.ctx) return;
    const s = Settings, g = (v, m) => (m ? 0 : v);
    this.master.gain.value = g(s.master, s.muteMaster);
    this.music.gain.value = g(s.music, s.muteMusic) * 0.7;
    this.sfxG.gain.value = g(s.sfx, s.muteSfx);
    this.blipG.gain.value = g(s.blip, s.muteBlip) * 0.5;
    this.filter.frequency.value = this.track === 'boss' && s.bossMusic === 'calm' ? 1100 : 9000;
  },
  tone(freq, dur, type, vol, dest, when) {
    if (!this.ctx) return;
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t0 = when || c.currentTime;
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(dest); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  sfx(name) {
    if (Settings.captions && UIHook.caption) UIHook.caption(t('cap.' + name));
    if (!this.ctx) return;
    const n = { click: [[660, 0.05]], ok: [[523, 0.09], [784, 0.14]], no: [[200, 0.16], [150, 0.2]], door: [[220, 0.12], [330, 0.12]], gate: [[180, 0.2], [260, 0.2], [392, 0.3]], fragment: [[523, 0.1], [659, 0.1], [784, 0.1], [1047, 0.3]], train: [[330, 0.08], [392, 0.08], [494, 0.08], [659, 0.2]] }[name] || [[440, 0.05]];
    n.forEach((p, i) => this.tone(p[0], p[1], name === 'no' ? 'sawtooth' : 'square', 0.18, this.sfxG, this.ctx.currentTime + i * 0.09));
  },
  blip(pitch) { if (this.ctx) this.tone(pitch || 300, 0.045, 'square', 0.25, this.blipG); },
  playMusic(name) {
    if (this.track !== name) { this.step = 0; this.next = null; }
    this.track = name;
    if (!this.ctx) return;
    this.apply();
    if (!this.timer) this.timer = setInterval(() => this.tick(), 50);
  },
  stopMusic() { this.track = null; },
  /* one musical voice: oscillator pair with envelope, optional vibrato, dry and echo send */
  note(f, dur, w1, w2, vol, when, o) {
    const c = this.ctx; o = o || {};
    const g = c.createGain(), a = o.a || 0.012, t0 = when, t1 = t0 + dur;
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + a);
    g.gain.exponentialRampToValueAtTime(vol * (o.sus || 0.6), t0 + Math.min(dur * 0.6, a + (o.d || 0.12)));
    g.gain.exponentialRampToValueAtTime(0.0001, t1 + (o.r || 0.08));
    g.connect(this.music); if (o.echo) { const e = c.createGain(); e.gain.value = o.echo; g.connect(e); e.connect(this.send); }
    [[w1, 1, 0], [w2, o.mix || 0.25, o.det || 5]].forEach(([w, m, d]) => {
      if (!w) return;
      const os = c.createOscillator(), og = c.createGain(); os.type = w; os.frequency.value = f; os.detune.value = d; og.gain.value = m; os.connect(og); og.connect(g);
      if (o.vib && dur > 0.3) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = 5.2; lg.gain.setValueAtTime(0, t0); lg.gain.linearRampToValueAtTime(9, t0 + 0.3); l.connect(lg); lg.connect(os.detune); l.start(t0); l.stop(t1 + 0.1); }
      os.start(t0); os.stop(t1 + (o.r || 0.08) + 0.05);
    });
  },
  hit(kind, vol, when) {
    const c = this.ctx, g = c.createGain();
    if (kind === 'kick') {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(150, when); o.frequency.exponentialRampToValueAtTime(42, when + 0.12);
      g.gain.setValueAtTime(vol, when); g.gain.exponentialRampToValueAtTime(0.0001, when + 0.18); o.connect(g); g.connect(this.music); o.start(when); o.stop(when + 0.2); return;
    }
    const s = c.createBufferSource(); s.buffer = this.noise; const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = kind === 'hat' ? 7500 : 1800;
    const len = kind === 'hat' ? 0.04 : 0.13; g.gain.setValueAtTime(vol, when); g.gain.exponentialRampToValueAtTime(0.0001, when + len);
    s.connect(f); f.connect(g); g.connect(this.music); s.start(when, Math.random() * 0.5, len + 0.02);
  },
  tick() {
    const c = this.ctx, T = TRACKS[this.track];
    if (!c || c.state !== 'running' || !T) return;
    const boss = this.track === 'boss';
    if (boss && Settings.bossMusic === 'off') return;
    const calm = boss && Settings.bossMusic === 'calm';
    const bpm = T.bpm * (calm ? 0.72 : 1), dur = 60 / bpm / 2;
    if (this.dly) this.dly.delayTime.value = dur * 3;
    if (this.next == null || this.next < c.currentTime - 0.5) this.next = c.currentTime + 0.05;
    const R = T.root, hz = (st) => R * Math.pow(2, st / 12), bars = T.chords.length, flat = [].concat.apply([], T.mel);
    while (this.next < c.currentTime + 0.2) {
      const st = this.step, i = st % 8, bar = ((st / 8) | 0) % bars, w = this.next;
      const [cr, q] = T.chords[bar], tones = [cr, cr + (q === 'm' ? 3 : 4), cr + 7];
      /* melody */
      const m = flat[(st % (bars * 8))];
      if (typeof m === 'number') {
        let L = 1; while (L < 8 && flat[(st + L) % flat.length] === '-') L++;
        this.note(hz(m), dur * L * 0.95, T.lead[0], T.lead[1], T.leadVol * (calm ? 0.6 : 1), w, { vib: 1, echo: 0.5, a: boss ? 0.006 : 0.02, mix: 0.22 });
      }
      /* pad: one soft chord per bar */
      if (i === 0 && !boss) tones.forEach((t, k) => this.note(hz(t - 12 + (t > 7 ? -12 : 0)), dur * 8, 'sine', 'triangle', 0.075, w, { a: 0.5, sus: 0.9, r: 0.6, mix: 0.4, det: 7 }));
      if (i === 0 && boss && !calm) tones.forEach((t) => this.note(hz(t - 12), dur * 8, 'sawtooth', null, 0.022, w, { a: 0.25, sus: 0.8, r: 0.3 }));
      /* arpeggio */
      if (T.arp && !calm) { const ar = [tones[0], tones[1], tones[2], tones[1] + 12][(i >> 0) % 4]; this.note(hz(ar + 12), dur * 0.8, T.arp === 2 ? 'square' : 'sine', null, T.arp === 2 ? 0.035 : 0.06, w, { echo: 0.6, sus: 0.3 }); }
      /* bass */
      const br = cr - 12, bv = 0.3;
      if (T.bassStyle === 0) { if (i === 0 || i === 4) this.note(hz(br), dur * 3.6, 'triangle', 'sine', bv, w, { a: 0.02, sus: 0.7, r: 0.1, mix: 0.6, det: 0 }); }
      else if (T.bassStyle === 1) { if ([0, 3, 4, 6].includes(i)) this.note(hz(br + (i === 3 || i === 6 ? 7 : 0)), dur * (i === 0 || i === 4 ? 2.6 : 1.4), 'triangle', 'sine', bv, w, { sus: 0.5, mix: 0.6, det: 0 }); }
      else { this.note(hz(br + (i % 4 === 3 ? 12 : 0)), dur * 0.85, 'sawtooth', 'square', calm ? 0.12 : 0.17, w, { sus: 0.5, mix: 0.5, det: 0 }); }
      /* drums */
      if (!calm) {
        if (T.drums === 0 && i % 2 === 1) this.hit('hat', 0.012, w);
        if (T.drums === 1) { if (i === 0 || i === 4) this.hit('kick', 0.22, w); if (i % 2 === 1) this.hit('hat', 0.03, w); if (i === 6) this.hit('snare', 0.035, w); }
        if (T.drums === 2) { if (i === 0 || i === 3 || i === 4 || (i === 7 && bar % 2)) this.hit('kick', 0.32, w); if (i === 2 || i === 6) this.hit('snare', 0.12, w); this.hit('hat', i % 2 ? 0.05 : 0.03, w); }
      }
      this.step++; this.next += dur;
    }
  },
};
['pointerdown', 'keydown'].forEach((ev) => window.addEventListener(ev, () => Aud.init(), { passive: true }));
