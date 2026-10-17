# OPPORTUNITY — MASTER GAME & TECHNICAL BLUEPRINT
**Document ID:** OPP-MASTER-001  
**Version:** 1.0  
**Date:** 2026-10-17  
**Status:** Authoritative project specification; implementation status is tracked separately  
**Repository:** https://github.com/kelbrictech/opportunity-mmorpg

> **Prime directive:** Opportunity is a persistent, multiplayer, 3D economic life-simulation MMORPG in which players discover and test alternative ways of earning a living, learn genuine transferable knowledge, and shape a living civilization. **A degree determines where the story begins, not where it ends.**

## 0. Source of truth and change control

This file is the canonical design reference. Code and releases must cite a blueprint section and corresponding acceptance test. When implementation conflicts with this blueprint, record the discrepancy, resolve it deliberately, and update this document in the same PR. Do not silently reinterpret approved decisions.

**Requirement status vocabulary**
- **LOCKED:** user-approved core design or explicit commitment.
- **DEFAULT:** proposed starting rule, subject to testing and user approval.
- **FUTURE:** envisioned, not part of first vertical slice.
- **IMPLEMENTED:** verified source code exists; not synonymous with a tested or deployed feature.
- **VERIFIED:** executed/tested with evidence.
- **NOT BUILT:** no completed implementation.

**Non-negotiable visual integrity rule — LOCKED:** If gameplay imagery is shown as the proposed game, its depicted layout, visual language, assets, UI, and interactions become an implementation target. Never label a generated image as a screenshot, never imply placeholder geometry meets a high-fidelity reference, and never silently substitute a visually inferior target. Maintain visual parity checks and report gaps honestly.

## 1. Product identity

**Working title:** Opportunity  
**Genre:** Persistent economic MMORPG / third-person life simulation / entrepreneurship and civilization sandbox.  
**Player fantasy:** Start as a graduate with a real financial situation; build a livelihood through employment, skills, freelance services, enterprise, investments, social relationships, and civic action.  
**Learning model — LOCKED:** Real-world learning integrated into gameplay. In-game practice and assessment must require comprehension, not mere video viewing. Simulated success must never be misrepresented as real professional accreditation.  
**Core loop:** Discover → Learn → Practice → Demonstrate → Earn → Reinvest → Adapt.  
**Secondary loop:** Live → Travel → Work → Spend → Maintain → Socialize → Recover.  
**Civic loop:** Observe local need → Propose → Discuss → Contribute → Implement → Evaluate.

**Design principles**
1. Meaningful opportunity and agency; no single winning profession or required career ladder.
2. Unequal starting conditions but recoverable trajectories and fair access to gameplay.
3. Skills, demand, capital, location, time, health, and relationships influence outcomes.
4. Economic transactions have real sources and sinks, inventory constraints, and consequences.
5. Institutions/NPCs support low-population servers; player decisions can change the world.
6. No pay-to-win; monetization cannot sell economic advantage.
7. Life realism generates choices, not punitive chores or unhealthy compulsion.
8. Educational content is accurate, sourced, accessible, and safely moderated.
9. All gameplay screenshots, deployments, and verification claims require evidence.
10. Respect player privacy and ensure accessibility and moderation.

## 2. Player origin, identity and progression

### 2.1 Starting profile — LOCKED
Every new citizen begins as a fresh graduate, with:
- Degree / specialization and initial knowledge.
- Institution background (public, private, prestigious, etc.).
- Education financing: scholarship, family assistance, savings, student loans, work-study, mixed funding.
- Starting housing, savings, debt, living costs, social access, and local context.
- Optional self-selected MBTI-style preference profile.
- Personal goals and preferred career directions.
- Initial location among the three domains (subject to origin narrative).

**Example:** Fine Arts + expensive private/prestigious college + larger student loan. This changes obligations and access, **not** intrinsic ability or guaranteed outcomes. All degree/college numbers shown in earlier UI are **provisional balance values**, not locked game constants.

