import sys
from playwright.sync_api import sync_playwright
js=''.join(open(f'src/{f}',encoding='utf-8').read()+'\n' for f in ['core.js','content.js','sprites.js'])
html='''<body style="margin:0;background:#3a5a3a"><canvas id=c width=900 height=640></canvas><script>(function(){'''+js+'''
const c=document.getElementById('c'),g=c.getContext('2d');g.imageSmoothingEnabled=false;
const ids=['hero','finch','pip','luma','wren','milo'];
ids.forEach((id,i)=>{['down','up','left','right'].forEach((d,j)=>{for(let f=0;f<4;f++){g.drawImage(Sprites.get(id,d,f),10+j*150+f*34,10+i*56,32,48);}})});
g.drawImage(Sprites.get('misprint','down',0),620,10,78,96);
const ex=['neutral','happy','surprised','thinking','sad','angry','confident','determined'];
['hero','milo','finch','pip','luma','wren','misprint'].forEach((id,i)=>{ex.forEach((e,j)=>{g.drawImage(Portraits.get(id,e),10+j*56,360+0,0,0);});});
['hero','milo'].forEach((id,i)=>{ex.forEach((e,j)=>{g.drawImage(Portraits.get(id,e),10+j*100,350+i*100,96,96);});});
['finch','pip','luma','wren','misprint'].forEach((id,i)=>{g.drawImage(Portraits.get(id,i%2?'happy':'thinking'),720,10+i*0,0,0);});
['finch','pip','luma','wren','misprint'].forEach((id,i)=>{g.drawImage(Portraits.get(id,'surprised'),810,10+i*2,0,0);});
['finch','pip','luma','wren','misprint'].forEach((id,i)=>{g.drawImage(Portraits.get(id,'happy'),10+i*100,560,96,96);});
})();</script></body>'''
open('/tmp/sheet.html','w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':900,'height':680});
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
    pg.goto('file:///tmp/sheet.html');pg.wait_for_timeout(300);pg.screenshot(path='/tmp/sheet.png');print(errs);b.close()
