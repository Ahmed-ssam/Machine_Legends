import sys, io, base64, json
sys.path.insert(0,'.')
from npc_geo import *
from PIL import ImageFilter
CW,CH=34,44; PS=96; TARGET=38.0
OUT='/home/claude/machine-legends/src/npc_art.js'
imgs={'6':Image.open(S6).convert('RGB'),'5':Image.open(S5).convert('RGB')}
arrs={k:np.array(v) for k,v in imgs.items()}
def sprite_alpha(cell):
    a=np.array(cell).astype(int)
    fg=a.max(2)>58
    fg=ndi.binary_opening(fg,iterations=1)|(ndi.binary_dilation(fg,iterations=1)&(a.max(2)>40))
    lab,n=ndi.label(ndi.binary_dilation(fg,iterations=2))
    if n==0: return fg
    # keep components whose area is significant or touching the main one
    areas=ndi.sum(fg,lab,range(1,n+1)); keep=np.zeros(n+1,bool)
    big=areas.max()
    objs=ndi.find_objects(lab); H_,W_=fg.shape; mi=int(np.argmax(areas))+1
    for i,A in enumerate(areas,1):
        s_=objs[i-1]; hh=s_[0].stop-s_[0].start; ww=s_[1].stop-s_[1].start
        if i==mi: keep[i]=True; continue
        if s_[0].start<=1 or s_[1].start<=1 or s_[0].stop>=H_-1 or s_[1].stop>=W_-1: continue
        if hh<7 and ww>10: continue
        if A>=max(14,big*0.08): keep[i]=True
    m=keep[lab]&ndi.binary_dilation(fg,iterations=1)
    m=ndi.binary_fill_holes(m)
    return ndi.binary_dilation(m,iterations=1)
def cut_cell(arr,box,pad=0):
    x0,y0,x1,y1=[int(round(v)) for v in box]
    c=Image.fromarray(arr[y0:y1,x0:x1])
    m=sprite_alpha(c)
    rgba=np.dstack([np.array(c),(m*255).astype(np.uint8)])
    return Image.fromarray(rgba,'RGBA')
chars={}
for idx,name in enumerate(NAMES):
    if idx<12: src,W,cols,k='6',W6,4,idx
    else: src,W,cols,k='5',W5,6,idx
    r,c=divmod(idx,cols)
    x0,x1=W['xs'][c]; y0,y1=W['ys'][r]
    xb,yb,pxb,pyb,ok=grid2(arrs[src],x0,x1,y0,y1,204 if src=='6' else 128)
    sp=[[cut_cell(arrs[src],(xb[j],yb[i],xb[j+1],yb[i+1])) for j in range(4)] for i in range(4)]
    ins=2 if src=='6' else 1
    por=[[imgs[src].crop(tuple(int(round(v)) for v in (pxb[j]+ins,pyb[i]+ins+(2.5 if (i>0 and src=='5') else 0),pxb[j+1]-ins,pyb[i+1]-ins))) for j in range(2)] for i in range(3)]
    chars[name]=dict(src=src,sp=sp,por=por)
# scale per sheet from median front-row sprite height
def bh(im):
    al=np.array(im)[...,3]>0; ys=np.where(al.any(1))[0]; return (ys.max()-ys.min()+1) if len(ys) else 0
S_={}
for k in '56':
    hs=[bh(im) for n,ch in chars.items() if ch['src']==k for im in ch['sp'][0]]
    S_[k]=TARGET/float(np.median(hs)); print('sheet',k,'median h',np.median(hs),'scale',S_[k])
def rs(img,s):
    w,h=max(1,round(img.width*s)),max(1,round(img.height*s))
    r=img.convert('RGBa').resize((w,h),Image.LANCZOS).convert('RGBA')
    rgb=r.convert('RGB').filter(ImageFilter.UnsharpMask(1.0,70,2))
    al=r.split()[3].point(lambda v:0 if v<40 else min(255,int(v*1.25)))
    rgb.putalpha(al); return rgb