**Initial starter credit example:** 1,000 credits, provisional. Existing alpha uses 1,240; discrepancy must be reconciled in balancing.

### 2.2 Personality — LOCKED policy
MBTI dimensions may tailor dialogue, career exploration, communication preferences and narrative flavor. They are **not** validated predictors of occupational competence; no personality type is barred from any job or receives deterministic hiring bonuses. Employers evaluate observable requirements and demonstrated competence. Allow editing/declining personality selection.

### 2.3 Progression
Flexible arcs: Fresh Graduate → Young Professional → Independent Citizen → Economic Participant → Civilization Builder. These are descriptive, not mandatory ranks. Track separately:
- Professional mastery: knowledge, practice, experience, credentials.
- Economic development: income, assets, liabilities, liquidity, risk.
- Social reputation: verified reliability, relationships, contribution.
- Civic participation: constructive community activity and governance eligibility.

### 2.4 Life stages
Aging, retirement, inheritance, dependents, and family systems are **FUTURE / undecided**; do not imply approval or ship irreversible aging mechanics.

## 3. World, geography and visual direction

### 3.1 Three domains — LOCKED
All share one persistent citizen profile, inventory, ledger, companies, skill history, and social graph.

| Domain | Initial footprint (DEFAULT) | Economic identity | Required landmarks |
|---|---:|---|---|
| Residential Area | 300 × 300 m | Living, neighborhood services, household costs, home businesses | Apartments, bakery, repair shop, clinic, store, park, transit |
| Big City | 400 × 400 m | Employment, finance, government, higher education, commerce | Town Hall, free Career Development Office, employment center, university, bank, offices, transit |
| Rural Region | 400 × 400 m | Agriculture, primary production, processing, logistics | Farm, mill, rural market, workshop, warehouse, transit |

**Organic development — recommended DEFAULT, not separately confirmed:** Each region begins with comparative advantages but can evolve through infrastructure, demand, investment, and planning. Land use and zoning may influence development.

**Founders' District original 3×3 schematic (historical layout commitment):**
Graduation Center / Housing Block / Employment Office  
Retail Stores / Civic Square / Bakery Shop  
Park / Logistics Depot / Flour Mill  
Its role within the expanded three-domain geography must be mapped explicitly during level design; do not discard without a documented decision.

### 3.2 Camera and movement — LOCKED
- Physical third-person avatar and traversable 3D spaces.
- Adaptive camera: third-person exploration and elevated district-management view over the same world.
- Enterprise management panels overlay the live world and use the same server data.
- WASD/arrows, mouse orbit, interact key, zone map, contextual interactions.
- Accessible remapping, keyboard focus, legible typography, scalable UI.
- Transit between zones retains player and economic state.

### 3.3 Visual target — LOCKED
The previously presented reference montage is a **target**, not evidence of running gameplay:
- Contemporary, colorful, detailed 3D neighborhoods, modern glass-and-stone city center, productive pastoral rural landscape.
- Human-proportioned third-person citizens, crowds/ambient activity, readable storefronts and landmarks.
- Cohesive dark navy translucent HUD with bright blue actions and compact contextual menus.
- Portrait, energy/hunger/mood, wallet, time, minimap, location labels.
- Full interfaces for citizen profile, job applications, career counselor dialogue, courses/self-study/practice/certifications, civic projects, world map, and transportation.
- Detailed buildings, roads, sidewalks, vegetation, transit vehicles, farms, crops, silos and windmills.
- A playable implementation must reproduce these features incrementally, with visual parity screenshots from the **running engine** at each milestone.

**Asset strategy:** Use legally licensed/owned 3D assets, reproducible procedural layouts, LODs, baked/optimized lighting and texture atlases. Maintain an asset manifest (source, license, target, in-engine proof). Never substitute unimplemented concept images for actual assets.

