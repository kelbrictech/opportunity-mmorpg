# WO-05 — Civic Slate UI tokens and HUD specification (X1/X2)
**Status:** DEFAULT / concept specification only. Claude reviews; Rick approves. **No UI code, CSS or engine changes.**
**Data:** [WO-05_CIVIC_SLATE_TOKENS.json](./WO-05_CIVIC_SLATE_TOKENS.json) includes the complete token values, contrast pair list, component-state matrix, and responsive layout concepts.

## Created
Civic Slate palette, type/spacing/radius/border/motion/layer tokens, 17 foreground/background contrast pairs, 8 HUD components with all 7 required states, keyboard/screen-reader rules, text scaling, and 3 visual directions. Numbers are provisional unless contrast ratios, which are calculated facts.

## Visual options for Rick — all CONCEPT, not screenshots
**A. Civic Slate Baseline** — #101826 background, #1B2A3F surfaces, #3DA5FF actions, #3DD6A5 positive status, #EAF0F7 text. Space Grotesk display + IBM Plex Sans body. Desktop: compact top bar; left navigation drawer; bottom-center interaction prompt; right minimap. Mobile: top bar, drawer toggle, compact minimap and thumb-reachable prompt.

**B. Civic Slate + Coral Story (proposed DEFAULT for manga story layer)** — same HUD and typography; #FF7A59 coral reserved for story beats and choice emphasis, not wallet or success/error semantics. Layout unchanged so story mode can overlay live world without HUD rebuild.

**C. Civic Slate + Amber/Violet (alternative)** — same Civic Slate HUD; #F5B942 amber for narrative emphasis and #8C7BFF violet for relationship scenes. No semantic status conveyed only by accent. All departures from Civic Slate are proposals, not canon.

### Text-only responsive wireframes — CONCEPT
Desktop 1440×900: top 64px status bar | main 3D world | left 320px optional drawer | bottom center 48px interaction control | bottom right minimap with adjacent landmark-list button. Manga scenes open as focused overlay with Skip/History/Replay/Text Size controls.

Mobile 390×844: top 56px condensed status | 3D world | bottom dock of labeled actions | minimap as expandable sheet/list | drawer <=90vw | manga panels reflow vertically in reading order. No fixed overlays may hide story choice text.

## Contrast audit (WCAG luminance method, rounded)
| Text foreground | Background | Ratio | Normal body AA |
|---|---|---:|---|
| #EAF0F7 | #101826 | 15.50:1 | Pass |
| #EAF0F7 | #1B2A3F | 12.63:1 | Pass |
| #B9C9DC | #101826 | 10.55:1 | Pass |
| #B9C9DC | #1B2A3F | 8.59:1 | Pass |
| #3DA5FF | #101826 | 6.80:1 | Pass |
| #3DA5FF | #1B2A3F | 5.54:1 | Pass |
| #3DD6A5 | #101826 | 9.62:1 | Pass |
| #3DD6A5 | #1B2A3F | 7.84:1 | Pass |
| #FF7A59 | #101826 | 6.93:1 | Pass |
| #F5B942 | #101826 | 10.08:1 | Pass |
| #8C7BFF | #101826 | 5.41:1 | Pass |
| #FF8D91 | #101826 | 8.02:1 | Pass |
| #101826 | #3DA5FF | 6.80:1 | Pass |
| #101826 | #3DD6A5 | 9.62:1 | Pass |
| #101826 | #FF7A59 | 6.93:1 | Pass |
| #101826 | #F5B942 | 10.08:1 | Pass |
| #EAF0F7 | #3DA5FF | 2.28:1 | **FAIL — forbidden for body labels** |

These ratios are based on specified opaque color pairs, not translucent layers; actual in-game compositing requires retesting.

## Type, accessibility and layout constraints
- Body and interactive text **16px minimum** (provisional); secondary labels **14px minimum** (provisional); text scaling **100%, 125%, 150%, 200%** (provisional options), persisted in settings and applied to HUD, captions, dialogue and manga choices.
- At 200% text scale, content reflows; scroll areas remain keyboard navigable; no clipped decision controls.
- Interactive hit targets minimum **48×48px** (provisional); mouse hover never required.
- Visible focus ring 3px with 2px offset; Escape closes drawers and dialogs and returns focus; Enter/Space operate buttons; arrow keys navigate tabs.
- No color-only cues, no flashing, reduced-motion support; meaningful status changes announced to screen readers. Map always has equivalent textual landmark list.
- World/HUD/prompt/drawer/modal/toast z-index layers 0/10/20/30/40/50 (provisional).

## HUD component matrix
All eight components explicitly specify **default, hover, focus, disabled, empty, error, loading** states in JSON. Summary:
1. **Top bar:** portrait, wallet, energy, time, location; in empty state show “Not available,” not blank; errors with explanation; loading skeleton + text.
2. **Drawer:** CitizenMail, Career Development Office, profile, skills, map; Escape and focus restoration; empty navigation explained.
3. **Interaction prompt:** landmark and action text; E shortcut optional, button alternative required.
4. **Toast:** polite save notices, assertive blocking errors, dismissible, no unannounced disappearance of critical errors.
5. **Minimap:** current zone and landmarks; keyboard-accessible textual equivalent; no reliance on colored dots alone.
6. **Buttons:** primary/secondary/ghost/destructive, focus ring, loading labels, disabled reasons.
7. **Tabs:** keyboard arrows/Home/End, text selected indicator, panel focus order, error and empty tab states.
8. **Inputs:** persistent label and units, visible validation, inline error text, keyboard operation, never placeholder-only labels.

## Assumed
Civic Slate palette and fonts supplied by Claude; additional muted/error/accent colors and all sizes are proposals. No production screenshot or engine render is available. The WO-05 minimum font rule is a proposed value because the supplied work order asks us to specify it, not because an earlier approved numeric minimum was provided.

## Tested / evidence
Color contrast ratios calculated from sRGB relative luminance. JSON and readable spec committed. No UI implementation, responsive browser run, or assistive technology test.

## Unverified
Real rendered contrast over translucent HUD, mobile safe-area handling, actual focus order, screen-reader compatibility, 200% text scaling, asset-font licensing, Claude review, Rick approval.

## Known risks
The 14px secondary text minimum may be too small on dense mobile devices and should be reviewed by Rick. Translucency can lower contrast. Coral is provisional, and S0 artwork is not approved. The story layer must not replace the required third-person world.

## Acceptance criteria
1. Color, typography, spacing, radii, borders, motion, layers — **MET** (JSON).
2. Every specified foreground/background pair with contrast; normal text >=4.5:1 — **MET for approved pairings**; **PARTIAL** for unknown rendered translucent combinations.
3. Minimum text and scaling control — **MET**.
4. All seven states for eight components — **MET**.
5. Three options with swatches, fonts and layout concept — **MET as textual concepts; visual mockups not yet approved**.
6. Concept labels and screenshot honesty — **MET**.

## Claude review requested
Confirm token names against BUILD-007 renderer, validate the 14px secondary minimum against WO-05/AT-14, identify missing component states, and send ACCEPT/REVISE/REJECT. Rick to select A/B/C or request new options before implementation.
