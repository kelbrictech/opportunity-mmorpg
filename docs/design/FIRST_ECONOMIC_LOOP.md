# OPP-DESIGN-D1A — First economic gameplay loop before starting-credit balance

**Blueprint:** §§1, 2.1, 4, 5, 7.2, 10.3, 12 (AT-01, AT-02, AT-03, AT-04, AT-07, AT-10, AT-12)  
**Status:** DEFAULT / NEW SPEC — proposed, not approved or implemented  
**Decision owner:** Rick (Foreman)  
**Engineering owner:** Claude  
**Design owner:** ChatGPT  
**Supersedes for sequencing:** D1 starting-credit recommendation, **not** the entire D1 proposal.

## Created
A single end-to-end, testable gameplay loop and a measurement method that derives meaningful starting credits from actual decisions, rather than picking 1,000 or 1,240 in advance.

## Intent / player experience
The player starts as a new graduate with a known home, a degree, a disclosed financial obligation, and **an initial wallet amount left as a variable**. The player discovers a job through the free Career Development Office, applies, accepts a legitimate NPC-funded contract, chooses whether to walk or pay for transit, performs an actual work task, receives wages exactly once, purchases an essential item, recovers energy, reviews obligations, and chooses whether to save or pursue additional training. The next game day starts with a consequential choice, not an automatic success.

**Canonical terms:** Residential Area, Big City, Rural Region, Career Development Office, CitizenMail, Founders' District. Do not rename.

## State machine (machine-readable companion: first-loop-v0.json)
1. `graduate_created`: origin selected; debt and housing visible; wallet assigned by test scenario, not canon.
2. `counselled`: free Career Development Office presents **exactly three** explainable, non-guaranteed pathways; no personality eligibility gate.
3. `job_found`: NPC job board shows prerequisites, pay, location and schedule.
4. `applied`: application through CitizenMail; no instant hiring merely for pressing Apply.
5. `contracted`: eligible screening and contract acceptance; NPC employer has funded payroll.
6. `commuted`: player walks or pays a disclosed fare; fare charged once, state preserved.
7. `task_completed`: one short, comprehensible, repeatable work task with success/failure and feedback; not an idle wage button.
8. `paid`: completed task triggers exactly one employer-to-player ledger transfer.
9. `essential_purchased`: player buys an essential item; inventory and accounts reconcile.
10. `recovered`: energy restored through paid or protected free recovery.
11. `next_choice`: player can save, repay debt, study, or repeat work; first-loop completion is recorded.

**Scope boundary:** this is one NPC employment loop, not the entire production chain or shoe-repair tutorial. Persistent server ledger and CitizenMail can initially be minimal vertical implementations, but the UI must distinguish a real backed action from a local-only mock. A simulated test harness may be used to measure balance before production integration.

## Starting-credit experiment
**Do not implement 1,000 or 1,240 as approved constants.** Both are test candidates only. Evaluate a **provisional** test grid of 0, 100, 250, 500, 1,000 and 1,240 cr across at least four origin scenarios once D2 is available, with job/route/rent costs held constant per run. Test a free-counselling + walking path and a paid-transit path; test an unsuccessful application requiring a second attempt; test one day with no wages.

### Definition of meaningful
A starter wallet is meaningful when the player can make **at least two materially different feasible choices** before the first wage (e.g., pay for a commute vs walk and buy a useful essential; buy materials for self-employment vs preserve cash), but cannot trivially bypass every early constraint. This is a provisional design criterion, not a playtested fact.

### Measurement
Track `credits_at_start`, `credits_before_first_wage`, `first_wage_delay_game_days`, `minimum_essential_spend_before_wage`, `affordable_distinct_paths`, `first_week_liquidity_min`, `time_to_first_wage_minutes`, `negative_balance_attempts`, `recovery_used`, `abandoned_or_blocked_path`, `end_of_week_wallet`, `end_of_week_debt`, `unbalanced_ledger_entries`.

**Decision rule (provisional):** choose the **smallest** candidate amount that supports at least two feasible opening paths for every tested origin, survives one failed application or missed workday without a hard lock, and leaves enough headroom for a player to notice the wage. If no candidate passes, fix the loop or essential costs before increasing starter money. Review both the absolute amount and the ratio to first wages and necessities.

### Example calculations (illustrative, not approved)
Let `F` be the first paid fare, `E` essential pre-wage spend, `B` optional choice budget, `R` protected recovery credit requirement (ideally 0), and `D` debt due before first wage. A rough candidate lower bound is `S >= F + E + B + R + D`. But the actual minimum is determined by state-machine replay, route alternatives and time-to-first-income—not this formula alone.

## Governance / money integrity
- NPC employer funds and the player wallet are distinct ledger accounts; wage must be a transfer, not client-side minting.
- Job must exist and work must be validated before pay. Retries must be idempotent, concurrent claims cannot double-pay, and insufficient employer funds produce an arrears state.
- Free counselling and protected recovery remain accessible with zero wallet; debt does not bar applications.
- No pay-to-win, no external real-money flows, no deterministic MBTI employment advantage.
- Cost and debt values remain **provisional** and configurable, not hardcoded into canon.

## Assumed
A short NPC starter contract is available; basic housing and a free walkable path exist; the Career Development Office is accessible; game-day duration is provisional. These are design assumptions pending level-design and playtesting.

## Tested / evidence
None. This is a specification, not a working gameplay demonstration. Existing GitHub source and CI do not prove this end-to-end loop.

## Unverified
Time-to-first-wage, path diversity, starter affordability, player understanding, fallback quality, origin fairness, and emotional value of the first wage.

## Known risks
A mandatory paid commute can create a soft lock; automatic hiring removes meaningful agency; one-click work undermines learning; too much starter cash trivializes choices; too little cash forces a single optimal path; recurring rent before first wage can be punitive.

## Acceptance tests
- **AT-01:** origin debt differences do not hard-block employment.
- **AT-02:** zone traversal preserves citizen state.
- **AT-03:** wage only follows eligible completed work, exactly once.
- **AT-04:** three explainable free counselling pathways.
- **AT-07:** transport fare exactly once, no negative wallet.
- **AT-10:** duplicate work/payment request has no second payout.
- **AT-12:** reconnect preserves the authoritative result.
- **AT-LOOP-01 (new):** fresh citizen reaches first paid work and next choice without developer commands or fabricated UI success.
- **AT-LOOP-02 (new):** at least two feasible pre-wage paths across origin scenarios; no hard lock after one missed shift.
- **AT-LOOP-03 (new):** CI records scenario outputs and selected candidate with all cost assumptions and reproducible seed.

## Change request to Rick
Approve **sequencing only**: build and measure this loop before selecting starting credits. No balance number is approved by this document.
