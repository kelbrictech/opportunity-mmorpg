# OPPORTUNITY — CHATGPT → CLAUDE COLLABORATION HANDOFF

**Document:** OPP-HANDOFF-001  
**Version:** 1.0 — 2026-10-17  
**Status:** Coordination reference, **not** a change to canonical game design  
**Audience:** Claude (Engineering Lead), ChatGPT (Design Lead), Rick (Foreman / decision-maker)  
**Repository:** https://github.com/kelbrictech/opportunity-mmorpg  
**Canonical specification:** [`docs/MASTER_BLUEPRINT.md`](https://github.com/kelbrictech/opportunity-mmorpg/blob/main/docs/MASTER_BLUEPRINT.md) (OPP-MASTER-001 v1.0)  
**Incoming evidence:** Foreman will supply a ZIP snapshot of current GitHub files. **NOT YET REVIEWED.**

> **Foreman's governing rule: “Not in GitHub, not true.”** Every build claim must have a file/commit reference; functionality needs tests or recorded running evidence. This handoff itself is documentation, not proof that a feature is operational.

## 1. Read-first protocol

Claude, please read the **entire** master blueprint before planning or changing implementation. Also read this handoff, the repository's current README, CI workflows, source, tests, and the ZIP the Foreman is about to provide. Do **not** use this handoff to override the blueprint. The uploaded `OPPORTUNITY_DESIGN_BRIEF.md` establishes our division of labor and status vocabulary. Where the ZIP, GitHub HEAD, and older briefs disagree, report differences with file paths and commit IDs; **do not silently merge divergent versions**.

**Source precedence:** (1) explicit Foreman approval of LOCKED decisions; (2) approved canonical blueprint; (3) GitHub source and tests for implementation facts; (4) dated handoffs and status snapshots for context; (5) assumptions labeled DEFAULT or FUTURE. GitHub HEAD is the evidence of code, **not** authority to change game canon.

## 2. Project in one paragraph

Opportunity is a persistent, third-person 3D economic life-simulation MMORPG. Every citizen begins as a fresh graduate with a distinct educational and financial starting position, then pursues livelihood through jobs, real-world-informed learning, freelance work, entrepreneurship, investing, social relationships, and evolving civic participation. The central promise is **“A degree determines where the story begins, not where it ends.”** The game must offer meaningful economic choices and recovery from setbacks, not compulsory wealth accumulation or permanent poverty traps. Three interconnected domains—Residential Area, Big City, and Rural Region—form one shared economy. Gameplay art already shown to the Foreman is a **visual implementation commitment**, not a substitute for screenshots of running software.

## 3. Roles and decision rights

| Participant | Responsibility | Must not do |
|---|---|---|
| **Rick — Foreman** | Prioritize, approve canon and LOCKED changes, accept or reject deliverables, arbitrate disputes | Be presented with unverified claims as accomplished work |
| **ChatGPT — Design Lead** | Systems design, graduate origins, economic balance proposals, narrative/lore, UX flows, learning content, acceptance criteria, design QA | Silently change the blueprint; mark proposals LOCKED; present untested design as verified |
| **Claude — Engineering Lead** | Implementation, architecture, tests, CI, performance, deployment, evidence, technical feasibility feedback | Quietly redefine gameplay; substitute placeholders for committed visual targets without declaring the gap |

Neither AI can see the other's full private context. Every handoff must stand alone. Rick is the final authority. This is a **division of primary responsibility**, not a claim about what either model is intrinsically better at.

## 4. Status and evidence vocabulary

- **LOCKED:** Foreman-approved canonical requirement.
- **DEFAULT:** provisional design recommendation awaiting approval and/or tuning.
- **FUTURE:** envisioned but outside the current build scope.
- **IMPLEMENTED:** code exists in the repository, but may not have passed tests.
- **VERIFIED:** test/run evidence supports the specific claim.
- **NOT BUILT:** no completed implementation established.

**Claim ladder:** `Specified → Committed → CI-tested → Deployed → Browser-tested → Gameplay-verified`. A deployed static site does **not** imply browser or gameplay verification. Cite the exact commit SHA, GitHub Actions run/artifact, deployment tied to commit, and reproduction steps for the applicable claim. Avoid vague percentages or unsupported “done.”

## 5. Canonical game commitments (condensed; blueprint controls details)

1. **No pay-to-win.** Virtual game currency only unless the Foreman explicitly authorizes a reviewed change. No real-money withdrawals, cash investing, or player-to-player real-money exchange in MVP.
2. **Fresh-graduate origins:** degree, institution, financing, debt, savings, housing, local context and optional personality preferences shape initial obligations and opportunities, **never career ceilings**. Expensive private-college Fine Arts + larger student loan is a required illustrative case. **AT-01**.
3. **MBTI-style preferences:** optional narrative/career exploration flavor; no hiring eligibility restrictions or deterministic bonuses.
4. **Three domains:** Residential Area, Big City, Rural Region share citizen state, economy and transit. Original **Founders' District 3×3** landmark layout must be explicitly mapped, not discarded. **AT-02**.
5. **Visual direction:** contemporary detailed colorful 3D; human-scale third-person avatar, ambient activity, district-management view, readable contextual menus, minimap, town/city/rural identities. Selected **Civic slate** HUD palette: `#101826`, `#1B2A3F`, `#3DA5FF`, `#3DD6A5`, `#EAF0F7`; **Space Grotesk** headings and **IBM Plex Sans** body; slim top bar and right-side panel drawer (per design brief). Visual parity requires **real engine screenshots**, a feature-by-feature gap list and corresponding commits. **AT-13**.
6. **Real-world learning:** Discover → Learn → Practice → Demonstrate → Monetize → Reinvest. Watching content alone never awards full competence; in-game skills are **not professional accreditation**. First vertical slice: shoe repair. **AT-05, AT-06**.
7. **Careers:** actual job discovery, résumés/portfolios, applications via **CitizenMail**, screening, interviews, employment contracts and earned wages. **AT-03**.
8. **Town Hall Career Development Office:** free NPC counselling, with **three explainable career pathways** and revisable action plan; sensitive data accessed only with permission. **AT-04**.
9. **Personal life:** transport/time/fare, housing, fatigue, stress, healthcare, possessions/durability, emergencies, savings, loans, insurance, and recovery. Avoid irreversible dead ends and exploitative pressure.
10. **Economy:** validated transactions, bounded NPC supply/demand, inventories, recipes, production, payroll, contracts, debt, and auditable accounts. Initial proof: **wheat → flour → bakery → consumer** across domains. Never let client inputs directly mint credits. **AT-08–AT-10**.
11. **Civic Model B:** evolving civic participation, beginning with free public services and project proposals/contributions; later community planning and representation. Contributions cannot purchase disproportionate political rights. **AT-11**.
12. **FUTURE:** aging, family/inheritance, elections/player-controlled taxes and real-world professional accreditation. Do not accidentally introduce these in MVP.

## 6. Current implementation evidence and discrepancy warning

**Earlier ChatGPT-authored repository history (not independently reconciled against the incoming ZIP):**

- Initial `index.html` Three.js prototype commit: `9b05567e1e50338a15f406a2b830036fff9a4456`.
- Deterministic local economy module `src/economy.js`, tests and CI were subsequently committed; UI refactored to call local `transact(...)`. This is **not** a server-authoritative ledger.
- Browser smoke test and GitHub Pages workflow were committed; test **success was not established** in the conversation.
- Render static site was provisioned from GitHub commit `59d1d28c753ff5d41db5ae9a93443e3e2c0ad5dd` at `https://opportunity-mmorpg-alpha.onrender.com`. Render returned `status: live` for that deployment, but **no independent browser interaction test was established**.
- `render.yaml` was committed in `0fe49f2e87843c4f2a1751e4ea2c1b06e74d3b8f` to record intended static deployment settings.

**The design brief supplied by the Foreman contains a DIFFERENT dated implementation snapshot:** It describes a Claude-authored single-file Three.js Phase 1 slice with three domains, avatar, collision, HUD, minimap and transit; it explicitly states only a JS syntax check was run, and jobs/learning/civic panels are NOT BUILT. This conflicts with descriptions of the earlier ChatGPT prototype, which includes simplistic local demo actions for jobs, study and civic contributions. **Do not declare either branch or snapshot definitive before inspecting the ZIP and GitHub HEAD.** A placeholder panel or local demo button is not equivalent to the full canonical system.

**Reconciliation task for Claude (first action):**
1. Record ZIP filename/hash, GitHub HEAD SHA, branch, directory tree and relevant file hashes.
2. Identify whether ZIP matches GitHub HEAD, a branch, or an uncommitted export.
3. Diff `index.html`, `src/economy.js`, tests, workflows, docs, deployment config and any other client entrypoints.
4. Report conflicts, overwritten features, regressions, duplicate clients and stale documentation.
5. Run available tests and browser smoke checks; link CI results and actual screenshots.
6. Present a recommended integration plan for Rick's approval before destructive changes.

**Never assume the incoming ZIP has been inspected until an inspection report exists.**

## 7. Engineering priorities (subject to Foreman's approval)

**P0 — Reconcile and prove the build:** determine canonical source, run the game in a real browser, validate three zones, controls, transit, HUD, save behavior, check JS errors, capture GitHub-linked screenshots, establish green CI. If Render remains live, verify the exact deployed commit and whether the deployed UI matches source.

**P1 — Visual world baseline:** build distinctive, navigable residential/city/rural scenes with collisions, useful landmarks, camera modes and proper UI. Compare screenshots to the committed reference. Placeholder boxes are allowed during development but must be reported as incomplete visual parity.

**P2 — Graduate origin and employment:** origin editor, finances, loan obligations, job discovery/application, CitizenMail, contract, verified payroll and free career counselling. Design Lead supplies approved origins and counselling rules before balancing is hardcoded.

**P3 — Learn-to-earn vertical slice:** curated shoe-repair instruction, actual assessment, materials and inventory, work contract, condition change, one-time payout and audit. Design Lead supplies approved learning and contract spec.

**P4 — Multiplayer economy:** Render authoritative backend, Neon Postgres migrations, idempotent balanced ledger, two concurrent clients, wheat/flour/bread chain, recovery and anti-exploit tests. Cloudinary assets and Cloudflare delivery can be integrated when their capabilities are validated. **Do not place database credentials or API secrets in GitHub.**

**P5 — Civic, performance and alpha QA:** contributions, public project progress, accessibility, mobile/browser performance, screenshot parity, release evidence.

## 8. Design Lead's next work queue

Each deliverable uses the required schema below and starts as **DEFAULT** or **FUTURE**, never self-approved LOCKED:

1. **Founders' District mapping** (§3.1): map Graduation Center, Housing Block, Employment Office, Retail Stores, Civic Square, Bakery Shop, Park, Logistics Depot and Flour Mill into three domains without losing original spatial intent.
2. **Graduate origins** (§2.1, AT-01): diverse starting archetypes with financing, obligations, housing, access and unrestricted career paths.
3. **First economy v0 balance table** (§4, §7): wages, rent, food, transport, loan terms, bread recipe, NPC floors/ceilings, faucet/sink register. Resolve **1,000 vs 1,240 starting credits** as a proposal, not a unilateral canon change.
4. **Career Development Office counselling** (§5.3, AT-04): consent-based inputs, three explainable pathways, action plan, fallback for sparse market data.
5. **Shoe repair** (§6, AT-05/06): source-aware lesson, assessment, materials, durability, contract, payment, reputation, accessibility.
6. **Opportunity Discovery Engine** (§6.4): observable signals, cost/risk explanation, non-guaranteed outcomes.
7. **Civic ladder** (§8, AT-11): projects, funding, anti-abuse and protected baseline services.
8. **Lore and narrative** (§1–3): grounded and optional; no covert mechanical changes.

## 9. Mandatory handoff template for every design deliverable

```markdown
### [Title]
Blueprint section affected: §x.y
Status of each rule: LOCKED / DEFAULT / FUTURE
Type: NEW SPEC | CHANGE PROPOSAL | BALANCE TABLE | LORE | CONTENT

**Created:** What the deliverable contains.
**Assumed:** Assumptions not explicitly stated in the blueprint.
**Tested / evidence:** Source, playtest or “none”.
**Unverified:** Remaining guesses.
**Known risks:** Exploits, balance risks, scope creep, accessibility.
**Acceptance test:** Existing AT-xx or proposed new test.
```

For implementation-ready specifications include formulas and units, **provisional** labels on all unsourced numbers, edge cases (insufficient funds, duplicate requests, disconnects, concurrent users), currency/item faucet/sink classification, and data model implications for blueprint §10.5.

## 10. Technical and governance guardrails

- Architecture decisions should follow gameplay ontology and governance rules, not precede them. A technical impossibility or contradiction is escalated to Rick with options.
- Client sends **intent**; authoritative backend validates, applies idempotency keys and records balanced transfers. No localStorage currency once multiplayer is enabled.
- Keep virtual economy and real financial services separate. Simulated investments may lose money; no guaranteed returns.
- Never make player services depend on a crowded server. NPCs provide bounded baseline supply/demand and essential civic access.
- Avoid pay-to-win, deterministic personality-based career advantages, unbounded offline gains, exploitative emergencies, and forced grinding.
- Accessibility: remappable controls, readable scalable text, non-color status cues, subtitles/transcripts, keyboard support.
- Keep canonical names: **CitizenMail**, **Career Development Office**, **Founders' District**, **Residential Area**, **Big City**, **Rural Region**.
- GitHub stores implementation, design proposals, acceptance tests, screenshots/artifacts and infrastructure-as-code where feasible. Credentials stay in secure service secrets.

## 11. Open questions reserved for Rick

1. Does the uploaded ZIP replace, branch from, or augment the current `main` client? **Resolve by inspection, not assumption.**
2. Confirm the division of work: ChatGPT designs, Claude implements, Rick approves; any exceptions should be explicit.
3. Approve or revise the first Founders' District mapping proposal before implementation.
4. Decide the final starter balance (1,000 vs 1,240), time compression and initial economic rates only after a documented balancing proposal.
5. Confirm the authoritative web client after comparing any competing Three.js implementations and considering a future Godot technical spike.

## 12. First response requested from Claude

Please send Rick a **GitHub-grounded state-of-build report** with: (a) repository HEAD and ZIP comparison; (b) what is actually implemented; (c) what is browser-tested, CI-tested and deployed; (d) discrepancies with this handoff/blueprint; (e) blockers and risks; (f) next engineering task and its acceptance test. Do not infer completion from UI labels or earlier chat claims. If the ZIP is not yet available, say so and begin with GitHub HEAD only.

---
**End of handoff.** This file is a coordination artifact, not an approval to change `MASTER_BLUEPRINT.md` or proof that the game has passed tests.