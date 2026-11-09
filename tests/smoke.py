import sys,json
from playwright.sync_api import sync_playwright
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':960,'height':720}); pg.set_default_timeout(8000); pg.set_default_timeout(8000)
    errs=[]; pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e))); pg.on('console',lambda m:errs.append('CON '+m.text) if m.type=='error' else None)
    pg.add_init_script("localStorage.setItem('ml_settings',JSON.stringify({lang:'%s',textSpeed:'instant'}));localStorage.removeItem('ml_save')"%lang)
    pg.route('**/fonts.googleapis.com/**',lambda r:r.abort()); pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','dist','machine-legends.html'))+'?test=1',wait_until='domcontentloaded')
    pg.wait_for_timeout(1500); pg.screenshot(path=f'shots/{lang}_1_logo.png')
    pg.wait_for_timeout(1500); pg.screenshot(path=f'shots/{lang}_2_title.png')
    pg.evaluate("setTimeout(()=>__ml.Game.start(),0)"); pg.wait_for_timeout(1200)
    pg.screenshot(path=f'shots/{lang}_3_story.png')
    for i in range(7):
        pg.keyboard.press('Enter'); pg.wait_for_timeout(250)
    pg.wait_for_timeout(600); pg.screenshot(path=f'shots/{lang}_4_how.png')
    print(pg.evaluate('document.querySelector("#story").className+"|"+__ml.G.mode+"|"+(document.querySelector(".how")?1:0)')); pg.click('.how .btn'); pg.wait_for_timeout(2500)
    pg.screenshot(path=f'shots/{lang}_5_prologue.png')
    for i in range(10):
        pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    pg.wait_for_timeout(500); pg.screenshot(path=f'shots/{lang}_6_play.png')
    print(pg.evaluate("JSON.stringify({mode:__ml.G.mode,flags:__ml.Save.d.flags,room:__ml.Over.room.id,obj:__ml.Quest.objective()})"))
    print('\n'.join(errs) or 'NO ERRORS'); b.close()