### 3.4 World economy links
Residential citizens consume goods and supply labor; city employers, institutions and distributors offer work/services; rural producers supply agricultural inputs. Cross-domain logistics have cost, capacity and transit time. Example wheat → flour → bakery → bread → consumer, with transport and wages at every stage.

## 4. Daily life simulation

### 4.1 Time — DEFAULT
Proposed 1 game day = 60 real minutes; time scaling and offline behavior must be playtested. Avoid forcing continuous presence. Travel may be accelerated, but fare, opportunity cost and logistics remain real.

### 4.2 Mobility — LOCKED
Walk, cycle, bus/public transport, ride-hailing, private vehicle. Model fares, travel time, wait/congestion, fuel, parking, repairs and vehicle wear where applicable. Long commutes influence housing and job choices. Travel service businesses can be player-run. The prior commute simulator's distances/fares were illustrative only.

### 4.3 Health and wellbeing — LOCKED
Condition, fatigue, stress, illness/injury, prevention, treatment, recovery, healthcare access. Health impacts ability to work but cannot cause permanently punitive dead ends. Include accommodations and recovery support. No exploitative health mechanics.

### 4.4 Possessions and wear — LOCKED
Clothes, bags, shoes, phones, tools, vehicles and equipment have utility, condition/durability, upkeep, repair, resale value, replacement costs. Wear follows actual use, not arbitrary punishment. Repair creates legitimate service demand. Material/quality/maintenance affect total ownership cost.

### 4.5 Emergencies — LOCKED
Examples: sickness, broken laptop, relocation, unemployment, family obligations. Players choose savings, insurance, repair, borrowing, social support, postponement, and retraining. Emergencies are bounded, communicated and recoverable; provide an accessible safety net.

### 4.6 Social capital — LOCKED
Friendships, mentorship, professional networks, references, collaborations and community groups. Trust grows from consent and repeated constructive behavior, not direct purchase. Contacts and financial/personal data require privacy controls.

## 5. Careers, job search and employment

### 5.1 Labor-market gameplay — LOCKED
Discover vacancies via job boards, employer listings, events, contacts; write résumé/portfolio; apply through **CitizenMail**; receive screening and interview requests; complete assessments; negotiate terms; sign employment contract; perform work; earn wages. NPCs maintain baseline vacancies; player companies can post and fill jobs.

**Job posting schema:** employer, role, responsibilities, competencies, prerequisites, work location, schedule, wage range, benefits, contract terms, applicant status, application deadline. MBTI is never an eligibility gate.

**CitizenMail:** Persistent internal messaging for employers, applicants, institutions and approved contacts. It is not real-world email by default. Moderation, anti-spam, rate limits, blocks and consent apply.

### 5.2 Employment simulation
Actual duties produce or provide services. Bakery worker starts production, performs a task, uses valid inputs and earns wages from employer funds; employers control pricing, procurement, schedules and inventory. Payroll, taxes (when enabled), company expenses and profit/loss are auditable.

### 5.3 Career counselling — LOCKED, FREE
Town Hall's **Career Development Office** provides free NPC service to every citizen; future qualified player advisors may augment it. Services: interests, skills, transferable skills, market vacancies, applications/interviews, retraining, self-employment, debt/education planning, recovery after setbacks. Counsellor may inspect sensitive citizen data **only with permission**. Produce 3 optional, explainable pathways and a saved, revisable action plan. Advice never guarantees outcomes.

## 6. Real-world learning integrated into play — LOCKED

### 6.1 Skill record
Keep separate **knowledge**, **practical competence**, **experience**, and **credentials**. No automatic skill mastery from watching videos. Training pathways: public/private university, vocational school, paid short course, apprenticeship, self-study tutorials, independent experimentation, mentorship.

