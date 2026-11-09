'use strict';
/* ===== cert.js: completion certificate shown after the final ending (EN / AR) ===== */
S('cert.kicker', `Certificate of Completion`, `شهادة إتمام`);
S('cert.certifies', `This certifies that`, `تشهد هذه الوثيقة بأن`);
S('cert.deed', `restored the Learning Core and completed all six cities of Machine Legends.`, `قد أعاد تشغيل Learning Core وأتمّ مدن Machine Legends الست جميعها.`);
S('cert.learned', `Skills mastered along the way`, `المهارات التي أتقنها في رحلته`);
S('cert.c1', `Learning Meadows`, `Learning Meadows`); S('cert.k1', `Examples and rules`, `الأمثلة والقواعد`);
S('cert.c2', `Model Workshop`, `Model Workshop`); S('cert.k2', `Training and testing`, `التدريب والاختبار`);
S('cert.c3', `Forest of Patterns`, `Forest of Patterns`); S('cert.k3', `Decision trees and voting`, `أشجار القرار والتصويت`);
S('cert.c4', `Valley of Neighbors`, `Valley of Neighbors`); S('cert.k4', `Nearest neighbors and scaling`, `أقرب الجيران والتحجيم`);
S('cert.c5', `Valley of Predictions`, `Valley of Predictions`); S('cert.k5', `Fitting lines, bias and variance`, `ملاءمة الخطوط والانحياز والتباين`);
S('cert.c6', `Islands of Hidden Knowledge`, `Islands of Hidden Knowledge`); S('cert.k6', `Probability, hidden groups, honest testing`, `الاحتمالات والمجموعات المخفية والاختبار الأمين`);
S('cert.date', `Date`, `التاريخ`);
S('cert.frag', `Core Fragments`, `شظايا Core`);
S('cert.finch', `Elder Finch`, `Elder Finch`); S('cert.finchr', `Guide of Learning Meadows`, `مرشد Learning Meadows`);
S('cert.milo', `MILO`, `MILO`); S('cert.milor', `Companion robot`, `الرفيق الآلي`);
S('cert.name', `Your name`, `اسمك`); S('cert.nameph', `Type your name`, `اكتب اسمك`);
S('cert.save', `Save as image`, `احفظ كصورة`); S('cert.close', `Continue`, `متابعة`); S('cert.view', `View your certificate`, `اعرض شهادتك`);
S('cert.hero', `Hero of the Learning Core`, `بطل Learning Core`);

