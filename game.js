(() => {
  'use strict';
  const data=window.UNIVERSE, art=window.MODERN_ART;
  const canvas=document.getElementById('game');
  const ctx=canvas?.getContext('2d',{alpha:false});
  const hint=document.getElementById('hint'), sceneName=document.getElementById('scene-name'), sceneCounter=document.getElementById('scene-counter');
  const interactButton=document.getElementById('interact'), mobileInteract=document.getElementById('mobile-interact'), exitButton=document.getElementById('exit');
  const roomActions=document.getElementById('room-actions'), objectContainer=document.getElementById('objects');
  const dialog=document.getElementById('dialog'), dialogClose=document.getElementById('dialog-close');
  const fade=document.getElementById('fade-screen');
  const toast=document.getElementById('surprise-toast');
  const duduSecret=document.getElementById('dudu-secret');
  const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
  let toastTimer;
  function announce(message, duration=3500){
    if(!toast)return;
    toast.textContent=message;toast.hidden=false;
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>{toast.hidden=true;},duration);
  }
  const yearElement=document.getElementById('year'); if(yearElement) yearElement.textContent=new Date().getFullYear();
  if (!ctx||!data||!art) {hint.textContent='Não foi possível iniciar o jogo. Confira se os arquivos JS estão na mesma pasta do index.html.';return;}
  ctx.imageSmoothingEnabled=true;
  const rooms=new Map(data.scenes.map(item=>[item.id,item]));
  const progressKey='luana-vila-seen-final-v1';
  let stored=[];
  try { stored=JSON.parse(localStorage.getItem(progressKey)||'[]'); } catch {}
  const seen=new Set(stored.filter(id=>rooms.has(id)));
  const held=new Set();
  const duduPath=[
    {x:468,y:430},{x:433,y:443},{x:385,y:445},{x:328,y:437},
    {x:286,y:422},{x:335,y:439},{x:397,y:447},{x:452,y:434}
  ];
  const dudu={kind:'dog',id:'dudu',title:'Dudu',label:'Dudu',x:468,y:430,
    dir:'left',moving:false,waypoint:1,pauseUntil:1.4,happyUntil:0,justPetted:false,
    petCount:0,lastPetTime:-99,rewardUnlocked:false};
  const state={data,scene:'world',current:null,player:{x:384,y:432,dir:'up',step:0,vx:0,vy:0},
    reducedMotion:reduceMotion,
    dudu,near:null,camera:{x:0,y:0},time:0};
  let lastTime=0, lastFocus=null,errored=false;
  const buttonList=[interactButton,mobileInteract];
  // O segredo do Dudu é um extra da sessão, sem coleta de dados pessoais.
  try{
    dudu.rewardUnlocked=sessionStorage.getItem('luana-vila-dudu-reward')==='1';
  }catch{}
  if(dudu.rewardUnlocked && duduSecret)duduSecret.hidden=false;
  const read=(id)=>document.getElementById(id);
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const isDialogOpen=()=>!dialog.hidden;
  const highlight=()=>{
    if (state.scene==='world') {
      sceneName.textContent='VILA CRIATIVA';
      roomActions.hidden=true;
      exitButton.hidden=true;
    }else{
      sceneName.textContent=state.current.short;
      roomActions.hidden=false;
      exitButton.hidden=false;
    }
    sceneCounter.textContent=`${seen.size} / 4 VISITADOS`;
    read('progress-number').textContent=`${seen.size}/4`;
    Array.from(read('stamps').children).forEach((stamp,i)=>stamp.classList.toggle('done',seen.has(data.scenes[i].id)));
    read('progress-message').textContent=seen.size===4?'✦ Conquista desbloqueada: Exploradora dos quatro mundos!':`Faltam ${4-seen.size} lugar(es) para completar a exploração.`;
  };
  function updateHint(){
    if (state.scene==='world'){
      if(dudu.justPetted&&state.time<dudu.happyUntil){
        hint.textContent='O Dudu adorou o carinho! 🐾';
      }else if(state.near?.kind==='dog'){
        hint.textContent='O Dudu está pertinho! Pressione E para fazer carinho. 🐾';
      }else{
        hint.textContent=state.near?`Perto de ${state.near.title}. Pressione E para entrar.`:'Caminhe até um prédio ou encontre o Dudu pela praça.';
      }
    }else{
      hint.textContent=state.near?.exit?'Perto da saída. Pressione E para voltar.':state.near?`Perto de ${state.near.label}. Pressione E para examinar.`:'Caminhe até um objeto ou clique na lista ao lado.';
    }
    buttonList.forEach(b=>{
      b.disabled=!state.near;
      b.setAttribute('aria-label',state.near ?
        (state.near.kind==='dog'?'Fazer carinho no Dudu':state.near.exit?'Voltar ao mapa':`Interagir com ${state.near.label||state.near.title}`) :
        'Aproxime-se de um lugar ou objeto para interagir');
    });
  }
  function updateNear(){
    let next=null;
    if(state.scene==='world'){
      let min=65;
      for(const b of data.scenes){const d=distance(state.player,{x:b.doorX,y:b.doorY});if(d<min){min=d;next=b;}}
      const dogDistance=distance(state.player,dudu);
      if(dogDistance<58&&dogDistance<min){next=dudu;}
    }else{
      let min=80;
      for(const o of state.current.objects){const d=distance(state.player,o);if(d<min){min=d;next=o;}}
      const door={x:384,y:440};const d=distance(state.player,door);
      if(d<57&&d<min)next={exit:true,label:'Saída',...door};
    }
    if(next!==state.near){state.near=next;updateHint();}
  }
  function teleportFlash(){fade.classList.add('on');window.setTimeout(()=>fade.classList.remove('on'),230);}
  function enterScene(id){const next=rooms.get(id);if(!next)return;
    state.scene=id;state.current=next;state.player={x:384,y:359,dir:'up',step:0,vx:0,vy:0};state.near=null;held.clear();seen.add(id);
    try{localStorage.setItem(progressKey,JSON.stringify([...seen]));}catch{}
    objectContainer.replaceChildren();
    for(const obj of next.objects){const btn=document.createElement('button');btn.type='button';btn.textContent=`${obj.symbol}  ${obj.label} ↗`;btn.addEventListener('click',()=>openDialog(obj));objectContainer.append(btn);}
    highlight();updateNear();updateHint();teleportFlash();canvas.focus({preventScroll:true});
  }
  function leaveScene(){if(state.scene==='world')return;
    const loc=state.current;state.scene='world';state.current=null;state.player={x:loc.doorX,y:loc.doorY+29,dir:'down',step:0,vx:0,vy:0};state.near=null;held.clear();
    highlight();updateNear();updateHint();teleportFlash();canvas.focus({preventScroll:true});
  }
  function openDialog(obj){if(!obj)return;
    lastFocus=document.activeElement;held.clear();
    read('dialog-label').textContent=obj.category||'DESCUBRA';
    read('dialog-emblem').textContent=obj.symbol||'✦';
    read('dialog-title').textContent=obj.title;
    read('dialog-description').textContent=obj.description;
    const tags=read('dialog-tags'), links=read('dialog-links');tags.replaceChildren();links.replaceChildren();
    for(const x of obj.tags||[]){const span=document.createElement('span');span.textContent=x;tags.append(span);}
    for(const link of obj.links||[]){const a=document.createElement('a');a.textContent=link.label;a.href=link.href;if(link.href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer';}links.append(a);}
    dialog.hidden=false;document.body.style.overflow='hidden';dialogClose.focus();
  }
  function closeDialog(){if(dialog.hidden)return;dialog.hidden=true;held.clear();document.body.style.overflow='';if(lastFocus instanceof HTMLElement&&document.contains(lastFocus))lastFocus.focus({preventScroll:true});else canvas.focus({preventScroll:true});}
  function petDudu(){
    if(state.scene!=='world'||isDialogOpen())return;
    const isNewPet=state.time-dudu.lastPetTime>0.65;
    dudu.pauseUntil=state.time+3;
    dudu.happyUntil=state.time+2.8;
    dudu.justPetted=true;
    dudu.moving=false;
    if(isNewPet){
      dudu.lastPetTime=state.time;
      dudu.petCount++;
      if(dudu.petCount===1)announce('🐾 Você fez amizade com Dudu!');
      if(dudu.petCount===3 && !dudu.rewardUnlocked){
        dudu.rewardUnlocked=true;
        if(duduSecret)duduSecret.hidden=false;
        try{sessionStorage.setItem('luana-vila-dudu-reward','1');}catch{}
        announce('✨ Segredo desbloqueado: Dudu, guardião da Vila Criativa!',5200);
      }
    }
    updateHint();
  }
  function action(){if(isDialogOpen()){closeDialog();return;}if(!state.near)return;
    if(state.scene==='world'&&state.near.kind==='dog'){petDudu();return;}
    if(state.scene==='world')enterScene(state.near.id);
    else if(state.near.exit)leaveScene();else openDialog(state.near);
  }
  function moveDudu(dt){
    if(state.scene!=='world')return;
    if(state.time<dudu.pauseUntil){dudu.moving=false;return;}
    const target=duduPath[dudu.waypoint],dx=target.x-dudu.x,dy=target.y-dudu.y;
    const dist=Math.hypot(dx,dy);
    if(dist<2){
      dudu.x=target.x;dudu.y=target.y;dudu.moving=false;
      dudu.waypoint=(dudu.waypoint+1)%duduPath.length;
      dudu.pauseUntil=state.time+0.8+(dudu.waypoint%3)*0.3;
      dudu.dir='down';return;
    }
    const travel=Math.min(dist,37*dt);
    dudu.x+=dx/dist*travel;dudu.y+=dy/dist*travel;
    dudu.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
    dudu.moving=true;
  }
  // As áreas de colisão seguem as fachadas (não os limites das imagens e telhados).
  // As entradas ficam livres para que a personagem consiga chegar às portas.
  const walls = [
    {id:'lab',left:64,right:285,top:106,bottom:194,doorWidth:32},
    {id:'flor',left:474,right:726,top:113,bottom:194,doorWidth:32},
    {id:'arcade',left:16,right:277,top:307,bottom:407,doorWidth:32},
    {id:'contact',left:500,right:752,top:312,bottom:405,doorWidth:32}
  ];
  function collideWorld(x,y){
    if(x<16||y<29||x>data.width-16||y>data.height-14)return true;
    if(((x-384)/64)**2+((y-262)/49)**2<1)return true;
    return walls.some(w=>{
      if(x<=w.left||x>=w.right||y<=w.top||y>=w.bottom)return false;
      const door=rooms.get(w.id);
      return !(Math.abs(x-door.doorX)<w.doorWidth && y>door.doorY-22);
    });
  }
  function move(dt){
    let dx=Number(held.has('right'))-Number(held.has('left'));
    let dy=Number(held.has('down'))-Number(held.has('up'));
    const p=state.player;
    const length=Math.hypot(dx,dy);
    if(length){dx/=length;dy/=length;}
    const pace=148;
    const smooth=Math.min(1,dt*13);
    p.vx+=(dx*pace-p.vx)*smooth;
    p.vy+=(dy*pace-p.vy)*smooth;
    if(Math.abs(p.vx)<.5)p.vx=0;
    if(Math.abs(p.vy)<.5)p.vy=0;
    if(length){
      if(Math.abs(dx)>.01)p.dir=dx>0?'right':'left';
      else p.dir=dy>0?'down':'up';
    }
    const mx=p.vx*dt,my=p.vy*dt;
    let moved=false;
    if(state.scene==='world'){
      if(!collideWorld(p.x+mx,p.y)){p.x+=mx;moved||=Math.abs(mx)>.1;}else p.vx=0;
      if(!collideWorld(p.x,p.y+my)){p.y+=my;moved||=Math.abs(my)>.1;}else p.vy=0;
    }else{
      const nx=Math.max(26,Math.min(742,p.x+mx));
      const ny=Math.max(177,Math.min(439,p.y+my));
      moved=Math.abs(nx-p.x)+Math.abs(ny-p.y)>.1;
      p.x=nx;p.y=ny;
    }
    p.step=moved ? p.step+dt*11 : 0;
  }
  function render(){ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,art.width,art.height);
    if(state.scene==='world'){
      state.camera.x=Math.max(0,Math.min(data.width-art.width,state.player.x-art.width/2));
      state.camera.y=Math.max(0,Math.min(data.height-art.height,state.player.y-art.height/2));
      art.world(ctx,state);
    }else art.interior(ctx,state);
  }
  function tick(time){if(errored)return;
    try{
      const dt=Math.min((time-lastTime)/1000||0,0.05);lastTime=time;state.time+=dt;
      if(!isDialogOpen()){
        move(dt);
        moveDudu(dt);
        if(dudu.justPetted&&state.time>=dudu.happyUntil){
          dudu.justPetted=false;updateHint();
        }
      }
      updateNear();render();requestAnimationFrame(tick);
    }catch(error){errored=true;console.error('Erro no Universo de Luana:',error);hint.textContent='O desenho do jogo encontrou um erro. Abra F12 > Console e confira a mensagem.';}
  }
  const directions={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',W:'up',s:'down',S:'down',a:'left',A:'left',d:'right',D:'right'};
  document.addEventListener('keydown',(ev)=>{
    if(ev.key==='Escape'){ev.preventDefault();if(isDialogOpen())closeDialog();else leaveScene();return;}
    if(isDialogOpen())return;
    if(directions[ev.key]){held.add(directions[ev.key]);ev.preventDefault();}
    else if((ev.key==='e'||ev.key==='E')&&!ev.repeat){action();ev.preventDefault();}
  });
  document.addEventListener('keyup',ev=>{if(directions[ev.key])held.delete(directions[ev.key]);});
  window.addEventListener('blur',()=>held.clear());
  document.addEventListener('visibilitychange',()=>{held.clear();lastTime=0;});
  dialog.addEventListener('keydown',ev=>{
    if(ev.key!=='Tab'||dialog.hidden)return;
    const items=[...dialog.querySelectorAll('button:not([disabled]),a[href]')]
      .filter(el=>el.getClientRects().length>0);
    if(!items.length)return;
    if(ev.shiftKey&&document.activeElement===items[0]){
      ev.preventDefault();items[items.length-1].focus();
    }else if(!ev.shiftKey&&document.activeElement===items[items.length-1]){
      ev.preventDefault();items[0].focus();
    }
  });
  const resetProgress=read('reset-progress');
  resetProgress?.addEventListener('click',()=>{
    if(!window.confirm('Reiniciar as quatro conquistas e voltar ao início da vila?'))return;
    seen.clear();
    try{localStorage.removeItem(progressKey);}catch{}
    if(isDialogOpen())closeDialog();
    state.scene='world';
    state.current=null;
    state.player={x:384,y:432,dir:'up',step:0,vx:0,vy:0};
    state.near=null;
    held.clear();
    highlight();updateNear();updateHint();
    announce('✨ Conquistas reiniciadas! Explore a vila para recuperar seus selos.');
    canvas.focus({preventScroll:true});
  });
  read('places').querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>{closeDialog();enterScene(b.dataset.scene);}));
  interactButton.addEventListener('click',action);mobileInteract.addEventListener('click',action);exitButton.addEventListener('click',leaveScene);
  dialogClose.addEventListener('click',closeDialog);dialog.addEventListener('click',event=>{if(event.target?.dataset.close)closeDialog();});

  canvas.addEventListener('click',(ev)=>{
    if(isDialogOpen())return;
    const rect=canvas.getBoundingClientRect(), x=(ev.clientX-rect.left)*art.width/rect.width,y=(ev.clientY-rect.top)*art.height/rect.height;
    if(state.scene==='world'){
      const wx=x+state.camera.x,wy=y+state.camera.y;
      if(Math.abs(wx-dudu.x)<39&&Math.abs(wy-(dudu.y-29))<44){
        petDudu();return;
      }
      const hit=data.scenes.find(b=>wx>=b.x&&wx<=b.x+b.w&&wy>=b.y&&wy<=b.y+b.h);
      if(hit){enterScene(hit.id);return;}
    }else{
      if(x>=326&&x<=442&&y>=425){leaveScene();return;}
      const hit=state.current.objects
        .filter(o=>Math.abs(x-o.x)<91&&Math.abs(y-(o.y+67))<43)
        .sort((a,b)=>Math.abs(x-a.x)-Math.abs(x-b.x))[0];
      if(hit){openDialog(hit);return;}
    }
    canvas.focus({preventScroll:true});
  });
  document.querySelectorAll('[data-move]').forEach(b=>{
    const dir=b.dataset.move;
    b.addEventListener('pointerdown',ev=>{
      ev.preventDefault();held.add(dir);
      b.classList.add('pressed');
      b.setPointerCapture(ev.pointerId);
    });
    const stop=()=>{held.delete(dir);b.classList.remove('pressed');};
    b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('lostpointercapture',stop);
  });
  highlight();updateNear();updateHint();requestAnimationFrame(tick);
})();
