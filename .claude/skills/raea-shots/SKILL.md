---
name: raea-shots
description: The shot vocabulary for raea films and how to build each shot (framings, camera moves that keep moving through cuts, depth from layered planes, cutout puppets that act, screens inside the world, inserts, match cuts, whip pans, cross-cutting, transitions with meaning), the sound that goes with each (voice, score, foley, silence), and a variety check a storyboard must pass before it renders, so a piece doesn't become one move repeated over stills. Use when turning a storyline into shots, when writing the camera, cut and cue fields of a `NAME.script.ts`, when a draft feels like a slideshow, or when a note says "boring", "static", "same thing over and over" or "lacking". Triggers on: shot list, shots, camera move, framing, close-up, insert, transition, match cut, whip pan, parallax, puppet, cutout animation, acting, lip sync, slideshow, Ken Burns, variety, montage, visual storytelling.
---

# Shots: what the camera sees, and how each one is built in raea

Read `raea-capabilities` for the components and `raea-storyline` for what each scene must land. This file is the
middle: the scene's job turned into shots, and each shot into raea code. The working example
`examples/acted-scene.tsx` has the core pieces together, rendered and checked: a set with depth, a puppet that
gestures on a spoken word, a screen in the world that changes, a voice, captions that follow it, a score ducked
under the voice and a sting on the reveal.

## The vocabulary

Each shot in a storyboard names one of these. They're the words to plan with, so the plan can be checked for variety.

