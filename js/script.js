const CDARK = {red:'#b73f3a',yellow:'#a97e1d',blue:'#3f63a8',purple:'#8b4fa5',green:'#2f7a63',orange:'#b96f22',mint:'#3f8a48',rose:'#c25f76'};

/* Hand-drawn line icons (no emoji) */
const ICONS = {
  roulette:'<circle cx="12" cy="12" r="9"/><circle class="fill" cx="12" cy="12" r="1.6"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="5.6" y1="5.6" x2="18.4" y2="18.4"/><line x1="18.4" y1="5.6" x2="5.6" y2="18.4"/>',
  memo:'<rect x="5" y="3.5" width="14" height="17" rx="2"/><line x1="8.5" y1="8" x2="15.5" y2="8"/><line x1="8.5" y1="12" x2="15.5" y2="12"/><line x1="8.5" y1="16" x2="13" y2="16"/>',
  draw:'<path d="M4 20 h4 L19 9 l-4 -4 L4 16 z"/><line x1="14" y1="6" x2="18" y2="10"/>',
  quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.3 9.4a2.7 2.7 0 1 1 3.5 2.6c-.9 .4 -1.3 1 -1.3 2"/><circle class="fill" cx="11.5" cy="16.4" r="0.7"/>',
  ladder:'<line x1="8" y1="3.5" x2="8" y2="20.5"/><line x1="16" y1="3.5" x2="16" y2="20.5"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/>',
  timer:'<line x1="9" y1="3" x2="15" y2="3"/><line x1="12" y1="3" x2="12" y2="5"/><circle cx="12" cy="13" r="8"/><line x1="12" y1="13" x2="12" y2="9"/><line x1="12" y1="13" x2="15" y2="14.5"/>',
  random:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle class="fill" cx="8.5" cy="8.5" r="1.4"/><circle class="fill" cx="15.5" cy="8.5" r="1.4"/><circle class="fill" cx="12" cy="12" r="1.4"/><circle class="fill" cx="8.5" cy="15.5" r="1.4"/><circle class="fill" cx="15.5" cy="15.5" r="1.4"/>',
  coin:'<ellipse cx="12" cy="12" rx="9" ry="9"/><path d="M8 8.5 L10 15 L12 10.5 L14 15 L16 8.5"/><line x1="8.6" y1="12" x2="15.4" y2="12"/>',
  bulb:'<path d="M9 16.5a5 5 0 1 1 6 0 v1.5 h-6 z"/><line x1="9.5" y1="20.5" x2="14.5" y2="20.5"/>',
  flask:'<path d="M10 3 v6 L5.5 18 a1.5 1.5 0 0 0 1.4 2 h10.2 a1.5 1.5 0 0 0 1.4 -2 L14 9 V3"/><line x1="9" y1="3" x2="15" y2="3"/><line x1="8" y1="14" x2="16" y2="14"/>',
  column:'<line x1="4" y1="20.5" x2="20" y2="20.5"/><path d="M4 8 L12 3.5 L20 8"/><line x1="7" y1="9" x2="7" y2="18"/><line x1="12" y1="9" x2="12" y2="18"/><line x1="17" y1="9" x2="17" y2="18"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/>',
  smile:'<circle cx="12" cy="12" r="9"/><circle class="fill" cx="9" cy="10" r="0.9"/><circle class="fill" cx="15" cy="10" r="0.9"/><path d="M8.5 14.5 a4 4 0 0 0 7 0"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle class="fill" cx="12" cy="12" r="1.6"/>'
};
function paintIcons(){
  document.querySelectorAll('[data-icon]').forEach(el=>{
    const svg=ICONS[el.dataset.icon]; if(!svg||el.dataset.painted)return;
    el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+svg+'</svg>';
    el.dataset.painted='1';
  });
}

const inited = {};
function go(id){
  const target = document.querySelector('.screen[data-screen="'+id+'"]') ? id : 'home';
  document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active', s.dataset.screen===target));
  document.body.dataset.screen = target;
  if(location.hash !== '#'+target) history.pushState(null,'','#'+target);
  window.scrollTo({top:0});
  if(!inited[target] && INIT[target]){
  if(target === 'home'){
    requestAnimationFrame(() => {
      INIT[target]();
      inited[target] = true;
    });
  } else {
    INIT[target]();
    inited[target] = true;
  }
}
  if(REOPEN[target]) REOPEN[target]();
}
window.addEventListener('popstate', ()=>{
  const id = location.hash.replace('#','') || 'home';
  go(id);
});

