# WO-08b — Chapter 1: A Loose Thread

**Story premise selected by Foreman:** A — The Street That Remembered.
**Status:** DRAFT for Claude review and Foreman script approval. **Not locked canon.** S0 visual approval, character sheets, economy values and playable integration remain gated.
**Machine-readable script:** [WO-08B_CHAPTER1_BRANCHING_SCRIPT.json](./WO-08B_CHAPTER1_BRANCHING_SCRIPT.json).

## Chapter intent
A new graduate enters the Residential Area, hears a loose shoe sole striking the pavement, and discovers that Tomas Vale's repair shop quietly holds together a neighborhood. The first choice is immediate and meaningful. Dialogue alters discoveries and relationships, never wages, prices, degree eligibility, or reward odds.

## CH1-S01 — The sound of a sole
**Place:** Residential Area, outside the Repair Shop. **Target:** 45–75 seconds (provisional). **Panels:** T01 establishing, T02 close-up, T04 choice. **Visual:** Tomas in the doorway; a delivery worker tests a separated sole. Dialogue is rendered separately from artwork.

**Narrator:** The street wakes before the sun has finished deciding.

**Narrator:** From the repair shop comes a peculiar rhythm: scrape, step, flap.

**Delivery Worker:** Please tell me that sound is the door.

**Tomas Vale:** Doors don't follow you home.

**Tomas Vale:** That sole won't survive tomorrow's deliveries. I can show you what to look for—but you'll have to decide what to do.

**Choose:**
- **Inspect:** Offer to inspect the shoes → CH1-S02; set `ch1.chose_inspection`.
- **Listen:** Ask about tomorrow's shift → CH1-S03; set `ch1.chose_listening`.
- **Counselor:** Visit the free Career Development Office first → CH1-S04; set `ch1.chose_counselor`.

## CH1-S02 — Look before you mend
**Delivery Worker:** The front lifts whenever I step down.

**Tomas:** Good eyes are useful. Careful questions are better. Ask what happened before choosing a fix.

Set `ch1.discovered_shoe_damage`. This is a clue, **not a passed repair assessment**. Continue CH1-S05.

## CH1-S03 — The cost of a missed morning
**Delivery Worker:** I have deliveries tomorrow. I can't afford to promise what my shoes won't let me do.

**Tomas:** Then we should be clear about the risk, not just the repair.

Set `ch1.discovered_deadline`. Continue CH1-S05.

## CH1-S04 — A door that stays open
**Place:** Big City, free Career Development Office. The player must use actual transit; no instant teleport is scripted.

**Counselor:** You can explore work beyond your degree. Guidance here is free.

**Narrator:** A note in the local opportunities list points back to a repair shop in the Residential Area.

Set `ch1.discovered_free_counseling`. Player returns to Residential Area at their own pace, then CH1-S05. Travel duration is not invented.

## CH1-S05 — The shop is not just a shop
**Place:** Residential Area Repair Shop. **Panels:** T03 two-shot, T06 reaction, T04 choice.

**Mira Solen:** Tomas, the bakery's delivery cart is still waiting on that wheel.

**Tomas:** And I am still waiting on a second pair of hands.

**Mira:** That's the trouble with this street. Everyone needs you. Nobody asks how long you can keep going.

**Tomas:** I haven't decided to retire. I've decided I can't do this forever.

**Choose:**
- Ask Tomas to teach you the inspection → `ch1.offered_help`.
- Ask Mira what else the street needs → `ch1.asked_mira`.
- Observe before making a promise → `ch1.observed_first`.

All continue CH1-S06. No player loses career or quest access.

## CH1-S06 — A promise small enough to keep
**Tomas:** We start with the shoes. Not the whole street. One thing done carefully.

**Narrator:** The repair bench is open. You can try the inspection now, or return later.

**Choose:**
- Begin **The Broken Shoes** quest → invoke existing `broken-shoes-v1` quest entry; set `ch1.repair_quest_discovered`.
- Return later → set `ch1.repair_quest_discovered` and `ch1.repair_deferred`. Other gameplay stays open.

**Important:** The story itself does not complete the repair, certify a skill, pay credits, consume items or create escrow. All actual quest effects must remain governed by the quest system and accepted economy rules.

## CH1-S07 — The street remembers
**Narrator:** You haven't saved the street. You've learned where to begin.

Recap player discoveries and choices without awarding credits. Tease a Big City supply lead and Rural Region workshop contact; neither is automatically unlocked without later approved quest content.

## Origin-sensitive dialogue (flavor only)
- **Fine Arts:** You notice how many repairs carry someone's personal history.
- **Agricultural Science:** You recognize the value of keeping working tools in use.
- **Information Systems:** You wonder how the shop tracks jobs when every customer arrives at once.
- **Health Sciences:** You ask whether walking in damaged shoes has been causing pain.

These lines never alter eligibility, prices, wages, or repair probabilities. Origin definitions are still subject to WO-03 approval.

## Narrative and engineering handoff
Seven scene IDs are provided with dialogue, branches, state flags, panel templates and a quest hook. Branches converge at CH1-S05; all initial choices preserve player agency. All flags are **player-specific**, not global changes to the shared world. Replay and skip must not duplicate flags or rewards. All visual assets remain unproduced and unapproved.

## Created
Seven scenes, three opening branches, a second three-choice decision, an optional repair-quest handoff, four origin flavor lines and eight acceptance scenarios.

## Assumed
Provisional scene duration, delivery worker identity, lines of dialogue, flags, branch implementation and Chapter 2 teasers. Foreman selected premise A, **not** these exact Chapter 1 lines or artwork.

## Tested / evidence
Script and machine-readable data committed to GitHub. No game engine, browser, narrative timing, mobile, screen reader or persistence tests performed.

## Unverified
Claude's review, Foreman's Chapter 1 approval, story renderer compatibility, quest handoff, actual travel behavior, and all visual gates.

## Known risks
Counselor-first path requires cross-domain travel and may exceed the originally proposed ten-minute opening. If timing cannot be maintained, revise pacing without replacing transit with a fake teleport. Tomas's retirement arc must remain player-influenced but not let individual players overwrite shared NPC state. The existing shoe-repair prototype has separate escrow and competency gaps documented in WO-06.

## Acceptance criteria
1. Premise A retained: **MET**.
2. Seven authored scenes with dialogue and branches: **MET as script**.
3. Player choices affect discovery/relationships only: **MET in design**.
4. Four origin flavor variants with no career gating: **MET as script**.
5. Optional existing quest hook: **MET as specification; NOT IMPLEMENTED**.
6. S0 art approval, character sheets and scene artwork: **NOT MET**.
7. Browser playtest and narrative timing: **NOT VERIFIED**.
8. Claude review and Foreman script approval: **PENDING**.

## Next
Claude: ACCEPT / REVISE / REJECT the Chapter 1 script, state flags and quest hook. Foreman: approve or revise the script. Only then proceed to S1 character sheets and scene art subject to separate S0 approval.
