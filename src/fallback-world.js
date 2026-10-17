// Dependency-free isometric fallback for the Opportunity prototype.
// Starts only if the Three.js client failed to initialize.
import {initialQuest,transition} from './quests/broken-shoes.js';
const $=id=>document.getElementById(id);
setTimeout(()=>{
 if(window.__OPPORTUNITY_READY__)return;
 const root=document.createElement('canvas');root.id='gameCanvas';root.setAttribute('aria-label','Fallback isometric game world');root.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:0;touch-action:none';document.body.prepend(root);
 const ctx=root.getContext('2d');if(!ctx){$('hint').textContent='Unable to start graphics';return}
 const places={residential:[['Home',-160,-90],['Bakery',-65,-145],['Repair Shop',125,-125],['Clinic',170,45],['Store',-90,100]],city:[['Town Hall',-80,-125],['Employment Center',100,-90],['University',-120,70],['Bank',120,90]],rural:[['Farm',-130,-85],['Flour Mill',110,-110],['Rural Market',-100,100],['Warehouse',120,95]]};
 const names={residential:'Residential Area',city:'Big City',rural:'Rural Region'};
 const store='opportunity-fallback-v1';let saved={};try{saved=JSON.parse(localStorage.getItem(store))||{}}catch{}
 const s={zone:'residential',credits:1240,energy:82,debt:24000,x:0,y:0,quest:initialQuest(),...saved};let nearby=null;const keys={};
 function save(){localStorage.setItem(store,JSON.stringify(s))}
 function stats(){$('zone').textContent=names[s.zone];$('stats').innerHTML='🪙 '+s.credits+' credits<br>⚡ '+s.energy+' energy<br>📉 Loan '+s.debt;$('hint').textContent=nearby?'E: '+nearby[0]+' · WASD move':'WASD move · E interact · Isometric fallback';save()}
 function modal(title,body){$('modalContent').innerHTML='<h2>'+title+'</h2>'+body;$('modal').classList.add('show')}
 function close(){$('modal').classList.remove('show')}
 function button(label,callback){const b=document.createElement('button');b.textContent=label;b.onclick=callback;$('modalContent').append(b)}
 function questUI(message='A delivery worker needs their shoes fixed.'){
 const q=s.quest,steps={discover:[['Accept quest','accept']],inspect:[['Sole separating','diagnose','sole'],['Torn upper','diagnose','upper']],plan:[['Use adhesive','choose','adhesive'],['Use stitches','choose','stitch']],prepare:[['Take glue','collect','glue'],['Take thread','collect','thread']],repair:(q.method==='adhesive'?['clean','apply','align','press']:['clean','align','stitch','inspect']).map(v=>[v,'perform',v]),check:[['Adhesive bond','explain','bond'],['Stitched seam','explain','seam']],resolve:[['Deliver shoes','finish']],complete:[]};
 modal('Quest 001 · The Broken Shoes','<p>'+message+'</p><p>Stage: '+q.step+' · Quality: '+q.quality+' · '+(q.result||'in progress')+'</p>');
 for(const [label,action,value] of steps[q.step])button(label,()=>{const r=transition(s.quest,action,value);if(r.ok)s.quest=r.state;questUI(r.message);save()});
 if(q.step==='complete')button(q.paid?'Payment collected':'Collect 90-credit repair reward',()=>{if(!s.quest.paid){s.credits+=90;s.quest.paid=true;save()}questUI('Payment recorded once in this local prototype')});
 }
 function travel(){modal('Travel','<p>Choose a domain. Fares are provisional.</p>');for(const [id,name] of Object.entries(names))button(name+(id===s.zone?' (here)':' · 15 cr'),()=>{if(id!==s.zone){if(s.credits<15)return modal('Travel','Insufficient credits');s.credits-=15;s.zone=id;s.x=0;s.y=0;stats()}close()})}
 function interact(place){if(place[0]==='Repair Shop'){questUI();return}if(place[0]==='Home'){modal('Your Apartment','<p>Recover energy.</p>');button('Rest · 40 credits',()=>{if(s.credits>=40){s.credits-=40;s.energy=100;stats();close()}});return}modal(place[0],'<p>Explore opportunities here. The full 3D version is currently unavailable.</p>')}
 function draw(){
 const w=root.width=innerWidth*devicePixelRatio,h=root.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
 const W=innerWidth,H=innerHeight;ctx.fillStyle='#9fc8e4';ctx.fillRect(0,0,W,H);ctx.fillStyle='#86a875';ctx.fillRect(0,H*.26,W,H*.74);
 const cx=W/2,cy=H*.58;ctx.fillStyle='#6c777b';ctx.beginPath();ctx.moveTo(cx-80,0);ctx.lineTo(cx+80,0);ctx.lineTo(cx+W*.32,H);ctx.lineTo(cx-W*.32,H);ctx.fill();
 ctx.fillStyle='#899499';ctx.fillRect(0,cy-18,W,36);
 const project=(x,y)=>[cx+(x-s.x)*1.35,cy+(y-s.y)*.75];
 nearby=null;let distance=Infinity;
 for(const [name,x,y] of places[s.zone]){const [px,py]=project(x,y);if(px<-120||px>W+120||py<-100||py>H+100)continue;
 const d=Math.hypot(s.x-x,s.y-y);if(d<65&&d<distance){distance=d;nearby=[name,x,y]}
 ctx.fillStyle='#334b5e';ctx.fillRect(px-31,py-58,62,58);ctx.fillStyle='#cfad8d';ctx.fillRect(px-30,py-56,60,52);ctx.fillStyle='#527895';ctx.beginPath();ctx.moveTo(px-38,py-57);ctx.lineTo(px,py-82);ctx.lineTo(px+38,py-57);ctx.fill();
 ctx.fillStyle='#13283f';ctx.fillRect(px-17,py-45,13,16);ctx.fillRect(px+8,py-45,13,16);ctx.fillStyle='#102039';ctx.fillRect(px-42,py-99,84,17);ctx.fillStyle='#fff';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(name,px,py-87);
 }
 ctx.fillStyle='#263c59';ctx.fillRect(cx-13,cy-25,26,32);ctx.fillStyle='#d7a07b';ctx.beginPath();ctx.arc(cx,cy-35,12,0,Math.PI*2);ctx.fill();ctx.fillStyle='#25344e';ctx.fillRect(cx-12,cy+7,10,19);ctx.fillRect(cx+2,cy+7,10,19);
 const mini=$('minimap');const m=mini.getContext('2d');m.fillStyle='#183a47';m.fillRect(0,0,160,115);m.fillStyle='#91d7ee';for(const [n,x,y] of places[s.zone])m.fillRect(80+x*.27,57+y*.27,5,5);m.fillStyle='#ffd35e';m.beginPath();m.arc(80+s.x*.27,57+s.y*.27,4,0,7);m.fill();
 stats();
 }
 let last=performance.now();function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(!$('modal').classList.contains('show')){s.x+=((keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0))*dt*85;s.y+=((keys.s||keys.ArrowDown?1:0)-(keys.w||keys.ArrowUp?1:0))*dt*85}draw();requestAnimationFrame(frame)}
 addEventListener('keydown',e=>{keys[e.key]=true;keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='e'&&nearby&&!$('modal').classList.contains('show'))interact(nearby)});addEventListener('keyup',e=>{keys[e.key]=false;keys[e.key.toLowerCase()]=false});
 $('mapBtn').onclick=travel;$('careerBtn').onclick=()=>{if(s.zone==='city'){modal('Town Hall · Career Development','<p>Free counselling: seek work, learn a skill, or offer repair services.</p>');return}modal('Career Development','<p>Travel to Big City to access free counselling.</p>');const b=document.createElement('button');b.id='goCity';b.textContent='Travel to Big City · 15 credits';b.onclick=()=>{if(s.credits<15)return;s.credits-=15;s.zone='city';s.x=0;s.y=0;stats();close()};$('modalContent').append(b)};$('profileBtn').onclick=()=>modal('Citizen Profile','<p>Credits: '+s.credits+' · Debt: '+s.debt+'</p>');$('saveBtn').onclick=()=>{save();$('hint').textContent='Progress saved'};
 $('closeBtn').onclick=close;window.__OPPORTUNITY_READY__=true;window.__OPPORTUNITY_FALLBACK__=true;requestAnimationFrame(frame);
},1800);
