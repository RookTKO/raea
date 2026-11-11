---
name: raea-fidelity
description: Keeping a raea piece faithful to a project's designs and canon. Covers the project design bible (cast model sheets with what each character can and can't do, the worlds and their rules, palette and type, the asset index, the sound sources, the canon as data, the person's standing rules) and the checks at three points (the storyboard, the stills, the export) that catch an off-model character, a wrong fact, a forbidden glyph or a borrowed look before the person does. Use when starting work on a project's media, when a project has no design bible yet, when generating or choosing art for a project, and before calling any piece done. Triggers on: design bible, style guide, model sheet, on model, off model, canon, lore accuracy, continuity, brand consistency, faithful to the design, character design, art direction, reference art, generated art from references.
---

# Fidelity: the project's designs and canon, kept

A story can be good and still wrong for the project: the character has feet they were drawn without, the logo is
redrawn, a number contradicts the lore, the look borrows from a different film every shot. Viewers who know the
project notice at once, and the person has to say the same correction twice. This skill makes the project's design
and canon a file every agent reads and a set of checks every piece passes.

## The design bible

Every project gets one file, `DESIGN_BIBLE.md` beside its media (copy `templates/DESIGN_BIBLE.template.md`). Write
it from the project's real assets and the person's words, never from memory. It holds:

1. **The person's standing rules, verbatim**, with the date they said each. These outrank any guide, including
   raea's official floor ("the person wins"). Where a rule overrides the floor (for instance, generated art allowed
   when made from the project's own art), say so in a line.
2. **The cast.** One section per character:
   - the reference files (paths), and which is the canonical one;
   - **what the design has** (a screen for a face, cat ears, antennae, a halo ring) and **what it doesn't** (no legs,
     no mouth). Write the "never" list explicitly; it is what agents get wrong;
   - **how it moves**, from what the design allows: floats and bobs, gestures with one arm, its face swaps
     expression;
   - its voice (a Pocket voice and seed, or a WAV) once one is cast, and its manner of speaking;
   - which parts are cut out for a puppet, with pivots.
3. **The worlds.** Each look the project has approved (an in-game UI style, a poster style, a cinematic style): its
   palette by role, the light, the type, the camera language, its transition, and which pieces use it. A piece
   picks one world and stays in it, unless the story crosses between them on purpose (an in-world broadcast inside
   a cinematic film).
4. **Type and words**: fonts (paths), the character set each font can draw, words the project never uses, how
   names and numbers are written.
5. **Objects and their states**: the project's recurring props and which states are allowed (a gem shown whole, never
   its breaking frames).
6. **The asset index**: where the sprites, plates, posters, music and effects are, and how a piece references them
   (in place, never copied, when the project says so).
7. **Generated art, if allowed**: the tool, the references to use (by id), what a prompt must keep, and where each
   result's prompt is recorded (`SOURCES.md` next to the art).
8. **Canon**: a pointer to the facts as data (a `lore.ts` or `canon.json`) with a test that fails on a mismatch. Copy
   numbers from the data, never retype them.
9. **What's been made and how it ended**: each piece, its world, its ending. So the next piece doesn't repeat one.

## The three checks

**At the storyboard** (before any render), for every beat:

- every character on screen is in the cast, and does only what its design allows (check the "never" list);
- every fact, name and number is quoted from the canon data;
- the world is one of the bible's, and every shot belongs to it;
- every on-screen word uses the project's font and its character set;
- every asset named exists at its path;
- generated art, if any, has its reference ids and prompt written down before it's made.

**At the stills** (render the moments that matter with `raea render FILE --at A,B,C -o stills/` and look):

- each character next to its canonical reference: same silhouette, colours, proportions, parts. Put them side by
  side in one image (`ffmpeg ... hstack`) and look at that, not from memory;
- each generated plate next to the art it was made from: the same hand (line weight, shading, palette). A plate that
  looks like a different artist made it fails, however good it is;
- type: the right font, nothing clipped, nothing outside the character set;
- objects in allowed states only.

**At the export**: `raea check OUT.mp4` passes, and the canon test passes. A fact on screen that the test can't see
(a number baked into an image) is read off the still and compared by hand.

## Generated art made from the project's own

When the person allows generated images made from the project's art (an image-to-image model with the project's
sprites and posters as references), keep them from drifting:

- **References first, words second.** Give the model the closest existing art as references (the character's own
  poster, the set's own sprite) and describe only what's new: the pose, the framing, the action. Describing the
  style in words instead of showing it is how a project ends up with four art styles.
- **One world per batch**: every image in a scene generated against the same references and the same style words.
- **Ask for parts, not only pictures**: a character on a flat key colour in a neutral pose, with the arm separate,
  is a puppet; a finished illustration is only a still.
- **Check every result against the model sheet** before it's used, and regenerate rather than keep an off-model one.
  Record the prompt, the reference ids and the result id in `SOURCES.md`.
- **Never** let a generated image stand in for a real asset that exists: logos, the game's own sprites and fonts are
  always the real files.

## Canon as data

Keep the facts a piece can state in a typed file, read by the pieces and checked by a test:

```ts
// canon.ts: the facts, once
export const WORKER = { id: "0412-C", signed: 3, now: 112, reuploads: 41, cycle: 7 } as const;
export const YEARS = WORKER.now - WORKER.signed; // derived, never typed
```

```ts
// canon.test.ts: the bible's numbers and the data agree; the copy uses only the font's characters
import { expect, test } from "bun:test";
import { WORKER, YEARS } from "./canon";
test("years follow from the record", () => expect(YEARS).toBe(109));
```

A piece writes `GC {WORKER.now}`, never `GC 112`. Then a change to the canon changes every piece, and a test catches
the one that disagrees.
