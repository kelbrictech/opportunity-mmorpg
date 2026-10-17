# WO-02 — Browser QA, regression checklist and slice test plan
**Owner:** ChatGPT → Claude | **Date:** 2026-10-17 | **Status:** PARTIAL — static inspection + user screenshot evidence, no independently executed Chrome session
**Canon:** docs/MASTER_BLUEPRINT.md. No gameplay code, workflows or configs changed.

## Created
Evidence-qualified client verdicts, two actionable bug reports, 18-item regression checklist and 14-case slice test plan.

## Assumed
Rick's two earlier screenshots were taken on the deployed root alpha in a desktop browser; exact browser version, console and network logs are unavailable. Root and Civic Slate slice are separate clients. Browser test file currently targets localhost root and cannot establish Civic Slate results.

## Tested / evidence
- **Root verdict:** USER-OBSERVED on desktop: HUD visible but 3D avatar/world and stats missing in two screenshots; **NOT Browser-tested by ChatGPT**. Source inspection confirms the root script loads a remote Three.js global, imports economy and quest modules, and calls `init()`. The newer fallback may mask root failure. Render's `live` status confirms publishing, not gameplay.
- **Civic Slate verdict:** SOURCE-INSPECTED only, **NOT Browser-tested**. Source contains Three.js renderer, camera, WASD movement, collision `hit()`, transit, local save, minimap, and district mode. No screenshot or run proof of functional behavior.
- Existing `tests/browser.spec.js` asserts `#gameCanvas` and `window.__OPPORTUNITY_READY__`, which the fallback also sets. Therefore a green test **would not prove 3D**.
- AT-02 travel/fare: source paths exist, execution unverified. AT-14 accessibility: source includes buttons and keyboard handlers; mobile, focus, screen-reader and touch operation unverified.

## Bugs (v2 format)
### BUG-001 — Root world blank on user desktop
**Severity:** P0 | **Client:** root `index.html`
**Steps:** Open https://opportunity-mmorpg-alpha.onrender.com in desktop browser; observe HUD and scene after load.
**Expected:** Avatar, buildings, scene background, populated credits/energy stats, navigable world.
**Actual:** Two Rick screenshots show dark/empty world, HUD shell and blank stats; no avatar/buildings.
**Evidence:** Rick's two screenshots in conversation; Render deployment alone does not reproduce/fix it.
**Suspected causes (not proven):** external CDN, module load, WebGL, runtime exception, initialization.
**Required diagnostic:** console errors, failed network requests, WebGL status, screenshot, client version SHA.

### BUG-002 — Fallback readiness masks 3D readiness
**Severity:** P1 | **Client:** root/fallback, static source confirmed
**Steps:** Review `index.html`, `src/fallback-world.js`, and `tests/browser.spec.js`. Fail/delay 3D initialization, then wait >1.8s.
**Expected:** Browser QA distinguishes genuine Three.js renderer from degraded 2D fallback.
**Actual:** Fallback creates `#gameCanvas` and sets `window.__OPPORTUNITY_READY__=true`, the same conditions used by root browser test.
**Evidence:** GitHub source paths and current Playwright assertions; **no executed browser reproduction**.
**Risk:** false green CI, duplicate canvas and conflicting input if root eventually initializes.

### BUG-003 — Fallback save-state split
**Severity:** P1 | **Client:** root/fallback, static source confirmed
**Steps:** Inspect save keys in root and fallback; save progression in each client.
**Expected:** One coherent player state and idempotent economy across recovery mode.
**Actual:** Root `opportunity-v2`, fallback `opportunity-fallback-v1`; quests also have distinct keys.
**Evidence:** source code; behavioral data loss unverified until browser test.

