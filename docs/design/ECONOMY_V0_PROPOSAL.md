# OPP-DESIGN-D1 — Economy v0 balance proposal
**Date:** 2026-10-17  
**Blueprint affected:** §§2.1, 4.1–4.5, 7.2, 10.3–10.5, 12 (AT-07, AT-08, AT-10, AT-12)  
**Status:** DEFAULT — PROPOSED, NOT APPROVED, NOT IMPLEMENTED, NOT VERIFIED  
**Type:** BALANCE TABLE / CHANGE PROPOSAL  
**Companion:** `docs/design/economy-v0.json` (machine-readable provisional constants)

## Created
A first-playable-week economy with transparent sources/sinks, wage and cost ratios, loan rules, bounded NPC goods prices, a first production recipe, and testable constraints. **No existing client constants should be replaced until Rick approves this design (G3).**

## Philosophy before values
1. A graduate can explore, eat, commute, and recover even without a job. A paid job accelerates progress, not access to basic gameplay.
2. Currency cannot be created by a client command. NPC wages are explicit, budgeted system faucets; player-to-player wages are transfers from employer funds.
3. Public essential services cannot be held hostage by player scarcity. NPC goods price bands and a non-cash emergency safety net preserve access.
4. Debt affects choice and cash flow but cannot permanently lock a citizen out of learning or employment.
5. A 60-real-minute game day is DEFAULT, not a validated pacing assumption. Balance estimates below assume **one 60-minute game day and one normal paid work action/day**; all values are **provisional**.

## Ontology and governance
**Credit (cr)** = virtual currency unit. **Energy (en)** = bounded 0–100 stamina; not tradable currency. **Game day (gd)** = provisional 60 real minutes. **Transaction** = one server-validated, idempotent economic event with balanced postings. **Faucet** = credits entering circulating player/NPC accounts from an explicitly tracked system treasury; **sink** = credits leaving circulation into a system sink account. **Transfer** = credits changing owners without changing circulating supply. Treasury and sink accounts must be ledger-visible.

Player-facing expenses are *not automatically sinks*: NPC purchases may transfer funds into NPC operating accounts; classify them as sinks only if that NPC account is outside circulating supply and is reconciled as such. Never double-count one payment as both a sink and a transfer.

## D1.1 Proposed baseline and first-week target
**Proposal:** choose **1,000 cr** as the universal liquid starter wallet for v0; the previous 1,240 cr is a prototype fixture, not a second canonical starting balance. Origin-specific savings/debt are **separate** adjustments proposed in D2; their aggregate effect must be tested. Rick must approve before migration. Existing save files need an explicit one-time migration, never a silent reset.

A newly created baseline citizen with 1,000 cr, no income, and no rent obligation due until day 3 can afford **7 essential food bundles at 24 cr each (168 cr)**, **four local rides at 12 cr (48 cr)**, and **one recovery rest at 20 cr**, leaving **764 cr**. These are *minimum accessible options*, not a required routine. Housing rent of 120 cr per 7 gd is a recurring cost, not a daily auto-debit. Rent arrears invoke protected accommodation, not eviction into a dead end.

**Expected workday sample (provisional):** one NPC shift +120 cr; food −24 cr; one ride −12 cr; prorated rent −17.14 cr/day; optional scheduled loan payment −10 cr/day equivalent. Net **+56.86 cr/day** before optional purchases. A rural task pays +70 cr with lower energy requirement. The difference is intentional: rural work remains a fallback, not a mandatory money-printing shortcut.