### 6.2 Educational pipeline
1. Discover opportunity (observed need, labor shortage, counselor, referral, market data).
2. Compare pathways by cost, time, entry requirements, instructional quality and practical value.
3. Consume accurate learning material (curated original or legally linked external).
4. Complete knowledge checks and practical tasks with useful feedback.
5. Demonstrate ability via portfolio, assessment or supervised contract.
6. Monetize through employment, freelance contracts, product sales, teaching or enterprise.
7. Reinvest and adapt; allow multiple income streams.

**First skill vertical slice:** Basic shoe repair. Inspect sole/upper, identify material and damage, evaluate feasibility, choose appropriate approach, estimate cost, purchase supplies, complete contract, earn income. The game teaches fundamentals but does not certify real-world trade competency.

### 6.3 Learning content governance
Cite instructional sources, track licenses and versioning, curate external tutorials, check safety and accuracy, moderate submissions, provide transcripts/captions, ensure alternative accessible assessments. Restricted/high-risk real-world professions require appropriate in-game licensing and disclaimers.

### 6.4 Opportunity Discovery Engine
Derive opportunities from actual prices, unmet orders, wait times, regional demand, vacancies, logistics bottlenecks, skills gaps and available capital. Explain *why* an opportunity is suggested and show costs, risks and alternatives. Avoid guaranteeing returns.

## 7. Business, trade and investing

### 7.1 Enterprise creation
Home services, microbusiness, freelancing, shops, farms, manufacturing, logistics, education and professional services. Support solo ownership, partnerships, cooperatives and corporations (**DEFAULT implementation scope**). Company is a distinct legal entity from the character. Track equity, roles, employment, liabilities, assets, licenses and insolvency.

### 7.2 Economic fundamentals — LOCKED
- Items have recipes, inventory, supply, demand, transport, durability and consumption.
- Money is transferred through validated transactions; never created by a client-side button.
- Purchases move currency from buyer to seller and inventory from seller to buyer.
- Production consumes inputs, capacity, time and energy; outputs follow recipe and yield.
- Wages debit employers and credit employees; loans create obligations and schedules.
- NPC consumers and suppliers provide bounded market liquidity at low player population.
- Inflation, hoarding, monopolies, arbitrage and exploits require monitoring and balancing.

**First production chain:** wheat → flour mill → bakery → retailer/consumer. Example recipe 2 flour + 1 energy → 4 bread is **DEFAULT/provisional**.

### 7.3 Investments
Savings, bonds, equity, funds, property, equipment leasing, business ownership. Simulate risk, liquidity, diversification, volatility, compounding and possible loss. Returns must originate from modeled economic activity or explicitly accounted sources. Prevent insider abuse, self-dealing, wash trades, price manipulation and guaranteed-return promises.

### 7.4 Money boundary
**Undecided:** purely virtual currency vs virtual economy with external career/learning links vs real-money marketplace. **Recommended DEFAULT:** virtual game currency with optional curated external educational/career links. **No real-money withdrawal, cash investment or player-to-player real-money exchange** until explicitly approved and legal/safety review completed.

## 8. Civic participation and government — LOCKED: Model B

**Evolving civic participation** is an approved game rule:
- Stage 1: ordinary citizens can access free public services, observe issues, discuss and contribute to projects.
- Stage 2: communities can organize, petition, prioritize and co-fund public works.
- Stage 3: civic representation and policy influence unlock as systems mature.
- Stage 4 (**FUTURE**): elections, municipal budgets, taxation, zoning, regulation and institutional leadership with safeguards.

**First prototype civic feature:** Town Hall displays proposals (e.g. bus route, community garden, skills training center), public progress, optional contributions and measurable outcomes. NPC baseline service provision must not be held hostage by a low population. Contribution must never buy disproportionate political rights.

**Governance safeguards:** anti-bribery/abuse, transparent spending, civic audits, protected basic services, moderation, recall/term limits if elections are introduced, griefing prevention.

## 9. User experience and UI screens

