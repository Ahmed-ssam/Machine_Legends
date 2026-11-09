import sys,json,time
from playwright.sync_api import sync_playwright
lang=sys.argv[1] if len(sys.argv)>1 else 'en'
P=sync_playwright().start(); b=P.chromium.launch(); pg=b.new_page(viewport={'width':960,'height':720}); pg.set_default_timeout(8000)
errs=[]; pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e))); pg.on('console',lambda m:errs.append('CON '+m.text) if m.type=='error' and 'ERR_FAILED' not in m.text else None)
pg.route('**/fonts.googleapis.com/**',lambda r:r.abort())
pg.add_init_script("localStorage.setItem('ml_settings',JSON.stringify({lang:'%s',textSpeed:'instant'}));localStorage.removeItem('ml_save')"%lang)
pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','dist','machine-legends.html'))+'?test=1&skipintro=1',wait_until='domcontentloaded'); pg.wait_for_timeout(500)
shots=0
def shot(name):
    pg.screenshot(path=f'shots/{lang}_{name}.png')
STATE="""(()=>{const m=__ml,q=s=>document.querySelector(s);return {dlg:m.Dlg.active,ch:m.Dlg.choosing,panel:m.Panel.open,cine:m.G.cine,a1:!!q('#panel .a1'),a4:!!q('#panel .a4'),task:!!q('#panel .tk-p'),win:!!q('#panel .victory'),endc:!!q('#panel .endc'),btns:[...document.querySelectorAll('#panel .tk-bar .btn')].map(b=>b.textContent.trim()+(b.disabled?'!':'')),boss:!!q('#panel .boss')}})()"""
seen=set()
def drive(label,choice=0,maxit=400,snaps=()):
    idle=0; a1n=0; a4n=0; bq=0
    for i in range(maxit):
        s=pg.evaluate(STATE)
        if not (s['dlg'] or s['panel'] or s['cine']):
            idle+=1
            if idle>4: return i
            pg.wait_for_timeout(120); continue
        idle=0
        sig=(s['a1'],s['a4'],s['task'],s['win'],s['boss'],s['endc'],tuple(s['btns']))
        if s['ch']:
            pg.locator('.dchoices .btn').nth(choice).click(); pg.wait_for_timeout(80); continue
        if s['win'] or s['endc']:
            if (label,'win') not in seen: seen.add((label,'win')); pg.wait_for_timeout(300); shot(label+'_victory' if s['win'] else label+'_end')
            pg.locator('#panel .tk-bar .btn, #panel .victory .btn').first.click(); pg.wait_for_timeout(200); continue
        if s['a1']:
            if (label,'a1') not in seen: seen.add((label,'a1')); shot(label+'_a1_choose')
            btns=s['btns']
            if pg.locator('#panel .opts .opt').count()>0:
                a1n+=1
                pg.locator('#panel .opts .opt').nth(0 if a1n==1 else 1).click()
            else:
                pg.locator('#panel .tk-bar .btn.primary').click()
            pg.wait_for_timeout(150); continue
        if s['a4']:
            if (label,'a4') not in seen: seen.add((label,'a4')); shot(label+'_a4')
            bt=s['btns']
            if pg.locator('#panel .tk-bar .btn').count()==1 and 'Continue' in bt[0]: pg.locator('#panel .tk-bar .btn').click(); continue
            if a4n==0: pg.locator('.a4 .opt').first.click(); pg.locator('#panel .tk-bar .btn.primary').nth(0).click(); pg.wait_for_timeout(300); a4n=1; continue
            pg.locator('#panel .tk-bar .btn.primary').nth(1).click(); pg.wait_for_timeout(150); shot(label+'_a4_done'); continue
        if s['task']:
            btns=s['btns']
            if any('Continue' in x for x in btns) or any('متابعة' in x for x in btns):
                pg.locator('#panel .tk-bar .btn.primary').last.click(); pg.wait_for_timeout(120); continue
            if s['boss']:
                bq+=1
                if bq in (1,4,7,10):
                    pg.wait_for_timeout(1500); shot(f'{label}_boss_q{bq}')
            else:
                key=(label,'task',pg.evaluate("document.querySelector('#panel .pnl-h h2')?.textContent"))
                if key not in seen: seen.add(key); shot(label+'_task'+str(len(seen)))
            pg.evaluate("__task.api.solve()"); pg.locator('#panel .tk-bar .btn.primary').first.click(); pg.wait_for_timeout(150)
            if s['boss']:
                pg.wait_for_timeout(100)
            continue
        if s['panel'] and not s['dlg']:
            if s['btns'] and ('Continue' in s['btns'][0] or 'Try again' in s['btns'][0] or 'متابعة' in s['btns'][0] or 'حاول' in s['btns'][0]): pg.locator('#panel .tk-bar .btn.primary').first.click()
            pg.wait_for_timeout(200); continue
        if s['dlg']:
            sigd=pg.evaluate("document.querySelector('#dlg .dname')?.textContent||''")
            k=(label,'dlg',sigd)
            if k not in seen and len(seen)<60: seen.add(k); shot(label+'_dlg_'+sigd.replace(' ','_'))
            pg.keyboard.press('Enter'); pg.wait_for_timeout(60); continue
        pg.wait_for_timeout(100)
    return -1
