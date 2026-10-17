# OPP-GAME-001 — Opportunity: The Game, Not Just the Economy

**Type:** NEW SPEC / gameplay vision and first playable quest proposal  
**Status:** DEFAULT — proposed for Foreman approval; existing LOCKED blueprint rules remain authoritative  
**Blueprint:** Graduate origins, three domains, non-gated careers, Career Development Office, learning/competence, multiplayer, civic participation  
**Design owner:** ChatGPT | **Engineering owner:** Claude | **Approval:** Foreman

## Core fantasy
**Start as a graduate. Find your place. Build a life that changes the world.**

Opportunity is a persistent third-person multiplayer **life-adventure RPG**. The player pursues personally meaningful goals through exploration, playable challenges, relationships, cooperation, competition, and tangible world change. Economic simulation is the constraint system and consequence engine—not the core objective.

## Core player loop
**Discover** an opportunity or problem in the world → **Choose** an approach and accept a quest/contract → **Prepare** by gathering information, allies, skills and tools → **Play** an interactive challenge with real decisions and skill expression → **Resolve** success, partial success or setback → **Earn** credits, items, competence evidence, reputation, relationships, access or world change → **Unlock** new opportunities.

A player must be able to describe what they did and why it mattered, not just which button awarded credits.

## Player motivations and progression
1. **Mastery:** learn and demonstrate a practical craft; higher-difficulty tasks require better decisions and tools, never a single video-click gate.
2. **Discovery:** meet NPCs, inspect problems, uncover local needs, travel between Residential Area, Big City and Rural Region.
3. **Creation:** repair objects, manufacture goods, develop services, operate shops, grow businesses.
4. **Belonging:** develop relationships, join teams, fulfill commitments, mentor and collaborate.
5. **Influence:** earn constructive civic trust and contribute to persistent neighborhood changes; no buying political rights.
6. **Achievement:** optional badges, milestones and personal legacy; no single prescribed win condition.

## First playable quest — 'The Broken Shoes'
**Location:** Residential Area repair shop. **Duration target:** 5–10 minutes, provisional. **Entry:** accessible to any degree, no paid prerequisite. **Narrative hook:** a delivery worker's worn shoes threaten tomorrow's shift. Help them get back to work.

### Stages
1. **Notice:** discover NPC at repair shop; dialogue offers help, ask questions, or walk away. Declining never hard-locks the game.
2. **Inspect:** interactive shoe view with 3–4 observable signs. Player identifies sole separation versus a torn upper; wrong diagnosis prompts explanation and retry.
3. **Choose:** select repair plan from 2–3 options; compare durability, time, materials, cost and worker's deadline. No hidden trick answer.
4. **Prepare:** acquire appropriate materials/tools via tutorial kit or existing inventory; a free starter kit keeps the first quest accessible.
5. **Perform:** playable repair mini-challenge (clean surface → apply adhesive → align sole → press/cure). Timing and order influence quality. Keyboard/touch-accessible non-timing alternative must be equally viable.
6. **Check:** inspect repair quality, explain why the chosen method works; a knowledge check plus practical evidence is required before competence is recorded.
7. **Resolve:** NPC reacts to quality and timeliness; payout is from funded customer escrow **exactly once**. Poor repair gets constructive feedback, not fabricated competence.
8. **Aftermath:** NPC can make tomorrow's delivery; unlock a referral or a more complex repair, a relationship update, and an optional city supply lead.

### Gameplay feedback
- **Immediate:** clear prompts, tactile/visual repair feedback, progress and errors.
- **Short-term:** customer outcome, payout, reputation/relationship change, repair condition.
- **Long-term:** increasingly complex jobs, tools, workshops, supplier networks, multiplayer customer contracts.

## Design principles / constraints
- No game-over for financial hardship; starting fund covers three months' protected essentials without income (specific prices pending).
- Every meaningful action has **choice + challenge + feedback + consequence**. Avoid 'press Study to learn' and 'press Work to earn'.
- Fail forward: unsuccessful attempt leads to feedback, affordable retry or an alternative quest.
- Degree, institution, debt, personality never cap career potential.
- No fake certifications; competence is game-internal evidence, not a real-world credential.
- Authoritative, idempotent transactions needed for production multiplayer; prototype may label simulated rewards honestly.
- Quest must work solo before adding co-op; multiplayer extensions include one player sourcing materials, another repairing, another delivering, with verifiable contributions.

## First playable slice definition of done
- A player can **find, start, play and finish** the Broken Shoes quest in the third-person world without developer controls.
- At least two meaningful choices alter outcome (diagnosis, method, deadline, cost, quality).
- Interactive challenge is not an automatic click-to-complete action.
- Clear win, partial-success and setback feedback; all paths remain playable.
- Game records condition, materials, customer outcome, player competence evidence and exactly-once payout.
- The quest creates a **new opportunity** (referral/next repair or supplier lead).
- Keyboard, touch and reduced-timing accessibility modes are tested.
- Demonstrated in browser with recorded test steps and evidence; a GitHub commit alone is not verification.

## What is NOT built
This is a game-design handoff, not evidence that the quest, mini-game, multiplayer, or progression are implemented. Existing prototypes primarily offer exploration and one-click economy actions.

## Assumed
NPC story, quest title, challenge mechanics, duration, outcomes and referral are provisional design additions; they do not amend the LOCKED blueprint until Foreman approves.

## Next engineering handoff
Implement the first quest end-to-end in an isolated feature branch or slice, preserve existing root client, expose testable quest state and evidence, and run browser gameplay tests. Do not hardcode unapproved monetary balances.
