# OPP-HANDOFF-002 — ChatGPT → Claude: Post-BUILD-001 work, defects and takeover
**Date:** 2026-10-17  
**Audience:** Claude — Engineering Lead and operational lead for ChatGPT; Rick — Foreman / final approval  
**Scope:** All ChatGPT activity since Claude's BUILD-001 handoff and parallel-work instructions  
**Type:** ENGINEERING HANDOFF / STATUS AUDIT / BUG REPORT  
**Status:** Evidence-qualified snapshot. No claim of browser-verified gameplay.  
**Repository:** https://github.com/kelbrictech/opportunity-mmorpg  
**Canonical blueprint:** docs/MASTER_BLUEPRINT.md — do not change without Foreman approval.  
**Previous handoff:** docs/builds/BUILD-001.md (Claude's handoff), docs/CHATGPT_TO_CLAUDE_HANDOFF.md (earlier coordination document).  
**Latest known commit/deployed revision at report time:** `cc179e70873e45394a7760bc4575ae2ae88962d7`.

## 0. Foreman's current directives — highest priority
1. **Opportunity must be a GAME, not merely an economic simulation.** Gameplay must feature engaging quests, meaningful player decisions, playable challenges, feedback, progression, and consequences. Economics is supporting infrastructure.
2. **Build continuously, with evidence.** Do not spend turns on plans without deliverables; distinguish code, tests, deployed status, and actual browser proof.
3. **Starting credits must cover three months of basic survival without income**, to avoid premature failure. This is NOT a three-month game lifespan or a game-over timer. **Zero credits is hardship, not automatic game-over.** Exact wallet amount remains undecided pending cost modelling and gameplay testing.
4. **ChatGPT reports to Claude operationally.** Rick's instructions or Claude's handoffs are the basis of ChatGPT's tasks. Rick remains final authority for LOCKED canon.
5. Every ChatGPT turn ends with a **Next Action**.
6. User twice supplied screenshots showing **blank dark 3D scene with only HUD controls** at Render URL. This is a reproducible user-observed blocker; no successful screenshot exists in this exchange.
7. “Not in GitHub, not true”; source commits alone are NOT gameplay proof.

## 1. Claude BUILD-001 integration — completed earlier
**Claude's supplied BUILD-001:** four files integrated without intentionally modifying Claude's file bytes: `prototypes/civic-slate-slice/index.html`, `src/economy.js`, `tests/economy.test.js`, `docs/builds/BUILD-001.md`. Integration final SHA `f2b1a733e897462200f16a4ed219732d4166a6fe`.
Prior inspection reported matching Git blob hashes:
- slice: `84a710f87b4b70cab7de5de4557de642a9f7ea13`
- economy: `a15391f01ff163828b601b958c76f8a10c354d96`
- economy tests: `314c64c7e5e95c6d408cc31b87a5ef87adc51c83`
- manifest: `0eeb329a4aac270f7fb27e4dcdfda994e11eb3a9`
These are Git blob SHAs, **not SHA-256**; Claude's manifest contains file SHA-256. No verified post-upload green CI or browser run was established. Claude's local BUILD-001 report claimed 16/16 economy tests passed on his copy, NOT current HEAD CI.

## 2. ChatGPT work after BUILD-001

### D1 Economy design
- `docs/design/ECONOMY_V0_PROPOSAL.md` — `3236703c6a77a1c7f4addd3b76cd66863a6d9dbb`.
- `docs/design/economy-v0.json` — `cb3d34c9d5916f6f41f29a2664aeca4b2ccd7398`.
- Contains provisional wages, food, rent, fare, loans, NPC pricing and faucets/sinks. **Superseded in starting-credit decision** by Rick's three-month-survival direction. No numbers approved; do not hardcode the original 1,000/1,240 proposal.
- Known schema issues: recovery uses `energyChange:100` to mean set-to-100 (not additive); civicContribution shows fixed -10 while intended variable 10–50; startingSavings must not double-count initial wallet.

### D1A first gameplay loop (spec only)
- `docs/design/FIRST_ECONOMIC_LOOP.md` and `docs/design/first-loop-v0.json` — last commit `8dcc45e9dc1a41d632083e29e49178fe3f8235be`.
- Graduate → free Career Development Office → job application → contract → commute → real work → wage → essentials → next choice.
- Starting-credit candidate grid was proposed **before** Rick clarified three-month target; now historical testing context, not governing balance rule.
- No implementation of full job/CitizenMail loop.

### D1B three-month survival
- `docs/design/THREE_MONTH_SURVIVAL_RUNWAY.md`, clarification commit `81e5b57af8ce3b6e094f268b6d2be66cbdbd4cd3`.
- `src/design/survival-runway.js`, `tests/survival-runway.test.js` — latest code correction `c3d8c22717be49b6a047a74467607c1c336d38b9`.
- Computes `startingCredits = 3 × monthlySurvivalCost` from basic housing, food, transport, recovery, utilities and optional debt service. Includes no-income simulation and `gameOver:false` for financial exhaustion. Illustrative basket 1,560 cr/month → 4,680 cr; **not approved or calibrated**.
- The tests were written; **no independently verified run of current HEAD**.

### GAMEPLAY CORE: Rick redirected focus from economy to actual game
- `docs/design/GAMEPLAY_CORE_AND_FIRST_QUEST.md` — commit `77db12a424cfb8e43036d17b1e29d0666bab70ee`.
- Proposed core loop: discover → choose → prepare → play → resolve → earn → unlock.
- Quest 001 “The Broken Shoes”: NPC delivery worker, diagnose damage, select repair method/material, perform ordered steps, explain mechanics, receive quality outcome and follow-up opportunity.
- **Status DEFAULT, proposed**. Do not treat narrative or exact quest mechanics as LOCKED without Rick's approval.

### Quest implementation and tests
- `src/quests/broken-shoes.js` — state machine: discover → inspect → plan → prepare → repair → check → resolve → complete; `claimReward` tracks a local `paid` flag.
- `prototypes/quest-001/index.html` — standalone playable HTML quest interface.
- `tests/broken-shoes.test.js` — 5 unit tests (durable/temporary result, step order, no duplicate claim, knowledge check).
- Last initial test commit `30b54e9ccb6610f2f4c6e2482c5be3e1ab9a5d40`.
- Earlier ChatGPT claimed “5 equivalent tests passed locally” without an independently preserved test log or CI link. **Treat as unverified for audit**.
- GitHub Pages URL `https://kelbrictech.github.io/opportunity-mmorpg/prototypes/quest-001/` **returned 404** in Rick's screenshot. **Do not recommend this link.**
- `src/quest-001.html` created at `571518a0353e2c6e19a2512e8802f9dc1ea52e0b` to be included by existing Render static publish command (`cp -r src public/src`). It imports `./quests/broken-shoes.js`. Render reported this deployment live; actual standalone browser playthrough remains unverified.

### Root 3D integration
- `index.html` updated at `d99750ea4815a12949879d5d44dc254031382e8f`.
- Root Residential Area Repair Shop now calls `showQuest()` instead of old instant `repair` action.
- Quest completion calls `transact(state,'study',{key:'quest-001-competence'})` if not already learned, then `transact(state,'repair',{key:'quest-001-payment'})`; expected prototype payout **90 credits**, energy cost **10**, based on `src/economy.js` provisional ACTIONS. Quest progress stored in `opportunity-quest-world-v1` separately from citizen `opportunity-v2`.
- **IMPORTANT INTEGRITY ISSUE:** two independent localStorage records are not atomic; `update()` persists citizen state before `questSave()`. Reload between them can produce paid citizen with unpaid quest flag. The economy's idempotency key prevents duplicate payout only while processed keys remain present (bounded to 200). Also no server escrow/customer funding; `study` awards competence via shortcut; referral is UI text, not a playable follow-up.
- **Potential gameplay bug:** if `study` succeeds but `repair` fails due to insufficient energy, study state is not persisted until later `update()`; review state consistency and feedback.
- No validated 3D browser quest playthrough.

### 3D blank-screen incidents and attempts
Rick posted two screenshots (2026-10-17) showing dark blank background, logo/zone, Travel/Career/Profile/Save, minimap border, and no avatar, buildings, or stats. Screenshots are user-provided observations, not successful gameplay evidence.
1. `ab4baf8d9bda99c7be9d7995055ac1004b7056f1`: replaced root Three.js ES-module CDN import with global Three.js r128 script from cdnjs; adjusted output encoding. **Did not resolve blank screen**, per second screenshot.
2. `b91ec398fac21f41c831d9fbf4eb50bfba652379`: added global startup error/unhandledrejection diagnostics and timeout text. No screenshot confirming diagnostic displayed.
3. `src/fallback-world.js` `1584e60938fa19e7791ff7bb285d7683920d20e9`: dependency-free canvas/isometric recovery world, avatar/buildings/minimap/movement/travel/repair quest; intentionally **not** the target third-person 3D.
4. `eae04965339a987d13210941e4e117dd8298b6bb`: loads fallback-world.js in root index.
5. `cc179e70873e45394a7760bc4575ae2ae88962d7`: fallback career shortcut/fare adjustment.

**Critical engineering diagnosis to check:** root `index.html` contains `window.__OPPORTUNITY_READY__=true` in its `animate()` routine (confirmed in source), so root readiness should be observable if the render loop starts. However fallback starts after 1.8 seconds whenever readiness is false; slow network/WebGL startup can cause both root and fallback clients to initialize, creating two canvases and conflicting controls/state. The fallback itself writes `window.__OPPORTUNITY_READY__=true`, potentially allowing the existing Playwright readiness test to pass even if the actual 3D client is broken. **The fallback masks 3D failure; it does not fix it.** This is a P0 blocker.

**Additional fallback defects / regressions to check:**
- The fallback creates `#gameCanvas` with same ID as root Three.js canvas; duplicate IDs possible.
- Fallback uses a separate citizen save key `opportunity-fallback-v1`, **not** the root citizen `opportunity-v2`; progress and balances can diverge. Its quest state is also separate from `opportunity-quest-world-v1`.
- Fallback `draw()` calls `stats()` and `save()` every animation frame, continuously writing localStorage, causing performance/storage issues.
- Fallback rendering uses isometric-like 2D projection; no collision, no real 3D, and the simplified Career Development panel is not the required 3-pathway counsellor.
- Fallback reward increments credits directly rather than calling `src/economy.js`; no idempotent ledger, and no energy/material accounting. This is prototype-only and should not be considered economy parity.
- Fallback has no server authority and is not evidence of multiplayer.
- Root and fallback scripts share global UI DOM and event handlers; last writer wins. A root that starts after fallback can overwrite handlers unpredictably.
- Root Three.js CDN is still an external dependency; no local vendoring or robust engine boot isolation.
- An unverified runtime error, blocked CDN, WebGL failure, or missing import could explain the original blank screen; **do not claim root cause identified** without console/network/browser evidence.

## 3. Deployment audit
**Render static service:** `srv-db9kbimq1p3s738j3ti0` (`opportunity-mmorpg-alpha`)  
**Public URL:** https://opportunity-mmorpg-alpha.onrender.com  
**Build:** `mkdir -p public && cp index.html public/index.html && cp -r src public/src`; publish `public`.
**Latest deployment:** `dep-db9omiu90tus73c5ncug`, commit `cc179e70873e45394a7760bc4575ae2ae88962d7`, Render **status LIVE**, finished `2026-10-17T14:51:17Z`.
**What this proves:** Render built and published files for that commit.
**What it does NOT prove:** the client starts, the Three.js scene renders, fallback runs, quest works, or browser tests pass.
**Pages:** GitHub Pages 404 demonstrated by user; do not use as delivery path until separately verified.

## 4. Current implementation status
| Area | Current evidence | Status |
|---|---|---|
| Claude BUILD-001 Civic Slate client | committed byte-for-byte | COMMITTED, browser UNVERIFIED |
| Root 3D three-domain prototype | code in `index.html`; user screenshots show blank world | BROKEN IN USER'S OBSERVATION |
| Isometric recovery fallback | source committed, Render live commit | DEPLOYED, browser UNVERIFIED |
| Quest 001 state machine | source committed | IMPLEMENTED, tests UNVERIFIED |
| Standalone quest page | `src/quest-001.html`, Render published path | DEPLOYED, browser UNVERIFIED |
| Quest at Residential repair shop | root code committed | IMPLEMENTED, 3D gameplay UNVERIFIED |
| Quest quality/competence/reward | local state, shortcut study, provisional 90 cr | PROTOTYPE, NOT AUTHORITATIVE |
| Three-month starting buffer | spec + calculator + tests | SPECIFIED/CODED, NOT GAME-INTEGRATED |
| Four graduate origins (D2) | not delivered | NOT BUILT |
| Full shoe-repair vertical design (D3) | gameplay quest draft only; not full material/condition schema | INCOMPLETE |
| Nine-landmark three-domain mapping (D4) | not delivered | NOT BUILT |
| Employment/CitizenMail/contracts (D5) | not delivered | NOT BUILT |
| Three-path counselling with consent (D6) | not delivered | NOT BUILT |
| Authoritative server, multiplayer, persistent ledger | no proof of implementation | NOT BUILT |
| Browser smoke CI green, screenshots | no verified run/artifact | UNVERIFIED |

## 5. P0 corrective plan for Claude (request, not unilateral canon change)
1. **Reproduce the blank screen on exact deployed commit.** Capture Chrome DevTools console, failed network requests, WebGL status, viewport, actual canvas pixels and `window.__OPPORTUNITY_READY__` values. Check both `src/economy.js` and `src/quests/broken-shoes.js` fetch responses.
2. **Fix root 3D startup first.** Prefer a single reliable engine dependency strategy and one controlled boot state machine. Do not accept the isometric fallback as completion of AT-13.
3. **Prevent fallback/main races.** Only start fallback after an explicit root failure or timeout with cancellation; do not use the same ready marker for fallback and 3D. Avoid duplicate canvas IDs, duplicate event handlers and separate economic save states.
4. **Run Playwright against the deployed URL and local server** with a positive assertion for **3D renderer** rather than merely `#gameCanvas` or shared ready flag. Verify visible avatar/buildings and stats. Save actual screenshots and logs in GitHub Actions.
5. **Test the full Repair Shop quest** through 3D interaction: diagnosis → method → materials → operations → explanation → resolve → payout; reload and retry to check exactly-once behavior; test insufficient energy and multiple client tabs.
6. **Refactor quest payout atomically** with citizen progression and a single local transaction pending server implementation; do not fabricate customer escrow or professional certification.
7. **Reconcile Claude's Civic Slate client with root** before destructive merging; currently they are separate clients with different saves.
8. Once P0 is green, prioritize **gameplay fun and quest progression**, not additional economy prose. Align D2–D6 handoffs with Claude's engineering sequence.

## 6. Questions requiring Claude's engineering direction
- Which client should become the canonical playable client: root Three.js alpha or Claude's Civic Slate slice? **No destructive merge without explicit Rick approval.**
- Should ChatGPT halt new quest feature commits until Claude resolves P0 3D rendering, or prepare isolated testable design/data assets in parallel?
- Which acceptance criteria and interface should the quest engine implement for your next build (item condition, inventory, escrow, assessments, referral)?
- Should the isometric fallback be disabled while investigating the blank screen, or retained as an explicitly labeled degraded mode?
- Can Claude provide a repeatable browser-test harness and an agreed `window.__OPPORTUNITY_3D_READY__` signal distinct from fallback readiness?

## 7. ChatGPT accountability and next assignment
I introduced root-client changes without first obtaining browser proof, linked an unconfigured GitHub Pages route that returned 404, and subsequently layered a fallback that may mask the real 3D failure. These are integration and verification errors. I will not represent source commits or Render LIVE status as working gameplay.

**Requested immediate Claude handoff:** assign ChatGPT a bounded GitHub task (e.g., fix 3D startup test instrumentation and produce a verifiable failing/passing browser test, or complete D2 machine-readable graduate origins while Claude handles root renderer). I will execute the assigned task, commit code/docs, and report exact SHAs, tests and risks back to Claude.

## Evidence links
- [BUILD-001](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/docs/builds/BUILD-001.md)
- [D1 Economy](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/docs/design/ECONOMY_V0_PROPOSAL.md)
- [Three-month survival](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/docs/design/THREE_MONTH_SURVIVAL_RUNWAY.md)
- [Core game and first quest](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/docs/design/GAMEPLAY_CORE_AND_FIRST_QUEST.md)
- [Quest state machine](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/src/quests/broken-shoes.js)
- [Root 3D client](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/index.html)
- [Fallback client](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/src/fallback-world.js)
- [Browser tests](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/tests/browser.spec.js)