**Framings** (what's in the frame):

| Framing | What it's for | Built in raea |
|---|---|---|
| **Establishing** (wide) | where we are, once per place, with something happening in it | a back plate on an `ImagePlane` far away, two or three nearer planes, the camera drifting; never empty |
| **Medium** | a character doing something; the default for acting | the puppet at half-frame height in front of a set, its gestures on the words |
| **Close-up** | a reaction, a decision, a face changing | the puppet's head filling a third of the frame; the screen face swaps expression (a sprite frame or an image swap), a blink, the antennae dropping |
| **Insert** | one object that carries a fact: a stamp, a counter, a form field, a gem | a tight shot of the object (an `<Img>` or a `<Screen>`), one action (it flips, it lands, it cracks), one sound. 1-2 s |
| **Point of view** | what the character sees, so the viewer discovers it with them | the camera where their eyes are, looking through the cockpit glass or at a screen; a slight hand-held drift |
| **Over the shoulder** | a character looking at something we also see | the puppet's head and shoulder large in the near foreground (page layer), the thing they look at sharp beyond |
| **Two-shot / confrontation** | two characters and the power between them | one higher in the frame than the other; who faces the camera is who we're with |
| **Diegetic screen** | the world's own media: an ad on a monitor, a briefing, a terminal | a `<Screen>` in the set showing a nested composition. The film can push in until the screen fills the frame, then pull out to show who's watching |

**Camera moves** (always from the frame; always still moving at the cut, per the official floor):

| Move | Meaning | Built in raea |
|---|---|---|
| Push in | attention, dread, a realisation | `Camera3d` `z` falling across the shot (on a 3D set) or `scale` rising on a page layer |
| Pull out | context, isolation, the reveal of scale | `z` rising; new planes come into frame at the edges |
| Truck / drift sideways | a place, a parade, a queue | `x` changing; near planes pass faster than far ones (that's the parallax) |
| Tilt / crane | a tower, a ladder, a hierarchy | `y` and the `lookingAt` target rising together |
| Whip pan | a jolt, a change of place or time | `x` jumping 2-4 m in 4-6 frames with a motion-blur smear (a blurred copy of the layer, or `<MotionBlur>`), cut in the middle of the whip |
| Hand-held drift | someone's eyes, unease | small noise on `x`, `y` and the look target, seeded from the frame (`Math.sin` sums, never `Math.random` for something that should be smooth) |
| Locked off | a held tableau, deadpan comedy, a stamped document | no move at all, on purpose, with something moving inside the frame |

**Cuts and transitions** (each has a meaning; pick one by what it means):

| Join | Meaning |
|---|---|
| Hard cut on an action | the default; cut while something moves, and the next shot continues it |
| Match cut (shape or motion) | two things are the same thing: a gem's facet → a tower's window; the counter's 1 → the ledger's 112 |
| Cut on a word | the line names it, we see it (`onWord` in the script, `speechAt` in the code) |
| Cut on a hit | the music or a sound effect lands the change (`raea song` map, or a placed impact) |
| Smash cut | the opposite of what was promised, instantly: the ad's smile → the empty capsule |
| Dissolve | time passing, memory |
| A project's own transition (a vortex, a glitch, a projector change) | only where the world says it happens (a reboot, a broadcast cutting out); not on every cut |

## Building the hard parts

- **Depth.** Split each painted set into layers before animating: a back plate, a middle (the subject's ground),
  and a near foreground (a console edge, a rail, a curtain), on `ImagePlane`s at about `z = -4, -1, +1`. Even a
  0.3 m drift then reads as a place. A single flat plate with a zoom reads as a photo of a place.
- **Puppets.** Cut the character's art into parts at the joints the design actually has (the head at the neck, the
  arm at the shoulder and the elbow, a held prop), each a transparent PNG with its pivot noted. Nest them so a parent
  carries its children (`examples/acted-scene.tsx`, `Puppet`). Give every puppet an idle (a float or a breath, a
  slow head drift) so it's never frozen, and **key its gestures to the voice's words** with `speechAt`, not to
  guessed frames. A character with a screen for a face acts with its face: swap the face image for each expression.
  Never animate a part the design doesn't have (a character drawn without legs never walks).
- **Lip sync for a screen face or a mouth.** Open the mouth on frames where `speechAt` says a word is being said
  and the voice is loud; close it in the pauses between words. Two or three mouth shapes are enough.
- **Screens.** Write what the screen shows as its own small composition (`<Counter>` in the example) and put it on a
  `<Screen>`. It has its own clock, so a reveal on the screen can be timed inside it. `power` switches the set on
  and off; the CRT's `flicker`, `glow` and `curvature` give it age.
- **Inserts of documents.** Show at most a short line or a number, large and legible; the rest of the page can be
  texture. If the viewer has to read a paragraph, it's the wrong shot.
- **Many things** (a fleet, a crowd, falling gems): a mapped list on the page, or `<Instances>` in 3D, each item's
  offset seeded from its index so it holds still between frames.

## Sound for each shot

Plan sound in the storyboard's `cues`, shot by shot, not as one bed laid under everything:

- **The voice leads.** Time the shots from the voice (`speechDuration`, `speechAt`), not the voice from the shots.
- **The score has a shape**: in for the world, out (silence or a drone) for the turn, back for the build, a sting on
  the reveal. Silence is a cue; plan where it is.
- **Foley marks physical moments only**: the stamp, the hatch, the clicker, the drill. Not every entrance.
- **The project's own sounds first** (its music and effects), Tone.js synths for what's missing (the cues in
  `examples/acted-scene.tsx`), `sao` foley on a Mac.
- **The room**: a low tone for each place (a hum for the cockpit, wind for the surface) makes cuts between places
  feel like places.

## The variety check

Run this on the storyboard (`NAME.script.ts`) before anything renders, and again on the rendered stills. Write the
result in `STORY.md`. Any **fail** is fixed in the board, not after the render.

1. **Shot count**: at least one shot per 4 seconds on average (a 60 s piece: 15 or more). Fail below that.
2. **Shot lengths vary**: the longest shot is at least three times the shortest, and no more than three shots in a
   row are within 0.5 s of each other's length.
3. **Framings mix**: no more than two shots in a row with the same framing; the piece uses at least four framings,
   including at least one close-up and one insert.
4. **Moves mix**: no more than two shots in a row with the same move. A push-in on every shot is the slideshow.
5. **Something moves inside every shot** besides the camera: a character, an object, a screen, light. A plate with
   only a camera move fails, unless it's an establishing shot of 3 s or less.
6. **Capabilities**: at least four rows of `raea-capabilities` are used across the piece, and each scene uses one
   the scene before didn't.
7. **Characters act**: every scene with a character has that character doing something (a gesture on a word, a
   turn, a reaction close-up). A character only standing there fails.
8. **Words**: on-screen text is never the only carrier of a story point. Each one is spoken, acted, or shown on an
   object in the world as well, or it's a deliberate document insert (and those are under a fifth of the shots).
9. **Transitions mean something**: a stylised transition (vortex, glitch) appears only where the story says the
   world itself changes, at most three times a minute.
10. **The ending is this piece's own**: not the same end card or reveal as the project's last three pieces.

## The slideshow test

Pull 20 evenly spaced frames into a contact sheet (`raea-review` shows how). If the sheet looks like the same layout
20 times with different pictures in it, or if you could tell the whole piece from the captions alone, it's a
slideshow. Go back to the board.
