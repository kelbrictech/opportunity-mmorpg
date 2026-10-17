import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateRunway,simulateNoIncome} from '../src/design/survival-runway.js';

test('three-month starting credits derive from necessities',()=>{
 const r=calculateRunway({monthlyHousing:480,monthlyFood:720,monthlyTransport:240,monthlyRecovery:120});
 assert.equal(r.monthlySurvival,1560);
 assert.equal(r.startingCredits,4680);
 assert.equal(r.runwayDays,90);
 assert.equal(r.provisional,true);
});
test('debt is excluded unless explicitly opted in',()=>{
 const base={monthlyHousing:100,monthlyFood:200,monthlyTransport:50,monthlyRecovery:50,monthlyMandatoryDebt:100};
 assert.equal(calculateRunway(base).startingCredits,1200);
 assert.equal(calculateRunway({...base,includeDebt:true}).startingCredits,1500);
});
test('survival simulation completes 90 days without income',()=>{
 const r=simulateNoIncome({startingCredits:4680,dailyCosts:[52],days:90});
 assert.equal(r.canCoverAllEssentials,true);
 assert.equal(r.finalCredits,0);
 assert.equal(r.gameOver,false);
});
test('exhaustion is hardship, never automatic game-over',()=>{
 const r=simulateNoIncome({startingCredits:1,dailyCosts:[52],days:90});
 assert.equal(r.firstUnaffordableDay,1);
 assert.equal(r.gameOver,false);
 assert.equal(r.finalCredits,0);
});
test('invalid and unsafe costs are rejected',()=>{
 assert.throws(()=>calculateRunway({monthlyHousing:-1,monthlyFood:1,monthlyTransport:1,monthlyRecovery:1}),RangeError);
 assert.throws(()=>simulateNoIncome({startingCredits:1,dailyCosts:[],days:1}),TypeError);
 assert.throws(()=>calculateRunway({monthlyHousing:Number.MAX_SAFE_INTEGER,monthlyFood:1,monthlyTransport:0,monthlyRecovery:0}),RangeError);
});