n=len(NAMES); BW,BH=4*CW,4*CH
atlas=Image.new('RGBA',(BW*6,BH*5),(0,0,0,0))
patlas=Image.new('RGBA',(PS*6,PS*n),(0,0,0,0))
for ni,name in enumerate(NAMES):
    ch=chars[name]; s=S_[ch['src']]
    bx,by=(ni%6)*BW,(ni//6)*BH
    for i in range(4):
        for j in range(4):
            g=rs(ch['sp'][i][j],s)
            al=np.array(g)[...,3]; ys=np.where(al.max(1)>0)[0]; xs=np.where(al.max(0)>0)[0]
            if len(ys)==0: continue
            g=g.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
            # centre horizontally on mass of lower half (feet), bottom on cell bottom-2
            a2=np.array(g)[...,3]; low=a2[int(a2.shape[0]*0.55):]; cx=(low.sum(0)*np.arange(low.shape[1])).sum()/max(1,low.sum())
            px=int(round(CW/2-cx)); py=CH-2-g.height
            tile=Image.new('RGBA',(CW,CH),(0,0,0,0)); tile.alpha_composite(g,(max(px,-g.width+1) if px<0 else px,py)) if (px>=0 and py>=0 and px+g.width<=CW) else tile.paste(g,(px,py),g)
            atlas.alpha_composite(tile,(bx+j*CW,by+i*CH))
    for i in range(3):
        for j in range(2):
            p=ch['por'][i][j]; sc=min(PS/p.width,PS/p.height)
            q=p.resize((round(p.width*sc),round(p.height*sc)),Image.LANCZOS)
            bgc=tuple(int(v) for v in np.array(p)[-3:,-3:].reshape(-1,3).min(0)); 
            tile=Image.new('RGB',(PS,PS),(12,6,16)); tile.paste(q,((PS-q.width)//2,(PS-q.height)//2))
            ta=np.array(tile).astype(int); dark=ta.max(2)<48
            lab,k=ndi.label(dark); edge=set(lab[0,:])|set(lab[-1,:])|set(lab[:,0])|set(lab[:,-1]); edge.discard(0)
            bg=np.isin(lab,list(edge)) if edge else np.zeros(dark.shape,bool)
            bg=ndi.binary_dilation(bg,iterations=1)&(ta.max(2)<70)|bg
            rgba=np.dstack([ta.astype(np.uint8),np.where(bg,0,255).astype(np.uint8)])
            patlas.paste(Image.fromarray(rgba,'RGBA'),((i*2+j)*PS,ni*PS))
def b64(im,quant=True):
    if quant:
        im=im.quantize(256,method=Image.FASTOCTREE) if im.mode=='RGBA' else im.quantize(256)
    bio=io.BytesIO(); im.save(bio,'PNG',optimize=True); return base64.b64encode(bio.getvalue()).decode()
atlas.save('/tmp/w/npc_atlas.png'); patlas.save('/tmp/w/npc_por.png')
js="'use strict';\n/* ===== npc_art.js: secondary-character sprites and portraits sliced from the supplied NPC sheets (generated by tools/make_npc.py) ===== */\n"
js+="const NPA = "+json.dumps(dict(cw=CW,ch=CH,ax=CW//2,ay=CH-2,ps=PS,ids=NAMES,cols=6))+";\n"
js+="NPA.src = 'data:image/png;base64,"+b64(atlas)+"';\nNPA.psrc = 'data:image/png;base64,"+b64(patlas)+"';\n"
js+=r'''
const NpcArt = {
  ready: false, spr: {}, por: {},
  load() {
    const ld = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    return Promise.all([ld(NPA.src), ld(NPA.psrc)]).then(([a, p]) => {
      try {
        if (!a || !p) return;
        const DI = { down: 0, up: 1, left: 2, right: 3 };
        NPA.ids.forEach((id, n) => {
          const bx = (n % NPA.cols) * NPA.cw * 4, by = Math.floor(n / NPA.cols) * NPA.ch * 4;
          Object.keys(DI).forEach((d) => { for (let f = 0; f < 4; f++) { const c = mkc(NPA.cw, NPA.ch); c.getContext('2d').drawImage(a, bx + f * NPA.cw, by + DI[d] * NPA.ch, NPA.cw, NPA.ch, 0, 0, NPA.cw, NPA.ch); this.spr[id + d + f] = c; } });
          ['neutral', 'happy', 'surprised', 'thinking', 'sad', 'angry'].forEach((e, i) => { const c = mkc(NPA.ps, NPA.ps); c.getContext('2d').drawImage(p, i * NPA.ps, n * NPA.ps, NPA.ps, NPA.ps, 0, 0, NPA.ps, NPA.ps); this.por[id + e] = c; });
        });
        this.ready = true;
      } catch (e) { console.error(e); }
    });
  },
};
const NPA_EXPR = { neutral: 'neutral', happy: 'happy', surprised: 'surprised', thinking: 'thinking', sad: 'sad', angry: 'angry', confident: 'neutral', determined: 'angry' };
(function () {
  const _get = Sprites.get.bind(Sprites), _meta = Sprites.meta.bind(Sprites), _pg = Portraits.get.bind(Portraits);
  Sprites.get = function (id, dir, f) { if (NpcArt.ready && NPA.ids.includes(id)) return NpcArt.spr[id + (NPA_EXPR && ['down', 'up', 'left', 'right'].includes(dir) ? dir : 'down') + (f & 3)]; return _get(id, dir, f); };
  Sprites.meta = function (id) { return NpcArt.ready && NPA.ids.includes(id) ? { w: NPA.cw, h: NPA.ch, ax: NPA.ax, ay: NPA.ay } : _meta(id); };
  Portraits.get = function (id, expr) { if (NpcArt.ready && NPA.ids.includes(id)) return NpcArt.por[id + NPA_EXPR[EXPR.includes(expr) ? expr : 'neutral']]; return _pg(id, expr); };
})();
'''
open(OUT,'w').write(js); print(len(js)//1024,'KB')
