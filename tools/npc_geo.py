import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
D='/mnt/user-data/attachments/8f93ad84-3d17-5466-8bf9-2da4a206e9f9/'
S5=D+'5d881740-image.png'; S6=D+'404118a4-image.png'
NAMES=['finch','pip','luma','wren','tess','orin','bramm','student','fern','qtree','sylvan','oak','heron','owlet','nara','tarn','sera','rowan','tumble','lin','sage1','sage2','citizen','keeper','seeker','nullc','sagee','sagep','ferry1','ferry2']
# windows (x0,x1) per col, (y0,y1) per row
W5=dict(xs=[(8,251),(265,508),(521,765),(779,1022),(1033,1276),(1290,1532)],ys=[(40,205),(246,410),(452,604),(645,799),(840,1002)])
W6=dict(xs=[(10,379),(395,764),(780,1149),(1165,1531)],ys=[(40,326),(374,661),(719,998)])
def runs(p,th=0,mingap=1):
    idx=np.where(p>th)[0]; out=[]; s=None; pv=None
    for i in idx:
        if s is None: s=i
        elif i-pv>mingap: out.append((s,pv)); s=i
        pv=i
    if s is not None: out.append((s,pv))
    return out
def geom(a,win):
    x0,x1,y0,y1=win
    sub=a[y0:y1,x0:x1].astype(int)
    fg=(sub.max(2)>62)
    fg=ndi.binary_opening(fg,iterations=1)
    cs=fg.sum(0)
    w=x1-x0
    # gap between sprites and portraits: widest run of empty columns within 0.42..0.68 of width
    lo,hi=int(w*0.40),int(w*0.70)
    best=None;cur=None
    for x in range(lo,hi):
        if cs[x]<=1:
            if cur is None: cur=x
            L=x-cur+1
            if best is None or L>best[1]: best=(cur,L)
        else: cur=None
    sp = (best[0]+best[1]//2) if best else int(w*0.55)
    L=fg[:,:sp]; R=fg[:,sp:]
    def bb(m,ox):
        ys,xs=np.where(m); 
        return (xs.min()+ox,ys.min(),xs.max()+1+ox,ys.max()+1)
    return bb(L,0),bb(R,sp),sp

def panel_cells(a,x0,y0,x1,y1,split):
    """returns sprite cells[4][4] and portrait cells[3][2] as absolute boxes"""
    sub=a[y0:y1,x0:x1].astype(int)
    fg=ndi.binary_opening(sub.max(2)>64,iterations=1)
    w=x1-x0
    cs=fg[:, split-10:split+10].sum(0); sp=split-10+int(np.argmin(cs))
    def bbox(m,ox):
        c=m.sum(0); r=m.sum(1)
        xs=np.where(c>=2)[0]; ys=np.where(r>=2)[0]
        return xs.min()+ox, ys.min(), xs.max()+1+ox, ys.max()+1
    L=bbox(fg[:,:sp],0); R=bbox(fg[:,sp:],sp)
    sc=[]; 
    for r in range(4):
        row=[]
        for c in range(4):
            row.append((x0+L[0]+(L[2]-L[0])*c/4, y0+L[1]+(L[3]-L[1])*r/4, x0+L[0]+(L[2]-L[0])*(c+1)/4, y0+L[1]+(L[3]-L[1])*(r+1)/4))
        sc.append(row)
    pc=[]
    for r in range(3):
        row=[]
        for c in range(2):
            row.append((x0+R[0]+(R[2]-R[0])*c/2, y0+R[1]+(R[3]-R[1])*r/3, x0+R[0]+(R[2]-R[0])*(c+1)/2, y0+R[1]+(R[3]-R[1])*(r+1)/3))
        pc.append(row)
    return sc,pc

def ext(p,th,mingap):
    r=runs(p,th,mingap)
    r=[x for x in r if x[1]-x[0]>=4]
    return (r[0][0],r[-1][1]+1) if r else None
def grid(a,x0,x1,y0,y1,hint,th_c=2,th_r=2,th_pr=10):
    a=a.astype(int); w=x1-x0
    fg=(a[y0:y1,x0:x1].max(2)>64)
    fg=ndi.binary_opening(fg,iterations=1)
    cs=fg[:int((y1-y0)-8),:].sum(0)
    lo,hi=hint-9,hint+9
    sp=lo+int(np.argmin(cs[lo:hi]))
    H=(y1-y0)-8
    # sprite block
    sx=ext(fg[:H,6:sp].sum(0),th_c,3); sy=ext(fg[:H,6:sp].sum(1),th_r,3)
    px=ext(fg[:H,sp:w-5].sum(0),th_c,3); py=ext(fg[:H,sp:w-5].sum(1),th_pr,3)
    S=(x0+6+sx[0],y0+sy[0],x0+6+sx[1],y0+sy[1]); P=(x0+sp+px[0],y0+py[0],x0+sp+px[1],y0+py[1])
    return S,P


def bounds(p,n,lo,th,mingap=1):
    """boundaries (n+1 values, absolute offset lo) from n runs in projection p, else equal split"""
    r=[x for x in runs(p,th,mingap) if x[1]-x[0]>=3]
    if len(r)==n:
        b=[r[0][0]]+[ (r[i][1]+r[i+1][0])/2.0+0.5 for i in range(n-1)]+[r[-1][1]+1]
        return [lo+v for v in b], True
    e=ext(p,th,3); 
    return [lo+e[0]+(e[1]-e[0])*i/n for i in range(n+1)], False

def grid2(a,x0,x1,y0,y1,hint,th=2):
    S,P=grid(a,x0,x1,y0,y1,hint)
    a=a.astype(int)
    fg=ndi.binary_opening(a.max(2)>64,iterations=1)
    def region(box): return fg[int(box[1]):int(box[3]),int(box[0]):int(box[2])]
    rs=region(S); rp=region(P)
    xb,ok1=bounds(rs.sum(0),4,S[0],th); yb,ok2=bounds(rs.sum(1),4,S[1],th)
    pxb,ok3=bounds(rp.sum(0),2,P[0],th); pyb,ok4=bounds(rp.sum(1),3,P[1],10)
    return xb,yb,pxb,pyb,(ok1,ok2,ok3,ok4)
