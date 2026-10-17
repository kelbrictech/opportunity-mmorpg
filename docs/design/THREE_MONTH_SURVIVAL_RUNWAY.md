# OPP-DESIGN-D1B — Three-month survival runway
**Blueprint sections:** §§2.1, 4.3–4.5, 7.2, 10.3, 12 (AT-01, AT-10)  
**Status:** LOCKED INTENT (three-month initial no-income essentials runway; no automatic game-over at zero credits) / DEFAULT mechanics pending approval  
**Design owner:** ChatGPT; engineering owner: Claude; canon approver: Rick

## Foreman's direction
New graduates should start with **three months' worth of credits to survive without income, so the game does not prematurely force failure**. This is a starting buffer, **not a three-month game lifespan, timer, or game-over deadline**. This replaces the prior arbitrary 1,000/1,240 credit recommendation as the design basis. No numeric wallet value is approved until survival costs are specified and the gameplay loop is measured.

## Created
Define monthly essential expense budget **M** and starting liquid wallet **S = 3 × M**. All monetary units are virtual credits (cr). The time model and accounting period must be explicit: proposed **one month = 30 game days (provisional)**, so the nominal runway is 90 game days. The blueprint's **one game day = 60 real minutes** is itself DEFAULT and untested. Ninety consecutive game days would be 90 real hours at that rate; this is a major pacing risk and requires a time-compression decision before shipping.

## Survival cost definition
For each citizen origin `o` and location `z`, calculate `M(o,z)` from:
- Protected basic housing / rent (including essential utilities).
- Minimum sufficient food and drinking water.
- Necessary transport for access to employment and essential services (with free walking as a viable option).
- Basic healthcare/recovery allowance.
- Mandatory minimum debt payments **only if Rick explicitly elects to include debt service in the survival guarantee**; default recommendation is to treat debt separately with grace/deferment rather than inflate starting wallets in proportion to debt.
Exclude optional training, business investment, premium housing, entertainment, and discretionary consumption.

**Recommended fairness policy (DEFAULT):** fund a three-month *protected basic-needs basket* for every graduate; disclose each origin's actual living costs and student loan separately. Use local cost-of-living adjustments only where essential services are meaningfully more expensive, and prevent exploiting origin/location switches to repeatedly collect grants. One-time grant is idempotent per citizen.

## Proposed calculation (all numbers below are illustrative, provisional, not approved)
| Monthly essential category | Example cost (cr/month) |
|---|---:|
| Protected basic housing | 480 |
| Food and water | 720 |
| Essential transport | 240 |
| Health and recovery reserve | 120 |
| **Monthly survival cost M** | **1,560** |
| **Three-month starting wallet S** | **4,680** |

Illustrative daily rates assume a provisional 30-game-day month. These example figures are **not derived from a tested economy** and must not be hardcoded.

## No premature ending — explicit rule
**Zero credits is a hardship state, not a terminal game state.** Citizens retain access to free Career Development Office guidance, viable zero-cost work pathways, protected emergency shelter, basic recovery, and essential access. Debt delinquency and rent arrears may carry proportionate consequences, but cannot make further gameplay impossible. The economic runway is a minimum initial cushion for essentials, not a timer to death, eviction, or forced reset. The citizen can continue indefinitely by earning and managing resources. Details of emergency services are DEFAULT until approved.

## First-loop testing
Run the same graduation → free Career Development Office → CitizenMail application → commute → eligible work → verified wage → food/recovery → next choice loop with wallet `S=3M`. Measure:
1. Whether a player who earns nothing can meet basic needs for the promised 90 game days.
2. Whether loan due dates, health events, and unavoidable travel invalidate that promise.
3. Whether working early creates meaningful savings and entrepreneurship options rather than a compulsory survival grind.
4. Whether different graduate origins receive comparable runway without hard-blocked careers.
5. Whether the 90-game-day calendar produces unreasonable real-world wait times; evaluate shorter season/month compression without changing the intended **three-month economic buffer**.

## Economic integrity
The initial allocation is a one-time, server-validated, ledger-recorded system faucet. It cannot be granted again by rerolling an origin, reconnecting, retrying, or switching regions. A player's wage and subsequent purchases use the authoritative ledger; the client never directly mints money. The reserve is not a guaranteed cash profit or a real-money equivalent.

## Assumed
A protected essentials basket exists and monthly costs can be computed. The 30-day month and example amounts are provisional. Whether mandatory debt service belongs in the basket remains unresolved.

## Tested / evidence
None. This is a design change request based on Rick's direction, not an implemented or playtested mechanic.

## Unverified
Actual survival cost, wage-to-expense ratio, game-day/month pacing, origin fairness, inflation impact, player motivation, and the real-time duration of the economic runway.

## Known risks
Starting with too much spendable money can make entry-level wages feel inconsequential; too little or undercounted debt service violates the survival promise. Ninety real hours of nominal runway can make expenses feel meaningless or delay urgency. A larger initial faucet could inflate an unbounded NPC economy. Expensive origins may be disadvantaged unless protected essentials and loan grace are explicit.

## Acceptance tests
- **AT-RUNWAY-01:** A no-income citizen purchasing only the defined essentials can remain housed, fed, and able to access protected healthcare for at least three modeled months without negative balance.
- **AT-RUNWAY-02:** Starter funding is granted exactly once and reconciles to the treasury ledger.
- **AT-RUNWAY-03:** All origin scenarios have a comparable protected-needs runway; student debt does not hard-block first employment (AT-01).
- **AT-RUNWAY-04:** A citizen can earn wages, spend, save, and choose an alternative livelihood without a mandatory paid route or involuntary dead end.
- **AT-RUNWAY-05:** Time-compression and affordability simulations report the number of real minutes needed for one economic month.

## Approval gate
Rick's clarification establishes the **three-month no-income essentials buffer and no automatic game-over on financial exhaustion** as the design intent. Detailed basket contents, 30-day-month assumption, inclusion of loan service, and resulting wallet amounts remain DEFAULT proposals pending approval. Do not overwrite economy constants or the canonical blueprint yet.
