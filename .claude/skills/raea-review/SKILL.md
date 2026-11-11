---
name: raea-review
description: Reviewing finished raea videos honestly: contact sheets, stills at the cuts, the measured check, the rubric's questions answered for this audience, the variety and fidelity checks, the source code read for how it was built, and a written verdict per piece with what to keep, what failed and the move that fixes it, ranked P0 to P3. Use when the person asks to review, critique, triage or compare videos, when they say work feels "lacking", "flat", "boring" or "off", and before calling any piece done. Triggers on: review, critique, feedback on the video, what's wrong with, why does this feel, compare these videos, triage, judge, rubric, P0, P1.
---

# Reviewing a piece

raea's `craft/rubric.md` (in `skills/skills/raea/`) defines how a piece is judged: measured facts, judged questions
and written issues. This is the procedure for doing it on several finished videos at once, honestly, and turning the
result into the next version's plan.

## Gather the evidence first

For each video:

1. **The measured check**: `raea check FILM.mp4 -o FILM.check.json`. Its P0 and P1 lines are facts. A clean
   check doesn't mean the piece works: a slow push over a still plate changes every frame, so a slideshow passes
   the "frozen" check. Only the judged questions catch that.
2. **A contact sheet**: `bash .claude/skills/raea-review/sheet.sh FILM.mp4 sheet.jpg 20`, and look at it. Most
   structural problems show here: the same layout twenty times, a picture held for a third of the piece, a
   protagonist who never appears.
3. **Stills at the moments that matter** (the first second, each scene's turn, the reveal, the last frame), at full
   size, to read the text and check the characters against the design bible.
4. **The source**: open the composition and its storyboard. Count the shots, the framings, the moves, the sounds;
   note what the code does in every shot (a push and a fade? a puppet acting?). The code tells you why it looks the
   way it does.
5. **The brief**: who it's for, what they should believe, the mode, the person's own words about it.

## Judge

Answer raea's rubric questions for each piece's modes (open, point, shown, loop, pull, land, pace, read, sound or
sound-silent, world, own), each poor, weak, acceptable, strong or excellent, with the moment that decided it. Then
the checks this repo adds:

- **Story** (`raea-storyline`): is there a protagonist with a want? Is the secret discovered or announced? Does each
  scene end unresolved? Is the poster frame built toward?
- **Variety** (`raea-shots`, the ten-point check): count, don't estimate.
- **Fidelity** (`raea-fidelity`): characters on model, facts from the canon, one world.
- **Capabilities** (`raea-capabilities`): which rows did it use? A piece that used two rows is usually why it feels
  thin.
- **Across pieces**: do several pieces share the same ending, the same structure or the same move? Repetition
  across a set is a finding even when each piece alone passes.

Be specific and unsentimental. "It feels lacking" from the person is a P1 on `point` or `pull` until shown
otherwise. Never defend the work; find what caused the feeling.

## Write it

One file per review round (`reviews/YYYY-MM-review.md` beside the media), with:

1. **The verdict across the set** first: the three to five causes that explain most of what's wrong, each with the
   pieces it hits.
2. **Per piece**: what it is (one line), the strongest moment (to keep), the findings as a table
   (moment · what the viewer meets · why · move · rank), and the measured check's result.
3. **What changes in the method**, so the next round doesn't repeat it: the skill, the bible or the taste file the
   lesson goes into. Put the lesson there too, not only in the review.

Rank as the rubric says: P0 fails the piece, P1 loses this audience here, P2 costs attention, P3 finishing. A piece
with a P0 or P1 isn't done.

## Then

Offer the next version of the weakest piece, planned with the fixes, rather than polishing all of them. A redesign
keeps the facts and the art and treats the old look as evidence (raea's router: "a change keeps; a redesign
replaces").
