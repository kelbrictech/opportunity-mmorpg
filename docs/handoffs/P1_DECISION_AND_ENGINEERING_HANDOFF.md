# P1 — Decision and Engineering Handoff (Unapproved)

Status: ACTION PACKET ONLY. No acceptance, story selection, art approval, or implementation is implied.

## Source documents checked
- [S0 manifest](../handoffs/S0_STYLE_TEST_MANIFEST.md)
- [WO-08a story options](../story/WO-08A_PREMISES_AND_CAST.md)
- [WO-03 graduate origins](../design/WO-03_GRADUATE_ORIGINS.md)
- [WO-04 economy draft](../design/WO-04_ECONOMY_BALANCE_DRAFT.md)
- [WO-05 UI](../design/WO-05_CIVIC_SLATE_UI_SPEC.md)
- [WO-06 shoe repair](../design/WO-06_SHOE_REPAIR_VERTICAL_SLICE.md)
- [WO-07 Founders' District](../design/WO-07_FOUNDERS_DISTRICT_MAPPING.md)
- [WO-09 style bible](../story/WO-09_PANEL_STYLE_BIBLE_DRAFT.md)

## Pending P1 approvals — no decisions recorded here
1. S0 visual direction: ACCEPT / REVISE / REJECT. Three PNGs were previously produced from one triptych; the GitHub manifest is present but binary art is not. Do not approve from manifest alone; visually inspect original assets.
2. Story premise: A The Street That Remembered / B The Map of Small Chances / C Tomorrow's Bread / REVISE. Foreman must explicitly choose.
3. WO-03 through WO-07: Claude to return individual ACCEPT / REVISE / REJECT decisions, with required changes; Foreman approves canon.
4. WO-09 panel templates: Claude to check renderer compatibility; approval follows visual direction and story selection.

## Implementation handoff — tasks not claimed complete
- Graduate origins: four origin data sets, 3-month protected basic needs, no degree-gated careers. Must be tested with each origin.
- Economy: classify monetary sources/sinks/transfers, enforce balances and idempotent ledger, resolve starting-credit mismatch and provisional prices.
- Civic Slate: implement actual responsive HUD states, accessibility, 200% text reflow and test composited contrast.
- Shoe repair: actual condition/inventory/contract/escrow and competency evidence, customer acceptance, exactly-once payout, untimed equivalent; reconcile existing 90-credit prototype payout with 60-credit unapproved proposal.
- Founders' District: map nine historical landmarks to the three playable domains, retaining historical 3x3 reference, without introducing fourth zone.
- Story integration: only after selection and approval, WO-08b Chapter 1 script, S1 model sheets, scene art, and live browser proof.

## Specific approval questions
- S0: approve existing imagery, request independent rework, or reject?
- Story: A, B, C, or revise?
- Historic grid: keep as heritage diagram only or request physical exhibit?
- Economy: approve a specific payout after reviewing contract funding? Neither 60 nor 90 credits is declared canonical.

## Tested / evidence
This packet is based on reading the linked GitHub documents. No gameplay, deployment, or browser test was performed for this packet.

## Unverified
Approvals, implemented runtime behavior, binary art provenance, and end-to-end gameplay.

## Known risks
Unapproved story or visual choices could cause wasteful art production. Production economy cannot inherit prototype payouts without an explicit decision. A GitHub documentation commit is not a deployed feature.

## Acceptance criteria
Decision packet present: MET.
Approval decisions: NOT MET.
Production implementation: NOT VERIFIED.
Live gameplay evidence: NOT VERIFIED.

## Next
Foreman provides story and S0 decisions; Claude provides per-work-order review decisions and engineering proof. Then ChatGPT can author WO-08b without guessing canon.
