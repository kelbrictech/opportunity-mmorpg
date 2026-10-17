// Opportunity survival-runway evaluator. Design QA tool, not game runtime.
// No approved economic prices are embedded in this module.
export const DEFAULT_MONTH_DAYS = 30;
export const DEFAULT_RUNWAY_MONTHS = 3;
const nonnegative = (n, name) => {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError(name + ' must be a nonnegative integer');
  return n;
};
export function calculateRunway({monthlyHousing, monthlyFood, monthlyTransport, monthlyRecovery, monthlyUtilities=0, monthlyMandatoryDebt=0, includeDebt=false, months=DEFAULT_RUNWAY_MONTHS, daysPerMonth=DEFAULT_MONTH_DAYS}) {
  const inputs={monthlyHousing,monthlyFood,monthlyTransport,monthlyRecovery,monthlyUtilities,monthlyMandatoryDebt,months,daysPerMonth};
  for(const [key,value] of Object.entries(inputs)) nonnegative(value,key);
  if(months===0||daysPerMonth===0) throw new RangeError('Months and daysPerMonth must be positive');
  const monthlyEssentials=monthlyHousing+monthlyFood+monthlyTransport+monthlyRecovery+monthlyUtilities;
  const monthlySurvival=monthlyEssentials+(includeDebt?monthlyMandatoryDebt:0);
  const startingCredits=monthlySurvival*months;
  if(!Number.isSafeInteger(startingCredits)) throw new RangeError('Starting credits exceed safe integer range');
  return {monthlyEssentials,monthlySurvival,startingCredits,runwayDays:months*daysPerMonth,months,daysPerMonth,includesDebt:includeDebt,provisional:true};
}
export function simulateNoIncome({startingCredits,dailyCosts,days}) {
  nonnegative(startingCredits,'startingCredits');nonnegative(days,'days');
  if(!Array.isArray(dailyCosts)||dailyCosts.length===0) throw new TypeError('dailyCosts must be a nonempty array');
  let balance=startingCredits,firstUnaffordableDay=null;
  const balances=[];
  for(let day=1;day<=days;day++){
    const cost=nonnegative(dailyCosts[(day-1)%dailyCosts.length],'daily cost');
    if(firstUnaffordableDay===null && balance<cost) firstUnaffordableDay=day;
    balance=Math.max(0,balance-cost);
    balances.push(balance);
  }
  return {firstUnaffordableDay,finalCredits:balance,balances,canCoverAllEssentials:firstUnaffordableDay===null,gameOver:false};
}