/* Build home tiles */
(function buildHome(){
  const wrap = document.getElementById('rides');
  RIDES.forEach(r=>{
    const b = document.createElement('button');
    b.className='ride';
    b.style.setProperty('--c','var(--'+r.c+')');
    b.style.setProperty('--c-dark', CDARK[r.c]);
    b.style.setProperty('--sh', CDARK[r.c]+'33');
    b.innerHTML =
      '<div class="ride-emoji" data-icon="'+r.id+'" style="background:var(--'+r.c+')"></div>'+
      '<div><div class="ride-name">'+r.name+'</div><div class="ride-desc">'+r.desc+'</div></div>'+
      '<div class="ride-tag">'+r.tag+' →</div>';
    b.onclick = ()=>go(r.id);
    wrap.appendChild(b);
  });
  const flags = document.getElementById('flags');
  ['red','yellow','blue','purple','green','orange','mint','rose'].forEach(c=>{
    const s=document.createElement('span'); s.style.borderTopColor='var(--'+c+')'; flags.appendChild(s);
  });
  paintIcons();
})();

/* Shared audio */
function makeAudio(){
  const AC = window.AudioContext||window.webkitAudioContext;
  if(!AC) return {resume(){},tick(){},ding(){},beep(){}};
  const ac = new AC();
  const env=(o,g,t,dur,vol)=>{g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+0.02);g.gain.exponentialRampToValueAtTime(0.0005,t+dur);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur+0.05);};
  return {
    resume(){if(ac.state==='suspended')ac.resume();},
    tick(){const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(1200,t);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.0008,t+0.05);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+0.06);},
    ding(){const t=ac.currentTime;[523.25,659.25,783.99].forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;env(o,g,t+i*0.06,0.6,0.12);});},
    beep(f){const t=ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f||880;env(o,g,t,0.25,0.1);}
  };
}
let AUDIO=null;
function audio(){AUDIO=AUDIO||makeAudio();AUDIO.resume();return AUDIO;}

/* ============================================================
   5) LADDER (Ghost leg)
============================================================ */
INIT.ladder = function(){
  const canvas=document.getElementById('ldCanvas'), ctx=canvas.getContext('2d');
  const namesBox=document.getElementById('ldNames'), resBox=document.getElementById('ldResults');
  const resultEl=document.getElementById('ldResult');
  const PAL=['#E8615B','#5FB49C','#7C9EDB','#C58BD6','#F2A65A','#6FBF73'];
  let n=3, names=['A','B','C'], results=['🍫','🥤','💸'], rungs=[], animating=false;

  function buildInputs(){
    const mk=(box,arr,key)=>{box.innerHTML='';arr.forEach((v,i)=>{const inp=document.createElement('input');inp.className='field';inp.value=v;inp.style.borderLeft='5px solid '+PAL[i%PAL.length];inp.oninput=e=>arr[i]=e.target.value;box.appendChild(inp);});};
    mk(namesBox,names);mk(resBox,results);
  }
  function genRungs(){
    rungs=[]; const rows=8;
    for(let r=0;r<rows;r++){for(let c=0;c<n-1;c++){ if(Math.random()<0.32){ if(!rungs.some(x=>x.row===r&&(x.col===c-1||x.col===c+1))) rungs.push({row:r,col:c}); } }}
  }
  function layout(){
    const dpr=window.devicePixelRatio||1, w=canvas.clientWidth||520, h=340;
    canvas.style.height=h+'px'; canvas.width=Math.round(w*dpr); canvas.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); return {w,h};
  }
  const rows=8;
  function colX(w,i){const pad=w*0.09;return pad+(w-2*pad)*(i/(n-1||1));}
  function rowY(h,r){const top=40,bot=h-40;return top+(bot-top)*(r/(rows));}
  function draw(path){
    const {w,h}=layout();
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth=3;ctx.strokeStyle='#e2d8c8';
    for(let i=0;i<n;i++){const x=colX(w,i);ctx.beginPath();ctx.moveTo(x,rowY(h,0));ctx.lineTo(x,rowY(h,rows));ctx.stroke();}
    rungs.forEach(rg=>{const x0=colX(w,rg.col),x1=colX(w,rg.col+1),y=rowY(h,rg.row+0.5);ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke();});
    // caps
    for(let i=0;i<n;i++){const x=colX(w,i);[0,rows].forEach(r=>{ctx.beginPath();ctx.arc(x,rowY(h,r),6,0,7);ctx.fillStyle=PAL[i%PAL.length];ctx.fill();});}
    if(path){ctx.lineWidth=5;ctx.strokeStyle=path.color;ctx.beginPath();path.pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();}
  }
  function trace(start){
    const {w,h}=layout(); let col=start; const pts=[{x:colX(w,col),y:rowY(h,0)}];
    for(let r=0;r<rows;r++){
      pts.push({x:colX(w,col),y:rowY(h,r+0.5)});
      const left=rungs.find(x=>x.row===r&&x.col===col-1), right=rungs.find(x=>x.row===r&&x.col===col);
      if(right){col++;pts.push({x:colX(w,col),y:rowY(h,r+0.5)});}
      else if(left){col--;pts.push({x:colX(w,col),y:rowY(h,r+0.5)});}
    }
    pts.push({x:colX(w,col),y:rowY(h,rows)});
    return {col,pts};
  }
  function run(start){
    if(animating)return; animating=true; resultEl.textContent='';
    const t=trace(start), full=t.pts, col=t.color=PAL[start%PAL.length];
    let i=1; const seg=[full[0]];
    (function step(){
      if(i<full.length){seg.push(full[i]);draw({pts:seg.slice(),color:col});i++;setTimeout(step,90);}
      else{animating=false;audio().ding();resultEl.innerHTML='<span style="color:'+col+'">'+ (names[start]||'?') +'</span> → '+(results[t.col]||'?');}
    })();
  }
  function setN(v){n=Math.max(2,Math.min(6,v));
    while(names.length<n){names.push(String.fromCharCode(65+names.length));}names=names.slice(0,n);
    while(results.length<n){results.push('🎁');}results=results.slice(0,n);
    buildInputs();genRungs();draw();resultEl.textContent='';
  }
  namesBox.addEventListener('click',e=>{});
  // clicking a name input's top cap: use buttons row instead -> click name to run
  namesBox.addEventListener('dblclick',()=>{});
  document.getElementById('ldPlus').onclick=()=>setN(n+1);
  document.getElementById('ldMinus').onclick=()=>setN(n-1);
  document.getElementById('ldShuffle').onclick=()=>{genRungs();draw();resultEl.textContent='';};
  document.getElementById('ldRunAll').onclick=()=>{
    const map=names.map((nm,i)=>nm+' → '+(results[trace(i).col]||'?'));
    resultEl.style.fontSize='16px';resultEl.innerHTML=map.join('<br>');
  };
  // click on canvas top area to pick a lane
  canvas.addEventListener('click',e=>{
    const {w,h}=layout(); const r=canvas.getBoundingClientRect(); const x=e.clientX-r.left;
    let best=0,bd=1e9; for(let i=0;i<n;i++){const d=Math.abs(colX(w,i)-x);if(d<bd){bd=d;best=i;}}
    resultEl.style.fontSize='22px'; run(best);
  });
  buildInputs();genRungs();
  REOPEN.ladder=()=>draw();
  draw();
};

