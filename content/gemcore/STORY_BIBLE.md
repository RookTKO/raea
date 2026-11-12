# GemCore: Story Bible

The facts behind GemCore's world. `lore.ts` holds the same facts as data, and every piece in this folder reads them
from there, so the ad, the trailer and the terminal can't drift apart. Change a fact in `lore.ts` first, then here.

## The Resource-Collapse Era

Earth has run out of easy wealth: rare minerals, fuel, and the gems found only in deep resource beds. The shortage is
bad enough to justify mining in deep space and deep underground. Corporations now outweigh governments and the people
who work for them. Labour is sold through contracts, patriotism and false promises, and ordinary people are steered
into "opportunities" that are really traps. That is where GemCore comes from.

## Corrections

- **2026-11-12, the owner:** "No there was cryo and people did leave earth." This replaced an earlier agent's invention
  ("cryo is a brand term", "no body has ever left Earth", bodies "retired", pioneers sent "as profiles, by signal",
  6 years of signal lag) and removed the file PS-0019. Renders made before it still show the old version: Case File
  0412-C (the ID card's BODY: RETIRED and the PS-0019 card), The Leak (its file sequence), the Pioneer Program ad
  (its fine print), Two Clocks (the PS-0019 ledger line) and Pioneer Terminal's attract run.

## The three layers

All three are true at once. The clue is the mismatch between them.

| Layer | What it is | What the player sees |
|---|---|---|
| **Setting** | Earth is the permanent home base. All mining happens in one distant galaxy, **the Aztec Reach** (GemCore's biomes are all "aztecian"). Pioneers travel there **in cryo**: people physically leave Earth. Once launched, they can't be recalled. (How long the journey takes is an open question.) | The Reach, never Earth. |
| **Record** | GemCore's internal logs, files and leaks are dated on a corporate calendar: **GC Year 0 is the first Pioneer launch.** | Only what leaks. |
| **Worker** | The pioneer's only clock is **CYCLE**, a count of wake-ups since their latest activation. It goes back to 1 at every re-upload. | `CYCLE 7`, and "DATE: NOT AVAILABLE TO PIONEERS". |

**The reveal:** put the cockpit's clock next to the record's and they don't match. Pioneer 0412-C signed in GC 3, and
it is now GC 112. That's 109 years and 41 re-uploads, against a cockpit that says CYCLE 7.

## GemCore: myth and machine

**The public myth: the Pioneer Program.** "Humanity's heroic mining solution." It sells:
- adventure ("Wake a hero")
- duty ("Somebody has to dig")
- the Family Payout Guarantee ("Your family is paid every cycle")
- long-term wealth
- the survival of civilization ("Dig deep. Hold the future")
- safe cryo travel ("Sleep safe")
- pioneers as heroes

**The machine.** A process for turning human identity into reusable labour:
- **Cryo is real, and people left Earth** (the owner, 2026-11-12: "No there was cryo and people did leave earth.").
  The GC 0 launch sent people, in cryo, to the Aztec Reach. At signing, the applicant's profile is also captured
  (PX-0412-C). **Open question for the owner:** how a pioneer who travelled in cryo relates to the re-uploads below
  (is the mind moved from the body into the ships on arrival? what happens to the body?). Don't build a piece's
  reveal on an answer until the owner gives one.
- **Ships are bodies.** A profile wakes inside a drill ship. When the hull is lost, the profile is **re-uploaded**
  into a new one: "shorter consciousness re-upload times meant faster redeployment" (GemCore's own hangar text).
- **The counter is reset on purpose** (WC-0027, GC 27). Pilots who believe this is their first contract meet quota
  31% more often. The GC calendar must never reach the cockpit.
- **The Family Payout is real money that goes nowhere.** It pays 2% of yield per year to the beneficiary. 0412-C's
  daughter died in GC 74, and after that the payouts went unclaimed and returned to GemCore under clause 14(c)
  (FP-0412-C).
- **Promotion is denativization** (HR-0099). Each rank on the ladder trims native memory: Earth, names, faces. The
  ladder runs Indentured Driller, then Disposable Asset, and on up to Chairman of GemCore, then GemCore Robot Guy, a
  profile with nothing native left. GemCore's unused game-over title, "Denativization", is the name of this process.

## Pioneer 0412-C (the player)

| Fact | Value |
|---|---|
| Contract | PX-0412-C, signed **GC 3**, term "until quota is met" |
| First boot in the Reach | GC 9 (the journey time behind it is unconfirmed) |
| Now | **GC 112** |
| Re-uploads | **41** (the cockpit never shows this) |
| Cockpit | **CYCLE 7** |
| Rank | Disposable Asset (rung 2 of 20) |
| Denativized | 62% |

## The record (leaked files, by GC Year)

| GC | File | From | What it gives away |
|---|---|---|---|
| 0 | PR-0001 | Public Relations | "Every family is provided for." |
| 3 | PX-0412-C | Contracts | Profile capture complete. Subject: cryo, outbound. |
| 27 | WC-0027 | Workforce Continuity | **Reset the CYCLE counter to 1 on every re-upload.** |
| 88 | FP-0412-C | Family Payout Office | Beneficiary deceased, GC 74; funds returned to GemCore. |
| 96 | HR-0099 | Human Resources | Each rank trims native memory. |
| 112 | MX-0412-C | Maintenance AI | **Re-upload count: 41.** 109 payout transfers since signing. |

## How it lands in the game (suggestions, not yet built in GemCore)

These are notes only. Nothing in GemCore has changed.
- **One run is one Cycle.** Death is a re-upload. The cockpit's counter could show `CYCLE N` in the HUD and reset on
  re-upload.
- **The Inbox can leak the record.** Mails dated "GC Year N" in place of today's `2024-01-xx` strings
  (`scripts/scr_inbox_data`). An inbox mail can carry an `.mp4`, so the trailer could ship as a mail attachment.
- **"Cash kept" is the Family Payout.** The 25% banked on death is the payout, and the 75% kept is the "Continuity
  Deduction".
- **Ranks are denativization**, so the rank ladder's names already tell the story.
- **Conflicts to fix in GemCore:**
  - the Inbox's 2024 dates
  - Commander Hayes's Earth coordinates (34.7N, 128.5W)
  - the Corp Console sprite font has no apostrophe, quotes or dash, and the TTF has the same gaps. Write "DO NOT",
    not "DON'T".

## The pieces in this folder

| Piece | Mode | Length | File |
|---|---|---|---|
| The Pioneer Program (recruitment ad) | pitch (in-world) | 30 s | `pioneer-ad.tsx`, shots in `ad.tsx`, board `pioneer-ad.script.ts` |
| The Leak (lore trailer) | story | 60 s | `leak-trailer.tsx`, board `leak-trailer.script.ts` |
| Pioneer Terminal (playable clue) | play | 60 s attract, playable | `cycle-terminal.tsx`, rules `terminal.ts` |