def js(x): return pg.evaluate(x)
def talk(id): pg.evaluate("setTimeout(()=>__ml.Story.talk('%s'),0)"%id)
def flags(): return js("JSON.stringify(__ml.Save.d.flags)")
js("__ml.Title.hide();__ml.Save.new();__ml.Env.sync(true);__ml.G.mode='play';document.body.dataset.mode='play';__ml.Over.enter('village',14.5,18.2,'up');__ml.Save.set('intro');__ml.Game&&0;document.querySelector('#hud').classList.add('on')")
pg.wait_for_timeout(300)
# 1 finch
js("__ml.Over.x=14.5*16;__ml.Over.y=7.8*16"); talk('finch'); r=drive('s1'); print('s1',r,flags()); shot('s1_after_gate')
js("__ml.Over.x=14.5*16;__ml.Over.y=6.3*16"); pg.wait_for_timeout(300); shot('s1_gate_open')
# rehearsal
talk('finch'); drive('reh',choice=0); print('reh',flags())
# pip
js("__ml.Over.x=10.6*16;__ml.Over.y=13.6*16"); talk('pip'); drive('pip',choice=0); print('pip',flags())
# 2 yard
js("__ml.Over.enter('yard',15,23.4,'up')"); pg.wait_for_timeout(300); shot('yard_before')
js("__ml.Over.x=12.8*16;__ml.Over.y=16.8*16"); talk('luma'); drive('s2'); print('s2',flags()); shot('yard_after2')
talk('luma'); drive('s3',choice=0); print('s3',flags())
js("__ml.Over.enter('training',10,13,'up')"); pg.wait_for_timeout(300); shot('lab_before')
js("__ml.Over.x=7.2*16;__ml.Over.y=9*16"); talk('luma'); drive('s4',choice=0); print('s4',flags()); shot('lab_after')
talk('luma'); drive('sq3',choice=0); print('sq3',flags())
js("__ml.Over.enter('yard',15,23.4,'up')"); js("__ml.Over.x=12.8*16;__ml.Over.y=16.8*16")
js("__ml.Over.enter('archive',12,16,'up')"); pg.wait_for_timeout(300); drive('arch'); shot('archive_before')
js("__ml.Over.x=12*16;__ml.Over.y=10*16"); talk('misprint'); r=drive('boss',maxit=900); print('boss',r,flags()); 
pg.wait_for_timeout(500); shot('archive_after')
print(js("JSON.stringify({obj:__ml.Quest.objective(),save:__ml.Save.d.bossLog,frag:__ml.Save.d.fragments,xp:__ml.Save.d.xp,codex:__ml.Save.d.codex.length})"))
js("__ml.Over.enter('yard',15,12,'right')"); pg.wait_for_timeout(1200); shot('yard_final')
js("__ml.Over.enter('village',14.5,8,'up')"); pg.wait_for_timeout(1200); shot('village_final')
print('\n'.join(errs) or 'NO ERRORS'); b.close(); P.stop()
