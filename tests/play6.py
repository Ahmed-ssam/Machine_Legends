import sys
from playwright.sync_api import sync_playwright
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
P=sync_playwright().start(); b=P.chromium.launch(); pg=b.new_page(viewport={'width':960,'height':720}); pg.set_default_timeout(8000)
errs=[]; pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e))); pg.on('console',lambda m:errs.append('CON '+m.text) if m.type=='error' and 'ERR_FAILED' not in m.text else None)
pg.route('**/fonts.googleapis.com/**',lambda r:r.abort())
pg.add_init_script("window.__raf=0;const _r=window.requestAnimationFrame;window.requestAnimationFrame=function(f){return _r.call(window,function(t){window.__raf++;f(t)})};")
pg.add_init_script("localStorage.setItem('ml_settings',JSON.stringify({lang:'%s',textSpeed:'instant'}));localStorage.removeItem('ml_save')"%lang)
pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','dist','machine-legends.html'))+'?test=1&skipintro=1',wait_until='domcontentloaded'); pg.wait_for_timeout(600)
def shot(n): pg.screenshot(path=f'shots/c6_{lang}_{n}.png')
pg.evaluate("""(()=>{const m=__ml;m.Title.hide();m.Save.new();['intro','chapterEnd','c2start','c2arrive','c2s1','c2s2','c2s3','c2s4','c2engine','c2boss','c2end','c3start','c3arrive','c3s1','c3s2','c3s3','c3s4','c3trial','c3boss','c3end','c4start','c4arrive','c4s1','c4s2','c4s3','c4s4','c4trial','c4boss','c4end','c5start','c5arrive','c5s1','c5s2','c5s3','c5s4','c5boss','c5end'].forEach(k=>m.Save.set(k));m.Save.d.fragments=5;m.Save.write();m.Env.sync(true);m.G.mode='play';document.body.dataset.mode='play';m.Over.enter('village',14.5,18.2,'up');document.querySelector('#hud').classList.add('on');})()""")
STATE="""(()=>{const m=__ml,q=s=>document.querySelector(s);return {dlg:m.Dlg.active,ch:m.Dlg.choosing,panel:m.Panel.open,cine:m.G.cine,task:!!q('#panel .tk-p'),win:!!q('#panel .victory'),endc:!!q('#panel .endc'),btns:[...document.querySelectorAll('#panel .tk-bar .btn')].map(b=>b.textContent.trim()),boss:!!q('#panel .boss')}})()"""
seen=set()
def drive(label,choice=0,maxit=600):
    idle=0;bq=0
    for i in range(maxit):
        s=pg.evaluate(STATE)
        if pg.locator('.certov.on').count():
            if ('cert',) not in seen: seen.add(('cert',));pg.wait_for_timeout(400);shot('certificate')
            pg.locator('.cert-bar .btn').last.click();pg.wait_for_timeout(500);continue
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
            h=str(pg.evaluate("document.querySelector('#panel .pnl-h h2')?.textContent"))+str(pg.evaluate("document.querySelector('#panel .tk-p')?.textContent"))
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
call("__ml.Maps.travel(6)");print('arrive',drive('arrive'));shot('dock0')
go('isle1',10.5,10);shot('isle1')
call("__ml.City6.scene1()");print('s1',drive('s1',0,900));shot('s1_after')
call("__ml.City6.sq('F')");print('sqF',drive('sqF'))
go('isle2',5,8);shot('isle2')
call("__ml.City6.scene2()");print('s2',drive('s2',0,900));shot('s2_after')
call("__ml.City6.sq('N')");print('sqN',drive('sqN'))
go('isle3',12,8);shot('isle3')
call("__ml.City6.scene3()");print('s3',drive('s3',0,900));shot('s3_after')
call("__ml.City6.sq('B')");print('sqB',drive('sqB'))
go('gate6',11.6,10);shot('gate0')
call("__ml.City6.scene4()");print('s4',drive('s4',0,900));shot('gate_open')
go('core',14,14);shot('core0')
call("__ml.City6.boss()");print('boss',drive('boss',0,2500));shot('afterboss')
print('flags',pg.evaluate("Object.keys(__ml.Save.d.flags).filter(k=>k.startsWith('c6')).join()"), pg.evaluate("JSON.stringify(__ml.Save.d.bossLog6)")[:80], pg.evaluate("__ml.Save.d.fragments"))
pg.wait_for_timeout(500);shot('final');print('DBG',pg.evaluate("[!!document.querySelector('.finale'),!!document.querySelector('.certov'),__ml.G.cine,__ml.Panel.open,!!__ml.Save.d.flags.c6end].join()"));
for _ in range(40):
    if not pg.evaluate("!!document.querySelector('.finale')"): break
    pg.wait_for_timeout(1700);pg.keyboard.press('Enter')
pg.wait_for_timeout(900);print('end',drive('end6'))
pg.evaluate('window.__raf=0');pg.wait_for_timeout(2000);print('raf/s',pg.evaluate('window.__raf/2'))
print('ERRS',errs)
