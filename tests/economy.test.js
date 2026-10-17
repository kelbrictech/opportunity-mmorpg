import {test} from 'node:test';import assert from 'node:assert/strict';import {transact,ACTIONS,KEY_LIMIT} from '../src/economy.js';
const base=()=>({credits:1240,debt:24000,energy:82,zone:'residential',employed:false,learned:false,skill:0});
test('employment required before wages',()=>{const a=transact(base(),'shift');assert.equal(a.ok,false);const b=transact(base(),'apply');assert.equal(transact(b.state,'shift').state.credits,1420)});
test('cannot work without energy',()=>{const s={...base(),employed:true,energy:5};assert.equal(transact(s,'shift').ok,false)});
test('repair requires demonstrated skill',()=>{assert.equal(transact(base(),'repair').ok,false);const s=transact(base(),'study').state;assert.equal(transact(s,'repair').state.credits,1330);assert.equal(transact(s,'study').ok,false)});
test('no negative wallet',()=>{const s={...base(),credits:5};assert.equal(transact(s,'rest').ok,false);assert.equal(s.credits,5)});
test('travel fare and destination validated',()=>{const s=transact(base(),'travel',{zone:'rural'}).state;assert.equal(s.credits,1205);assert.equal(s.zone,'rural');assert.equal(transact(s,'travel',{zone:'rural'}).ok,false);assert.equal(transact(s,'travel',{zone:'moon'}).ok,false)});
test('loan cannot overpay',()=>{const s={...base(),debt:30};const a=transact(s,'repay');assert.equal(a.state.debt,0);assert.equal(a.state.credits,1210)});
test('civic spending accounted',()=>{const a=transact(base(),'contribute');assert.equal(a.state.credits,1190);assert.equal(a.state.contributed,50)});
test('unknown action rejected',()=>assert.equal(transact(base(),'mintMoney').ok,false));

// ---- BUILD-001 additions: idempotency keys and ACTIONS as single source of truth ----
const working=()=>({...base(),employed:true,energy:100});
test('same key replays without paying twice',()=>{const a=transact(working(),'shift',{key:'k1'});assert.equal(a.ok,true);assert.equal(a.state.credits,1240+ACTIONS.shift.reward);const b=transact(a.state,'shift',{key:'k1'});assert.equal(b.ok,true);assert.equal(b.replay,true);assert.equal(b.deltaCredits,0);assert.equal(b.state.credits,a.state.credits);assert.equal(b.state.energy,a.state.energy)});
test('key reused for a different action is rejected',()=>{const a=transact(working(),'shift',{key:'k1'});const b=transact(a.state,'repair',{key:'k1'});assert.equal(b.ok,false);assert.equal(b.state.credits,a.state.credits)});
test('failed action does not consume its key',()=>{const f=transact(base(),'shift',{key:'k2'});assert.equal(f.ok,false);const ok=transact({...base(),employed:true},'shift',{key:'k2'});assert.equal(ok.ok,true);assert.equal(ok.state.credits,1240+ACTIONS.shift.reward)});
test('invalid idempotency keys are rejected',()=>{for(const key of ['',123,'x'.repeat(101)])assert.equal(transact(working(),'shift',{key}).ok,false)});
test('processed key list is bounded',()=>{let s=working();for(let i=0;i<KEY_LIMIT+25;i++){const r=transact({...s,energy:100},'ruralWork',{key:'n'+i});assert.equal(r.ok,true);s=r.state}assert.equal(s.processedKeys.length,KEY_LIMIT);assert.equal(s.processedKeys.at(-1).key,'n'+(KEY_LIMIT+24))});
test('requests without a key behave as before and add no key list',()=>{const r=transact(working(),'shift');assert.equal(r.ok,true);assert.equal(r.state.processedKeys,undefined)});
test('transact never mutates its input state',()=>{const s=Object.freeze({...working(),processedKeys:Object.freeze([])});const r=transact(s,'shift',{key:'m1'});assert.equal(r.ok,true);assert.equal(s.credits,1240);assert.equal(s.processedKeys.length,0)});
test('payouts and costs match the ACTIONS table',()=>{
 const w=working();
 assert.equal(transact(w,'shift').deltaCredits,ACTIONS.shift.reward);
 assert.equal(transact(w,'ruralWork').deltaCredits,ACTIONS.ruralWork.reward);
 assert.equal(transact({...w,learned:true},'repair').deltaCredits,ACTIONS.repair.reward);
 assert.equal(transact({...w,energy:10},'rest').deltaCredits,-ACTIONS.rest.cost);
 assert.equal(transact(w,'contribute').deltaCredits,-ACTIONS.civicContribution.cost);
 assert.equal(transact(w,'repay').deltaCredits,-ACTIONS.loanRepayment.cost);
 assert.equal(transact(w,'travel',{zone:'city'}).deltaCredits,-ACTIONS.commuteCity.cost);
 assert.equal(transact(w,'travel',{zone:'rural'}).deltaCredits,-ACTIONS.commuteRural.cost);
});