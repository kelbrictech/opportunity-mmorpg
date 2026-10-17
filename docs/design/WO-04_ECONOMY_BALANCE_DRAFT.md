# WO-04 — Economy v0 balance table, register and week-one walk-through
**Status:** DRAFT / DEFAULT; **NOT APPROVED**. WO-03 graduate origins have been submitted but not accepted by Claude or approved by Rick. This is a conditional analysis deliverable, not a request to implement numbers.
**Machine-readable:** `docs/design/WO-04_ECONOMY_BALANCE_DRAFT.json`.
**Units:** cr = virtual credits; game_day = one simulated game day; game_month = 30 game_days, **provisional**. **All numeric balances, prices, quantities, time spans, thresholds and rates in this report are PROVISIONAL.**

## Created
A register of 24 credit-related actions and one non-monetary recovery action, each with classification (faucet, sink, transfer), expected daily pace or per-event amount, and conditions; 11 new-player goods/services with floors and ceilings; two no-income week-one origin traces; four economy-failure thresholds; an append-only reversal policy.

## Economy policy and mismatch resolution
**Recommend retiring both 1,000 cr (blueprint illustration) and 1,240 cr (root alpha implementation) as starting-wallet constants.** They do not cover the Foreman's requested 3-month protected essentials: Fine Arts needs an illustrative 1,560 cr/month × 3 = **4,680 cr**, Agriculture 1,320 cr/month × 3 = **3,960 cr**. Exact amounts remain subject to testing and Rick's approval. Credit amounts should be computed from the chosen origin's **protected monthly essentials**, not fixed by code. Origin-specific preexisting savings are a **separate one-time endowment**; neither it nor the grant may be credited twice. An optional loan grace period prevents mandatory repayments during the protected runway; its duration and terms require approval. Zero credits triggers a recoverable hardship state, never game over.

**Accounting definition:** protected essentials include basic food, routine local transport, shelter, utilities and recovery allowance. Their monthly sum is a budget envelope, not an extra daily tax. When actual food/transit/rent transactions occur, subtract them **from the envelope**; do not additionally deduct the entire 52 cr or 44 cr/day on top of itemized spending. Optional cross-domain travel, tools and civic contributions are outside the protected basket unless explicitly budgeted.

## Action and register overview
The companion JSON lists all entries and the per-day expected pace:
- **Faucets:** protected starting grant (one-time), origin savings (one-time), NPC paid shift 120 cr/day, alternative rural task 70 cr/day, potential NPC story/quest stipend **disabled at 0 cr/day** pending approval.
- **Sinks:** NPC food 24 cr/day, local transit 12 cr/day, cross-domain transit 20 cr/trip, paid recovery 20 cr/use, optional equipment repair (variable). Other NPC purchases become sinks **only if NPC funds leave circulation**.
- **Transfers:** NPC repair contract 60 cr per funded contract, player employer wage, player sale/gift, landlord rent 120 cr/7 days if landlord retains funds, loan repayment 20 cr/7 days after grace, materials purchases if seller retains funds, civic escrow contributions/refunds, escrow release and compensating reversals.
- **Nonmonetary:** free public recovery, 0 cr/day.
- **Unresolved conflict:** current root repair quest awards 90 cr using `repair` economy action, while older design lists 60 cr. This draft **does not approve either**. Resolve via funded escrow/registered NPC faucet and actual skill assessment before release.
- **Other risk:** some NPC expenses may be sinks or transfers depending on whether the counterparty ledger exists. Classification must be settled by Claude's double-entry implementation; the register notes conditional cases. No fiat/real-money mechanics.

## Essential goods and services: proposed price guardrails
| Good/service | Base | Floor | Ceiling | Unit |
|---|---:|---:|---:|---|
| Bread | 8 | 6 | 12 | cr/loaf |
| Essential food bundle | 24 | 20 | 30 | cr/bundle |
| Basic water | 4 | 2 | 6 | cr/day |
| Shared housing | 120 | 100 | 180 | cr/7 days |
| Local transit | 12 | 8 | 16 | cr/trip |
| Cross-domain transit | 20 | 15 | 28 | cr/trip |
| Public recovery | 0 | 0 | 0 | cr/use |
| Adhesive | 8 | 5 | 12 | cr/unit |
| Thread | 5 | 3 | 8 | cr/unit |
| Sole patch | 15 | 10 | 22 | cr/unit |
| Basic tool access | 0 | 0 | 0 | cr/first quest |

**Every table number is provisional.** Food, water, rent and local transit are covered by the origin essentials envelope at the assumed play pace; cross-domain transit and repairs are elective or exceptional. Prices are design caps, not actual market-clearing prices.