## D1.2 Balance table — all numbers provisional
| Rule | Value / units | Source classification | Notes |
|---|---:|---|---|
| Starting liquid credits | 1,000 cr | Initial treasury allocation (faucet once) | Pending Rick decision |
| NPC employment shift | +120 cr, −20 en, 1 shift/gd | Faucet, capped and funded | Requires valid contract and completed eligible task; never just an employed flag |
| NPC rural day-work | +70 cr, −15 en, 1 task/gd | Faucet, capped and funded | Requires posted and completed task |
| Shoe repair contract | +60 cr gross, −10 en | Transfer | Requires customer-funded escrow, materials and practical competence; detailed in D3 |
| Essential food bundle | 24 cr, +15 en | Sink when bought from protected NPC stock | At most one essential bundle discount/day; not mandatory consumption |
| Basic recovery rest | 20 cr, energy to 100 en | Sink | **Free public recovery alternative** restores to 60 en, max once/gd; no cash required |
| Local transit | 12 cr/trip | Sink for NPC transit; transfer for player operator | No fare for same-domain walking |
| Cross-domain transit | 20 cr/trip | Sink or transfer per operator | No free shortcut through Career Development Office |
| Rent | 120 cr / 7 gd | Transfer to NPC landlord or player landlord | Grace/support; no instant homelessness |
| Loan example | 400 cr principal, 1% per 7 gd, 20 cr minimum payment / 7 gd | Principal is balanced lending transfer; interest is lender income | No automatic loan creation or hidden interest |
| Civic contribution | 10–50 cr chosen amount | Transfer into project escrow | Not a sink, never buys votes |
| Bread recipe | 2 flour + 1 production energy → 4 bread | Inventory transformation | 60 sec production time; requires stock/capacity |
| NPC flour price | 10 cr, floor 8, ceiling 14 | Transfer/sink according to NPC ownership | Market band; prevent guaranteed resale arbitrage |
| NPC bread price | 8 cr, floor 6, ceiling 12 | Transfer/sink according to NPC ownership | Retail purchase, not a free currency source |
| NPC wheat price | 4 cr, floor 3, ceiling 6 | Transfer/sink according to NPC ownership | Production input |

**Production energy** is a company resource, **not citizen stamina**; track them separately. Recipe flour cost at NPC base price = 20 cr for four breads; sale gross at NPC base = 32 cr, leaving 12 cr **before energy, wages, transport, tax and losses**. This is not a guaranteed profit.

## D1.3 Expected faucet/sink register (illustrative per active citizen per game day)
| ID | Direction | At expected pace (cr/gd) | Accounting source / destination |
|---|---|---:|---|
| citizen_start | faucet, one-time | 1,000 cr on creation; **0 recurring** | System starter treasury → citizen |
| npc_shift | faucet | 120 | NPC payroll treasury → citizen, one eligible shift |
| npc_rural_task | faucet | 0 in employed sample; 70 on fallback day | NPC task treasury → citizen |
| npc_food | sink | 24 | Citizen → protected NPC supply settlement |
| npc_transit | sink | 12 | Citizen → NPC transport settlement |
| npc_recovery | sink | 0 normal sample; 20 when purchased | Citizen → NPC recovery settlement |
| npc_housing | sink **only if NPC settlement retires currency** | 120/7 = 17.14 | Citizen → NPC landlord account; otherwise transfer |
| npc_loan_interest | sink **only for system lender** | 4/7 = 0.57 initially | Citizen → lender; otherwise transfer |
| player_wages | transfer | Variable; net 0 system-wide | Employer → worker |
| player_sales | transfer | Variable; net 0 system-wide | Buyer → seller |
| repair_escrow | transfer | Variable; net 0 system-wide | Customer → escrow → worker |
| civic_contribution | transfer | Optional; net 0 system-wide | Citizen → project escrow |

**Expected sample recurring net creation** = 120 − 24 − 12 − 17.14 − 0.57 = **66.29 cr/gd** *only if housing and interest settlements retire currency*. If they remain NPC circulation, net creation is **84 cr/gd**. This is a deliberately exposed risk, not a target. An unbounded 120 cr/day faucet will inflate the world unless NPC procurement, taxes, repairs, enterprise costs and supply scale with it. Before multiplayer economy launch, ledger instrumentation must show actual account ownership and circulating supply.

**Retuning triggers (provisional monitoring thresholds):** flag median active-player liquid wealth growth above **100% per 7 gd**, essential-food affordability below **3 days** for the bottom decile, a basket price index outside **±20%** of v0 for 3 gd, or a >**25%** unaccounted ledger imbalance (actual accounting tolerance is **zero**; 25% is a macroeconomy alarm, not an acceptable ledger error). Do not automatically change prices; generate a balance review.