1. Welcome and graduate creation (degree, institution, financing, goals, optional personality).
2. 3D world + HUD (energy, hunger/mood when implemented, wallet, minimap, time, interactions).
3. Profile (skills, debts, finances, possessions, relationships, career, civic record).
4. CitizenMail (compose, inbox, attachments/portfolio, application tracking).
5. Employment board (search, role detail, apply, interview, offers, contracts).
6. Town Hall counselor (private dialogue, assessment, three pathway recommendations, saved plan).
7. Learning marketplace (free/paid courses, video/tutorial, practical tests, credentials).
8. Contract board (requests, quotes, execution, ratings, dispute handling).
9. Business management (stock, production, pricing, wages, jobs, accounting).
10. World map and transit (zones, routes, fares, travel time, schedule).
11. Civic projects (proposals, contribution ledger, progress, outcome).
12. Investment dashboard (portfolio, ownership, performance, risks).
13. Settings (accessibility, privacy, moderation, controls, graphics).

All panels must be driven by authoritative state once multiplayer backend exists; do not fake persistence or successful server actions.

## 10. Technical architecture

### 10.1 Target architecture — DEFAULT pending technical spike
- **Client:** Godot 4 3D (web + desktop) or a validated equivalent browser 3D client. Existing prototype is Three.js; **do not claim a Godot migration is done**.
- **Realtime:** Node.js/TypeScript authoritative world service; Colyseus/WebSocket is a candidate, browser constraints must be tested.
- **Economy services:** TypeScript domain modules, deterministic transaction validation.
- **Database:** PostgreSQL for durable player/company/ledger/contract/skill/civic state.
- **Cache/event transport:** Redis as needed, not a source of truth.
- **Assets:** glTF 2.0 3D models, compressed textures and animation assets.
- **Delivery:** GitHub, CI, staging web deployment, release build and observability.
- **Authentication:** optional guest alpha with migration path; production identity and security required before public access.

### 10.2 Service boundaries
Identity & Profiles; World/Zone Presence; Transport; Inventory & Items; Employment & CitizenMail; Skills/Learning/Assessments; Opportunity Matching; Companies & Production; Ledger/Loans/Investments; Life/Health; Civic Institutions; NPC Economy; Moderation/Admin; Analytics.

### 10.3 Authoritative transactions
Clients submit **intent**, not balance updates. Server validates identity, location, permission, preconditions, inventory, capacity, funds, time and cooldowns. Write double-entry or balanced ledger postings and inventory changes atomically. Use idempotency keys for retries; audit all mutations; reject negative funds unless an approved credit facility exists.

**Illustrative sequence:** Player requests repair contract → server checks skills and materials → reserves order → validates activity completion → debits customer/credits provider → consumes materials → updates durability and reputation → commits event.

### 10.4 Persistence and anti-cheat
Server-authoritative economy and contracts, movement bounds, rate limits, input validation, replay-safe commands, transaction logging, backups, migrations and reconciliation. Browser localStorage is allowed **only for isolated prototype demos**, not multiplayer currency.

### 10.5 Data model (minimum)
`Citizen(id, origin_id, location_id, balance_account_id, health_state, created_at)`  
`GraduateOrigin(id, degree, institution_type, financing_plan, loan_id, optional_preferences)`  
`SkillRecord(citizen_id, skill_id, knowledge, competence, experience, credential_refs)`  
`Course(id, provider_id, price, content_refs, assessment_id, license_info)`  
`JobPosting(id, company_id, requirements, wage, location_id, status)`  
`Application(id, posting_id, citizen_id, portfolio_ref, status, events)`  
`MessageThread(id, participants, permissions, messages)`  
`EmploymentContract(id, citizen_id, company_id, wage, schedule, terms)`  
`Company(id, entity_type, owners, licenses, assets, liabilities)`  
`InventoryItem(id, owner_id, item_type, quantity, condition, location)`  
`ProductionJob(id, company_id, recipe_id, inputs, outputs, status)`  
`Account(id, owner_type, owner_id, currency)`  
`LedgerEntry(id, transaction_id, account_id, debit, credit, timestamp)`  
`Loan(id, borrower_id, lender_id, principal, rate, schedule, status)`  
`TransportTrip(id, traveler_id, route_id, fare, duration, status)`  
`Opportunity(id, region_id, demand_signal, prerequisites, expiry)`  
`CivicProposal(id, jurisdiction_id, budget, contributions, stage, outcome)`  
`ReputationEvent(id, subject_id, source_event_id, effect)`  
`AuditEvent(id, actor, action, target, timestamp, metadata)`