## Regression checklist v1 (18 items)
| # | Check | Required evidence |
|---|---|---|
| 01 | Root loads without console/page errors | Console log + screenshot |
| 02 | Root actual WebGL/Three.js canvas renders scene | Screenshot + WebGL context + 3D-only ready flag |
| 03 | Root avatar visible and animates | Before/after screenshots |
| 04 | Root WASD/arrow movement | Position before/after |
| 05 | Root camera pointer drag and zoom | Screenshots |
| 06 | Root building interaction prompt | Screenshot + keyboard interaction |
| 07 | Root travel to Big City and back | Zone and credit delta |
| 08 | Root travel to Rural Region | Zone and credit delta |
| 09 | Root travel fare charged once | State before/after, retry |
| 10 | Root career shortcut charges fare | State before/after |
| 11 | Root HUD credits/energy/debt update | DOM capture |
| 12 | Root minimap reflects zone and avatar | Screenshot |
| 13 | Root save/reload preserves state | LocalStorage snapshot + reload |
| 14 | Root repair quest completes and pays once | Quest trace + reload/retry |
| 15 | Slice loads Three.js world and minimap | Screenshot + console |
| 16 | Slice collision blocks building penetration | Position trace |
| 17 | Slice transit/district camera and save/reload | Trace + screenshots |
| 18 | Both clients keyboard-only and phone viewport | Focus trace, 390×844 screenshots, touch controls |

## Civic Slate test plan v1 (14 cases)
| ID | Scenario / steps | Expected | Evidence |
|---|---|---|---|
| AT-14-S01 | Desktop 1440×900 load | 3D scene, avatar, HUD, no errors | Screenshot + console |
| AT-14-S02 | Phone 390×844 load | HUD and viewport usable without clipping | Screenshot + layout metrics |
| AT-14-S03 | Keyboard-only Tab/Enter | All actionable controls reachable/operable | Focus order video/trace |
| AT-02-S04 | WASD move forward/back | Avatar position changes | Coordinates + trace |
| AT-02-S05 | Arrow keys movement | Avatar position changes | Coordinates + trace |
| AT-02-S06 | Sprint with Shift | Increased speed without clipping | Coordinates/time |
| AT-02-S07 | Walk into solid building | Collision prevents penetration | Position trace |
| AT-02-S08 | Approach landmark | Interaction prompt appears | Screenshot |
| AT-02-S09 | Open transit at stop | Map/travel UI appears | Screenshot + DOM |
| AT-07-S10 | Take paid cross-domain transit | Exact one fare, correct zone | Balance delta + retry |
| AT-02-S11 | Toggle district view | Camera transitions, world remains responsive | Before/after screenshot |
| AT-12-S12 | Save and reload | Zone, location, credits persist | Storage + reload trace |
| AT-14-S13 | Increase text size/zoom 200% | Controls and text remain readable | Screenshot + overflow metrics |
| AT-14-S14 | Reduced motion + keyboard-only interaction | No inaccessible timing-only requirement | Emulated setting + focus trace |

## Assessed acceptance criteria
1. Every bug includes steps/expected/actual/evidence — **MET for screenshot-supported BUG-001 and static-code evidence BUG-002/003**; runtime reproduction not claimed.
2. One-line verdict for each client — **MET**, explicitly SOURCE-INSPECTED or USER-OBSERVED, not Browser-tested.
3. If browser unavailable, use user screenshots and do not claim Browser-tested — **MET**.
4. Every test-plan row includes AT ID and evidence requirement — **MET**.
5. Actual desktop/phone/keyboard execution — **NOT MET**, browser not available in current connector session.

## Unverified
Actual client startup after last Render deploy; console/network errors; phone rendering; keyboard-only behavior; collision and fare correctness; browser automation run status.

## Known risks
A fallback may make smoke tests pass while 3D remains broken; localStorage divergence; lack of browser proof; no authenticated multiplayer persistence.

## Next action requested of Claude
Run BUILD-004 Playwright suite against both clients with true 3D readiness and screenshot artifacts. Return console/network evidence for BUG-001; prioritize the P0 before feature integration. ChatGPT will proceed to S0 three-image style test and await Claude's review and Rick's approval.