## D1.4 Mechanics, edge cases and security
- Every monetary action requires authenticated actor, server-issued context, idempotency key, validated prerequisites, and a single database transaction; client sends **intent only**.
- Duplicate/retried request returns the original outcome without re-crediting. Same key + different payload rejects. Failed validation cannot consume funds.
- Concurrent requests lock affected account and inventory rows; no negative balances or double-spent escrow. Insufficient funds gives explicit decline and available noncash alternatives.
- NPC job faucet pays only after verified work completion; daily shift caps and task IDs prevent idle-click wage minting.
- If employer cannot fund payroll, do **not** pay a fabricated wage. Contract enters arrears/dispute, public safety-net jobs remain available; no employer account may go negative.
- Loan principal is liability-backed, not unrecorded income. Interest accrual rounds in integer subunits, never floating-point money. Repayment credits lender and reduces principal/interest according to explicit schedule.
- Price bands apply only to **protected NPC essentials**, not a mandatory cap on every player-to-player sale. NPC purchase/sale limits must prevent arbitrage loops.
- Offline player does not generate wages without funded, bounded, explicitly approved offline work; unpaid rent/interest cannot compound into an irreversible trap.
- Starting credit allocation occurs **once per citizen**, idempotently, with audited treasury posting. If origin savings differ, record the adjustment and funding source.
- Accessibility: essential actions need readable cost, confirmation and non-color cues; no timed input required to earn basic recovery.
- **§10.5 data-model additions proposed:** `TreasuryAccount`/account type, `EconomyPolicyVersion`, `DailyActivityCap`, `PriceBand`, `TransactionIdempotency`, `ProtectedHousingStatus`, and company `production_energy` (or corresponding ledger/metadata fields). These are not approved schema changes.

## Assumed
A 60-minute gd; one completed paid shift/gd; 7-gd rent period; protected NPC stock; a noncash public recovery option; no external cash exchange. No source establishes that these values are economically balanced.

## Tested / evidence
**None.** Arithmetic examples are analytical only; no simulation, telemetry, gameplay test, or player study was performed. Blueprint §§2.1, 7.2 and 10.3 supply the constraints; values are new proposals.

## Unverified
Player pacing, effective earnings, wealth distribution, production margins, scarcity, NPC treasury sustainability, housing hardship and inflation. The proposal cannot be called balanced until measured.

## Known risks
Inflation from NPC wages; origin inequity; arbitrage through NPC price floors/ceilings; over-fast energy recovery; repetitive daily caps; unintended debt traps; rent as a disguised punitive mechanic; ledger implementation conflating transfers and sinks.

## Acceptance tests proposed
- **AT-07:** Each trip charges exactly once; insufficient credits do not change zone or wallet.
- **AT-08:** Bread production consumes exactly 2 flour and 1 company production energy and produces exactly 4 bread once.
- **AT-10:** Duplicate work/loan/purchase requests never mint credits or duplicate goods; simultaneous requests serialize.
- **AT-12:** Reload preserves authoritative wallet, debts, inventory and idempotency history.
- **AT-D1-01 (new):** Baseline graduate can purchase the seven food bundles, four rides and one rest within 1,000 cr, with 764 cr remaining.
- **AT-D1-02 (new):** NPC wage faucet posts treasury debit and citizen credit exactly once after completed eligible work.
- **AT-D1-03 (new):** Seven-day loan and rent accrual remains bounded; no irreversible eviction or debt dead end.
- **AT-D1-04 (new):** One-week economy replay reconciles every posting with zero unaccounted currency and reports faucet/sink rates.
- **AT-D1-05 (new):** NPC buy/sell bounds do not permit guaranteed zero-risk repeated arbitrage.

## Rick's approval gate (G3)
Approve, amend or reject: **(A)** universal starter 1,000 cr vs 1,240 cr; **(B)** wage/expense table; **(C)** protected recovery and housing rules; **(D)** NPC price band mechanism; **(E)** loan example. Until then all are **DEFAULT**, and Claude should not hardcode them into production.
