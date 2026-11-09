"""Regenerates the SVG banner/buttons/features and demo.gif in docs/img."""
import glob, os
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__))
BG, PANEL, GOLD, TEAL, INK, MUTE = "#14172e", "#1f2447", "#ffd24a", "#5ee0c1", "#f4f1e8", "#9aa0c7"
F = "font-family=\"'Trebuchet MS','Segoe UI',Helvetica,Arial,sans-serif\""
M = "font-family=\"'Courier New',Menlo,Consolas,monospace\""

def w(n, s): open(os.path.join(D, n), "w", encoding="utf-8").write(s)

stars = "".join(f'<rect x="{x}" y="{y}" width="4" height="4" fill="{c}" opacity=".7"/>' for x, y, c in
  [(60,40,INK),(180,110,GOLD),(330,60,INK),(520,150,TEAL),(760,50,INK),(940,120,GOLD),(1080,60,INK),(1150,170,TEAL),(120,200,TEAL),(640,30,GOLD)])
w("banner.svg", f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 260" role="img" aria-label="Machine Legends. Learn machine learning by playing.">
<rect width="1200" height="260" rx="18" fill="{BG}"/>{stars}
<rect x="0" y="246" width="1200" height="14" rx="7" fill="#49b36c"/>
<text x="600" y="118" text-anchor="middle" {F} font-size="84" font-weight="900" fill="{GOLD}" letter-spacing="2">MACHINE LEGENDS</text>
<text x="600" y="172" text-anchor="middle" {F} font-size="30" fill="{INK}">Learn classical machine learning by playing a quest.</text>
<text x="600" y="212" text-anchor="middle" {M} font-size="20" fill="{TEAL}">six cities  ·  real ML questions  ·  English + Arabic</text>
</svg>''')

def btn(name, label, sub, col, fg):
    w(name, f'''<svg xmlns="http://www.w3.org/2000/svg" width="260" height="46" viewBox="0 0 260 46" role="img" aria-label="{label}">
<rect width="260" height="46" rx="10" fill="{col}"/><rect x="2" y="2" width="256" height="42" rx="8" fill="none" stroke="{fg}" stroke-opacity=".25"/>
<text x="130" y="29" text-anchor="middle" {F} font-size="18" font-weight="800" fill="{fg}">{label}</text></svg>''')
btn("btn-play.svg", "▶  Play in browser", "", GOLD, BG)
btn("btn-download.svg", "⬇  Install on desktop", "", TEAL, BG)
btn("btn-itch.svg", "Play on itch.io", "", "#fa5c5c", "#ffffff")

tiles = [("6 cities", "Meadows to Hidden Islands,|one ML idea per place.", GOLD),
         ("Boss = quiz", "Win by answering real|machine learning questions.", TEAL),
         ("EN + AR", "Fully playable in English|and Arabic (right-to-left).", "#ff8fb1"),
         ("One file", "A single HTML file.|No server, no account.", "#9ab6ff")]
t = ""
for i, (h, s, c) in enumerate(tiles):
    x = 20 + i * 292
    t += f'<rect x="{x}" y="20" width="272" height="140" rx="14" fill="{PANEL}"/><rect x="{x}" y="20" width="272" height="6" rx="3" fill="{c}"/>' \
         f'<text x="{x+20}" y="78" {F} font-size="30" font-weight="900" fill="{c}">{h}</text>' \
         f'<text x="{x+20}" y="112" {F} font-size="16" fill="{INK}">{s.split("|")[0]}</text><text x="{x+20}" y="134" {F} font-size="16" fill="{INK}">{s.split("|")[1]}</text>'
w("features.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1188 180" role="img" aria-label="Six cities. Bosses are quizzes. English and Arabic. One file."><rect width="1188" height="180" fill="{BG}" rx="18"/>{t}</svg>')

# demo.gif from screenshots
fr = []
for f in sorted(glob.glob(os.path.join(D, "..", "shots", "*.png"))):
    im = Image.open(f).convert("RGB").resize((480, 360), Image.LANCZOS); fr.append(im)
fr = [f.quantize(128, dither=Image.NONE) for f in fr]
fr[0].save(os.path.join(D, "demo.gif"), save_all=True, append_images=fr[1:], duration=1400, loop=0, optimize=True)
