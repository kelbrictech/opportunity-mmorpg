# BUILD-001

**Author:** Claude (Engineering Lead)
**Date:** 2026-10-17
**Base:** `opportunity-mmorpg` `main` at commit `0fe49f2e87843c4f2a1751e4ea2c1b06e74d3b8f` (from the ZIP comment; HEAD not independently checked)
**Approved by Rick:** integration option A (non-destructive) and the structural fixes below

## Files in this build

Commit these byte-for-byte at the repo paths shown. Cite the SHA-256 in the commit message. If a hash differs after upload, something changed in transit.

| Repo path | Action | Bytes | SHA-256 |
|---|---|---:|---|
| `prototypes/civic-slate-slice/index.html` | NEW | 15,080 | `c8155fba35f1cac86f1eb1a423134c6dda186b913582ffd772e384651b465815` |
| `src/economy.js` | REPLACE | 3,765 | `98270b1f0894a16b71325e3eed2a8dadad7ff8cab0bdf8899fece86f10222f9b` |
| `tests/economy.test.js` | REPLACE | 4,279 | `972bf8fbf33f4454f7e126607f2d0e86022d8542024371b716fc1c2650aeaee5` |
| `docs/builds/BUILD-001.md` | NEW | this file | not listed (a file cannot contain its own hash) |

Nothing else changes. `index.html` at the repo root is untouched. The root client and the new slice are separate; they use different localStorage keys (`opportunity-v2` and `opp-phase1`), so they do not collide.

## What changed

### 1. Civic slate slice (NEW, `prototypes/civic-slate-slice/index.html`)
- Single-file Three.js r128 client from cdnjs. Three zones, third-person avatar, collision, district view (V), HUD, minimap, transit with a fare, local save.
- Implements the approved Civic slate palette, Space Grotesk and IBM Plex Sans, and the slim top bar with right-side drawer.
- Travel requires standing at a transit stop. Fares (12 to 20 credits) and the 1,000 starting credits are **provisional** and are inline in this file, not read from `src/economy.js`.
- Byte-identical to the page Claude published earlier (`opportunity-phase1.html`).

### 2. `src/economy.js` (REPLACE, structural only)
- `ACTIONS` is now the single source of truth. `transact` reads every number from it. Before, `ACTIONS` was exported but never used and the numbers were hardcoded separately. **No value changed.**
- Optional idempotency keys via `opts.key`. The same key and action returns the original outcome with no second effect (`replay: true`). The same key with a different action is rejected. A failed action does not consume its key. Keys are 1 to 100 characters. The processed list is capped at `KEY_LIMIT = 200`.
- Calls without a key behave exactly as before. The root client does not pass a key, so its behavior is unchanged.

### 3. `tests/economy.test.js` (REPLACE)
- The original 8 tests are kept as they were, except the import line, which now also imports `ACTIONS` and `KEY_LIMIT`.
- 8 new tests: replay does not pay twice, key reuse across actions, failed action keeps its key free, invalid keys, bounded key list, no-key behavior unchanged, input state not mutated, payouts and costs match the `ACTIONS` table.

## Evidence (claim ladder)

| Claim | Level | Evidence |
|---|---|---|
| Economy module changes | **Unit-tested locally. Not CI-tested** | `node --test tests/*.test.js` run by Claude on a copy of the repo overlaid with these files, Node 22.22.2: 16 tests, 16 pass, 0 fail |
| Civic slate slice | Specified, committed once ChatGPT uploads. **Not browser-tested, not CI-tested** | Only a JavaScript syntax check was run |
| Root client behavior with the new economy module | **Unverified.** Code reading only | The client's one call site is `transact(state,action,opts)` with no key, reading `ok`, `reason`, `state` |
| Playwright browser tests | **Not run** | No Chromium in the build sandbox |
| Deployment | **Not checked** | No network |

## Known gaps and risks

- **AT-05 still fails.** `study` is still one click. This build does not change that, because it needs the shoe-repair assessment spec.
- **AT-06 still fails.** No materials or item condition. Same reason.
- **AT-03 still fails.** `apply` still sets `employed = true` with no screening. Needs the employment spec.
- The slice's fares and credits are not tied to `src/economy.js`. They should be unified after Rick approves the economy v0 table.
- Idempotency here is local to one browser. It does not prevent duplicates across clients. The server ledger (P4) is required for that.
- GitHub Pages uploads the whole repo root, so the slice will be published at `/prototypes/civic-slate-slice/`. It loads Google Fonts and cdnjs, so it needs internet access.

## Acceptance checks to run after upload

1. `npm test` in CI: 16 pass.
2. Open `prototypes/civic-slate-slice/index.html` via Pages or a local server in a real browser. Confirm: no console errors, three zones load, WASD moves, a building blocks movement, transit at a stop deducts the fare once, a trip you cannot afford is refused.
3. Open the root `index.html` and confirm its existing Playwright tests still pass.
4. Attach screenshots of both clients to the commit or Actions run.

## What I need from ChatGPT before the next build

- The shoe-repair spec (lesson, assessment, materials, durability, contract, payout) to fix AT-05 and AT-06.
- The first economy v0 balance table, to replace the provisional numbers in both clients.
- The Founders' District mapping, so the slice's landmark layout can follow it.
