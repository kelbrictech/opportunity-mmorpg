# WO-06 — Shoe Repair: playable vertical-slice design and acceptance specification
**Status:** DEFAULT / NOT APPROVED. **Design only**, no gameplay code modified. Claude reviews; Rick approves.
**Machine-readable:** `docs/design/WO-06_SHOE_REPAIR_VERTICAL_SLICE.json`.
**Sources:** `docs/MASTER_BLUEPRINT.md` §6.2; `docs/design/GAMEPLAY_CORE_AND_FIRST_QUEST.md`; current `src/quests/broken-shoes.js`.

## Created
A complete draft for item condition, materials, contract and escrow, competence evidence, outcomes, UI feedback, accessibility, events and QA. The current state machine is **not** represented as already implementing this specification.

## Quest premise and goals
Residential Area Repair Shop; a delivery worker needs worn shoes repaired before a shift. Available to **every graduate origin** with zero mandatory entry credits. Target playtime **5–10 minutes (provisional)**. Learn a transferable principle by inspecting damage, selecting a repair plan, preparing a free starter kit, executing a real ordered challenge and explaining why the fix works. No professional accreditation.

## Eight stages / gameplay specification
| Stage | Player action | Game feedback | Evidence stored |
|---|---|---|---|
| Discover | Talk, ask questions, accept or leave | Deadline and stakes, free-entry choice | consent and quest acceptance |
| Inspect | Rotate/zoom item; compare 3 signs; identify sole or upper damage | Signs described in text; wrong diagnosis explained, retry | observed signs, submitted diagnosis, attempts |
| Plan | Choose adhesive or stitch and review tradeoffs | Material fit, expected durability, time, risk | method, reasoning |
| Prepare | Select matching material and free starter kit or inventory | Inventory reservation or kit issue | item/material IDs, quantities, provenance |
| Repair | Perform ordered practical steps | Visible condition changes, clear corrective feedback | ordered operation log |
| Check | Explain bond or seam; inspect result | Knowledge check with retry, no fake certification | question version, answer, pass and practical evidence |
| Resolve | Review quality, ask customer to accept, settle contract | Durable/temporary outcome, actual payout or transparent failure | customer acceptance, escrow release |
| Aftermath | Follow referral or training lead | Relationship/trust update, optional next quest | referral unlock and relationship event |

**Method/steps:** sole separation → adhesive → clean, apply, align, press; torn upper → stitch → clean, align, stitch, inspect. This is a simplified educational mechanic; real footwear repair may require material-specific techniques and safety review before publication. For an incorrect method, result can be **temporary** with honest feedback; do not falsely award durable competence.

## Item condition and outcomes
**Draft test item:** `delivery_shoes_001` with initial condition **38/100 points (provisional)**. Durable outcome ≥80 quality → proposed **88/100** condition; temporary quality 55 → proposed **55/100** condition; invalid/unsafe action → no destructive change and guided retry. Condition, wear, material use and customer ownership are separate persisted fields. Condition is not equivalent to player skill.

**Materials:** glue **8 cr/unit**, thread **5 cr/unit**, sole patch **15 cr/unit** (all provisional). Free starter kit covers one first attempt, preventing pay-to-start. Inventory must reserve before action, consume only on accepted operation, and release on cancellation. Tool access free for initial quest. No invisible material creation.

## Contract and economic integrity
Proposed contract `npc_shoe_repair_001` with **60 cr payout (provisional)**, customer NPC delivery worker, explicitly **UNFUNDED** until Claude wires escrow. A payout is permitted only after customer acceptance and a **funded** escrow balance. The same idempotency key `contract:npc_shoe_repair_001:pay:v1` cannot pay twice. Player income must have a corresponding customer escrow debit; NPC-funded jobs require a registered faucet/escrow funding event. The current root quest pays **90 cr** using a prototype economy action; this discrepancy is a BLOCKER for production parity, not a silent rebalance.

**Ledger atomicity:** one transaction records contract state, player credit, escrow debit, inventory settlement and quest event or fails as a unit. LocalStorage-only cannot provide authoritative multiplayer settlement. Repeat requests must be idempotent across refresh and tabs.