const Cert = {
  name() { try { return (Save.d && Save.d.pname) || localStorage.getItem('ml_pname') || ''; } catch (e) { return (Save.d && Save.d.pname) || ''; } },
  setName(v) { try { if (Save.d) { Save.d.pname = v; Save.write(); } localStorage.setItem('ml_pname', v); } catch (e) { /* storage may be unavailable */ } },
  draw(cv, name) {
    const W = 1600, H = 1130, g = cv.getContext('2d'), ar = isAr(); cv.width = W; cv.height = H;
    const ff = getComputedStyle(document.body).fontFamily, GOLD = '#f4c752', GOLD2 = '#ffe9a0', DEEP = '#7a4a10';
    g.direction = ar ? 'rtl' : 'ltr'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#171a44'); gr.addColorStop(0.55, '#2a1d52'); gr.addColorStop(1, '#14183a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 160; i++) { const tw = 0.25 + 0.5 * hash(i, 5, 9); g.fillStyle = 'rgba(255,240,200,' + tw * 0.5 + ')'; g.fillRect(hash(i, 1, 2) * W, hash(i, 3, 4) * H, 2, 2); }
    const rg = g.createRadialGradient(W / 2, H * 0.46, 40, W / 2, H * 0.46, 780); rg.addColorStop(0, 'rgba(255,215,120,.16)'); rg.addColorStop(1, 'rgba(255,215,120,0)'); g.fillStyle = rg; g.fillRect(0, 0, W, H);
    /* frame */
    g.strokeStyle = GOLD; g.lineWidth = 10; g.strokeRect(38, 38, W - 76, H - 76); g.lineWidth = 3; g.strokeRect(62, 62, W - 124, H - 124);
    [[62, 62], [W - 62, 62], [62, H - 62], [W - 62, H - 62]].forEach(([x, y], i) => { FX.gear(g, x, y, 46, i * 0.4, GOLD, 12); g.fillStyle = '#171a44'; g.beginPath(); g.arc(x, y, 18, 0, 7); g.fill(); g.fillStyle = GOLD2; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); });
    const tx = (s, x, y, size, col, w, ls) => { g.font = (w || 700) + ' ' + size + 'px ' + ff; g.fillStyle = col; try { g.letterSpacing = (ls || 0) + 'px'; } catch (e) { /* older browsers */ } g.fillText(s, x, y); try { g.letterSpacing = '0px'; } catch (e) { /* */ } };
    tx('Machine Legends', W / 2, 170, 92, GOLD, 800, ar ? 0 : 3);
    g.fillStyle = DEEP; g.globalAlpha = 0.6; g.fillRect(W / 2 - 280, 214, 560, 4); g.globalAlpha = 1; g.fillStyle = GOLD; g.fillRect(W / 2 - 280, 210, 560, 4);
    tx(ar ? t('cert.kicker') : t('cert.kicker').toUpperCase(), W / 2, 258, 44, '#f4ecd8', 700, ar ? 0 : 10);
    tx(t('cert.certifies'), W / 2, 338, 32, '#c9bde8', 400);
    const nm = (name || '').trim() || t('cert.hero'); let fs = 112; g.font = '800 ' + fs + 'px ' + ff; while (g.measureText(nm).width > 1150 && fs > 44) { fs -= 4; g.font = '800 ' + fs + 'px ' + ff; }
    tx(nm, W / 2, 450, fs, GOLD2, 800);
    g.fillStyle = GOLD; g.fillRect(W / 2 - 520, 478, 1040, 3);
    tx(t('cert.deed'), W / 2, 540, 34, '#f4ecd8', 400);
    tx(t('cert.learned'), W / 2, 618, 28, GOLD, 700, ar ? 0 : 3);
    /* six cities */
    const bw = 440, bh = 128, gx = 36, x0 = (W - (bw * 3 + gx * 2)) / 2;
    for (let i = 0; i < 6; i++) {
      const col = i % 3, row = (i / 3) | 0, k = ar ? 2 - col : col, x = x0 + k * (bw + gx), y = 644 + row * (bh + 22);
      g.fillStyle = 'rgba(10,12,40,.62)'; g.fillRect(x, y, bw, bh); g.strokeStyle = 'rgba(244,199,82,.7)'; g.lineWidth = 2; g.strokeRect(x, y, bw, bh);
      g.fillStyle = GOLD; g.beginPath(); g.arc(ar ? x + bw - 40 : x + 40, y + bh / 2, 18, 0, 7); g.fill(); tx('✓', ar ? x + bw - 40 : x + 40, y + bh / 2 + 11, 28, '#171a44', 800);
      const cx = ar ? x + bw / 2 - 30 : x + bw / 2 + 30; let s = 30; g.font = '700 ' + s + 'px ' + ff; const cn = t('cert.c' + (i + 1)); while (g.measureText(cn).width > bw - 130 && s > 18) { s -= 2; g.font = '700 ' + s + 'px ' + ff; }
      tx(cn, cx, y + 54, s, GOLD2, 700); let s2 = 25; const kn = t('cert.k' + (i + 1)); g.font = '400 ' + s2 + 'px ' + ff; while (g.measureText(kn).width > bw - 130 && s2 > 16) { s2 -= 1; g.font = '400 ' + s2 + 'px ' + ff; }
      tx(kn, cx, y + 98, s2, '#d8ceee', 400);
    }
    /* seal and signatures */
    const sy = 992;
    g.save(); const sg = g.createRadialGradient(W / 2, sy, 8, W / 2, sy, 90); sg.addColorStop(0, 'rgba(255,230,140,.8)'); sg.addColorStop(1, 'rgba(255,200,80,0)'); g.fillStyle = sg; g.fillRect(W / 2 - 100, sy - 100, 200, 200); g.restore();
    g.imageSmoothingEnabled = false; const cs = coreSprite('ok', 0, 96); g.drawImage(cs, Math.round(W / 2 - cs.width / 2), Math.round(sy - cs.height / 2));
    g.strokeStyle = GOLD; g.lineWidth = 4; g.beginPath(); g.arc(W / 2, sy, 76, 0, 7); g.stroke();
    const d = new Date(), ds = d.toLocaleDateString(ar ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const sideL = ar ? W - 380 : 380, sideR = ar ? 380 : W - 380;
    tx(ds, sideL, 1000, 34, '#f4ecd8', 700); g.fillStyle = GOLD; g.fillRect(sideL - 190, 1014, 380, 2); tx(t('cert.date') + ' · ' + t('cert.frag') + ' 6/6', sideL, 1050, 24, '#c9bde8', 400);
    g.imageSmoothingEnabled = false; Sprites.draw(g, 'hero', 'down', 0, sideR - 250, 1050, 2.2); Sprites.draw(g, 'milo', 'down', 0, sideR - 175, 1050, 2.2);
    tx(t('cert.finch'), sideR + 70, 1000, 34, '#f4ecd8', 700); g.fillStyle = GOLD; g.fillRect(sideR - 20, 1014, 190, 2); tx(t('cert.finchr'), sideR + 70, 1050, 22, '#c9bde8', 400);
  },
  show() {
    if (document.querySelector('.certov')) return Promise.resolve();
    return new Promise((res) => {
      const prevCine = G.cine; G.cine = true; UI.prompt(null);
      const ov = el('div', 'certov'), cv = el('canvas', 'cert-cv'), row = el('div', 'cert-row'), lab = el('label', '', fmt(t('cert.name'))), inp = el('input', 'cert-in'), bar = el('div', 'cert-bar');
      inp.id = 'certname'; inp.type = 'text'; inp.maxLength = 28; inp.value = this.name(); inp.placeholder = t('cert.nameph'); lab.htmlFor = 'certname'; inp.autocomplete = 'off'; if (isAr()) inp.dir = 'rtl';
      const redraw = () => { this.draw(cv, inp.value); };
      inp.addEventListener('input', () => { redraw(); this.setName(inp.value.trim()); }); inp.addEventListener('keydown', (e) => e.stopPropagation()); inp.addEventListener('keyup', (e) => e.stopPropagation());
      const save = UI.btn(t('cert.save'), 'primary', () => { redraw(); cv.toBlob((b) => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'Machine-Legends-Certificate.png'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800); }, 'image/png'); });
      const done = UI.btn(t('cert.close'), 'ghost', () => { ov.classList.remove('on'); setTimeout(() => ov.remove(), 250); G.cine = prevCine; res(); });
      row.append(lab, inp); bar.append(save, done); ov.append(cv, row, bar); document.body.appendChild(ov); redraw(); requestAnimationFrame(() => ov.classList.add('on'));
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
      Aud.sfx('fragment'); setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (e) { /* */ } }, 300);
    });
  },
};
(function () {
  const _end = City6.endChapter.bind(City6);
  City6.endChapter = async function () { if (fl('c6end')) return; await Cert.show(); return _end(); };
})();
