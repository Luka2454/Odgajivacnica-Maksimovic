var EASE="cubic-bezier(.2,.7,.2,1)";
function menuStyles(open){
function bar(y,rot){return {position:"absolute",left:"13px",width:"20px",height:"1.5px",background:"#2B1D15",borderRadius:"2px",top:open?"23px":y,transform:open?"rotate("+rot+"deg)":"none",opacity:"1",transition:open?"top .2s "+EASE+", transform .3s "+EASE+" .15s, opacity .2s":"transform .2s "+EASE+", top .25s "+EASE+" .15s, opacity .2s .1s"};}
var b2=bar("23px",0); b2.opacity=open?"0":"1"; b2.transform=open?"scaleX(0)":"none";
return {bars:[bar("17px",45),b2,bar("29px",-45)],
menu:{position:"absolute",left:"0",right:"0",top:"100%",zIndex:"1",background:"#FFFFFF",borderBottom:"1px solid #E9E1D9",clipPath:open?"inset(0 0 0 0)":"inset(0 0 100% 0)",visibility:open?"visible":"hidden",transition:open?"clip-path .45s "+EASE+", visibility 0s":"clip-path .3s "+EASE+", visibility 0s .3s"},
link:function(i,n){return {display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",padding:"13px 0",borderBottom:i===n-1?"none":"1px solid #F0EAE4",color:"#2B1D15",fontFamily:"'Bodoni Moda',serif",fontSize:"21px",lineHeight:"1.2",opacity:open?"1":"0",transform:open?"none":"translateY(8px)",transition:open?"opacity .4s ease "+(0.08+i*0.04)+"s, transform .45s "+EASE+" "+(0.08+i*0.04)+"s":"opacity .15s ease, transform .15s ease"};}};
}
function slidePos(k,cur,n){
var o=((k-cur)%n+n)%n; if(o>n/2)o-=n; var d=Math.abs(o);
return {position:"absolute",left:"0",top:"50%",width:"min(440px, calc(100% - 48px))",height:"340px",transform:"translateY(-50%) translateX("+(o*106)+"%) scale("+(d?0.9:1)+")",transformOrigin:"left center",opacity:String(o<0?0:o===0?1:o===1?0.5:o===2?0.22:0),zIndex:String(10-d),pointerEvents:(o<0||o>2)?"none":"auto",cursor:d?"pointer":"default",transition:o===2?"opacity .5s ease .3s":o<-1?"none":"transform .55s cubic-bezier(.4,0,.2,1), opacity .55s ease"};
}
function dotStyle(k,cur){return {boxSizing:"content-box",width:k===cur?"22px":"8px",height:"8px",padding:"8px",margin:"-4px",border:"0",borderRadius:"12px",backgroundClip:"content-box",cursor:"pointer",backgroundColor:k===cur?"#7E4F2C":"#DDD2C8",transition:"width .3s, background-color .3s"};}
(function(){
function set(el,o){for(var k in o)el.style[k]=o[k];}
var hd=document.querySelector('[data-m="siteHeader"]'),sp=document.querySelector('[data-m="navSpacer"]');
var ft=document.querySelector('[data-m="siteFooter"]'),fsp=document.querySelector('[data-m="footSpacer"]');
function sync(){var a=hd.offsetHeight+'px',b=ft.offsetHeight+'px';if(sp.style.height!==a)sp.style.height=a;if(fsp.style.height!==b)fsp.style.height=b;}var rq=0;function sched(){cancelAnimationFrame(rq);rq=requestAnimationFrame(sync);}sync();if(window.ResizeObserver){var ro=new ResizeObserver(sched);ro.observe(hd);ro.observe(ft);}else window.addEventListener('resize',sched);
var burger=document.getElementById('burger'),menu=document.getElementById('menu'),open=false,menuY=0,mlinks=menu.querySelectorAll('a');
function setMenu(o){open=o;menuY=window.scrollY;var s=menuStyles(o);for(var i=0;i<3;i++)set(burger.children[i],s.bars[i]);set(menu,s.menu);for(var j=0;j<mlinks.length;j++)set(mlinks[j],s.link(j,mlinks.length));burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Zatvori meni':'Otvori meni');}
burger.addEventListener('click',function(){setMenu(!open);});
document.querySelectorAll('[data-close]').forEach(function(a){a.addEventListener('click',function(){if(open)setMenu(false);});});
window.addEventListener('resize',function(){if(open&&window.innerWidth>768)setMenu(false);});
window.addEventListener('scroll',function(){if(open&&Math.abs(window.scrollY-menuY)>60)setMenu(false);},{passive:true});
var slides=document.querySelectorAll('[data-slide]'),dots=document.querySelectorAll('[data-dot]'),n=slides.length,cur=0;
function go(k){cur=((k%n)+n)%n;for(var i=0;i<n;i++){set(slides[i],slidePos(i,cur,n));set(dots[i],dotStyle(i,cur));if(i===cur)slides[i].removeAttribute('aria-hidden');else slides[i].setAttribute('aria-hidden','true');}}
slides.forEach(function(s,i){s.addEventListener('click',function(){if(i!==cur)go(i);});});
dots.forEach(function(d,i){d.addEventListener('click',function(){go(i);});});
document.getElementById('revPrev').addEventListener('click',function(){go(cur-1);});
document.getElementById('revNext').addEventListener('click',function(){go(cur+1);});
var sl=document.getElementById('slider'),tx=null,ty=0;
sl.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
sl.addEventListener('touchend',function(e){if(tx===null)return;var t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;tx=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))go(dx<0?cur+1:cur-1);},{passive:true});
document.getElementById('msgBtn').addEventListener('click',function(e){
if(!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))return;
e.preventDefault();
function tryApp(url,onFail){var left=false;function mark(){left=true;}window.addEventListener('blur',mark,{once:true});document.addEventListener('visibilitychange',mark,{once:true});window.location.href=url;setTimeout(function(){window.removeEventListener('blur',mark);document.removeEventListener('visibilitychange',mark);if(!left&&document.visibilityState==='visible')onFail();},1500);}
tryApp('whatsapp://send?phone=381604994943',function(){tryApp('viber://chat?number=%2B381604994943',function(){window.open('https://wa.me/381604994943','_blank','noopener');});});
});
var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nd;
while((nd=w.nextNode())){var p=nd.parentElement;if(!p||/^(SCRIPT|STYLE)$/.test(p.tagName))continue;var tx2=nd.nodeValue,m=tx2.match(/(\S+)[ \t\n\u00A0]+(\S+)\s*$/);if(!m)continue;var nt=tx2.replace(/[ \t\n\u00A0]+(\S+\s*)$/,(m[1].length+m[2].length<=16?'\u00A0':' ')+'$1');if(nt!==tx2)nd.nodeValue=nt;}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.style.opacity='1';e.target.style.transform='none';io.unobserve(e.target);});},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
var vh=window.innerHeight;
document.querySelectorAll('main > section:not(#hero) > div').forEach(function(wrap){[].forEach.call(wrap.children,function(el,k){if(el.getBoundingClientRect().top<vh*0.9)return;var dl=Math.min(k,5)*0.08;el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .8s ease '+dl+'s, transform .8s cubic-bezier(.2,.7,.2,1) '+dl+'s';io.observe(el);});});
}
})();