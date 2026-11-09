#!/usr/bin/env python3
"""Inline src/ into one playable file: dist/machine-legends.html"""
import pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
order = ["core.js", "content.js", "text2.js", "sprites.js", "sprites2.js", "art.js", "logo_img.js", "sprites3.js", "bosses.js", "npcs.js", "npc_art.js", "world.js", "world2.js","world3.js", "world4.js", "world5.js", "world6.js", "engine.js", "game.js", "text3.js", "text4.js","text5.js", "text6.js", "text7.js", "text8.js", "city2.js","city3.js", "city4.js", "city5.js", "city6.js", "cert.js", "main.js"]
js = "\n".join((src / f).read_text(encoding="utf-8") for f in order)
css = (src / "styles.css").read_text(encoding="utf-8")
tpl = (src / "template.html").read_text(encoding="utf-8")
html = tpl.replace("/*CSS*/", css).replace("/*JS*/", "(function(){\n" + js + "\n})();")
out = root / "dist" / "machine-legends.html"
out.write_text(html, encoding="utf-8")
print("built", out, len(html) // 1024, "KB")