/* ============================================================
   6) TIMER / STOPWATCH
============================================================ */
INIT.timer = function(){
  const tabs=document.querySelectorAll('[data-screen="timer"] .tab');
  const swPane=document.getElementById('swPane'), tmPane=document.getElementById('tmPane');
  tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');
    const m=t.dataset.mode; swPane.style.display=m==='stopwatch'?'':'none'; tmPane.style.display=m==='timer'?'':'none';});

  // Stopwatch
  const swClock=document.getElementById('swClock');
  let swRun=false, swStart=0, swAcc=0, swRAF=null, laps=[];
  const fmt=ms=>{const m=Math.floor(ms/60000),s=Math.floor(ms/1000)%60,cs=Math.floor(ms/10)%100;
    return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'<small>.'+String(cs).padStart(2,'0')+'</small>';};
  function swTick(){const ms=swAcc+(swRun?performance.now()-swStart:0);swClock.innerHTML=fmt(ms);if(swRun)swRAF=requestAnimationFrame(swTick);}
  document.getElementById('swStart').onclick=function(){
    if(swRun){swAcc+=performance.now()-swStart;swRun=false;this.textContent='시작';document.getElementById('swLap').disabled=true;cancelAnimationFrame(swRAF);}
    else{swStart=performance.now();swRun=true;this.textContent='정지';document.getElementById('swLap').disabled=false;swTick();}
  };
  document.getElementById('swLap').onclick=()=>{const ms=swAcc+(swRun?performance.now()-swStart:0);laps.unshift(ms);renderLaps();};
  document.getElementById('swReset').onclick=()=>{swRun=false;swAcc=0;laps=[];cancelAnimationFrame(swRAF);swClock.innerHTML=fmt(0);document.getElementById('swStart').textContent='시작';document.getElementById('swLap').disabled=true;renderLaps();};
  function renderLaps(){const box=document.getElementById('swLaps');box.innerHTML='';laps.forEach((ms,i)=>{const d=document.createElement('div');d.className='lap';d.innerHTML='<span>랩 '+(laps.length-i)+'</span><span>'+fmt(ms).replace(/<\/?small>/g,'')+'</span>';box.appendChild(d);});}
  swClock.innerHTML=fmt(0);

  // Timer
  const tmClock=document.getElementById('tmClock');
  let tmRun=false, tmEnd=0, tmRAF=null, tmLeft=300000;
  const fmt2=ms=>{ms=Math.max(0,ms);const m=Math.floor(ms/60000),s=Math.ceil(ms/1000)%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');};
  function setFromInputs(){const m=+document.getElementById('tmMin').value||0,s=+document.getElementById('tmSec').value||0;tmLeft=(m*60+s)*1000;tmClock.textContent=fmt2(tmLeft);}
  document.getElementById('tmMin').oninput=()=>{if(!tmRun)setFromInputs();};
  document.getElementById('tmSec').oninput=()=>{if(!tmRun)setFromInputs();};
  function tmTick(){const left=tmEnd-performance.now();tmClock.textContent=fmt2(left);
    if(left<=0){tmRun=false;document.getElementById('tmStart').textContent='시작';const a=audio();[0,300,600].forEach(d=>setTimeout(()=>a.beep(660),d));tmClock.textContent='00:00';return;}
    tmRAF=requestAnimationFrame(tmTick);}
  document.getElementById('tmStart').onclick=function(){
    if(tmRun){tmLeft=tmEnd-performance.now();tmRun=false;this.textContent='시작';cancelAnimationFrame(tmRAF);}
    else{if(tmLeft<=0)setFromInputs();if(tmLeft<=0)return;tmEnd=performance.now()+tmLeft;tmRun=true;this.textContent='정지';audio();tmTick();}
  };
  document.getElementById('tmReset').onclick=()=>{tmRun=false;cancelAnimationFrame(tmRAF);setFromInputs();document.getElementById('tmStart').textContent='시작';};
  setFromInputs();
};

