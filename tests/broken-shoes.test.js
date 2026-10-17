import test from 'node:test';
import assert from 'node:assert/strict';
import {initialQuest,transition,claimReward} from '../src/quests/broken-shoes.js';
function move(s,a,v){const r=transition(s,a,v);assert.equal(r.ok,true,r.message);return r.state}
function play(diagnosis='sole',method='adhesive'){let s=move(initialQuest(),'accept');s=move(s,'diagnose',diagnosis);s=move(s,'choose',method);s=move(s,'collect',method==='adhesive'?'glue':'thread');for(const op of method==='adhesive'?['clean','apply','align','press']:['clean','align','stitch','inspect'])s=move(s,'perform',op);s=move(s,'explain',method==='adhesive'?'bond':'seam');return move(s,'finish')}
test('durable first quest completion',()=>{const s=play();assert.equal(s.step,'complete');assert.equal(s.result,'durable');assert.equal(s.quality,100)});
test('suboptimal diagnosis can still finish with a temporary repair',()=>{const s=play('upper','adhesive');assert.equal(s.result,'temporary');assert.equal(s.quality,55)});
test('wrong order cannot skip interactive repair',()=>{let s=move(initialQuest(),'accept');s=move(s,'diagnose','sole');s=move(s,'choose','adhesive');s=move(s,'collect','glue');const r=transition(s,'perform','press');assert.equal(r.ok,false);assert.equal(r.state.step,'repair')});
test('reward cannot be claimed before completion or twice',()=>{assert.equal(claimReward(initialQuest(),'x').ok,false);const s=play();const a=claimReward(s,'claim-1');const b=claimReward(a.state,'claim-2');assert.equal(a.state.paid,true);assert.equal(b.state.rewardClaimKey,'claim-1');assert.equal(b.state.events.filter(e=>e==='reward-claimed').length,1)});
test('knowledge check cannot be bypassed',()=>{let s=move(initialQuest(),'accept');s=move(s,'diagnose','sole');s=move(s,'choose','adhesive');s=move(s,'collect','glue');for(const op of ['clean','apply','align','press'])s=move(s,'perform',op);assert.equal(transition(s,'explain','seam').ok,false);assert.equal(s.step,'check')});
