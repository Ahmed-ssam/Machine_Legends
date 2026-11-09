from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':960,'height':720})
    pg.on('pageerror',lambda e:print('PAGEERR',e)); pg.on('console',lambda m:print('CON',m.text))
    pg.route('**/fonts.googleapis.com/**',lambda r:r.abort())
    print('goto'); pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','dist','machine-legends.html'))+'?test=1',timeout=15000,wait_until='domcontentloaded'); print('loaded')
    pg.wait_for_timeout(1500); print(pg.evaluate("typeof __ml"), pg.evaluate("__ml.G.mode"))
    pg.screenshot(path='shots/dbg.png',timeout=15000); print('shot'); b.close()
