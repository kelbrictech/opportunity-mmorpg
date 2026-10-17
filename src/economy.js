// Opportunity alpha: deterministic, testable local economy rules.
// This is NOT an authoritative multiplayer ledger. Server migration is required.
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
export function transact(state, action, opts={}) {
  const s={...state};
  const fail=reason=>({ok:false,reason,state});
  if(!Number.isFinite(s.credits)||s.credits<0||!Number.isFinite(s.energy)||s.energy<0||s.energy>100)return fail('Invalid citizen state');
  const spend=n=>{if(s.credits<n)return false;s.credits-=n;return true};
  switch(action){
    case 'apply':
      s.applications=(s.applications||0)+1;s.employed=true;break;
    case 'rest':
      if(!spend(40))return fail('Insufficient credits');s.energy=100;break;
    case 'shift':
      if(!s.employed)return fail('Apply for employment first');
      if(s.energy<20)return fail('Rest before working');
      s.energy-=20;s.credits+=180;break;
    case 'repair':
      if(!s.learned)return fail('Complete repair training first');
      if(s.energy<10)return fail('Rest before working');
      s.energy-=10;s.credits+=90;s.repairs=(s.repairs||0)+1;break;
    case 'ruralWork':
      if(s.energy<15)return fail('Rest before working');
      s.energy-=15;s.credits+=75;break;
    case 'study':
      if(s.learned)return fail('Assessment already completed');
      s.skill=(s.skill||0)+1;s.learned=true;break;
    case 'contribute':
      if(!spend(50))return fail('Insufficient credits');
      s.contributed=(s.contributed||0)+50;break;
    case 'repay':
      if(s.debt<=0)return fail('No outstanding loan');
      {const amount=Math.min(100,s.debt);if(!spend(amount))return fail('Insufficient credits');s.debt-=amount}break;
    case 'travel':
      if(!['residential','city','rural'].includes(opts.zone))return fail('Invalid destination');
      if(opts.zone===s.zone)return fail('Already in destination');
      if(!spend(opts.zone==='rural'?35:15))return fail('Insufficient credits');
      s.zone=opts.zone;break;
    default:return fail('Unknown action');
  }
  return {ok:true,state:s,deltaCredits:s.credits-state.credits};
}
