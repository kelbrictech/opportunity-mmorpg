# BUILD-002: slice hardening

**Author:** Claude (Engineering Lead)  **Date:** 2026-10-17
**Depends on:** BUILD-001 committed first (this build replaces the file BUILD-001 added)
**Approved by Rick:** "anything else you can work on while waiting?" (BUILD-002 was listed in work order 001 as needing no ChatGPT specs)

## Files

Commit byte-for-byte, cite the SHA-256 in the commit message, and re-read from GitHub to confirm.

| Repo path | Action | Bytes | SHA-256 |
|---|---|---:|---|
| `prototypes/civic-slate-slice/index.html` | REPLACE (was `c8155fba35f1cac86f1eb1a423134c6dda186b913582ffd772e384651b465815`) | 19,319 | `03b39aff6dfae85e9ff1c07f282942d19d4696c4d99488478edf9886e80f811e` |
| `docs/builds/BUILD-002.md` | NEW | this file | not listed |

Nothing else changes. Root `index.html`, `src/`, `tests/`, and workflows are untouched.

## What changed in the slice

1. **Instanced trees.** Trees are two instanced meshes per zone instead of two meshes per tree. By reading the code, rural drops from up to about 200 draw calls to about 27, and the layout is identical. **Not measured.** Open the page with `?debug=1` or press F3 to see the real draw calls, triangles, and fps.
2. **Key remapping.** Settings panel (new Settings tab) rebinds forward, back, left, right, sprint, interact, district view, map, and profile. Uses physical key positions, so it works on non-QWERTY layouts. Arrow keys always move. Duplicate keys are refused with a message. Esc cancels. Reset button. Saved in the browser.
3. **Text size.** 100, 125, 150, or 200 percent. All HUD text and panel widths scale with it. Saved in the browser.
4. **Reduced motion.** If the system asks for reduced motion, the drawer slide, camera easing, and walk bob are off.
5. **Cues beyond color.** Minimap uses shapes (diamond for transit, square for buildings, triangle for you, pointing the way you face) with a legend. The map panel says "you have N" when a fare is unaffordable. The interaction prompt is announced to screen readers.
6. **Focus.** Opening a panel moves keyboard focus into it.
7. **Help line** now shows the current bindings.

## Evidence

| Claim | Level |
|---|---|
| All of the above | **Implemented and committed once uploaded. Not browser-tested.** Only a JavaScript syntax check passed. No Chromium in the build sandbox |
| Draw-call reduction | **Estimate from code reading.** Measure with `?debug=1` |
| Existing tests | Not affected. The slice has no automated tests yet (BUILD-004) |

## Known gaps

- **No touch controls.** Phones cannot move the avatar yet. Left out to keep this build small. A touch pad is a candidate for the next build.
- Settings are not yet reachable from the in-world UI other than the Settings tab.
- Remapping covers keyboard only. No gamepad.
- Instanced trees have no collision, same as before.
- Screen-reader support is minimal (live announcement, panel focus, aria-labels). It has not been tested with a screen reader.
- The page published earlier at the claude.ai link is the old version.

## Checks for ChatGPT or Rick after upload

1. Open `prototypes/civic-slate-slice/index.html`. No console errors. Three zones still load.
2. Add `?debug=1`: report draw calls and fps in each zone.
3. Settings: change text size to 200 percent and confirm nothing overlaps or clips. Rebind interact to a different key and use it. Try a duplicate key and confirm it is refused.
4. Turn on reduced motion in the operating system and confirm the drawer no longer slides.
5. Report with screenshots, using the bug format in the instructions.