## First game week — two contrasting origins, no paid work
**Assumptions:** 7 game days, no income, no optional purchases, no loan payment/interest in protected onboarding, daily essentials charged only once. This is a deterministic arithmetic walk-through, not a simulation run.

| Day | Fine Arts city: opening 5,580 cr, 52 cr/day | Agriculture rural: opening 4,210 cr, 44 cr/day |
|---|---:|---:|
| 0 | 5,580 | 4,210 |
| 1 | 5,528 | 4,166 |
| 2 | 5,476 | 4,122 |
| 3 | 5,424 | 4,078 |
| 4 | 5,372 | 4,034 |
| 5 | 5,320 | 3,990 |
| 6 | 5,268 | 3,946 |
| 7 | **5,216** | **3,902** |

**Affordability:** Fine Arts: grant 4,680 + origin savings 900 = 5,580 cr; 7-day essentials 364 cr, leaves 5,216 cr. Agriculture: grant 3,960 + origin savings 250 = 4,210 cr; 7-day essentials 308 cr, leaves 3,902 cr. Both have a full **90-day** grant-only essentials runway before discretionary spending, assuming the illustrative basket remains constant. At day 7 either could pay for one optional 20 cr cross-domain fare, leaving 5,196 or 3,882 cr; that choice reduces runway slightly and must be shown transparently in UI. No job is necessary to survive week one.

**Alternate earning path (not included in baseline):** if the Fine Arts player completes one legitimate NPC shift at +120 cr, their day-7 balance would be 5,336 cr; if the Agriculture player completes one legitimate rural task at +70 cr, theirs would be 3,972 cr. This is a scenario illustration, not automatic income. Work requires valid job/task and completion evidence.

## Economy-is-broken thresholds (all provisional)
1. **Wealth inflation:** cohort median liquid wealth at game day 7 / day 0 ≥ **2.0×** without equivalent productive output → investigate faucets and duplicates.
2. **Runway breach:** no-income protected essentials coverage below **90 game days** at onboarding → block release and rebalance.
3. **Unauthorized negative wallet:** available balance below **0 cr** without an explicitly supported credit facility → stop offending transaction and reconcile.
4. **Faucet imbalance:** 7-day NPC faucet/sink ratio above **1.5×**, excluding one-time starter grants and legitimate transfers → investigate, not retroactive punishment.

## Reversal and duplicate correction
Ledger transactions must be immutable. A mistaken transaction is corrected with equal and opposite **compensating entries**, linked to original transaction ID, actor, reason and audit timestamp. Require idempotency key `reversal:<originalTxId>`; repeat requests return the same result. If the recipient spent funds, do not create an unauthorized negative wallet; route to a bounded receivable/manual review. Escrow reversal must preserve buyer/escrow/seller double-entry balance. A mistaken mint/burn correction must explicitly reverse its original faucet/sink classification.

## Assumed
The four origins in WO-03; 30-day accounting month; costs and unit prices; protected grace period; initial NPC faucets; optional travel and repair pricing; inflation thresholds. No numeric value is canon.

## Tested / evidence
Arithmetic in the week-one table is internally consistent (Fine Arts 5,580 − 7×52 = 5,216; Agriculture 4,210 − 7×44 = 3,902). Machine-readable register and price table committed to GitHub. No live ledger, economic simulation, game playthrough, or approval.

## Unverified
Realistic gameplay pace, housing and transport cost distribution, market equilibrium, exploit resistance, accessibility, debt policy, NPC fund accounting, and Claude's schema acceptance.

## Known risks
**Dependency gate:** WO-03 is unapproved. Do not replace client balances from this draft. Daily envelope could double-charge if combined with itemized transactions. NPC escrow cannot be considered a transfer if the NPC is not ledger-funded. One-time grant could inflate money supply at scale without controlled issuance. Fine Arts loan is larger and requires grace terms to prevent unequal hardship.

## Acceptance criteria
1. Every credit-changing action with classification and expected daily amount — **PARTIAL:** 24 monetary entries listed; variable player-driven actions are explicitly 0 cr/day baseline with actual amounts unknown; NPC sink/transfer classifications conditional on ledger architecture.
2. Floors and ceilings for every good a new player needs — **MET for identified protected essentials and shoe-repair materials; PARTIAL if future inventory adds new essential goods**.
3. Resolve 1,000 vs 1,240 with reason — **MET (proposal, not approval)**.
4. First week for at least two origins — **MET**.
5. At least three broken-economy thresholds — **MET (four)**.
6. Reversal rule — **MET**.
7. WO-03 approved before WO-04 implementation — **NOT MET (awaiting Rick)**.

## Next action
Claude reviews WO-03 first and then this conditional WO-04 draft; Rick approves or revises origin and economy values before BUILD-005. ChatGPT may proceed to WO-05 **specification only** without implementing UI.
