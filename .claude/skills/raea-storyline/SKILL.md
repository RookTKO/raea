---
name: raea-storyline
description: How to turn the information a person hands over (a premise, lore, a setting doc, a storyboard sheet, a script outline, posters, a game's own canon) into a storyline worth filming in raea, with a character who wants something, a secret discovered rather than announced, scenes that end unresolved and a payoff built toward, and then into a beat sheet and a `NAME.script.ts` storyboard with enough shots, shot types and sound to carry it. Use before writing any film, trailer, explainer, propaganda spot, lore piece or "make a video about this" in raea, and whenever a draft reads as titles over stills. Triggers on: storyline, story, narrative, plot, script, storyboard, beat sheet, logline, trailer, lore video, make a video about, adapt this, premise, worldbuilding into film, show don't tell, reveal, twist.
---

# From information to a storyline

Information is what the person gives you: facts about a world, a premise, a list of scenes, a mood. A storyline is
what a viewer goes through: **someone wants something, something is in the way, and by the end something has
changed, ideally the viewer's understanding.** The most common failure is filming the information: each fact gets a
picture and a caption, in the order it was written. The result is accurate and nobody feels anything.

raea's own `craft/modes/story.md` and `craft/rubric.md` (in `skills/skills/raea/`) say what a story must do. This
skill is the method for getting there from raw material. Work through the steps in order and write each one down:
the outputs are files, not thoughts.

## 1. Inventory: what you have, what you may not change

Read everything the person gave you, the project's design bible (`raea-fidelity`), and the project's canon. Write
`STORY.md` beside the piece with four lists:

- **Facts** (canon): numbers, names, dates, rules of the world. Quote them. These never change, and every one you
  use must match the source (`raea-fidelity` checks it).
- **Cast**: every character with an approved design, and what each can physically do (has arms? floats? a screen
  for a face that can change expression?). A character you can't animate believably is a prop, so plan around it.
- **Places and objects**: what exists as art, or can be made in the project's art style.
- **The person's words**: every instruction they gave, verbatim. Some are rules (no feet; whole gems only), some are
  taste. Both outrank you.

## 2. Find the story in the information

Answer these in writing, in one or two lines each. If you can't, you don't have a story yet.

1. **Whose story is it?** One character the viewer follows. Not "the company", not "the era". If the material is
   about a system, pick the person the system happens to.
2. **What do they want, on screen?** Something a camera can see them try for: to finish the shift, to get the
   payout home, to find out why the date doesn't match.
3. **What's in the way?** A person, a rule, a lie, their own memory.
4. **What's the secret?** Most lore has one (the thing the setting hides). Decide **who knows it when**:
   - the viewer finds it out *with* the character: **mystery** (plant clues, reveal once, late);
   - the viewer knows it *before* the character: **suspense** (show the bomb under the table, then the character
     chatting above it: every ordinary moment becomes unbearable);
   - the viewer knows it and the narrator denies it: **irony** (the corporate voice says "safe" over a picture of
     what isn't). Propaganda and mock-educational pieces live here.
   Choose one per piece. Mixing all three spends the secret in the first ten seconds.
5. **What changes by the end?** The character's situation, or the viewer's reading of everything they've seen.
6. **The feeling** in one or two words (dread, homesick, complicit, giddy). "Epic" is a look, not a feeling.
7. **The belief**: the one sentence the viewer could say afterwards (`brief.ts`'s `believe`).
8. **The poster frame**: the one image the whole piece builds toward. Decide it now.

Then the **logline**: *When [character] [does something ordinary], [they / we] discover [the secret], and [the
change].* If it doesn't fit that sentence, go back to question 1.

## 3. Turn every fact into something seen or done

A fact can enter a film four ways. Use them in this order of preference and keep a table in `STORY.md`
(fact → how it enters → shot):

1. **An action**: a character does something that only makes sense if the fact is true.
   *"Cryo is a brand term; nobody ever leaves" → the attendant wipes the frost off a capsule, and the "capsule" has
   no door on the inside.*
2. **An object in the world**: a screen, a sign, a form, a counter, a uniform, a stamp.
   *"Re-uploads reset the cockpit counter" → we watch the monitor read CYCLE 6, the screen goes dark, and wakes on
   CYCLE 1.*
3. **A line with a motive**: someone says it because they want something from the listener (a recruiter selling, a
   supervisor covering up). Never a line whose only job is to inform the audience.
4. **A document insert**: a close shot of paper or a record, one or two words legible, for a fact that is only
   ever written down. Last resort, and never more than one in five shots.

A caption that states the fact is not on the list. Captions translate a voice; they don't replace a scene.

## 4. Choose a structure that fits the secret

| Structure | Use when | Shape |
|---|---|---|
| **The five-beat short** (most pieces under 90 s) | one character, one secret | *Hook* (0-3 s: an image that raises a question) → *the normal* (their routine, the want) → *the crack* (one detail is wrong) → *the pull* (they follow it; each step costs or reveals more) → *the reveal on the poster frame* → *a button* (a sting, a last line, the logo) |
| **The loop** (repetition with one change) | a premise about cycles, memory, routine | the same morning three times, faster each time, one detail different each time (a scratch on the console, a counter, a crack growing). The viewer notices before the character does |
| **Cross-cutting** | two clocks, two places, two truths | alternate two lines of action at an accelerating rate until they meet in one frame. Each cut must answer or sharpen the other side |
| **The cracked format** | an ad, a briefing, a filmstrip, a broadcast | the format is the setting, and **the story is the format failing**: the presenter stumbles, a slide shows the wrong photo, a stamp lands crooked, the real footage bleeds through. One crack per minute at first, then more. A format played straight to the end is a parody, not a story |
| **The investigation** | records, leaks, case files | an investigator with a reason to care (it's their own file), finding one piece at a time; each piece changes what the last meant. The board is the investigator's, and we watch them pin things, not the camera reading papers |
| **The trailer** | selling a whole world | three movements: the world's promise (wide, warm, the music low), the turn (one image of the lie, the music drops out), the escalation (cuts on the music's build, faster), the title on the drop, a final short beat after the title |

## 5. The beat sheet

Write the scenes in `STORY.md`, each with:

- **What the character wants in this scene** and whether they get it;
- **What's new** to the viewer (a fact, a feeling, a turn). A scene with nothing new is cut;
- **How it ends unresolved** (rubric `pull`): a question, a look, a sound off screen;
- **Plants and payoffs**: anything paid off later is planted earlier, on screen. List them in pairs.

Then check the tension curve by drawing it in text (`▁▂▃▅▂▆█▃`): it should build, breathe and land, not sit flat.
Sanity on length: a 60 s piece holds 3-6 scenes and **15-30 shots**; a 90-120 s piece 5-9 scenes and 25-50 shots.
Fewer shots than seconds/4 means the plan is a slideshow.

## 6. Words: voice first, captions second

- Most stories want a **voice**. raea speaks locally (`<Speech>`, 8 Pocket voices; `raea-capabilities` row 6). Cast it:
  render the same line in three or four voices and choose.
- **Fewer, better lines.** A line says what the picture can't, or says the opposite of the picture (irony). A line
  that describes the picture is cut.
- **Every line has a speaker with a motive**, even a narrator. A corporate narrator is selling; a worker is tired; a
  leaked recording is frightened.
- **Subtext beats statement.** "We'll see you next cycle" is worse news than "you've been rebooted 41 times" once the
  viewer knows what a cycle is.
- On-screen words obey the project's fonts and character set (`raea-fidelity`).

## 7. The storyboard file

Write `NAME.script.ts` with `script({...})` from `raea/brief` and check it with `raea spec NAME.script.ts`. Each beat
has `onScreen` (subject and action), `camera` (framing and move, still moving at the cut), `cut` (how it joins the
next: on motion, on a word, on a hit), `lines` (who, says, how), `cues` (music and sound), `seconds`, and `onWord`
when it cuts on speech. **One beat per shot**, not one per scene: a 12-second beat with one `onScreen` is a still.

Before you show it, run `raea-shots`' variety check on it, and fill in this self-check at the top of `STORY.md`:

- [ ] One protagonist, a want, an obstacle, written down.
- [ ] The secret's handling chosen (mystery, suspense or irony) and kept.
- [ ] Every fact enters by action or object at least twice as often as by document; no fact by caption alone.
- [ ] Every scene ends unresolved, except the last.
- [ ] Every plant has its payoff and every payoff its plant.
- [ ] The poster frame is in the board, and the edit builds to it.
- [ ] Shot count fits the length (step 5).
- [ ] Every character, object and number matches the design bible and canon (`raea-fidelity`).
- [ ] The person's verbatim instructions from step 1 are all honoured.

The person approves the storyboard before anything renders (raea's order of work). If they have said "I approve
all your decisions", still post the board, and say you're going ahead with it.

## The patterns this method exists to stop

These came from real reviewed work (see GemCore's `media/reviews/`):

- **Facts in the order given, each a captioned still.** Find the story first (step 2).
- **The reveal stated as a title** ("CYCLE 7 / GC 112", big, centred) instead of discovered on an object in the world.
  And then repeated as the ending of three different pieces.
- **A format played straight** (a keynote that's only slides, a filmstrip that's only frames, a corkboard that's
  only papers). The format needs its crack.
- **A protagonist who is only a picture.** If they never move, want or react, they're set dressing.
- **One beat per 12-second scene.** Divide into shots.
- **The same ending card in every piece.**
