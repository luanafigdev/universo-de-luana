(() => {
  'use strict';
  const W = 768, H = 480;
  const names = {world:'vila.webp', flor:'confeitaria.webp', arcade:'arcade.svg', lab:'lab.svg', contact:'contact.svg'};
  const images = {};
  for (const [key, file] of Object.entries(names)) {
    const img = new Image(); img.src = `assets/${file}`; images[key] = img;
  }
  const duduSprites = new Image();
  duduSprites.src = 'assets/dudu-sprites.png';
  const DOG_FRAME = 192;
  const TAU = Math.PI * 2;
  function rr(c,x,y,w,h,r,color,stroke='',line=1) {
    c.beginPath(); c.roundRect(x,y,w,h,r); c.fillStyle=color; c.fill();
    if(stroke){c.lineWidth=line;c.strokeStyle=stroke;c.stroke();}
  }
  function ellipse(c,x,y,rx,ry,color) {c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=color;c.fill();}
  function line(c,pts,color,width=2){c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
  function background(c,img,backup){
    if(img.complete && img.naturalWidth){c.drawImage(img,0,0,W,H);return;}
    const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,backup);g.addColorStop(1,'#d9b9d9');c.fillStyle=g;c.fillRect(0,0,W,H);
    c.textAlign='center';c.fillStyle='#49354b';c.font='700 22px sans-serif';c.fillText('Carregando cenário…',W/2,H/2);
  }
  function sparkle(c,x,y,size,t){
    c.save();c.translate(x,y);c.rotate(t/4);c.globalAlpha=.35+.45*(.5+.5*Math.sin(t*2));
    line(c,[[-size,0],[size,0]],'#fff5b9',1.8);line(c,[[0,-size],[0,size]],'#ffffff',1.8);
    ellipse(c,0,0,1.7,1.7,'#fff');c.restore();
  }
  function avatar(c,x,y,dir,walk,t) {
    const stride=walk?Math.sin(walk*1.2)*4:0;
    const bob=walk?Math.abs(Math.sin(walk*1.2))*2.1:(t?Math.sin(t*2.1)*.6:0);
    c.save();c.translate(x,y-bob);c.lineJoin='round';c.lineCap='round';
    ellipse(c,0,7+bob,21,6,'#38243c66');
    // Tiny shoes and legs, with asymmetrical animated stride.
    rr(c,-12,-13,10,20,4,'#8d6ca8','#5a456c',1.7);rr(c,3,-13,10,20,4,'#9174b1','#5a456c',1.7);
    rr(c,-14+stride,-1,13,8,4,'#fffaf1','#9984ac',1.6);rr(c,2-stride,-1,13,8,4,'#fffaf1','#9984ac',1.6);
    // Arms behind/in front of the torso.
    line(c,[[-12,-38],[-17-stride*.45,-19]],'#f3d4c1',7);
    line(c,[[12,-38],[17+stride*.45,-19]],'#f3d4c1',7);
    rr(c,-15,-43,30,35,10,'#f8e8dc','#735774',2);
    line(c,[[-9,-36],[10,-36]],'#fff9f0',2);
    // Head, skin slightly lighter, dark flowing hair.
    if(dir==='up') {
      // Cabelos em camadas: cachos soltos, volume na nuca e laço delicado.
      ellipse(c,0,-55,17,21,'#37243e');
      c.fillStyle='#422d47';c.strokeStyle='#281c35';c.lineWidth=2;
      c.beginPath();c.moveTo(-12,-65);c.bezierCurveTo(-27,-61,-25,-42,-18,-30);
      c.bezierCurveTo(-24,-19,-14,-14,-8,-25);c.bezierCurveTo(-5,-37,-12,-50,-12,-65);c.fill();c.stroke();
      c.beginPath();c.moveTo(12,-65);c.bezierCurveTo(27,-61,25,-42,18,-30);
      c.bezierCurveTo(24,-19,14,-14,8,-25);c.bezierCurveTo(5,-37,12,-50,12,-65);c.fill();c.stroke();
      c.beginPath();c.moveTo(-9,-69);c.bezierCurveTo(-11,-54,-7,-39,0,-26);
      c.bezierCurveTo(7,-39,11,-54,9,-69);c.closePath();c.fill();
      c.strokeStyle='#8a667f';c.lineWidth=2;
      c.beginPath();c.moveTo(-10,-58);c.bezierCurveTo(-18,-40,-13,-31,-15,-27);
      c.moveTo(10,-58);c.bezierCurveTo(18,-40,13,-31,15,-27);c.stroke();
      // Mochila creme e um pingente em forma de estrela.
      rr(c,-12,-30,24,18,6,'#ffe3a9','#84677d',1.8);
      rr(c,-10,-27,20,8,4,'#fff4d6');
      ellipse(c,0,-16,2.6,2.6,'#d6a875');
      // Laço com duas pontas esvoaçantes.
      c.fillStyle='#d5b0f4';c.strokeStyle='#76588d';c.lineWidth=1.5;
      c.beginPath();c.moveTo(0,-48);c.bezierCurveTo(-9,-60,-18,-58,-17,-49);
      c.bezierCurveTo(-15,-43,-7,-43,0,-48);c.fill();c.stroke();
      c.beginPath();c.moveTo(0,-48);c.bezierCurveTo(9,-60,18,-58,17,-49);
      c.bezierCurveTo(15,-43,7,-43,0,-48);c.fill();c.stroke();
      rr(c,-4,-51,8,7,3,'#f5dafa','#76588d',1);
      line(c,[[-2,-44],[-7,-34]],'#d5b0f4',4);
      line(c,[[2,-44],[7,-34]],'#d5b0f4',4);
    } else {
      // Long hair behind the shoulders, glossy and rounded.
      rr(c,-17,-69,34,47,15,'#35263e','#271a34',2);
      ellipse(c,-15,-35,8,18,'#3b2b45');ellipse(c,15,-35,8,18,'#3b2b45');
      ellipse(c,0,-58,14,16,'#f4d7c7');
      // Fringe on top, soft profile in left/right directions.
      c.fillStyle='#38233d';c.beginPath();c.moveTo(-15,-63);c.bezierCurveTo(-14,-81,12,-77,16,-61);
      c.bezierCurveTo(6,-70,-6,-67,-15,-60);c.fill();
      if(dir==='down'){
        ellipse(c,-5,-57,1.6,2,'#513b50');ellipse(c,5,-57,1.6,2,'#513b50');
        ellipse(c,-10,-52,4,2,'#edb9bf88');ellipse(c,10,-52,4,2,'#edb9bf88');
        line(c,[[-2,-50],[1,-49],[4,-50]],'#a97174',1.3);
      } else {
        const side=dir==='left'?-1:1;
        ellipse(c,side*5,-57,1.7,2,'#513b50');
        ellipse(c,side*11,-53,3,1.7,'#e6a9b6aa');
      }
      // Gentle pastel hairclip and a sweatshirt embroidery.
      rr(c,dir==='left'?-13:7,-65,7,3,1.5,'#b49be7');
      ellipse(c,0,-29,3.5,3.5,'#d8a0ce');
    }
    c.restore();
  }
  function halo(c,x,y,t,col='#fff3b9'){
    const size=9+Math.sin(t*3)*1.2;
    c.save();ellipse(c,x,y,19,19,`${col}49`);ellipse(c,x,y,size,size,col);
    c.strokeStyle='#a87da3';c.lineWidth=2;c.beginPath();c.arc(x,y,size+1,0,TAU);c.stroke();c.restore();
  }
  function bubble(c,x,y,text){
    c.save();c.font='800 11px system-ui, sans-serif';const bw=Math.max(88,Math.min(174,c.measureText(text).width+25));
    const bx=Math.min(W-bw-5,Math.max(5,x-bw/2));
    rr(c,bx,y-48,bw,30,12,'#312744','#fbe4bd',1.5);
    c.fillStyle='#fffbea';c.textAlign='center';c.fillText(text,bx+bw/2,y-28);
    c.restore();
  }
  function drawDudu(c,s){
    const dog=s.dudu;
    if(!dog)return;
    const happy=dog.happyUntil>s.time;
    let frame=0;
    if(happy)frame=6+Math.floor(s.time*3)%2;
    else if(dog.moving){
      if(dog.dir==='left')frame=2+Math.floor(s.time*6)%2;
      else if(dog.dir==='right')frame=4+Math.floor(s.time*6)%2;
      else frame=dog.dir==='up'?1:0;
    }else frame=dog.dir==='up'?1:0;
    const bob=happy?Math.sin(s.time*14)*2:(dog.moving?Math.sin(s.time*13)*1.5:0);
    c.save();
    ellipse(c,dog.x,dog.y+1,23,5,'#30263b66');
    if(duduSprites.complete&&duduSprites.naturalWidth){
      c.drawImage(duduSprites,(frame%4)*DOG_FRAME,Math.floor(frame/4)*DOG_FRAME,DOG_FRAME,DOG_FRAME,
        dog.x-34,dog.y-64-bob,68,68);
    }else{
      // O jogo continua visível enquanto o arquivo do mascote carrega.
      ellipse(c,dog.x,dog.y-17,19,17,'#fff6ea');
      ellipse(c,dog.x-12,dog.y-30,11,13,'#35293e');
      ellipse(c,dog.x+12,dog.y-30,11,13,'#35293e');
    }
    if(happy){
      for(let i=0;i<3;i++){
        const offset=(s.time*19+i*21)%48;
        c.globalAlpha=1-offset/55;
        c.fillStyle=i===1?'#ffdf82':'#ffb4dc';
        c.textAlign='center';c.font='20px system-ui';
        c.fillText('♥',dog.x-22+i*22,dog.y-67-offset);
      }
      c.globalAlpha=1;
      bubble(c,dog.x,dog.y-24,'Au au! Obrigado!');
    }else if(s.near?.kind==='dog'){
      bubble(c,dog.x,dog.y-24,'E · CARINHO NO DUDU');
    }else{
      c.textAlign='center';c.font='800 12px system-ui, sans-serif';
      c.fillStyle='#fff9f2';c.strokeStyle='#43354c';c.lineWidth=3;
      c.strokeText('Dudu',dog.x,dog.y-69);c.fillText('Dudu',dog.x,dog.y-69);
    }
    c.restore();
  }
  function world(c,s){
    background(c,images.world,'#93c5a8');
    // Animated water and sparkles at the fountain, rather than a static picture.
    const t=s.reducedMotion ? 0 : s.time;
    c.save();c.globalAlpha=.78;
    for(let i=0;i<12;i++){
      const a=i*2.4+t*.42;const px=386+Math.cos(a)*(15+Math.sin(t*2+i)*7);
      const py=248+Math.sin(a)*(7+Math.cos(t*2+i)*3);
      ellipse(c,px,py,1.8+(i%3)*.35,2.5,'#f5fdff');
    }
    for(let i=0;i<4;i++){
      const f=i*1.55;
      line(c,[[383,238],[383+Math.sin(t*2+f)*10,221-Math.sin(t*3+f)*7]],'#ebfaffb9',2.5);
    }
    c.restore();
    sparkle(c,384,205,4,t);sparkle(c,719,85,4,t+1);sparkle(c,92,328,3,t+2);
    // Pequenas pétalas que flutuam entre as árvores e lanternas na vila.
    c.save();
    for(let i=0;i<13;i++){
      const phase=i*1.93;
      const x0=28+(i*71)%718, y0=35+(i*47)%350;
      const drift=s.reducedMotion?0:(t*13+i*17)%120;
      const xx=x0+Math.sin(t*.58+phase)*13+drift*.13;
      const yy=y0+drift*.66;
      c.save();c.translate(xx,yy);c.rotate(.38+Math.sin(t+phase)*.4);
      c.globalAlpha=.35+(i%4)*.11;
      ellipse(c,0,0,3+(i%2),1.8,i%3===0?'#fff0b7':'#ffd8ed');
      c.restore();
    }
    c.restore();
    // A luz das fachadas respira discretamente, sem cobrir a arte original.
    for(const [bx,by,color] of [[225,135,'#dffff3'],[570,130,'#ffe0ab'],[120,356,'#d4b5ff'],[665,350,'#ffebb8']]){
      c.save();c.globalAlpha=.08+(s.reducedMotion?0:Math.sin(t*1.7+bx)*.04);
      ellipse(c,bx,by,20,26,color);c.restore();
    }
    for (const item of s.data.scenes) {
      if(s.near===item){halo(c,item.doorX,item.doorY+3,t);bubble(c,item.doorX,item.doorY-4,'E · ENTRAR');}
    }
    if(s.dudu&&s.dudu.y<=s.player.y)drawDudu(c,s);
    avatar(c,s.player.x,s.player.y,s.player.dir,s.player.step,t);
    if(s.dudu&&s.dudu.y>s.player.y)drawDudu(c,s);
  }
  function interior(c,s){
    const room=s.current, t=s.reducedMotion ? 0 : s.time;
    background(c,images[room.id],room.wall);
    for(let i=0;i<6;i++){
      sparkle(c,90+i*125+(i%2)*31,80+(i*71)%170,2.4,t+i);
    }
    room.objects.forEach((obj,idx)=>{
      halo(c,obj.x,obj.y+62,t+idx*.7,room.id==='arcade'?'#e0bdff':'#fff1bd');
      if(s.near===obj)bubble(c,obj.x,obj.y+40,'E · EXPLORAR');
    });
    if(s.near?.exit) bubble(c,384,422,'E · SAIR');
    avatar(c,s.player.x,s.player.y,s.player.dir,s.player.step,t);
  }
  window.MODERN_ART={width:W,height:H,world,interior};
})();