Store sensitive personal preferences separately with least-privilege access.

### 10.6 API sketches
`POST /citizens`, `GET /world/zones`, `POST /transport/trips`, `GET /jobs`, `POST /jobs/:id/applications`, `POST /messages`, `GET /learning/courses`, `POST /assessments/:id/submissions`, `GET /opportunities`, `POST /contracts/:id/accept`, `POST /production/jobs`, `POST /civic/proposals/:id/contributions`, `GET /accounts/:id/statement`. All mutation endpoints require authentication, authorization, idempotency and server validation.

## 11. Multiplayer and world simulation

**Initial target — DEFAULT:** 2–10 players for first economic transaction test, scaling to 10–20 concurrent players per prototype instance. Zone presence synchronizes avatars, animations, position, relevant interactions, and nearby activities. Economic ticks occur at lower frequency than movement updates. Offline automation is bounded and funded; no unlimited passive earnings. NPC jobs, supply, demand and public services bridge low population.

**First cross-domain proof:** Rural player grows/sells wheat → mill produces flour → city bakery buys flour → residential worker commutes, works, earns wages → consumer buys bread → ledger and inventories reconcile for all parties.

## 12. Prototype scope, milestones and evidence

### Phase 0 — Repository and baseline
- [x] Repository `kelbrictech/opportunity-mmorpg` exists.
- [x] `index.html` Three.js browser prototype committed (2026-10-17, commit `9b05567e1e50338a15f406a2b830036fff9a4456`).
- [ ] Browser execution and visual screenshot independently verified.
- [ ] Hosted preview URL deployed and verified.
- [ ] Automated tests and CI.

### Phase 1 — Real playable 3D world
- [ ] Three navigable zones with distinct architectural/landscape language.
- [ ] Third-person avatar and collision-aware controls.
- [ ] Adaptive district camera, map, transit and contextual building interaction.
- [ ] Save/reload zone and character.
- [ ] In-engine screenshots compared against committed visual reference.

### Phase 2 — Graduate and career loop
- [ ] Character origins with degree/institution/loan choices.
- [ ] Jobs board, CitizenMail, application, screening, contract, wages.
- [ ] Free Town Hall counselling and saved action plan.
- [ ] Housing, travel, energy and expenses.

### Phase 3 — Learn and earn independently
- [ ] Curated shoe-repair lesson and accessible assessment.
- [ ] Skill/knowledge/practice record.
- [ ] Repair contract with materials, time, durability, payout and reputation.
- [ ] Opportunity recommendations grounded in demand.

### Phase 4 — Economic multiplayer
- [ ] Authoritative server, durable DB, two or more concurrent citizens.
- [ ] Company, inventory, production, contracts, payroll, ledger.
- [ ] Cross-domain farm → mill → bakery → consumer flow.
- [ ] Concurrency/idempotency tests and anti-exploit validation.

### Phase 5 — Civic and fidelity expansion
- [ ] Town Hall proposals, contributions and public works outcomes.
- [ ] Visual assets matching target reference, optimization and accessibility.
- [ ] Observability, security, moderation, staging release and load tests.

