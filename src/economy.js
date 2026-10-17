// Opportunity alpha: deterministic, testable local economy rules.
// This is NOT an authoritative multiplayer ledger. Server migration is required.
//
// BUILD-001 changes (structural only; no balance values or game rules changed):
//  1. ACTIONS is now the single source of truth for every number below.
//  2. Optional idempotency keys: opts.key makes a retried request a no-op.
// All numbers remain PROVISIONAL balance values pending the design economy table.
export const ACTIONS = Object.freeze({
  rest:{cost:40,energy:100},
  commuteCity:{cost:15},
  commuteRural:{cost:35},
  shift:{reward:180,energy:20},
  ruralWork:{reward:75,energy:15},
  repair:{reward:90,energy:10},
  loanRepayment:{cost:100},
  civicContribution:{cost:50}
});
export const KEY_LIMIT = 200;
const KEY_MAX_LENGTH = 100;

export function transact(state, action, opts={}) {
  const s={...state};
  const fail=reason=>({ok:false,reason,state});
  if(!Number.isFinite(s.credits)||s.credits<0||!Number.isFinite(s.energy)||s.energy<0||s.energy>100)return fail('Invalid citizen state');

  // Idempotency: the same key with the same action replays safely; a reused key with a
  // different action is rejected. Failed actions do not consume a key, so a retry after
  // fixing the cause is allowed.
  const key=opts.key;
  const hasKey=key!==undefined&&key!==null;
  if(hasKey){
    if(typeof key!=='string'||key.length===0||key.length>KEY_MAX_LENGTH)return fail('Invalid idempotency key');
    const prior=(state.processedKeys||[]).find(k=>k.key===key);
    if(prior){
      if(prior.action!==action)return fail('Idempotency key reused for a different action');
      return {ok:true,replay:true,state,deltaCredits:0};
    }
  }

  const spend=n=>{if(s.credits<n)return false;s.credits-=n;return true};
  switch(action){
    case 'apply':
      s.applications=(s.applications||0)+1;s.employed=true;break;
    case 'rest':
      if(!spend(ACTIONS.rest.cost))return fail('Insufficient credits');s.energy=ACTIONS.rest.energy;break;
    case 'shift':
      if(!s.employed)return fail('Apply for employment first');
      if(s.energy<ACTIONS.shift.energy)return fail('Rest before working');
      s.energy-=ACTIONS.shift.energy;s.credits+=ACTIONS.shift.reward;break;
    case 'repair':
      if(!s.learned)return fail('Complete repair training first');
      if(s.energy<ACTIONS.repair.energy)return fail('Rest before working');
      s.energy-=ACTIONS.repair.energy;s.credits+=ACTIONS.repair.reward;s.repairs=(s.repairs||0)+1;break;
    case 'ruralWork':
      if(s.energy<ACTIONS.ruralWork.energy)return fail('Rest before working');
      s.energy-=ACTIONS.ruralWork.energy;s.credits+=ACTIONS.ruralWork.reward;break;
    case 'study':
      if(s.learned)return fail('Assessment already completed');
      s.skill=(s.skill||0)+1;s.learned=true;break;
    case 'contribute':
      if(!spend(ACTIONS.civicContribution.cost))return fail('Insufficient credits');
      s.contributed=(s.contributed||0)+ACTIONS.civicContribution.cost;break;
    case 'repay':
      if(s.debt<=0)return fail('No outstanding loan');
      {const amount=Math.min(ACTIONS.loanRepayment.cost,s.debt);if(!spend(amount))return fail('Insufficient credits');s.debt-=amount}break;
    case 'travel':
      if(!['residential','city','rural'].includes(opts.zone))return fail('Invalid destination');
      if(opts.zone===s.zone)return fail('Already in destination');
      if(!spend(opts.zone==='rural'?ACTIONS.commuteRural.cost:ACTIONS.commuteCity.cost))return fail('Insufficient credits');
      s.zone=opts.zone;break;
    default:return fail('Unknown action');
  }
  if(hasKey)s.processedKeys=[...(state.processedKeys||[]),{key,action}].slice(-KEY_LIMIT);
  return {ok:true,state:s,deltaCredits:s.credits-state.credits};
}