export const QUEST_ID='broken-shoes-v1';
export const initialQuest=()=>({id:QUEST_ID,step:'discover',diagnosis:null,method:null,materials:[],operations:[],quality:0,knowledgePassed:false,result:null,paid:false,events:[]});
const result=(ok,state,message)=>({ok,state,message});
export function transition(state,action,value){
 if(!state||state.id!==QUEST_ID)return result(false,state,'Invalid quest');
 const s={...state,materials:[...state.materials],operations:[...state.operations],events:[...state.events]};
 const next=(step,event,message)=>{s.step=step;s.events.push(event);return result(true,s,message)};
 if(s.step==='discover'&&action==='accept')return next('inspect','accepted','Inspect the damaged shoes');
 if(s.step==='inspect'&&action==='diagnose'&&['sole','upper'].includes(value)){s.diagnosis=value;return next('plan','diagnosed','Choose a repair method')}
 if(s.step==='plan'&&action==='choose'&&['adhesive','stitch'].includes(value)){s.method=value;return next('prepare','planned','Prepare your materials')}
 if(s.step==='prepare'&&action==='collect'){
  const needed=s.method==='adhesive'?'glue':'thread';
  if(value!==needed)return result(false,state,'Requires '+needed);
  s.materials.push(value);return next('repair','prepared','Perform repair steps in order');
 }
 if(s.step==='repair'&&action==='perform'){
  const steps=s.method==='adhesive'?['clean','apply','align','press']:['clean','align','stitch','inspect'];
  if(value!==steps[s.operations.length])return result(false,state,'Next step: '+steps[s.operations.length]);
  s.operations.push(value);
  if(s.operations.length===steps.length){
   s.quality=((s.diagnosis==='sole'&&s.method==='adhesive')||(s.diagnosis==='upper'&&s.method==='stitch'))?100:55;
   return next('check','repaired','Explain how your repair works');
  }
  return result(true,s,'Step '+s.operations.length+'/'+steps.length+' complete');
 }
 if(s.step==='check'&&action==='explain'){
  if(!((s.method==='adhesive'&&value==='bond')||(s.method==='stitch'&&value==='seam')))return result(false,state,'Try again: what holds the repair together?');
  s.knowledgePassed=true;return next('resolve','knowledge-passed','Review the customer outcome');
 }
 if(s.step==='resolve'&&action==='finish'){
  s.result=s.quality>=80?'durable':'temporary';
  return next('complete','resolved',s.result==='durable'?'Durable repair: referral unlocked':'Temporary repair: training opportunity unlocked');
 }
 return result(false,state,'Action unavailable at this stage');
}
export function claimReward(state,key){
 if(!state||state.step!=='complete')return result(false,state,'Complete the quest first');
 if(typeof key!=='string'||!key.trim())return result(false,state,'Claim key required');
 if(state.paid)return result(true,state,'Already claimed: no duplicate');
 return result(true,{...state,paid:true,rewardClaimKey:key,events:[...state.events,'reward-claimed']},'Prototype reward recorded once');
}
