# WO-07 — Founders' District historical 3×3 mapping (D4)
**Status:** DEFAULT / pending Claude review and Rick approval. **Blueprint:** §3.1. **No code, maps, 3D assets or blueprint changed.**
**Machine-readable:** `docs/design/WO-07_FOUNDERS_DISTRICT_MAPPING.json`.

## Original nine cells — historical commitment
| Row | Column 1 | Column 2 | Column 3 |
|---|---|---|---|
| 1 | Graduation Center | Housing Block | Employment Office |
| 2 | Retail Stores | Civic Square | Bakery Shop |
| 3 | Park | Logistics Depot | Flour Mill |

**Proposal:** Preserve the nine-cell Founders' District grid as a heritage diagram and early planning reference, **not** a fourth world domain. Each historical piece gets a traversable counterpart in one of the three LOCKED domains. Original row/column coordinates remain recorded as provenance, but **do not** imply that the nine buildings still sit adjacent on one physical 3×3 map.

## One-to-one placement and rationale
| Original piece | Proposed domain | Counterpart / treatment | Reason |
|---|---|---|---|
| Graduation Center | Big City | University precinct orientation/graduation center | University and higher education are required city landmarks; serves new graduates without becoming a career gate |
| Housing Block | Residential Area | Apartments | Housing, rent, household services and recoverable daily life belong here |
| Employment Office | Big City | Employment Center | Keeps job discovery near City employers; separate from the free Career Development Office in Town Hall |
| Retail Stores | Residential Area | Store and neighborhood shops | Essential goods, stock and local trade anchor the living economy |
| Civic Square | Big City | Town Hall public plaza | Civic deliberation, events and proposals connect to Town Hall |
| Bakery Shop | Residential Area | Bakery | Local work and demand; rural flour deliveries make interdomain logistics meaningful |
| Park | Residential Area | Park | Accessible public meeting, recovery and recreation; no mandatory paid entry |
| Logistics Depot | Rural Region | Warehouse / freight dispatch yard | Rural storage and transport connect wheat/flour to residential and city demand |
| Flour Mill | Rural Region | Mill | Transforms wheat into flour and anchors the rural processing economy |

**Disposition:** **9 retained, 0 retired**; 3 in Big City, 4 in Residential Area, 2 in Rural Region. Two pieces are explicitly merged with existing required landmark concepts: Employment Office→Employment Center and Civic Square→Town Hall plaza; Logistics Depot→Warehouse/freight yard. This is **conceptual integration**, not deletion.

## Player experience and gameplay links
- **Arrival:** Every origin has an optional orientation to the Graduation Center. New citizens begin in their selected domain, not forced to teleport to the city.
- **Employment:** Employment Center posts jobs; CitizenMail carries applications and replies; Town Hall's Career Development Office provides **free** counseling. These functions remain distinct.
- **Supply chain:** Rural Farm → Flour Mill → Warehouse/Logistics Depot → Residential Bakery → Retail Stores → consumer. Every handoff needs inventory, delivery cost and ledger evidence once implemented.
- **Civic:** Civic Square in the Town Hall precinct hosts discussions and visible neighborhood improvements; no purchased governance privileges.
- **Housing and recovery:** Apartments, Park and free recovery services provide a viable start without income; affordability subject to WO-04 approval.
- **Transit:** Existing transit stops connect the three domains. Freight depot is not a substitute for accessible passenger transit.

## Geographic and presentation constraints
The original 3×3 **is a historical arrangement**, not a metrically accurate world map. The current three-domain default footprints remain Residential 300×300m, Big City 400×400m, Rural 400×400m (all DEFAULT, not newly locked). No building coordinates, walking times or render parity are asserted. Preserve discoverable landmark names in menus and history panels even if the public-facing sign uses its new functional counterpart. Avoid claiming a seamless physical 3×3 district exists across separate domains.

## Alternative for Claude/Rick consideration
If retaining a physical Founders' District matters more than geographical placement, an optional small commemorative **model or exhibit** in Big City Civic Square could show the original nine cells. It would be a noninteractive map/exhibit, not a fourth domain, and would not replace actual required landmarks. **This alternative is not approved and not part of the base mapping.**

## Assumed
The historical grid's narrative meaning, Graduation Center at city university, logistics in Rural Region, and Town Hall plaza location are design proposals. No canonical street addresses or mesh layouts were supplied.

## Tested / evidence
The original nine names and required three-domain landmarks were verified against the authoritative blueprint. All nine appear exactly once in the companion JSON. No engine/browser/3D scene tests executed.

## Unverified
Actual map positions, travel times, mesh assets, world navigation, functional supply chain, user approval and Claude acceptance.

## Known risks
Distributing a former contiguous district across zones may conflict with players' expectation of a single walkable heritage neighborhood. Employment Office could be confused with the Career Development Office unless signage and UI explicitly differentiate them. Rural freight yard must not block passenger mobility. Existing game scenes may use different landmark identifiers and require Claude's integration mapping.

## Acceptance criteria
1. Nine original pieces accounted for — **MET** (9/9).
2. Each mapped to a domain or retired with rationale — **MET** (9 mapped, 0 retired).
3. Rationale and landmark function — **MET**.
4. Three LOCKED domains respected — **MET**.
5. Historical layout not silently discarded — **MET**, grid and coordinates retained.
6. Running 3D map visually matches this design — **NOT VERIFIED**.

## Review decision requested
Claude: ACCEPT/REVISE/REJECT the placements and resolve identifier collisions; Rick: decide whether the historical grid is sufficient as a heritage diagram or should appear as an optional exhibit. No production map changes until accepted.
