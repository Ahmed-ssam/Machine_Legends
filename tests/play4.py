import sys
from playwright.sync_api import sync_playwright
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
P=sync_playwright().start(); b=P.chromium.launch(); pg=b.new_page(viewport={'width':960,'height':720}); pg.set_default_timeout(8000)
errs=[]; pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e))); pg.on('console',lambda m:errs.append('CON '+m.text) if m.type=='error' and 'ERR_FAILED' not in m.text else None)
pg.route('**/fonts.googleapis.com/**',lambda r:r.abort())
pg.add_init_script("window.__raf=0;const _r=window.requestAnimationFrame;window.requestAnimationFrame=function(f){return _r.call(window,function(t){window.__raf++;f(t)})};")
pg.add_init_script("localStorage.setItem('ml_settings',JSON.stringify({lang:'%s',textSpeed:'instant'}));localStorage.removeItem('ml_save')"%lang)
pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','dist','machine-legends.html'))+'?test=1&skipintro=1',wait_until='domcontentloaded'); pg.wait_for_timeout(600)
def shot(n): pg.screenshot(path=f'shots/c4_{lang}_{n}.png')
pg.evaluate("""(()=>{const m=__ml;m.Title.hide();m.Save.new();['intro','chapterEnd','c2start','c2arrive','c2s1','c2s2','c2s3','c2s4','c2engine','c2boss','c2end','c3start','c3arrive','c3s1','c3s2','c3s3','c3s4','c3trial','c3boss','c3end'].forEach(k=>m.Save.set(k));m.Save.d.fragments=3;m.Save.write();m.Env.sync(true);m.G.mode='play';document.body.dataset.mode='play';m.Over.enter('village',14.5,18.2,'up');document.querySelector('#hud').classList.add('on');})()""")
STATE="""(()=>{const m=__ml,q=s=>document.querySelector(s);return {dlg:m.Dlg.active,ch:m.Dlg.choosing,panel:m.Panel.open,cine:m.G.cine,task:!!q('#panel .tk-p'),win:!!q('#panel .victory'),endc:!!q('#panel .endc'),btns:[...document.querySelectorAll('#panel .tk-bar .btn')].map(b=>b.textContent.trim()),boss:!!q('#panel .boss')}})()"""
seen=set()
def drive(label,choice=0,maxit=600):
    idle=0;bq=0
    for i in range(maxit):
        s=pg.evaluate(STATE)
        if not(s['dlg'] or s['panel'] or s['cine']):
            idle+=1
            if idle>5:return i
            pg.wait_for_timeout(120);continue
        idle=0
        if s['ch']:
            pg.locator('.dchoices .btn').nth(choice).click();pg.wait_for_timeout(80);continue
        if s['endc']:
            shot(label+'_end'); return 'END'
        if s['win']:
            if (label,'w') not in seen: seen.add((label,'w'));pg.wait_for_timeout(300);shot(label+'_victory')
            pg.locator('#panel .victory .btn').first.click();pg.wait_for_timeout(200);continue
        if s['task']:
            h=pg.evaluate("document.querySelector('#panel .pnl-h h2')?.textContent")
            if s['btns'] and any(x in ('Continue','Next') or 'متابعة' in x or 'التالي' in x for x in s['btns']):
                pg.locator('#panel .tk-bar .btn.primary').last.click();pg.wait_for_timeout(120);continue
            if s['boss']:
                bq+=1
                if bq in(1,4,7,9):pg.wait_for_timeout(1500);shot(f'{label}_bossq{bq}')
            elif (label,h) not in seen: seen.add((label,h));pg.wait_for_timeout(150);shot(label+'_task%d'%len(seen))
            pg.evaluate("__task.api.solve()");pg.locator('#panel .tk-bar .btn.primary').first.click();pg.wait_for_timeout(150);continue
        if s['panel']: pg.keyboard.press('Escape');pg.wait_for_timeout(100);continue
        pg.keyboard.press('Enter');pg.wait_for_timeout(60)
    return 'MAX'
def go(room,x,y):
    pg.evaluate(f"(()=>{{__ml.Over.enter('{room}',{x},{y},'down');__ml.Env.sync(true);}})()");pg.wait_for_timeout(200)
def call(js): pg.evaluate(f"(()=>{{{js}}})()")
call("__ml.Maps.open()");pg.wait_for_timeout(200);shot('map');pg.keyboard.press('Escape')
call("__ml.Maps.travel(4)");print('arrive',drive('arrive'));shot('valley0')
for name,fn in [('s1','scene1'),('s2','scene2')]:
    call(f"__ml.City4.{fn}()");print(name,drive(name,0,800));shot(name+'_after')
go('scalehouse',10,11);shot('sh0')
call("__ml.City4.scene3()");print('s3',drive('s3',0,800));shot('s3_after')
go('council4',12,13);shot('council0')
call("__ml.City4.scene4()");print('s4',drive('s4',0,800));shot('s4_after')
call("__ml.City4.trial()");print('trial',drive('trial',0,800))
for k in 'TUR': call(f"__ml.City4.sq('{k}')");print('sq'+k,drive('sq'+k))
go('greatscale',13,13);shot('gs0')
call("__ml.City4.boss()");print('boss',drive('boss',0,2000));shot('afterboss')
print('flags',pg.evaluate("Object.keys(__ml.Save.d.flags).filter(k=>k.startsWith('c4')).join()"), pg.evaluate("JSON.stringify(__ml.Save.d.bossLog4)")[:80])
call("__ml.City4.endChapter()");pg.wait_for_timeout(1200);print('end',drive('end4'))
pg.evaluate('window.__raf=0');pg.wait_for_timeout(2000);print('raf/s',pg.evaluate('window.__raf/2'))
print('ERRS',errs)
