# WO-09 — Panel Style Bible (Preproduction Draft)

Status: PARTIAL; S0 style approval and WO-08a story selection are pending. No art or game code changed.

## Created
Eight responsive panel layouts and a provenance schema in [machine-readable specification](./WO-09_PANEL_STYLE_BIBLE_DRAFT.json).

| Template | Format | Primary purpose |
|---|---|---|
| T01 Establishing | 16:9 | Location and mood |
| T02 Character Close | 4:5 | Individual dialogue |
| T03 Two-Shot | 16:9 | Two-character dialogue |
| T04 Choice | 3:4 | Decision and accessible options |
| T05 Action Sequence | 16:9 | Ordered action |
| T06 Reaction | 4:5 | Emotional response |
| T07 Location Transition | 16:9 | Travel across domains |
| T08 Recap | 1:1 | Summarize discoveries and decisions |

## Visual and interaction contract
Original manga-inspired, warm character-driven art using Civic Slate colors. Dialogue and choices must remain selectable engine text, not embedded in the image. Each image needs descriptive alt text. Panel order, dialogue order, choice focus, replay, skip, and reduced-motion behavior must be accessible. On mobile, panels stack vertically and controls remain reachable. The three-domain 3D game remains the primary playable world.

## Draft art budgets
Character canvas 1024×1536 px; background maximum dimension 1600 px; scene assets 1.5 MB; chapter assets 20 MB. All values provisional. Prefer optimized WebP for delivered art and PNG source masters.

## Provenance
For every asset, record unique ID, source and rights, generator and prompt when applicable, reference images, creation date, dimensions, format, byte size, SHA-256, text-safe zones, alt text, review decisions, and eventual browser evidence. The JSON contains a null-filled manifest template; null means not verified.

## Review gates
S0 visual approval: PENDING.
Rick story premise choice: PENDING.
S1 character sheets: NOT STARTED.
S2 Chapter 1 script: NOT STARTED.
S3 production art: BLOCKED.
S4 playable integration: BLOCKED.

## Assumed
All panel templates, budgets, colors and composition guidance are proposals. The prior S0 triptych is not approved and may need revision for neutral poses and text-safe zones.

## Tested / evidence
Eight layouts and manifest schema committed as design data. No scene art, mobile browser test, accessibility test, or in-game render performed.

## Unverified
Responsive behavior, compression budgets, character consistency, original-art clearance, visual approval and engine integration.

## Known risks
Unapproved style and story could make art production wasteful; text zones can overlap important visual detail; character appearances can drift.

## Acceptance criteria
Eight templates: MET as specification.
Provenance manifest: MET as schema.
Character sheets and production art: NOT MET, approval-gated.
Browser integration: NOT MET, approval-gated.
Claude and Rick approval: PENDING.

Next: Claude review schema; Rick approve S0 and select WO-08a story direction before character sheets or script.