### Required acceptance tests
**AT-01:** New graduate origin changes financing/debt without hard-blocking careers.  
**AT-02:** Player traverses each domain and maintains state across transit.  
**AT-03:** Employment application leads to verified wage transfer only after eligible work.  
**AT-04:** Free Town Hall counselor recommends three explainable pathways.  
**AT-05:** Tutorial viewing alone does not award full practical competence.  
**AT-06:** Repair contract requires learning/materials, alters item condition and pays exactly once.  
**AT-07:** Transport deducts fare exactly once; insufficient funds handled consistently.  
**AT-08:** Bread production consumes correct inventory and creates bounded output.  
**AT-09:** Two players see consistent shared inventory, employment and balances.  
**AT-10:** Failed/duplicate transaction cannot mint money or duplicate items.  
**AT-11:** Civic contributions debit wallet and credit project fund with auditable progress.  
**AT-12:** Reload/reconnect preserves authoritative state.  
**AT-13:** UI/world screenshot parity report compares each major committed reference feature.  
**AT-14:** Mobile/browser performance and keyboard accessibility meet documented targets.

## 13. Visual parity and proof-of-work protocol

Every visual milestone must include:
1. **Reference feature** (e.g., city plaza, bakery facade, rural crop fields, character HUD).
2. **Implemented asset/scene path** and commit SHA.
3. **Screenshot captured from running build**, not image generation.
4. **Deviation list** (missing detail, asset, lighting, animation, UI).
5. **Reproduction steps** and verified URL/build hash.

Never say "done," "live," "deployed," "fully functional," or "multiplayer" without matching evidence. Concept artwork is a **design commitment**, not an execution artifact. Placeholder buildings are not a visual parity pass.

## 14. Current implementation truth (2026-10-17)

The GitHub `index.html` implements a **single-player Three.js browser prototype** with procedural 3D shapes, a basic avatar, three switchable zones, keyboard movement, mouse orbit, interactable locations, local credits/loan/energy, simplified employment, study/repair actions, civic contribution and localStorage saving.

**Known gaps:** The implementation is not yet verified in a browser by an automated test or observed screenshot; the project has no verified hosted game URL; no authoritative server, multiplayer, PostgreSQL ledger, realistic production chains, full origin editor, CitizenMail inbox, visual-reference-quality 3D assets, sophisticated career advisor, video learning integration or comprehensive civic system. Several current prototype actions directly modify local credits and therefore **must be replaced** by server-authoritative transactions before multiplayer. Current UI is a functional scaffold, not visual parity.

## 15. Key unresolved decisions and safe defaults

| Question | Status | Working assumption |
|---|---|---|
| Organic economic development vs fixed zoning | Recommended, not separately locked | Organic |
| Time compression | DEFAULT | 60 real minutes/game day |
| Final client engine | Technical validation pending | Browser 3D now; evaluate Godot |
| Virtual vs real-money economy | UNDECIDED | Virtual-only until approved |
| Player-run governance extent | Model B LOCKED | Progressive civic participation |
| Player aging/family/inheritance | FUTURE/UNDECIDED | Out of MVP |
| Loan rates, wages, rent, travel costs | BALANCING | Provisional |
| Server concurrency and hosting | DEFAULT | 2–10 first test, then 10–20 |
| Real educational credentials | FUTURE | No accreditation claims |
| Art style and screenshot fidelity | LOCKED target | Contemporary detailed 3D reference |

## 16. Next immediate engineering actions

1. Add a reproducible dev server and package/dependency manifest; verify browser startup.
2. Add automated smoke tests and a screenshot pipeline.
3. Publish a verified staging URL (with user-authorized hosting and access configuration).
4. Replace procedural placeholder city/residential/rural visuals in prioritized passes against the committed reference.
5. Separate gameplay state from rendering; establish a deterministic economy module and test ledger.
6. Implement the graduate → job application → first wage → free career counselling → tutorial → repair contract path end-to-end.
7. Add authoritative multiplayer after economic rules and tests are stable.

---
**Change history**
- v1.0 — 2026-10-17: Consolidated Foundations 001–011, user-approved evolving civic participation, real-world learning, three-domain world, visual fidelity commitment, technical design, test plan, and verified source-code status.
