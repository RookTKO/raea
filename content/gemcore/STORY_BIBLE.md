# GemCore: Story Bible

The facts behind GemCore's world, short. **The owner's own account, [`OWNER_CANON.md`](media/media/lore/OWNER_CANON.md) (GemCore's `media/lore/OWNER_CANON.md`, reached through this folder's `media` link), outranks this
file and `lore.ts`**: read it for the full text, and quote it rather than paraphrasing it into new facts. This bible
summarises it, and keeps the earlier facts that still fit, each marked. `lore.ts` holds the facts every piece reads
(dates, numbers, on-screen words). Change a fact in `lore.ts` first, then here.

Marks: **(owner)** comes from `OWNER_CANON.md` or another of the owner's own words. **(game)** comes from GemCore's
files. **(earlier, kept)** was an earlier agent's invention that doesn't contradict the owner; it stays until the
owner says otherwise (see "Conflicts with the owner's canon").

## Corrections

- **2026-11-12, the owner:** "No there was cryo and people did leave earth." This replaced an earlier agent's invention
  ("cryo is a brand term", "no body has ever left Earth", bodies "retired", pioneers sent "as profiles, by signal",
  6 years of signal lag) and removed the file PS-0019. Renders made before it still show the old version: Case File
  0412-C (the ID card's BODY: RETIRED and the PS-0019 card), The Leak (its file sequence), the Pioneer Program ad
  (its fine print), Two Clocks (the PS-0019 ledger line) and Pioneer Terminal's attract run.
- **2026-11-12, the owner's full account** (`OWNER_CANON.md`). It replaced the payout that was paid yearly, the
  contract "until quota is met", denativization as promotion, "profile capture" at signing, and the CYCLE as a reset
  policy. See "Conflicts with the owner's canon". The renders of The Leak, the Pioneer Program ad, Case File 0412-C, Two Clocks and Pioneer Terminal show at least one of them.

## The Resource-Collapse Era (owner)

Earth has run dry of easy wealth: rare minerals, fuel, deep-resource gems. Scarcity justifies deep-space and
deep-underground extraction. Corporations outweigh governments and workers; labour is sold through contracts,
patriotism and false promises; ordinary people are funnelled into "opportunities" that are really traps. "This is the
soil GemCore grows in."

## The three layers (owner)

All three are true at once. The clue is the mismatch between them.

| Layer | What it is | What the player sees |
|---|---|---|
| **(C) Setting** | Earth is the permanent home base; mining is in one distant galaxy, which is why ships, once sent, can't be recalled. GemCore's name for it: **the Aztec Reach** (earlier, kept; the game's biomes are all "aztecian"). | The Reach, never Earth. |
| **(B) Record** | GemCore's internal logs, files and leaks are dated on a corporate calendar: **GC Year 0 = the first launch.** | Only what leaks. |
| **(A) Worker** | The worker never sees the real date. Their only clock counts time since **their own first wake-up or boot**: CYCLE 1, CYCLE 2... Each reboot is a new instance with its own first boot, so the count starts again (resolution 3 below). | `CYCLE 7`, and "DATE: NOT AVAILABLE TO PIONEERS". |

**The clue:** cross-reference the record's calendar with the cockpit's Cycle, and the player sees how much real time has
passed, and how many times they've been rebooted.

## The Cryo Contract and SC-9 (owner)

- **The pitch:** sign a **1,000-year cryo contract**, sleep through the dangerous travel, wake in the future, mine
  high-value resources, earn a life-changing payout, provide for your family. Propaganda line: **"Freeze now. Wake
  wealthy later."**
- **The public myth:** humanity's heroic mining solution. It sells adventure, duty, family payout, long-term wealth,
  civilization's survival, safe cryo travel, and pioneers as heroes. Internally, GemCore is "a machine for converting
  human identity into reusable labor."
- **SC-9**, formally the Stephenson Cryo-Compound 9, "Snowcrash" on the black market, is sold as a safe cryoprotectant
  that preserves body and mind. In fact it preserves the brain only long enough to scan and upload it: "a bridge from
  biological death/failure into corporate-controlled digital labor."
- **Cryo was real, just not long-term.** GemCore publicly demonstrated a working cryofreeze, and it worked for a while.
  Leadership already knew it could never hold for 1,000 years. Engineers were ordered to chase a long-duration fix up
  to the last minute; it never landed, and the ships launched anyway. Upload became the "save", and the cover-up became
  the business model. "Not predators, liars."
- **The payout loophole.** Families are paid if the worker dies or completes, **but not if the worker is officially
  confirmed dead.** So GemCore never classifies a worker as dead: uploaded, pending, active, "on assignment". In-world:
  **"FAMILY COMPENSATION PENDING REVIEW..."**

## The Pioneer Fleet (owner)

GC 0: the first deployment fleet, three ships named for old-world exploration propaganda.

| Ship | What happened |
|---|---|
| **Santa María** | Secretly configured as the test bed for the upload program (GemCore knew the cryo fix wouldn't hold). The experiment went haywire; it is now a derelict adrift, overrun with rogue and degraded UIs: the endgame location, and the origin of the UI program and of the rogue-UI rebels. |
| **Pinta** | Hit by an asteroid before reaching the mining galaxy: crippled, not vaporized; it limps on. The first public crack. GemCore's lines: "unexpected orbital debris event", "minimal long-term productivity impact", "crew continuity preserved through advanced backup systems", "families contacted after internal review". |
| **Niña** | The "clean" public success story, for now (fate open). |

The ships' look isn't given (no design in the game or in `OWNER_CANON.md`). In Corp Console they are written SANTA
MARÍA, PINTA, NIÑA: the font has Í and Ñ (checked in `static/font/Corp Console.ttf` and `fonts/fnt_corp_console`).
The accents rise above the cap height, so leave line spacing for them.

## Upload: the UI system (owner)

- **UI = Uploaded Intelligence.** The worker enters cryo; cryo fails or degrades; SC-9 keeps the brain readable long
  enough to scan; GemCore makes a UI copy and drops it into a worker chassis, a ship cockpit, a mining system or a
  simulation. The UI believes it is the original human. There may be many copies, and copies of copies. "You were
  never the body. You were the backup." "Workers are dead by arrival and fed corporate news." "Consciousness is a
  renewable resource."
- **The awakening is staged.** The player doesn't wake from cryo; they boot into a cheerful corporate onboarding layer.
- **Legal: "continued assets".** UIs are neither people nor legally dead, so the family never gets a death payout.
- **Physical:** the drill ship and the digging are real; the cheerful cockpit UI is a comfort-skin over the industrial
  truth.
- **Re-upload** (game): "Not for any specific reason regarding employees, but shorter consciousness re-upload times
  meant faster redeployment for drill ships." (`datafiles/ships.json:15`)

## Cast and ship (owner)

- **The ship:** a yellow capsule drill ship with one large conical front drill, a big front window, a solid rear panel
  and fins near the tail, about 4:1 against the pilot. Vehicle and prison.
- **The pilot:** an all-white EVA-suit robot (ribbed, segmented arms; stripes on both arms; plain back): the chassis
  for the UI.
- **Co-Agent Boss:** the smiling mascot robot and lead antagonist. Appears in tutorials, promotions, safety videos and
  boss fights. Whether he is the posters' Robot Guy is open (decision 1).
- **Pink Cat Robot:** the tutorial instructor; teaches hand, deck, trash, lock, energy and swap; delivers
  "disclaimers". The design bible's "Attendant" is this character (resolution 7).
- **Agents:** managerial AI robots: supervisors, HR, compliance, mission handlers, promotion gatekeepers, anti-union
  security.

## Plugins, ranks, death (owner)

- **Plugins are corporate software installed into the worker:** `.sys` purple (system access), `.shell` white
  (one-off commands), `.pkg` green (multipliers), `.unknown` red (malware, corrupted or rebel fragments), `.exe` blue
  (abilities), `.defrag` yellow (recovery).
- **Ranks, "MilTech":** 50 promotions in five tiers, from 01 Recruit-Extractor to 50 Co-Agent (Management), "the trap
  ending" (full list in `OWNER_CANON.md`). Every promotion resets the run log in-fiction: "Congratulations erase you a
  little." Promotion is one skill point in the tech tree; other unlocks arrive through the intranet inbox. The game's
  own ladder is different (decision 2).
- **Death is reclassified, never mourned:** the UI instance fails, GemCore reloads a backup, the worker gets a sanitized
  explanation, memory may be missing or edited. System text: "GEMCORE U.I. REINITIALIZATION..." "Death counts as
  overtime."
- **Mind wipes after milestones** (corporate reason: trauma, productivity, compliance; real reason: the worker keeps
  finding the truth). **The wipe is the roguelite reset.** Death and wipe are one mechanic with two masks.
- **Branches, then merging:** each run is a branch sharing a faint seed memory (a name, a face, a family message).
  Late on, the branches are merged into the "best worker": every wipe is a training step.
- **Enemies** read as native fauna at first; the worst turn out to be corrupted or abandoned UIs.

## Leaks and endings (owner)

Engineers and insiders leak the UI system; the public first calls it conspiracy, then protests ("Are UIs people?").
Earlier ships can't be recalled. Inside, workers try to organize against a legal wall: UIs aren't legal workers ("A
copy can still testify."). The endgame reveal shows rows of identical bodies or tanks. Endings: A Serve, B Rebel, C
Merge, D Sabotage, E Escape (`OWNER_CANON.md`).

## Pioneer 0412-C (earlier, kept)

The player's designation in the earlier pieces. It doesn't contradict the owner's canon (a branch with a seed identity),
but the owner hasn't adopted it (decision 4).

| Fact | Value |
|---|---|
| Contract | PX-0412-C, signed **GC 3** on Earth (after the first fleet), **1,000 years** |
| First boot | GC 9 (travel time unconfirmed; decision 5) |
| Now | **GC 112**: 109 years into a 1,000-year contract |
| Reboots | **41** (the cockpit never shows this) |
| Cockpit | **CYCLE 7**, counted from this instance's first boot |
| Rank | Disposable Asset (the game's ladder; decision 2) |
| Family | a daughter, the beneficiary, died GC 74; never paid (decision 6) |

## The record (leaked files, by GC Year)

All are **(earlier, kept)**, rewritten to agree with the owner. PR-0001's fleet and lines now follow the owner.

| GC | File | From | What it gives away |
|---|---|---|---|
| 0 | PR-0001 | Public Relations | The Pioneer Fleet left: Santa María, Pinta, Niña. "Every family is provided for." |
| 3 | PX-0412-C | Contracts | Term: 1,000 years. Compensation payable on completion or death. SC-9 administered. |
| 27 | WC-0027 | Workforce Continuity | Each reinitialization starts a new instance at CYCLE 1. **The GC calendar must never reach the cockpit.** |
| 88 | FP-0412-C | Family Compensation Office | **FAMILY COMPENSATION PENDING REVIEW.** Beneficiary deceased GC 74. Payout made: 0 CR. Death: not confirmed. |
| 96 | HR-0099 | Human Resources | Each promotion resets the run log. Top rank: Co-Agent (Management). |
| 112 | MX-0412-C | Maintenance AI | **Reinitialization count: 41.** 109 of 1,000 contract years. Family compensation paid: 0 CR. |

## Conflicts with the owner's canon

How each earlier fact was resolved. Numbers in brackets point to the owner decisions below.

| # | Earlier fact | The owner's canon | Resolution |
|---|---|---|---|
| R1 | PX-0412-C: "Term: until quota is met" | A 1,000-year cryo contract | Replaced: "Term: 1000 years, cryo." |
| R2 | Family Payout: 2% of yield **paid yearly**; FP-0412-C "payouts sent: 85", returned under clause 14(c); MX "109 payout transfers"; the ad's "Your family is paid every cycle" and fine print "clause 14(c), Continuity Deductions" | Paid on death or completion, never if officially dead; "FAMILY COMPENSATION PENDING REVIEW" | Replaced everywhere: no payout was ever made. The ad now says "Your family is provided for.", and its fine print states the loophole. Clause 14(c) is retired. |
| R3 | CYCLE "since latest activation", **reset on purpose** by WC-0027 | Cycle counts "since their own first wake-up/boot"; death is a reboot from a backup | Read together: each reboot is a new instance, so its own first boot is recent and the count starts at 1. WC-0027 now records that GemCore doesn't carry the count forward. Confirm the reading [3]. |
| R4 | "Profile" captured at signing (PX-0412-C) | The brain is scanned after cryo fails, using SC-9 | Replaced: "SC-9 administered." The word "profile" is retired for the UI (owner's term). |
| R5 | "Promotion is denativization": each rank trims native memory; the ladder ends at GemCore Robot Guy (HR-0099) | Each promotion resets the run log; the top rank is Co-Agent (Management) | HR-0099 rewritten to the owner's version. "Denativization" stays only as the game's unused game-over title (`datafiles/english.json:209`) [8]. The 62% figure is removed. |
| R6 | WORKER rank "Disposable Asset" from the game's 20-rank ladder (`datafiles/english.json:86-105`, called the owner's final ladder, picked 2026-11-08, in `scripts/pkg_company_rank/pkg_company_rank.gml:8`) | The 50-rank MilTech "working ladder" | **Open** [2]: both are the owner's. lore.ts keeps the game's rank until the owner chooses. |
| R7 | GC 112, 41 re-uploads, signed GC 3 | A 1,000-year contract | No contradiction: 109 years is 11% of the term. Kept, flagged [4]. |
| R8 | The 6-year signal lag; first boot GC 9 | Ships travel physically; the distance is why they can't be recalled | The lag is removed from lore.ts. GC 9 stays as a date with no stated cause [5]. |
| R9 | PR-0001's "first Pioneer fleet" | The Pioneer Fleet: Santa María, Pinta, Niña | PR-0001 names them. |
| R10 | The Attendant (design bible) | The Pink Cat Robot, the tutorial instructor | The same character: the owner's own note called the Attendant "the pink cat robot" (`DESIGN_BIBLE.md`). Use the owner's name [7]. |
| R11 | Robot Guy, "the Suit, the Board" | Co-Agent Boss, the smiling mascot antagonist | **Open** [1]. Don't assume they are the same. |
| R12 | Pioneer 0412-C, the daughter, GC 74 | Each run is a branch with a seed identity (a name, a face, a family message) | No contradiction. Kept, flagged [4], [6]. |
| R13 | "The Aztec Reach" | "one distant galaxy" (unnamed) | Kept as GemCore's name for it, flagged [9]. |
| R14 | Old notes: "cash kept is the Family Payout" (25% banked on death) | No payout ever reaches the family | Replaced in the notes below. |

### Owner decisions still open

1. Is Co-Agent Boss the posters' Robot Guy (grey round body, hose arms, top hat, green screen face)? *Recommendation:*
   ask; if yes, the posters become his model sheet.
2. Which rank ladder ships: the game's 20 ranks (Indentured Driller to GemCore Robot Guy) or the MilTech 50 (Recruit-
   Extractor to Co-Agent)? *Recommendation:* MilTech, since it carries the promotion-as-wipe and the management ending;
   the game's keys then change (`datafiles/english.json`, `scripts/pkg_company_rank`).
3. Does a reboot start the cockpit's Cycle at 1 (a new instance) or restore the backup's count? *Recommendation:* starts
   at 1, which is what makes the cross-reference work.
4. Keep "Pioneer 0412-C" (signed GC 3, now GC 112, 41 reboots, CYCLE 7) as the player's designation and numbers?
5. How long does the voyage take, and when did the first fleet arrive? (GC 9 for 0412-C currently has no stated cause.)
6. Keep the daughter who died in GC 74 as the player's family seed?
7. Retire the name "the Attendant" in favour of "Pink Cat Robot" in `DESIGN_BIBLE.md`? *Recommendation:* yes.
8. Is "Denativization" (the game's unused game-over title) the in-world word for a mind wipe, or retired?
9. Keep "the Aztec Reach" as the galaxy's name?
10. Earlier game text with no place yet: Commander Hayes, Dr. Sarah Chen, Rookie Pilot Jim (the Inbox); the Inbox's
    2024 dates; Hayes's Earth coordinates (34.7N, 128.5W); "Gemcore" used as a substance in Hayes's mail. Which are
    Agents, which are humans, and when are they?
11. The Pinta: was it hit at a known GC year, and did its crew's UIs come from Santa María's program?

## How it lands in the game (suggestions, not yet built in GemCore)

These are notes only. Nothing in GemCore has changed.
- **One run is one branch.** Death is a U.I. reinitialization; the wipe is the reset. The HUD could show `CYCLE N`,
  starting at 1 each run.
- **The Inbox is the intranet box** (owner): rewards and lore both arrive there. Mails dated "GC Year N" would replace
  today's `2024-01-xx` strings (`scripts/scr_inbox_data`). An inbox mail can carry an `.mp4`.
- **"Cash kept" is the worker's account, not the family's.** The 25% banked on death never reaches anyone: the family's
  claim is "PENDING REVIEW".
- **Ranks are permission changes**, and each promotion resets the run log.
- **Conflicts to fix in GemCore:** the Inbox's 2024 dates; Commander Hayes's Earth coordinates; the Corp Console font
  has no apostrophe, quotes or long dash (write "DO NOT", not "DON'T").

## The pieces in this folder

| Piece | Mode | Length | File |
|---|---|---|---|
| The Pioneer Program (recruitment ad) | pitch (in-world) | 30 s | `pioneer-ad.tsx`, shots in `ad.tsx`, board `pioneer-ad.script.ts` |
| The Leak (lore trailer) | story | 60 s | `leak-trailer.tsx`, board `leak-trailer.script.ts` |
| Pioneer Terminal (playable clue) | play | 60 s attract, playable | `cycle-terminal.tsx`, rules `terminal.ts` |
