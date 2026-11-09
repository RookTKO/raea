# GemCore lore pieces

Three pieces built from one canon, using GemCore's own sprites, music and font:

| Piece | What | Make it |
|---|---|---|
| **The Pioneer Program** | 30 s recruitment ad: the company's myth, with the truth in its fine print | `raea render content/gemcore/pioneer-ad.tsx -o content/gemcore/out/pioneer-ad.mp4` |
| **The Leak** | 60 s lore trailer: the ad breaks, and the cockpit's CYCLE counter is set against the record's GC Years | `raea render content/gemcore/leak-trailer.tsx -o content/gemcore/out/leak-trailer.mp4` |
| **Pioneer Terminal** | A playable clue: read the leaked files, then answer what year it is and how many times you have been rebooted | `raea play content/gemcore/cycle-terminal.tsx` (its attract run renders like the others) |

The canon is in [`STORY_BIBLE.md`](STORY_BIBLE.md) (prose) and [`lore.ts`](lore.ts) (data). Every date, number and
on-screen word comes from `lore.ts`.

## Setup: link GemCore, don't copy it

None of GemCore's files are in this repo. `media/` (staticFile's folder) is a link to a GemCore checkout, ignored by
git, and raea's root `.gitignore` already keeps every image, sound and font under `content/` out of commits.

```bash
content/gemcore/tools/link-gemcore.sh /path/to/GemCore
```

On Windows, in PowerShell (this makes a directory junction, which needs no admin rights):

```powershell
content\gemcore\tools\link-gemcore.ps1 -GemCore C:\path\to\GemCore
```

With no path given, both scripts look for `GemCore` beside the raea checkout. If GemCore's sprites change, regenerate
the frame list. Sprite frames are named by GUID in each `.yy`, so `gemcore.gen.ts` maps names to those files:

```bash
bun content/gemcore/tools/gen-assets.ts
```

## Checks

Run the tests by file name. A bare `bun test content/gemcore` follows the `media` link into GemCore's own tests.

```bash
bun test ./content/gemcore/lore.test.ts ./content/gemcore/cycle-terminal.test.ts
```

```bash
sdk/raea/node_modules/.bin/tsc -p content/gemcore
```

```bash
raea spec content/gemcore/brief.ts
```

- `lore.test.ts`: every string draws in Corp Console, and the dates add up.
- `cycle-terminal.test.ts`: the attract run plays the whole story, and a person's first key takes over.
- `tsc`: the one error it reports, about `FogFalloff` in `sdk/raea/src/prelude.ts`, is upstream raea's, not this
  folder's.
- `raea spec`: checks the brief (and the `*.script.ts` storyboards) against raea's schema.

## Files

| File | What |
|---|---|
| `brief.ts` | raea's brief: audience, belief, modes, voice, the look, deliverables |
| `STORY_BIBLE.md`, `lore.ts` | the canon |
| `brand/brand.css` | the palette and the Corp Console `@font-face` (read from `media/`) |
| `gemcore.tsx` | shared kit: colours, `Sprite` (crisp, frame-stepped), typed text, the cockpit `Glass`, `Glitch` |
| `gemcore.gen.ts` | generated sprite frame and sound paths inside `media/` |
| `ad.tsx`, `pioneer-ad.tsx`, `pioneer-ad.script.ts` | the ad's shots, its composition, its storyboard |
| `leak-trailer.tsx`, `leak-trailer.script.ts` | the trailer and its storyboard |
| `terminal.ts`, `cycle-terminal.tsx` | the terminal's rules (a pure fold) and its drawing |

## Corp Console's characters

The font has letters, digits, Latin accents and ` !%()+,-./:?[]_`. It has no apostrophe, quotes, `$`, `*`, `#`, `>`, `&`
or dashes. Write "DO NOT", "CR" and "/".
