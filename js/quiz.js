/* ============================================================
   4) QUIZ
============================================================ */
INIT.quiz = function(){
  const card=document.getElementById('quizCard');
  const TOPICS=[
    {key:'common', name:'상식', emoji:'💡', c:'#F2A65A', qs:[
      {q:'대한민국의 수도는?',opts:['부산','서울','인천','대전'],a:1,d:1},
      {q:'1년은 며칠일까요? (평년)',opts:['360','364','365','366'],a:2,d:1},
      {q:'신호등 색이 아닌 것은?',opts:['빨강','노랑','파랑','초록'],a:2,d:1},
      {q:'태양계에서 가장 큰 행성은?',opts:['지구','토성','목성','화성'],a:2,d:2},
      {q:'무지개에서 파장이 가장 긴 색은?',opts:['보라','초록','빨강','파랑'],a:2,d:2},
      {q:'대한민국 국회의원의 임기는 몇 년일까요?',opts:['3년','4년','5년','6년'],a:1,d:2},
      {q:'우리 몸에서 가장 작은 뼈가 있는 곳은?',opts:['손끝','귓속','발가락','코'],a:1,d:3},
      {q:'다이아몬드는 어떤 원소로 이루어져 있을까요?',opts:['규소','탄소','산소','철'],a:1,d:3},
      {q:'번개가 친 뒤 천둥이 늦게 들리는 이유는?',opts:['빛보다 소리가 느려서','소리가 반사돼서','귀가 늦게 반응해서','전기가 약해서'],a:0,d:3},
    ]},
    {key:'science', name:'과학', emoji:'🔬', c:'#5FB49C', qs:[
      {q:'물의 화학식은?',opts:['CO₂','O₂','H₂O','NaCl'],a:2,d:1},
      {q:'사람의 심장은 몇 개의 방으로 이루어져 있나요?',opts:['2','3','4','5'],a:2,d:1},
      {q:'식물이 광합성으로 흡수하는 기체는?',opts:['산소','이산화탄소','질소','수소'],a:1,d:1},
      {q:'빛의 속도는 약 초속 몇 km일까요?',opts:['3천','3만','30만','300만'],a:2,d:2},
      {q:'성인의 정상 체온은 약 몇 ℃일까요?',opts:['34.5','36.5','38.5','40.5'],a:1,d:2},
      {q:'소리가 가장 빠르게 전달되는 매질은?',opts:['공기','물','철','진공'],a:2,d:2},
      {q:'원자에서 음(−)전하를 띠는 입자는?',opts:['양성자','중성자','전자','광자'],a:2,d:3},
      {q:'DNA의 이중나선 구조를 밝힌 과학자는?',opts:['멘델','왓슨과 크릭','다윈','파스퇴르'],a:1,d:3},
      {q:'뉴턴의 운동 제2법칙이 나타내는 관계는?',opts:['F = ma','E = mc²','V = IR','PV = nRT'],a:0,d:3},
    ]},
    {key:'history', name:'역사', emoji:'🏛️', c:'#C58BD6', qs:[
      {q:'훈민정음을 창제한 왕은?',opts:['태조','세종대왕','정조','광개토대왕'],a:1,d:1},
      {q:'거북선을 이끈 조선의 장군은?',opts:['강감찬','이순신','권율','김유신'],a:1,d:1},
      {q:'고려를 세운 인물은?',opts:['왕건','이성계','견훤','궁예'],a:0,d:1},
      {q:'대한민국 임시정부가 수립된 해는?',opts:['1910','1919','1945','1948'],a:1,d:2},
      {q:'삼국시대에 속하지 않는 나라는?',opts:['고구려','백제','신라','발해'],a:3,d:2},
      {q:'조선을 건국한 인물은?',opts:['정몽주','이성계','최영','정도전'],a:1,d:2},
      {q:'조선의 법전 《경국대전》을 완성·반포한 왕은?',opts:['태종','세조','성종','중종'],a:2,d:3},
      {q:'평양 천도를 단행한 고구려의 왕은?',opts:['장수왕','소수림왕','미천왕','고국천왕'],a:0,d:3},
      {q:'제1차 세계대전의 직접적 계기가 된 사건은?',opts:['진주만 공습','사라예보 사건','러시아 혁명','베르사유 조약'],a:1,d:3},
    ]},
    {key:'world', name:'세계', emoji:'🌍', c:'#7C9EDB', qs:[
      {q:'세계에서 가장 큰 대양은?',opts:['대서양','태평양','인도양','북극해'],a:1,d:1},
      {q:'에펠탑이 있는 도시는?',opts:['런던','로마','파리','베를린'],a:2,d:1},
      {q:'미국의 수도는?',opts:['뉴욕','워싱턴 D.C.','LA','시카고'],a:1,d:1},
      {q:'세계에서 가장 높은 산은?',opts:['K2','에베레스트','한라산','후지산'],a:1,d:2},
      {q:'가장 인구가 많은 대륙은?',opts:['아프리카','유럽','아시아','남아메리카'],a:2,d:2},
      {q:'세계에서 가장 긴 강은?',opts:['아마존강','나일강','양쯔강','미시시피강'],a:1,d:2},
      {q:'호주의 수도는?',opts:['시드니','멜버른','캔버라','브리즈번'],a:2,d:3},
      {q:'유로화를 사용하지 않는 나라는?',opts:['독일','프랑스','스위스','스페인'],a:2,d:3},
      {q:'세계에서 국토 면적이 가장 넓은 나라는?',opts:['중국','미국','캐나다','러시아'],a:3,d:3},
    ]},
    {key:'fun', name:'넌센스', emoji:'🤪', c:'#e8615b', qs:[
      {q:'세상에서 가장 뜨거운 과일은?',opts:['천도복숭아','불수감','핫도그','열대과일'],a:0,d:1},
      {q:'문은 문인데 못 여는 문은?',opts:['소문','대문','정문','뒷문'],a:0,d:1},
      {q:'개가 사람을 가르치면?',opts:['개인교습','멍멍교실','도그스쿨','핫도그'],a:0,d:1},
      {q:'왕이 넘어지면?',opts:['킹콩','왕자','넘어진왕','폐하'],a:0,d:2},
      {q:'아몬드가 죽으면?',opts:['다이아몬드','호두','피스타치오','땅콩'],a:0,d:2},
      {q:'가장 빠른 닭은?',opts:['후다닥','통닭','번개닭','치킨런'],a:0,d:2},
      {q:'세상에서 가장 억울한 도형은?',opts:['삼각형','사다리꼴','원','마름모'],a:1,d:3},
      {q:'소가 웃으면 한 마디로?',opts:['우하하','소리','와우','음메'],a:1,d:3},
      {q:'발이 두 개 달린 소는?',opts:['이발소','한우','젖소','황소'],a:0,d:3},
    ]},
  ];
  const DIFFS=[{v:0,name:'전체'},{v:1,name:'쉬움'},{v:2,name:'보통'},{v:3,name:'어려움'}];
  let diff=0;
  const filt=qs=>diff===0?qs:qs.filter(q=>q.d===diff);

  let quiz=[], idx=0, score=0, answered=false, curTopic=null;

  function menu(){
    card.innerHTML=
      '<div class="quiz-q" style="text-align:center;margin-bottom:14px;">주제를 골라주세요</div>'+
      '<div class="tabs" id="qzDiff" style="margin-bottom:18px;"></div>'+
      '<div class="topic-grid" id="qzTopics"></div>';
    const dbox=document.getElementById('qzDiff');
    DIFFS.forEach(d=>{
      const b=document.createElement('button');b.className='tab'+(d.v===diff?' active':'');b.textContent=d.name;
      b.onclick=()=>{diff=d.v;menu();};
      dbox.appendChild(b);
    });
    const g=document.getElementById('qzTopics');
  const ICONKEY={common:'bulb',science:'flask',history:'column',world:'globe',fun:'smile'};
    TOPICS.forEach(t=>{
      const cnt=filt(t.qs).length;
      const b=document.createElement('button');b.className='topic-card';b.style.setProperty('--tc',t.c);
      b.disabled=cnt===0;
      b.innerHTML='<span class="topic-emoji" data-icon="'+ICONKEY[t.key]+'" style="background:'+t.c+'"></span>'+
        '<span class="topic-name">'+t.name+'</span><span class="topic-meta">'+cnt+'문제</span>';
      b.onclick=()=>startTopic(t);
      g.appendChild(b);
    });
    const all=document.createElement('button');all.className='topic-card all';all.style.setProperty('--tc','#3a332c');
    const total=TOPICS.reduce((n,t)=>n+filt(t.qs).length,0);
    all.innerHTML='<span class="topic-emoji" data-icon="target" style="background:#3a332c"></span>'+
      '<span class="topic-name">전체 도전</span><span class="topic-meta">'+Math.min(total,10)+'문제 · 랜덤</span>';
    all.onclick=()=>startTopic({name:'전체',c:'#3a332c',qs:shuffle(TOPICS.flatMap(t=>filt(t.qs))).slice(0,10)});
    g.appendChild(all);
    paintIcons();
  }
  function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function startTopic(t){curTopic=t;quiz=shuffle(filt(t.qs));idx=0;score=0;answered=false;render();}

  function render(){
    if(idx>=quiz.length){
      const full=score===quiz.length;
      const pct=Math.round(score/quiz.length*100);
      card.innerHTML='<div style="text-align:center;padding:16px;">'+
        '<div class="score-badge" style="background:'+curTopic.c+'"><div><b>'+score+'</b><span>/'+quiz.length+'</span></div></div>'+
        '<div class="quiz-q" style="margin-top:14px">'+(full?'만점입니다!':pct>=60?'잘했어요!':'좋은 도전이었어요')+'</div>'+
        '<p class="hint">'+curTopic.name+' · 정답 '+score+'/'+quiz.length+'</p>'+
        '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">'+
        '<button class="btn" id="qzRe">다시 풀기</button>'+
        '<button class="btn ghost" id="qzMenu">주제 선택</button></div></div>';
      document.getElementById('qzRe').onclick=()=>startTopic(curTopic);
      document.getElementById('qzMenu').onclick=menu;
      return;
    }
    const cur=quiz[idx], c=curTopic.c;
    card.innerHTML=
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'+
        '<span class="topic-pill" style="background:'+c+'22;color:'+c+'">'+curTopic.name+'</span>'+
        '<button class="btn ghost sm" id="qzBack">← 주제</button></div>'+
      '<div class="progressbar"><i style="width:'+(idx/quiz.length*100)+'%;background:'+c+'"></i></div>'+
      '<div style="display:flex;justify-content:space-between;margin:14px 0 4px;" class="hint"><span>문제 '+(idx+1)+' / '+quiz.length+'</span><span>점수 '+score+'</span></div>'+
      '<div class="quiz-q">'+cur.q+'</div>'+
      '<div class="quiz-opts" id="qzOpts"></div>';
    document.getElementById('qzBack').onclick=menu;
    const box=document.getElementById('qzOpts');
    cur.opts.forEach((o,i)=>{
      const b=document.createElement('button');b.className='opt';b.textContent=o;
      b.onclick=()=>{
        if(answered)return; answered=true; const a=audio();
        [...box.children].forEach(c=>c.disabled=true);
        if(i===cur.a){b.classList.add('correct');score++;a.beep(880);}
        else{b.classList.add('wrong');box.children[cur.a].classList.add('correct');a.beep(200);}
        setTimeout(()=>{idx++;answered=false;render();},900);
      };
      box.appendChild(b);
    });
  }
  menu();
  REOPEN.quiz=()=>{if(idx>=quiz.length||!curTopic)menu();};
};