/* ============================================================
   7) RANDOM NUMBER
============================================================ */
INIT.random = function(){
  const big=document.getElementById('rnBig'), chips=document.getElementById('rnChips'), btn=document.getElementById('rnDraw');
  btn.onclick=()=>{
    let lo=parseInt(document.getElementById('rnMin').value,10), hi=parseInt(document.getElementById('rnMax').value,10);
    let cnt=Math.max(1,parseInt(document.getElementById('rnCount').value,10)||1);
    const uniq=document.getElementById('rnUnique').checked;
    if(isNaN(lo)||isNaN(hi))return; if(lo>hi){const t=lo;lo=hi;hi=t;}
    const span=hi-lo+1; if(uniq)cnt=Math.min(cnt,span);
    const a=audio();
    const pick=()=>{
      if(uniq){const pool=[];for(let i=lo;i<=hi;i++)pool.push(i);for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,cnt).sort((x,y)=>x-y);}
      return Array.from({length:cnt},()=>lo+Math.floor(Math.random()*span));
    };
    // roll animation
    let ticks=0; chips.innerHTML='';
    const iv=setInterval(()=>{
      const r=lo+Math.floor(Math.random()*span); big.textContent=r; a.tick(); ticks++;
      if(ticks>16){clearInterval(iv);const out=pick();a.ding();
        if(cnt===1){big.textContent=out[0];chips.innerHTML='';}
        else{big.textContent='';chips.innerHTML='';out.forEach(v=>{const c=document.createElement('div');c.className='chip';c.textContent=v;chips.appendChild(c);});}
      }
    },70);
  };
};

/* ============================================================
   8) COIN FLIP
============================================================ */
INIT.coin = function(){
  const el=document.getElementById('coinEl'), resEl=document.getElementById('coinResult');
  const btn=document.getElementById('coinFlip');
  const fEl=document.getElementById('coinFront'), bEl=document.getElementById('coinBack'), tEl=document.getElementById('coinTotal');
  let deg=0, flipping=false;
  let tally=load('park.coin',{front:0,back:0});
  function paint(){fEl.textContent=tally.front;bEl.textContent=tally.back;tEl.textContent=tally.front+tally.back;}
  function flip(){
    if(flipping)return; flipping=true; btn.disabled=true; resEl.textContent=''; const a=audio();
    const back=Math.random()<0.5;
    const base=Math.ceil(deg/360)*360;
    deg=base+360*5+(back?180:0);
    if(deg<=base)deg+=360;
    el.style.transform='rotateY('+deg+'deg)';
    let ticks=0; const iv=setInterval(()=>{a.tick();if(++ticks>10)clearInterval(iv);},170);
    setTimeout(()=>{
      flipping=false; btn.disabled=false; clearInterval(iv);
      if(back){tally.back++;resEl.textContent='뒤!';}else{tally.front++;resEl.textContent='앞!';}
      save('park.coin',tally); paint(); a.ding();
    },2350);
  }
  btn.onclick=flip;
  document.getElementById('coinReset').onclick=()=>{tally={front:0,back:0};save('park.coin',tally);paint();resEl.textContent='';};
  paint();
};

/* ============================================================
   Storage helpers
============================================================ */

/* Boot */
(function(){const id=location.hash.replace('#','')||'home';go(id);})();