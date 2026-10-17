# WO-03 — Four graduate origins (D2)
**Status:** DEFAULT / FOR CLAUDE REVIEW AND RICK APPROVAL. **Blueprint:** §§2.1–2.3, 3.1, 5.1; AT-01. No game code or blueprint changes.

## Created
Four distinct fresh-graduate origins in the companion machine-readable `docs/design/WO-03_GRADUATE_ORIGINS.json`. Each records education, institution type, financing, initial domain, housing, origin-specific savings and debt, obligations, knowledge, open career pathways, and optional dialogue flavor.

| Origin | Education / institution | Financing | Start | Savings (cr) | Debt (cr) | Illustrative protected 3-month grant (cr) |
|---|---|---|---|---:|---:|---:|
| The Unfinished Canvas | Fine Arts / prestigious private | loan + family | Big City | 900 | 12,000 | 4,680 |
| The Seed Keeper | Agricultural Science / public | scholarship + work-study | Rural Region | 250 | 0 | 3,960 |
| The Night Shift Graduate | Information Systems / community college | work-study + savings | Residential Area | 450 | 1,800 | 4,320 |
| The Careful Listener | Health Sciences / state university | partial scholarship + family + loan | Big City | 300 | 4,800 | 4,680 |

**Every number in this table is PROVISIONAL.** Savings are origin-specific and **separate** from the survival grant; do not add the grant again during rerolls. Grants follow Rick's rule `3 × monthly protected essentials` and are not yet approved amounts. Loans require a fair grace-period policy; no debt collection may close career access.

## Open-path policy
All four origins can apply for all careers, including professions unrelated to their degree. Regulated or specialized roles may require the same demonstrated in-game competencies for everyone; no origin-only restrictions. All can access the free Career Development Office, training, public recovery, and the first shoe-repair quest. Optional personality descriptions change dialogue tone only, can be skipped/edited, and do not change hiring, wage, price, or skill multipliers.

## Narrative hooks
- Fine Arts: a polished portfolio and an intimidating education loan coexist; practical repair work is a valid livelihood rather than a moral failure.
- Agriculture: an excellent harvest is worth little without transport and a fair buyer.
- Information Systems: a first unpaid-experience offer invites a meaningful choice between earning now and building a portfolio.
- Health Sciences: a crowded clinic motivates civic improvements while professional competence remains assessed rather than assumed.

## Assumed
The monthly essentials basket, debt grace period, institution classifications, opening housing, and savings are design examples. No numeric values approved. Story hooks are nonbinding; no guaranteed job or automatic competency from education.

## Tested / evidence
Schema and narrative content authored; GitHub commits provide provenance. No economy simulation, browser test, or Claude acceptance has been run.

## Unverified
Affordability across three simulated months, fair starting position across origins, game pacing, debt interest and housing assumptions, character-selection UX, save integration.

## Known risks
Origins with cheaper protected essentials receive smaller grants; if actual access to transport or food differs, nominal three-month parity may fail. Loan burden could become punitive without a grace period. Origin-specific savings plus grant may imbalance first-week purchases. The `institution.prestige` field is narrative only, never a hiring score.

## Acceptance criteria
1. Four archetypes vary in institution, financing, domain — **MET** (table/JSON).
2. Obligations and open paths, no career locks — **MET** (JSON + policy).
3. Fine Arts prestigious private with larger loan and open paths — **MET**.
4. Personality only optional dialogue flavor — **MET**.
5. Debt and savings provisional — **MET**.

## Decision requests
Claude: assess schema compatibility with BUILD-005 and flag missing fields. Rick: approve narrative direction separately from any numeric balances. **Do not implement provisional numbers as locked constants.**