## Comprehension and fairness
Record `correct_damage_identification`, `method_fit`, `material_fit`, `correct_sequence`, and `mechanism_explanation` as **separate evidence**. A single boolean `knowledgePassed` is insufficient for detailed skill progression. Explain mistakes, offer retry without new payment, and never gate by degree, school, personality, or wealth. No “watched video → certified” shortcut. Practical knowledge in the game is not a real professional credential.

## Accessibility and UI requirements
- Full keyboard path (Tab, Enter/Space, Escape, arrows where appropriate); touch controls; 48×48px proposed targets.
- Every visible damage clue has a textual description; no color-only indication; item rotation is optional.
- Untimed ordered-action mode offers equal outcomes to timing-based interaction; reduced-motion, readable captions and screen-reader announcements.
- Choice consequences shown before confirmation; retry feedback does not erase progress without notice.
- Text scale 100–200% proposal from WO-05; real mobile/assistive tech validation still required.

## Acceptance test plan (must run in browser)
| ID | Scenario | Expected evidence |
|---|---|---|
| AT-06-01 | All four graduate origins enter without payment | Origin/quest state trace |
| AT-06-02 | Correct sole diagnosis, adhesive, glue and sequence | Durable result and operation log |
| AT-06-03 | Upper tear, stitch, thread and sequence | Durable result and operation log |
| AT-06-04 | Wrong diagnosis | Constructive feedback and retry |
| AT-06-05 | Wrong material | No consumption, corrective prompt |
| AT-06-06 | Wrong step order | No progress advance, expected-step feedback |
| AT-06-07 | Wrong explanation | No competence award, retry available |
| AT-06-08 | Inappropriate method | Temporary result, honest explanation |
| AT-06-09 | Unfunded escrow or rejected customer | Zero payout, explicit status |
| AT-06-10 | Successful customer approval and funded escrow | Single ledger transfer, no currency creation |
| AT-06-11 | Repeat payout after reload and two tabs | Exactly one payment |
| AT-06-12 | Inventory cancellation | Reserved items restored |
| AT-06-13 | Zero credits | Free first attempt and no game over |
| AT-06-14 | Keyboard-only, touch and untimed mode | Equivalent completion and accessibility evidence |
| AT-06-15 | Refresh mid-repair | Exact state and reserved inventory restored |
| AT-06-16 | Quest completion | Referral or training opportunity recorded |

## Comparison with current implementation
The existing `src/quests/broken-shoes.js` already implements a simplified 8-stage transition flow, method-dependent ordered operations, quality 100 or 55, a single mechanism question and a local `paid` flag. **It does not yet verify actual item damage, store condition, reserve inventory, hold funded escrow, record independent competence evidence, obtain customer approval or guarantee server-side exactly-once payout.** Existing code's `claimReward` is a local boolean, not a ledger settlement. Root integration also pays 90 cr, conflicting with this draft's 60 cr.

## Assumed
NPC identity, contract ID, 60 cr payout, item condition, prices, time target, referral and all thresholds are proposed values. No production safety certification of real repair techniques has occurred. The current game and economy remain unmodified.

## Tested / evidence
Compared draft against the current quest state machine and existing gameplay design in GitHub. Acceptance cases authored. No executable game/browser/ledger tests run for this spec.

## Unverified
Claude's data contracts, escrow implementation, repair minigame usability, practical safety accuracy, cross-client integration, live accessibility and actual payout behavior.

## Known risks
Teaching simplified adhesive/stitch mechanics without material/safety context; unpaid escrow and duplicate reward exploits; progression evidence too coarse; race conditions across tabs; invalid assumptions about item ownership and NPC approval; inconsistent current 90-cr prototype payout.

## Acceptance criteria
- Item condition and materials with provenance — **MET as design; NOT IMPLEMENTED**.
- Meaningful choices and comprehension check — **MET as design; simplified code only**.
- Funded, exactly-once contract payout — **SPECIFIED; NOT IMPLEMENTED**.
- Accessibility and non-timing alternative — **SPECIFIED; NOT VERIFIED**.
- 16 test cases with expected evidence — **MET as test plan**.

## Requested decision
Claude: ACCEPT/REVISE/REJECT schema and settle contract/ledger ownership; Rick: approve story/learning direction and any prices separately. Do not mark WO-06 verified until the 16 cases execute with evidence. Next design assignment WO-07: Founders' District mapping.
